---
mode: agent
description: Exporta uno o más presets MCP en formato JSON compatible con Zeus.
---

# Exportar Preset MCP

## Objetivo

Exportar presets del Scriptorium en formato JSON compatible con el proyecto Zeus.

## Flujo

### 1. Identificar preset(s) a exportar

Opciones:
- Exportar un preset por ID
- Exportar múltiples por lista de IDs
- Exportar todos (`--all`)

### 2. Leer presets

Cargar los archivos JSON de `ARCHIVO/PLUGINS/MCP_PRESETS/presets/`.

### 3. Generar JSON de exportación

**Para preset individual**:
```json
{
  "exportedAt": "2025-12-23T12:00:00Z",
  "source": "aleph-scriptorium",
  "preset": { ... }
}
```

**Para bundle (múltiples)**:
```json
{
  "exportedAt": "2025-12-23T12:00:00Z",
  "source": "aleph-scriptorium",
  "count": 3,
  "presets": [ {...}, {...}, {...} ]
}
```

### 4. Sugerir nombre de archivo

- Individual: `{preset-name}-export.json`
- Bundle: `presets-bundle-{timestamp}.json`

### 5. Mostrar ruta de exportación

Indicar dónde se guardó el archivo (o mostrarlo en pantalla).

## Opciones

- `--all`: Exportar todos los presets
- `--output <ruta>`: Especificar ruta de salida
- `--clipboard`: Copiar JSON al portapapeles en lugar de guardar

## Formato Zeus-Compatible

El JSON exportado debe cumplir exactamente el esquema PresetModel de Zeus:

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "category": "General|Development|Analysis|Creative|productivity",
  "prompt": "string",
  "parameters": {},
  "serverId": "string|null",
  "items": ["tool1", "tool2"],
  "createdAt": "ISO8601",
  "updatedAt": "ISO8601"
}
```

## Ejemplo de Uso

Usuario: "@McpPresets exportar 1759359152317"

Agente:
```
✅ Preset exportado: devops-status-export.json

Contenido:
{
  "exportedAt": "2025-12-23T12:00:00Z",
  "source": "aleph-scriptorium",
  "preset": {
    "id": "1759359152317",
    "name": "DevOps Status",
    ...
  }
}
```

## Criterios de Aceptación

- [ ] El JSON exportado es válido según PresetModel de Zeus
- [ ] Se puede exportar un preset individual o un bundle
- [ ] El archivo incluye timestamp de exportación
