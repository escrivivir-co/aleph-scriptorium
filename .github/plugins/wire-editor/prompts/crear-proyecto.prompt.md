# Prompt: Crear Proyecto Node-RED

> **Plugin**: WireEditor  
> **Agente**: WireEditor

## Objetivo

Crear un nuevo proyecto Node-RED en `ARCHIVO/DISCO/WIRING/projects/`.

## Input

El usuario proporciona:
- **Nombre del proyecto** (kebab-case)
- **Descripción** del propósito
- **Caso de uso** principal (bot, dashboard, orquestación, feed)
- **Plantilla base** (opcional)

## Proceso

### 1. Validar nombre

```bash
# Verificar que no existe
ls ARCHIVO/DISCO/WIRING/projects/ | grep {nombre}
```

### 2. Crear estructura

```
ARCHIVO/DISCO/WIRING/projects/{nombre}/
├── flow.json          # Flow principal
├── package.json       # Dependencias (si aplica)
├── README.md          # Documentación
└── .node-red/         # Config local (opcional)
```

### 3. Generar flow inicial

Si hay plantilla base:
```bash
cp templates/flows/{plantilla}.json projects/{nombre}/flow.json
```

Si no:
```json
{
  "id": "{uuid}",
  "type": "tab",
  "label": "{nombre}",
  "nodes": [],
  "configs": [],
  "comments": [
    {
      "id": "{uuid}",
      "type": "comment",
      "name": "Proyecto generado por WireEditor",
      "info": "{descripción}"
    }
  ]
}
```

### 4. Crear README

```markdown
# {Nombre del Proyecto}

> Generado por WireEditor el {fecha}

## Descripción

{descripción proporcionada}

## Caso de Uso

{caso de uso}

## Nodos Utilizados

- {lista de nodos recomendados}

## Feeds

| Feed | Tipo | Propósito |
|------|------|-----------|
| ... | ... | ... |

## Cómo Ejecutar

1. Instalar Node-RED: `npm install -g node-red`
2. Copiar flow.json a ~/.node-red/flows.json
3. Arrancar Node-RED: `node-red`
4. Abrir http://localhost:1880

## Integración con Scriptorium

{instrucciones de integración}
```

### 5. Actualizar catalog.json

Añadir entrada en `projects`:

```json
{
  "id": "{nombre}",
  "name": "{Nombre legible}",
  "path": "projects/{nombre}/",
  "description": "{descripción}",
  "nodes_used": [],
  "feeds": [],
  "created_at": "{ISO8601}",
  "template_base": "{plantilla o null}"
}
```

## Output

1. Carpeta del proyecto creada
2. flow.json inicial
3. README.md con documentación
4. catalog.json actualizado
5. Mensaje de confirmación con próximos pasos

## Ejemplo

```
Usuario: Crea un proyecto para filtrar comandos de chat de Kick

WireEditor:
1. Nombre sugerido: "kick-commands-filter"
2. Plantilla base: "basic-kick-bot-commands"
3. Nodos recomendados: BotClientNode, FlowControlNode, MessageParserNode
4. Feed propuesto: "kick-commands.json"

¿Procedo con esta configuración?
```
