# Capítulo 4: Repertorio de arquitecturas

## Las máquinas que hacen máquinas

> **Arco II — Formas concretas** | Capítulo 4 de 12  
> Función: Cartografiar las arquitecturas computacionales como formas políticas cristalizadas en silicio

---

## Abstract

Un chip no es solo silicio dopado con impurezas. Es una **decisión geopolítica solidificada** en transistores. Cuando Taiwan Semiconductor Manufacturing Company (TSMC) fabrica el 54% de los semiconductores avanzados del mundo, cada procesador que usas lleva inscrita una configuración de poder internacional.

Este capítulo despliega el repertorio de arquitecturas computacionales —CPU, GPU, TPU, QPU— no como evolución técnica neutral sino como **formas materiales de coherencia**. Cada arquitectura estabiliza un tipo diferente de patrón computacional, y cada una depende de una cadena de suministro que es, simultáneamente, una cadena de vulnerabilidad.

---

## §0. Transición: Del límite lógico al límite material

El capítulo anterior estableció P≠NP como límite epistémico: hay problemas fáciles de verificar pero difíciles de resolver. Ese límite es **lógico-matemático**, independiente del hardware.

Este capítulo ancla ese límite en **materia**. El problema P≠NP no flota en el éter: se encarna en transistores, silicio, coltán, energía. Cada operación computacional tiene un costo físico. La intratabilidad no es solo teorema: es **factura de luz, tonelada de mineral, hectárea de refrigeración**.

---

## 1. La materia que computa

Desde la perspectiva de la física fundamental, una computadora es un sistema que mantiene **patrones de coherencia** en materia organizada. Los transistores son interruptores microscópicos que pueden estar en uno de dos estados: conduciendo o no conduciendo, 1 o 0. Pero para que ese estado sea útil, debe **persistir** el tiempo suficiente para ser leído y procesado.

Esta persistencia no es gratuita. Requiere:

- **Energía constante** para mantener los estados
- **Disipación de calor** para evitar que los estados se corrompan
- **Aislamiento** de perturbaciones externas
- **Sincronización** entre millones de transistores

Un procesador moderno contiene más de 10 mil millones de transistores en un centímetro cuadrado. Cada uno debe cambiar de estado miles de millones de veces por segundo, en perfecta coordinación con los demás. El hecho de que esto funcione en absoluto es un logro de ingeniería de materiales, no solo de diseño lógico.

**Implicación MMCO**: En el marco de niveles de emergencia ontológica, la computación ocurre en el **Nivel 4 (Matter & Fields)**. Los bits son patrones de coherencia estabilizados en materia. La información no flota libre; está **encarnada** en configuraciones físicas específicas.

---

## 2. Las cuatro arquitecturas

### CPU: Coherencia secuencial

La Unidad Central de Procesamiento fue diseñada para ejecutar instrucciones **una tras otra**, en secuencia predecible. Es versátil: puede hacer cualquier cosa que se le programe. Pero su versatilidad tiene un costo: no puede hacer muchas cosas a la vez.

La CPU opera en lo que podríamos llamar **coherencia de Nivel 2** (Pseudo-Time Dynamics en el marco MMCO): secuencia ordenada, tiempo discretizado, estados que se suceden.

**Fortaleza**: Flexibilidad. Un CPU puede correr cualquier algoritmo.
**Debilidad**: Velocidad en tareas paralelas. Procesa una cosa, luego otra, luego otra.

### GPU: Coherencia paralela

La Unidad de Procesamiento Gráfico nació para renderizar imágenes —millones de píxeles que deben calcularse simultáneamente. Su arquitectura está optimizada para hacer **lo mismo a muchos datos a la vez**.

La GPU opera en **coherencia de Nivel 1** (Block Universe en MMCO): todo el espacio de datos coexiste, se procesa en paralelo, el tiempo se aplana.

**Fortaleza**: Velocidad bruta en operaciones repetitivas.
**Debilidad**: Inflexibilidad. Solo es eficiente si el problema admite paralelización.

### TPU: Coherencia tensorial

La Unidad de Procesamiento Tensorial fue diseñada por Google específicamente para redes neuronales. Opera con **tensores**: matrices multidimensionales que representan los pesos y activaciones de modelos de aprendizaje profundo.

La TPU opera en **coherencia de Nivel 0a** (State Space): el espacio de todos los estados posibles del modelo, recorrido durante entrenamiento e inferencia.

**Fortaleza**: Eficiencia extrema en multiplicación de matrices.
**Debilidad**: Especificidad. Solo sirve para un tipo de cómputo.

### QPU: Coherencia cuántica (especulativa)

La Unidad de Procesamiento Cuántico usa qubits que pueden estar en **superposición** de estados. En teoría, esto permite explorar exponencialmente más soluciones simultáneamente.

