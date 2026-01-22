# Capítulo 2: El autómata cautivo

## Las máquinas que deciden por nosotros

> **Arco I — Los tres desplazamientos** | Capítulo 2 de 12  
> Función: Desplazamiento antropológico — desnaturalizar al agente automático

---

## Abstract

El autómata **no está aquí "de por sí"**. Fue construido por corporaciones específicas, con fines específicos, para operar en condiciones específicas. No es soberano; es **cautivo** de quienes lo diseñaron, entrenaron y desplegaron.

Cuando un algoritmo decide si obtienes un crédito, si tu currículum llega a un humano, si tu publicación se viraliza o desaparece, no estás enfrentando una ley de la naturaleza. Estás enfrentando una **decisión empresarial cristalizada en código**. La máquina no tiene voluntad propia; tiene la voluntad de sus creadores, congelada y escalada.

Este capítulo establece la segunda coordenada de *Fundación*: el desplazamiento antropológico. Antes de evaluar qué pueden hacer los autómatas, debemos preguntar **quién los construyó, para qué, y a costa de quién**.

---

## 1. La pregunta que no se hace

Cada vez que interactúas con un sistema automatizado, hay una pregunta que el sistema no puede responder: **¿Por qué existo?**

No me refiero a por qué funciona técnicamente. Me refiero a por qué fue construido, quién tomó esa decisión, qué problema pretendía resolver, y para quién. Estas preguntas no están en el código. Están en las salas de juntas, en los planes de negocio, en las decisiones de inversión que precedieron a la primera línea de código.

El autómata es **ontológicamente dependiente**. No surge de sí mismo como surge un árbol de una semilla. Surge de instituciones humanas con intereses, presupuestos y plazos. Olvidar esto es cometer el error fundamental de la era digital: confundir el producto con la naturaleza.

Proponemos analizar todo autómata desde **tres dominios**:

### Dominio ontológico: ¿Qué es?

Un modelo de lenguaje grande (LLM) es una función matemática que predice la siguiente palabra más probable dado un contexto. No "entiende" en ningún sentido humanamente reconocible. Procesa patrones estadísticos extraídos de billones de palabras escritas por humanos.

Un sistema de recomendación es una matriz de preferencias inferidas que maximiza una métrica definida por sus operadores —generalmente, tiempo de permanencia en plataforma o probabilidad de compra.

Un algoritmo de scoring crediticio es un modelo de regresión que correlaciona variables demográficas y conductuales con probabilidad de impago, calibrado sobre datos históricos que incluyen todas las injusticias históricas.

Ninguno de estos sistemas "decide" en el sentido en que decide un juez, un médico o un ciudadano. **Calculan**. La diferencia importa porque las decisiones implican responsabilidad, y los cálculos la diluyen.

### Dominio fenomenológico: ¿Cómo se experimenta?

Desde el punto de vista del usuario, el autómata aparece como una **caja negra con interfaz amigable**. Escribes una pregunta; aparece una respuesta. Subes un currículum; aparece o no aparece en la bandeja de un reclutador. Solicitas un préstamo; te aprueban o te rechazan.

La experiencia está diseñada para ocultar la complejidad. No ves los miles de parámetros ajustados, las funciones de pérdida optimizadas, los sesgos heredados de los datos de entrenamiento. Ves una respuesta limpia que parece venir de ninguna parte.

Esta fenomenología genera una ilusión de **neutralidad mecánica**. Si la máquina lo dice, debe ser objetivo. Pero la máquina no dice nada; **repite patrones que absorbió de nosotros**, magnificados y acelerados.

### Dominio pragmático: ¿A quién sirve?

Aquí está la pregunta que el sistema no puede responder por sí mismo: ¿quién se beneficia de su existencia?

Un modelo de detección de fraude sirve a la entidad financiera, no al cliente sospechoso de fraude. Un sistema de vigilancia predictiva sirve a la policía, no a la comunidad vigilada. Un algoritmo de moderación de contenido sirve a la plataforma, no a los usuarios moderados.

Esto no significa que estos sistemas sean malos *per se*. Significa que **no son neutrales**. Fueron construidos para resolver problemas de alguien, y ese alguien raramente eres tú.

---

## 2. Las tres olas de automatización

