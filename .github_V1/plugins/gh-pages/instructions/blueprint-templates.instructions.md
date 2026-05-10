---
name: Plantillas de Blueprints
description: Protocolo para crear presentaciones impress.js con patrones de navegación 3D reutilizables.
applyTo: "docs/blueprint*.md, docs/_layouts/presentation.html"
---

# Instrucciones: Plantillas de Blueprints

> **Plugin**: GH-Pages v1.2.0  
> **Épica origen**: SCRIPT-1.31.1  
> **Fuente de verdad**: `docs/` (Jekyll + impress.js)

---

## ¿Qué es un Blueprint?

Un **Blueprint** es una presentación interactiva 3D construida con impress.js. Permite navegar por contenido complejo usando coordenadas espaciales (X, Y, Z).

| Componente | Archivo | Función |
|------------|---------|---------|
| Layout | `docs/_layouts/presentation.html` | Estructura HTML + impress.js |
| Estilos | `docs/assets/css/blueprint.css` | Todas las clases visuales |
| JS | `docs/assets/js/impress.js` + `blueprint.js` | Motor de navegación |
| Contenido | `docs/blueprint-*.md` | Slides en Markdown+HTML |

---

## Patrones de Navegación Disponibles

### Patrón 1: CRUZ (Blueprint UX)

**Referencia DRY**: [`docs/blueprint.md`](../../../docs/blueprint.md)

```
                    (-1500, 0)
                        ↑
                        │
    (0, -1500) ← ─── (0, 0) ─── → (0, 1500)
                        │
                        ↓
                    (1500, 0)
                    
    Overview: (0, 0, 3000) con data-scale="5"
```

**Características**:
- Centro en (0, 0, 0)
- Slides distribuidos en cruz alrededor del centro
- Overview alejado en eje Z con escala grande
- Navegación intuitiva ←→↑↓

**Cuándo usar**: Taxonomías, sistemas con centro y satélites, arquitecturas.

---

### Patrón 2: COLUMNA VERTICAL (Blueprint MMCO)

**Referencia DRY**: [`docs/blueprint-mmco.md`](../../../docs/blueprint-mmco.md)

```
    (0, -2500)  ← Nivel 0c (BNP)
        ↓
    (0, -1500)  ← Nivel 0b
        ↓
    (0, -500)   ← Nivel 0a
        ↓
    (0, 500)    ← Nivel 1
        ↓
    (0, 1500)   ← Nivel 2
        ↓
    (0, 2500)   ← Nivel 3
        ↓
    (0, 3500)   ← Nivel 4
    
    Overview: (0, 500, 3000) con data-scale="6"
```

**Características**:
- Flujo vertical (arriba → abajo)
- Incrementos de 1000 en eje Y
- Ideal para jerarquías y procesos secuenciales
- Overview centrado en el flujo

**Cuándo usar**: Niveles ontológicos, procesos paso a paso, jerarquías.

---

### Patrón 3: CUBO 3D CON SUBDIAPOS (Blueprint Copilot)

**Referencia DRY**: [`docs/blueprint-copilot.md`](../../../docs/blueprint-copilot.md)

```
    Eje X: Flujo principal (→)
    ┌────────────────────────────────────────────────────────┐
    │ (0,0) → (2000,0) → (4000,0) → (6000,0) → (8000,0) ... │
    └────────────────────────────────────────────────────────┘
    
    Eje Y: Subdiapos (↓)
    ┌─────────────┐
    │ (2000, 0)   │ ← Slide principal
    │     ↓       │
    │ (2000, 700) │ ← Subdiapo detalle
    └─────────────┘
    
    Overview: (6000, 0, 3500) con data-scale="5"
```

**Características**:
- Flujo horizontal principal en eje X (incrementos de 2000)
- Subdiapos verticales en eje Y (offset de 700)
- Indicador visual "↓ Ver detalle" en slides principales
- Navegación ←→ para flujo, ↑↓ para profundidad

**Cuándo usar**: Tutoriales técnicos, flujos con detalle opcional, documentación multinivel.

---

## Anatomía de un Slide

### Frontmatter Obligatorio

```yaml
---
layout: presentation
title: Título de la Presentación
description: Descripción para SEO
permalink: /mi-blueprint/
---
```

### Estructura de Slide

```html
<!-- SLIDE N: NOMBRE (Tipo) -->
<div id="identificador" class="step [clases-opcionales]" 
     data-x="X"
     data-y="Y"
     data-z="Z"
     data-scale="1"
     data-rotate="0"
     data-rotate-y="0">
  
  <!-- Contenido del slide -->
  
</div>
```

### Atributos data-*

| Atributo | Descripción | Valores típicos |
|----------|-------------|-----------------|
| `data-x` | Posición horizontal | ±N*1500 o ±N*2000 |
| `data-y` | Posición vertical | ±N*1000 o ±N*700 |
| `data-z` | Profundidad | 0 (normal), 3000+ (overview) |
| `data-scale` | Zoom | 1 (normal), 5+ (panorámica) |
| `data-rotate` | Rotación Z (grados) | 0, 90, 180 |
| `data-rotate-y` | Rotación Y (3D) | ±15, ±30 |

