---
color: YELLOW
rol: Sustrato formal — capa de garantías, licitud, álgebra de forks, seam EVM
audiencia: Formalistas, implementadores NETWORK-ENGINE, devs Prolog/Horn, auditors
status: DRAFT
decisiones: ABIERTAS
dispositivo: HiperIPL / HiperILP — pendiente de fijar
---

# YELLOW — Sustrato formal: código para el singular

*Capa analítica. Qué transiciones son lícitas, cómo se calculan forks, cómo el schema del universo se ancla en contratos — sin elegir cadena ni ABI.*

---

## §0 — Posición en la future-machine

YELLOW habita **Capa 4 (Grafista)** y su **sustrato (Nivel 6 / `draft_01.ts`)**. Es la contraparte analítica de la regla del mapa: *código para el singular, palabra para el universal*.

> Alias del plan: `time.ts`. Fuente de verdad real: `NETWORK-ENGINE/draft_01.ts` (`IntervalBounds`, Horn, `class Next`, `NOT_ZFC_REGION`) — ver `00-LEXICON` §G.5.

| Componente | Función YELLOW |
|---|---|
| `draft_01.ts` (Horn + `Next`) | Qué transición de estado es **lícita** |
| Cálculo `⊢⊬⊘⥱⟲≈` | Álgebra de bifurcaciones políticas |
| Schema universo | Nodos `[P-01]`, niveles T, arcos ponderados |
| `contract-adapters` | Seam metadata ↔ EVM |
| `Next` (clase) | Validación formal antes de ejecutar |

El nodo azul **muestra** el grafo; YELLOW **garantiza** que las operaciones sobre él no favorecen a un ocupante del centro.

---

## §1 — Vocabulario fijado

De [`00-LEXICON.md`](./00-LEXICON.md): capa de garantías, time.ts, contract-adapters, operadores de fork, plausibilidad estructural, niveles T-N/T=0/T+∞, credible neutrality, guillotina del protocolo.

Términos YELLOW:

| Término | Definición |
|---|---|
| **Región ZFC** | Dominio formal donde viven las variables de estado del tablero |
| **Cláusula de Horn** | Regla implicativa `condiciones → transición` — base de licitud |
| **Clase Next** | Predicado ejecutable: ¿es lícita esta transición ahora? |
| **Entity metadata** | Objeto en `contract-adapters` que describe entidad antes del contrato |
| **Restricción dura** | Regla no votable (límite eco, derecho fundamental) — candidata a Horn |

---

## §2 — Qué usamos del ecosistema

| Componente | Ruta | Estado en repo |
|---|---|---|
| `contract-adapters` | `NETWORK-ENGINE/packages/contract-adapters/src/` | READY (entity-metadata.ts) |
| NETWORK-ENGINE README | `.../NETWORK-ENGINE/README.md` | L0–L4 documentado |
| Sustrato formal | `NETWORK-ENGINE/draft_01.ts` | ZFC + Horn + `class Next` |
| Plan maestro tablero | `SCRIPTORIUM-CORE/01_PLAN_MAESTRO_TOPDOWN.md` §7 | Referencia conceptual |
| Prolog editor | `registry.json` → `prolog-editor` | SWI-Prolog, templates state-machine |
| futures-engine schema | `futures-engine/SKILL.md` § universo propio | Nodos, arcos, citas |
| mapa.graph.json | `AgentLoreSDK/.../mapa.graph.json` | Precedente de serialización |

---

## §3 — HiperIPL desde la lente YELLOW

### 3.1 Licitud: de `draft_01.ts` al cuórum

El tablero formal pregunta: *¿qué transición es lícita?* HiperIPL traduce:

| Transición protocolaria | Analogía formal |
|---|---|
| Crear iniciativa | `Next(init)` — sin favorito en Core |
| Añadir apoyo | `Next(support)` — una voz, condiciones ABIERTAS |
| Alcanzar cuórum | `Next(quorum_reached)` — **guillotina**: ejecuta sin clemencia |
| Prórroga / gracia | `Next(fork)` o excepción — **no** en regla Horn por defecto |
| Bifurcar distro | `Next(fork)` con operador `⊬` o `⟲` |

