# Backlog Borrador: SCRIPT-1.13.0 — Plugin Novelist

**Opportunity**: Aleph Scriptorium  
**Sprint**: 2 (Feature Cycle 1)  
**Effort total**: 38 pts  
**Estado**: 📝 Borrador (pendiente aprobación)

---

## Contexto

**mcp-novelist** es un servidor MCP que provee herramientas (25+) para gestionar estructuras narrativas: novelas, capítulos, escenas, personajes. El plugin **novelist** integra estas capacidades con el TALLER de ARG_BOARD, AGENT_CREATOR y Teatro.

### Caso de Uso Principal

> Un usuario abre su Scriptorium y le pide a @aleph usar Novelist para editar una obra del TALLER. Los personajes los vuelca a AGENT_CREATOR, los trabaja con Teatro y acaba usando su novela como trama para la obra.

### Submódulo

- **Repositorio**: `mcp-novelist`
- **Rama**: `integration/beta/scriptorium`
- **Tecnología**: TypeScript, MCP SDK, Express
- **Puerto**: 3066 (HTTP streamable)

---

## Feature Cycles / Iteraciones

### Iteración 1: Core (Semanas 1-2)
**Effort**: 15 pts  
**Objetivo**: Estructura del plugin, modo ligero, conexión básica MCP

### Iteración 2: Bidireccionalidad (Semanas 3-4)
**Effort**: 13 pts  
**Objetivo**: Exportar/Importar entre Novelist y TALLER

### Iteración 3: Integración Avanzada (Semanas 5-6)
**Effort**: 10 pts  
**Objetivo**: Sincronización con AGENT_CREATOR y Teatro

---

## Stories

### SCRIPT-1.13.0-S01 — Estructura del Plugin
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Crear la estructura base del plugin novelist siguiendo el protocolo de PLUGINS.md.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T001 | Crear `.github/plugins/novelist/manifest.md` con metadatos | 0.5 | ⏳ |
| T002 | Crear `agents/novelist.agent.md` (agente principal) | 0.5 | ⏳ |
| T003 | Crear `instructions/novelist.instructions.md` | 0.5 | ⏳ |
| T004 | Crear `ARCHIVO/PLUGINS/NOVELIST/README.md` | 0.5 | ⏳ |
| T005 | Crear bridge `plugin_ox_novelist.agent.md` en .github/agents/ | 0.5 | ⏳ |
| T006 | Actualizar `registry.json` con plugin novelist | 0.5 | ⏳ |

#### Definition of Done
- [ ] Plugin tiene estructura válida según PLUGINS.md
- [ ] Bridge detectable por VS Code (`@plugin_ox_novelist`)
- [ ] Registry actualizado con enabled: true

---

### SCRIPT-1.13.0-S02 — Modo Ligero (Sin MCP)
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Implementar prompts que funcionan sin servidor MCP, trabajando solo con archivos del TALLER.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T007 | Crear `prompts/novelist-crear-obra.prompt.md` | 1 | ⏳ |
| T008 | Crear `prompts/novelist-crear-personaje.prompt.md` | 1 | ⏳ |
| T009 | Crear `prompts/novelist-crear-escena.prompt.md` | 1 | ⏳ |
| T010 | Crear `prompts/novelist-listar.prompt.md` | 0.5 | ⏳ |
| T011 | Documentar modo ligero en README | 0.5 | ⏳ |
| T012 | Test: crear obra desde cero en modo ligero | 1 | ⏳ |

#### Definition of Done
- [ ] Prompts funcionan sin servidor MCP corriendo
- [ ] Generan archivos válidos en TALLER
- [ ] Documentación clara de modo ligero

---

### SCRIPT-1.13.0-S03 — Conexión MCP
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Configurar conexión con servidor mcp-novelist cuando está disponible.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T013 | Documentar requisitos: npm start en mcp-novelist | 0.5 | ⏳ |
| T014 | Crear `.vscode/mcp.json` template para Novelist | 0.5 | ⏳ |
| T015 | Añadir detección de disponibilidad del servidor | 1 | ⏳ |
| T016 | Implementar fallback: MCP disponible → usar tools, no → modo ligero | 1 | ⏳ |
| T017 | Mapear herramientas MCP a handoffs del agente | 1 | ⏳ |
| T018 | Test: verificar conexión MCP desde VS Code | 1 | ⏳ |

