---
id: scrum
name: "Scrum — Interpreta a Lucas"
version: "3.0.0"
description: "Plugin Scrum con Modelo Generativo. El agente @scrum 'interpreta' a Lucas para expertise DRY. Las sesiones de cotrabajo PRODUCEN artefactos Scrum."
author: "Aleph Scriptorium"
license: "AIPL v1.0"

scriptorium_version: ">=1.0.0"
dependencies:
  - "SCRIPT-2.4.0"  # Personaje Context Protocol

# Referencia DRY a Lucas
interpreta:
  personaje: "lucas"
  fuente: "ARCHIVO/DISCO/TALLER/ELENCO/lucas/"
  brain: "lucas-prolog.brain.pl"
  carga: "bajo-demanda"  # No cargar automáticamente

agents:
  - name: "Scrum"
    file: "agents/scrum.agent.md"
    description: "Scrum Master que interpreta a Lucas. Implementa Modelo Generativo."

prompts:
  - name: "planificar-sprint"
    file: "prompts/planificar-sprint.prompt.md"
    description: "Crear carpeta en BACKLOG_BORRADORES y referencia en índice."
  - name: "crear-backlog-borrador"
    file: "prompts/crear-backlog-borrador.prompt.md"
    description: "Crear borrador detallado en DISCO."
  - name: "generar-desde-sesion"
    file: "prompts/generar-desde-sesion.prompt.md"
    description: "NUEVO: Generar borrador desde sesión de cotrabajo cerrada."
  - name: "aprobar-backlog"
    file: "prompts/aprobar-backlog.prompt.md"
    description: "Cambiar estado en índice (📋→✅)."
  - name: "tracking-sprint"
    file: "prompts/tracking-sprint.prompt.md"
    description: "Actualizar estado en borrador activo."
  - name: "retrospectiva"
    file: "prompts/retrospectiva.prompt.md"
    description: "Cerrar sprint, opcionalmente incluyendo sesiones."

instructions:
  - name: "scrum-protocol"
    file: "instructions/scrum-protocol.instructions.md"
    description: "Protocolo DRY + Modelo Generativo."

handoffs:
  - label: "Planificar nuevo sprint"
    agent: "Scrum"
    prompt: "Crea carpeta en BACKLOG_BORRADORES y añade referencia al índice."
  - label: "Crear backlog borrador"
    agent: "Scrum"
    prompt: "Genera borrador detallado en DISCO (no en índice)."
  - label: "🆕 Generar desde sesión"
    agent: "Scrum"
    prompt: "Genera borrador desde sesión de cotrabajo cerrada (Modelo Generativo)."
  - label: "Aprobar y referenciar"
    agent: "Scrum"
    prompt: "Añade fila de referencia al índice oficial."
  - label: "Actualizar tracking"
    agent: "Scrum"
    prompt: "Actualiza estado en el borrador (no en índice)."
  - label: "Cerrar sprint"
    agent: "Scrum"
    prompt: "Mueve borrador a BACKLOG_ARCHIVADOS y actualiza referencias."
  - label: "🎭 Cargar contexto Lucas"
    agent: "Scrum"
    prompt: "Carga expertise de Lucas bajo demanda (brain Prolog + templates)."
---

# Plugin: Scrum v3.0.0 — Modelo Generativo

## ⚠️ BREAKING CHANGE desde v2.0.0

Este plugin implementa el **Modelo Generativo** consensuado en la sesión `2026-01-05_consenso-agile-scriptorium`:

- Las sesiones de cotrabajo **PRODUCEN** artefactos Scrum (no SE TRANSFORMAN)
- El agente @scrum **interpreta a Lucas** en lugar de duplicar expertise
- Nuevo comando: `generar-desde-sesion`

## Filosofía

> "La sesión produce, el borrador recibe."

```
┌─────────────────────┐    PRODUCE    ┌─────────────────────┐
│ SESIONES_COTRABAJO/ │──────────────►│ BACKLOG_BORRADORES/ │
│ (trabajo vivo)      │               │ (planificación)     │
│ Turno → Acta        │               │ Borrador → Epic     │
│                     │               │ origen: sesión      │
└─────────────────────┘               └─────────────────────┘
```

## Principio DRY

| Dónde | Qué |
|-------|-----|
| `.github/BACKLOG-SCRIPTORIUM.md` | Índice de ~50 líneas con referencias |
| `ARCHIVO/DISCO/BACKLOG_BORRADORES/` | Contenido detallado activo |
| `ARCHIVO/DISCO/BACKLOG_ARCHIVADOS/` | Sprints cerrados |
| `ARCHIVO/DISCO/SESIONES_COTRABAJO/` | Sesiones multi-agente |

## Referencia DRY a Lucas

Este plugin **no duplica** expertise Scrum. En su lugar, "interpreta" a Lucas:

```yaml
interpreta:
  personaje: "lucas"
  fuente: "ARCHIVO/DISCO/TALLER/ELENCO/lucas/"
  brain: "lucas-prolog.brain.pl"
  carga: "bajo-demanda"
```

Cuando @scrum necesita expertise avanzada:
1. Carga `lucas.agent.md` (identidad)
2. Opcionalmente carga `lucas-prolog.brain.pl` (razonamiento)
3. Opcionalmente carga `templates-index.json` (plantillas)

## Comandos

| Comando | Descripción | Nuevo |
|---------|-------------|-------|
| `planificar` | Crear carpeta + referencia | |
| `borrador` | Generar backlog detallado | |
| `generar-desde-sesion` | Producir borrador desde sesión cerrada | 🆕 |
| `aprobar` | Cambiar estado en índice | |
| `tracking` | Actualizar tasks en borrador | |
| `cerrar` | Archivar sprint (opción: --incluir-sesiones) | 🔄 |
| `status` | Mostrar métricas + sesiones activas | 🔄 |

## Flujo Modelo Generativo

```
1. Sesión de cotrabajo (SESIONES_COTRABAJO/)
   └── Trabajo multi-agente → Actas → Consenso
   
2. Cierre de sesión (tipo: Productiva)
   └── @scrum generar-desde-sesion
   
3. Borrador generado (BACKLOG_BORRADORES/)
   └── origen: {sesión}
   └── Estructura épica/stories/tasks
   
4. Flujo Scrum normal
   └── aprobar → tracking → cerrar
```

## Tipos de Cierre de Sesión

| Tipo | Produce | Acción @scrum |
|------|---------|---------------|
| **Exploratoria** | Nada | Solo registrar en histórico |
| **Normativa** | Decisiones | Documentar en instrucciones |
| **Productiva** | Borrador | `generar-desde-sesion` |

## Integración con SCRIPT-2.4.0

El protocolo de "interpretar personaje" permite que @scrum:
- Herede conocimiento de Lucas sin duplicación
- Acceda a plantillas de AgentLoreSDK bajo demanda
- Use razonamiento Prolog para casos complejos

---

**Versión**: 3.0.0  
**Épica origen**: SCRUM-REFACTOR-1.0.0  
**Sesión origen**: 2026-01-05_consenso-agile-scriptorium
