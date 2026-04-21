# Manifiesto de absorcion - sala raiz

Este manifiesto documenta la limpieza de artefactos de trabajo nacidos en la
raiz del repo fuera del dossier canonico.

## 1. Rutas eliminadas y reemplazo canonico

| Ruta original | Motivo de salida | Reemplazo canonico en dossier |
|---|---|---|
| `sala/README.md` | scaffold operativo de sala ya no necesario tras cierre virtual | este manifiesto + `../../WELCOME-EXTERNOS.md` |
| `sala/activacion-orquestador.md` | manual operativo provisional de sprint ya cerrado | este manifiesto |
| `sala/tablero.md` | tablero de coordinacion ya cerrado y absorbido | este manifiesto + `../broadcast/README.md` |
| `sala/plantilla-dossier/*` | duplicado de scaffolding reusable; no es entrega de broadcast | `.github/templates/sala-dossier/*` sigue siendo la fuente reusable; este manifiesto registra su retiro del area de trabajo |
| `sala/agente-gepe/*` | carpeta temporal de agente; el contenido final ya fue absorbido | `../broadcast/marco-simulacion-iacm.md`, `../broadcast/guion-iacm.md`, `../../../../BotHubSDK/examples/dashboard/userdata/broadcast.md` |
| `sala/agente-sony/*` | carpeta temporal de agente; el contenido final ya fue absorbido | `../broadcast/doc-fact-documentmachinesdk.md`, `../broadcast/documentmachinesdk-evidencia-detallada.md` |

## 2. Semantica historica preservada del tablero raiz

El `tablero.md` de la raiz dejaba tres hechos que conviene conservar despues de
su borrado:

1. El sprint se cerro en modo `quick-shut-down` el 21-abr-2026.
2. La salida real quedo consolidada en
   `BotHubSDK/examples/dashboard/userdata/broadcast.md`.
3. La evidencia extensa del cierre quedo archivada en `archivo/broadcast/`.

Esos tres hechos quedan ya reflejados en:

- `../broadcast/README.md`
- `../../BACKLOG.md`
- `../../PLAN.md`

## 3. Semantica historica preservada de Gepe

La carpeta `sala/agente-gepe/` aportaba tres piezas utiles:

1. El marco editorial de simulacion federada.
2. El mini guion IACM.
3. El candidato de broadcast que absorbio el ensamblado final.

Su preservacion queda repartida asi:

- marco -> `../broadcast/marco-simulacion-iacm.md`
- guion -> `../broadcast/guion-iacm.md`
- broadcast absorbido -> `../../../../BotHubSDK/examples/dashboard/userdata/broadcast.md`
- nota de reevaluacion y estado temporal -> valor historico agotado; su efecto
  ya quedo reflejado en el merge final y en el cierre del tablero

## 4. Semantica historica preservada de Sony

La carpeta `sala/agente-sony/` aportaba cuatro piezas utiles:

1. DOC_FACT compacto.
2. Evidencia detallada de ramas, future-machine y slot grafista.
3. Injertos para la parte 2 del broadcast.
4. El estado de recuperacion tras la escritura corrupta de una revision.

Su preservacion queda repartida asi:

- DOC_FACT -> `../broadcast/doc-fact-documentmachinesdk.md`
- evidencia detallada -> `../broadcast/documentmachinesdk-evidencia-detallada.md`
- trazas de trabajo previo -> `../broadcast/investigacion-previa-grafo.md`
- detalle de recuperacion de la revision corrupta -> valor historico agotado; la
  version final limpia es la archivada en los dos ficheros anteriores

## 5. Carpetas vacias

- `sala/agente-gemy/` ya estaba vacia al cierre y no deja contenido pendiente.