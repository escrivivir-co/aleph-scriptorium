# Plugin Blockly Editor — Datos de Runtime

> **Fuente de verdad código**: `.github/plugins/blockly-editor/`  
> **Submódulo**: `blockly-alephscript-sdk`

---

## Propósito

Esta carpeta almacena los **datos mutables** del plugin Blockly Editor:
- Definiciones de paletas
- Rutinas generadas (código JavaScript)
- Workspaces (estado del editor en XML)

---

## Estructura

```
ARCHIVO/PLUGINS/BLOCKLY_EDITOR/
├── README.md           ← Este archivo
├── paletas/            # Definiciones de paletas de bloques
│   └── sbr.json        # Paleta SBR (MVP)
├── rutinas/            # Código JavaScript generado
│   └── {personaje}-rutina.js
└── workspaces/         # Estado del editor (XML)
    └── {personaje}-workspace.xml
```

---

## Paletas

Cada paleta es un archivo JSON que define:

```json
{
  "id": "sbr",
  "nombre": "Sistemas Basados en Reglas",
  "paradigma_fia": "sbr",
  "descripcion": "Bloques IF-THEN para lógica condicional",
  "bloques": [
    {
      "type": "sbr_si_entonces",
      "category": "Condiciones"
    }
  ],
  "toolbox": { ... }
}
```

---

## Rutinas

Código JavaScript generado desde bloques:

```javascript
// Rutina: tarotista
// Paleta: sbr
// Generado: 2025-01-15T10:00:00Z
// Version: 0.1.0

(function(contexto) {
  "use strict";
  
  if (contexto.estadio === 1) {
    contexto.emitir('saludo', { mensaje: 'Bienvenido al Teatro' });
  }
  
})(contexto);
```

---

## Workspaces

XML del estado del editor Blockly:

```xml
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="sbr_si_entonces" x="20" y="20">
    <!-- ... -->
  </block>
</xml>
```

---

## Integración con actores.json

El campo `rutina` en cada actor referencia archivos de esta carpeta:

```json
{
  "id": "tarotista",
  "rutina": {
    "tipo": "blockly-js",
    "archivo": "tarotista-rutina.js",
    "paleta": "sbr",
    "triggers": ["estadio_inicio"],
    "version": "0.1.0"
  }
}
```

---

## Referencias

- Plugin: `.github/plugins/blockly-editor/manifest.md`
- Submódulo: `blockly-alephscript-sdk/`
- Bridge: `.github/agents/plugin_ox_blocklyeditor.agent.md`
