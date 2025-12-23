# 🐂 Ronda 7 — OX: Integración de Plugins con la Extensión

> **Fecha**: 2025-12-23  
> **Rol**: Oráculo (Meta-coordinador)  
> **Misión**: Investigar qué ofrece la extensión a cada plugin y qué necesita cada plugin para una buena integración

---

## 1. Inventario: Capacidades de la Extensión

La extensión `vscode-alephscript-extension` ofrece estos componentes reutilizables:

### Componentes UI (Views)

| Componente | Clase | Propósito |
|------------|-------|-----------|
| **TeatroTreeDataProvider** | TreeDataProvider | Árbol jerárquico de agentes (activar/desactivar) |
| **TeatroWebViewProvider** | WebviewViewProvider | Panel con controles de teatro, temas, chat |
| **HackerControlPanel** | WebviewViewProvider | Panel de control estilo hacker |
| **HackerCommandPanel** | WebviewViewProvider | Panel de comandos rápidos |
| **HackerConfigPanel** | WebviewViewProvider | Panel de configuración |
| **SocketsTreeDataProvider** | TreeDataProvider | Monitoreo de conexiones Socket.io |
| **LogsTreeDataProvider** | TreeDataProvider | Visualización de logs categorizados |
| **ConfigsTreeDataProvider** | TreeDataProvider | Configuraciones de la extensión |
| **MCPTreeDataProvider** | TreeDataProvider | Servidores MCP activos |
| **UIsTreeDataProvider** | TreeDataProvider | Interfaces de usuario registradas |

### Componentes de Edición

| Componente | Clase | Propósito |
|------------|-------|-----------|
| **AgentContentEditorProvider** | CustomTextEditorProvider | Editor visual para `.agent.md` |
| **AgentConfigEditorProvider** | CustomEditorProvider | Editor para configs de agentes |

### Servicios Core

| Servicio | Clase | Propósito |
|---------|-------|-----------|
| **ConfigurationService** | Singleton | Gestión de configuración |
| **LoggingManager** | Singleton | Sistema de logging categorizado |
| **ProcessManager** | Service | Ejecución de procesos |
| **WebViewManager** | Service | Gestión de webviews |
| **CommandPaletteManager** | Service | Comandos de la paleta |
| **TheatricalChatManager** | Service | 5 ChatParticipants teatrales |
| **McpChatParticipant** | ChatParticipant | Integración con MCP |
| **MCPServerManager** | Service | Gestión de servidores MCP |
| **MCPWebViewManager** | Service | WebViews para MCP |

### Status Bar

| Componente | Descripción |
|------------|-------------|
| **HackerStatusBarManager** | Indicadores en barra de estado |

---

## 2. Inventario: Los 7 Plugins del Scriptorium

| Plugin | Agentes | Prompts | Dependencias | Necesidad Principal |
|--------|---------|---------|--------------|---------------------|
| **scrum** | 1 | 5 | - | Panel de Sprint Status |
| **teatro** | 1 | 3 | arg-board, agent-creator, gh-pages | Visualizador impress.js |
| **agent-creator** | 1 | 5 | (opt) arg-board, foro-scraper | Editor de recetas |
| **arg-board** | 8 | 7 | - | ChatParticipants para 8 agentes |
| **enciclopedia** | 2 | 3 | - | Buscador en tomos |
| **gh-pages** | 1 | 4 | - | Preview del sitio |
| **foro-scraper** | 1 | 6 | - | Panel de estado de scraping |

---

## 3. Matriz Plugin × Capacidad de Extensión

```
                     TreeData  WebView  Chat   Editor  Status  MCP   Logs
                     Provider  Provider Part.  Prov.   Bar     Int.  Tree
─────────────────────────────────────────────────────────────────────────
scrum                  ✓         ✓       -       -       ✓      -      ✓
teatro                 ✓         ✓✓      ✓       -       -      -      -
agent-creator          ✓         ✓       -       ✓✓      -      -      -
arg-board              ✓✓        ✓       ✓✓✓     -       -      -      -
enciclopedia           ✓         ✓       ✓       -       -      -      -
gh-pages               -         ✓       -       -       ✓      -      -
foro-scraper           ✓         ✓       -       -       ✓      ✓✓     ✓
─────────────────────────────────────────────────────────────────────────

Leyenda: 
  -   = No necesita
  ✓   = Útil
  ✓✓  = Muy útil
  ✓✓✓ = Crítico
```

