# Blueprint Agéntico: Agentic Typed Logic Scriptorium Flow

> **Versión Ox**: 1.0.0  
> **Fecha**: 2026-01-01  
> **Solicitante**: @lucas (Scrum Master)  
> **Fuente**: `02_putting_all_together.md` (destilación PO + Aleph)

---

## Objetivo

Mapear la cadena `Prolog → MCP → Packs → Teatro/ARG` como **red de agentes** con handoffs, instrucciones y prompts explícitos.

---

## Red Agéntica del Flujo

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                          LAYER 0: AGENTES PRODUCTORES                           │
│  ┌───────────────────────┐  ┌───────────────────────┐  ┌─────────────────────┐  │
│  │ @plugin_ox_prolog     │  │ @plugin_ox_argboard   │  │ @plugin_ox_typed    │  │
│  │ editor               │  │ (AAIA + GitARG)       │  │ prompting           │  │
│  │ • PrologServer       │  │ • fia-catalog.json    │  │ • Schemas           │  │
│  │ • Queries Prolog     │  │ • 10 paradigmas       │  │ • Packs JSON        │  │
│  └───────────┬───────────┘  └───────────┬───────────┘  └──────────┬──────────┘  │
└──────────────┼──────────────────────────┼──────────────────────────┼────────────┘
               │                          │                          │
               │ handoff: "exponer"       │ handoff: "exponer"       │ handoff: "tipar"
               ▼                          ▼                          ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                          LAYER 1: AGENTE INTEGRADOR                             │
│                       ┌─────────────────────────────┐                           │
│                       │ @plugin_ox_mcppresets       │                           │
│                       │ • Gestiona mcp-mesh-sdk     │                           │
│                       │ • LauncherServer configs    │                           │
│                       │ • Puertos: 3001-3007        │                           │
│                       └──────────────┬──────────────┘                           │
└──────────────────────────────────────┼──────────────────────────────────────────┘
                                       │
                                       │ handoff: "crear pack"
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                          LAYER 2: PACKS TIPADOS                                 │
│  ┌───────────────────────────────┐  ┌───────────────────────────────────────┐   │
│  │ AgentPrologBrain.pack.json   │  │ AgentFIACreator.pack.json             │   │
│  │ • tools: query_prolog,       │  │ • tools: listar_paradigmas,           │   │
│  │   assert_fact, consult_kb    │  │   crear_agente_fia, capacidades       │   │
│  │ • resources: knowledge_base  │  │ • resources: fia-catalog              │   │
│  │ • prompts: razonamiento_sbr  │  │ • prompts: creacion_agente            │   │
│  └───────────────┬───────────────┘  └───────────────────┬───────────────────┘   │
└──────────────────┼──────────────────────────────────────┼───────────────────────┘
                   │                                      │
                   │ handoff: "consumir en escena"        │
                   ▼                                      ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                          LAYER 3: CONSUMIDORES RUNTIME                          │
│  ┌───────────────────────────────────────────────────────────────────────────┐  │
│  │ @plugin_ox_teatro                                                         │  │
│  │ • Obras con mcpPacks: [AgentPrologBrain, AgentFIACreator]                 │  │
│  │ • Agentes en escena invocan tools MCP en su turno                         │  │
│  └───────────────────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────────────────┐  │
│  │ @plugin_ox_argboard                                                       │  │
│  │ • Arrakis, GitARG, BOE, Decoherence → usan packs en runtime               │  │
│  └───────────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Handoffs del Circuito

| Origen | Destino | Label | Trigger |
|--------|---------|-------|---------|
| @plugin_ox_prologeditor | @plugin_ox_mcppresets | "Registrar PrologServer como MCP" | PrologServer validado |
| @plugin_ox_argboard | @plugin_ox_mcppresets | "Registrar AAIA como MCP" | fia-catalog.json expuesto |
| @plugin_ox_typedprompting | @plugin_ox_mcppresets | "Crear pack tipado" | Schema validado con ajv |
| @plugin_ox_mcppresets | @plugin_ox_teatro | "Pack disponible para obras" | Pack registrado en LauncherServer |
| @plugin_ox_mcppresets | @plugin_ox_argboard | "Pack disponible para agentes ARG" | Pack registrado |
| @plugin_ox_teatro | @ox | "Diagnóstico post-ejecución" | Obra finalizada |

