---
color: WHITE
rol: Visión, índice del dossier, puente Ethereum ↔ Scriptorium
audiencia: Comunidad Ethereum, EF, builders L2, investigadores de gobernanza on-chain
status: DRAFT
decisiones: ABIERTAS
dispositivo: HiperIPL / HiperILP — pendiente de fijar
---

# WHITE — HiperIPL como dispositivo de la future-machine

*Paper de visión. Qué es, qué problema ataca, qué tomamos del ecosistema Ethereum y del Scriptorium Aleph — sin cerrar decisiones de diseño.*

---

## §0 — Posición en la future-machine

HiperIPL no es un smart contract aislado: es un **caso de uso** de la future-machine (pipeline 6+2, `engine-plan`) diseñado desde el **nodo azul** (interfaz humano-red / cartografía).

```mermaid
flowchart LR
    subgraph ingest [Capas 1-3]
        L1[Loreador: piezas legislativas]
        L2[Bartleby/Archivero: corpus]
    end
    subgraph graph [Capa 4-5]
        L4[Grafista: grafo iniciativas+forks]
        L5[Demiurgo: universos de escenario]
    end
    subgraph surface [Capa 6 + UI]
        L6[Dramaturgo: consecuencias]
        UI[Nodo azul: Nave HiperIPL]
    end
    ingest --> graph --> surface
    ETH[L2 / attestations / adapters] -.-> L4
```

- **Capas 1–3:** ingestión del debate legislativo (textos, transcripciones, medios) → `corpus`.
- **Capa 4:** `@Grafista` produce el grafo de iniciativas, apoyos y bifurcaciones (`grafo/*.json`), con operadores de fork `⊢ ⊬ ⊘ ⥱ ⟲ ≈`.
- **Capa 5–6:** escenarios de consecuencia (futures-engine) y tratamiento dramático — *qué pasa si* esta iniciativa alcanza cuórum o bifurca.
- **Nodo azul:** la ciudadanía **navega** el mapa; no lo posee.

Desde WHITE se ve el **contorno entero**: Ethereum aporta capa de anclaje y garantías; Scriptorium aporta pipeline, cartografía y UI.

---

## §1 — Vocabulario fijado

Importado de [`00-LEXICON.md`](./00-LEXICON.md):

| Término | Uso en WHITE |
|---|---|
| **Ilustración 2.0** | Marco: segunda salida ciudadano → agente protocolario |
| **Capa de voz** | Lo que HiperIPL construye (mal parlamento de la 2.0) |
| **Future-machine** | Arquitectura host del dispositivo |
| **Nodo azul** | Superficie de lectura para humanos |
| **Hiperplaza** | Metáfora operativa: plaza persistente, horizontal |
| **L2-first** | Orientación de anclaje, sin cadena fijada |
| **Credible neutrality** | Criterio de legitimidad del Core |

Términos propios WHITE:

| Término | Definición |
|---|---|
| **Dispositivo** | HiperIPL como módulo plug-in de la future-machine, no producto monolítico |
| **Forja dual** | Escritura en `papers-hiperipl/` + integración futura en `AgentLoreSDK/docs` y `contract-adapters` |

---

## §2 — Qué usamos del ecosistema

### Ethereum / L2 (vocabulario y piezas candidatas)

| Pieza | Rol propuesto | Estado |
|---|---|---|
| Rollup / L2 | Anclaje de compromisos, registro de iniciativas | ABIERTA (SPEC?-003) |
| Smart contracts | Cuórum, plazos, tesorería de iniciativa | ABIERTA |
| ERC-4337 (account abstraction) | Identidad de participante sin exponer claves | ABIERTA (SPEC?-004) |
| EAS / attestations | "Soy persona", "soy del territorio" sin doxxing | ABIERTA |
| Financiación cuadrática | Intensidad de muchos vs capital de pocos | ABIERTA |
| The DAO fork (2016) | Precedente de "gracia" comunitaria | FIJO (histórico) |

### Scriptorium Aleph (`integration/beta/scriptorium`)

