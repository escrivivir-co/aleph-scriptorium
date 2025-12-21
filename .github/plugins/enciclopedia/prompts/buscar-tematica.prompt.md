---
agent: 'Bibliotecario'
description: 'Búsqueda transversal por tema o concepto filosófico'
---

# Buscar por Temática

Localiza contenido en los tomos enciclopédicos según un tema o concepto transversal.

## Uso

```
@Bibliotecario buscar-tematica "ética"
@HDF-ErnestoCastro ¿Quién habla de epistemología?
```

## Temas Reconocidos

### Disciplinas Filosóficas

| Tema | Sinónimos |
|------|-----------|
| Ética | moral, virtud, deber, bien |
| Epistemología | conocimiento, verdad, certeza |
| Metafísica | ser, sustancia, existencia |
| Política | Estado, poder, justicia, derecho |
| Estética | arte, belleza, sublime |
| Lógica | razonamiento, inferencia, validez |
| Filosofía de la religión | Dios, fe, teología |
| Filosofía del lenguaje | significado, referencia, sentido |
| Filosofía de la mente | conciencia, mente, alma |
| Filosofía social | sociedad, historia, cultura |

### Conceptos Clave

| Concepto | Capítulos relacionados (HDF) |
|----------|------------------------------|
| Voluntad | 16, 29, 32, 35, 44 |
| Libertad | 19, 29, 39, 53 |
| Razón | 21, 25, 31, 34 |
| Experiencia | 23, 25, 46, 48 |
| Dialéctica | 4, 34, 42 |
| Poder | 17, 42, 44, 58 |
| Ser | 1, 6, 14, 15, 51 |
| Tiempo | 3, 35, 49, 51 |

## Proceso

1. **Normalizar** el tema a categoría canónica
2. **Buscar** en mapas temáticos de cada tomo
3. **Ordenar** por relevancia (centralidad del tema en el capítulo)
4. **Devolver** con contexto

## Formato de Salida

```
🔍 Búsqueda temática: [tema normalizado]

📖 Historia de la Filosofía:
   
   Tratamiento central:
   - #[N]: [Filósofos] — [descripción específica]
   
   Tratamiento secundario:
   - #[M]: [Filósofos] — [mención o conexión]
   
   Conceptos relacionados: [lista]
```

## Ejemplo

**Entrada**: `¿Quién habla de ética?`

**Salida**:
```
🔍 Búsqueda temática: Ética

📖 Historia de la Filosofía:
   
   Tratamiento central:
   - #01: Aristóteles — ética de la virtud, eudaimonía
   - #08: Epicuro, Crisipo — hedonismo, estoicismo
   - #22: Spinoza — Ética geométrica, afectos
   - #31: Kant — imperativo categórico, deber
   - #39: Bentham, Mill — utilitarismo
   - #44: Nietzsche — genealogía de la moral, transvaloración
   
   Tratamiento secundario:
   - #04: Platón — bien como idea suprema
   - #14: Tomás — virtudes teologales
   - #53: Sartre — existencialismo como humanismo
   
   Conceptos relacionados: virtud, deber, bien, felicidad, valor
```

## Búsquedas Compuestas

Permite combinar tema + período:

```
@HDF-ErnestoCastro ética en el siglo XX
```

**Salida**:
```
🔍 Búsqueda: Ética × Siglo XX

- #44: Nietzsche (transición XIX-XX)
- #53: Sartre, Beauvoir (existencialismo ético)
- #54: Adorno (mínima moralia)
- #61: Habermas (ética discursiva)
```