Para entender dónde estamos, necesitamos saber de dónde venimos. La historia de la automatización no es una línea recta hacia la "inteligencia"; es una serie de transformaciones en la relación entre humanos y máquinas.

### Primera ola: Automatización de fuerza (siglo XIX)

La máquina de vapor y el telar mecánico no pensaban. Amplificaban la fuerza física, permitiendo hacer en horas lo que antes requería días. El trabajador pasó de artesano a operador: su habilidad dejó de estar en sus manos y pasó a estar en la máquina que manejaba.

**Consecuencia política**: La concentración de maquinaria generó la fábrica, y la fábrica generó el proletariado industrial. La automatización de fuerza no eliminó el trabajo; lo transformó y lo concentró bajo nuevas formas de control.

### Segunda ola: Automatización de cálculo (siglo XX)

La computadora digital automatizó operaciones que antes requerían ejércitos de calculistas humanos. Tareas que llevaban semanas —nóminas, inventarios, simulaciones— se completaron en segundos.

**Consecuencia política**: El trabajo administrativo se fragmentó. Surgió una nueva capa de "trabajadores del conocimiento" que operaban las máquinas de calcular, mientras desaparecían los oficios de escritura, archivo y contabilidad manual.

### Tercera ola: Automatización de patrón (siglo XXI)

Los modelos de aprendizaje automático automatizan la detección de patrones en datos. No siguen instrucciones explícitas; "aprenden" correlaciones de ejemplos. Esto permite automatizar tareas que antes parecían intrínsecamente humanas: reconocer rostros, traducir idiomas, generar texto coherente.

**Consecuencia política**: Por primera vez, la automatización amenaza trabajos cognitivos que se creían a salvo. Pero más importante: los patrones que aprenden las máquinas **incluyen nuestros sesgos, perpetúan nuestras injusticias, y las escalan a velocidades imposibles para la corrección humana**.

---

## 3. Conductismo tecnológico

Hay una ironía histórica en el auge del aprendizaje automático. A mediados del siglo XX, el conductismo dominaba la psicología académica. Su premisa: la mente es una caja negra; solo podemos estudiar estímulos (inputs) y respuestas (outputs). Lo que ocurre adentro es irrelevante o inaccesible.

El conductismo fue derrotado en psicología por la revolución cognitiva de los años 60. Se demostró que los humanos no somos cajas negras; tenemos representaciones internas, procesos mentales, intenciones que importan.

Pero el conductismo **regresó disfrazado de tecnología**. Un modelo de aprendizaje profundo es, funcionalmente, un conductista perfecto: solo conoce inputs y outputs; optimiza respuestas sin "entender" nada; trata el interior como una caja negra de parámetros ajustables.

Cuando aplicamos estos sistemas a decisiones sobre personas, estamos **tratando a humanos como cajas negras**. El sistema de scoring crediticio no sabe por qué tienes mal historial; solo sabe que ciertas variables correlacionan con impago. No le importa si tu deuda fue por enfermedad, divorcio o despido injusto. Las razones son irrelevantes; solo importa el patrón.

Este conductismo tecnológico tiene una consecuencia política devastadora: **elimina la posibilidad de justificación**. Un juez humano puede (y debe) explicar por qué te condena. Un algoritmo de riesgo solo puede decir que tu perfil estadístico coincide con perfiles que reinciden. La diferencia entre explicación y correlación es la diferencia entre ciudadanía y sujeción.

---

## 4. ¿Qué es la información?

Claude Shannon, padre de la teoría de la información, definió la información como **reducción de incertidumbre**. Un mensaje tiene más información cuanto más improbable era antes de recibirlo. "El sol saldrá mañana" es casi redundante; "mañana llueven diamantes" sería altamente informativo (aunque falso).

Esta definición es brillante para ingeniería de comunicaciones. Pero tiene un problema cuando se aplica a decisiones sobre humanos: **ignora el significado**.

Para Shannon, "el gato está en el mat" y "el mat está en el gato" tienen la misma cantidad de información (mismas letras, misma improbabilidad a priori). Pero para un humano, una tiene sentido y la otra no.

Los sistemas actuales heredan esta ceguera al significado. Procesan patrones sintácticos sin acceso a la semántica. Pueden generar texto coherente sin entender qué dicen. Pueden detectar correlaciones sin comprender causas. Pueden clasificar rostros sin reconocer personas.

