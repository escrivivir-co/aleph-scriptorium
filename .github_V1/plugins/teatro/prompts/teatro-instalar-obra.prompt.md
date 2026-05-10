---
mode: 'agent'
description: 'UC2: Registra una obra en cartelera (ARG_BOARD + GH-PAGES)'
tools: ['read', 'edit', 'agent']
---

# Instalar Obra en Cartelera

Registra una obra generada en el sistema de teatro para que sea visible en la cartelera pública.

## Entrada

- **ID de obra** o **ruta al YAML**: Identificador de la obra a instalar

## Proceso

### 1. Leer YAML de la Obra

```
ARCHIVO/PLUGINS/TEATRO/obras/{id}.yaml
```

Extraer: id, titulo, tipo, personaje_guia, descripcion, estadios, meta

### 2. Verificar Personaje Guía

Leer actores.json:
```
ARCHIVO/PLUGINS/ARG_BOARD/.arrakis/actores.json
```

**Si el personaje NO existe**:

1. Informar al usuario:
   > "El personaje '{personaje_guia}' no existe. ¿Deseas crearlo?"

2. Si acepta, delegar a AGENT_CREATOR:
   ```
   @plugin_ox_agentcreator crear-agente
   - nombre: {personaje_guia}
   - base: yellowflag (u otro según tema)
   - descripcion: "Guía de la obra {titulo}"
   ```

3. Una vez creado, el agente se registra automáticamente como actor

**Si el personaje SÍ existe**: Continuar

### 3. Registrar en obras.json

Leer y actualizar:
```
ARCHIVO/PLUGINS/ARG_BOARD/.arrakis/obras.json
```

Añadir entrada:

```json
{
  "id": "{id}",
  "titulo": "{titulo}",
  "tipo": "{tipo}",
  "estado": "en_cartel",
  "etapa_actual": 0,
  "actores": ["{personaje_guia}"],
  "estadios_total": 12,
  "meta": {
    "origen": "teatro",
    "yaml": "ARCHIVO/PLUGINS/TEATRO/obras/{id}.yaml",
    "instalado": "{YYYY-MM-DDTHH:mm:ssZ}",
    "nivel": "{meta.nivel}",
    "duracion": "{meta.duracion_estimada}"
  }
}
```

### 4. Actualizar Cartelera Web

Leer y actualizar `docs/teatro.md`:

Si el archivo no existe, crearlo con estructura base.

Añadir card de la obra en sección "En Cartel":

```markdown
### {titulo}

> **Tipo**: {tipo} | **Nivel**: {nivel} | **Duración**: {duracion}

{descripcion}

**Personaje guía**: {personaje_guia}

[Ver obra →](teatro/{id}/)
```

### 5. Crear Directorio de Obra

Crear carpeta (vacía por ahora, se poblará en UC3):
```
docs/teatro/{id}/
```

### 6. Log de Instalación

Registrar en:
```
ARCHIVO/PLUGINS/TEATRO/logs/instalaciones.json
```

```json
{
  "obra_id": "{id}",
  "accion": "instalar",
  "timestamp": "{ISO}",
  "resultado": "exito",
  "detalles": {
    "personaje_existia": true/false,
    "personaje_creado": true/false
  }
}
```

### 7. Commit

Generar mensaje de commit:

```
feat(teatro): instalar obra "{titulo}" en cartelera

- Registrada en obras.json con estado "en_cartel"
- Añadida entrada en docs/teatro.md
- Personaje guía: {personaje_guia}

refs #SCRIPT-1.0.0-T027
```

## Salida

1. Confirmación de instalación:
   ```
   ✅ Obra "{titulo}" instalada correctamente
   
   📍 Estado: en_cartel
   🎭 Personaje: {personaje_guia}
   📄 Cartelera: docs/teatro.md
   📁 Directorio: docs/teatro/{id}/
   ```

2. Preguntar siguiente acción:
   > "¿Deseas poner la obra en escena ahora? Esto generará la página interactiva y la publicará."

Si acepta, invocar `teatro-ejecutar-obra.prompt.md`.

## Validaciones

- [ ] El YAML existe y es válido
- [ ] El ID no está ya en obras.json
- [ ] El personaje existe o se puede crear
- [ ] docs/teatro.md es escribible

## Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| "YAML no encontrado" | Ruta incorrecta | Verificar ID o generar obra primero |
| "Obra ya instalada" | ID duplicado | Usar otro ID o desinstalar primero |
| "Personaje no creado" | AGENT_CREATOR falló | Crear manualmente y reintentar |
| "Cartelera no actualizada" | docs/teatro.md no existe | Crear archivo base primero |

## Rollback

Si la instalación falla parcialmente:

1. Eliminar entrada de obras.json (si se añadió)
2. Revertir docs/teatro.md (si se modificó)
3. Eliminar directorio docs/teatro/{id}/ (si se creó)
4. Log del error en instalaciones.json
