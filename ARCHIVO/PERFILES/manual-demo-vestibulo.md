# Manual Demo: Vestíbulo de Cartas-Puerta

> **Propósito**: Este documento muestra cómo dos usuarios —Alice y Bob— usan el vestíbulo para entrar al proyecto Fundación. Cada uno tiene intereses distintos y termina en una puerta diferente.

---

## Escenario

- **Alice**: Estratega política. Le preocupa el poder, los adversarios y cómo el proyecto se defiende de capturas.
- **Bob**: Investigador académico. Valora la evidencia, la falsificabilidad y la utilidad de las afirmaciones.

Ambos abren VS Code con el workspace de Aleph Scriptorium e invocan el prompt `vestibulo-cartas.prompt.md`.

---

## Sesión de Alice (→ Blackflag)

### Turno 1: Bienvenida

**Agente**:
> Bienvenido al proyecto Fundación.
>
> Puedo presentarte el proyecto de dos formas:
>
> 1. **Visión objetiva** — Una descripción neutra del proyecto (método, estructura, estado actual) sin adaptarla a tu perfil.
>
> 2. **Entrada guiada** — Unas preguntas breves para identificar qué valoras más y dirigirte a la presentación que mejor encaje contigo.
>
> ¿Qué prefieres?

**Alice**: La segunda. Quiero ver si este proyecto entiende de qué va la cosa.

---

### Turno 2: Pregunta 1

**Agente**:
> Perfecto. Primera pregunta:
>
> ¿Qué te interesa más de este proyecto?
> - (a) Cómo está construido (método, coherencia, arquitectura)
> - (b) Si las afirmaciones son verificables y útiles
> - (c) Cómo se defiende de adversarios y capturas
> - (d) Si es viable a escala real (recursos, enforcement)

**Alice**: (c). Si no piensa en el enemigo, no me interesa.

---

### Turno 3: Pregunta 2

**Agente**:
> Entendido. Segunda pregunta:
>
> Cuando lees un texto político o teórico, ¿qué te molesta más?
> - (a) Que esté incompleto o sea inconsistente
> - (b) Que no pueda refutarse ni verificarse
> - (c) Que ignore el poder y los enemigos
> - (d) Que no pueda implementarse

**Alice**: (c), obviamente. Los textos que ignoran el poder son papel mojado.

---

### Turno 4: Pregunta 3

**Agente**:
> Tercera pregunta:
>
> ¿Desde qué posición leerías este proyecto?
> - (a) Tutor/evaluador académico
> - (b) Investigador/analista
> - (c) Estratega/activista
> - (d) Gestor/implementador

**Alice**: (c). Vengo de organización política.

---

### Turno 5: Pregunta 4

**Agente**:
> Última pregunta:
>
> ¿Qué esperas encontrar aquí?
> - (a) Un sistema bien diseñado
> - (b) Hipótesis falsificables
> - (c) Análisis de riesgos y sombras
> - (d) Planes ejecutables

**Alice**: (c). Quiero ver si habéis pensado en cómo os destruirían.

---

### Turno 6: Clasificación y carta

**Agente**:
> Tus respuestas: (c), (c), (c), (c).
>
> **Perfil asignado**: `blackflag`
>
> Valoras el análisis del poder, los adversarios y las sombras. Te preocupa que un proyecto ignore quién puede atacarlo y cómo. Eso es exactamente lo que audita nuestro agente @blackflag.
>
> Tu carta-puerta es la del **Maestro que pregunta por el poder**:
>
> ---
>
> *Le escribo para solicitar formalmente su tutela para mi Trabajo de Fin de Grado. El proyecto consiste en la planificación y redacción de un texto de escritura política fundacional, serializado en doce capítulos durante 2026, con formato final tipo Constitución/Contrato/Manifiesto. No lo planteo como un ejercicio de idealismo normativo, sino como una pieza de diseño institucional sometida desde el inicio a un marco de adversario: poder, conflicto, coste represivo y riesgos de captura.*
>
> *[...] La premisa central es que el texto debe anticipar adversarios plausibles —estatales, partidarios, mediáticos y económicos—, así como operaciones de manipulación a escala (posverdad técnica), coerción selectiva, deslegitimación y parasitaje institucional.*
>
> ---
>
> **¿Qué quieres hacer ahora?**
> 1. Leer la carta completa → `ARCHIVO/CARTAS/carta-maestro-blackflag.md`
> 2. Ver el índice de capítulos → `PROYECTOS/FUNDACION/Indice.md`
> 3. Explorar los indicadores de fracaso → `PROYECTOS/FUNDACION/indicadores-fracaso-enero.md`
> 4. Cambiar de puerta (ver otra carta)

