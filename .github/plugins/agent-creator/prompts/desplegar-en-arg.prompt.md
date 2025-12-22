---
agent: 'agent'
description: 'Despliega un agente creado como personaje en una obra del Teatro ARG'
tools: ['read', 'edit', 'search']
---

# Desplegar Agente en ARG Board

## Objetivo

Convertir un agente creado por AGENT_CREATOR en un **personaje** de una obra del Teatro ARG (plugin ARG_BOARD), estableciendo trazabilidad bidireccional.

## Pipeline Automatizado

> **Referencia completa**: `.github/prompts/pipeline-agentcreator-argboard.prompt.md`

El despliegue sigue el algoritmo documentado en el pipeline central:
1. Leer receta desde `ARCHIVO/PLUGINS/AGENT_CREATOR/recipes/`
2. Extraer datos para actor (nombre, arquetipo, descripción, rol, tests)
3. Generar ID de actor (slugify del nombre)
4. Construir entrada JSON para `actores.json`
5. Escribir en `ARCHIVO/PLUGINS/ARG_BOARD/.arrakis/actores.json`
6. Actualizar `obras.json` si existe obra asociada
7. Actualizar receta con trazabilidad (`arg_deployment`)
8. Registrar en `logs/creation-log.json`

## Flujo Interactivo

### Paso 1: Seleccionar agente a desplegar

```
¿Qué agente quieres desplegar como personaje?

Agentes creados disponibles:
[listar ARCHIVO/PLUGINS/AGENT_CREATOR/agents/created/]
```

### Paso 2: Seleccionar o crear obra

```
¿En qué obra quieres desplegarlo?

Obras existentes:
[listar de ARCHIVO/PLUGINS/ARG_BOARD/.arrakis/obras.json]

O crear nueva obra:
- Nombre de la obra
- Tipo: monomito | periodico | laboratorio
- Descripción
```

### Paso 3: Definir personaje

Extraer del agente:
- **Nombre**: Nombre legible del personaje
- **Arquetipo**: HERALD | MENTOR | SHADOW | ALLY | THRESHOLD_GUARDIAN | TRICKSTER | SHAPESHIFTER
- **Descripción**: Basada en la especialización del agente
- **Rol**: Función en la obra
- **Tests**: Tests de auditoría que hereda

### Paso 4: Registrar en ARG_BOARD

1. Añadir entrada en `actores.json`:
```json
{
  "{id_personaje}": {
    "nombre": "{nombre}",
    "tipo": "agente_creado",
    "arquetipo": "{arquetipo}",
    "descripcion": "{descripcion}",
    "rol": "{rol}",
    "plataformas": ["vscode"],
    "monomito": "{id_obra}",
    "fuente_agente": "ARCHIVO/PLUGINS/AGENT_CREATOR/agents/created/{agente}.agent.md",
    "fuente_receta": "ARCHIVO/PLUGINS/AGENT_CREATOR/recipes/{agente}.recipe.json",
    "tests": [...]
  }
}
```

2. Añadir personaje a la obra en `obras.json`:
```json
{
  "{id_obra}": {
    "actores": [..., "{id_personaje}"]
  }
}
```

3. Actualizar `theater_state.json`:
```json
{
  "actores_registrados": [..., "{id_personaje}"]
}
```

### Paso 5: Establecer trazabilidad

Actualizar la receta del agente con referencia a ARG:
```json
{
  "arg_deployment": {
    "obra": "{id_obra}",
    "personaje": "{id_personaje}",
    "deployed_at": "{timestamp}"
  }
}
```

Registrar en `creation-log.json`:
```json
{
  "operation": "deploy_to_arg",
  "agent_name": "{nombre}",
  "obra": "{id_obra}",
  "personaje": "{id_personaje}"
}
```

## Ejemplo

```
Usuario: Desplegar demarcacion-yellowflag en una obra nueva

AgentCreator: 
Analizando agente: demarcacion-yellowflag
- Base: Yellowflag (auditoría de límites)
- Especialidad: Criterio de demarcación científica
- Fuente: Foro de tarot y filosofía de la ciencia

¿Cómo llamamos a la obra? 

Usuario: "Hola Mundo"

AgentCreator: Creando obra "Hola Mundo"...

Personaje propuesto:
- Nombre: Tarotista
- Arquetipo: TRICKSTER (juega en los límites de lo científico)
- Rol: Provocador epistémico
- Tests: Cientificismo, Falsificabilidad, Pre/trans falacia

¿Confirmo el despliegue?

Usuario: Sí

AgentCreator: 
✅ Obra "hola_mundo" creada en obras.json
✅ Personaje "tarotista" registrado en actores.json
✅ Teatro actualizado con nuevo actor
✅ Trazabilidad establecida en receta del agente
```

## Actualización de agentes

Cuando se edita un agente con AGENT_CREATOR:
1. Detectar si tiene `arg_deployment`
2. Notificar que el personaje asociado puede actualizarse
3. Ofrecer handoff para sincronizar cambios

## Validaciones

- [ ] Agente existe en agents/created/
- [ ] Obra existe o se crea correctamente
- [ ] No hay personaje duplicado con mismo nombre en la obra
- [ ] Trazabilidad bidireccional establecida
