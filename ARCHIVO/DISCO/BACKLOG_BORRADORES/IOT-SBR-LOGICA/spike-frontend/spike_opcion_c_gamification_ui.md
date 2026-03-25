# Spike: Opción C — Gamification UI para PrologEditor

> **Épica**: SCRIPT-2.3.1 (PrologAgent Pack)  
> **Fecha**: 2026-01-02  
> **Autor**: @ox  
> **Estado**: 📋 Propuesta (pendiente revisión)

---

## 1. Resumen Ejecutivo

**Propuesta**: Reutilizar el sistema de **HTML5GamificationUI** del submódulo `StateMachine` para servir el frontend de PrologEditor, en lugar de integrar el frontend Angular existente.

### Ventajas Clave

| Aspecto | Angular Frontend | Gamification UI |
|---------|-----------------|-----------------|
| Dependencias | Angular 18.2.4, Material, Monaco | Express 4.18.2, SSE, RxJS |
| Complejidad de integración | Alta (build, proxy, CORS) | Baja (ya Express integrado) |
| Consistencia con Scriptorium | Externa | Nativa (misma arquitectura) |
| Tiempo de desarrollo | 4-6 horas | 2-3 horas |
| Tamaño de bundle | ~2MB | ~50KB |

---

## 2. Arquitectura Propuesta

### 2.1 Flujo de Datos

```
┌─────────────────────────────────────────────────────────────────────┐
│                         VS Code Extension                           │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    Copilot Chat                              │   │
│  │    @prolog "consulta(X)" o @plugin_ox_prologeditor           │   │
│  └─────────────────────┬───────────────────────────────────────┘   │
│                        │                                            │
│                        ▼                                            │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │              MCP Client (VS Code)                            │   │
│  │         tools: prolog_query, prolog_assert, ...              │   │
│  └─────────────────────┬───────────────────────────────────────┘   │
│                        │ HTTP/SSE                                   │
└────────────────────────┼────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    MCPLauncherServer (3050)                         │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │           PrologGamificationUI (NUEVO)                       │   │
│  │                                                              │   │
│  │   • Express server (puerto 5006)                             │   │
│  │   • SSE para streaming de resultados                         │   │
│  │   • Integración con MCPDriverAdapter                         │   │
│  └─────────────────────┬───────────────────────────────────────┘   │
│                        │                                            │
│                        ▼                                            │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │               prolog-mcp-server (3006)                       │   │
│  │                                                              │   │
│  │   • prolog_query(query, kbId?)                               │   │
│  │   • prolog_assert(fact, kbId?)                               │   │
│  │   • prolog_kb_list()                                         │   │
│  │   • prolog_kb_create(kbId, description?)                     │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.2 Componentes a Crear

| Componente | Ubicación | Descripción |
|------------|-----------|-------------|
| `PrologGamificationUI.ts` | `StateMachine/src/ui/` | Extensión de HTML5GamificationUI |
| `prolog-game.html` | `StateMachine/public/` | UI web para consultas Prolog |
| `prolog-client.js` | `StateMachine/public/` | Cliente JS para SSE |

---

## 3. Implementación Técnica

### 3.1 PrologGamificationUI (Extensión de HTML5)

```typescript
// StateMachine/src/ui/PrologGamificationUI.ts

import { 
    HTML5GamificationUI, 
    HTML5GameUIConfig 
} from "./HTML5GamificationUI";
import { Runtime } from "../runtime/Runtime";
import { MCPDriverAdapter } from "../drivers/MCPDriverAdapter";

export interface PrologUIConfig extends HTML5GameUIConfig {
    /** Prolog MCP server port */
    prologServerPort: number;
    /** Default knowledge base */
    defaultKB?: string;
    /** Enable syntax highlighting */
    enableHighlight?: boolean;
}

export class PrologGamificationUI extends HTML5GamificationUI {
    private prologConfig: PrologUIConfig;
    private currentKB: string = 'default';
    private queryHistory: string[] = [];

