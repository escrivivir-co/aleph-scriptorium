# grifo-lang

Spike **Capa 2** de HIPER_CREDIT: lenguaje mínimo para modelar el grifo crediticio sobre bienes-templo.

## Primitivas

| Primitiva | Descripción |
|---|---|
| `Temple` | HOUSING, WATER, ENERGY |
| `Faucet` | maxTermYears, maxLTV, baseRate |
| `Effort` | priceToIncome, paymentToIncome, historicalBand |
| `Rain` | narrative + effortClaim (detección "lluvia falsa") |
| `Whip` | maxTermCap, triggerMultiplier |

## Estados

`STABLE` → `INFLATED` → `SHOCK_PENDING` → `COLLAPSE` → `REACCUMULATION` | `STABLE`

## Horn

Incluye **`Next(Whip)`** cuando `effort.priceToIncome > historicalBand × triggerMultiplier` y el grifo aplica `maxTermCap` (Borrego: 10 años).

## Uso

```bash
cd ARCHIVO/TRANSMEDIA_SYSTEM/HIPER_CREDIT/packages/grifo-lang
bun install
bun run simulate
# o
bun run src/cli.ts --scenario borrego
bun run src/cli.ts --scenario supply_side --anti-fund
bun run src/cli.ts --scenario status_quo
```

## Relación con papers

- YELLOW.md — especificación formal
- `grafo/escenarios.json` — escenarios ⊢ ⊬ ⊘
- `dossier-hipercredit/03` — degradación templo → mecanismo

## SPEC?

- EffortAttestation seam (`contract-adapters`) — no implementado
- Datos reales de mercado — simulación usa parámetros documentados en `base.md`
