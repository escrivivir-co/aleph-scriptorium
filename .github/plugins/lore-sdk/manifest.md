---
id: lore-sdk
name: "LoreSDK — SDK Editorial para Voces"
version: "1.0.0"
description: "Plugin para analizar corrientes ideológicas y cristalizar Voces que generan poemas desde un corpus. Patrón main→mod: SDK puro + mods de lore específicos."
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
    description: "Scaffold de nueva Voz (mod): corriente → corpus → @cristalizador → @voz"
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

Plugin para **analizar corrientes ideológicas y cristalizar Voces** que generan poemas desde un corpus, no sobre él.

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
├── Diseñador (@cristalizador)   →  mod/agents/voz, mod/instructions/
├── Interfaz (@portal-editorial) →  subsumption según perfil lector
└── Generador (@voz)             →  poema desde corpus, no sobre él
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
- **README integración**: `DocumentMachineSDK/README-SCRIPTORIUM.md`

---

## Mod activo: restitutiva (PARA LA VOZ)

- Nick: `restitutiva` — marxismo-leninismo ortodoxo post-soviético
- 4 editoriales procesadas, corpus estable, @voz cristalizada
- Subsumption protocol: tecnología invisible bajo nombre "la aplicación"

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
