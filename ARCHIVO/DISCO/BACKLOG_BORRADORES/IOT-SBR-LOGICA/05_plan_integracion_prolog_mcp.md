# Plan de Integración: Prolog MCP Server

> **Fecha**: 2 de enero de 2026  
> **Base técnica**: AAIAGallery/PrologServer  
> **Target**: MCPLauncherServer mesh  
> **Referencias**: [feature1](../Enero_2026_LogicaAgentes/feature1_prolog_inteligencias_situadas.md), [feature2](../Enero_2026_LogicaAgentes/feature2_agentic_typed_logic_flow.md)

---

## Resumen Ejecutivo

**Objetivo**: Crear `prolog-mcp-server` que exponga el motor Prolog como herramienta MCP invocable por agentes del Teatro.

**Base de código**: `AAIAGallery/alephscript/src/FIA/paradigmas/sbr/app/prolog/server.ts`  
- ✅ Clase instanciable (`new PrologServer()`)  
- ✅ Binding `swipl-stdio` con soporte multi-engine  
- ✅ Caché de archivos persistente  

**Integración**: `MCPGallery/mcp-mesh-sdk` siguiendo patrón de `devops-mcp-server`.

---

## Arquitectura Propuesta

```
┌─────────────────────────────────────────────────────────────────┐
│               MCPLauncherServer (:3050)                         │
├─────────────────────────────────────────────────────────────────┤
│ CONFIGS_BASE_MCP_SERVER = {                                     │
│   "state-machine-server": {...},                                │
│   "devops-mcp-server": {...},                                   │
│   "prolog-mcp-server": DEFAULT_PROLOG_MCP_SERVER_CONFIG ← NEW  │
│ }                                                               │
└─────────────────────────────────────────────────────────────────┘
                          │
                          │ launch_mcp_server("prolog-mcp-server")
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│            prolog-mcp-server (:3006)                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │         PrologSessionManager                            │   │
│   │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │   │
│   │  │ session_duna │  │ session_arg  │  │ session_test │   │   │
│   │  │ PrologServer │  │ PrologServer │  │ PrologServer │   │   │
│   │  │ (engine 1)   │  │ (engine 2)   │  │ (engine 3)   │   │   │
│   │  └──────────────┘  └──────────────┘  └──────────────┘   │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│   MCP Tools:                                                    │
│   - create_session(obra_id) → session_token                     │
│   - query_prolog(session_token, query) → result                 │
│   - assert_fact(session_token, fact)                            │
│   - consult_file(session_token, file_path)                      │
│   - destroy_session(session_token)                              │
│                                                                 │
│   MCP Resources:                                                │
│   - session_state(session_token) → KB actual                    │
│   - templates_catalog → state-machine, iot-app, simu            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Fase 1: Archivos a Crear

### 1.1 Config del Servidor

**Archivo**: `MCPGallery/mcp-mesh-sdk/src/configs/DEFAULT_PROLOG_MCP_SERVER_CONFIG.ts`

```typescript
import { BaseMCPServerConfig } from "../MCPServerConfig";

