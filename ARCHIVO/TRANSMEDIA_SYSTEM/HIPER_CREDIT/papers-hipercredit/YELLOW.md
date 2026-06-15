---
color: YELLOW
rol: Sustrato formal — grifo-lang, Horn rules, contract-adapters EffortAttestation
audiencia: Formalistas, implementadores NETWORK-ENGINE, devs TypeScript/Bun
status: DRAFT
decisiones: ABIERTAS
dispositivo: HIPER_CREDIT / HiperGrifo — pendiente de fijar
---

# YELLOW — grifo-lang: código para el grifo

*Capa analítica. Primitivas, estados, cláusulas Horn, seam EffortAttestation — sin elegir cadena.*

---

## §0 — Posición en la future-machine

YELLOW habita el **spike `packages/grifo-lang/`** y su destino en **Capa 4 (Grafista)** + sustrato Horn (patrón `draft_01.ts`).

| Componente | Función YELLOW |
|---|---|
| `primitives.ts` | Temple, Faucet, Effort, Rain, Whip |
| `states.ts` | Máquina de estados del grifo |
| `horn.ts` | Licitud; `Next(Whip)` si effort > band |
| `simulate.ts` | Simulación vivienda Borrego maxTerm=10 |
| `contract-adapters` | Seam `EffortAttestation` (SPEC?) |

---

## §1 — Vocabulario fijado

De [`00-LEXICON.md`](./00-LEXICON.md): cinco primitivas, estados, Horn, EffortAttestation, operadores `⊢⊬⊘`.

Términos YELLOW:

| Término | Definición |
|---|---|
| **historicalBand** | Ratio precio/salario de referencia (ej. 4.5×) |
| **Next(Whip)** | Transición a SHOCK_PENDING o COLLAPSE |
| **NOT_ZFC_REGION** | Esfuerzo fuera de dominio licito (patrón draft_01) |
| **EffortAttestation** | Metadata → contrato: prueba de esfuerzo sin doxxing |

---

## §2 — Qué usamos del ecosistema

| Componente | Ruta | Estado |
|---|---|---|
| grifo-lang | `HIPER_CREDIT/packages/grifo-lang/` | Spike READY |
| draft_01.ts | `NETWORK-ENGINE/draft_01.ts` | Patrón Horn |
| contract-adapters | `.../entity-metadata.ts` | Extensión SPEC? |
| escenarios.json | `HIPER_CREDIT/grafo/escenarios.json` | DRAFT |

---

## §3 — grifo-lang desde la lente YELLOW

### 3.1 Primitivas (formal)

```typescript
// Resumen conceptual — fuente: src/primitives.ts
Temple ∈ { HOUSING, WATER, ENERGY }
Faucet = { maxTermYears, maxLTV, baseRate }
Effort = { priceToIncome, paymentToIncome, historicalBand }
Rain = { narrative, effortClaim }
Whip = { maxTermCap, triggerMultiplier }
```

### 3.2 Estados

```
STABLE → INFLATED → SHOCK_PENDING → COLLAPSE → REACCUMULATION | STABLE
```

### 3.3 Cláusulas Horn (implementadas en horn.ts)

| Cláusula | Condición | Cabeza |
|---|---|---|
| `inflate` | Faucet.maxTermYears > 15 ∧ rate < 0.03 | INFLATED |
| `rain_false` | Rain.effortClaim < Effort.priceToIncome | señal Rain |
| `whip_pending` | Effort.priceToIncome > historicalBand × trigger | SHOCK_PENDING |
| **`Next(Whip)`** | state=SHOCK_PENDING ∧ Whip.maxTermCap enforced | COLLAPSE |
| `reaccumulate` | COLLAPSE ∧ no antiFundClause | REACCUMULATION |

### 3.4 Simulación Borrego

`simulate.ts`: parte de esfuerzo 8× salario, aplica `maxTerm=10`, proyecta precio hacia banda 4.5× en N periodos.

### 3.5 Seam EffortAttestation → EVM

```
EffortMetadata (TS) → DomainContract (NE) → attestation on L2
         ↑
   contract-adapters (SPEC?-HC-009)
```

Campos candidatos: `zoneId`, `effortRatioBucket`, `attester`, `timestamp` — sin salario bruto.

---

## §4 — Decisiones abiertas (`SPEC?`)

| ID | Decisión | Opciones | Estado |
|---|---|---|---|
| SPEC?-HC-008 | Schema grafo | antagonistas.json / futures-engine | ABIERTA |
| SPEC?-HC-009 | EffortAttestation | nuevo tipo / genérico entity-metadata | ABIERTA |
| SPEC?-HC-010 | Motor licitud | grifo-lang Horn / Prolog / Solidity | ABIERTA |
| SPEC?-HC-011 | Prioridad Horn | Whip > cuórum HiperIPL / paralelo | ABIERTA |
| SPEC?-HC-012 | antiFundClause | Horn dura / solo RED política | ABIERTA |

---

## §5 — Integración

- `bun run packages/grifo-lang/src/cli.ts` — CLI simulación.
- Validación futura: `engine-plan validate` cuando schema fijado.

---

## §6 — Referencias DRY

- [`00-LEXICON.md`](./00-LEXICON.md)
- [`../packages/grifo-lang/README.md`](../packages/grifo-lang/README.md)
- `NETWORK-ENGINE/draft_01.ts`
