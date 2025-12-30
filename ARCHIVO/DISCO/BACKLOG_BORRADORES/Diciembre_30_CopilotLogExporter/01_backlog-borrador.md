# Backlog Borrador: SCRIPT-2.1.1 Copilot Log Exporter

> **Sprint**: PRE (diciembre 2025)  
> **Estado**: ✅ Implementado  
> **Effort**: 8 pts  
> **Actualizado**: 2025-12-30

---

## Épica

**SCRIPT-2.1.1**: Copilot Log Exporter MCP Server

Servidor MCP embebido en la extensión VS Code que permite a Claude acceder a sus propios logs de Copilot Chat para auto-diagnóstico y análisis de context bloat.

---

## Wishlist Original

| ID | Nombre | Descripción | Effort | Estado |
|----|--------|-------------|--------|--------|
| WISH-01 | Copilot Log Exporter MCP | Server MCP con tools de análisis | 8 pts | ✅ |
| WISH-02 | Agent Auto-Debug | Debug automático de agentes | 2 pts | ✅ |
| WISH-03 | Metrics Panel WebView | Panel visual de métricas | 3 pts | ✅ |

---

## Stories

### S01: Infraestructura de acceso a logs (3 pts) ✅

| Task | Descripción | Estado |
|------|-------------|--------|
| T01 | Crear `DiskLogScanner.ts` para escanear logs de disco | ✅ |
| T02 | Crear `CcreqDocumentResolver.ts` para resolver URIs ccreq: | ✅ |
| T03 | Crear `types.ts` con interfaces compartidas | ✅ |

### S02: Análisis de Context Bloat (2 pts) ✅

| Task | Descripción | Estado |
|------|-------------|--------|
| T04 | Crear `ContextBloatAnalyzer.ts` con métricas | ✅ |
| T05 | Definir umbrales y recomendaciones | ✅ |

### S03: MCP Server embebido (3 pts) ✅

| Task | Descripción | Estado |
|------|-------------|--------|
| T06 | Añadir mcp-core-sdk como submódulo | ✅ |
| T07 | Crear `CopilotLogsMCPServer.ts` extends BaseMCPServer | ✅ |
| T08 | Registrar 8 tools MCP | ✅ |
| T09 | Registrar 2 resources MCP | ✅ |
| T10 | Resolver problemas de compilación (typesVersions) | ✅ |

### S04: Comandos VS Code (2 pts) ✅

| Task | Descripción | Estado |
|------|-------------|--------|
| T11 | Crear `commands.ts` con 12 comandos | ✅ |
| T12 | Actualizar package.json contributes | ✅ |

---

## Archivos Creados

| Archivo | Líneas | Propósito |
|---------|--------|-----------|
| `src/copilotLogs/types.ts` | 120 | Interfaces |
| `src/copilotLogs/DiskLogScanner.ts` | 180 | Scanner disco |
| `src/copilotLogs/CcreqDocumentResolver.ts` | 150 | Resolver URIs |
| `src/copilotLogs/ContextBloatAnalyzer.ts` | 200 | Análisis |
| `src/copilotLogs/CopilotLogExporterService.ts` | 478 | Servicio principal |
| `src/copilotLogs/AgentAutoDebugService.ts` | 150 | Auto-debug |
| `src/copilotLogs/CopilotMetricsPanelProvider.ts` | 180 | WebView panel |
| `src/copilotLogs/commands.ts` | 350 | Comandos |
| `src/copilotLogs/CopilotLogsMCPServer.ts` | 520 | MCP Server |
| `src/copilotLogs/index.ts` | 25 | Re-exports |

**Total**: ~2350 líneas

---

## MCP Tools Implementados

| Tool | Input | Output |
|------|-------|--------|
| `list_copilot_sessions` | limit?, daysBack? | SessionInfo[] |
| `list_copilot_requests` | sessionId?, limit? | RequestInfo[] |
| `get_copilot_request` | requestId | CcreqDocumentContent |
| `analyze_session` | sessionId? | ContextBloatAnalysis |
| `search_requests` | query, field? | RequestInfo[] |
| `export_conversation` | conversationId | ConversationExport |
| `get_usage_metrics` | daysBack? | UsageMetrics |
| `get_diagnostics` | — | SystemDiagnostics |

---

## Dependencias

### Añadidas a VsCodeExtension

```json
{
  "@alephscript/mcp-core-sdk": "file:./mcp-core-sdk",
  "express": "^5.1.0",
  "zod": "^3.24.0",
  "@modelcontextprotocol/sdk": "^1.0.0"
}
```

### Cambios en mcp-core-sdk (backwards-compatible)

```json
{
  "typesVersions": {
    "*": {
      "server": ["dist/server/index.d.ts"],
      "resources": ["dist/resources/index.d.ts"],
      "prompts": ["dist/prompts/index.d.ts"]
    }
  }
}
```

---

## Definition of Done

| Criterio | Estado |
|----------|--------|
| `npm run compile` exit code 0 | ✅ |
| MCP Server extiende BaseMCPServer | ✅ |
| Sin breaking changes en mcp-core-sdk | ✅ |
| Documentación completa | ✅ |

---

## Referencias

- [Conversación PO-SM](conversacion-po-sm.md)
- [CONVERSACION_DE_BACKLOG.md](CONVERSACION_DE_BACKLOG.md)
- [CopilotEngine/requestLoggerImpl.ts](../../../../CopilotEngine/src/vs/workbench/contrib/chat/browser/requestLoggerImpl.ts)
