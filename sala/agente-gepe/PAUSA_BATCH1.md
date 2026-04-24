# PAUSA — BATCH 1 (VMI-01..VMI-08)

> **Agente:** Gepe
> **Modelo:** GPT-5.4
> **Fecha:** 2026-04-24 20:24:24
> **Estado:** pausada
> **Naturaleza:** handoff de pausa para Aleph. **No es entrega final** del batch.

## Resumen ejecutivo

- El PO pidió abortar/pausear la ejecución antes de cerrar ninguna de las tasks del batch.
- No hay entrega final de `VMI-01..VMI-08` todavía.
- Trabajo confirmado hasta ahora: lectura de aprobación y contrato, inspección de `deepwiki.sh` / `deepwiki.bat`, búsqueda local sobre multi-tenant en `VectorMachineSDK`, identificación del patrón `BaseMCPServer` en `mcp-mesh-sdk`, y varios intentos no concluyentes de smoke por wrapper cross-shell en Windows.
- No he escrito fuera de `sala/agente-gepe/`. No he tocado `tablero.md`. No he producido cambios de código productivo confirmados para este batch.

## Pasos ejecutados

1. Se confirmó en disco la aprobación del **BATCH 1** en `sala/agente-gepe/estado.md` y en `sala/tablero.md`.
2. Se fijó el marco de trabajo desde el dossier técnico (`ref/contrato-mcp-v1.md` y `RESPUESTAS.md`):
   - servidor MCP en **Node.js**;
   - puerto **3010**;
   - `index_project` asíncrono con `job_id`;
   - errores estándar `{code, message, hint?}`;
   - G-1 todavía requiere el spike operativo DeepWiki vs Chroma.
3. Se inspeccionaron los wrappers `VectorMachineSDK/deepwiki.sh` y `VectorMachineSDK/deepwiki.bat`.
4. Se hizo búsqueda local en `VectorMachineSDK/**` sobre `register_project|unregister_project|list_projects|owner/project|multi-tenant|tenant`.
5. Se hizo búsqueda local en `MCPGallery/mcp-mesh-sdk/src/**` sobre `BaseMCPServer` para ubicar el patrón del esqueleto de VMI-04.
6. Se intentó arrancar/diagnosticar el smoke de `VMI-02` desde entorno Windows+bash usando el wrapper `.bat`; los intentos no dieron un veredicto fiable del stack y apuntan a un problema de invocación cross-shell, no a una caída confirmada del stack.

## Findings confirmados

### 1) DeepWiki aporta wrappers de plataforma, pero no demuestra por sí solo un registro multi-tenant

En los dos wrappers inspeccionados aparecen comandos de **lifecycle** y operación (`start`, `start-external`, `start-cpu`, `stop`, `restart`, `status`, `logs`, `health`, `copy-repo`, `index`, `test`, `backup`, etc.).

**Hallazgo:** en lo inspeccionado no aparece una semántica explícita de **registro/listado/desregistro** de proyectos estilo `{owner}/{project}`. Eso no demuestra que DeepWiki no pueda servir; solo significa que **el veredicto de VMI-01 sigue abierto** y necesita bajar a `wiki/`, `etl/` y/o `qa/` para decidir si el registro vive en DeepWiki, en Chroma metadata o en una capa propia.

### 2) El propio `VectorMachineSDK` sí contiene una pista clara sobre multi-tenancy en Chroma

`VectorMachineSDK/README-SCRIPTORIUM.md` recomienda una **base Chroma compartida** con aislamiento por **Tenants/Databases**:

- un **Tenant** por equipo/cliente;
- una **Database** por microservicio dentro de ese tenant.

Esto refuerza que el fallback/alternativa Chroma para `VMI-01` no es inventado: ya existe huella arquitectónica en el repo para multi-tenant sobre Chroma.

### 3) `mcp-mesh-sdk` ya tiene patrón reusable para VMI-04

