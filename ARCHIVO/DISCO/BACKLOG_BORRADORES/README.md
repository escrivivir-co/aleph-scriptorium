# Borradores de Backlog — Sprint 2

> **Ubicación**: `ARCHIVO/DISCO/BACKLOG_BORRADORES/`
> **Estado**: ✅ REVISADO (pendiente aprobación final PO)
> **Fecha**: 2025-12-23

---

## Contenido

### Ciclo 1: Integración de Agentes Core (Rondas 1-4)

| Archivo | Descripción | Agente | Estado |
|---------|-------------|--------|--------|
| `01_planificacion-extension-vscode.md` | Conversación PO-SM de planificación | @scrum | ✅ |
| `02_backlog-extension-vscode.md` | Backlog borrador Sprint 2 (39 pts, 74 tasks) | @scrum | ✅ |
| `03_ox-integracion-extension.md` | Auditoría de integración (ontología, coexistencia) | @ox | ✅ |
| `04_aleph-produccion-extension.md` | Perspectiva de producción y doctrina | @aleph | ✅ |
| `05_periodico-comunicacion-extension.md` | Plana noticiera de la integración | @periodico | ✅ |
| `06_revisor-auditoria-extension.md` | Revisión doctrinal de la propuesta | @revisor | ✅ |

### Ciclo 2: Integración de Plugins (Rondas 7-10)

| Archivo | Descripción | Agente | Estado |
|---------|-------------|--------|--------|
| `07_ox-plugins-extension.md` | Matriz Plugin × Capacidad, 8 épicas | @ox | ✅ |
| `08_aleph-plugins-extension.md` | API de registro dinámico, systemPrompts | @aleph | ✅ |
| `09_periodico-plugins-extension.md` | Análisis 5W + 4 Banderas de plugins | @periodico | ✅ |
| `10_revisor-plugins-extension.md` | Auditoría doctrinal de plugins | @revisor | ✅ |

---

## Rondas de Intervención — COMPLETADAS

### Ciclo 1: Agentes Core

```
Ronda 1: @ox (Oráculo)       → Auditoría de ontología ✅
Ronda 2: @aleph (Producción) → Perspectiva doctrinal y prioridades ✅
Ronda 3: @periodico (Comunicación) → Plana noticiera del cambio ✅
Ronda 4: @revisor (Auditoría) → Revisión final ✅

Estado: APROBADO CON OBSERVACIONES
```

### Ciclo 2: Plugins

```
Ronda 7: @ox (Oráculo)       → Matriz Plugin × Capacidad ✅
Ronda 8: @aleph (Producción) → API de registro dinámico ✅
Ronda 9: @periodico (Comunicación) → 5W + 4 Banderas ✅
Ronda 10: @revisor (Auditoría) → Auditoría doctrinal ✅

Estado: APROBADO CON OBSERVACIONES
```

### Observaciones del Revisor

1. **Implementar mitigaciones** contra dependencia de VS Code
2. **Añadir test de preservación doctrinal** antes de release
3. **Documentar fallback** a Copilot Chat nativo
4. **Formalizar deprecación** del elenco Arrakis si no se migra

---

## Resumen Ejecutivo

### Objetivo del Sprint 2

Crear una extensión de VS Code customizada para ALEPH Scriptorium basada en el fork de `vscode-alephscript-extension` (Arrakis Theater Chat Engine).

### Épicas Propuestas (8)

| ID | Épica | Effort | Prioridad |
|----|-------|--------|-----------|
| SCRIPT-2.0.0 | Carga Dinámica de Agentes | 8 pts | P0 |
| SCRIPT-2.1.0 | Vista de Plugins | 5 pts | P0 |
| SCRIPT-2.2.0 | ChatParticipants Scriptorium | 8 pts | P0 |
| SCRIPT-2.3.0 | Vista de Backlogs | 5 pts | P1 |
| SCRIPT-2.4.0 | Panel de Sprint Status | 3 pts | P1 |
| SCRIPT-2.5.0 | QuickPick de Prompts | 3 pts | P2 |
| SCRIPT-2.6.0 | Hover de Instructions | 2 pts | P2 |
| SCRIPT-2.7.0 | Refactorización Core | 5 pts | P1 |

**Effort total**: 39 puntos  
**Tasks totales**: 74

### Modelo de Trabajo

```
Fork (vscode-alephscript-extension)
     │
     ├─ Mantener Core (60%)
     │   - ExtensionBootstrap
     │   - ConfigurationService
     │   - LoggingManager
     │   - ErrorBoundary
     │   - AgentEditors
     │
     ├─ Refactorizar (25%)
     │   - TheatricalChatManager → ScriptoriumChatManager
     │   - TeatroTreeDataProvider → AgentesTreeDataProvider
     │   - Agentes hardcodeados → Carga dinámica
     │
     └─ Añadir (15%)
         - PluginsTreeDataProvider
         - BacklogTreeDataProvider
         - SprintStatusPanel
         - PromptsQuickPick
         - InstructionsHover
```

---

## Próximos Pasos

### Para Aprobar

1. **Revisar** el backlog con PO (usuario)
2. **Invocar**: `@plugin_ox_scrum` → "Aprobar y publicar backlog"
3. **Resultado**: Las épicas SCRIPT-2.x.x se añadirán a `BACKLOG-SCRIPTORIUM.md`

### Para Ejecutar

1. Crear branch `feature/scriptorium` en vscode-alephscript-extension ✅
2. Seguir iteraciones definidas en backlog
3. Tracking con `@plugin_ox_scrum` → "Actualizar tracking"
4. Al cerrar: `@plugin_ox_scrum` → "Cerrar sprint"

---

## Notas de Diseño

### Decisiones Clave

| Decisión | Justificación |
|----------|---------------|
| Fork en lugar de extensión nueva | Aprovechar 60% del código existente |
| 5 ChatParticipants iniciales | Agentes más usados (@aleph, @ox, banderas) |
| Carga dinámica de agentes | Escalabilidad (20+ agentes actuales, creciendo) |
| TreeView por capa | Alineado con ontología de @ox |
| QuickPick para prompts | 30+ prompts, necesitan búsqueda |

### Riesgos Mitigados

| Riesgo | Mitigación |
|--------|------------|
| Conflicto con extensión original | Cambiar ID de extensión |
| Performance con 20+ agentes | Lazy loading + caché |
| Parsing de .agent.md | Tests unitarios robustos |
| Documentación insuficiente | Auditoría previa completada |

---

## Archivos Relacionados

- **Extensión base**: `vscode-alephscript-extension/`
- **Agentes**: `ALEPH/.github/agents/`
- **Plugins**: `ALEPH/.github/plugins/`
- **Prompts**: `ALEPH/.github/prompts/`
- **Backlog oficial**: `ALEPH/.github/BACKLOG-SCRIPTORIUM.md`