---

## Instrucciones por Layer

### Layer 0: Instrucciones de Producción

| Archivo | Aplica a | Contenido |
|---------|----------|-----------|
| `prolog-editor.instructions.md` | `.github/plugins/prolog-editor/**` | Sintaxis Prolog, validación queries |
| `arg-engine.instructions.md` | `.github/plugins/arg-board/**` | Paradigmas FIA, catálogo |
| `typed-prompting.instructions.md` | `.github/plugins/typed-prompting/**` | Schemas, context-request |

### Layer 1: Instrucciones de Integración

| Archivo | Aplica a | Contenido |
|---------|----------|-----------|
| `mcp-presets.instructions.md` | `.vscode/mcp.json`, `LauncherServer.ts` | Configuración servidores, puertos |
| `submodulo-integracion.instructions.md` | `MCPGallery/**` | Protocolo submódulos |

### Layer 2: Instrucciones de Tipado

| Archivo | Aplica a | Contenido |
|---------|----------|-----------|
| `indice-dry.instructions.md` | `Funcional.md`, `Tecnico.md` | Dónde registrar packs |
| `context-pack.instructions.md` | `*.pack.json` | Estructura de pack tipado |

### Layer 3: Instrucciones de Consumo

| Archivo | Aplica a | Contenido |
|---------|----------|-----------|
| `teatro-interactivo.instructions.md` | `ARCHIVO/PLUGINS/TEATRO/**` | Obras con MCP |
| `arg-board.instructions.md` | `ARCHIVO/PLUGINS/ARG_BOARD/**` | Agentes runtime |

---

## Prompts del Circuito

| Prompt | Propósito | Invoca |
|--------|-----------|--------|
| `crear-mcp-server.prompt.md` | Scaffold de nuevo servidor MCP | @plugin_ox_mcppresets |
| `crear-pack-tipado.prompt.md` | Generar pack con tools+resources+prompts | @plugin_ox_typedprompting |
| `agregar-mcp-a-obra.prompt.md` | Configurar obra con packs disponibles | @plugin_ox_teatro |
| `validar-circuito-e2e.prompt.md` | Test end-to-end del flujo | @ox |

---

## Nuevos Agentes Sugeridos

Para completar el circuito, propongo crear/extender:

| Agente | Capa | Responsabilidad |
|--------|------|-----------------|
| **McpIntegrator** | Layer 1 | Orquesta registro de servidores en mesh |
| **PackBuilder** | Layer 2 | Genera packs tipados desde templates |
| **RuntimeContext** | Layer 3 | Inyecta packs en obras/agentes ARG |

### Frontmatter McpIntegrator (propuesta)

```yaml
---
name: McpIntegrator
description: "Integra servidores MCP en la mesh, registra configs y expone tools"
tools: ['execute', 'read', 'edit', 'mcp_devops-mcp-se_*']
handoffs:
  - label: Registrar PrologServer
    agent: McpIntegrator
    prompt: "Crea DEFAULT_PROLOG_MCP_SERVER_CONFIG y añádelo a CONFIGS_BASE"
  - label: Registrar AAIAServer
    agent: McpIntegrator
    prompt: "Crea DEFAULT_AAIA_MCP_SERVER_CONFIG para fia-catalog.json"
  - label: Validar mesh
    agent: McpIntegrator
    prompt: "Ejecuta LauncherServer y verifica 5+ servers activos"
---
```

---

## Tasks para Backlog (vista Ox)

