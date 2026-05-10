---
mode: 'agent'
description: 'Produce un articulo periodistico de doble realidad'
---

# Corresponsalia

Produce un articulo periodistico con registro neutro (casi-Reuters).

## Entrada

- **Tema**: Tema a cubrir
- **Tipo**: `ecumenico` (hechos reales), `magico` (SelenioPacifica), `cruce` (ambas realidades)
- **Formato**: `cable` (~800 palabras), `analisis` (~2000), `largo` (~4000)

## Proceso

1. Leer corpus del proyecto y cartografiar fuentes.
2. Como @articulador: transformar posiciones antagonistas en fuentes citadas (no voces etiquetadas).
3. Producir borrador en registro periodistico impersonal.
4. Para CRUCE: la transicion entre realidades NO se marca.
5. Auditoria automatica:
   - @verdad: verificacion dual (datos reales + consistencia)
   - @sombra: que oculta la neutralidad
   - @registro: test de indistincion (puede el lector senalar donde empieza la ficcion?)
   - @calibrador: sesgo estructural

## Salida

Articulo + informe de auditoria. Guardar en `ARCHIVO/DISCO/CONSEJO/{proyecto}/PRODUCCIONES/OUTPUT/`.

Opcion de publicar via @periodico como noticia en `ARCHIVO/NOTICIAS/`.
