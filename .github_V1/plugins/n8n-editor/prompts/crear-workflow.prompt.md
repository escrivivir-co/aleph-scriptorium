---
name: Crear Workflow
description: Crear un workflow desde template o descripción en lenguaje natural
---

# Prompt: Crear Workflow

## Input

El usuario quiere crear un workflow. Puede ser:

1. **Desde template**: "crear workflow de auditoría"
2. **Desde descripción**: "necesito un flujo que extraiga datos de un foro y los procese"
3. **Desde cero**: "crear workflow vacío"

## Procedimiento

### Opción A: Desde Template

#### 1. Listar Templates Disponibles

```
Templates en ARCHIVO/PLUGINS/N8N_EDITOR/workflows/templates/:

1. workflow-auditoria.json
   - Flujo de 5 banderas para auditar documentos
   - Nodos: Input → Blueflag → Blackflag → Redflag → Yellowflag → Orangeflag → Report
   
2. workflow-scraping.json
   - Flujo de extracción y procesamiento
   - Nodos: ForoScraper → Parse → Transform → TypedPrompting → Output
```

#### 2. Cargar Template

```bash
# Copiar template al editor
cp ARCHIVO/PLUGINS/N8N_EDITOR/workflows/templates/{template}.json \
   ARCHIVO/PLUGINS/N8N_EDITOR/workflows/custom/{nombre}-$(date +%Y%m%d).json
```

#### 3. Abrir en Editor

Iniciar servidor y cargar el workflow.

### Opción B: Desde Descripción

#### 1. Analizar Descripción

Identificar:
- **Entrada**: ¿De dónde vienen los datos?
- **Procesamiento**: ¿Qué transformaciones necesita?
- **Salida**: ¿Dónde se guardan los resultados?
- **Validación**: ¿Necesita verificación?

#### 2. Mapear a Nodos

| Concepto | Tipo de Nodo |
|----------|--------------|
| Fuente de datos | `trigger`, `mcp-tool` |
| Transformación | `data-transformer` |
| Decisión con IA | `ai-decision`, `llm-provider` |
| Validación | `ai-decision` + TypedPrompting |
| Salida | `output` |

#### 3. Generar Workflow JSON

```json
{
  "id": "generated-{timestamp}",
  "name": "{nombre descriptivo}",
  "nodes": [
    // Nodos generados
  ],
  "connections": [
    // Conexiones entre nodos
  ],
  "settings": {}
}
```

### Opción C: Desde Cero

#### 1. Crear Workflow Vacío

```json
{
  "id": "new-{timestamp}",
  "name": "Workflow sin título",
  "nodes": [],
  "connections": [],
  "settings": {}
}
```

#### 2. Abrir Editor

El usuario añadirá nodos manualmente.

## Templates Predefinidos

### workflow-auditoria.json

```json
{
  "id": "template-auditoria",
  "name": "Auditoría de 5 Banderas",
  "nodes": [
    {
      "id": "input-1",
      "type": "trigger",
      "name": "Documento a auditar",
      "position": { "x": 100, "y": 300 },
      "parameters": { "inputType": "text" }
    },
    {
      "id": "blueflag-1",
      "type": "ai-decision",
      "name": "Blueflag: Evidencia",
      "position": { "x": 300, "y": 300 },
      "parameters": {
        "prompt": "Audita evidencia, utilidad y falsificabilidad",
        "outputFormat": "json"
      }
    },
    {
      "id": "blackflag-1",
      "type": "ai-decision",
      "name": "Blackflag: Sombras",
      "position": { "x": 500, "y": 300 },
      "parameters": {
        "prompt": "Audita coste represivo y captura del enemigo",
        "outputFormat": "json"
      }
    },
    {
      "id": "redflag-1",
      "type": "ai-decision",
      "name": "Redflag: Estructura",
      "position": { "x": 700, "y": 300 },
      "parameters": {
        "prompt": "Audita escala, enforcement y régimen material",
        "outputFormat": "json"
      }
    },
    {
      "id": "yellowflag-1",
      "type": "ai-decision",
      "name": "Yellowflag: Límites",
      "position": { "x": 900, "y": 300 },
      "parameters": {
        "prompt": "Audita condiciones vs contenido e inconmensurabilidad",
        "outputFormat": "json"
      }
    },
    {
      "id": "orangeflag-1",
      "type": "ai-decision",
      "name": "Orangeflag: Registro",
      "position": { "x": 1100, "y": 300 },
      "parameters": {
        "prompt": "Audita registro, género, estilo y auditorio",
        "outputFormat": "json"
      }
    },
    {
      "id": "report-1",
      "type": "output",
      "name": "Reporte Consolidado",
      "position": { "x": 1300, "y": 300 },
      "parameters": { "format": "markdown" }
    }
  ],
  "connections": [
    { "source": "input-1", "target": "blueflag-1" },
    { "source": "blueflag-1", "target": "blackflag-1" },
    { "source": "blackflag-1", "target": "redflag-1" },
    { "source": "redflag-1", "target": "yellowflag-1" },
    { "source": "yellowflag-1", "target": "orangeflag-1" },
    { "source": "orangeflag-1", "target": "report-1" }
  ],
  "settings": {
    "executionOrder": "sequential"
  }
}
```

## Output Esperado

- Workflow creado y guardado en `workflows/custom/`
- Editor abierto con el workflow cargado
- Usuario puede modificar y guardar cambios
