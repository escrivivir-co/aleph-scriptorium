import type { Effort, Faucet, Rain, Whip } from "./primitives.ts";
import { GrifoState } from "./states.ts";

export interface HornContext {
  state: GrifoState;
  faucet: Faucet;
  effort: Effort;
  rain: Rain;
  whip: Whip;
  antiFundClause: boolean;
}

export interface HornResult {
  nextState: GrifoState;
  rule: string;
  rainFalse: boolean;
}

/** Clause: long cheap credit inflates the market */
export function clauseInflate(faucet: Faucet): boolean {
  return faucet.maxTermYears > 15 && faucet.baseRate < 0.03;
}

/** Clause: narrative claims lower effort than measured */
export function clauseRainFalse(effort: Effort, rain: Rain): boolean {
  return rain.effortClaim < effort.priceToIncome;
}

/** Clause: effort exceeds historical band * trigger */
export function clauseWhipPending(effort: Effort, whip: Whip): boolean {
  return effort.priceToIncome > effort.historicalBand * whip.triggerMultiplier;
}

/**
 * Next(Whip) — core Horn transition when effort > historical_band
 * Fires SHOCK_PENDING → COLLAPSE when whip cap is enforced
 */
export function next(ctx: HornContext): HornResult {
  const rainFalse = clauseRainFalse(ctx.effort, ctx.rain);

  if (ctx.state === GrifoState.STABLE && clauseInflate(ctx.faucet)) {
    return { nextState: GrifoState.INFLATED, rule: "inflate", rainFalse };
  }

  if (
    (ctx.state === GrifoState.INFLATED || ctx.state === GrifoState.STABLE) &&
    clauseWhipPending(ctx.effort, ctx.whip)
  ) {
    return { nextState: GrifoState.SHOCK_PENDING, rule: "whip_pending", rainFalse };
  }

  if (ctx.state === GrifoState.SHOCK_PENDING) {
    const enforced = ctx.faucet.maxTermYears <= ctx.whip.maxTermCap;
    if (enforced && ctx.effort.priceToIncome > ctx.effort.historicalBand) {
      return { nextState: GrifoState.COLLAPSE, rule: "Next(Whip)", rainFalse };
    }
  }

  if (ctx.state === GrifoState.COLLAPSE) {
    if (!ctx.antiFundClause) {
      return { nextState: GrifoState.REACCUMULATION, rule: "reaccumulate", rainFalse };
    }
    return { nextState: GrifoState.STABLE, rule: "supply_side_recovery", rainFalse };
  }

  return { nextState: ctx.state, rule: "hold", rainFalse };
}

export function evaluateUntilStable(
  ctx: HornContext,
  maxSteps = 10,
): HornResult[] {
  const trace: HornResult[] = [];
  let state = ctx.state;
  let steps = 0;

  while (steps < maxSteps) {
    const step = next({ ...ctx, state });
    trace.push(step);
    if (step.nextState === state) break;
    state = step.nextState;
    steps++;
    if (state === GrifoState.REACCUMULATION || state === GrifoState.STABLE) break;
  }

  return trace;
}
