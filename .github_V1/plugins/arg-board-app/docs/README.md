# ArgBoardApp — Documentación

> Plugin de obras interactivas con navegación wiki-racer

## Descripción

ArgBoardApp convierte wiki-racer en un motor de obras interactivas para el Teatro ARG. Los espectadores navegan entre nodos de un mapa de enlaces, buscando caminos entre conceptos.

## Instalación

El plugin se activa al instalar el submódulo wiki-racer. La máquina de estados viene de:

```
wiki-racer/src/estado.ts → Etapa, Error enums
```

## Uso

### Desde Aleph

```
@aleph [ARG-BOARD-APP] Crear obra de navegación sobre filosofía
```

### Desde el bridge

```
@plugin_ox_argboardapp crear obra navegación
```

## Obras disponibles

Las obras se definen en YAML y se guardan en:

```
ARCHIVO/PLUGINS/ARG_BOARD_APP/obras/*.yaml
```

## Integración con Teatro

ArgBoardApp usa la infraestructura del Teatro:
- **impress.js**: Visualización 3D
- **BOE**: Registro de sesiones
- **obras.json**: Catálogo de obras

## Estructura de datos

```
ARCHIVO/PLUGINS/ARG_BOARD_APP/
├── obras/               # Definiciones YAML de obras
├── sesiones/            # Sesiones de juego (JSON)
└── README.md            # Esta documentación
```

## Referencia del submódulo

- **Repositorio**: `wiki-racer`
- **Estados**: `wiki-racer/src/estado.ts`
- **Motor**: TypeScript + RxJS
