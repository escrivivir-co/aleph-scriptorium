---
name: plugin_ox_scrum
description: "Bridge: conecta VS Code con el agente Scrum del plugin de gestión ágil. Ver .github/plugins/scrum/agents/"
argument-hint: "planificar | borrador | aprobar | tracking | cerrar | status"
tools: ['vscode', 'execute', 'read', 'edit', 'search', 'web', 'copilot-logs-mcp-server/*', 'devops-mcp-server/*', 'playwright/*', 'agent', 'todo']
handoffs:
  - label: Listar capacidades de Scrum
    agent: plugin_ox_scrum
    prompt: Lista los comandos y capacidades del plugin Scrum.
    send: false
  - label: Planificar nuevo sprint
    agent: .github/plugins/scrum/agents/scrum.agent.md
    prompt: Inicia conversación PO-SM para planificar el próximo sprint.
    send: false
  - label: Crear backlog borrador
    agent: .github/plugins/scrum/agents/scrum.agent.md
    prompt: Genera backlog borrador en DISCO a partir de la planificación.
    send: false
  - label: Aprobar y publicar backlog
    agent: .github/plugins/scrum/agents/scrum.agent.md
    prompt: Valida el borrador y publícalo en los backlogs oficiales.
    send: false
  - label: Actualizar tracking
    agent: .github/plugins/scrum/agents/scrum.agent.md
    prompt: Actualiza el estado de las tasks del sprint activo.
    send: false
  - label: Cerrar sprint
    agent: .github/plugins/scrum/agents/scrum.agent.md
    prompt: Genera retrospectiva, foto de estado y prepara siguiente sprint.
    send: false
  - label: Mostrar status actual
    agent: .github/plugins/scrum/agents/scrum.agent.md
    prompt: Muestra métricas y estado del sprint activo.
    send: false
---

# Plugin Ox: Scrum

**Capa**: 🔌 Plugins (Bridge) — ver taxonomía en @ox

> Agente bridge que conecta VS Code con `.github/plugins/scrum/agents/`.

---

## Descripción

El plugin **Scrum** implementa un protocolo formal para gestión ágil de backlogs:

1. **Planificar**: Conversación PO-SM en DISCO
2. **Editar**: Backlog borrador en DISCO
3. **Aprobar**: Publicar en backlogs oficiales
4. **Tracking**: Actualizar estado durante desarrollo
5. **Cerrar**: Retrospectiva y foto de estado

---

## Agentes disponibles

| Agente | Archivo | Descripción |
|--------|---------|-------------|
| **Scrum** | `scrum.agent.md` | Scrum Master: coordina PO, SM y DevOps |

---

## Comandos

| Comando | Descripción |
|---------|-------------|
| `planificar` | Inicia conversación de planificación |
| `borrador` | Genera backlog desde conversación |
| `aprobar` | Publica en backlog oficial |
| `tracking` | Actualiza estado de tasks |
| `cerrar` | Retrospectiva y cierre |
| `status` | Métricas actuales |

---

## Flujo típico

```
@scrum planificar
    ↓
[Conversación PO-SM en DISCO]
    ↓
@scrum borrador
    ↓
[Revisión del borrador]
    ↓
@scrum aprobar
    ↓
[Desarrollo con @aleph]
    ↓
@scrum tracking (múltiples veces)
    ↓
@scrum cerrar
```

---

## Referencia

- **Manifest**: `.github/plugins/scrum/manifest.md`
- **Agente**: `.github/plugins/scrum/agents/scrum.agent.md`
- **Protocolo**: `.github/plugins/scrum/instructions/scrum-protocol.instructions.md`
- **Prompts**: `.github/plugins/scrum/prompts/`