export const DEFAULT_PROLOG_MCP_SERVER_CONFIG: BaseMCPServerConfig = {
  id: "prolog-mcp-server",
  name: "Prolog MCP Server",
  script: "src/MCPPrologServer.ts",
  port: 3006,
  capabilitiesCheck: {
    tools: true,
    resources: true,
    prompts: false,
  },
  features: {
    enableManagers: true,        // Session manager
    enableWebConsole: false,
    enableHealthChecks: true,
  },
  description: "Prolog logic inference server with session management for Teatro agents",
  autoRestart: true,
  healthCheckInterval: 30000,
  url: "http://localhost",
  version: "1.0.0",
  metadata: {
    binding: "swipl-stdio",
    multiEngine: true,
    templates: ["state-machine", "iot-app", "simu"]
  }
};
```

### 1.2 Exportar en index.ts

**Archivo**: `MCPGallery/mcp-mesh-sdk/src/configs/index.ts`

```typescript
export * from "./DEFAULT_WIKI_MCP_SERVER_CONFIG";
export * from "./DEFAULT_XPLUS1_MCP_SERVER_CONFIG";
export * from "./DEFAULT_STATE_MACHINE_MCP_SERVER_CONFIG";
export * from "./DEFAULT_LAUNCHER_MCP_SERVER_CONFIG";
export * from "./DEFAULT_DEVOPS_MCP_SERVER_CONFIG";
export * from "./DEFAULT_PROLOG_MCP_SERVER_CONFIG";  // ← NUEVO
```

### 1.3 Registrar en MCPLauncherServer.ts

**Archivo**: `MCPGallery/mcp-mesh-sdk/src/MCPLauncherServer.ts`

```typescript
// Línea ~22
export const CONFIGS_BASE_MCP_SERVER = {
    not_set: DEFAULT_LAUNCHER_MCP_SERVER_CONFIG,
    "state-machine-server": DEFAULT_STATE_MACHINE_MCP_SERVER_CONFIG,
    "xplus1-mcp-machine": DEFAULT_XPLUS1_MCP_SERVER_CONFIG,
    "wiki-mcp-browser": DEFAULT_WIKI_MCP_SERVER_CONFIG,
    "devops-mcp-server": DEFAULT_DEVOPS_MCP_SERVER_CONFIG,
    "prolog-mcp-server": DEFAULT_PROLOG_MCP_SERVER_CONFIG,  // ← NUEVO
};
```

---

## Fase 2: Crear el Servidor MCP

### 2.1 Session Manager

**Archivo**: `MCPGallery/mcp-mesh-sdk/src/services/PrologSessionManager.ts`

```typescript
import { PrologServer } from '../../../AAIAGallery/alephscript/src/FIA/paradigmas/sbr/app/prolog/server';
import * as crypto from 'crypto';

export interface PrologSession {
  id: string;
  obraId: string;
  engine: PrologServer;
  createdAt: number;
  lastAccess: number;
}

export class PrologSessionManager {
  private sessions: Map<string, PrologSession> = new Map();
  private readonly SESSION_TIMEOUT = 3600000; // 1 hora

  createSession(obraId: string): string {
    const sessionId = `${obraId}-${crypto.randomBytes(8).toString('hex')}`;
    
    const engine = new PrologServer();
    // TODO: Configurar ruta default para templates
    // engine.openProlog(defaultTemplatePath);
    
    const session: PrologSession = {
      id: sessionId,
      obraId,
      engine,
      createdAt: Date.now(),
      lastAccess: Date.now(),
    };

    this.sessions.set(sessionId, session);
    console.log(`[PrologSessionManager] Created session: ${sessionId} for obra: ${obraId}`);
    
    return sessionId;
  }

  getSession(sessionId: string): PrologSession | undefined {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.lastAccess = Date.now();
    }
    return session;
  }

  destroySession(sessionId: string): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) return false;

    // El GC de Node liberará el engine
    this.sessions.delete(sessionId);
    console.log(`[PrologSessionManager] Destroyed session: ${sessionId}`);
    return true;
  }

  listSessions(): PrologSession[] {
    return Array.from(this.sessions.values());
  }

  // Cleanup de sesiones expiradas
  cleanupExpiredSessions(): number {
    const now = Date.now();
    let cleaned = 0;

    for (const [id, session] of this.sessions.entries()) {
      if (now - session.lastAccess > this.SESSION_TIMEOUT) {
        this.destroySession(id);
        cleaned++;
      }
    }

    return cleaned;
  }
}
```

### 2.2 Servidor MCP Principal

**Archivo**: `MCPGallery/mcp-mesh-sdk/src/MCPPrologServer.ts`

```typescript
import { BaseMCPServer } from "./BaseMCPServer";
import { DEFAULT_PROLOG_MCP_SERVER_CONFIG } from "./configs/DEFAULT_PROLOG_MCP_SERVER_CONFIG";
import { BaseMCPServerConfig } from "./MCPServerConfig";
import { PrologSessionManager } from "./services/PrologSessionManager";
import { z } from "zod";

