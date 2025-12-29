# Conversación PO-SM: Blueprint Copilot 3D Cube

> **Fecha**: 2025-12-29  
> **Épica**: SCRIPT-1.31.1 (extensión de SCRIPT-1.31.0)  
> **Foco**: Mejora visual y estructural de blueprint-copilot.md

---

## Contexto del PO

**PO**: Tenemos el blueprint-copilot.md validado en contenido. Ahora quiero darle una vuelta de estilo y formato.

**SM**: Entendido. ¿Cuál es la visión principal?

**PO**: Hay una idea que me ronda la cabeza. Poder agregar diapos anexadas en los ejes de un cubo de las diapos principales para poder agregar subtramas y mejorar la presentación teniendo en la diapo principal menos información porque luego en las subdiapos se pone el contenido.

**SM**: Interesante. Un **modelo cúbico 3D** donde:
- Las diapositivas principales están en el **eje X** (flujo lineal)
- Las subdiapos se despliegan en **ejes Y/Z** (profundidad, anexos)

**PO**: Exacto. Así la diapo principal queda limpia y si el usuario quiere más detalle, navega a las subdiapos.

---

## Análisis Técnico (SM)

### Estado Actual

1. **Estructura**: 7 slides principales (Prompt → Registry → Agent → Instructions → Assembly → LLM → Output)
2. **Problema CSS**: Las clases `copilot-step`, `copilot-header`, etc. **NO tienen estilos definidos** en `blueprint.css`
3. **Oportunidad**: Impress.js soporta navegación 3D con `data-x`, `data-y`, `data-z`

### Propuesta Arquitectónica

```
CUBO COPILOT (Vista superior)

               data-z (+)
                  │
                  │   [Subdiapo detalle]
                  │
    ─────────────[Diapo Principal]─────────── data-x (+)
                  │
                  │   [Subdiapo código]
                  │
               data-z (-)

Navegación:
- Flechas ← → : Siguiente/Anterior diapo principal
- Flechas ↑ ↓ : Subdiapos de profundidad
- O bien hover/click en indicadores
```

### Slides Candidatas a Subdiapos

| Slide Principal | Subdiapos Propuestas |
|-----------------|----------------------|
| #registry | Detalle: familyPrefixes completo, matching algorithm |
| #agent-interface | Ya dividida en 2a/2b (Claude vs GPT vs Gemini) |
| #instructions | Detalle: cada Tag específico (toolUse, notebook, output) |
| #assembly | Detalle: token breakdown, optimización |
| #llm | Detalle: parámetros API, streaming |

---

## Requisitos Acordados

### RF01: Look and Feel Profesional
- **Descripción**: Estilos CSS completos para clases `copilot-*`
- **Criterio**: Visual coherente con el resto de blueprint.css
- **Prioridad**: Alta

### RF02: Navegación en Cubo 3D
- **Descripción**: Subdiapos en ejes Y/Z, principales en eje X
- **Criterio**: Navegación fluida con flechas y/o clicks
- **Prioridad**: Media-Alta

### RF03: Diapos Principales Simplificadas
- **Descripción**: Contenido reducido en principales, expandido en subdiapos
- **Criterio**: Diapo principal legible en <30 segundos
- **Prioridad**: Media

### RF04: Validación Local
- **Descripción**: Cada cambio validado con scripts existentes
- **Criterio**: `validate-site.sh` pasa sin errores
- **Prioridad**: Alta

---

## Métricas de Éxito

| Métrica | Objetivo |
|---------|----------|
| Clases CSS cubiertas | 100% de `copilot-*` |
| Subdiapos funcionales | ≥3 integradas |
| Errores Jekyll | 0 |
| Tiempo de carga | <3s en localhost |

---

## Próximos Pasos

1. **SM** genera `01_backlog-borrador.md` con stories/tasks
2. Implementar estilos CSS base
3. Refactorizar estructura HTML para cubo
4. Validar con serve-site.sh
5. Iterar sobre cada slide

**Estado**: ✅ Requisitos definidos → Listo para backlog
