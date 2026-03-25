# 08. Plan de Implementación Aprobado

> **Épica**: BUG-MCLOGS-1.0.0  
> **Fecha**: 2026-01-01  
> **Estado**: ✅ **APROBADO** — Decisión PO-SM confirmada

---

## 1. Decisión Final

| Aspecto | Decisión |
|---------|----------|
| Limitación 100 requests | **ACEPTADA** con advertencia |
| Polling | **DESCARTADO** |
| Refresh manual | **APROBADO** |
| Panel View con CRUD snapshots | **NUEVO REQUISITO** |

---

## 2. Advertencia para Tool "help"

```markdown
## ⚠️ Advertencia Importante

Los logs de Copilot Chat se almacenan en memoria con un **límite de ~100 requests**.
En sesiones largas, los requests antiguos se sobrescriben automáticamente.

### Recomendación
**Usa el botón REFRESH especialmente en las partes que quieras conservar.**
Acuérdate de tomar la foto (snapshot) cada poco rato durante tu sesión.

### Flujo Recomendado
1. Trabajas 20-30 minutos con Copilot
2. Haces clic en REFRESH → Se guarda snapshot
3. Continúas trabajando
4. Repites cada 30 min o cuando quieras preservar contexto
```

---

## 3. Nuevo Requisito: Panel View con CRUD de Snapshots

### 3.1 Mockup Conceptual

```
┌─────────────────────────────────────────────────────────────┐
│  COPILOT LOGS                                    [REFRESH]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📸 SNAPSHOTS                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 🔍 Buscar...                              [+ Nuevo]  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 📁 2026-01-01_14-30_fundacion-cap3                  │   │
│  │    23 requests · Claude Sonnet · hace 2h            │   │
│  │    [Ver] [Exportar] [🗑️]                            │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ 📁 2026-01-01_11-00_debugging-mcp                   │   │
│  │    45 requests · Claude Sonnet · hace 5h            │   │
│  │    [Ver] [Exportar] [🗑️]                            │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ 📁 2025-12-31_sesion-navidad                        │   │
│  │    12 requests · GPT-4 · ayer                       │   │
│  │    [Ver] [Exportar] [🗑️]                            │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  📊 SESIÓN ACTUAL                                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Snapshots guardados: 3                             │   │
│  │ Último snapshot: hace 15 min                       │   │
│  │ ⚠️ Recuerda tomar snapshot para conservar contexto   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Funcionalidades CRUD

| Operación | Descripción | UI Element |
|-----------|-------------|------------|
| **Create** | Guardar snapshot actual con nombre | Botón [+ Nuevo] o REFRESH |
| **Read** | Ver contenido de snapshot | Botón [Ver] → abre vista |
| **Update** | Renombrar snapshot | Click en nombre |
| **Delete** | Eliminar snapshot | Botón [🗑️] con confirmación |
| **Search** | Filtrar por nombre/fecha | Campo de búsqueda |
| **Export** | Exportar a JSON/MD | Botón [Exportar] |

### 3.3 Formulario "Nuevo Snapshot"

```
┌─────────────────────────────────────────────────────────────┐
│  💾 Guardar Snapshot                                    [X] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Nombre: [fundacion-cap3-revision          ]                │
│                                                             │
│  Descripción (opcional):                                    │
│  [Revisión del capítulo 3 con banderas     ]                │
│  [                                         ]                │
│                                                             │
│  Vincular a backlog:                                        │
│  [▼ SCRIPT-2.1.1 Copilot Log Exporter     ]                │
│                                                             │
│  ──────────────────────────────────────────────────────     │
│  📊 Preview: Se capturará cache actual + ccreq:latest     │
│  ──────────────────────────────────────────────────────     │
│                                                             │
│                              [Cancelar]  [💾 Guardar]       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Estructura de Almacenamiento en DISCO

