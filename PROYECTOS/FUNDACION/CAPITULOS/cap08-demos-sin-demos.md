# Capítulo 8: Demos sin demos

*Desplazamiento: Escalar*

> **Fuente**: T04x02 (Algoritmos opacos)  
> **Tamiz aplicado**: T011 A2 (Opacidad como Decisión Política)

---

## Prólogo: La asamblea y el algoritmo

*Desde un caracol zapatista, madrugada de cualquier año*

---

Cuando la comunidad tiene que decidir algo importante —el uso de la tierra, el castigo de una falta, la distribución del agua—, se convoca asamblea. Todos los que serán afectados tienen voz. La discusión puede durar horas. Días, a veces. Nadie decide hasta que todos entienden.

Es lento. Es ineficiente. Es **democracia**.

El algoritmo decide en milisegundos. Procesa más variables de las que cualquier asamblea podría considerar. No necesita consenso: tiene parámetros. No necesita explicarse: tiene outputs.

Es rápido. Es eficiente. Es **otra cosa**.

Los tecnólogos dirán: "la asamblea no escala". Y tienen razón. No puedes hacer una asamblea de ochocientos millones de usuarios de TikTok. Pero la pregunta que evitan es: **¿por qué deberían ochocientos millones de personas estar sometidas a un mismo sistema de decisión?**

La escala es el problema, no la solución.

El federalista del siglo XIX ya lo sabía: las comunidades pequeñas pueden gobernarse a sí mismas; las grandes requieren delegación, y la delegación requiere confianza, y la confianza requiere transparencia. Si no puedes ver cómo se decide, no puedes confiar. Si no puedes confiar, no estás gobernando: estás siendo gobernado.

El algoritmo opaco es la forma más pura de autoridad ilegítima: **decide sin mostrar las razones, castiga sin ofrecer apelación, gobierna sin pedir consentimiento**.

El anarquista clásico rechazaba toda autoridad que no pudiera justificarse. El algoritmo opaco no puede justificarse porque **no está diseñado para justificarse**. Está diseñado para funcionar. Y "funcionar" significa: producir outputs que maximicen la métrica que alguien eligió.

¿Quién eligió la métrica? No tú. No la asamblea. No el demos.

Este capítulo pregunta: ¿qué queda de la democracia cuando las decisiones que afectan a millones las toma un proceso que nadie puede explicar?

La respuesta, adelantamos, no es "mejorar los algoritmos". Es recordar que **antes del algoritmo existía otra forma de decidir**. Más lenta. Más humana. Y que esa forma no desapareció porque fuera peor. Desapareció porque no servía a quienes querían decidir por todos.

---

## §0. Transición: De la muerte de Dios a la muerte del demos

El Capítulo 6 diagnosticó los "futuros cancelados": cuando la verdad deja de ser determinable, colapsan los proyectos que la presuponían. La Ilustración prometía ciudadanos informados deliberando racionalmente. Esa promesa requería **verdad accesible**.

Este capítulo muestra la consecuencia política: si la verdad no es determinable y los algoritmos son opacos, **la democracia pierde su sustrato epistémico**. No puedes deliberar sobre lo que no puedes entender. El demos sin información es demos sin demos.

Nietzsche diagnosticó la muerte de Dios. Aquí diagnosticamos la muerte del demos: gobierno sin pueblo que pueda gobernar.

---

## §0b. Recuadro: Tipos de democracia (cartografía conceptual)

> **Fuente**: Plan.md (MATERIAL_FUENTE/Plan_Democracia_Digital)

Antes de diagnosticar la muerte del demos, conviene recordar qué formas ha tomado:

| Aspecto | Representativa | Participativa | Directa | Semidirecta |
|---------|----------------|---------------|---------|-------------|
| **Quién decide** | Representantes elegidos | Ciudadanía + gobierno | Todos los ciudadanos | Representantes + ciudadanía en temas clave |
| **Frecuencia** | Ocasional (elecciones) | Continua (múltiples canales) | Muy frecuente | Regular (temas puntuales) |
| **Mecanismos** | Parlamento, elecciones | Presupuestos participativos, asambleas | Referéndums, iniciativas populares | Referéndums + parlamento |
| **Ventajas** | Eficiencia, estabilidad | Mayor legitimidad, inclusión | Máxima legitimidad, transparencia | Equilibrio eficiencia/participación |
| **Desventajas** | Distancia gobernantes/gobernados | Requiere tiempo y cultura cívica | Ineficiencia, tiranía de mayoría | Posible inconsistencia |
| **Escalabilidad** | ✓ Muy escalable | ✓ Con canales digitales | ✗ Impracticable a gran escala | ✓ Escalable (Suiza: 8.7M) |
| **Ejemplos** | España, USA, UK | Decidim Barcelona, Porto Alegre | Suiza (parcial), Atenas antigua | Suiza (sistema completo) |

### El contexto español: Del 15M a 2025

La primavera de 2011 marcó un punto de inflexión. El movimiento 15M surgió como respuesta a la sensación de que el sistema político estaba atrapado en un bipartidismo incapaz de representar. Las plazas se convirtieron en centros de deliberación: **un ágora moderna que recordaba los principios de la democracia ateniense, adaptados a un país de 49 millones**.

El 15M no solo denunció la falta de representación, sino la connivencia entre élites económicas y políticas. A través de asambleas y plataformas digitales, los ciudadanos discutían propuestas para una democracia más directa, transparente y participativa.

Cuando las movilizaciones disminuyeron, su energía se canalizó en nuevas formaciones políticas: la "Nueva Política". Pero este proceso fragmentó la energía democratizadora inicial, produciendo un escenario de alta competitividad entre fuerzas con agendas distintas.

**La paradoja 15M**: El movimiento que pedía democracia directa terminó produciendo más partidos (más representación), no menos intermediarios.

### §0c. El Ruedo Ibérico: Arquetipos de correlación de fuerzas

> **Fuente**: Plan.md (MATERIAL_FUENTE/Plan_Democracia_Digital)

España no es solo un caso particular. Es un **laboratorio de arquetipos** que se repiten en otras latitudes. La tensión entre autoritarios y sociedad civil se puede leer como secuencia de fases:

| Fase | Período | Configuración | Arquetipo universal |
|------|---------|---------------|---------------------|
| **Cero partidos** | 1939-1975 | Dictadura franquista | Monopolio del poder, oposición clandestina |
| **Dos partidos** | 1978-2011 | Bipartidismo PSOE/PP | Alternancia pactada, consenso de élites |
| **Fragmentación** | 2011-2019 | Podemos, Ciudadanos, regionalismos | Irrupción de nuevos actores, crisis de representación |
| **Polarización extrema** | 2019-2025 | +Vox, separatismos, lawfare | Correlación inestable, bloqueo institucional |
| **¿Reconstitución?** | 2025+ | 7+ partidos para gobernar | Negociación permanente o parálisis |

**El patrón subyacente**:

```
Monopolio → Duopolio estable → Fragmentación → Polarización → ¿?
```

Este patrón se observa en:
- Italia (DC/PCI → Berlusconi → 5 Estrellas → fragmentación)
- Francia (PS/RPR → Macron vs Le Pen → fragmentación)
- América Latina (bipartidismos clásicos → nuevos movimientos)

**Los actores del Ruedo Ibérico 2025**:

| Actor | Función | Correlato arquetípico |
|-------|---------|----------------------|
| **PSOE** | Centro-izquierda institucional | Partido de masas clásico adaptado |
| **PP** | Centro-derecha institucional | Conservadurismo de orden |
| **Vox** | Extrema derecha | Reacción autoritaria a la fragmentación |
| **Sumar** | Izquierda postmaterialista | Coalición de nuevos movimientos |
| **Podemos** (residual) | Izquierda rupturista | Canalización institucional del 15M |
| **ERC, Junts, CUP** | Soberanismo catalán | Tensión centro-periferia |
| **EH Bildu, PNV** | Soberanismo vasco | Integración negociada vs ruptura |
| **BNG, Més, CHA...** | Regionalismos | Defensa de territorio frente a centro |

