# Análisis previo — Soporte de embeddings para lore-db (DocumentMachineSDK)

> **Fecha:** 22-abr-2026
> **Autor:** GPT-5.4 (GitHub Copilot)
> **Estado:** análisis exploratorio antes de planificar dossieres
> **Carpeta de trabajo:** `sala/PLAN-VECTOR/`

## 1. Encuadre

La petición tiene tres piezas que conviene separar antes de planificar:

1. **Infraestructura**: vector DB en docker para `lore-db` del SDK `DocumentMachineSDK`.
2. **MCP server**: nuevo `MCPLoreDBServer.ts` siguiendo el patrón de [MCPPrologServer.ts](MCPGallery/mcp-mesh-sdk/src/MCPPrologServer.ts) y [MCPLauncherServer.ts](MCPGallery/mcp-mesh-sdk/src/MCPLauncherServer.ts), con `Pieza` y `LORE_F` como template resources.
3. **Sincronización agéntica**: scripts git-aware para sync md ↔ vectors, lógica para construir LORE_F (índices/agregados) trabajando con el agente.

Anclas reales del SDK encontradas:

- Tipos de pieza canónicos: **P, S, N, T, R, F** (Personajes, Sociales, Noticias, Temporales, Recursos, Fichas-agregado) — ver [DocumentMachineSDK/README.md](DocumentMachineSDK/README.md#L22) y `engine-log-2026-04-20-001032.md`.
- IDs estables: `P-01`, `S-13`, `LORE_F-02`, etc. El grafo y aguas abajo (universo, cortos) ya operan **solo con IDs** — la decisión del PO es ancla dura.
- Pipeline existente: `Loreador → Archivero → Grafista → Demiurgo → Dramaturgo`.
- Patrón MCP server en [MCPGallery/mcp-mesh-sdk/src/](MCPGallery/mcp-mesh-sdk/src/): `BaseMCPServer` + `setupTools/Resources/Prompts` + `AlephScriptClient` (Socket.IO mesh).
- Mods activos: cada `mod/[nombre]` tiene su propio corpus (ej. `mod/legislativa`).

## 2. ¿Tiene sentido la idea?

**Sí**, y encaja con la arquitectura actual sin romper invariantes:

- El grafo sigue usando IDs como única moneda (✓ no se rompe).
- El vector store es **lateral**: capa de búsqueda semántica sobre piezas, no parte del flujo de generación de cortos.
- MCP server da acceso uniforme a múltiples agentes (Loreador, Archivero, Grafista, Demiurgo, Cristalizador) sin acoplarlos al backend concreto.
- Encaja con el patrón Euridice/Socket.IO de `MCPPrologServer` para integración mesh.

## 3. Recomendación de stack (latest, abr-2026)

| Componente | Recomendación primaria | Alternativas | Por qué |
|---|---|---|---|
| Vector DB | **Qdrant** (Rust, docker-compose) | Chroma, LanceDB embebido, pgvector | Cliente JS/TS estable, payload filtering rico (filter por `tipo`, `mod`, `lore_f_id`), búsqueda híbrida (denso + sparse) nativa, escala de miles de docs sobrada, healthcheck simple |
| Embeddings | **Ollama** local con `bge-m3` o `nomic-embed-text` | `text-embedding-3-small` (OpenAI), `multilingual-e5-large` | Local-first (coherente con `BlockchainComPort` y `Pacto de Maximización` del SDK), multilingüe ES/EN, dockerizable, sin coste por request |
| Cliente | `@qdrant/js-client-rest` | — | TS nativo, encaja en `mcp-mesh-sdk` |

Chroma quedó atrás vs Qdrant en filtrado por payload y búsqueda híbrida. Si el PO prefiere Chroma por familiaridad, sigue siendo viable; el adaptador en el MCP server puede aislarlo.

Investigación complementaria ya abierta para variante sin Docker: `sala/PLAN-VECTOR/PUNTO-INVESTIGACION-SIN-DOCKER.md`.

## 4. Gaps detectados (antes de planificar)

Estos son los puntos donde **necesito decisión del PO** o donde el plan actual no cubre algo crítico:

### G1 — Granularidad del embedding
Una pieza P o N es corta; una pieza T (fase temporal) puede ser larga. ¿1 pieza = 1 vector, o chunking con `parent_id`? Decisión afecta calidad de recall.

### G2 — ¿LORE_F lleva su propio embedding?
El log dice que `LORE_F.md` es "hilo narrativo compuesto que referencia 44 piezas". Dos opciones:
- **(a)** LORE_F = solo índice de IDs → "buscar por LORE_F" = filtro `pieza_id IN (lore_f.ids)` + similarity dentro. Sin vector propio.
- **(b)** LORE_F tiene narrativa propia → vectorizar el agregado además del índice.

La descripción del usuario sugiere (b), pero merece confirmación.

### G3 — Sincronización git-aware: trigger y delete policy
- ¿Qué dispara el sync? Hook post-commit, MCP tool manual, ambos?
- Pieza borrada del disco → ¿soft-delete (marca `deleted_at`) o hard-delete del vector?
- Pieza renombrada (cambia filename pero mismo ID en frontmatter) → detectar por ID, no por path.

### G4 — Identidad canónica de la pieza
¿El ID canónico vive en el **frontmatter** del `.md` o se deriva del **filename**? Sin contrato explícito, un rename invalidaría vectores. Recomendación: frontmatter como fuente, filename como índice cacheable.

### G5 — Versionado del modelo de embedding
Si cambia el modelo (ej. `bge-m3 → bge-m4`), hay que reindexar todo. Cada vector debe llevar `model_version`. Falta política de migración.

### G6 — Multi-mod: aislamiento
Cada `mod/[nombre]` tiene su corpus. Opciones:
- Una colección Qdrant por mod (`lore_mod_legislativa`, `lore_mod_X`).
- Una colección con campo `mod` en payload y filtro obligatorio.

Recomiendo **colección por mod** para evitar fugas accidentales entre lores.

### G7 — Búsqueda híbrida (denso + lexical)
Vector puro falla con nombres propios, IDs literales (`P-04`), citas exactas. Qdrant soporta híbrido (BM25 + denso) desde 2024. Decisión: ¿lo activamos desde v1 o lo dejamos para v2?

### G8 — Contrato de consumo por agente
"Distintos agentes pueden buscar por piezas o por lore_f" requiere listar **qué tool usa cada agente** y **qué shape de respuesta espera**:
- Loreador: `sync_from_git`, `index_pieza`, `validate_inventory`.
- Archivero: `search_piezas`, `diff_pieza_vs_corpus`.
- Grafista: `get_pieza_by_id` (resolver IDs → contexto enriquecido).
- Demiurgo: `search_in_lore_f`, `expand_lore_f` (devuelve piezas referenciadas + similares).
- Cristalizador: `find_emerging_clusters` (similarity sin query, descubrimiento).

### G9 — Versionado de LORE_F (rev-044…)
LORE_F evoluciona en el tiempo (visto `LORE_F-rev-044.md`). ¿La DB guarda solo HEAD o histórico? Afecta búsqueda longitudinal.

### G10 — Integración con tasks.json y Launcher
¿El stack docker arranca con `SCP: Start Full Stack`? ¿Se registra en `MCPLauncherServer` como un servidor más, o queda fuera del Launcher por ser servicio Docker (no proceso node)? Conviene definir healthcheck HTTP que el Launcher pueda pollear.

### G11 — Resources MCP: ¿contenido completo o referencia?
Los resources `Pieza` y `LORE_F` como template, ¿devuelven el `.md` completo o un resumen + IDs? Token budget importa para Copilot context.

### G12 — Cardinalidad real
Mock actual: 51 piezas en `mod/legislativa`. Producción razonable: bajos miles por mod, decenas de mods → ~50k vectores totales. Confirma que Qdrant es overkill suficiente y descarta Milvus/Weaviate.

## 5. Propuesta de descomposición (para validar antes de generar dossieres)

Sugiero **4 dossieres tipo `DocumentMachineSDK`** (escritos en `sala/PLAN-VECTOR/dossiers/`):

| Dossier | Foco | Salida principal |
|---|---|---|
| **PV-A** `lore-vector-db-infra` | Docker-compose Qdrant + Ollama, healthcheck, multi-mod namespacing, integración con `tasks.json`/Launcher (G6, G10, G12) | `docker-compose.lore-db.yml`, doc de arranque, decisión modelo embedding |
| **PV-B** `mcp-lore-db-server` | `MCPLoreDBServer.ts` con tools/resources/prompts, bot Socket.IO mesh, template Pieza + LORE_F (G2, G7, G11) | `MCPGallery/mcp-mesh-sdk/src/MCPLoreDBServer.ts` + config |
| **PV-C** `lore-sync-pipeline` | Script git-aware, parser frontmatter, identidad pieza, versionado modelo, soft-delete, rename-detection (G1, G3, G4, G5, G9) | `scripts/lore-sync.ts` + tool MCP `sync_from_git` |
| **PV-D** `agentes-consumidores-vector` | Contratos por agente (Loreador, Archivero, Grafista, Demiurgo, Cristalizador), ejemplos de uso, prompts MCP (G8) | Actualización de `*.agent.md` + prompts MCP |

Dependencias:
- PV-A → bloquea PV-B, PV-C
- PV-B → bloquea PV-D
- PV-C → bloquea PV-D parcial (sync requerido para Loreador)

## 6. Decisiones que pido al PO antes de generar dossieres

1. **¿Qdrant o Chroma?** (recomiendo Qdrant)
2. **¿Embeddings locales (Ollama) o API (OpenAI)?** (recomiendo Ollama local)
3. **¿LORE_F vectorizado además de índice, o solo índice?** (G2 — recomiendo (b) vectorizar agregado)
4. **¿Multi-mod = colección por mod, o colección única con filtro?** (G6 — recomiendo por mod)
5. **¿Búsqueda híbrida desde v1?** (G7 — recomiendo sí, es 1 línea extra de config)
6. **¿4 dossieres como propongo, o agrupar/dividir distinto?**
7. **¿El stack docker se gestiona desde el Launcher MCP o queda como servicio independiente?** (G10)

Una vez validado esto, genero los dossieres con el scaffold canónico (`PLAN.md`, `BACKLOG.md`, `RESPUESTAS.md`, `activacion.prompt.md`, `tasks/`) y el backlog raíz `sala/PLAN-VECTOR/BACKLOG.md` que indexe los 4 tracks.
