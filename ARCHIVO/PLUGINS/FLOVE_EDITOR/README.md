# Datos del Plugin FloveEditor

> **Directorio de runtime** para el plugin `flove-editor`

## Estructura

```
FLOVE_EDITOR/
├── README.md                 # Este archivo
├── ontologies/               # Ontologías creadas
│   ├── {nombre}.yaml         # Ontología en formato YAML
│   └── exports/              # Exportaciones
│       ├── {nombre}.schema.json  # JSON Schema
│       ├── {nombre}.ts       # TypeScript interfaces
│       └── {nombre}.zod.ts   # Schema Zod
└── templates/                # Templates personalizados
```

## Convención de Nombres

- **Ontologías**: `{dominio}-ontology.yaml` (e.g., `agent-communication-ontology.yaml`)
- **Exportaciones**: Mismo nombre base + extensión correspondiente

## Paradigma Flove (CONFLUENTISM)

El plugin implementa el paradigma de **3 niveles**:

| Nivel | Nombre | Función |
|-------|--------|---------|
| 1 | Fuzzy Logic | Epistemología: RELATE → EXPLAIN → VIEW |
| 2 | PsicoSocial | Intersubjetividad: SOULS ↔ TRUSTFUL |
| 3 | Freedom/Economy | Acción: FREE ↔ MAKING |

## Referencia

- **Plugin**: `.github/plugins/flove-editor/`
- **Bridge**: `.github/agents/plugin_ox_floveeditor.agent.md`
- **Submódulo**: `OnthologyEditor/`
- **Fuente**: [Flove.org](https://flove.org)