**Alice**: Dame los indicadores de fracaso. Quiero ver si tenéis tests de sombra reales.

---

### Turno 7: Cierre

**Agente**:
> He guardado tu ficha en `ARCHIVO/PERFILES/perfil-alice.md`.
>
> Los indicadores de fracaso están en `PROYECTOS/FUNDACION/indicadores-fracaso-enero.md`. Incluyen tests específicos de Blackflag:
> - Test de Pólvora (¿genera represión desproporcionada?)
> - Test de Posverdad Técnica (¿puede manipularse a escala?)
>
> Cuando quieras auditar un capítulo desde la perspectiva del adversario, invoca `@blackflag`.

---

## Sesión de Bob (→ Blueflag)

### Turno 1: Bienvenida

**Agente**:
> Bienvenido al proyecto Fundación.
>
> Puedo presentarte el proyecto de dos formas:
>
> 1. **Visión objetiva** — Una descripción neutra del proyecto (método, estructura, estado actual) sin adaptarla a tu perfil.
>
> 2. **Entrada guiada** — Unas preguntas breves para identificar qué valoras más y dirigirte a la presentación que mejor encaje contigo.
>
> ¿Qué prefieres?

**Bob**: Prefiero la entrada guiada. Quiero ver cómo clasificáis a los lectores.

---

### Turno 2: Pregunta 1

**Agente**:
> Primera pregunta:
>
> ¿Qué te interesa más de este proyecto?
> - (a) Cómo está construido (método, coherencia, arquitectura)
> - (b) Si las afirmaciones son verificables y útiles
> - (c) Cómo se defiende de adversarios y capturas
> - (d) Si es viable a escala real (recursos, enforcement)

**Bob**: (b). Me interesa saber si esto es falsificable o es retórica.

---

### Turno 3: Pregunta 2

**Agente**:
> Segunda pregunta:
>
> Cuando lees un texto político o teórico, ¿qué te molesta más?
> - (a) Que esté incompleto o sea inconsistente
> - (b) Que no pueda refutarse ni verificarse
> - (c) Que ignore el poder y los enemigos
> - (d) Que no pueda implementarse

**Bob**: (b). Si no puedo saber cuándo está equivocado, no es conocimiento.

---

### Turno 4: Pregunta 3

**Agente**:
> Tercera pregunta:
>
> ¿Desde qué posición leerías este proyecto?
> - (a) Tutor/evaluador académico
> - (b) Investigador/analista
> - (c) Estratega/activista
> - (d) Gestor/implementador

**Bob**: (b). Soy investigador en ciencias sociales.

---

### Turno 5: Pregunta 4

**Agente**:
> Última pregunta:
>
> ¿Qué esperas encontrar aquí?
> - (a) Un sistema bien diseñado
> - (b) Hipótesis falsificables
> - (c) Análisis de riesgos y sombras
> - (d) Planes ejecutables

**Bob**: (b). Quiero ver si las tesis tienen criterios de refutación.

---

### Turno 6: Clasificación y carta

**Agente**:
> Tus respuestas: (b), (b), (b), (b).
>
> **Perfil asignado**: `blueflag`
>
> Valoras la evidencia, la falsificabilidad y la utilidad. Te preocupa que un texto haga afirmaciones que no puedan verificarse ni refutarse. Eso es exactamente lo que audita nuestro agente @blueflag.
>
> Tu carta-puerta es la del **Maestro que pregunta por la verdad**:
>
> ---
>
> *Le escribo para solicitar formalmente su tutela de mi Trabajo de Fin de Grado. El TFG consistirá en el diseño y redacción de un proyecto de escritura política fundacional, serializado en 12 capítulos a lo largo de 2026, con ambición de formato Constitución/Contrato/Manifiesto, pero sometido a un criterio central: utilidad pública y verificabilidad metodológica por encima del brillo retórico.*
>
> *[...] Mi objetivo es que cada tesis normativa quede acompañada de hipótesis operativas y criterios de refutación: qué hechos, dinámicas o resultados esperables la confirmarían o la invalidarían, y en qué plazos o umbrales dejaría de ser defendible.*
>
> ---
>
> **¿Qué quieres hacer ahora?**
> 1. Leer la carta completa → `ARCHIVO/CARTAS/carta-maestro-blueflag.md`
> 2. Ver el índice de capítulos → `PROYECTOS/FUNDACION/Indice.md`
> 3. Explorar los indicadores de fracaso → `PROYECTOS/FUNDACION/indicadores-fracaso-enero.md`
> 4. Cambiar de puerta (ver otra carta)

