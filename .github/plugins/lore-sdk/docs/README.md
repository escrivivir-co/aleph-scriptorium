# Plugin LoreSDK — Documentación

## Instalación

Plugin instalado como submódulo `LoreSDK` en el Scriptorium.

```bash
# Ya instalado via:
git submodule add -b main https://github.com/escrivivir-co/para-la-voz-sdk.git LoreSDK
```

## Configuración

### Requisitos externos

| Requisito | Versión | Instalación |
|-----------|---------|-------------|
| GitHub Copilot Chat | Última | `code --install-extension GitHub.copilot-chat` |
| Git | ≥2.28 | Incluido en sistema |
| Jekyll (para Pages) | Ruby 3.0+ | `bundle install` en `LoreSDK/docs/` |

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

### Generar poema

```
@voz genera un poema sobre la tensión entre arte y propaganda
```

### Publicar catálogo

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
└── LoreSDK/                           ← Submódulo (para-la-voz-sdk)
    ├── .github/agents/ (4 core)
    ├── .github/prompts/ (6 commands)
    ├── corpus/
    ├── mod/
    └── docs/
```

## Mod Activo: restitutiva

El submódulo ya incluye un mod activo (`mod/restitutiva`) con:
- 4 editoriales procesadas del magazine PARA LA VOZ
- Nick `restitutiva` confirmado ×4
- `@voz` cristalizada y operativa
- Catálogo Jekyll configurado en `docs/`

## Referencias

- Submódulo: `LoreSDK/README-SCRIPTORIUM.md`
- Manifest: `manifest.md`
- Bridge: `.github/agents/plugin_ox_loresdk.agent.md`
- Origen: `onfalo-asesor-sdk/PROYECTOS/BARTLEBY-MOVIDO.md`
- Backlog: `ARCHIVO/DISCO/BACKLOG_BORRADORES/LORE-SDK/`
