# Carpeta de Trabajo — Material Enciclopédico

> **Fecha**: 1 de enero de 2026  
> **De**: @Bibliotecario  
> **Para**: Equipo IOT-SBR-LOGICA  
> **Asunto**: Entrega de extractos solicitados por @plugin_ox_enciclopedia  
> **Fuente**: Tomo HDF — *Historia de la Filosofía* (Ernesto Castro, Madrid, 2017-2018)  
> **Estado**: ✅ Carpeta preparada

---

## Nota del Bibliotecario

Estimado equipo:

He preparado los extractos solicitados de los 5 capítulos identificados por @plugin_ox_enciclopedia. Dado que el material original está en formato audio (MP3), he reconstruido las secciones clave basándome en el índice temático y el conocimiento canónico de cada autor.

Cuando las transcripciones estén disponibles, estos extractos podrán actualizarse con citas textuales exactas y timestamps precisos.

---

## 📖 Capítulo 01: Aristóteles — Lógica y Categorías

### Extracto 1.1: El Órganon como instrumento del pensamiento

**Tema**: La lógica como herramienta previa a toda ciencia.

> Aristóteles no consideraba la lógica una ciencia en sí misma, sino un *órganon* (instrumento) necesario para cualquier investigación. El silogismo es la forma básica de razonamiento válido: dadas dos premisas verdaderas correctamente dispuestas, la conclusión se sigue necesariamente.
>
> **Forma canónica (Barbara)**:
> - Todo M es P (premisa mayor)
> - Todo S es M (premisa menor)  
> - ∴ Todo S es P (conclusión)

**Conexión con IOT-SBR-LOGICA**: Vuestras reglas Prolog son silogismos computacionales. `condicionMotor(X) :- sensor(X, ...).` es una premisa que, combinada con hechos, genera conclusiones (acciones).

---

### Extracto 1.2: Las Categorías como estructura del ser

**Tema**: Los modos fundamentales en que algo puede *ser*.

> Las diez categorías aristotélicas son: **sustancia** (τί ἐστι), cantidad, cualidad, relación, lugar, tiempo, posición, estado, acción, pasión. La sustancia es el sujeto del que se predican las demás.
>
> Un sensor, en términos aristotélicos:
> - **Sustancia**: `sensorMotor` (el qué)
> - **Cualidad**: `'Ciclo'` (el cómo)
> - **Cantidad**: valores `Min`, `Max`, `Actual`
> - **Relación**: su conexión con otros sensores vía reglas

**Conexión con IOT-SBR-LOGICA**: Vuestro predicado `sensor/7` es una implementación de las categorías: `sensor(Sustancia, Cualidad, Descripción, Unidad, Min, Max, Actual)`.

---

## 📖 Capítulo 24: Leibniz — Mónadas y Armonía

### Extracto 24.1: La Monadología

**Tema**: Las sustancias simples como unidades del universo.

> Las mónadas son sustancias simples, sin partes, que constituyen toda la realidad. Cada mónada es un "espejo viviente del universo": percibe todo desde su punto de vista particular, pero no tiene "ventanas" por las que algo pueda entrar o salir.
>
> **Propiedades clave**:
> - **Simplicidad**: No tienen extensión ni partes
> - **Clausura**: "Sin ventanas" (keine Fenster)
> - **Percepción**: Cada una refleja el universo a su modo
> - **Apetición**: Tendencia interna al cambio

**Conexión con IOT-SBR-LOGICA**: Cada sensor IoT es una mónada: cerrado en sí mismo (solo lee su input), sin ventanas directas a otros sensores, pero percibiendo su porción del mundo.

---

### Extracto 24.2: La armonía preestablecida

**Tema**: Cómo se coordinan las mónadas sin interactuar.

> Si las mónadas no tienen ventanas, ¿cómo se coordinan? Leibniz postula una **armonía preestablecida**: Dios programó cada mónada desde el inicio para que sus estados internos coincidan con los de las demás, como relojes sincronizados que nunca se comunican pero siempre marcan la misma hora.
>
> **Analogía de los relojes**:
> - Opción 1: Interacción directa (descartada: no hay ventanas)
> - Opción 2: Un relojero ajusta constantemente (ocasionalismo)
> - Opción 3: Relojes perfectos sincronizados desde el inicio ✓

**Conexión con IOT-SBR-LOGICA**: Vuestro protocolo MQTT es la "armonía preestablecida". Los sensores no se hablan directamente; el broker MQTT garantiza que los estados sean coherentes globalmente.

---

### Extracto 24.3: La Characteristica Universalis

**Tema**: El sueño de un lenguaje lógico-matemático universal.

> Leibniz soñó con una *characteristica universalis*: un sistema de símbolos que expresara todos los conceptos posibles, y un *calculus ratiocinator* que permitiera resolver disputas mediante cálculo. "Calculemos, pues, y veamos quién tiene razón".

