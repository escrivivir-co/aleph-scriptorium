# Spike Extensión: Opción D — VS Code WebView para PrologEditor

> **Epic**: SCRIPT-2.3.0 — Prolog MCP Server Integration  
> **Documento padre**: [spike_integracion_prolog_frontend.md](./spike_integracion_prolog_frontend.md)  
> **Sprint**: FC1 (diseño) → FC2 (implementación)  
> **Fecha**: 2 de enero de 2026  
> **Autor**: @ox (spike técnico)

---

## 1. Resumen Ejecutivo

Este documento extiende la **Opción D** del spike principal, detallando cómo integrar el frontend de PrologEditor como un **WebView nativo de VS Code** dentro de la extensión `scriptorium-vscode-extension`.

### Ventaja Clave

> **El usuario edita reglas Prolog sin salir de VS Code, con comunicación directa al MCPPrologServer (puerto 3006).**

---

## 2. Arquitectura Propuesta

### 2.1 Diagrama de Componentes

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           VS Code Extension                                  │
│                    scriptorium-vscode-extension                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────┐         ┌──────────────────────┐                  │
│  │  TeatroWebViewProvider│         │ PrologEditorProvider │  ← NUEVO        │
│  │  (existente)         │         │                      │                  │
│  │  - Lista agentes     │         │  - Editor de reglas  │                  │
│  │  - Activar/desactivar│         │  - Query executor    │                  │
│  └──────────┬───────────┘         │  - Template browser  │                  │
│             │                      └──────────┬───────────┘                  │
│             │                                 │                              │
│             │    postMessage()                │   postMessage()              │
│             ▼                                 ▼                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                     MCPDriverAdapter (existente)                      │   │
│  │                     Comunicación con servidores MCP                   │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                      │                                       │
└──────────────────────────────────────┼───────────────────────────────────────┘
                                       │ HTTP/JSON-RPC
                                       ▼
                          ┌─────────────────────────┐
                          │   MCPPrologServer       │
                          │   puerto 3006           │
                          │                         │
                          │   Tools:                │
                          │   - prolog_query        │
                          │   - prolog_assert_fact  │
                          │   - prolog_consult_file │
                          │   - prolog_create_session│
                          └─────────────────────────┘
```

### 2.2 Integración con Extensión Existente

La extensión `VsCodeExtension/` ya tiene:

| Componente | Estado | Reutilizable |
|------------|--------|--------------|
| `BaseHackerPanelProvider` | ✅ | Sí - Clase base para WebViews |
| `TeatroWebViewProvider` | ✅ | Patrón a seguir |
| `MCPDriverAdapter` | ✅ | Comunicación MCP |
| Hacker Theme System | ✅ | CSS/JS compartido |
| `media/` assets | ✅ | Estilos base |

---

## 3. Diseño del PrologEditorProvider

### 3.1 Estructura de Archivos

```
VsCodeExtension/
├── src/
│   └── views/
│       ├── BaseHackerPanelProvider.ts      # (existente)
│       ├── TeatroWebViewProvider.ts        # (existente, patrón)
│       └── PrologEditorWebViewProvider.ts  # ← NUEVO
│
├── media/
│   ├── hacker-base.css                     # (existente)
│   ├── hacker-themes.css                   # (existente)
│   ├── prolog-editor.css                   # ← NUEVO
│   └── prolog-editor.js                    # ← NUEVO
│
└── package.json                            # Añadir contributes
```

### 3.2 Clase PrologEditorWebViewProvider

```typescript
// VsCodeExtension/src/views/PrologEditorWebViewProvider.ts

import * as vscode from 'vscode';
import { BaseHackerPanelProvider } from './BaseHackerPanelProvider';

interface PrologSession {
    sessionId: string;
    obraId: string;
    loadedFiles: string[];
    lastQuery?: string;
    lastResult?: any;
}

export class PrologEditorWebViewProvider extends BaseHackerPanelProvider {
    public static readonly viewType = 'alephscript.prologEditor';
    
    private currentSession?: PrologSession;
    private mcpClient: any; // MCPDriverAdapter
    
