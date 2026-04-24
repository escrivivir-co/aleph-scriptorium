# Contrato MCP v1 — `vector-machine`

> **Promovido al dossier:** 2026-04-24 por Aleph (orquestador, GPT-5.x)
> **Origen:** `sala/agente-opa/candidato-contrato-mcp-v1-vector-machine.md` (autor: Opa, Claude Opus 4.7)
> **Task de origen:** `VM-01` (cerrada)
> **Fuente complementaria:** `RESPUESTAS.md §Gates V1 — cerrados` (gates G-1..G-8 cerrados por el PO)
> **Naturaleza:** referencia técnica del dossier — ratifica frontera; **no** define tools ni puertos definitivos. Las decisiones que cerraron los gates viven en `RESPUESTAS.md`.

---

## 0. Propósito y no-propósito

**Este documento ratifica la frontera funcional** entre tres capas que ya existen o están previstas para `vector-machine`, fija el conjunto mínimo de operaciones que la fachada MCP v1 debe poder cubrir conceptualmente, y enumera las decisiones que siguen explícitamente abiertas como *gates* antes de implementar.

**Lo que este documento NO hace:**

- No fija nombres definitivos de tools, resources o prompts MCP.
- No fija puerto del servidor ni lo registra en `.vscode/mcp.json`.
- No prescribe lenguaje de implementación interna del servidor (Node.js vs Python).
- No abre backlog de implementación: eso vive en `BACKLOG.md` (bloque `VMI-*`).
- No promete compatibilidad simultánea con todos los consumidores.

---

## 1. Las tres capas y su frontera

```
┌────────────────────────────────────────────────────────────────────┐
│  CAPA C — Fachada MCP v1 (FUTURA, dentro de MCPGallery/mcp-mesh)   │
│  • Servidor MCP propio del Scriptorium                             │
│  • Hereda de BaseMCPServer (patrón mcp-mesh-sdk)                   │
│  • Único punto de entrada agéntico desde Copilot Chat              │
│  • Encapsula lifecycle del stack + operaciones de indexación/QA    │
└────────────────────────────────────────────────────────────────────┘
                              ▲ contrato MCP (v1)
                              │
┌────────────────────────────────────────────────────────────────────┐
│  CAPA B — Plugin `vector-machine` (Scriptorium, ya existe v0)      │
│  • `.github/plugins/vector-machine/` (manifest, instructions, docs)│
│  • Bridge: `.github/agents/plugin_ox_vectormachine.agent.md`       │
│  • Discovery, rutas DRY, ontología                                 │
│  • Mientras CAPA C no exista: orienta y documenta; no ejecuta      │
└────────────────────────────────────────────────────────────────────┘
                              ▲ invoca / orquesta
                              │
┌────────────────────────────────────────────────────────────────────┐
│  CAPA A — Stack `VectorMachineSDK` (submódulo, operativo)          │
│  • Docker Compose: Ollama + ChromaDB + QA API + wiki + Open WebUI  │
│  • `etl/` (ingestión), `qa/` (FastAPI), `wiki/` (MkDocs)           │
│  • Scripts `init*`, `health*`, `logs*`                             │
│  • Ejecuta el trabajo real; expone HTTP/REST + filesystem          │
└────────────────────────────────────────────────────────────────────┘
```

### 1.1 Qué pertenece a cada capa (ratificado)

| Responsabilidad | Capa A (stack) | Capa B (plugin) | Capa C (MCP v1) |
|-----------------|:--------------:|:---------------:|:---------------:|
| Embeddings, vector store, LLM Ollama | ✅ | — | — |
| Ingestión real (parse, chunk, embed) | ✅ | — | — |
| Almacén persistente Chroma | ✅ | — | — |
| API HTTP/REST de Q&A | ✅ | — | — |
| Lifecycle Docker (up/down/health) | ✅ ejecuta | — | ✅ orquesta |
| Manifest, ontología, DRY de rutas | — | ✅ | — |
| Bridge agéntico (`@vector-machine`) | — | ✅ | — |
| Documentación de contrato y patrones | — | ✅ | — |
| Punto de entrada MCP único para Copilot | — | — | ✅ |
| Encapsular CapaA+B en tools agénticas | — | — | ✅ |
| Multi-tenant ("proyectos indexables") | — | (registro) | ✅ |

### 1.2 Reglas de no-cruce (frontera dura)

- **Capa C nunca duplica lógica de Capa A.** Si Chroma/Ollama ya hace algo, la fachada lo invoca; no reimplementa.
- **Copilot Chat solo entra por Capa C.** El acceso directo a `VectorMachineSDK/` en Capa A queda permitido para inspección, diseño y operación humana, pero no es la solución de integración agéntica.
- **El plugin de Capa B no ejecuta indexaciones por sí mismo.** Mientras Capa C no exista, su rol es orientar; cuando exista, su rol es bridge.
- **Capa A no conoce a las Capas B/C.** El submódulo permanece self-contained: cualquier acoplamiento a Scriptorium vive en B o C.

---

## 2. Operaciones mínimas que la v1 debe cubrir (sin nombrar tools)

Agrupadas por dominio funcional. Cada operación es lo que el agente debe poder *pedirle* a la fachada; cómo se nombre la tool en el manifest MCP queda para la implementación.

### 2.1 Dominio: Lifecycle del stack

- Arrancar el stack (Ollama + Chroma + QA + wiki) en modo local.
- Parar el stack de forma limpia.
- Consultar salud (`up`/`down`/`degraded`) de cada componente.
- Recuperar logs recientes de un componente concreto para diagnóstico.

