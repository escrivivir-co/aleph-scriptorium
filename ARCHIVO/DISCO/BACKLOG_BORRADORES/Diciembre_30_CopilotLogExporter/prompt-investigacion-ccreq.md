# Prompt de Investigación: Copilot Log Exporter MCP

> **Fecha**: 2025-12-30  
> **Objetivo**: Crear una extensión VS Code que exponga los logs de Copilot Chat via MCP  
> **Prioridad**: Alta (habilita auto-debug de agentes)

---

## Contexto Previo (Lo que ya sabemos)

### 1. Arquitectura de Logs de Copilot Chat

Los logs de GitHub Copilot Chat se gestionan en memoria mediante un sistema de documentos virtuales:

| Componente | Ubicación | Función |
|------------|-----------|---------|
| `LogMemory` | `CopilotEngine/src/platform/log/common/logService.ts` | Buffer de 50 logs en memoria |
| `RequestLogger` | `CopilotEngine/src/extension/prompt/vscode-node/requestLoggerImpl.ts` | Clase principal, mantiene `_entries[]` |
| `TextDocumentContentProvider` | Línea 251 de requestLoggerImpl.ts | Registra scheme `ccreq:` |
| `requestLogTree.ts` | `CopilotEngine/src/extension/log/vscode-node/` | Comandos de exportación |

### 2. URI Scheme Virtual: `ccreq:`

```
ccreq:{id}.copilotmd    → Markdown con request completa
ccreq:{id}.json         → JSON estructurado
ccreq:latest.copilotmd  → Última request
```

**Código clave** (requestLoggerImpl.ts:251-280):
```typescript
this._register(workspace.registerTextDocumentContentProvider(ChatRequestScheme.chatRequestScheme, {
  provideTextDocumentContent: (uri) => {
    const parseResult = ChatRequestScheme.parseUri(uri.toString());
    const entry = uriData.kind === 'latest' 
      ? this._entries.at(-1) 
      : this._entries.find(e => e.id === uriData.id);
    
    if (format === 'json') {
      return this._renderToJson(entry);
    } else {
      return this._renderRequestToMarkdown(entry.id, entry.entry);
    }
  }
}));
```

### 3. Cómo Acceder al Contenido (Descubierto)

**Método manual funcional**:
1. Abrir Output Log → click en `ccreq:XXXXX.copilotmd`
2. Contextual → "Reopen Editor With" (modo raw)
3. Cmd+S → Guardar como archivo
4. Claude puede leer con `read_file`

**Contenido disponible** (6000+ líneas por request):
- Metadata: tokens, tiempos, modelo, tools disponibles
- System prompt completo
- User message con conversation-summary
- Assistant response
- Tool calls

### 4. Comandos Existentes (Bloqueados)

| Comando | Estado | Problema |
|---------|--------|----------|
| `github.copilot.chat.debug.exportAllPromptLogsAsJson` | ⚠️ Bloqueado | `when: "view == copilot-chat"` |
| `github.copilot.chat.debug.exportLogItem` | ⚠️ Bloqueado | Requiere TreeItem |
| `github.copilot.chat.debug.showRawRequestBody` | ⚠️ Bloqueado | Requiere contexto UI |

### 5. Logs en Disco (Accesibles)

**Ruta macOS**:
```
~/Library/Application Support/Code/logs/{TIMESTAMP}/window1/exthost/GitHub.copilot-chat/GitHub Copilot Chat.log
```

**Contenido**: Solo metadatos (NO contenido de mensajes)
```
2025-12-30 12:08:49.649 [info] ccreq:31756164.copilotmd | success | claude-opus-4.5 | 14544ms | [panel/editAgent]
```

---

## Lo Que Falta por Hacer

### Tarea 1: Crear Extensión VS Code "Copilot Log Exporter MCP"

**Objetivo**: Extensión que exponga herramientas MCP via HTTP/SSE

