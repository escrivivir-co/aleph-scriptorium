# DECISIONES — registro del spinoff

Independiente del registro de zeus-sdk (que no nos conoce). Formato: DS-n,
fecha, decisión, consecuencia. Las abiertas las resuelve el usuario.

## Tomadas

- **DS-0 · 2026-07-15 · Este mundo es spinoff y crece desde el registry.**
  zeus-sdk generó aislado la base/cerebro; aleph-scriptorium se conecta a
  ella como constelación de productos. Todo intercambio pasa por
  `npm.scriptorium.escrivivir.co` (scopes `@alephscript`, `@zeus`): lo de
  zeus se instala, lo de aquí se publica. Prohibido tocar la carpeta de
  zeus-sdk desde este plan, y prohibido depender de ella por ruta/submodule/
  copia.
- **DS-1 · 2026-07-15 · El bridge es registry + rabbit-spiders-horses, con
  asimetría.** La rutina r/s/h de `MCPGallery/mcp-core-sdk` (rabbit =
  discovery, spider = federación RNFP, horse = MCP JSON-RPC sobre rooms; con
  AsyncAPI del runtime + OpenAPI del control-plane REST) es la pieza angular
  para crecer distribuidos y el único canal entre mundos. **Zeus no sabe que
  este mundo existe**: su plan solo contempla consumidores anónimos de su
  frontera pública; nuestras necesidades se formulan allí como genéricas de
  terceros. (Otros mundos hermanos consumen a zeus con la misma regla.)
- **DS-2 · 2026-07-15 · El agujero negro como método.** El plan digiere la
  codebase por discovery: inventario maestro (WP-S01) → veredicto por zona
  (**absorber / alinear / archivar**) ratificado por el usuario → ejecución
  zona a zona (ola S4) → cero vías muertas. `ARCHIVO/` y la dimensión
  narrativa son obra canónica: no se tragan. `CRIPTA/` es el destino digno
  de lo archivado.
- **DS-3 · 2026-07-15 · Protocolo de swarm derivado de zeus.** roles/,
  PRACTICAS y plantilla de reporte derivan del protocolo de zeus-sdk
  (`plan/roles/` @ 2026-07-15) y son autocontenidos aquí (mundos separados =
  copias con procedencia, la excepción legítima a «no copiar»). Adaptación
  propia: régimen de **submodules** (PRACTICAS §2 — rama por repo tocado,
  bump de puntero solo por el orquestador al aceptar). Si el protocolo
  canónico evoluciona en zeus, se resincroniza por WP con diff consciente.
- **DS-4 · 2026-07-15 · La generación 1 se destila y archiva.** `.github_V1`
  (era Copilot Chat, congelada 2026-05), sala, dossiers y scrum antiguo no
  reciben trabajo nuevo: sus ideas buenas (Banderas auditoras, DRY de
  Índice, protocolo de sala, modelo generativo) se reencarnan en la era
  Claude/MCP ligadas a este plan (ola S3) y los originales van a CRIPTA con
  índice. Desde hoy la coordinación nueva vive SOLO en plan/.

- **DS-5 · 2026-07-15 · «Inflar» = publicar, nunca vendorear.** Respuesta a
  «¿hay que inflar los submodules dentro de nuestra codebase?»: **no**. La
  fase actual sigue siendo traer piezas, pero *traer* significa **consolidar
  y publicar al registry** (olas S0–S1), no copiar árboles. aleph-scriptorium
  se digiere **in situ** (cada submódulo sigue siendo su repo; lo vivo
  publica paquetes, lo muerto va a CRIPTA); ninguna codebase — presente o
  futura — lo absorbe como submodules ni como copias. Cuando toque diseñar
  una codebase nueva (no antes de que S1 dé piezas publicadas), nacerá
  **componiendo del registry**: un package.json que instala, cero
  duplicación — un solo origen por pieza (su repo), un solo canal (el
  registry). Gate en WP-S00: vendorear árboles de otra codebase = rojo.
- **DS-6 · 2026-07-15 · Anclaje holónico.** Este plan es la pieza técnica de
  los holones **05 (Sospecha = el agujero negro: digestión S0/S3/S4)** y
  **06 (Posmodernidad = la constelación: registry + r/s/h, S1/S2)** del
  método devops de `C:\Users\aleph\SCRIPT_SDK` (DEVOPS/METODOLOGIA/
  HOLONES.md), que emergió como holón **07** (la holarquía como método:
  ancla por rutas absolutas, no contiene código). La juntura 05↔06 es
  `plan/INVENTARIO.md`. Las dos leyes de la holarquía ya se cumplían aquí:
  ceguera ascendente = la asimetría (zeus/01 no concibe a sus sucesores);
  acceso descendente = el agujero negro releyendo la casa madre.

## Abiertas (bloquean lo indicado)

- **DAS-1 · Ratificación de veredictos del inventario** *(bloquea ola S4 y
  WP-S21)* — WP-S01 produce la tabla absorber/alinear/archivar; la ratificas
  tú antes de ejecutar. (No bloquea S0–S3.)
- **DAS-2 · ¿CI dónde?** *(informa S12)* — MCPGallery y varios submodules
  tienen repo GitHub propio en `escrivivir-co`: ¿Actions por submódulo, o
  runner del superproyecto? Propuesta del orquestador: Actions en el repo de
  cada paquete publicable (empezando por MCPGallery), superproyecto solo
  integra.