---

## 4. Análisis Detallado por Plugin

### 4.1. SCRUM — Gestión Ágil de Backlogs

**Lo que ofrece la extensión**:
- `LogsTreeDataProvider` → Podría mostrar actividad del sprint
- `HackerStatusBarManager` → Indicador de sprint activo
- `TeatroTreeDataProvider` → Patrón reusable para backlog como árbol

**Lo que necesita el plugin**:
1. **ScrumTreeDataProvider** — Árbol con estructura:
   ```
   Sprint 1 (En Progreso)
   ├── SCRIPT-1.0.0 Teatro ✓
   ├── SCRIPT-1.1.0 Scrum ✓
   └── SCRIPT-1.3.0 Impress.js 🔄
       ├── S01: Fix Impress ✓
       ├── S02: 3 Zonas ✓
       └── S06: Tests ⏳
   ```
2. **SprintStatusWebView** — Panel con:
   - Burndown chart
   - Métricas: tasks totales/completadas/%
   - Próximos pasos
3. **StatusBar Item** — `Sprint 1: 73%`

**Épica propuesta**: `SCRIPT-2.10.0 — Scrum Panel UI`

| Task | Descripción | Reutiliza |
|------|-------------|-----------|
| T001 | Crear `ScrumTreeDataProvider` | Patrón de TeatroTreeDataProvider |
| T002 | Crear `SprintStatusWebView` | BaseHackerPanelProvider |
| T003 | Añadir StatusBar para sprint | HackerStatusBarManager |
| T004 | Sincronizar con BACKLOG-*.md | FileWatcher |

---

### 4.2. TEATRO — Teatro Interactivo Transmedia

**Lo que ofrece la extensión**:
- `TeatroTreeDataProvider` → Ya existe, pero para Arrakis
- `TeatroWebViewProvider` → Control de agentes teatrales
- `TheatricalChatManager` → 5 ChatParticipants

**Lo que necesita el plugin**:
1. **ObraTreeDataProvider** — Árbol con:
   ```
   Cartelera
   ├── En Escena: Camino del Tarotista
   │   ├── Estadio 1: El Vestíbulo ✓
   │   └── Estadio 2: La Biblioteca 🎭
   └── En Cartel
       └── Hola Mundo
   ```
2. **ImpressJSWebView** — Visualizador 3D embebido (iframe o canvas)
3. **PersonajesChatParticipants** — Tarotista, NonsiAuditor como ChatParticipants

**Problema**: TeatroTreeDataProvider está hardcodeado para 5 agentes Arrakis.  
**Solución**: Extender interfaz `TeatroAgent` para aceptar agentes de Teatro plugin.

**Épica propuesta**: `SCRIPT-2.11.0 — Teatro Visual Integration`

| Task | Descripción | Reutiliza |
|------|-------------|-----------|
| T001 | Extender TeatroAgent interface con campo `source` | TeatroTreeDataProvider |
| T002 | Cargar personajes de ELENCO/ como agentes | registry.json |
| T003 | Crear ImpressJSWebView con navegación 3D | TeatroWebViewProvider |
| T004 | Registrar personajes como ChatParticipants | TheatricalChatManager |

---

### 4.3. AGENT-CREATOR — Creador de Agentes Especializados

**Lo que ofrece la extensión**:
- `AgentContentEditorProvider` → Editor visual para `.agent.md`
- `AgentConfigEditorProvider` → Editor de config de agentes

**Lo que necesita el plugin**:
1. **Integración profunda con AgentContentEditorProvider**:
   - Añadir botón "Crear desde plantilla"
   - Añadir selector de agentes base
   - Añadir conexión a fuentes de DISCO
2. **RecipeEditorWebView** — Wizard para crear receta:
   - Paso 1: Seleccionar agentes base (checkboxes)
   - Paso 2: Seleccionar fuentes de datos (explorador de DISCO)
   - Paso 3: Generar recipe.json + agente.md
3. **ElencoTreeDataProvider** — Árbol con personajes creados:
   ```
   ELENCO
   ├── tarotista (yellowflag + Foro_t8941392)
   └── nonsi (blackflag + redflag + nonsi/)
   ```

**Épica propuesta**: `SCRIPT-2.12.0 — Agent Creator UI`

