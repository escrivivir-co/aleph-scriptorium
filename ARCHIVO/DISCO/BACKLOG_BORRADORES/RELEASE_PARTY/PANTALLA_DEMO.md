# Guía de pantallas para demo

## Arquitectura de Navegadores (MCP Playwright)

> **IMPORTANTE**: Cada agente abre su navegador via MCP Playwright, NO Simple Browser.
> Esto permite conversaciones Copilot Chat separadas controlando navegadores independientes.

### Secuencia de Arranque

1. **@ox** arranca servidores (`alephscript.demo.runAll`)
2. **Esperar** a que MCP Playwright esté disponible (verificar tools `mcp_playwright_*`)
3. **@aleph** abre galería via `mcp_playwright_navigate({ url: "http://127.0.0.1:4000/aleph-scriptorium/demo/" })`
4. **@indice/PO** abre blueprint via `mcp_playwright_navigate({ url: "http://127.0.0.1:4000/aleph-scriptorium/blueprint-po/" })`

### URLs Base

| Recurso | URL |
|---------|-----|
| Base GH-Pages | `http://127.0.0.1:4000/aleph-scriptorium/` |
| Galería Demo | `http://127.0.0.1:4000/aleph-scriptorium/demo/` |
| Blueprint PO | `http://127.0.0.1:4000/aleph-scriptorium/blueprint-po/` |

---

## Main Screens

### Product Owner

Necesita una blueprint basado en la template de los Cubos. Tendrá un hilo principal con su charla pero interrumpirá sus pasos para dar paso a otras screens del equipo, que estarán anexas según la plantilla a la principal.

**Navegador**: Abre via MCP Playwright (conversación Chat separada)
- `mcp_playwright_navigate({ url: "http://127.0.0.1:4000/aleph-scriptorium/blueprint-po/" })`
- Navegar slides: `mcp_playwright_press({ key: "ArrowRight" })` / `ArrowLeft` / `ArrowUp` / `ArrowDown`

Entregables: se registra un feature para crear el blueprint según el protocolo. Se implementa, valida y cierra.

### Ox

Necesita gestionar en consola los servers. Necesita un script runall:

- cd scripts --> ./serve-site.sh
- cd MCPGallery --> npm run start:launcher
- cd MCPGallery --> npm run start:model
- cd MCPGallery --> npm run start:zeus

- cd NovelistEditor --> npm start

**Navegador**: Puede verificar Zeus via MCP Playwright si es necesario.

Entregable: Se edita VsCodeExtension para incluir un comando de run all que abre todas esas consolas en split. Igual, backlog feature, implementamos y cerramos. Por pasos según revisión.

### Aleph

Necesita panel de realización de pantallas. Galería con iframes:

- La web de gh-pages en index
- La web de Zeus (presets)
- La web de Novelist

- La web de gh-pages con cada una de las blueprints existens (3 iframes) + 1 El cuarto que harás para el PO.

**Navegador**: Abre via MCP Playwright (conversación Chat separada)
- `mcp_playwright_navigate({ url: "http://127.0.0.1:4000/aleph-scriptorium/demo/" })`
- Interactuar con iframes: `mcp_playwright_click({ selector: "..." })`

Entregable: Agregamos a la gh-pages una pagina con la galería de iframes. Titulo: Demo.

---

## Nota: Conversaciones Copilot Chat Paralelas

Para la demo se pueden tener **múltiples ventanas de Copilot Chat** (una por agente):
1. Abrir VS Code
2. `Cmd+Shift+P` → "Chat: Open Chat in New Window" (o abrir varios paneles)
3. Cada conversación invoca un agente distinto (@ox, @aleph, @indice)
4. Cada agente puede usar MCP Playwright para controlar su navegador

**Limitación conocida**: MCP Playwright comparte estado entre llamadas del mismo servidor.
Si se necesitan navegadores totalmente independientes, considerar lanzar múltiples instancias del MCP server.