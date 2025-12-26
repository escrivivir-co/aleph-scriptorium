# Backlog Borrador: SCRIPT-1.23.0 — Integración MMCO (OCMF)

**Estado**: ✅ Aprobado (listo para publicar)  
**Plugin**: flove-editor  
**Submódulo**: OnthologyEditor/MMCO  
**Bridge**: plugin_ox_floveeditor  
**Fecha**: 2025-12-26

---

## Resumen Ejecutivo

Integración del submódulo MMCO (Meta-Model of Coherent Ontology) como tercer pilar del plugin flove-editor:

| Pilar | Épica | Estado |
|-------|-------|--------|
| FloveDocs | SCRIPT-1.20.0 | ✅ Completada |
| Metamodel | SCRIPT-1.21.0 | 🔄 En progreso |
| **MMCO** | **SCRIPT-1.23.0** | 📝 Este backlog |

---

## Feature Cycles

| Ciclo | Objetivo | Effort | Prioridad |
|-------|----------|--------|-----------|
| **FC0** | Arranque y documentación de sesión | 2 pts | Must |
| **FC1** | Discovery + Adapter OCMF | 8 pts | Must |
| **FC2** | Validación UFO + Métrica phi_mmco | 8 pts | Must |
| **FC3** | Reportes, prompts y publicación | 6 pts | Must |

**Effort total**: 24 pts

---

## Feature Cycle 0: Arranque y Documentación

> **Objetivo**: Documentar la sesión PO-SM y dejar constancia de archivos creados.

### SCRIPT-1.23.0-S00: Sesión de Planificación
**Effort**: 2 pts  
**Prioridad**: Must  
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T000 | Crear conversación PO-SM con inventario técnico | ✅ |
| T001 | Enriquecer sesión con agentes expertos (FloveOx, Metamodel, MMCO, FloveEditor) | ✅ |
| T002 | Documentar mapeos Flove↔UFO↔MMCO en conversación | ✅ |
| T003 | Crear backlog borrador con 5 stories | ✅ |
| T004 | Añadir épica al BACKLOG-SCRIPTORIUM.md | ⏳ |

**Archivos creados en esta sesión**:
- `ARCHIVO/DISCO/BACKLOG_BORRADORES/MMCO/conversacion-po-sm.md` ✅
- `ARCHIVO/DISCO/BACKLOG_BORRADORES/MMCO/01_backlog-borrador.md` ✅

**Definition of Done**:
- [x] Conversación documenta inventario y decisiones
- [x] Sesión con agentes expertos completada
- [x] Backlog con 5 stories y 16+ tasks
- [ ] Épica publicada en backlog principal

---

## Feature Cycle 1: Discovery + Adapter

### SCRIPT-1.23.0-S01: Inventario y Adapter OCMF
**Effort**: 4 pts  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T005 | Documentar toy models: categorical, coherence_metric, geometric_algebra, quantum_biology, quantum_circuits, topological | ⏳ |
| T006 | Documentar XMLs de ontología: coherence.xml, matter_as_concept.xml, meta_dynamics.xml, ontological_field.xml | ⏳ |
| T007 | Diseñar schema `ocmf-adapter.json` (estructura intermedia) | ⏳ |
| T008 | Especificar conversión mínima `flove-schema.json` → `ocmf-adapter.json` | ⏳ |
| T009 | Crear carpeta `ARCHIVO/PLUGINS/FLOVE_EDITOR/MMCO/` con README | ⏳ |

**Definition of Done**:
- [ ] Catálogo de toy models con descripción y runtime
- [ ] XMLs mapeados a conceptos Flove
- [ ] Schema adapter.json documentado
- [ ] Carpeta MMCO creada en ARCHIVO

---

## Feature Cycle 2: Validación UFO + Métrica

### SCRIPT-1.23.0-S02: Validación UFO (Prerequisito)
**Effort**: 4 pts  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T010 | Aplicar plantilla ENTITY a campos Flove (10 fields) | ⏳ |
| T011 | Aplicar plantilla RELATIONSHIP a relaciones Flove (RELATE/VIEW/EXPLAIN) | ⏳ |
| T012 | Aplicar plantilla PROCESS a dinámicas Flove (FREE/MAKING) | ⏳ |
| T013 | Añadir metadatos FAIR mínimos al adapter | ⏳ |
| T014 | Registrar gaps de mapeo Flove↔UFO en documento separado | ⏳ |

**Definition of Done**:
- [ ] 3 plantillas UFO aplicadas
- [ ] Metadatos FAIR incluidos
- [ ] Gaps documentados

### SCRIPT-1.23.0-S03: Métrica phi_mmco
**Effort**: 4 pts  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T015 | Documentar dependencias de `coherence_metric/phi_mmco.py` (NumPy) | ⏳ |
| T016 | Definir extracción de inputs desde `ocmf-adapter.json` (state_vector, adjacency) | ⏳ |
| T017 | Crear script wrapper `run_phi_mmco.sh` para ejecución segura | ⏳ |
| T018 | Generar `mmco_score.json` con resultado y timestamp | ⏳ |
| T019 | Definir umbrales de coherencia (0-0.3 bajo, 0.3-0.7 medio, 0.7-1.0 alto) | ⏳ |

**Definition of Done**:
- [ ] Script ejecutable sin errores
- [ ] Score JSON generado
- [ ] Umbrales documentados

---

## Feature Cycle 3: Reportes y Publicación

