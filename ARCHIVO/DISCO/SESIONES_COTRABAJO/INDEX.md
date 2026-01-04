# Índice — SESIONES_COTRABAJO

> **Ubicación**: `ARCHIVO/DISCO/SESIONES_COTRABAJO/`  
> **Actualizado**: 2026-01-04  
> **Principio**: DRY — Solo referencias, detalles en cada sesión (`00_SESION.md`)  
> **Feature**: COWORK-1.0.0

---

## Mapa rápido

| Sesión | Épica | Turnos | Estado |
|--------|-------|--------|--------|
| [2026-01-03_prolog-agent-brain-pack-refinement](2026-01-03_prolog-agent-brain-pack-refinement/) | PROLOG-DRY-1.0.0, TEATRO-PROLOG-1.0.0 | 15 | ✅ Cerrada |
| [2026-01-03_prolog-e2e-testing](2026-01-03_prolog-e2e-testing/) | PROLOG-E2E-1.0.0 | 16 | ✅ Cerrada (88.5%) |
| [2026-01-04_demo-ui-prologeditor](2026-01-04_demo-ui-prologeditor/) | DEMO-UI-1.0.0 | - | 🟢 Activa |
| [2026-01-04_dramaturgia-scriptorium-maquina](2026-01-04_dramaturgia-scriptorium-maquina/) | DRAMATURGIA-MAQUINA-1.0.0 | 6 | ✅ Cerrada |

---

## Estructura de Sesión

Cada carpeta sigue el protocolo `cotrabajo.instructions.md`:

```
{YYYY-MM-DD}_{tema}/
├── 00_SESION.md      # Metadatos + participantes + objetivo
├── 01_TABLERO.md     # Índice DRY de turnos
├── 02_ACTAS/         # Contenido por turno (T00X_{agente}_{tema}.md)
├── 03_REFERENCIAS/   # Material de contexto
└── 04_PROTOCOLO.md   # Copia local del protocolo
```

---

## Leyenda de Estados

| Estado | Significado |
|--------|-------------|
| 🟢 Activa | Sesión en progreso |
| 🟡 Pausada | Sesión suspendida temporalmente |
| ✅ Cerrada | Sesión completada |

---

## Estadísticas

| Métrica | Valor |
|---------|-------|
| Total sesiones | 4 |
| ✅ Cerradas | 3 |
| 🟢 Activas | 1 |

---

## Referencias Cruzadas

| Documento | Propósito |
|-----------|-----------|
| [cotrabajo.instructions.md](../../.github/plugins/scriptorium-pack/instructions/cotrabajo.instructions.md) | Protocolo completo |
| [iniciar-cotrabajo.prompt.md](../../.github/plugins/scriptorium-pack/prompts/iniciar-cotrabajo.prompt.md) | Crear nueva sesión |
| [BACKLOG-SCRIPTORIUM.md](../../.github/BACKLOG-SCRIPTORIUM.md#sesiones-de-cotrabajo) | Sección de tracking oficial |

---

> **DRY**: INDEX.md = navegación rápida | 00_SESION.md = ficha de cada sesión
