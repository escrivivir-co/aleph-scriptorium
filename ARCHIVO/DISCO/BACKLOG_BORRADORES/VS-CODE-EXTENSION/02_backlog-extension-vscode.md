# Backlog Sprint 2: Extensión VS Code Scriptorium

> **Sprint**: 2 — Extensión VS Code para Scriptorium
> **Feature Cycle**: 2
> **Modelo**: Fork + Refactorización de Arrakis Theater
> **Effort total**: 39 puntos
> **Fecha inicio**: 2025-12-23

---

## Épicas

| ID | Nombre | Opportunity | Effort | Prioridad |
|----|--------|-------------|--------|-----------|
| SCRIPT-2.0.0 | Carga Dinámica de Agentes | Scriptorium | 8 pts | P0 |
| SCRIPT-2.1.0 | Vista de Plugins | Scriptorium | 5 pts | P0 |
| SCRIPT-2.2.0 | ChatParticipants Scriptorium | Scriptorium | 8 pts | P0 |
| SCRIPT-2.3.0 | Vista de Backlogs | Scriptorium | 5 pts | P1 |
| SCRIPT-2.4.0 | Panel de Sprint Status | Scriptorium | 3 pts | P1 |
| SCRIPT-2.5.0 | QuickPick de Prompts | Scriptorium | 3 pts | P2 |
| SCRIPT-2.6.0 | Hover de Instructions | Scriptorium | 2 pts | P2 |
| SCRIPT-2.7.0 | Refactorización Core | Scriptorium | 5 pts | P1 |

---

## Feature Cycle 2: Estructura

```
Semana 1 (Iteración 1)          Semana 2 (Iteración 2)
├── SCRIPT-2.0.0 (8 pts)        ├── SCRIPT-2.1.0 (5 pts)
└── SCRIPT-2.7.0 (5 pts)        └── SCRIPT-2.2.0 (8 pts)
    = 13 pts                        = 13 pts

Semana 3 (Iteración 3)          Semana 4 (Iteración 4)
├── SCRIPT-2.3.0 (5 pts)        ├── SCRIPT-2.5.0 (3 pts)
└── SCRIPT-2.4.0 (3 pts)        ├── SCRIPT-2.6.0 (2 pts)
    = 8 pts                     └── Testing & Docs (5 pts)
                                    = 10 pts
```

---

# Iteración 1: Core + Carga Dinámica (13 pts)

## Épica SCRIPT-2.7.0 — Refactorización Core

**Objetivo**: Preparar el código base para la customización del Scriptorium.
**Effort**: 5 pts

### Story: SCRIPT-2.7.0-S01 — Fork y Configuración
**Effort**: 2 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T001 | Crear branch `feature/scriptorium` | 0.5 | ⏳ |
| T002 | Renombrar extensión: `scriptorium-vscode-extension` | 0.5 | ⏳ |
| T003 | Actualizar `package.json` (nombre, ID, descripción) | 0.5 | ⏳ |
| T004 | Crear `README.md` específico para Scriptorium | 0.5 | ⏳ |

**Definition of Done**: Extensión compila con nuevo nombre, sin conflictos con original.

---

### Story: SCRIPT-2.7.0-S02 — Limpieza de Módulos
**Effort**: 3 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T005 | Eliminar `MCPServerManager` (no usado) | 0.5 | ⏳ |
| T006 | Eliminar `SocketMonitor` (no usado) | 0.5 | ⏳ |
| T007 | Simplificar `HackerPanels` (mantener 1 de 3) | 1 | ⏳ |
| T008 | Refactorizar imports en `extensionBootstrap.ts` | 0.5 | ⏳ |
| T009 | Actualizar `package.json` (eliminar comandos MCP/Socket) | 0.5 | ⏳ |

**Definition of Done**: Código compila sin módulos eliminados, tests pasan.

---

## Épica SCRIPT-2.0.0 — Carga Dinámica de Agentes

**Objetivo**: Cargar agentes del Scriptorium dinámicamente desde `.github/agents/`.
**Effort**: 8 pts

