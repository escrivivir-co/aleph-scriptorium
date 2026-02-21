# Crear Proyecto

Crea un nuevo proyecto ONFALO-compatible con `proyecto.config.md`.

## Quick Usage

```
/crear-proyecto {nombre}
```

Genera la estructura completa del proyecto en `ARCHIVO/DISCO/CONSEJO/{nombre}/` con un `proyecto.config.md` interactivo.

## What It Creates

```
ARCHIVO/DISCO/CONSEJO/{nombre}/
├── proyecto.config.md
├── LABORATORIO/
├── PRODUCCIONES/
│   ├── INPUT/
│   └── OUTPUT/
└── sesiones/
```

---

<details>
<summary><strong>Full Documentation</strong> (click to expand)</summary>

## proyecto.config.md Structure

El asistente guia al usuario para rellenar cada seccion:

```yaml
# Identidad
nombre: ""
descripcion: ""
idioma: "es"
genero: ""

# La Voz (alimenta a @protagonista)
voz:
  nombre: ""
  posicion: ""
  biografia: ""
  ejes: []
  influencias: []
  paradojas: []
  puntos-ciegos: []

# Antagonistas (5 posiciones de tension)
antagonistas:
  racionalista:
    modelo: ""
    desafio-central: ""
    tensiones: []
  aceleracionista:
    modelo: ""
    desafio-central: ""
    tensiones: []
  pesimista:
    modelo: ""
    desafio-central: ""
    tensiones: []
  estructuralista:
    modelo: ""
    desafio-central: ""
    tensiones: []
  integralista:
    modelo: ""
    desafio-central: ""
    tensiones: []

# Corpus
corpus:
  descripcion: ""
  rutas: []
  output:
    ruta: "PRODUCCIONES/"
    convencion: "{tipo}_{fecha}_{slug}.md"

# Vocabulario
vocabulario:
  terminos: []
  personajes: []
  lugares: []

# Estilo
estilo:
  voz: ""
  parrafo-modelo: ""
  patrones-prohibidos: []
```

## Guided Flow

1. Preguntar nombre y descripcion del proyecto
2. Definir la Voz: posicion filosofica, influencias, paradojas
3. Para cada antagonista: modelo intelectual, desafio central, tensiones con la voz
4. Definir corpus: rutas de materiales, convencion de nombrado
5. Vocabulario: terminos clave, personajes, lugares
6. Estilo: voz narrativa, parrafo modelo, patrones prohibidos
7. Crear estructura de carpetas
8. Guardar `proyecto.config.md`

## Template Source

Usa la plantilla en `ARCHIVO/PLUGINS/CONSEJO_ASESOR/plantillas/proyecto.plantilla.md`.

</details>