| Componente | Ruta | Rol en HiperIPL |
|---|---|---|
| **NETWORK-ENGINE** | `ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-CORE/NETWORK-ENGINE/` | Orquestación, pubsub, MCP |
| **contract-adapters** | `.../packages/contract-adapters` | Seam entidad ↔ contrato |
| **draft_01.ts** (alias plan: time.ts) | `NETWORK-ENGINE/draft_01.ts` | Licitud de transiciones (ZFC + Horn + `Next`) |
| **futures-engine** | `DocumentMachineSDK/.github/skills/futures-engine/SKILL.md` | Bifurcación de escenarios |
| **engine-plan** | `DocumentMachineSDK/.github/skills/engine-plan/SKILL.md` | Diagnóstico pipeline, SPEC? |
| **Cartógrafo / mapa forks** | `AgentLoreSDK/docs/biblioteca/yo-no-soy-yo-propositions-engine/` | Modelo de grafo político |
| **Nodo azul** | `DocumentMachineSDK/docs/azul/cuadernos/` | UI cartográfica |
| **arg-board + BOE** | `.github_V1/plugins/registry.json` → `arg-board`, `network` | Registro canónico + sync Oasis |
| **ScriptoriumVps** | `ScriptoriumVps/README-SCRIPTORIUM.md` | Despliegue Node-RED, MCP, Verdaccio |
| **BlockchainComPort / ECOIN** | `BlockchainComPort/` | Capa token experimental (no adoptada) |
| **TRANSMEDIA_SYSTEM** | `ARCHIVO/TRANSMEDIA_SYSTEM/` | Tablero ARG host del dispositivo |

---

## §3 — HiperIPL desde la lente WHITE

### Tesis

> **HiperIPL es el órgano de voz de la Ilustración 2.0, implementado como dispositivo cartográfico de la future-machine — no como "blockchain de firmas" ni como teología del Logos.**

El diagnóstico (`mapa` §5, `dossier-hiperipl/01`): la Ilustración 2.0 tiene buena **carta de derechos** (garantías criptográficas) y mal **parlamento** (voz capturada o inexistente). HiperIPL ataca el segundo.

### Qué hace (artefacto)

1. **Proponer** — iniciativa sin portero (anti-zigurat, anti-templo).
2. **Persistir** — memoria inmutable de quién advirtió (anti-parlamento que archiva).
3. **Apoyar** — firma/atestación sin doxxing completo.
4. **Cartografiar** — grafo de posiciones y forks navegable (nodo azul).
5. **Bifurcar** — distro como derecho de gracia, no como secesión permanente (ver RED).

### Qué NO es

- No es el Reino / atrio teológico (error EXTERNO).
- No es sustituto de acción en territorio (riesgo anestésico → GREEN).
- No es predicción: futures-engine **bifurca**, no forecast.

### Puente para audiencia Ethereum

Vitalik (`d/acc`, network states): HiperIPL comparte **cuna** con NRx (exit, infra compartida) pero elige **voz + exit-to-community**, no CEO-monarca. Es neokantiano en espíritu: condiciones de posibilidad de cooperación, publicidad del código, humanidad como fin.

La IA (fiscal del juicio): no corre *en* HiperIPL; **responde ante** él — la cadena como constitución, no como motor de inferencia.

---

## §4 — Decisiones abiertas (`SPEC?`)

| ID | Decisión | Opciones expuestas | Estado | Quién |
|---|---|---|---|---|
| SPEC?-001 | Nombre | HiperIPL / HiperILP | ABIERTA | PO |
| SPEC?-002 | Persistencia BOE | L2 / Oasis / híbrido / IPFS+anclaje | ABIERTA | Arquitectura |
| SPEC?-003 | Rollup/cadena | Optimism, Base, Arbitrum, L2 propio, testnet | ABIERTA | Comunidad |
| SPEC?-004 | Identidad/voto | 1p1v / token / attestations / zk | ABIERTA | Diseño + Marx |
| SPEC?-006 | Scope MVP | Solo cartografía off-chain / registro on-chain / gobernanza completa | ABIERTA | PO + engine-plan |
| SPEC?-007 | Relación ECOIN | Ignorar / puente experimental / tesorería local | ABIERTA | PO |

---

## §5 — Integración AgentLoreSDK/docs

Propuesta de caso de uso (no implementada):

```
AgentLoreSDK/docs/biblioteca/hiperipl/
  mapa.md              # cartografía de iniciativas (como yo-no-soy-yo)
  mapa.graph.json      # grafo machine-readable
  alephs/              # capas modulares (forks, actores, límites)
  itinerarios/         # sesiones de deliberación
  parking/nave/        # UI nodo azul derivada de docs/azul
```

El **Cartógrafo** existente (`yo-no-soy-yo-propositions-engine`) es el **patrón**: HiperIPL replica el pipeline corpus → eigenstates → forks → Nave, con corpus = deliberación legislativa en lugar de hilo Twitter.

---

## §6 — Referencias DRY

- [`00-LEXICON.md`](./00-LEXICON.md)
- [`dossier-hiperipl/`](../dossier-hiperipl/)
- [`mapa-ilustracion-2.0.md`](../mapa-ilustracion-2.0.md)
- `https://github.com/escrivivir-co/aleph-scriptorium.git`
- Vitalik: d/acc, network states (2022–2025)
