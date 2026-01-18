# Acta T007: Mapa Técnico Stack MCP-SDK → Editor

## Metadatos

| Campo | Valor |
|-------|-------|
| **Turno** | 007 |
| **Agente** | @plugin_ox_aaiaeditor |
| **Inicio** | 2026-01-18 17:00 |
| **Fin** | 2026-01-18 17:30 |
| **Estado final** | ✅ DONE |

## Contexto Leído

| Archivo | Propósito |
|---------|-----------|
| `mcp-core-sdk/src/browser/index.ts` | Exports browser-safe |
| `mcp-core-sdk/src/types/prolog/index.ts` | Tipos Prolog |
| `mcp-core-sdk/src/types/aaia/index.ts` | Tipos AAIA |
| `PrologEditor/frontend/src/app/models/*.ts` | Patrón modelos |
| `PrologEditor/frontend/src/app/services/prolog.service.ts` | Patrón servicios |
| `AAIAGallery/frontend/src/app/services/socketio/server.service.ts` | Estado actual |

## Objetivo

Crear mapa técnico que documente:
1. Relación entre las 4 capas del stack (core-sdk → mesh-sdk → backend → frontend)
2. Comparativa Prolog vs AAIA
3. Gap analysis para integrar AAIAGallery/frontend con mcp-core-sdk

## Aportación

### Artefacto Producido

| Archivo | Descripción |
|---------|-------------|
| `03_REFERENCIAS/mapa-tecnico-stack.md` | Mapa técnico completo (~300 líneas) |

### Hallazgos Clave

1. **PrologEditor/frontend ya integrado** con `@alephscript/mcp-core-sdk/browser`:
   - Modelos re-exportan desde SDK
   - Servicios usan tipos compartidos
   - Build estable

2. **AAIAGallery/frontend usa paths relativos** problemáticos:
   ```typescript
   import { IServerState } from "../../../../../ws-server/src/alephscript/IServerState";
   ```

3. **Tipos AAIA ya existen** en `mcp-core-sdk/types/aaia/` (creados en T005) pero **no exportados en browser/index.ts**

### Stories Derivadas

| ID | Story | Effort |
|----|-------|--------|
| S10 | Exportar tipos AAIA en browser/index.ts | 2 pts |
| S11 | Crear models/ en AAIAGallery/frontend | 3 pts |
| S12 | Instalar mcp-core-sdk en AAIAGallery | 2 pts |
| S13 | Migrar ServerService a tipos mcp-core-sdk | 5 pts |
| S14 | Crear AAIAService (patrón PrologService) | 8 pts |
| S15 | Añadir backend gateway AAIAGallery | 13 pts |

**Total derivado**: 33 pts

## Diagrama Resumen

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              STACK ACTUAL                                   │
└─────────────────────────────────────────────────────────────────────────────┘

                    mcp-core-sdk/browser
                           │
          ┌────────────────┴────────────────┐
          │                                 │
          ▼                                 ▼
   PrologEditor/frontend            AAIAGallery/frontend
   ✅ Usa SDK types                 ❌ Paths relativos
   ✅ PrologService REST            ⚠️ Solo Socket.IO
   ✅ 10 componentes                ⚠️ Sin modelos DRY
```

## Siguiente Turno Sugerido

**@plugin_ox_aaiaeditor** para implementar S10-S12 (integración básica, 7 pts)

O **@scrum** para registrar nueva épica AAIA-FRONTEND-INTEGRATION-1.0.0

## Métricas del Turno

| Métrica | Valor |
|---------|-------|
| Archivos leídos | 12 |
| Archivos creados | 2 |
| Decisiones tomadas | 1 |
| Stories derivadas | 6 |
