# 09 — Integración MCPGallery: Protocolo de Servidores MCP

> **Fecha**: 2025-12-30  
> **Épica**: SCRIPT-2.2.4 (MCP Integration)  
> **Commits**: mcp-mesh-sdk@f8dfc2a → MCPGallery@482b58f → ALEPH@a1fdda0

---

## Resumen Ejecutivo

Se completó la integración del submódulo **MCPGallery** con el Scriptorium, estableciendo:

1. **Protocolo de servidores MCP** en PLUGINS.md
2. **4 servidores MCP** registrados en `.vscode/mcp.json`
3. **Scripts de arranque** en mcp-mesh-sdk
4. **Documentación DRY** en READMEs de integración

---

## Arquitectura Implementada

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    SCRIPTORIUM MCP ECOSYSTEM                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                MCP-MESH-SDK (Mesh de Servidores)                  │   │
│  │                ═════════════════════════════════                  │   │
│  │                                                                    │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐  │   │
│  │  │ DevOps      │ │ Launcher    │ │ Wiki        │ │ StateMachine│  │   │
│  │  │ :3003       │ │ :3050       │ │ :3002       │ │ :3004       │  │   │
│  │  │ npm start   │ │ start:      │ │ start:wiki  │ │ start:state │  │   │
│  │  │             │ │ launcher    │ │             │ │             │  │   │
│  │  └─────────────┘ └──────┬──────┘ └─────────────┘ └─────────────┘  │   │
│  │                         │                                          │   │
│  │                         │ Puede orquestar                          │   │
│  │                         └──────────────────────────────────────────│   │
│  └────────────────────────────▲─────────────────────────────────────┘   │
│                               │                                          │
│                               │ MCP Protocol                             │
│                               │                                          │
│  ┌────────────────────────────┼─────────────────────────────────────┐   │
│  │         MCP-MODEL-SDK (Preset Service :4001)                      │   │
│  │         ════════════════════════════════════                      │   │
│  │  → Extrae metadata de la mesh                                     │   │
│  │  → Gestiona presets (CRUD)                                        │   │
│  │  → Expone REST para Zeus                                          │   │
│  └────────────────────────────▲─────────────────────────────────────┘   │
│                               │                                          │
│                               │ REST (axios)                             │
│                               │                                          │
│  ┌────────────────────────────┼─────────────────────────────────────┐   │
│  │                    ZEUS (UI :3012)                                │   │
│  │                    ════════════════                               │   │
│  │  → UI para explorar catálogo de servers MCP                       │   │
│  │  → Crear/editar presets                                           │   │
│  │  → FUENTE DE VERDAD del catálogo para el plugin                   │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                               │                                          │
│                               │ Plugin consulta vía HTTP                 │
│                               ▼                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │              @plugin_ox_mcppresets (Scriptorium)                  │   │
│  │              ═══════════════════════════════════                  │   │
│  │  → Consume catálogo de Zeus                                       │   │
│  │  → Lista servidores activos en la mesh                            │   │
│  │  → Informa a @aleph qué tools están disponibles                   │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Servidores MCP Registrados

### Tabla de Servidores

| Servidor | Puerto | Script | Clase | Descripción |
|----------|--------|--------|-------|-------------|
| `devops-mcp-server` | 3003 | `npm start` | DevOpsServer | DevOps automation (default) |
| `launcher-server` | 3050 | `npm run start:launcher` | MCPLauncherServer | Orquestador de la mesh |
| `wiki-browser-server` | 3002 | `npm run start:wiki` | MCPWikiBrowserServer | Navegador Wikipedia |
| `state-machine-server` | 3004 | `npm run start:state` | MCPStateMachineServer | Máquina X+1 |

### Registro en VS Code

Archivo: `ALEPH/.vscode/mcp.json`

```json
{
  "servers": {
    "devops-mcp-server": {
      "type": "http",
      "url": "http://localhost:3003"
    },
    "launcher-server": {
      "type": "http",
      "url": "http://localhost:3050"
    },
    "wiki-browser-server": {
      "type": "http",
      "url": "http://localhost:3002"
    },
    "state-machine-server": {
      "type": "http",
      "url": "http://localhost:3004"
    }
  }
}
```

---

## Archivos Modificados

### En ALEPH (commit a1fdda0)

| Archivo | Cambio |
|---------|--------|
| `.github/PLUGINS.md` | +propiedad `mcpServers` en manifest, +sección "Servidores MCP", +columna en bridges |
| `.github/agents/indice.agent.md` | +tabla servidores MCP, +referencia mcp.json |
| `.github/agents/plugin-manager.agent.md` | +comandos `mcp:listar`, `mcp:registrar` |
| `.github/plugins/mcp-presets/agents/mcp-presets.agent.md` | +handoffs servidores, +tool `web` |
| `.github/plugins/mcp-presets/instructions/mcp-presets.instructions.md` | +tabla servidores, +flujo Zeus→Plugin |
| `.github/plugins/mcp-presets/manifest.md` | +4 `mcpServers` declarados |
| `.github/plugins/scriptorium-pack/instructions/plugin-lifecycle.instructions.md` | +sección "Servidores MCP" |
| `.vscode/mcp.json` | **NUEVO**: 4 servidores registrados |

