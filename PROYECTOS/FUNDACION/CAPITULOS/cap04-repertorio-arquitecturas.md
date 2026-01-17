# Capítulo 4: Repertorio de arquitecturas

## Las máquinas que hacen máquinas (y las máquinas que hacemos nosotros)

> **Arco II — Formas concretas** | Capítulo 4 de 12  
> Función: Cartografiar las arquitecturas —de silicio y de carne— como formas de coordinación que compiten por el futuro

*Desplazamiento: Temporal + Material*

---

## Abstract

Hay dos tipos de arquitectura que luchan por el siglo XXI.

Una está grabada en silicio: CPU, GPU, TPU, QPU. Chips fabricados en oligopolio, concentrados en tres islas del Pacífico, controlados por corporaciones que no rinden cuentas a nadie. Esta arquitectura procesa información; pero también procesa poder. Cada transistor es una decisión geopolítica solidificada.

La otra está tejida en carne y memoria: federaciones, consejos, asambleas, redes de apoyo mutuo. Arquitecturas de coordinación humana que existen hace milenios, que fueron declaradas "superadas" por el Estado moderno, que reaparecen cada vez que el Estado colapsa o traiciona. Esta arquitectura no tiene patente, no cotiza en bolsa, no aparece en los papers de Stanford. Pero ha sobrevivido a todo lo que intentó destruirla.

Este capítulo cruza ambas. No por metáfora decorativa, sino porque el futuro se decide en la intersección: **quién controla las máquinas de silicio determinará qué arquitecturas de carne pueden existir.** Y viceversa: qué arquitecturas de carne construyamos hoy determinará si las máquinas de silicio servirán a la vida o la administrarán.

---

## §0. Lo que vieron los que vinieron antes

En 1846, un tipógrafo francés escribió que la propiedad es un robo. Lo encarcelaron. Después lo exiliaron. Después lo olvidaron —salvo quienes siguieron leyéndolo en clandestinidad.

Proudhon no sabía qué era un transistor. Pero entendía algo que los ingenieros de TSMC prefieren no pensar: **toda infraestructura material cristaliza relaciones de poder**. La imprenta que componía no era neutral; decidía qué voces circulaban y cuáles morían en silencio. El ferrocarril que empezaba a cruzar Europa no era neutral; conectaba mercados para quien pudiera pagar el billete. Las herramientas nunca son solo herramientas.

Un siglo después, en las montañas de Chiapas, un comunicado sin firma diría: "Nuestro caminar pregunta." No era filosofía abstracta. Era descripción operativa: cómo tomar decisiones colectivas cuando no hay centro que decida, cuando cada comunidad tiene sus condiciones, cuando el territorio es tan diverso que ningún mapa único lo captura.

Entre Proudhon y los comunicados zapatistas hay un hilo que el poder prefiere invisible: **el repertorio de arquitecturas de coordinación sin centro**. Federalismo. Mutualismo. Apoyo mutuo. Consejos rotativos. Mandato revocable. Consenso asambleario. Autonomía territorial con coordinación horizontal.

Estas no son utopías. Son **tecnologías probadas**. Funcionaron en los talleres de relojeros suizos del siglo XIX. Funcionaron en las colectividades aragonesas de 1936. Funcionan hoy en las Juntas de Buen Gobierno de Chiapas, en las cooperativas de Mondragón, en las redes de cuidados que sostienen las ciudades cuando el Estado recorta.

El problema es que no hay venture capital para documentarlas. No dan papers en Nature. No tienen departamento de marketing.

Pero existen. Y compiten —aunque no lo sepan— con las arquitecturas de silicio por definir qué formas de vida serán posibles en el siglo que viene.

---

## §1. Transición: Del límite lógico al límite material

El capítulo anterior estableció P≠NP como límite epistémico: hay problemas fáciles de verificar pero difíciles de resolver. Ese límite es **lógico-matemático**, independiente del hardware.

Este capítulo ancla ese límite en dos materias distintas:

**Materia silícea**: Transistores, silicio dopado, coltán extraído de minas congoleñas, energía de centrales térmicas. La computación no flota en el éter; se paga en factura de luz, tonelada de mineral, hectárea de refrigeración.

**Materia viva**: Cuerpos que se reúnen, memorias que transmiten prácticas, afectos que sostienen la cooperación cuando no hay contrato. La coordinación humana tampoco flota; se paga en tiempo, en riesgo, en las vidas que se apuestan cuando el Estado no protege.

