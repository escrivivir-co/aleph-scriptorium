---
name: Importar Workflow
description: Importar workflow desde archivo JSON o exportación de n8n
---

# Prompt: Importar Workflow

## Input

El usuario quiere importar un workflow desde:

1. **Archivo JSON local**: Ruta a archivo .json
2. **Exportación de n8n**: JSON copiado de n8n
3. **URL**: Enlace a archivo JSON

## Procedimiento

### 1. Identificar Fuente

| Fuente | Ejemplo |
|--------|---------|
| Archivo local | `/ruta/al/workflow.json` |
| JSON directo | `{ "id": "...", "nodes": [...] }` |
| URL | `https://example.com/workflow.json` |

### 2. Validar Estructura

El workflow debe tener:

```typescript
interface Workflow {
  id: string;
  name: string;
  nodes: WorkflowNode[];
  connections: Connection[];
  settings?: Record<string, any>;
}
```

### 3. Compatibilidad n8n

Si viene de n8n, mapear campos:

| n8n | N8NEditor |
|-----|-----------|
| `nodes[].type` | Mantener o mapear a tipo conocido |
| `nodes[].position` | Convertir a `{ x, y }` |
| `connections` | Normalizar formato |

### 4. Guardar en Custom

```bash
# Guardar workflow importado
cp {origen} ARCHIVO/PLUGINS/N8N_EDITOR/workflows/custom/{nombre}-imported-$(date +%Y%m%d).json
```

### 5. Abrir en Editor

Cargar el workflow en el editor visual.

## Validación

### Campos Requeridos

- [ ] `id`: Identificador único
- [ ] `name`: Nombre del workflow
- [ ] `nodes`: Array de nodos (puede estar vacío)
- [ ] `connections`: Array de conexiones (puede estar vacío)

### Tipos de Nodos Conocidos

| Tipo | Descripción |
|------|-------------|
| `trigger` | Nodo de entrada |
| `mcp-server` | Servidor MCP |
| `mcp-tool` | Herramienta MCP |
| `ai-decision` | Decisión con IA |
| `llm-provider` | Proveedor LLM |
| `data-transformer` | Transformador de datos |
| `output` | Nodo de salida |

### Nodos Desconocidos

Si el tipo de nodo no es conocido:

1. Mantener el nodo con tipo original
2. Advertir al usuario
3. Sugerir mapeo a tipo conocido

## Ejemplo: Importar desde n8n

### Input (exportación n8n)

```json
{
  "name": "Mi Workflow",
  "nodes": [
    {
      "parameters": {},
      "id": "1",
      "name": "Start",
      "type": "n8n-nodes-base.start",
      "typeVersion": 1,
      "position": [250, 300]
    }
  ],
  "connections": {}
}
```

### Output (formato N8NEditor)

```json
{
  "id": "imported-{timestamp}",
  "name": "Mi Workflow",
  "nodes": [
    {
      "id": "1",
      "type": "trigger",
      "name": "Start",
      "position": { "x": 250, "y": 300 },
      "parameters": {},
      "connections": { "input": [], "output": [] }
    }
  ],
  "connections": [],
  "settings": {
    "source": "n8n",
    "importedAt": "{timestamp}"
  }
}
```

## Output Esperado

- Workflow importado y guardado en `workflows/custom/`
- Reporte de compatibilidad (nodos mapeados, advertencias)
- Editor abierto con el workflow cargado