    constructor(
        extensionUri: vscode.Uri,
        context: vscode.ExtensionContext,
        mcpClient: any
    ) {
        super(extensionUri, context);
        this.mcpClient = mcpClient;
    }

    public get viewType(): string {
        return PrologEditorWebViewProvider.viewType;
    }

    protected getHtmlContent(webview: vscode.Webview): string {
        return this.generateBaseHtml(
            webview,
            'prolog-editor.js',
            'prolog-editor.css',
            'Prolog Editor',
            this.getPrologEditorBody()
        );
    }

    protected handleMessage(message: any): void {
        switch (message.command) {
            case 'createSession':
                this.handleCreateSession(message.sessionId, message.obraId);
                break;
            case 'executeQuery':
                this.handleExecuteQuery(message.query);
                break;
            case 'assertFact':
                this.handleAssertFact(message.fact);
                break;
            case 'consultFile':
                this.handleConsultFile(message.filePath);
                break;
            case 'getTemplates':
                this.handleGetTemplates();
                break;
            case 'browseFile':
                this.handleBrowseFile();
                break;
            case 'saveToFile':
                this.handleSaveToFile(message.content, message.fileName);
                break;
        }
    }

    private getPrologEditorBody(): string {
        return `
            <div class="prolog-editor-container">
                <!-- Header con controles de sesión -->
                <div class="session-controls">
                    <div class="session-status">
                        <span class="status-indicator" id="sessionStatus">● Desconectado</span>
                        <span class="session-id" id="sessionId"></span>
                    </div>
                    <div class="session-actions">
                        <button class="hacker-btn" id="btnCreateSession">
                            <span class="icon">⚡</span> Nueva Sesión
                        </button>
                        <button class="hacker-btn" id="btnDestroySession" disabled>
                            <span class="icon">✕</span> Cerrar
                        </button>
                    </div>
                </div>

                <!-- Panel principal dividido -->
                <div class="editor-panels">
                    <!-- Panel izquierdo: Editor de reglas -->
                    <div class="panel rules-panel">
                        <div class="panel-header">
                            <span class="panel-title">📝 Reglas Prolog</span>
                            <div class="panel-actions">
                                <button class="icon-btn" id="btnLoadFile" title="Cargar archivo .pl">📂</button>
                                <button class="icon-btn" id="btnSaveFile" title="Guardar">💾</button>
                                <button class="icon-btn" id="btnTemplates" title="Ver templates">📋</button>
                            </div>
                        </div>
                        <div class="editor-wrapper">
                            <textarea id="rulesEditor" class="code-editor" 
                                placeholder="% Escribe tus reglas Prolog aquí
% Ejemplo:
:- module(mi_modulo, [saludo/1]).

saludo(Mensaje) :-
    Mensaje = 'Hola desde el Scriptorium'.
"></textarea>
                        </div>
                        <div class="editor-footer">
                            <button class="hacker-btn primary" id="btnConsult">
                                <span class="icon">⚙</span> Consultar
                            </button>
                            <button class="hacker-btn" id="btnAssert">
                                <span class="icon">+</span> Assert Fact
                            </button>
                        </div>
                    </div>

                    <!-- Panel derecho: Query y resultados -->
                    <div class="panel query-panel">
                        <div class="panel-header">
                            <span class="panel-title">🔍 Query Console</span>
                            <button class="icon-btn" id="btnClearOutput" title="Limpiar">🗑</button>
                        </div>
                        
                        <!-- Input de query -->
                        <div class="query-input-wrapper">
                            <input type="text" id="queryInput" class="query-input" 
                                placeholder="?- tu_query(X)." />
                            <button class="hacker-btn primary" id="btnExecute">
                                <span class="icon">▶</span> Ejecutar
                            </button>
                        </div>

                        <!-- Historial de queries -->
                        <div class="query-history" id="queryHistory">
                            <div class="history-header">Historial</div>
                            <!-- Se llena dinámicamente -->
                        </div>

                        <!-- Output de resultados -->
                        <div class="results-wrapper">
                            <pre id="resultsOutput" class="results-output">
// Resultados aparecerán aquí
// Conecta una sesión para empezar
                            </pre>
                        </div>
                    </div>
                </div>

                <!-- Footer con info de conexión MCP -->
                <div class="mcp-status-bar">
                    <span class="mcp-indicator">🔌 MCP</span>
                    <span id="mcpStatus">Servidor: localhost:3006</span>
                    <span class="mcp-version">Prolog Server v1.0</span>
                </div>
            </div>
        `;
    }

