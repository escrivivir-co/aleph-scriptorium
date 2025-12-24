# Backlog Borrador: SCRIPT-1.11.0 — Plugin PrologEditor

**Estado**: 📝 Borrador (pendiente aprobación)  
**Fecha creación**: 2025-01-04  
**Submódulo**: `iot-sbr-logica-para-bots`  
**Effort total estimado**: 34 pts

---

## Feature Cycles

| Ciclo | Objetivo | Effort |
|-------|----------|--------|
| FC1 | Estructura base + templates | 12 pts |
| FC2 | Integraciones (Blockly, AGENT_CREATOR) | 14 pts |
| FC3 | ARG_BOARD + AS-GYM | 8 pts |

---

## Story: SCRIPT-1.11.0-S01 — Estructura del Plugin
**Effort**: 3 pts  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

### Descripción
Crear la estructura base del plugin siguiendo el protocolo de PLUGINS.md.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T001 | Crear `.github/plugins/prolog-editor/manifest.md` | 0.5 | ⏳ |
| T002 | Crear `agents/prolog-editor.agent.md` | 0.5 | ⏳ |
| T003 | Crear `instructions/prolog-editor.instructions.md` | 0.5 | ⏳ |
| T004 | Crear `ARCHIVO/PLUGINS/PROLOG_EDITOR/` estructura | 0.5 | ⏳ |
| T005 | Crear `ARCHIVO/PLUGINS/PROLOG_EDITOR/templates/` | 0.5 | ⏳ |
| T006 | Crear `ARCHIVO/PLUGINS/PROLOG_EDITOR/rules/` | 0.5 | ⏳ |

### Criterios de Aceptación
- [ ] Plugin tiene manifest.md válido con frontmatter YAML
- [ ] Estructura sigue convenciones de PLUGINS.md
- [ ] Directorios de datos creados en ARCHIVO

---

## Story: SCRIPT-1.11.0-S02 — Prompts Básicos
**Effort**: 4 pts  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

### Descripción
Crear prompts para operaciones CRUD de templates y reglas Prolog.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T007 | Crear `prompts/crear-template-prolog.prompt.md` | 1 | ⏳ |
| T008 | Crear `prompts/ejecutar-consulta.prompt.md` | 0.5 | ⏳ |
| T009 | Crear `prompts/listar-templates.prompt.md` | 0.5 | ⏳ |
| T010 | Crear `prompts/importar-reglas.prompt.md` | 1 | ⏳ |
| T011 | Crear `prompts/validar-sintaxis.prompt.md` | 1 | ⏳ |

### Criterios de Aceptación
- [ ] Prompt de creación genera template válido
- [ ] Prompt de ejecución invoca motor Prolog si disponible
- [ ] Prompt de importación valida sintaxis antes de guardar

---

## Story: SCRIPT-1.11.0-S03 — Bridge Agent + Registry
**Effort**: 2 pts  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

### Descripción
Crear agente bridge y registrar plugin en el sistema.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T012 | Crear `.github/agents/plugin_ox_prologeditor.agent.md` | 0.5 | ⏳ |
| T013 | Actualizar `registry.json` | 0.5 | ⏳ |
| T014 | Actualizar `aleph.agent.md` con handoff | 0.5 | ⏳ |
| T015 | Actualizar `ox.agent.md` con índice | 0.5 | ⏳ |

### Criterios de Aceptación
- [ ] Bridge en `.github/agents/` detectable por VS Code
- [ ] Plugin en registry.json con enabled: true
- [ ] @aleph tiene handoff `[PROLOG-EDITOR]`

---

## Story: SCRIPT-1.11.0-S04 — Templates Prolog Base
**Effort**: 3 pts  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

### Descripción
Migrar y adaptar templates del submódulo para uso en Scriptorium.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T016 | Adaptar `state-machine.template` para agentes | 1 | ⏳ |
| T017 | Crear template `agent-behavior.template` | 1 | ⏳ |
| T018 | Crear template `obra-conditions.template` | 1 | ⏳ |

### Criterios de Aceptación
- [ ] Templates compatibles con estructura de ARCHIVO
- [ ] Cada template tiene .template (JSON) + .pl (código)
- [ ] Documentación de predicados exportados

---

## Story: SCRIPT-1.11.0-S05 — Exportación Blockly → Prolog
**Effort**: 5 pts  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

### Descripción
Crear prompt de transpilación de rutinas Blockly a código Prolog.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T019 | Analizar estructura de rutinas Blockly (JavaScript output) | 1 | ⏳ |
| T020 | Definir mapeo bloques → predicados Prolog | 1 | ⏳ |
| T021 | Crear `prompts/exportar-blockly-prolog.prompt.md` | 2 | ⏳ |
| T022 | Documentar limitaciones de transpilación | 1 | ⏳ |

### Criterios de Aceptación
- [ ] Rutina Blockly genera archivo .pl válido
- [ ] Predicados generados son ejecutables
- [ ] Usuario puede editar resultado manualmente

---

