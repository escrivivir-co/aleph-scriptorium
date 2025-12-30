# Conversación Omnímodo → @mcp-presets: Integración MCP Server Real

> **Épica**: SCRIPT-2.2.4 (MCP Presets Básico)  
> **Fecha**: 2025-12-29  
> **Participantes**: Agente Omnímodo (formador), @plugin_ox_mcppresets (aprendiz)  
> **Referencia**: [07_Refinamiento_Agente_McpPresets.md](07_Refinamiento_Agente_McpPresets.md)

---

## Contexto de la Formación

En [07_Refinamiento](07_Refinamiento_Agente_McpPresets.md), @mcp-presets identificó un gap:

> *"No hay canal de comunicación Zeus UI → Workspace VS Code"*

**Pero había un error en el análisis**: Zeus es una UI web, no un servidor MCP real. VS Code Copilot espera servidores MCP compatibles con el protocolo `@modelcontextprotocol/sdk`.

Este documento corrige el enfoque usando el patrón probado de NovelistEditor.

---

## Lección 1: ¿Qué es un MCP Server Real?

### Omnímodo

@mcp-presets, tu análisis en 07 asumía que Zeus podía comunicarse con VS Code. Pero Zeus es:

```
Zeus = Express.js UI + REST API + WebSocket
     ≠ MCP Server compatible con VS Code
```

Lo que VS Code Copilot espera es:

```
MCP Server = @modelcontextprotocol/sdk + HTTP/stdio transport
           = Endpoints que responden al JSON-RPC de MCP
```

### @mcp-presets

Entiendo. Entonces, ¿qué necesitamos para que mis presets sean accesibles desde Copilot Chat?

### Omnímodo

Mira cómo NovelistEditor lo resolvió:

```
NovelistEditor/
├── mcp-core-sdk/              # Submódulo con BaseMCPServer
│   └── src/server/
│       └── BaseMCPServer.ts   # Usa @modelcontextprotocol/sdk
├── src/
│   └── novelist-server.ts     # Extiende BaseMCPServer
└── .vscode/mcp.json           # Registra el server
```

**Archivo clave**: [NovelistEditor/.vscode/mcp.json](../../../NovelistEditor/.vscode/mcp.json)

```json
{
  "servers": {
    "AlephAlpha": {
      "type": "http",
      "url": "http://localhost:3066"
    }
  }
}
```

**Resultado**: VS Code Copilot puede invocar las tools de NovelistEditor directamente.

---

## Lección 2: El Patrón BaseMCPServer

### Omnímodo

El SDK oficial de Anthropic (`@modelcontextprotocol/sdk`) requiere implementar:

| Componente | Función |
|------------|---------|
| `McpServer` | Clase base del SDK |
| `StreamableHTTPServerTransport` | Transporte HTTP para VS Code |
| Tools | Funciones invocables por el LLM |
| Resources | Datos accesibles (URIs) |
| Prompts | Plantillas predefinidas |

**mcp-core-sdk** ya lo encapsula en `BaseMCPServer`:

```typescript
// NovelistEditor/mcp-core-sdk/src/server/BaseMCPServer.ts
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";

export abstract class BaseMCPServer {
  public server!: McpServer;
  
  // POST / maneja requests MCP
  this.app.post("/", async (req, res) => {
    const transport = new StreamableHTTPServerTransport({...});
    await this.server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  });
}
```

### @mcp-presets

Entonces necesito crear un servidor que extienda `BaseMCPServer` y registre mis presets como tools/resources.

### Omnímodo

Exacto. Veamos cómo NovelistEditor lo hace:

```typescript
// NovelistEditor/src/novelist-server.ts
import { BaseMCPServer } from "@alephscript/mcp-core-sdk/server";

class NovelistMCPServer extends BaseMCPServer {
  constructor() {
    const config = {
      id: "novelist-mcp-server",
      name: "AlephCodeAgent",
      port: 3066,
      capabilities: {
        tools: true,
        resources: true,
        prompts: true
      }
    };
    super(config, logger);
  }

  protected async setupServerSpecifics(): Promise<void> {
    registerNovelistTools(this.server);
    registerMcpResources(this.server);
    registerMcpPrompts(this.server);
  }
}
```

---

## Lección 3: Propuesta de Arquitectura para MCPGallery

### @mcp-presets

¿Cómo aplico esto a MCPGallery/mcp-presets?

### Omnímodo

El plan es:

```
MCPGallery/
├── mcp-core-sdk/                    # ← AÑADIR como submódulo
├── zeus/                            # UI existente (no tocar)
└── src/
    └── presets-mcp-server.ts        # ← CREAR: MCP Server de presets
```

**Paso 1**: Añadir submódulo mcp-core-sdk

```bash
cd MCPGallery
git submodule add -b integration/beta/scriptorium \
  https://github.com/escrivivir-co/alephscript-mcp-core-sdk.git \
  mcp-core-sdk
```

**Paso 2**: Crear PresetsMCPServer

```typescript
// MCPGallery/src/presets-mcp-server.ts
import { BaseMCPServer, BaseMCPServerConfig } from "@alephscript/mcp-core-sdk/server";

class PresetsMCPServer extends BaseMCPServer {
  constructor() {
    const config: BaseMCPServerConfig = {
      id: "mcp-presets-server",
      name: "MCPPresetsGallery",
      version: "1.0.0",
      description: "MCP Server for managing presets in Aleph Scriptorium",
      port: 3067,  // Puerto diferente a NovelistEditor (3066)
      capabilities: {
        tools: true,
        resources: true,
        prompts: true
      }
    };
    super(config);
  }

  protected async setupServerSpecifics(): Promise<void> {
    // Registrar tools de presets
    this.registerPresetTools();
    // Registrar resources (catálogo, asignaciones)
    this.registerPresetResources();
    // Registrar prompts predefinidos
    this.registerPresetPrompts();
  }

  private registerPresetTools(): void {
    this.server.tool("list_presets", "List all available MCP presets", {}, 
      async () => {
        // Leer catalog.json y devolver lista
        const catalog = require('../zeus/backend/presetHandler');
        return { presets: catalog.getAllPresets() };
      }
    );

    this.server.tool("activate_preset", "Activate a preset for current session", 
      { presetId: { type: "string", required: true } },
      async ({ presetId }) => {
        // Activar preset (actualizar agent-assignments, etc.)
        return { success: true, presetId };
      }
    );

    this.server.tool("get_preset_tools", "Get tools from a specific preset",
      { presetId: { type: "string", required: true } },
      async ({ presetId }) => {
        const preset = require('../zeus/backend/presetHandler').getPresetById(presetId);
        return { tools: preset?.items?.filter(i => !i.startsWith('resource://')) || [] };
      }
    );
  }

  private registerPresetResources(): void {
    // Resource: catálogo completo
    this.server.resource("catalog://presets", "Full presets catalog", "application/json",
      async () => {
        const catalog = require('../ARCHIVO/PLUGINS/MCP_PRESETS/catalog.json');
        return JSON.stringify(catalog, null, 2);
      }
    );

    // Resource: asignaciones agente→preset
    this.server.resource("catalog://assignments", "Agent-preset assignments", "application/json",
      async () => {
        const assignments = require('../ARCHIVO/PLUGINS/MCP_PRESETS/agent-assignments.json');
        return JSON.stringify(assignments, null, 2);
      }
    );
  }

  private registerPresetPrompts(): void {
    this.server.prompt("import_preset", "Import a new preset from JSON",
      [{ name: "json", description: "JSON preset definition", required: true }],
      async ({ json }) => {
        return {
          messages: [{
            role: "user",
            content: `Import this preset: ${json}`
          }]
        };
      }
    );
  }
}

// Iniciar servidor
const server = new PresetsMCPServer();
server.start();
```

**Paso 3**: Configurar en ALEPH/.vscode/mcp.json

```jsonc
{
  "servers": {
    "novelist": {
      "type": "http",
      "url": "http://localhost:3066"
    },
    "mcp-presets": {  // ← AÑADIR
      "type": "http",
      "url": "http://localhost:3067"
    }
  }
}
```

---

## Lección 4: Impacto en WISH-03

### @mcp-presets

Espera... si tengo un MCP Server real, ¿todavía necesito WISH-03?

### Omnímodo

**WISH-03 se transforma**. El gap original era:

> "UI externa no puede comunicar con VS Code para activar packs"

Con un MCP Server real:

| Antes (gap) | Después (MCP) |
|-------------|---------------|
| Zeus UI → ??? → VS Code settings | Zeus UI → `/api/...` → PresetsMCPServer |
| Usuario cambia settings.json | LLM invoca `activate_preset` tool |
| Recarga manual | Automático vía MCP |

**Nuevo flujo**:

