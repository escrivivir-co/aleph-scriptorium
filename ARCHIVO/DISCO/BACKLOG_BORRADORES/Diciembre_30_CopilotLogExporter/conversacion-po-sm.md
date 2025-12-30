# Conversación PO-SM: Copilot Log Exporter MCP

> **Sprint**: PRE (30 diciembre 2025)  
> **Épica**: SCRIPT-2.1.1 Copilot Log Exporter  
> **Duración sesión**: ~4 horas

---

## Contexto Inicial

**PO (Lucas)**: Llevamos días arrastrando un problema de **context bloat**. La sesión anterior consumió 127K tokens y perdimos el hilo. Necesitamos que Claude pueda **auto-diagnosticarse** accediendo a sus propios logs.

**SM (@scrum)**: Entendido. ¿Cuál es el objetivo concreto?

**PO**: Que Claude pueda responder: "¿Cuántos tokens usé en la última hora? ¿Dónde está el problema? ¿Qué agentes usé?"

---

## Fase 1: Investigación (2h)

### Problema a resolver

**SM**: ¿Existe alguna forma actual de acceder a los logs de Copilot?

**@ox (investigando)**: Encontré tres fuentes:
1. **VS Code Output Window** → "GitHub Copilot Chat" channel
2. **Logs en disco** → `~/Library/Application Support/Code/logs/{TIMESTAMP}/.../GitHub Copilot Chat.log`
3. **CopilotEngine** → Submódulo con código fuente del Copilot Chat

**PO**: ¿Qué encontraste en CopilotEngine?

**@ox**: Descubrí el **esquema `ccreq:`** — un URI interno que expone documentos virtuales con el contenido completo de cada request:
- `requestLoggerImpl.ts` → Clase `RequestLogger` con `_entries[]`
- `TextDocumentContentProvider` → Registra el scheme `ccreq`
- `provideTextDocumentContent()` → Retorna markdown con system message, tools, tokens...

**SM**: ¿Eso significa que podemos leer los logs programáticamente?

**@ox**: Sí, pero SOLO desde dentro del Extension Host de VS Code. El código usa `vscode.workspace.openTextDocument()` que no existe fuera de una extensión.

---

## Fase 2: Diseño Arquitectónico

### Opciones evaluadas

| Opción | Descripción | Viabilidad |
|--------|-------------|------------|
| A) Servidor MCP standalone | Node.js independiente | ❌ No tiene acceso a VS Code API |
| B) Plugin de DevOpsServer | Extender mcp-mesh-sdk | ❌ Mismo problema |
| C) Extensión VS Code + MCP | Server MCP dentro de extensión | ✅ Acceso total |
| D) Fork CopilotEngine | Modificar fuente | ❌ Mantenimiento imposible |

**PO**: ¿Por qué C es viable?

**@ox**: Descubrí que el **Extension Host ES Node.js**. Puedo:
- Levantar `http.createServer()` normalmente
- Usar el SDK MCP de Anthropic
- Acceder a `vscode.workspace.openTextDocument(ccreq:...)`

Todo en el mismo proceso.

**SM**: Entonces embebemos un MCP Server dentro de VsCodeExtension.

**PO**: Y queremos que siga el mismo patrón que los otros servers de la mesh.

---

## Fase 3: Decisión de Implementación

### Arquitectura aprobada

```
Claude (Copilot Chat)
       │
       ▼
MCP Client (mcp.json)
       │
       ▼
┌────────────────────────────────────────┐
│      VS Code Extension (Node.js)       │
│  ┌──────────────────────────────────┐  │
│  │  CopilotLogsMCPServer            │  │
│  │  extends BaseMCPServer           │  │
│  │  (port 3100)                     │  │
│  │                                  │  │
│  │  Tools MCP:                      │  │
│  │  - list_copilot_sessions         │  │
│  │  - list_copilot_requests         │  │
│  │  - get_copilot_request  ← ccreq: │  │
│  │  - analyze_session               │  │
│  │  - search_requests               │  │
│  │  - export_conversation           │  │
│  │  - get_usage_metrics             │  │
│  │  - get_diagnostics               │  │
│  └──────────────────────────────────┘  │
│                                        │
│  CopilotLogExporterService             │
│  CcreqDocumentResolver                 │
│  DiskLogScanner                        │
│  ContextBloatAnalyzer                  │
└────────────────────────────────────────┘
```

**PO**: ¿Y el mcp-core-sdk?

**@ox**: Lo añadimos como **submódulo git** con dependencia `file:`:
```json
"@alephscript/mcp-core-sdk": "file:./mcp-core-sdk"
```

---

## Fase 4: Implementación (2h)

