# ① ARG Builder — *Dubplates, para artistas de transmedia*

> *«La ventana de contexto como instrumento colectivo para tablero ARG.»*

## Identidad

Espectáculo de **construcción viva**: el elenco mantiene una **ventana de contexto compartida** desde que se abre la sala hasta que el Equipo de Ceremonias la cierra. Lo que pasa en escena no es un guion, es un **objeto editable** que se pule a ojos vistas. Una ventana de contexto es el «alma» de un bot; el show termina con una ventana **madura** que la comunidad se lleva puesta.

## Lugar en el díptico — mitad A (sujeto)

Builder es el juego donde un **sujeto autónomo** ([`Aleph_app.md`](../Aleph_app.md) §*La app como sujeto autónomo*) **se construye a sí mismo**:

- La ventana de contexto **es** la materialización de su **espacio agéntico propio**.
- El acto de editar (añadir/refactorizar/descartar fragmentos) **es** mutar su **máquina de estado propia**.
- Construir es un acto **local** primero (el sujeto existe antes de federar).

## Mapeo a infraestructura existente

| Pieza del juego | Anclaje en `NETWORK-ENGINE` |
|-----------------|------------------------------|
| Ventana de contexto editable | `DocumentStoreProtocol` (CRUD) + `MongoDocumentStore.changes()` para edición reactiva |
| Estado vivo de la sesión | `createNetworkMachine` / `AlephUniverse` (XState v5) |
| Edición CRUD del elenco | `mutations` del `DomainContract` → `orchestrator.dispatch` |
| Vista de construcción | `mcp-app-ui` (`@modelcontextprotocol/ext-apps`), patrón [`aleph-os/ui/mcp-app.ts`](../../../packages/apps/src/catalog/aleph-os/ui/mcp-app.ts) |
| Llevarse la ventana madura | `resource` MCP exportable (`aleph://...`) + snapshot versionable |

## Modelado por tipos (TS.instructions)

La ventana de contexto pide un tipo de **fragmento discriminado** y un **estado editorial** (ya insinuado en rev1 como `editorialStatus`):

```ts
type FragmentKind = 'tool' | 'resource' | 'activation' | 'app' | 'note';
type EditorialStatus = 'raw' | 'triaged' | 'canon' | 'rumor' | 'proposal' | 'discarded';

// Branded id (precedente: AppId, UniverseId)
type FragmentId = string & { readonly __brand: 'FragmentId' };

type ContextFragment<K extends FragmentKind = FragmentKind> = {
  id: FragmentId;
  kind: K;
  status: EditorialStatus;
  payload: unknown; // a refinar por K con conditional types
};
```

**Decisión abierta:** ¿el `payload` se tipa por `K` con conditional/mapped types (más seguro, más complejo), o se deja `unknown` con validación runtime? Trade-off pedagógico clásico — se deja a scrum.

## Slice MVP de este juego

- Una ventana de contexto = una colección de `ContextFragment`.
- CRUD mínimo (add / refactor / discard) vía MCP tool.
- UI que muestra la ventana mutando en vivo (1 panel).
- Export del snapshot al cerrar.

## Decisiones abiertas

- ¿La ventana vive en Mongo (read-model reactivo) o se proyecta también a RDF para enlazarla con el tablero?
- ¿La maduración (raw→canon) la decide solo el humano (Equipo de Ceremonias) o hay triage asistido?
- ¿"Llevarse la ventana" = fichero portable, peer card, o ambos?
