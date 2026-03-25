# Epic: SCRUM-REFACTOR-1.0.0

## Metadata

```yaml
epic_id: SCRUM-REFACTOR-1.0.0
nombre: "Refactorización Plugin Scrum con Modelo Generativo + Lucas DRY"
tipo: BREAKING CHANGE
effort: 46 pts
prioridad: P0
sprint: FC1
estado: � En progreso

origen:
  tipo: sesion-cotrabajo
  referencia: SESIONES_COTRABAJO/2026-01-05_consenso-agile-scriptorium/
  actas: [T001, T002, T003, T004]
  consenso: "Modelo Generativo + Lucas DRY"
  fecha_consenso: 2026-01-05
```

---

## Contexto

### Problema

El plugin Scrum y el protocolo de Cotrabajo operaban como sistemas desconectados:

```
ANTES:
┌─────────────────────┐         ┌─────────────────────┐
│ SESIONES_COTRABAJO/ │         │ BACKLOG_BORRADORES/ │
│ (trabajo vivo)      │    ?    │ (planificación)     │
│ Turno → Acta        │◄───────►│ Borrador → Epic     │
└─────────────────────┘         └─────────────────────┘
         Sin puente formal
```

### Solución: Modelo Generativo

Las sesiones de cotrabajo son **Ceremonias Productivas** que PRODUCEN artefactos Scrum como OUTPUT:

```
DESPUÉS:
┌─────────────────────┐    PRODUCE    ┌─────────────────────┐
│ SESIONES_COTRABAJO/ │──────────────►│ BACKLOG_BORRADORES/ │
│ (trabajo vivo)      │               │ (planificación)     │
│ Turno → Acta        │               │ Borrador → Epic     │
│                     │               │ origen: sesión      │
└─────────────────────┘               └─────────────────────┘
         │                                     │
         └────── Entidad separada ─────────────┘
              (NO se transforma)
```

### Principios Clave

1. **Sesión ≠ Borrador**: Relación 1:N (una sesión puede producir múltiples artefactos)
2. **PAC es ortogonal**: No mezclar con este problema
3. **Metadata mínima**: Solo `origen:` en frontmatter del borrador
4. **Sin síntesis automática**: No resumir actas (evita context bloat)

---

## Stories

### Story 1: scrum.agent.md como Referencia DRY a Lucas (13 pts)

**Objetivo**: El agente @scrum "interpreta" a Lucas en lugar de duplicar expertise.

| Task | Descripción | Effort |
|------|-------------|--------|
| T1.1 | Documentar que scrum.agent.md "interpreta" a Lucas | 2 |
| T1.2 | Añadir handoff para cargar contexto Lucas | 3 |
| T1.3 | Verificar personajes-registry.json (Lucas ya existe) | 1 |
| T1.4 | Refactorizar manifest.md con nueva identidad | 2 |
| T1.5 | Test: @scrum invoca expertise de Lucas sin duplicar | 3 |
| T1.6 | Documentar en README del plugin | 2 |

**Dependencias**: SCRIPT-2.4.0 (Personaje Context Protocol) ✅ Implementado

### Story 2: plugin_ox_scrum con Invocación de Lucas (8 pts)

**Objetivo**: El bridge puede cargar contexto de Lucas bajo demanda.

| Task | Descripción | Effort |
|------|-------------|--------|
| T2.1 | Añadir handoff "🎭 Cargar contexto Lucas" | 2 |
| T2.2 | Documentar casos de uso (cuándo invocar Lucas) | 2 |
| T2.3 | Refactorizar bridge completo | 2 |
| T2.4 | Test: Usuario → @scrum → bridge ofrece cargar Lucas | 2 |

**Dependencias**: Story 1 completada

### Story 3: Modelo Generativo en Plugin Scrum (25 pts)

**Objetivo**: Implementar comandos y protocolo del Modelo Generativo.

