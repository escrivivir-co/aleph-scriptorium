# Plan — Web docs/ + landing red distribuida (PUB / ROOMS)

## Tarea 1 — Archivar índice actual y reescribir el nuevo

**Mover/archivar:**
- `docs/index.md` → `docs/scriptorium-v1.md` (preservar permalink antiguo redirigido o nuevo `/scriptorium-v1/`).
- Conservar layout/frontmatter, añadir banner "índice histórico v1.0.0-alpha.1".

**Nuevo `docs/index.md`:**
- Mismo frontmatter (`layout: default`, `permalink: /`).
- Hero sintético (release banner + ℵ + tagline corta).
- Tabla de subdominios DRY al README.md actual del repo (puerto 1:1 del bloque `> | Subdominio | Servicio |`), envuelta en cita / blockquote o Markdown table directa.
- Sección "Layers (1 y 2)" con table 2 col: imágenes y links pub/rooms (las mismas que README ya enlaza desde `ARCHIVO/FOTOS_ESTADO/pub-subdominios/`).
  - **Atención**: las imágenes están en `ARCHIVO/` y `_config.yml` excluye `ARCHIVO`. Hay que copiarlas a `docs/assets/img/pub-subdominios/` para que sirvan en GitHub Pages.
- Bloque navegación principal reducido (cards a: Léeme, Ecosistema, Roadmap, Periódico, Salas, Fundación, Blueprint, **Red layer1/layer2** [nueva], **Scriptorium v1** [archivada]).
- Footer/Contribuir/Aviso legal preservados del actual.

## Tarea 2 — Nueva landing `/red/` (layer1 PUB · layer2 ROOMS)

**Crear `docs/red.md`:**
- `permalink: /red/`, layout `default`.
- Estructura: directorio de acceso (no duplicar info), 2 secciones layer1/layer2 + entrada al feature parlament.
- Reusa estética fanzine si es viable (heredar `assets/css/main.css`).

**Estructura de la landing:**

1. **Header** — "Red distribuida del Scriptorium" + 2 chips (LAYER1 oasis/ssb · LAYER2 rooms/socket.io).

2. **Layer 1 · PUB / Oasis SSB** (column izquierda):
   - Imagen `pub-escrivivir-co.png` linkada → `https://pub.escrivivir.co`.
   - Bullet: nodo replicación, invites/PUB KEY/CONNECT.
   - Mini-tabla rutas hijas: `/scriptorium/`, `/admin/`, `/public/status`.
   - Links externos: pub site live, repo `BlockchainComPort/OASIS_PUB`.

3. **Layer 2 · ROOMS / Node-RED mesh** (column derecha):
   - Imagen `rooms-scriptorium-escrivivir-co.png` linkada → `https://pub.escrivivir.co/scriptorium/`.
   - Bullet: peer Socket.IO mesh, federación, sin abrir puertos.
   - Mini-tabla: `scriptorium.escrivivir.co/red`, `/ui`, `/dashboard` + admin + rooms + mcp + npm.
   - Manuales: 3 NOD-RED-FED-NOTES.

4. **Feature destacado · Parlament** (zona ancha):
   - Card grande linkando a `https://pub.escrivivir.co/parlament/` (la HTML que tienes).
   - Resumen 1-2 párrafos: "teatro layer2 sobre Oasis/SSB · Casa Arrakis prepara, MC conduce, Elenco actúa, Público empuja · BOE cristaliza".
   - 4 chips: ROOM · FIREHOSE · BOE · FUTURE-MACHINE.

5. **Directorio de acceso** (tabla canónica, expansión técnica):
   - Tabla con 3 columnas: **Subdominio | Tecnología | Acceso**.
   - Filas: pub (Oasis SSB v0.7.4 / port 8008), scriptorium (Node-RED 1880 read-only), admin (Node-RED auth), rooms (Socket.IO 3010), mcp (Streamable HTTP 3003), npm (Verdaccio 4873).
   - Cada fila: enlace público + healthz si aplica + repo o dossier que lo gestiona.

6. **Dossiers e ingeniería** (sección final):
   - Link a `sala/dossiers/scriptorium-vps/` (cómo se montó).
   - Link a `sala/dossiers/dossier-layer2-bridge/` (qué viene después).
   - Link a `BlockchainComPort/OASIS_PUB/site/parlament/index.html` (la landing fanzine en el VPS).
   - Link a `WiringEditor/NOD-RED-FED-NOTES/` (los 3 manuales de federación).

**Integración con navegación principal:**
- Añadir card "Red" a `docs/index.md` `<!-- NAVEGACIÓN PRINCIPAL -->`.
- Añadir entry `Red` al `_config.yml` `navigation:`.

## Activos a copiar

- `ARCHIVO/FOTOS_ESTADO/pub-subdominios/pub-escrivivir-co.png` → `docs/assets/img/pub-subdominios/pub-escrivivir-co.png`.
- `ARCHIVO/FOTOS_ESTADO/pub-subdominios/rooms-scriptorium-escrivivir-co.png` → `docs/assets/img/pub-subdominios/rooms-scriptorium-escrivivir-co.png`.

## Archivos a tocar

- `docs/index.md` (vaciar contenido + reescribir)
- `docs/scriptorium-v1.md` (NUEVO — copia del index actual + banner archivo)
- `docs/red.md` (NUEVO — landing layer1/layer2)
- `docs/_config.yml` (añadir entry navigation Red)
- `docs/assets/img/pub-subdominios/*.png` (2 archivos copiados)
- (opcional) `docs/_includes/nav.html` si afecta a sidebar

## Decisiones a confirmar con el usuario

1. ¿Permalink del archivo? `/scriptorium-v1/` (recomendado) vs `/archivo-v1/` vs `/legacy/`.
2. ¿Permalink de la nueva landing? `/red/` (recomendado) vs `/network/` vs `/distribuida/`.
3. ¿Imágenes copiadas dentro de docs/assets/ (recomendado, GitHub Pages las sirve) o link al raw de github.com?
4. ¿Preservar el bloque "RELEASE BANNER" del index actual o renovarlo en el nuevo?
5. ¿La landing /red/ debe replicar la estética fanzine (HTML embedded como `parlament/index.html`) o quedarse en Markdown DRY con el README?
