---
name: Crear Rutina
description: Crea una nueva rutina visual para un personaje.
mode: agent
tools: ['read', 'edit', 'agent']
---

# Crear Rutina

## Objetivo

Crear una nueva rutina de lógica visual para un personaje, inicializando workspace y configuración.

## Parámetros

- **personaje**: ID del personaje (obligatorio)
- **paleta**: ID de paleta a usar (opcional, se infiere de paradigma FIA)
- **triggers**: Lista de triggers (opcional, default: ["estadio_inicio"])

## Flujo

1. **Verificar personaje** en actores.json
2. **Determinar paleta**:
   - Si se especifica, usar esa paleta
   - Si no, consultar paradigma FIA y mapear a paleta
3. **Crear estructura**:
   - `ARCHIVO/PLUGINS/BLOCKLY_EDITOR/rutinas/{personaje}-rutina.js` (vacío inicial)
   - `ARCHIVO/PLUGINS/BLOCKLY_EDITOR/workspaces/{personaje}-workspace.xml` (template)
4. **Actualizar actores.json** con campo `rutina`
5. **Confirmar** y ofrecer abrir editor

## Mapeo Paradigma → Paleta

| Paradigma FIA | Paleta |
|---------------|--------|
| sbr | sbr |
| logica | logica |
| simbolica | simbolica |
| conexionista | conexionista |
| gramaticas | gramaticas |

## Estructura de Rutina Inicial

```json
{
  "rutina": {
    "tipo": "blockly-js",
    "archivo": "{personaje}-rutina.js",
    "paleta": "{paleta}",
    "triggers": ["estadio_inicio"],
    "version": "0.0.1"
  }
}
```

## Workspace Template (XML)

```xml
<xml xmlns="https://developers.google.com/blockly/xml">
  <!-- Bloque inicial de comentario -->
  <block type="text_print" x="20" y="20">
    <value name="TEXT">
      <shadow type="text">
        <field name="TEXT">Rutina de {personaje}</field>
      </shadow>
    </value>
  </block>
</xml>
```

## Output Esperado

```markdown
### Rutina creada: {personaje}

**Paleta**: {paleta}
**Triggers**: {lista}
**Archivos creados**:
- `rutinas/{personaje}-rutina.js`
- `workspaces/{personaje}-workspace.xml`

**actores.json actualizado** ✅

¿Abrir editor ahora? [Sí](prompt:abrir-editor) | No
```
