# N8N Editor — Datos de Runtime

> **Plugin**: n8n-editor  
> **Versión**: 1.0.0  
> **Submódulo**: `alephscript-n8n-like-editor`

---

## Propósito

Este directorio almacena los **datos mutables** del plugin N8N Editor:
- Workflows personalizados
- Templates
- Exportaciones
- Configuración de sesión

---

## Estructura

```
N8N_EDITOR/
├── README.md                 # Este archivo
├── workflows/
│   ├── custom/               # Workflows creados por el usuario
│   └── templates/            # Templates predefinidos
└── exports/                  # Workflows exportados
```

---

## Templates Disponibles

| Template | Descripción | Nodos |
|----------|-------------|-------|
| `workflow-auditoria.json` | Flujo de 5 banderas para auditoría doctrinal | 7 |
| `workflow-scraping.json` | Flujo de extracción y procesamiento | 5 |

---

## Integración con TypedPrompting

Los workflows exportados se validan contra el schema definido en:

```
ARCHIVO/PLUGINS/TYPED_PROMPTING/schemas/workflow.schema.json
```

---

## Convenciones

### Nombres de Archivo

```
{nombre}-{timestamp}.json          # custom/
{nombre}-imported-{timestamp}.json # importados
{nombre}-{timestamp}.json          # exports/
```

### Timestamps

Formato: `YYYYMMDD` o `YYYYMMDD-HHmmss`

---

## Archivos Ejemplo

### Workflow Custom

```json
{
  "id": "custom-20251229",
  "name": "Mi Workflow",
  "nodes": [...],
  "connections": [...],
  "settings": {
    "createdAt": "2025-12-29T12:00:00Z",
    "author": "usuario"
  }
}
```

### Export

```json
{
  "id": "export-20251229",
  "name": "Workflow Exportado",
  "nodes": [...],
  "connections": [...],
  "settings": {
    "exportedAt": "2025-12-29T12:00:00Z",
    "exportedBy": "N8NEditor",
    "version": "1.0.0"
  }
}
```

---

## Referencia

- Plugin: `.github/plugins/n8n-editor/`
- Submódulo: `alephscript-n8n-like-editor/`
- Agente: `@plugin_ox_n8neditor`