export class MCPPrologServer extends BaseMCPServer {
  private sessionManager: PrologSessionManager;

  constructor(config: BaseMCPServerConfig = DEFAULT_PROLOG_MCP_SERVER_CONFIG) {
    super(config);
    this.sessionManager = new PrologSessionManager();
    
    // Setup cleanup interval
    setInterval(() => {
      const cleaned = this.sessionManager.cleanupExpiredSessions();
      if (cleaned > 0) {
        console.log(`[PrologServer] Cleaned ${cleaned} expired sessions`);
      }
    }, 300000); // Cada 5 minutos
  }

  protected setupServerSpecifics(): void {
    this.setupTools();
    this.setupResources();
  }

  private setupTools(): void {
    // Tool: Create Session
    this.server.tool(
      "create_session",
      "Create a new Prolog session for an obra (play)",
      {
        obraId: z.string().describe("Unique identifier for the obra/play"),
      },
      async ({ obraId }) => {
        try {
          const sessionId = this.sessionManager.createSession(obraId);
          return {
            success: true,
            sessionId,
            message: `Session created for obra: ${obraId}`,
          };
        } catch (error: any) {
          return {
            success: false,
            error: error.message,
          };
        }
      }
    );

    // Tool: Query Prolog
    this.server.tool(
      "query_prolog",
      "Execute a Prolog query in a session",
      {
        sessionId: z.string().describe("Session token"),
        query: z.string().describe("Prolog query (e.g., 'member(X, [1,2,3])')"),
      },
      async ({ sessionId, query }) => {
        try {
          const session = this.sessionManager.getSession(sessionId);
          if (!session) {
            return {
              success: false,
              error: "Session not found or expired",
            };
          }

          // TODO: Implementar ejecución de query usando session.engine
          // Por ahora retornamos mock
          return {
            success: true,
            query,
            results: [
              { X: 1 },
              { X: 2 },
              { X: 3 },
            ],
            message: "Query executed successfully (mock)",
          };
        } catch (error: any) {
          return {
            success: false,
            error: error.message,
          };
        }
      }
    );

    // Tool: Assert Fact
    this.server.tool(
      "assert_fact",
      "Add a fact to the knowledge base",
      {
        sessionId: z.string().describe("Session token"),
        fact: z.string().describe("Prolog fact (e.g., 'recurso(agua, critico)')"),
      },
      async ({ sessionId, fact }) => {
        try {
          const session = this.sessionManager.getSession(sessionId);
          if (!session) {
            return {
              success: false,
              error: "Session not found or expired",
            };
          }

          // TODO: Implementar assert usando session.engine
          return {
            success: true,
            fact,
            message: "Fact asserted successfully (mock)",
          };
        } catch (error: any) {
          return {
            success: false,
            error: error.message,
          };
        }
      }
    );

    // Tool: Consult File
    this.server.tool(
      "consult_file",
      "Load a Prolog file into the session",
      {
        sessionId: z.string().describe("Session token"),
        filePath: z.string().describe("Path to .pl file"),
      },
      async ({ sessionId, filePath }) => {
        try {
          const session = this.sessionManager.getSession(sessionId);
          if (!session) {
            return {
              success: false,
              error: "Session not found or expired",
            };
          }

          // TODO: Implementar consult usando session.engine
          return {
            success: true,
            filePath,
            message: "File consulted successfully (mock)",
          };
        } catch (error: any) {
          return {
            success: false,
            error: error.message,
          };
        }
      }
    );

    // Tool: Destroy Session
    this.server.tool(
      "destroy_session",
      "Destroy a Prolog session and free resources",
      {
        sessionId: z.string().describe("Session token"),
      },
      async ({ sessionId }) => {
        try {
          const destroyed = this.sessionManager.destroySession(sessionId);
          return {
            success: destroyed,
            message: destroyed 
              ? "Session destroyed successfully" 
              : "Session not found",
          };
        } catch (error: any) {
          return {
            success: false,
            error: error.message,
          };
        }
      }
    );

    // Tool: List Sessions
    this.server.tool(
      "list_sessions",
      "List all active Prolog sessions",
      {},
      async () => {
        try {
          const sessions = this.sessionManager.listSessions();
          return {
            success: true,
            sessions: sessions.map(s => ({
              id: s.id,
              obraId: s.obraId,
              createdAt: s.createdAt,
              lastAccess: s.lastAccess,
              age: Date.now() - s.createdAt,
            })),
          };
        } catch (error: any) {
          return {
            success: false,
            error: error.message,
          };
        }
      }
    );
  }

