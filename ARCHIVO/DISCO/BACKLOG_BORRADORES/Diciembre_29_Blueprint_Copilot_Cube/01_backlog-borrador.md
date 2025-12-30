# Backlog: Blueprint Copilot 3D Cube

> **Épica**: SCRIPT-1.31.1  
> **Padre**: SCRIPT-1.31.0 (CopilotEngine Analysis)  
> **Effort total**: 13 pts  
> **Estado**: ✅ Completado (2025-12-29)

---

## Resumen Ejecutivo

Extender `blueprint-copilot.md` con:
1. **Estilos CSS** para clases `copilot-*` (actualmente sin estilo)
2. **Navegación 3D** en cubo (subdiapos en ejes Y/Z)
3. **Simplificación** de diapos principales moviendo contenido a subdiapos

---

## Stories

| ID | Nombre | Effort | Estado |
|----|--------|--------|--------|
| S01 | CSS Look and Feel | 5 pts | ✅ |
| S02 | Estructura Cubo 3D | 5 pts | ✅ |
| S03 | Validación y Pulido | 3 pts | ✅ |

---

## Tasks

### S01: CSS Look and Feel

**Objetivo**: Crear estilos profesionales para todas las clases `copilot-*`

| Task | Descripción | Effort | Estado |
|------|-------------|--------|--------|
| T001 | Auditar clases CSS sin estilo en `blueprint-copilot.md` | 1 | ✅ |
| T002 | Crear sección `/* Copilot Blueprint Styles */` en `blueprint.css` | 1 | ✅ |
| T003 | Estilos para `.copilot-step`, `.copilot-header`, `.copilot-phase`, `.copilot-title` | 1 | ✅ |
| T004 | Estilos para `.user-prompt-box`, `.code-context`, `.code-block` | 1 | ✅ |
| T005 | Estilos para `.journey-preview`, `.mock-data-panel`, `.model-comparison` | 1 | ✅ |

**Archivos afectados**:
- `docs/assets/css/blueprint.css`

**Validación**:
```bash
./scripts/validate-site.sh
./scripts/serve-site.sh  # Inspeccionar visualmente
```

---

### S02: Estructura Cubo 3D

**Objetivo**: Reorganizar slides para navegación en ejes X/Y/Z

| Task | Descripción | Effort | Estado |
|------|-------------|--------|--------|
| T006 | Diseñar sistema de coordenadas 3D (eje X=flujo, Y/Z=profundidad) | 1 | ✅ |
| T007 | Crear subdiapo para #registry (detalle matching algorithm) | 1 | ✅ |
| T008 | Crear subdiapo para #instructions (breakdown de Tags) | 1 | ✅ |
| T009 | Crear subdiapo para #assembly (token breakdown) | 1 | ✅ |
| T010 | Añadir indicadores visuales de "hay subdiapo" | 1 | ✅ |

**Convención de coordenadas**:
```
Slide principal: data-x="N*1500", data-y="0", data-z="0"
Subdiapo abajo:  data-x="N*1500", data-y="500", data-z="0"
Subdiapo prof:   data-x="N*1500", data-y="0", data-z="-500"
```

**Archivos afectados**:
- `docs/blueprint-copilot.md`

---

### S03: Validación y Pulido

**Objetivo**: Verificar funcionamiento completo y ajustar detalles

| Task | Descripción | Effort | Estado |
|------|-------------|--------|--------|
| T011 | Validar compilación Jekyll (`validate-site.sh`) | 0.5 | ✅ |
| T012 | Probar navegación en servidor local (`serve-site.sh`) | 0.5 | ✅ |
| T013 | Ajustar responsive para pantallas pequeñas | 1 | ✅ |
| T014 | Documentar sistema de navegación en slide de overview | 0.5 | ✅ |
| T015 | Actualizar `nav-hint` para indicar flechas verticales | 0.5 | ✅ |

**Archivos afectados**:
- `docs/blueprint-copilot.md`
- `docs/assets/css/blueprint.css`

---

## Criterios de Aceptación

### DoD Story S01
- [ ] Todas las clases `copilot-*` tienen estilos definidos
- [ ] Visual coherente con el resto de blueprint.css (variables, colores)
- [ ] `validate-site.sh` pasa sin errores

### DoD Story S02
- [ ] Mínimo 3 subdiapos funcionales
- [ ] Navegación ↑↓ funciona entre principal y subdiapos
- [ ] Diapos principales simplificadas (contenido movido a subdiapos)

### DoD Story S03
- [ ] Servidor local carga en <3s
- [ ] Funciona en desktop y tablet (responsive)
- [ ] Navegación documentada en overview

---

## Dependencias

| Dependencia | Tipo | Estado |
|-------------|------|--------|
| SCRIPT-1.31.0 completado | Épica padre | ✅ |
| Jekyll instalado | Infra | ✅ |
| Impress.js cargado | JS | ✅ |

---

## Notas Técnicas

### Clases CSS detectadas sin estilo

```
.copilot-step
.copilot-header
.copilot-phase
.copilot-title
.copilot-explanation
.user-prompt-box
.prompt-avatar
.prompt-content
.prompt-label
.prompt-text
.code-context
.file-tab
.code-block
.highlight-model
.highlight-match
.method-highlight
.highlight-null
.mock-data-panel
.mock-label
.mock-flow
.mock-input
.mock-key
.mock-value
.mock-arrow
.mock-output
.mock-system-message
.msg-section
.interface-cards
.interface-card
.card-icon
.card-name
.card-desc
.model-comparison
.model-card
.model-icon
.model-name
.model-features
.tag-structure
.tag-card
.tag-name
.tag-children
.tag-leaf
.scriptorium-note
.note-icon
.note-text
.assembly-diagram
.assembly-row
.assembly-block
.assembly-plus
.assembly-arrow
.assembly-result
.block-label
.block-content
.block-tokens
.result-label
.result-tokens
.llm-request
.request-box
.request-header
.request-icon
.request-title
.request-body
.request-field
.field-key
.field-value
.llm-visualization
.llm-box
.llm-icon
.llm-name
.llm-processing
.processing-dot
.output-box
.output-header
.output-icon
.output-title
.output-content
.output-tool-call
.tool-icon
.tool-name
.tool-args
.output-analysis
.analysis-card
.analysis-icon
.analysis-title
.journey-preview
.journey-node
.journey-arrow
.journey-complete
.journey-step
.step-num
.step-name
.key-insights
.copilot-overview-card
.copilot-footer
.highlight-user
.nav-hint (ya existe parcialmente)
```

**Total**: ~80 clases sin estilo → Agrupar por categoría semántica

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-29 | ✅ Completar todas las tasks (S01-S03) | @aleph |
| 2025-12-29 | Crear backlog borrador | @scrum |