    // === Handlers de mensajes ===

    private async handleCreateSession(sessionId: string, obraId: string) {
        try {
            const result = await this.mcpClient.callTool('prolog_create_session', {
                sessionId,
                obraId
            });
            
            this.currentSession = {
                sessionId,
                obraId,
                loadedFiles: []
            };
            
            this.postMessage({
                command: 'sessionCreated',
                session: this.currentSession,
                result
            });
        } catch (error) {
            this.postMessage({
                command: 'error',
                message: `Error creando sesión: ${error}`
            });
        }
    }

    private async handleExecuteQuery(query: string) {
        if (!this.currentSession) {
            this.postMessage({
                command: 'error',
                message: 'No hay sesión activa. Crea una sesión primero.'
            });
            return;
        }

        try {
            const result = await this.mcpClient.callTool('prolog_query', {
                sessionId: this.currentSession.sessionId,
                query
            });
            
            this.currentSession.lastQuery = query;
            this.currentSession.lastResult = result;
            
            this.postMessage({
                command: 'queryResult',
                query,
                result
            });
        } catch (error) {
            this.postMessage({
                command: 'error',
                message: `Error ejecutando query: ${error}`
            });
        }
    }

    private async handleAssertFact(fact: string) {
        if (!this.currentSession) {
            this.postMessage({
                command: 'error',
                message: 'No hay sesión activa.'
            });
            return;
        }

        try {
            const result = await this.mcpClient.callTool('prolog_assert_fact', {
                sessionId: this.currentSession.sessionId,
                fact
            });
            
            this.postMessage({
                command: 'factAsserted',
                fact,
                result
            });
        } catch (error) {
            this.postMessage({
                command: 'error',
                message: `Error añadiendo hecho: ${error}`
            });
        }
    }

    private async handleConsultFile(filePath: string) {
        if (!this.currentSession) {
            this.postMessage({
                command: 'error',
                message: 'No hay sesión activa.'
            });
            return;
        }

        try {
            const result = await this.mcpClient.callTool('prolog_consult_file', {
                sessionId: this.currentSession.sessionId,
                filePath
            });
            
            this.currentSession.loadedFiles.push(filePath);
            
            this.postMessage({
                command: 'fileConsulted',
                filePath,
                result
            });
        } catch (error) {
            this.postMessage({
                command: 'error',
                message: `Error consultando archivo: ${error}`
            });
        }
    }

    private async handleGetTemplates() {
        try {
            const result = await this.mcpClient.callTool('prolog_get_templates', {});
            
            this.postMessage({
                command: 'templatesLoaded',
                templates: result
            });
        } catch (error) {
            this.postMessage({
                command: 'error',
                message: `Error obteniendo templates: ${error}`
            });
        }
    }

    private async handleBrowseFile() {
        const options: vscode.OpenDialogOptions = {
            canSelectMany: false,
            openLabel: 'Seleccionar archivo Prolog',
            filters: {
                'Prolog files': ['pl', 'pro', 'prolog'],
                'All files': ['*']
            },
            defaultUri: vscode.workspace.workspaceFolders?.[0]?.uri
        };

        const fileUri = await vscode.window.showOpenDialog(options);
        if (fileUri && fileUri[0]) {
            const content = await vscode.workspace.fs.readFile(fileUri[0]);
            this.postMessage({
                command: 'fileLoaded',
                filePath: fileUri[0].fsPath,
                content: Buffer.from(content).toString('utf8')
            });
        }
    }

