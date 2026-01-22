# Capítulo 3: El problema de la escala

> **Arco I — Los tres desplazamientos** | Capítulo 3 de 12  
> Función: Desplazamiento escalar — los límites computacionales como campo de batalla político

*Desplazamiento: Escalar*

---

## Abstract

Te han dicho que la escala es un límite técnico. Que hay problemas demasiado grandes para resolver. Que debemos aceptar aproximaciones imperfectas porque la matemática lo exige.

Te han mentido. No sobre la matemática —P versus NP es real— sino sobre quién decide qué se intenta y qué se abandona. El límite computacional es un hecho; su aplicación política es una elección. Y esa elección la están haciendo otros mientras tú crees que es inevitable.

Este capítulo no te enseñará a resolver problemas NP-completos. Te enseñará a ver quién se beneficia de que ciertos problemas se declaren "irresolubles" mientras otros reciben trillones en inversión. Y te mostrará que la coordinación a gran escala sin control central —que te han dicho que es imposible— ya ha funcionado antes, está funcionando ahora, y puede funcionar a escalas que aún no imaginamos.

---

## 1. La mentira de la escala ingobernable

Hay una historia que el poder cuenta sobre sí mismo: la complejidad requiere jerarquía. Cuanto más grande el problema, más centralizado el control necesario. Un pueblo puede autogobernarse; una nación necesita Estado; un planeta necesita hegemonía.

Esta historia es conveniente para quienes están arriba. Y es falsa.

Lo que sí es verdad: hay problemas fáciles de **verificar** pero difíciles de **resolver**. El viajante que debe visitar 100 ciudades por el camino más corto. La proteína que debe plegarse en la configuración correcta. El horario de trenes que debe evitar colisiones. Verificar si una solución propuesta funciona es trivial. Encontrar la solución óptima requiere más tiempo que la edad del universo.

Esto se llama P≠NP. Es el muro computacional que ninguna máquina atraviesa.

Pero de este hecho matemático **no se sigue** que:
- Solo expertos pueden decidir qué problemas atacar
- La coordinación requiere control centralizado  
- La democracia es ineficiente para problemas complejos
- Debemos resignarnos a que otros prioricen

Esas conclusiones son **política** disfrazada de **técnica**. Y el disfraz funciona porque la mayoría no sabe suficiente matemáticas para quitárselo.

---

## 2. Lo que nadie te dice sobre Cantor

Georg Cantor demostró en el siglo XIX que hay infinitos más grandes que otros. El conjunto de números naturales (1, 2, 3...) es infinito, pero el conjunto de números reales (con decimales) es **infinitamente más infinito**. Entre cualquier par de enteros hay infinitos puntos.

Esta es la parte que sí te cuentan, porque suena a curiosidad intelectual inofensiva.

Lo que no te cuentan: Cantor murió en un psiquiátrico. No por la matemática —aunque la incomprensión de sus colegas no ayudó— sino porque su trabajo revelaba algo que el orden establecido no podía tolerar: **hay órdenes de magnitud que escapan a cualquier contención jerárquica**.

Si hay infinitos inconmensurables, entonces la pretensión de una autoridad central que "abarque todo" es no solo políticamente indeseable sino **matemáticamente absurda**. Ningún punto de vista puede contener todos los puntos de vista. Ningún centro puede procesar toda la periferia. Ningún algoritmo puede optimizar todos los algoritmos.

Cantor no era anarquista. Pero su matemática lo es.

La implicación que nadie extrae: si la escala excede cualquier centro, **la única forma de operar a gran escala es sin centro**. No por preferencia ideológica —aunque también— sino por estructura del problema.

---

## 3. El experimento que reveló la mentira

En el verano de 2022, dos profesores organizaron un experimento para atacar un problema NP desde cinco ángulos distintos. María (programadora) y Jordi (matemático) dividieron a los participantes en cinco grupos:

**Grupo 1 — Pensamiento mágico**: Propuso que "aparecería" la solución si se deseaba con suficiente fuerza. No funcionó. Pero al menos lo intentó.

**Grupo 2 — Fuerza bruta centralizada**: Una máquina explorando todas las posibilidades, una por una. Correcto en teoría. Terminaría después del fin del universo. **Esta es la estrategia que te venden como "la única racional"**: un sistema central que eventualmente procesará todo. La mentira está en el "eventualmente".

**Grupo 3 — Racionalidad estándar**: No reportó. El grupo que representa el sentido común adulto —el tuyo, el mío— no pudo ofrecer estrategia. Se paralizó ante el límite.