| Task | Descripción | Reutiliza |
|------|-------------|-----------|
| T001 | Crear ElencoTreeDataProvider | TeatroTreeDataProvider |
| T002 | Crear RecipeEditorWebView con wizard | BaseHackerPanelProvider |
| T003 | Extender AgentContentEditorProvider con "Crear" | AgentContentEditorProvider |
| T004 | Sincronizar con creation-log.json | FileWatcher |

---

### 4.4. ARG-BOARD — Tablero ARG Transmedia

**Lo que ofrece la extensión**:
- `TheatricalChatManager` → 5 agentes (Isaac, Don Álvaro, Dídac, Indra, Backend)
- `TeatroTreeDataProvider` → Panel de agentes

**Lo que necesita el plugin**:
1. **Migración de Elenco Arrakis a ARG-BOARD**:
   - Los 5 agentes actuales son de "Casa Arrakis"
   - ARG-BOARD tiene 8 agentes propios (Arrakis, BOE, GitARG, Decoherence, Heroe, ImpressJS, MBox, PlatformCom)
   - **Decisión**: Mantener ambos elencos o migrar
2. **BOETreeDataProvider** — Árbol con entradas del BOE:
   ```
   BOE 2025-12-23
   ├── Disposición 001: Génesis teatro
   ├── Disposición 002: Actor tarotista
   └── Disposición 003: Obra hola_mundo
   ```
3. **ChatParticipants para 8 agentes ARG**

**Épica propuesta**: `SCRIPT-2.8.0 — Arrakis Migration` (ya definida en Ronda 3)

**Observación crítica**: Este plugin es el más complejo porque:
- La extensión ya usa infraestructura de "Casa Arrakis"
- Los 5 ChatParticipants actuales pertenecen a este dominio
- La migración debe preservar funcionalidad existente

---

### 4.5. ENCICLOPEDIA — Biblioteca de Tomos

**Lo que ofrece la extensión**:
- `MCPTreeDataProvider` → Patrón para listar recursos
- WebViewProvider → Para mostrar resultados

**Lo que necesita el plugin**:
1. **TomosTreeDataProvider** — Árbol con tomos cargados:
   ```
   Biblioteca
   └── Historia de la Filosofía (61 caps)
       ├── Filosofía antigua
       ├── Filosofía medieval
       └── Filosofía moderna
   ```
2. **BusquedaWebView** — Panel con:
   - Campo de búsqueda
   - Filtros (período, tema)
   - Resultados con enlaces a capítulos
3. **BibliotecarioChatParticipant** — Para consultas en lenguaje natural

**Épica propuesta**: `SCRIPT-2.13.0 — Enciclopedia UI`

| Task | Descripción | Reutiliza |
|------|-------------|-----------|
| T001 | Crear TomosTreeDataProvider | MCPTreeDataProvider |
| T002 | Crear BusquedaWebView | BaseHackerPanelProvider |
| T003 | Registrar Bibliotecario como ChatParticipant | TheatricalChatManager |
| T004 | Indexar capítulos de HDF-EC | FileWatcher |

---

### 4.6. GH-PAGES — Publicación Web

**Lo que ofrece la extensión**:
- `WebViewManager` → Previsualización
- `HackerStatusBarManager` → Indicador de deploy

**Lo que necesita el plugin**:
1. **SitePreviewWebView** — Iframe con preview de GitHub Pages
2. **StatusBar Item** — Indicador de último deploy + link
3. **PublishCommand** — Comando en paleta para publicar

**Épica propuesta**: `SCRIPT-2.14.0 — GH-Pages Preview`

| Task | Descripción | Reutiliza |
|------|-------------|-----------|
| T001 | Crear SitePreviewWebView con iframe | TeatroWebViewProvider |
| T002 | Añadir StatusBar con "Publicado: 23-dic" | HackerStatusBarManager |
| T003 | Registrar comando `ghpages.publish` | CommandPaletteManager |
| T004 | Sincronizar con docs/_site/ | FileWatcher |

---

### 4.7. FORO-SCRAPER — Web Scraping

**Lo que ofrece la extensión**:
- `MCPTreeDataProvider` → Patrón para mostrar jobs
- `LogsTreeDataProvider` → Mostrar logs de scraping
- `MCPServerManager` → Gestión de MCP (Playwright)

