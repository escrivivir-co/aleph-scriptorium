# Prompt: Exportar Flow

> **Plugin**: WireEditor  
> **Agente**: WireEditor

## Objetivo

Exportar un flow desde WIRING a archivo JSON listo para usar en Node-RED.

## Input

El usuario proporciona:
- **ID o ruta** del flow a exportar
- **Destino** (ruta de archivo o directorio)
- **Opciones**:
  - `--include-subflows`: Incluir subflows referenciados
  - `--include-config`: Incluir nodos de configuración
  - `--standalone`: Generar paquete con package.json

## Proceso

### 1. Localizar flow

Buscar en catalog.json:

```javascript
const flow = catalog.templates.flows.find(f => f.id === id)
           || catalog.projects.find(p => p.id === id);
```

### 2. Leer archivo JSON

```bash
cat ARCHIVO/DISCO/WIRING/{flow.path}
```

### 3. Resolver dependencias (opcional)

Si `--include-subflows`:
```javascript
// Buscar referencias a subflows en nodes[]
const subflowRefs = nodes.filter(n => n.type.startsWith("subflow:"));
// Incluir definiciones de subflows
```

### 4. Formatear para Node-RED

```json
[
  // Tab principal
  {
    "id": "...",
    "type": "tab",
    "label": "...",
    ...
  },
  // Nodos del flow
  { "id": "node1", "type": "...", "z": "{tab-id}", ... },
  { "id": "node2", "type": "...", "z": "{tab-id}", ... },
  // Subflows (si incluidos)
  { "id": "subflow1", "type": "subflow", ... }
]
```

### 5. Generar paquete (si --standalone)

```
{destino}/
├── flows.json
├── package.json
├── README.md
└── settings.js (opcional)
```

**package.json**:
```json
{
  "name": "{nombre}-flow",
  "version": "1.0.0",
  "description": "Flow exportado desde WireEditor",
  "node-red": {
    "settings": {
      "flowFile": "flows.json"
    }
  },
  "dependencies": {
    "node-red": "^3.0.0",
    "node-red-contrib-alephscript": "^1.0.0"
  }
}
```

### 6. Escribir archivo(s)

```bash
# Simple
cp flow.json {destino}

# Standalone
mkdir -p {destino}
cp flow.json {destino}/flows.json
# + generar package.json, README.md
```

## Output

1. Archivo(s) JSON exportado(s)
2. package.json (si standalone)
3. README con instrucciones de uso
4. Informe de exportación

## Ejemplo

```
Usuario: Exporta el proyecto kick-tarotista para usarlo en mi servidor

WireEditor:
Exportando kick-tarotista...

Opciones:
1. Solo flow.json (simple)
2. Paquete standalone con package.json
3. Incluir subflows referenciados

Usuario: Opción 2, standalone

WireEditor:
Generando paquete en DISCO/WIRING/exports/kick-tarotista/...
├── flows.json (3 nodos)
├── package.json
└── README.md

Para usar:
1. cd exports/kick-tarotista/
2. npm install
3. node-red -u .

✅ Exportación completada
```

## Formatos soportados

| Formato | Uso |
|---------|-----|
| `.json` | Importar en Node-RED existente |
| Standalone | Nuevo proyecto Node-RED |
| Clipboard | Pegar en editor Node-RED |
