# PubSub Functional Constitution

## El Problema de la Soledad

Cada app en Network-Engine nace como un universo aislado.

Su `eventBus` (RxJS) transporta señales internas. Su `stateActor` (XState) evoluciona contexto local. Pero todo ocurre en soledad. Ningún evento traspasa las paredes del proceso.

El paquete `@network-engine/pubsub` rompe ese aislamiento. Permite que los universos se escuchen, se observen y reaccionen entre sí.

---

## Metáfora Funcional: El Sistema Nervioso

Si cada app es un órgano con su propia lógica interna, el PubSub es el sistema nervioso que los conecta.

*   **El Hub** es la médula espinal: recibe señales y las distribuye. No las interpreta.
*   **El Bridge** es una terminación nerviosa dentro de cada órgano: decide qué sensaciones (eventos) son lo suficientemente importantes como para salir al cuerpo entero, y recibe los impulsos que llegan de fuera.
*   **La marca `PUBLISHABLE`** es el filtro sináptico: no toda actividad interna merece ser transmitida. Solo los eventos que un lenguaje o una app marca explícitamente cruzan la frontera.

---

## El Triángulo Completo

Con PubSub, la plataforma cierra su modelo de comunicación:

| Protocolo | Audiencia | Patrón | Dirección |
|---|---|---|---|
| **REST** (Fastify) | Clientes HTTP externos | Request/Response | Síncrono |
| **MCP** (Streamable HTTP) | Agentes AI, IDEs | Request/Response + SSE | Semi-asíncrono |
| **PubSub** (Socket.IO) | Apps internas del cluster | Event-Driven | Asíncrono bidireccional |

Cada vértice del triángulo tiene su razón de existir. REST expone datos. MCP expone capacidades cognitivas. PubSub habilita la vida colectiva del ecosistema.

---

## Soberanía de los Eventos

Un principio fundamental del PubSub es que los eventos son soberanos de su origen.

Un evento de dominio nace en un lenguaje (Capa 2). Ese lenguaje define su forma, su tipo, su semántica. El PubSub no modifica ni reinterpreta esos eventos. Solo los transporta.

Cuando un evento cruza la frontera del Bridge:
1.  Se envuelve en un `NetworkTransportEvent` con metadatos de routing (`source`, `target`).
2.  Viaja por el Hub sin ser alterado.
3.  Llega al Bridge destino, se desenvuelve, y se inyecta como si hubiera nacido localmente.

Para el `stateActor` receptor, el evento externo es indistinguible de uno interno. Esto es intencional: la máquina de estados no necesita saber si el estímulo vino de dentro o de fuera.

---

## El Derecho a No Publicar

No todos los eventos deben salir al exterior.

La marca `PUBLISHABLE` existe precisamente para que la decisión de publicación sea **explícita y deliberada**. Un lenguaje (Capa 2) elige qué eventos forman parte de su conversación pública y cuáles son asuntos internos.

Esto protege:
*   **La privacidad de estado**: transiciones internas de integridad, errores de bajo nivel, ajustes de contexto.
*   **El rendimiento**: no saturar la red con cada micro-mutación.
*   **La coherencia**: el contrato público de una app es un subconjunto curado de su actividad interna.

---

## Casos de Uso Funcionales

*   **Orquestación multi-universo**: Un universo Aleph detecta un límite dimensional y emite `REACH_BOUNDARY`. Otro proceso que corre un simulador de Forcing puede escuchar esa señal y proponer una extensión genérica.
*   **Telemetría distribuida**: Una app de monitoreo se conecta al Hub y observa los eventos publicados por todas las demás apps sin intervenir en ellas.
*   **Reacción en cadena**: App A ejecuta una mutation MCP → App A marca el resultado como `PUBLISHABLE` → El Bridge lo envía al Hub → App B recibe la señal y lanza su propia secuencia de inferencia.

---

## Filosofía del Conector

El PubSub no añade inteligencia al sistema. No toma decisiones. No almacena estado.

Añade **conectividad**. Transforma un conjunto de apps solitarias en un ecosistema vivo donde la acción de uno puede provocar la reacción de otro.

El Hub no es un cerebro. Es una plaza pública donde los universos se gritan cosas y cada uno decide qué escuchar.
