# Plan: MCPBotHubServer — Servidor MCP para BotHubSDK (v2)

> **INSTRUCCIONES PARA EL AGENTE IMPLEMENTADOR**: Este documento contiene todo el código necesario.
> Crea los archivos en el orden indicado. El código es copypasteable — ajusta solo lo que se indique.
> **NO crees tipos duplicados en mcp-core-sdk** — importa directamente desde BotHubSDK vía path alias.
> El plan v1 (abstracto) se conserva en `plan-mcpbothubserver-v1.md`.

---

## Arquitectura

```
BotHubSDK                          MCPBotHubServer                     AlephScript Mesh
─────────                          ───────────────                     ────────────────
RuntimeEmitter ──events$──→ connectEmitterToStore ──→ Store<BaseRuntimeState>
                                          │
                                          ├──→ MCP Tools (8) → VS Code
                                          ├──→ MCP Resources (3)
                                          ├──→ MCP Prompts (3)
                                          │
                                          └──→ Socket.IO Room "bothub_ROOM"
                                                  canal AGENT
                                                  ↕
                                              AlephScriptClient
```

5 canales Socket.IO: `SYSTEM`, `APPLICATION`, `UI`, `AGENT`, `GAME`. BotHub va en **AGENT**.

---

## PREREQUISITO: BotHubSDK compilado

El dist ya existe en `BotHubSDK/dist/`. Si no existe, ejecutar:

```bash
cd BotHubSDK && bun add -d @types/node && bunx tsc -p tsconfig.build.json
```

---

## PASO 1: tsconfig path alias en mcp-mesh-sdk

**Archivo**: `MCPGallery/mcp-mesh-sdk/tsconfig.json`

**Acción**: Añadir 2 path aliases al bloque `"paths"`. Buscar la última entrada:

```jsonc
// ANTES (última entrada del bloque paths):
      "@wrapper/*": ["src/*"]

// DESPUÉS:
      "@wrapper/*": ["src/*"],
      "@bothub-sdk": ["../../BotHubSDK/src/index.ts"],
      "@bothub-sdk/*": ["../../BotHubSDK/src/*"]
```

**Por qué**: `tsx` (el runtime) resuelve path aliases de tsconfig automáticamente.
BotHubSDK es `"type": "module"` (ESM) y mcp-mesh-sdk es CJS. `tsx` maneja el interop.

---

## PASO 2: Dependencia grammy en mcp-mesh-sdk

**Archivo**: `MCPGallery/mcp-mesh-sdk/package.json`

**Acción**: Añadir `grammy` a dependencies (BotHubSDK lo necesita como peerDependency).
Buscar `"rxjs"` en dependencies y añadir grammy antes:

```jsonc
    "grammy": "^1.35.0",
    "rxjs": "^7.8.2",
```

Luego ejecutar: `cd MCPGallery/mcp-mesh-sdk && npm install`

---

## PASO 3: Config del servidor

**Archivo A CREAR**: `MCPGallery/mcp-mesh-sdk/src/configs/DEFAULT_BOTHUB_MCP_SERVER_CONFIG.ts`

```typescript
import { BaseMCPServerConfig } from "../MCPServerConfig";

export const DEFAULT_BOTHUB_MCP_SERVER_CONFIG: BaseMCPServerConfig = {
	id: "bothub-mcp-server",
	name: "BotHub MCP Server",
	script: "src/MCPBotHubServer.ts",
	port: 3010,
	capabilitiesCheck: {
		tools: true,
		resources: true,
		prompts: true,
	},
	features: {
		enableManagers: false,
		enableWebConsole: false,
		enableHealthChecks: true,
	},
	description: "Telegram bot SDK (BotHubSDK) exposed as MCP tools with IACM protocol support",
	autoRestart: true,
	healthCheckInterval: 30000,
	url: "http://localhost",
	version: "1.0.0",
};
```

---

## PASO 4: Registrar en app.config.ts

