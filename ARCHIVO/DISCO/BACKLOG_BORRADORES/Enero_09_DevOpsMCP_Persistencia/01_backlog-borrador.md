# Backlog Borrador: MCP-PERSISTENCE-1.0.0

> **Épica**: MCP-PERSISTENCE-1.0.0  
> **Sprint**: FC1  
> **Fecha**: 2026-01-09  
> **Estado**: ✅ Completado

---

## Resumen Ejecutivo

Implementación de persistencia MongoDB-style para DevOps MCP Server. Los prompts y resources ahora se guardan automáticamente en disco como documentos JSON individuales.

---

## Problema

El DevOps Server usaba `GenericCRUDManager` con almacenamiento en memoria (`Map<string, T>`). Al reiniciar el servidor, todos los prompts y resources creados vía CRUD tools se perdían.

---

## Solución

Capa de persistencia tipo MongoDB con colecciones de documentos JSON:

```
ARCHIVO/PLUGINS/MCP_DATA/{serverName}/
├── prompts/
│   └── {id}.json
├── resources/
│   └── {id}.json
└── _metadata.json
```

---

## Stories Completadas

### S1: FilePersistenceManager (5 pts) ✅

**Como** servidor MCP  
**Quiero** persistir datos en disco tipo MongoDB  
**Para** no perder información al reiniciar

**Tasks**:
| ID | Task | Estado |
|----|------|--------|
| T1.1 | Crear `FileCollection<T>` con CRUD async | ✅ |
| T1.2 | Crear `FileDatabase` para múltiples colecciones | ✅ |
| T1.3 | Crear factory `createFileDatabase()` | ✅ |

**Archivos**:
- `managers/FilePersistenceManager.ts`

---

### S2: PersistentCRUDManager (3 pts) ✅

**Como** servidor MCP  
**Quiero** extender GenericCRUDManager con persistencia  
**Para** mantener compatibilidad con API existente

**Tasks**:
| ID | Task | Estado |
|----|------|--------|
| T2.1 | Extender `GenericCRUDManager` | ✅ |
| T2.2 | Añadir métodos `*Async` con persistencia | ✅ |
| T2.3 | Implementar `syncToDisk/syncFromDisk` | ✅ |

**Archivos**:
- `managers/PersistentCRUDManager.ts`

---

### S3: PersistentContentManager (5 pts) ✅

**Como** servidor MCP  
**Quiero** un ContentManager con persistencia  
**Para** reemplazar ContentManager sin cambiar API

**Tasks**:
| ID | Task | Estado |
|----|------|--------|
| T3.1 | Crear `PersistentContentManager` | ✅ |
| T3.2 | Implementar `IContentManager` interface | ✅ |
| T3.3 | Añadir `init()` para carga desde disco | ✅ |
| T3.4 | Añadir `exportAll/importAll` | ✅ |

**Archivos**:
- `managers/PersistentContentManager.ts`

---

### S4: IContentManager Interface (2 pts) ✅

**Como** desarrollador  
**Quiero** una interfaz común para ContentManagers  
**Para** que CRUDToolsManager acepte ambos tipos

**Tasks**:
| ID | Task | Estado |
|----|------|--------|
| T4.1 | Crear `IContentManager` interface | ✅ |
| T4.2 | Soportar retornos sync y async | ✅ |
| T4.3 | Actualizar `ContentManager implements IContentManager` | ✅ |
| T4.4 | Actualizar `CRUDToolsManager` para usar interfaz | ✅ |

**Archivos**:
- `managers/ContentDefinitions.ts`
- `managers/ContentManager.ts`
- `managers/CRUDToolsManager.ts`

---

### S5: DevOpsServer Integration (3 pts) ✅

**Como** DevOps Server  
**Quiero** usar PersistentContentManager  
**Para** persistir prompts y resources automáticamente

**Tasks**:
| ID | Task | Estado |
|----|------|--------|
| T5.1 | Cambiar import a `PersistentContentManager` | ✅ |
| T5.2 | Actualizar `initializeManagers()` | ✅ |
| T5.3 | Crear directorio datos `MCP_DATA/devops-mcp-server/` | ✅ |

**Archivos**:
- `DevOpsServerImpl.ts`
- `ARCHIVO/PLUGINS/MCP_DATA/devops-mcp-server/`

---

## Archivos Creados/Modificados

| Archivo | Operación | Líneas |
|---------|-----------|--------|
| `managers/FilePersistenceManager.ts` | ➕ Creado | ~250 |
| `managers/PersistentCRUDManager.ts` | ➕ Creado | ~150 |
| `managers/PersistentContentManager.ts` | ➕ Creado | ~400 |
| `managers/ContentDefinitions.ts` | ✏️ Modificado | +25 (IContentManager) |
| `managers/ContentManager.ts` | ✏️ Modificado | +2 (implements) |
| `managers/CRUDToolsManager.ts` | ✏️ Modificado | +10 (Promise.resolve) |
| `managers/index.ts` | ✏️ Modificado | +5 (exports) |
| `DevOpsServerImpl.ts` | ✏️ Modificado | +5 (import + init) |
| `ARCHIVO/PLUGINS/MCP_DATA/README.md` | ➕ Creado | ~50 |

---

## Métricas

| Métrica | Valor |
|---------|-------|
| Stories | 5 |
| Tasks | 14 |
| Effort total | 18 pts |
| Archivos nuevos | 4 |
| Archivos modificados | 5 |

---

## API Resultante

```typescript
// Inicialización
const contentManager = new PersistentContentManager(server, 'devops-mcp-server');
await contentManager.init(); // Carga desde disco

// CRUD (persiste automáticamente)
await contentManager.addPrompt(prompt);
await contentManager.updatePrompt(id, updates);
await contentManager.deletePrompt(id);

// Export/Import
const backup = await contentManager.exportAll();
await contentManager.importAll(backup);
```

---

## Criterios de Aceptación

- [x] Prompts persisten entre reinicios del servidor
- [x] Resources persisten entre reinicios del servidor
- [x] Formato JSON legible (un archivo por documento)
- [x] Compatibilidad con CRUDToolsManager existente
- [x] Sin breaking changes en API pública

---

## Changelog

| Fecha | Cambio |
|-------|--------|
| 2026-01-09 | ✅ Épica completada |
