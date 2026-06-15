---
doc: 00-LEXICON
rol: keystone — vocabulario canónico de los papers de colores HIPER_CREDIT
status: DRAFT
decisiones: ABIERTAS
dispositivo: "HIPER_CREDIT / HiperGrifo — pendiente de fijar"
importan: [WHITE, YELLOW, BLUE, RED, GREEN, BLACK]
---

# 00 — LÉXICON: el vocabulario canónico de HiperGrifo

> **Keystone.** Este fichero fija el vocabulario que los seis papers de colores
> importan sin renegociar. Puentea **tres léxicos**: filosófico-político (mapa +
> dossier), conversación de origen (`base.md`), y técnico (grifo-lang / future-machine).

---

## REGLA DE ORO

1. **No se toma ninguna decisión de diseño cerrada.** Todo lo no especificado se marca **`SPEC?`**.
2. **El producto principal es el vocabulario**, no la defensa de Borrego.
3. **Anclaje L2-first sin sobrecompromiso.** contract-adapters, attestations — sin elegir cadena.
4. **No inventar.** Si una pieza no existe, se dice y se marca `gap`.
5. **Nombre:** **HIPER_CREDIT / HiperGrifo — pendiente de fijar** (`SPEC?`).

---

## §A. Léxico filosófico-político [FIL]

### A.1 Grifo vs. templo
**[FIL]** El eje material del crédito: **templo** = bien de primera necesidad; **grifo** = válvula crediticia que inyecta demanda. La captura del grifo es análoga a la captura del centro en HiperIPL.
↔ **[EXT]** metáfora templo/látigo (`base.md`).
↔ **[TEC]** `Temple`, `Faucet` en `grifo-lang`.

### A.2 Effort band
**[FIL]** El precio de la vivienda como función del esfuerzo financiero máximo sostenible (Ryan-Collins, Borrego).
↔ **[TEC]** `Effort`, `historicalBand`.

### A.3 Rain falsa
**[FIL]** Relato de mercado que disfraza daño material ("llueve sostenibilidad", "acceso mejorado").
↔ **[EXT]** "el capital nos mean y dice que llueve".
↔ **[TEC]** `Rain.narrative` vs `Effort.measured`.

### A.4 Whip / shock crediticio
**[FIL]** Intervención que cierra el grifo (ej. maxTerm=10). Fork `⊢` en escenarios.
↔ **[EXT]** látigo de cuerdas / propuesta Borrego.
↔ **[TEC]** `Next(Whip)`, estado `SHOCK_PENDING`.

### A.5 Los tres tribunales
**[FIL]** Marx (¿quién posee el grifo/fondos?), Freud (¿qué sacrificio se reprime?), Marcuse (¿simular sustituye actuar?).
Fuente: `mapa-ilustracion-2.0.md` §1; `dossier-hipercredit/04`.

### A.6 Objeción Blackstone
**[FIL]** Shock que beneficia a fondos con cash en COLLAPSE; REACCUMULATION.
↔ **[TEC]** estado `REACCUMULATION` en `grifo-lang`.

### A.7 Complementariedad HiperIPL
**[FIL]** HiperIPL = voz; HiperGrifo = grifo. Mal parlamento + mal grifo.
Fuente: `dossier-hipercredit/01`.

### A.8 Capa de garantías vs. fines
**[FIL]** Válvulas (`Faucet`, Horn) = analítico; qué es templo = continental (deliberación).
Fuente: `mapa-ilustracion-2.0.md` §9.

---

## §B. Léxico de la conversación de origen [EXT]

### B.1 Los cuatro dominios
**[EXT]** Sistema-mundo, clima, fiscal, vivienda — mismo patrón daño+relato.
↔ **[FIL]** `mapa-financializacion.md`.

### B.2 Borrego
**[EXT]** Interlocutor; propone shock; genealogía heterodoxa.
↔ escenario `⊢` en `grafo/escenarios.json`.

### B.3 Mapa de antagonistas
**[EXT]** Tabla `base.md` §c → `grafo/antagonistas.json`.
Aristas: `DEFENDS_FAUCET`, `BENEFITS_FROM_INFLATION`.

### B.4 Usura / templo evangélico
**[EXT]** Intuición moral; **degradada** a primitivas en dossier `03`.

---

## §C. Léxico técnico grifo-lang [TEC]

### C.1 Las cinco primitivas
| Primitiva | Tipo | Función |
|---|---|---|
| `Temple` | enum | HOUSING, WATER, ENERGY |
| `Faucet` | struct | maxTerm, maxLTV, baseRate |
| `Effort` | struct | priceToIncome, paymentToIncome, historicalBand |
| `Rain` | struct | narrative, effortClaim |
| `Whip` | struct | maxTermCap, triggerThreshold |

Fuente: `packages/grifo-lang/src/primitives.ts`.

### C.2 Estados del grifo
`STABLE` | `INFLATED` | `SHOCK_PENDING` | `COLLAPSE` | `REACCUMULATION`
Fuente: `packages/grifo-lang/src/states.ts`.

### C.3 Horn / Next
Cláusulas de licitud; **`Next(Whip)`** cuando `effort > historicalBand`.
Fuente: `packages/grifo-lang/src/horn.ts`; patrón `NETWORK-ENGINE/draft_01.ts`.

### C.4 EffortAttestation (seam)
**[TEC]** Extensión candidata de `contract-adapters`: attestations de esfuerzo/renta sin doxxing.
**Decisión ABIERTA:** `SPEC?`.

### C.5 Future-machine
**[TEC]** HiperGrifo como caso de uso Capa 4–5: Grafista (escenarios) + simulación.
↔ **[FIL]** complemento de HiperIPL en pipeline 6+2.

### C.6 Operadores de fork
`⊢` shock Borrego | `⊬` supply-side | `⊘` status quo / REACCUMULATION póstuma.
Fuente: `grafo/escenarios.json`; Cartógrafo (heredado de HiperIPL).

### C.7 SPEC? / gaps
Marca canónica de decisión abierta (heredada de `engine-plan`).

---

## §D. Tabla maestra de equivalencias

| Concepto-puente | [FIL] | [EXT] | [TEC] |
|---|---|---|---|
| Bien protegido | templo | vivienda sagrada | `Temple` |
| Crédito como motor | grifo / Minsky | cerrar grifo | `Faucet` |
| Precio ↔ salario | effort band | esfuerzo Borrego | `Effort` |
| Relato falso | lluvia de mercado | "mean y llueve" | `Rain` |
| Shock | látigo / gracia | maxTerm 10 | `Whip` / `Next` |
| Fondos en crisis | objeción Blackstone | tulipán pringa | `REACCUMULATION` |
| Voz del ciudadano | HiperIPL | IPL | iniciativa → nodo |
| Antagonistas | coalición amplia | tabla base.md | `antagonistas.json` |

---

## §E. El dispositivo

- **Nombre:** HIPER_CREDIT / HiperGrifo — `SPEC?`.
- **Reencuadre (FIJO):** caso de uso de la future-machine para **regulación crediticia verificable**, diseñado desde el **nodo azul**, complementario de HiperIPL.
- **Spike:** `packages/grifo-lang/` (Bun/TypeScript).

---

## §F. Disciplina

- Emojis prohibidos salvo operadores `⊢ ⊬ ⊘ ⥱ ⟲ ≈ †`.
- Español, denso, preciso — línea `dossier-hiperipl/`.
- `base.md` **no se edita** (corpus semilla).

*Fin de 00-LEXICON.*