**Grupo 4 — Saturación del espacio**: Llenar el mundo de mensajes hasta que la solución emergiera por pura densidad. Absurdo pero revelador: intuía que la solución está en la **distribución**, no en la centralización.

**Grupo 5 — Inteligencia colectiva**: Distribuyó el problema entre múltiples agentes que compartían información pero decidían localmente. Mejor aproximación. No óptima, pero viable en tiempo finito.

El resultado que importa: **solo el grupo 5 produjo algo usable**. Y lo hizo renunciando a la optimización centralizada.

¿Qué nos dice esto?

Que ante problemas que exceden cualquier centro, **la respuesta no es un centro más potente sino la ausencia de centro**. Federación. Coordinación sin jefe. Múltiples nodos que resuelven su pedazo y comparten lo aprendido.

No es utopía. Es matemática.

---

## 4. La federación como solución computacional

Aquí está el secreto que la ciencia de la computación conoce pero la ciencia política ignora: los problemas NP-hard se abordan **descomponiéndolos**.

No buscas la ruta óptima para 100 ciudades. Buscas buenas rutas para clusters de 10 ciudades, y luego coordinas entre clusters. No es óptimo global, pero es **viable en tiempo real**. Y resulta que para la mayoría de propósitos prácticos, "bueno y rápido" derrota a "óptimo e imposible".

Esto tiene nombre técnico: **algoritmos distribuidos**, **descomposición de dominios**, **heurísticas locales con coordinación global mínima**.

Y tiene nombre político: **federalismo**.

La federación no es un compromiso romántico con la autonomía local. Es la **única estructura que escala** sin requerir un centro que no puede existir. Las comunidades autónomas que han sobrevivido décadas lo saben empíricamente. La teoría de la computación lo confirma formalmente.

**Principio**: Ante un problema que excede cualquier procesador central, la solución es una red de procesadores que:
1. Resuelven su subproblema local con información local
2. Comparten resultados parciales con vecinos
3. Ajustan su comportamiento según lo que aprenden
4. No esperan instrucciones de un centro que no existe

Esto describe igualmente:
- Un algoritmo de optimización distribuida
- Una red de cooperativas coordinadas
- Un movimiento social sin partido único
- Una IA de agentes múltiples

La analogía no es metáfora. Es **isomorfismo estructural**. El mismo patrón resuelve el mismo tipo de problema en dominios distintos.

---

## 5. El futuro que ya llegó: coordinación post-central

Mientras escribo esto en 2026, ya hay sistemas que operan a escala planetaria sin centro:

- **Bitcoin**: 150 millones de usuarios, ningún CEO, ningún servidor central. Torpe e ineficiente para muchas cosas, pero **existe** y **funciona** para su propósito. Prueba de concepto de que la coordinación sin centro no es fantasía.

- **Wikipedia**: 60 millones de artículos en 300 idiomas, escritos por voluntarios sin jefe. Imperfecta, sesgada en muchos aspectos, pero funcionando hace 25 años. Sin Wikipedia, tendríamos una enciclopedia corporativa o ninguna.

- **Fediverse**: Red de redes sociales federadas donde cada nodo decide sus reglas pero todos se comunican. 10 millones de usuarios y creciendo. No compite con Twitter en escala (todavía), pero demuestra que otra arquitectura social es posible.

- **Movimientos climáticos distribuidos**: No hay una organización central del activismo climático. Hay miles de grupos locales que se coordinan cuando les conviene y actúan autónomamente cuando no. Las huelgas estudiantiles de 2019 no tuvieron "líder mundial"; tuvieron nodos que se replicaban.

Ninguno de estos sistemas es óptimo. Todos tienen problemas graves. Pero todos demuestran que **la escala sin centro es posible**.

Y aquí viene lo que la mayoría no ve: **la IA va a amplificar esto, no a revertirlo**.

---

## 6. La IA como aceleradora de la federación

El relato dominante dice que la IA llevará a más centralización. Modelos gigantes entrenados por corporaciones gigantes. Control concentrado en quien tenga más GPUs. El fin de la descentralización.

Ese relato asume que la IA seguirá siendo lo que es hoy: modelos monolíticos que requieren infraestructura masiva.

Pero la tendencia técnica apunta en dirección contraria:

**Modelos cada vez más pequeños y especializados**: En 2023, modelos de 7B parámetros empezaron a rivalizar con modelos de 175B en tareas específicas. La carrera no es solo "más grande" sino "más eficiente". Dentro de 5 años habrá modelos competentes corriendo en tu teléfono.

