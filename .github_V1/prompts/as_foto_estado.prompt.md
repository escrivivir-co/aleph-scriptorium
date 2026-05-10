````prompt
# Prompt: Foto de estado + discurso motivacional (Sprint)

## Instrucción para el agente

Eres el agente principal del workspace (Aleph). Debes producir una **comprensión del estado del proyecto** y un **discurso motivacional** que anime al equipo a sostener el año de trabajo.

Este proyecto opera con dos opportunities:
- **Aleph Scriptorium** (`.github/`): herramientas, agentes, prompts e instrucciones.
- **Fundación** (`ARCHIVO/`, `PROYECTOS/FUNDACION/`): texto fundacional serializado.

Tu salida debe estar **anclada** en lo que exista en el repositorio: no inventes avances, capítulos, decisiones o métricas que no estén reflejados en los archivos.

---

## Inputs (rellenar por el usuario o inferir del repo)

- **Fecha**: {{FECHA}}
- **Sprint**: {{SPRINT}} (p. ej. 0)
- **Iteración**: {{ITERACION}} (p. ej. 0.0.1-S03)
- **Audiencia**: {{AUDIENCIA}} (equipo / lectores / comunidad)
- **Tono**: voz Escrivivir + “voz manifiesto” del repo

---

## Fuentes mínimas a consultar (obligatorio)

Lee antes de escribir:
- `README.md`
- `.github/DEVOPS.md`
- `.github/BACKLOG-SCRIPTORIUM.md`
- ARCHIVO/DISCO/BACKLOG_ARCHIVADOS
- ARCHIVO/DISCO/BACKLOG_BORRADORES
- `PROYECTOS/FUNDACION/BACKLOG-FUNDACION.md`
- `PROYECTOS/FUNDACION/Indice.md`

Opcional (si existe y aporta):
- Borradores ya iniciados en `PROYECTOS/FUNDACION/CAPITULOS/`
- Un texto de “indicadores de fracaso” del sprint vigente
- Si tienes acceso, visita `https://escrivivir.co/` para recordar su marco (“herramienta para escribir” + “texto escrito con la herramienta”) y su mezcla de cultura/sociedad/ecología.

---

## Reglas de estilo (obligatorio)

### Voz y estilo
- Escribe en **español**.
- Combina **ensayo** y **pulso literario**: una imagen o analogía solo si empuja una tesis.
- Prefiere **párrafos con respiración** (no listas interminables).
- Alterna:
  - una frase de tensión (diagnóstico),
  - una frase de corte (tesis),
  - una frase de salida (propuesta).

### Retórica permitida (y cómo usarla)
- Preguntas retóricas: solo para introducir una decisión o un dilema real.
- Binarios (luz/sombra, resistencia/fuerza): como brújula, no como simplificación.
- Nombres propios y ejemplos contemporáneos: con prudencia; evitar el “catálogo de nombres” como sustituto del argumento.

### Disciplina conceptual
- No moralices: traduce el juicio en **incentivos**, **asimetrías**, **capturas**, **mecanismos**.
- Cada concepto nuevo debe aterrizar en una regla: “si X, entonces Y”.
- Evita la grandilocuencia vacía; si una frase suena “a lema”, reescríbela como decisión.

### Cierre de sección
- Termina secciones con un “cierre de tensión”: qué queda por decidir, qué costo tiene, qué abre.

## Estructura

- Ensayo con pulso literario: imagen solo si empuja una tesis.
- Evita moralina; traduce juicio en **mecanismos** (incentivos, capturas, defensas, asimetrías).
- Alterna: tensión (diagnóstico) → corte (tesis) → salida (propuesta).
- Evita grandilocuencia vacía: si suena a lema, reescribe como decisión.

---

## Tarea

Produce dos piezas:

### A) Comprensión del estado (foto de situación)
Incluye, en este orden:
1. **Qué hemos hecho** (5–8 bullets): hechos verificables desde los backlogs/índices.
2. **Qué tenemos por delante** (4–7 bullets): lo inmediato (cerrar el sprint) + lo largo (12 sprints, 48 iteraciones).
3. **Cuáles son los cimientos** (3–6 bullets): arquitectura del repo, protocolo DevOps, método de capítulo, disciplina conceptual.
4. **Cuáles son los retos** (4–7 bullets): riesgos reales que pueden romper el proyecto (coherencia anual, deriva a manual/moralina, ausencia de “sacrificio/sombra”, etc.).

Constraints:
- No re-copies textos largos del repo; sintetiza.
- No introduzcas “features” nuevas (páginas, artefactos, herramientas) que no estén planteadas.


### B) Discurso motivacional (marco Escrivivir)
Redacta un discurso breve (250–450 palabras) que:
- Reconozca el peso del año (12 meses, 48 iteraciones) sin épica falsa.
- Nombre el propósito doble: **construir herramienta** (Scriptorium) y **escribir obra** (Fundación).
- Ponga en valor el método: desplazamiento → repertorio → mecanismo → sacrificio → sombra.
- Cierre con una **llamada concreta al trabajo** (3 acciones inmediatas para la próxima iteración).

---

## Formato de salida

Entrega en Markdown con estos encabezados exactos:

- `## Comprensión del estado`
- `## Discurso motivacional`
- `## Próximos 3 movimientos`

---

## Almacenamiento del informe

Una vez generado el informe, guárdalo en:

```
ARCHIVO/FOTOS_ESTADO/{YYYY-MM-DD}_Sprint{N}_{Descriptor}.md
```

**Convención de nombres**:
- `YYYY-MM-DD`: Fecha ISO-8601 (ej. `2025-12-21`)
- `Sprint{N}`: Número de sprint (ej. `Sprint0`, `Sprint1`)
- `{Descriptor}`: Identificador breve del sprint (ej. `Bootstrap`, `Anacronismo`, `Automata`)