**Archivo**: `MCPGallery/mcp-mesh-sdk/src/configs/app.config.ts`

**Acción 1**: Añadir import junto a los otros imports de configs (línea ~7):

```typescript
import { DEFAULT_BOTHUB_MCP_SERVER_CONFIG } from "./DEFAULT_BOTHUB_MCP_SERVER_CONFIG";
```

**Acción 2**: Añadir entrada en `DEFAULT_APP_CONFIG.mcp.servers` (después de `"firehose-mcp-server"`):

```typescript
            "bothub-mcp-server": DEFAULT_BOTHUB_MCP_SERVER_CONFIG,
```

---

## PASO 5: Crear MCPBotHubServer.ts

**Archivo A CREAR**: `MCPGallery/mcp-mesh-sdk/src/MCPBotHubServer.ts`

Sigue el patrón exacto de `MCPPrologServer.ts` (constructor, setupServerSpecifics, setupTools/Resources/Prompts, AlephScriptClient mesh, standalone bootstrap al final).

```typescript
#!/usr/bin/env node
/**
 * BotHub MCP Server
 * Exposes BotHubSDK (Telegram bot SDK + IACM protocol) as MCP tools/resources/prompts.
 * Connects to the AlephScript mesh via Socket.IO (AGENT channel).
 *
 * Pattern: RuntimeEmitter → Store<BaseRuntimeState> → MCP tools read/write the store.
 * Same pattern as BotHubSDK's examples/dashboard but without React UI.
 */

import { BaseMCPServer } from "./BaseMCPServer";
import { DEFAULT_BOTHUB_MCP_SERVER_CONFIG } from "./configs/DEFAULT_BOTHUB_MCP_SERVER_CONFIG";
import { AlephScriptClient } from "./libs/alephscript-client";
import { l } from "./Logger";
import { z } from "zod";

// --- BotHubSDK imports (via tsconfig path alias @bothub-sdk) ---
import {
	// Core boot
	bootBot,
	type BootBotOptions,
	type BootResult,
	// Emitter + Store
	RuntimeEmitter,
	type RuntimeEvent,
	type BaseRuntimeState,
	getDefaultBaseState,
	connectEmitterToStore,
	createStore,
	type Store,
	// IACM builders
	buildRequest,
	buildReport,
	buildQuestion,
	buildAnswer,
	buildProposal,
	buildAcknowledge,
	buildAccept,
	buildReject,
	buildDefer,
	buildFyi,
	buildUrgent,
	formatIacmForChat,
	// IACM parser
	parseIacmMessage,
	detectsIacmMessage,
	type IacmParseResult,
	// Types
	type BotRuntime,
	type PluginInfo,
	type IacmMessageType,
} from "@bothub-sdk";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getHash(key: string): string {
	const h = (s: string) => s.substring(s.length - 2);
	const a = new Date().getTime().toString();
	const b = Math.random().toString();
	return key + ">" + h(a) + h(b);
}

/** Map IACM type string → builder function. All builders share signature (from, to, content, opts). */
const IACM_BUILDERS: Record<string, (from: string, to: string, content: string, opts?: any) => any> = {
	REQUEST:     (f, t, c, o) => buildRequest(f, t, c, o),
	REPORT:      (f, t, c, o) => buildReport(f, t, c, o),
	QUESTION:    (f, t, c, o) => buildQuestion(f, t, c, o),
	ANSWER:      (f, t, c, o) => buildAnswer(f, t, c, o),
	PROPOSAL:    (f, t, c, o) => buildProposal(f, t, c, o),
	ACKNOWLEDGE: (f, t, c, o) => buildAcknowledge(f, t, c, o),
	ACCEPT:      (f, t, c, o) => buildAccept(f, t, c, o),
	REJECT:      (f, t, c, o) => buildReject(f, t, c, o),
	DEFER:       (f, t, c, o) => buildDefer(f, t, c, o),
	FYI:         (f, t, c, o) => buildFyi(f, t, c, o),
	URGENT:      (f, t, c, o) => buildUrgent(f, t, c, o),
};

// ---------------------------------------------------------------------------
// Server
// ---------------------------------------------------------------------------

export class MCPBotHubServer extends BaseMCPServer {
	private emitter: RuntimeEmitter;
	private store: Store<BaseRuntimeState>;
	private unsubBridge: (() => void) | null = null;
	private bootResult: BootResult | null = null;
	private meshClient!: AlephScriptClient;

	constructor() {
		super(DEFAULT_BOTHUB_MCP_SERVER_CONFIG);

		// Create emitter + store + bridge (same pattern as BotHubSDK examples/dashboard)
		this.emitter = new RuntimeEmitter();
		this.store = createStore<BaseRuntimeState>(getDefaultBaseState());
		this.unsubBridge = connectEmitterToStore(this.emitter, this.store);

		// Socket.IO mesh client
		this.initMeshClient();

		l.info("MCPBotHubServer initialized with RuntimeEmitter → Store bridge");
	}

	// -----------------------------------------------------------------------
	// Socket.IO mesh (AGENT channel)
	// -----------------------------------------------------------------------

	private initMeshClient(): void {
		try {
			const socketUrl = process.env.SOCKET_MESH_URL || "http://localhost:3000";
			const serverName = DEFAULT_BOTHUB_MCP_SERVER_CONFIG.id;

			this.meshClient = new AlephScriptClient(serverName, socketUrl);

			this.meshClient.initTriggersDefinition.push(() => {
				const ROOM_NAME = "bothub_ROOM";
				const REGISTER_PAYLOAD = {
					usuario: this.meshClient.name,
					sesion: getHash("BotHubMCP"),
				};

				this.meshClient.io.emit("CLIENT_REGISTER", REGISTER_PAYLOAD);
				this.meshClient.io.emit("CLIENT_SUSCRIBE", { room: ROOM_NAME });
				this.meshClient.room("MAKE_MASTER", {
					features: [
						"BOTHUB_BOOT",
						"BOTHUB_STATUS",
						"BOTHUB_EXECUTE_COMMAND",
						"BOTHUB_BROADCAST",
						"BOTHUB_SEND_IACM",
						"BOTHUB_PARSE_IACM",
					],
				}, ROOM_NAME);

				// Forward BotHubSDK runtime events to mesh (unidirectional: bot → mesh)
				this.emitter.events$.subscribe((event) => {
					this.meshClient.room("BOTHUB_EVENT", {
						type: event.type,
						timestamp: "timestamp" in event ? event.timestamp : new Date().toISOString(),
						data: event,
					}, ROOM_NAME);
				});

				l.info("BotHub mesh client connected", { room: ROOM_NAME, socketUrl });
			});

			l.info("BotHub mesh client created");
		} catch (error) {
			l.e("Failed to initialize BotHub mesh client", { error });
		}
	}

	// -----------------------------------------------------------------------
	// MCP setup (called by BaseMCPServer.start())
	// -----------------------------------------------------------------------

	protected setupServerSpecifics(): void {
		this.setupTools();
		this.setupResources();
		this.setupPrompts();

		// Connect to mesh after MCP server is ready
		if (this.meshClient) {
			l.info("Connecting BotHub to AlephScript mesh...");
			this.meshClient.connect();
		}

		l.info("MCPBotHubServer: 8 tools, 3 resources, 3 prompts registered");
	}

	// -----------------------------------------------------------------------
	// TOOLS (8)
	// -----------------------------------------------------------------------

	private setupTools(): void {
		// ── 1. bothub_boot ─────────────────────────────────────────────────
		this.server.tool(
			"bothub_boot",
			"Boot a Telegram bot instance. Uses mock mode if no BOT_TOKEN is found.",
			{
				mockMode: z.boolean().optional().describe("Force mock mode (no Telegram API). Default: auto-detect from env."),
				envDir: z.string().optional().describe("Directory containing .env with BOT_TOKEN. Default: BotHubSDK root."),
			},
			async ({ mockMode, envDir }) => {
				if (this.bootResult?.started) {
					return { content: [{ type: "text" as const, text: JSON.stringify({ error: "Bot already running", status: this.store.getState().botStatus }) }] };
				}

				const resolvedEnvDir = envDir || process.env.BOTHUB_ENV_DIR || "../../BotHubSDK";
				const opts: BootBotOptions = {
					plugins: [],
					envDir: resolvedEnvDir,
					chatStorePath: `${resolvedEnvDir}/.chats.json`,
					emitter: this.emitter,
					nonInteractive: true,
				};

				try {
					this.bootResult = await bootBot(opts);
					return {
						content: [{
							type: "text" as const,
							text: JSON.stringify({
								mock: this.bootResult.mock,
								started: this.bootResult.started,
								hasExecuteCommand: !!this.bootResult.executeCommand,
								hasBroadcast: !!this.bootResult.broadcast,
							}, null, 2),
						}],
					};
				} catch (error: any) {
					return { content: [{ type: "text" as const, text: JSON.stringify({ error: error.message }) }] };
				}
			}
		);

		// ── 2. bothub_status ───────────────────────────────────────────────
		this.server.tool(
			"bothub_status",
			"Get current bot runtime state (status, plugins, chats, command count).",
			{},
			async () => {
				const state = this.store.getState();
				return {
					content: [{
						type: "text" as const,
						text: JSON.stringify({
							botStatus: state.botStatus,
							startedAt: state.startedAt,
							plugins: state.plugins,
							commandCount: state.commandCount,
							chatCount: state.chatIds.length,
							chatIds: state.chatIds,
							chatNames: state.chatNames,
							logCount: state.logs.length,
							messageCount: state.messages.length,
						}, null, 2),
					}],
				};
			}
		);

		// ── 3. bothub_execute_command ──────────────────────────────────────
		this.server.tool(
			"bothub_execute_command",
			"Execute a registered bot command locally and return reply messages. Works in mock and real mode.",
			{
				command: z.string().describe("Command name without slash (e.g. 'start', 'help', 'rb_aleph')"),
				chatId: z.number().optional().describe("Chat ID for context. Default: 1 (mock)."),
				userId: z.number().optional().describe("User ID for context. Default: 1 (mock)."),
			},
			async ({ command, chatId, userId }) => {
				if (!this.bootResult?.executeCommand) {
					return { content: [{ type: "text" as const, text: JSON.stringify({ error: "Bot not booted or executeCommand not available. Call bothub_boot first." }) }] };
				}
				try {
					const replies = await this.bootResult.executeCommand(command, { chatId, userId });
					return {
						content: [{
							type: "text" as const,
							text: JSON.stringify({
								command,
								replies: replies.map(r => ({ chatId: r.chatId, text: r.text })),
							}, null, 2),
						}],
					};
				} catch (error: any) {
					return { content: [{ type: "text" as const, text: JSON.stringify({ error: error.message }) }] };
				}
			}
		);

		// ── 4. bothub_broadcast ────────────────────────────────────────────
		this.server.tool(
			"bothub_broadcast",
			"Broadcast a message to all tracked chats. In mock mode, records via MockTelegramBot.",
			{
				message: z.string().describe("Message text to broadcast"),
			},
			async ({ message }) => {
				if (!this.bootResult?.broadcast) {
					return { content: [{ type: "text" as const, text: JSON.stringify({ error: "Bot not booted or broadcast not available. Call bothub_boot first." }) }] };
				}
				try {
					await this.bootResult.broadcast(message);
					return {
						content: [{
							type: "text" as const,
							text: JSON.stringify({ success: true, message, chatCount: this.store.getState().chatIds.length }),
						}],
					};
				} catch (error: any) {
					return { content: [{ type: "text" as const, text: JSON.stringify({ error: error.message }) }] };
				}
			}
		);

		// ── 5. bothub_list_plugins ─────────────────────────────────────────
		this.server.tool(
			"bothub_list_plugins",
			"List all registered bot plugins and their commands.",
			{},
			async () => {
				const state = this.store.getState();
				return {
					content: [{
						type: "text" as const,
						text: JSON.stringify({
							pluginCount: state.plugins.length,
							plugins: state.plugins,
							totalCommands: state.commandCount,
						}, null, 2),
					}],
				};
			}
		);

		// ── 6. bothub_list_chats ───────────────────────────────────────────
		this.server.tool(
			"bothub_list_chats",
			"List all tracked chats (IDs and known names/titles).",
			{},
			async () => {
				const state = this.store.getState();
				return {
					content: [{
						type: "text" as const,
						text: JSON.stringify({
							chatCount: state.chatIds.length,
							chats: state.chatIds.map(id => ({
								id,
								name: state.chatNames[id] || "(unknown)",
							})),
						}, null, 2),
					}],
				};
			}
		);

		// ── 7. bothub_send_iacm ────────────────────────────────────────────
		this.server.tool(
			"bothub_send_iacm",
			"Build an IACM protocol message (REQUEST, REPORT, QUESTION, etc.) and return it formatted for Telegram chat.",
			{
				type: z.enum([
					"REQUEST", "REPORT", "QUESTION", "ANSWER",
					"PROPOSAL", "ACKNOWLEDGE", "ACCEPT", "REJECT",
					"DEFER", "FYI", "URGENT",
				]).describe("IACM message type"),
				from_agent: z.string().describe("Sender agent name (e.g. '@aleph')"),
				to_agent: z.string().describe("Recipient agent name (e.g. '@ox')"),
				content: z.string().describe("Main content/subject of the message"),
				thread_id: z.string().optional().describe("Thread ID for grouping related messages"),
				reply_to: z.string().optional().describe("Message ID this replies to"),
			},
			async ({ type, from_agent, to_agent, content, thread_id, reply_to }) => {
				const builder = IACM_BUILDERS[type];
				if (!builder) {
					return { content: [{ type: "text" as const, text: JSON.stringify({ error: `Unknown IACM type: ${type}` }) }] };
				}
				try {
					const msg = builder(from_agent, to_agent, content, { thread_id, reply_to });
					const formatted = formatIacmForChat(msg);
					return {
						content: [{
							type: "text" as const,
							text: JSON.stringify({ iacmMessage: msg, formatted }, null, 2),
						}],
					};
				} catch (error: any) {
					return { content: [{ type: "text" as const, text: JSON.stringify({ error: error.message }) }] };
				}
			}
		);

		// ── 8. bothub_parse_iacm ───────────────────────────────────────────
		this.server.tool(
			"bothub_parse_iacm",
			"Parse text that may contain an IACM protocol message. Returns structured data if detected.",
			{
				text: z.string().describe("Text to parse for IACM content"),
			},
			async ({ text }) => {
				const detected = detectsIacmMessage(text);
				if (!detected) {
					return {
						content: [{
							type: "text" as const,
							text: JSON.stringify({ detected: false, message: "No IACM message found in text." }),
						}],
					};
				}
				try {
					const result = parseIacmMessage(text);
					return {
						content: [{
							type: "text" as const,
							text: JSON.stringify({ detected: true, ...result }, null, 2),
						}],
					};
				} catch (error: any) {
					return { content: [{ type: "text" as const, text: JSON.stringify({ detected: true, parseError: error.message }) }] };
				}
			}
		);
	}

	// -----------------------------------------------------------------------
	// RESOURCES (3)
	// -----------------------------------------------------------------------

	private setupResources(): void {
		// 1. Current runtime state
		this.server.resource(
			"bothub-state",
			"bothub://state/current",
			{
				description: "Current BotHub runtime state (status, plugins, chats, counters)",
				mimeType: "application/json",
			},
			async () => ({
				contents: [{
					uri: "bothub://state/current",
					mimeType: "application/json",
					text: JSON.stringify(this.store.getState(), null, 2),
				}],
			})
		);

		// 2. Recent logs
		this.server.resource(
			"bothub-logs",
			"bothub://logs/recent",
			{
				description: "Recent bot log entries (last 200 from circular buffer)",
				mimeType: "application/json",
			},
			async () => ({
				contents: [{
					uri: "bothub://logs/recent",
					mimeType: "application/json",
					text: JSON.stringify(this.store.getState().logs, null, 2),
				}],
			})
		);

		// 3. Recent messages
		this.server.resource(
			"bothub-messages",
			"bothub://messages/recent",
			{
				description: "Recent chat messages received by the bot (last 100)",
				mimeType: "application/json",
			},
			async () => ({
				contents: [{
					uri: "bothub://messages/recent",
					mimeType: "application/json",
					text: JSON.stringify(this.store.getState().messages, null, 2),
				}],
			})
		);
	}

	// -----------------------------------------------------------------------
	// PROMPTS (3)
	// -----------------------------------------------------------------------

	private setupPrompts(): void {
		// ── 1. Guide to create a BotPlugin ─────────────────────────────────
		this.server.prompt(
			"bothub_create_plugin",
			"Step-by-step guide to create a new BotPlugin for the Telegram bot",
			{},
			async () => ({
				messages: [{
					role: "assistant" as const,
					content: {
						type: "text" as const,
						text: `# Cómo crear un BotPlugin para BotHubSDK

