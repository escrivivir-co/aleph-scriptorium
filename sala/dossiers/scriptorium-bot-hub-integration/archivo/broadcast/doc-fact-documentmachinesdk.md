# DOC_FACT - DocumentMachineSDK

> Archivo canonico de soporte para el broadcast final.
> Absorbe: `sala/agente-sony/ENTREGA_SBI-05+SBI-06.md` y su evidencia asociada.

## 1. Pack DOC_FACT reusable

- DocumentMachineSDK mantiene 4 ramas confirmadas: `main`,
  `integration/beta/scriptorium`, `mod/legislativa` y `mod/restitutiva`.
- La rama `integration/beta/scriptorium` es la que coordina este sprint y su
  ancla viva es `sala/`, no `scrum/`.
- El slot grafista ya esta operativo en `mod/legislativa`; en `main` queda
  previsto como parte del dossier `grafo-sdk`.
- La future-machine se describe como cadena completa:
  `piezas -> LORE_F -> corpus -> grafo -> universo -> corto`.
- El gap entre la aspiracion del `PLAN.md` transversal y el grafo real del mod
  se ofrece como objeto de conversacion con Retro, no como error.

## 2. Peticion a Retro

La asesoria que se pide a Retro se articula en tres objetos:

1. Diseno del schema generico de grafo (`GS-01`).
2. Inscripcion cruzada en backlog compartido `grafo-sdk` +
   `grafo-legalista-sdk`.
3. Forma de trabajo compartida sobre el protocolo de sala y la skill
   `dossier-feature`.

## 3. Injertos listos para broadcast

- DocumentMachineSDK (antes `para-la-voz-sdk`) actua aqui como producto hermano
  de BotHubSDK dentro del ecosistema Scriptorium.
- En la rama de integracion, la coordinacion vive bajo `sala/`; la ubicacion
  legacy `scrum/` no es la ancla vigente para este cierre.
- El slot grafista ya opera en `mod/legislativa` con `27 nodos`, `35 arcos`,
  `7 huecos` y gramatica JSON v1.0.
- La future-machine conecta `piezas -> LORE_F -> corpus -> grafo -> universo -> corto`.
- La sesion con Retro se plantea como asesoria de diseno y pipeline, no solo
  como integracion tecnica.

## 4. Evidencia detallada

El detalle de ramas, anclas por rama, future-machine, slot grafista, addons y
pendientes honestos se archiva en:

- `documentmachinesdk-evidencia-detallada.md`

## 5. Pendientes honestos

- Contenido fino de `mod/restitutiva`.
- Diferencial de commits `integration/beta/scriptorium ^ main`.
- Cualquier validacion posterior que dependa de una respuesta real de Retro.