    private async handleSaveToFile(content: string, fileName?: string) {
        const options: vscode.SaveDialogOptions = {
            saveLabel: 'Guardar reglas Prolog',
            filters: {
                'Prolog files': ['pl']
            },
            defaultUri: fileName 
                ? vscode.Uri.file(fileName)
                : vscode.workspace.workspaceFolders?.[0]?.uri
        };

        const fileUri = await vscode.window.showSaveDialog(options);
        if (fileUri) {
            await vscode.workspace.fs.writeFile(
                fileUri, 
                Buffer.from(content, 'utf8')
            );
            vscode.window.showInformationMessage(`Guardado: ${fileUri.fsPath}`);
            this.postMessage({
                command: 'fileSaved',
                filePath: fileUri.fsPath
            });
        }
    }
}
```

### 3.3 JavaScript del WebView (media/prolog-editor.js)

```javascript
// media/prolog-editor.js

(function() {
    const vscode = acquireVsCodeApi();
    
    // Estado local
    let state = {
        session: null,
        queryHistory: [],
        templates: []
    };

    // === Event Listeners ===
    
    document.getElementById('btnCreateSession').addEventListener('click', () => {
        const sessionId = `session-${Date.now()}`;
        const obraId = 'itaca-digital'; // TODO: Selector de obra
        vscode.postMessage({
            command: 'createSession',
            sessionId,
            obraId
        });
    });

    document.getElementById('btnDestroySession').addEventListener('click', () => {
        vscode.postMessage({
            command: 'destroySession',
            sessionId: state.session?.sessionId
        });
    });

    document.getElementById('btnExecute').addEventListener('click', () => {
        const query = document.getElementById('queryInput').value.trim();
        if (query) {
            executeQuery(query);
        }
    });

    document.getElementById('queryInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = e.target.value.trim();
            if (query) {
                executeQuery(query);
            }
        }
    });

    document.getElementById('btnConsult').addEventListener('click', () => {
        const content = document.getElementById('rulesEditor').value;
        // Guardar temporalmente y consultar
        vscode.postMessage({
            command: 'consultContent',
            content
        });
    });

    document.getElementById('btnAssert').addEventListener('click', () => {
        const fact = prompt('Introduce el hecho a añadir:', 'likes(mary, wine)');
        if (fact) {
            vscode.postMessage({
                command: 'assertFact',
                fact
            });
        }
    });

    document.getElementById('btnLoadFile').addEventListener('click', () => {
        vscode.postMessage({ command: 'browseFile' });
    });

    document.getElementById('btnSaveFile').addEventListener('click', () => {
        const content = document.getElementById('rulesEditor').value;
        vscode.postMessage({
            command: 'saveToFile',
            content
        });
    });

    document.getElementById('btnTemplates').addEventListener('click', () => {
        vscode.postMessage({ command: 'getTemplates' });
    });

    document.getElementById('btnClearOutput').addEventListener('click', () => {
        document.getElementById('resultsOutput').textContent = '// Resultados limpiados';
        state.queryHistory = [];
        updateQueryHistory();
    });

    // === Funciones auxiliares ===

    function executeQuery(query) {
        vscode.postMessage({
            command: 'executeQuery',
            query
        });
        document.getElementById('queryInput').value = '';
    }

    function updateSessionStatus(connected, sessionId) {
        const statusEl = document.getElementById('sessionStatus');
        const sessionIdEl = document.getElementById('sessionId');
        const destroyBtn = document.getElementById('btnDestroySession');
        
        if (connected) {
            statusEl.textContent = '● Conectado';
            statusEl.classList.add('connected');
            sessionIdEl.textContent = sessionId;
            destroyBtn.disabled = false;
        } else {
            statusEl.textContent = '● Desconectado';
            statusEl.classList.remove('connected');
            sessionIdEl.textContent = '';
            destroyBtn.disabled = true;
        }
    }

    function appendResult(query, result, isError = false) {
        const outputEl = document.getElementById('resultsOutput');
        const timestamp = new Date().toLocaleTimeString();
        
        let resultText;
        if (isError) {
            resultText = `[${timestamp}] ERROR\n?- ${query}\n❌ ${result}\n\n`;
        } else {
            resultText = `[${timestamp}] OK\n?- ${query}\n${formatResult(result)}\n\n`;
        }
        
        outputEl.textContent += resultText;
        outputEl.scrollTop = outputEl.scrollHeight;
        
        // Añadir al historial
        state.queryHistory.unshift({ query, timestamp, success: !isError });
        updateQueryHistory();
    }

    function formatResult(result) {
        if (typeof result === 'object') {
            if (result.bindings && Array.isArray(result.bindings)) {
                return result.bindings.map(b => 
                    Object.entries(b).map(([k, v]) => `${k} = ${v}`).join(', ')
                ).join('\n');
            }
            return JSON.stringify(result, null, 2);
        }
        return String(result);
    }

    function updateQueryHistory() {
        const historyEl = document.getElementById('queryHistory');
        const items = state.queryHistory.slice(0, 10).map(h => `
            <div class="history-item ${h.success ? 'success' : 'error'}" 
                 onclick="document.getElementById('queryInput').value='${h.query}'">
                <span class="history-time">${h.timestamp}</span>
                <span class="history-query">${h.query}</span>
            </div>
        `).join('');
        
        historyEl.innerHTML = `<div class="history-header">Historial</div>${items}`;
    }

    function showTemplatesModal(templates) {
        // TODO: Modal con lista de templates
        const templateList = templates.map(t => `- ${t.name}: ${t.description}`).join('\n');
        alert('Templates disponibles:\n\n' + templateList);
    }

    // === Message Handler ===

    window.addEventListener('message', event => {
        const message = event.data;
        
        switch (message.command) {
            case 'sessionCreated':
                state.session = message.session;
                updateSessionStatus(true, message.session.sessionId);
                appendResult('CREATE SESSION', message.result);
                break;
                
            case 'sessionDestroyed':
                state.session = null;
                updateSessionStatus(false);
                break;
                
            case 'queryResult':
                appendResult(message.query, message.result);
                break;
                
            case 'factAsserted':
                appendResult(`assert(${message.fact})`, message.result);
                break;
                
            case 'fileConsulted':
                appendResult(`consult('${message.filePath}')`, message.result);
                break;
                
            case 'fileLoaded':
                document.getElementById('rulesEditor').value = message.content;
                break;
                
            case 'templatesLoaded':
                state.templates = message.templates;
                showTemplatesModal(message.templates);
                break;
                
            case 'error':
                appendResult('ERROR', message.message, true);
                break;
                
            case 'applyTheme':
                // Heredado del sistema de temas hacker
                document.body.setAttribute('data-theme', message.theme);
                break;
        }
    });

    // Inicialización
    updateSessionStatus(false);
})();
```

---

## 4. Registro en package.json

### 4.1 Contributes → Views

```json
{
  "contributes": {
    "views": {
      "alephscript-sidebar": [
        {
          "type": "webview",
          "id": "alephscript.prologEditor",
          "name": "🧠 Prolog Editor",
          "icon": "$(beaker)",
          "contextualTitle": "Prolog Editor"
        }
      ]
    },
    "commands": [
      {
        "command": "alephscript.prologEditor.open",
        "title": "Open Prolog Editor",
        "category": "🧠 Prolog",
        "icon": "$(beaker)"
      },
      {
        "command": "alephscript.prologEditor.newSession",
        "title": "New Prolog Session",
        "category": "🧠 Prolog"
      },
      {
        "command": "alephscript.prologEditor.executeQuery",
        "title": "Execute Prolog Query",
        "category": "🧠 Prolog"
      }
    ],
    "menus": {
      "view/title": [
        {
          "command": "alephscript.prologEditor.newSession",
          "when": "view == alephscript.prologEditor",
          "group": "navigation"
        }
      ],
      "editor/context": [
        {
          "command": "alephscript.prologEditor.executeQuery",
          "when": "resourceExtname == .pl",
          "group": "prolog"
        }
      ]
    }
  }
}
```

### 4.2 Activación en extension.ts

```typescript
// VsCodeExtension/src/extension.ts (fragmento)