**El lawfare como tecnología de reconfiguración**:

La judicialización estratégica (Caso Neurona, Alberto Rodríguez, Borràs, amnistía catalana) no es accidente ni corrupción individual. Es **tecnología de alteración de correlaciones** sin pasar por elecciones:

| Mecanismo | Función | Ejemplo |
|-----------|---------|--------|
| **Doctrina Botín** | Proteger a poderosos cuando Fiscalía no actúa | Archivo de casos con solo acusación popular |
| **Doctrina Atutxa** | Excepcionar Botín en casos "de interés colectivo" | Permitir juicios a políticos con acusación popular |
| **Inhabilitación** | Eliminar representantes electos | Alberto Rodríguez pierde escaño |
| **Proceso como castigo** | Daño reputacional antes de sentencia | 3 años de Caso Neurona → archivado |

> **BlackFlag**: El lawfare es arma de doble filo: quien lo usa hoy puede sufrirlo mañana. La judicialización erosiona la legitimidad del sistema judicial para todos.

**¿Por qué importa este arquetipo para la IA?**

Porque los algoritmos de moderación, los trending topics, el sesgo de plataformas (ver Cap. 7 §5b sobre Twitter/X) **son el nuevo terreno de correlación de fuerzas**. El lawfare digital ya existe:

- Shadowbanning de cuentas políticas
- Amplificación algorítmica de un bando
- Demonetización de creadores críticos
- Cierre de cuentas antes de elecciones

Lo que España muestra con lawfare judicial, las plataformas pueden hacer con lawfare algorítmico. **Y sin necesidad de jueces.**

### ¿Por qué importa para el diagnóstico?

Porque la demanda de participación directa **permanece vigente** pero los mecanismos institucionales no la canalizan. Las plataformas digitales como Decidim Barcelona (400.000 usuarios) muestran que es técnicamente posible. Pero:

> **YellowFlag**: ¿Es la democracia digital una **transcendencia** hacia formas más participativas, o una **regresión** que evade la complejidad de la deliberación presencial?

La pregunta no tiene respuesta técnica. La tiene política.

---

## Algoritmos opacos

> "Hay una idea que distingue entre algoritmos transparentes y opacos. En los transparentes (como los árboles de decisión) es posible reseguir el impacto que tiene un parámetro en el resultado. Mientras que en los opacos (como las redes neuronales) habría un momento de pérdida de trazabilidad." — T04x02

Los algoritmos que determinan qué ves, qué compras, qué crees, no fueron votados. No pueden serlo. Su complejidad excede la deliberación.

**Pero aquí está el truco**: los algoritmos opacos **podrían explicarse**. 

---

## La opacidad como decisión política

Existen herramientas de explicabilidad:
- XAI (Explainable AI)
- LIME (Local Interpretable Model-agnostic Explanations)
- SHAP (SHapley Additive exPlanations)

La explicabilidad es **técnicamente posible**. No se usa porque **no se quiere**:

| Motivo | Mecanismo | Consecuencia |
|--------|-----------|--------------|
| **Coste empresarial** | Explicabilidad = revelar ventajas competitivas | Secreto comercial |
| **Evasión regulatoria** | Modelo opaco = no auditable | GDPR burlada |
| **Control de la ilusión** | "Parece que entiende" mientras hace pattern-matching ciego | Marketing de IA |

**4 mecanismos de coerción estructurada** mantienen la opacidad:
1. Secreto comercial (patentes)
2. Encrypting de pesos del modelo
3. Contratos ToS que prohíben ingeniería inversa
4. Acceso restringido a datos de entrenamiento

La intratabilidad es falsa. La intencionalidad es real. **La opacidad no es límite técnico: es política**.

---

## ¿Democracia sobre lo incomprensible?

La Ilustración asumía ciudadanos informados deliberando. ¿Qué pasa cuando ni los expertos entienden los sistemas que nos gobiernan?

