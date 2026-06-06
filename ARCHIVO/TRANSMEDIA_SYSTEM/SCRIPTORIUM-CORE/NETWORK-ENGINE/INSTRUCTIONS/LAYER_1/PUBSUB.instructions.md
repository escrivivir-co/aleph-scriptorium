# PubSub Technical Constitution

## Arquitectura de Dependencias

`@network-engine/pubsub` es un adaptador de transporte de Capa 1 que habilita comunicación inter-proceso entre apps del ecosistema.

*   **Obligatorio:** `socket.io` (servidor, para el Hub).
*   **Obligatorio:** `socket.io-client` (cliente, para el Bridge).
*   **Obligatorio:** `rxjs` (puente reactivo entre el orchestrator y el transporte).
*   **Permitido:** Depender de `@network-engine/core` para acceder a tipos genéricos (`LanguageSemantics`, `InferEvent`, `NetworkOrchestrator`).
*   **Prohibido:** Importar módulos `node:*` directamente. El paquete debe ser potencialmente portable a Browser vía `socket.io-client`.
*   **Prohibido:** Contener lógica de dominio, semántica de lenguajes o reglas de transición de estado.
*   **Prohibido:** Asumir qué eventos son relevantes para el transporte. Esa decisión pertenece al consumidor (Capa 2 o App).

---

# Topología

El PubSub opera bajo una topología **Hub dedicado**:

*   Un proceso independiente levanta el servidor Socket.IO (`PubSubHub`).
*   Cada app conecta un cliente Socket.IO (`SocketIOBridge`) al Hub.
*   Las apps no se comunican directamente entre sí; todo pasa por el Hub.

```
 App A ──── Bridge ────┐
                        ├──── PubSub Hub (Socket.IO Server)
 App B ──── Bridge ────┘
```

---

# Estructura y Reglas por Archivo

## `types.ts` (Contratos de Transporte)

**Regla:** Define el vocabulario de red y las utilidades de control de publicación.

**Componentes:**
1.  **`NetworkTransportEvent`:** Sobre de transporte para eventos inter-proceso. Incluye metadatos de routing (`source`, `target`, `room`) que no existen en los eventos de dominio internos.
2.  **`PubSubConfig`:** Configuración mínima para conectar un Bridge (`hubUrl`, `namespace`).
3.  **`PUBLISHABLE` (Symbol):** Marcador simbólico que indica que un evento tiene permiso para salir del proceso actual hacia la red.
4.  **`markPublishable()` / `isPublishable()`:** Funciones puras para marcar y verificar el marcador.

**Patrón Obligatorio:** La marca `PUBLISHABLE` es un Symbol, no un campo booleano en el tipo. Esto evita contaminar los tipos de dominio de Capa 2.

---

## `hub.ts` (Servidor Central)

**Regla:** Contiene exclusivamente la lógica de infraestructura del servidor Socket.IO.

**Patrones Obligatorios:**
1.  El Hub no contiene lógica de negocio. No interpreta, filtra ni transforma eventos.
2.  El Hub gestiona conexiones, rooms dinámicos (`join_room` / `leave_room`) y logging de actividad.
3.  CORS habilitado por defecto (`origin: '*'`) dado que opera en entorno localhost seguro.
4.  La factory function `createPubSubHub()` es el único punto de instanciación.

---

## `bridge.ts` (Puente RxJS ↔ Socket.IO)

**Regla:** Actúa como el puente bidireccional entre el `NetworkOrchestrator` de una app y el transporte de red.

**Patrones Obligatorios:**
1.  **Outgoing (interno → red):** Suscribirse a `orchestrator.events$`, aplicar `filter(isPublishable)`, y emitir por `socket.emit('network_event', ...)`.
2.  **Incoming (red → interno):** Escuchar `socket.on('network_event', ...)`, descartar eventos propios (`source !== appId`), e inyectar en `orchestrator.dispatch()`.
3.  **Tipado genérico:** El Bridge es genérico sobre `TSemantics extends LanguageSemantics<any, any>`, igual que el Orchestrator.
4.  **Ciclo de vida:** `connect()` abre la conexión y activa las suscripciones. `disconnect()` limpia suscripciones y cierra el socket.
5.  **Anti-loop:** El Bridge filtra sus propios eventos entrantes comparando `source` con el `appId` local.

---

## `index.ts` (Barril de Exportación)

**Regla:** Re-exporta `types`, `hub` y `bridge`. Define la API pública del paquete.

---

# Relación con Otros Paquetes

## Con `@network-engine/core`

*   Consume `NetworkOrchestrator`, `LanguageSemantics`, `InferEvent` como tipos.
*   No extiende ni modifica el core. Usa el getter `events$` del Orchestrator (Observable público).

## Con `@network-engine/apps`

*   Las apps instancian un `SocketIOBridge` opcionalmente (configuración `pubsub?` en su config).
*   La app `hub` en el catálogo levanta un `PubSubHub` como proceso dedicado.

## Con `@network-engine/mcp-runtime`

*   Complementario, no competidor. MCP Streamable HTTP sirve a **clientes externos** (agentes AI, IDEs). PubSub sirve a **comunicación interna** entre apps del cluster.

---

# Evolución del Código

## Al añadir un nuevo tipo de mensaje de transporte
*   Añadirlo a `NetworkTransportEvent` o crear un sub-tipo.
*   No romper la compatibilidad del campo `type: string` que es el discriminante principal.

## Al añadir un adaptador alternativo (ej. Redis, NATS)
*   Crear un nuevo archivo en `src/adapters/`.
*   Respetar la misma interfaz de `connect(orchestrator)` y `disconnect()`.
*   No modificar el Hub; el Hub es específico de Socket.IO.

## Al integrar con MCP
*   No hacer que PubSub dependa de `@network-engine/mcp-runtime`. El flujo correcto es que una **App** escuche eventos MCP runtime y los re-emita como `markPublishable()`.

---

# Checklist Técnico de Merge

□ No contiene lógica de dominio ni reglas de transición de estado.

□ El Bridge es genérico sobre `TSemantics`.

□ Los eventos internos no salen a la red sin `markPublishable()`.

□ El Hub no interpreta ni transforma eventos, solo los enruta.

□ El Bridge descarta sus propios eventos entrantes (anti-loop).

□ Ejecuta `bun run typecheck` en el workspace sin errores.
