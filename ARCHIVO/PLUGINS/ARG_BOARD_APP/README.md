# ArgBoardApp — Datos de Runtime

> Directorio de datos del plugin ArgBoardApp

## Estructura

```
ARCHIVO/PLUGINS/ARG_BOARD_APP/
├── obras/               # Definiciones YAML de obras
│   └── *.yaml           # Cada obra en su archivo
├── sesiones/            # Sesiones de juego (JSON)
│   └── *.json           # Cada sesión con timestamp
└── README.md            # Este archivo
```

## Obras

Formato YAML con esquema de navegación wiki-racer.

| Campo | Tipo | Requerido |
|-------|------|-----------|
| titulo | string | ✅ |
| tipo | "navegacion-wiki-racer" | ✅ |
| motor | "ArgBoardApp" | ✅ |
| mapa.fuente | string | ✅ |
| mapa.inicio | string | ✅ |
| mapa.fin | string | ✅ |

## Sesiones

Registro de partidas con:
- Camino recorrido
- Tiempo de partida
- Número de backtracks
- Estado final (Éxito/Fracaso)

## Sincronización con BOE

Las sesiones se registran también en:

```
ARCHIVO/PLUGINS/ARG_BOARD/BOE/
```