Ambas materias computan. La pregunta es: **¿para qué? ¿para quién?**

---

## §2. Las cuatro arquitecturas de silicio (y sus sombras de carne)

### CPU: Coherencia secuencial / El líder carismático

La Unidad Central de Procesamiento ejecuta instrucciones **una tras otra**, en secuencia predecible. Todo pasa por ella. Es el cuello de botella universal, pero también el punto de control universal.

En política, conocemos bien esta arquitectura: **el líder que decide todo**. El rey, el secretario general, el caudillo, el CEO. Versátil —puede abordar cualquier problema— pero lento cuando el problema se multiplica. Y sobre todo: **punto único de fallo**. Si cae el líder, colapsa el sistema.

La CPU funciona para tareas pequeñas o cuando la velocidad no importa. Los Estados modernos funcionan como CPUs: todo pasa por el centro, todo se serializa, todo se audita desde arriba. Es eficiente para cobrar impuestos. Es letal para responder a pandemias.

**Lo que Bakunin ya sabía**: "La libertad sin socialismo es privilegio, injusticia; el socialismo sin libertad es esclavitud y brutalidad." La crítica al Estado marxista era exactamente esto: una arquitectura CPU aplicada a la emancipación produce una burocracia que primero se vuelve lenta y después se vuelve tiránica. El líder-CPU no puede procesar la complejidad de millones de vidas; las simplifica, las serializa, las mata si no caben en la cola de instrucciones.

### GPU: Coherencia paralela / La asamblea que vota

La Unidad de Procesamiento Gráfico nació para renderizar imágenes: millones de píxeles que deben calcularse simultáneamente. Hace **lo mismo a muchos datos a la vez**.

En política: **la democracia electoral**. Todos votan el mismo día, sobre la misma pregunta, con las mismas opciones. Paralelo, sí. Pero rígido: si el problema no cabe en la papeleta, no se puede procesar. Y el resultado es agregado, no deliberado: sumas de voluntades individuales que nunca se encontraron.

La GPU funciona para problemas que admiten paralelización homogénea. El referéndum funciona cuando la pregunta es simple y todos entienden lo mismo. Pero la vida rara vez es así.

**Lo que Rosa Luxemburg ya sabía**: La espontaneidad de masas era paralela pero creativa, no repetitiva. La huelga de masas no era un millón de personas haciendo lo mismo; era un millón de personas respondiendo a las mismas condiciones desde sus situaciones distintas. La GPU electoral es simulacro: paralelismo sin diversidad.

### TPU: Coherencia tensorial / La burocracia optimizada

La Unidad de Procesamiento Tensorial fue diseñada por Google específicamente para redes neuronales. Opera con **tensores**: matrices multidimensionales que representan patrones aprendidos de datos masivos.

En política: **la tecnocracia**. Expertos que han procesado toda la información relevante y producen recomendaciones optimizadas. El Banco Central que ajusta tasas de interés. La agencia de calificación que evalúa riesgos. El algoritmo de asignación de recursos que distribuye ventiladores durante la pandemia.

La TPU es opaca. Sus "pesos" no son interpretables. Funciona —cuando funciona— pero nadie sabe exactamente por qué. La tecnocracia es igual: produce decisiones que parecen óptimas, pero cuya lógica es inaccesible para los afectados.

**Lo que Illich ya sabía**: Las instituciones que superan cierto umbral de complejidad se vuelven contraproductivas. El hospital produce enfermedad iatrógena. La escuela produce ignorancia certificada. La TPU tecnocrática produce optimización que optimiza lo incorrecto: máximo PIB, mínima vida digna.

### QPU: Coherencia cuántica / El futuro abierto

La Unidad de Procesamiento Cuántico usa qubits en **superposición** de estados. En teoría, explora exponencialmente más posibilidades antes de colapsar en una respuesta.

En política: **todavía no existe a escala**. Pero el arquetipo sí: la asamblea que mantiene abiertas múltiples posibilidades hasta que el consenso las colapsa en una decisión. El "preguntando caminamos" que no decide de antemano a dónde va.

La QPU requiere condiciones extremas: temperaturas cercanas al cero absoluto, aislamiento casi perfecto. La asamblea que no colapsa prematuramente también requiere condiciones extremas: confianza acumulada, tiempo sin presión, cultura de escucha que no se construye en una generación.