| ID | Task | Layer | Agente Responsable | Effort |
|----|------|-------|-------------------|--------|
| T1 | Crear `prolog-mcp-server` config | 0→1 | @plugin_ox_prologeditor | 2 |
| T2 | Crear `aaia-mcp-server` wrapper | 0→1 | @plugin_ox_argboard | 3 |
| T3 | Añadir servers a `CONFIGS_BASE_MCP_SERVER` | 1 | @plugin_ox_mcppresets | 2 |
| T4 | Crear `AgentPrologBrain.pack.json` | 1→2 | @plugin_ox_typedprompting | 3 |
| T5 | Crear `AgentFIACreator.pack.json` | 1→2 | @plugin_ox_typedprompting | 3 |
| T6 | Añadir `mcpPacks` a schema de obra.yaml | 2→3 | @plugin_ox_teatro | 2 |
| T7 | Configurar Arrakis con pack Prolog | 3 | @plugin_ox_argboard | 2 |
| T8 | Test E2E: Obra invoca Prolog en runtime | 3 | @plugin_ox_teatro | 3 |

**Total**: 20 pts (~3 semanas)

---

## Archivos a Crear/Modificar

| Acción | Archivo | Responsable |
|--------|---------|-------------|
| CREAR | `MCPGallery/mcp-mesh-sdk/src/configs/prolog.config.ts` | T1 |
| CREAR | `MCPGallery/mcp-mesh-sdk/src/configs/aaia.config.ts` | T2 |
| MODIFICAR | `MCPGallery/mcp-mesh-sdk/src/MCPLauncherServer.ts` | T3 |
| CREAR | `.github/plugins/typed-prompting/packs/AgentPrologBrain.pack.json` | T4 |
| CREAR | `.github/plugins/typed-prompting/packs/AgentFIACreator.pack.json` | T5 |
| MODIFICAR | `.github/plugins/teatro/schemas/obra.schema.yaml` | T6 |
| MODIFICAR | `.github/plugins/arg-board/agents/Arrakis.agent.md` | T7 |
| CREAR | `.github/prompts/test-e2e-mcp-teatro.prompt.md` | T8 |

---

## Diagrama de Secuencia (E2E)

```
┌────────┐     ┌──────────────┐     ┌─────────────┐     ┌─────────┐
│  User  │     │   Teatro     │     │ LauncherSrv │     │ Prolog  │
└────┬───┘     └──────┬───────┘     └──────┬──────┘     └────┬────┘
     │                │                    │                  │
     │ "Iniciar obra" │                    │                  │
     │───────────────>│                    │                  │
     │                │                    │                  │
     │                │ getAvailablePacks()│                  │
     │                │───────────────────>│                  │
     │                │                    │                  │
     │                │ [AgentPrologBrain] │                  │
     │                │<───────────────────│                  │
     │                │                    │                  │
     │                │ (Arrakis en escena)│                  │
     │                │ query_prolog(X)    │                  │
     │                │────────────────────┼─────────────────>│
     │                │                    │                  │
     │                │                    │   resultado(Y)   │
     │                │<───────────────────┼──────────────────│
     │                │                    │                  │
     │ respuesta ARG  │                    │                  │
     │<───────────────│                    │                  │
     │                │                    │                  │
```

---

## Validación del Blueprint

```bash
# Test 1: Agentes existen
@ox diagnosticar agentes | grep -E "prolog|argboard|typed|teatro"

# Test 2: Instrucciones aplicables
ls .github/plugins/*/instructions/*.instructions.md

# Test 3: Handoffs coherentes
@ox listar handoffs | grep "mcp"

# Test 4: Prompts disponibles
ls .github/prompts/*.prompt.md | grep -E "mcp|pack|teatro"
```

---

## Conclusión Ox

| Aspecto | Evaluación |
|---------|------------|
| **Viabilidad** | ✅ Alta — todas las piezas existen |
| **Riesgo** | 🟡 Medio — integración entre layers |
| **Esfuerzo** | ~20 pts (3 semanas) |
| **Dependencias** | PrologServer funcional (confirmado) |
| **Valor** | Alto — habilita razonamiento lógico en agentes ARG |

**Recomendación**: Crear épica `SCRIPT-2.2.0 Agentic Typed Logic Flow` y asignar a FC1-2026.

---

*Blueprint generado por @ox — 2026-01-01*  
*Fuente: `02_putting_all_together.md` (destilación PO + @aleph + @indice)*
