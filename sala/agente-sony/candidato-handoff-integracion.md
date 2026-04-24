# SBLVX-SC-04 — Handoff de integración interequipos

> **Producido por:** Sony (Claude Sonnet 4.6)
> **Fecha:** 2026-04-24
> **Task:** SBLVX-SC-04 — Preparar handoff de integración
> **Prerrequisitos aplicados:** Enmiendas SC-02 (E1, E2, E3) + Scope SC-03

---

## Resumen

Este documento es el **contrato de integración** entre el equipo Scriptorium (que construye
`MCPVectorMachineServer`) y el equipo DocumentMachineSDK (que posee el corpus y el skill local).
Opera en dos horizontes explícitos para que cada equipo avance en paralelo y converja sin
reinterpretar el plan.

---

## Horizonte 1 — Integración inmediata (este sprint, Demo 1)

### Qué entrega Scriptorium

| Artefacto | Descripción | Task que lo produce |
|-----------|-------------|---------------------|
| `MCPVectorMachineServer` en `:3010` | Servidor MCP arrancable con tools `register_project`, `index_project`, `get_index_status`, `query_project` | VMI-04..VMI-07 |
| Config `DEFAULT_VECTOR_MACHINE_MCP_SERVER_CONFIG.ts` | Registro en la mesh MCP | VMI-04 |
| Instrucciones de uso (tool signatures) | Cómo llamar a los tools desde DocumentMachineSDK o cualquier cliente | VMI-18 (docs DRY) |

### Qué necesita Scriptorium de DocumentMachineSDK

| Input | Formato | Cómo se entrega | Quién lo provee |
|-------|---------|-----------------|-----------------|
| Ruta local al directorio padre de `lore-db/` | String path absoluto o relativo al workspace | Pasado como argumento `path` en `register_project("docmachine/mod-legislativa", <path>)` | Usuario / PO al ejecutar Demo 1 |
| Stack vectorial operativo (Chroma + Ollama corriendo) | Docker Compose levantado desde `VectorMachineSDK/` | `docker compose up` (scripts del SDK) | Usuario antes de la demo |

**Nota crítica:** DocumentMachineSDK no necesita ningún cambio de código para la Demo 1.
La integración es puramente operativa: el servidor lee el path, el ETL recorre `lore-db/`
y llena la colección Chroma `docmachine_mod-legislativa`. Sin API nueva, sin types compartidos.

### Protocolo de Demo 1 (pasos secuenciales)

```
1. [VectorMachineSDK]  docker compose up  →  Chroma + Ollama operativos
2. [Scriptorium]       MCPVectorMachineServer arrancado en :3010
3. [MCP Client]        register_project("docmachine", "mod-legislativa", "<path>")
4. [MCP Client]        index_project("docmachine", "mod-legislativa")
                         → retorna {job_id}
5. [MCP Client]        get_index_status(<job_id>)  →  hasta status: "completed"
6. [MCP Client]        query_project("docmachine", "mod-legislativa", "<pregunta>")
                         → respuesta con trazas de fuentes
```

### Invariante de datos (no tocar)

```
DocumentMachineSDK/mod-legislativa/
  ├── lore-db/          ← corpus que indexa el ETL (lectura only)
  └── lore-db-vector/   ← índice vectorial local (escrito por el ETL)
```

Ambas carpetas hermanas en disco. El path registrado apunta al directorio padre (`mod-legislativa/`).
El servidor localiza `lore-db/` y `lore-db-vector/` por convención de nombres.

---

## Horizonte 2 — Integración futura (post-sprint, Capa 2)

> **Este horizonte NO es entregable de SC-04.** Se documenta como dependencia futura para que
> el siguiente sprint no parta de cero.

### Qué entregará Scriptorium (cuando MCPLoreDBServer esté en scope)

| Artefacto | Descripción |
|-----------|-------------|
| `MCPLoreDBServer` (puerto TBD) | Tools domain-specific: `pieza_*`, `lore_f_*`, `lore_sync_now`, `lore_f_validate` |
| Skill MCP de lore-db | Interfaz semántica sobre el índice vectorial ya construido en Horizonte 1 |

### Qué necesitará DocumentMachineSDK adaptar

| Componente | Cambio requerido | Cuándo |
|------------|-----------------|--------|
| `.github/skills/lore-db-bootstrap/SKILL.md` | Actualizar instrucciones de arranque para incluir `MCPLoreDBServer` | Cuando MCPLoreDBServer esté arrancable |
| Skill local de agentes (si existe) | Añadir tools `pieza_*` al subset de herramientas usadas | Post-v1 |
| `SBLVX-DM-03` (refinement skill y layout) | Cerrar con el nuevo contrato de tools Capa 2 | Depende de apertura del sprint de Capa 2 |

### Dependencias para abrir el sprint de Capa 2

1. `MCPVectorMachineServer` estable y en producción (Demo 1 + Demo 2 pasadas).
2. Gate: PO ratifica que MCPLoreDBServer entra en scope (ver SC-02 E1).
3. DocumentMachineSDK completa `SBLVX-DM-02` y `SBLVX-DM-03` (sus propios backlogs).

---

## Estado actual de los dossiers espejo

| Dossier | Lado | Tasks cerradas | Siguiente abierta |
|---------|------|---------------|-------------------|
| `sala/dossiers/scrum-backlog-lore-db-vector-expansion/` | Scriptorium | SC-00, SC-01 | SC-02 (entregada, pendiente revisión Aleph) |
| `DocumentMachineSDK/sala/dossiers/scrum-backlog-lore-db-vector-expansion/` | DocMachineSDK | DM-00, DM-01 | DM-02 (libre, sin agente asignado) |

**Observación:** el frente DocumentMachineSDK está pausado en refinement (SBLVX-DM-02 libre).
Para la Demo 1 eso no es problema: no requieren cambios. Para Horizonte 2 sí deberán reanudar.

---

## Decisiones abiertas que afectan a ambos equipos

| Decisión | Impacto Scriptorium | Impacto DocMachineSDK | Quién decide |
|----------|--------------------|-----------------------|-------------|
| ¿MCPLoreDBServer es post-v1? | Cierra scope de VMI; no ampliar tools | SBLVX-DM-03 puede esperar | PO |
| Path concreto de `mod-legislativa` en máquina de demo | Argumento de `register_project` en Demo 1 | Ninguno (solo lectura) | PO / usuario |
| Resultado de VMI-01 (DeepWiki o Chroma) | Diseño interno del ETL adapter | Ninguno directo | Gepe + Aleph |

---

## Resumen de dependencias cruzadas mínimas

```
Scriptorium                          DocumentMachineSDK
───────────────────────────────      ─────────────────────────────────
MCPVectorMachineServer (:3010)  →    lee path de lore-db/ (solo lectura)
VectorMachineSDK (submódulo)    →    Chroma + Ollama como backend
                                     (docker compose up)

NO hay dependencia de código cruzado entre repos para Demo 1.
NO hay tipos compartidos ni contratos de API entre repos para Demo 1.
La única interfaz es: path string + herramientas MCP estándar.
```
