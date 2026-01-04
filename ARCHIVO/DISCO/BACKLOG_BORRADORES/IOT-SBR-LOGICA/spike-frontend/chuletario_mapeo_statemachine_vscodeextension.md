# Chuletario: Mapeo de Dominio StateMachine ↔ VsCodeExtension

> **Épica**: SCRIPT-2.3.1 (PrologAgent Pack)  
> **Fecha**: 2026-01-02  
> **Autor**: @ox  
> **Propósito**: Documentar correspondencias entre ambos submódulos para facilitar integración

---

## 1. Visión General

Ambos submódulos implementan patrones similares pero con diferentes contextos de ejecución:

| Aspecto | StateMachine | VsCodeExtension |
|---------|--------------|-----------------|
| **Contexto** | Node.js standalone | VS Code Extension API |
| **UI Runtime** | Express + SSE | VS Code WebView |
| **Comunicación** | RxJS Channels | vscode.postMessage |
| **Agentes** | ChannelAgents | ChatParticipants |
| **Orquestación** | Orchestrator | TheatricalChatManager |

---

## 2. Tabla de Mapeo Principal

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MAPEO DE COMPONENTES                                │
├─────────────────────────────────────┬───────────────────────────────────────┤
│         STATEMACHINE                │           VSCODEEXTENSION             │
├─────────────────────────────────────┼───────────────────────────────────────┤
│ src/orchestration/                  │ src/theatrical/                       │
│   Orchestrator.ts                   │   TheatricalChatManager.ts            │
│   ├── app: AppChannelImpl           │   ├── participants: Map<ChatPart>     │
│   ├── sys: SysChannelImpl           │   └── context: ExtensionContext       │
│   └── ui:  UIChannelImpl            │                                       │
├─────────────────────────────────────┼───────────────────────────────────────┤
│ src/ui/                             │ src/views/                            │
│   GamificationUI.ts (base)          │   BaseHackerPanelProvider.ts          │
│   HTML5GamificationUI.ts            │   TeatroWebViewProvider.ts            │
│   ConsoleGamificationUI.ts          │   HackerControlPanelProvider.ts       │
│   MultiUIGameManager.ts             │   (múltiples paneles)                 │
├─────────────────────────────────────┼───────────────────────────────────────┤
│ src/drivers/                        │ src/core/                             │
│   MCPDriverAdapter.ts               │   mcpConfigurationManager.ts          │
│                                     │   mcpServerManager.ts                 │
├─────────────────────────────────────┼───────────────────────────────────────┤
│ src/models/                         │ src/theatrical/agents/                │
│   Agent.ts                          │   (definiciones de agentes)           │
│   AgentPostulation.ts               │                                       │
├─────────────────────────────────────┼───────────────────────────────────────┤
│ src/runtime/                        │ src/                                  │
│   Runtime.ts                        │   extension.ts (activate/deactivate)  │
└─────────────────────────────────────┴───────────────────────────────────────┘
```

---

## 3. Patrones de UI Equivalentes

### 3.1 Base UI Provider

| StateMachine | VsCodeExtension | Descripción |
|--------------|-----------------|-------------|
| `GamificationUI` (abstracta) | `BaseHackerPanelProvider` (abstracta) | Clase base con métodos comunes |
| `start()` / `stop()` | `resolveWebviewView()` | Ciclo de vida |
| `displayMessage()` | `postMessage()` | Envío a UI |
| `on('userInput')` | `onDidReceiveMessage` | Recepción de UI |

### Código Equivalente

**StateMachine (GamificationUI.ts)**:
```typescript
export abstract class GamificationUI extends EventEmitter {
    protected runtime: Runtime;
    protected mcpDriver: MCPDriverAdapter;
    
    abstract start(): Promise<void>;
    abstract stop(): Promise<void>;
    abstract displayMessage(message: GameMessage): Promise<void>;
}
```

**VsCodeExtension (BaseHackerPanelProvider.ts)**:
```typescript
export abstract class BaseHackerPanelProvider implements vscode.WebviewViewProvider {
    protected _view?: vscode.WebviewView;
    
