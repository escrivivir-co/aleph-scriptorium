---
name: Exportar Workflow
description: Exportar workflow a JSON, validando con TypedPrompting
---

# Prompt: Exportar Workflow

## Input

El usuario quiere exportar un workflow para:

1. **Uso en n8n**: Formato compatible con n8n
2. **Backup**: Guardar copia local
3. **Compartir**: Distribuir a otros usuarios

## Procedimiento

### 1. Identificar Workflow

```
¿Qué workflow deseas exportar?

1. Workflow actual en el editor
2. Workflow guardado en custom/
3. Template predefinido
```

### 2. Validar con TypedPrompting

Antes de exportar, validar estructura:

```bash
# Invocar TypedPrompting
@typed-prompting validar mensaje contra schema
  - Mensaje: {workflow JSON}
  - Schema: workflow.schema.json
```

#### Schema de Workflow

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["id", "name", "nodes", "connections"],
  "properties": {
    "id": { "type": "string" },
    "name": { "type": "string" },
    "nodes": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["id", "type", "name", "position"],
        "properties": {
          "id": { "type": "string" },
          "type": { "type": "string" },
          "name": { "type": "string" },
          "position": {
            "type": "object",
            "properties": {
              "x": { "type": "number" },
              "y": { "type": "number" }
            }
          },
          "parameters": { "type": "object" }
        }
      }
    },
    "connections": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["source", "target"],
        "properties": {
          "source": { "type": "string" },
          "target": { "type": "string" }
        }
      }
    }
  }
}
```

### 3. Generar Export

#### Para n8n

Convertir a formato n8n:

```json
{
  "name": "{workflow.name}",
  "nodes": [
    {
      "parameters": { ... },
      "id": "{node.id}",
      "name": "{node.name}",
      "type": "n8n-nodes-base.{mappedType}",
      "typeVersion": 1,
      "position": [{node.position.x}, {node.position.y}]
    }
  ],
  "connections": {
    "{sourceId}": {
      "main": [[{ "node": "{targetId}", "type": "main", "index": 0 }]]
    }
  }
}
```

#### Para Backup/Compartir

Mantener formato N8NEditor:

```json
{
  "id": "{workflow.id}",
  "name": "{workflow.name}",
  "nodes": [...],
  "connections": [...],
  "settings": {
    "exportedAt": "{timestamp}",
    "exportedBy": "N8NEditor",
    "version": "1.0.0"
  }
}
```

### 4. Guardar Export

```bash
# Guardar en exports/
FILENAME="ARCHIVO/PLUGINS/N8N_EDITOR/exports/{name}-{timestamp}.json"
```

### 5. Confirmar al Usuario

```
✅ Workflow exportado exitosamente

Archivo: exports/{name}-{timestamp}.json
Formato: {n8n | backup}
Validación: ✅ Schema válido

Próximos pasos:
- Para n8n: Importar en Settings > Import from File
- Para compartir: Distribuir archivo JSON
```

## Mapeo de Tipos a n8n

| N8NEditor | n8n |
|-----------|-----|
| `trigger` | `n8n-nodes-base.start` |
| `ai-decision` | `n8n-nodes-base.code` (con lógica) |
| `llm-provider` | `@n8n/n8n-nodes-langchain.lmChatOpenAi` |
| `mcp-tool` | `n8n-nodes-base.httpRequest` |
| `data-transformer` | `n8n-nodes-base.set` |
| `output` | `n8n-nodes-base.respondToWebhook` |

## Errores Comunes

### Validación Fallida

```
❌ Error de validación

Campo: nodes[2].position
Error: Falta propiedad 'x'

Solución: Corregir posición del nodo y re-exportar
```

### Tipo No Mapeado

```
⚠️ Advertencia

Nodo: {nodeName}
Tipo: {unknownType}

Este tipo no tiene mapeo directo a n8n.
Se exportará como nodo genérico (Code).
```

## Output Esperado

- Archivo JSON exportado en `exports/`
- Reporte de validación
- Instrucciones de uso según destino
