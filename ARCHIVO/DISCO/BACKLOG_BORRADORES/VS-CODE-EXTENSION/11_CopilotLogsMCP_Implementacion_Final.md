# Copilot Logs MCP Server — Implementación Final

> **Épica**: SCRIPT-2.1.1 Copilot Log Exporter MCP  
> **Fecha**: 2025-12-30  
> **Estado**: ✅ Completado

---

## 🎉 Resultado Final: ¡FUNCIONA!

El servidor MCP está operativo y **Copilot puede leer su propio contexto**.

### `get_latest_request` — MI PROPIO CONTEXTO

| Campo | Valor |
|-------|-------|
| **Request ID** | `latest` |
| **System Message** | 0 (preview truncado) |
| **User Messages** | 10 mensajes de la conversación |
| **Assistant Responses** | 0 (no capturados en este formato) |

Los `userMessages` muestran la **estructura completa del contexto** que recibe Copilot:
- `<environment_info>` (OS macOS)
- `<workspace_info>` (tasks, folder structure)
- `<attachments>` (archivos adjuntos)
- `<reminderInstructions>` (instrucciones del sistema)
- `<userRequest>` (mensaje del usuario)

### `get_diagnostics` — Estado del Sistema

| Métrica | Valor |
|---------|-------|
| Status | ✅ available |
| Requests indexados | 9 |
| Sesiones | 3 |
| Cache | 9/5 (límite configurable) |
| Puerto MCP | 3100 |
| Log Path | `~/Library/Application Support/Code/logs` |

---

## Arquitectura Implementada

```
┌─────────────────────────────────────────────────────────────────┐
│                    VS Code Extension Host                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────┐     ┌──────────────────────────────────┐  │
│  │ GitHub Copilot   │     │ Aleph Scriptorium Extension      │  │
│  │ Chat Extension   │     │                                  │  │
│  │                  │     │  ┌────────────────────────────┐  │  │
│  │  _entries[] ─────┼─────┼─►│ CopilotLogsMCPServer       │  │  │
│  │  (current sess)  │     │  │ - HTTP :3100               │  │  │
│  │                  │     │  │ - 10 tools MCP             │  │  │
│  │  ccreq: scheme ──┼─────┼─►│ - LRU Cache (5 default)    │  │  │
│  │                  │     │  └────────────────────────────┘  │  │
│  └──────────────────┘     │              │                   │  │
│                           │              ▼                   │  │
│                           │  ┌────────────────────────────┐  │  │
│                           │  │ CcreqDocumentResolver      │  │  │
│                           │  │ - vscode.workspace.open()  │  │  │
│                           │  │ - Content parsing          │  │  │
│                           │  │ - Cache management         │  │  │
│                           │  └────────────────────────────┘  │  │
│                           │              │                   │  │
│                           │              ▼                   │  │
│                           │  ┌────────────────────────────┐  │  │
│                           │  │ DiskLogScanner             │  │  │
│                           │  │ - Historical logs          │  │  │
│                           │  │ - Session indexing         │  │  │
│                           │  └────────────────────────────┘  │  │
│                           └──────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼ HTTP
┌─────────────────────────────────────────────────────────────────┐
│                     Claude (Copilot Chat)                        │
│                     - Invoca tools MCP                           │
│                     - Analiza su propio contexto                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 10 Herramientas MCP Disponibles

| # | Tool | Descripción |
|---|------|-------------|
| 1 | `list_copilot_sessions` | Listar sesiones agrupadas por tiempo |
| 2 | `list_copilot_requests` | Listar requests de una sesión |
| 3 | `get_copilot_request` | Obtener request por ID |
| 4 | `get_latest_request` | ✨ **NUEVO** — Obtener request actual |
| 5 | `analyze_session` | Análisis de context bloat |
| 6 | `search_requests` | Buscar patrones en contenido |
| 7 | `export_conversation` | Exportar conversación completa |
| 8 | `get_usage_metrics` | Métricas de uso (24h) |
| 9 | `get_diagnostics` | Estado del servidor y caché |
| 10 | `configure_cache` | ✨ **NUEVO** — Configurar tamaño caché |

---

## Sistema de Caché LRU

### Configuración

```typescript
// Por defecto: 5 requests
// Máximo: 100 requests
setCacheConfig({ maxCacheSize: 20 });
```

### Uso via MCP

```json
// Configurar caché a 20 requests
{
  "tool": "configure_cache",
  "arguments": { "maxSize": 20 }
}

