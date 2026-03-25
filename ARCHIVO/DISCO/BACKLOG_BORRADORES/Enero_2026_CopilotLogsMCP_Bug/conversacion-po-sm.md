# Conversación PO-SM: Copilot Logs Snapshot System

> **Fecha**: 2026-01-01  
> **Participantes**: Usuario (PO), @ox + @scrum (SM)  
> **Épica**: BUG-MCLOGS-1.0.0 → FEATURE-SNAPSHOTS-1.0.0  
> **Estado**: ✅ Plan Aprobado

---

## Fase 1: Detección del Bug

**PO**: Quiero usar las herramientas MCP para auditar mis conversaciones con Copilot.

**SM**: Probamos el servidor `copilot-logs-mcp-server`. Hallazgo:
- `list_copilot_requests()` → ✅ Lista 50+ IDs
- `get_copilot_request(id)` → ❌ Retorna vacío para TODOS los IDs
- `get_latest_request()` → ✅ Funciona

---

## Fase 2: Investigación Root Cause

**SM**: Deep scan de CopilotEngine (read-only) y VsCodeExtension.

**Hallazgo crítico** en `CopilotEngine/requestLoggerImpl.ts:L258`:

```typescript
const entry = uriData.kind === 'latest' 
    ? this._entries.at(-1)      // ✅ Funciona
    : this._entries.find(e => e.id === uriData.id);  // ❌ Solo sesión actual
```

**Root cause**: `_entries[]` es un array efímero en memoria:
- Límite: 100 entries (configurable)
- Se vacía al reiniciar VS Code
- Los IDs listados vienen de disco (metadata), pero el contenido solo existe si el ID está en `_entries[]`

---

## Fase 3: Opciones Evaluadas

| Opción | Descripción | Veredicto |
|--------|-------------|----------|
| **A** | Polling cada 3s | ❌ Descartado (coste CPU) |
| **B** | Event Hook vía API | ❌ No viable (API no expuesta) |
| **C** | Persistencia de cache | ✅ Parcial |
| **D** | Refresh manual + Snapshots | ✅ **APROBADO** |

**Estudio de viabilidad Opción B**: CopilotExtensionApi solo expone `selectScope()` y `getContextProviderAPI()`. No hay acceso a `IRequestLogger` ni `onDidChangeRequests`.

---

## Fase 4: Gap Identificado

**SM**: El caso de uso "refresh al final de 1 hora" tiene un gap.

```
Sesión de 1h con uso intensivo:
├── Requests 1-50    → PERDIDOS (FIFO eviction)
├── Requests 51-100  → PERDIDOS  
└── Requests 101-150 → En _entries[] → CAPTURADOS
```

**Límite de CopilotEngine**: Solo los últimos ~100 requests están disponibles.

---

## Fase 5: Decisión Final

**PO**: Aceptamos la limitación con advertencia al usuario. Cambiamos el enfoque:

1. **No polling** — Usamos botón REFRESH existente
2. **Advertencia clara** — "Toma snapshots cada poco rato"
3. **Panel View con CRUD** — Lista, busca, exporta snapshots
4. **Persistencia en DISCO** — `ARCHIVO/DISCO/COPILOT_SNAPSHOTS/`
5. **Índice doble** — INDEX.md (DRY) + ABSTRACT.md (semántico)

---

## Fase 6: Plan Aprobado

### Nuevas Funcionalidades

| Feature | Descripción |
|---------|-------------|
| Tool "help" | Guía con advertencia sobre límite 100 |
| SnapshotManager | Servicio para capturar/persistir |
| Panel View CRUD | Lista, busca, exporta, elimina snapshots |
| Índices automáticos | INDEX.md + ABSTRACT.md |
| Link a backlog | Vincular snapshot a épica/story |

### Estimación

| Fase | Tasks | Horas |
|------|-------|-------|
| Core | 4 | ~6h |
| UI | 3 | ~6h |
| Índices | 3 | ~4h |
| **Total** | **10** | **~16h** |

---

## Advertencia para Usuarios

```
⚠️ IMPORTANTE

Los logs de Copilot tienen un límite de ~100 requests en memoria.
En sesiones largas, los requests antiguos se sobrescriben.

👉 Usa el botón REFRESH especialmente en las partes que quieras conservar.
👉 Acuérdate de tomar la foto (snapshot) cada poco rato.
```

---

## Documentación Generada

| # | Archivo | Contenido |
|---|---------|----------|
| 01 | backlog-borrador.md | Plan de implementación (este archivo lo reemplaza) |
| 02 | informe-ox-indice-scrum.md | Investigación DRY |
| 03 | conversacion-po-sm-justificacion.md | Justificación técnica |
| 04 | correccion-bug-verificacion-empirica.md | Tests empíricos |
| 05 | solucion-arquitectonica-propuesta.md | Opciones A/B/C |
| 06 | estudio-viabilidad-opcion-b.md | API no expuesta |
| 07 | analisis-viabilidad-plan-po-sm.md | Gap identificado |
| 08 | plan-implementacion-aprobado.md | Plan final |

---

## Siguiente Paso

Implementar T001: Tool "help" con advertencia en `CopilotLogsMCPServer.ts`.
