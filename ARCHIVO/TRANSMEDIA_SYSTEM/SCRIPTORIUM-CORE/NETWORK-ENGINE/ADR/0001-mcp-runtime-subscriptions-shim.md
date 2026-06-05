# ADR 0001: `subscriptions/listen` como shim temporal del edge Fastify

## Estado

Aceptado como decisión temporal.

## Contexto

`@network-engine/mcp-runtime` apunta a la especificación MCP draft moderna (`2026-07-28`) para Streamable HTTP stateless.

La spec local descargada en `INSTRUCTIONS/LAYER_0/modelcontextprotocol-main` confirma que:

- `server/discover` es obligatorio.
- `subscriptions/listen` reemplaza el antiguo endpoint GET y `resources/subscribe` / `resources/unsubscribe`.
- `subscriptions/listen` se abre mediante `POST` al endpoint MCP.
- La respuesta HTTP debe ser un stream SSE largo.
- El primer mensaje del stream debe ser `notifications/subscriptions/acknowledged`.
- Cada notificación debe incluir `_meta["io.modelcontextprotocol/subscriptionId"]` con el id del request original.
- El servidor no debe enviar tipos de notificación que el cliente no pidió explícitamente.

El SDK instalado `@modelcontextprotocol/sdk@1.29.0` no expone aún schemas/helpers para `subscriptions/listen` ni `notifications/subscriptions/acknowledged`. Sí expone notificaciones legacy/actuales de listas y recursos, pero no el request moderno de escucha.

## Decisión

Implementar `subscriptions/listen` como **shim temporal en `@network-engine/mcp-runtime/fastify`**, interceptando el `POST /mcp` antes de delegar en `StreamableHTTPServerTransport`.

El shim debe:

1. Detectar `method: "subscriptions/listen"`.
2. Validar que `params.notifications` existe.
3. Abrir `text/event-stream`.
4. Enviar primero `notifications/subscriptions/acknowledged`.
5. Respetar estrictamente el filtro solicitado:
   - `toolsListChanged`
   - `promptsListChanged`
   - `resourcesListChanged`
   - `resourceSubscriptions`
6. Añadir `_meta["io.modelcontextprotocol/subscriptionId"]` a cada notificación.
7. Cerrar y limpiar la suscripción cuando se cierre la conexión HTTP.
8. No usar `Mcp-Session-Id` ni estado de sesión implícito.

## No decisión

No se debe:

- meter `subscriptions/listen` en `@network-engine/core`;
- forkear el SDK MCP;
- simular el antiguo HTTP GET stream;
- reintroducir `resources/subscribe` / `resources/unsubscribe`;
- convertir `subscriptions/listen` en REST;
- enviar notificaciones no solicitadas por el cliente.

## Consecuencias

Pros:

- Permite avanzar con MCP moderno aunque el SDK vaya por detrás del draft.
- Mantiene el workaround aislado en el borde HTTP.
- Evita contaminar `core` y el runtime declarativo.
- Hace explícita la deuda técnica.

Contras:

- El shim debe mantenerse manualmente hasta que el SDK soporte el draft.
- Los tests deben cubrir el contrato SSE porque el SDK no lo valida.
- Hay que tener cuidado de no duplicar el comportamiento cuando el SDK lo implemente.

## Criterio de retirada

Eliminar el shim cuando una versión estable del SDK exponga soporte oficial para:

- `SubscriptionsListenRequestSchema`;
- `SubscriptionsAcknowledgedNotificationSchema`;
- gestión Streamable HTTP compatible con `subscriptions/listen` draft.

En ese momento, `@network-engine/mcp-runtime/fastify` debe delegar en el SDK y conservar solo adaptación de dominio/runtime.

## Referencias locales

- `INSTRUCTIONS/LAYER_0/modelcontextprotocol-main/schema/draft/schema.ts`
- `INSTRUCTIONS/LAYER_0/modelcontextprotocol-main/docs/specification/draft/basic/patterns/subscriptions.mdx`
- `INSTRUCTIONS/LAYER_0/modelcontextprotocol-main/docs/specification/draft/basic/transports/streamable-http.mdx`
- `INSTRUCTIONS/LAYER_0/modelcontextprotocol-main/seps/2575-stateless-mcp.md`
