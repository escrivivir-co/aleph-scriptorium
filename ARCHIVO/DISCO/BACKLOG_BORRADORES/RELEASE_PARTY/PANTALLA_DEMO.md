# Guía de pantallas para demo

## Main Screens

### Product Owner

Necesita una blueprint basado en la template de los Cubos. Tendrá un hilo principal con su charla pero interrumpirá sus pasos para dar paso a otras screens del equipo, que estarán anexas según la plantilla a la principal.

Entregables: se registra un feature para crear el blueprint según el protocolo. Se implementa, valida y cierra.

### Ox

Necesita gestionar en consola los servers. Necesita un script runall:

- cd scripts --> ./serve-site.sh
- cd MCPGallery --> npm run start:launcher
- cd MCPGallery --> npm run start:model
- cd MCPGallery --> npm run start:zeus

- cd NovelistEditor --> npm start

Entregable: Se edita VsCodeExtension para incluir un comando de run all que abre todas esas consolas en split. Igual, backlog feature, implementamos y cerramos. Por pasos según revisión.

### Aleph

Necesita panel de realización de pantallas. Galería con iframes:

- La web de gh-pages en index
- La web de Zeus (presets)
- La web de Novelist

- La web de gh-pages con cada una de las blueprints existens (3 iframes) + 1 El cuarto que harás para el PO.

Entregable: Agregamos a la gh-pages una pagina con la galería de iframes. Titulo: Demo.