---
name: Blockly Editor Context
description: Contexto y reglas para el editor de lógica visual Blockly en el Scriptorium.
applyTo: "ARCHIVO/PLUGINS/BLOCKLY_EDITOR/**/*.json, .github/plugins/blockly-editor/**/*.md"
---

# Instrucciones: Plugin Blockly Editor

> **Fuente de verdad**: `.github/plugins/blockly-editor/manifest.md`  
> **Submódulo**: `BlocklyEditor` (blockly-alephscript-sdk)

---

## Propósito

El plugin Blockly Editor permite **programación visual** de lógica para agentes-personaje. Traduce diagramas de bloques en código JavaScript ejecutable en el Teatro.

---

## Fases de Trabajo

### Fase 1: Setup

| Task | Comando | Resultado |
|------|---------|-----------|
| `BLE: Setup` | `scripts/setup-blockly.sh` | Dependencias + build completo |
| `npm run install:all` | En BlocklyEditor/ | Solo dependencias |
| `npm run build:all` | En BlocklyEditor/ | Build de todos los paquetes |

**Prerequisitos**:
- Node.js 18+
- Angular CLI recomendado (usa npx si no está)

### Fase 2: Desarrollo

| Task | Puerto | Descripción |
|------|--------|-------------|
| `BLE: Start [Editor]` | 4200 | Angular 19 con hot-reload |
| `BLE: Start [Runtime]` | 4300 | Ejecución de rutinas |
| `BLE: Health Check` | — | Verifica ambos servicios |

**Comandos directos**:
```bash
cd BlocklyEditor
npm run dev:ui       # Editor (4200)
npm run dev:runtime  # Runtime (4300)
```

### Fase 3: Edición de Rutinas

1. **Abrir editor**: http://localhost:4200
2. **Seleccionar paleta**: sbr, logica, simbolica, conexionista
3. **Arrastrar bloques**: Desde toolbox al workspace
4. **Conectar bloques**: Formar secuencias lógicas
5. **Guardar**: Genera .js en rutinas/ y .xml en workspaces/

### Fase 4: Ejecución

1. **Abrir runtime**: http://localhost:4300
2. **Cargar rutina**: Seleccionar .js generado
3. **Ejecutar**: Con contexto simulado
4. **Depurar**: Ver logs y estado de memoria

---

## Estructura del Submódulo

```
BlocklyEditor/                         # Submódulo #16
├── package.json                       # Scripts: install:all, build:all, dev:ui
├── packages/
│   ├── blockly-alephscript-blocks/   # 6 categorías de bloques
│   │   ├── src/
│   │   │   ├── blocks/               # Definiciones de bloques
│   │   │   └── generators/           # Generadores JavaScript
│   │   └── package.json
│   ├── blockly-gamify-ui/            # Editor Angular 19 (puerto 4200)
│   │   ├── src/app/
│   │   │   ├── blockly/              # Componentes Blockly
│   │   │   └── services/             # Servicios de workspace
│   │   └── angular.json
│   └── blockly-runtime-gamify-ui/    # Runtime UI (puerto 4300)
│       └── src/app/
└── examples/                          # Workspaces de ejemplo
```

---

## Paquetes del SDK

### blockly-alephscript-blocks

6 categorías de bloques específicos para AlephScript:

| Categoría | Descripción | Ejemplo de bloque |
|-----------|-------------|-------------------|
| `sbr` | Sistemas Basados en Reglas | sbr_si_entonces, sbr_condicion_estadio |
| `logica` | Lógica Formal | logica_cuantificador, logica_predicado |
| `simbolica` | IA Simbólica | simbolica_patron, simbolica_inferir |
| `conexionista` | Redes Neuronales | conexionista_capa, conexionista_activacion |
| `teatro` | Integración Teatro | teatro_emitir, teatro_estadio |
| `common` | Utilidades comunes | common_log, common_alerta |

### blockly-gamify-ui

Editor visual Angular 19 con:
- Toolbox configurable por paleta
- Workspace persistente (localStorage)
- Export/Import de workspaces XML
- Generación de código JavaScript
- Preview del código generado

### blockly-runtime-gamify-ui

Entorno de ejecución con:
- Sandbox seguro (sin acceso DOM directo)
- Contexto inyectado para Teatro
- Depuración paso a paso
- Visualización de memoria

---

## Handoffs

| Origen | Destino | Cuándo |
|--------|---------|--------|
| `@plugin_ox_blocklyeditor` | `@plugin_ox_teatro` | Rutina lista para asignar a personaje |
| `@plugin_ox_blocklyeditor` | `@plugin_ox_agentcreator` | Crear personaje con rutina embebida |
| `@plugin_ox_teatro` | `@plugin_ox_blocklyeditor` | Editar rutina de personaje existente |
| `@plugin_ox_prologeditor` | `@plugin_ox_blocklyeditor` | Visualizar reglas Prolog como bloques |

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