**Propuesta no decidida:** codificar límites ecológicos y derechos fundamentales como **cláusulas Horn de mayor prioridad** que el cuórum (ver GREEN).

### 3.2 Álgebra de forks (Cartógrafo → protocolo)

Operadores del `mapa.md` aplicados a iniciativas:

| Op | Lectura HiperIPL | Ejemplo |
|---|---|---|
| `⊢` | Fork aceptado; distro legítima | Comunidad adopta enmienda consensuada |
| `⊬` | Rechazo explícito; "yo no soy yo" | Core rechaza captura; secesión documentada |
| `⊘` | Padre no juzgó; adopción póstuma | Reglas heredadas de IPL estatal sin autora |
| `⥱` | Atribución retroactiva | "Esta distro es la verdadera Ilustración" |
| `⟲` | Dos distros combatiendo mismo linaje | Plutocracia vs 1p1v en gobernanza |
| `≈` | Iniciativas cognadas sin filiación | Dos propuestas similares, autores distintos |

Marx 1882 (*«je ne suis pas marxiste»*) es el **caso fundacional de `⊬`**: rechazo de fork que reclama paternidad.

### 3.3 Schema del universo (futures-engine ↔ HiperIPL)

```yaml
# Propuesta de schema (SPEC?-008 — no adoptada)
node:
  id: string
  level: T-N | T=0 | T+1..T+inf
  text: string          # 1-2 frases
  citations: [P-01, ...]  # o [?] pendiente
edge:
  from: node_id
  to: node_id
  weight: alta | media | baja
  fork_op: ⊢ | ⊬ | ⊘ | ⥱ | ⟲ | ≈ | null
initiative:
  maps_to: node_id      # iniciativa = nodo T=0
  supports: [agent_id]  # apoyos verificables
```

### 3.4 Seam contract-adapters → EVM

Flujo propuesto (no implementado):

```
Entity metadata (TS) → DomainContract (NE) → ABI (EVM)
                              ↑
                    contract-adapters traduce
```

`entity-metadata.ts` hoy describe metadatos de entidad; extensión candidata: **`InitiativeMetadata`**, **`SupportRecord`**, **`ForkRecord`** — SPEC?-009.

---

## §4 — Decisiones abiertas (`SPEC?`)

| ID | Decisión | Opciones | Estado | Quién |
|---|---|---|---|---|
| SPEC?-008 | Schema grafo HiperIPL | futures-engine puro / mapa Cartógrafo / híbrido | ABIERTA | Grafista + PO |
| SPEC?-009 | Extensión contract-adapters | InitiativeMetadata / reutilizar genérico | ABIERTA | NE maintainer |
| SPEC?-010 | Motor de licitud | draft_01.ts/Next / Prolog SWI / Solidity puro | ABIERTA | Formalistas |
| SPEC?-011 | Prioridad Horn | Cuórum > eco / eco > cuórum / paralelo | ABIERTA | RED + GREEN |
| SPEC?-012 | Inmutabilidad vs gracia | Fork solo manual / multisig / gobernanza on-chain | ABIERTA | RED |
| SPEC?-003 | Cadena destino | (ver WHITE) | ABIERTA | — |

---

## §5 — Integración AgentLoreSDK/docs

- **`mapa.graph.json`**: serialización YELLOW del grafo legislativo.
- **`aleph-forks.md`**: capa aleph dedicada a operadores (patrón `yo-no-soy-yo`).
- **Validación:** comando `engine-plan validate {nodo}` cuando exista schema fijado.
- **Prolog:** plugin `prolog-editor` como sandbox de reglas Horn antes de solidificar.

---

## §6 — Referencias DRY

- [`00-LEXICON.md`](./00-LEXICON.md)
- `01_PLAN_MAESTRO_TOPDOWN.md` §6–§7
- `NETWORK-ENGINE/packages/contract-adapters/src/entity-metadata.ts`
- `AgentLoreSDK/.../mapa.md` (tabla operadores)
- `futures-engine/SKILL.md` (Protocolo universo propio)