### SCRIPT-1.23.0-S04: Reportes y Prompts
**Effort**: 3 pts  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T020 | Crear template `mmco_report.md` (niveles, score, recomendaciones) | ⏳ |
| T021 | Crear prompt `validar-ufo-ocmf.prompt.md` (pipeline completo) | ⏳ |
| T022 | Crear prompt `generar-adapter-ocmf.prompt.md` (solo conversión) | ⏳ |
| T023 | Crear prompt `ejecutar-phi-mmco.prompt.md` (solo métrica) | ⏳ |
| T024 | Documentar flujo en `flove-editor.instructions.md` | ⏳ |

**Definition of Done**:
- [ ] Template de reporte funcional
- [ ] 3 prompts creados
- [ ] Instrucciones actualizadas

### SCRIPT-1.23.0-S05: Integración y Publicación
**Effort**: 3 pts  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T025 | Añadir 3 handoffs nuevos a `plugin_ox_floveeditor.agent.md` | ⏳ |
| T026 | Añadir handoff "Analizar coherencia MMCO" a `mmco.agent.md` | ⏳ |
| T027 | Actualizar `ARCHIVO/PLUGINS/FLOVE_EDITOR/README.md` con sección MMCO | ⏳ |
| T028 | Publicar épica SCRIPT-1.23.0 en BACKLOG-SCRIPTORIUM.md | ⏳ |
| T029 | Commit según protocolo DevOps | ⏳ |

**Definition of Done**:
- [ ] Handoffs integrados
- [ ] README actualizado
- [ ] Épica publicada
- [ ] Commit realizado

---

## Métricas SCRIPT-1.23.0

| Métrica | Valor |
|---------|-------|
| Stories totales | 6 (S00-S05) |
| Tasks totales | 30 (T000-T029) |
| Puntos totales | 24 |
| Prioridad Must | 6 stories (24 pts) |
| Completadas | **1** (S00: 4/5 tasks) |
| % Avance | **17%** (5/30 tasks) |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| OnthologyEditor/MMCO | ✅ Instalado | Submódulo nested |
| Plugin flove-editor | ✅ Operativo | v1.0.0 |
| Agentes MMCO | ✅ Creados | FloveOx, Metamodel, MMCO, FloveDocs |
| SCRIPT-1.21.0 (Metamodel) | 🔄 En progreso | Pre-requisito para UFO |
| Python (NumPy) | ⚠️ Externo | Para phi_mmco.py |

---

## Riesgos Identificados

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Dependencias Python (NumPy) | Media | Medio | Modo offline sin métrica + README requisitos |
| Complejidad adapter | Media | Bajo | Empezar con subset de XMLs |
| Gaps Flove↔UFO | Baja | Medio | Documentar en cada FC |
| Licencia AGPL (toy models) | Baja | Alto | Mantener AGPL si redistribuye |

---

## Archivos a Crear/Modificar

### Nuevos (FC1-FC3)

| Archivo | Propósito |
|---------|-----------|
| `ARCHIVO/PLUGINS/FLOVE_EDITOR/MMCO/README.md` | Documentación de resultados |
| `.github/plugins/flove-editor/prompts/validar-ufo-ocmf.prompt.md` | Pipeline completo |
| `.github/plugins/flove-editor/prompts/generar-adapter-ocmf.prompt.md` | Solo adapter |
| `.github/plugins/flove-editor/prompts/ejecutar-phi-mmco.prompt.md` | Solo métrica |
| `scripts/run_phi_mmco.sh` | Wrapper ejecución segura |

### Modificados

| Archivo | Cambio |
|---------|--------|
| `.github/plugins/flove-editor/agents/plugin_ox_floveeditor.agent.md` | +3 handoffs |
| `.github/plugins/flove-editor/agents/mmco.agent.md` | +1 handoff |
| `.github/plugins/flove-editor/instructions/flove-editor.instructions.md` | Sección MMCO |
| `ARCHIVO/PLUGINS/FLOVE_EDITOR/README.md` | Sección coherencia |
| `.github/BACKLOG-SCRIPTORIUM.md` | Épica SCRIPT-1.23.0 |

---

## Contexto y Referencias

| Documento | Ubicación |
|-----------|-----------|
| Conversación PO-SM | `ARCHIVO/DISCO/BACKLOG_BORRADORES/MMCO/conversacion-po-sm.md` |
| Submódulo MMCO | `OnthologyEditor/MMCO/` |
| Agente MMCO | `.github/plugins/flove-editor/agents/mmco.agent.md` |
| Agente FloveOx | `.github/plugins/flove-editor/agents/flove-ox.agent.md` |
| Bridge principal | `.github/agents/plugin_ox_floveeditor.agent.md` |
| Épica Metamodel | `ARCHIVO/DISCO/BACKLOG_BORRADORES/METAMODEL_COMPLIANCE/` |
| Épica FloveEditor | SCRIPT-1.20.0 en BACKLOG-SCRIPTORIUM.md |

---

## Aprobación

**Estado**: ✅ Aprobado por PO en sesión del 2025-12-26

**Siguiente paso**: Publicar épica en BACKLOG-SCRIPTORIUM.md

---

## Commit propuesto (post-publicación)

```
feat(script/plugins): añadir épica SCRIPT-1.23.0 — Integración MMCO (OCMF)

- Crear conversación PO-SM con inventario técnico y sesión de agentes
- Definir 6 stories (S00-S05) con 30 tasks
- Diseñar pipeline UFO→OCMF Adapter→phi_mmco
- Documentar archivos a crear/modificar

refs #SCRIPT-1.23.0-S00
```
