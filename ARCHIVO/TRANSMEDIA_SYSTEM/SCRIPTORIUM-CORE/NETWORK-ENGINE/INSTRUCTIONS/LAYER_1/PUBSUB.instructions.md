# PubSub Technical Constitution

## Arquitectura de Dependencias

El concepto PubSub se materializa en **dos paquetes** tras el refactor de la capa edge:

| Paquete | Rol |
| --- | --- |
| `@network-engine/pubsub` | Contratos de transporte (`types.ts`): vocabulario de red, `PUBLISHABLE`, `NetworkTransportEvent`. Sin Socket.IO. |
| `@network-engine/edge-pubsub` | Borde Socket.IO: `PubSubHub` (servidor) y `PubSubBridge` (cliente). Ver [EDGE.instructions.md](EDGE.instructions.md). |

*   **Obligatorio en `pubsub`:** `rxjs` (tipos reactivos compartidos con el core).
*   **Obligatorio en `edge-pubsub`:** `socket.io` (servidor Hub), `socket.io-client` (Bridge), `@network-engine/pubsub`, `@network-engine/core`.
*   **Permitido en `pubsub`:** exportar solo contratos puros; cero I/O de red.
*   **Prohibido en `pubsub`:** importar `socket.io`, `node:*` o lógica de servidor/cliente.
*   **Prohibido en ambos:** lógica de dominio, semántica de lenguajes o reglas de transición de estado.
*   **Prohibido:** asumir qué eventos son relevantes para el transporte. Esa decisión pertenece al consumidor (Capa 2 o App).

---

# Topología

El PubSub opera bajo una topología **Hub dedicado**:

*   Un proceso independiente levanta el servidor Socket.IO (`createPubSubHub()` en `@network-engine/edge-pubsub`).
*   Cada app conecta un cliente (`createPubSubBridge()` / `PubSubBridge`) al Hub.
*   Las apps no se comunican directamente entre sí; todo pasa por el Hub.

```
 App A ──── Bridge (edge-pubsub) ────┐
                                      ├──── PubSub Hub (edge-pubsub / Socket.IO)
 App B ──── Bridge (edge-pubsub) ────┘
```

La app `hub` del catálogo (`packages/apps/src/catalog/hub/`) levanta el Hub como proceso dedicado.

---

# Estructura por paquete

## `@network-engine/pubsub` — `types.ts`

**Regla:** Define el vocabulario de red y las utilidades de control de publicación. Es la API pública del paquete (export único: contratos).

**Componentes:**

1. **`NetworkTransportEvent`:** Sobre de transporte para eventos inter-proceso. Incluye metadatos de routing (`source`, `target`, `room`) que no existen en los eventos de dominio internos.
2. **`PubSubConfig`:** Configuración mínima para conectar un Bridge (`hubUrl`, `namespace`).
3. **`PUBLISHABLE` (Symbol):** Marcador simbólico que indica que un evento tiene permiso para salir del proceso actual hacia la red.
4. **`markPublishable()` / `isPublishable()`:** Funciones puras para marcar y verificar el marcador.

**Patrón obligatorio:** La marca `PUBLISHABLE` es un Symbol, no un campo booleano en el tipo. Esto evita contaminar los tipos de dominio de Capa 2.

---

## `@network-engine/edge-pubsub` — Hub (`index.ts`)

**Regla:** Contiene exclusivamente la lógica de infraestructura del servidor Socket.IO.

**Patrones obligatorios:**

1. El Hub no contiene lógica de negocio. No interpreta, filtra ni transforma eventos.
2. El Hub gestiona conexiones, rooms dinámicos (`join_room` / `leave_room`) y logging de actividad.
3. CORS habilitado por defecto (`origin: '*'`) dado que opera en entorno localhost seguro.
4. La factory `createPubSubHub()` es el único punto de instanciación del servidor.

---

## `@network-engine/edge-pubsub` — `bridge.ts`

**Regla:** Puente bidireccional entre el `NetworkOrchestrator` de una app y el transporte de red.

**Patrones obligatorios:**

1. **Outgoing (interno → red):** Suscribirse a `orchestrator.events$`, aplicar `filter(isPublishable)` (desde `@network-engine/pubsub`), y emitir por `socket.emit('network_event', ...)`.
2. **Incoming (red → interno):** Escuchar `socket.on('network_event', ...)`, descartar eventos propios (`source !== appId`), e inyectar en `orchestrator.dispatch()`.
3. **Tipado genérico:** El Bridge es genérico sobre `TSemantics extends LanguageSemantics<any, any>`, igual que el Orchestrator.
4. **Ciclo de vida:** `connect()` abre la conexión y activa las suscripciones. `disconnect()` limpia suscripciones y cierra el socket.
5. **Anti-loop:** El Bridge filtra sus propios eventos entrantes comparando `source` con el `appId` local.

**Export:** `createPubSubBridge` (re-exportado desde `edge-pubsub`).

---

# Relación con otros paquetes

## Con `@network-engine/core`

*   `edge-pubsub` consume `NetworkOrchestrator`, `LanguageSemantics`, `InferEvent`.
*   No extiende ni modifica el core. Usa el getter `events$` del Orchestrator (Observable público).

## Con `@network-engine/apps`

*   Las apps instancian un `PubSubBridge` opcionalmente (configuración `pubsub?` en su config) importando desde `@network-engine/edge-pubsub`.
*   La app `hub` en el catálogo levanta un `PubSubHub` como proceso dedicado.
*   Apps de lenguaje (ej. `aleph`) importan `createPubSubBridge` desde `edge-pubsub`; marcan eventos con `markPublishable` desde `pubsub`.

## Con `@network-engine/mcp-runtime` / `edge-mcp`

*   Complementario, no competidor. MCP Streamable HTTP (`edge-mcp`) sirve a **clientes externos** (agentes AI, IDEs). PubSub sirve a **comunicación interna** entre apps del cluster.

---

# Evolución del código

## Al añadir un nuevo tipo de mensaje de transporte

*   Añadirlo a `NetworkTransportEvent` en `@network-engine/pubsub`.
*   No romper la compatibilidad del campo `type: string` que es el discriminante principal.

## Al añadir un adaptador alternativo (ej. Redis, NATS)

*   Crear un nuevo paquete `edge-*` o submódulo que respete los contratos de `@network-engine/pubsub`.
*   Respetar la misma interfaz de `connect(orchestrator)` y `disconnect()`.
*   No modificar los contratos en `pubsub`; el Hub Socket.IO vive solo en `edge-pubsub`.

## Al integrar con MCP

*   No hacer que `pubsub` ni `edge-pubsub` dependan de `@network-engine/mcp-runtime`. El flujo correcto es que una **App** escuche eventos MCP runtime y los re-emita como `markPublishable()`.

---

# Checklist técnico de merge

□ Los contratos viven en `@network-engine/pubsub`; el I/O Socket.IO vive en `@network-engine/edge-pubsub`.

□ No contiene lógica de dominio ni reglas de transición de estado.

□ El Bridge es genérico sobre `TSemantics`.

□ Los eventos internos no salen a la red sin `markPublishable()`.

□ El Hub no interpreta ni transforma eventos, solo los enruta.

□ El Bridge descarta sus propios eventos entrantes (anti-loop).

□ Ejecuta `bun run typecheck` en el workspace sin errores.
