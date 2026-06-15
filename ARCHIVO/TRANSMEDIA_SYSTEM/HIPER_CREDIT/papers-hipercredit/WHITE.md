---
color: WHITE
rol: Visión, índice, puente Ethereum ↔ Scriptorium ↔ HiperIPL
audiencia: Comunidad Ethereum, builders L2, economistas heterodoxos, investigadores vivienda
status: DRAFT
decisiones: ABIERTAS
dispositivo: HIPER_CREDIT / HiperGrifo — pendiente de fijar
---

# WHITE — HiperGrifo como dispositivo de la future-machine

*Paper de visión. Qué es, qué problema ataca, complementariedad con HiperIPL, puente Ethereum — sin cerrar decisiones.*

---

## §0 — Posición en la future-machine

HiperGrifo no es un protocolo DeFi aislado: es un **caso de uso** de la future-machine (pipeline 6+2) para **regulación crediticia verificable**, diseñado desde el **nodo azul**, **complementario** de HiperIPL.

```mermaid
flowchart LR
    subgraph ingest [Capas 1-3]
        L1[Loreador: debates vivienda/clima/fiscal]
        L2[Archivero: corpus base.md + dossier]
    end
    subgraph graph [Capa 4-5]
        L4[Grafista: antagonistas + escenarios]
        L5[Demiurgo: simulación grifo-lang]
    end
    subgraph surface [Capa 6 + UI]
        L6[Dramaturgo: consecuencias shock]
        UI[Nodo azul: shock slider + mapa Rain]
    end
    subgraph sibling [Hermano]
        IPL[HiperIPL: voz / iniciativas]
    end
    ingest --> graph --> surface
    IPL -.->|iniciativa antes de Whip| graph
    ETH[L2 / EffortAttestation] -.-> L4
```

- **Capas 1–3:** corpus (`base.md`, medios, datos esfuerzo/renta).
- **Capa 4:** grafo `antagonistas.json`, `escenarios.json` (`⊢ ⊬ ⊘`).
- **Capa 5–6:** simulación vivienda (`grifo-lang`), narrativa de consecuencias.
- **HiperIPL:** voz que propone cerrar el grifo; HiperGrifo ejecuta válvulas si el diseño lo permite (`SPEC?`).

---

## §1 — Vocabulario fijado

Importado de [`00-LEXICON.md`](./00-LEXICON.md):

| Término | Uso en WHITE |
|---|---|
| **Temple / Faucet / Effort / Rain / Whip** | Cinco primitivas del grifo |
| **HiperIPL** | Artefacto hermano (voz) |
| **Rain falsa** | Patrón transversal cuatro dominios |
| **Ilustración 2.0** | Marco: mal grifo + mal parlamento |
| **L2-first** | Orientación anclaje EffortAttestation |

---

## §2 — Qué usamos del ecosistema

### Ethereum / L2

| Pieza | Rol propuesto | Estado |
|---|---|---|
| Attestations (EAS) | EffortAttestation: renta/zona sin doxxing | ABIERTA (SPEC?-HC-004) |
| Smart contracts | Parámetros Faucet inmutables post-cuórum | ABIERTA |
| L2 rollup | Registro de bandas históricas y shocks | ABIERTA (SPEC?-HC-003) |
| Financiación cuadrática | Deliberación HiperIPL sobre shock | ABIERTA |

### Scriptorium Aleph

| Componente | Ruta | Rol en HiperGrifo |
|---|---|---|
| **grifo-lang** | `HIPER_CREDIT/packages/grifo-lang/` | Spike Capa 2: primitivas + simulación |
| **contract-adapters** | `NETWORK-ENGINE/packages/contract-adapters` | Seam EffortAttestation |
| **draft_01.ts** | `NETWORK-ENGINE/draft_01.ts` | Patrón Horn/`Next` |
| **futures-engine** | `futures-engine/SKILL.md` | Escenarios `grafo/escenarios.json` |
| **HiperIPL papers** | `HIPER_ILP/papers-hiperipl/` | Patrón de colores, LEXICON |
| **Nodo azul** | `DocumentMachineSDK/docs/azul/` | Shock slider UI (BLUE) |

---

## §3 — HiperGrifo desde la lente WHITE

### Tesis

> **HiperGrifo es el órgano de crédito-regulado de la Ilustración 2.0 — complemento de HiperIPL — implementado como dispositivo cartográfico y simulable, no como sermón del templo.**

Diagnóstico (`mapa-financializacion.md`): en cuatro dominios, daño real + relato de lluvia. En vivienda, el mecanismo es el grifo hipotecario.

### Qué hace

1. **Medir** — `Effort` vs banda histórica.
2. **Regular** — `Faucet` (plazo, LTV, tipo).
3. **Detectar** — `Rain` falsa cuando narrativa ≠ dato.
4. **Simular** — escenarios `⊢ ⊬ ⊘` con Borrego maxTerm=10.
5. **Cartografiar** — antagonistas que `DEFENDS_FAUCET` / `BENEFITS_FROM_INFLATION`.

### Qué NO es

- No es la exégesis de Juan 2 (error del corpus sin degradar).
- No es solo Borrego: supply-side `⊬` permanece abierto.
- No sustituye vivienda pública ni ocupación.

### Puente Ethereum

Vitalik (d/acc): HiperGrifo comparte infra con DeFi pero elige **válvulas verificables** sobre **yield para fondos**. La cadena registra parámetros del grifo; no especula con el templo.

---

## §4 — Decisiones abiertas (`SPEC?`)

| ID | Decisión | Opciones | Estado |
|---|---|---|---|
| SPEC?-HC-001 | Nombre | HIPER_CREDIT / HiperGrifo | ABIERTA |
| SPEC?-HC-002 | Relación HiperIPL | Módulo hermano / mismo Core / independiente | ABIERTA |
| SPEC?-HC-003 | Cadena anclaje | L2 existente / testnet / off-chain BOE | ABIERTA |
| SPEC?-HC-004 | EffortAttestation | EAS / zk / off-chain | ABIERTA |
| SPEC?-HC-005 | Activación Whip | Automático Horn / cuórum HiperIPL / regulador | ABIERTA |

---

## §5 — Integración AgentLoreSDK/docs (propuesta)

```
AgentLoreSDK/docs/biblioteca/hipercredit/
  mapa.md
  mapa.graph.json      # antagonistas + escenarios
  alephs/              # Temple, Rain, Blackstone
  parking/nave/        # shock slider UI
```

---

## §6 — Referencias DRY

- [`00-LEXICON.md`](./00-LEXICON.md)
- [`dossier-hipercredit/`](../dossier-hipercredit/)
- [`mapa-financializacion.md`](../mapa-financializacion.md)
- [`../HIPER_ILP/mapa-ilustracion-2.0.md`](../HIPER_ILP/mapa-ilustracion-2.0.md)
- [`../base.md`](../base.md) (corpus, no editar)