**Opción A — Regulación por efectos**:
- No entender el algoritmo, pero medir sus consecuencias
- Si discrimina, prohibirlo
- Si manipula, sancionarlo
- Gobernar outputs, no procesos

**Opción B — Tecnocracia explícita**:
- Delegar en quienes mejor entienden (o dicen entender)
- Gobierno de ingenieros
- Problema: ¿quién elige a los ingenieros?

**Opción C — Resignación**:
- Aceptar que hay zonas de la realidad social que ya no son gobernables democráticamente
- No porque alguien lo impida: porque la complejidad lo impide

---

## El demos sin demos

Democracia: gobierno del pueblo. ¿Qué pueblo?

El pueblo que no puede auditar los sistemas que lo gobiernan **no es un demos**. Es un **público**: espectadores de decisiones que otros (o ninguno) tomaron.

Nadie entiende completamente cómo funciona el algoritmo de recomendación de TikTok, incluyendo a quienes lo construyeron. No porque sea secreto: porque es **intratable**. Demasiados parámetros, demasiadas interacciones.

Demos sin demos: gobierno sin pueblo que pueda gobernar.

---

## §4b. Los cuerpos que son clasificados

*Interludio: voces desde el otro lado del score*

---

Hay quienes hablan de algoritmos como si fueran matemáticas puras. Funciones que reciben inputs y producen outputs. Neutrales. Objetivos.

Pero los inputs son personas. Y las personas tienen cuerpos. Y los cuerpos tienen género, color, historia.

**El scoring crediticio** no es neutral: replica los sesgos de los datos con que fue entrenado. Si históricamente los bancos negaron crédito a mujeres, el algoritmo aprende que "mujer" correlaciona con "riesgo". No es prejuicio del programador. Es **prejuicio cristalizado en datos**.

**El reconocimiento facial** no es neutral: los datasets de entrenamiento sobre-representan rostros blancos masculinos. Resultado: las mujeres negras son mal identificadas con tasas de error 34 veces mayores que los hombres blancos. No es error técnico. Es **racismo automatizado**.

**Los sistemas de predicción policial** no son neutrales: se entrenan con datos de arrestos, no de crímenes. Los barrios más vigilados producen más arrestos. Más arrestos entrenan al algoritmo a predecir más crimen en esos barrios. El algoritmo no predice crimen: **predice vigilancia pasada**.

La teórica de la reproducción social preguntaría: ¿quién carga con el costo de estos "errores"? Siempre los mismos cuerpos. Las mujeres que no acceden al crédito. Los negros que son detenidos por falsos positivos. Los pobres cuyos barrios son sobre-vigilados.

El algoritmo no tiene rostro. Pero sus víctimas sí.

---

**La opacidad protege a quienes diseñan, no a quienes son clasificados.**

Cuando Amazon descubrió que su algoritmo de contratación penalizaba currículums que mencionaban "women's" (como "women's chess club"), lo desactivó en silencio. No hubo disculpa pública. No hubo compensación a las mujeres rechazadas. La opacidad permitió el error, y la opacidad permitió ocultarlo.

Cuando el sistema COMPAS fue acusado de predecir reincidencia con sesgo racial, la empresa se escudó en "secreto comercial". Los acusados no podían saber por qué el algoritmo los clasificaba como "alto riesgo". Los jueces tampoco. **El secreto comercial pesa más que el derecho a saber por qué te condenan.**

La crítica feminista de la tecnología no es "anti-tecnología". Es anti-neutralidad. Es recordar que **todo sistema técnico encarna decisiones políticas**. Y que esas decisiones, cuando son opacas, las pagan los cuerpos más vulnerables.

---

## §5. De la opacidad a la ética: el puente roto

La opacidad algorítmica no es solo un problema técnico o político. Es el umbral hacia una nueva ética.

**Bioética** nació cuando la medicina podía hacer más de lo que debía: mantener vivos cuerpos sin mente, clonar, seleccionar embriones. La pregunta era: **¿qué tratamiento merece un cuerpo humano?**

