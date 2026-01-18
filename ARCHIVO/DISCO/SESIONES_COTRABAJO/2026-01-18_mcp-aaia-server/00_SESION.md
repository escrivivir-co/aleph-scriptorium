# Sesión: MCP AAIA Server — Diseño de Épica

## Metadatos

| Campo | Valor |
|-------|-------|
| **Fecha inicio** | 2026-01-18 12:00 |
| **Estado** | ✅ COMPLETADO (mapa técnico + frontend integration + build) |
| **Épica relacionada** | MCP-AAIA-SERVER-1.0.0 |
| **Effort completado** | 66 pts + 27 pts derivados = **93 pts** |
| **Turnos totales** | 8 |
| **Carpeta** | ARCHIVO/DISCO/SESIONES_COTRABAJO/2026-01-18_mcp-aaia-server/ |

## Participantes

| Agente | Rol | Estado actual |
|--------|-----|---------------|
| @ox | Oráculo / Arquitectura | ✅ T001 completado |
| @scrum | Tracking / Backlog | ✅ T002 completado, ⏳ T006 |
| @aleph | PO / Implementación | ✅ T003 completado |
| @plugin_ox_agentcreator | Esteroides + Receta | ✅ T004 completado |
| @plugin_ox_aaiaeditor | Implementación DevOps | ✅ T005, ✅ T007 (mapa técnico) |
| @plugin_ox_mcppresets | Configuración MCP presets | ⚪ IDLE |
| @indice | Navegación DRY | ⚪ IDLE |

## Objetivo

Diseñar la épica **MCP-AAIA-SERVER-1.0.0** para:

1. **Crear un servidor MCP** que exponga el Runtime de AAIAGallery (FIAs + Mundos)
2. **Permitir crear "threads"** (sesiones FIA) operables via MCP y Socket.IO
3. **Definir protocolo AlephScript** como capacidades de sala (MASTER-ROOM)
4. **Integrar con mcp-core-sdk** para tipos compartidos (patrón Prolog)
5. **Vincular plugin con submódulo** para completar paquete AAIA

## Restricciones

- Seguir patrón de MCPPrologServer (sesiones + EuridiceBot)
- Reutilizar tipos de mcp-core-sdk (room-protocol.ts)
- Definir protocolo (ya iniciado por 'red semántica' para refactorizar y adecuar el código original)
- Mantener compatibilidad con protocolo MASTER-ROOM existente

## Referencias de Backlog

- [MCP-CHANNELS-1.0.0](../../BACKLOG_BORRADORES/Enero_07_MCP_Channels_Integration/01_backlog-borrador.md)
- [AS-GYM Integration](../../BACKLOG_BORRADORES/AS-GYM/02_backlog-sprint-asgym.md)
- [IOT-SBR-LOGICA](../../BACKLOG_BORRADORES/IOT-SBR-LOGICA/01_backlog-borrador.md)
- [Enero_2026_LogicaAgentes](../../BACKLOG_BORRADORES/Enero_2026_LogicaAgentes/)

---

## Arquitectura de Referencia

### Patrón MCPPrologServer (a seguir)

```
┌─────────────────────────────────────────────────────────────────┐
│                    MCPPrologServer                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. SessionManager                                              │
│     └── Map<sessionId, PrologSession>                           │
│         ├── engine (motor Prolog)                               │
│         └── metadata (obraId, timestamps)                       │
│                                                                 │
│  2. MCP Tools                                                   │
│     ├── prolog_create_session                                   │
│     ├── prolog_query                                            │
│     ├── prolog_assert_fact                                      │
│     ├── prolog_consult_file                                     │
│     └── prolog_destroy_session                                  │
│                                                                 │
│  3. EuridiceBot (Socket.IO Client)                              │
│     └── MASTER of Prolog_ROOM                                   │
│         └── Capabilities: PROLOG_QUERY, PROLOG_ASSERT, etc.     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Patrón MCPAAIAServer (objetivo)

```
┌─────────────────────────────────────────────────────────────────┐
│                     MCPAAIAServer                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. AAIASessionManager                                          │
│     └── Map<sessionId, AAIASession>                             │
│         ├── runtime (Runtime de AAIAGallery)                    │
│         ├── threads[] (FIAs activas)                            │
│         ├── mundo (IMundo activo)                               │
│         └── metadata (appId, timestamps, runState)              │
│                                                                 │
│  2. MCP Tools                                                   │
│     ├── aaia_create_session                                     │
│     ├── aaia_load_app                                           │
│     ├── aaia_start_fia                                          │
│     ├── aaia_step_fia                                           │
│     ├── aaia_query_mundo                                        │
│     ├── aaia_send_percepto                                      │
│     └── aaia_destroy_session                                    │
│                                                                 │
│  3. PersefonBot (Socket.IO Client)                              │
│     └── MASTER of AAIA_ROOM                                     │
│         └── Capabilities:                                       │
│             ├── AAIA_GET_APPS                                   │
│             ├── AAIA_START_FIA                                  │
│             ├── AAIA_STEP                                       │
│             ├── AAIA_PERCEPTO                                   │
│             └── AAIA_GET_MUNDO_STATE                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Plan de Turnos Inicial

| # | Agente | Objetivo |
|---|--------|----------|
| 1 | @ox | Análisis estructural del Runtime AAIAGallery |
| 2 | @plugin_ox_prologeditor | Extraer patrón Session + Bot del servidor Prolog |
| 3 | @plugin_ox_mcppresets | Definir preset de herramientas AAIA |
| 4 | @plugin_ox_agentcreator | Vincular con catálogo FIA |
| 5 | @indice | Mapear dependencias entre submódulos |
| 6 | @scrum | Consolidar stories y tasks |

---

## Métricas de Sesión

| Métrica | Valor |
|---------|-------|
| Turnos totales | 8 |
| Participantes activos | 6 |
| Bloqueos | 0 (resuelto: TypeScript strict mode) |
| Duración total | ~8h |
| Actas producidas | 8 (T001-T008) |
| Decisiones tomadas | 5 |

## Resultado Final

✅ **Build exitoso** de AAIAGallery/frontend:
- 56 static routes prerenderizadas
- 1.87 MB bundle inicial (357 KB gzipped)
- 14+ archivos migrados a SDK imports
- Tipos compartidos en mcp-core-sdk/browser

### Warnings (No bloqueantes)
- ESM: mcp-core-sdk es CommonJS
- Budgets: Bundle grande pero dentro de límites
- Prerender: Socket.IO/HTTP timeout sin backend (normal SSR)
