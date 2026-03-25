# Backlog: PrologAgent Pack

> **Épica**: SCRIPT-2.3.1  
> **Feature**: PrologAgent Pack — Integración AGENT_CREATOR + TypedPrompting + MCPPresets  
> **Sprint**: FC1  
> **Effort total**: 13 pts  
> **Estado**: ✅ Completado  
> **Fecha**: 2026-01-02

---

## Resumen Ejecutivo

Conectar las piezas existentes del ecosistema Scriptorium para habilitar **agentes con cerebro Prolog**:

1. **PrologEditor/frontend** → Editar reglas Prolog
2. **MCPPrologServer** → Ejecutar queries en runtime
3. **AgentPrologBrain.pack.json** → Pack tipado MCP
4. **TypedPrompting schemas** → Validación de comunicación
5. **AGENT_CREATOR recipes** → Crear agentes con cerebro Prolog
6. **Teatro ARG** → Personajes con lógica declarativa

**Ejemplo implementado**: Lucas en Ítaca Digital

---

## Stories

| ID | Nombre | Effort | Estado |
|----|--------|--------|--------|
| S01 | Crear Pack Tipado AgentPrologBrain | 3 pts | ✅ |
| S02 | Implementar Cerebro Prolog de Lucas | 3 pts | ✅ |
| S03 | Integrar con Teatro ARG | 2 pts | ✅ |
| S04 | Conectar con TypedPrompting | 2 pts | ✅ |
| S05 | Actualizar AGENT_CREATOR | 2 pts | ✅ |
| S06 | Validar Índices DRY | 1 pt | ✅ |

---

## Tasks Detalladas

### S01: Crear Pack Tipado AgentPrologBrain

| Task | Descripción | Effort | Estado |
|------|-------------|--------|--------|
| T001 | Crear `.github/plugins/mcp-presets/packs/AgentPrologBrain.pack.json` | 1 | ✅ |
| T002 | Crear `.github/plugins/mcp-presets/schemas/pack.schema.json` | 1 | ✅ |
| T003 | Actualizar `manifest.md` de mcp-presets con prolog-mcp-server | 1 | ✅ |

**Archivos creados**:
- `.github/plugins/mcp-presets/packs/AgentPrologBrain.pack.json`
- `.github/plugins/mcp-presets/schemas/pack.schema.json`

**Archivos modificados**:
- `.github/plugins/mcp-presets/manifest.md`

---

### S02: Implementar Cerebro Prolog de Lucas

| Task | Descripción | Effort | Estado |
|------|-------------|--------|--------|
| T004 | Crear `lucas-prolog.brain.pl` con reglas DRY | 2 | ✅ |
| T005 | Actualizar `lucas.agent.md` en ELENCO | 1 | ✅ |

**Archivos creados**:
- `ARCHIVO/DISCO/TALLER/ELENCO/lucas/lucas-prolog.brain.pl`

**Archivos modificados**:
- `ARCHIVO/DISCO/TALLER/ELENCO/lucas/lucas.agent.md`

**Predicados implementados**:
```prolog
documentacion_coherente/1   % Validar DRY
ubicacion_canonica/2        % Dónde buscar
consejo/2                   % Guía al viajero
reporte_salud/1             % Estado sistema
tarea_pendiente/3           % Tracking sprint
```

---

### S03: Integrar con Teatro ARG

| Task | Descripción | Effort | Estado |
|------|-------------|--------|--------|
| T006 | Actualizar `itaca-digital.yaml` con elenco y mcpPacks | 1 | ✅ |
| T007 | Documentar flujo import/export | 1 | ✅ |

**Archivos creados**:
- `ARCHIVO/DISCO/BACKLOG_BORRADORES/Enero_2026_LogicaAgentes/ejemplo_lucas_import_export.md`

**Archivos modificados**:
- `ARCHIVO/PLUGINS/TEATRO/obras/itaca-digital.yaml`

---

### S04: Conectar con TypedPrompting

| Task | Descripción | Effort | Estado |
|------|-------------|--------|--------|
| T008 | Crear `lucas-query-request.schema.json` | 1 | ✅ |
| T009 | Crear `lucas-query-response.schema.json` | 1 | ✅ |

**Archivos creados**:
- `ARCHIVO/PLUGINS/TYPED_PROMPTING/schemas/lucas-query-request.schema.json`
- `ARCHIVO/PLUGINS/TYPED_PROMPTING/schemas/lucas-query-response.schema.json`

---

### S05: Actualizar AGENT_CREATOR

| Task | Descripción | Effort | Estado |
|------|-------------|--------|--------|
| T010 | Actualizar `lucas.recipe.json` a v2.0.0 con mcpPacks | 1 | ✅ |
| T011 | Actualizar `lucas.agent.md` con handoffs Prolog | 1 | ✅ |

**Archivos modificados**:
- `ARCHIVO/PLUGINS/AGENT_CREATOR/recipes/lucas.recipe.json` (v1.0.0 → v2.0.0)
- `ARCHIVO/PLUGINS/AGENT_CREATOR/agents/created/lucas.agent.md`