#### Definition of Done
- [ ] Plugin detecta si servidor está corriendo
- [ ] Usa MCP tools cuando disponible
- [ ] Fallback transparente a modo ligero

---

### SCRIPT-1.13.0-S04 — Exportar Obra (Novelist → TALLER)
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Exportar una novela de mcp-novelist a formato TALLER del Scriptorium.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T019 | Crear `prompts/novelist-exportar-obra.prompt.md` | 1 | ⏳ |
| T020 | Implementar transformación novel → obra.yaml | 1 | ⏳ |
| T021 | Implementar transformación chapters → estadios | 0.5 | ⏳ |
| T022 | Implementar transformación scenes → escenas/*.md | 1 | ⏳ |
| T023 | Implementar transformación characters → personajes/*.yaml | 0.5 | ⏳ |
| T024 | Test: exportar novela de ejemplo a TALLER | 1 | ⏳ |

#### Definition of Done
- [ ] Novela de Novelist se convierte en estructura TALLER
- [ ] obra.yaml válida para Teatro
- [ ] Escenas como archivos .md
- [ ] Personajes como archivos .yaml

---

### SCRIPT-1.13.0-S05 — Importar Obra (TALLER → Novelist)
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Importar una obra del TALLER a mcp-novelist para edición.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T025 | Crear `prompts/novelist-importar-obra.prompt.md` | 1 | ⏳ |
| T026 | Implementar transformación obra.yaml → novel | 1 | ⏳ |
| T027 | Implementar transformación estadios → chapters | 0.5 | ⏳ |
| T028 | Implementar transformación escenas/*.md → scenes | 1 | ⏳ |
| T029 | Implementar transformación personajes/*.yaml → characters | 0.5 | ⏳ |
| T030 | Test: importar "El Camino del Tarotista" a Novelist | 1 | ⏳ |

#### Definition of Done
- [ ] Obra del TALLER se importa a Novelist
- [ ] Llamadas MCP tools funcionan
- [ ] Usuario puede editar con chatmodes de Novelist

---

### SCRIPT-1.13.0-S06 — Sincronización con AGENT_CREATOR
**Puntos**: 5  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

#### Descripción
Sincronizar personajes de Novelist con recipes de AGENT_CREATOR.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T031 | Implementar character → recipe.json | 1 | ⏳ |
| T032 | Implementar character → {personaje}.agent.md | 1 | ⏳ |
| T033 | Implementar recipe.json → character (inverso) | 1 | ⏳ |
| T034 | Añadir campo `novelist_character_id` a recipes | 0.5 | ⏳ |
| T035 | Documentar flujo de sincronización | 0.5 | ⏳ |
| T036 | Test: sincronizar Tarotista entre Novelist y AGENT_CREATOR | 1 | ⏳ |

#### Definition of Done
- [ ] Personajes de Novelist se convierten en agentes
- [ ] Agentes de AGENT_CREATOR se importan a Novelist
- [ ] Referencia cruzada mantenida

---

### SCRIPT-1.13.0-S07 — Integración con Teatro
**Puntos**: 5  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

#### Descripción
Conectar flujo completo Novelist → TALLER → Teatro.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T037 | Añadir campo `novelist_id` a obra.yaml | 0.5 | ⏳ |
| T038 | Crear `prompts/novelist-publicar-teatro.prompt.md` | 1 | ⏳ |
| T039 | Implementar flujo: exportar → registrar en ARG_BOARD → publicar | 1.5 | ⏳ |
| T040 | Actualizar actores.json desde characters exportados | 0.5 | ⏳ |
| T041 | Actualizar obras.json desde novel exportada | 0.5 | ⏳ |
| T042 | Test: publicar obra desde Novelist en Teatro | 1 | ⏳ |

#### Definition of Done
- [ ] Flujo completo Novelist → Teatro funciona
- [ ] Obra visible en cartelera
- [ ] Personajes registrados en actores.json

---

### SCRIPT-1.13.0-S08 — Documentación y Tests
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Documentar el plugin y validar funcionamiento.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T043 | Crear docs/README.md con arquitectura | 0.5 | ⏳ |
| T044 | Actualizar PLUGINS.md con sección novelist | 0.5 | ⏳ |
| T045 | Actualizar aleph.agent.md con handoff [NOVELIST] | 0.5 | ⏳ |
| T046 | Actualizar ox.agent.md con índice del plugin (v1.5.0) | 0.5 | ⏳ |
| T047 | Test E2E: ciclo completo crear → editar → exportar → publicar | 1 | ⏳ |

#### Definition of Done
- [ ] Documentación completa
- [ ] Handoffs integrados en @aleph
- [ ] Test E2E pasa

---

### SCRIPT-1.13.0-S09 — README-SCRIPTORIUM (Submódulo)
**Puntos**: 2  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Crear documentación de integración en el submódulo mcp-novelist.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T048 | Crear `mcp-novelist/README-SCRIPTORIUM.md` | 1 | ⏳ |
| T049 | Documentar mapeo ontológico completo | 0.5 | ⏳ |
| T050 | Documentar dependencia mcp-core-sdk | 0.5 | ⏳ |

#### Definition of Done
- [ ] README-SCRIPTORIUM documenta integración
- [ ] Mapeos claros entre formatos
- [ ] Dependencias documentadas

---

## Métricas

| Métrica | Valor |
|---------|-------|
| Stories totales | 9 |
| Tasks totales | 50 |
| Effort total | 38 pts |
| Prioridad Must | 6 stories (23 pts) |
| Prioridad Should | 2 stories (10 pts) |
| Prioridad Must (resto) | 1 story (3 pts) |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| Submódulo mcp-novelist | ✅ Instalado | Rama integration/beta/scriptorium |
| Plugin Teatro | ✅ Instalado | SCRIPT-1.0.0 |
| Plugin AGENT_CREATOR | ✅ Instalado | Para sincronización de personajes |
| Plugin ARG_BOARD | ✅ Instalado | Para registro de obras/actores |
| Servidor MCP (opcional) | ⚠️ Externo | Puerto 3066, npm start |
| mcp-core-sdk | ⚠️ Verificar | Dependencia local en package.json |

---

## Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Servidor MCP no disponible | Media | Medio | Modo ligero sin MCP |
| Conflicto sync bidireccional | Alta | Alto | Timestamp, merge manual |
| mcp-core-sdk no resuelve | Alta | Alto | Incluir como submódulo |
| Formato de escenas incompatible | Baja | Medio | Transformación flexible |

---

## Archivos Generados (Inventario)

### Submódulo (1 archivo)
- `mcp-novelist/README-SCRIPTORIUM.md`

### Plugin (mínimo 10 archivos)
- `.github/plugins/novelist/manifest.md`
- `.github/plugins/novelist/agents/novelist.agent.md`
- `.github/plugins/novelist/instructions/novelist.instructions.md`
- `.github/plugins/novelist/prompts/novelist-crear-obra.prompt.md`
- `.github/plugins/novelist/prompts/novelist-crear-personaje.prompt.md`
- `.github/plugins/novelist/prompts/novelist-crear-escena.prompt.md`
- `.github/plugins/novelist/prompts/novelist-listar.prompt.md`
- `.github/plugins/novelist/prompts/novelist-exportar-obra.prompt.md`
- `.github/plugins/novelist/prompts/novelist-importar-obra.prompt.md`
- `.github/plugins/novelist/prompts/novelist-publicar-teatro.prompt.md`
- `.github/plugins/novelist/docs/README.md`

### Integración (2 archivos)
- `.github/agents/plugin_ox_novelist.agent.md`
- `ARCHIVO/PLUGINS/NOVELIST/README.md`

### Modificados (6 archivos)
- `.github/plugins/registry.json`
- `.github/agents/aleph.agent.md`
- `.github/agents/ox.agent.md`
- `scripts/setup-workspace.sh`
- `scripts/README.md`
- `.gitmodules`

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-24 | Crear backlog borrador SCRIPT-1.13.0 | @scrum |
| 2025-12-24 | Añadir submódulo mcp-novelist | @aleph |
| 2025-12-24 | Crear conversación PO-SM | @scrum |