**Entrenamiento federado**: Ya existe tecnología para entrenar modelos **sin centralizar los datos**. Cada nodo entrena con sus datos locales; solo se comparten los gradientes. La privacidad mejora y la dependencia del centro disminuye.

**Agentes que negocian entre sí**: Los sistemas multi-agente donde múltiples IAs especializadas colaboran (y compiten) ya superan a agentes monolíticos en tareas complejas. La arquitectura distribuida no es solo ética; es técnicamente superior para ciertos problemas.

**Esto significa** que el futuro de la IA no es necesariamente un panóptico corporativo. Puede ser una ecología de agentes federados, cada uno sirviendo a su comunidad, coordinando cuando es mutuamente beneficioso.

No estoy prediciendo que esto *ocurrirá*. Estoy señalando que es *posible*. La arquitectura técnica lo permite. La pregunta es quién construye qué, y para quién.

### §6b. Bitchat Nepal: federación bajo presión estatal (2024-2025)

> **Nota**: Este recuadro extiende los ejemplos de federación con un caso contemporáneo de resistencia. Fuente: Plan.md (2025).

Los ejemplos anteriores (Bitcoin, Wikipedia, Fediverse) muestran federación en condiciones relativamente benignas: nadie ha intentado seriamente destruirlas. Pero ¿qué pasa cuando el Estado decide que tu red descentralizada es una amenaza?

**Bitchat en Nepal** ofrece un caso de estudio real:

En 2024, el gobierno nepalí bloqueó el acceso a Twitter/X durante protestas ciudadanas. La justificación oficial: "desinformación". El efecto real: cortar comunicación entre manifestantes.

La respuesta fue Bitchat: una aplicación de mensajería que opera sobre el protocolo AT (el mismo de Bluesky) pero diseñada para resistir censura:

| Característica | Función |
|----------------|---------|
| **Nodos distribuidos** | No hay servidor central que bloquear |
| **Identidad soberana (DIDs)** | Los usuarios controlan sus claves, no la plataforma |
| **Sincronización mesh** | Los mensajes saltan entre dispositivos cercanos si internet está cortado |
| **Código abierto** | Cualquiera puede auditar, nadie puede capturar |

**El gobierno bloqueó los DNS**. Bitchat siguió funcionando porque no depende de DNS.

**El gobierno presionó a ISPs**. Los usuarios activaron VPNs y nodos Tor integrados.

**El gobierno amenazó a desarrolladores**. Pero los desarrolladores estaban en 5 países y el código ya era público.

Resultado: las protestas se coordinaron. El bloqueo fracasó. El gobierno tuvo que ceder.

**Lección para la federación**: No basta con que la arquitectura sea descentralizada. Debe ser **anti-frágil**: cada ataque debe fortalecerla en lugar de debilitarla. El bloqueo de Nepal popularizó Bitchat más que cualquier campaña de marketing.

---

## 7. Escenario 2035: Dos caminos

Permíteme mostrarte dos futuros plausibles. No ciencia ficción sino extrapolación de tendencias existentes.

### Camino A: Hegemonía computacional

Para 2035, tres corporaciones controlan el 90% de la capacidad de cómputo relevante para IA. Entrenar un modelo competitivo cuesta $10 mil millones; solo ellas pueden permitírselo. Los gobiernos dependen de sus servicios. Los movimientos sociales usan sus plataformas.

La "priorización democrática de la computación" propuesta en 2025 resultó ser teatro: comités consultivos sin poder real que legitiman decisiones ya tomadas. Las corporaciones invierten en lo que les da beneficio; el bien público recibe migajas.

Cuando surge una crisis —pandemia, colapso climático, migración masiva— la respuesta computacional la diseñan quienes tienen los modelos. La respuesta sirve a sus intereses primero. Los demás se adaptan o perecen.

El límite P≠NP sigue existiendo, pero quién decide qué problemas atacar está perfectamente claro: el capital.

### Camino B: Federación computacional

Para 2035, existen múltiples ecosistemas de IA no controlados por las mismas corporaciones. Un consorcio europeo de infraestructura pública de cómputo sirve a investigadores, cooperativas y gobiernos locales. Latinoamérica tiene su propia red de modelos de lenguaje entrenados con datos locales, para propósitos locales. África ha desarrollado sistemas adaptados a sus necesidades, no importados de Silicon Valley.