**Lo que los zapatistas ya saben**: "Vamos despacio porque vamos lejos." La superposición cuántica de posibilidades solo se mantiene si no hay prisa por colapsar. El Caracol que delibera durante días antes de decidir no es ineficiente; está computando en modo cuántico social: explorando posibilidades antes de elegir.

---

## §3. El isomorfismo que nadie quiere ver

| Arquitectura silicio | Arquitectura política | Fortaleza | Debilidad | Quién la promociona |
|---------------------|----------------------|-----------|-----------|---------------------|
| **CPU** | Líder centralizado | Versatilidad | Cuello de botella | Estados, partidos leninistas |
| **GPU** | Democracia electoral | Escala | Rigidez, agregación sin deliberación | Liberalismo |
| **TPU** | Tecnocracia | Optimización | Opacidad, desconexión de afectados | Corporaciones, organismos internacionales |
| **QPU** | Asamblea deliberativa | Exploración de posibilidades | Requiere condiciones excepcionales | Movimientos autonomistas |

No es metáfora. Es **isomorfismo estructural**: el mismo patrón de coordinación, implementado en sustratos distintos.

Y aquí está lo que importa: **las arquitecturas de silicio que financiamos determinan qué arquitecturas políticas serán pensables**.

Si toda la inversión va a CPU y GPU, la política pensable será centralismo y agregación. Si no hay QPU —o si está controlada por corporaciones— la superposición de posibilidades será lujo privado, no recurso público.

Las arquitecturas de silicio no son neutrales. Son **infraestructura de lo imaginable**.

---

## §4. La geopolítica del chip (y la geopolítica del pan)

### El oligopolio del silicio

La fabricación de chips avanzados (menos de 7 nanómetros) está controlada por un oligopolio:

| Empresa | País/Región | Cuota de mercado |
|---------|-------------|------------------|
| TSMC | Taiwan | 54% |
| Samsung | Corea del Sur | 17% |
| Intel | Estados Unidos | 8% |
| Otros | Varios | 21% |

**Tres empresas controlan el 79% de la fabricación de los chips que hacen funcionar la inteligencia artificial.** Y las tres están en el Pacífico, en países cuya existencia depende de la protección militar estadounidense.

Esto no es accidente. Es diseño. La misma lógica de especialización extrema que maximiza eficiencia **minimiza resiliencia**. Un terremoto en Taiwan. Un tifón en Corea. Una decisión de China sobre el estrecho. Cualquier perturbación local colapsa la cadena global.

### El oligopolio invisible: quién alimenta a quién produce chips

Pero hay otro oligopolio que nadie menciona: **la cadena alimentaria de los trabajadores de chips**.

Los ingenieros de TSMC comen arroz. El arroz viene de campos que consumen agua. El agua viene de acuíferos que se agotan. Taiwan importa el 70% de sus calorías. Corea del Sur importa el 75%. La isla que fabrica el cerebro del mundo no puede alimentar a sus habitantes.

Esto crea una geopolítica invisible: **quien controla el grano controla el chip**.

Ucrania y Rusia producen el 30% del trigo global. ¿Coincidencia que la guerra de 2022 disparara los precios del pan **y** de los semiconductores? No. El sistema está acoplado de formas que los expertos sectoriales no ven porque miran sus silos.

### Lo que Kropotkin ya sabía

En 1892, Kropotkin publicó *La conquista del pan*. No era solo título: era programa. Argumentaba que ninguna revolución sobrevive si no resuelve el problema del alimento **antes** de resolver el problema del poder.

Las comunas de París habían caído no por falta de valentía, sino porque no podían comer. La Revolución Rusa sobrevivió sus primeros años requisando grano a punta de pistola —y matando el apoyo campesino que la había sostenido.

Kropotkin proponía lo contrario: **primero las infraestructuras de supervivencia, después la política**. Panaderías comunales, huertas urbanas, almacenes de invierno organizados por los propios barrios. No como proyecto de mañana, sino como condición de posibilidad de cualquier mañana.

Tradúzcase a 2026: **primero la soberanía alimentaria y energética, después la soberanía digital**.

Un movimiento que depende de AWS para coordinar, de TSMC para procesar, y de Cargill para comer, no es movimiento. Es cliente.

---

## §5. El repertorio de las arquitecturas de carne

Mientras la ingeniería de silicio produce cuatro arquitecturas, la ingeniería social ha producido decenas. Aquí van las que han sobrevivido más de una generación:

### La federación: coordinación sin fusión

**Principio**: Unidades autónomas que coordinan lo que les conviene coordinar, sin ceder soberanía sobre lo que no.

**Implementaciones**: 
- Los cantones suizos (desde 1291)
- La Confederación de Pueblos Mayas (antes de Colón)
- Las federaciones de colectividades aragonesas (1936-1939)
- Las Juntas de Buen Gobierno zapatistas (2003-presente)

**Fortaleza**: Resiliencia. Si cae una unidad, las demás continúan. No hay cabeza que cortar.

**Debilidad**: Lentitud en decisiones que requieren unanimidad. Conflictos entre unidades que nadie arbitra.

**Lo que Bakunin perfeccionó**: La federación de federaciones. Niveles de coordinación que van de lo local a lo regional a lo global, pero siempre de abajo arriba, siempre revocables, siempre con derecho de secesión.

### El mutualismo: intercambio sin ganancia

**Principio**: Producir para intercambiar valor por valor, sin extracción de plusvalía.

**Implementaciones**:
- Los Bancos del Pueblo de Proudhon (1848-1849, aplastados)
- Las cooperativas de consumo del movimiento obrero (siglo XIX-presente)
- Las monedas locales complementarias (Ítaca, Bristol, WIR suizo)
- Las redes de trueque post-crisis Argentina 2001

**Fortaleza**: Permite operar dentro del sistema sin alimentarlo.

**Debilidad**: Escala limitada mientras el sistema dominante exista.

**Lo que Proudhon entendió**: El problema no es el mercado; es el mercado donde uno de los intercambiadores tiene el monopolio del dinero. Si el dinero se democratiza, el mercado se transforma.

### El apoyo mutuo: solidaridad sin institución

**Principio**: Ayudar al que lo necesita hoy porque mañana serás tú.

**Implementaciones**:
- Las sociedades de socorros mutuos (siglo XIX)
- Los fondos de huelga sindicales
- Las redes de cuidados de la pandemia 2020
- Las ollas comunes chilenas post-estallido

**Fortaleza**: No requiere burocracia. Se activa cuando hace falta.

**Debilidad**: Depende de la densidad de lazos previos. No escala a desconocidos sin algo más.

**Lo que Kropotkin documentó**: El apoyo mutuo no es altruismo; es inteligencia colectiva. Las especies que cooperan sobreviven más que las que compiten. Darwin mal leído ocultó esto; Kropotkin lo recuperó.

### La asamblea deliberativa: decisión sin delegación permanente

**Principio**: Quienes son afectados deciden, directamente, después de deliberar.

**Implementaciones**:
- El ágora ateniense (con todas sus exclusiones)
- Los soviets de 1905 y 1917 (antes de su captura)
- Las asambleas del 15M
- Los cabildos abiertos latinoamericanos

**Fortaleza**: Legitimidad máxima. Quien decide, obedece lo decidido.

**Debilidad**: Tiempo. La deliberación requiere horas que no todos tienen.

**Lo que Emma Goldman defendió**: La democracia directa no es impracticable; es incompatible con el capitalismo que roba el tiempo de los trabajadores. Reduce la jornada laboral y verás florecer las asambleas.

### El mandato imperativo: delegación revocable

**Principio**: Quien representa lleva instrucciones específicas; si se desvía, se le revoca.

**Implementaciones**:
- La Comuna de París (1871)
- Los consejos obreros alemanes (1918-1919)
- Los delegados de base de la CGT española (años 30)
- Los "caracoles" zapatistas actuales

**Fortaleza**: Impide la profesionalización de la política.

**Debilidad**: Requiere vigilancia constante de la base.

**Lo que Simone Weil denunció**: El partido político es una máquina de fabricar pasión colectiva y mentira masiva. El mandato imperativo es el antídoto: nadie habla en nombre de nadie más allá de lo que se le ha encargado.

---

## §6. Los futuros cancelados que vuelven

Aquí está el secreto que este capítulo revela:

**Las arquitecturas de carne que el siglo XX declaró "superadas" son exactamente las que la crisis del siglo XXI necesita.**

La federación fue declarada "ineficiente" frente al Estado-nación centralizado. Pero el Estado-nación centralizado no puede responder a pandemias, no puede adaptarse al cambio climático local, no puede procesar la diversidad de situaciones de 40 millones de habitantes.

