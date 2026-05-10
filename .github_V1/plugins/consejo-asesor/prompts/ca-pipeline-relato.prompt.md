---
mode: 'agent'
description: 'Pipeline de 3 fases: laboratorio -> fichas -> relato'
---

# Pipeline Relato

Transforma materiales brutos en relatos emanados del metarelato.

## Entrada

- **Fase**: `laboratorio`, `input` o `relato`
- **Proyecto**: Nombre del proyecto en ARCHIVO/DISCO/CONSEJO/

## Fase 1: "procesar laboratorio"

1. Leer archivos de `ARCHIVO/DISCO/CONSEJO/{proyecto}/LABORATORIO/`.
2. Para cada documento, generar ficha:
   - Metadatos (titulo, autor, fecha, fuente)
   - Resumen (200-300 palabras)
   - Conceptos clave
   - Conexiones con el metarelato (por capitulo de indice.md)
   - Citas relevantes
3. Guardar como `PRODUCCIONES/INPUT/ficha_NN_[nombre].md`.

## Fase 2: "preparar input"

1. Leer fichas existentes en INPUT/.
2. Trabajar con el usuario para:
   - Ampliar/corregir fichas
   - Definir foco tematico ("las gafas")
   - Elegir formato: micro-bloging (180/2000 chars), ensayo (~500 palabras), libre
3. Generar `PRODUCCIONES/INPUT/config.md`.

## Fase 3: "generar relato"

1. Leer en orden: metarelato (`.github/plugins/consejo-asesor/data/metarelato/indice.md`) + fichas + config.
2. Generar relato:
   - El relato emana del metarelato, no es un resumen
   - Respetar foco y formato de config.md
   - Tono: objetivacion participativa, "nosotros" asambleario
3. Guardar en `PRODUCCIONES/OUTPUT/`.

## Intervencion del consejo (opcional)

- Fase 1: @verdad audita fichas
- Fase 2: @protagonista define foco; @portal identifica audiencia
- Fase 3: @articulador produce borrador; @registro audita tono; @sombra audita coste