**Bob**: Quiero ver el método. ¿Cómo definís los indicadores de fracaso?

---

### Turno 7: Cierre

**Agente**:
> He guardado tu ficha en `ARCHIVO/PERFILES/perfil-bob.md`.
>
> El método está en `.github/DEVOPS.md` y cada capítulo sigue un proceso de 5 pasos: desplazamiento, repertorio, mecanismo, sacrificio, sombra.
>
> Los indicadores de fracaso incluyen tests específicos de Blueflag:
> - Test de Evidencia (¿se citan fuentes verificables?)
> - Test de Utilidad (¿para quién es útil y cómo se mide?)
> - Test de Falsificabilidad (¿qué lo refutaría?)
>
> Cuando quieras auditar un capítulo desde la perspectiva de la verdad, invoca `@blueflag`.

---

## Fichas generadas

Tras las sesiones, se crean automáticamente estas fichas en `ARCHIVO/PERFILES/`:

### `perfil-alice.md`

```markdown
# Ficha de perfil

| Campo | Valor |
|-------|-------|
| **Identificador** | alice |
| **Fecha** | 2025-12-19 |
| **Perfil** | blackflag |
| **Carta asignada** | ARCHIVO/CARTAS/carta-maestro-blackflag.md |

## Respuestas al cuestionario

| Pregunta | Respuesta |
|----------|-----------|
| Qué te trae | c |
| Qué valoras | c |
| Tu rol | c |
| Qué esperas | c |

## Notas de contexto

Viene de organización política. Enfatiza que un proyecto sin análisis de adversarios es "papel mojado". Interesada en los tests de sombra y los indicadores de fracaso relacionados con poder y represión.
```

### `perfil-bob.md`

```markdown
# Ficha de perfil

| Campo | Valor |
|-------|-------|
| **Identificador** | bob |
| **Fecha** | 2025-12-19 |
| **Perfil** | blueflag |
| **Carta asignada** | ARCHIVO/CARTAS/carta-maestro-blueflag.md |

## Respuestas al cuestionario

| Pregunta | Respuesta |
|----------|-----------|
| Qué te trae | b |
| Qué valoras | b |
| Tu rol | b |
| Qué esperas | b |

## Notas de contexto

Investigador en ciencias sociales. Prioriza la falsificabilidad sobre la retórica. Interesado en el método y en cómo se definen los indicadores de fracaso.
```

---

## Resumen del flujo

```
┌─────────────┐
│  VESTÍBULO  │
│  (prompt)   │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│  ¿Visión objetiva o entrada guiada? │
└──────┬──────────────────────┬───────┘
       │                      │
       ▼                      ▼
┌──────────────┐      ┌───────────────┐
│ Perfil BASE  │      │ Cuestionario  │
│ (4 puertas)  │      │ (4 preguntas) │
└──────────────┘      └───────┬───────┘
                              │
       ┌──────────┬───────────┼───────────┬──────────┐
       ▼          ▼           ▼           ▼          │
  ┌────────┐ ┌────────┐ ┌──────────┐ ┌────────┐      │
  │ ALICE  │ │  BOB   │ │ (otros)  │ │(otros) │      │
  │ black  │ │ blue   │ │  red     │ │ vista  │      │
  └───┬────┘ └───┬────┘ └────┬─────┘ └───┬────┘      │
      │          │           │           │           │
      ▼          ▼           ▼           ▼           │
┌─────────────────────────────────────────────────┐  │
│              ARCHIVO/PERFILES/                  │◀─┘
│  (ficha guardada para próximas sesiones)        │
└─────────────────────────────────────────────────┘
```

---

## Próximos pasos para el usuario

Después de pasar por el vestíbulo, cada usuario puede:

1. **Leer su carta-puerta** completa en `ARCHIVO/CARTAS/`
2. **Explorar el índice** de 12 capítulos en `PROYECTOS/FUNDACION/Indice.md`
3. **Invocar a su agente afín** para auditar borradores:
   - Alice → `@blackflag`
   - Bob → `@blueflag`
4. **Cambiar de puerta** si sus intereses evolucionan
5. **Actualizar su ficha** cuando vuelva al proyecto

---

## Archivos relacionados

| Recurso | Ruta |
|---------|------|
| Prompt del vestíbulo | `.github/prompts/vestibulo-cartas.prompt.md` |
| Instrucciones cartas-puerta | `.github/instructions/cartas-puerta.instructions.md` |
| Cartas | `ARCHIVO/CARTAS/` |
| Perfiles | `ARCHIVO/PERFILES/` |
| Indicadores de fracaso | `PROYECTOS/FUNDACION/indicadores-fracaso-enero.md` |
