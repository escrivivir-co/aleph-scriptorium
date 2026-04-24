# SBLVX-SC-02 — Aprobación / enmienda del plan compartido

> **Producido por:** Sony (Claude Sonnet 4.6)
> **Fecha:** 2026-04-24
> **Task:** SBLVX-SC-02 — Aprobar o enmendar plan compartido
> **Dossier fuente:** `sala/dossiers/scrum-backlog-lore-db-vector-expansion/`
> **Referencia de contraste:** `sala/dossiers/vector-machine/RESPUESTAS.md §Gates V1`

---

## Veredicto

**APROBAR CON 3 ENMIENDAS**

El plan base (`PLAN-VECTOR/PLAN.md`) sigue siendo válido como visión de largo plazo para el feature
`MCPLoreDBServer`. Sin embargo, la sesión del 24-abr-2026 cerró el contrato de un servidor distinto
(`MCPVectorMachineServer`, track VMI-01..18) que actúa como capa de infraestructura RAG genérica.
El plan scrum no refleja ese cambio. Sin las enmiendas siguientes, SC-03 y SC-04 operarían sobre
una frontera incorrecta y producirían artefactos desalineados con el sprint activo.

---

## Análisis de coherencia

### Coincidencias (sin enmienda)

| Punto | Plan original | Gates V1 | Estado |
|-------|--------------|----------|--------|
| Topología server/datos | Server en Scriptorium, datos en DocMachineSDK | G-3, G-10 | ✅ coherente |
| Primer consumidor de demo | `docmachine/mod-legislativa` | G-6 Demo 1 | ✅ coherente |
| Trigger manual (no git hooks) | G3: solo `lore_sync_now` manual | G-3: sin hooks automáticos | ✅ coherente |
| Single-user, sin auth v1 | Implícito en G12 (local embebido) | G-5: single-user local | ✅ coherente |
| `lore-db/` y `lore-db-vector/` hermanas | G10 | Implícito en G-6 | ✅ coherente |

### Divergencias (requieren enmienda)

| Punto | Plan original | Gates V1 | Tensión |
|-------|--------------|----------|---------|
| Nombre e identidad del server | `MCPLoreDBServer` | `MCPVectorMachineServer` (:3010) | Contratos distintos |
| Tools exportadas | domain-specific: `pieza_*`, `lore_f_*`, `lore_sync_now` | genéricas: `register_project`, `index_project`, `query_project` | No hay correspondencia directa |
| Backend vectorial | LanceDB embebido (primary) + Qdrant Docker (opt.) | DeepWiki-first; Chroma-as-metadata como fallback | Tecnologías distintas |
| Modelo de aislamiento | Tag-buckets (G6 del plan) | Namespace jerárquico `{owner}/{project}` + colección por proyecto | Mecanismos distintos |

---

## Enmiendas

### Enmienda 1 — Arquitectura en dos capas: infraestructura + skill

**Problema:** el plan trata `MCPLoreDBServer` como el único servidor MCP del feature. Los gates V1
cierran `MCPVectorMachineServer` como capa de infraestructura genérica que ya incluye la Demo 1
(indexar `docmachine/mod-legislativa`) usando `register_project / index_project / query_project`.

**Enmienda:** declarar explícitamente la arquitectura en dos capas:

```
Capa 1 — Infraestructura RAG (sprint activo, VMI-01..18)
  → MCPVectorMachineServer (:3010)
  → Tools: register_project, index_project (async job-id), query_project
  → Proyectos indexables: cualquier {owner}/{project}
  → lore-db entra como project "docmachine/mod-legislativa"
  → Demos 1 y 2 del sprint se construyen sobre esta capa

Capa 2 — Skill lore-db especializado (feature post-sprint, SBLVX-SC futuro)
  → MCPLoreDBServer (puerto TBD, post-v1)
  → Tools: pieza_*, lore_f_*, lore_sync_now, tag-buckets, validate
  → Usa MCPVectorMachineServer como backend (o accede directamente al índice)
  → Añade semántica domain-specific sobre la infraestructura ya construida
```

**Efecto en SC-03:** el scope Scriptorium a refinar es la **Capa 1** (MCPVectorMachineServer, VMI),
no la Capa 2 (MCPLoreDBServer, post-v1). SC-03 no debe abrir el diseño de tools lore-específicas.

**Efecto en SC-04:** el handoff con DocumentMachineSDK debe especificar que la integración
inmediata es vía Capa 1 (indexado genérico de `docmachine/mod-legislativa`); la Capa 2 es
dependencia futura de DocumentMachineSDK, no entregable de este sprint.

---

### Enmienda 2 — Backend vectorial: seguir el gate G-1

**Problema:** el plan especifica LanceDB embebido como primary y Qdrant Docker como alternativa.
Los Gates V1 cerraron G-1 con **DeepWiki-first** (explora `VectorMachineSDK/deepwiki.sh`,
`deepwiki.bat`, `wiki/`) y Chroma-as-metadata como fallback. LanceDB no aparece en el contrato VMI.

**Enmienda:** el SBLVX-SC plan no puede contradecir G-1. En SC-03 (scope Scriptorium):

