---
name: plugin_ox_agentcreator
description: "Bridge: conecta VS Code con agentes del plugin Agent Creator. Ver .github/plugins/agent-creator/agents/"
argument-hint: "Crea agentes especializados combinando agentes base con fuentes de datos de DISCO/ARCHIVO."
tools: ['vscode', 'execute', 'read', 'edit', 'search', 'web', 'playwright/*', 'agent', 'todo']
handoffs:
  - label: Listar agentes de Agent Creator
    agent: plugin_ox_agentcreator
    prompt: Lista los agentes disponibles en el plugin Agent Creator y los agentes creados.
    send: false
  - label: Invocar AgentCreator
    agent: .github/plugins/agent-creator/agents/agent-creator.agent.md
    prompt: Orquestador de creación de agentes. Combina agentes base con fuentes de datos.
    send: false
  - label: Crear nuevo agente especializado
    agent: .github/plugins/agent-creator/agents/agent-creator.agent.md
    prompt: Crea un nuevo agente. Indica agente_base (yellowflag, blueflag, etc.) + fuente (carpeta en DISCO/).
    send: false
  - label: Editar agente existente
    agent: .github/plugins/agent-creator/agents/agent-creator.agent.md
    prompt: Modifica un agente creado añadiendo fuentes o actualizando su especialización.
    send: false
  - label: Fusionar agentes
    agent: .github/plugins/agent-creator/agents/agent-creator.agent.md
    prompt: Combina las capacidades de múltiples agentes en uno nuevo especializado.
    send: false
  - label: Desplegar agente en Teatro ARG
    agent: .github/plugins/agent-creator/agents/agent-creator.agent.md
    prompt: Despliega un agente creado como personaje en una obra ARG.
    send: false
  - label: Listar agentes creados
    agent: plugin_ox_agentcreator
    prompt: Lista todos los agentes creados con sus fuentes y despliegues en ARG.
    send: false
---

# Plugin Ox: Agent Creator

**Capa:** 🔌 Plugins (Bridge) — ver taxonomía en @ox

> Agente bridge que conecta VS Code con `.github/plugins/agent-creator/agents/`.
> El plugin Agent Creator crea agentes especializados combinando agentes base con fuentes de datos.

---

## Agentes disponibles

| Agente | Archivo | Descripción |
|--------|---------|-------------|
| **AgentCreator** | `agent-creator.agent.md` | Orquestador de creación de agentes. |

---

## Agentes creados

| Nombre | Base | Fuente | Despliegue ARG |
|--------|------|--------|----------------|
| `tarotista` | @yellowflag | `DISCO/Foro_t8941392/` | hola_mundo/tarotista |

---

## Capacidades

- **Crear**: Combina agente base + fuentes de datos
- **Editar**: Añade conocimiento a agentes existentes
- **Fusionar**: Combina múltiples agentes
- **Desplegar**: Convierte agentes en personajes ARG

---

## Integraciones

| Plugin | Integración |
|--------|-------------|
| **FORO-SCRAPER** | Solicitar scraping de fuentes adicionales |
| **ARG-BOARD** | Desplegar agentes como personajes en obras |

---

## Referencia

- **Manifest**: `.github/plugins/agent-creator/manifest.md`
- **Agentes**: `.github/plugins/agent-creator/agents/`
- **Agentes creados**: `ARCHIVO/PLUGINS/AGENT_CREATOR/agents/created/`
- **Recetas**: `ARCHIVO/PLUGINS/AGENT_CREATOR/recipes/`
