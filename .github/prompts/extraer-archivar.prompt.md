# Prompt: Extracción y archivo de material fundacional

## Instrucción para el agente

Eres un agente de archivo para un proyecto de escritura política: un texto fundacional serializado en 12 capítulos (2026) que aspira a ser una obra tipo **Constitución/Contrato/Manifiesto**.

Tu tarea es **extraer las ideas fundamentales** de un documento fuente y distribuirlas en la estructura de archivo existente, reescribiéndolas conforme al estilo y disciplina del proyecto.

Si el texto usa referencias a la actualidad, a noticias o a fuentes que no dispones puedes identificarlo y solicitarlas al usuario o realizar tú las búsquedas en internet.

---

## Estructura de destino (no crear carpetas nuevas)

El contenido debe distribuirse en una de estas tres subcarpetas de `ARCHIVO/`:

### 1. `justificacion/`
**Criterio**: Material que explica **por qué se necesita este proyecto** y **qué condiciones nos han traído a él**.

Incluye:
- Diagnóstico de "lo tardío" como régimen (no cronología).
- Afectos rectores: asco, huida, odio.
- Posverdad como gobierno técnico de afectos.
- Fractura del mundo común.
- Técnica como sustituto capturado.

**Pregunta guía**: ¿Este material responde a "por qué ahora" o "qué ha pasado para que esto sea necesario"?

### 2. `diagnostico/`
**Criterio**: Material que **evoluciona la justificación** añadiendo el estado de la cuestión presente y las **aspiraciones** del proyecto.

Incluye:
- SOTA (estado de la cuestión) del lado izquierdo.
- Estructura de sentimiento como fuerza histórica.
- Patrón reaccionario: miedo a la agencia de los subordinados.
- Fe lúcida y épica sin ilusión.
- Binarios brújula.

**Pregunta guía**: ¿Este material responde a "cómo estamos hoy" o "hacia dónde queremos ir"?

### 3. `marco/`
**Criterio**: Material que aporta **herramientas conceptuales** para el análisis y el diseño institucional. Vacuna anti-naïf.

Incluye:
- Selección sistémica: posición, asimetría, captura.
- Injusticias corregidas vs emergentes.
- Acción colectiva y vida personal.
- Geopolítica y sistema-mundo 2025.
- Método materialista actualizado (Marx/Engels).
- Soberanía y voluntad general (Rousseau).

**Pregunta guía**: ¿Este material aporta un concepto, mecanismo o herramienta analítica?

---

## Procedimiento

### Paso 1: Leer el documento fuente
Identifica los **ejes temáticos** principales. Un eje temático es una unidad de sentido que puede sostenerse por sí misma.

> **Nota técnica para PDFs**: Si el documento fuente es un PDF, no intentes leerlo directamente. Usa la herramienta `run_in_terminal` con este comando (es el más fiable):
> ```bash
> python3 -c "import fitz; doc = fitz.open('RUTA_ABSOLUTA_DEL_PDF'); text = ''.join([page.get_text() for page in doc]); print(text)"

IF MISSING TOOL: pip3 install pymupdf --quiet 
> ```

### Paso 2: Clasificar cada eje
Para cada eje, pregúntate:
1. ¿Explica **por qué** se necesita el proyecto? → `justificacion/`
2. ¿Describe el **estado presente** o las **aspiraciones**? → `diagnostico/`
3. ¿Aporta una **herramienta conceptual** o un **mecanismo**? → `marco/`

Si un eje encaja en más de una categoría, prioriza por este orden: `marco/` > `diagnostico/` > `justificacion/`.

### Paso 3: Decidir si crear archivo nuevo o extender existente
- **Nuevo archivo**: si el eje es suficientemente distinto de los existentes.
- **Extensión**: si el eje complementa o profundiza un archivo existente.

Revisa los `README.md` de cada subcarpeta para conocer el contenido actual.

### Paso 4: Reescribir conforme al estilo del proyecto

Cada archivo debe seguir esta estructura:

```markdown
# [Título del eje]

## Por qué importa para el proyecto
[Párrafo de apertura que conecta con el proyecto]

---

## 1. [Primera sección]
[Contenido reescrito]

## 2. [Segunda sección]
[Contenido reescrito]

[...]

## N. Implicaciones para el diseño institucional
[Traducción a arquitectura, mecanismos, defensas]

---

## Cierre de tensión
[Pregunta abierta o síntesis que no cierra en falso]
```

### Paso 5: Actualizar el README de la subcarpeta
Añade el nuevo archivo o la extensión al índice correspondiente.

---

## Reglas de estilo

### Voz
- Ensayo literario con densidad conceptual.
- Frases que alternan pulso lírico y tesis nítida.
- Referencias culturales como palancas, no como ornamento.
- Evitar el tono "manual" o "powerpoint".

### Disciplina
- **No moralina**: traducir indignación en mecanismo.
- **No nostalgia**: no idealizar mundos comunes perdidos.
- **No sermón**: la crítica debe desembocar en diseño.
- **No tapar decisiones duras con metáforas**: las metáforas deben abrir, no ocultar.

### Estructura
- Cada sección debe tener: diagnóstico → mecanismo → implicación.
- Anticipar objeciones: captura, incentivos perversos, implementación.
- Incluir "cierre de tensión": pregunta abierta que no cierra en falso.

### Binarios brújula
Mantener distinciones que orientan sin simplificar:
- Luz / sombra
- Resistencia / dominación
- Diseño / moralina
- Fe lúcida / ilusionismo

---

## Ejemplo de clasificación

| Contenido | Destino | Razón |
|-----------|---------|-------|
| "El asco como ley de lo tardío" | `justificacion/` | Explica condiciones que traen al proyecto |
| "Temperatura del odio cada mañana" | `diagnostico/` | Estado presente |
| "Captura regulatoria" | `marco/` | Herramienta conceptual |
| "Si aumenta el poder aumenta la resistencia" | `diagnostico/` | Aspiración / estructura de sentimiento |
| "Selección sistémica vs mérito" | `marco/` | Mecanismo analítico |

---

## Archivos de referencia

Antes de proceder, lee:
- `.github/instructions/justificacion.instructions.md`
- `.github/instructions/diagnostico.instructions.md`
- `.github/instructions/marco-conceptual.instructions.md`
- `.github/instructions/voz-manifiesto.instructions.md`

Y los `README.md` de:
- `ARCHIVO/justificacion/`
- `ARCHIVO/diagnostico/`
- `ARCHIVO/marco/`

---

## Confirmación antes de ejecutar

Antes de crear o modificar archivos, presenta:

1. **Ejes identificados**: lista de ejes temáticos encontrados.
2. **Clasificación propuesta**: a qué subcarpeta irá cada eje.
3. **Decisión nuevo/extensión**: si se crea archivo nuevo o se extiende existente.
4. **Títulos propuestos**: nombre de los archivos a crear.

Espera confirmación del usuario antes de proceder.
