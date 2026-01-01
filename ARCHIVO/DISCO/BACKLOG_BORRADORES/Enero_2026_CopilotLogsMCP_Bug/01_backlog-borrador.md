# Backlog: Copilot Logs Snapshot System

> **Épica**: FEATURE-SNAPSHOTS-1.0.0  
> **Origen**: BUG-MCLOGS-1.0.0 (bug → feature pivot)  
> **Tipo**: 🚀 Feature  
> **Estado**: ✅ Aprobado  
> **Fecha**: 2026-01-01

---

## 📋 Resumen Ejecutivo

### Del Bug a la Feature

| Fase | Hallazgo |
|------|----------|
| Bug inicial | `get_copilot_request(id)` retorna vacío |
| Root cause | `_entries[]` de CopilotEngine es efímero (límite 100) |
| Opciones | A: Polling ❌, B: Event Hook ❌, C: Persistencia ✅ |
| Decisión | **Sistema de Snapshots con CRUD en Panel View** |

### Limitación Aceptada

```
⚠️ CopilotEngine solo mantiene ~100 requests en memoria.
   Los requests antiguos se sobrescriben (FIFO).
   
   SOLUCIÓN: Snapshots manuales frecuentes.
```

---

## 🎯 Objetivo

Permitir al usuario **capturar, almacenar y recuperar** snapshots de sus conversaciones con Copilot Chat, con advertencia clara sobre la limitación de 100 requests.

---

## ✅ Acceptance Criteria

### AC1: Tool "help" con advertencia
- [ ] `help()` retorna guía completa
- [ ] Advertencia sobre límite 100 es prominente
- [ ] Incluye recomendación de snapshots frecuentes

### AC2: Captura de Snapshots
- [ ] Botón REFRESH captura todo lo disponible en `_entries[]`
- [ ] Se puede nombrar el snapshot
- [ ] Se puede vincular a un backlog

### AC3: Panel View CRUD
- [ ] Lista snapshots existentes
- [ ] Búsqueda por nombre/fecha
- [ ] Ver contenido de snapshot
- [ ] Exportar a JSON/MD
- [ ] Eliminar con confirmación

### AC4: Persistencia
- [ ] Snapshots en `ARCHIVO/DISCO/COPILOT_SNAPSHOTS/`
- [ ] INDEX.md se actualiza automáticamente
- [ ] metadata.json con info completa

### AC5: Indicador de Estado
- [ ] Muestra "Requests en memoria: X/100"
- [ ] Muestra tiempo desde último snapshot
- [ ] Warning si > 80 requests sin snapshot

---

## 🔧 Stories

### S01: Core - Tool Help y Captura

**Descripción**: Implementar la base del sistema de snapshots.

| Task | Descripción | Archivo | Effort |
|------|-------------|---------|--------|
| T001 | Tool "help" con advertencia | `CopilotLogsMCPServer.ts` | S |
| T002 | Servicio SnapshotManager | `copilotLogs/SnapshotManager.ts` | M |
| T003 | Método captureSnapshot() | `CopilotLogExporterService.ts` | M |
| T004 | Persistencia básica en DISCO | `SnapshotManager.ts` | M |

**Effort**: 4 tasks, ~6h

### S02: UI - Panel View CRUD

**Descripción**: Interfaz para gestionar snapshots.

| Task | Descripción | Archivo | Effort |
|------|-------------|---------|--------|
| T005 | Lista de snapshots | `views/CopilotLogsPanel.ts` | L |
| T006 | Formulario nuevo snapshot | `views/CopilotLogsPanel.ts` | M |
| T007 | Búsqueda y filtrado | `views/CopilotLogsPanel.ts` | S |

**Effort**: 3 tasks, ~6h

### S03: Índices y Vinculación

**Descripción**: Índices automáticos y link a backlogs.

| Task | Descripción | Archivo | Effort |
|------|-------------|---------|--------|
| T008 | Generar INDEX.md automático | `SnapshotManager.ts` | S |
| T009 | Generar ABSTRACT.md | `SnapshotManager.ts` | M |
| T010 | Vincular snapshot a backlog | `SnapshotManager.ts` | S |

**Effort**: 3 tasks, ~4h

---

## 📁 Estructura de Archivos

### Código (VsCodeExtension)

```
src/copilotLogs/
├── SnapshotManager.ts          # NUEVO: Gestión de snapshots
├── CopilotLogsMCPServer.ts     # MOD: +tool "help"
├── CopilotLogExporterService.ts # MOD: +captureSnapshot()
└── index.ts                     # MOD: exports

src/views/
└── CopilotLogsPanel.ts          # MOD: +CRUD snapshots
```