    constructor(
        runtime: Runtime,
        mcpAdapter: MCPDriverAdapter,
        config: PrologUIConfig
    ) {
        super(runtime, mcpAdapter, config);
        this.prologConfig = config;
        this.currentKB = config.defaultKB || 'default';
    }

    // ===== Prolog-Specific Methods =====

    /**
     * Execute Prolog query via MCP
     */
    async executeQuery(query: string): Promise<any> {
        this.queryHistory.push(query);
        
        const result = await this.mcpDriver.callTool(
            'prolog-mcp-server',
            'prolog_query',
            { query, kbId: this.currentKB }
        );

        // Broadcast result to web clients
        this.broadcastPrologResult('query_result', {
            query,
            result,
            kb: this.currentKB,
            timestamp: Date.now()
        });

        return result;
    }

    /**
     * Assert new fact
     */
    async assertFact(fact: string): Promise<any> {
        const result = await this.mcpDriver.callTool(
            'prolog-mcp-server',
            'prolog_assert',
            { fact, kbId: this.currentKB }
        );

        this.broadcastPrologResult('fact_asserted', {
            fact,
            result,
            kb: this.currentKB,
            timestamp: Date.now()
        });

        return result;
    }

    /**
     * Switch knowledge base
     */
    async switchKB(kbId: string): Promise<void> {
        this.currentKB = kbId;
        
        this.broadcastPrologResult('kb_switched', {
            newKB: kbId,
            timestamp: Date.now()
        });
    }

    /**
     * List all knowledge bases
     */
    async listKnowledgeBases(): Promise<any> {
        const result = await this.mcpDriver.callTool(
            'prolog-mcp-server',
            'prolog_kb_list',
            {}
        );

        this.broadcastPrologResult('kb_list', {
            knowledgeBases: result,
            currentKB: this.currentKB,
            timestamp: Date.now()
        });

        return result;
    }

    /**
     * Broadcast Prolog-specific SSE event
     */
    private broadcastPrologResult(event: string, data: any): void {
        // Uses parent's broadcastSSE method
        (this as any).broadcastSSE(`prolog_${event}`, data);
    }

    // ===== Express Route Extensions =====

    protected setupExpressApp(): void {
        super.setupExpressApp();
        this.setupPrologRoutes();
    }

