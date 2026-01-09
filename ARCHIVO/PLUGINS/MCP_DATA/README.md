# MCP Data Storage — Persistencia Estilo MongoDB

> **Directorio**: `ARCHIVO/PLUGINS/MCP_DATA/`  
> **Épica**: MCP-PERSISTENCE-1.0.0  
> **Versión**: 1.0.0

---

## Propósito

Este directorio almacena datos persistentes de los MCP Servers en formato JSON,
organizados como colecciones de documentos al estilo MongoDB.

---

## Estructura

```
MCP_DATA/
├── README.md                    # Este archivo
├── {serverName}/                # Una carpeta por servidor
│   ├── _metadata.json           # Metadatos de la "database"
│   ├── prompts/                 # Colección de prompts
│   │   ├── {id}.json            # Un documento por prompt
│   │   └── ...
│   ├── resources/               # Colección de resources
│   │   ├── {id}.json            # Un documento por resource
│   │   └── ...
│   └── {collection}/            # Colecciones adicionales
│       └── ...
```

---

## Servidores Configurados

| Servidor | Directorio | Colecciones |
|----------|------------|-------------|
| `devops-mcp-server` | `devops-mcp-server/` | prompts, resources |
| `prolog-mcp-server` | `prolog-mcp-server/` | prompts, resources, sessions |
| `typed-prompt-server` | `typed-prompt-server/` | prompts, resources, schemas |

---

## Formato de Documentos

### Prompt Document

```json
{
  "id": "start-system",
  "name": "Arrancar el sistema",
  "description": "Prompt para arrancar el sistema usando npm start",
  "content": "🚀 **Sistema de Arranque**\n\n...",
  "parameters": {
    "projectPath": { "type": "string", "optional": true }
  },
  "metadata": {
    "category": "devops",
    "priority": "high"
  },
  "createdAt": 1736416800000,
  "updatedAt": 1736416800000
}
```

### Resource Document

```json
{
  "id": "project-status",
  "name": "Estado del Proyecto",
  "description": "Estado actual del proyecto y servicios",
  "uri": "devops://project/status",
  "mimeType": "application/json",
  "content": "{\"projectName\": \"...\", \"status\": \"initialized\"}",
  "metadata": {
    "category": "status",
    "updateInterval": "30s"
  },
  "createdAt": 1736416800000,
  "updatedAt": 1736416800000
}
```

---

## API de Persistencia

### FileDatabase

```typescript
import { createFileDatabase } from '@managers';

// Crear instancia
const db = createFileDatabase('devops-mcp-server');
await db.init();

// Obtener colección
const prompts = db.collection<PromptDefinition>('prompts');

// CRUD operations
await prompts.insertOne(prompt);
await prompts.findById('start-system');
await prompts.updateOne('start-system', { content: '...' });
await prompts.deleteOne('start-system');
```

### PersistentContentManager

```typescript
import { PersistentContentManager } from '@managers';

// En lugar de ContentManager
const contentManager = new PersistentContentManager(
    server,
    'devops-mcp-server'
);

// Inicializar (carga desde disco)
await contentManager.init();

// Operaciones CRUD con persistencia automática
await contentManager.addPrompt(prompt);
await contentManager.updatePrompt('id', updates);
await contentManager.deletePrompt('id');

// Sincronización manual
await contentManager.syncToDisk();
await contentManager.syncFromDisk();

// Export/Import
const backup = await contentManager.exportAll();
await contentManager.importAll(backup, true);
```

---

## Migración desde ContentManager

### Antes (Solo Memoria)

```typescript
this.contentManager = new ContentManager(server, 'devops-mcp-server');
this.contentManager.addPrompt(prompt);  // Se pierde al reiniciar
```

### Después (Con Persistencia)

```typescript
this.contentManager = new PersistentContentManager(server, 'devops-mcp-server');
await this.contentManager.init();  // Carga desde disco
await this.contentManager.addPrompt(prompt);  // Persiste automáticamente
```

---

## Consideraciones

### Rendimiento

- Los datos se cachean en memoria para lecturas rápidas
- Las escrituras son asíncronas por defecto
- Use `*Async` methods para garantizar persistencia antes de continuar

### Concurrencia

- Un solo servidor por carpeta
- No soporta múltiples instancias escribiendo a la misma colección
- Para multi-instancia, usar base de datos real (SQLite, MongoDB)

### Backup

```bash
# Backup simple
cp -r ARCHIVO/PLUGINS/MCP_DATA/ backups/mcp_data_$(date +%Y%m%d)/

# Restore
cp -r backups/mcp_data_20260109/ ARCHIVO/PLUGINS/MCP_DATA/
```

---

## Roadmap

- [ ] Índices secundarios para búsquedas rápidas
- [ ] Compresión de documentos grandes
- [ ] Versionado de documentos
- [ ] Migración automática de esquemas
- [ ] Integración con SQLite para queries complejas

---

## Referencias

- **FilePersistenceManager**: `MCPGallery/mcp-mesh-sdk/src/managers/FilePersistenceManager.ts`
- **PersistentCRUDManager**: `MCPGallery/mcp-mesh-sdk/src/managers/PersistentCRUDManager.ts`
- **PersistentContentManager**: `MCPGallery/mcp-mesh-sdk/src/managers/PersistentContentManager.ts`