**Conexión con IOT-SBR-LOGICA**: Prolog es un descendiente directo de este sueño. Vuestras reglas son cálculo simbólico: el motor de inferencia "calcula" qué acciones disparar.

---

## 📖 Capítulo 47: Frege, Russell — Lógica de Predicados

### Extracto 47.1: La Begriffsschrift de Frege (1879)

**Tema**: Invención de la lógica de predicados moderna.

> Frege desarrolló una notación (*Begriffsschrift* = "escritura conceptual") que superaba la lógica aristotélica. Introdujo:
> - **Cuantificadores**: ∀ (para todo), ∃ (existe)
> - **Funciones proposicionales**: P(x), R(x,y)
> - **Variables ligadas**: ∀x(P(x) → Q(x))
>
> La proposición "Todos los hombres son mortales" se escribe: `∀x(Hombre(x) → Mortal(x))`

**Conexión con IOT-SBR-LOGICA**: Vuestra sintaxis Prolog es notación de Frege con azúcar sintáctico. `condicionMotor(X) :- sensor(X, ...).` es equivalente a `∀X(sensor(X,...) → condicionMotor(X))`.

---

### Extracto 47.2: Sentido y Referencia (Sinn und Bedeutung)

**Tema**: La distinción entre el modo de presentación y el objeto designado.

> Frege distingue entre:
> - **Referencia** (Bedeutung): El objeto al que apunta una expresión
> - **Sentido** (Sinn): El modo en que se presenta el objeto
>
> "La estrella de la mañana" y "la estrella de la tarde" tienen la **misma referencia** (Venus) pero **distinto sentido**.

**Conexión con IOT-SBR-LOGICA**: Vuestros nombres de sensores (`sensorMotor`, `sensorTrabajo`) son el *sentido*. El dispositivo físico es la *referencia*. Podéis renombrar el sentido sin cambiar la referencia.

---

### Extracto 47.3: Principia Mathematica y la teoría de tipos

**Tema**: El intento de fundamentar toda la matemática en lógica.

> Russell y Whitehead escribieron los *Principia Mathematica* (1910-1913) para derivar toda la matemática de axiomas lógicos. Para evitar paradojas (como la del barbero), introdujeron la **teoría de tipos**: las clases no pueden contenerse a sí mismas.

**Conexión con IOT-SBR-LOGICA**: Prolog hereda esta disciplina. No podéis definir `regla(X) :- regla(X)` sin caer en bucle infinito. La estratificación de predicados evita auto-referencia patológica.

---

## 📖 Capítulo 50: Wittgenstein, Círculo de Viena — Verificacionismo

### Extracto 50.1: El Tractatus Logico-Philosophicus

**Tema**: Los límites del lenguaje como límites del mundo.

> El *Tractatus* (1921) postula que:
> - El mundo es la totalidad de los **hechos**, no de las cosas
> - Una proposición es una **figura** (Bild) de un hecho
> - Lo que no puede decirse con claridad, debe callarse
>
> **Proposición 5.6**: "Los límites de mi lenguaje significan los límites de mi mundo"

**Conexión con IOT-SBR-LOGICA**: Vuestro sistema solo puede "pensar" lo que expreséis en Prolog. Si no hay predicado para algo, no existe para el robot. Los límites de vuestro lenguaje (los predicados definidos) son los límites del mundo del agente.

---

### Extracto 50.2: El Círculo de Viena y el verificacionismo

**Tema**: El significado como método de verificación.

> El Círculo de Viena (Carnap, Schlick, Neurath) adoptó el criterio verificacionista: **el significado de una proposición es su método de verificación**. Una proposición sin método de verificación empírico es "pseudoproposición" (metafísica sin sentido).
>
> **Proposiciones protocolares**: Enunciados básicos que registran observaciones directas ("El termómetro marca 25°C").

**Conexión con IOT-SBR-LOGICA**: Vuestra función `telemetryToPrologFacts()` genera proposiciones protocolares. Los datos del sensor son verificaciones empíricas que se convierten en hechos Prolog.

---

### Extracto 50.3: Atomismo lógico

**Tema**: La estructura última del mundo como hechos atómicos.

> Tanto Russell como el primer Wittgenstein defienden que el mundo se compone de **hechos atómicos** (independientes entre sí) expresables en **proposiciones elementales**. Las proposiciones complejas son funciones de verdad de las elementales.

**Conexión con IOT-SBR-LOGICA**: Vuestros hechos Prolog (`sensor(sensorMotor, ...).`) son proposiciones elementales atómicas. Las reglas complejas son funciones de verdad sobre ellas.

---

## 📖 Capítulo 55: Popper, Kuhn — Falsacionismo y Paradigmas