No hay equivalencia de recursos: las corporaciones siguen teniendo más GPUs. Pero la diversidad de centros impide el monopolio. Cuando Amazon quiere imponer su solución a un problema, existe alternativa. Cuando Google decide que algo "no es prioritario", alguien más puede intentarlo.

El límite P≠NP sigue existiendo, pero qué problemas atacar es una **negociación política** entre actores diversos, no una imposición unilateral.

### ¿Qué determina cuál camino tomamos?

No la tecnología. La tecnología permite ambos.

Lo que determina el camino es **quién construye qué, para quién**. Y eso se decide ahora, con las inversiones, regulaciones y movimientos sociales de esta década.

---

## 8. La priorización como campo de batalla

Volvamos al presente. El límite P≠NP dice que no podemos resolver todo. ¿Quién decide qué intentamos?

Hoy lo deciden:

| Actor | Qué prioriza | Qué ignora |
|-------|--------------|------------|
| **Amazon/Walmart** | Optimización de su logística | Transporte público en ciudades pobres |
| **Pharma/DeepMind** | Plegamiento de proteínas rentables | Enfermedades de la pobreza |
| **NSA/GCHQ** | Descifrar comunicaciones | Detectar desinformación electoral |
| **Academia mainstream** | Lo que da papers y grants | Auditoría algorítmica de sistemas en uso |

El patrón es claro: **se invierte en lo que da beneficio privado o control estatal; se ignora lo que solo da beneficio público**.

Esto no es conspiración. Es estructura de incentivos. Las corporaciones no son "malvadas"; siguen su función (maximizar beneficio). Los Estados no son "negligentes"; priorizan su función (mantener poder). El problema no son actores individuales sino **la ausencia de actores cuya función sea el bien común computacional**.

### Lo que necesitamos

No convencer a Amazon de que sea altruista. **Construir alternativas** que ocupen el espacio que Amazon no ocupa.

**Infraestructura pública de cómputo**: Bibliotecas del siglo XXI donde cualquier ciudadano pueda usar capacidad computacional para proyectos no comerciales. No como subsidio a corporaciones ("usa nuestra nube gratis") sino como **recurso público controlado públicamente**.

**Redes federadas de investigación**: Consorcios que compartan recursos y resultados sin someterse a ningún actor dominante. El CERN para la física de partículas. Algo equivalente para la IA de bien público.

**Modelos abiertos entrenados con datos diversos**: No solo código abierto (que ya existe) sino **datos abiertos** y **entrenamiento distribuido** que no dependan de ninguna corporación. Proyectos como BLOOM mostraron que es posible; necesitan escala.

**Mecanismos de priorización ciudadana con dientes**: No consejos consultivos que emiten recomendaciones ignorables. Condiciones de acceso al mercado: si quieres operar en esta jurisdicción, debes dedicar X% de tu cómputo a problemas designados públicamente. Como impuestos, no como voluntariado.

### §8b. Porto Alegre: 35 años de presupuesto participativo (1989-2024)

> **Nota**: Este recuadro extiende los mecanismos de priorización ciudadana con un caso empírico de larga duración. Fuente: Plan.md (2025).

Cuando hablamos de "priorización democrática del cómputo", suena a utopía. Pero la priorización democrática de recursos escasos **ya existe**. Y tiene nombre: presupuesto participativo.

**Porto Alegre, Brasil, 1989**: Un gobierno municipal del Partido de los Trabajadores decide que los ciudadanos, no los tecnócratas, determinarán cómo gastar parte del presupuesto público. La pregunta era simple: "¿Qué necesita más tu barrio: asfalto, escuela o alcantarillado?"

**El método**:
1. Asambleas de barrio donde los vecinos identifican prioridades
2. Delegados elegidos que negocian entre barrios
3. Consejo municipal que integra las demandas en presupuesto real
4. Ejecución supervisada por los mismos ciudadanos que decidieron

**Los resultados tras 35 años**:
- Cobertura de agua potable: del 75% al 98%
- Alcantarillado: del 46% al 85%
- Escuelas: triplicadas en barrios pobres
- Corrupción: drásticamente reducida (los que gastan son los que vigilan)

**La replicación global**:
- 2024: más de 3.000 ciudades en 40 países usan variantes del modelo
- Viña del Mar (Chile): 89 proyectos ciudadanos, 44 aprobados tras revisión técnica, votación híbrida (digital + presencial)
- Barcelona (Decidim): software libre que permite presupuesto participativo a escala metropolitana