import { PrologEditorWebViewProvider } from './views/PrologEditorWebViewProvider';

export function activate(context: vscode.ExtensionContext) {
    // ... código existente ...

    // Registrar Prolog Editor WebView
    const prologEditorProvider = new PrologEditorWebViewProvider(
        context.extensionUri,
        context,
        mcpDriverAdapter // Reutilizar el cliente MCP existente
    );

    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            PrologEditorWebViewProvider.viewType,
            prologEditorProvider
        )
    );

    // Comando para abrir el editor
    context.subscriptions.push(
        vscode.commands.registerCommand('alephscript.prologEditor.open', () => {
            vscode.commands.executeCommand('alephscript.prologEditor.focus');
        })
    );
}
```

---

## 5. Estilos CSS (media/prolog-editor.css)

```css
/* media/prolog-editor.css */

.prolog-editor-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 8px;
    gap: 8px;
}

/* Session Controls */
.session-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background: var(--bg-secondary);
    border-radius: 4px;
    border: 1px solid var(--border-color);
}

.session-status {
    display: flex;
    align-items: center;
    gap: 8px;
}

.status-indicator {
    color: var(--color-warning);
    font-size: 12px;
}

.status-indicator.connected {
    color: var(--color-success);
}

.session-id {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-muted);
}