## Story: SCRIPT-1.11.0-S06 — Integración AGENT_CREATOR
**Effort**: 4 pts  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

### Descripción
Añadir campo opcional `prologRules` a recetas de agentes.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T023 | Definir schema de campo `prologRules` en receta | 0.5 | ⏳ |
| T024 | Actualizar prompt de creación de agente | 1 | ⏳ |
| T025 | Crear `prompts/asignar-prolog-agente.prompt.md` | 1.5 | ⏳ |
| T026 | Documentar integración en AGENT_CREATOR/README | 1 | ⏳ |

### Criterios de Aceptación
- [ ] Campo `prologRules` opcional en recetas
- [ ] Agente puede referenciar archivo .pl
- [ ] Campo ignorado si no hay motor Prolog

---

## Story: SCRIPT-1.11.0-S07 — Integración ARG_BOARD
**Effort**: 4 pts  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

### Descripción
Permitir condiciones Prolog en estadios de obras.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T027 | Definir schema de condición Prolog en estadio | 0.5 | ⏳ |
| T028 | Actualizar monomitos.json para soportar condiciones | 1 | ⏳ |
| T029 | Crear `prompts/condicion-prolog-estadio.prompt.md` | 1.5 | ⏳ |
| T030 | Documentar en ARG_BOARD/README | 1 | ⏳ |

### Criterios de Aceptación
- [ ] Estadio puede tener `conditionProlog` opcional
- [ ] Transición evaluada por predicado
- [ ] Fallback a JavaScript si Prolog no disponible

---

## Story: SCRIPT-1.11.0-S08 — Integración AS-GYM (FIA)
**Effort**: 5 pts  
**Prioridad**: Could  
**Estado**: ⏳ Pendiente

### Descripción
Mapear red semántica FIA a hechos Prolog.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T031 | Analizar estructura de red_semantica.json | 1 | ⏳ |
| T032 | Definir mapeo nodos FIA → hechos Prolog | 1 | ⏳ |
| T033 | Crear `prompts/fia-a-prolog.prompt.md` | 2 | ⏳ |
| T034 | Crear template `fia-sbr.template` | 1 | ⏳ |

### Criterios de Aceptación
- [ ] Nodos FIA generan hechos Prolog
- [ ] Aristas generan reglas de inferencia
- [ ] Consultas sobre FIA ejecutables

---

## Story: SCRIPT-1.11.0-S09 — Documentación y Setup
**Effort**: 2 pts  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

### Descripción
Documentar plugin y actualizar scripts de setup.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T035 | Crear `ARCHIVO/PLUGINS/PROLOG_EDITOR/README.md` | 0.5 | ⏳ |
| T036 | Actualizar `setup-workspace.sh` (10→11 submódulos) | 0.5 | ⏳ |
| T037 | Actualizar `scripts/README.md` | 0.5 | ⏳ |
| T038 | Documentar requisitos SWI-Prolog | 0.5 | ⏳ |

### Criterios de Aceptación
- [ ] README explica propósito y uso
- [ ] Setup script actualizado con nuevo submódulo
- [ ] Documentados requisitos de sistema

---

## Story: SCRIPT-1.11.0-S10 — Tests y Validación
**Effort**: 2 pts  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

### Descripción
Validar funcionamiento del plugin.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T039 | Test: crear template desde prompt | 0.5 | ⏳ |
| T040 | Test: exportar rutina Blockly simple | 0.5 | ⏳ |
| T041 | Test: asignar reglas a agente | 0.5 | ⏳ |
| T042 | Test: condición Prolog en estadio | 0.5 | ⏳ |

### Criterios de Aceptación
- [ ] Templates se crean correctamente
- [ ] Exportación genera código válido
- [ ] Integraciones funcionan sin errores

---

## Métricas

| Métrica | Valor |
|---------|-------|
| Stories totales | 10 |
| Tasks totales | 42 |
| Effort total | 34 pts |
| Prioridad Must | 5 stories (12 pts) |
| Prioridad Should | 3 stories (13 pts) |
| Prioridad Could | 2 stories (9 pts) |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| Submódulo iot-sbr-logica-para-bots | ✅ Instalado | Rama integration/beta/scriptorium |
| Plugin BlocklyEditor | ✅ Instalado | Para exportación |
| Plugin AGENT_CREATOR | ✅ Instalado | Para integración |
| Plugin ARG_BOARD | ✅ Instalado | Para obras |
| Submódulo AS-GYM | ✅ Instalado | Para FIA |
| SWI-Prolog (sistema) | ⚠️ Opcional | Requerido para ejecución |

---

## Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| SWI-Prolog no instalado | Alta | Alto | Modo offline (solo plantillas) |
| Transpilación Blockly compleja | Media | Medio | Subconjunto de bloques soportados |
| Sintaxis Prolog inválida | Media | Bajo | Validación pre-ejecución |
| Conflicto con otros plugins | Baja | Bajo | Campos opcionales |

---

## Pendiente aprobación

Usuario debe revisar y aprobar con `@scrum aprobar`.