**¿Por qué esto importa para la IA?**

Porque demuestra que la priorización democrática a escala no es fantasía. La gente **puede** decidir qué problemas atacar cuando se le da el mecanismo. El presupuesto participativo es para recursos fiscales lo que necesitamos para recursos computacionales.

La diferencia: el presupuesto de una ciudad es tangible (asfalto, escuelas). La capacidad de cómputo es abstracta (modelos, datos). El desafío es **hacer visible lo invisible**: mostrar qué problemas podrían resolverse si el cómputo se dedicara a ellos.

---

### La pregunta incómoda (de nuevo)

¿Con qué fuerza se impone esto?

No con argumentos. Con organización.

Los derechos laborales no se obtuvieron convenciendo a los patrones de que eran justos. Se obtuvieron con huelgas que hacían más costoso negarse que aceptar.

La priorización democrática del cómputo requiere equivalentes: **acciones que eleven el coste de ignorar las demandas**. Boicots coordinados. Huelgas de trabajadores tech. Regulaciones con sanciones reales. Campañas de exposición pública.

Nada de esto es fácil. Pero es la única vía que ha funcionado históricamente para conquistas similares.

---

## 9. Lo que las máquinas no deciden

Hay una última mentira que desmontar: que el límite P≠NP es un hecho técnico que las máquinas nos revelan.

No. Es un hecho matemático que los humanos descubrimos, formulamos en nuestro lenguaje, y decidimos cómo interpretar políticamente.

Las máquinas no "deciden" que la verificación de fake news no es prioritaria. Los humanos que las construyen y financian deciden no priorizarla. Las máquinas no "determinan" que la optimización logística de Amazon vale más que el transporte público. Los humanos que asignan recursos lo determinan.

El límite P≠NP nos dice que no podemos hacerlo todo. No nos dice qué hacer.

**Esa decisión es nuestra**. Y mientras la dejemos en manos de corporaciones y Estados, servirá a corporaciones y Estados. Si queremos que sirva a la vida digna, tenemos que **arrebatarles el poder de decidir**.

No pidiéndolo. Tomándolo.

---

## 10. Preguntando caminamos: la heurística de la dignidad

El Grupo 3 del experimento de María y Jordi no reportó. La racionalidad estándar se paralizó ante el límite.

Hay otra racionalidad que no se paraliza: **la de quienes caminan preguntando**.

No esperan la solución óptima para empezar. Empiezan con lo que tienen, ajustan según lo que aprenden, comparten con quienes encuentran en el camino. No tienen mapa completo del territorio; **hacen el mapa mientras caminan**.

Esta no es racionalidad inferior. Es la única racionalidad que funciona ante problemas NP: **heurística iterativa con aprendizaje distribuido**.

Lo que las comunidades autónomas han practicado durante décadas tiene nombre técnico ahora: **algoritmos de enjambre**, **aprendizaje por refuerzo multi-agente**, **optimización evolutiva distribuida**. La diferencia es que ellas lo hacen con personas, territorios y vidas. Pero el patrón es el mismo.

**Implicación**: Si la única forma de enfrentar problemas a gran escala es con coordinación federada y heurísticas iterativas, entonces las comunidades que ya practican esto **no son arcaísmos románticos**. Son **prototipos del futuro**.

La pregunta no es si la autonomía federada es "viable a gran escala". La pregunta es si tenemos otra opción. La matemática dice que no.

---

## Cierre: El límite como puerta

El límite P≠NP no es un muro. Es una **puerta**.

Del lado de acá está la ilusión de que un centro suficientemente potente puede resolverlo todo. Esa ilusión justifica la concentración de poder: "déjennos a los expertos/corporaciones/Estados, que nosotros sabemos".

Del lado de allá está el reconocimiento de que ningún centro puede. Y si ningún centro puede, entonces la única forma de operar es **sin centro**. Federación. Coordinación sin jefe. Heurísticas locales con aprendizaje compartido.

Atravesar la puerta no es resignación. Es **liberación**. El límite matemático que parecía condenarnos a la impotencia resulta ser el argumento más fuerte contra la centralización.

No podemos resolverlo todo. Pero podemos elegir qué intentamos. Y podemos elegirlo juntos, sin esperar que un centro inexistente decida por nosotros.

El futuro no está computado. Está por computar. Y la pregunta es quién escribe el código.

---

