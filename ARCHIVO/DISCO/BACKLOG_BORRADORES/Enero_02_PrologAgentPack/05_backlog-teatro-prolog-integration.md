# Backlog: TEATRO-PROLOG-1.0.0 — Integración Teatro + Prolog

> **Estado**: ✅ Completado  
> **Fecha creación**: 2026-01-03  
> **Fecha cierre**: 2026-01-03  
> **Origen**: Spike Teatro-ARG-AgentCreator  
> **Effort total**: 13 pts  
> **Sprint**: FC1

---

## Objetivo

Permitir que **dramaturgos** puedan:
1. Definir comportamiento lógico de personajes via `.brain.pl`
2. Empaquetar lógica en packs por obra
3. Ejecutar razonamiento Prolog durante obras en vivo

---

## Arquitectura Target

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        FLUJO: DRAMATURGO + PROLOG                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. DISEÑO (PrologEditor/frontend)                                          │
│     └── Dramaturgo edita reglas de comportamiento del personaje            │
│         └── Guarda como: {personaje}.brain.pl                              │
│                                                                             │
│  2. EMPAQUETADO (AgentCreator)                                              │
│     └── Exporta pack: Obra{NombreObra}.pack.json                           │
│         └── Incluye: brain.pl + reglas + mcpServer reference               │
│                                                                             │
│  3. INSTALACIÓN (Teatro)                                                    │
│     └── Instala obra con mcpPacks declarados                               │
│         └── Registra en obras.json                                         │
│                                                                             │
│  4. EJECUCIÓN (ARG_BOARD)                                                   │
│     └── Arrakis invoca `teatro_agent_session(obraId, agentName)`           │
│         └── MCPPrologServer carga KB y ejecuta razonamiento                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Stories

### S01: Template Brain.pl en AgentCreator (3 pts)
**Prioridad**: 🔴 Alta  
**Estado**: ✅ Completado

#### Descripción
Crear template y flujo para que AgentCreator genere archivos `.brain.pl` con reglas de comportamiento para personajes.

| Task | Descripción | Effort | Estado |
|------|-------------|--------|--------|
| T01 | Crear template `brain.pl.template` en AgentCreator | 1 | ✅ |
| T02 | Añadir prompt `exportar-brain-pl.prompt.md` | 0.5 | ✅ |
| T03 | Actualizar `agent-creator.agent.md` con handoff | 0.5 | ✅ |
| T04 | Crear ejemplo `lucas.brain.pl` funcional | 1 | ✅ |

#### Criterios de Aceptación
- [x] Template genera Prolog válido (sintaxis SWI-Prolog)
- [x] Incluye secciones: identidad, reglas, queries ejemplo
- [x] Handoff disponible: "Exportar cerebro Prolog"
- [x] Ejemplo lucas.brain.pl ejecutable en MCPPrologServer

#### Template Propuesto

```prolog
%% ============================================
%% Cerebro Prolog: {AGENT_NAME}
%% Obra: {OBRA_ID}
%% Generado por: AgentCreator
%% Fecha: {DATE}
%% ============================================

%% --- IDENTIDAD ---
rol({agent_name}, {rol}).
especialidad({agent_name}, {especialidad}).

%% --- CONOCIMIENTO BASE ---
% Hechos iniciales del personaje
% conoce({agent_name}, concepto).

%% --- REGLAS DE COMPORTAMIENTO ---
decidir_accion({agent_name}, Accion) :-
    contexto(Contexto),
    regla_para(Contexto, Accion).

%% --- REGLAS ESPECÍFICAS ---
regla_para(buscar_informacion, consultar_indice).
regla_para(validar_coherencia, ejecutar_tests).
regla_para(no_sabe, delegar_ox).

%% --- QUERIES EJEMPLO ---
% ?- decidir_accion({agent_name}, X).
% ?- rol({agent_name}, R).
```

---

### S02: Pack por Obra (3 pts)
**Prioridad**: 🔴 Alta  
**Estado**: ✅ Completado

#### Descripción
Crear schema y flujo para packs específicos de obra que incluyan todos los cerebros Prolog de sus personajes.

| Task | Descripción | Effort | Estado |
|------|-------------|--------|--------|
| T05 | Crear schema `obra-pack.schema.json` | 1 | ✅ |
| T06 | Crear pack ejemplo `ObraItacaDigital.pack.json` | 1 | ✅ |
| T07 | Añadir propiedad `mcpPacks` al schema de obra YAML | 0.5 | ✅ |
| T08 | Documentar en teatro-interactivo.instructions.md | 0.5 | ✅ |

#### Criterios de Aceptación
- [x] Schema valida estructura del pack de obra
- [x] Pack incluye: id, version, personajes[], brainFiles[], mcpServer
- [x] Obra YAML puede declarar `mcpPacks: [ObraItacaDigital]`
- [x] Documentación actualizada con ejemplos

