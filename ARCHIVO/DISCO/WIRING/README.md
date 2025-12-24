# DISCO/WIRING — Proyectos Node-RED

> **Plugin**: WireEditor  
> **Versión**: 1.0.0

---

## Descripción

Esta carpeta contiene los artefactos de Node-RED gestionados por el plugin WireEditor:

- **feeds/**: Archivos JSON para comunicación asíncrona agente ↔ Node-RED
- **projects/**: Proyectos Node-RED por caso de uso
- **templates/**: Plantillas reutilizables de flows, subflows y nodos

---

## Estructura

```
WIRING/
├── catalog.json           # Índice maestro de artefactos
├── README.md              # Este archivo
├── feeds/                 # Comunicación asíncrona
│   └── README.md
├── projects/              # Proyectos por caso de uso
│   └── README.md
└── templates/             # Plantillas reutilizables
    ├── README.md
    ├── flows/
    ├── subflows/
    └── nodes/
```

---

## catalog.json

El archivo `catalog.json` es el **índice maestro** que registra:
- Proyectos creados
- Plantillas disponibles
- Feeds configurados

El agente WireEditor mantiene este archivo actualizado.

---

## Operaciones

| Operación | Comando |
|-----------|---------|
| Crear proyecto | `@wireeditor crear proyecto {nombre}` |
| Importar flow | `@wireeditor importar flow {archivo}` |
| Exportar flow | `@wireeditor exportar {proyecto}` |
| Ver catálogo | `@wireeditor listar plantillas` |
| Configurar feed | `@wireeditor conectar feed {nombre}` |

---

## Integración con Node-RED

Para usar los flows:

1. Instalar Node-RED: `npm install -g node-red`
2. Copiar flow.json: `cp projects/{nombre}/flow.json ~/.node-red/flows.json`
3. Arrancar: `node-red`
4. Abrir: http://localhost:1880

---

## Feeds Asíncronos

Los feeds permiten comunicación entre agentes del Scriptorium y flows de Node-RED:

```
Node-RED → escribe → feeds/commands.json → Agente lee
Agente → escribe → feeds/responses.json → Node-RED lee
```

Ver `feeds/README.md` para detalles del protocolo.
