# ② ARG Player — *Pista de Dances para personas que juegan*

> *«Artistas que suben a su representante al escenario.»*

## Identidad

La cara **jugadora** del mismo formato Builder: mientras el elenco edita la ventana en directo, **las personas que juegan la invocan** desde su propio sistema de inferencia conversacional —o indirectamente a través de la sala del *streamer*— con dinámicas basadas en **comandos y drops**. El sujeto no solo se construye (Builder): **se ejecuta y se baila** (Player).

## Lugar en el díptico — mitad A (sujeto)

Player es el **proceso local en marcha**: el sujeto autónomo que **corre** su máquina de estado y **responde** a invocaciones.

- Cada jugador entra **desde su propia red** sin abrir puertos (*pretty good escrivivir*) usando la ventana de contexto en su propio entorno agéntico.
- "Subir el representante al escenario" = instanciar el sujeto (su ventana de contexto) y dejarlo **hablar** ante la sala.
- El juego es la **expresión** de la app; el simulador HC de la mitad A es una de las cosas que el Player puede "pensar en voz alta".

## Mapeo a infraestructura existente

| Pieza del juego | Anclaje en `NETWORK-ENGINE` |
|-----------------|------------------------------|
| Invocar la ventana | `readResource` MCP (`aleph://.../context`) desde el cliente del jugador |
| Comandos y drops | `executeTool` MCP → `createActorToolHandler` → `dispatch` |
| Reacción en vivo | `orchestrator.selectEvent(type)` (RxJS) → UI |
| Entrar desde cualquier red | MCP Streamable HTTP edge (conexión saliente, sin puertos entrantes) |
| Representante propio | instancia local de `AlephUniverse` por jugador |

## Modelado por tipos (TS.instructions)

Los comandos del jugador piden una **unión discriminada** de acciones, con **template literal types** para los drops:

```ts
type DropChannel = `drop_${'chat' | 'room' | 'stream'}`;

type PlayerCommand =
  | { type: 'INVOKE'; contextId: string }
  | { type: 'ASK'; prompt: string }
  | { type: 'DROP'; channel: DropChannel; payload: unknown };

// Exhaustive checking en el handler garantiza que ningún comando queda sin ruta
declare function handle(cmd: PlayerCommand): void;
```

**Decisión abierta:** ¿los comandos son un DSL tipado cerrado (seguro, exhaustivo) o un canal abierto extensible por skill (flexible, menos garantías)?

## Slice MVP de este juego

- Un jugador conecta por MCP a una ventana de contexto publicada por Builder.
- `INVOKE` + `ASK` mínimos; respuesta visible en su entorno.
- 1 tipo de `DROP` a la sala como prueba de agencia.

## Decisiones abiertas

- ¿El jugador corre su **propio** proceso (sujeto pleno) o consume el del streamer (cliente ligero)? Las dos lecturas conviven en el producto.
- ¿La sincronía de inferencia (todos invocando a la vez) se modela como broadcast o como rooms por bando?
- Relación con Builder: ¿mismo binario en dos modos, o dos descriptores de app?