| Task | Descripción | Effort |
|------|-------------|--------|
| T3.1 | Reescribir scrum-protocol.instructions.md | 5 |
| T3.2 | Implementar comando `generar-desde-sesion` | 5 |
| T3.3 | Extender comando `cerrar --incluir-sesiones` | 3 |
| T3.4 | Extender comando `status` con sesiones activas | 2 |
| T3.5 | Añadir metadata `origen:` a template de borrador | 2 |
| T3.6 | Reescribir prompts del plugin | 5 |
| T3.7 | Actualizar README completo | 3 |

**Dependencias**: Stories 1 y 2 completadas

---

## Inventario de Archivos AFECTADOS

### A. Plugin Scrum (RESET COMPLETO)

| Archivo | Acción |
|---------|--------|
| `.github/plugins/scrum/manifest.md` | 🔴 REESCRIBIR |
| `.github/plugins/scrum/agents/scrum.agent.md` | 🔴 REESCRIBIR |
| `.github/plugins/scrum/instructions/scrum-protocol.instructions.md` | 🔴 REESCRIBIR |
| `.github/plugins/scrum/prompts/*.prompt.md` | 🔴 REESCRIBIR |

### B. Bridge Scrum

| Archivo | Acción |
|---------|--------|
| `.github/agents/plugin_ox_scrum.agent.md` | 🔴 REESCRIBIR |

### C. Colaterales (46 referencias)

Ver [checklist-colaterales.md](checklist-colaterales.md) para lista completa.

---

## Plan de Migración

```
FASE 0: SNAPSHOT
├── git branch backup/scrum-v2.0.0
├── mcp_copilot-logs-_capture_snapshot("pre-scrum-reset")
└── Documentar estado actual

FASE 1: RESET PLUGIN (S1)
├── REESCRIBIR manifest.md
├── REESCRIBIR scrum.agent.md como referencia DRY a Lucas
└── Test: @scrum interpreta a Lucas

FASE 2: RESET BRIDGE (S2)
├── REESCRIBIR plugin_ox_scrum.agent.md
├── Añadir handoff para cargar Lucas
└── Test: Flujo completo Usuario → @scrum → Lucas

FASE 3: MODELO GENERATIVO (S3)
├── REESCRIBIR scrum-protocol.instructions.md
├── Implementar `generar-desde-sesion`
├── Extender `cerrar` y `status`
└── REESCRIBIR prompts

FASE 4: NEUTRALIZAR COLATERALES
├── ACTUALIZAR AGENTS.md
├── VERIFICAR copilot-instructions.md
├── ACTUALIZAR docs/ecosistema.md
├── VERIFICAR todas las referencias
└── Test E2E

FASE 5: VALIDACIÓN FINAL
├── Test: Generar borrador desde sesión
├── Test: Cerrar sprint incluyendo sesiones
├── Test: Status muestra sesiones activas
└── Verificar NO referencias rotas
```

---

## Definition of Done

- [ ] Story 1: @scrum interpreta a Lucas correctamente
- [ ] Story 2: Bridge ofrece cargar contexto Lucas
- [ ] Story 3: Comando `generar-desde-sesion` funciona
- [ ] Story 3: Comando `cerrar --incluir-sesiones` funciona
- [ ] Story 3: `status` muestra sesiones activas
- [ ] Todas las referencias actualizadas (46)
- [ ] No hay referencias rotas
- [ ] README del plugin actualizado
- [ ] Test E2E pasando

---

## Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| SCRIPT-2.4.0 incompleto | Baja | Alto | Verificar antes de iniciar |
| Referencias rotas en docs | Media | Medio | Checklist de 46 items |
| Obras de teatro con @scrum | Baja | Bajo | Solo verificar, no rompen |

---

## Aprobaciones

| Rol | Agente | Estado | Fecha |
|-----|--------|--------|-------|
| Arquitecto | @lucas | ✅ Propuesta aceptada | 2026-01-05 |
| Validación técnica | @ox | ✅ Aprobado | 2026-01-05 |
| Product Owner | @aleph | ✅ Aprobado | 2026-01-05 |

---

**Estado**: 📋 Ready para implementación  
**Próximo paso**: Ejecutar FASE 0 (snapshot + backup)