### 2.2 Dominio: Gestión de "proyectos indexables"

> Un *proyecto indexable* es la unidad lógica que la v1 acuerda como tenant: una ruta + identidad + namespace en Chroma (o equivalente DeepWiki — ver Gate G-1 en `RESPUESTAS.md`).

- Registrar un proyecto indexable.
- Listar proyectos registrados.
- Consultar metadatos de un proyecto.
- Desregistrar un proyecto.

### 2.3 Dominio: Indexación

- Indexar (o reindexar) un proyecto ya registrado.
- Consultar progreso de una indexación en curso.
- Cancelar una indexación en curso (best-effort; v1 puede no garantizarlo — ver Gate G-2).

### 2.4 Dominio: Consulta semántica / RAG

- Buscar fragmentos similares (search puro, sin LLM).
- Preguntar con respuesta generada (RAG completo: retrieval + LLM Ollama).
- Inspeccionar la traza del retrieval (chunks usados, scores) para auditabilidad.

### 2.5 Dominio: Inspección y diagnóstico

- Listar modelos disponibles en el Ollama local.
- Estadísticas básicas del store Chroma (nº colecciones, tamaño aproximado).

> **Nota:** este conjunto es la *envolvente funcional mínima*. La v1 puede cubrirlo todo o un subconjunto, pero todo lo que quede fuera debe quedar registrado como gate (§3 + `RESPUESTAS.md`).

---

## 3. Decisiones abiertas — *gates* antes de implementar

> **Estado al promover (2026-04-24):** los 8 gates G-1..G-8 están **cerrados** por el PO. Las respuestas viven en `RESPUESTAS.md §Gates V1 — cerrados`. Esta sección se conserva como índice doctrinal del razonamiento original de VM-01.

### G-1. Forma del "proyecto indexable" como entidad

- ¿Identidad libre (slug) o esquema con namespace jerárquico?
- ¿Persistencia del registro vive en Chroma, en DeepWiki, en filesystem del submódulo, o en un store propio?

### G-2. Subconjunto v1 del catálogo de operaciones de §2

- ¿La v1 cubre los 5 dominios o solo lifecycle + indexación + consulta?
- ¿La v1 garantiza cancelación de indexación o queda como best-effort/post-v1?

### G-3. Lenguaje y arquitectura interna del servidor MCP

- Node.js (alineado con resto de mcp-mesh-sdk) llamando a la API FastAPI de `qa/` por HTTP, vs Python alojando lógica directa contra Chroma/Ollama.

### G-4. Puerto y registro en la mesh

- Asignación de puerto definitivo.
- Cuándo añadirlo a `.vscode/mcp.json`.

### G-5. Autenticación, multi-usuario y aislamiento

- Single-user local sin auth vs tokens/headers desde ya.
- Aislamiento entre proyectos indexables a nivel Chroma.

### G-6. Consumidor de validación de la v1

- Primer consumidor real que valida el contrato end-to-end.

### G-7. Política de reindexación

- Reindexación completa vs incremental.

### G-8. Errores, contratos de respuesta y observabilidad

- Forma estándar de errores en las tools.
- Operaciones largas: síncronas, asíncronas con job-id, o streaming.

---

## 4. Criterios de aceptación para la implementación futura

Cuando llegue la implementación (bloque `VMI-*` en `BACKLOG.md`), estos criterios permiten decir que la v1 quedó construida dentro de la frontera ratificada aquí:

1. **El servidor MCP vive bajo `MCPGallery/mcp-mesh-sdk/`** y hereda del patrón `BaseMCPServer`, sin alojarse en otro lugar del workspace.
2. **No hay lógica de Chroma/Ollama duplicada en Capa B ni Capa C**; toda la operativa real sigue resolviéndose contra los servicios del stack de Capa A.
3. **Toda operación expuesta** por la v1 cae dentro del catálogo de §2 o queda explícitamente justificada como añadido posterior al cierre de los gates.
4. **Cada gate de §3 tiene una decisión registrada** (en `RESPUESTAS.md`) antes de implementar. ✅ (al promover este documento)
5. **Existe al menos un consumidor real** (G-6) que ejerce el contrato end-to-end: registrar proyecto → indexar → consulta semántica → respuesta RAG verificable.
6. **El plugin de Capa B se actualiza** para apuntar a la fachada cuando exista, sin reabrir la frontera.
7. **No se introduce regresión** en `VectorMachineSDK/README-SCRIPTORIUM.md` ni en `vector-machine.instructions.md`.
8. **El registro en `.vscode/mcp.json`** se hace solo cuando el servidor está realmente arrancable.

---

## 5. Anclas leídas para esta ratificación

- `sala/dossiers/vector-machine/PLAN.md`
- `sala/dossiers/vector-machine/ref/INDEX.md`
- `sala/dossiers/vector-machine/tasks/TASK-01_FRONTERA_CONTRATO_MCP_V1.md`
- `VectorMachineSDK/README-SCRIPTORIUM.md`
- `.github/plugins/vector-machine/instructions/vector-machine.instructions.md`
- `MCPGallery/mcp-mesh-sdk/README-SCRIPTORIUM.md`

## 6. Coherencia con fuentes existentes (no-regresión)

- ✅ Coherente con `VectorMachineSDK/README-SCRIPTORIUM.md §Fase 3`.
- ✅ Coherente con `vector-machine.instructions.md §1-4`.
- ✅ Coherente con `mcp-mesh-sdk/README-SCRIPTORIUM.md`.
- ✅ Coherente con `PLAN.md` del dossier.
