import {
  DEFAULT_HISTORICAL_BAND,
  defaultFaucetBorrego,
  defaultFaucetInflated,
  defaultWhip,
  Temple,
  type Effort,
  type Faucet,
  type Rain,
} from "./primitives.ts";
import { next, type HornContext } from "./horn.ts";
import { GrifoState, type StateSnapshot } from "./states.ts";

export interface SimulationParams {
  /** Starting price-to-income ratio (Spain ~8×) */
  initialPriceToIncome: number;
  /** Target band after correction */
  historicalBand: number;
  /** Borrego max term */
  maxTermYears: number;
  /** Periods to simulate */
  periods: number;
  /** Apply anti-fund clause after collapse */
  antiFundClause: boolean;
  /** Price adjustment speed per period (0–1) */
  adjustmentRate: number;
}

export interface SimulationResult {
  params: SimulationParams;
  snapshots: StateSnapshot[];
  hornTrace: string[];
  finalState: GrifoState;
  forkSymbol: "⊢" | "⊬" | "⊘";
}

export const DEFAULT_SIM_PARAMS: SimulationParams = {
  initialPriceToIncome: 8.0,
  historicalBand: DEFAULT_HISTORICAL_BAND,
  maxTermYears: 10,
  periods: 12,
  antiFundClause: false,
  adjustmentRate: 0.15,
};

function effortFromPrice(priceToIncome: number, band: number): Effort {
  return {
    priceToIncome,
    paymentToIncome: priceToIncome / 25,
    historicalBand: band,
  };
}

function rainForEffort(effort: Effort): Rain {
  return {
    narrative: "El mercado mejora el acceso a la vivienda",
    effortClaim: effort.historicalBand * 0.9,
  };
}

/** Monthly payment proxy: higher term → lower payment → higher absorbable price */
export function priceFromFaucet(
  basePrice: number,
  faucet: Faucet,
  referenceTerm = 30,
): number {
  const termFactor = faucet.maxTermYears / referenceTerm;
  const rateFactor = 1 + (0.03 - faucet.baseRate) * 5;
  return basePrice * termFactor * rateFactor;
}

export function simulateHousing(
  partial: Partial<SimulationParams> = {},
): SimulationResult {
  const params: SimulationParams = { ...DEFAULT_SIM_PARAMS, ...partial };
  const snapshots: StateSnapshot[] = [];
  const hornTrace: string[] = [];

  let priceToIncome = params.initialPriceToIncome;
  let state = GrifoState.INFLATED;

  const inflatedFaucet = defaultFaucetInflated();
  const shockFaucet: Faucet = {
    ...defaultFaucetBorrego(),
    maxTermYears: params.maxTermYears,
  };
  const whip = defaultWhip();

  for (let period = 0; period <= params.periods; period++) {
    const faucet = state === GrifoState.SHOCK_PENDING || state === GrifoState.COLLAPSE
      ? shockFaucet
      : period === 0
        ? inflatedFaucet
        : shockFaucet;

    if (period > 0 && state === GrifoState.COLLAPSE) {
      const gap = priceToIncome - params.historicalBand;
      priceToIncome = Math.max(
        params.historicalBand,
        priceToIncome - gap * params.adjustmentRate,
      );
    }

    const effort = effortFromPrice(priceToIncome, params.historicalBand);
    const rain = rainForEffort(effort);

    const ctx: HornContext = {
      state,
      faucet,
      effort,
      rain,
      whip,
      antiFundClause: params.antiFundClause,
    };

    const step = next(ctx);
    hornTrace.push(`p${period}: ${step.rule} → ${step.nextState}`);

    snapshots.push({
      state,
      period,
      priceToIncome: Math.round(priceToIncome * 100) / 100,
      maxTermYears: faucet.maxTermYears,
      note: step.rainFalse ? "Rain falsa detectada" : undefined,
    });

    state = step.nextState;
    if (state === GrifoState.REACCUMULATION) break;
    if (state === GrifoState.STABLE && period > 0) break;
  }

  const forkSymbol: SimulationResult["forkSymbol"] =
    params.maxTermYears <= 10
      ? "⊢"
      : params.antiFundClause
        ? "⊬"
        : "⊘";

  return {
    params,
    snapshots,
    hornTrace,
    finalState: state,
    forkSymbol,
  };
}

export function formatSimulationReport(result: SimulationResult): string {
  const lines: string[] = [
    "=== HiperGrifo — simulación vivienda (Borrego maxTerm=10) ===",
    `Escenario fork: ${result.forkSymbol}`,
    `Estado final: ${result.finalState}`,
    `Banda histórica: ${result.params.historicalBand}× salario`,
    "",
    "Periodo | Estado          | Precio/Ingreso | Plazo",
    "--------|-----------------|----------------|------",
  ];

  for (const s of result.snapshots) {
    lines.push(
      `${String(s.period).padStart(7)} | ${s.state.padEnd(15)} | ${String(s.priceToIncome).padStart(14)} | ${s.maxTermYears}a`,
    );
  }

  lines.push("", "Traza Horn:");
  for (const h of result.hornTrace) {
    lines.push(`  ${h}`);
  }

  if (result.finalState === GrifoState.REACCUMULATION) {
    lines.push(
      "",
      "⚠ REACCUMULATION: sin antiFundClause — patrón Blackstone plausible.",
    );
  }

  return lines.join("\n");
}