**Lo que necesita el plugin**:
1. **ScrapingJobsTreeDataProvider** — Árbol con jobs:
   ```
   Jobs de Scraping
   ├── Foro_t8941392 ✓ (100%)
   └── Blog_substack 🔄 (42/100)
       ├── Descargados: 42
       └── Pendientes: 58
   ```
2. **ScrapingStatusWebView** — Panel con:
   - Jobs activos/pausados
   - Progreso con barras
   - Controles play/pause/stop
3. **Integración MCP Playwright** — El plugin ya usa Playwright; la extensión tiene MCPServerManager

**Épica propuesta**: `SCRIPT-2.15.0 — Scraper Dashboard`

| Task | Descripción | Reutiliza |
|------|-------------|-----------|
| T001 | Crear ScrapingJobsTreeDataProvider | MCPTreeDataProvider |
| T002 | Crear ScrapingStatusWebView | BaseHackerPanelProvider |
| T003 | Integrar con LogsTreeDataProvider | LogsTreeDataProvider |
| T004 | Añadir StatusBar con job activo | HackerStatusBarManager |
| T005 | Conectar con MCPServerManager para Playwright | MCPServerManager |

---

## 5. Resumen de Épicas Propuestas

| ID | Nombre | Plugin | Complejidad | Prioridad |
|----|--------|--------|-------------|-----------|
| SCRIPT-2.8.0 | Arrakis Migration | arg-board | 🔴 Alta | 1 (bloquea otros) |
| SCRIPT-2.10.0 | Scrum Panel UI | scrum | 🟡 Media | 2 |
| SCRIPT-2.11.0 | Teatro Visual Integration | teatro | 🔴 Alta | 3 |
| SCRIPT-2.12.0 | Agent Creator UI | agent-creator | 🟡 Media | 4 |
| SCRIPT-2.13.0 | Enciclopedia UI | enciclopedia | 🟢 Baja | 5 |
| SCRIPT-2.14.0 | GH-Pages Preview | gh-pages | 🟢 Baja | 6 |
| SCRIPT-2.15.0 | Scraper Dashboard | foro-scraper | 🟡 Media | 7 |

---

## 6. Componentes Compartidos a Crear

Para evitar duplicación, propongo crear una capa de abstracción:

### BasePluginTreeDataProvider

```typescript
export interface PluginTreeConfig {
  pluginId: string;
  dataSource: string; // Ruta a registry.json o similar
  itemFactory: (data: any) => vscode.TreeItem;
}

export class BasePluginTreeDataProvider implements vscode.TreeDataProvider<PluginTreeItem> {
  constructor(config: PluginTreeConfig) { ... }
}
```

### BasePluginWebViewProvider

```typescript
export interface PluginWebViewConfig {
  pluginId: string;
  templatePath: string;
  messageHandler: (msg: any) => void;
}

export class BasePluginWebViewProvider implements vscode.WebviewViewProvider {
  constructor(config: PluginWebViewConfig) { ... }
}
```

### PluginChatParticipantFactory

```typescript
export function createPluginChatParticipant(
  agentPath: string,
  systemPrompt: string
): vscode.Disposable { ... }
```

---

## 7. Decisión Arquitectónica Recomendada

### Opción A: Integración Profunda
Cada plugin añade sus componentes al core de la extensión.
- **Pro**: UI unificada
- **Contra**: Acoplamiento fuerte, difícil desinstalar plugins

### Opción B: Extensiones Secundarias ★ RECOMENDADA
Cada plugin puede tener su propia "sub-extensión" que se activa si el plugin está instalado.
- **Pro**: Desacoplado, testeable independientemente
- **Contra**: Más complejidad inicial

### Opción C: Registro Dinámico
La extensión principal expone API para que los plugins registren TreeViews/WebViews en runtime.
- **Pro**: Flexibilidad máxima
- **Contra**: Requiere API estable

**Recomendación de Ox**: 
Implementar **Opción C** con fallback a **Opción B** para plugins complejos (ARG-BOARD, TEATRO).

---

## 8. Próximos Pasos (Para @aleph)

1. **Validar** esta matriz con los maintainers del proyecto
2. **Priorizar** épicas según roadmap 2026
3. **Diseñar** API de registro dinámico de plugins
4. **Crear** componentes base compartidos
5. **Migrar** ARG-BOARD como caso piloto

---

**Ronda 7 completada** — Turno a @aleph (Ronda 8) para producción y priorización.
