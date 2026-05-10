# Sincronizar Cartelera desde obras.json

Este prompt automatiza la actualización de `docs/teatro.md` a partir del estado de obras en ARG_BOARD.

## Trigger

El flujo se activa cuando:
1. Se registra una nueva obra en `obras.json`
2. Se cambia el estado de una obra (registrada → en_escena → clausurada)
3. Se solicita explícitamente la sincronización

## Fuentes de Datos

```
ARCHIVO/PLUGINS/ARG_BOARD/.arrakis/obras.json  →  docs/teatro.md
ARCHIVO/PLUGINS/ARG_BOARD/.arrakis/actores.json  →  (personajes guía)
```

## Algoritmo

```
ENTRADA: obras.json, actores.json

1. LEER obras desde ARCHIVO/PLUGINS/ARG_BOARD/.arrakis/obras.json

2. CLASIFICAR por estado:
   - en_escena: Array de obras activas
   - registrada: Array de obras en cartel
   - clausurada: Array de obras archivadas

3. PARA CADA obra en en_escena:
   - Generar bloque "En Escena" destacado
   - Incluir: título, tipo, duración, descripción, personaje guía, enlace

4. PARA CADA obra en registrada:
   - Generar card en "En Cartel"
   - Incluir: título, tipo, nivel, duración, descripción, personaje guía, enlace

5. PARA CADA obra en clausurada:
   - Generar entrada en "Archivo"
   - Incluir: título, fecha clausura, enlace (solo lectura)

6. ESCRIBIR docs/teatro.md con secciones actualizadas

7. REGISTRAR sincronización en ARCHIVO/PLUGINS/GH_PAGES/published/manifest.json

SALIDA: docs/teatro.md actualizado
```

## Plantilla de Sección "En Escena"

```markdown
## 🎬 En Escena

### {titulo}

<div class="obra-destacada">

**Tipo**: {tipo}  
**Nivel**: {meta.nivel}  
**Duración**: {meta.duracion_estimada}

> {descripcion}

**Personaje guía**: {personaje_guia} ({origen del actor})

[▶️ Ir a la obra](/aleph-scriptorium/teatro/{slug}/)

</div>
```

## Plantilla de Card "En Cartel"

```markdown
### {titulo}

<div class="obra-card">

**Tipo**: {tipo}  
**Nivel**: {meta.nivel}  
**Duración**: {meta.duracion_estimada}

> {descripcion}

**Personaje guía**: {personaje_guia}

[▶️ Ver obra](/aleph-scriptorium/teatro/{slug}/)

</div>
```

## Plantilla de Entrada "Archivo"

```markdown
- **{titulo}** ({fecha_clausura}) - [Ver →](/aleph-scriptorium/teatro/{slug}/)
```

## Inferencia de Datos

| Campo | Fuente | Default |
|-------|--------|---------|
| titulo | obra.titulo | obra.id (capitalizado) |
| slug | obra.id (kebab-case) | — |
| tipo | obra.tipo | "original" |
| descripcion | obra.descripcion | "Sin descripción" |
| personaje_guia | obra.actores[0] + actores.json | "Sin guía" |
| duracion | obra.meta.duracion_estimada | "Variable" |
| nivel | obra.meta.nivel | "intermedio" |

## Ejemplo de Ejecución

### Input: obras.json
```json
{
  "camino_del_tarotista": {
    "titulo": "El Camino del Tarotista",
    "tipo": "onboarding",
    "estado": "en_escena",
    "actores": ["tarotista"],
    "meta": {"duracion_estimada": "2-3 horas", "nivel": "introductorio"}
  },
  "hola_mundo": {
    "titulo": "Hola Mundo",
    "tipo": "laboratorio",
    "estado": "registrada",
    "actores": ["tarotista"]
  }
}
```

### Output: docs/teatro.md (secciones)
```markdown
## 🎬 En Escena

### El Camino del Tarotista
...

## 📋 En Cartel

### Hola Mundo
...
```

## Validaciones

- [ ] obras.json existe y es válido
- [ ] Cada obra tiene al menos: id, titulo, estado
- [ ] Actores referenciados existen en actores.json
- [ ] docs/teatro.md existe (o se crea)

## Handoffs

| Desde | Hacia | Trigger |
|-------|-------|---------|
| @aleph | sync-cartelera | "Sincroniza la cartelera" |
| teatro-instalar-obra | sync-cartelera | Después de registrar obra |
| teatro-ejecutar-obra | sync-cartelera | Después de poner en escena |
