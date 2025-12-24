# Plugin TypedPrompting — Datos de Runtime

> **Plugin**: typed-prompting  
> **Versión**: 1.0.0  
> **Submódulo**: alephscript-typed-prompting

---

## Descripción

Este directorio almacena los datos de runtime del plugin TypedPrompting:

- **Schemas**: Definiciones de ontologías guardadas
- **Libraries**: Colecciones de schemas por dominio
- **Validation Logs**: Historial de validaciones

---

## Estructura

```
TYPED_PROMPTING/
├── README.md               # Este archivo
├── schemas/
│   ├── examples/          # Schemas de ejemplo
│   └── custom/            # Schemas creados por el usuario
├── libraries/
│   └── scriptorium.json   # Biblioteca del Scriptorium
└── validation-logs/
    └── .gitkeep
```

---

## Uso

### Guardar Schema

```json
// schemas/custom/mi-schema.json
{
  "id": 100,
  "name": "Mi Schema",
  "typeScript": "interface MiSchema { ... }",
  "jsonSchema": "{ ... }",
  "category": "Custom",
  "labels": ["custom", "ejemplo"],
  "description": "Schema de ejemplo"
}
```

### Crear Biblioteca

```json
// libraries/mi-biblioteca.json
{
  "id": 1,
  "name": "Mi Biblioteca",
  "description": "Colección de schemas para mi dominio",
  "schemas": ["schema-1", "schema-2"]
}
```

---

## Referencia

- Plugin: `.github/plugins/typed-prompting/`
- Submódulo: `alephscript-typed-prompting/`
- Backlog: `ARCHIVO/DISCO/BACKLOG_BORRADORES/TYPED_PROMPTING/`