### Story: SCRIPT-2.0.0-S01 — Parser de Agentes
**Effort**: 3 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T010 | Crear `AgentParser.ts` para leer frontmatter YAML | 1 | ⏳ |
| T011 | Definir interfaz `ScriptoriumAgent` | 0.5 | ⏳ |
| T012 | Implementar extracción de handoffs | 0.5 | ⏳ |
| T013 | Implementar detección de capa (UI/Backend/Sistema/Plugins) | 0.5 | ⏳ |
| T014 | Tests unitarios para parser | 0.5 | ⏳ |

**Definition of Done**: Parser extrae metadata de 20+ agentes sin errores.

---

### Story: SCRIPT-2.0.0-S02 — AgentLoader Service
**Effort**: 2 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T015 | Crear `AgentLoaderService.ts` | 0.5 | ⏳ |
| T016 | Implementar scan de `.github/agents/*.agent.md` | 0.5 | ⏳ |
| T017 | Implementar caché de agentes | 0.5 | ⏳ |
| T018 | Implementar refresh on file change (FileWatcher) | 0.5 | ⏳ |

**Definition of Done**: Service carga todos los agentes del workspace.

---

### Story: SCRIPT-2.0.0-S03 — AgentesTreeDataProvider
**Effort**: 3 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T019 | Crear `AgentesTreeDataProvider.ts` (reemplaza Teatro) | 1 | ⏳ |
| T020 | Implementar agrupación por capa (UI/Backend/Sistema/Plugins/Meta) | 0.5 | ⏳ |
| T021 | Mostrar icono según capa (🟢/🔵⚫🔴🟡🟠/⚪/🔌/⚙️) | 0.5 | ⏳ |
| T022 | Implementar tooltips con descripción y handoffs | 0.5 | ⏳ |
| T023 | Implementar acciones contextuales (abrir, invocar chat) | 0.5 | ⏳ |

**Definition of Done**: TreeView muestra 20+ agentes agrupados por capa.

---

# Iteración 2: Plugins + ChatParticipants (13 pts)

## Épica SCRIPT-2.1.0 — Vista de Plugins

**Objetivo**: Mostrar plugins instalados con sus recursos (agentes, prompts, instructions).
**Effort**: 5 pts

### Story: SCRIPT-2.1.0-S01 — PluginLoader Service
**Effort**: 2 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T024 | Crear `PluginLoaderService.ts` | 0.5 | ⏳ |
| T025 | Parsear `.github/plugins/registry.json` | 0.5 | ⏳ |
| T026 | Leer manifest.md de cada plugin | 0.5 | ⏳ |
| T027 | Extraer agentes, prompts, instructions por plugin | 0.5 | ⏳ |

**Definition of Done**: Service carga 7 plugins con sus recursos.

---

### Story: SCRIPT-2.1.0-S02 — PluginsTreeDataProvider
**Effort**: 3 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T028 | Crear `PluginsTreeDataProvider.ts` | 1 | ⏳ |
| T029 | Mostrar plugins con estado (enabled/disabled) | 0.5 | ⏳ |
| T030 | Expandir para ver agentes/prompts/instructions | 0.5 | ⏳ |
| T031 | Acción contextual: Activar/Desactivar plugin | 0.5 | ⏳ |
| T032 | Acción contextual: Abrir manifest.md | 0.5 | ⏳ |

**Definition of Done**: TreeView muestra 7 plugins expandibles.

---

## Épica SCRIPT-2.2.0 — ChatParticipants Scriptorium

**Objetivo**: Registrar agentes principales como ChatParticipants de VS Code.
**Effort**: 8 pts

### Story: SCRIPT-2.2.0-S01 — ScriptoriumChatManager
**Effort**: 2 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T033 | Crear `ScriptoriumChatManager.ts` (reemplaza Theatrical) | 1 | ⏳ |
| T034 | Definir interfaz `ScriptoriumChatAgent` | 0.5 | ⏳ |
| T035 | Implementar factory de ChatParticipants | 0.5 | ⏳ |

**Definition of Done**: Manager puede registrar ChatParticipants dinámicamente.

---

### Story: SCRIPT-2.2.0-S02 — Agentes Principales
**Effort**: 3 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T036 | Implementar ChatParticipant para @aleph | 1 | ⏳ |
| T037 | Implementar ChatParticipant para @ox | 0.5 | ⏳ |
| T038 | Implementar ChatParticipant para @blueflag | 0.5 | ⏳ |
| T039 | Implementar ChatParticipant para @redflag | 0.5 | ⏳ |
| T040 | Implementar ChatParticipant para @blackflag | 0.5 | ⏳ |