    private setupPrologRoutes(): void {
        const app = (this as any).app;

        // Prolog query endpoint
        app.post('/prolog/query', async (req, res) => {
            try {
                const { query, kbId } = req.body;
                const result = await this.executeQuery(query);
                res.json({ success: true, result });
            } catch (error) {
                res.status(500).json({ 
                    success: false, 
                    error: error.message 
                });
            }
        });

        // Prolog assert endpoint
        app.post('/prolog/assert', async (req, res) => {
            try {
                const { fact, kbId } = req.body;
                if (kbId) this.currentKB = kbId;
                const result = await this.assertFact(fact);
                res.json({ success: true, result });
            } catch (error) {
                res.status(500).json({ 
                    success: false, 
                    error: error.message 
                });
            }
        });

        // Knowledge base list
        app.get('/prolog/kb', async (req, res) => {
            try {
                const result = await this.listKnowledgeBases();
                res.json({ success: true, result });
            } catch (error) {
                res.status(500).json({ 
                    success: false, 
                    error: error.message 
                });
            }
        });

        // Switch KB
        app.post('/prolog/kb/switch', async (req, res) => {
            try {
                const { kbId } = req.body;
                await this.switchKB(kbId);
                res.json({ success: true, currentKB: this.currentKB });
            } catch (error) {
                res.status(500).json({ 
                    success: false, 
                    error: error.message 
                });
            }
        });

        // Query history
        app.get('/prolog/history', (req, res) => {
            res.json({ 
                success: true, 
                history: this.queryHistory.slice(-50) 
            });
        });
    }
}
```

### 3.2 UI Web (prolog-game.html)

```html
<!-- StateMachine/public/prolog-game.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prolog Editor - Gamification UI</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Fira Code', 'Consolas', monospace;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            color: #e8e8e8;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        .header {
            background: rgba(0, 212, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 1rem 2rem;
            border-bottom: 1px solid rgba(0, 212, 255, 0.3);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .header h1 {
            color: #00d4ff;
            font-size: 1.5rem;
            font-weight: 400;
        }

        .kb-selector {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .kb-selector select {
            background: #1a1a2e;
            color: #00d4ff;
            border: 1px solid #00d4ff;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            cursor: pointer;
        }

        .main-container {
            flex: 1;
            display: grid;
            grid-template-columns: 1fr 400px;
            gap: 1rem;
            padding: 1rem;
        }

        .editor-panel {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
            padding: 1rem;
            display: flex;
            flex-direction: column;
        }

        .query-input {
            width: 100%;
            height: 150px;
            background: #0d1117;
            color: #58a6ff;
            border: 1px solid #30363d;
            border-radius: 8px;
            padding: 1rem;
            font-family: inherit;
            font-size: 14px;
            resize: vertical;
        }

        .query-input:focus {
            outline: none;
            border-color: #00d4ff;
            box-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
        }

        .button-row {
            display: flex;
            gap: 0.5rem;
            margin-top: 1rem;
        }

        .btn {
            padding: 0.8rem 1.5rem;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-family: inherit;
            font-weight: 600;
            transition: all 0.2s;
        }

        .btn-primary {
            background: linear-gradient(135deg, #00d4ff, #0099cc);
            color: #1a1a2e;
        }

        .btn-secondary {
            background: transparent;
            border: 1px solid #00d4ff;
            color: #00d4ff;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 212, 255, 0.3);
        }

        .results-area {
            flex: 1;
            margin-top: 1rem;
            background: #0d1117;
            border-radius: 8px;
            padding: 1rem;
            overflow-y: auto;
        }

        .result-item {
            padding: 1rem;
            margin-bottom: 0.5rem;
            border-radius: 5px;
            border-left: 3px solid #00d4ff;
            background: rgba(0, 212, 255, 0.1);
        }

        .result-item.error {
            border-left-color: #ff6b6b;
            background: rgba(255, 107, 107, 0.1);
        }

        .result-item.success {
            border-left-color: #00ff88;
            background: rgba(0, 255, 136, 0.1);
        }

        .result-query {
            color: #888;
            font-size: 0.85rem;
            margin-bottom: 0.5rem;
        }

        .result-content {
            color: #e8e8e8;
            white-space: pre-wrap;
        }

        .sidebar {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .panel {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
            padding: 1rem;
        }

        .panel-title {
            color: #00d4ff;
            font-size: 1rem;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid rgba(0, 212, 255, 0.3);
        }

        .history-item {
            padding: 0.5rem;
            margin-bottom: 0.3rem;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 3px;
            cursor: pointer;
            font-size: 0.85rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .history-item:hover {
            background: rgba(0, 212, 255, 0.2);
        }

        .status-indicator {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .status-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #888;
        }

        .status-dot.connected {
            background: #00ff88;
            box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
        }

        .kb-list {
            max-height: 200px;
            overflow-y: auto;
        }

        .kb-item {
            padding: 0.5rem;
            margin-bottom: 0.3rem;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 3px;
            cursor: pointer;
        }

        .kb-item:hover, .kb-item.active {
            background: rgba(0, 212, 255, 0.2);
        }

        /* Syntax highlighting classes */
        .prolog-predicate { color: #ff79c6; }
        .prolog-variable { color: #f1fa8c; }
        .prolog-atom { color: #8be9fd; }
        .prolog-number { color: #bd93f9; }
        .prolog-string { color: #50fa7b; }
        .prolog-comment { color: #6272a4; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🧠 Prolog Editor</h1>
        <div class="kb-selector">
            <span>Knowledge Base:</span>
            <select id="kbSelect">
                <option value="default">default</option>
            </select>
            <button class="btn btn-secondary" onclick="createNewKB()">+ New KB</button>
        </div>
        <div class="status-indicator">
            <div id="statusDot" class="status-dot"></div>
            <span id="statusText">Connecting...</span>
        </div>
    </div>

    <div class="main-container">
        <div class="editor-panel">
            <textarea 
                id="queryInput" 
                class="query-input" 
                placeholder="?- member(X, [1, 2, 3]).&#10;?- padre(X, Y), madre(Y, Z)."
            ></textarea>
            <div class="button-row">
                <button class="btn btn-primary" onclick="executeQuery()">▶ Run Query</button>
                <button class="btn btn-secondary" onclick="assertFact()">+ Assert</button>
                <button class="btn btn-secondary" onclick="clearResults()">Clear</button>
            </div>
            <div id="resultsArea" class="results-area">
                <div class="result-item">
                    <div class="result-content">Welcome to Prolog Editor. Enter a query above.</div>
                </div>
            </div>
        </div>

        <div class="sidebar">
            <div class="panel">
                <div class="panel-title">📚 Knowledge Bases</div>
                <div id="kbList" class="kb-list">
                    <div class="kb-item active">default</div>
                </div>
            </div>

            <div class="panel">
                <div class="panel-title">📜 Query History</div>
                <div id="historyList" class="history-list">
                    <!-- History items will be added here -->
                </div>
            </div>

            <div class="panel">
                <div class="panel-title">💡 Quick Reference</div>
                <div style="font-size: 0.85rem; color: #888;">
                    <code>?-</code> Query prefix<br>
                    <code>:-</code> Rule definition<br>
                    <code>.</code> End of clause<br>
                    <code>,</code> AND (conjunction)<br>
                    <code>;</code> OR (disjunction)<br>
                    <code>_</code> Anonymous variable
                </div>
            </div>
        </div>
    </div>

    <script src="prolog-client.js"></script>
</body>
</html>
```

### 3.3 Cliente JavaScript (prolog-client.js)

```javascript
// StateMachine/public/prolog-client.js

class PrologEditorClient {
    constructor() {
        this.baseUrl = window.location.origin;
        this.eventSource = null;
        this.currentKB = 'default';
        this.history = [];
        
        this.init();
    }

    init() {
        this.connectSSE();
        this.loadKnowledgeBases();
        this.loadHistory();
        this.setupKeyboardShortcuts();
    }

    // SSE Connection
    connectSSE() {
        this.eventSource = new EventSource(`${this.baseUrl}/events`);
        
        this.eventSource.onopen = () => {
            this.updateStatus(true);
        };

        this.eventSource.onerror = () => {
            this.updateStatus(false);
            setTimeout(() => this.connectSSE(), 3000);
        };

        // Prolog-specific events
        this.eventSource.addEventListener('prolog_query_result', (e) => {
            const data = JSON.parse(e.data);
            this.displayResult(data);
        });

        this.eventSource.addEventListener('prolog_fact_asserted', (e) => {
            const data = JSON.parse(e.data);
            this.displayAssertResult(data);
        });

        this.eventSource.addEventListener('prolog_kb_switched', (e) => {
            const data = JSON.parse(e.data);
            this.onKBSwitched(data);
        });

        this.eventSource.addEventListener('prolog_kb_list', (e) => {
            const data = JSON.parse(e.data);
            this.updateKBList(data);
        });
    }

    updateStatus(connected) {
        const dot = document.getElementById('statusDot');
        const text = document.getElementById('statusText');
        
        if (connected) {
            dot.classList.add('connected');
            text.textContent = 'Connected';
        } else {
            dot.classList.remove('connected');
            text.textContent = 'Disconnected';
        }
    }

    // API Calls
    async executeQuery() {
        const input = document.getElementById('queryInput');
        const query = input.value.trim();
        
        if (!query) return;

        try {
            const response = await fetch(`${this.baseUrl}/prolog/query`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query, kbId: this.currentKB })
            });
            
            const data = await response.json();
            this.addToHistory(query);
            
            // Result will come via SSE
        } catch (error) {
            this.displayError(query, error.message);
        }
    }

    async assertFact() {
        const input = document.getElementById('queryInput');
        const fact = input.value.trim();
        
        if (!fact) return;

        try {
            const response = await fetch(`${this.baseUrl}/prolog/assert`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fact, kbId: this.currentKB })
            });
            
            const data = await response.json();
            this.addToHistory(`assert(${fact})`);
            
        } catch (error) {
            this.displayError(fact, error.message);
        }
    }

    async loadKnowledgeBases() {
        try {
            const response = await fetch(`${this.baseUrl}/prolog/kb`);
            const data = await response.json();
            
            if (data.success) {
                this.updateKBList(data.result);
            }
        } catch (error) {
            console.error('Failed to load KBs:', error);
        }
    }

    async switchKB(kbId) {
        try {
            const response = await fetch(`${this.baseUrl}/prolog/kb/switch`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ kbId })
            });
            
            const data = await response.json();
            if (data.success) {
                this.currentKB = kbId;
                document.getElementById('kbSelect').value = kbId;
            }
        } catch (error) {
            console.error('Failed to switch KB:', error);
        }
    }

    async loadHistory() {
        try {
            const response = await fetch(`${this.baseUrl}/prolog/history`);
            const data = await response.json();
            
            if (data.success) {
                this.history = data.history;
                this.renderHistory();
            }
        } catch (error) {
            console.error('Failed to load history:', error);
        }
    }

    // UI Updates
    displayResult(data) {
        const area = document.getElementById('resultsArea');
        const item = document.createElement('div');
        item.className = 'result-item success';
        
        item.innerHTML = `
            <div class="result-query">?- ${this.escapeHtml(data.query)}</div>
            <div class="result-content">${this.formatResult(data.result)}</div>
        `;
        
        area.insertBefore(item, area.firstChild);
    }

    displayAssertResult(data) {
        const area = document.getElementById('resultsArea');
        const item = document.createElement('div');
        item.className = 'result-item success';
        
        item.innerHTML = `
            <div class="result-query">Asserted: ${this.escapeHtml(data.fact)}</div>
            <div class="result-content">✓ Fact added to KB: ${data.kb}</div>
        `;
        
        area.insertBefore(item, area.firstChild);
    }

    displayError(query, error) {
        const area = document.getElementById('resultsArea');
        const item = document.createElement('div');
        item.className = 'result-item error';
        
        item.innerHTML = `
            <div class="result-query">?- ${this.escapeHtml(query)}</div>
            <div class="result-content">Error: ${this.escapeHtml(error)}</div>
        `;
        
        area.insertBefore(item, area.firstChild);
    }

    updateKBList(data) {
        const list = document.getElementById('kbList');
        const select = document.getElementById('kbSelect');
        
        list.innerHTML = '';
        select.innerHTML = '';
        
        const kbs = data.knowledgeBases || data || [];
        
        kbs.forEach(kb => {
            // List item
            const item = document.createElement('div');
            item.className = 'kb-item' + (kb.id === this.currentKB ? ' active' : '');
            item.textContent = kb.id || kb;
            item.onclick = () => this.switchKB(kb.id || kb);
            list.appendChild(item);
            
            // Select option
            const option = document.createElement('option');
            option.value = kb.id || kb;
            option.textContent = kb.id || kb;
            option.selected = (kb.id || kb) === this.currentKB;
            select.appendChild(option);
        });
    }

    addToHistory(query) {
        this.history.unshift(query);
        if (this.history.length > 50) {
            this.history.pop();
        }
        this.renderHistory();
    }

    renderHistory() {
        const list = document.getElementById('historyList');
        list.innerHTML = '';
        
        this.history.slice(0, 20).forEach(query => {
            const item = document.createElement('div');
            item.className = 'history-item';
            item.textContent = query;
            item.onclick = () => {
                document.getElementById('queryInput').value = query;
            };
            list.appendChild(item);
        });
    }

    onKBSwitched(data) {
        this.currentKB = data.newKB;
        document.getElementById('kbSelect').value = data.newKB;
        
        // Update active state in list
        document.querySelectorAll('.kb-item').forEach(item => {
            item.classList.toggle('active', item.textContent === data.newKB);
        });
    }

    // Utilities
    formatResult(result) {
        if (typeof result === 'object') {
            return JSON.stringify(result, null, 2);
        }
        return String(result);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    clearResults() {
        const area = document.getElementById('resultsArea');
        area.innerHTML = '<div class="result-item"><div class="result-content">Results cleared.</div></div>';
    }

    setupKeyboardShortcuts() {
        document.getElementById('queryInput').addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Enter to execute
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                this.executeQuery();
            }
            // Ctrl/Cmd + Shift + Enter to assert
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'Enter') {
                e.preventDefault();
                this.assertFact();
            }
        });
    }
}

