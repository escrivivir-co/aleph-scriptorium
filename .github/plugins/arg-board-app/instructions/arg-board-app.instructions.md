---
name: ArgBoardApp Context
description: "Contexto y reglas para el plugin ArgBoardApp (obras de navegación wiki-racer)"
applyTo: "ARCHIVO/PLUGINS/ARG_BOARD_APP/**/*.yaml, wiki-racer/src/**/*"
---

# Instrucciones: ArgBoardApp

## Contexto

ArgBoardApp implementa wiki-racer como motor de obras interactivas para el Teatro ARG. Combina la máquina de estados del juego con la visualización impress.js del Teatro.

## Máquina de Estados

Los estados vienen de `wiki-racer/src/estado.ts`:

```typescript
export enum Etapa {
  NoIniciado = "NoIniciado",  // Lobby, esperando configuración
  Reintentar = "Reintentar",  // Backtrack, volver atrás
  Iniciado = "Iniciado",      // Partida en curso
  Acabado = "Acabado",        // Victoria o derrota
  Esperando = "Esperando"     // Esperando input del usuario
}
```

## Errores del Motor

```typescript
export enum Error {
  SinDatos = "SinDatos",
  NoEncontrado = "NoEncontrado",
  FaltanPropiedades = "FaltanPropiedades",
  CaminoSinSalida = "CaminoSinSalida",
  Exito = "Exito"
}
```

## Reglas de Integración con Teatro

1. **Obras en `ARCHIVO/PLUGINS/ARG_BOARD_APP/obras/`**
2. **Formato YAML con esquema de navegación**
3. **Interfaz en impress.js (anillos del Teatro)**
4. **Registro de sesiones en BOE**

## Esquema de Obra

```yaml
titulo: string (requerido)
tipo: "navegacion-wiki-racer"
motor: "ArgBoardApp"
mapa:
  fuente: "wikipedia" | "custom"
  idioma: "es" | "en" | ...
  inicio: string (nodo inicial)
  fin: string (nodo objetivo)
  max_pasos: number (límite de movimientos)
interfaz:
  tipo: "impress.js"
  anillos: number (1-3)
registro:
  boe: boolean
  metricas: string[]
```

## Lo que NO hacer

- No mezclar obras ArgBoardApp con obras Teatro estándar (distinto motor)
- No modificar estados de wiki-racer (usar enum original)
- No crear sesiones sin registrar en BOE (trazabilidad)
