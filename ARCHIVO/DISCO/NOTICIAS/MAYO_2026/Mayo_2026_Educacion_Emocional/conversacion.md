# Conversación Editorial — Cobertura de evento (refactor v2)

**Fecha**: 2026-05-01  
**Evento cubierto**: conferencia «Las falsas promesas de la educación emocional», por A. Pérez  
**Encuadre**: cobertura de evento + contraste con informe basal del Scriptorium  
**Estado**: listo para publicar

---

## Apertura

**Aleph**: Sesión de redacción. La pieza original era un análisis temático genérico. La rehacemos como **cobertura de evento**: la noticia ya no es «la educación emocional es problemática», sino «se ha producido esta conferencia, esto dijo, así contrasta con nuestro basal».

**Alice (Editora)**: Perfecto. Antes de teoría, ficha del evento. Bob, ¿qué tenemos como dato firme y qué falta?

---

## Fase 1 — Ficha del evento (5W comprimidas)

**Bob (Escritor)**:

| 5W | Dato firme | No consta |
|----|------------|-----------|
| **Quién** | Ponente A. Pérez (apellido en `sesion-A-PEREZ`); referente criticado: Rafael Bisquerra | Nombre completo de la ponente |
| **Qué** | Conferencia titulada «Las falsas promesas de la educación emocional» — crítica interna al paquete dominante | — |
| **Dónde** | Unas jornadas anuales («año a año unas jornadas que sirven para formarse y organizarse») | Ciudad, sala, organización convocante |
| **Cuándo** | Procesamiento ASR: 2026-04-30 | Fecha exacta de impartición |
| **Por qué** | Posición política declarada al cierre: «como comunistas y organizarnos para ello» | — |

**Alice**: Bien. La regla periodística aquí es **declarar lo que falta**, no inventar. Y ofrecer pistas para verificación externa.

---

## Fase 2 — Pistas para verificación externa

**Aleph**: El corpus permite construir cadenas de búsqueda específicas:

- `"falsas promesas de la educación emocional" Pérez`
- `crítica Bisquerra "educación emocional" Pérez conferencia`
- `"educación emocional" Canarias asignatura obligatoria primaria pionera`
- `jornadas formación comunista educación emocional 2024..2026`

Posibles archivos: canales YouTube de organizaciones comunistas españolas con sección de formación; revistas de pedagogía crítica; archivos de jornadas universitarias.

**Bob**: Esto va en la propia plana, en su sección. No por exceso de transparencia: por **higiene de fuente**.

---

## Fase 3 — «Se ha producido este evento»

**Bob**: Narrativa de entrada:

- ha entrado en el archivo del Scriptorium, vía Document Machine, la transcripción íntegra de la conferencia;
- duración ~48 min, conferencia plenaria con tesis sostenida y cierre político explícito;
- la ponente nombra a Bisquerra, distingue críticas externas e internas, desarrolla cuatro críticas internas, y cierra con caracterización en cuatro adjetivos (irracionalismo, despolitización, voluntarismo impotente, represión);
- el evento llega con un **informe basal previo** del Scriptorium sobre el mismo tema. La pieza contrasta ambos.

**Alice**: Esa es la bisagra. El lector entra por el evento, no por la teoría.

---

## Fase 4 — Cuerpo en tres bloques

**Aleph**: Estructura acordada:

1. **Lo que ya teníamos**: el informe basal (genealogía crítica, tres capas: expansión, debate de fundamentos, implicaciones sociológicas, puerta abierta a IE crítica emancipadora).
2. **Lo que aporta la conferencia**: ocho unidades argumentativas U01–U08, ya segmentadas en `pasadas/000_unidades-argumentativas.md`. Se sintetiza cada unidad en 3–6 líneas.
3. **Contraste Scriptorium ↔ Pérez** (Bartleby):
   - `CONFIRMA`: expansión, fundaciones, Canarias, individualización.
   - `DISCREPA`: basal deja puerta a IE crítica → Pérez la cierra.
   - `EVOLUCIONA`: eje genealógico → eje interno.
   - `NUEVO`: centralidad de Bisquerra, autonomía normativa de la razón, empatía como filtro egocentrado, cierre comunista.

**Alice**: Y al cerrar Bartleby, **no forzamos síntesis**. La discrepancia se registra. La síntesis es de quien lea.

---

## Fase 5 — Auditoría de Banderas

**Aleph**: Aplicada al evento, no al tema en abstracto.

- 🔵 **Verdad**: la fuente es ASR con errores identificados; la pieza usa arquitectura argumental, no citas literales dudosas. Lo no verificable internamente (fecha, lugar, organización convocante, nombre completo) queda **declarado como faltante**.
- ⚫ **Poder**: quien define qué emoción regular, gobierna qué conductas se patologizan. Pérez nombra actores concretos (Bisquerra, Botín, Telefónica, administraciones) sin personalismo.
- 🔴 **Material**: tabla de equivalencias problema material → traducción emocional. La crítica de Pérez explicita el **abaratamiento político** de la respuesta.
- 🟡 **Límites**: Pérez no defiende una escuela sin emociones. Distingue atender la dimensión afectiva del paquete dominante.
- 🟠 **Registro**: crónica analítica de evento, no panfleto. Se respeta el cierre político sin adoptarlo como conclusión del Scriptorium.

---

## Fase 6 — Tesis (no-síntesis)

**Alice**: La tesis no concluye el debate, registra el desplazamiento:

> La conferencia de A. Pérez desplaza el debate de las **condiciones de aplicación** a los **fundamentos de la propuesta**. Donde el basal veía tecnología de gubernamentalidad **reformable**, la ponente sostiene que el paquete **no es reformable**, solo desechable.

**Bob**: Mecanismo: un conflicto material entra en el aula como sufrimiento social y sale como tarea individual de regulación.

**Aleph**: La pieza se publica como **registro del evento** y como **bisagra entre dos lecturas**, no como veredicto.

---

## Cierre y trazabilidad

- Plana publicada: `ARCHIVO/NOTICIAS/S00-T000-2026-05-conferencia-perez-falsas-promesas-educacion-emocional.md`
- Carpeta DISCO: `ARCHIVO/DISCO/Mayo_2026_Educacion_Emocional/`
- Pasadas y unidades argumentativas: `onfalo-asesor-sdk/PROYECTOS/ESCRIBIENTE_TESTLAB/pasadas/`
- Código Scrum: `S00-T000` (provisional, no canónico)

**Próxima pasada sugerida**: cotejo externo de los datos del evento (fecha, lugar, organización, nombre completo de la ponente) para versión `S00-T000-v2` o ticket Scrum real.
