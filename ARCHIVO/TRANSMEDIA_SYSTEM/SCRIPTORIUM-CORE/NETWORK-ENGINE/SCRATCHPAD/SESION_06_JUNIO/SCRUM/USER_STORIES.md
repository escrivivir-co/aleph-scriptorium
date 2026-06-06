# User Stories — criterios de aceptación

> Historias top del [`PRODUCT_BACKLOG.md`](PRODUCT_BACKLOG.md) con criterios de aceptación en formato **Gherkin** (`Dado / Cuando / Entonces`). Pensadas para ser ejecutables y verificables. Estado editorial: asentado pero abierto — afinad redacción en refinamiento.

---

## S-F1 — Relay de eventos en el hub

> **Como** sujeto federado conectado al hub
> **quiero** que mis `network_event` lleguen a los demás peers
> **para** que la federación deje de ser un emisor sin oyentes (la deuda).

**Contexto técnico:** [`packages/pubsub/src/hub.ts`](../../../packages/pubsub/src/hub.ts) hoy escucha `join_room`/`leave_room` pero **no** `network_event`.

```gherkin
Escenario: Multicast por room
  Dado un hub con los sockets A, B y C conectados
  Y A y B unidos al room "tablero:demo"
  Cuando A emite un network_event con room "tablero:demo"
  Entonces B recibe el evento
  Y C no lo recibe
  Y A no se recibe a sí mismo (exclusión de source)

Escenario: Unicast por target
  Dado un hub con los sockets A y B conectados
  Cuando A emite un network_event con target = id(B)
  Entonces solo B recibe el evento

Escenario: Broadcast con target "*"
  Dado un hub con A, B y C conectados
  Cuando A emite un network_event con target "*"
  Entonces B y C lo reciben y A no
```

**Notas:** precedencia de routing a decidir y documentar (¿`target` gana sobre `room`?). Registrar en ADR si no es trivial.

---

## S-F2 — El bridge honra room y target

> **Como** orquestador local conectado por el bridge
> **quiero** que al publicar se propaguen `room` y `target`
> **para** poder dirigir señales y no solo difundir a ciegas.

**Contexto técnico:** [`packages/pubsub/src/bridge.ts`](../../../packages/pubsub/src/bridge.ts) emite `network_event` pero descarta `room`/`target` y no hace `join_room`.

```gherkin
Escenario: El bridge se une a un room
  Dado un bridge conectado al hub
  Cuando llamo a bridge.joinRoom("tablero:demo")
  Entonces el socket queda unido a "tablero:demo" en el hub

Escenario: Publicar con routing
  Dado un bridge unido a "tablero:demo"
  Cuando publico un evento con routing { room: "tablero:demo" }
  Entonces el transportEvent emitido conserva room = "tablero:demo"
  Y conserva el source = appId del bridge
```

---

## S-F3 — Prueba de extremo a extremo del relay

> **Como** equipo
> **quiero** una prueba automatizada de que A→B funciona por room
> **para** declarar la deuda del PubSub formalmente saldada.

```gherkin
Escenario: Dos bridges intercambian por room
  Dado un hub en marcha
  Y un bridge A y un bridge B, ambos unidos a "r1"
  Cuando A publica { type: "ping", room: "r1" }
  Entonces B recibe exactamente un evento "ping"
  Y A no recibe ningún evento
  Y un bridge C no unido a "r1" no recibe nada
```

**DoD específico:** test corre con `bun run test` y queda verde en CI local.

---

## S-A1 — Construir la ventana de contexto

> **Como** sujeto autónomo (Builder)
> **quiero** crear/editar/borrar fragmentos de mi ventana de contexto
> **para** construir mi espacio agéntico propio.

**Contexto técnico:** reusa `DocumentStore` (CRUD) y el tipo `ContextFragment` propuesto en [`games/01-arg-builder.md`](../games/01-arg-builder.md).

```gherkin
Escenario: Añadir un fragmento
  Dado un sujeto con ventana de contexto vacía
  Cuando añado un ContextFragment { kind: "nota", payload: "..." }
  Entonces la ventana contiene 1 fragmento
  Y el fragmento tiene id estable y timestamp

Escenario: La ventana es el estado de la máquina
  Dado un sujeto con N fragmentos
  Cuando inspecciono su máquina de estado (aleph-lang)
  Entonces el contexto de la máquina refleja los N fragmentos
```

