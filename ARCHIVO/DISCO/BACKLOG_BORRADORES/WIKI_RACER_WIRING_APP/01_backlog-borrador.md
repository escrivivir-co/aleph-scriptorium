# Backlog Borrador: SCRIPT-1.11.0 — WiringApp (Wiki-Racer Flows)

**Opportunity**: Aleph Scriptorium  
**Sprint**: 2  
**Effort total**: 15 pts  
**Estado**: 📝 Borrador (pendiente aprobación)

---

## Contexto

**Problema**: El plugin WireEditor existe pero carece de ejemplos de aplicaciones complejas.

**Solución**: WiringApp usa wiki-racer como ejemplo de app Node-RED completa, con flujo de juego, UI dashboard y nodos personalizados.

**Submódulo fuente**: `wiki-racer`  
**Dependencias**: `wire-editor`

---

## Feature Cycles

| Ciclo | Objetivo | Effort |
|-------|----------|--------|
| FC1 | Estructura del plugin + agente | 5 pts |
| FC2 | Templates y documentación | 5 pts |
| FC3 | Integración con WireEditor | 5 pts |

---

## Stories

### SCRIPT-1.11.0-S01 — Estructura del Plugin WiringApp
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Crear la estructura base del plugin siguiendo el protocolo de PLUGINS.md.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T001 | Crear `.github/plugins/wiring-app/manifest.md` | 0.5 | ⏳ |
| T002 | Crear `agents/wiring-app.agent.md` | 1 | ⏳ |
| T003 | Crear `instructions/wiring-app.instructions.md` | 0.5 | ⏳ |
| T004 | Crear `ARCHIVO/PLUGINS/WIRING_APP/README.md` | 0.5 | ⏳ |
| T005 | Crear bridge `plugin_ox_wiringapp.agent.md` | 1 | ⏳ |
| T006 | Actualizar `registry.json` | 0.5 | ⏳ |
| T007 | Crear `prompts/crear-flow-juego.prompt.md` | 1 | ⏳ |

#### Definition of Done
- [ ] Plugin tiene manifest.md válido
- [ ] Bridge en `.github/agents/` es detectable por VS Code
- [ ] Aparece en registry.json con enabled: true

---

### SCRIPT-1.11.0-S02 — Templates de Flows
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Adaptar el flow.json de wiki-racer como template reutilizable.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T008 | Analizar estructura de flow.json (1680 líneas) | 1 | ⏳ |
| T009 | Crear `ARCHIVO/PLUGINS/WIRING_APP/templates/wiki-racer.json` | 1 | ⏳ |
| T010 | Documentar nodos usados en el template | 1 | ⏳ |
| T011 | Crear `prompts/importar-template.prompt.md` | 1 | ⏳ |
| T012 | Añadir template a catálogo de WireEditor | 1 | ⏳ |

#### Definition of Done
- [ ] Template cargable en WireEditor
- [ ] Documentación de nodos completa
- [ ] Prompt de importación funcional

---

### SCRIPT-1.11.0-S03 — Integración WireEditor
**Puntos**: 5  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

#### Descripción
Integrar WiringApp con el ecosistema de WireEditor.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T013 | Añadir handoff WireEditor → WiringApp | 1 | ⏳ |
| T014 | Crear `prompts/exportar-a-node-red.prompt.md` | 1 | ⏳ |
| T015 | Documentar diferencias flow.json vs WireEditor | 1 | ⏳ |
| T016 | Test: cargar wiki-racer.json en WireEditor | 1 | ⏳ |
| T017 | Actualizar docs/leeme.md con WiringApp | 1 | ⏳ |

#### Definition of Done
- [ ] Handoff bidireccional WireEditor ↔ WiringApp
- [ ] Template wiki-racer funciona en WireEditor
- [ ] Documentación actualizada

---

## Métricas

| Métrica | Valor |
|---------|-------|
| Stories totales | 3 |
| Tasks totales | 17 |
| Effort total | 15 pts |
| Prioridad Must | 2 stories (10 pts) |
| Prioridad Should | 1 story (5 pts) |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| Submódulo wiki-racer | ✅ Instalado | Rama integration/beta/scriptorium |
| Plugin wire-editor | ✅ Instalado | Versión 1.0.0 |
| Plugin typed-prompting | ✅ Instalado | Opcional para validación |

---

## Pendiente aprobación

Usuario debe revisar y aprobar con `@scrum aprobar`.
