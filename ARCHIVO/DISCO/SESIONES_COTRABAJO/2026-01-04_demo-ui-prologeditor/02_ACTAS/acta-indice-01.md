# Acta Intervención @indice: Corrección Índice de Plugins

## Metadatos

| Campo | Valor |
|-------|-------|
| **Agente** | @indice |
| **Tipo** | Intervención puntual (no turno de demo) |
| **Hora** | 2026-01-04 |
| **Archivo modificado** | `.vscode/settings.json` |

## Contexto

Durante la preparación de la demo, se detectó que el plugin `prolog-editor` **no estaba indexado** en `settings.json`. Esto significa que las instrucciones y prompts del plugin no estaban siendo cargados por VS Code Copilot.

## Problema Detectado

| Antes | Estado |
|-------|--------|
| Plugins indexados | 14 |
| Plugins desactivados (`false`) | 3 (typed-prompting, n8n-editor, flove-editor) |
| **prolog-editor** | ❌ **AUSENTE** |

Otros plugins ausentes:
- `blockly-editor`
- `wire-editor`
- `hypergraph-editor`
- `arg-board-app`
- `wiring-app`
- `novelist`
- `network`

## Corrección Aplicada

Sincronizado `settings.json` con los 22 plugins existentes en `.github/plugins/`:

```json
"chat.promptFilesLocations": {
    ".github/plugins/prolog-editor/prompts": true,
    // ... + 7 plugins más añadidos
}
"chat.instructionsFilesLocations": {
    ".github/plugins/prolog-editor/instructions": true,
    // ... + 7 plugins más añadidos
}
```

## Impacto en la Demo

| Aspecto | Antes | Después |
|---------|-------|---------|
| Instrucción `prolog-editor.instructions.md` | ❌ No cargada | ✅ Cargada |
| Prompts del plugin | ❌ No disponibles | ✅ Disponibles |
| Contexto MCP Stack | Parcial | Completo |

## Solicitud para @aleph

> **Incluir este cambio en el commit de la sesión de demo.**

El archivo modificado es:
- `.vscode/settings.json` — indexación completa de 22 plugins

## Estado

| Campo | Valor |
|-------|-------|
| Corrección aplicada | ✅ |
| Pendiente commit | ⏳ |
| Validación PO | Pendiente |

---

*@indice queda pendiente de confirmación del commit.*