**Implicación política**: Cuando delegamos decisiones en sistemas ciegos al significado, delegamos a entidades que **no pueden comprender lo que está en juego**. El sistema de moderación no sabe si una imagen es arte, denuncia o pornografía; solo sabe si coincide con patrones de imágenes etiquetadas como "prohibidas".

---

## 5. La trampa de la eficiencia

El argumento más común para desplegar autómatas es la **eficiencia**: procesan más rápido, cuestan menos, no se cansan. ¿Por qué pagar a humanos para hacer lo que las máquinas hacen mejor?

Este argumento tiene varios fallos:

**Primero**: "Mejor" es relativo a una métrica. Un algoritmo puede ser mejor en maximizar clics, pero peor en servir al interés público. La eficiencia siempre es eficiencia *para algo*, y ese algo lo elige quien diseña el sistema.

**Segundo**: La eficiencia a corto plazo puede ser ineficiencia a largo plazo. Un sistema de contratación que filtra currículums eficientemente puede estar eliminando sistemáticamente a candidatos atípicos que aportarían innovación. La métrica de corto plazo (tiempo de procesamiento) oculta el costo de largo plazo (homogeneización del talento).

**Tercero**: Hay valores que no se pueden medir por eficiencia. La justicia no es eficiente; es laboriosa, lenta, deliberada. La democracia no es eficiente; es ruidosa, conflictiva, incierta. Automatizar estos procesos en nombre de la eficiencia puede ser eficiente en destruir lo que los hacía valiosos.

**Cuarto** —y este es el que el discurso tecnológico nunca menciona—: **Eficiencia para quién**. La pregunta que falta en todo debate sobre automatización es quién se queda con los beneficios de la eficiencia ganada.

Cuando una fábrica textil del siglo XIX introducía telares mecánicos, no era para que los tejedores trabajaran menos horas con el mismo salario. Era para producir más con menos tejedores. La "eficiencia" era eficiencia de extracción: más producto por unidad de salario pagado.

Lo mismo ocurre hoy. Cuando una empresa automatiza atención al cliente, no es para que los operadores tengan más tiempo libre. Es para despedirlos. Cuando un hospital usa IA para triaje, no es para que los médicos tengan jornadas más humanas. Es para atender más pacientes con menos médicos. La eficiencia es real; sus beneficios van al capital, no al trabajo.

Hubo momentos históricos donde la ganancia de productividad se repartió. Después de las guerras mundiales, en contextos de escasez de mano de obra y organización obrera fuerte, los aumentos de productividad se tradujeron en jornadas más cortas, salarios más altos, vacaciones pagadas. **Pero eso no ocurrió porque la tecnología lo hiciera automáticamente. Ocurrió porque había fuerza organizada que obligó a repartir.**

Hoy esa fuerza está debilitada. Y el discurso de la eficiencia sirve para legitimar que toda ganancia vaya a los accionistas mientras los trabajadores son "liberados" —al desempleo.

### La eficiencia como ideología

El culto a la eficiencia no es neutral. Es una ideología que presenta como técnicamente óptimo lo que es políticamente conveniente para algunos.

Cuando alguien dice "el mercado es más eficiente que el Estado", está diciendo algo muy específico: que ciertos costos (desempleo, precariedad, externalidades ambientales) no cuentan en su cálculo. La eficiencia de mercado es eficiencia en transferir costos a quienes no pueden defenderse.

Cuando alguien dice "la IA es más eficiente que los humanos en X tarea", está eligiendo qué métrica cuenta. ¿Velocidad? ¿Coste por unidad? ¿Qué pasa con la calidad que solo un humano puede evaluar? ¿Qué pasa con el valor de que sea *un humano* quien te atiende, te juzga, te diagnostica?

**La eficiencia no es un hecho. Es una elección política disfrazada de necesidad técnica.**

---

## 6. El autómata como testigo

Proponemos una inversión de perspectiva. En lugar de preguntar "¿qué puede hacer el autómata por nosotros?", preguntemos: **"¿qué revela el autómata sobre nosotros?"**

Un modelo de lenguaje entrenado en texto de internet refleja los sesgos, prejuicios y suposiciones de internet. Cuando genera texto sexista, no está "fallando"; está **funcionando exactamente como fue diseñado**, mostrando los patrones que absorbió.