### En MCPGallery (commit 482b58f)

| Archivo | Cambio |
|---------|--------|
| `README-SCRIPTORIUM.md` | **NUEVO**: Mapa del ecosistema |
| `mcp-mesh-sdk` (submódulo) | Actualizado a f8dfc2a |

### En mcp-mesh-sdk (commit f8dfc2a)

| Archivo | Cambio |
|---------|--------|
| `package.json` | +scripts `start:launcher`, `start:wiki`, `start:state` |
| `README-SCRIPTORIUM.md` | **NUEVO**: Documentación de servidores |

---

## Eliminaciones

| Archivo | Razón |
|---------|-------|
| `MCPGallery/src/presets-mcp-server.ts` | Decisión de usar DevOpsServer en lugar de server dedicado |

---

## Protocolo Establecido

### Propiedad `mcpServers` en Manifest

Los plugins pueden declarar servidores MCP:

```yaml
mcpServers:
  - id: "mi-server"
    port: 3XXX
    source: "submódulo/ruta"
    startCommand: "npm start"
    description: "Descripción"
```

### Flujo de Registro

1. Plugin declara `mcpServers` en manifest.md
2. `@pluginmanager` detecta al instalar
3. Actualiza `.vscode/mcp.json`
4. Documenta en PLUGINS.md
5. Usuario arranca servidor manualmente o vía Launcher

### Catálogo Dinámico

```bash
# Listar servidores activos en la mesh
curl http://localhost:4001/ai/ui/mcp/list | jq '.catalog'
```

---

## Tools del MCPLauncherServer

El servidor Launcher (3050) puede orquestar la mesh:

| Tool | Descripción |
|------|-------------|
| `launch_mcp_server` | Arranca un servidor por ID |
| `stop_mcp_server` | Detiene un servidor |
| `restart_mcp_server` | Reinicia un servidor |
| `get_server_status` | Estado de uno o todos |
| `launch_all_servers` | Arranca XPlus1 + Wiki |
| `generate_vscode_mcp_config` | Genera mcp.json dinámicamente |

---

## Flujo de Uso

### 1. Arranque Manual (Modo Simple)

```bash
cd MCPGallery/mcp-mesh-sdk
npm install
npm start  # DevOpsServer en :3003
```

### 2. Arranque Orquestado (Modo Launcher)

```bash
# Terminal 1: Launcher
npm run start:launcher  # :3050

# Desde Copilot Chat, invocar tool:
# launch_all_servers
```

### 3. Validación

```bash
curl http://localhost:3003/health
curl http://localhost:4001/ai/ui/mcp/list | jq '.serversCount'
```

---

## Impacto en Backlog

### Stories Completadas (parcial)

| Story | Descripción | Estado |
|-------|-------------|--------|
| SCRIPT-2.2.4-S01 | Mapear MCPGallery a TypedPrompting | ✅ Parcial |
| SCRIPT-2.2.4-S03 | Preset de Ejemplo | ✅ mock_mcp_catalog.json |
| SCRIPT-2.2.4-S05 | Configurar mcp.json | ✅ Completado |
| SCRIPT-2.2.4-S06 | Documentar arranque | ✅ READMEs creados |

### Pendiente

| Story | Descripción | Estado |
|-------|-------------|--------|
| SCRIPT-2.2.4-S02 | MCP Resources Schema | ⏳ |
| SCRIPT-2.2.4-S04 | Integración con @aleph (handoff) | ⏳ Parcial |

---

## Referencias

| Documento | Ubicación |
|-----------|-----------|
| Backlog TypedPrompting | `ARCHIVO/DISCO/BACKLOG_BORRADORES/Diciembre_29_TypedPrompting_ContextManager/01_backlog-borrador.md` |
| README MCPGallery | `MCPGallery/README-SCRIPTORIUM.md` |
| README mcp-mesh-sdk | `MCPGallery/mcp-mesh-sdk/README-SCRIPTORIUM.md` |
| Protocolo Plugins | `.github/PLUGINS.md` |
| mcp.json | `.vscode/mcp.json` |

---

## Próximos Pasos

1. **Validar circuito completo**: Zeus → mcp-model-sdk → mcp-mesh-sdk → Copilot
2. **Crear preset de ejemplo**: `devops-essentials.json`
3. **Probar invocación desde Copilot Chat**: Llamar tool del DevOpsServer
4. **Documentar en docs/**: Añadir página sobre servidores MCP

---

*Documento generado: 2025-12-30*
