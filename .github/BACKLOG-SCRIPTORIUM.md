# Backlog — Aleph Scriptorium

> **Opportunity**: Aleph Scriptorium  
> **Versión**: 1.0.0-beta.4  
> **Sprint actual**: FC2 (Feature Cycle 2)  
> **Fecha inicio**: 2025-12-27

---

## Épicas Activas

| Épica | Nombre | Estado | Prioridad |
|-------|--------|--------|-----------|
| SCRIPT-1.20.0 | Metamodel Scriptorium | 🆕 Nueva | P0 |
| SCRIPT-1.21.0 | MMCO ARG-Board | 🆕 Nueva | P1 |
| SCRIPT-1.22.0 | Integración y Validación | 🆕 Nueva | P2 |
| SCRIPT-1.23.0 | MMCO Editor Transmedia | 🆕 Nueva | P1 |
| SCRIPT-1.25.0 | Blueprint Visual Index | ✅ Cerrada | Alta |

---

## FC1: Ontología Formal del Scriptorium

> **Feature Cycle**: FC1  
> **Borrador**: [ARCHIVO/DISCO/BACKLOG_BORRADORES/Diciembre_25_Ontologia/](../../ARCHIVO/DISCO/BACKLOG_BORRADORES/Diciembre_25_Ontologia/)  
> **Effort total**: 37 puntos  
> **Estado**: ✅ Aprobado

### Concepto

Aplicar los frameworks **Metamodel** (ontología formal) y **MMCO** (métricas de coherencia) al Scriptorium para:
1. Especificar formalmente agentes, plugins y dominios
2. Medir coherencia en partidas ARG y producción editorial
3. Integrar con @decoherence, @ox y las 5 Banderas

### Estructura del FC1

```
┌───────────────────────────────────────────────────────────────────────────────┐
│                         FC1: Ontología Formal                                  │
├─────────────────┬──────────────────┬──────────────────┬───────────────────────┤
│   Iteración 1   │   Iteración 2    │   Iteración 3    │     Iteración 4       │
│   (16 pts/43%)  │   (8 pts/22%)    │   (8 pts/22%)    │     (5 pts/13%)       │
├─────────────────┼──────────────────┼──────────────────┼───────────────────────┤
│ Metamodel       │ MMCO ARG         │ MMCO Editor      │ Integración           │
│ Scriptorium     │ Board            │ Transmedia       │ Validación            │
└─────────────────┴──────────────────┴──────────────────┴───────────────────────┘
```

### SCRIPT-1.20.0 — Metamodel Scriptorium

> **Effort**: 16 pts  
> **Objetivo**: Especificación formal de agentes/plugins/dominios

| Story | Descripción | Effort | Estado |
|-------|-------------|--------|--------|
| S01 | Especificación de Agentes Core (12 agentes) | 5 pts | ⏳ |
| S02 | Especificación de Handoffs (grafo JSON) | 3 pts | ⏳ |
| S03 | Especificación de Plugins (5 principales) | 3 pts | ⏳ |
| S04 | Consolidación Ontología XML | 2 pts | ⏳ |
| S05 | Ontología del Dominio ARG | 3 pts | ⏳ |

### SCRIPT-1.21.0 — MMCO ARG-Board

> **Effort**: 8 pts  
> **Objetivo**: Modelo de coherencia para partidas ARG

| Story | Descripción | Effort | Estado |
|-------|-------------|--------|--------|
| S01 | Mapeo de Jerarquía de Emergencia | 3 pts | ⏳ |
| S02 | Métrica de Coherencia Φ_ARG | 3 pts | ⏳ |
| S03 | Toy Model ARG (hola_mundo) | 2 pts | ⏳ |

### SCRIPT-1.23.0 — MMCO Editor Transmedia

> **Effort**: 8 pts  
> **Objetivo**: Modelo de coherencia para producción editorial

| Story | Descripción | Effort | Estado |
|-------|-------------|--------|--------|
| S01 | Jerarquía de Emergencia Editorial | 3 pts | ⏳ |
| S02 | Métrica Φ_editor (5 Banderas) | 3 pts | ⏳ |
| S03 | Meta-Dinámica de Producción | 2 pts | ⏳ |

### SCRIPT-1.22.0 — Integración y Validación

> **Effort**: 5 pts  
> **Objetivo**: Conectar con @decoherence, @ox, 5 Banderas

| Story | Descripción | Effort | Estado |
|-------|-------------|--------|--------|
| S01 | Integración con @decoherence | 2 pts | ⏳ |
| S02 | Integración con @ox y Banderas | 2 pts | ⏳ |
| S03 | Validación Cruzada | 1 pt | ⏳ |

---

## SCRIPT-1.25.0 — Blueprint Visual Index