    public abstract get viewType(): string;
    protected abstract getHtmlContent(webview: vscode.Webview): string;
    protected abstract handleMessage(message: any): void;
}
```

### 3.2 HTML5 ↔ WebView

| StateMachine | VsCodeExtension | Función |
|--------------|-----------------|---------|
| `HTML5GamificationUI` | `TeatroWebViewProvider` | UI web principal |
| `express.static()` | `localResourceRoots` | Servir assets |
| `broadcastSSE()` | `webview.postMessage()` | Push a clientes |
| `app.post('/api')` | N/A (usa vscode.commands) | Endpoints |
| `sseClients: Set<Response>` | `_view: WebviewView` | Clientes conectados |

---

## 4. Sistema de Canales vs Sistema de Mensajes

### StateMachine: 3 Canales RxJS

```typescript
// Orchestrator.ts
public readonly app: AppChannelImpl;   // Lógica de negocio
public readonly sys: SysChannelImpl;   // Sistema/health
public readonly ui:  UIChannelImpl;    // Interacción usuario
```

### VsCodeExtension: postMessage bidireccional

```typescript
// TeatroWebViewProvider.ts
webviewView.webview.onDidReceiveMessage(message => {
    switch (message?.command) {
        case 'activateAgent': ...
        case 'openChatParticipant': ...
    }
});

this.postMessage({ command: 'applyTheme', theme: t });
```

### Mapeo de Canales

| Canal SM | Equivalente VSCode | Uso |
|----------|-------------------|-----|
| `app.send()` | `vscode.commands.executeCommand()` | Acciones de negocio |
| `sys.send()` | `vscode.window.showInformationMessage()` | Notificaciones sistema |
| `ui.send()` | `webview.postMessage()` | Updates de UI |

---

## 5. Sistema de Agentes

### StateMachine: ChannelAgents

```typescript
// channel-agent-factory.ts
interface ChannelAgent {
    id: string;
    name: string;
    channelType: 'app' | 'sys' | 'ui';
    process(message: any): Promise<void>;
}

// Registro dinámico
createChannelAgent("UIChannelAgent") → UIChannelAgent
```

### VsCodeExtension: ChatParticipants

```typescript
// TheatricalChatManager.ts
interface TheatricalChatAgent {
    id: string;          // 'mcp-vscode-ext.isaac'
    name: string;        // 'Isaac - Marinero Fiel'
    emoji: string;       // '⚓'
    category: string;    // 'framework-retro'
    expertise: string[];
}

// Registro con VS Code API
vscode.chat.createChatParticipant(agent.id, handler)
```

### Equivalencias de Agentes

| SM Agent Role | VSCode Agent | Descripción |
|---------------|--------------|-------------|
| `AgentRole.COORDINATOR` | `don-alvaro` | Supervisión |
| `AgentRole.SPECIALIST` | `backend-agent` | Técnico |
| `AgentRole.NARRATOR` | `capitan-didac` | Liderazgo |
| `AgentRole.GUIDE` | `isaac` | Navegación |
| `AgentRole.INTEGRATOR` | `indra` | Integración |

---

## 6. Conexión MCP

### StateMachine: MCPDriverAdapter

```typescript
// MCPDriverAdapter.ts
class MCPDriverAdapter {
    async callTool(serverId: string, tool: string, args: any): Promise<any>;
    async listTools(serverId: string): Promise<Tool[]>;
    on(event: MCPEventType, handler: Function): void;
}
```

### VsCodeExtension: McpConfigurationManager + MCPServerManager

```typescript
// mcpConfigurationManager.ts
class McpConfigurationManager {
    getMcpServers(): MCPServersConfig;
    isConfigLoaded(): boolean;
}

// mcpServerManager.ts  
class MCPServerManager {
    startServer(serverId: string): Promise<void>;
    stopServer(serverId: string): Promise<void>;
    testConnection(serverId: string): Promise<boolean>;
}
```

### Mapeo de Operaciones MCP

| Operación | StateMachine | VsCodeExtension |
|-----------|--------------|-----------------|
| Listar servers | `mcpAdapter.listServers()` | `configManager.getMcpServers()` |
| Iniciar server | `mcpAdapter.connect()` | `serverManager.startServer()` |
| Llamar tool | `mcpAdapter.callTool()` | Via HTTP a localhost:PORT |
| Ver logs | `Logger.debug()` | `processManager.showProcessLogs()` |

---

## 7. Temas y Estilos

### StateMachine: CSS en public/

```css
/* game.html */
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### VsCodeExtension: Hacker Themes

```typescript
// BaseHackerPanelProvider.ts
protected readonly THEME_STORAGE_KEY = 'alephscript.hackerTheme';

// media/hacker-themes.css
.theme-matrix { --bg: #0d0d0d; --accent: #00ff41; }
.theme-light  { --bg: #ffffff; --accent: #0066cc; }
.theme-dark   { --bg: #1e1e1e; --accent: #569cd6; }
```

### Sincronización de Temas

| SM Theme | VSCode Theme | CSS Class |
|----------|--------------|-----------|
| `"game"` | `"matrix"` | `.theme-matrix` |
| `"light"` | `"light"` | `.theme-light` |
| `"dark"` | `"dark"` | `.theme-dark` |