```
ARCHIVO/DISCO/COPILOT_SNAPSHOTS/
├── INDEX.md                          # Índice DRY (referencias)
├── ABSTRACT.md                       # Índice semántico (resúmenes)
│
├── 2026-01-01_14-30_fundacion-cap3/
│   ├── metadata.json                 # Info del snapshot
│   ├── requests.json                 # Array de requests
│   └── summary.md                    # Resumen humano
│
├── 2026-01-01_11-00_debugging-mcp/
│   ├── metadata.json
│   ├── requests.json
│   └── summary.md
│
└── 2025-12-31_sesion-navidad/
    ├── metadata.json
    ├── requests.json
    └── summary.md
```

### 4.1 Esquema metadata.json

```json
{
    "id": "2026-01-01_14-30_fundacion-cap3",
    "name": "fundacion-cap3-revision",
    "description": "Revisión del capítulo 3 con banderas",
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

### 4.2 INDEX.md (DRY)

```markdown
# Índice de Snapshots — Copilot Logs

| ID | Nombre | Fecha | Requests | Backlog |
|----|--------|-------|----------|---------|
| 2026-01-01_14-30 | fundacion-cap3-revision | 2026-01-01 | 47 | SCRIPT-2.1.1 |
| 2026-01-01_11-00 | debugging-mcp | 2026-01-01 | 45 | BUG-MCLOGS-1.0.0 |
| 2025-12-31_23-00 | sesion-navidad | 2025-12-31 | 12 | — |
```

### 4.3 ABSTRACT.md (Semántico)

```markdown
# Resúmenes de Sesiones — Copilot Logs

## 2026-01-01_14-30_fundacion-cap3

Sesión de revisión del capítulo 3 de Fundación. Se usaron las 5 banderas
para auditar coherencia doctrinal. Principal foco en test de evidencia
(blueflag) y estructura narrativa (redflag).

**Temas clave**: anacronismo productivo, escala, coherencia temporal
**Agentes invocados**: @aleph, @blueflag, @redflag, @revisor

---

## 2026-01-01_11-00_debugging-mcp

Sesión de debugging del bug BUG-MCLOGS-1.0.0. Se investigó por qué
`get_copilot_request(id)` retorna vacío. Se identificó root cause en
CopilotEngine (límite de _entries[]).

**Temas clave**: MCP server, cache, ccreq scheme
**Archivos tocados**: CopilotLogsMCPServer.ts, CcreqDocumentResolver.ts
```

---

## 5. Tasks de Implementación

### Sprint: BUG-MCLOGS-1.0.0 (Hotfix)

| Task | Descripción | Archivo(s) | Esfuerzo |
|------|-------------|------------|----------|
| **T001** | Añadir tool "help" con advertencia | `CopilotLogsMCPServer.ts` | S |
| **T002** | Crear servicio `SnapshotManager` | `copilotLogs/SnapshotManager.ts` | M |
| **T003** | Método `captureSnapshot()` | `CopilotLogExporterService.ts` | M |
| **T004** | UI: Lista de snapshots en Panel View | `views/CopilotLogsPanel.ts` | L |
| **T005** | UI: Formulario nuevo snapshot | `views/CopilotLogsPanel.ts` | M |
| **T006** | UI: Búsqueda y filtrado | `views/CopilotLogsPanel.ts` | S |
| **T007** | Persistencia en DISCO | `SnapshotManager.ts` | M |
| **T008** | Generar INDEX.md automático | `SnapshotManager.ts` | S |
| **T009** | Generar ABSTRACT.md (manual/AI) | `SnapshotManager.ts` | M |
| **T010** | Vincular snapshot a backlog | `SnapshotManager.ts` | S |

### Estimación Total

| Tamaño | Cantidad | Horas est. |
|--------|----------|-----------|
| S (Small) | 4 | 4h |
| M (Medium) | 4 | 8h |
| L (Large) | 2 | 8h |
| **Total** | **10** | **~20h** |

---

## 6. Orden de Implementación

```
Fase 1: Core (P0)
├── T001: Tool help ──────────────────▶ 30 min
├── T002: SnapshotManager skeleton ───▶ 1h
├── T003: captureSnapshot() ──────────▶ 2h
└── T007: Persistencia básica ────────▶ 2h

