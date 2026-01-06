# Referencias para Sesión: Consenso Agile Scriptorium

> Este fichero contiene **extractos** de documentos relevantes, NO copias completas.

---

## Protocolo Scrum DRY (scrum-protocol.instructions.md)

**Ubicación**: `.github/plugins/scrum/instructions/scrum-protocol.instructions.md`

### Principio Fundamental

> **DRY = Don't Repeat Yourself**
>
> El backlog oficial (`.github/BACKLOG-SCRIPTORIUM.md`) es un **índice de referencias**.  
> NO contiene detalles de épicas. Los detalles viven en:
> - `ARCHIVO/DISCO/BACKLOG_BORRADORES/` → trabajo activo
> - `ARCHIVO/DISCO/BACKLOG_ARCHIVADOS/` → sprints cerrados

### Flujo de Trabajo DRY

```
Fase 1: Planificar → Crear carpeta BACKLOG_BORRADORES/{nombre}/
Fase 2: Desarrollar → 01_backlog-borrador.md EN EL BORRADOR
Fase 2.5: Auditoría → @ox + @indice
Fase 3: Aprobar → Cambiar estado en índice (NO copiar contenido)
Fase 4: Archivar → Mover a BACKLOG_ARCHIVADOS/{sprint}/
```

---

## Scrum Workflow (scrum-workflow.instructions.md)

**Ubicación**: `.github/plugins/scriptorium-pack/instructions/scrum-workflow.instructions.md`

### Gate de Auditoría (R1-R2)

**Checklist DoR** (Definition of Ready):

| # | Verificación | Responsable |
|---|--------------|-------------|
| 1 | Componentes referenciados existen | @ox |
| 2 | Gap analysis documentado | @ox |
| 3 | Estimación validada | @scrum |
| 4 | Coherencia estructural | @indice |
| 5 | Rutas verificadas | @indice |

### Comandos de @scrum

- `planificar` — Inicia conversación PO-SM
- `borrador` — Genera backlog borrador
- `aprobar` — Valida y publica en índice
- `tracking` — Actualiza estado tasks
- `cerrar` — Retrospectiva + foto estado
- `status` — Métricas actuales

---

## Protocolo Cotrabajo (cotrabajo.instructions.md)

**Ubicación**: `.github/plugins/scriptorium-pack/instructions/cotrabajo.instructions.md`

### Principio Fundamental

> **El chat NO es el medio de trabajo — los ficheros SÍ.**

### Estructura de Carpeta

```
SESIONES_COTRABAJO/{fecha}_{tema}/
├── 00_SESION.md          # Metadatos
├── 01_TABLERO.md         # Índice DRY de turnos
├── 02_ACTAS/             # Contenido por turno
├── 03_REFERENCIAS/       # Material de contexto
└── 04_PROTOCOLO.md       # Copia del protocolo
```

### Integración con Scrum (§6)

> "Al cerrar, el resumen ejecutivo puede convertirse en:
> - Entrada en borrador de backlog
> - Acta de asamblea
> - Input para retrospectiva"

**PROBLEMA**: No está definido **cómo** se hace esta conversión.

---

## Estado Actual del Sistema

### Carpetas activas

**BACKLOG_BORRADORES/**: 47 carpetas
**SESIONES_COTRABAJO/**: 7 sesiones documentadas

### Sesiones que ya produjeron backlogs

| Sesión | Épica | Resultado |
|--------|-------|-----------|
| 2026-01-03_prolog-agent-brain-pack | SCRIPT-2.3.1 | Borrador completado |
| 2026-01-03_prolog-e2e-testing | PROLOG-E2E-1.0.0 | 23/26 tests OK |
| 2026-01-04_demo-ui-prologeditor | PROLOG-UI-DEMO-1.0.0 | Demo 12/12 steps |
| 2026-01-04_typed-mcp-test-session | TYPED-MCP-1.0.0 | Tests 5/6 auto |

**Gap detectado**: No hay **referencia bidireccional** explícita entre sesión y borrador.

---

## Plantillas AgentLoreSDK (Lucas templates-index.json)

### Categoría: project-management

- `pac-create-epic.md` — Crear épicas con estructura PAC
- `pac-validate.md` — Validar estructura de backlog
- `milestone-tracker.md` — Tracking de milestones
- `project-health-check.md` — Análisis de salud

**Nota**: El sistema Scriptorium NO usa PAC, usa Gate Ox-Indice (R1-R2).

---

## Índices DRY

**Funcional.md**: Capacidades del sistema  
**Tecnico.md**: Arquitectura para equipo Scrum

Ambos índices siguen principio DRY y deben actualizarse al añadir flujos nuevos.

---

**Fin de Referencias**