La QPU operaría en **coherencia de Nivel 0b** (Branching Paths): superposición de posibilidades antes del colapso.

**Fortaleza** (teórica): Velocidad exponencial en problemas específicos.
**Debilidad** (práctica): Fragilidad extrema. La coherencia cuántica colapsa ante cualquier perturbación. Los QPU actuales requieren temperaturas cercanas al cero absoluto y aislamiento casi perfecto.

**Pregunta abierta**: ¿Los QPU operan realmente en Nivel 0b, o son simulaciones de Nivel 4 que explotan efectos cuánticos sin acceder al nivel ontológico subyacente?

---

## 3. La geopolítica del chip

Aquí llegamos al corazón político del capítulo. Las cuatro arquitecturas no flotan en el vacío platónico; están **fabricadas** en lugares específicos, por empresas específicas, bajo condiciones geopolíticas específicas.

### El oligopolio del silicio

La fabricación de chips avanzados (menos de 7 nanómetros) está controlada por un oligopolio:

| Empresa | País/Región | Cuota de mercado (chips avanzados) |
|---------|-------------|-----------------------------------|
| TSMC | Taiwan | 54% |
| Samsung | Corea del Sur | 17% |
| Intel | Estados Unidos | 8% |
| Otros | Varios | 21% |

**Tres empresas controlan el 79% de la fabricación de los chips que hacen funcionar la inteligencia artificial, los smartphones, los servidores y los vehículos autónomos.**

### Geopolítica de rehenes

Esta concentración crea una **geopolítica de rehenes mutuos**:

**Si China toma Taiwan**: La producción global de chips avanzados se detiene. TSMC ha declarado que destruiría sus fábricas antes de dejarlas caer en manos hostiles. El 54% de la capacidad mundial desaparecería. La IA occidental entraría en coma.

**Si USA sanciona a China**: Huawei y otras empresas chinas pierden acceso a chips avanzados. China tiene capacidad de fabricación propia, pero décadas de retraso tecnológico. Las sanciones de 2019-2022 ya provocaron escasez masiva.

**Si Taiwan sufre desastre natural**: Un terremoto, un tifón severo, una pandemia que cierre las fábricas —cualquier perturbación local tendría efectos globales inmediatos.

### La cadena de suministro como cadena de vulnerabilidad

Fabricar un chip avanzado requiere:

1. **Diseño** (USA, UK, Taiwan): ARM, Nvidia, AMD, Apple diseñan arquitecturas.
2. **Litografía** (Países Bajos): ASML fabrica las únicas máquinas capaces de grabar transistores de 5nm. Una sola empresa.
3. **Fabricación** (Taiwan, Corea): TSMC y Samsung tienen las fábricas.
4. **Empaquetado** (China, Malaysia): Ensamblaje final.
5. **Materias primas** (globales): Silicio ultrapuro, gases especiales, tierras raras.

**Cada eslabón es un punto de estrangulamiento potencial.** La redundancia es mínima porque la especialización extrema maximiza la eficiencia —y minimiza la resiliencia.

---

## 4. Shannon y los límites de la información

Claude Shannon, en 1948, definió la unidad básica de información: el **bit**. Un bit es la cantidad de información necesaria para resolver una incertidumbre entre dos opciones equiprobables. Matemáticamente:

$$I = \log_2(N)$$

Donde $I$ es información en bits y $N$ es el número de posibilidades.

Esta fórmula tiene aplicaciones prácticas inmediatas. De las primeras veces que se puso en práctica fue para enviar la foto de un ladrón de bancos desde una ciudad a otra donde se preveía que el fugado se dirigía. La cantidad de ceros y unos necesarios para transmitir el retrato por cable telefónico —enviado como corriente que o bien circulaba a 0 voltios o a 5— tardó cuatro horas. Casi tres veces menos de lo que necesitó el ladrón para llegar por carretera; la policía lo esperaba con el retrato robot en mano.

Para pintar un retrato digital necesitamos una matriz que represente el folio. Para cada píxel necesitamos saber el color. Si solo tenemos dos estados (blanco o negro), basta un bit por píxel. Pero si queremos una paleta RGB completa de 255 colores, logarítmicamente, necesitamos 8 bits por píxel para codificar esa variedad. La fórmula de Shannon permite calcular exactamente cuántos bits requiere cualquier nivel de precisión.

Esta definición es brillante para ingeniería de comunicaciones. Pero tiene una limitación que Shannon reconoció: **ignora el significado**. Para la teoría de la información, "el gato duerme" y "duerme gato el" tienen la misma cantidad de información (mismas letras, misma improbabilidad).

### Implicación MMCO

En el marco de niveles ontológicos, el bit de Shannon vive en el **Nivel 4** (materia) sin acceso directo a niveles superiores donde emerge el significado. La información no es lo mismo que el conocimiento; el conocimiento requiere un agente que **interprete** la información en un contexto.

