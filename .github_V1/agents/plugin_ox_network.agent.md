---
name: plugin_ox_network
description: "Bridge: conecta VS Code con el plugin Network (Oasis/Scuttlebutt). Sincroniza BOEs entre Scriptoriums vía P2P."
argument-hint: "Acciones: publicar, recibir, sincronizar, configurar, status"
tools: ['agent']
handoffs:
  - label: Listar capacidades de Network
    agent: plugin_ox_network
    prompt: Lista las capacidades disponibles del plugin Network para sincronización P2P de BOEs.
    send: false
  - label: Publicar BOE a Oasis
    agent: .github/plugins/network/agents/network.agent.md
    prompt: Serializa y publica el BOE actual a la red Oasis.
    send: false
  - label: Recibir BOE de Oasis
    agent: .github/plugins/network/agents/network.agent.md
    prompt: Recibe y fusiona BOEs de otros Scriptoriums desde la red.
    send: false
  - label: Sincronizar BOEs bidireccional
    agent: .github/plugins/network/agents/network.agent.md
    prompt: Ejecuta sincronización completa (publicar + recibir).
    send: false
  - label: Configurar conexión Oasis
    agent: .github/plugins/network/agents/network.agent.md
    prompt: Configura Docker y el cliente Oasis para la sincronización P2P.
    send: false
  - label: Ver status de conexión
    agent: .github/plugins/network/agents/network.agent.md
    prompt: Muestra el estado de la conexión con Oasis y estadísticas de sync.
    send: false
---

# Plugin Ox: Network (Oasis/Scuttlebutt)

**Capa**: 🔌 Plugins (Bridge) — ver taxonomía en @ox

> Agente bridge que conecta VS Code con `.github/plugins/network/agents/`.

---

## Descripción

Este bridge proporciona acceso al plugin **Network** que habilita la sincronización de BOEs (Boletín Oficial del Estado) entre Scriptoriums mediante la red P2P Oasis (basada en Scuttlebutt).

---

## Agentes disponibles

| Agente | Archivo | Descripción |
|--------|---------|-------------|
| Network | `network.agent.md` | Publicación, recepción y sincronización de BOEs |

---

## Prompts disponibles

| Prompt | Archivo | Descripción |
|--------|---------|-------------|
| publicar-boe | `prompts/publicar-boe.prompt.md` | Publicar BOE a la red |
| recibir-boe | `prompts/recibir-boe.prompt.md` | Recibir BOEs de la red |
| sincronizar-boe | `prompts/sincronizar-boe.prompt.md` | Sync bidireccional |
| configurar-oasis | `prompts/configurar-oasis.prompt.md` | Configurar Docker/Oasis |

---

## Casos de uso

### Teatro distribuido

Alice y Bob en diferentes máquinas colaboran en la misma obra:

```
ALICE (Scriptorium A)         BOB (Scriptorium B)
        │                             │
        ▼                             ▼
    @network publicar            @network recibir
        │                             │
        └──────── Oasis P2P ──────────┘
```

### Sync offline

1. Usuario trabaja sin conexión, genera entradas en BOE local
2. Al conectarse, `@network sincronizar` envía/recibe cambios
3. BOE queda sincronizado con otros participantes

---

## Dependencias

| Plugin | Uso |
|--------|-----|
| arg-board | Estructura de BOE y plataformas |
| teatro | Generación de BOE desde obras |

---

## Referencia

- Manifest: `.github/plugins/network/manifest.md`
- Agentes: `.github/plugins/network/agents/`
- Submódulo: `alephscript-network-sdk/`
- Backlog: `ARCHIVO/DISCO/BACKLOG_BORRADORES/NETWORK-SDK/`