**Tecnoética** emerge cuando el objeto se desdibuja. Ya no tratamos solo con cuerpos: tratamos con agentes que imitan intención, sistemas que simulan comprensión, algoritmos que *parecen* decidir. La pregunta es: **¿qué tratamiento merece un sistema que imita lo humano?**

El puente entre bioética y tecnoética está roto porque la opacidad lo impide:

| Bioética | Tecnoética | El problema |
|----------|------------|-------------|
| El paciente puede dar consentimiento informado | ¿Puede un dataset "consentir"? | No hay sujeto |
| El médico puede explicar el tratamiento | ¿Puede el ingeniero explicar el modelo? | No hay explicabilidad |
| Los efectos son trazables (causa → efecto) | Los efectos son emergentes (interacción → output) | No hay causalidad lineal |

La opacidad algorítmica no solo impide la democracia (demos sin demos). Impide la ética. Porque toda ética requiere **atribución de responsabilidad**, y los sistemas opacos distribuyen la responsabilidad hasta disolverla.

---

## §6. El sujeto que audita: restaurar las condiciones del demos

El diagnóstico es claro: sin explicabilidad no hay demos. Pero **exigir explicabilidad no es suficiente**. ¿Quién la exige? ¿Con qué fuerza? ¿Cómo se hace cumplir?

### Tres capas de opacidad y sus resistencias

| Capa | Descripción | Resistencia técnica | Resistencia política |
|------|-------------|--------------------|--------------------|
| **Secrecía corporativa** | El código es propiedad privada | Ingeniería inversa, auditorías | Regulación de transparencia |
| **Complejidad técnica** | Demasiados parámetros | XAI, modelos interpretables | Formación ciudadana |
| **Emergencia sistémica** | Nadie diseñó el comportamiento | Monitoreo continuo | Límites precautorios |

La primera capa (secrecía) es **política**. No hay razón técnica para ocultarla.

La segunda capa (complejidad) es **parcialmente técnica**. XAI existe pero no escala.

La tercera capa (emergencia) es **estructural**. No se resuelve con transparencia.

### ¿Quién puede restaurar el demos?

| Actor | Capacidad de auditoría | Capacidad de enforcement | Realismo |
|-------|----------------------|-------------------------|----------|
| **Reguladores públicos** | Media (si contratan técnicos) | Alta | Dependiente de voluntad política |
| **Academia** | Alta | Baja | Solo recomendaciones |
| **Periodismo técnico** | Media | Baja | Alcance limitado |
| **Trabajadores internos** | Alta | Baja | Whistleblowing riesgoso |
| **Usuarios organizados** | Baja | Media (boicot) | Fragmentado |

> "¿Cómo podemos gobernar cuando ganemos si nunca hemos practicado el ejercicio del poder?" — [12-dilemas-accion-revolucionaria](../../ARCHIVO/marco/12-dilemas-accion-revolucionaria.md)

### Propuesta: Infraestructura de Auditoría Pública

El demos necesita **órganos propios** de auditoría algorítmica:

1. **Agencias públicas de auditoría algorítmica**: Con poder de inspección, sanción, y acceso al código.
2. **Estándares de explicabilidad obligatorios**: Para sistemas con efectos sobre más de X personas.
3. **Protección de whistleblowers técnicos**: Inmunidad para quienes denuncien sistemas opacos dañinos.
4. **Educación algorítmica ciudadana**: No todos programan, pero todos deben poder preguntar "¿por qué?"

### Lo que ya existe (y lo que falta)

| Mecanismo | Existe | Falta |
|-----------|--------|-------|
| Auditoría académica | Sí (parcial) | Acceso al código real |
| Regulación (AI Act UE) | Sí (2024) | Capacidad de enforcement |
| Whistleblowing tech | Sí (casos aislados) | Protección sistemática |
| Educación algorítmica | Mínima | Todo |

### Test de Demos (4 preguntas)

Para cada sistema algorítmico con poder sobre personas:

1. **¿Puede el afectado saber QUÉ decidió sobre él?** (Transparencia de decisión)
2. **¿Puede el afectado saber POR QUÉ?** (Explicabilidad)
3. **¿Puede el afectado APELAR?** (Recurso)
4. **¿Puede la sociedad CAMBIAR las reglas?** (Soberanía colectiva)

