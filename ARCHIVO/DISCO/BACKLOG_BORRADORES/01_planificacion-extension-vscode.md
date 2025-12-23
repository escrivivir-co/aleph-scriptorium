# Planificación Épica: Extensión VS Code para Scriptorium

> **Fecha**: 2025-12-23
> **Participantes**: Product Owner (Usuario), Scrum Master (@scrum)
> **Contexto**: Auditoría de `vscode-alephscript-extension` y propuesta de customización para ALEPH Scriptorium

---

## Apertura

**SM**: El Sprint 1 (Teatro Interactivo + Scrum) ha sido completado al 100%. El Scriptorium cuenta ahora con:
- Sistema de plugins funcional (7 plugins instalados)
- Teatro transmedia con visualizador impress.js
- Protocolo Scrum formal para gestión de backlogs
- Sistema de agentes con bridges (`plugin_ox_*`)
- Pipeline AGENT_CREATOR → ARG_BOARD → TEATRO → GH-PAGES

El usuario ha solicitado explorar la posibilidad de extender/refactorizar la extensión `vscode-alephscript-extension` (Arrakis Theater Chat Engine) para crear una versión especializada para el Scriptorium.

**PO**: El objetivo es obtener una extensión de VS Code que potencie el flujo de trabajo del Scriptorium, aprovechando las capacidades existentes del Arrakis Theater pero adaptándolas a la ontología de agentes, plugins y backlogs del proyecto ALEPH.

---

## Auditoría: vscode-alephscript-extension

### Capacidades Actuales Identificadas

| Módulo | Descripción | Relevancia Scriptorium |
|--------|-------------|------------------------|
| **TheatricalChatManager** | Gestión de 5 ChatParticipants (Isaac, Don Álvaro, Capitán Dídac, Indra, Backend) | 🟡 Adaptable |
| **TeatroTreeDataProvider** | TreeView lateral con agentes, estados activo/inactivo | 🟢 Alta |
| **TeatroWebViewProvider** | Panel WebView para control del teatro | 🟢 Alta |
| **HackerControlPanelProvider** | Panel de control con estética hacker (verde/negro) | 🟡 Opcional |
| **HackerCommandPanelProvider** | Panel de comandos estilo terminal | 🟡 Opcional |
| **AgentContentEditorProvider** | Editor de contenido de agentes (.agent.md) | 🟢 Alta |
| **AgentConfigEditorProvider** | Editor de configuración JSON de agentes | 🟢 Alta |
| **MCPServerManager** | Gestión de servidores MCP | 🔴 Baja |
| **SocketMonitor** | Monitorización Socket.IO | 🔴 Baja |
| **UIManager** | Gestión de interfaces UI | 🟡 Adaptable |
| **LogsTreeDataProvider** | Vista de logs estructurada | 🟢 Alta |
| **ConfigsTreeDataProvider** | Vista de configuraciones | 🟢 Alta |

### Arquitectura Core

```
ExtensionBootstrap
├── managers/
│   ├── factory (ManagerFactory)
│   ├── errorBoundary (ErrorBoundary)
│   ├── config (ConfigurationService)
│   ├── logging (LoggingManager)
│   ├── process (ProcessManager)
│   ├── webView (WebViewManager)
│   ├── commandPalette (CommandPaletteManager)
│   ├── analytics (AnalyticsService)
│   └── aiAssistant (AIAssistantService)
├── theatrical/
│   ├── TheatricalChatManager
│   └── agents/ (5 personajes con ChatParticipant)
├── views/
│   ├── TeatroTreeDataProvider
│   ├── TeatroWebViewProvider
│   └── HackerPanels (3)
└── treeViews/ (5 TreeDataProviders)
```

### Agentes del Arrakis Theater (Elenco Actual)

| ID | Nombre | Categoría | Expertise |
|----|--------|-----------|-----------|
| isaac | Isaac - Marinero Fiel | framework-retro | project-management, documentation |
| don-alvaro | Don Álvaro - Capataz | framework-retro | quality-assurance, partnership-historico |
| capitan-didac | Capitán Dídac | framework-retro | project-leadership, architecture |
| indra | Indra - Integration | technical-devops | integration, cross-component |
| backend-agent | Backend Agent | technical-devops | express-js, nodejs, backend |

---

## Auditoría: ALEPH Scriptorium

### Sistema de Agentes (Ontología @ox)

```
🐂 OX (Meta) ← Oráculo
│
├─── 🟢 UI (Producción)
│    @aleph, @revisor, @periodico
│
├─── 🔵⚫🔴🟡🟠 Backend (Auditoría)
│    @blueflag, @blackflag, @redflag, @yellowflag, @orangeflag
│
├─── ⚪ Sistema (Navegación)
│    @vestibulo, @cartaspuerta
│
├─── ⚙️ Meta (Gestión)
│    @pluginmanager, @ox
│
└─── 🔌 Plugins (Bridges)
     @plugin_ox_argboard, @plugin_ox_enciclopedia, @plugin_ox_ghpages
     @plugin_ox_foroscraper, @plugin_ox_agentcreator, @plugin_ox_teatro
     @plugin_ox_scrum
```

### Plugins Instalados (registry.json)

| Plugin | Versión | Agentes | Prompts | Estado |
|--------|---------|---------|---------|--------|
| scrum | 1.0.0 | 1 | 5 | ✅ |
| teatro | 1.0.0 | 1 | 3 | ✅ |
| agent-creator | 1.1.0 | 1 | 5 | ✅ |
| arg-board | 1.0.0 | 8 | 4 | ✅ |
| enciclopedia | 1.0.0 | 2 | 2 | ✅ |
| gh-pages | 1.0.0 | 1 | 3 | ✅ |
| foro-scraper | 1.0.0 | 1 | 3 | ✅ |

