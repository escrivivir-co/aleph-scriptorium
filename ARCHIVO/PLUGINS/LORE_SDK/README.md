# Datos Runtime: LoreSDK

**Plugin**: `lore-sdk`  
**Submódulo**: `LoreSDK` (para-la-voz-sdk)  
**Bridge**: `@plugin_ox_loresdk`

---

## Propósito

Esta carpeta almacena datos **generados durante la ejecución** del plugin LoreSDK.  
El código del plugin está en `.github/plugins/lore-sdk/` (inmutable).

Los datos del corpus (editoriales, análisis, poemas) viven directamente en el submódulo `LoreSDK/`.

## Archivos Gestionados

| Archivo | Propósito | Creado por |
|---------|-----------|------------|
| `sessions/` | Registros de sesiones de análisis | @bartleby, @archivero |
| `logs/creation-log.json` | Historial de mods creados | /crear-voz |

## Convención

- **Código del plugin**: `.github/plugins/lore-sdk/` (kebab-case)
- **Bridge**: `.github/agents/plugin_ox_loresdk.agent.md`
- **Datos runtime**: `ARCHIVO/PLUGINS/LORE_SDK/` (SCREAMING_SNAKE_CASE)
- **Datos del corpus**: `LoreSDK/corpus/` (en el submódulo directamente)

---

## Referencias

- Plugin manifest: `.github/plugins/lore-sdk/manifest.md`
- Bridge: `.github/agents/plugin_ox_loresdk.agent.md`
- Submódulo: `LoreSDK/README-SCRIPTORIUM.md`
