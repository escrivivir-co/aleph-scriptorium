---
name: Abrir Editor Blockly
description: Abre el editor visual para editar la lógica de un personaje.
mode: agent
tools: ['read', 'agent']
---

# Abrir Editor Blockly

## Objetivo

Abrir el editor de lógica visual para un personaje del Teatro.

## Parámetros

- **personaje**: ID del personaje (obligatorio)

## Flujo

1. **Verificar personaje existe** en actores.json
2. **Determinar paradigma** consultando recipe o asignación FIA
3. **Seleccionar paleta** correspondiente al paradigma
4. **Cargar workspace** si existe (XML anterior)
5. **Generar URL** del editor con parámetros
6. **Mostrar enlace** al usuario

## Verificaciones

- [ ] Personaje existe en `ARCHIVO/PLUGINS/ARG_BOARD/.arrakis/actores.json`
- [ ] Paleta existe en `ARCHIVO/PLUGINS/BLOCKLY_EDITOR/paletas/`
- [ ] Si hay workspace previo, cargarlo

## Ubicación del Editor

```
docs/teatro/blockly-editor.html?actor={id}&paleta={paleta}
```

## Output Esperado

```markdown
### Editor Blockly: {nombre}

**Paleta**: {paleta} ({paradigma})
**Workspace**: {nuevo|cargado de workspace.xml}

[Abrir Editor](docs/teatro/blockly-editor.html?actor={id}&paleta={paleta})

**Instrucciones**:
1. Arrastra bloques desde el toolbox izquierdo
2. Conecta bloques para formar la lógica
3. Usa "Guardar" para generar código JavaScript
4. Prueba con "Ejecutar" (modo sandbox)
```
