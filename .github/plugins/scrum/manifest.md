---
id: scrum
name: "Gestión Scrum DRY"
version: "2.0.0"
description: "Plugin para gestión ágil con modelo DRY: el backlog principal es un índice ligero que referencia borradores y archivados. Diseñado para mitigar context bloat."
author: "Aleph Scriptorium"
license: "AIPL v1.0"

scriptorium_version: ">=1.0.0"
dependencies: []

agents:
  - name: "Scrum"
    file: "agents/scrum.agent.md"
    description: "Coordinador Scrum. Gestiona índice de referencias, NO contenido detallado."

prompts:
  - name: "planificar-sprint"
    file: "prompts/planificar-sprint.prompt.md"
    description: "Iniciar conversación PO-SM en BACKLOG_BORRADORES."
  - name: "crear-backlog-borrador"
    file: "prompts/crear-backlog-borrador.prompt.md"
    description: "Crear borrador detallado en DISCO."
  - name: "aprobar-backlog"
    file: "prompts/aprobar-backlog.prompt.md"
    description: "Añadir referencia al índice oficial (no copiar contenido)."
  - name: "tracking-sprint"
    file: "prompts/tracking-sprint.prompt.md"
    description: "Actualizar estado en borrador activo."
  - name: "retrospectiva"
    file: "prompts/retrospectiva.prompt.md"
    description: "Mover borrador a archivado y actualizar índice."

instructions:
  - name: "scrum-protocol"
    file: "instructions/scrum-protocol.instructions.md"
    description: "Protocolo DRY: índice ligero + referencias."

handoffs:
  - label: "Planificar nuevo sprint"
    agent: "Scrum"
    prompt: "Crea carpeta en BACKLOG_BORRADORES y añade referencia al índice."
  - label: "Crear backlog borrador"
    agent: "Scrum"
    prompt: "Genera borrador detallado en DISCO (no en índice)."
  - label: "Aprobar y referenciar"
    agent: "Scrum"
    prompt: "Añade fila de referencia al índice oficial."
  - label: "Actualizar tracking"
    agent: "Scrum"
    prompt: "Actualiza estado en el borrador (no en índice)."
  - label: "Cerrar sprint"
    agent: "Scrum"
    prompt: "Mueve borrador a BACKLOG_ARCHIVADOS y actualiza referencias."
---

# Plugin: Gestión Scrum de Backlogs

## Propósito

Este plugin implementa un **protocolo formal** para la gestión ágil de backlogs en el Scriptorium, separando claramente:

1. **Fase de Edición** (DISCO): Conversaciones, borradores, iteraciones
2. **Fase de Publicación** (Backlogs oficiales): Versión aprobada y versionada
3. **Fase de Tracking** (Desarrollo): Actualización de estado durante ejecución

## Filosofía

> "El backlog se cocina en DISCO, se sirve en .github/"

El espacio `ARCHIVO/DISCO/` actúa como **memoria de trabajo** donde se pueden explorar ideas, iterar borradores y mantener conversaciones sin contaminar los backlogs oficiales. Solo cuando un backlog está aprobado se "publica" a los archivos canónicos.

## Roles

| Rol | Responsabilidad | Representado por |
|-----|-----------------|------------------|
| **Product Owner (PO)** | Define qué se construye, prioriza | Usuario o simulación |
| **Scrum Master (SM)** | Facilita el proceso, protege el equipo | Agente @scrum |
| **DevOps** | Ejecuta las tareas, reporta estado | Agente @aleph |

## Flujo de Trabajo