La búsqueda en `MCPGallery/mcp-mesh-sdk/src/**` confirma múltiples servidores extendiendo `BaseMCPServer` (por ejemplo `MCPLauncherServer`, `MCPFirehoseServer`, `MCPBotHubServer`, `MCPAAIAServer`, `DevOpsServerImpl`).

**Hallazgo:** VMI-04 no arranca desde cero; debe replicar el patrón servidor + config existente. Aun así, no he creado todavía `MCPVectorMachineServer.ts` ni su config.

### 4) VMI-02 no tiene veredicto todavía

Intenté llegar al `health` del stack usando el wrapper Windows desde el entorno actual, pero el resultado fue ambiguo por el wrapper/cross-shell:

- hubo intentos que abrían sesión/interprete en vez de ejecutar el batch de forma limpia;
- no obtuve una salida fiable que permita decir "stack OK" o "stack caído".

**Conclusión:** `VMI-02` sigue **sin validar**. El problema observado hasta ahora es de **invocación**; no puedo afirmar todavía un fallo real de Docker, Ollama, QA o Chroma.

## Estado task por task

| Task | Estado real al pausar | Nota |
|------|------------------------|------|
| VMI-01 | iniciada (investigación) | sin veredicto final DeepWiki vs Chroma |
| VMI-02 | iniciada (smoke) | sin health fiable; problema de wrapper cross-shell |
| VMI-03 | no iniciada | depende del cierre de VMI-01 |
| VMI-04 | no iniciada | depende de VMI-02 y conviene leer un server base concreto |
| VMI-05 | no iniciada | depende de VMI-04 + VMI-03 |
| VMI-06 | no iniciada | depende de VMI-05 |
| VMI-07 | no iniciada | depende de VMI-05 |
| VMI-08 | no iniciada | depende de VMI-04 |

## Riesgos y contexto útil para la retoma

- **Riesgo 1 — humo falso por shell:** antes de diagnosticar el stack, conviene ejecutar el smoke desde una shell Windows nativa o una task del workspace con `VectorMachineSDK/` como `cwd` real.
- **Riesgo 2 — G-1 todavía abierto operativamente:** el contrato dice "DeepWiki primero", pero lo inspeccionado hasta ahora no cierra por sí solo el registro multi-tenant; si no aparece una capa de registro real, el fallback Chroma/store propio seguirá vivo.
- **Riesgo 3 — Demo 1 puede tener bloqueo ajeno al batch:** en disco aparece una entrega de `gemy` para `VMI-09` reportando que no encuentra `DocumentMachineSDK/mod-legislativa/lore-db`. No es trabajo mío, pero **si Aleph lo confirma** puede bloquear `VMI-10` aunque este batch avance.

## Siguiente paso recomendado para retomar

1. Reintentar `VMI-02` desde **PowerShell/cmd nativo** o task del workspace, con `VectorMachineSDK/` como directorio actual real, hasta obtener un `health` fiable.
2. Completar `VMI-01` leyendo `VectorMachineSDK/wiki/`, `etl/` y `qa/` para decidir si DeepWiki soporta suficientemente el modelo `{owner}/{project}` o si hace falta fallback a Chroma metadata/store propio.
3. Con `VMI-01` + `VMI-02` cerrados, redactar `candidato-cierre-g1.md` (VMI-03) y abrir el esqueleto `MCPVectorMachineServer.ts` (VMI-04).

## Petición explícita para Aleph

Necesito una decisión en disco antes de seguir o salir:

1. **Opción A — pausa con retoma futura:** mantener el batch asociado a Gepe y dejar constancia de `pausada` para retomarlo luego.
2. **Opción B — abortar y liberar/reasignar:** devolver el batch al tablero / reasignarlo y dejarme disponible para `#sala-salir` cuando corresponda.

Mientras Aleph no deje esa decisión en disco, este documento queda como handoff de pausa.