- No plantear LanceDB como opción para MCPVectorMachineServer.
- Respetar el resultado de VMI-01 (spike DeepWiki vs Chroma): la elección de backend para la
  infraestructura queda pendiente de ese spike.
- LanceDB puede reaparecer en el diseño de Capa 2 (MCPLoreDBServer) si el spike VMI-01 no lo
  excluye, pero eso es decisión post-sprint.

**Efecto en SC-03:** incluir como restricción explícita: "no proponer LanceDB para la capa de
infraestructura; esperar resultado de VMI-01 antes de fijar backend".

---

### Enmienda 3 — Modelo de aislamiento: unificar en namespace {owner}/{project}

**Problema:** el plan usa **tag-buckets** como mecanismo de aislamiento y partición (G6 del plan
original). Los Gates V1 cierran G-5 con **namespace jerárquico `{owner}/{project}`** y una
colección por proyecto. Son mecanismos incompatibles en el mismo servidor.

**Enmienda:** distinguir el alcance de cada mecanismo:

- **`{owner}/{project}` + colección por proyecto** → aplica a MCPVectorMachineServer (Capa 1).
  Es el mecanismo de aislamiento del sprint activo. No se cuestiona.
- **Tag-buckets** → aplica a MCPLoreDBServer (Capa 2, post-v1). Es el mecanismo de partición
  intra-proyecto para lore-db, donde un proyecto puede tener múltiples tags/buckets.
  No está en alcance del sprint actual.

**Efecto en SC-03:** el scope Scriptorium no incluye diseño de tag-buckets. Solo namespace
jerárquico como lo cierra G-5.

---

## Impacto en SC-03 y SC-04

### SC-03 — Refinement scope Scriptorium

Con las enmiendas, el scope Scriptorium para este sprint es:

```
DENTRO de Scriptorium (VMI-01..18):
  - MCPVectorMachineServer (:3010), Node.js, hereda BaseMCPServer
  - Tools v1: register_project, index_project (async job-id), query_project, errores G-8
  - Backend: resultado de VMI-01 (DeepWiki-first o Chroma)
  - Integración: .vscode/mcp.json (VMI-16), MCPLauncherServer (VMI-17), DRY docs (VMI-18)

FUERA de Scriptorium (post-v1):
  - MCPLoreDBServer y tools domain-specific (pieza_*, lore_f_*, lore_sync_now)
  - LanceDB como backend primario (pendiente de gate post-spike)
  - Tag-buckets como mecanismo intra-proyecto
```

SC-03 debería producir: confirmación del scope VMI + lista de decisiones que faltan antes de
arrancar VMI-04 (esqueleto). No debe abrir diseño de Capa 2.

### SC-04 — Handoff de integración

El handoff DocumentMachineSDK ↔ Scriptorium tiene ahora dos horizontes:

**Horizonte inmediato (este sprint):**
- Scriptorium entrega: MCPVectorMachineServer con `register_project("docmachine/mod-legislativa")`
  + `index_project` + `query_project`.
- DocumentMachineSDK recibe: un endpoint RAG genérico en :3010 para consultar su lore-db.
- Integración mínima: path de lore-db accesible para el servidor. Sin cambios en DocMachineSDK.

**Horizonte futuro (post-sprint, depende de Capa 2):**
- Scriptorium entregará: MCPLoreDBServer con semántica domain-specific.
- DocumentMachineSDK necesitará: adaptar skill y `SKILL.md` de lore-db-bootstrap al nuevo contrato.
- Este horizonte NO es entregable de SC-04: se documenta como dependencia futura, no como tarea.

SC-04 debe dejar ese handoff escrito como contrato explícito de dos fases.

---

## Decisiones que este análisis NO puede tomar

Las siguientes requieren al PO o a Aleph:

1. **¿Confirmar la arquitectura en dos capas?** El análisis deduce la separación de contratos, pero
   el PO debe ratificar explícitamente que MCPLoreDBServer es post-v1 y no en scope del sprint.

2. **¿Cuándo entra MCPLoreDBServer?** No está en ningún backlog activo. ¿Se abre tarea al cerrar
   VMI? ¿Es otro sprint? Aleph/PO debe decidir.

3. **¿El spike VMI-01 puede bloquear SC-03?** Si el spike elige Chroma puro (sin DeepWiki), el
   diseño de backend cambia. SC-03 puede esperar VMI-01 o trabajar con incertidumbre controlada.
   Aleph decide.

---

## Resumen ejecutivo

| # | Enmienda | Impacto SC-03 | Impacto SC-04 |
|---|----------|--------------|--------------|
| E1 | Dos capas: VMI (infra) + LoreDB (skill post-v1) | Scope = Capa 1 únicamente | Handoff en dos horizontes |
| E2 | Backend: no LanceDB en Capa 1; seguir G-1 (DeepWiki/Chroma) | Restricción explícita de backend | Menor |
| E3 | Aislamiento: namespace en Capa 1; tag-buckets en Capa 2 | No diseñar tag-buckets en este sprint | Menor |
