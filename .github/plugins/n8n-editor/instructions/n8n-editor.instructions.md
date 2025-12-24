---
name: N8N Editor Instructions
description: Contexto y reglas para el editor visual de workflows con integración MCP.
applyTo: "ARCHIVO/PLUGINS/N8N_EDITOR/**/*.json, .github/plugins/n8n-editor/**/*.md, alephscript-n8n-like-editor/**/*"
---

# Instrucciones: Plugin N8N Editor

> **Fuente de verdad**: `.github/plugins/n8n-editor/manifest.md`  
> **Submódulo**: `alephscript-n8n-like-editor`

---

## Concepto Central

**N8N Editor es un CONECTOR, no un sustituto de n8n.**

El flujo típico es:

```
Diseño en Scriptorium → Validación → Export JSON → Importar en n8n → Ejecutar
```

---

## Estructura de Dos Pasos

### Paso 1: Asistencia (Diseño)

El agente guía al usuario para diseñar workflows:

| Acción | Input | Output |
|--------|-------|--------|
| **Desde template** | Nombre de template | Workflow cargado en editor |
| **Desde descripción** | Texto en lenguaje natural | Workflow generado |
| **Importar** | Archivo JSON o URL | Workflow importado |

### Paso 2: Uso (Exportación)

El agente ejecuta operaciones sobre workflows:

| Acción | Input | Output |
|--------|-------|--------|
| **Exportar** | Workflow actual | JSON en `exports/` |
| **Validar** | Workflow + Schema | Reporte de errores |
| **Inyectar MCP** | Preset ID | Nodo mcp-server añadido |

---

## Integración con Plugins

### TypedPrompting

Los workflows exportados se validan con TypedPrompting:

1. **Schema**: `ARCHIVO/PLUGINS/TYPED_PROMPTING/schemas/workflow.schema.json`
2. **Validación**: Antes de exportar, verificar estructura
3. **Errores**: Reportar y sugerir correcciones

### MCP Presets

Los presets del Scriptorium se inyectan como servidores MCP:

1. **Mapeo**: Preset → `MCPServerNode`
2. **Herramientas**: `preset.items` → `discovered.tools`
3. **Configuración**: Automática desde el preset

### ARG Board

Los workflows pueden representarse como escenas del Teatro:

| Workflow | ARG | Descripción |
|----------|-----|-------------|
| Nodo | Estadio | Paso del flujo |
| Conexión | Transición | Avance en el flujo |
| Ejecución | BOE | Estado registrado |

---

## Estructura de Datos

### Ubicaciones

```
ARCHIVO/PLUGINS/N8N_EDITOR/
├── workflows/
│   ├── templates/              # Templates predefinidos
│   │   ├── workflow-auditoria.json
│   │   └── workflow-scraping.json
│   └── custom/                 # Workflows del usuario
├── exports/                    # Exports a n8n
└── validation-logs/            # Historial de validaciones
```

### Formato de Workflow

Los workflows siguen el formato del submódulo (compatible con n8n):

```typescript
interface Workflow {
  id: string;
  name: string;
  nodes: WorkflowNode[];
  connections: Connection[];
  settings: Record<string, any>;
}

interface WorkflowNode {
  id: string;
  type: string;              // 'mcp-server', 'ai-decision', etc.
  name: string;
  position: { x: number; y: number };
  parameters: Record<string, any>;
  connections: {
    input: string[];
    output: string[];
  };
}
```

---

## Templates Predefinidos

### workflow-auditoria.json

Flujo de auditoría con las 5 banderas del Scriptorium:

```
[Input] → [Blueflag] → [Blackflag] → [Redflag] → [Yellowflag] → [Orangeflag] → [Report]
```

**Uso**: Auditar documentos con el método doctrinal completo.

### workflow-scraping.json

Flujo de scraping con procesamiento:

```
[ForoScraper] → [Parse] → [Transform] → [TypedPrompting] → [Output]
```

**Uso**: Extraer contenido de foros/blogs y procesarlo.

---

## Comandos del Submódulo

| Comando | Puerto | Propósito |
|---------|--------|-----------|
| `npm start` | 4200 | Desarrollo (hot reload) |
| `npm run build` | — | Construir para producción |
| `npm run serve:ssr` | 4000 | Servidor SSR |

---

## Buenas Prácticas

### Al diseñar workflows

1. **Nombrar nodos descriptivamente**: `Auditar-Evidencia` mejor que `Node1`
2. **Documentar parámetros**: Añadir descripciones en cada nodo
3. **Validar antes de exportar**: Usar TypedPrompting
4. **Versionado**: Guardar en `custom/` con nombre-fecha

### Al exportar

1. **Validar schema**: Ejecutar validación con TypedPrompting
2. **Documentar dependencias**: Listar presets MCP usados
3. **Probar en n8n**: Importar y ejecutar antes de distribuir

### Al inyectar MCP

1. **Verificar disponibilidad**: El preset debe existir
2. **Configurar timeout**: Servidores externos pueden ser lentos
3. **Documentar herramientas**: Listar tools inyectadas

---

## Lo que NO hacer

- **No sustituir n8n**: Este plugin es un diseñador, no un ejecutor
- **No hardcodear URLs**: Usar variables de entorno para servidores
- **No saltar validación**: Siempre validar con TypedPrompting
- **No mezclar versiones**: Mantener compatibilidad con n8n target

---

## Referencia

| Documento | Propósito |
|-----------|-----------|
| `manifest.md` | Metadatos del plugin |
| `agents/n8n-editor.agent.md` | Definición del agente |
| `README-SCRIPTORIUM.md` | Documentación de integración |
| `ARCHIVO/PLUGINS/N8N_EDITOR/` | Datos de runtime |
