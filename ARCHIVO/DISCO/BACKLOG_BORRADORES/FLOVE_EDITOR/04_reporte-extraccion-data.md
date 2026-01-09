# Reporte de Extracción: OnthologyEditor/FloveDocs → DATA

> **Fecha**: 2026-01-09  
> **Agente**: Lucas (Scrum Master del Índice)  
> **Épica relacionada**: SCRIPT-1.20.0 (Fuente de Datos FloveOnto)

---

## 1. Herramientas Instaladas

| Herramienta | Versión | Uso |
|-------------|---------|-----|
| `poppler` | via Homebrew | PDF → TXT (`pdftotext -layout`) |
| `pandoc` | via Homebrew | ODT → Markdown |
| `unzip` | macOS native | Descomprimir ZIPs |

---

## 2. Estructura DATA Creada

```
OnthologyEditor/DATA/
├── index/
│   └── 00_INDEX.md          ◄── Índice maestro
├── pdfs/                    ◄── 6 PDFs extraídos
│   ├── FloveSlides25.12.txt (216KB)
│   ├── FloveSlides25.10.2.txt (552KB)
│   ├── FloveTables25.12.txt (55KB) ★ CRITICAL
│   ├── FloveTables25.10.txt (94KB)
│   ├── Confluentisms25.10.txt (3387 líneas)
│   └── Keys25.9.txt (42 líneas)
├── markdown/                ◄── 5 ODTs convertidos
│   ├── 01_Confluentism.md (648 líneas) ★ BASE PHILOSOPHY
│   ├── 02_Compatibilism.md
│   ├── 03_Ontologia.md
│   ├── 04_Biologia.md
│   └── 05_Intuitionism.md
├── zips_extracted/          ◄── 2 ZIPs descomprimidos
│   ├── PAPERS25.10/
│   └── Demos25.10/          ◄── ~80 HTML files
│       └── Demos/
│           ├── Fuzzy/       ★ OPERACIONES FUZZY
│           │   ├── Relate/
│           │   ├── Explain/
│           │   └── View/
│           └── PsicoSocial/
├── schemas/                 ◄── Esquemas extraídos
│   └── gradual-7-scale.yaml ★ ESCALA FUZZY 7 GRADOS
└── odts/                    ◄── Reservado para ODTs raw
```

---

## 3. Hallazgos Clave

### 3.1 Escala Gradual de 7 Niveles (CRÍTICO)

Extraído de `graduals7s.ods`:

| Level | Value | Color | Fuzzy Action |
|-------|-------|-------|--------------|
| 1 | 0.14 | Red | Browse |
| 2 | 0.29 | Orange | OnClick |
| 3 | 0.43 | Yellow | Rate |
| **4** | **0.57** | **Green** | **Relate** |
| 5 | 0.71 | Blue | Rank |
| **6** | **0.86** | **Violet** | **Explain** |
| **7** | **1.0** | **White** | **App** |

**Insight**: Las operaciones RELATE (nivel 4), EXPLAIN (nivel 6) y VIEW/App (nivel 7) son puntos específicos en la escala gradual 0.0-1.0.

### 3.2 Estructura de Demos

La carpeta `Demos25.10/Demos/Fuzzy/` contiene implementación HTML de las tres operaciones:

| Operación | Ruta | UI |
|-----------|------|-----|
| RELATE | `Fuzzy/Relate/` | SVG mindmap con nodos, badges, tooltips |
| EXPLAIN | `Fuzzy/Explain/` | Form: Perspective (Prism, Tone) + Focus |
| VIEW | `Fuzzy/View/` | Pills: APPS, ACTS, MATCHES, SIMILAR, etc |

### 3.3 Paper Base: Confluentism

De `01_Confluentism.md`:
> "Confluentism: Fuzzy Logic + Love = Flove"
> "dynamic bipolarity that fractalizes from physics to sociology"

Los 3 niveles del paradigma:
1. **Fuzzy Logic** (matemático)
2. **PsicoSocial** (sociológico)
3. **Freedom/Economy** (político)

---

## 4. Impacto en Backlog

### Tasks Actualizadas

| Task ID | Descripción | Estado Anterior | Estado Nuevo |
|---------|-------------|-----------------|--------------|
| T002 | Capturar datos fuente | ⏳ | ✅ 80% |
| T003 | Documentar campos ontología | ⏳ | 🟡 En progreso |
| NUEVO | Crear `gradual-7-scale.yaml` | — | ✅ Completado |

### Nuevas Tasks Identificadas

| Task ID | Descripción | Effort est. |
|---------|-------------|-------------|
| T_DATA_001 | Parsear FloveTables → schema YAML | 2 pts |
| T_DATA_002 | Convertir demos HTML → ejemplos YAML | 3 pts |
| T_DATA_003 | Extraer axiomas de Confluentism.md | 1 pt |

---

## 5. Próximos Pasos

1. **Inmediato**: Parsear `FloveTables25.12.txt` para crear `flove-ontology.schema.yaml`
2. **Corto plazo**: Convertir demos HTML a ejemplos YAML de RELATE/EXPLAIN/VIEW
3. **Medio plazo**: Integrar schema en FloveEditor plugin

---

**Generado por**: Lucas (interpretando a @scrum)  
**Validación**: Pendiente revisión PO