Fase 2: UI (P1)
├── T004: Lista de snapshots ─────────▶ 3h
├── T005: Formulario nuevo ───────────▶ 2h
└── T006: Búsqueda ───────────────────▶ 1h

Fase 3: Índices (P2)
├── T008: INDEX.md auto ──────────────▶ 1h
├── T009: ABSTRACT.md ────────────────▶ 2h
└── T010: Link a backlog ─────────────▶ 1h
```

---

## 7. Criterios de Aceptación

### Tool "help"
- [ ] Al invocar `help()` desde MCP, retorna guía completa con advertencia
- [ ] La advertencia sobre el límite de 100 es prominente

### Panel View
- [ ] Muestra lista de snapshots existentes
- [ ] Botón REFRESH captura y guarda snapshot
- [ ] Formulario permite nombrar y vincular a backlog
- [ ] Búsqueda filtra por nombre/fecha
- [ ] Botones Ver/Exportar/Eliminar funcionan

### Persistencia
- [ ] Snapshots se guardan en `ARCHIVO/DISCO/COPILOT_SNAPSHOTS/`
- [ ] INDEX.md se actualiza automáticamente
- [ ] metadata.json contiene toda la info necesaria

### Indicador de Estado
- [ ] Panel muestra "Requests en memoria: X/100"
- [ ] Muestra tiempo desde último refresh
- [ ] Warning visual si > 80 requests sin snapshot

---

## 8. Diagrama de Flujo Final

```
┌─────────────────────────────────────────────────────────────────┐
│                         USUARIO                                 │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Panel View (WebView)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ [REFRESH]    │  │ Lista        │  │ Formulario           │  │
│  │              │  │ Snapshots    │  │ Nuevo Snapshot       │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────┬───────────┘  │
└─────────┼─────────────────┼─────────────────────┼───────────────┘
          │                 │                     │
          ▼                 ▼                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                   SnapshotManager                               │
│  • captureSnapshot()                                            │
│  • listSnapshots()                                              │
│  • getSnapshot(id)                                              │
│  • deleteSnapshot(id)                                           │
│  • exportSnapshot(id, format)                                   │
│  • updateIndex()                                                │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                   CcreqDocumentResolver                         │
│  • resolveLatest() ───────▶ ccreq:latest.copilotmd              │
│  • cacheRequestContent() ──▶ contentCache                       │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│              ARCHIVO/DISCO/COPILOT_SNAPSHOTS/                   │
│  ├── INDEX.md                                                   │
│  ├── ABSTRACT.md                                                │
│  └── {id}/                                                      │
│      ├── metadata.json                                          │
│      ├── requests.json                                          │
│      └── summary.md                                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 9. Próximo Paso

**Implementar T001**: Añadir tool "help" con advertencia.

¿Procedo?

---

## Referencias

- [07_analisis-viabilidad-plan-po-sm.md](./07_analisis-viabilidad-plan-po-sm.md): Gap identificado
- [05_solucion-arquitectonica-propuesta.md](./05_solucion-arquitectonica-propuesta.md): Opciones técnicas
- [VsCodeExtension/src/copilotLogs/](../../../../../VsCodeExtension/src/copilotLogs/): Código actual

---

## Addenda: Limitación Técnica (2026-01-01 PM)

> **Origen**: Auditoría Ox-Indice pre-aprobación

### Indicador "Requests en memoria: X/100" — NO IMPLEMENTABLE

El mockup original mostraba `Requests en memoria: 47/100`. Esto es **técnicamente imposible**:

```typescript
// CopilotEngine (interno, NO expuesto a extensiones)
private _entries: RequestLogEntry[] = [];  // No hay API para .length
```

**Solución adoptada**: Mostrar información que SÍ podemos obtener:
- `Snapshots guardados: N` — cuenta carpetas en DISCO
- `Último snapshot: hace X min` — timestamp de última captura

Esta limitación es **upstream** (GitHub CopilotEngine), no nuestra.
