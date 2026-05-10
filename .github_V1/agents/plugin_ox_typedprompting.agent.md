---
name: TypedPrompt Editor
description: "Bridge: conecta VS Code con agentes de TypedPrompting. Ver .github/plugins/typed-prompting/"
argument-hint: "Invoca agentes del plugin TypedPrompting: diseñar ontologías, validar mensajes, instalar reglas"
tools: ['vscode', 'execute', 'read', 'edit', 'search', 'web', 'copilot-logs-mcp-server/*', 'prolog-mcp-server/*', 'playwright/*', 'agent', 'todo']
handoffs:
  - label: Listar capacidades de TypedPrompting
    agent: plugin_ox_typedprompting
    prompt: Lista todas las capacidades disponibles en el plugin TypedPrompting.
    send: false
  - label: "[Asistente] Estudiar caso de uso"
    agent: .github/plugins/typed-prompting/agents/typed-prompting.agent.md
    prompt: "Modo Asistente: Analiza el caso de uso descrito y propone una estructura de ontología."
    send: false
  - label: "[Asistente] Sugerir ontología existente"
    agent: .github/plugins/typed-prompting/agents/typed-prompting.agent.md
    prompt: "Modo Asistente: Busca en bibliotecas existentes y sugiere ontologías relevantes."
    send: false
  - label: "[Gestor] Instalar schema en agente"
    agent: .github/plugins/typed-prompting/agents/typed-prompting.agent.md
    prompt: "Modo Gestor: Instala un schema de validación en la receta de un agente."
    send: false
  - label: "[Gestor] Instalar protocolo en flujo ARG"
    agent: .github/plugins/typed-prompting/agents/typed-prompting.agent.md
    prompt: "Modo Gestor: Define contratos de comunicación entre personajes de una obra ARG."
    send: false
  - label: Validar mensaje contra schema
    agent: .github/plugins/typed-prompting/agents/typed-prompting.agent.md
    prompt: "Valida un mensaje JSON contra un schema definido y reporta errores."
    send: false
  - label: Crear schema desde TypeScript
    agent: .github/plugins/typed-prompting/agents/typed-prompting.agent.md
    prompt: "Convierte una interface TypeScript a JSON Schema y lo guarda."
    send: false
  - label: Abrir editor web
    agent: .github/plugins/typed-prompting/agents/typed-prompting.agent.md
    prompt: "Inicia el servidor del editor visual (localhost:3019)."
    send: false
  - label: "[DevOps] Arrancar servidor TPE"
    agent: plugin_ox_typedprompting
    prompt: "Ejecuta VS Code Task 'TPE: Start [Server]' para arrancar TypedPromptsEditor en puerto 3019."
    send: false
  - label: "[DevOps] Abrir TPE en navegador"
    agent: plugin_ox_typedprompting
    prompt: "Ejecuta VS Code Task 'TPE: Open Browser' para abrir localhost:3019 en navegador."
    send: false
  - label: Investigar System Message subyacente
    agent: Ox
    prompt: "Analiza en CopilotEngine cómo se construye el system message para el modelo/agente actual. Usa analizar-flujo-copilot.prompt.md."
    send: false
  - label: Mapear TypeScript a PromptElement
    agent: Ox
    prompt: "Busca en CopilotEngine cómo @vscode/prompt-tsx convierte interfaces TS a elementos de prompt."
    send: false
---

# Plugin Ox: TypedPrompting

**Capa**: 🔌 Plugins (Bridge) — ver taxonomía en @ox

> Agente bridge que conecta VS Code con `.github/plugins/typed-prompting/`.

---

## Descripción

**TypedPrompting** es un plugin transversal para:
- **Diseñar ontologías** en TypeScript → JSON Schema
- **Validar mensajes** de LLM contra schemas
- **Crear contratos** de comunicación entre agentes
- **Instalar reglas** en agentes y flujos ARG

---

## Modos de Operación

### Modo Asistente 🎓

Guía interactiva para diseñar ontologías:

| Handoff | Descripción |
|---------|-------------|
| Estudiar caso de uso | Analizar requisitos y proponer estructura |
| Sugerir ontología | Buscar en bibliotecas y recomendar |

### Modo Gestor 🔧

Instalación de reglas en el sistema:

| Handoff | Descripción |
|---------|-------------|
| Instalar en agente | Añadir validationSchema a receta |
| Instalar en flujo ARG | Definir communicationProtocol |

---

## Agentes Disponibles

| Agente | Archivo | Descripción |
|--------|---------|-------------|
| TypedPrompting | `agents/typed-prompting.agent.md` | Agente principal de ontologías |

---

## Recursos del Plugin

| Tipo | Cantidad | Ubicación |
|------|----------|-----------|
| Agentes | 1 | `agents/` |
| Prompts | 2+ | `prompts/` |
| Instructions | 1 | `instructions/` |

---

## Submódulo

El plugin usa el submódulo `alephscript-typed-prompting` (alias `TypedPromptsEditor`):

```bash
# Iniciar servidor de desarrollo
cd TypedPromptsEditor
npm install
npm run dev
# http://localhost:3019
```

---

## VS Code Tasks

El Scriptorium incluye tareas preconfiguradas:

| Task | Descripción | Atajo |
|------|-------------|-------|
| `TPE: Start [Server]` | Arranca Vite + Express en puerto 3019 | Ctrl+Shift+B → seleccionar |
| `TPE: Open Browser` | Abre localhost:3019 en navegador | — |

### Uso desde terminal

```bash
# Alternativa manual
cd TypedPromptsEditor && npm run dev
```

### Dependencias

- Node.js 18+
- npm install (primera vez)

---

## Integración con otros plugins

| Plugin | Integración |
|--------|-------------|
| AGENT_CREATOR | Campo `validationSchema` en recetas |
| ARG_BOARD | Campo `communicationProtocol` en obras |
| MCP_PRESETS | Sincronización de AIConfigs |

---

## Referencias

- Manifest: `.github/plugins/typed-prompting/manifest.md`
- Datos: `ARCHIVO/PLUGINS/TYPED_PROMPTING/`
- Submódulo: `alephscript-typed-prompting/`
- Backlog: `ARCHIVO/DISCO/BACKLOG_BORRADORES/TYPED_PROMPTING/`