*[Análisis bajo perspectiva @orangeflag: registro técnico-político hibridado; género ensayo proyectivo; estilo dialéctico-propositivo. Perspectiva @yellowflag: límite P≠NP como condición habilitante, no solo restrictiva; cuadrante IC→SC (de cultura a estructura). Fuentes: T04x01, teoría de algoritmos distribuidos, experiencias de coordinación federada, tendencias en IA multi-agente.]*

---

## 1. El Experimento de María y Jordi

En el verano de 2022, dos profesores organizaron un experimento para atacar el problema desde cinco ángulos distintos. María (programadora) y Jordi (matemático) dividieron a los participantes en cinco grupos, cada uno caracterizado por un "motor de pensamiento" diferente:

**Grupo 1 — Humano de corta edad**: Propuso usar la "magia" como puente sobre lo intratable. Solución ingeniosa pero no operativa. Confianza en poderes que exceden la formalización.

**Grupo 2 — Autómata Universal**: Usaría una máquina de Turing con cinta infinita para explorar exhaustivamente. Solución correcta pero intratable: terminaría después del fin del universo.

**Grupo 3 — Humano adulto**: **No reportó**. De los cinco grupos, el único que representa la racionalidad humana estándar no pudo ofrecer estrategia. Significativo.

**Grupo 4 — PC Gaming**: Propuso lanzar mensajes persistentes en blockchain hasta "llenar el mundo exterior". La universalidad como **saturación del espacio**. Cumple la métrica pero no resuelve el problema.

**Grupo 5 — Inteligencia Colectiva**: Distribuyó el problema entre múltiples agentes. Mejor aproximación, pero no garantiza óptimo.

El experimento revela que ningún "motor de pensamiento" —ni mágico, ni formal, ni racional, ni computacional, ni colectivo— puede **contener** la universalidad. Solo pueden **aproximarse** a ella.

---

## 2. Los Alephs de Cantor

Para entender por qué, necesitamos a Georg Cantor. En el siglo XIX demostró que hay **infinitos más grandes que otros**.

El conjunto de números **Naturales** (1, 2, 3...) es infinito. Por inducción, siempre podemos agregar uno más. Llamemos a este infinito **Aleph-0**.

El conjunto de números **Reales** (con decimales) es aún más grande. El Aleph-1 contiene infinitos puntos entre cualquier par de enteros. No es el doble: es **inconmensurablemente mayor**.

¿Por qué importa? Porque los problemas **P** (polinomiales) operan en espacios manejables. Los problemas **NP** (no deterministas polinomiales) requieren explorar espacios que crecen exponencialmente.

El viajante de 100 ciudades tiene 100! (factorial) posibles rutas. Ese número —9.3 × 10^157— no cabe en ninguna computación que una máquina pueda ejecutar en tiempo razonable. Ni hoy, ni en un millón de años.

---

## 3. ¿Y qué tiene que ver con la IA?

Todo.

La inteligencia —humana o artificial— consiste en encontrar **buenas** soluciones a problemas NP en tiempo razonable. No soluciones óptimas: **heurísticas**, aproximaciones, "suficientemente buenas". El cerebro no calcula todas las posibilidades; recorta, asume, apuesta.

Las redes neuronales hacen lo mismo. No resuelven el problema del viajante explorando todas las rutas. Aprenden **patrones** de qué rutas tienden a ser mejores y proponen candidatos. A veces aciertan, a veces no. Pero terminan en segundos, no en eones.

El problema de la escala es este: si P≠NP (lo que todos creen pero nadie ha probado), entonces hay un **muro**. Problemas que ninguna computación finita puede resolver óptimamente.

¿La computación cuántica es el salto? Promete operar en superposición, explorando múltiples caminos simultáneamente. Pero hasta ahora, los QPU solo aceleran clases específicas de problemas. No eliminan el muro; lo desplazan.

---

## 4. La política del límite

Aquí viene la traducción política. El límite P≠NP no es neutral. **Quién decide qué problemas abordar** es una decisión política.

### Lo que el límite NO dice

El límite matemático no dice "renuncien". Dice: **no pueden resolverlo todo; elijan**.

La elección de qué problemas atacar con recursos computacionales escasos es política:

| Problema | Quién financia | Quién se beneficia |
|----------|----------------|-------------------|
| Optimización de rutas logísticas | Amazon, Walmart | Corporaciones |
| Plegamiento de proteínas | Pharma, DeepMind | Primero pharma, después salud pública |
| Predicción de criminalidad | Policía, gobiernos | Sistema penal (sesgado) |
| Verificación de fake news | Nadie a escala | Bien público sin financiador |

