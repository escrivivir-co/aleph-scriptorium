---
mode: agent
description: Importa un preset MCP desde un archivo JSON externo al Scriptorium.
---

# Importar Preset MCP

## Objetivo

Importar un preset MCP desde un archivo JSON y guardarlo en `ARCHIVO/PLUGINS/MCP_PRESETS/presets/`.

## Flujo de Importación

### 1. Recibir archivo

El usuario proporciona la ruta a un archivo JSON con el preset.

### 2. Leer y validar esquema

Verificar que el JSON cumple el esquema PresetModel:

**Campos obligatorios**:
- `id`: string (si no existe, generar timestamp)
- `name`: string no vacío
- `prompt`: string no vacío

**Campos opcionales**:
- `description`, `category`, `parameters`, `serverId`, `items`, `createdAt`, `updatedAt`

### 3. Verificar conflictos

Si el `id` ya existe en `ARCHIVO/PLUGINS/MCP_PRESETS/presets/`:
- Preguntar al usuario si desea sobrescribir
- O generar un nuevo ID (timestamp actual)

### 4. Guardar preset

Copiar el JSON validado a:
```
ARCHIVO/PLUGINS/MCP_PRESETS/presets/{id}.json
```

### 5. Confirmar importación

Mostrar resumen:
- Nombre del preset
- Categoría
- Número de items (tools/resources/prompts)
- Servidor MCP asociado (si existe)

## Esquema PresetModel

```json
{
  "id": "1759359152317",
  "name": "Mi Preset",
  "description": "Descripción del preset",
  "category": "Development",
  "prompt": "Prompt asociado al preset",
  "parameters": {},
  "serverId": "playwright",
  "items": ["tool1", "tool2", "resource1"],
  "createdAt": "2025-12-23T10:00:00Z",
  "updatedAt": "2025-12-23T10:00:00Z"
}
```

## Categorías Válidas

- `General`
- `Development`
- `Analysis`
- `Creative`
- `productivity`

## Ejemplo de Uso

Usuario: "Importa el preset desde /ruta/mi-preset.json"

Agente:
1. Lee el archivo
2. Valida campos obligatorios
3. Detecta si hay conflicto de ID
4. Guarda en presets/
5. Confirma: "✅ Preset 'Mi Preset' importado con ID 1759359152317"

## Criterios de Aceptación

- [ ] Si el JSON no cumple el esquema, rechazar con mensaje claro
- [ ] Si el preset ya existe (por id), preguntar si sobrescribir
- [ ] Preservar todos los campos de Zeus (serverId, items, etc.)