**Definition of Done**: 5 ChatParticipants operativos en Copilot Chat.

---

### Story: SCRIPT-2.2.0-S03 — Handoffs Visuales
**Effort**: 3 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T041 | Implementar followupProvider con handoffs del agente | 1 | ⏳ |
| T042 | Mostrar handoffs como botones de acción rápida | 1 | ⏳ |
| T043 | Implementar navegación entre agentes vía handoff | 1 | ⏳ |

**Definition of Done**: Usuario puede navegar entre agentes via followups.

---

# Iteración 3: Backlogs + Sprint Status (8 pts)

## Épica SCRIPT-2.3.0 — Vista de Backlogs

**Objetivo**: Mostrar backlogs oficiales y borradores en DISCO.
**Effort**: 5 pts

### Story: SCRIPT-2.3.0-S01 — BacklogLoader Service
**Effort**: 2 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T044 | Crear `BacklogLoaderService.ts` | 0.5 | ⏳ |
| T045 | Detectar backlogs oficiales (`.github/BACKLOG-*.md`) | 0.5 | ⏳ |
| T046 | Detectar borradores (`ARCHIVO/DISCO/BACKLOG_BORRADORES/`) | 0.5 | ⏳ |
| T047 | Parsear épicas y stories de cada backlog | 0.5 | ⏳ |

**Definition of Done**: Service carga 2+ backlogs con estructura.

---

### Story: SCRIPT-2.3.0-S02 — BacklogTreeDataProvider
**Effort**: 3 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T048 | Crear `BacklogTreeDataProvider.ts` | 1 | ⏳ |
| T049 | Mostrar backlogs con icono (oficial=📋 / borrador=📝) | 0.5 | ⏳ |
| T050 | Expandir para ver épicas/stories/tasks | 0.5 | ⏳ |
| T051 | Mostrar estado de tasks (⏳/🔄/✅) | 0.5 | ⏳ |
| T052 | Acción contextual: Abrir backlog | 0.5 | ⏳ |

**Definition of Done**: TreeView muestra backlogs expandibles con estado.

---

## Épica SCRIPT-2.4.0 — Panel de Sprint Status

**Objetivo**: Mostrar estado actual del sprint en un panel WebView.
**Effort**: 3 pts

### Story: SCRIPT-2.4.0-S01 — SprintStatusPanel
**Effort**: 3 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T053 | Crear `SprintStatusPanelProvider.ts` | 1 | ⏳ |
| T054 | Extraer métricas del sprint actual (tasks, %) | 0.5 | ⏳ |
| T055 | Diseñar UI con barras de progreso | 0.5 | ⏳ |
| T056 | Mostrar changelog reciente | 0.5 | ⏳ |
| T057 | Añadir botón "Tomar foto de estado" | 0.5 | ⏳ |

**Definition of Done**: Panel muestra sprint actual con métricas.

---

# Iteración 4: Prompts + Instructions + Testing (10 pts)

## Épica SCRIPT-2.5.0 — QuickPick de Prompts

**Objetivo**: Acceso rápido a prompts del Scriptorium desde Command Palette.
**Effort**: 3 pts

### Story: SCRIPT-2.5.0-S01 — PromptsQuickPick
**Effort**: 3 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T058 | Crear `PromptsQuickPickService.ts` | 0.5 | ⏳ |
| T059 | Escanear prompts core (`.github/prompts/`) | 0.5 | ⏳ |
| T060 | Escanear prompts de plugins | 0.5 | ⏳ |
| T061 | Implementar QuickPick con filtro | 0.5 | ⏳ |
| T062 | Insertar prompt seleccionado en chat | 0.5 | ⏳ |
| T063 | Añadir comando `scriptorium.prompts.quickPick` | 0.5 | ⏳ |

**Definition of Done**: Usuario puede buscar e insertar prompts.

---

## Épica SCRIPT-2.6.0 — Hover de Instructions

**Objetivo**: Mostrar hover con instrucciones relevantes al editar archivos.
**Effort**: 2 pts

### Story: SCRIPT-2.6.0-S01 — InstructionsHoverProvider
**Effort**: 2 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T064 | Crear `InstructionsHoverProvider.ts` | 0.5 | ⏳ |
| T065 | Detectar archivo actual y su contexto | 0.5 | ⏳ |
| T066 | Buscar instructions aplicables (applyTo) | 0.5 | ⏳ |
| T067 | Mostrar resumen en hover | 0.5 | ⏳ |

