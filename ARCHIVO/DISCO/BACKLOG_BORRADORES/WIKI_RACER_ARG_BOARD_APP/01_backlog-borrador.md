# Backlog Borrador: SCRIPT-1.12.0 — ArgBoardApp (Máquina de Estados ARG)

**Opportunity**: Aleph Scriptorium  
**Sprint**: 2  
**Effort total**: 21 pts  
**Estado**: 📝 Borrador (pendiente aprobación)

---

## Contexto

**Problema**: Las obras del Teatro carecen de lógica de estados para transiciones narrativas.

**Solución**: ArgBoardApp usa el motor de estados de wiki-racer para controlar navegación en obras impress.js, con cada transición registrada en el BOE.

**Submódulo fuente**: `wiki-racer`  
**Dependencias**: `arg-board`, `teatro`

---

## Feature Cycles

| Ciclo | Objetivo | Effort |
|-------|----------|--------|
| FC1 | Estructura del plugin + agente | 5 pts |
| FC2 | Adaptador de estados | 8 pts |
| FC3 | Integración Teatro + BOE | 8 pts |

---

## Stories

### SCRIPT-1.12.0-S01 — Estructura del Plugin ArgBoardApp
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Crear la estructura base del plugin.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T001 | Crear `.github/plugins/arg-board-app/manifest.md` | 0.5 | ⏳ |
| T002 | Crear `agents/arg-board-app.agent.md` | 1 | ⏳ |
| T003 | Crear `instructions/arg-board-app.instructions.md` | 0.5 | ⏳ |
| T004 | Crear `ARCHIVO/PLUGINS/ARG_BOARD_APP/README.md` | 0.5 | ⏳ |
| T005 | Crear bridge `plugin_ox_argboardapp.agent.md` | 1 | ⏳ |
| T006 | Actualizar `registry.json` | 0.5 | ⏳ |
| T007 | Crear `prompts/configurar-maquina-estados.prompt.md` | 1 | ⏳ |

#### Definition of Done
- [ ] Plugin tiene manifest.md válido
- [ ] Bridge detectable por VS Code
- [ ] Aparece en registry.json

---

### SCRIPT-1.12.0-S02 — Adaptador de Estados
**Puntos**: 8  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Crear adaptador entre estados de wiki-racer y estados de obras.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T008 | Definir schema de estados para obras | 1 | ⏳ |
| T009 | Implementar mapeo Etapa → EstadoObra | 2 | ⏳ |
| T010 | Implementar mapeo Error → EventoObra | 1 | ⏳ |
| T011 | Crear `ARCHIVO/PLUGINS/ARG_BOARD_APP/estados/obra-schema.json` | 1 | ⏳ |
| T012 | Crear `prompts/transicion-estado.prompt.md` | 1 | ⏳ |
| T013 | Documentar ciclo de vida de estados | 1 | ⏳ |
| T014 | Test: transición NoIniciado → Iniciado | 1 | ⏳ |

#### Definition of Done
- [ ] Schema de estados documentado
- [ ] Mapeo bidireccional funcional
- [ ] Al menos 1 transición testeada

---

### SCRIPT-1.12.0-S03 — Integración Teatro + BOE
**Puntos**: 8  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Conectar estados con navegación impress.js y registro en BOE.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T015 | Crear handler para eventos impress.js | 2 | ⏳ |
| T016 | Implementar `goto(step)` desde transición | 1 | ⏳ |
| T017 | Registrar transiciones en BOE | 2 | ⏳ |
| T018 | Crear `prompts/iniciar-obra-con-estados.prompt.md` | 1 | ⏳ |
| T019 | Añadir campo `maquina_estados` a obras.yaml | 1 | ⏳ |
| T020 | Test: obra completa con estados | 1 | ⏳ |

#### Definition of Done
- [ ] Transiciones disparan navegación impress.js
- [ ] BOE registra cada cambio de estado
- [ ] Una obra de ejemplo funciona end-to-end

---

## Métricas

| Métrica | Valor |
|---------|-------|
| Stories totales | 3 |
| Tasks totales | 20 |
| Effort total | 21 pts |
| Prioridad Must | 3 stories (21 pts) |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| Submódulo wiki-racer | ✅ Instalado | Rama integration/beta/scriptorium |
| Plugin arg-board | ✅ Instalado | obras.json, actores.json |
| Plugin teatro | ✅ Instalado | impress.js, BOE |

---

## Pendiente aprobación

Usuario debe revisar y aprobar con `@scrum aprobar`.