  private setupResources(): void {
    // Resource: Session State
    this.server.resource(
      "session-state",
      "prolog://session/{sessionId}",
      {
        name: "Prolog Session State",
        description: "Current state of a Prolog session",
        mimeType: "application/json",
      },
      async (uri) => {
        const sessionId = uri.split("/").pop();
        if (!sessionId) {
          throw new Error("Session ID not provided");
        }

        const session = this.sessionManager.getSession(sessionId);
        if (!session) {
          throw new Error("Session not found");
        }

        return {
          contents: [
            {
              uri,
              mimeType: "application/json",
              text: JSON.stringify({
                sessionId: session.id,
                obraId: session.obraId,
                createdAt: session.createdAt,
                lastAccess: session.lastAccess,
                uptime: Date.now() - session.createdAt,
              }, null, 2),
            },
          ],
        };
      }
    );

    // Resource: Templates Catalog
    this.server.resource(
      "templates-catalog",
      "prolog://templates/catalog",
      {
        name: "Prolog Templates Catalog",
        description: "Available Prolog templates",
        mimeType: "application/json",
      },
      async () => {
        return {
          contents: [
            {
              uri: "prolog://templates/catalog",
              mimeType: "application/json",
              text: JSON.stringify({
                templates: [
                  {
                    id: "state-machine",
                    name: "State Machine",
                    description: "Basic FSM for agent behaviors",
                  },
                  {
                    id: "iot-app",
                    name: "IoT Application",
                    description: "Sensor-Rule-Actuator paradigm",
                  },
                  {
                    id: "simu",
                    name: "Simulation",
                    description: "Scenario simulation",
                  },
                ],
              }, null, 2),
            },
          ],
        };
      }
    );
  }
}

export default MCPPrologServer;

// CLI entry point
async function main() {
  console.log("🧠 Starting Prolog MCP Server on port 3006");

  try {
    const server = new MCPPrologServer();
    await server.start();
    console.log("✅ Prolog MCP Server ready");
    
    process.on("SIGINT", async () => {
      console.log("\n🛑 Shutting down Prolog MCP Server...");
      await server.shutdown();
      process.exit(0);
    });
  } catch (error) {
    console.error("❌ Failed to start Prolog MCP Server:", error);
    process.exit(1);
  }
}

if (require.main === module || process.env.RUN_AS_SERVICE === "true") {
  main();
}
```

---

## Fase 3: Tasks de Implementación

| ID | Task | Descripción | Effort | Dependencias |
|----|------|-------------|--------|--------------|
| T001 | Crear DEFAULT_PROLOG_MCP_SERVER_CONFIG.ts | Config del servidor | 1 pt | — |
| T002 | Exportar en configs/index.ts | Añadir export | 0.5 pt | T001 |
| T003 | Registrar en CONFIGS_BASE_MCP_SERVER | Añadir a objeto | 0.5 pt | T001 |
| T004 | Crear PrologSessionManager.ts | Gestión de sesiones | 5 pts | — |
| T005 | Crear MCPPrologServer.ts | Servidor MCP completo | 8 pts | T004 |
| T006 | Implementar query_prolog (real) | Conectar con PrologServer | 3 pts | T005 |
| T007 | Implementar assert_fact (real) | Añadir hechos a KB | 2 pts | T005 |
| T008 | Implementar consult_file (real) | Cargar archivos .pl | 2 pts | T005 |
| T009 | Test E2E: crear sesión + query | Validar flujo completo | 3 pts | T006-T008 |
| T010 | Documentar API del servidor | README con ejemplos | 2 pts | T009 |

**Effort total**: 27 pts (~3 sprints)

---

## Fase 4: Verificación de Integración

### 4.1 Arrancar el servidor

```bash
cd MCPGallery/mcp-mesh-sdk
npm start
```

Esto debería:
1. Arrancar MCPLauncherServer en :3050
2. Auto-lanzar prolog-mcp-server en :3006 (via `launchAllServers()`)

### 4.2 Verificar en mesh

```bash
curl http://localhost:4001/ai/ui/mcp/list | jq '.catalog[] | select(.id == "prolog-mcp-server")'
```

Debería retornar:
```json
{
  "id": "prolog-mcp-server",
  "name": "Prolog MCP Server",
  "port": 3006,
  "status": "running",
  "url": "http://localhost:3006"
}
```

### 4.3 Test de herramientas

```bash
# Crear sesión
curl -X POST http://localhost:3006/tools/create_session \
  -H "Content-Type: application/json" \
  -d '{"obraId": "duna"}'