**Definition of Done**: Hover muestra instructions relevantes.

---

## Story: Testing y Documentación
**Effort**: 5 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T068 | Tests unitarios para AgentParser | 1 | ⏳ |
| T069 | Tests unitarios para PluginLoader | 0.5 | ⏳ |
| T070 | Tests unitarios para BacklogLoader | 0.5 | ⏳ |
| T071 | Tests de integración: carga completa | 1 | ⏳ |
| T072 | Actualizar README.md con documentación | 1 | ⏳ |
| T073 | Crear CONTRIBUTING.md para la extensión | 0.5 | ⏳ |
| T074 | Publicar v0.1.0-scriptorium | 0.5 | ⏳ |

**Definition of Done**: Extensión documentada y publicada.

---

## Métricas Sprint 2

| Métrica | Target | Mínimo | Estado |
|---------|--------|--------|--------|
| Tasks totales | 74 | 50 | ⏳ |
| % Completadas | 100% | 80% | 0% |
| Agentes cargados | 20+ | 15 | ⏳ |
| Plugins visibles | 7 | 5 | ⏳ |
| ChatParticipants | 5 | 3 | ⏳ |
| Backlogs visibles | 2+ | 1 | ⏳ |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| vscode-alephscript-extension | ✅ | Base de código fuente |
| ALEPH/.github/agents/ | ✅ | 20+ agentes definidos |
| ALEPH/.github/plugins/ | ✅ | 7 plugins instalados |
| ALEPH/.github/prompts/ | ✅ | 30+ prompts |
| VS Code ^1.95.0 | ✅ | API ChatParticipant |
| TypeScript | ✅ | tsconfig existente |

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-23 | Crear backlog borrador Sprint 2 | @scrum |
| 2025-12-23 | Definir 8 épicas (39 pts) | @scrum |
| 2025-12-23 | Detallar 74 tasks en 4 iteraciones | @scrum |

---

## Próximo Paso

Este backlog está en estado **BORRADOR** en `ARCHIVO/DISCO/BACKLOG_BORRADORES/`.

Para aprobar y publicar:
1. Revisar con PO
2. Invocar `@plugin_ox_scrum` → "Aprobar y publicar backlog"
3. El backlog se moverá a `.github/BACKLOG-SCRIPTORIUM.md` como nueva épica

---

## Arquitectura Propuesta

```
vscode-scriptorium-extension/
├── src/
│   ├── extension.ts                    # Entry point
│   ├── core/
│   │   ├── extensionBootstrap.ts       # Mantener (refactorizar)
│   │   ├── configurationService.ts     # Mantener
│   │   ├── errorBoundary.ts            # Mantener
│   │   └── loggingManager.ts           # Mantener
│   ├── scriptorium/                    # NUEVO
│   │   ├── ScriptoriumChatManager.ts
│   │   ├── services/
│   │   │   ├── AgentLoaderService.ts
│   │   │   ├── PluginLoaderService.ts
│   │   │   ├── BacklogLoaderService.ts
│   │   │   └── PromptsService.ts
│   │   ├── parsers/
│   │   │   ├── AgentParser.ts
│   │   │   ├── PluginParser.ts
│   │   │   └── BacklogParser.ts
│   │   └── participants/
│   │       ├── AlephChatParticipant.ts
│   │       ├── OxChatParticipant.ts
│   │       └── BanderasChatParticipant.ts
│   ├── views/
│   │   ├── AgentesTreeDataProvider.ts   # Reemplaza TeatroTreeDataProvider
│   │   ├── PluginsTreeDataProvider.ts   # NUEVO
│   │   ├── BacklogTreeDataProvider.ts   # NUEVO
│   │   └── SprintStatusPanelProvider.ts # NUEVO
│   └── editors/
│       ├── AgentContentEditorProvider.ts # Mantener
│       └── AgentConfigEditorProvider.ts  # Mantener
├── media/
│   ├── scriptorium.css                  # NUEVO (reemplaza hacker-*)
│   └── scriptorium.js
├── package.json                         # Actualizado
└── README.md                            # Nuevo para Scriptorium
```
