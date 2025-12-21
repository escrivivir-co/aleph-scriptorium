# Datos del Plugin Enciclopedia

> **Plugin**: enciclopedia v1.0.0  
> **Directorio de código**: `.github/plugins/enciclopedia/`

Este directorio almacena los **datos de runtime** del plugin Enciclopedia.

## Estructura

```
ARCHIVO/PLUGINS/ENCICLOPEDIA/
├── README.md           # Este archivo
└── tomos/              # Metadatos por tomo cargado
    └── hdf-ernesto-castro/
        └── index-cache.json
```

## Tomos Registrados

| ID | Nombre | Capítulos | Fecha de carga |
|----|--------|-----------|----------------|
| `hdf-ernesto-castro` | Historia de la Filosofía | 61 | 2025-12-21 |

## Separación Código/Datos

Según el [protocolo de plugins](../../../.github/PLUGINS.md):

- **Código** (inmutable): `.github/plugins/enciclopedia/`
- **Datos** (mutable): `ARCHIVO/PLUGINS/ENCICLOPEDIA/`

Esta separación permite:
- Versionado independiente del código
- Backup selectivo de datos
- Reinstalación sin pérdida de estado

## Fuentes de los Tomos

Los materiales originales residen en `ARCHIVO/ENCICLOPEDIA/`:

| Tomo | Ubicación |
|------|-----------|
| Historia de la Filosofía | `ARCHIVO/ENCICLOPEDIA/Historia de la filosofía (Ernesto Castro, Madrid, 2017)/` |

Los archivos pesados (MP3, PDF, etc.) pueden estar excluidos vía `.gitignore`.