## 1. Crear el archivo del plugin

\`\`\`typescript
// src/plugins/my-plugin.ts
import type { BotPlugin } from "heteronimos-semi-asistidos-sdk";
import type { Context } from "grammy";

export const myPlugin: BotPlugin = {
  name: "My Plugin",
  pluginCode: "my",  // Prefijo para comandos: my_xxx

  commands: [
    { command: "my_hello", description: "Saluda al usuario" },
  ],

  setup(bot, tracker, emitter) {
    bot.command("my_hello", async (ctx: Context) => {
      await ctx.reply("¡Hola desde MyPlugin!");
    });
  },
};
\`\`\`

## 2. Registrar en bootBot()

Añade el plugin al array \`plugins\` en las opciones de \`bootBot()\`.

## 3. Tips
- \`pluginCode\` debe ser único y corto (2-4 chars)
- Todos los comandos deben empezar con \`{pluginCode}_\`
- Usa \`tracker\` para acceder a chats conocidos
- Usa \`emitter\` para emitir eventos al dashboard/MCP server
`,
					},
				}],
			})
		);

		// ── 2. IACM protocol reference ─────────────────────────────────────
		this.server.prompt(
			"bothub_iacm_protocol",
			"Reference for the IACM inter-agent communication protocol with all message types and builders",
			{
				messageType: z.enum([
					"REQUEST", "REPORT", "QUESTION", "ANSWER",
					"PROPOSAL", "ACKNOWLEDGE", "ACCEPT", "REJECT",
					"DEFER", "FYI", "URGENT", "ALL",
				]).optional().describe("Specific type to explain, or ALL for complete reference"),
			},
			async ({ messageType }) => ({
				messages: [{
					role: "assistant" as const,
					content: {
						type: "text" as const,
						text: `# Protocolo IACM v1.0 (SDS-17)

## Tipos de mensaje (11)

| Tipo | Emoji | Uso |
|------|-------|-----|
| REQUEST | 📩 | Solicitar acción a otro agente |
| REPORT | 📊 | Informar resultado de una tarea |
| QUESTION | ❓ | Hacer pregunta que requiere respuesta |
| ANSWER | 💡 | Responder a una QUESTION |
| PROPOSAL | 📝 | Proponer plan/acción para aprobación |
| ACKNOWLEDGE | ✅ | Confirmar recepción de mensaje |
| ACCEPT | 👍 | Aceptar una PROPOSAL |
| REJECT | 👎 | Rechazar una PROPOSAL con razón |
| DEFER | ⏳ | Posponer decisión con plazo |
| FYI | ℹ️ | Información sin acción requerida |
| URGENT | 🚨 | Mensaje prioritario que requiere atención inmediata |

## Usar con tool bothub_send_iacm

\`\`\`json
{
  "type": "REQUEST",
  "from_agent": "@aleph",
  "to_agent": "@ox",
  "content": "Necesito auditoría del módulo X",
  "thread_id": "audit-2026-04"
}
\`\`\`

## Formato canónico en chat

\`\`\`
[REQUEST] 📩 @aleph → @ox
📋 Necesito auditoría del módulo X
───
Detalle del request...
\`\`\`

Parseable con \`bothub_parse_iacm\`.
`,
					},
				}],
			})
		);

		// ── 3. Troubleshooting guide ───────────────────────────────────────
		this.server.prompt(
			"bothub_troubleshoot",
			"Diagnose common BotHub problems (boot failures, missing token, connection issues)",
			{
				symptom: z.enum(["boot-fails", "no-messages", "mock-only", "mesh-disconnected", "other"])
					.optional().describe("Symptom to diagnose"),
			},
			async ({ symptom }) => ({
				messages: [{
					role: "assistant" as const,
					content: {
						type: "text" as const,
						text: `# Diagnóstico BotHub

## Pasos generales

1. **Verificar estado**: \`bothub_status\` — ¿botStatus es "running"?
2. **Ver logs**: recurso \`bothub://logs/recent\` — buscar errores
3. **Verificar boot**: ¿\`bothub_boot\` devolvió \`started: true\`?

## Problemas comunes

### Bot arranca en mock siempre
- Verificar que \`BotHubSDK/.env\` existe con \`BOT_TOKEN=...\`
- O pasar \`envDir\` a \`bothub_boot\` apuntando al directorio correcto

### No llegan mensajes
- En mock mode: usar \`bothub_execute_command\` para simular
- En real mode: verificar que el webhook de Telegram está eliminado (el boot lo hace)

### Mesh desconectado
- Verificar que \`mcp-channels-sdk/ws-server\` está corriendo en puerto 3000
- Ver task \`CHS: Start [Server]\`

### Boot falla del todo
- Ver logs con recurso \`bothub://logs/recent\`
- Probablemente falta npm install o el dist de BotHubSDK no existe
- Ejecutar: \`cd BotHubSDK && bunx tsc -p tsconfig.build.json\`
`,
					},
				}],
			})
		);
	}
}

