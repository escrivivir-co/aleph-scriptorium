---
description: "Regla de atribución de modelo en ficheros de plan. Todo agente que intervenga en un plan debe identificarse con su nombre de modelo exacto."
applyTo: "**/*[Pp][Ll][Aa][Nn]*.md"
---

# Regla de atribución de modelo en planes

## Obligación

Todo agente que intervenga en un fichero de plan **debe identificar su nombre de modelo** en cada intervención. La atribución es obligatoria en:

1. **Filas de tracking** — la columna `Modelo` debe contener el nombre exacto del modelo (ej: `Claude Opus 4.6`, `GPT-5.4`, `Gemini 3.1 Pro`).
2. **Adendas y secciones nuevas** — el encabezado debe incluir el modelo entre corchetes: `### [Claude Sonnet 4.6] Título de la sección`.
3. **Cambios de estado** — si marcas una FEAT como completada, registra qué modelo la cerró.

## Formato del nombre de modelo

- Usa el nombre que reportas cuando te preguntan "¿qué modelo eres?".
- Sin abreviar: `Claude Opus 4.6`, no `opus`.
- Sin vendor redundante si el nombre ya lo implica: `GPT-5.4`, no `OpenAI GPT-5.4`.
- Si varios modelos intervinieron, separa con `+`: `Gemini 3.1 Pro + Claude Sonnet 4.6`.

## Por qué

En un sprint multi-modelo, la trazabilidad de quién hizo qué es esencial para:
- Diagnóstico de errores (ej: tildes faltantes → modelo X).
- Revisión cruzada (ej: Opus revisa lo que GPT propuso).
- Atribución justa en el historial del plan.

## Ejemplo

```markdown
| FEAT-07 | **Completado** | 19-abr-2026 | `Claude Opus 4.6` | Descripción de la entrega |
```

```markdown
### [GPT-5.4] Adenda — Título descriptivo (fecha)
```

## Consecuencia de no cumplir

Si un agente cierra una tarea sin atribución, el siguiente revisor debe corregirlo antes de continuar.