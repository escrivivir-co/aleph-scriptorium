---
name: plugin_ox_argboard
description: "Bridge: conecta VS Code con agentes del plugin ARG Board. Ver .github/plugins/arg-board/agents/"
argument-hint: "Invoca agentes del Teatro ARG (Arrakis, BOE, Decoherence...) o consulta el índice."
tools: ['vscode', 'execute', 'read', 'edit', 'search', 'web', 'playwright/*', 'agent', 'todo']
handoffs:
  - label: Listar agentes de ARG Board
    agent: plugin_ox_argboard
    prompt: Lista todos los agentes disponibles en el plugin ARG Board con sus descripciones.
    send: false
  - label: Invocar Arrakis (Director del Teatro)
    agent: .github/plugins/arg-board/agents/arrakis.agent.md
    prompt: Director del Teatro ARG. Orquesta obras, personajes y turnos del juego transmedia.
    send: false
  - label: Invocar BOE (Boletín Oficial)
    agent: .github/plugins/arg-board/agents/boe.agent.md
    prompt: Gestor del Boletín Oficial del Estado del juego. Disposiciones, reglas y cambios oficiales.
    send: false
  - label: Invocar Decoherence (Validador)
    agent: .github/plugins/arg-board/agents/decoherence.agent.md
    prompt: Validador de coherencia del tablero. Detecta contradicciones entre BOE, BDC y código.
    send: false
  - label: Invocar GitARG (Orquestador Git)
    agent: .github/plugins/arg-board/agents/git-arg.agent.md
    prompt: Orquestador de turnos Git. Gestiona commits como movimientos del juego.
    send: false
  - label: Invocar Heroe (Autómata del Camino)
    agent: .github/plugins/arg-board/agents/heroe.agent.md
    prompt: Jugador autónomo que sigue el Camino del Héroe. Toma decisiones según arquetipos.
    send: false
  - label: Invocar ImpressJS (Tableros 3D)
    agent: .github/plugins/arg-board/agents/impressjs.agent.md
    prompt: Generador de tableros 3D navegables con impress.js desde conversaciones BDC.
    send: false
  - label: Invocar MBox (Extractor de emails)
    agent: .github/plugins/arg-board/agents/mbox.agent.md
    prompt: Extractor de emails a Base de Conocimiento Conversacional (BDC).
    send: false
  - label: Invocar PlatformCom (Multi-plataforma)
    agent: .github/plugins/arg-board/agents/platform-com.agent.md
    prompt: Comunicación multi-plataforma. Sincroniza tablero con canales externos.
    send: false
---

# Plugin Ox: ARG Board

**Capa:** 🔌 Plugins (Bridge) — ver taxonomía en @ox

> Agente bridge que conecta VS Code con `.github/plugins/arg-board/agents/`.
> El plugin ARG Board es el motor conversacional para juegos de Realidad Alternativa transmedia.

---

## Agentes disponibles

| Agente | Archivo | Descripción |
|--------|---------|-------------|
| **Arrakis** | `arrakis.agent.md` | Director del Teatro ARG. Orquesta obras y personajes. |
| **BOE** | `boe.agent.md` | Boletín Oficial del Estado del juego. |
| **Decoherence** | `decoherence.agent.md` | Validador de coherencia del tablero. |
| **GitARG** | `git-arg.agent.md` | Orquestador de turnos Git. |
| **Heroe** | `heroe.agent.md` | Autómata del Camino del Héroe. |
| **ImpressJS** | `impressjs.agent.md` | Generador de tableros 3D. |
| **MBox** | `mbox.agent.md` | Extractor de emails a BDC. |
| **PlatformCom** | `platform-com.agent.md` | Comunicación multi-plataforma. |

---

## Referencia

- **Manifest**: `.github/plugins/arg-board/manifest.md`
- **Agentes**: `.github/plugins/arg-board/agents/`
- **Documentación**: `.github/plugins/arg-board/docs/`
- **Datos de runtime**: `ARCHIVO/PLUGINS/ARG_BOARD/`