```
┌─────────────────────────────────────────────────────────────────┐
│                     PROTOCOLO SCRUM                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. PLANIFICAR                    2. EDITAR                      │
│  ┌──────────────┐                ┌──────────────┐               │
│  │ Conversación │ ──────────────▶│   Backlog    │               │
│  │   PO + SM    │                │   Borrador   │               │
│  │  (en DISCO)  │                │  (en DISCO)  │               │
│  └──────────────┘                └──────┬───────┘               │
│                                         │                        │
│                                         ▼                        │
│  4. TRACKING                     3. APROBAR                      │
│  ┌──────────────┐                ┌──────────────┐               │
│  │  Actualizar  │ ◀──────────────│   Publicar   │               │
│  │   Estado     │                │   Oficial    │               │
│  │ (en oficial) │                │ (en .github) │               │
│  └──────┬───────┘                └──────────────┘               │
│         │                                                        │
│         ▼                                                        │
│  5. CERRAR                                                       │
│  ┌──────────────┐                                               │
│  │ Retrospectiva│                                               │
│  │ Foto Estado  │                                               │
│  │  Siguiente   │                                               │
│  └──────────────┘                                               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Casos de Uso

### UC1: Planificar Sprint

**Actor**: Usuario (como PO)  
**Trigger**: "Quiero planificar el próximo sprint"

1. @scrum crea carpeta en `DISCO/{Mes}_{Año}_release/`
2. @scrum inicia conversación simulando diálogo PO-SM
3. Usuario aporta dirección, @scrum facilita estructura
4. Resultado: `01_planificacion-sprintN.md`

### UC2: Crear Backlog Borrador

**Actor**: @scrum  
**Trigger**: Conversación de planificación completada

1. @scrum extrae épicas, stories, tasks de la conversación
2. @scrum genera `02_backlog-sprintN.md` en DISCO
3. @scrum asigna effort points (sin cronología)
4. Resultado: Backlog borrador listo para revisión

### UC3: Aprobar y Publicar

**Actor**: Usuario (como PO)  
**Trigger**: "Aprueba este backlog"

1. @scrum valida estructura del borrador
2. @scrum identifica Opportunity afectada (Scriptorium/Fundación)
3. @scrum integra en backlog oficial correspondiente
4. @scrum genera commit según protocolo DevOps
5. Resultado: Backlog oficial actualizado

### UC4: Tracking de Sprint

**Actor**: @aleph (DevOps)  
**Trigger**: Task completada durante desarrollo

1. @aleph notifica a @scrum de task completada
2. @scrum actualiza estado en backlog oficial
3. @scrum recalcula métricas (% avance, effort consumido)
4. Resultado: Backlog sincronizado con realidad

### UC5: Cerrar Sprint

**Actor**: @scrum  
**Trigger**: Sprint completado o tiempo agotado

1. @scrum genera retrospectiva (qué funcionó, qué no)
2. @scrum crea foto de estado en `ARCHIVO/FOTOS_ESTADO/`
3. @scrum mueve backlog borrador a archivo
4. @scrum prepara conversación para siguiente sprint
5. Resultado: Sprint cerrado, siguiente planificado

## Estructura de Datos

### En DISCO (Borradores)

```
ARCHIVO/DISCO/{Mes}_{Año}_release/
├── 01_planificacion-sprintN.md    # Conversación PO-SM
├── 02_backlog-sprintN.md          # Backlog borrador
├── 03_notas-*.md                  # Notas adicionales
└── README.md                      # Índice de la release
```

### En Backlogs Oficiales

```
.github/
├── BACKLOG-SCRIPTORIUM.md         # Opportunity: Scriptorium
└── PROYECTOS/FUNDACION/
    └── BACKLOG-FUNDACION.md       # Opportunity: Fundación
```

### En Fotos de Estado

```
ARCHIVO/FOTOS_ESTADO/
├── 2025-12-21_Sprint0_Bootstrap.md
├── 2025-12-22_Sprint1_Teatro.md
└── ...
```

## Integración con Sistema

| Componente | Integración |
|------------|-------------|
| @aleph | Recibe tasks, reporta completadas |
| @ox | Registra @scrum en índice de agentes |
| DEVOPS.md | Scrum sigue protocolo de commits |
| Plugins | Puede crear tasks para cualquier plugin |

## Métricas Gestionadas

| Métrica | Descripción | Calculada por |
|---------|-------------|---------------|
| Effort total | Suma de puntos del sprint | @scrum |
| Effort completado | Puntos de tasks ✅ | @scrum |
| % Avance | Completado / Total × 100 | @scrum |
| Velocity | Effort/iteración promedio | @scrum (histórico) |
| Buffer consumido | Puntos de mejoras usados | @scrum |

## Comandos del Agente

| Comando | Acción |
|---------|--------|
| `planificar` | Inicia conversación PO-SM |
| `borrador` | Genera backlog desde conversación |
| `aprobar` | Publica backlog en oficial |
| `tracking` | Actualiza estado de tasks |
| `cerrar` | Retrospectiva y foto de estado |
| `status` | Muestra métricas actuales |
