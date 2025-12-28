---
description: "Flujo completo de planificación Scrum, estructura de backlog y métricas."
applyTo: ".github/plugins/scriptorium-pack/**/*, .github/plugins/scrum/**/*"
---

# Instrucciones: Flujo de Trabajo Scrum

> Activación contextual: al trabajar con backlogs o documentos de planificación.
>
> **📋 Backlog**: Si necesitas consultar el backlog oficial, adjunta manualmente `.github/BACKLOG-SCRIPTORIUM.md` o usa `@scrum status`.

---

## Flujo Principal

```
DISCO (borrador) → Aprobación → Oficial (.github/) → Tracking → Cierre
```

### Regla de Oro

> "El backlog se cocina en DISCO, se sirve en .github/"

Nunca escribas directamente en los backlogs oficiales sin pasar por el proceso de borrador y aprobación.

---

## Estructura de Backlog

### Jerarquía (DEVOPS.md §3)

```
Opportunity
└── Epic (Sprint = 1 mes = 1 capítulo)
    └── Story (Iteración = 1 semana)
        └── Task (Unidad atómica de trabajo)
```

### Épica

```markdown
## Épica: {ID} — {Nombre}

**Objetivo**: {descripción}
**Effort**: {N} pts
**Prioridad**: P0/P1/P2
```

### Story

```markdown
### {ID}: {Nombre}
**Effort**: {N} pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T001 | ... | 2 | ⏳ |
```

### Estados de Task

| Estado | Símbolo | Significado |
|--------|---------|-------------|
| Pendiente | ⏳ | No iniciada |
| En progreso | 🔄 | Trabajo activo |
| Completada | ✅ | Terminada |
| Bloqueada | ⛔ | Impedimento |

---

## Comandos de @scrum

| Comando | Descripción |
|---------|-------------|
| `planificar` | Inicia conversación PO-SM para nuevo sprint |
| `borrador` | Genera backlog borrador desde conversación |
| `aprobar` | Valida y publica en backlog oficial |
| `tracking` | Actualiza estado de tasks completadas |
| `cerrar` | Retrospectiva, foto de estado, preparar siguiente |
| `status` | Muestra métricas actuales del sprint |

---

## Métricas

### Calculadas automáticamente

| Métrica | Fórmula |
|---------|---------|
| % Avance | (Effort ✅) / (Effort total) × 100 |
| Velocity | Promedio de effort/iteración (histórico) |
| Buffer usado | Effort de mejoras / Buffer asignado |

### Ejemplo de Status

```
Sprint 2: Capítulo Uno
═══════════════════════
Épica principal: FUND-1.1.0
Iteración actual: I2 (Borrador)

Métricas:
├─ Effort total: 100 pts
├─ Completado: 23 pts (23%)
├─ En progreso: 8 pts
├─ Pendiente: 69 pts
└─ Buffer: 5/30 pts consumidos

Tasks:
├─ ✅ Completadas: 12/52
├─ 🔄 En progreso: 4
└─ ⏳ Pendientes: 36
```

---

## Ejemplo de Sesión PO-SM

```
Usuario: @scrum planificar

Scrum: Iniciando planificación de Sprint 3.
       Creando carpeta: ARCHIVO/DISCO/Enero_26_release/
       
       Comenzamos la conversación PO-SM.
       
       **SM**: Sprint 2 cerrado con 100% de tasks.
       El Capítulo 1 está publicado. ¿Cuál es el objetivo del Sprint 3?
       
Usuario: Quiero empezar el Capítulo 2 y consolidar las mejoras detectadas.

Scrum: **SM**: Entendido. Propongo un modelo híbrido similar:
       - 60% Fundación (Cap 2: Autómata soberano)
       - 40% Scriptorium (mejoras del buffer + nuevas)
       
       ¿Aceptas esta distribución?

Usuario: Sí, adelante.

Scrum: [Continúa la conversación hasta generar el backlog...]
```

---

## Integración

### Con @aleph

```
@aleph completa T023 → @scrum tracking → actualiza backlog
```

### Con DEVOPS.md

Commits generados por @scrum siguen el protocolo:

```
chore(fund/plan): aprobar backlog sprint 2

- Integrar FUND-1.1.0 en BACKLOG-FUNDACION.md
- Añadir SCRIPT-1.1.0 (buffer) en BACKLOG-SCRIPTORIUM.md
- 52 tasks, 100 pts effort

refs #FUND-1.1.0
```

---

## Archivos Gestionados

| Archivo | Operación |
|---------|-----------|
| `ARCHIVO/DISCO/{release}/` | Crear, leer |
| `.github/BACKLOG-SCRIPTORIUM.md` | Leer, escribir |
| `PROYECTOS/FUNDACION/BACKLOG-FUNDACION.md` | Leer, escribir |
| `ARCHIVO/FOTOS_ESTADO/` | Crear |

---

## Referencia

- [DEVOPS.md](../../../DEVOPS.md) — Protocolo completo
- [scrum-protocol.instructions.md](../../scrum/instructions/scrum-protocol.instructions.md) — Protocolo del plugin
