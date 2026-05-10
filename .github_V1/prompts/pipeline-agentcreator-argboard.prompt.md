# Pipeline Automatizado: Agent Creator → ARG Board

Este prompt describe el proceso automatizado para crear un actor en `actores.json` a partir de una receta de AGENT_CREATOR.

## Trigger

El flujo se activa cuando:
1. Se crea un nuevo agente con `crear-agente.prompt.md`
2. Se solicita explícitamente el despliegue con `desplegar-en-arg.prompt.md`
3. Se edita un agente que ya tiene `arg_deployment`

## Algoritmo

```
ENTRADA: receta.json de AGENT_CREATOR

1. LEER receta desde ARCHIVO/PLUGINS/AGENT_CREATOR/recipes/{nombre}.recipe.json

2. EXTRAER datos para actor:
   - nombre       ← receta.arg_deployment.personaje.nombre || receta.name
   - arquetipo    ← receta.arg_deployment.personaje.arquetipo || inferir_de_base()
   - descripcion  ← receta.especialidad
   - rol          ← receta.arg_deployment.personaje.rol || "Agente especializado"
   - tests        ← receta.tests_especificos
   - origen       ← {
       plugin: "agent-creator",
       agente_base: receta.agentes_base[0].id,
       fuente_datos: receta.fuentes_datos[0].ruta,
       agente_creado: receta.name,
       ruta_agente: "ARCHIVO/PLUGINS/AGENT_CREATOR/agents/created/{nombre}.agent.md"
     }

3. GENERAR id_actor:
   id_actor = slugify(nombre)  // ej: "Tarotista" → "tarotista"

4. CONSTRUIR entrada para actores.json:
   {
     "{id_actor}": {
       "nombre": "{nombre}",
       "tipo": "personaje",
       "arquetipo": "{arquetipo}",
       "descripcion": "{descripcion}",
       "rol": "{rol}",
       "plataformas": ["vscode", "email"],
       "monomito": "{id_obra}",
       "origen": { ... },
       "capacidades": [...],
       "cartas_tarot": { ... }  // Si aplica según fuente
     }
   }

5. ESCRIBIR en ARCHIVO/PLUGINS/ARG_BOARD/.arrakis/actores.json

6. ACTUALIZAR obras.json si existe obra asociada:
   - Añadir id_actor al array "actores" de la obra

7. ACTUALIZAR receta con trazabilidad:
   receta.arg_deployment.deployed = true
   receta.arg_deployment.deployed_at = now()

8. REGISTRAR en logs/creation-log.json

SALIDA: Actor registrado + trazabilidad establecida
```

## Inferencia de Arquetipo

Si la receta no especifica arquetipo, se infiere del agente base:

| Agente Base | Arquetipo Default |
|-------------|-------------------|
| yellowflag | SHAPESHIFTER |
| blueflag | MENTOR |
| blackflag | SHADOW |
| redflag | THRESHOLD_GUARDIAN |
| orangeflag | TRICKSTER |
| aleph | HERALD |
| periodico | ALLY |

## Validaciones

```javascript
function validar_despliegue(receta) {
  const errores = [];
  
  // Validar que existe el agente creado
  if (!existe(`ARCHIVO/PLUGINS/AGENT_CREATOR/agents/created/${receta.name}.agent.md`)) {
    errores.push("Agente no encontrado");
  }
  
  // Validar que ARG_BOARD está instalado
  if (!existe("ARCHIVO/PLUGINS/ARG_BOARD/.arrakis/actores.json")) {
    errores.push("Plugin ARG_BOARD no instalado");
  }
  
  // Validar que no hay actor duplicado
  const actores = leer("actores.json");
  const id = slugify(receta.arg_deployment?.personaje?.nombre || receta.name);
  if (actores[id]) {
    errores.push(`Actor '${id}' ya existe - usar editar en lugar de crear`);
  }
  
  return errores;
}
```

## Ejemplo de Ejecución

### Input: Receta
```json
{
  "name": "tarotista",
  "especialidad": "Criterio de demarcación científica",
  "agentes_base": [{"id": "yellowflag"}],
  "tests_especificos": ["cientificismo", "falsificabilidad_espuria"],
  "arg_deployment": {
    "personaje": {
      "nombre": "Tarotista",
      "arquetipo": "SHAPESHIFTER",
      "rol": "Oráculo epistémico"
    },
    "obra": {"id": "hola_mundo"}
  }
}
```

### Output: Actor en actores.json
```json
{
  "tarotista": {
    "nombre": "Tarotista",
    "tipo": "personaje",
    "arquetipo": "SHAPESHIFTER",
    "descripcion": "Criterio de demarcación científica",
    "rol": "Oráculo epistémico",
    "plataformas": ["vscode", "email"],
    "monomito": "hola_mundo",
    "origen": {
      "plugin": "agent-creator",
      "agente_base": "yellowflag",
      "fuente_datos": "DISCO/Foro_t8941392/",
      "agente_creado": "tarotista"
    }
  }
}
```

## Sincronización Bidireccional

Cuando se edita un agente que ya está desplegado:

1. Detectar `arg_deployment.deployed === true`
2. Notificar: "Este agente está desplegado como {personaje} en {obra}"
3. Preguntar: "¿Sincronizar cambios al actor?"
4. Si sí: Actualizar campos relevantes en actores.json
5. Registrar en logs

## Handoffs

| Desde | Hacia | Trigger |
|-------|-------|---------|
| crear-agente | auto-deploy | Si usuario confirma despliegue |
| editar-agente | sync-actor | Si arg_deployment.deployed |
| desplegar-en-arg | crear-obra | Si obra no existe |