---

## S-A3 — Invocar/jugar el representante (Player)

> **Como** sujeto (Player)
> **quiero** invocar mi representante leyendo recursos MCP
> **para** que el sujeto sea un proceso local que decide, no un CRUD pasivo.

```gherkin
Escenario: El sujeto responde a una invocación
  Dado un sujeto con ventana de contexto poblada
  Cuando se invoca un PlayerCommand de lectura
  Entonces se devuelve un recurso MCP derivado del estado
  Y no se produce ninguna mutación (lectura = resource, no tool)
```

> Respeta la regla MCP de `ECOSYSTEM`: *Read = Resource, Mutate = Tool*.

---

## S-B1 — Federación escribe arista en el grafo

> **Como** tablero
> **quiero** que cada federación deje una arista `aleph:subscribesTo`
> **para** que la topología sea un hecho persistido, no tráfico efímero.

**Contexto técnico:** `GraphStoreProtocol` (quads RDF); reusa ontología `aleph0..3` de [`packages/apps/src/catalog/graph/app.ts`](../../../packages/apps/src/catalog/graph/app.ts). Depende de **T1** (SP-B1).

```gherkin
Escenario: Suscripción genera arista
  Dado un grafo de topología vacío
  Cuando el sujeto A se federa declarando suscripción a B
  Entonces existe el quad (A, aleph:subscribesTo, B)
  Y el quad lleva la peer-card/keyring como contexto

Escenario: La arista es idempotente
  Dado el quad (A, aleph:subscribesTo, B) ya existente
  Cuando A vuelve a declarar la misma suscripción
  Entonces no se duplica la arista
```

---

## S-B2 — Derivar el alcance (cardinalidad ℵ)

> **Como** tablero
> **quiero** calcular el conjunto alcanzable y su nivel ℵ desde el grafo
> **para** medir la red por su keyring/suscripciones y no por el tráfico.

**Contexto técnico:** NOMON = un salto; `hops` = profundidad. Depende de EP-C (medida) y SP-C2.

```gherkin
Escenario: Alcance a N saltos
  Dado un grafo con A→B→C→D de aristas subscribesTo
  Cuando consulto el alcance de A con hops = 2
  Entonces el conjunto alcanzable es { B, C }
  Y se reporta su cardinalidad

Escenario: Colapso N = Z = Q en ℵ0
  Dado tres reglas de vecindad distintas (discreta, con signo, con densidad)
  Cuando todas producen un alcance numerable
  Entonces el nivel reportado es ℵ0 para las tres
```

---

## S-B3 / S-B4 — Regulador y visor HC

> **Como** agente regulador (Juego de la Vida)
> **quiero** graduar la concentración de la red
> **para** explorar radicoma↔hegemón y ver el efecto en el visor HC.

**Contexto técnico:** [`games/04-juego-de-la-vida-regulador.md`](../games/04-juego-de-la-vida-regulador.md); el "slider" gradúa `hops`/política de pubs.

```gherkin
Escenario: Subir la concentración tiende a hegemón
  Dado una topología distribuida (radicoma)
  Cuando aumento el parámetro concentration
  Entonces el visor muestra mayor centralización (hegemón)
  Y el alcance del nodo central crece

Escenario: La HC es opinión, no teorema
  Dado un estado de la red
  Cuando consulto el visor HC
  Entonces se muestra una densidad simulada
  Y se etiqueta explícitamente como "opinión de la federación" (no prueba)
```

---

## SP-F1 — Spike: portabilidad de protocolos (resultado = decisión)

> **Como** equipo
> **quiero** saber qué de IACM/RNFP compila sin grammY
> **para** decidir cómo construir `@network-engine/protocols`.

```gherkin
Escenario: Criterio de cierre del spike
  Dado el código de BotHubSDK/src/core/iacm y /rnfp
  Cuando aíslo los tipos/builders/parsers de las dependencias de Telegram
  Entonces produzco una lista de módulos portables
  Y una recomendación escrita: npm (heteronimos-semi-asistidos-sdk) vs copia de tipos
  Y queda como insumo de ADR 0012
```

> Recordatorio: un spike está "hecho" cuando el **aprendizaje está escrito**, no cuando hay código de producción.