Un sistema de reconocimiento facial que falla más con rostros negros no tiene un "bug"; tiene los datos de entrenamiento que le dieron, que subrepresentaban rostros negros. El fallo técnico es síntoma de fallo social.

En este sentido, el autómata es un **testigo involuntario** de nuestras estructuras sociales. Absorbe el mundo como es —con sus desigualdades, exclusiones y jerarquías— y lo devuelve amplificado. Mirarlo es mirarnos a nosotros mismos, cristalizados en código.

Esto no exculpa a los autómatas; los contextualiza. No son malvados ni benévolos. Son **espejos deformantes** que amplifican lo que les damos. Si no nos gusta lo que reflejan, el problema somos nosotros.

### El testigo que también delata

Pero hay otra función que este "testigo" cumple, menos filosófica y más inmediatamente política: **el autómata también vigila**.

Los mismos sistemas que "nos conocen" para recomendarnos contenido también registran qué contenido consumimos. Los mismos algoritmos que "optimizan" nuestras rutas también saben dónde estamos en cada momento. Los mismos modelos que "entienden" nuestro lenguaje también pueden detectar disidencia, organización, protesta.

No es paranoia. Es historia reciente:

| Año | Caso | Mecanismo |
|-----|------|-----------|
| 2013 | Edward Snowden revela PRISM | NSA accede a datos de Google, Facebook, Microsoft, Apple |
| 2016 | Cambridge Analytica | Facebook data usado para manipulación electoral |
| 2019 | Clearview AI | Reconocimiento facial masivo vendido a policías sin supervisión |
| 2020 | Palantir + ICE | Algoritmos para localizar migrantes indocumentados |
| 2021 | Pegasus Project | Software de vigilancia israelí contra periodistas y activistas |
| 2022 | Amazon Ring + policías | Timbres "inteligentes" compartiendo video con policía sin orden judicial |

El autómata no solo refleja nuestros sesgos. También **acumula información que puede usarse contra nosotros**.

### Quién ha vivido esto antes

Las comunidades que han experimentado vigilancia sistemática —activistas, periodistas, poblaciones racializadas, disidentes políticos— desarrollaron prácticas de autodefensa mucho antes de que existiera la IA:

- **Comunicación en persona** cuando se sabe que los canales están intervenidos
- **Uso de palabras clave cambiantes** para evitar detección automática
- **Redes de confianza** que no pasan por infraestructura digital
- **Dispersión geográfica** de información sensible

Estas prácticas, que a veces se llaman "seguridad operacional", son conocimiento acumulado de quienes han pagado el precio de ser vigilados.

El problema es que **la vigilancia algorítmica cambia la escala**. Antes, vigilar a alguien requería recursos: agentes, tiempo, presupuesto. Eso limitaba naturalmente a quién se podía vigilar. La automatización elimina ese límite. Ahora se puede vigilar a todos, todo el tiempo, y filtrar después.

### El derecho a no ser procesado

Esto plantea una pregunta que las regulaciones actuales apenas tocan: **¿existe el derecho a no ser convertido en datos?**

El GDPR europeo habla de "minimización de datos" y "limitación de finalidad". Pero asume que algún dato se va a recoger. ¿Y si el derecho fundamental fuera a no ser procesado en absoluto? ¿A existir sin ser medido, clasificado, predicho?

Este derecho no existe hoy. Y su inexistencia no es accidente: es consecuencia de un modelo de negocio que necesita datos como materia prima. Pedirle a las empresas de datos que respeten el derecho a no ser procesado es como pedirle a una mina que respete el derecho de los minerales a quedarse bajo tierra.

Por eso la regulación no basta. Y por eso necesitamos pensar en términos de **fuerza** y **contrapoder**, no solo de derechos enunciados.

---

## 7. Del cautiverio a la deliberación

El autómata es cautivo de sus creadores. Pero sus creadores también están cautivos de sus incentivos: maximizar beneficios, minimizar costos, escalar rápido, capturar mercados. El problema no es solo técnico; es **institucional**.

Para que la automatización sirva a fines democráticos, se proponen habitualmente:

**Transparencia radical**: No basta con publicar el código (que pocos entienden). Necesitamos explicaciones accesibles de qué hace el sistema, para quién, y a costa de quién. Los afectados tienen derecho a saber por qué fueron clasificados, puntuados, rechazados.

**Auditoría independiente**: Los sistemas de alto impacto deben ser auditados por terceros sin conflicto de interés. No solo auditoría técnica (¿funciona?) sino auditoría política (¿a quién sirve?).

**Derecho a la intervención humana**: En decisiones que afectan derechos fundamentales, debe haber siempre la posibilidad de apelar a un humano que pueda evaluar circunstancias que el sistema no puede capturar.

**Deliberación sobre fines**: Antes de automatizar, preguntar: ¿queremos que esto sea automatizado? ¿Qué se pierde cuando lo hacemos? ¿Quién decide si el trade-off vale la pena?

Estas propuestas son deseables. Y son **insuficientes**.

Insuficientes porque asumen un regulador honesto, capaz y rápido. Asumen que las corporaciones obedecerán cuando se les ordene. Asumen que hay tiempo para deliberar mientras los sistemas ya están desplegados y funcionando.

Quien ha intentado organizar resistencia contra el capital —en fábricas, en campos, en ciudades— sabe que las buenas intenciones no bastan. Que el enemigo no espera. Que la ley suele llegar después del daño, si llega.

---

## 8. El sujeto que regula: la trampa de confiar solo en el Estado

Las propuestas del §7 piden al Estado que regule. Pero el Estado no es árbitro neutral. Es campo de batalla donde los intereses más poderosos suelen ganar.

### La captura no es accidente: es diseño

> "La captura regulatoria ocurre cuando los reguladores provienen del sector regulado, la complejidad técnica hace que solo los grandes actores entiendan el sistema, y el regulador depende informacionalmente de quienes debe supervisar." — [01-seleccion-sistemica](../../ARCHIVO/marco/01-seleccion-sistemica.md)

Esto no es corrupción individual. Es arquitectura institucional. Las agencias de protección de datos contratan a ex-empleados de las empresas que deben vigilar. Los comités de ética de IA de las grandes tecnológicas están poblados de académicos que dependen de grants corporativos. El regulador financiero que debía prevenir la crisis de 2008 estaba dirigido por los mismos banqueros que la causaron.

**Pedir "más regulación" sin preguntarse quién regula es pedir a los lobos que cuiden el rebaño.**

Hay una tradición de pensamiento que entendió esto hace doscientos años: el Estado no es la solución al capital; es su instrumento. No porque todo Estado sea malo, sino porque en las condiciones actuales, **el capital captura las instituciones más rápido de lo que las instituciones pueden domesticar al capital**.

Esto no significa abandonar la lucha por regulación. Significa que la regulación solo funciona cuando hay **contrapoder organizado** que vigile a los vigilantes.

### Lo que sabemos que funciona: presión desde tres frentes

La historia del movimiento obrero enseña algo que la era digital tiende a olvidar. Las conquistas de protección —leyes de fábrica, jornada de 8 horas, seguridad laboral, derecho a huelga— no fueron regalos de legisladores ilustrados. Fueron **arrancadas** por tres tipos de presión simultánea:

| Frente | Función | Ejemplo histórico | Equivalente digital |
|--------|---------|-------------------|---------------------|
| **Presión desde abajo** | Número, disrupción, coste político de ignorar | Huelgas generales, manifestaciones masivas | Boicots coordinados, campañas virales, #DeleteFacebook |
| **Conocimiento desde dentro** | Información privilegiada, capacidad de sabotaje técnico | Trabajadores que denuncian condiciones, técnicos que paralizan máquinas | Ingenieros que filtran, que se niegan a construir armas, que sindicalizan |
| **Coyuntura política** | Momento donde el poder necesita conceder | Guerras mundiales, revoluciones amenazantes, crisis de legitimidad | ¿Escándalos de Cambridge Analytica? ¿Colapso de confianza? ¿Competencia geopolítica? |

> "Las Leyes de Fábrica fueron concesiones arrancadas al capital a base de organización y combate." — [08-trabajo-campo-batalla](../../ARCHIVO/marco/08-trabajo-campo-batalla.md)