// Ver estado del caché
{
  "tool": "get_diagnostics"
}
// Respuesta incluye:
// "cache": { "size": 5, "maxSize": 20, "cachedIds": ["abc123", ...] }
```

### Comportamiento

1. **LRU Eviction**: Cuando se alcanza el límite, se elimina el más antiguo
2. **Touch on Access**: Acceder a un request lo mueve al final (más reciente)
3. **Timestamp**: Cada entrada tiene `cachedAt` para auditoría
4. **Logging**: Console logs para debugging (`[CcreqResolver] ...`)

---

## Limitación Conocida: Esquema `ccreq:`

### El Problema

El esquema `ccreq:` de GitHub Copilot Chat solo expone requests de la **sesión actual en memoria** (`_entries[]`). Los IDs históricos de logs de disco ya no están disponibles.

```typescript
// En CopilotEngine/src/extension/prompt/vscode-node/requestLoggerImpl.ts
const entry = uriData.kind === 'latest' 
    ? this._entries.at(-1)      // ✅ Último entry actual
    : this._entries.find(...)    // ❌ Solo sesión actual
```

### La Solución

1. **`ccreq:latest`** → Siempre funciona para el request actual
2. **Caché LRU** → Guarda requests resueltos exitosamente
3. **DiskLogScanner** → Indexa metadata histórica (sin contenido completo)

---

## Archivos Modificados

### Nuevos Exports

```typescript
// VsCodeExtension/src/copilotLogs/index.ts
export {
    getCacheStats,
    clearCache,
    setCacheConfig,
    getCacheConfig,
    CacheConfig
} from './CcreqDocumentResolver';
```

### CcreqDocumentResolver.ts

- `CacheConfig` interface
- `cacheOrder: string[]` para LRU
- `trimCache()` — evicción automática
- `setCacheConfig()` / `getCacheConfig()`
- `getCacheStats()` — para diagnósticos
- Logging detallado con prefijo `[CcreqResolver]`

### CopilotLogsMCPServer.ts

- Tool `get_latest_request` — usa comando VS Code interno
- Tool `configure_cache` — configura tamaño (1-100)
- `get_diagnostics` incluye stats del caché

### CopilotMetricsPanelProvider.ts

- Sección "💾 Request Cache" en el panel
- Sección "🔧 Diagnostics" mejorada
- Botón Refresh con feedback visual (`⏳ Refreshing...`)
- Logging para debugging

---

## Uso Práctico

### Para Analizar Context Bloat

```
@copilot usa get_latest_request para ver mi contexto actual
```

### Para Configurar Más Historia

```
@copilot usa configure_cache con maxSize 50
```

### Para Verificar Estado

```
@copilot usa get_diagnostics del copilot-logs-mcp-server
```

---

## Próximos Pasos (Opcional)

1. **Persistencia de caché** → Guardar en disco entre sesiones
2. **Export a archivo** → Guardar requests completos como .md
3. **Integración con TypedPrompting** → Alimentar Context Manager
4. **Métricas avanzadas** → Tokens por request, trends

---

## Configuración MCP

```json
// .vscode/mcp.json
{
  "servers": {
    "copilot-logs-mcp-server": {
      "type": "http",
      "url": "http://localhost:3100"
    }
  }
}
```

El servidor se inicia automáticamente con la extensión Aleph Scriptorium.

---

## Conclusión

✅ **Misión Cumplida**: Copilot puede leer su propio contexto para:
- Analizar patrones de uso
- Detectar context bloat
- Alimentar el TypedPrompting Context Manager
- Auto-documentar conversaciones
