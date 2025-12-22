# Teatro Interactivo — Datos de Runtime

> **Plugin**: teatro v1.0.0  
> **Ubicación código**: `.github/plugins/teatro/`

Este directorio almacena los datos mutables del plugin Teatro Interactivo.

## Estructura

```
ARCHIVO/PLUGINS/TEATRO/
├── obras/              # YAMLs de obras generadas
│   └── {id}.yaml
└── logs/               # Historial de operaciones
    ├── instalaciones.json
    └── ejecuciones.json
```

## Separación Código/Datos

- **Código** (inmutable): `.github/plugins/teatro/`
- **Datos** (mutable): `ARCHIVO/PLUGINS/TEATRO/`

Esta separación permite:
- Versionado diferenciado
- Backup selectivo
- Reinstalación limpia del plugin sin perder obras