.session-actions {
    display: flex;
    gap: 8px;
}

/* Editor Panels */
.editor-panels {
    display: flex;
    flex: 1;
    gap: 8px;
    min-height: 0;
}

.panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: var(--bg-secondary);
    border-radius: 4px;
    border: 1px solid var(--border-color);
    overflow: hidden;
}

.panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background: var(--bg-tertiary);
    border-bottom: 1px solid var(--border-color);
}

.panel-title {
    font-weight: 600;
    font-size: 13px;
}

.panel-actions {
    display: flex;
    gap: 4px;
}

/* Code Editor */
.editor-wrapper {
    flex: 1;
    min-height: 0;
    padding: 8px;
}

.code-editor {
    width: 100%;
    height: 100%;
    resize: none;
    font-family: var(--font-mono);
    font-size: 12px;
    line-height: 1.5;
    padding: 12px;
    background: var(--bg-primary);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
    border-radius: 4px;
}

.code-editor:focus {
    outline: none;
    border-color: var(--color-accent);
}

.editor-footer {
    display: flex;
    gap: 8px;
    padding: 8px 12px;
    border-top: 1px solid var(--border-color);
}

/* Query Panel */
.query-input-wrapper {
    display: flex;
    gap: 8px;
    padding: 8px 12px;
    border-bottom: 1px solid var(--border-color);
}

.query-input {
    flex: 1;
    font-family: var(--font-mono);
    font-size: 13px;
    padding: 8px 12px;
    background: var(--bg-primary);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
    border-radius: 4px;
}

.query-input:focus {
    outline: none;
    border-color: var(--color-accent);
}

/* Query History */
.query-history {
    max-height: 120px;
    overflow-y: auto;
    border-bottom: 1px solid var(--border-color);
}

.history-header {
    padding: 4px 12px;
    font-size: 11px;
    color: var(--color-muted);
    background: var(--bg-tertiary);
}

.history-item {
    display: flex;
    gap: 8px;
    padding: 4px 12px;
    font-size: 11px;
    cursor: pointer;
    border-bottom: 1px solid var(--border-subtle);
}

.history-item:hover {
    background: var(--bg-hover);
}

.history-item.success .history-query {
    color: var(--color-success);
}

.history-item.error .history-query {
    color: var(--color-error);
}

.history-time {
    color: var(--color-muted);
    font-family: var(--font-mono);
}

.history-query {
    font-family: var(--font-mono);
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* Results Output */
.results-wrapper {
    flex: 1;
    min-height: 0;
    padding: 8px;
}

.results-output {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 12px;
    font-family: var(--font-mono);
    font-size: 11px;
    line-height: 1.4;
    background: var(--bg-primary);
    color: var(--text-secondary);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    overflow: auto;
    white-space: pre-wrap;
}

/* MCP Status Bar */
.mcp-status-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 6px 12px;
    background: var(--bg-tertiary);
    border-radius: 4px;
    font-size: 11px;
    color: var(--color-muted);
}