---

## Clases CSS Disponibles

### Clases Base (todos los blueprints)

| Clase | Uso |
|-------|-----|
| `.step` | Obligatoria para todo slide |
| `.active` | Aplicada automáticamente por impress.js |

### Clases por Dominio

#### Blueprint UX (`blueprint.md`)

```css
.core-grid          /* Grid de 3 columnas */
.core-card          /* Tarjeta de métricas */
.taxonomy-tree      /* Árbol de taxonomía */
.products-grid      /* Grid de productos */
.plugins-showcase   /* Galería de plugins */
```

#### Blueprint MMCO (`blueprint-mmco.md`)

```css
.mmco-header        /* Header con nivel y nombre */
.mmco-level         /* Badge del nivel (0c, 0b, etc.) */
.bnp-field          /* Campo de esferas BNP */
.tensors-grid       /* Grid de tensores */
.correlations-grid  /* Diagrama de correlaciones */
.mmco-audit-banner  /* Banner de auditoría Φ */
```

#### Blueprint Copilot (`blueprint-copilot.md`)

```css
.copilot-step       /* Slide con estilo Copilot */
.copilot-header     /* Header con fase y título */
.copilot-phase      /* Badge de fase */
.user-prompt-box    /* Caja de prompt de usuario */
.code-context       /* Bloque de código con tab */
.mock-data-panel    /* Panel de datos mock */
.journey-preview    /* Barra de progreso del viaje */
.model-comparison   /* Comparación de modelos lado a lado */
.assembly-diagram   /* Diagrama de ensamblaje */
.llm-visualization  /* Visualización del LLM */
.output-box         /* Caja de respuesta */
.depth-hint         /* Indicador "↓ hay subdiapo" */
```

---

## Cómo Crear un Nuevo Blueprint

### Paso 1: Elegir Patrón

| Pregunta | Patrón |
|----------|--------|
| ¿Tengo un centro y satélites? | CRUZ |
| ¿Es una jerarquía o proceso lineal? | COLUMNA VERTICAL |
| ¿Necesito profundidad/detalle opcional? | CUBO 3D |

### Paso 2: Copiar Estructura Base

```bash
# Usar el blueprint más cercano como referencia
cp docs/blueprint-copilot.md docs/blueprint-nuevo.md
```

### Paso 3: Ajustar Coordenadas

1. Definir slide central/inicial
2. Calcular coordenadas según patrón elegido
3. Añadir overview con `data-z` alto y `data-scale` grande

### Paso 4: Aplicar Estilos

1. Reusar clases existentes de `blueprint.css`
2. Si necesitas nuevas, añadir sección al final del CSS
3. Seguir convención: `.[dominio]-[elemento]`

### Paso 5: Validar

```bash
./scripts/validate-site.sh   # Compilación
./scripts/serve-site.sh      # Preview local
```

---

## Checklist de Validación

- [ ] Frontmatter con `layout: presentation`
- [ ] Permalink único (`/mi-blueprint/`)
- [ ] Todos los slides tienen `id` único
- [ ] Overview slide con `data-z` alto
- [ ] Navegación lógica (probada con flechas)
- [ ] Responsive (probado en móvil)
- [ ] Enlaces toggle a otras vistas blueprint
- [ ] Jekyll compila sin errores

---

## Referencia Rápida de Coordenadas

### Patrón CUBO (recomendado para nuevos)

```
# Slide principal N (flujo horizontal)
data-x = N * 2000
data-y = 0
data-z = 0

# Subdiapo de slide N
data-x = N * 2000
data-y = 700
data-z = 0

# Overview
data-x = (slides/2) * 2000
data-y = 0
data-z = 3500
data-scale = 5
```

### Ejemplo Rápido (3 slides + 1 subdiapo)

```html
<!-- Slide 0: Intro -->
<div id="intro" class="step" data-x="0" data-y="0" data-z="0">
  ...
</div>

<!-- Slide 1: Principal -->
<div id="main" class="step" data-x="2000" data-y="0" data-z="0">
  ...
  <div class="depth-hint">↓ Ver detalle</div>
</div>

<!-- Slide 1.1: Subdiapo -->
<div id="main-detail" class="step" data-x="2000" data-y="700" data-z="0">
  ...
</div>

<!-- Slide 2: Cierre -->
<div id="end" class="step" data-x="4000" data-y="0" data-z="0">
  ...
</div>

<!-- Overview -->
<div id="overview" class="step" data-x="2000" data-y="0" data-z="3000" data-scale="4">
  ...
</div>
```

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-29 | Crear protocolo de plantillas (SCRIPT-1.31.1) | @plugin_ox_ghpages |