### Flujos de Trabajo Clave

1. **Producción textual**: @aleph → Auditores (5 banderas) → @revisor → Commit
2. **Gestión Scrum**: DISCO (borradores) → Aprobación → Backlog oficial → Tracking
3. **Teatro transmedia**: AGENT_CREATOR → ARG_BOARD → TEATRO → GH-PAGES
4. **Consulta**: @ox (oráculo) → Cualquier agente/plugin

---

## Análisis de Sinergias

### Lo que el Scriptorium NECESITA que la extensión NO tiene:

| Necesidad | Estado Actual | Prioridad |
|-----------|---------------|-----------|
| TreeView de agentes del Scriptorium (20+ vs 5) | ❌ Hardcodeado | P0 |
| Carga dinámica de agentes desde `.github/agents/` | ❌ Estático | P0 |
| Integración con sistema de plugins (.github/plugins/) | ❌ No existe | P0 |
| Vista de Backlogs (DISCO + oficial) | ❌ No existe | P1 |
| Panel de estado del sprint actual | ❌ No existe | P1 |
| Handoffs visuales entre agentes | ❌ Solo texto | P1 |
| Detección de prompts/instructions de plugins | ❌ No existe | P2 |
| Galería de fotos de estado | ❌ No existe | P2 |
| Editor visual de YAML de obras (Teatro) | ❌ No existe | P2 |

### Lo que la extensión TIENE que el Scriptorium PUEDE usar:

| Capacidad | Aplicación en Scriptorium |
|-----------|---------------------------|
| Arquitectura de ChatParticipants | Migrar agentes del Scriptorium como ChatParticipants |
| TreeDataProviders reutilizables | Base para AgentesTreeProvider, BacklogTreeProvider |
| WebViewProviders con estética | Panel de control del Scriptorium |
| AgentContentEditorProvider | Edición de .agent.md del Scriptorium |
| LoggingManager | Logging de operaciones Scrum |
| ConfigurationService | Gestión de settings del Scriptorium |
| ErrorBoundary | Manejo de errores en comandos |
| CommandPaletteManager | Comandos del Scriptorium en paleta |

---

## Propuesta de Customización

### Modelo: Fork + Refactorización

```
vscode-alephscript-extension (Arrakis Theater)
         │
         ├── Mantener Core ────────────────────┐
         │   - ExtensionBootstrap              │
         │   - managers/                       │
         │   - LoggingManager                  │
         │   - ConfigurationService            │
         │   - ErrorBoundary                   │
         │                                     │
         ├── Refactorizar ─────────────────────┤
         │   - TheatricalChatManager           │
         │     → ScriptoriumChatManager        │
         │   - TeatroTreeDataProvider          │
         │     → AgentesTreeDataProvider       │
         │   - agents/ (5 personajes)          │
         │     → Carga dinámica desde          │
         │       .github/agents/*.agent.md     │
         │                                     │
         ├── Añadir ───────────────────────────┤
         │   - PluginsTreeDataProvider         │
         │   - BacklogTreeDataProvider         │
         │   - SprintStatusPanel               │
         │   - PromptsQuickPick                │
         │   - InstructionsHover               │
         │                                     │
         └── Eliminar (opcional) ──────────────┤
             - HackerPanels (estética)         │
             - MCPServerManager                │
             - SocketMonitor                   │
             - Socket.IO/WebRTC                │
```

---

## Objetivo SMART del Sprint

**Específico**: Crear una versión de la extensión VS Code customizada para ALEPH Scriptorium que:
1. Cargue dinámicamente los agentes desde `.github/agents/`
2. Muestre plugins instalados desde `.github/plugins/registry.json`
3. Ofrezca vista de backlogs (borrador en DISCO + oficiales)
4. Registre ChatParticipants para los agentes principales (@aleph, @ox, banderas)

**Medible**: 
- 20+ agentes cargados dinámicamente
- 7 plugins visibles en TreeView
- 2 backlogs (Scriptorium, Fundación) accesibles
- 5 ChatParticipants operativos (@aleph, @ox, @blueflag, @redflag, @blackflag)

**Alcanzable**: Sí, reutilizando >60% del código existente.

**Relevante**: Potencia el flujo de trabajo del Scriptorium desde VS Code.

**Temporal**: Sprint 2 (4 semanas = 4 iteraciones).

---

## Épicas Propuestas

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

---

## Riesgos Identificados

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Incompatibilidad API VS Code | Baja | Alto | Mantener versión ^1.95.0 |
| Conflicto con extensión original | Media | Medio | Cambiar ID de extensión |
| Parsing de .agent.md falla | Media | Alto | Tests unitarios robustos |
| Performance con 20+ agentes | Baja | Medio | Lazy loading |
| Falta de documentación original | Media | Medio | Auditoría previa (ya hecha) |

---

## Cierre

**SM**: Se propone crear épica SCRIPT-2.0.0 y siguientes para el Sprint 2, con foco en:
1. **Semana 1**: Carga dinámica de agentes (SCRIPT-2.0.0) + Refactorización core (SCRIPT-2.7.0)
2. **Semana 2**: Vista de plugins (SCRIPT-2.1.0) + ChatParticipants (SCRIPT-2.2.0)
3. **Semana 3**: Vista de backlogs (SCRIPT-2.3.0) + Sprint status (SCRIPT-2.4.0)
4. **Semana 4**: QuickPick prompts (SCRIPT-2.5.0) + Hover instructions (SCRIPT-2.6.0) + Testing

**PO**: Aprobado. Proceder a generar backlog formal con tasks detalladas.

---

## Próximo Paso

Invocar `/planificacion-sprint` para generar el backlog borrador completo con tasks.
