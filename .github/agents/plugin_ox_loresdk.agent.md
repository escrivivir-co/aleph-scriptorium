---
name: plugin_ox_loresdk
description: "Bridge: conecta VS Code con el SDK documental/editorial para-la-voz. En integration/beta/scriptorium opera sobre el SDK puro (feed, diff, merge, design, status) y solo usa @voz o catálogo cuando existe un lore activo."
argument-hint: "crear-voz | alimentar-corpus [editorial] | status | design | generar-poema [si hay lore activo] | publicar-catalogo [si hay docs/_poemas]"
tools: ['agent']
handoffs:
  - label: Listar capacidades del LoreSDK
    agent: plugin_ox_loresdk
    prompt: Lista los agentes y comandos disponibles en este plugin.
    send: false
  - label: Crear nueva Voz
    agent: LoreSDK
    prompt: "Prepara un lore/mod derivado del SDK: plantilla → corpus → /feed → /diff-corpus → /merge-corpus → /design. No asumas que el checkout actual ya tiene mod/, proyecto.config.md o @voz."
    send: false
  - label: Alimentar corpus
    agent: LoreSDK
    prompt: "Ciclo de alimentación del corpus: /feed → /diff-corpus → /merge-corpus."
    send: false
  - label: Generar poema
    agent: LoreSDK
    prompt: "Antes de generar poema, verifica si existen DocumentMachineSDK/proyecto.config.md, DocumentMachineSDK/mod/agents/voz.agent.md y DocumentMachineSDK/docs/_poemas/. Si faltan, explica que el checkout actual es SDK puro y que primero hay que preparar un lore activo."
    send: false
  - label: Ver estado del corpus
    agent: LoreSDK
    prompt: "Ejecuta /status si existe un corpus activo. Si no existe lore inicializado, informa que el checkout actual expone solo el SDK puro."
    send: false
  - label: Publicar catálogo
    agent: LoreSDK
    prompt: "Antes de publicar catálogo, verifica si existe DocumentMachineSDK/docs/_poemas/ y si hay un lore activo. Si no, informa que la publicación web es una capacidad condicional del lore derivado, no del SDK puro."
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
| `@bartleby` | `DocumentMachineSDK/.github/agents/bartleby.agent.md` | Analista de editoriales |
| `@archivero` | `DocumentMachineSDK/.github/agents/archivero.agent.md` | Gestor del corpus |
| `@cristalizador` | `DocumentMachineSDK/.github/agents/cristalizador.agent.md` | Diseñador de artefactos mod/ |
| `@portal` | `DocumentMachineSDK/.github/agents/portal.agent.md` | Interfaz adaptativa del SDK puro |
| `@voz` (lore activo) | `DocumentMachineSDK/mod/agents/voz.agent.md` | Generador desde corpus, solo si el lore/mod ya fue preparado |

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

### Generar poema (solo con lore activo)

```
@plugin_ox_loresdk
> Generar poema
```

→ Si existe `@voz`, usa corpus.md para crear texto desde las tensiones estructurales; si no existe, el bridge debe indicar que el checkout actual sigue en modo SDK puro

## Referencia

- Manifest: `.github/plugins/lore-sdk/manifest.md`
- Agentes: `.github/plugins/lore-sdk/agents/`
- Submódulo: `DocumentMachineSDK/`
- Datos runtime: `ARCHIVO/PLUGINS/LORE_SDK/`
- Backlog: `ARCHIVO/DISCO/BACKLOG_BORRADORES/LORE-SDK/`