#### Schema Propuesto

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["id", "version", "obraId", "personajes"],
  "properties": {
    "id": { "type": "string", "pattern": "^Obra[A-Z]" },
    "version": { "type": "string" },
    "obraId": { "type": "string" },
    "description": { "type": "string" },
    "mcpServer": { "type": "string", "default": "prolog-mcp-server" },
    "personajes": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["name", "brainFile"],
        "properties": {
          "name": { "type": "string" },
          "brainFile": { "type": "string", "pattern": "\\.brain\\.pl$" },
          "agentRef": { "type": "string" }
        }
      }
    },
    "sharedRules": { "type": "string" },
    "contextTriggers": { "type": "object" }
  }
}
```

---

### S03: Handoffs Teatro + Arrakis → MCP (2 pts)
**Prioridad**: 🔴 Alta  
**Estado**: ✅ Completado

#### Descripción
Añadir handoffs en los agentes Teatro y Arrakis para invocar el prompt `teatro_agent_session`.

| Task | Descripción | Effort | Estado |
|------|-------------|--------|--------|
| T09 | Añadir handoff en `teatro.agent.md` | 0.5 | ✅ |
| T10 | Añadir handoff en `arrakis.agent.md` | 0.5 | ✅ |
| T11 | Crear prompt wrapper `teatro-razonar-personaje.prompt.md` | 0.5 | ✅ |
| T12 | Test E2E: Teatro → MCP → Query | 0.5 | ✅ |

#### Criterios de Aceptación
- [x] `@plugin_ox_teatro razonar lucas` invoca prompt MCP
- [x] `@arrakis turno-razonar lucas` invoca prompt MCP
- [x] Prompt wrapper simplifica parámetros para usuario
- [x] Test pasa con sesión real en MCPPrologServer

#### Handoff Propuesto (Teatro)

```yaml
- label: Razonar con personaje (Prolog)
  agent: Teatro
  prompt: "Invoca teatro_agent_session para que el personaje razone usando su cerebro Prolog. Requiere: nombre del personaje y obra activa."
  send: false
```

---

### S04: UI Dramaturgos (5 pts)
**Prioridad**: 🟡 Media  
**Estado**: ✅ Completado

#### Descripción
Crear interfaz en PrologEditor para que dramaturgos editen `.brain.pl` con asistencia visual.

| Task | Descripción | Effort | Estado |
|------|-------------|--------|--------|
| T13 | Crear `BrainEditorComponent` con syntax highlighting | 2 | ✅ |
| T14 | Añadir panel de "Identidad" (formulario → Prolog) | 1 | ✅ |
| T15 | Añadir panel de "Reglas" (visual → Prolog) | 1.5 | ✅ |
| T16 | Integrar con KnowledgeBaseComponent existente | 0.5 | ✅ |

#### Criterios de Aceptación
- [x] Editor con syntax highlighting para Prolog
- [x] Formulario de identidad genera hechos automáticamente
- [x] Panel visual para crear reglas `decidir_accion`
- [x] Botón "Probar en sesión" ejecuta query de prueba
- [x] Exportar como `.brain.pl`

#### Wireframe

```
┌─────────────────────────────────────────────────────────────┐
│  Brain Editor: lucas.brain.pl                         [💾] │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌──────────────────────────────────┐ │
│  │ 📋 IDENTIDAD    │  │ % Cerebro: lucas                 │ │
│  │                 │  │ rol(lucas, scrum_master).        │ │
│  │ Nombre: lucas   │  │ especialidad(lucas, indices).    │ │
│  │ Rol: [dropdown] │  │                                  │ │
│  │ Espec: [input]  │  │ decidir_accion(lucas, A) :-      │ │
│  │                 │  │     contexto(C),                 │ │
│  │ [+ Añadir hecho]│  │     regla_para(C, A).            │ │
│  ├─────────────────┤  │                                  │ │
│  │ 📜 REGLAS       │  │ regla_para(buscar, consultar).   │ │
│  │                 │  │ regla_para(validar, tests).      │ │
│  │ Si: [contexto]  │  │                                  │ │
│  │ Entonces: [acc] │  └──────────────────────────────────┘ │
│  │                 │                                       │
│  │ [+ Añadir regla]│  [▶ Probar]  [📤 Exportar]           │
│  └─────────────────┘                                       │
└─────────────────────────────────────────────────────────────┘
```

---

## Dependencias

| Épica | Dependencia | Estado |
|-------|-------------|--------|
| PROLOG-UI-2.0.0 | KnowledgeBaseComponent | ✅ Completado |
| PROLOG-PROMPTS-1.0.0 | Prompt `teatro_agent_session` | ✅ Completado |
| PROLOG-DRY-1.0.0 | Tipos alineados | ✅ Completado |

---

## Riesgos

| Riesgo | Mitigación |
|--------|------------|
| Sintaxis Prolog compleja para dramaturgos | UI visual genera código |
| Packs grandes con muchos personajes | Lazy loading de brains |
| MCPPrologServer no disponible | Fallback a simulación local |

---

## Definition of Done

- [x] Todas las tasks implementadas
- [x] Tests E2E pasando
- [x] Documentación actualizada (instructions + README)
- [x] Ejemplo funcional con obra Ítaca Digital + Lucas
- [x] Commits según DEVOPS.md

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-01-03 | Crear backlog desde spike | @scrum |
| 2026-01-03 | ✅ Implementación completa (13 pts) | @agent |
