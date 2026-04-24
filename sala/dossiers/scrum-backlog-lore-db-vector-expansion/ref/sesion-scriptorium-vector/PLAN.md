# Plan — sesion-scriptorium-vector

> **Fecha:** 23-abr-2026
> **Autor:** GPT-5.4
> **Dossier:** `sala/dossiers/sesion-scriptorium-vector/`

## 1. Contexto

Este dossier existe para absorber el antiguo `plan.md` bruto de la raíz, ya archivado verbatim en `ref/PLAN-MD-BRUTO-VERBATIM.md`, y convertirlo en una capa de enlace persistente entre los frentes ya abiertos. No es un cuarto dossier técnico de implementación, ni sustituye los dossiers ya vivos; su trabajo es unirlos, fijar ownership y dejar una puerta de reentrada limpia para que otra ventana, otro Aleph o un futuro `Ox.Cristalizador` retomen el tema sin depender de la conversación.

La necesidad concreta es doble:

- el plan bruto archivado en `ref/PLAN-MD-BRUTO-VERBATIM.md` contiene el árbol-grafo y la intención general de la sesión, pero sigue siendo material en bruto y mezcla varios niveles de decisión;
- el trabajo ya cristalizado vive repartido entre el dossier scrum compartido de Scriptorium, el dossier técnico `vector-machine` y el espejo local de `DocumentMachineSDK`.

La estrategia correcta aquí no es fusionar esos dossiers en uno nuevo. Eso duplicaría backlog y diluiría ownership. La estrategia correcta es un **dossier paraguas de sesión** que:

- trate `ref/PLAN-MD-BRUTO-VERBATIM.md` como fuente bruta de entrada;
- declare qué dossiers son obligatorios para esta línea de trabajo;
- establezca la relación entre ellos;
- deje claro cuál es el siguiente punto de decisión para la próxima sesión.

## Contexto compartido

- `sala/dossiers/sesion-scriptorium-vector/ref/PLAN-MD-BRUTO-VERBATIM.md`
- `sala/dossiers/scrum-backlog-lore-db-vector-expansion/PLAN.md`
- `sala/dossiers/vector-machine/PLAN.md`
- `DocumentMachineSDK/sala/dossiers/scrum-backlog-lore-db-vector-expansion/PLAN.md`
- `sala/dossiers/sesion-scriptorium-vector/ref/INDEX.md`
- `.github/agents/ox.agent.md`
- `.github/agents/indice.agent.md`
- `.github/prompts/dossier.prompt.md`

## 2. Anclas

- `ref/PLAN-MD-BRUTO-VERBATIM.md` es la preservación literal del plan bruto de sesión, no la fuente canónica final de ejecución.
- `sala/dossiers/scrum-backlog-lore-db-vector-expansion/` sigue siendo el frente scrum compartido del vector lore-db en Scriptorium.
- `sala/dossiers/vector-machine/` sigue siendo el frente técnico de autopista, plugin y frontera MCP para `VectorMachineSDK`.
- `DocumentMachineSDK/sala/dossiers/scrum-backlog-lore-db-vector-expansion/` sigue siendo el frente local del subequipo documental.
- Este dossier paraguas no reescribe ni absorbe esos backlogs; los enlaza y fija la forma de usarlos juntos.
- Los futuros dossiers derivados para `onfalo-asesor-sdk`, `NovelistEditor` o generalización a “proyecto” deberán nacer como hijos de esta línea de trabajo cuando el siguiente ciclo lo justifique, no antes.

## 3. Restricciones

- Solo escribir en la carpeta del agente (ver §6 del protocolo)
- Protocolo de sala: `.github/instructions/sala-protocolo.instructions.md`
- No duplicar en este dossier el detalle técnico que ya vive en los dossiers hijos.
- No convertir este dossier paraguas en backlog de implementación pesada.
- El objetivo es habilitar retoma limpia de la sesión, no cerrar ahora todas las decisiones de diseño.

## 4. Propuesta

### 4.1 Función del dossier paraguas

`sesion-scriptorium-vector` cumple cuatro funciones:

- registrar que `ref/PLAN-MD-BRUTO-VERBATIM.md` es la entrada bruta de la línea de trabajo;
- fijar qué dossiers del ecosistema deben leerse juntos para esta sesión;
- dejar explícito el reparto de ownership entre Scriptorium y `DocumentMachineSDK`;
- preparar el handoff de retoma para que la próxima decisión no vuelva a ser “¿dónde estaba todo esto?”.

### 4.2 Mapa de ownership

- **`ref/PLAN-MD-BRUTO-VERBATIM.md`**: copia literal del plan bruto, preservada como archivo de entrada y trazabilidad.
- **`sala/dossiers/scrum-backlog-lore-db-vector-expansion/`**: refinement scrum del frente compartido de lore-db vector en Scriptorium.
- **`sala/dossiers/vector-machine/`**: autopista técnica de `VectorMachineSDK`, plugin `vector-machine` y futura frontera MCP.
- **`DocumentMachineSDK/sala/dossiers/scrum-backlog-lore-db-vector-expansion/`**: refinement local del frente documental y de skill/layout en `DocumentMachineSDK`.
- **`sala/dossiers/sesion-scriptorium-vector/`**: dossier paraguas de sesión que enlaza lo anterior y decide cuál es el siguiente frente prioritario.

### 4.3 Siguiente decisión real

La próxima sesión no necesita volver a abrir investigación general. La decisión real es cuál de estos tres frentes se atiende primero:

- `SBLVX-SC-02` en Scriptorium: aprobar o enmendar el plan scrum compartido;
- `VM-01` en `vector-machine`: ratificar la frontera del contrato MCP v1;
- `SBLVX-DM-02` en `DocumentMachineSDK`: aprobar o enmendar el plan local documental.

Este dossier deja esa ternaria visible y preparada para que Aleph, Ox o el PO la resuelvan al reanudar.

### 4.4 Estrategia recomendada

Sí, se entiende el objetivo, y esta es la estrategia que recomiendo.

No recomendaría fusionar todo en un único dossier maestro de implementación, porque eso rompería el DRY conseguido y haría competir entre sí al frente scrum, al frente técnico y al frente local de `DocumentMachineSDK`.

Sí recomendaría, y este dossier ya lo encarna, una capa paraguas mínima que sirva de:

- índice de reentrada;
- contrato de ownership;
- puente entre el plan bruto archivado y los dossiers vivos;
- punto de partida para abrir futuros dossiers derivados cuando el siguiente ciclo lo pida.

### [GPT-5.4] 4.5 Refactor orientativo del punto D — diseño de dossiers

El punto D del plan bruto archivado ya puede leerse con más resolución, sin fijar todavía decisiones cerradas sobre cuántos dossiers hijos habrá ni en qué orden se abrirán. La orientación útil hoy es esta:

- **Dossier paraguas de sesión**: `sala/dossiers/sesion-scriptorium-vector/` ya cumple el rol de `D1`. Su trabajo no es implementar ni refinar todos los detalles, sino absorber el plan bruto archivado, enlazar el ecosistema vivo y dejar reentrada limpia.
- **Dossier técnico de stack y autopista**: `sala/dossiers/vector-machine/` ya cubre cómo es `vector-machine`, qué vive en `VectorMachineSDK`, qué vive en el plugin y dónde está la futura frontera MCP.
- **Dossier scrum compartido en Scriptorium**: `sala/dossiers/scrum-backlog-lore-db-vector-expansion/` sigue siendo la pieza adecuada para tratar el refinement transversal del frente lore-db/vector cuando la conversación se mueva a backlog compartido.
- **Dossier local en DocumentMachineSDK**: `DocumentMachineSDK/sala/dossiers/scrum-backlog-lore-db-vector-expansion/` ya expresa cómo necesita el frente documental su conexión con la vector-machine desde el lado `lore-sdk`, skill y layout local.

Leídos juntos, estos tres dossiers hijos ya cubren las tres preguntas que hoy importan:

- cómo es la vector-machine;
- cómo necesita `DocumentMachineSDK` su conexión local hacia esa vector-machine;
- cómo Scriptorium espeja y generaliza ese trabajo para futuros módulos.

La consecuencia orientativa para `D2` es que los próximos dossiers derivados, si se abren, conviene que respondan a una sola razón de apertura cada uno. A día de hoy se ven al menos tres familias posibles, todavía sin fijarlas:

- **familia consumidor**: dossiers hijos para consumidores concretos como `onfalo-asesor-sdk`, `NovelistEditor`, `ARCHIVO/PROYECTOS`, `LoreSDK` o `TypedPromptsEditor`;
- **familia generalización de proyecto**: un dossier que traduzca el caso `lore-db` a un modelo más abstracto de “proyecto indexable” cuando la frontera MCP ya esté ratificada;
- **familia runtime/operación**: un dossier específico si la rama Docker vs nativo termina siendo lo bastante densa como para requerir decisiones, validaciones y handoffs propios.

La recomendación por ahora es no abrir esas familias por anticipado. Este dossier paraguas debe señalar que existen como ramas posibles del árbol, pero solo deberían cristalizar en un dossier nuevo cuando una de estas condiciones se cumpla:

- hay una prioridad explícita de PO para un consumidor concreto;
- `VM-01` y/o el refinement scrum desbloquean una frontera ya bastante estable;
- aparece trabajo operativo suficiente como para no caber con claridad en los dossiers actuales.

### [GPT-5.4] 4.6 Nota preferencial de orquestación

Para esta línea de trabajo conviene dejar una preferencia explícita, sin convertirla en obligación rígida:

- **orquestador preferente de diseño**: `Ox.Cristalizador.Dosier`.

Esta etiqueta expresa una forma de operar, no un agente adicional todavía materializado en fichero separado: Ox actuando con disciplina de Cristalizador y con foco en protocolo de dossier, espejo DRY, rutas canónicas y handoff entre repos.

Orientación práctica:

- si la tarea es **pensar**, cristalizar, mapear, reencuadrar o decidir si hace falta abrir un dossier nuevo, conviene que entre `Ox.Cristalizador.Dosier`;
- si la tarea es **orquestar ejecución de sala**, aprobar propuestas o mover trabajo entre agentes workers, sigue siendo natural entrar por Aleph y por el protocolo `sala-*`;
- si la tarea es **navegación estructural o control de no-duplicación**, `Indice` sigue siendo la pieza de apoyo preferente.

Esta nota no fija todavía una arquitectura agentica final. Solo deja una preferencia de operación para que la próxima sesión no vuelva a improvisar quién gobierna el plano de dossier frente al plano de ejecución.

## 5. Salida operativa

- Tracking: [BACKLOG.md](./BACKLOG.md)
- Decisiones del PO: [RESPUESTAS.md](./RESPUESTAS.md)
- Activación del dossier: [activacion.prompt.md](./activacion.prompt.md)
- Referencias: [ref/INDEX.md](./ref/INDEX.md)
- Tasks: carpeta [tasks](./tasks)