# Respuesta esperada:
# {"success": true, "sessionId": "duna-abc123..."}

# Query
curl -X POST http://localhost:3006/tools/query_prolog \
  -H "Content-Type: application/json" \
  -d '{"sessionId": "duna-abc123...", "query": "member(X, [1,2,3])"}'
```

---

## Fase 5: Integración con Pack AgentPrologBrain

Una vez el servidor esté funcional, crear el pack tipado (ver [feature2](../Enero_2026_LogicaAgentes/feature2_agentic_typed_logic_flow.md)):

**Archivo**: `.github/plugins/typed-prompting/packs/AgentPrologBrain.pack.json`

```json
{
  "$schema": "../schemas/pack.schema.json",
  "id": "AgentPrologBrain",
  "version": "1.0.0",
  "description": "Razonamiento lógico Prolog para agentes del Teatro",
  "mcpServer": "prolog-mcp-server",
  "tools": [
    {
      "name": "create_session",
      "description": "Crear sesión Prolog para la obra"
    },
    {
      "name": "query_prolog",
      "description": "Ejecutar query Prolog",
      "parameters": {
        "sessionId": "Desde contexto de obra",
        "query": "Query válida en Prolog"
      }
    },
    {
      "name": "assert_fact",
      "description": "Añadir hecho a KB"
    }
  ],
  "resources": [
    {
      "uri": "prolog://session/{sessionId}",
      "description": "Estado de sesión Prolog"
    }
  ],
  "lifecycle": {
    "obraStart": "create_session(obra.id)",
    "obraEnd": "destroy_session(session_token)"
  }
}
```

---

## Riesgos y Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| PrologServer sin método HTTP-compatible | Alta | Alto | Crear wrapper adapter que traduzca calls HTTP → métodos engine |
| Binding swipl-stdio no instalado | Media | Alto | Documentar instalación SWI-Prolog + binding npm |
| Memory leaks en sesiones largas | Media | Medio | Timeout + cleanup periódico implementado |
| Concurrencia en writes a misma KB | Baja | Medio | Serializar ops por sesión o añadir mutex |

---

## Referencias

| Documento | Relevancia |
|-----------|------------|
| [feature1_prolog_inteligencias_situadas.md](../Enero_2026_LogicaAgentes/feature1_prolog_inteligencias_situadas.md) | Diseño MCP propuesto |
| [feature2_agentic_typed_logic_flow.md](../Enero_2026_LogicaAgentes/feature2_agentic_typed_logic_flow.md) | Packs tipados |
| [04_informe_sesiones_prolog_mcp.md](04_informe_sesiones_prolog_mcp.md) | Análisis de sesiones |
| [MCPLauncherServer.ts](../../../../MCPGallery/mcp-mesh-sdk/src/MCPLauncherServer.ts) | Patrón de integración |
| [PrologServer código](../../../../AAIAGallery/alephscript/src/FIA/paradigmas/sbr/app/prolog/server.ts) | Base técnica |

---

*Generado por @ox — 2 de enero de 2026*
