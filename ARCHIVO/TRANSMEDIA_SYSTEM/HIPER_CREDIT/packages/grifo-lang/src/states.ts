/** Grifo state machine */

export enum GrifoState {
  STABLE = "STABLE",
  INFLATED = "INFLATED",
  SHOCK_PENDING = "SHOCK_PENDING",
  COLLAPSE = "COLLAPSE",
  REACCUMULATION = "REACCUMULATION",
}

export interface StateSnapshot {
  state: GrifoState;
  period: number;
  priceToIncome: number;
  maxTermYears: number;
  note?: string;
}

export function isTerminal(state: GrifoState): boolean {
  return state === GrifoState.REACCUMULATION;
}
