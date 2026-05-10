# Prompt: Importar Flow

> **Plugin**: WireEditor  
> **Agente**: WireEditor

## Objetivo

Importar un flow JSON externo al catálogo de WIRING.

## Input

El usuario proporciona:
- **Archivo JSON** con el flow (ruta o contenido)
- **Destino**: `templates/flows/`, `templates/subflows/`, o `projects/{nombre}/`
- **Nombre** para el artefacto (opcional, se infiere del JSON)

## Proceso

### 1. Validar JSON

```javascript
// Estructura mínima de flow Node-RED
{
  "id": "string",
  "type": "tab" | "subflow",
  "label": "string",
  "nodes": [...],
  "configs": [...]
}
```

### 2. Detectar tipo de artefacto

| type | Destino |
|------|---------|
| `tab` | templates/flows/ o projects/ |
| `subflow` | templates/subflows/ |
| Nodo individual | templates/nodes/ |

### 3. Extraer metadata

```json
{
  "id": "del JSON",
  "name": "label del JSON o proporcionado",
  "nodes_count": "length de nodes[]",
  "node_types": ["tipos únicos usados"],
  "has_subflows": true/false,
  "dependencies": ["paquetes npm requeridos"]
}
```

### 4. Verificar dependencias

Comparar `node_types` con nodos disponibles en catálogo:
- ✅ Nodos de node-red-contrib-alephscript
- ✅ Nodos core de Node-RED
- ⚠️ Nodos de otros paquetes (documentar)

### 5. Copiar archivo

```bash
cp {origen} ARCHIVO/DISCO/WIRING/{destino}/{nombre}.json
```

### 6. Actualizar catalog.json

Añadir a la sección correspondiente:

```json
// Para flows
{
  "id": "{nombre}",
  "name": "{label}",
  "path": "templates/flows/{nombre}.json",
  "source": "imported",
  "imported_at": "{ISO8601}",
  "nodes_used": ["{lista de tipos}"],
  "dependencies": ["{paquetes externos}"]
}
```

## Output

1. Archivo copiado a destino
2. catalog.json actualizado
3. Informe de validación:
   - Nodos reconocidos
   - Dependencias externas
   - Advertencias si hay nodos desconocidos

## Ejemplo

```
Usuario: Importa este flow de ejemplo del submódulo
         node-red-alephscript-sdk/examples/flows/03-message-formatting.json

WireEditor:
1. Tipo detectado: tab (flow)
2. Nombre: "message-formatting"
3. Nodos: FormatNode, MessageParserNode, ResponseBuilderNode
4. Dependencias: node-red-contrib-alephscript ✅

Importando a templates/flows/message-formatting.json...
✅ Importación completada
✅ catalog.json actualizado
```

## Validaciones

- [ ] JSON válido
- [ ] Tiene campos obligatorios (id, type)
- [ ] No hay conflicto de ID con artefactos existentes
- [ ] Nodos requeridos están disponibles o documentados