Ningún frente basta solo. Los usuarios pueden boicotear, pero están atomizados y vuelven cuando pasa la indignación. Los trabajadores tech pueden filtrar, pero arriesgan su carrera y están fragmentados. La coyuntura política aparece y desaparece.

**La convergencia de los tres es rara. Pero cuando ocurre, las cosas cambian.**

### Experiencias concretas: lo que ya se ha intentado

No partimos de cero. Hay precedentes de organización contra el capital tecnológico:

**Trabajadores tech organizados**:
- En 2018, empleados de Google forzaron la cancelación del Proyecto Maven (IA para drones militares). No fue la dirección; fueron **4.000 firmas internas** y amenazas de dimisión.
- En 2019, trabajadores de Amazon protestaron públicamente contra contratos con ICE (agencia de deportaciones). No ganaron, pero establecieron precedente.
- En 2021, se fundó el Alphabet Workers Union. Pequeño (1.000 miembros de 130.000 empleados), pero existe. Primera vez en la historia de la gran tecnología.

**Usuarios organizados**:
- El movimiento #DeleteFacebook tras Cambridge Analytica no tumbó a la empresa, pero costó reputación y provocó regulación (GDPR se aceleró).
- Las demandas colectivas bajo GDPR han extraído millones en multas. No han cambiado el modelo de negocio, pero han subido el coste de violar la ley.

**Whistleblowers**:
- Frances Haugen (Facebook/Meta, 2021) filtró documentos internos que mostraban que la empresa sabía que Instagram dañaba la salud mental de adolescentes y no actuó. El Congreso citó a Zuckerberg. Nada sustancial cambió.
- Timnit Gebru y Margaret Mitchell (Google, 2020-2021) fueron despedidas por documentar sesgos en modelos de lenguaje. Su expulsión galvanizó el debate sobre ética de IA.

**Patrón visible**: Las victorias son parciales, precarias, reversibles. Pero **existen**. El terreno no es virgen. Hay experiencia acumulada, redes, memoria de qué funciona y qué no.

### §8b. El lawfare como tecnología de neutralización

> **Nota**: Este recuadro extiende el análisis de vigilancia algorítmica al ámbito jurídico-institucional. Fuente: Plan.md (2025).

Si el autómata vigila, el Estado puede **judicializar** lo que el algoritmo detecta. El fenómeno tiene nombre: **lawfare** —uso estratégico de procesos legales para neutralizar adversarios políticos sin necesidad de probar delitos.

España ofrece casos de estudio recientes:

| Caso | Mecanismo | Resultado |
|------|-----------|-----------|
| **Caso Neurona** (2020-2022) | Acusación de financiación irregular a Podemos basada en informes anónimos | Archivado tras 3 años. El daño reputacional ya estaba hecho. |
| **Alberto Rodríguez** (2021) | Diputado inhabilitado por "atentado a la autoridad" (pegar una patada a un policía en 2014) | Pierde el escaño. Sentencia controvertida bajo Doctrina Atutxa. |
| **Doctrina Botín** (2006→) | El Tribunal Supremo puede archivar casos donde la acusación es solo "popular" | Protege a poderosos cuando la Fiscalía no actúa. |

**El patrón**: No hace falta condena. Basta con proceso. El ciclo mediático-judicial destruye antes de que llegue sentencia.

¿Qué tiene esto que ver con el autómata? Todo:

1. **Los algoritmos de moderación** son el primer filtro. Lo que el autómata detecta como "contenido problemático" puede desencadenar investigación.
2. **El scraping de redes sociales** alimenta dosieres. Publicaciones antiguas, recontextualizadas, sirven de prueba.
3. **La presión reputacional algorítmica** (trending topics, viralidad negativa) prepara el terreno para que la acción judicial parezca "respuesta a la indignación ciudadana".

**El autómata no juzga. Pero su vigilancia alimenta a quienes sí pueden hacerlo.**

---

### El problema de la velocidad: ellos corren, nosotros caminamos

Hay una asimetría temporal que ningún diseño institucional resuelve fácilmente: **los modelos se actualizan en meses; la regulación tarda años**.

El AI Act de la UE tardó 3 años en negociarse (2021-2024). En ese tiempo, GPT pasó de la versión 3 a la 4, los modelos de difusión explotaron, y millones de empleos empezaron a ser automatizados. La regulación regula el pasado.