---

## 8. Flujo de Datos Comparado

### StateMachine

```
User Input → HTML5GamificationUI → MCPDriverAdapter → MCP Server
                    ↓
             Orchestrator (RxJS)
              ↙    ↓    ↘
           App   Sys    UI
          Channel Channel Channel
             ↓
    ChannelAgent.process()
             ↓
    broadcastSSE() → Web Client
```

### VsCodeExtension

```
User Input → ChatParticipant → Handler → vscode.commands
                  ↓
       TheatricalChatManager
                  ↓
       TeatroWebViewProvider
                  ↓
    webview.postMessage() → WebView Panel
```

---

## 9. Oportunidades de Integración

### 9.1 Reusar GamificationUI en WebView

La clase `HTML5GamificationUI` de StateMachine podría adaptarse para correr **dentro** de un WebView de VS Code:

```typescript
// Propuesta: PrologWebViewProvider extends BaseHackerPanelProvider
class PrologWebViewProvider extends BaseHackerPanelProvider {
    private prologUI: PrologGamificationUI; // De StateMachine
    
    protected async handleMessage(message: any) {
        if (message.command === 'executeQuery') {
            const result = await this.prologUI.executeQuery(message.query);
            this.postMessage({ command: 'queryResult', result });
        }
    }
}
```

### 9.2 Compartir MCPDriverAdapter

```typescript
// VsCodeExtension podría usar MCPDriverAdapter de StateMachine
import { MCPDriverAdapter } from 'StateMachine/src/drivers/MCPDriverAdapter';

// En lugar de HTTP directo:
const adapter = new MCPDriverAdapter(config);
const result = await adapter.callTool('prolog-mcp-server', 'prolog_query', { query });
```

### 9.3 Unificar Themes

```typescript
// Archivo compartido: shared/themes.ts
export const THEMES = {
    matrix: { bg: '#0d0d0d', accent: '#00ff41' },
    light:  { bg: '#ffffff', accent: '#0066cc' },
    dark:   { bg: '#1e1e1e', accent: '#569cd6' },
    prolog: { bg: '#1a1a2e', accent: '#00d4ff' }  // Nuevo
};
```

---

## 10. Resumen de Archivos Clave

### StateMachine (para integración)

| Archivo | Propósito | Reutilizable |
|---------|-----------|--------------|
| `src/ui/GamificationUI.ts` | Base UI abstracta | ✅ |
| `src/ui/HTML5GamificationUI.ts` | UI web completa | ✅ |
| `src/drivers/MCPDriverAdapter.ts` | Conexión MCP | ✅ |
| `src/orchestration/Orchestrator.ts` | Coordinador | ⚠️ Adaptar |
| `public/game.html` | Template UI | ✅ |

### VsCodeExtension (puntos de extensión)

| Archivo | Propósito | Extender para |
|---------|-----------|---------------|
| `src/views/BaseHackerPanelProvider.ts` | Base WebView | PrologEditor |
| `src/theatrical/TheatricalChatManager.ts` | Registro agentes | Prolog Agent |
| `src/mcpServerManager.ts` | Gestión MCP | prolog-mcp-server |
| `media/hacker-themes.css` | Estilos | Tema Prolog |

---

## 11. Próximos Pasos Recomendados

1. **Crear `PrologWebViewProvider`** extendiendo `BaseHackerPanelProvider`
2. **Registrar en `extension.ts`** el nuevo WebView
3. **Reusar `prolog-game.html`** como template del WebView
4. **Conectar via `MCPDriverAdapter`** al `prolog-mcp-server`

### Diagrama de Integración Propuesta

```
┌─────────────────────────────────────────────────────────────────┐
│                     VsCodeExtension                             │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │   PrologWebViewProvider (NUEVO)                           │  │
│  │     extends BaseHackerPanelProvider                       │  │
│  │                                                           │  │
│  │   ┌─────────────────────────────────────────────────────┐ │  │
│  │   │  prolog-webview.html (basado en prolog-game.html)   │ │  │
│  │   │  ├── prolog-client.js                               │ │  │
│  │   │  └── hacker-themes.css + prolog-theme.css           │ │  │
│  │   └─────────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                   │
│                              ▼                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │   MCPDriverAdapter (de StateMachine)                      │  │
│  │     o bien MCPServerManager nativo                        │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼ HTTP/SSE
┌─────────────────────────────────────────────────────────────────┐
│                     prolog-mcp-server (3006)                    │
│                     (MCPGallery/mcp-mesh-sdk)                   │
└─────────────────────────────────────────────────────────────────┘
```

---

*Chuletario generado por @ox como parte de la épica SCRIPT-2.3.1*