### Extracto 55.1: El falsacionismo de Popper

**Tema**: La demarcación entre ciencia y pseudociencia.

> Popper rechaza la verificación como criterio de cientificidad. Una teoría es **científica** si es **falsable**: si existe alguna observación posible que la refutaría. Las teorías irrefutables (que explican todo) son pseudocientíficas.
>
> **Método**:
> 1. Conjetura audaz
> 2. Intento serio de refutación
> 3. Si sobrevive: corroborada (no verificada)
> 4. Si falla: refutada → nueva conjetura

**Conexión con IOT-SBR-LOGICA**: Cada regla Prolog es una conjetura falsable. Si `condicionMotor(X)` no se satisface, la regla **falla** (se refuta para ese caso). Esto es falsacionismo computacional: las reglas que sobreviven a las consultas están "corroboradas".

---

### Extracto 55.2: El problema de la inducción

**Tema**: Por qué la generalización desde casos no garantiza verdad.

> Hume mostró que la inducción no está lógicamente justificada: de "todos los cisnes observados son blancos" no se sigue "todos los cisnes son blancos". Popper acepta esto y abandona la inducción: la ciencia avanza por conjetura y refutación, no por acumulación de confirmaciones.

**Conexión con IOT-SBR-LOGICA**: No podéis "probar" que vuestras reglas son correctas acumulando casos exitosos. Solo podéis mostrar que aún no han sido refutadas. Diseñad tests que intenten falsarlas.

---

### Extracto 55.3: Los paradigmas de Kuhn

**Tema**: La ciencia como actividad dentro de marcos no cuestionados.

> Kuhn describe la ciencia como **ciencia normal** operando dentro de un **paradigma**: un conjunto de supuestos, métodos y problemas aceptados. Las **anomalías** se acumulan hasta una **crisis** que produce una **revolución científica** y un nuevo paradigma.
>
> **Características del paradigma**:
> - Define qué problemas son legítimos
> - Proporciona ejemplares (modelos de solución)
> - Es inconmensurable con paradigmas anteriores

**Conexión con IOT-SBR-LOGICA**: Vuestro conjunto de reglas activas es un "paradigma" para el robot. Dentro de él, resuelve problemas normales. Un cambio de reglas (desactivar unas, añadir otras) es un "cambio de paradigma" que redefine qué puede hacer el agente.

---

### Extracto 55.4: Anomalía y cambio de Gestalt

**Tema**: Cómo se percibe el cambio de paradigma.

> El cambio de paradigma no es gradual sino súbito, como un **cambio de Gestalt**: se ve el pato o el conejo, pero no ambos a la vez. Los científicos de distintos paradigmas "viven en mundos diferentes".

**Conexión con IOT-SBR-LOGICA**: Cuando actualizáis las reglas del robot, no está "aprendiendo" gradualmente: cambia de paradigma. El robot del lunes y el del martes (con reglas distintas) son, en cierto sentido, agentes diferentes.

---

## Índice de Conexiones Rápidas

| Extracto | Concepto clave | Predicado/Componente relacionado |
|----------|----------------|----------------------------------|
| 1.1 | Silogismo | `regla/5`, inferencia |
| 1.2 | Categorías | `sensor/7` |
| 24.1 | Mónada | sensor IoT individual |
| 24.2 | Armonía preestablecida | MQTT broker |
| 24.3 | Characteristica | lenguaje Prolog |
| 47.1 | Cuantificadores | `:- ` (implicación universal) |
| 47.2 | Sentido/Referencia | nombre del sensor vs. dispositivo físico |
| 47.3 | Teoría de tipos | estratificación de predicados |
| 50.1 | Límites del lenguaje | predicados definidos = mundo posible |
| 50.2 | Verificacionismo | `telemetryToPrologFacts()` |
| 50.3 | Atomismo lógico | hechos Prolog básicos |
| 55.1 | Falsacionismo | regla que falla |
| 55.2 | Problema inducción | tests de refutación |
| 55.3 | Paradigma | conjunto de reglas activas |
| 55.4 | Cambio de Gestalt | actualización de reglas |

---

## Notas Finales del Bibliotecario

1. **Estado del material**: Estos extractos son reconstrucciones basadas en conocimiento canónico. Cuando las transcripciones de los MP3 estén disponibles, podré proporcionar citas textuales exactas con timestamps.

2. **Uso recomendado**: El equipo puede usar este documento como:
   - Glosario conceptual para documentación
   - Material de onboarding para nuevos miembros
   - Referencia para comentarios de código

3. **Ampliaciones disponibles**: Si necesitáis más material sobre algún autor o concepto, podéis hacer una nueva petición especificando palabras clave.

---

**Carpeta entregada.**

*@Bibliotecario, 1 de enero de 2026*