Si las 4 respuestas son "no" → No hay demos. Hay tecnocracia opaca.

### Implicación para FUNDACIÓN

La opacidad algorítmica no es un accidente técnico. Es una **estrategia de poder**. Quienes diseñan sistemas opacos se benefician de que nadie pueda auditarlos.

Restaurar el demos requiere construir **infraestructura de auditoría** con la misma escala que la infraestructura opaca. Esto no es un problema de apps o herramientas. Es un problema de **instituciones políticas**.

---

## Epílogo: Mandar obedeciendo (en la era del algoritmo)

*Desde cualquier lugar donde todavía se pregunte antes de decidir*

---

"Mandar obedeciendo" es la fórmula que las comunidades de las montañas del sureste propusieron como alternativa al poder vertical. El que manda, obedece al pueblo que lo mandó mandar. Si deja de obedecer, deja de mandar.

El algoritmo no puede mandar obedeciendo. No tiene a quién obedecer. No tiene pueblo. Tiene **usuarios**. Y los usuarios no mandan: usan.

Pero la fórmula sigue siendo útil como **test**:

- ¿A quién obedece este algoritmo? → A la métrica que maximiza.
- ¿Quién definió esa métrica? → El equipo de producto.
- ¿Quién eligió a ese equipo? → La corporación.
- ¿Quién gobierna la corporación? → Los accionistas.

Cadena de mando perfectamente clara. **Cadena de obediencia perfectamente ausente.**

El demos no está en ningún eslabón. El demos es el recurso que la cadena extrae: atención, datos, comportamiento predecible.

---

Los cinco hilos se anudan también aquí:

**Hilo 1: Toda autoridad debe justificarse.** El algoritmo opaco es autoridad sin justificación. No porque no pueda explicarse (XAI existe), sino porque no quiere. La opacidad es una elección política disfrazada de límite técnico.

**Hilo 2: El costo lo pagan los cuerpos vulnerables.** El sesgo algorítmico no es aleatorio: replica y amplifica la discriminación histórica. Mujeres, negros, pobres, migrantes: los de siempre.

**Hilo 3: El territorio de disputa es nuevo, pero la lógica es vieja.** Así como el obrero del siglo XIX disputaba el control de la fábrica, el usuario del XXI debe disputar el control del algoritmo. No "usar mejor" la tecnología. **Gobernarla.**

**Hilo 4: Nombrar es empezar a transformar.** La alfabetización algorítmica no es saber programar. Es saber preguntar: ¿quién decide? ¿con qué datos? ¿en beneficio de quién? El pedagogo de los oprimidos diría: primero nombrar la opresión, después transformarla.

**Hilo 5: La eficiencia no es neutral.** El algoritmo es más eficiente que la asamblea. También el látigo es más eficiente que el diálogo. La pregunta no es qué funciona mejor, sino **mejor para quién**. El crítico de las instituciones advertía: cuando la herramienta define el problema, el humano se vuelve recurso de la herramienta.

---

El capítulo siguiente examina qué ocurre cuando los algoritmos opacos se organizan en ecosistemas. Ya no decisiones aisladas: **sistemas de sistemas** que nadie diseñó pero todos habitamos. Ecosistemas políticos sin ecología.

---

## Referencia cruzada

- **Texto fuente**: [T04x02 §Algoritmos transparentes y opacos](../../ARCHIVO/DISCO/SESIONES_COTRABAJO/2026-01-11_refactorizacion-fundacion/03_REFERENCIAS/TEXTOS/04x02.md)
- **Próximo capítulo**: [Cap. 9 — Ecosistemas políticos](cap09-ecosistemas-politicos.md)
- **Banderas aplicadas**: 🔵 @blueflag (XAI existe), ⚫ @blackflag (quién lucra), 🔴 @redflag (4 mecanismos coercitivos), 🟡 @yellowflag (puente bioética↔tecnoética)
