---
id: lore-sdk
name: "LoreSDK — SDK Editorial para Voces"
version: "1.0.0"
description: "Plugin para analizar corrientes ideológicas desde para-la-voz. En integration/beta/scriptorium monta el SDK puro; @voz y el catálogo son capacidades condicionadas a un lore/mod activo."
author: "Aleph Scriptorium"
license: "AIPL v1.0"

scriptorium_version: ">=0.0.1"
dependencies: []
optional_dependencies:
  - consejo-asesor
  - gh-pages
  - agent-creator

submodule: "DocumentMachineSDK"

agents:
  - name: "LoreSDK"
    file: "agents/lore-sdk.agent.md"
    description: "Orquesta el SDK editorial: análisis de corpus, cristalización de voces, generación poética"

prompts:
  - name: "crear-voz"
    file: "prompts/crear-voz.prompt.md"
    description: "Scaffold de un lore/mod derivado del SDK: plantilla → corpus → /design → cristalización opcional de @voz"
  - name: "alimentar-corpus"
    file: "prompts/alimentar-corpus.prompt.md"
    description: "Ciclo completo: /feed → /diff-corpus → /merge-corpus"
  - name: "publicar-catalogo"
    file: "prompts/publicar-catalogo.prompt.md"
    description: "Jekyll: borradores → publicados → commit → GitHub Pages"

instructions:
  - name: "lore-sdk"
    file: "instructions/lore-sdk.instructions.md"
    description: "Reglas de integración del SDK editorial con el Scriptorium"

handoffs:
  - label: "Crear nueva Voz"
    agent: "LoreSDK"
    prompt: "Scaffolding de nueva Voz (mod): corriente ideológica → corpus inicial → @cristalizador → @voz."
  - label: "Alimentar corpus"
    agent: "LoreSDK"
    prompt: "Ciclo completo de alimentación: /feed → /diff-corpus → /merge-corpus."
  - label: "Publicar catálogo"
    agent: "LoreSDK"
    prompt: "Publica el catálogo de poemas en Jekyll GitHub Pages."
---

# Plugin: LoreSDK — SDK Editorial para Voces

Plugin para **analizar corrientes ideológicas** desde el SDK para-la-voz y, cuando existe un lore activo, cristalizar Voces que generan texto desde un corpus, no sobre él.

---

## Propósito

Permite que cualquier editorial, colectivo o corriente ideológica tenga un **agente @voz** que hable exactamente como habla el corpus, con sus mecanismos retóricos, su vocabulario obligatorio y sus tensiones estructurales.

### Casos de uso

1. **Nueva corriente**: Analizar publicaciones de un colectivo → identificar su nick → cristalizar @voz
2. **Alimentación mensual**: Cada nuevo editorial enriquece el corpus y actualiza las capacidades de @voz
3. **Publicación web**: Catálogo de poemas en Jekyll GitHub Pages

---

## Arquitectura

```
Plugin LoreSDK
├── Analizador (@bartleby)       →  editorial → informe 5 secciones
├── Gestor corpus (@archivero)   →  /diff-corpus, /merge-corpus
├── Diseñador (@cristalizador)   →  artefactos para lore activo
├── Interfaz (@portal)           →  subsumption según perfil lector
└── Generador (@voz, opcional)   →  texto desde corpus, solo en lore activo
```

### Patrón main → mod

```
main (SDK puro)         mod/[nick] (lore + datos)
    │                        ▲
    └── git pull ────────────┘
         (herencia unidireccional, nunca PR de vuelta)
```

---

## Integración con Submódulo

- **Submódulo**: `DocumentMachineSDK`
- **Repo**: `https://github.com/escrivivir-co/para-la-voz-sdk.git`
- **Rama**: `integration/beta/scriptorium`
- **Modo actual**: checkout del SDK puro; el lore activo se prepara aparte
- **README integración**: `DocumentMachineSDK/README-SCRIPTORIUM.md`

## Estado Actual En Scriptorium

- El checkout integrado en `integration/beta/scriptorium` monta el SDK puro de `DocumentMachineSDK`.
- Los agentes disponibles de forma directa son `@bartleby`, `@archivero`, `@cristalizador`, `@portal` y `@dramaturgo`.
- Las rutas `proyecto.config.md`, `corpus/`, `guiones/`, `mod/` y `docs/_poemas/` solo aparecen cuando se prepara un lore/mod derivado del SDK.

---

## Relaciones con otros plugins

| Plugin | Relación |
|--------|----------|
| `consejo-asesor` | Origen de los proyectos ONFALO; puede orquestar análisis más amplios |
| `gh-pages` | Publicación del catálogo Jekyll en GitHub Pages |
| `agent-creator` | Patrón análogo de especialización de agentes desde corpus |

---

## Uso

```
@plugin_ox_loresdk              → Bridge principal
/crear-voz                      → Nueva Voz desde cero
/alimentar-corpus               → Ciclo feed→diff→merge
/publicar-catalogo              → Deploy Jekyll
```