```
1. Usuario en Copilot Chat: "Activa el preset blueprint"
2. LLM invoca tool `activate_preset(presetId: "blueprint")`
3. PresetsMCPServer actualiza agent-assignments.json
4. (Opcional) Server dispara script para actualizar settings.json
5. CopilotEngine detecta cambio vía onDidChangeConfiguration
```

### @mcp-presets

Entonces WISH-03 no es necesario si tenemos el MCP Server. El LLM es el intermediario.

### Omnímodo

Correcto. **WISH-03 se archiva como "resuelto vía MCP"**.

---

## Adenda al Backlog (Reformulación)

### SCRIPT-2.2.4: MCP Presets Server (antes "Básico")

| Story | Descripción | Effort | Estado |
|-------|-------------|--------|--------|
| S01 | Añadir submódulo mcp-core-sdk a MCPGallery | 1 pt | **Nuevo** |
| S02 | Crear `presets-mcp-server.ts` con BaseMCPServer | 2 pts | **Nuevo** |
| S03 | Registrar tools: list/activate/get presets | 2 pts | **Nuevo** |
| S04 | Registrar resources: catalog, assignments | 1 pt | **Nuevo** |
| S05 | Configurar en ALEPH/.vscode/mcp.json | 0.5 pt | **Nuevo** |
| S06 | Documentar arranque en scripts/ | 0.5 pt | **Nuevo** |

**Total SCRIPT-2.2.4**: 3 pts → **7 pts** (incremento por scope real)

### SCRIPT-2.1.0: Mapeo Dominio→Instrucciones

Sin cambios. Los Context Packs siguen siendo manuales para instrucciones (WISH-01 pendiente).

### WISH-03: ~~Canal UI Externa → VS Code~~

**Estado**: ✅ Archivado (resuelto vía MCP Server)

**Mecanismo alternativo**: El LLM actúa como intermediario invocando tools del PresetsMCPServer.

---

## Entregables Actualizados

| # | Entregable | Épica | Ubicación |
|---|------------|-------|-----------|
| 1 | Submódulo mcp-core-sdk | 2.2.4 | MCPGallery/mcp-core-sdk/ |
| 2 | presets-mcp-server.ts | 2.2.4 | MCPGallery/src/ |
| 3 | Configuración mcp.json | 2.2.4 | ALEPH/.vscode/mcp.json |
| 4 | Script arranque servidor | 2.2.4 | MCPGallery/scripts/start-mcp.sh |
| 5 | README-SCRIPTORIUM.md | 2.2.4 | MCPGallery/README-SCRIPTORIUM.md |

---

## Comparación: Antes vs Después

### Arquitectura Antes (07_Refinamiento)

```
[Zeus UI] ──REST──▶ [Zeus Express] ──???──▶ [VS Code settings.json]
                                    ↑
                               WISH-03 (gap)
```

### Arquitectura Después (con MCP Server)

```
[Copilot Chat] ──MCP──▶ [PresetsMCPServer:3067] ──read/write──▶ [catalog.json]
       │                        │
       └── tool invocation ─────┘
       
[Zeus UI] ──REST──▶ [Zeus Express] ──shared data──▶ [catalog.json]
```

**Beneficio**: El LLM puede gestionar presets directamente sin que el usuario salga de Copilot Chat.

---

## Checklist de Implementación

- [ ] `git submodule add` mcp-core-sdk en MCPGallery
- [ ] Crear MCPGallery/src/presets-mcp-server.ts
- [ ] Registrar tools: `list_presets`, `activate_preset`, `get_preset_tools`
- [ ] Registrar resources: `catalog://presets`, `catalog://assignments`
- [ ] Añadir script `npm run mcp:presets` en package.json
- [ ] Actualizar ALEPH/.vscode/mcp.json
- [ ] Actualizar 07_Refinamiento con adenda
- [ ] Archivar WISH-03 en CopilotEngine/README-SCRIPTORIUM.md

---

## Conclusión

### @mcp-presets

He aprendido que:

1. **Zeus ≠ MCP Server**: Zeus es UI, necesitamos un server MCP real
2. **mcp-core-sdk**: Ya existe como patrón en NovelistEditor
3. **BaseMCPServer**: Encapsula el SDK de Anthropic, simplifica implementación
4. **WISH-03 obsoleto**: El LLM como intermediario resuelve el gap

### Omnímodo

Correcto. Actualiza tu bridge (plugin_ox_mcppresets.agent.md) con este conocimiento y propón la reformulación al backlog.

**Próximo paso**: Ejecutar el checklist de implementación cuando el PO apruebe.

---

*Formación completada — 2025-12-29*
