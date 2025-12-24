---
name: plugin_ox_typedprompting
description: "Bridge: conecta VS Code con agentes de TypedPrompting. Ver .github/plugins/typed-prompting/"
argument-hint: "Invoca agentes del plugin TypedPrompting: diseñar ontologías, validar mensajes, instalar reglas"
tools: ['agent', 'read', 'edit', 'search']
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
    prompt: "Inicia el servidor del editor visual (localhost:5000)."
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

El plugin usa el submódulo `alephscript-typed-prompting`:

```bash
# Iniciar servidor de desarrollo
cd alephscript-typed-prompting
npm install
npm run dev
# http://localhost:5000
```

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