.mcp-indicator {
    color: var(--color-success);
}

/* Buttons */
.hacker-btn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 6px 12px;
    font-size: 12px;
    font-weight: 500;
    background: var(--bg-tertiary);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
}

.hacker-btn:hover:not(:disabled) {
    background: var(--bg-hover);
    border-color: var(--color-accent);
}

.hacker-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.hacker-btn.primary {
    background: var(--color-accent);
    color: var(--bg-primary);
    border-color: var(--color-accent);
}

.hacker-btn.primary:hover:not(:disabled) {
    background: var(--color-accent-hover);
}

.icon-btn {
    padding: 4px 8px;
    font-size: 14px;
    background: transparent;
    border: none;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.2s;
}

.icon-btn:hover {
    opacity: 1;
}
```

---

## 6. Plan de Implementación

### 6.1 Fases

| Fase | Tareas | Esfuerzo | Sprint |
|------|--------|----------|--------|
| **1. Scaffold** | Crear archivos, registrar en package.json | 2 pts | FC1 |
| **2. UI básica** | HTML/CSS del WebView | 3 pts | FC2 |
| **3. Integración MCP** | Conectar con MCPDriverAdapter | 3 pts | FC2 |
| **4. Features** | Templates, historial, archivo | 5 pts | FC2 |
| **5. Polish** | Temas, errores, UX | 2 pts | FC2 |

**Total estimado**: 15 pts (~3 iteraciones)

### 6.2 Dependencias

| Componente | Estado | Bloqueante |
|------------|--------|------------|
| MCPPrologServer | ✅ Existe | No |
| MCPDriverAdapter | ✅ Existe | No |
| BaseHackerPanelProvider | ✅ Existe | No |
| Hacker Theme CSS | ✅ Existe | No |

### 6.3 Riesgos

| Riesgo | Probabilidad | Mitigación |
|--------|--------------|------------|
| WebView limitado vs Angular | Alta | Usar vanilla JS, no framework |
| Comunicación MCP compleja | Media | Reutilizar MCPDriverAdapter existente |
| Sintaxis highlighting Prolog | Alta | Usar CodeMirror embebido o similar |

---

## 7. Alternativa: Panel Flotante

Si el sidebar es muy pequeño, se puede usar un **panel flotante** (WebviewPanel en lugar de WebviewView):

```typescript
// Abrir como panel flotante
vscode.commands.registerCommand('alephscript.prologEditor.openPanel', () => {
    const panel = vscode.window.createWebviewPanel(
        'prologEditorPanel',
        '🧠 Prolog Editor',
        vscode.ViewColumn.Beside,
        {
            enableScripts: true,
            retainContextWhenHidden: true
        }
    );
    // ... mismo HTML/JS
});
```

---

## 8. Conclusión

La Opción D es **viable y aprovecha infraestructura existente**:

- ✅ `BaseHackerPanelProvider` como clase base
- ✅ Sistema de temas (matrix/light/dark) ya implementado
- ✅ `MCPDriverAdapter` para comunicación MCP
- ✅ Patrón de `TeatroWebViewProvider` a seguir

**Recomendación**: Implementar en **FC2** después de validar Fase 1 del spike principal (demo local con Angular standalone).

---

## Referencias

- [BaseHackerPanelProvider.ts](../../../VsCodeExtension/src/views/BaseHackerPanelProvider.ts)
- [TeatroWebViewProvider.ts](../../../VsCodeExtension/src/views/TeatroWebViewProvider.ts)
- [VS Code WebView API](https://code.visualstudio.com/api/extension-guides/webview)
- [MCPPrologServer.ts](../../../MCPGallery/mcp-mesh-sdk/src/MCPPrologServer.ts)
- [Spike principal](./spike_integracion_prolog_frontend.md)

---

**Estado**: 📋 Blueprint para FC2