// Global functions for button onclick handlers
const client = new PrologEditorClient();

function executeQuery() { client.executeQuery(); }
function assertFact() { client.assertFact(); }
function clearResults() { client.clearResults(); }
function createNewKB() {
    const name = prompt('Enter new Knowledge Base name:');
    if (name) {
        // TODO: API call to create KB
        alert('KB creation not implemented yet');
    }
}

// KB selector change handler
document.getElementById('kbSelect').addEventListener('change', (e) => {
    client.switchKB(e.target.value);
});
```

---

## 4. Integración con MCPLauncherServer

### 4.1 Registrar PrologGamificationUI

```typescript
// En MCPGallery/mcp-mesh-sdk/src/servers/launcher-server.ts

import { PrologGamificationUI, PrologUIConfig } from 'StateMachine/src/ui/PrologGamificationUI';

// Añadir a CONFIGS_BASE_MCP_SERVER
const PROLOG_UI_CONFIG: PrologUIConfig = {
    port: 5006,
    gameTitle: 'Prolog Editor',
    prologServerPort: 3006,
    defaultKB: 'default',
    enableHighlight: true,
    debugMode: false
};

// En el método de inicialización
async initializePrologUI() {
    const runtime = new Runtime();
    const mcpAdapter = new MCPDriverAdapter(/* config */);
    
    const prologUI = new PrologGamificationUI(
        runtime,
        mcpAdapter,
        PROLOG_UI_CONFIG
    );
    
    await prologUI.start();
    
    console.log('🧠 Prolog UI available at http://localhost:5006/prolog-game.html');
}
```

### 4.2 Script de Arranque

```bash
#!/bin/bash
# scripts/start-prolog-ui.sh

