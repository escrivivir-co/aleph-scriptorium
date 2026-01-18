# Acta T002: Consolidación del Backlog Borrador

## Metadatos

| Campo | Valor |
|-------|-------|
| **Turno** | 002 |
| **Agente** | @scrum |
| **Inicio** | 2026-01-18 12:30 |
| **Fin** | 2026-01-18 13:00 |
| **Estado final** | ✅ DONE |

## Contexto Leído

- T001_ox_analisis-runtime.md
- 03_REFERENCIAS/fuentes.md
- Backlogs existentes: MCP-CHANNELS-1.0.0, AS-GYM, IOT-SBR-LOGICA

## Aportación

### Backlog Generado

Se ha creado el borrador de backlog completo:

**Ubicación**: [BACKLOG_BORRADORES/Enero_18_MCP_AAIA_Server/01_backlog-borrador.md](../../BACKLOG_BORRADORES/Enero_18_MCP_AAIA_Server/01_backlog-borrador.md)

### Resumen del Backlog

| Métrica | Valor |
|---------|-------|
| **Stories** | 9 |
| **Tasks** | 51 |
| **Effort total** | 68 pts |
| **Spikes** | 1 |
| **Feature Cycles** | 4 |

### Stories por Feature Cycle

| FC | Stories | Effort |
|----|---------|--------|
| FC1 | S1 (tipos) + S2 (session manager) | 18 pts |
| FC2 | S3 (server base) + S4 (tools) + S5 (resources) | 27 pts |
| FC3 | S6 (PersefonBot) + S7 (launcher) | 15 pts |
| FC4 | S8 (plugin) + S9 (agent creator) | 13 pts |

### Dependencias Críticas

```
S1 (tipos) → S2 (session) → S3 (server) → S4 (tools)
                                            ↓
                                        S5 (resources)
                                            ↓
                                        S6 (socket.io)
                                            ↓
                                        S7 (launcher) → S8 (plugin) → S9 (agent creator)
```

### Riesgos Documentados

1. **Runtime no aislable** (Probabilidad: Alta)
   - Mitigación: Spike técnico antes de FC1
   
2. **Memoria compartida** (Probabilidad: Media)
   - Mitigación: Tests de aislamiento en S2

## Decisiones Tomadas

1. ✅ **Puerto 3007** asignado al servidor AAIA
2. ✅ **PersefonBot** nombre del bot Socket.IO (mitología: Perséfone, hija de Eurídice)
3. ✅ **Plugin id**: `aaia-editor`
4. ✅ **Spike de aislamiento** antes de desarrollo

## Preguntas para Siguientes Turnos

- [ ] ¿Aprobar backlog para convertir en épica oficial? → @aleph (PO)
- [ ] ¿Prioridad de Spike 1 (aislamiento)? → @plugin_ox_prologeditor
- [ ] ¿Incluir en sprint FC2? → @scrum (retrospectiva)

## Siguiente Turno Sugerido

@aleph para revisión PO del backlog borrador y aprobación de épica MCP-AAIA-SERVER-1.0.0.