**Patrón a seguir**: [BifrostMCP](https://github.com/biegehydra/BifrostMCP) - extensión que expone herramientas de VS Code via MCP

**Tools a implementar**:

```typescript
// Tool 1: Listar requests disponibles
tools.set('list_copilot_requests', async () => {
  // Parsear el log de disco para obtener IDs
  // Retornar array de {id, timestamp, model, duration}
});

// Tool 2: Obtener contenido de una request
tools.set('get_copilot_request', async (args: {id: string, format?: 'md'|'json'}) => {
  const uri = vscode.Uri.parse(`ccreq:${args.id}.${args.format === 'json' ? 'json' : 'copilotmd'}`);
  const doc = await vscode.workspace.openTextDocument(uri);
  return doc.getText();
});

// Tool 3: Exportar todo a archivo
tools.set('export_all_requests', async (args: {path: string}) => {
  // Ejecutar comando existente con bypass de precondición
});
```

### Tarea 2: Investigar Alternativas

**Preguntas abiertas**:

1. **¿Se puede acceder a `_entries[]` desde otra extensión?**
   - El `RequestLogger` es un servicio DI (`IRequestLogger`)
   - ¿Hay forma de inyectarlo desde una extensión externa?

2. **¿Copilot Chat tiene API pública?**
   - Revisar `github.copilot-chat` extension API
   - ¿Expone `getRequests()` o similar?

3. **¿Hay eventos que podamos escuchar?**
   - `onDidChangeRequests` existe pero es interno
   - ¿Se puede suscribir desde fuera?

### Tarea 3: Diseñar Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                    VS Code Extension                            │
│  "copilot-log-exporter-mcp"                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐     ┌──────────────────┐    ┌──────────────┐  │
│  │ Log Watcher │────▶│ Request Cache    │───▶│ MCP Server   │  │
│  │ (disk log)  │     │ (parsed entries) │    │ (HTTP/SSE)   │  │
│  └─────────────┘     └──────────────────┘    └──────────────┘  │
│         │                    │                      │           │
│         ▼                    ▼                      ▼           │
│  Detecta nuevos      Accede a ccreq:        Expone tools:      │
│  IDs ccreq:          via openTextDocument   - list_requests    │
│                                              - get_request     │
│                                              - export_all      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Archivos de Referencia en CopilotEngine

| Archivo | Líneas Clave | Qué Contiene |
|---------|--------------|--------------|
| `requestLoggerImpl.ts` | 237-290 | Clase `RequestLogger`, `provideTextDocumentContent` |
| `requestLogTree.ts` | 26-31, 413-500 | Comandos de exportación |
| `logService.ts` | 47-95 | Clase `LogMemory` con `getLogs()`, `getRequestIds()` |
| `requestLogger.ts` | 50-90 | `ChatRequestScheme` con `buildUri()`, `parseUri()` |

---

## Criterios de Éxito

1. **Básico**: Claude puede invocar `get_copilot_request(id)` y recibir el contenido
2. **Medio**: Claude puede listar todas las requests de la sesión sin intervención humana
3. **Avanzado**: Claude puede auto-diagnosticar sus propias respuestas pasadas

---

## Recursos

- **BifrostMCP**: https://github.com/biegehydra/BifrostMCP (patrón de extensión + MCP)
- **VS Code Virtual Documents**: https://code.visualstudio.com/api/extension-guides/virtual-documents
- **MCP SDK**: https://github.com/modelcontextprotocol/sdk
- **CopilotEngine local**: `CopilotEngine/src/` en este workspace

---

## Comando para el Agente

```
@agent Investiga cómo crear una extensión VS Code que:
1. Acceda a documentos virtuales ccreq: de GitHub Copilot Chat
2. Exponga herramientas MCP via HTTP/SSE (patrón BifrostMCP)
3. Permita a Claude leer sus propios logs de conversación

Contexto técnico en: ARCHIVO/DISCO/BACKLOG_BORRADORES/Diciembre_30_CopilotLogExporter/prompt-investigacion-ccreq.md

Archivos clave a analizar:
- CopilotEngine/src/extension/prompt/vscode-node/requestLoggerImpl.ts
- CopilotEngine/src/extension/log/vscode-node/requestLogTree.ts
- https://github.com/biegehydra/BifrostMCP (referencia de arquitectura)
```