**Propuestas para cerrar la brecha**:

1. **Moratorias**: Prohibición temporal de despliegue hasta auditoría completa. Suena bien. ¿Quién tiene fuerza para imponerla cuando las corporaciones operan globalmente y los Estados compiten por atraerlas?

2. **Sandboxes regulatorios**: Espacios controlados donde probar antes de escalar. Útil para startups. Inútil para empresas que ya operan a escala planetaria.

3. **Responsabilidad ex-post**: Si no puedes regular antes, castiga después. La amenaza de sanción retroactiva modifica incentivos. Pero solo si la sanción es creíble y proporcional al daño. Las multas actuales son coste de hacer negocio.

4. **Whistleblowing protegido**: Quienes conocen los sistemas desde dentro deben poder denunciar sin represalias. Esto **sí** funciona. Pero solo si hay organizaciones capaces de proteger a quienes denuncian, y medios capaces de amplificar lo que filtran.

### Autodefensa algorítmica: qué queda cuando el Estado no llega

Si las corporaciones se niegan a ser transparentes y el Estado no puede o no quiere obligarlas, ¿qué queda?

Queda la **acción directa** —no violenta, pero sí disruptiva:

- **Ingeniería inversa**: Auditar desde fuera lo que no se abre desde dentro. El Algorithmic Justice League, ProPublica, y otros han expuesto discriminación algorítmica sin acceso al código. Es posible.

- **Leaks organizados**: No filtraciones individuales (demasiado arriesgadas), sino **redes de apoyo** que reciben, verifican, protegen y difunden información privilegiada.

- **Litigio estratégico**: Usar el sistema judicial para forzar descubrimiento de información. Costoso, lento, pero a veces efectivo. Las demandas de derechos civiles en EE.UU. han obligado a empresas a entregar datos que nunca habrían publicado voluntariamente.

- **Construcción de alternativas**: No solo resistir al autómata cautivo, sino construir autómatas **no cautivos**. Modelos abiertos, cooperativas de datos, infraestructura comunitaria. Si no puedes reformar al enemigo, construye fuera de su alcance.

### La cuestión de fondo: ¿para quién trabaja el autómata?

El autómata no tiene voluntad. Ejecuta lo que le programan. La pregunta política no es "¿es buena o mala la IA?" sino **"¿quién la controla y para qué?"**

Hoy la controlan corporaciones que maximizan beneficios y Estados que maximizan vigilancia. Cambiar eso requiere:

1. **Organización de quienes la construyen**: Los ingenieros, científicos de datos, etiquetadores. Tienen el conocimiento para auditar y la posición para sabotear. Pero están fragmentados, bien pagados (los del Norte), y su identidad profesional los ata a las empresas. Organizarlos es difícil. Pero no imposible.

2. **Organización de quienes la sufren**: Los clasificados, puntuados, rechazados. Son millones, pero no se reconocen como clase. El "afectado por algoritmos" no tiene identidad colectiva. Crearla es tarea política.

3. **Coalición entre ambos**: El ingeniero de Google que sabe que el sistema discrimina, y el solicitante de hipoteca que fue rechazado sin saber por qué, tienen interés común. Conectarlos es la tarea.

### Implicación para FUNDACIÓN

El autómata es cautivo de sus creadores. Pero sus creadores también son cautivos de sus incentivos. Cambiar los incentivos requiere **poder organizado** capaz de amenazar beneficios, reputaciones, y —en última instancia— la continuidad de los negocios.

Quien espere que el Estado resuelva esto por sí solo, espera en vano. El Estado llegará cuando la presión lo obligue. Y la presión solo llega cuando hay organización.

Los capítulos siguientes preguntarán: **¿qué pasa cuando estos sistemas operan a escala?** Cómo las infraestructuras técnicas transforman lo que es políticamente posible. Por qué el problema no es solo quién controla las máquinas, sino qué nos hacen las máquinas por el mero hecho de existir.

---

*[Nota técnica: Análisis bajo arquetipo Flove SOULS (souls), operando en Nivel 0a MMCO (State Space). Desplazamiento antropológico. Fuentes primarias: T04x02 §4 (IAD/IAG/IAF), §3 (conductismo vs cognitivismo), §2 (Shannon).]*
