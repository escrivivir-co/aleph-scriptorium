# Conversación PO-SM: New GH-Pages Index (Blueprint Visual)

**Fecha**: 2025-12-27  
**Feature**: Refactorización de `docs/index.md` como Blueprint visual del Scriptorium  
**Sprint objetivo**: SCRIPT-1.25.0  
**Dependencias**: FLOVE_EDITOR, ONTHOLOGY_EDITOR, METAMODEL_COMPLIANCE, MMCO

---

## Apertura

**SM (Scrum Master)**: El PO ha propuesto refactorizar el `index.md` de GH-Pages para presentar el Scriptorium como un **blueprint visual** una vez se completen las épicas de modelado ontológico (FVEEditor, OntologyEditor, MetaModel Compliance, MMCO).

La idea es que el index deje de ser una landing page convencional y pase a ser una **presentación interactiva navegable** que muestre:
1. El **MetaModel** del Scriptorium como sistema de producción transmedia
2. El **Hypergraph** de Retro Model como configuración de posibilidad y coherencia
3. Las **dinámicas de producción** (flujos entre plugins, agentes, datos)

**PO (Product Owner)**: Exacto. Quiero que cuando alguien llegue al site, vea inmediatamente **qué es posible** hacer con el Scriptorium. No un README glorificado, sino un mapa conceptual navegable que muestre la arquitectura de producción transmedia.

---

## Análisis del Estado Actual

### docs/index.md actual (v1.0.0-beta.3)

| Sección | Contenido | Valoración |
|---------|-----------|------------|
| Hero | Logo + tagline | ✅ Correcto |
| Nav cards | 9 enlaces | ⚠️ Estático |
| Ecosistema strip | VibeBitacora → Aleph → Euler | ✅ Correcto |
| Prisma del conocimiento | 5 banderas | ⚠️ Solo visual |
| Status | Métricas 23 dic | 🔴 Desactualizado |
| Procesador de texto | CTA clone/fork | ✅ Correcto |

### Librerías disponibles en docs/assets/js/

| Librería | Archivo | Estado | Uso actual |
|----------|---------|--------|------------|
| **impress.js** | `impress.js` (5010 líneas) | ✅ Instalado | Teatro |
| **teatro.js** | `teatro.js` | ✅ Instalado | Teatro |

### Opciones investigadas para visualización interactiva

| Librería | Tipo | Fortalezas | Debilidades | Recomendación |
|----------|------|------------|-------------|---------------|
| **impress.js** | Presentación 3D | Ya instalado, navegación 3D, CSS3 puro | Curva de aprendizaje | ✅ USAR |
| **Mermaid.js** | Diagramas | Sintaxis Markdown, integra con Jekyll | Solo diagramas estáticos | ✅ COMPLEMENTAR |
| **Reveal.js** | Presentación | Popular, Markdown nativo | Requiere instalación, menos 3D | ❌ Innecesario |
| **D3.js** | Visualización datos | Máxima flexibilidad | Complejidad alta, overkill | ❌ Innecesario |

---

## Visión de Producto

### Concepto: "Blueprint Navegable"

El nuevo index.md será una **presentación impress.js** embebida que permita:

1. **Vista panorámica**: Zoom out del sistema completo (MetaModel)
2. **Navegación por capas**: Profundizar en subsistemas (plugins, agentes, flujos)
3. **Hipervínculos contextuales**: Cada nodo enlaza a su documentación
4. **Coherencia visual**: Usar el Hypergraph como metáfora central

### Arquitectura conceptual

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        ALEPH SCRIPTORIUM                                │
│                    (MetaModel Blueprint)                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│    ┌────────────┐     ┌────────────┐     ┌────────────┐                │
│    │  ONTOLOGÍA │────▶│  DINÁMICAS │────▶│  PRODUCTOS │                │
│    │   (FVE)  │     │   (Flujos) │     │ (Transmedia)│               │
│    └────────────┘     └────────────┘     └────────────┘                │
│          │                  │                  │                        │
│          ▼                  ▼                  ▼                        │
│    ┌────────────────────────────────────────────────────┐              │
│    │              HYPERGRAPH (Retro Model)              │              │
│    │   Configuración de Posibilidad y Coherencia        │              │
│    │                                                     │              │
│    │    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐       │              │
│    │    │Agent│◀──▶│Plugin│◀──▶│ BOE │◀──▶│Teatro│      │              │
│    │    └─────┘    └─────┘    └─────┘    └─────┘       │              │
│    │         ◀──────────────────────────────▶          │              │
│    │              (Coherencia MMCO/UFO)                 │              │
│    └────────────────────────────────────────────────────┘              │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Conceptos capitales a visualizar

| Concepto | Definición | Visualización |
|----------|------------|---------------|
| **MetaModel** | Estructura abstracta del Scriptorium | Grafo de capas (impress.js) |
| **MMCO** | Métricas de coherencia ontológica | Indicadores (Mermaid.js) |
| **Hypergraph** | Configuración de posibilidad | Red de nodos navegable |
| **Retro Model** | Posibilidades latentes (no realizadas) | Nodos grises/difusos |
| **Flujos de producción** | Cómo se crea transmedia | Animaciones de conexión |

