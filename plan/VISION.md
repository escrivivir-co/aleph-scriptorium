# VISION — el spinoff y el agujero negro

## Qué es este mundo

aleph-scriptorium es la casa madre: ~25 submodules (editores, SDKs, galerías,
el pub SSB, el VPS), una editorial de agentes (Ox, Aleph, Índice, las 5
Banderas y ~30 más) y **MCPGallery**, la fuente de los paquetes
`@alephscript/*` que ya viven en el registry propio
(`npm.scriptorium.escrivivir.co`). De aquí salió todo — incluido el zeus
embrionario (`MCPGallery/zeus`, la UI de presets :3012) cuyo heredero maduro
es hoy `zeus-sdk`.

La historia se invierte ahora: **zeus-sdk, aislado, generó la base — el
cerebro** (contrato único, autoridad+ledger, juegos, plan de refundación).
Este mundo se convierte en **spinoff**: crece como constelación de productos
que se conectan a ese cerebro. La juntura no es un import ni un submodule:
es **el registry + la rutina rabbit-spiders-horses**.

## Principios

1. **Puro spinoff, desde el registry.** Todo lo que este mundo ofrece o
   consume pasa por `npm.scriptorium.escrivivir.co` (scopes `@alephscript`,
   `@zeus`). Prohibido depender de zeus-sdk por ruta, submodule o copia:
   si algo de zeus hace falta, se instala; si algo de aquí le hace falta a
   zeus, se publica. El registry es la membrana entre mundos.
2. **rabbit-spiders-horses es la pieza angular.** La rutina canónica vive en
   `MCPGallery/mcp-core-sdk`: **rabbit** = discovery (beacons de presencia,
   `GET /peers`), **spider** = federación (handshake RNFP, máquinas XState),
   **horse** = transporte MCP (JSON-RPC 2.0 encapsulado en mensajes de room,
   `listTools/callTool/readResource/getPrompt`). Con su doble contrato ya
   especificado: AsyncAPI del runtime (`spec/runtime.asyncapi.yaml`) y
   **OpenAPI del control-plane REST** (`spec/control-plane.openapi.yaml`:
   `POST /bots {role}`, `GET /peers`, `GET /actor-registry`). Así se
   articula el Model Context Protocol con REST, y así se crece distribuido:
   presencia → federación → capacidades.
3. **El agujero negro como método.** Igual que rabbit descubre peers y el
   actor-registry los absorbe, este plan descubre zonas de la codebase y las
   absorbe: cada WP de digestión inventaría una zona, la clasifica
   (**absorber** = modernizar y publicar; **alinear** = mantener consumiendo
   registry; **archivar** = generación 1, a la cripta con dignidad) y la
   digiere. Sin vías muertas al final; git y ARCHIVO son la memoria.
4. **Sin nombres de transición.** Herencia directa de zeus: prohibido
   `legacy`, `v2`, `-old`, `-new`, aliases de compatibilidad. `.github_V1`
   es el último de su especie: se digiere en S3, no se replica el patrón.
5. **La obra no se traga.** `ARCHIVO/` (y la dimensión narrativa: elenco,
   heterónimos, cartas, enciclopedia) es contenido canónico del mundo, no
   deuda técnica. El agujero negro come código y sistemas de organización,
   no literatura.

## El bridge a zeus

| qué | cómo |
| --- | ---- |
| paquetes | por el registry, en ambas direcciones (`@alephscript/mcp-core-sdk` ya lo demuestra: se publica aquí, zeus lo consume) |
| presencia y capacidades | bots r/s/h de este mundo entran en rooms del mesh zeus: rabbit se anuncia, spider federa, horse ofrece tools/resources — y viceversa |
| control | REST del control-plane (lanzar bots por rol, inspeccionar actor-registry), documentado con el mismo espíritu resource-driven de zeus |
| datos | los VOLUMES del mesh zeus (files-first); lo que este mundo aporte (p. ej. export SSB de Tribes/Parliament) entra por ese procedimiento — el WP vive en el plan de zeus, no aquí |
| lo prohibido | imports cruzados, submodules cruzados, copiar código entre mundos, y **tocar la carpeta de zeus-sdk desde este plan** |
| la asimetría | **zeus no sabe que este mundo existe** (diseño, no descuido): su plan solo conoce «consumidores anónimos» de su frontera pública. Nosotros sí sabemos de zeus. Si un trabajo de aquí necesita algo de zeus, allí se formula como necesidad genérica de terceros — jamás citándonos. La asimetría obliga a zeus a servir a cualquiera y nos protege de acoplarnos. |

## Glosario propio (complementa el de zeus)

| término | definición |
| ------- | ---------- |
| **spinoff** | este mundo como constelación de productos conectados al cerebro zeus vía registry + r/s/h. |
| **agujero negro** | el método de este plan: discovery → inventario → absorber/alinear/archivar → digestión, zona a zona, sin vías muertas. |
| **rabbit / spider / horse** | discovery / federación (RNFP) / transporte MCP sobre rooms. Canónico en `MCPGallery/mcp-core-sdk` (`channels/`, `protocol/`, `horse-transport/`, `spec/`). |
| **RNFP / IACM** | máquinas XState del protocolo: federación por peer (idle→awaiting_accept→active) y cola de comunicación inter-agente pre-canal. |
| **control-plane** | la cara REST de la rutina: `POST /bots`, `GET /peers`, `GET /actor-registry`. |
| **generación 1** | la era Copilot Chat (`.github_V1`, sala, dossiers, scrum): se destila y archiva en S3, no se mantiene. |
| **la editorial** | Ox (oráculo meta), Aleph (productor), Índice (portero DRY), las 5 Banderas (auditores: verdad/sombra/estructura/límites/registro) y el séquito de plugins. Su reencarnación MCP es la ola S3. |
| **cripta** | destino de lo archivado con dignidad (existe `CRIPTA/`): referencia histórica, fuera del camino. |
