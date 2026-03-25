# Acta Paso 0: Organización de Demo (@ox)

## Metadatos

| Campo | Valor |
|-------|-------|
| **Turno** | 0 (Fase de organización) |
| **Agente** | @ox |
| **Inicio** | 2026-01-04 |
| **Fin** | 2026-01-04 |
| **Estado** | ✅ DONE |

---

## Tarea Asignada

@ox debe organizar y validar el guión de demo antes de que @plugin_ox_prologeditor ejecute.

### 1. Leer Specs de Casos de Uso

**Fuente de verdad**: `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/`

| Spec | Relevancia para Demo |
|------|---------------------|
| `usecases-usuario-final.yaml` | **ALTA** — Casos UC-DEV-* y UC-IOT-* |
| `usecases-ox-bridger.yaml` | MEDIA — Setup del stack (ya hecho) |
| `usecases-dramaturgo.yaml` | BAJA — BrainEditor (opcional en demo) |
| `usecases-agente-personaje.yaml` | BAJA — Runtime de agentes |

### 2. Mapear Casos de Uso a Pasos de Demo

Revisar [01_TABLERO.md](../01_TABLERO.md) y validar que cada paso corresponda a un caso de uso documentado:

| Paso Propuesto | UC Correspondiente | Validado |
|----------------|-------------------|----------|
| 1. Crear sesión | UC-DEV-001 | ✅ |
| 2. Listar sesiones | UC-DEV-001 | ✅ |
| 3. Query simple | UC-DEV-002 | ✅ |
| 4. Assert hecho | UC-DEV-003 | ✅ |
| 5. Consult file | UC-DEV-003 | ✅ |
| 6. Templates MCP | UC-DEV-004 | ✅ |
| 7. SDK templates | UC-DEV-004 | ✅ |
| 8. Template content | UC-DEV-004 | ✅ |
| 9. Load from DB | UC-DEV-005 | ✅ |
| 10. Save to DB | UC-DEV-002 | ✅ |
| 11. Telemetry | UC-IOT-001 | ✅ |
| 12. Destroy session | UC-DEV-001 | ✅ |

### 3. Proponer Secuencia Óptima

Considerar:
- ¿El orden actual es lógico según el workflow del usuario?
- ¿Hay pasos que deberían reordenarse?
- ¿Faltan casos de uso importantes?
- ¿Hay casos de uso que no aplican a la UI?

### 4. Producir

- [ ] Validación del guión (confirmar o modificar 01_TABLERO.md)
- [ ] Notas para PrologEditor sobre cada paso
- [ ] Datos de prueba específicos (queries, hechos, archivos)

---

## Contexto de Specs

### Navegación UI (de usecases-usuario-final.yaml)

```
┌─────────────────────────────────────────────────────────────────┐
│                    PrologEditor UI v2.0                        │
├─────────────────────────────────────────────────────────────────┤
│  [Sessions] [Editor] [Knowledge] [Templates] [Telemetry] [🧠]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Sessions:    SessionManagerComponent                           │
│               - Crear/Listar/Destruir sesiones MCP              │
│                                                                 │
│  Editor:      RuleEditorComponent + RuleListComponent           │
│               - Escribir reglas Prolog                          │
│               - Ver reglas por aplicación                       │
│               - Ejecutar queries                                │
│                                                                 │
│  Knowledge:   KnowledgeBaseComponent                            │
│               - Assert hechos                                   │
│               - Consultar archivos .pl                          │
│                                                                 │
│  Templates:   McpTemplatesBrowserComponent                      │
│               - Explorar catálogo MCP                           │
│               - Cargar templates                                │
│                                                                 │
│  Telemetry:   TelemetryProcessComponent + TelemetryMonitor      │
│               - Enviar datos de sensores                        │
│               - Ver estado actual                               │
│                                                                 │
│  Brain:       BrainEditorComponent (Teatro)                     │
│               - Generador visual de .brain.pl                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Componentes → Endpoints (referencia rápida)

| Componente | Endpoints | Tab |
|------------|-----------|-----|
| SessionManagerComponent | /sessions (GET, POST, DELETE) | Sessions |
| RuleEditorComponent | /rules (POST), /run-rule, /sdk-templates | Editor |
| RuleListComponent | /rules/{app} (GET), /rules/{id} (DELETE) | Editor |
| KnowledgeBaseComponent | /assert, /consult | Knowledge |
| McpTemplatesBrowserComponent | /mcp-templates | Templates |
| TelemetryProcessComponent | /telemetry/process | Telemetry |
| TelemetryMonitorComponent | /telemetry/status | Telemetry |

---

## Siguiente Turno Sugerido

Una vez @ox valide el guión → pasar turno a @plugin_ox_prologeditor para iniciar la demo interactiva.
