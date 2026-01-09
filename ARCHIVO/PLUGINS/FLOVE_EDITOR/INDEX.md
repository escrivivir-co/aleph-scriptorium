# Índice de Datos — FloveEditor Plugin

> **Fecha de actualización**: 2026-01-09  
> **Fuente DRY**: `OnthologyEditor/DATA/`  
> **Épica**: FLOVE-PACK-1.0.0

---

## Arquitectura DRY

```
┌─────────────────────────────────────────────────────────────────────┐
│                    FLOVE EDITOR PLUGIN                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  .github/plugins/flove-editor/        ◄── CÓDIGO (agentes, prompts) │
│  ├── agents/ (5 agentes)                                            │
│  ├── instructions/ (paradigma)                                      │
│  └── prompts/ (flujos)                                              │
│                                                                      │
│  ARCHIVO/PLUGINS/FLOVE_EDITOR/        ◄── DATOS DEL PLUGIN          │
│  ├── INDEX.md (este archivo)                                        │
│  ├── schemas/ (symlink → OnthologyEditor/DATA/schemas)              │
│  └── catalog.json (índice navegable)                                │
│                                                                      │
│  OnthologyEditor/DATA/                ◄── FUENTE DE VERDAD EXTRAÍDA │
│  ├── pdfs/ (28 archivos, 73K líneas)                                │
│  ├── markdown/ (52 archivos, 62K líneas)                            │
│  ├── schemas/ (7 schemas YAML)                                      │
│  ├── Demos/ (54 FloveApps HTML/JS)                                  │
│  └── index/00_INDEX.md                                              │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Catálogo de Capacidades

### 🔵 Nivel 1: Fuzzy Logic (Core)

| Capacidad | Schema | Tool MCP | FloveApp |
|-----------|--------|----------|----------|
| **RELATE** | `gradual-7-scale.yaml` | `flove_relate` | `Demos/Fuzzy/Relate/` |
| **EXPLAIN** | `fuzzy-operations-examples.yaml` | `flove_explain` | `Demos/Fuzzy/Explain/` |
| **VIEW** | `flove-ontology.schema.yaml` | `flove_view` | `Demos/Fuzzy/View/` |
| **GRADE** | `gradual-7-scale.yaml` | `flove_grade` | (interno) |

### 🟢 Nivel 2: PsicoSocial

| Capacidad | Schema | Tool MCP | FloveApp |
|-----------|--------|----------|----------|
| **SOULS** | `biosystems-hierarchy.schema.yaml` | `flove_souls` | `Demos/PsicoSocial/Souls/` |
| **TRUSTFUL** | `confluentism-axioms.md` | `flove_trust` | `Demos/PsicoSocial/Trustful/` |
| **HARMONY** | (pendiente) | `flove_harmony` | `Demos/PsicoSocial/Harmony/` |

### 🟡 Nivel 3: Freedom/Economy

| Capacidad | Schema | Tool MCP | FloveApp |
|-----------|--------|----------|----------|
| **FREE** | `fuzzy-philosophy.schema.yaml` | `flove_free` | `Demos/PsicoSocial/Freedom/` |
| **MAKING** | `papers-index.schema.yaml` | `flove_make` | `Demos/Economy/` |

---

## Schemas Disponibles

| Schema | Ruta | Propósito |
|--------|------|-----------|
| `gradual-7-scale.yaml` | `DATA/schemas/` | Escala 7 grados (0.14→1.0) |
| `flove-ontology.schema.yaml` | `DATA/schemas/` | Ontología completa 4 capas |
| `fuzzy-operations-examples.yaml` | `DATA/schemas/` | UI specs RELATE/EXPLAIN/VIEW |
| `confluentism-axioms.md` | `DATA/schemas/` | 9 categorías filosóficas |
| `fuzzy-philosophy.schema.yaml` | `DATA/schemas/` | Paper "Why Fuzzy" |
| `biosystems-hierarchy.schema.yaml` | `DATA/schemas/` | Físico→biológico→psicosocial |
| `papers-index.schema.yaml` | `DATA/schemas/` | Catálogo 19 papers |

---

## FloveApps Disponibles (54)

### Por Categoría

| Categoría | Apps | Ruta |
|-----------|------|------|
| **Fuzzy/Relate** | 8 | `Demos/Fuzzy/Relate/` |
| **Fuzzy/Explain** | 2 | `Demos/Fuzzy/Explain/` |
| **Fuzzy/View** | 2 | `Demos/Fuzzy/View/` |
| **PsicoSocial/Souls** | 12 | `Demos/PsicoSocial/Souls/` |
| **PsicoSocial/Trustful** | 15 | `Demos/PsicoSocial/Trustful/` |
| **Freedom/Economy** | 10 | `Demos/PsicoSocial/Freedom/Economy/` |
| **Simplex** | 3 | `Demos/Simplex/` |
| **Pages** | 2 | `Demos/Pages/` |

### Destacados para Demo

| App | Ruta | Descripción |
|-----|------|-------------|
| **RELATE Mindmap** | `Fuzzy/Relate/index.html` | SVG interactivo con badges |
| **5Loves Avatar** | `PsicoSocial/Souls/5Loves/index.html` | Selector de tipos de amor |
| **Crumbler** | `PsicoSocial/Trustful/Crumbler/index.html` | Validador de confianza |
| **Shareful** | `Freedom/Economy/Offer/Shareful/index.html` | Economía compartida |

---

## Integración con Otros Plugins

### TypedPrompting

```yaml
# Schemas a instalar en TypedPrompting
install:
  - schema: FuzzyGrade
    source: gradual-7-scale.yaml
    purpose: Validar intensidades (0.14→1.0)
  
  - schema: FuzzyTriad
    source: flove-ontology.schema.yaml#/triads
    purpose: Validar respuestas TAO/YIN/YANG
  
  - schema: FuzzyField
    source: flove-ontology.schema.yaml#/fields
    purpose: Validar dominios (12 campos)
```

### Teatro

```yaml
# Personajes que pueden interpretar Flove
personajes:
  - nombre: "Filósofo Confluente"
    brain: flove-ontology.schema.yaml
    vocabulario: confluentism-axioms.md
    nivel: "meta"
  
  - nombre: "Terapeuta Fuzzy"
    brain: gradual-7-scale.yaml
    vocabulario: fuzzy-philosophy.schema.yaml
    nivel: "psicosocial"
```

### AgentCreator

```yaml
# Templates de agentes Flove
templates:
  - id: fuzzy-reasoner
    source: Demos/Fuzzy/Relate/
    handoffs: [relate, explain, view]
  
  - id: trust-validator
    source: Demos/PsicoSocial/Trustful/
    handoffs: [validate, certify, revoke]
```

---

## Estadísticas

| Métrica | Valor |
|---------|-------|
| PDFs extraídos | 28 |
| Markdowns | 52 |
| Líneas texto | 136,072 |
| Schemas YAML | 7 |
| FloveApps | 54 |
| Cobertura | ~95% |

---

## Changelog

| Fecha | Cambio |
|-------|--------|
| 2026-01-09 | Extracción inicial + limpieza |
| 2026-01-09 | 7 schemas creados |
| 2026-01-09 | INDEX.md del plugin creado |