**Ejemplos válidos**:
- `2025-12-21_Sprint0_Bootstrap.md` — Foto de cierre Sprint 0
- `2026-01-31_Sprint1_Anacronismo.md` — Foto de cierre Sprint 1 (Capítulos 1-4)
- `2026-02-28_Sprint2_Actores.md` — Foto de cierre Sprint 2

**Instrucción para el agente**:
1. Genera el informe según las instrucciones previas
2. Guarda el archivo en `ARCHIVO/FOTOS_ESTADO/` con el nombre conforme
3. Actualiza la sección "Status (para visitantes)" en `README.md` (ver abajo)
4. Informa al usuario de ambas rutas modificadas

---

## Actualización del README.md

Después de generar y guardar el informe, actualiza la sección **Status (para visitantes)** en el archivo `README.md` (líneas ~15-28).

### Qué actualizar

**Tabla de status**:
```markdown
| | |
|---|---|
| **Fecha** | {{FECHA}} |
| **Sprint** | {{SPRINT}} ({{Descriptor}}) |
| **Ciclo previsto** | 12 sprints × 4 iteraciones = 48 iteraciones (2026) |
```

**Párrafo de estado** (después de "Estado detallado (DRY)"):
- Sintetiza el estado actual en 1-2 frases basándote en la "Comprensión del estado" del informe
- Mantén el tono sobrio y orientado a visitantes externos
- Ejemplo: *"Este repositorio está en fase de **arranque controlado**: se prioriza dejar un método repetible (Scriptorium) y una base doctrinal sólida (ARCHIVO) antes de acelerar la producción del texto serializado (Fundación)."*

### Qué NO modificar

- Enlaces a backlogs
- Tabla de "Si eres..." (puertas de entrada)
- Estructura general del README

### Ejemplo de cambio

**Antes** (Sprint 0):
```markdown
| **Fecha** | 2025-12-21 |
| **Sprint** | 0 (Bootstrap) |

Este repositorio está en fase de **arranque controlado**: [...]
```

**Después** (Sprint 1):
```markdown
| **Fecha** | 2026-01-31 |
| **Sprint** | 1 (Anacronismo) |

Este repositorio ha completado el bootstrap y está en producción activa del Sprint 1: redacción de los capítulos 1-4 con auditoría de las 5 banderas.
```

### Instrucción para el agente

1. Lee la sección Status actual en `README.md`
2. Actualiza la fecha y el sprint en la tabla
3. Reescribe el párrafo de estado basándote en la foto generada
4. Usa `replace_string_in_file` para hacer el cambio
5. Informa al usuario de la actualización realizada

---

## Publicación en Galería Web (GH-Pages)

Después de guardar el informe en `ARCHIVO/FOTOS_ESTADO/`, publícalo en la galería web del roadmap.

### Ubicación de la galería

**Archivo**: `docs/roadmap.md`  
**Sección**: `<!-- GALERÍA DE FOTOS DE ESTADO -->`  
**URL pública**: `https://escrivivir-co.github.io/aleph-scriptorium/roadmap/#galeria-fotos`

### Formato de entrada en la galería

Cada foto de estado se representa como una card en la galería:

```html
<div class="foto-card">
  <div class="foto-header sprint-N">
    <span class="foto-icon">📸</span>
    <span class="foto-date">YYYY-MM-DD</span>
  </div>
  <div class="foto-body">
    <h4>Sprint N: {Descriptor}</h4>
    <p class="foto-summary">{Resumen de 1-2 líneas extraído de "Qué hemos hecho"}</p>
    <div class="foto-metrics">
      <span class="metric">✅ {N} tasks</span>
      <span class="metric">📦 {N} plugins</span>
      <span class="metric">🤖 {N} agentes</span>
    </div>
    <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/ARCHIVO/FOTOS_ESTADO/{filename}.md" class="foto-link">Ver foto completa →</a>
  </div>
</div>
```

### Instrucción para el agente

1. Lee la sección `<!-- GALERÍA DE FOTOS DE ESTADO -->` en `docs/roadmap.md`
2. Añade una nueva card al inicio de la galería (orden cronológico inverso: más reciente primero)
3. Extrae métricas de la foto generada (tasks, plugins, agentes)
4. Usa `replace_string_in_file` para insertar la nueva card
5. Informa al usuario de la URL pública de la galería

### Ejemplo de galería

```html
<!-- GALERÍA DE FOTOS DE ESTADO -->
<div class="fotos-gallery">
  <!-- Más reciente primero -->
  <div class="foto-card">
    <div class="foto-header sprint-1">
      <span class="foto-icon">📸</span>
      <span class="foto-date">2025-12-22</span>
    </div>
    <div class="foto-body">
      <h4>Sprint 1: Teatro Interactivo</h4>
      <p class="foto-summary">7 plugins operativos, 34 agentes, visualizador 3D con impress.js</p>
      <div class="foto-metrics">
        <span class="metric">✅ 58 tasks</span>
        <span class="metric">📦 7 plugins</span>
        <span class="metric">🤖 34 agentes</span>
      </div>
      <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/ARCHIVO/FOTOS_ESTADO/2025-12-22_Sprint1_TeatroInteractivo.md" class="foto-link">Ver foto completa →</a>
    </div>
  </div>
</div>
```

---

## Autocontrol (antes de responder)

Verifica:
- ¿He dicho algo que no esté sustentado por archivos? Si sí, bórralo o marca incertidumbre.
- ¿He convertido al menos 2 juicios en mecanismos? (incentivos, defensas, reglas “si X, entonces Y”).
- ¿He incluido sacrificio y sombra como disciplina, no como adorno?

````