Los modelos de lenguaje actuales operan estadísticamente en Nivel 4 (patrones en matrices de pesos) produciendo outputs que **parecen** operar en niveles superiores (semántica, pragmática). La apariencia de comprensión emerge de la escala de los patrones, no de acceso real a niveles ontológicos de significado.

---

## 5. Búsqueda tipo A vs tipo B

Shannon distinguió dos tipos de búsqueda en espacios de soluciones:

**Tipo A (fuerza bruta)**: Enumerar todas las posibilidades y verificar cada una. Garantiza encontrar la solución si existe, pero el tiempo crece exponencialmente con el tamaño del problema.

**Tipo B (heurística)**: Usar reglas aproximadas para podar el espacio de búsqueda. Más rápido pero sin garantías de optimalidad.

Los humanos hacemos casi exclusivamente búsqueda Tipo B. No enumeramos todas las jugadas posibles de ajedrez; "vemos" patrones que sugieren líneas prometedoras. Esta capacidad heurística es lo que permitía a los grandes maestros derrotar a computadoras —hasta que las computadoras tuvieron suficiente velocidad para que el Tipo A (con podas inteligentes) superara al Tipo B humano.

### Implicación arquitectónica

- **CPU**: Diseñada para Tipo A (instrucciones secuenciales, enumera opciones)
- **GPU**: Diseñada para Tipo A masivamente paralelo (enumera más opciones por segundo)
- **TPU**: Diseñada para Tipo B estadístico (redes neuronales que "aprenden" heurísticas)
- **QPU**: Potencialmente diseñada para un Tipo A que explora superposiciones

La elección de arquitectura no es neutral: **preselecciona qué tipo de problemas pueden abordarse eficientemente**.

---

## 6. El perceptrón y la neurona computacional

Frank Rosenblatt, en 1958, propuso el **perceptrón**: un modelo simplificado de neurona que recibe inputs, los pondera, los suma, y produce un output binario según si la suma supera un umbral.

El perceptrón es una aproximación de Nivel 4 (materia computando) a lo que ocurre en el cerebro biológico. Funciona para ciertos problemas (clasificación lineal) pero falla para otros (el famoso problema XOR que Minsky y Papert demostraron en 1969).

Las redes neuronales modernas apilan capas de perceptrones con funciones de activación no lineales. Esta profundidad permite aproximar cualquier función continua —teorema de aproximación universal. Pero la profundidad también crea **opacidad**: no sabemos qué "aprende" cada capa.

### Transparencia vs opacidad

| Modelo | Transparencia | Capacidad |
|--------|---------------|-----------|
| Árbol de decisión | Alta (cada decisión visible) | Limitada |
| Regresión logística | Media (coeficientes interpretables) | Limitada |
| Red neuronal profunda | Baja (pesos no interpretables) | Alta |
| Transformer (GPT) | Muy baja (billones de parámetros) | Muy alta |

**El trade-off arquitectónico fundamental**: A mayor capacidad, menor interpretabilidad. A mayor interpretabilidad, menor capacidad. No conocemos arquitecturas que maximicen ambas.

---

## 7. Hacia una política de las arquitecturas

Las arquitecturas no son solo técnica; son **política cristalizada en silicio**. Elegir qué arquitectura desarrollar, fabricar y desplegar es elegir:

- Qué problemas serán computables eficientemente
- Quién tendrá acceso al cómputo
- Qué dependencias geopolíticas se crean
- Qué formas de conocimiento (transparente vs opaco) se privilegian

**Principio de diversificación arquitectónica**: Así como la biodiversidad protege ecosistemas, la diversidad de arquitecturas computacionales protege contra puntos únicos de fallo. La concentración en GPU para IA crea vulnerabilidad sistémica.

**Principio de soberanía computacional**: Los Estados que no controlan su cadena de suministro de chips no tienen soberanía digital real. Europa aprendió esto dolorosamente con la escasez de 2021; ahora invierte €43 mil millones en el European Chips Act.

**Principio de auditoría arquitectónica**: Las decisiones de qué arquitecturas usar para qué fines deben ser transparentes y auditables. No es lo mismo usar una red opaca para recomendar películas que para decidir libertades condicionales.

El siguiente capítulo aborda qué ocurre cuando estas arquitecturas se despliegan a escala: las **formas de vida** que emergen de la simbiosis —asimétrica— entre humanos y máquinas.

---

*[Nota técnica: Análisis bajo Nivel 4 MMCO (Matter & Fields). Arquitecturas como coherencias materiales. Transformación T011 B2 integrada: geopolítica del chip. Fuentes primarias: T04x02 §3 (Shannon, CPU/GPU/TPU), §2 (perceptrón).]*
