# Plugin MCP-Presets: Datos de Runtime

> **Plugin**: mcp-presets  
> **Ubicación**: `ARCHIVO/PLUGINS/MCP_PRESETS/`  
> **Versión**: 1.0.0

---

## Estructura

```
MCP_PRESETS/
├── presets/                   # Presets importados
│   ├── examples/              # Ejemplos de referencia (no editar)
│   │   ├── devops-status.json
│   │   └── code-analysis.json
│   └── {id}.json              # Presets del usuario
├── catalog.json               # Catálogo de servidores MCP conocidos
├── agent-assignments.json     # Mapeo agente → presets
└── README.md                  # Este archivo
```

---

## Archivos

### presets/

Directorio donde se almacenan los presets importados. Cada preset es un archivo JSON con el esquema PresetModel.

**Convención de nombres**: `{id}.json` donde `id` es el timestamp del preset.

### catalog.json

Catálogo de servidores MCP conocidos. Se puebla automáticamente cuando:
- Se importan presets con `serverId`
- Se conecta con Zeus (futuro)

### agent-assignments.json

Mapeo de agentes a presets asignados:

```json
{
  "assignments": {
    "tarotista": ["preset-id-1", "preset-id-2"]
  }
}
```

---

## Uso

### Importar preset

```
@McpPresets importar /ruta/al/preset.json
```

### Listar presets

```
@McpPresets listar
```

### Asignar a agente

```
@McpPresets asignar <preset-id> <agente-id>
```

### Exportar preset

```
@McpPresets exportar <preset-id>
```

---

## Ejemplos Incluidos

Ver `presets/examples/` para presets de referencia:

| Preset | Descripción |
|--------|-------------|
| `devops-status.json` | Herramientas de monitoreo de servidores |
| `code-analysis.json` | Análisis de código fuente |

---

## Referencias

- [Manifest del plugin](../../../.github/plugins/mcp-presets/manifest.md)
- [Agente McpPresets](../../../.github/plugins/mcp-presets/agents/mcp-presets.agent.md)
- [Instrucciones](../../../.github/plugins/mcp-presets/instructions/mcp-presets.instructions.md)