### Archivos creados

| Archivo | Propósito | Líneas |
|---------|-----------|--------|
| `types.ts` | Interfaces compartidas | 120 |
| `DiskLogScanner.ts` | Escanea logs de disco | 180 |
| `CcreqDocumentResolver.ts` | Resuelve ccreq: URIs | 150 |
| `ContextBloatAnalyzer.ts` | Análisis de context bloat | 200 |
| `CopilotLogExporterService.ts` | Servicio principal | 478 |
| `AgentAutoDebugService.ts` | Auto-debug de agentes | 150 |
| `CopilotMetricsPanelProvider.ts` | Panel WebView | 180 |
| `commands.ts` | 12 comandos VS Code | 350 |
| `CopilotLogsMCPServer.ts` | MCP Server | 520 |
| `index.ts` | Re-exports | 25 |

**Total**: ~2350 líneas de código nuevo

### Impedimentos resuelidos

**SM**: Hubo un problema de compilación. ¿Qué pasó?

**@ox**: TypeScript se quedaba sin memoria (heap limit). El problema era:
1. `moduleResolution: "node"` no soporta subpath exports
2. Cambiar a `Node16` aumentó la carga
3. El submódulo `mcp-core-sdk` se compilaba dos veces

**Solución**:
1. Añadir `typesVersions` a mcp-core-sdk (backwards-compatible)
2. Pre-compilar mcp-core-sdk (`npm run build`)
3. Usar dependencia `file:` para importar desde `dist/`
4. Excluir `mcp-core-sdk/**` en tsconfig

**PO**: ¿Hubo breaking changes en mcp-core-sdk?

**@ox**: No. Solo añadimos `typesVersions` y `exports` con condiciones `types`. Es metadata adicional, compatible con consumidores existentes.

---

## Fase 5: Verificación

### Resultado compilación

```bash
$ npm run compile
> scriptorium-vscode-extension@0.1.0-scriptorium compile
> tsc -p tsconfig.build.json

$ echo $?
0
```

✅ **Compilación exitosa**

### Comandos registrados (12)

| Comando | Descripción |
|---------|-------------|
| `copilotLogs.listSessions` | Listar sesiones |
| `copilotLogs.listRequests` | Listar requests |
| `copilotLogs.viewRequest` | Ver request específico |
| `copilotLogs.analyzeSession` | Análisis Context Bloat |
| `copilotLogs.searchRequests` | Búsqueda forense |
| `copilotLogs.exportConversation` | Exportar conversación |
| `copilotLogs.autoDebug` | Auto-debug agentes |
| `copilotLogs.refreshMetrics` | Refrescar métricas |
| `copilotLogs.diagnostics` | Diagnóstico sistema |
| `copilotLogs.startMCPServer` | Arrancar MCP Server |
| `copilotLogs.stopMCPServer` | Detener MCP Server |
| `copilotLogs.mcpServerStatus` | Estado MCP Server |

---

## Definition of Done

| Criterio | Estado |
|----------|--------|
| Código compila sin errores | ✅ |
| MCP Server extiende BaseMCPServer | ✅ |
| mcp-core-sdk sin breaking changes | ✅ |
| 8 MCP tools registrados | ✅ |
| 2 MCP resources registrados | ✅ |
| 12 comandos VS Code | ✅ |
| Documentación en backlog | ✅ |

---

## Próximos pasos

1. **Testing**: Ejecutar extensión en modo debug
2. **Integración mcp.json**: Añadir server a presets
3. **Documentación**: README con instrucciones de uso
4. **Release**: Tag v0.2.0-scriptorium

---

## Commit propuesto

```
feat(script/extension): implementar Copilot Log Exporter MCP Server

Nuevo módulo copilotLogs/ con servidor MCP embebido que permite a Claude
acceder a sus propios logs de Copilot Chat para auto-diagnóstico.

Arquitectura:
- CopilotLogsMCPServer extiende BaseMCPServer (port 3100)
- DiskLogScanner + CcreqDocumentResolver para acceso a logs
- ContextBloatAnalyzer para métricas de uso
- 8 tools MCP + 2 resources MCP
- 12 comandos VS Code registrados

Cambios en mcp-core-sdk (backwards-compatible):
- Añadir typesVersions para subpath resolution
- Actualizar exports con condiciones types

refs #SCRIPT-2.1.1, #WISH-01, #WISH-02, #WISH-03
```

---

## Métricas de sesión

| Métrica | Valor |
|---------|-------|
| Duración | ~4h |
| Archivos creados | 10 |
| Líneas de código | ~2350 |
| Impedimentos resueltos | 3 |
| Effort estimado | 8 pts |
