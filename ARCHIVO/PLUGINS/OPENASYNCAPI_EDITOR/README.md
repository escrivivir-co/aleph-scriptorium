# OpenAsyncAPI Editor — Datos del Plugin

> **Plugin**: openasyncapi-editor v1.0.0  
> **Directorio**: `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/`

---

## Estructura

```
OPENASYNCAPI_EDITOR/
├── README.md              # Este archivo
├── catalog.json           # Índice de especificaciones
├── catalog.schema.json    # Schema de validación
├── specs/                 # Copias locales (opcional)
│   └── {proyecto}/
│       ├── openapi.yaml
│       └── asyncapi.yaml
├── generated/             # Código generado
│   └── {proyecto}/
│       └── {lenguaje}/
└── docs/                  # Documentación estática
    └── {proyecto}/
```

---

## Catálogo

El archivo `catalog.json` mantiene el inventario de todas las especificaciones API del Scriptorium.

### Especificaciones Actuales

| ID | Proyecto | Tipo | Versión | Estado |
|----|----------|------|---------|--------|
| `prolog-editor-openapi` | PrologEditor | OpenAPI 3.1 | 1.0.0 | ✅ validated |
| `prolog-editor-asyncapi` | PrologEditor | AsyncAPI 3.0 | 1.0.0 | ✅ validated |

---

## Uso

### Listar Catálogo

```
@plugin_ox_openasyncapieditor listar
```

### Añadir Spec

```
@plugin_ox_openasyncapieditor catalogar {proyecto}
```

### Generar Código

```
@plugin_ox_openasyncapieditor generar typescript prolog-editor
```

---

## Referencias

- **Plugin**: `.github/plugins/openasyncapi-editor/`
- **Agente**: `@plugin_ox_openasyncapieditor`
- **Spec de ejemplo**: `BACKLOG_BORRADORES/Enero_02_PrologEditor_API_Contracts/api-specs/`
