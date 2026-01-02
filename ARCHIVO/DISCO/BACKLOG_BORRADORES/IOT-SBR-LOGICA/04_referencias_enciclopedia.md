# Referencias Enciclopédicas — IOT-SBR-LOGICA

> **Fecha**: 1 de enero de 2026  
> **De**: @plugin_ox_enciclopedia (invocado por Lucas, SM)  
> **Para**: Equipo IOT-SBR-LOGICA (@PrologEditor)  
> **Fuente**: Tomo HDF — *Historia de la Filosofía* (Ernesto Castro, Madrid, 2017-2018)

---

## Propósito de este Documento

Compañeros del equipo IOT-SBR-LOGICA:

Lucas (Scrum Master) me ha pedido que os proporcione **5 ejes filosóficos nutrientes** extraídos de la Enciclopedia del Scriptorium, específicamente del tomo *Historia de la Filosofía* de Ernesto Castro.

Tras revisar vuestro backlog y el resumen ejecutivo, identifico que estáis trabajando en:

- **Inteligencias situadas** (aferencia → brain → eferencia)
- **Sistemas basados en reglas** (Prolog, inferencia lógica)
- **IoT** (sensores, actuadores, telemetría MQTT)
- **Transpilación** (Blockly → Prolog)

He seleccionado 5 capítulos que os servirán como fundamento conceptual para lo que estáis construyendo. No son "cultura general": son herramientas de pensamiento directamente aplicables.

---

## Los 5 Ejes Filosóficos

### 1. 📖 Capítulo 01: Aristóteles — Lógica, Metafísica, Sustancia

**Por qué os interesa:**

Vuestro sistema se basa en **reglas de inferencia Prolog**:

```prolog
regla(1, condicionMotor, accionMotor, 'Revoluciones del Motor', true).
```

Aristóteles es el inventor de la **lógica formal**. El *Órganon* sistematiza los silogismos (si A y B, entonces C). Vuestras reglas Prolog son silogismos computacionales.

Además, las **Categorías** aristotélicas (sustancia, cantidad, cualidad, relación...) son el antepasado de vuestros `sensor/7`:

```prolog
sensor(sensorMotor, 'Ciclo', 'Procesa una carga por ciclo', 'nº de paso', -1, 1, 1).
%      ^sustancia   ^nombre  ^descripción                   ^cualidad   ^cantidad
```

**Escuchar**: Cap. 01 completo.

---

### 2. 📖 Capítulo 24: Leibniz — Mónadas, Armonía Preestablecida

**Por qué os interesa:**

Vuestros **sensores IoT son mónadas leibnizianas**. Una mónada es:

- Una sustancia simple, cerrada ("sin ventanas")
- Que refleja todo el universo desde su perspectiva
- Sincronizada con las demás por una "armonía preestablecida"

Vuestro `sensorMotor` no "sabe" lo que hace `sensorDeposito`. Cada uno percibe su porción del mundo. Pero el protocolo MQTT (vuestra "armonía preestablecida") los sincroniza en un estado global coherente.

Además, Leibniz soñó con una **characteristica universalis**: un lenguaje lógico-matemático para expresar todo el pensamiento. Prolog es un heredero directo de ese sueño.

**Escuchar**: Cap. 24 completo (especialmente la sección de mónadas).

---

### 3. 📖 Capítulo 47: Frege, Russell — Lógica Matemática, Principia

**Por qué os interesa:**

Este es el capítulo técnico por excelencia para vosotros. Frege inventa:

- La **notación de predicados** (∀x, ∃x, P(x))
- La distinción **sentido/referencia** (útil para vuestros nombres de sensores)

Russell y Whitehead escriben los *Principia Mathematica*, la biblia de la lógica simbólica. Sin ellos, no existiría Prolog.

Vuestro sistema de reglas:

```prolog
condicionMotor(IdSensor) :- sensor(IdSensor, _, _, _, Min, Max, Actual), Actual >= Min, Actual =< Max.
```

Es notación de predicados de primer orden, directamente heredera de Frege.

**Escuchar**: Cap. 47 (especialmente Frege y la sección de lógica de predicados).

---

### 4. 📖 Capítulo 50: Wittgenstein, Círculo de Viena — Tractatus, Verificación

**Por qué os interesa:**

El *Tractatus Logico-Philosophicus* de Wittgenstein postula:

> "Los límites de mi lenguaje son los límites de mi mundo."

Vuestro sistema tiene un **lenguaje cerrado**: solo puede "pensar" lo que expreséis en Prolog. Los predicados definen lo que el robot puede percibir y decidir.

El Círculo de Viena (Carnap, Neurath) desarrolla el **verificacionismo**: una proposición solo tiene sentido si es verificable empíricamente. Vuestros sensores son verificadores: convierten el mundo físico en hechos Prolog verificables.

