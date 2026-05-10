# Plugin Enciclopedia — Documentación

> **Plugin**: enciclopedia v1.0.0  
> **Estado**: Activo

## Descripción

Motor de consulta para tomos enciclopédicos del proyecto ALEPH Scriptorium. Permite navegar índices de obras académicas mediante búsquedas temporales y temáticas.

## Instalación

El plugin ya está instalado en `.github/plugins/enciclopedia/`.

## Uso Rápido

### Consultar la biblioteca

```
@Bibliotecario listar-tomos
```

### Buscar en un tomo específico

```
@HDF-ErnestoCastro ¿Quién habla de ética?
@HDF-ErnestoCastro filosofía del siglo XVII
@HDF-ErnestoCastro Spinoza
```

### Cargar un nuevo tomo

```
@Bibliotecario cargar-tomo ARCHIVO/ENCICLOPEDIA/{nuevo-tomo}/
```

## Tomos Disponibles

### Historia de la Filosofía (Ernesto Castro, 2017)

- **Capítulos**: 61 conferencias de audio
- **Período**: Desde Aristóteles hasta Deleuze
- **Agente**: `@HDF-ErnestoCastro`
- **Índice**: [ARCHIVO/ENCICLOPEDIA/Historia de la filosofía (Ernesto Castro, Madrid, 2017)/README.md](../../../ARCHIVO/ENCICLOPEDIA/Historia%20de%20la%20filosofía%20(Ernesto%20Castro,%20Madrid,%202017)/README.md)

## Arquitectura

```
.github/plugins/enciclopedia/
├── manifest.md                  # Configuración del plugin
├── agents/
│   ├── bibliotecario.agent.md   # Gestor principal
│   └── tomos/
│       └── hdf-ernesto-castro.agent.md
├── prompts/
│   ├── cargar-tomo.prompt.md
│   ├── buscar-temporal.prompt.md
│   └── buscar-tematica.prompt.md
├── instructions/
│   └── enciclopedia.instructions.md
└── docs/
    └── README.md               # Este archivo

ARCHIVO/PLUGINS/ENCICLOPEDIA/    # Datos de runtime
└── tomos/
    └── hdf-ernesto-castro/
        └── index-cache.json
```

## Tipos de Búsqueda

| Tipo | Ejemplo | Descripción |
|------|---------|-------------|
| **Directa** | "Kant" | Busca por nombre de filósofo |
| **Temporal** | "siglo XVIII" | Filtra por período histórico |
| **Temática** | "epistemología" | Busca concepto transversal |
| **Compuesta** | "ética en el s.XX" | Cruza tema + período |

## Añadir Nuevos Tomos

1. Crear directorio en `ARCHIVO/ENCICLOPEDIA/{nombre}/`
2. Crear `README.md` con índice estructurado (tablas Markdown)
3. Ejecutar `@Bibliotecario cargar-tomo {ruta}`

El sistema generará automáticamente:
- Agente especializado para el tomo
- Entrada en el manifest
- Handoff desde el Bibliotecario

## Limitaciones

- **No transcribe** contenido de archivos multimedia
- **No resume** capítulos
- **Solo orienta** hacia el capítulo correcto

## Referencias

- [Manifest del plugin](../manifest.md)
- [Instrucciones del motor](../instructions/enciclopedia.instructions.md)
- [PLUGINS.md](../../../PLUGINS.md) — Protocolo de plugins
