---
name: plugin_ox_loresdk
description: "Bridge: conecta VS Code con agentes del SDK editorial para-la-voz. Analiza corrientes ideológicas, cristaliza Voces y genera poemas desde corpus. Ver .github/plugins/lore-sdk/agents/"
argument-hint: "crear-voz | alimentar-corpus [editorial] | generar-poema [tensión] | publicar-catalogo | status | abrir-mod [nombre]"
tools: ['agent']
handoffs:
  - label: Listar capacidades del LoreSDK
    agent: plugin_ox_loresdk
    prompt: Lista los agentes y comandos disponibles en este plugin.
    send: false
  - label: Crear nueva Voz
    agent: LoreSDK
    prompt: "Scaffolding de nueva Voz (mod): corriente ideológica → corpus → @cristalizador → @voz."
    send: false
  - label: Alimentar corpus
    agent: LoreSDK
    prompt: "Ciclo de alimentación del corpus: /feed → /diff-corpus → /merge-corpus."
    send: false
  - label: Generar poema
    agent: LoreSDK
    prompt: "Genera un poema usando @voz en el mod activo. Lee LoreSDK/mod/agents/voz.agent.md."
    send: false
  - label: Ver estado del corpus
    agent: LoreSDK
    prompt: "Ejecuta /status en el mod activo."
    send: false
  - label: Publicar catálogo
    agent: LoreSDK
    prompt: "Publica poemas en Jekyll GitHub Pages."
    send: false
---

# Plugin Ox: LoreSDK

**Capa:** 🔌 Plugins (Bridge) — ver taxonomía en @ox

> Agente bridge que conecta VS Code con `.github/plugins/lore-sdk/agents/`.

## Agentes disponibles

| Agente | Archivo | Descripción |
|--------|---------|-------------|
| `LoreSDK` | `agents/lore-sdk.agent.md` | Orquestador del SDK editorial |

## Agentes del Submódulo (delegados)

| Agente | En submódulo | Descripción |
|--------|-------------|-------------|
| `@bartleby` | `LoreSDK/.github/agents/bartleby.agent.md` | Analista de editoriales |
| `@archivero` | `LoreSDK/.github/agents/archivero.agent.md` | Gestor del corpus |
| `@cristalizador` | `LoreSDK/.github/agents/cristalizador.agent.md` | Diseñador de artefactos mod/ |
| `@portal-editorial` | `LoreSDK/.github/agents/portal-editorial.agent.md` | Interfaz adaptativa |
| `@voz` (mod) | `LoreSDK/mod/agents/voz.agent.md` | Generador poético |

## Casos de Uso

### Analizar una nueva corriente ideológica

```
@plugin_ox_loresdk
> Crear nueva Voz
```

→ Scaffold del mod, análisis de primer editorial, cristalización de @voz

### Alimentar el corpus mensualmente

```
@plugin_ox_loresdk
> Alimentar corpus
[pegar editorial]
```

→ @bartleby analiza → @archivero integra → corpus.md actualizado

### Generar poema

```
@plugin_ox_loresdk
> Generar poema
```

→ @voz usa corpus.md para crear poema desde tensiones estructurales

## Referencia

- Manifest: `.github/plugins/lore-sdk/manifest.md`
- Agentes: `.github/plugins/lore-sdk/agents/`
- Submódulo: `LoreSDK/`
- Datos runtime: `ARCHIVO/PLUGINS/LORE_SDK/`
- Backlog: `ARCHIVO/DISCO/BACKLOG_BORRADORES/LORE-SDK/`