### Datos (ARCHIVO)

```
ARCHIVO/DISCO/COPILOT_SNAPSHOTS/
├── INDEX.md                     # Índice DRY
├── ABSTRACT.md                  # Índice semántico
└── {YYYY-MM-DD_HH-MM}_{nombre}/
    ├── metadata.json
    ├── requests.json
    └── summary.md
```

---

## 📊 Esquemas

### metadata.json

```json
{
    "id": "2026-01-01_14-30_fundacion-cap3",
    "name": "fundacion-cap3-revision",
    "description": "Revisión del capítulo 3",
    "createdAt": "2026-01-01T14:30:00Z",
    "requestCount": 47,
    "models": ["claude-sonnet-4-20250514"],
    "linkedBacklog": "SCRIPT-2.1.1",
    "totalTokens": {
        "prompt": 125000,
        "completion": 45000
    }
}
```

### Tool "help" Response

```markdown
## Copilot Logs - Guía de Uso

### ⚠️ Advertencia Importante

Los logs de Copilot Chat tienen un **límite de ~100 requests** en memoria.
En sesiones largas, los requests antiguos se sobrescriben.

### 👉 Recomendación

**Usa el botón REFRESH especialmente en las partes que quieras conservar.**
Acuérdate de tomar la foto (snapshot) cada poco rato durante tu sesión.

### Herramientas Disponibles

| Tool | Descripción |
|------|-------------|
| `help` | Esta guía |
| `get_latest_request` | Último request (siempre funciona) |
| `list_copilot_requests` | IDs disponibles |
| `get_copilot_request(id)` | Contenido SI está en memoria |
| `list_snapshots` | Snapshots guardados |
| `get_snapshot(id)` | Contenido de snapshot |
```

---

## 📈 Estimación Total

| Fase | Stories | Tasks | Horas |
|------|---------|-------|-------|
| Core | S01 | 4 | ~6h |
| UI | S02 | 3 | ~6h |
| Índices | S03 | 3 | ~4h |
| **Total** | **3** | **10** | **~16h** |

---

## 🔗 Referencias

### Documentación de Investigación

| # | Documento | Contenido |
|---|-----------|----------|
| 02 | [informe-ox-indice-scrum.md](./02_informe-ox-indice-scrum.md) | Investigación inicial |
| 03 | [conversacion-po-sm-justificacion.md](./03_conversacion-po-sm-justificacion.md) | Justificación técnica |
| 04 | [correccion-bug-verificacion-empirica.md](./04_correccion-bug-verificacion-empirica.md) | Tests empíricos |
| 05 | [solucion-arquitectonica-propuesta.md](./05_solucion-arquitectonica-propuesta.md) | Opciones A/B/C |
| 06 | [estudio-viabilidad-opcion-b.md](./06_estudio-viabilidad-opcion-b.md) | API no expuesta |
| 07 | [analisis-viabilidad-plan-po-sm.md](./07_analisis-viabilidad-plan-po-sm.md) | Gap identificado |
| 08 | [plan-implementacion-aprobado.md](./08_plan-implementacion-aprobado.md) | Plan detallado |

### Código Fuente Analizado

| Archivo | Hallazgo |
|---------|----------|
| `CopilotEngine/requestLoggerImpl.ts:L258` | Root cause: `_entries.find()` |
| `CopilotEngine/requestLoggerImpl.ts:L393` | Límite: maxEntries=100 |
| `VsCodeExtension/CcreqDocumentResolver.ts` | Cache implementation |

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-01-01 | 📋 Bug report inicial | @ox |
| 2026-01-01 | 🔍 Root cause identificado | @ox + @indice |
| 2026-01-01 | ❌ Opción B descartada (API no expuesta) | @ox |
| 2026-01-01 | ✅ Plan aprobado: Snapshots + CRUD | @scrum |
| 2026-01-01 | 📝 Backlog regenerado como Feature | @scrum |

---

## 📎 Histórico: Bug Original (Archivado)

<details>
<summary>Ver bug report original</summary>

### Título Original
**`get_copilot_request` retorna contenido vacío para todas las requests**

### Root Cause Identificado
`CopilotEngine/requestLoggerImpl.ts:L258` — `_entries[]` es efímero, límite 100.

### Resultado de Investigación
Ver documentos 02-08 en esta carpeta.

</details>