El límite P≠NP se usa para justificar resignación cuando conviene ("es técnicamente imposible verificar todo") pero se ignora cuando hay beneficio ("optimicemos la cadena de suministro aunque cueste millones en cómputo").

### Implicación para FUNDACIÓN

El problema de la escala no es un obstáculo pasivo. Es un **campo de batalla** donde se decide qué problemas merecen recursos computacionales.

**Pregunta política**: ¿Quién decide qué problemas valen la pena atacar con heurísticas imperfectas? ¿Quién asume el riesgo de las aproximaciones que fallan?

---

## 5. El sujeto que prioriza: quién decide qué computar

Si la escala impone límites, alguien debe elegir qué se intenta y qué se abandona. Esa elección no es técnica: es política.

### Tres actores que priorizan hoy

**Corporaciones**: Invierten en problemas con retorno de inversión. Amazon optimiza sus rutas; no optimiza el transporte público de ciudades pobres.

**Estados**: Invierten en problemas de seguridad y control. La NSA descifra comunicaciones; no invierte en verificar desinformación electoral.

**Academia**: Investiga lo que da papers y grants. El plegamiento de proteínas es sexy; la auditoría algorítmica de sesgos, menos.

### Lo que falta: priorización democrática

No existe hoy un mecanismo para que **la ciudadanía decida colectivamente** qué problemas computacionales merecen inversión pública.

Las propuestas habituales suenan bien:

1. **Consejos ciudadanos de priorización computacional**: Asambleas por sorteo que decidan dónde invertir recursos de cómputo público.
2. **Auditoría de externalidades**: Antes de desplegar una heurística, evaluar quién paga el coste de sus errores.
3. **Transparencia de prioridades**: Las corporaciones que usan recursos públicos (electricidad, formación, infraestructura) deben declarar qué problemas priorizan.

Pero estas propuestas asumen que la priorización es solo un problema de *información* y *participación*. **No lo es**. Es un problema de *poder*.

### La pregunta incómoda: ¿con qué fuerza?

Si un consejo ciudadano decide que Amazon debe dedicar el 10% de su capacidad computacional a optimizar transporte público en lugar de su propia logística, ¿qué pasa cuando Amazon dice que no?

Si una auditoría de externalidades determina que los algoritmos de scoring crediticio discriminan a minorías, ¿quién obliga a los bancos a cambiarlos?

Si exigimos transparencia de prioridades y las corporaciones responden con lobbying, evasión, o simplemente ignorando la exigencia, ¿entonces qué?

**La priorización democrática de la computación requiere la misma fuerza que cualquier conquista social**: organización, presión sostenida, capacidad de imponer costes a quienes no cooperan.

### Experiencias de priorización disputada

| Caso | Qué pasó | Lección |
|------|----------|---------|
| **Green computing advocates (2010s)** | Activistas exigen que big tech use energía renovable | Funcionó donde había presión de empleados + consumidores + reguladores. Apple y Google cambiaron por PR, no por ley. |
| **Right to repair movement** | Exigen acceso a diagnósticos y piezas | Avances lentos, corporaciones resisten. Funcionó mejor donde había alianza con agricultores (tractores John Deere). |
| **Algorithmwatch (2016-)** | ONG que audita algoritmos públicos | Expone escándalos pero no cambia prioridades. Falta músculo político para forzar cambios. |
| **Timnit Gebru y "stochastic parrots" (2020)** | Investigadora despedida por cuestionar prioridades de Google AI | Mostró que cuestionar prioridades desde dentro tiene coste alto. Pero generó debate público. |

**Patrón**: La priorización no cambia por pedir. Cambia cuando hay coaliciones con capacidad de presión sostenida.

### Lo que sabemos que funciona

De la historia de movimientos que lograron cambiar prioridades de producción (no computacional, pero aplicable):

1. **Coaliciones transversales**: Los trabajadores tech solos no pueden. Necesitan alianzas con usuarios afectados, académicos, periodistas, reguladores.

2. **Puntos de presión concretos**: No "cambien las prioridades de la IA" sino "dejen de vender reconocimiento facial a la policía". Lo específico es organizable.

3. **Costes reputacionales y económicos**: Boicots, campañas de desinversión, exposición mediática. Si ignorar la demanda tiene precio, la demanda se atiende.

4. **Alternativas demostrables**: No solo criticar qué computan, sino mostrar qué *podríamos* computar. Proyectos piloto de cómputo para bien público que demuestren viabilidad.

