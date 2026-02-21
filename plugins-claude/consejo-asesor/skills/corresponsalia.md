# Corresponsalia

Produce un articulo periodistico de doble realidad: ecumenica, magica o cruce.

## Quick Usage

```
/corresponsalia {tema} --tipo {ecumenico|magico|cruce} --formato {cable|analisis|largo}
```

Periodismo con registro neutro (casi-Reuters) que cubre hechos verificables, la realidad de SelenioPacifica, o ambas.

## What It Creates

Articulo periodistico + auditoria automatica (verdad + sombra + registro + calibrador).

---

<details>
<summary><strong>Full Documentation</strong> (click to expand)</summary>

## Article Types

| Tipo | Descripcion |
|------|-------------|
| ECUMENICO | Hechos verificables del mundo real, publicable en un medio convencional |
| MAGICO | Hechos de SelenioPacifica escritos como si fueran reales; sin marcadores de ficcion |
| CRUCE | Empieza en una realidad y termina en la otra; la transicion es imperceptible |

## Length Formats

| Formato | Palabras aprox. |
|---------|----------------|
| Cable | ~800 |
| Analisis | ~2000 |
| Largo | ~4000 |

## Execution Flow

1. @articulador lee indices del corpus y cartografia fuentes
2. Transforma posiciones antagonistas en fuentes citadas (no voces etiquetadas)
3. Produce borrador en registro periodistico impersonal
4. Para CRUCE: la transicion entre realidades NO se marca
5. Auditoria automatica:
   - @verdad: verificacion dual (datos reales + consistencia)
   - @sombra: que oculta la neutralidad periodistica
   - @registro: test de indistincion (puede el lector senalar donde empieza la ficcion?)
   - @calibrador: sesgo estructural de la cobertura neutra

## Integration

El articulo producido puede publicarse via `@periodico` como noticia en `ARCHIVO/NOTICIAS/`.

</details>
