## Plan: MCPBotHubServer --- Servidor MCP para BotHubSDK

Crear un nuevo servidor MCP (`MCPBotHubServer`) en mcp-mesh-sdk que exponga el BotHubSDK como tools/prompts/resources, conectado al mesh Socket.IO con su propia Room en el canal **AGENT**. Replica el patrón del Dashboard (emitter→store) pero como servidor MCP accesible desde VS Code.

```

BotHubSDK                          MCPBotHubServer                     AlephScript Mesh

─────────                          ───────────────                     ────────────────

RuntimeEmitter ──events$──→ connectEmitterToStore ──→ Store<BotHubState>

                                          │

                                          ├──→ MCP Tools (VS Code)

                                          ├──→ MCP Resources (estado)

                                          ├──→ MCP Prompts (guías)

                                          │

                                          └──→ Socket.IO Room "bothub"

                                                  canal AGENT

                                                  ↕

                                              AlephScriptClient

```

Tu intuición estaba casi perfecta --- corrigiendo que son **5 canales** (no 3): `SYSTEM`, `APPLICATION`, `UI`, `AGENT`, `GAME`.

---

### Steps

**Fase A: Core SDK Types** (mcp-core-sdk)

1\. Crear tipos de dominio BotHub en `MCPGallery/mcp-core-sdk/src/types/bothub/bothub-types.ts` --- reutilizando `RuntimeEvent`, `BotRuntime`, `IacmMessageType` del BotHubSDK

2\. Añadir export path en package.json

**Fase B: MCP Server** (mcp-mesh-sdk) --- *depende de A*

3\. Crear config `DEFAULT_BOTHUB_MCP_SERVER_CONFIG.ts` --- **puerto 3010**

4\. Registrar en `app.config.ts`

5\. Crear `MCPBotHubServer.ts` extends `BaseMCPServer` con:

   **8 Tools:**

   | Tool | Mapeo BotHubSDK |

   |------|-----------------|

   | `bothub_boot` | `bootBot()` --- arranca bot en mock o real |

   | `bothub_status` | `store.getState()` --- snapshot del runtime |

   | `bothub_execute_command` | `result.executeCommand()` --- ejecuta un comando |

   | `bothub_broadcast` | `result.broadcast()` --- envía a todos los chats |

   | `bothub_list_plugins` | Plugins registrados + sus comandos |

   | `bothub_list_chats` | Chats tracked + nombres |

   | `bothub_send_iacm` | `buildRequest()/buildReport()/etc.` |

   | `bothub_parse_iacm` | `parseIacmMessage()` |

   **3 Resources:**

   | Resource | URI |

   |----------|-----|

   | Estado actual | `bothub://state/current` |

   | Logs recientes | `bothub://logs/recent` |

   | Mensajes recientes | `bothub://messages/recent` |

   **3 Prompts:**

   | Prompt | Uso |

   |--------|-----|

   | `bothub_create_plugin` | Guía para crear un BotPlugin |

   | `bothub_iacm_protocol` | Referencia IACM con builders |

   | `bothub_troubleshoot` | Diagnóstico de problemas |

6\. Integrar `RuntimeEmitter → Store` dentro del servidor (mismo patrón que Dashboard)

**Fase C: Socket.IO Bridge** (*parallel con B*)

7\. Bridge con `AlephScriptClient` → Room `"bothub"` en canal `AGENT`

8\. Registrar tipos de evento en `room-protocol.ts`

**Fase D: Integración** (*depende de B*)

9\. Script npm `start:bothub` en mcp-mesh-sdk

10\. VS Code tasks (`BHS: Start [Server]`, `BHS: Open [Browser]`)

11\. Actualizar MCPGallery root package.json

---

### Relevant Files

**A crear:**

- `MCPGallery/mcp-core-sdk/src/types/bothub/bothub-types.ts`

- `MCPGallery/mcp-mesh-sdk/src/configs/DEFAULT_BOTHUB_MCP_SERVER_CONFIG.ts`

- `MCPGallery/mcp-mesh-sdk/src/MCPBotHubServer.ts`

**A modificar:**

- index.ts, package.json

- app.config.ts, package.json

- package.json

- tasks.json

**Referencia (patrón):**

- MCPPrologServer.ts --- template tools/resources/prompts

- main.tsx --- patrón emitter→store

---

### Decisions

1\. **Puerto 3010** --- slot libre entre Firehose (3009) y Launcher (3050)

2\. **Canal AGENT** --- los eventos del bot son comunicación inter-agente

3\. **`bootBot()` dentro del servidor** --- el MCP server ES el host del bot (un solo proceso)

4\. **Scope**: Solo servidor MCP + Socket.IO bridge. NO incluye: modificar Zeus UI, crear frontend, publicar npm

### Further Considerations

1\. **BOT_TOKEN**: ¿Mock mode siempre en dev, o leer `.env` del BotHubSDK? → Recomiendo fallback a mock

2\. **Import path**: BotHubSDK es submódulo, no paquete npm. Necesitará path alias `"@bothub-sdk"` en tsconfig

3\. **IACM bidireccional**: ¿Mesh → Telegram en esta iteración o como follow-up? → Recomiendo unidireccional primero (Bot → Mesh), bidireccional después