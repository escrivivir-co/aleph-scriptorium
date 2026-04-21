# Cierre Git - archivo operativo

Este subdirectorio registra el cierre de limpieza del sprint
`scriptorium-bot-hub-integration`.

Objetivo:

- dejar vivo solo el mensaje final en `BotHubSDK/examples/dashboard/userdata/broadcast.md`
- mantener el historico vivo en `BotHubSDK/examples/dashboard/userdata/history/`
- absorber dentro del dossier todo el contenido de trabajo que nacio fuera de la
  ruta canonica del dossier
- poder borrar artefactos sueltos de `sala/`, `BotHubSDK/sala/`,
  `BotHubSDK/scrum/` y `BotHubSDK/tmp/` sin perder trazabilidad

Regla de cierre aplicada:

- soporte editorial y factual del broadcast -> `../broadcast/`
- manifiestos de absorcion y limpieza -> este directorio `cierre-git/`
- contenido duplicado o provisional fuera del dossier -> se elimina tras quedar
  referenciado aqui

Archivos de este cierre:

- `root-sala-manifest.md` - absorcion de artefactos sueltos nacidos en la sala
  raiz
- `bothubsdk-loose-manifest.md` - absorcion de `scrum/`, `tmp/`, `sala/` y notas
  auxiliares generadas en BotHubSDK