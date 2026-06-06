# Apps Functional Constitution

## Las Aplicaciones como Demonstraciones Matemáticas

En Network-Engine, el paquete `apps` no es el propósito de la plataforma; es su **consecuencia**.

Funcionalmente, las aplicaciones son pruebas (en el sentido matemático y de software) de que los axiomas definidos en el núcleo pueden sostener sistemas lógicos complejos. 

---

# Rol en el Metalingüismo

Si Network-Engine permite crear lenguajes, entonces las "Apps" son expresiones escritas en esos lenguajes.

*   **App de Ejemplo (HelloApp):** Demuestra que el universo puede arrancar y un observador puede interactuar.
*   **Simuladores Específicos:** Una app podría representar un intento de evaluar forzamientos (forcing) sobre un modelo transitivo numerable de ZFC.
*   **Redes de Ontologías:** Otra app podría mapear grafos de conocimiento RDF a las reglas de inferencia del engine.

Las apps tienen permisos para opinar. A diferencia del core, una app *puede* decidir que en su universo la Hipótesis del Continuo es falsa, o que solo se usa persistencia en Node.

---

# La Cadena de Consumo

El core no existe para ser ejecutado. Existe para ser consumido.

Las apps son el consumidor final en la cadena alimenticia de la plataforma. Son el único lugar del sistema donde el núcleo abstracto se encuentra con el hardware (a través de los adaptadores) y con el usuario final (a través de una interfaz de consola o web).

---

# MCP Apps UI como proyección del contrato

Una MCP App no es un servidor ad hoc: es la materialización de un `DomainContract` que declara:

* **Resources** de lectura (`aleph://os/overview`, templates por id).
* **Resource UI** (`ui://…`, `mimeType: text/html;profile=mcp-app`).
* **Launchers** (`AppLauncherContract`) proyectados a un único tool con `_meta.ui.resourceUri` — sin mutaciones CRUD.

`packages/apps/src/catalog/aleph-os` demuestra el patrón Resource-first: el agente puede leer `aleph://os/overview` antes de invocar `show-aleph-os`. Ver [ADR 0004](../../ADR/0004-mcp-apps-ui-projection.md).

## Knowledge Systems navegables

Las apps que exponen documentación navegable deben consumir el builder puro `KnowledgeSystem` de `@network-engine/core` y mantener en `apps` solo la materialización runtime: lectura de HTML, parser Markdown cuando aplique, handlers MCP y registro de catálogo.

`aleph-os` queda como origen estático compatible (`aleph://os/*`, `show-aleph-os`). `aleph-os-dynamic` prueba la derivación desde índices Markdown con namespace propio (`aleph://os-dynamic/*`, `show-aleph-os-dynamic`). Ver [ADR 0009](../../ADR/0009-knowledge-system-mcp-app-builder.md).
