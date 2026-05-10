---
name: WiringApp Context
description: "Contexto y reglas para el plugin WiringApp (flows tipo wiki-racer)"
applyTo: "ARCHIVO/PLUGINS/WIRING_APP/**/*.json, WiringAppHypergraphEditor/**/*"
---

# Instrucciones: WiringApp

> **Fuente de verdad**: `ARCHIVO/PLUGINS/WIRING_APP/` y `WiringAppHypergraphEditor/`
> **Submódulo**: `WiringAppHypergraphEditor` (wiki-racer)
> **Dependencia**: `wire-editor` (primero setup Node-RED)

## Contexto

WiringApp extiende WireEditor con templates y patrones para flows de juegos de navegación, usando wiki-racer como ejemplo canónico.

---

## Fases de Trabajo del Agente

El agente @wiring-app complementa a @wire-editor:

### Fase 1: Prerequisitos

| Handoff | Descripción |
|---------|-------------|
| `@wiring-app verificar wire-editor` | Confirma que Node-RED está instalado |
| `@wiring-app instalar wiki-racer` | Instala nodo game |

**Instalación del nodo wiki-racer**:
```bash
cd ~/.node-red
npm install /path/to/WiringAppHypergraphEditor/node-red-contrib-wikir-racer
```

### Fase 2: Templates

| Handoff | Descripción |
|---------|-------------|
| `@wiring-app cargar template` | Importa flow.json de wiki-racer |
| `@wiring-app listar templates` | Muestra templates disponibles |

### Fase 3: Edición

| Handoff | Descripción |
|---------|-------------|
| `@wiring-app crear juego {nombre}` | Nuevo flow basado en template |
| `@wiring-app modificar estados` | Edita máquina de estados |

### Fase 4: Ejecución

| Handoff | Descripción |
|---------|-------------|
| `@wiring-app iniciar partida` | Despliega y ejecuta flow |
| `@wiring-app abrir dashboard` | Abre UI del juego en 1880/ui |

---

## Estructura del Submódulo

```
WiringAppHypergraphEditor/
├── node-red-contrib-wikir-racer/   # Nodo para Node-RED
│   ├── flow.json                   # Template completo (1680 líneas)
│   ├── game.js                     # Implementación del nodo
│   ├── game.html                   # UI del nodo en editor
│   └── package.json                # Registro del nodo
├── src/                            # Motor lógica FIA
│   ├── estado.ts                   # Máquina de estados
│   └── index.ts                    # Entry point
└── CRIPTA/                         # Datos persistidos de partidas
```

---

## Estructura del Flow Wiki-Racer

El flow de wiki-racer tiene estas secciones:

```
┌─────────────────────────────────────────────────┐
│                 CONFIGURACIÓN                    │
│  ui_form → inject → game (configurar partida)   │
└─────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────┐
│                   MOTOR DE JUEGO                 │
│  game → switch → function (estados/transiciones)│
└─────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────┐
│                   INTERFAZ                       │
│  ui_text, ui_button (mostrar estado, acciones)  │
└─────────────────────────────────────────────────┘
```

## Estados del Juego

Los estados vienen de `wiki-racer/src/estado.ts`:

| Estado | Significado | Siguiente |
|--------|-------------|-----------|
| NoIniciado | Esperando configuración | Iniciado |
| Iniciado | Partida en curso | Esperando, Acabado |
| Esperando | Esperando input del jugador | Iniciado, Reintentar |
| Reintentar | Volver atrás | Esperando |
| Acabado | Partida terminada | NoIniciado |

## Reglas de Integración

1. **Templates en `ARCHIVO/PLUGINS/WIRING_APP/templates/`**
2. **Flows de usuario en `ARCHIVO/PLUGINS/WIRING_APP/flows/`**
3. **Nodos personalizados documentados en manifest.md**
4. **Exportación genera JSON compatible con Node-RED 2.x+**

## Lo que NO hacer

- No modificar el template original (crear copia)
- No usar nodos deprecated de dashboard
- No asumir versión específica de Node-RED sin verificar
