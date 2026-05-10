# WiringApp — Documentación

> Plugin de ejemplo de aplicación Node-RED basado en wiki-racer

## Descripción

WiringApp extiende WireEditor con templates y asesoría especializada para crear flows de juegos de navegación, usando el submódulo wiki-racer como ejemplo canónico.

## Instalación

El plugin se activa automáticamente al instalar el submódulo wiki-racer. Los templates se copian desde:

```
wiki-racer/node-red-contrib-wikir-racer/flow.json
    ↓
ARCHIVO/PLUGINS/WIRING_APP/templates/wiki-racer.json
```

## Uso

### Desde Aleph

```
@aleph [WIRING-APP] Crear flow de juego de navegación
```

### Desde el bridge

```
@plugin_ox_wiringapp crear flow
```

### Directamente

```
Quiero crear un juego de navegación entre artículos de Wikipedia
```

## Templates disponibles

| Template | Descripción | Nodos |
|----------|-------------|-------|
| wiki-racer.json | Juego original de Wikipedia | ~30 |

## Integración con WireEditor

WiringApp delega a WireEditor para:
- Crear proyectos Node-RED
- Importar/exportar flows genéricos
- Configuración de servidor

## Estructura de datos

```
ARCHIVO/PLUGINS/WIRING_APP/
├── templates/           # Templates base
│   └── wiki-racer.json
├── flows/               # Flows del usuario
└── README.md            # Esta documentación
```

## Referencia del submódulo

- **Repositorio**: `wiki-racer`
- **Estado del motor**: `wiki-racer/src/estado.ts`
- **Flow original**: `wiki-racer/node-red-contrib-wikir-racer/flow.json`