**Cambios en recipe**:
- `+mcpPacks: [AgentPrologBrain]`
- `+validationSchema: lucas-query-*`
- `+arg_deployment.obras: itaca_digital`

---

### S06: Validar Índices DRY

| Task | Descripción | Effort | Estado |
|------|-------------|--------|--------|
| T012 | Actualizar `Funcional.md` con MCP Packs | 0.5 | ✅ |
| T013 | Actualizar `Tecnico.md` con MCP Packs section | 0.5 | ✅ |

**Archivos modificados**:
- `ARCHIVO/DEVOPS/Funcional.md`
- `ARCHIVO/DEVOPS/Tecnico.md`

---

## Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              PROLOGAGENT PACK                                    │
└─────────────────────────────────────────────────────────────────────────────────┘

   AGENT_CREATOR                    MCP PRESETS                    TEATRO ARG
┌──────────────────┐           ┌──────────────────┐           ┌──────────────────┐
│ lucas.recipe.json│──────────▶│AgentPrologBrain  │◀──────────│itaca-digital.yaml│
│   v2.0.0         │           │   .pack.json     │           │  elenco: lucas   │
│  +mcpPacks       │           │   7 tools        │           │  mcpPacks: [..] │
│  +validation     │           │   3 resources    │           │                  │
└────────┬─────────┘           └────────┬─────────┘           └────────┬─────────┘
         │                              │                              │
         ▼                              ▼                              ▼
┌──────────────────┐           ┌──────────────────┐           ┌──────────────────┐
│ lucas.agent.md   │           │MCPPrologServer   │           │lucas-prolog      │
│ +handoffs Prolog │           │  puerto 3006     │◀──────────│   .brain.pl      │
│ +tools MCP       │           │                  │           │  ~160 líneas     │
└──────────────────┘           └──────────────────┘           └──────────────────┘
         │                                                             │
         ▼                                                             │
┌──────────────────┐                                                   │
│ TypedPrompting   │                                                   │
│ lucas-query-*    │◀──────────────────────────────────────────────────┘
│   .schema.json   │
└──────────────────┘
```

---

## Criterios de Aceptación

- [x] Pack `AgentPrologBrain` creado con schema válido
- [x] Lucas tiene cerebro Prolog con predicados DRY
- [x] Recipe de Lucas actualizado a v2.0.0
- [x] Obra Ítaca Digital incluye a Lucas con mcpPacks
- [x] Schemas TypedPrompting para validación
- [x] Índices Funcional.md y Tecnico.md actualizados
- [x] Documentación de flujo import/export

---

## Commits Sugeridos

```bash
# T001-T003: Pack y schema
feat(script/mcp-presets): crear AgentPrologBrain pack tipado
- Crear packs/AgentPrologBrain.pack.json con 7 tools
- Crear schemas/pack.schema.json para validación
- Añadir prolog-mcp-server a manifest.md
refs #SCRIPT-2.3.1-T001

# T004-T005: Cerebro Lucas
feat(script/teatro): implementar cerebro Prolog de Lucas
- Crear lucas-prolog.brain.pl con reglas DRY
- Actualizar lucas.agent.md en ELENCO con queries
refs #SCRIPT-2.3.1-T004

# T006-T007: Teatro ARG
feat(script/teatro): integrar Lucas en Ítaca Digital
- Añadir elenco y mcpPacks a itaca-digital.yaml
- Documentar flujo import/export
refs #SCRIPT-2.3.1-T006

# T008-T009: TypedPrompting
feat(script/typed-prompting): crear schemas para Lucas
- Crear lucas-query-request.schema.json
- Crear lucas-query-response.schema.json
refs #SCRIPT-2.3.1-T008

# T010-T011: AGENT_CREATOR
feat(script/agent-creator): actualizar Lucas a v2.0.0
- Añadir mcpPacks y validationSchema a recipe
- Añadir handoffs Prolog al agente
refs #SCRIPT-2.3.1-T010

# T012-T013: Índices DRY
docs(script/devops): actualizar índices con MCP Packs
- Añadir sección 3.8 MCP Packs a Funcional.md
- Añadir sección 9.2 MCP Packs a Tecnico.md
refs #SCRIPT-2.3.1-T012
```

---

## Referencias

| Recurso | Ubicación |
|---------|-----------|
| AgentPrologBrain.pack.json | `.github/plugins/mcp-presets/packs/` |
| lucas-prolog.brain.pl | `ARCHIVO/DISCO/TALLER/ELENCO/lucas/` |
| lucas.recipe.json | `ARCHIVO/PLUGINS/AGENT_CREATOR/recipes/` |
| itaca-digital.yaml | `ARCHIVO/PLUGINS/TEATRO/obras/` |
| Schemas TypedPrompting | `ARCHIVO/PLUGINS/TYPED_PROMPTING/schemas/` |
| MCPPrologServer | `MCPGallery/mcp-mesh-sdk/src/` |
