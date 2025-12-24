---
name: WiringApp Context
description: "Contexto y reglas para el plugin WiringApp (flows tipo wiki-racer)"
applyTo: "ARCHIVO/PLUGINS/WIRING_APP/**/*.json, wiki-racer/**/*"
---

# Instrucciones: WiringApp

## Contexto

WiringApp extiende WireEditor con templates y patrones para flows de juegos de navegación, usando wiki-racer como ejemplo canónico.

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
