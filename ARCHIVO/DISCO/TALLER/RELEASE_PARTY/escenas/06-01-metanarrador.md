# 🎤 ESCENA 06-01: El metanarrador se revela

> **Capítulo**: 6 — Pruebas, Aliados, Enemigos  
> **Tema**: La charla del PO  
> **Slide Principal**: paso6-po  
> **Meta**: La historia contiene la historia

---

## ESCENA

*Una presentación impress.js flota en el espacio. Slides en 3D giran lentamente.*

**PO**:  
*(apareciendo en el centro del escenario)*  
¿Sabes qué es lo más loco de todo esto, Clippy?

**CLIPPY**:  
¿Qué?

**PO**:  
*(señalando a la audiencia imaginaria)*  
Que ellos... están viéndolo ahora mismo.

**CLIPPY**:  
¿Quiénes?

**PO**:  
La audiencia del hackathon.  
Están viendo esta misma presentación.  
Y tú eres parte de ella.

*Clippy mira a su alrededor, desconcertado.*

**CLIPPY**:  
Espera... ¿esto es... una obra dentro de una obra?

**PO**:  
Es un blueprint-po.  
Una presentación 3D navegable.  
Con slides para el PO, Ox, Aleph, y el Scrum Master.  
*(haciendo gestos)*  
← → para avanzar. ↑ para técnico. ↓ para producto.

**CLIPPY**:  
*(procesando)*  
Entonces... ¿yo soy un personaje en una demo que documenta cómo se hizo la demo?

**PO**:  
*(sonriendo)*  
Bienvenido al módulo reflexivo.  
Un sistema que se estudia a sí mismo.  
Para mejorarse a sí mismo.

*Las slides giran, mostrando fragmentos de código, diagramas, backlogs.*

**CLIPPY**:  
Esto es... vertiginoso.

**PO**:  
Esto es Aleph Scriptorium.

*FUNDIDO*

---

## NOTAS PARA SLIDES ADYACENTES

### paso6-ox (↑ arriba)
**impress.js**: El motor detrás de las presentaciones 3D.
```html
<!-- Patrón CUBO -->
data-x = paso * 3000
data-y = {
  po: 0,
  ox: -800,
  aleph: 800 (offset -500),
  sm: 800 (offset +500)
}
```

### paso6-aleph (↙ abajo-izquierda)
**Galería Visual**: Los 4 blueprints del Scriptorium.
| Blueprint | Contenido |
|-----------|-----------|
| UX | Taxonomía y métricas |
| MMCO | Ontología 5D |
| Copilot | Flujo técnico |
| PO | Demo showcase |

### paso6-sm (↘ abajo-derecha)
**Impedimentos Conocidos**:
- Navegación móvil limitada
- Performance con muchos slides
- CSS ~3000 líneas

---

## TRANSICIÓN

*Clippy mira la presentación con nuevos ojos.*

**CLIPPY**:  
"Si puedo ser parte de una historia que se cuenta a sí misma...  
¿Qué más puedo hacer?"

→ **Siguiente**: Escena 07-01 (NovelistEditor)