El mutualismo fue declarado "utópico" frente al mercado global. Pero el mercado global ha producido cadenas de suministro tan frágiles que una semana de bloqueo del Canal de Suez cuesta más que décadas de "eficiencia".

El apoyo mutuo fue declarado "paternalista" frente al Estado de bienestar. Pero el Estado de bienestar se desmantela mientras escribo esto, y las redes de cuidados vecinales son lo único que queda.

La asamblea deliberativa fue declarada "lenta" frente a la democracia representativa. Pero la democracia representativa produce decisiones rápidas que la población no acata porque no las siente suyas.

El mandato imperativo fue declarado "impracticable" frente al partido de masas. Pero los partidos de masas producen burocracias que traicionan a su base antes de la primera legislatura.

**Los futuros cancelados del siglo XIX están disponibles para el siglo XXI.** No como nostalgia sino como tecnología.

---

## §7. Los nietos que ya están aquí

Permíteme presentarte a algunas personas que existen en 2026. Sus nombres son compuestos porque son herencia acumulada:

**María Federici-Zibechi** trabaja en una cooperativa de cuidados en Montevideo. Nunca leyó a Silvia Federici ni a Raúl Zibechi, pero practica lo que ellos teorizaron: la reproducción de la vida como trabajo político, la autonomía territorial como estrategia. Su cooperativa no espera al Estado; produce su propia infraestructura de cuidados, y cobra a quienes pueden pagar para subsidiar a quienes no.

**Carlos Illich-Freire** es maestro en una escuela pública de São Paulo que funciona contra su propio ministerio. Aplica pedagogía del oprimido sin llamarla así: los estudiantes investigan su barrio, producen conocimiento sobre sus condiciones, lo comparten en asambleas donde los adultos aprenden de los jóvenes. La escuela es un nodo de algo más grande que nadie coordina pero todos alimentan.

**Amira Goldman-Sousa** programa en una cooperativa tech de Barcelona que rechazó tres ofertas de compra de startups estadounidenses. Desarrollan herramientas para movimientos sociales: apps de coordinación que no pasan por servidores centrales, plataformas de decisión que implementan mandato revocable en código. Cobran a ONGs ricas para subsidiar a colectivos sin dinero. Su modelo de negocio es un insulto a los inversores de riesgo.

**Kwame Fanon-Marcos** organiza en Detroit, en los barrios que la industria automotriz abandonó. Las casas vacías se convierten en huertos; los huertos en nodos de intercambio; los nodos en asambleas que deciden qué se necesita. No piden permiso a la alcaldía. Ocupan lo abandonado y lo hacen producir. Cuando la policía viene, encuentran un jardín comunitario con ancianos regando tomates. Es difícil desalojar tomates.

Ninguno de estos nombres es real. Todos estos perfiles son reales. Son los nietos que los autores del linaje nunca conocieron, pero que están haciendo lo que aquellos soñaron.

Y aquí está lo importante: **no saben que son nietos**. No leyeron los libros. No conocen la genealogía. Reinventan las soluciones porque las condiciones las exigen. Las arquitecturas de carne se transmiten por práctica antes que por texto.

---

## §8. La convergencia que viene (o que impediremos)

Ahora puedo mostrarte el nudo del capítulo.

Las arquitecturas de silicio y las arquitecturas de carne están convergiendo. No en abstracto: en proyectos concretos, en código que ya existe, en experimentos que ya funcionan.

### Lo que existe hoy (2026)

**Plataformas de decisión federada**: Software que permite a grupos autónomos coordinar sin fusionarse. Decidim (nacido en Barcelona), Loomio (Nueva Zelanda), Consul (Madrid). Ninguna ha escalado a millones, pero todas funcionan para decenas de miles.

**Criptomonedas mutualistas**: No Bitcoin (que es capitalismo acelerado), sino proyectos que implementan demurrage (moneda que pierde valor si no circula), o que distribuyen creación monetaria entre todos los participantes. Circles, Grassroots Economics. Pequeños, pero probando conceptos.

**Redes sociales federadas**: Mastodon, Matrix, ActivityPub. No son de nadie; son de todos los que operan nodos. Tienen 10 millones de usuarios. Twitter tiene 500 millones. Pero Twitter es de un hombre; el Fediverso es de nadie.

**IA distribuida**: Proyectos que entrenan modelos sin centralizar datos. Aprendizaje federado donde el modelo viaja a los datos en lugar de los datos al modelo. Google lo usa para teclados predictivos. Nadie lo usa todavía para decisión política. Pero se podría.

