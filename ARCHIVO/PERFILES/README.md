# ARCHIVO/PERFILES

Esta carpeta almacena **fichas de perfil** de lectores/usuarios que han pasado por el vestíbulo de cartas-puerta.

## Propósito

- Recordar qué carta-puerta se asignó a cada lector.
- Mantener contexto entre sesiones.
- Permitir actualizar el perfil si cambian los intereses.

## Formato de ficha

Cada ficha sigue la plantilla definida en `.github/prompts/vestibulo-cartas.prompt.md`.

## Tipos de perfil

| Perfil | Descripción | Carta |
|--------|-------------|-------|
| `base` | Sin cuestionario, visión objetiva | (todas equivalentes) |
| `vista-total` | Valora completitud, método, corrección | `carta-maestro-vista-total.md` |
| `blueflag` | Valora evidencia, utilidad, falsificabilidad | `carta-maestro-blueflag.md` |
| `blackflag` | Valora análisis de poder, sombras, adversario | `carta-maestro-blackflag.md` |
| `redflag` | Valora viabilidad, escala, enforcement | `carta-maestro-redflag.md` |

## Uso

El prompt `vestibulo-cartas.prompt.md` crea y actualiza estas fichas automáticamente.
