# WiringApp — Datos de Runtime

> Directorio de datos del plugin WiringApp

## Estructura

```
ARCHIVO/PLUGINS/WIRING_APP/
├── templates/           # Templates base (solo lectura)
│   └── wiki-racer.json  # Template original del submódulo
├── flows/               # Flows creados por el usuario
│   └── *.json           # Flows personalizados
└── README.md            # Este archivo
```

## Templates

Los templates son flows base que se copian y personalizan. No modificar directamente.

| Template | Origen | Descripción |
|----------|--------|-------------|
| `wiki-racer.json` | `wiki-racer/node-red-contrib-wikir-racer/flow.json` | Juego de navegación Wikipedia |

## Flows de Usuario

Los flows creados o personalizados se guardan aquí. Formato Node-RED 2.x.

## Regenerar templates

Si el submódulo se actualiza:

```bash
cp wiki-racer/node-red-contrib-wikir-racer/flow.json ARCHIVO/PLUGINS/WIRING_APP/templates/wiki-racer.json
```