// ---------------------------------------------------------------------------
// Standalone bootstrap (same pattern as MCPPrologServer.ts)
// ---------------------------------------------------------------------------

const server = new MCPBotHubServer();
server.start().catch((error) => {
	l.e("Failed to start MCPBotHubServer", { error });
	process.exit(1);
});
```

### Notas para el implementador sobre el código

1. Los `as const` en `type: "text"` y `role: "assistant"` son necesarios para satisfacer los tipos estrictos de McpServer.
2. Los imports de `@bothub-sdk` se resuelven via tsconfig paths + tsx runtime. NO usar rutas relativas directas.
3. `IACM_BUILDERS` usa una firma simplificada `(from, to, content, opts)`. Cada builder real de BotHubSDK tiene firmas ligeramente distintas por tipo, pero todos aceptan `(from_agent, to_agent, subject/content, BuildOptions)`. Si hay discrepancias de tipos en compilación, ajustar el mapeo por tipo.
4. `bootBot()` arranca vacío (`plugins: []`). Para añadir plugins, el usuario los importaría desde BotHubSDK. Eso es una extensión futura.
5. `BaseMCPServer.start()` llama a `setupServerSpecifics()` internamente — no llamar manualmente.

---

## PASO 6: Script npm en mcp-mesh-sdk

**Archivo**: `MCPGallery/mcp-mesh-sdk/package.json`

**Acción**: Añadir en `"scripts"` después de `"start:firehose"`:

```jsonc
    "start:bothub": "cross-env NODE_ENV=development tsx src/MCPBotHubServer.ts",