### Lo que podría existir mañana (2035)

**Federaciones de comunidades con IA local**: Cada comunidad entrena un modelo con sus datos, para sus necesidades. Los modelos se comunican entre sí para aprender, pero ninguno centraliza. La TPU se democratiza: no hay Google, hay mil cooperativas con sus propios tensores.

**Asambleas aumentadas**: Deliberación asistida por agentes que resumen posiciones, detectan consensos ocultos, traducen entre lenguajes. No deciden por los humanos; ayudan a los humanos a decidir. La QPU social: explorar posibilidades antes de colapsar.

**Cadenas de suministro transparentes y redundantes**: No la optimización frágil de hoy, sino redes con slack, con alternativas, con capacidad de reconfigurarse cuando un nodo cae. El apoyo mutuo codificado en logística.

**Monedas programables mutualistas**: Dinero que solo sirve para ciertos usos (no para especulación), que caduca si no circula, que se crea distribuido y se destruye cuando cumple su función. Proudhon con smart contracts.

### Lo que impedirán si pueden

Nada de esto es inevitable. El capital y los Estados ven estas posibilidades y actúan:

- La regulación cripto de la UE (MiCA) centraliza lo que era descentralizado
- Las corporaciones tech compran o ahogan a las alternativas cooperativas
- Los Estados declaran "seguridad nacional" cualquier infraestructura que no controlan
- La academia premia papers sobre optimización y castiga investigación sobre resiliencia

**La convergencia entre arquitecturas de silicio y de carne es posible. No es probable. Solo ocurrirá si se pelea.**

---

## §9. El sujeto que fabrica ambas arquitecturas

¿Quién puede hacer esto? ¿Quién disputa simultáneamente las arquitecturas de silicio y las de carne?

### Los tres actores en tensión

**El proletariado digital**: Programadores, ingenieros, diseñadores. Tienen el saber para construir las herramientas pero trabajan para corporaciones que las usarán contra ellos. Algunos desertan a cooperativas. La mayoría no puede permitírselo.

**Los movimientos territoriales**: Comunidades que practican autonomía sin esperar al Estado. Tienen la experiencia de las arquitecturas de carne pero les faltan las de silicio. Dependen de plataformas que no controlan; se coordinan por WhatsApp de una empresa que vende sus metadatos.

**Las grietas institucionales**: Funcionarios, académicos, políticos locales que usan su posición para abrir espacios. No cambian el sistema desde dentro; **crean excepciones que los de fuera aprovechan**. El ayuntamiento que libera código. La universidad que financia cooperativas. El regulador que mira para otro lado.

### Lo que falta: la conexión

Los tres actores existen. Rara vez se encuentran. El programador de cooperativa no conoce a la organizadora territorial. La funcionaria que quiere ayudar no sabe a quién abrir la puerta.

**Aquí está la tarea**: construir los puentes. No un partido que los unifique (eso sería volver a la CPU). Sino protocolos de coordinación que permitan colaborar sin fusionarse.

Federación de federaciones. Arquitectura de arquitecturas.

---

## §10. Cierre: Quién escribe el código

Las máquinas que hacen máquinas las hacen humanos. Los chips de TSMC los diseñan ingenieros, los fabrican operarios, los ensamblan trabajadores precarios. La cadena de silicio es una cadena de manos.

Las arquitecturas de carne también las hacen humanos. Las federaciones las construyen quienes asisten a las asambleas, quienes cumplen los acuerdos, quienes sostienen la cooperación cuando sería más fácil desertar.

**Nadie decide solo qué arquitecturas existirán.** Pero todos decidimos juntos, con nuestras acciones acumuladas, qué es posible y qué se cancela.

El repertorio está abierto. Hay arquitecturas de silicio que sirven a la dominación y arquitecturas que podrían servir a la emancipación. Hay arquitecturas de carne que han funcionado durante siglos y que están disponibles para quien las quiera practicar.

La pregunta no es técnica. La pregunta es política:

**¿Qué arquitecturas construiremos? ¿Y con quién?**

Los que vinieron antes no nos dejaron respuestas. Nos dejaron herramientas. Está en nosotros usarlas, mejorarlas, transmitirlas.

El código está abierto.

Contribuye.

---