> **Objetivo**: Refactorizar `docs/index.md` como blueprint visual navegable del Scriptorium  
> **Borrador**: [ARCHIVO/DISCO/BACKLOG_BORRADORES/NEW_GH_PAGES_INDEX/](../../ARCHIVO/DISCO/BACKLOG_BORRADORES/NEW_GH_PAGES_INDEX/)  
> **Dependencias blandas**: FLOVE_EDITOR, METAMODEL_COMPLIANCE, MMCO, HYPERGRAPH_EDITOR

### Concepto

Una vez completadas las épicas de modelado ontológico, el index.md presentará:
- **MetaModel**: Estructura abstracta del sistema de producción transmedia
- **Hypergraph (Retro Model)**: Configuración de posibilidad y coherencia
- **Dinámicas de producción**: Flujos entre plugins, agentes y datos

### Stack Tecnológico

| Componente | Librería | Estado |
|------------|----------|--------|
| Presentación 3D | **impress.js** | ✅ Instalado |
| Diagramas | **Mermaid.js** | ✅ Integrado |
| Estilos | CSS3 | ✅ Existente |

### Sprint 1: Estructura Base ✅ COMPLETADO

| ID | Tarea | Prioridad | Estado |
|----|-------|-----------|--------|
| T1 | Crear layout `docs/_layouts/presentation.html` | Must | ✅ |
| T2 | Integrar Mermaid.js en Jekyll | Must | ✅ |
| T3 | Diseñar estructura de 7 slides | Must | ✅ |
| T4 | Crear diagrama MetaModel en Mermaid | Must | ✅ |
| T5 | Implementar navegación por teclado | Must | ✅ |
| T6 | Crear fallback noscript | Should | ✅ |
| T7 | Documentar estructura de slides | Should | ✅ |

### Sprint 2: Interactividad y Datos ✅ COMPLETADO

| ID | Tarea | Prioridad | Estado |
|----|-------|-----------|--------|
| T8 | Implementar Hypergraph visual navegable | Must | ✅ |
| T9 | Conectar datos desde `registry.json` | Should | ⏳ Pendiente FC1 |
| T10 | Añadir enlaces contextuales | Must | ✅ |
| T11 | Animaciones de transición | Should | ✅ |
| T12 | Tests accesibilidad WCAG 2.1 AA | Should | ⏳ Pendiente |
| T13 | Tutorial de navegación (overlay) | Could | ⏳ Pendiente |
| T14 | Optimizar carga (lazy loading) | Could | ⏳ Pendiente |

### Estructura de Slides

```
                         overview (z:3000)
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
   ontology              core (0,0)             dynamics
   (x:-1500)          Agentes+Plugins           (x:1500)
   Flove/UFO                  │                  Flujos
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
   hypergraph            products                 cta
   (y:1500)              (y:-1500)             (z:-1500)
   Retro Model         Teatro/Periódico        Fork/Contrib
```

### Criterios de Aceptación

**Sprint 1**: ✅ COMPLETADO
- [x] Layout presentation.html funcional
- [x] Mermaid.js renderiza en Jekyll
- [x] 7 slides navegables con flechas
- [x] Diagrama MetaModel visible
- [x] Fallback noscript operativo

**Sprint 2**: ✅ PARCIALMENTE COMPLETADO
- [x] Hypergraph muestra nodos plugins/agentes
- [x] Click en nodo navega a docs
- [ ] Métricas dinámicas desde registry (pendiente FC1)
- [x] Transiciones suaves
- [ ] Lighthouse accesibilidad ≥90 (pendiente validación)

---

## Épicas Relacionadas (Dependencias Blandas)

| Épica | Nombre | Estado | Relación |
|-------|--------|--------|----------|
| SCRIPT-1.20.0 | Metamodel Scriptorium | ✅ Aprobado | Ontología formal |
| SCRIPT-1.21.0 | MMCO ARG-Board | ✅ Aprobado | Coherencia ARG |
| SCRIPT-1.22.0 | Integración y Validación | ✅ Aprobado | Conectar sistemas |
| SCRIPT-1.23.0 | MMCO Editor Transmedia | ✅ Aprobado | Coherencia editorial |

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-27 | ✅ Cerrar SCRIPT-1.25.0 (Blueprint Visual Index) - Sprint 1 y 2 implementados | Aleph |
| 2025-12-27 | Aprobar FC1 Ontología Formal (SCRIPT-1.20.0 a 1.23.0) | Scrum |
| 2025-12-27 | Aprobar épica SCRIPT-1.25.0 (Blueprint Visual Index) | Scrum |
| 2025-12-27 | Crear épica SCRIPT-1.25.0 (Blueprint Visual Index) | Aleph |
