# Sesión: Dramaturgia Scriptorium como Máquina

## Metadatos

| Campo | Valor |
|-------|-------|
| **Fecha inicio** | 2026-01-04 |
| **Fecha cierre** | 2026-01-04 |
| **Estado** | ✅ CERRADA |
| **Épica relacionada** | DRAMATURGIA-MAQUINA-1.0.0 |
| **Turnos totales** | 12 |
| **Resultado** | ✅ Épica 100% completada (13/13 pts, 5 commits) |
| **Carpeta** | `ARCHIVO/DISCO/SESIONES_COTRABAJO/2026-01-04_dramaturgia-scriptorium-maquina/` |

---

## Participantes

> **Nota**: Mismos participantes que las 3 sesiones anteriores (Prolog Brain Pack, E2E Testing, Demo UI).

### Grupo Directivo

| Agente | Rol | Estado actual |
|--------|-----|---------------|
| **@aleph** | Guía & Orquestador | ⚪ IDLE |
| **Lucas** | Personaje Teatro (MENTOR, estadio 11) | ⚪ IDLE |

### Grupo Meta-Coordinación

| Agente | Rol | Estado actual |
|--------|-----|---------------|
| @ox | Auditoría técnica & Planificación del caso de uso | ✅ DONE (T001) |
| @indice | Navegación DRY (Funcional/Técnico) | ⚪ IDLE (T004) |
| @scrum | Tracking & Gestión de backlog | ⚪ IDLE (T005) |

### Facilitadores de Plugin

| Agente | Rol | Estado actual |
|--------|-----|---------------|
| @plugin_ox_prologeditor | Interfaz con MCP Prolog | ⚪ IDLE (T003) |
| @plugin_ox_teatro | Dramaturgia & Gestión de obras | ⏳ WAITING (T002) |

---

## Objetivo Principal

**Modelar el Scriptorium como una MÁQUINA con Sensor/Actuador desde perspectiva de DRAMATURGO**.

### El Modelo Conceptual

```
┌─────────────────────────────────────────────────────────────────┐
│                    SCRIPTORIUM (Máquina)                        │
│                                                                 │
│  ┌──────────┐      ┌────────────────┐      ┌─────────────┐     │
│  │  SENSOR  │ ───► │  CEREBRO       │ ───► │  ACTUADOR   │     │
│  │  (Ox)    │      │  (Prolog Brain)│      │  (Lucas)    │     │
│  └──────────┘      └────────────────┘      └─────────────┘     │
│       │                    │                      │             │
│       │                    │                      ▼             │
│   señal:                   │                 Informa a          │
│   "parado"            procesa              otros agentes        │
│                       estado               en la obra           │
└─────────────────────────────────────────────────────────────────┘
```

### Caso de Uso Específico

1. **Ox** (sensor) detecta un estado y emite señal: `"parado"`
2. El **Cerebro Prolog** recibe y almacena el hecho: `sensor(ox, parado, Timestamp)`
3. **Lucas** (actuador) consulta el estado y, si hay cambio, **anuncia** a los demás personajes de la obra "Ítaca Digital"
4. Los demás agentes reciben la notificación del nuevo estado

### Entregables Esperados

1. **Especificación del caso de uso** (formato AsyncAPI/OpenAPI)
2. **Rutina Prolog** para el brain de Lucas que implemente el modelo sensor/actuador
3. **Edición de la obra** `itaca-digital.yaml` para integrar la nueva capacidad
4. **Documentación del patrón** como referencia para otras obras

---

## Contexto de la Obra

**Obra**: `ARCHIVO/PLUGINS/TEATRO/obras/itaca-digital.yaml`

**Lucas** es:
- **Arquetipo**: MENTOR
- **Estadio**: 11 (Resurrección)
- **Brain**: `ARCHIVO/DISCO/TALLER/ELENCO/lucas/lucas-prolog.brain.pl`
- **Rol**: Scrum Master del Índice, guardián de coherencia documental

**Queries ejemplo existentes**:
- `documentacion_coherente(X)`
- `ubicacion_canonica(como, Donde)`
- `consejo(perdido, Mensaje)`

---

## Restricciones

1. **Enfoque de Dramaturgo**: No se implementa código en esta sesión, solo se **planifica** y **especifica**
2. El output será **agregado a specs** en `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/`
3. Máximo **5 turnos** por agente para mantener foco
4. @ox lidera la planificación técnica

---

## Referencias de Backlog

- [itaca-digital.yaml](../../PLUGINS/TEATRO/obras/itaca-digital.yaml) — Obra a editar
- [usecases-dramaturgo.yaml](../../PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/usecases-dramaturgo.yaml) — Specs existentes
- [TEATRO-PROLOG-1.0.0](../../BACKLOG_BORRADORES/Enero_02_PrologAgentPack/05_backlog-teatro-prolog-integration.md) — Épica anterior relacionada

---

## Sesiones Anteriores (Contexto)

| # | Sesión | Épica | Resultado |
|---|--------|-------|-----------|
| 1 | `2026-01-03_prolog-agent-brain-pack-refinement` | PROLOG-DRY-1.0.0 | Protocolo validado, 15 turnos |
| 2 | `2026-01-03_prolog-e2e-testing` | PROLOG-E2E-1.0.0 | E2E 88.5% (23/26), 16 turnos |
| 3 | `2026-01-04_demo-ui-prologeditor` | PROLOG-UI-DEMO-1.0.0 | Demo 12/12 pasos, 2 bugs detectados |
| 4 | **Esta sesión** | DRAMATURGIA-MAQUINA-1.0.0 | 🟢 En curso |
