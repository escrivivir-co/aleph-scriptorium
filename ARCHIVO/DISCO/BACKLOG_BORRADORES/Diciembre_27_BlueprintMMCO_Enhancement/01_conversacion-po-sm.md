# Conversación PO-SM: Enhancement Blueprint MMCO

> **Fecha**: 2025-12-27
> **Participantes**: Product Owner (PO), Scrum Master (SM)
> **Contexto**: Blueprint MMCO tiene problemas críticos de navegación antes de presentación Talaia/Flove

---

## Apertura

**SM**: El Blueprint MMCO (SCRIPT-1.27.0) fue implementado según el modelo de 7 niveles de emergencia MMCO. Sin embargo, hay un problema crítico de usabilidad que impide su uso en la presentación con Talaia y Flove.

**PO**: ¿Cuál es el problema exactamente?

**SM**: Diagnóstico realizado con navegación real (MCP Playwright):

1. **Superposición de diapositivas**: Las 8 diapositivas están apiladas en el mismo punto (0,0), variando solo en Z. Esto crea una "maraña" visual donde todo se superpone.
2. **Comparativa**: El Blueprint UX sí funciona correctamente porque usa coordenadas dispersas (X=-1500, X=1500, Y=1500, etc.)
3. **Causa raíz**: El concepto de "eje Z = nivel de emergencia" era conceptualmente correcto pero visualmente inviable. Impress.js necesita separación en X/Y para que las diapositivas no se superpongan.

**PO**: Entendido. Necesitamos esto funcionando para la reunión con Talaia/Flove. ¿Cuál es la solución?

---

## Definición del Objetivo

**SM**: Propongo un enhancement con objetivo SMART:

> **Objetivo**: Refactorizar las coordenadas del Blueprint MMCO para que las 8 diapositivas sean navegables sin superposición, manteniendo la narrativa de "jerarquía de emergencia" MMCO, listo para presentación Talaia/Flove.

**PO**: Aprobado. ¿Qué arquitectura propones?

**SM**: Opciones evaluadas:

| Opción | Descripción | Pros | Contras |
|--------|-------------|------|---------|
| A) Lineal vertical | Y crece con nivel (0c→4) | Simple | Poco dramático |
| B) Espiral ascendente | X/Y varían + Z crece | Narrativo | Complejo |
| C) Cruz expandida | Niveles 0x arriba, 1-4 abajo y lados | Clara | Menos flujo |
| D) Replicar UX | Adaptar coordenadas del blueprint UX | Probado | Menor diferenciación |

**Recomendación**: **Opción A (Lineal vertical)** con ligera variación X para evitar superposición.

```
                    overview (z=3000, scale=6)
                         ↑
            matter (y=4000) ← Nivel 4
                         ↑
         spacetime (y=3000) ← Nivel 3
                         ↑
             time (y=2000) ← Nivel 2
                         ↑
          geometry (y=1000) ← Nivel 1 (centro)
                         ↑
           tensors (y=-500) ← Nivel 0a
                         ↑
      correlations (y=-1500) ← Nivel 0b
                         ↑
               bnp (y=-2500, z=-500) ← Nivel 0c (más profundo)
```

**PO**: Me gusta. Simple y claro. Aprobado.

---

## Identificación de Stories

**SM**: Una sola story con tasks de implementación:

| ID | Story | Effort | Prioridad |
|----|-------|--------|-----------|
| SCRIPT-1.28.0-S01 | Refactorizar coordenadas Blueprint MMCO | 3 pts | P0 (Crítico) |

**Tasks**:

| Task | Descripción | Effort |
|------|-------------|--------|
| T01 | Actualizar data-x, data-y, data-z de las 8 diapositivas | 1 pt |
| T02 | Verificar navegación local con Jekyll | 0.5 pt |
| T03 | Ajustar CSS si es necesario (estilos MMCO) | 0.5 pt |
| T04 | Tomar screenshots de validación | 0.5 pt |
| T05 | Commit y actualizar BACKLOG | 0.5 pt |

---

## Riesgos y Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Navegación sigue rota | Baja | Alto | Test con Playwright antes de commit |
| CSS incompatible | Media | Medio | Reusar estilos existentes del blueprint UX |
| Tiempo insuficiente | Baja | Alto | Scope reducido a solo coordenadas |

---

## Métricas de Éxito

| Criterio | Definición |
|----------|------------|
| ✅ Navegable | Las 8 diapositivas se ven sin superposición |
| ✅ Flechas funcionan | Navegación con ← → salta correctamente |
| ✅ Overview funciona | Tecla O muestra vista panorámica legible |
| ✅ Contenido intacto | Textos MMCO sin cambios |

---

## Cierre

**SM**: Resumen ejecutivo:
- **Problema**: Blueprint MMCO inusable por superposición de slides
- **Solución**: Refactorizar coordenadas a layout lineal vertical
- **Effort**: 3 puntos
- **Prioridad**: P0 (bloquea presentación Talaia/Flove)

**PO**: Aprobado. Generar backlog borrador.

