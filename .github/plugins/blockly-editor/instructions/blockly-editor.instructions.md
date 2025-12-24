---
name: Blockly Editor Context
description: Contexto y reglas para el editor de lógica visual Blockly en el Scriptorium.
applyTo: "ARCHIVO/PLUGINS/BLOCKLY_EDITOR/**/*.json, .github/plugins/blockly-editor/**/*.md"
---

# Instrucciones: Plugin Blockly Editor

> **Fuente de verdad**: `.github/plugins/blockly-editor/manifest.md`  
> **Submódulo**: `blockly-alephscript-sdk`

---

## Propósito

El plugin Blockly Editor permite **programación visual** de lógica para agentes-personaje. Traduce diagramas de bloques en código JavaScript ejecutable en el Teatro.

---

## Conceptos Clave

### 1. Paleta

Una **paleta** es una colección de bloques agrupados por paradigma FIA:

```
ARCHIVO/PLUGINS/BLOCKLY_EDITOR/paletas/
├── sbr.json           # Sistemas Basados en Reglas
├── logica.json        # Lógica Formal
├── simbolica.json     # IA Simbólica
└── conexionista.json  # Redes Neuronales
```

Cada paleta define:
- Bloques disponibles
- Generadores JavaScript
- Configuración de toolbox

### 2. Rutina

Una **rutina** es código JavaScript generado desde bloques:

```
ARCHIVO/PLUGINS/BLOCKLY_EDITOR/rutinas/
├── tarotista-rutina.js
├── nonsi-rutina.js
└── ...
```

El código se ejecuta en triggers específicos (estadio_inicio, interaccion, etc.)

### 3. Workspace

Un **workspace** es el estado del editor (bloques y conexiones):

```
ARCHIVO/PLUGINS/BLOCKLY_EDITOR/workspaces/
├── tarotista-workspace.xml
└── ...
```

Permite restaurar el editor para editar la rutina.

---

## Reglas de Integración

### R1: Correspondencia Paleta-Paradigma

- Cada paleta DEBE corresponder a un paradigma de `as-gym/fia-catalog.json`
- El campo `afinidad_banderas` del paradigma sugiere qué bandera audita la rutina:
  - SBR → @blackflag (reglas de poder)
  - Lógica → @blueflag (verdad formal)
  - Simbólica → @aleph (producción)

### R2: Campo `rutina` en actores.json

Todo personaje con rutina DEBE tener:

```json
{
  "rutina": {
    "tipo": "blockly-js",      // Siempre "blockly-js" para este plugin
    "archivo": "nombre.js",    // Relativo a rutinas/
    "paleta": "sbr",           // ID de paleta usada
    "triggers": [],            // Lista de triggers activos
    "version": "1.0.0"         // Semver de la rutina
  }
}
```

### R3: Triggers Válidos

Solo estos triggers están soportados en v1.0.0:

| Trigger | Descripción |
|---------|-------------|
| `estadio_inicio` | Al entrar en estadio del monomito |
| `interaccion_usuario` | Al hacer clic en personaje |
| `temporizador` | Cada N ms (requiere campo extra) |

### R4: Sandbox de Ejecución

El código generado se ejecuta en sandbox:
- Sin acceso a `window`, `document` directo
- API limitada vía objeto `contexto`
- Tiempo máximo de ejecución: 5000ms

---

## Estructura de Archivos

```
.github/plugins/blockly-editor/         # CÓDIGO (inmutable)
├── manifest.md
├── agents/
│   └── blockly-editor.agent.md
├── prompts/
│   ├── abrir-editor.prompt.md
│   ├── crear-rutina.prompt.md
│   ├── guardar-rutina.prompt.md
│   └── asignar-paleta.prompt.md
├── instructions/
│   └── blockly-editor.instructions.md
└── docs/
    └── README.md

ARCHIVO/PLUGINS/BLOCKLY_EDITOR/          # DATOS (mutable)
├── README.md
├── paletas/
│   ├── sbr.json
│   └── ...
├── rutinas/
│   ├── tarotista-rutina.js
│   └── ...
└── workspaces/
    ├── tarotista-workspace.xml
    └── ...
```

---

## API del Runtime

El código generado tiene acceso a:

```javascript
// Objeto contexto inyectado por blockly-runtime.js
const contexto = {
  // Estado actual
  estadio: 3,                    // Número de estadio (1-12)
  actor: { id, nombre, avatar }, // Datos del personaje
  obra: { id, titulo },          // Datos de la obra
  
  // Métodos disponibles
  emitir: (evento, datos) => {}, // Emitir evento a la obra
  esperar: async (evento) => {}, // Esperar evento
  log: (mensaje) => {},          // Registrar en consola
  alerta: (mensaje) => {},       // Mostrar mensaje al usuario
  
  // Estado mutable
  memoria: {},                   // Persistente entre ejecuciones
};
```

---

## Bloques SBR (v1.0.0)

### Bloques de Condición

| Bloque | Genera |
|--------|--------|
| `sbr_si_entonces` | `if (condicion) { ... }` |
| `sbr_condicion_estadio` | `contexto.estadio === N` |
| `sbr_condicion_memoria` | `contexto.memoria.X === valor` |
| `sbr_y` | `cond1 && cond2` |
| `sbr_o` | `cond1 \|\| cond2` |

### Bloques de Acción

| Bloque | Genera |
|--------|--------|
| `sbr_emitir_evento` | `contexto.emitir('evento', datos)` |
| `sbr_guardar_memoria` | `contexto.memoria.X = valor` |
| `sbr_alerta` | `contexto.alerta('mensaje')` |
| `sbr_log` | `contexto.log('mensaje')` |

---

## Lo que NO hacer

- **No ejecutar** código fuera del sandbox
- **No guardar** rutinas sin validar triggers
- **No mezclar** paletas en un mismo workspace
- **No omitir** el campo `version` en rutinas
- **No acceder** directamente a `window` o `document`

---

## Referencias

- Submódulo: `blockly-alephscript-sdk/`
- Plugin AGENT_CREATOR: `.github/plugins/agent-creator/`
- Plugin TEATRO: `.github/plugins/teatro/`
- FIA Catalog: `as-gym/fia-catalog.json`
