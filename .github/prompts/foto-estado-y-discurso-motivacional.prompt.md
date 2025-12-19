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
- `PROYECTOS/FUNDACION/BACKLOG-FUNDACION.md`
- `PROYECTOS/FUNDACION/Indice.md`

Opcional (si existe y aporta):
- Borradores ya iniciados en `PROYECTOS/FUNDACION/CAPITULOS/`
- Un texto de “indicadores de fracaso” del sprint vigente
- Si tienes acceso, visita `https://escrivivir.co/` para recordar su marco (“herramienta para escribir” + “texto escrito con la herramienta”) y su mezcla de cultura/sociedad/ecología.

---

## Reglas de estilo (obligatorio)

Sigue `voz-manifiesto.instructions.md`:
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

## Autocontrol (antes de responder)

Verifica:
- ¿He dicho algo que no esté sustentado por archivos? Si sí, bórralo o marca incertidumbre.
- ¿He convertido al menos 2 juicios en mecanismos? (incentivos, defensas, reglas “si X, entonces Y”).
- ¿He incluido sacrificio y sombra como disciplina, no como adorno?

````
