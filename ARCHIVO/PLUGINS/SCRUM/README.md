# Datos del Plugin Scrum

> **Propósito**: Directorio de runtime para el plugin de gestión ágil de backlogs.

---

## Estructura

```
ARCHIVO/PLUGINS/SCRUM/
├── README.md              ← Este archivo
├── sprints/               ← Histórico de sprints cerrados
│   └── sprint-0.json      ← Ejemplo: métricas del sprint 0
└── velocity.json          ← Tracking de velocidad entre sprints
```

---

## Archivos de Estado

### velocity.json

Almacena la velocidad histórica para estimaciones futuras:

```json
{
  "sprints": [
    {
      "id": 0,
      "nombre": "Bootstrap",
      "puntos_comprometidos": 100,
      "puntos_completados": 88,
      "fecha_inicio": "2025-12-01",
      "fecha_fin": "2025-12-22"
    }
  ],
  "velocidad_promedio": 88
}
```

### sprints/{sprint-id}.json

Snapshot del sprint cerrado con métricas finales:

```json
{
  "id": 1,
  "nombre": "Capítulo Uno",
  "fecha_cierre": "2025-01-22",
  "épicas": [
    {
      "id": "FUND-1.1.0",
      "nombre": "Anacronismo Productivo",
      "completado": true,
      "tasks_total": 32,
      "tasks_completadas": 32
    }
  ],
  "retrospectiva": "ARCHIVO/DISCO/Diciembre_25_release/retrospectiva.md",
  "foto_estado": "ARCHIVO/FOTOS_ESTADO/2025-01-22_Sprint1_CapituloUno.md"
}
```

---

## Separación Código/Datos

| Tipo | Ubicación | Mutable |
|------|-----------|---------|
| **Código** | `.github/plugins/scrum/` | ❌ Inmutable |
| **Datos** | `ARCHIVO/PLUGINS/SCRUM/` | ✅ Mutable |

---

## Relación con DISCO

Los **borradores** de backlog se trabajan en `ARCHIVO/DISCO/` (ej. `Diciembre_25_release/`).

Una vez aprobados, se "sirven" en los backlogs oficiales:
- `.github/BACKLOG-SCRIPTORIUM.md`
- `PROYECTOS/FUNDACION/BACKLOG-FUNDACION.md`

Este directorio (`ARCHIVO/PLUGINS/SCRUM/`) solo almacena **metadatos agregados** (velocidad, histórico de sprints).