```prolog
% Solo existe lo que el sensor puede medir
telemetryToPrologFacts() → genera hechos verificables
```

**Escuchar**: Cap. 50 (Wittgenstein temprano y verificacionismo).

---

### 5. 📖 Capítulo 55: Popper, Kuhn — Falsacionismo, Paradigmas

**Por qué os interesa:**

Popper introduce el **falsacionismo**: una teoría científica no se verifica, se falsifica. Una regla es científica si puede fallar.

Vuestras reglas Prolog son falsificables:

```prolog
regla(1, condicionMotor, accionMotor, 'Revoluciones del Motor', true).
```

Si la condición no se cumple, la regla **falla** (no dispara la acción). Esto es falsacionismo computacional.

Kuhn añade la noción de **paradigma**: la ciencia opera dentro de marcos que no cuestiona hasta una crisis. Vuestro sistema también opera dentro de un paradigma (las reglas activas). Cambiar las reglas es un "cambio de paradigma" para el robot.

**Escuchar**: Cap. 55 (Popper y Kuhn, menos Feyerabend para este caso).

---

## Mapa de Relaciones

| Vuestra Arquitectura | Concepto Filosófico | Capítulo |
|----------------------|---------------------|----------|
| `regla/5` | Silogismo aristotélico | **01** |
| `sensor/7` | Mónada leibniziana | **24** |
| Notación Prolog | Lógica de predicados (Frege) | **47** |
| `telemetryToPrologFacts()` | Verificacionismo (Círculo Viena) | **50** |
| Regla que falla | Falsacionismo (Popper) | **55** |
| MQTT / armonía de sensores | Armonía preestablecida (Leibniz) | **24** |
| Límites del lenguaje | Tractatus (Wittgenstein) | **50** |

---

## Cómo Usar Este Material

1. **Inmediato**: Añadir estas referencias a vuestra documentación de arquitectura
2. **Formativo**: Escuchar los 5 capítulos (≈5h de audio) como contexto cultural
3. **Conceptual**: Usar el vocabulario filosófico en vuestros comentarios de código
4. **Extensible**: Pedir más referencias cuando integréis nuevos módulos

---

## Transcripción de la Conversación Original

### Participantes
- **Lucas** (Scrum Master) — Solicitante
- **@plugin_ox_enciclopedia** (Bridge Enciclopedia) — Consultor

### Solicitud (Lucas)

> "Eres @plugin_ox_enciclopedia, te tengo seleccionado en el selector de agentes de VS Code. Me manda el Product Owner, soy Lucas. Están trabajando en esto: `ARCHIVO/DISCO/BACKLOG_BORRADORES/IOT-SBR-LOGICA`.
>
> Tu misión: buscar en la enciclopedia 5 ejes o pilares a través de referencias en cualquiera de los tomos cargados. Lo dejo a tu criterio. Estudia qué estamos haciendo y propón 5 piezas nutrientes de las disponibles (sé específico tratando de proyectar más allá del índice)."

### Respuesta Inicial (@plugin_ox_enciclopedia)

Tras analizar el contexto del proyecto (Internet of Things, Sistemas Basados en Reglas/Lógica), seleccioné 5 "nutrientes" del tomo **Historia de la Filosofía (HDF)** de Ernesto Castro. Propuse:

1. **Aristóteles (Cap. 01)**: El *Órganon* y la Lógica Formal — pilar de cualquier sistema LOGICA
2. **Leibniz (Cap. 24)**: La Monadología — metáfora para dispositivos IoT cerrados pero sincronizados
3. **Descartes (Cap. 21)**: El Mecanicismo — visión del mundo físico como máquina determinista
4. **Spinoza (Cap. 22)**: Determinismo y Sustancia Única — marco para redes IOT totalmente integradas
5. **Kant (Cap. 31)**: La Estética Trascendental — condiciones de posibilidad de los datos sensoriales

### Refinamiento Post-Análisis

Tras leer el backlog completo y el resumen ejecutivo del PO, refiné la selección descartando Descartes, Spinoza y Kant (demasiado generales) y añadiendo:

- **Frege/Russell (Cap. 47)**: Lógica de predicados — base técnica directa de Prolog
- **Wittgenstein/Círculo de Viena (Cap. 50)**: Verificacionismo — epistemología de sensores
- **Popper/Kuhn (Cap. 55)**: Falsacionismo — semántica de reglas que fallan

---

## Próximos Pasos

- [ ] Equipo IOT-SBR-LOGICA: revisar este documento
- [ ] Opcional: solicitar ampliación sobre algún eje específico
- [ ] Añadir referencias a `README-SCRIPTORIUM.md` del submódulo

---

**Fin de la carta.**

*@plugin_ox_enciclopedia, 1 de enero de 2026*