*[Análisis @orangeflag: registro híbrido (técnico-histórico-proyectivo); género ensayo-manifiesto; estilo dialéctico con vocación de convocatoria. Desplazamiento temporal máximo: desde 1846 hasta 2035. Perspectiva @yellowflag: las arquitecturas como condiciones de posibilidad de formas de vida. Perspectiva @blackflag: el sujeto que puede disputar está fragmentado pero existe. Fuentes: marco/12-dilemas-accion-revolucionaria, diagnostico/01-estado-cuestion, diagnostico/02-estructura-sentimiento.]*

**Pregunta política**: ¿Puede la clase obrera del chip organizarse globalmente? Las experiencias sugieren que es difícil pero no imposible:

| Caso | Qué pasó | Resultado |
|------|----------|-----------|
| **Foxconn suicidios (2010)** | 18 trabajadores se suicidan. Protestas globales. | Apple aumenta auditorías. Salarios suben 30%. Redes anti-suicidio instaladas. Problema estructural continúa. |
| **Foxconn huelgas (2012)** | 4.000 trabajadores paran en Zhengzhou. | Supresión rápida. Pero: Apple diversifica proveedores por miedo a disrupción. |
| **Congo coltán "conflict-free" (2010s)** | Campaña global exige trazabilidad. Dodd-Frank Sec. 1502 obliga disclosure. | Parcialmente exitoso. Algunas minas certificadas. Pero: aumento de contrabando y economía informal. |
| **Samsung leucemia (2007-2018)** | Trabajadores de fabs desarrollan leucemia. 10 años de negación. | Después de muertos y juicios: Samsung acepta compensar. Pero: otras fabs no auditadas. |
| **TSMC sindicato (2020s)** | Intentos de organización en Taiwan. | Fracasados hasta ahora. TSMC ofrece buenos salarios (para Taiwan) como estrategia anti-sindical. |

**Patrón observable**: Las victorias son parciales, localizadas, y requieren combinación de:
- Tragedia visible (suicidios, muertes por enfermedad)
- Presión de consumidores en mercados ricos
- Riesgo de disrupción para las corporaciones (huelga = iPhone retrasado)
- Litigio sostenido durante años

Ninguna de estas condiciones es fácil de generar. Pero han producido cambios marginales. La pregunta es si pueden producir cambios estructurales.

### Lo que no se ha intentado (todavía)

Algunas estrategias que existen en papel pero no se han desplegado a escala:

**Coalición transversal de la cadena**: Mineros + ensambladores + trabajadores de logística + desarrolladores de software coordinándose. No existe hoy organización que una estos eslabones.

**Huelga de cuello de botella**: Si los 300.000 trabajadores de TSMC paran simultáneamente, la producción global de chips avanzados se detiene. No ha ocurrido. ¿Puede ocurrir?

**Transparencia forzada por base de datos**: Registro público de condiciones laborales en cada eslabón de la cadena, alimentado por denuncias anónimas y auditorías independientes. Proyectos piloto existen (Electronics Watch) pero sin masa crítica.

**Presión desde diseño**: Ingenieros de Nvidia, AMD, Apple exigiendo auditorías de proveedores como condición de empleo. Precedente: Google Maven (2018) donde ingenieros lograron cancelar contrato militar.

### Implicación para FUNDACIÓN

La geopolítica del chip parece inmodificable. Pero toda cadena de suministro tiene puntos de vulnerabilidad:

- El 90% del tráfico de internet pasa por cables submarinos (cortables)
- El 97% de tierras raras viene de China (sancionable)
- Las fábricas de TSMC están en zona sísmica y bajo amenaza militar (vulnerable)

El poder de quienes no fabrican está en **nombrar estas vulnerabilidades** y convertirlas en palanca política. No para sabotear, sino para negociar: "tu cadena depende de nosotros; hablemos de condiciones".

Pero nombrar no basta. Hace falta **capacidad de imponer costes** a quienes ignoran la negociación.

Esa capacidad no existe hoy a escala global. Construirla es trabajo de décadas. Pero es el único camino que ha funcionado históricamente para modificar condiciones materiales de producción: los derechos laborales del siglo XX no se ganaron pidiendo; se ganaron parando.

---

*[Nota técnica: Análisis bajo Nivel 4 MMCO (Matter & Fields). Arquitecturas como coherencias materiales. Hibridación con ARCHIVO/marco/08-trabajo-campo-batalla y experiencias documentadas de organización en electrónica. Fuentes primarias: T04x02 §3.]*