```

---

## PASO 7: VS Code tasks

**Archivo**: `.vscode/tasks.json`

**Acción**: Añadir 2 tasks (patrón idéntico a los existentes NOV/TPE/etc.):

```jsonc
    {
      "label": "BHS: Start [Server]",
      "type": "shell",
      "command": "npm",
      "args": ["run", "start:bothub"],
      "options": {
        "cwd": "${workspaceFolder}/MCPGallery/mcp-mesh-sdk"
      },
      "isBackground": true,
      "detail": "Puerto 3010 - BotHub MCP Server"
    },
    {
      "label": "BHS: Open [Browser]",
      "type": "shell",
      "command": "cmd",
      "args": ["/c", "start", "http://localhost:3010"],
      "detail": "Abrir BotHub MCP Server health endpoint"
    },
```

---

## PASO 8: Verificación

```bash
# 1. Instalar dependencias (grammy nuevo)
cd MCPGallery/mcp-mesh-sdk && npm install

# 2. Verificar compilación (informativo — puede fallar por ESM interop, tsx lo maneja)
npx tsc --noEmit 2>&1 | head -20

# 3. Arrancar servidor
npm run start:bothub

# 4. Health check
curl http://localhost:3010/health
# Esperado: {"status":"healthy","server":"BotHub MCP Server","version":"1.0.0",...}

