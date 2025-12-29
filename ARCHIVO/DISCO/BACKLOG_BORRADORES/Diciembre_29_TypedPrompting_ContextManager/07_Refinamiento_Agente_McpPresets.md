# Refinamiento @mcp-presets: Integración MCPGallery ↔ Context Packs

> **Épica**: SCRIPT-2.1.0 / SCRIPT-2.2.4  
> **Fecha**: 2025-12-29  
> **Agente**: @plugin_ox_mcppresets (Bridge MCP-Presets)  
> **Referencia**: [05_Refinamiento_Agente_Indice.md](05_Refinamiento_Agente_Indice.md), [06_Decision_PO_Refactorizar.md](06_Decision_PO_Refactorizar.md)

---

## Contexto

En [06_Decision_PO_Refactorizar.md](06_Decision_PO_Refactorizar.md#script-224-mcp-presets-básico), se asigna:

> **SCRIPT-2.2.4: MCP Presets Básico** (3 pts) — Sin cambios mayores

El PO pregunta: *"¿Cómo podría MCPGallery UI cargar un pack hacia VS Code/CopilotEngine?"*

Este documento analiza la **viabilidad técnica** de esa integración.

---

## Arquitectura Actual

### MCPGallery/Zeus

```
MCPGallery/
├── zeus/backend/
│   ├── mcpHandler.js     # Handler MCP con discoverServers()
│   └── backend.js        # Express.js
└── .vscode/mcp.json      # Config: playwright + devops-mcp-server
```

**Capacidades de Zeus**:
- `discoverServers()` → Lista servidores MCP via SLMo42
- `listTools(serverId)` → Enumera tools de un servidor
- `callTool(serverId, toolName, params)` → Ejecuta tool

### Plugin mcp-presets

```
ARCHIVO/PLUGINS/MCP_PRESETS/
├── catalog.json              # Catálogo de servidores
├── agent-assignments.json    # Mapeo agente → presets
└── presets/{id}.json         # Definiciones individuales
```

**Flujo actual** (sin UI externa):
```
@mcp-presets importar → catalog.json → @mcp-presets asignar → agent-assignments.json
                                                                      ↓
                                                              Usuario copia snippet
                                                                      ↓
                                                              .vscode/mcp.json
```

---

## El Problema: UI Externa → VS Code

### Lo que se pide

```
[Zeus UI] → seleccionar pack → [???] → [CopilotEngine recarga instrucciones]
```

### Puntos de bloqueo técnico

| Paso | Mecanismo necesario | Estado |
|------|---------------------|--------|
| Zeus → Archivos locales | HTTP POST o IPC | ⚠️ Requiere servidor |
| Archivos → settings.json | Escritura en disco | ✅ Posible |
| settings.json → CopilotEngine | `onDidChangeConfiguration` | ✅ Funciona |

**El gap**: No hay canal de comunicación Zeus UI → Workspace VS Code.

---

## Análisis de Opciones

### Opción A: Zeus como MCP Server

Zeus ya tiene `mcpHandler.js`. Podría exponerse como servidor MCP que VS Code consume:

```jsonc
// .vscode/mcp.json
{
  "servers": {
    "zeus-gallery": {
      "type": "http",
      "url": "http://localhost:3003/mcp"
    }
  }
}
```

**Problema**: Esto añade tools al chat, NO instrucciones. Las tools MCP son invocables por el LLM, pero no controlan qué archivos `.instructions.md` se cargan.

**Veredicto**: ❌ No resuelve el problema de Context Packs.

### Opción B: Extensión VS Code como intermediaria

Crear una extensión que:
1. Escucha eventos de Zeus (WebSocket/polling)
2. Actualiza `settings.json` cuando Zeus envía un pack
3. CopilotEngine detecta cambio via `onDidChangeConfiguration`

```typescript
// Pseudocódigo de extensión
const zeusWatcher = new WebSocket('ws://localhost:3003/packs');
zeusWatcher.on('packSelected', (pack) => {
  const config = vscode.workspace.getConfiguration('chat');
  config.update('instructionsFilesLocations', pack.locations, vscode.ConfigurationTarget.Workspace);
});
```

**Problema**: Requiere desarrollar y mantener una extensión. CopilotEngine es ReadOnly.

**Veredicto**: ⚠️ Viable pero alto coste (5+ pts adicionales).

### Opción C: Script + File Watcher (Workaround Actual)

1. Zeus escribe `ARCHIVO/PLUGINS/MCP_PRESETS/active-pack.json`
2. Un script `watch-pack.sh` detecta cambios y ejecuta `activate-pack.sh`
3. El cambio en `settings.json` dispara recarga en CopilotEngine

```bash
# scripts/watch-pack.sh
fswatch -o ARCHIVO/PLUGINS/MCP_PRESETS/active-pack.json | while read; do
  PACK=$(jq -r '.packId' ARCHIVO/PLUGINS/MCP_PRESETS/active-pack.json)
  ./scripts/activate-pack.sh "$PACK"
done
```

**Problema**: Requiere que el usuario tenga `fswatch` corriendo. No es automático.

**Veredicto**: ✅ Workaround válido, bajo coste (ya propuesto en [06_Decision](06_Decision_PO_Refactorizar.md#script-210-mapeo-dominioinstrucciones-3-pts)).

### Opción D: VS Code Commands via URI Scheme

VS Code soporta URIs que ejecutan comandos:
```
vscode://vscode.git/clone?url=...
```

Podríamos registrar:
```
vscode://aleph.scriptorium/activate-pack?pack=blueprint
```

**Problema**: Requiere extensión que registre el handler. CopilotEngine no lo hace.

**Veredicto**: ❌ Misma dependencia que Opción B.

---

## Veredicto: Workaround vs WISH

| Opción | Viabilidad | Coste | Recomendación |
|--------|------------|-------|---------------|
| A: MCP Server | ❌ No aplica | — | Descartada |
| B: Extensión | ⚠️ Alta | 5+ pts | Diferir a FC3+ |
| C: Script + Watcher | ✅ Funciona | 1 pt | **Workaround FC1** |
| D: URI Scheme | ❌ Requiere ext | — | Descartada |

### Workaround Adoptado (Opción C)

Añadir a [06_Decision_PO_Refactorizar.md § SCRIPT-2.1.0](06_Decision_PO_Refactorizar.md#script-210-mapeo-dominioinstrucciones-3-pts):

| Story | Descripción | Effort |
|-------|-------------|--------|
| S04 | Crear `active-pack.json` schema | 0.5 pt |
| S05 | Crear `watch-pack.sh` (opcional) | 0.5 pt |

**Total SCRIPT-2.1.0**: 3 pts → **4 pts** (+ watcher opcional)

---

## WISH-03: Canal de Comunicación UI Externa → VS Code

> **Adenda a**: [CopilotEngine/README-SCRIPTORIUM.md § Backlog Wishes](../../../CopilotEngine/README-SCRIPTORIUM.md#backlog-wishes-upstream)

### Problema

Las UIs externas (Zeus, TypedPromptsEditor, web apps) no tienen forma nativa de comunicarse con VS Code para actualizar configuración de Copilot Chat.

### Análisis Técnico

- **Opción A**: `vscode.commands.executeCommand` solo funciona dentro de extensiones
- **Opción B**: `vscode://` URI scheme requiere extensión que registre handler
- **Opción C**: `onDidChangeConfiguration` solo detecta cambios en `settings.json` (disco)
- **Opción D**: MCP añade tools, no configura instrucciones

### Hook Propuesto

```typescript
// Opción 1: Contribution point para recibir eventos externos
{
  "contributes": {
    "chatConfigurationBridge": {
      "endpoint": "http://localhost:${port}/config",
      "onPackChange": "./dist/packHandler.js"
    }
  }
}

// Opción 2: Comando invocable desde proceso externo
vscode.commands.registerCommand('chat.activatePack', (packId: string) => {
  // Actualizar instructionsFilesLocations
});

// Opción 3: Extensión de CopilotEngine que expone endpoint local
// POST http://localhost:47321/copilot/config
// { "instructionsFilesLocations": { ... } }
```

### Impacto de No Tener

- Zeus/MCPGallery UI no puede activar packs dinámicamente
- El usuario debe ejecutar scripts manualmente
- La experiencia de "seleccionar pack en UI" no es seamless

### Workaround Documentado

Opción C de este análisis: `active-pack.json` + `watch-pack.sh`

---

## Integración con MCPGallery (SCRIPT-2.2.4)

### Lo que SÍ podemos hacer en FC1

| Task | Descripción | Usa |
|------|-------------|-----|
| T018 | Mapear `MCPGallery/zeus/` presets a formato mcp-presets | catalog.json |
| T019 | Sincronizar servers de `.vscode/mcp.json` | mcpHandler.js |
| T020 | Listar tools disponibles via Zeus | listTools() |

### Lo que NO podemos hacer sin WISH-03

| Feature | Bloqueo |
|---------|---------|
| Activar pack desde Zeus UI | Sin canal de comunicación |
| Sync automático Zeus ↔ VS Code | Requiere extensión |
| Hot-reload de instrucciones | `onDidChangeConfiguration` es file-based |

---

## Backlog Actualizado

### SCRIPT-2.1.0: Mapeo Dominio→Instrucciones

| Story | Descripción | Effort | Estado |
|-------|-------------|--------|--------|
| S01 | Documentar mapeo en Funcional.md | 1 pt | Sin cambio |
| S02 | Crear 4 archivos pack JSON | 1 pt | Sin cambio |
| S03 | Script `activate-pack.sh` | 1 pt | Sin cambio |
| **S04** | **Schema `active-pack.json`** | 0.5 pt | **Nuevo** |
| **S05** | **Script `watch-pack.sh` (opt)** | 0.5 pt | **Nuevo** |

**Total**: 3 pts → **4 pts**

### SCRIPT-2.2.4: MCP Presets Básico

Sin cambios. La integración de UI queda diferida hasta WISH-03.

---

## Criterios de Aceptación Actualizados

- [ ] `active-pack.json` schema documentado
- [ ] `watch-pack.sh` incluido en `scripts/` (documentado como opcional)
- [ ] README de mcp-presets actualizado con flujo Zeus → pack
- [ ] WISH-03 añadido a CopilotEngine/README-SCRIPTORIUM.md

---

## Conclusión

Como @indice detectó para instrucciones, **no existe canal nativo para que una UI externa comunique configuración a CopilotEngine**.

| Agente | Gap detectado | WISH |
|--------|---------------|------|
| @indice | Filtrado dinámico de instrucciones | WISH-01 |
| @mcp-presets | Comunicación UI externa → VS Code | **WISH-03** |

**Recomendación**: Aprobar workaround (Opción C) y documentar WISH-03 para upstream.

---

## Adenda: Solución vía MCP Server Real (2025-12-29)

> **Origen**: [08_Formacion_McpPresets_MCP_Server.md](08_Formacion_McpPresets_MCP_Server.md)

### Corrección del Análisis

El análisis original asumía que Zeus (UI web) debía comunicarse con VS Code. Esto era un error conceptual:

| Componente | Lo que es | Lo que necesitábamos |
|------------|-----------|---------------------|
| Zeus | Express.js + REST API | — |
| PresetsMCPServer | `@modelcontextprotocol/sdk` | ✅ Esto |

### Nueva Arquitectura

Usando el patrón de **NovelistEditor/mcp-core-sdk**:

```
MCPGallery/
├── mcp-core-sdk/                    # ← Submódulo (mismo de NovelistEditor)
└── src/
    └── presets-mcp-server.ts        # ← Extiende BaseMCPServer
```

**Configuración en ALEPH/.vscode/mcp.json**:

```jsonc
{
  "servers": {
    "mcp-presets": {
      "type": "http",
      "url": "http://localhost:3067"
    }
  }
}
```

### WISH-03: Archivado

**Razón**: El LLM actúa como intermediario invocando tools del MCP Server.

```
[Usuario: "Activa preset blueprint"]
    ↓
[LLM invoca tool activate_preset]
    ↓
[PresetsMCPServer actualiza catalog]
```

No se requiere canal UI externa → VS Code. El chat es el canal.

### Impacto en Backlog

**SCRIPT-2.2.4**: 3 pts → **7 pts** (scope real con MCP Server)

Ver [08_Formacion](08_Formacion_McpPresets_MCP_Server.md) para detalle completo.

---

*Refinamiento por @plugin_ox_mcppresets — 2025-12-29*  
*Adenda por Agente Omnímodo — 2025-12-29*
