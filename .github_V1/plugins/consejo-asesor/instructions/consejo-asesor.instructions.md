---
applyTo: "ARCHIVO/DISCO/CONSEJO/**/*.md, ARCHIVO/PLUGINS/CONSEJO_ASESOR/**/*.md, .github/plugins/consejo-asesor/**/*.md"
---

# Instrucciones: Consejo Asesor (ONFALO)

Cuando trabajes con archivos del Consejo Asesor, sigue estas reglas:

## Proyectos del usuario

- Los proyectos viven en `ARCHIVO/DISCO/CONSEJO/{nombre}/`
- Cada proyecto tiene un `proyecto.config.md` con la voz, antagonistas, corpus, vocabulario y estilo
- Las variables `{{proyecto.*}}` se resuelven desde este archivo

## Modos del consejo

- Lee `.github/plugins/consejo-asesor/data/protocolo.md` para los 7 modos
- Lee `.github/plugins/consejo-asesor/data/agentes.md` para el catalogo de 14 agentes
- Cada sesion produce una transcripcion en `sesiones/`

## Pipeline de relato

- Fase 1 (laboratorio): materiales brutos -> fichas en PRODUCCIONES/INPUT/
- Fase 2 (input): fichas + usuario -> config.md con foco y formato
- Fase 3 (relato): metarelato + fichas + config -> relato en PRODUCCIONES/OUTPUT/

## Reglas

1. El usuario es el orquestador. Los agentes aconsejan, no deciden.
2. Las tensiones son productivas: no se resuelven, se habitan.
3. El output es un artefacto limpio: sin metadata, sin menciones a agentes.
4. El relato emana del metarelato, no es un resumen de fichas.
