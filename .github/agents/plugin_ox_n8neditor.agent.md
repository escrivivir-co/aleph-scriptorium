---
name: plugin_ox_n8neditor
description: "Bridge: conecta VS Code con agentes del plugin N8N Editor. Ver .github/plugins/n8n-editor/"
argument-hint: "Diseña workflows visuales estilo n8n, conecta fuentes de datos, exporta JSON para n8n real."
tools: ['agent', 'vscode', 'read', 'edit', 'execute']
handoffs:
  - label: Listar agentes de N8N Editor
    agent: plugin_ox_n8neditor
    prompt: Lista agentes y capacidades del plugin N8N Editor.
    send: false
  - label: Abrir editor de workflows
    agent: .github/plugins/n8n-editor/agents/n8n-editor.agent.md
    prompt: Inicia el editor visual de workflows Angular (puerto 4200).
    send: false
  - label: Crear workflow desde descripción
    agent: .github/plugins/n8n-editor/agents/n8n-editor.agent.md
    prompt: Crea un workflow desde descripción en lenguaje natural o template.
    send: false
  - label: Importar workflow JSON
    agent: .github/plugins/n8n-editor/agents/n8n-editor.agent.md
    prompt: Importa un workflow desde archivo JSON o exportación de n8n.
    send: false
  - label: Exportar workflow para n8n
    agent: .github/plugins/n8n-editor/agents/n8n-editor.agent.md
    prompt: Exporta workflow a formato compatible con n8n, validando con TypedPrompting.
    send: false
  - label: Asesorar sobre nodos MCP
    agent: .github/plugins/n8n-editor/agents/n8n-editor.agent.md
    prompt: Asesora sobre qué nodos MCP usar para un caso de uso específico.
    send: false
  - label: Listar templates disponibles
    agent: .github/plugins/n8n-editor/agents/n8n-editor.agent.md
    prompt: Lista templates predefinidos (auditoría, scraping).
    send: false
---

# Plugin Ox: N8N Editor

**Capa:** 🔌 Plugins (Bridge) — ver taxonomía en @ox

> Agente bridge que conecta VS Code con `.github/plugins/n8n-editor/agents/`.

---

## Agentes Disponibles

| Agente | Archivo | Descripción |
|--------|---------|-------------|
| N8NEditor | `agents/n8n-editor.agent.md` | Editor visual de workflows estilo n8n con integración MCP nativa |

---

## Capacidades

### Modo Asistente (Transportar)

- Cargar templates predefinidos
- Sugerir nodos según caso de uso
- Mapear ontologías a workflows
- Conectar presets MCP

### Modo Gestor (Usar)

- Crear workflows en tiempo real
- Ejecutar workflows en el editor
- Exportar a formato n8n
- Validar con TypedPrompting

---

## Templates Predefinidos

| Template | Descripción | Nodos |
|----------|-------------|-------|
| `workflow-auditoria.json` | Flujo de 5 banderas para auditoría | 8 |
| `workflow-scraping.json` | Extracción y procesamiento | 5 |

---

## Integración con Otros Plugins

| Plugin | Integración |
|--------|-------------|
| TypedPrompting | Validación de JSON exportado |
| MCP-Presets | Nodos MCP disponibles |
| ForoScraper | Nodos de extracción |

---

## Referencia

- Manifest: `.github/plugins/n8n-editor/manifest.md`
- Agentes: `.github/plugins/n8n-editor/agents/`
- Datos: `ARCHIVO/PLUGINS/N8N_EDITOR/`
- Submódulo: `alephscript-n8n-like-editor/`
