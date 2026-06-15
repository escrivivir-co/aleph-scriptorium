/** Five primitives of grifo-lang — degraded from corpus temple/faucet metaphors */

export enum Temple {
  HOUSING = "HOUSING",
  WATER = "WATER",
  ENERGY = "ENERGY",
}

export interface Faucet {
  /** Maximum mortgage term in years */
  maxTermYears: number;
  /** Loan-to-value ratio (0–1) */
  maxLTV: number;
  /** Annual base interest rate */
  baseRate: number;
}

export interface Effort {
  /** Price / annual median income */
  priceToIncome: number;
  /** Monthly payment / monthly income */
  paymentToIncome: number;
  /** Historical sustainable band (e.g. 4.5 salaries) */
  historicalBand: number;
}

export interface Rain {
  /** Official or market narrative */
  narrative: string;
  /** Claimed effort level in the narrative */
  effortClaim: number;
}

export interface Whip {
  /** Term cap enforced by shock (Borrego: 10) */
  maxTermCap: number;
  /** Trigger when effort > historicalBand * multiplier */
  triggerMultiplier: number;
}

export interface GrifoContext {
  temple: Temple;
  faucet: Faucet;
  effort: Effort;
  rain: Rain;
  whip: Whip;
}

export const DEFAULT_HISTORICAL_BAND = 4.5;

export function defaultFaucetInflated(): Faucet {
  return { maxTermYears: 30, maxLTV: 0.9, baseRate: 0.025 };
}

export function defaultFaucetBorrego(): Faucet {
  return { maxTermYears: 10, maxLTV: 0.8, baseRate: 0.04 };
}

export function defaultWhip(): Whip {
  return { maxTermCap: 10, triggerMultiplier: 1.5 };
}
