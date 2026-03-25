# Informe Coordinado: Bug Copilot Logs MCP

> **Agentes coordinados**: @ox (investigación), @indice (navegación), @scrum (backlog)  
> **Fecha**: 2026-01-01  
> **Bug**: BUG-MCLOGS-1.0.0

---

## 📊 Resumen Ejecutivo

**Síntoma**: `get_copilot_request(id)` retorna objetos vacíos para cualquier ID excepto `latest`.

**Causa raíz**: El esquema `ccreq:` de GitHub Copilot Chat **solo expone requests de la sesión actual en memoria** (`_entries[]`). Los IDs históricos de logs de disco no son accesibles vía este mecanismo.

**Estado**: El bug **ya estaba documentado como limitación conocida** en la épica cerrada SCRIPT-2.1.1.

---

## 🔍 Hallazgos por Agente

### @Scrum — Estado en Backlogs

| Fuente | Estado | Referencia |
|--------|--------|------------|
| Bug reportado | 🐛 Nuevo | [01_backlog-borrador.md](01_backlog-borrador.md) |
| Épica padre (SCRIPT-2.1.1) | ✅ Completada | [Diciembre_30_CopilotLogExporter/](../Diciembre_30_CopilotLogExporter/) |
| INDEX.md | ✅ Registrado L53 | [INDEX.md](../INDEX.md) |
| BACKLOG-SCRIPTORIUM.md | ⚠️ **NO registrado** | Pendiente |

### @Indice — Mapa de Referencias (DRY)

| Concepto | Archivo canónico | Líneas clave |
|----------|------------------|--------------|
| Arquitectura ccreq: | [prompt-investigacion-ccreq.md](../Diciembre_30_CopilotLogExporter/prompt-investigacion-ccreq.md) | L14-50 |
| Decisión embeber MCP | [conversacion-po-sm.md](../Diciembre_30_CopilotLogExporter/conversacion-po-sm.md) | L52-95 |
| Limitación documentada | [11_CopilotLogsMCP_Implementacion_Final.md](../VS-CODE-EXTENSION/11_CopilotLogsMCP_Implementacion_Final.md) | L139-156 |
| Implementación caché LRU | [CcreqDocumentResolver.ts](../../../VsCodeExtension/src/copilotLogs/CcreqDocumentResolver.ts) | L14-100 |
| Panel Metrics WebView | [CopilotMetricsPanelProvider.ts](../../../VsCodeExtension/src/copilotLogs/CopilotMetricsPanelProvider.ts) | Completo |

### @Ox — Análisis Técnico

#### 1. La promesa: Acceso total embebiendo MCP en la extensión

**Fuente**: [conversacion-po-sm.md L52-70](../Diciembre_30_CopilotLogExporter/conversacion-po-sm.md)

```
| Opción | Descripción | Viabilidad |
|--------|-------------|------------|
| A) Servidor MCP standalone | Node.js independiente | ❌ No tiene acceso a VS Code API |
| B) Plugin de DevOpsServer | Extender mcp-mesh-sdk | ❌ Mismo problema |
| C) Extensión VS Code + MCP | Server MCP dentro de extensión | ✅ Acceso total |
```

**Lo que se prometió**: Acceso total a `vscode.workspace.openTextDocument(ccreq:...)` desde el MCP Server embebido.

**Lo que se entregó**: ✅ Acceso funciona — pero solo para requests de la **sesión actual en memoria**.

#### 2. La limitación: `_entries[]` es efímero

**Fuente**: [11_CopilotLogsMCP_Implementacion_Final.md L143-156](../VS-CODE-EXTENSION/11_CopilotLogsMCP_Implementacion_Final.md)

```typescript
// En CopilotEngine/src/extension/prompt/vscode-node/requestLoggerImpl.ts
const entry = uriData.kind === 'latest' 
    ? this._entries.at(-1)      // ✅ Último entry actual
    : this._entries.find(...)    // ❌ Solo sesión actual
```

**Implicación**: 
- `ccreq:latest` → ✅ Siempre funciona
- `ccreq:{id}` → ❌ Solo si el ID está en `_entries[]` actual

#### 3. La solución implementada: Caché LRU de 5

**Fuente**: [CcreqDocumentResolver.ts L14-21](../../../VsCodeExtension/src/copilotLogs/CcreqDocumentResolver.ts)

```typescript
export interface CacheConfig {
    /** Maximum number of requests to keep in cache (default: 5) */
    maxCacheSize: number;
}

const DEFAULT_CACHE_CONFIG: CacheConfig = {
    maxCacheSize: 5
};
```

**Comportamiento**:
1. Cuando `get_latest_request` resuelve exitosamente → guarda en caché
2. Caché mantiene las últimas 5 requests
3. `get_copilot_request(id)` busca primero en caché
4. Si no está en caché Y no está en `_entries[]` → retorna vacío

---

## 📜 Evidencia en Commits

**Fuente**: `git log --grep="copilot" --grep="MCP"`

| Hash | Mensaje | Fecha |
|------|---------|-------|
| `e68c058` | feat(script/extension): completar épica SCRIPT-2.1.1 Copilot Log Exporter | 2025-12-30 |
| `848479e` | chore(submodule): actualizar VsCodeExtension a c2adc86 | 2025-12-30 |

---

## 🐛 Por qué es un bug ahora

| Expectativa | Realidad |
|-------------|----------|
| `list_copilot_requests` lista IDs | ✅ Funciona (escanea logs de disco) |
| `get_copilot_request(id)` retorna contenido | ❌ Solo si está en caché o sesión actual |

**El bug es una expectativa rota**: El usuario ve IDs históricos listados → intenta acceder → vacío.

---

## ✅ Workarounds Disponibles

| Workaround | Cómo usarlo |
|------------|-------------|
| Usar `get_latest_request` | Siempre funciona para el request actual |
| Aumentar caché | `configure_cache` con `maxSize: 50` |
| Consultar en misma sesión | Acceder a requests antes de reiniciar VS Code |

---

## 📋 Acciones Recomendadas

| # | Acción | Responsable | Prioridad |
|---|--------|-------------|-----------|
| 1 | Registrar BUG-MCLOGS-1.0.0 en BACKLOG-SCRIPTORIUM.md | @scrum | Alta |
| 2 | Evaluar si es bug Scriptorium o upstream (GitHub) | @ox | Media |
| 3 | Documentar workarounds en README del plugin | @ox | Media |
| 4 | Considerar persistencia de caché en disco | @scrum | Baja |

---

## 📁 Índice de Referencias (DRY)

> **Principio**: Este informe NO duplica contenido. Apunta a fuentes.

### Borradores relacionados
- [Enero_2026_CopilotLogsMCP_Bug/](.) — Bug actual
- [Diciembre_30_CopilotLogExporter/](../Diciembre_30_CopilotLogExporter/) — Épica padre
- [VS-CODE-EXTENSION/](../VS-CODE-EXTENSION/) — Implementación general

### Código fuente
- [VsCodeExtension/src/copilotLogs/](../../../VsCodeExtension/src/copilotLogs/) — Módulo completo
- [CcreqDocumentResolver.ts](../../../VsCodeExtension/src/copilotLogs/CcreqDocumentResolver.ts) — Caché LRU
- [CopilotLogsMCPServer.ts](../../../VsCodeExtension/src/copilotLogs/CopilotLogsMCPServer.ts) — Server MCP

### Configuración
- [.vscode/mcp.json](../../../.vscode/mcp.json) — Puerto 3100

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-01-01 | 📋 Informe coordinado Ox+Indice+Scrum | @ox |
