# Planificación Sprint 2: Conversación PO-SM

> **Fecha**: 2025-12-22  
> **Participantes**: Product Owner (PO), Scrum Master (SM)  
> **Contexto**: Cierre de Sprint 1 (Teatro Interactivo, 100%)

---

## Apertura

**SM**: Sprint 1 cerrado. 44 de 44 tasks. El Teatro funciona: tenemos cartelera, visualizador impress.js, dos obras (una en escena), pipeline validado desde FORO_SCRAPER hasta GH-Pages. ¿Qué hacemos ahora?

**PO**: Antes de decidir, recapitulemos qué tenemos y qué falta. Dame el inventario.

**SM**: 

| Activo | Estado | Notas |
|--------|--------|-------|
| Teatro Interactivo | ✅ Operativo | 2 obras, visualizador MVP |
| Pipeline completo | ✅ Validado | FORO → AGENT_CREATOR → ARG → TEATRO |
| 5 Banderas | ✅ Operativas | Auditores listos |
| Periódico | ✅ Funcional | 3 noticias publicadas |
| Enciclopedia | 🔶 Básica | Solo HDF-ErnestoCastro (61 caps) |
| Fundación (texto) | ⏸️ Pausa | 0/12 capítulos iniciados |
| Euler (cloud) | ⏳ Futuro | Solo documentación conceptual |

**PO**: El Teatro se construyó para producir Fundación. ¿Por qué no lo estamos usando para eso?

**SM**: Exacto. Ese es el dilema. Tenemos tres caminos:

---

## Las Tres Opciones

### Opción A: Más herramientas (Scriptorium)

**SM**: Seguir puliendo el framework antes de usarlo. Mejorar UX del Teatro, añadir tomos a Enciclopedia, preparar bridge a Euler.

**PO**: ¿Qué ganaríamos?

**SM**: Herramientas más robustas. Menos fricción cuando empecemos a escribir. Pero también...

**PO**: ...más procrastinación. Seguimos construyendo el taller sin fabricar nada. ¿Cuál es el riesgo?

**SM**: El clásico "perfección como excusa". Además, no sabemos qué falta hasta que usemos el sistema de verdad.

**PO**: Descartada como opción principal. Puede ser secundaria.

---

### Opción B: Full Fundación

**SM**: Dedicar todo el esfuerzo al Capítulo 1. Redactar, auditar, publicar.

**PO**: ¿Es viable sin mejorar nada?

**SM**: Técnicamente sí. Todas las herramientas funcionan. Pero surgirán fricciones: "ojalá esto fuera más fácil", "falta tal cosa". 

**PO**: Y esas fricciones se perderán si no las capturamos.

**SM**: Correcto. Además, 100% contenido sin iterar herramientas puede generar deuda técnica invisible.

**PO**: Tampoco. Necesitamos feedback loop.

---

### Opción C: Híbrido (70/30)

**SM**: Usar el Teatro para producir el Capítulo 1, pero reservar capacidad para mejoras que surjan del uso real.

**PO**: Me gusta. ¿Cómo lo estructuramos?

**SM**: Cuatro iteraciones. Las primeras tres enfocadas en el capítulo, la cuarta en consolidar mejoras detectadas.

**PO**: ¿Y si las mejoras son urgentes antes de la cuarta iteración?

**SM**: Las anotamos en un buffer. Si bloquean el trabajo, las abordamos inline. Si no, van a la iteración 4.

**PO**: Bien. Vamos con C.

---

## Definición del Sprint 2

**PO**: Nombre del Sprint.

**SM**: "Primer Capítulo" o "Anacronismo Productivo" (título del cap).

**PO**: "Anacronismo Productivo" es más poético, pero confuso. Que sea descriptivo: **"Capítulo Uno"**.

**SM**: Sprint 2: Capítulo Uno. Épica principal: FUND-1.1.0. Épica secundaria: SCRIPT-1.1.0 (mejoras emergentes).

---

## Estructura de Iteraciones

**PO**: Cuatro iteraciones. ¿Qué hace cada una?

**SM**: Propuesta:

| Iteración | Nombre | Objetivo | Effort |
|-----------|--------|----------|--------|
| **FC1-I1** | Preparación | Definir estructura, consultar fuentes, scraping | 20% |
| **FC1-I2** | Borrador | Redactar borrador completo con @aleph | 35% |
| **FC1-I3** | Auditoría | Pasar por 5 Banderas, iterar, aprobar | 30% |
| **FC1-I4** | Cierre | Publicar, capturar mejoras, planificar Sprint 3 | 15% |

**PO**: El esfuerzo está desbalanceado hacia I2-I3. ¿Es intencional?

**SM**: Sí. La preparación y el cierre son más ligeros. El músculo está en escribir y auditar.

**PO**: ¿Qué pasa con las mejoras de Scriptorium?

**SM**: Buffer paralelo. Cada iteración puede generar issues. En I4 decidimos cuáles van a Sprint 3 y cuáles son quick wins que cerramos ahí mismo.

---

## Riesgos y Mitigaciones

**PO**: ¿Qué puede salir mal?

**SM**: 

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Bloqueo creativo | Media | Alto | Usar @periodico para calentar, no empezar en frío |
| Scope creep del capítulo | Alta | Medio | Definir indicadores de fracaso antes de escribir |
| Mejoras que descarrilan | Media | Alto | Buffer estricto, no más del 30% en mejoras |
| Enciclopedia insuficiente | Baja | Medio | Scraping adicional si faltan fuentes |

**PO**: El bloqueo creativo me preocupa. ¿Cómo calentamos?

**SM**: Antes de I1, podemos hacer una "semana cero" informal: generar 2-3 noticias con @periodico sobre temas del capítulo. No cuenta como Sprint, pero pone el motor en marcha.

**PO**: Me gusta. Lo dejamos fuera del backlog formal pero lo hacemos.

---

## Métricas de Éxito

**PO**: ¿Cómo sabemos que el Sprint fue exitoso?

**SM**: 

| Métrica | Objetivo | Mínimo aceptable |
|---------|----------|------------------|
| Capítulo 1 completo | ✅ Publicado | Borrador aprobado (sin publicar) |
| Auditoría 5 Banderas | 5/5 aprobadas | 4/5 aprobadas |
| Mejoras capturadas | ≥10 issues | ≥5 issues |
| Quick wins cerrados | ≥5 | ≥3 |
| Buffer no excedido | ≤30% effort | ≤40% effort |

**PO**: Perfecto. Arma el backlog.

**SM**: Siguiente documento.

---

## Cierre

**PO**: Resumen ejecutivo.

**SM**: 

> **Sprint 2: Capítulo Uno**
> 
> - **Objetivo**: Producir el primer capítulo de Fundación ("Anacronismo productivo") usando las herramientas del Sprint 1.
> - **Modelo**: Híbrido 70/30 (contenido/mejoras).
> - **Iteraciones**: 4 (Preparación → Borrador → Auditoría → Cierre).
> - **Épicas**: FUND-1.1.0 (principal), SCRIPT-1.1.0 (secundaria).
> - **Entregable**: Capítulo 1 publicado + backlog de mejoras para Sprint 3.

**PO**: Aprobado. Vamos.

---

*Fin de la conversación de planificación.*
