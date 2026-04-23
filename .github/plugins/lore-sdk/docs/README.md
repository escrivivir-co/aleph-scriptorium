# Plugin LoreSDK — Documentación

## Instalación

Plugin instalado como submódulo `DocumentMachineSDK` en el Scriptorium.

```bash
# Ya instalado via:
git submodule add -b integration/beta/scriptorium https://github.com/escrivivir-co/para-la-voz-sdk.git DocumentMachineSDK
```

## Configuración

### Requisitos externos

| Requisito | Versión | Instalación |
|-----------|---------|-------------|
| GitHub Copilot Chat | Última | `code --install-extension GitHub.copilot-chat` |
| Git | ≥2.28 | Incluido en sistema |
| Jekyll (para Pages) | Ruby 3.0+ | `bundle install` en `DocumentMachineSDK/docs/` |

### Variables de entorno

No requiere variables de entorno adicionales.

### Puertos

No expone servicios HTTP. Opera completamente en el chat de Copilot.

## Uso

### Punto de entrada rápido

```
@plugin_ox_loresdk
```

### Crear nueva Voz

```
/crear-voz
> Nombre del mod: ecosocialista
> Corriente: Marea Ecosocialista, mensual desde 2024
> Primer editorial: [texto completo]
```

### Alimentar corpus

```
/alimentar-corpus
> Nuevo editorial de 2026-03-01: [texto]
```

### Generar poema (solo con lore activo)

```
@voz genera un poema sobre la tensión entre arte y propaganda
```

### Publicar catálogo (solo con lore activo)

```
/publicar-catalogo
```

## Arquitectura

```
Plugin LoreSDK (Scriptorium)
├── .github/plugins/lore-sdk/          ← Plugin code (inmutable)
│   ├── manifest.md
│   ├── agents/lore-sdk.agent.md       ← Bridge + orquestador
│   ├── prompts/ (3 prompts)
│   ├── instructions/
│   └── docs/
│
├── .github/agents/plugin_ox_loresdk.agent.md ← Bridge VS Code
│
├── ARCHIVO/PLUGINS/LORE_SDK/          ← Runtime data
│
└── DocumentMachineSDK/                ← Submódulo (para-la-voz-sdk)
    ├── .github/agents/ (SDK puro)
    ├── .github/prompts/ (feed, diff, merge, design, status, universo)
    ├── proyecto.config.template.md
    └── docs/                         ← infraestructura base; el catálogo aparece con un lore activo
```

## Estado Actual En Scriptorium

El checkout integrado en `integration/beta/scriptorium` monta el SDK puro. No trae por defecto:
- `proyecto.config.md`
- `corpus/`
- `mod/agents/voz.agent.md`
- `docs/_poemas/`

Esos artefactos aparecen cuando se prepara un lore/mod derivado del SDK.

## Referencias

- Submódulo: `DocumentMachineSDK/README-SCRIPTORIUM.md`
- Manifest: `manifest.md`
- Bridge: `.github/agents/plugin_ox_loresdk.agent.md`
- Origen: `onfalo-asesor-sdk/PROYECTOS/BARTLEBY-MOVIDO.md`
- Backlog: `ARCHIVO/DISCO/BACKLOG_BORRADORES/LORE-SDK/`