### El límite como arma de doble filo

El límite P≠NP puede usarse para **justificar inacción** ("es imposible verificar todo el contenido generado por IA") o para **exigir priorización justa** ("si no podemos verificar todo, decidamos democráticamente qué verificamos").

La diferencia entre ambos usos es **quién tiene poder de decisión**.

Pero esa diferencia no se resuelve con argumentos. Se resuelve con organización.

---

## 6. Lo que se puede hacer

El límite de la escala no se negocia. Pero sí se puede:

1. **Elegir qué problemas atacar** (priorización política).
2. **Distribuir el riesgo de las heurísticas** (quién paga cuando fallan).
3. **Transparentar las aproximaciones** (saber que el sistema no es óptimo).
4. **Reservar recursos para problemas de bien público** (no solo los rentables).

Estas cuatro líneas parecen sensatas. Y son **insuficientes sin condiciones de implementación**.

### Condiciones de implementación

**Para 1 (priorización política)**:
- *Requisito*: Mecanismo federativo de decisión, no centralizado
- *Modelo*: Asambleas locales que elevan prioridades a coordinación regional. No "un gran consejo ciudadano" sino red de nodos con mandato revocable.
- *Problema resuelto*: Evita captura por élites técnicas que monopolizan decisiones "por complejidad"
- *Problema pendiente*: ¿Cómo agregar preferencias heterogéneas? Sin respuesta simple. Pero la federación distribuye el conflicto en lugar de concentrarlo.

**Para 2 (distribución del riesgo)**:
- *Requisito*: Inversión de la carga de la prueba
- *Mecanismo*: Quien despliega heurística imperfecta asume responsabilidad por los falsos positivos y negativos. No "el sistema falló, qué le vamos a hacer" sino "el sistema falló, págame".
- *Experiencia relevante*: Responsabilidad objetiva en daños ambientales. La empresa contamina, la empresa paga, aunque no haya "culpa". Aplicar lo mismo a daños algorítmicos.
- *Resistencia esperada*: Alta. Las corporaciones alegarán que la responsabilidad objetiva impide innovación. Respuesta: impide innovación *descuidada*. Eso es el punto.

**Para 3 (transparencia de aproximaciones)**:
- *Requisito*: Legibilidad para no-expertos
- *Problema actual*: Publicar código no es transparencia si nadie puede leerlo. Publicar papers no es transparencia si solo los leen académicos.
- *Mecanismo*: Explicaciones en lenguaje natural de qué hace el sistema, para quién, con qué limitaciones. Obligatorias antes del despliegue, no post-hoc.
- *Modelo*: Prospectos de medicamentos. Imperfectos pero existen. Ningún algoritmo de alto impacto tiene prospecto equivalente.

**Para 4 (recursos para bien público)**:
- *Requisito*: Financiación independiente del ciclo electoral y del mercado
- *Mecanismo posible*: Impuesto sobre cómputo comercial que financia cómputo público. Similar a impuestos sobre extracción de recursos naturales.
- *Problema*: Evasión (computar en jurisdicciones sin impuesto). Solución parcial: condiciones de acceso al mercado local (como con emisiones de carbono).
- *Alternativa*: Infraestructura de cómputo pública, tipo biblioteca. Cualquier ciudadano puede usar para proyectos no comerciales.

### María y Jordi, de nuevo

El experimento no buscaba resolver P=NP. Buscaba **mostrar** que todo motor de pensamiento choca con el mismo límite.

Pero hay una lección adicional que el experimento no extrajo: **el Grupo 3 (Humano adulto) no reportó**. De todos los grupos, el que representa la racionalidad estándar fue el único sin estrategia.

¿Por qué? Porque la racionalidad estándar —la del sentido común, la del "ya veremos", la del "eso es muy complicado"— no tiene protocolo para enfrentar límites matemáticos. Los ignora o se rinde.

Lo que sí tienen protocolo son:
- Los que creen en magia (no funciona pero intentan)
- Los que confían en fuerza bruta (no escala pero intentan)
- Los que saturan el espacio (no resuelve pero intentan)
- Los que distribuyen el problema (mejor aproximación)

**Lección**: La resignación no es racionalidad. Es ausencia de estrategia. El límite P≠NP no dice "ríndanse". Dice "organícense diferente".

---

*[Fuentes: T04x01 § "Experimento María/Jordi", § "Alephs de Cantor". Hibridación con experiencias de movimientos por green computing, right to repair, algorithmwatch.]*