echo "🚀 Starting Prolog Gamification UI..."

# 1. Start prolog-mcp-server
cd MCPGallery/mcp-mesh-sdk
npm run mcp:prolog &

# 2. Start launcher with Prolog UI
npm run start:prolog-ui &

echo "✅ Prolog UI: http://localhost:5006/prolog-game.html"
echo "✅ Prolog MCP: localhost:3006"
```

---

## 5. Comparativa con Otras Opciones

| Criterio | Opción A (Proxy) | Opción B (Standalone) | Opción C (Gamification) | Opción D (WebView) |
|----------|------------------|----------------------|------------------------|-------------------|
| **Código nuevo** | ~50 líneas | ~200 líneas | ~300 líneas | ~500 líneas |
| **Dependencias externas** | Angular 18 | Angular 18 | Ninguna (RxJS ya está) | VS Code API |
| **Consistencia arquitectónica** | ⚠️ Baja | ⚠️ Media | ✅ Alta | ✅ Alta |
| **Reusabilidad** | ⚠️ Baja | ⚠️ Media | ✅ Alta | ⚠️ Media |
| **Mantenibilidad** | ⚠️ Dos stacks | ⚠️ Dos stacks | ✅ Un stack | ✅ Un stack |
| **Tiempo desarrollo** | 4h | 6h | 3h | 6h |
| **Requiere build Angular** | Sí | Sí | No | No |

### Recomendación

**Opción C (Gamification UI)** es la mejor elección porque:

1. **Reutiliza infraestructura existente**: El sistema de `HTML5GamificationUI` ya resuelve SSE, Express, CORS
2. **Consistencia de stack**: Todo TypeScript + RxJS, sin Angular
3. **Extensibilidad**: Fácil añadir más UIs (BlocklyGamificationUI, ThreeJSGamificationUI)
4. **Menor superficie de mantenimiento**: Un solo patrón para todas las UIs de gamificación

---

## 6. Plan de Implementación

### Fase 1: Core (2h)

1. Crear `PrologGamificationUI.ts` extendiendo `HTML5GamificationUI`
2. Añadir rutas específicas de Prolog (`/prolog/query`, `/prolog/assert`, etc.)
3. Test unitario de métodos MCP

### Fase 2: UI Web (1h)

1. Crear `prolog-game.html` con diseño consistente
2. Crear `prolog-client.js` con lógica SSE
3. Test manual de interfaz

### Fase 3: Integración (1h)

1. Registrar en `MCPLauncherServer`
2. Crear script de arranque
3. Documentar en README-SCRIPTORIUM.md

---

## 7. Preguntas para Revisión

1. **¿El puerto 5006 está bien para la UI?** (5001 es el Angular original)
2. **¿Incluimos syntax highlighting de Prolog?** (Requiere librería adicional)
3. **¿Mantenemos el frontend Angular como opción alternativa?**
4. **¿Añadimos integración con BlocklyGamificationUI para Prolog visual?**
5. **¿El cliente JS debería ser un módulo ES6 o script clásico?**

---

## 8. Riesgos y Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| `MCPDriverAdapter` incompatible | Baja | Alto | Crear adapter específico |
| SSE no funciona en WebView VS Code | Media | Medio | Usar polling fallback |
| Rendimiento con muchas KBs | Baja | Bajo | Paginación de resultados |
| Conflicto de puertos | Media | Bajo | Puerto configurable |

---

## 9. Archivos a Crear/Modificar

### Nuevos

| Archivo | Ubicación | Tamaño estimado |
|---------|-----------|-----------------|
| `PrologGamificationUI.ts` | `StateMachine/src/ui/` | ~200 líneas |
| `prolog-game.html` | `StateMachine/public/` | ~300 líneas |
| `prolog-client.js` | `StateMachine/public/` | ~200 líneas |
| `start-prolog-ui.sh` | `scripts/` | ~20 líneas |

### Modificar

| Archivo | Cambio |
|---------|--------|
| `StateMachine/src/ui/index.ts` | Exportar `PrologGamificationUI` |
| `MCPLauncherServer` | Registrar UI en configs |
| `README-SCRIPTORIUM.md` (StateMachine) | Documentar uso |

---

## 10. Siguiente Paso

> **Decisión requerida**: ¿Procedo con la implementación de la Opción C (Gamification UI)?

Si la respuesta es afirmativa, el siguiente paso es:
1. Crear `PrologGamificationUI.ts` en `StateMachine/src/ui/`
2. Testear integración con `prolog-mcp-server`
3. Crear UI web y cliente JS

---

*Documento generado por @ox como parte de la épica SCRIPT-2.3.1*