---

## Herramientas y Librerías

### Decisión arquitectural

```
┌─────────────────────────────────────────────────┐
│           STACK VISUAL INDEX.MD                  │
├─────────────────────────────────────────────────┤
│  PRESENTACIÓN 3D:  impress.js (ya instalado)    │
│  DIAGRAMAS:        Mermaid.js (nuevo)           │
│  ESTILOS:          CSS3 animations + transitions│
│  INTERACTIVIDAD:   JavaScript vanilla           │
└─────────────────────────────────────────────────┘
```

### Requisitos adicionales

| Librería | Razón | Instalación |
|----------|-------|-------------|
| **Mermaid.js** | Diagramas embebidos en Markdown | CDN (no requiere npm) |
| *(ninguna más)* | impress.js ya provee navegación 3D | — |

### Integración con Jekyll

```yaml
# docs/_config.yml (añadir)
mermaid:
  version: "10.6.1"
  config:
    theme: "dark"
    flowchart:
      curve: "basis"
```

---

## Estructura del Nuevo Index

### Slides propuestas (impress.js)

| Slide | ID | Contenido | Posición (x,y,z) |
|-------|-----|-----------|------------------|
| 1 | `overview` | Vista panorámica del MetaModel | (0, 0, 3000) |
| 2 | `core` | Núcleo: Agentes + Plugins + BOE | (0, 0, 0) |
| 3 | `ontology` | Capa ontológica (FVE/UFO/MMCO) | (-1500, 0, 0) |
| 4 | `dynamics` | Flujos de producción | (1500, 0, 0) |
| 5 | `hypergraph` | Hypergraph interactivo | (0, 1500, 0) |
| 6 | `products` | Productos transmedia (Teatro, Periódico) | (0, -1500, 0) |
| 7 | `cta` | Call to action (fork/contribute) | (0, 0, -1500) |

### Secciones de fallback (noscript)

Para usuarios sin JavaScript, mantener versión estática con:
- Diagrama Mermaid renderizado como SVG
- Enlaces de navegación tradicionales

---

## Gaps Identificados

| Gap | Descripción | Prioridad | Sprint |
|-----|-------------|-----------|--------|
| G1 | Mermaid.js no instalado | Must | 1 |
| G2 | Layout impress.js para index no diseñado | Must | 1 |
| G3 | Diagrama MetaModel no documentado | Must | 1 |
| G4 | Hypergraph visual no implementado | Must | 2 |
| G5 | Integración con datos dinámicos (registry.json) | Should | 2 |
| G6 | Fallback noscript no diseñado | Should | 2 |
| G7 | Tests de accesibilidad | Could | 3 |

---

## Riesgos Técnicos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| impress.js rompe en móviles | Media | Medio | CSS responsive + fallback |
| Carga lenta por JS | Baja | Medio | Lazy loading de slides |
| Confusión UX por navegación 3D | Media | Alto | Tutorial inicial + teclas visibles |
| Jekyll no procesa layouts impress | Baja | Alto | Layout dedicado `presentation.html` |

---

## Decisiones

1. **Usar impress.js** como motor de presentación (ya instalado)
2. **Añadir Mermaid.js** vía CDN para diagramas
3. **Crear layout `presentation.html`** para páginas tipo blueprint
4. **Mantener fallback estático** para accesibilidad
5. **Dividir en 2 sprints**: estructura (S1) + interactividad (S2)

---

## Dependencias con otras épicas

| Épica | Dependencia | Tipo |
|-------|-------------|------|
| FLOVE_EDITOR | Ontología FVE documentada | Blanda |
| METAMODEL_COMPLIANCE | Capas UFO definidas | Blanda |
| MMCO | Métricas de coherencia | Blanda |
| HYPERGRAPH_EDITOR | Motor de hipergrafos | Blanda |

> **Nota**: Las dependencias son **blandas** porque el index puede mostrar el blueprint aunque las épicas no estén 100% completadas. El blueprint es una proyección de la arquitectura objetivo.

---

## Definition of Done

### Sprint 1 (Estructura)
- [ ] Layout `presentation.html` creado
- [ ] Mermaid.js integrado en Jekyll
- [ ] 7 slides básicas de impress.js
- [ ] Diagrama MetaModel en Mermaid
- [ ] Navegación por teclado funcional
- [ ] Fallback noscript con contenido estático

### Sprint 2 (Interactividad)
- [ ] Hypergraph visual con nodos navegables
- [ ] Enlaces contextuales a documentación
- [ ] Datos dinámicos desde registry.json
- [ ] Animaciones de transición
- [ ] Tests de accesibilidad (WCAG 2.1 AA)
- [ ] Documentación de uso

---

## Próximos Pasos

1. **SM**: Generar backlog borrador `01_backlog-borrador.md`
2. **SM**: Aprobar y publicar en BACKLOG-SCRIPTORIUM.md
3. **Dev**: Crear layout `docs/_layouts/presentation.html`
4. **Dev**: Integrar Mermaid.js en `_config.yml`
5. **Design**: Diseñar slides del blueprint

