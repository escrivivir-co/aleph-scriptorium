#!/usr/bin/env bun
import { Temple } from "./primitives.ts";
import {
  DEFAULT_SIM_PARAMS,
  formatSimulationReport,
  simulateHousing,
} from "./simulate.ts";

function parseArgs(argv: string[]) {
  const opts: Record<string, string | boolean> = {
    term: "10",
    initial: "8",
    band: "4.5",
    periods: "12",
    "anti-fund": false,
    scenario: "borrego",
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--anti-fund") {
      opts["anti-fund"] = true;
    } else if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const val = argv[i + 1];
      if (val && !val.startsWith("--")) {
        opts[key] = val;
        i++;
      }
    }
  }
  return opts;
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  const scenario = String(opts.scenario);

  let maxTerm = Number(opts.term);
  let antiFund = Boolean(opts["anti-fund"]);

  if (scenario === "status_quo") {
    maxTerm = 30;
    antiFund = false;
  } else if (scenario === "supply_side") {
    maxTerm = 30;
    antiFund = true;
  } else if (scenario === "borrego") {
    maxTerm = 10;
    antiFund = false;
  }

  const result = simulateHousing({
    initialPriceToIncome: Number(opts.initial),
    historicalBand: Number(opts.band),
    maxTermYears: maxTerm,
    periods: Number(opts.periods),
    antiFundClause: antiFund,
  });

  console.log(formatSimulationReport(result));
  console.log("");
  console.log(`Temple: ${Temple.HOUSING}`);
  console.log(
    "Uso: bun run src/cli.ts [--scenario borrego|supply_side|status_quo] [--term 10] [--initial 8] [--anti-fund]",
  );
}

main();