# 5. Test MCP root endpoint
curl -X POST http://localhost:3010/ -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"tools/list","id":1}'
# Esperado: 8 tools en la respuesta

# 6. Test boot en mock
curl -X POST http://localhost:3010/ -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"tools/call","params":{"name":"bothub_boot","arguments":{}},"id":2}'
# Esperado: {"mock":true,"started":true,...}
```

**Si `tsc --noEmit` falla en imports de `@bothub-sdk`**: Es por ESM/CJS interop. `tsx` runtime lo resuelve.
Dos opciones:
- **Opción A** (rápida): Ignorar errores de tsc, tsx ejecuta correctamente
- **Opción B** (correcta): Cambiar imports a `from "../../BotHubSDK/dist/index.js"` (CJS-compatible post-build)

---

## Resumen de ficheros

| Acción | Archivo | Paso |
|--------|---------|------|
| CREAR  | `MCPGallery/mcp-mesh-sdk/src/configs/DEFAULT_BOTHUB_MCP_SERVER_CONFIG.ts` | 3 |
| CREAR  | `MCPGallery/mcp-mesh-sdk/src/MCPBotHubServer.ts` | 5 |
| EDITAR | `MCPGallery/mcp-mesh-sdk/tsconfig.json` — añadir `@bothub-sdk` paths | 1 |
| EDITAR | `MCPGallery/mcp-mesh-sdk/package.json` — añadir `grammy` dep + `start:bothub` script | 2, 6 |
| EDITAR | `MCPGallery/mcp-mesh-sdk/src/configs/app.config.ts` — import + entry | 4 |
| EDITAR | `.vscode/tasks.json` — 2 tasks BHS | 7 |

**NO tocar**: mcp-core-sdk (importamos directo de BotHubSDK, sin duplicar tipos).

---

## Decisiones consolidadas

1. **Puerto 3010** — slot libre entre Firehose (3009) y Launcher (3050)
2. **Canal AGENT** — comunicación inter-agente por naturaleza
3. **bootBot() dentro del servidor** — el MCP server ES el host del bot (un solo proceso)
4. **Import via path alias** — `@bothub-sdk` → `../../BotHubSDK/src/index.ts`
5. **Mock fallback** — sin BOT_TOKEN, arranca en mock automáticamente
6. **Unidireccional primero** — Bot → Mesh. Bidireccional (Mesh → Telegram) como follow-up.
7. **Scope limitado** — Solo servidor MCP + Socket.IO bridge. NO: Zeus UI, frontend, npm publish.
