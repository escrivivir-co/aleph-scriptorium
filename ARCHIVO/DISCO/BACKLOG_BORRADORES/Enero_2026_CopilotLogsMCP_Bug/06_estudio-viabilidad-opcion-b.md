# 06. Estudio de Viabilidad: Opción B (Event Hook)

> **Épica**: BUG-MCLOGS-1.0.0  
> **Fecha**: 2026-01-01  
> **Autor**: @ox (análisis de código)  
> **Veredicto**: ❌ **NO VIABLE** — API no expuesta

---

## 1. Resumen Ejecutivo

| Aspecto | Resultado |
|---------|-----------|
| **¿Expone `onDidChangeRequests`?** | ❌ NO |
| **¿Expone `IRequestLogger`?** | ❌ NO |
| **¿Hay comandos alternativos?** | ⚠️ Solo debug internos |
| **Viabilidad** | **DESCARTADA** |

---

## 2. Análisis de la API Pública de CopilotEngine

### 2.1 Punto de Entrada

**Archivo**: [extension.ts#L80-88](../../../../../CopilotEngine/src/extension/extension/vscode/extension.ts#L80-88)

```typescript
return {
    getAPI(version: number) {
        if (version > CopilotExtensionApi.version) {
            throw new Error('Invalid Copilot Chat extension API version...');
        }
        return instantiationService.createInstance(CopilotExtensionApi);
    }
};
```

### 2.2 API Pública Expuesta

**Archivo**: [api.d.ts](../../../../../CopilotEngine/src/extension/api/vscode/api.d.ts)

```typescript
export interface CopilotExtensionApi {
    /**
     * Selecciona un scope en el editor
     */
    selectScope: (editor?: TextEditor, options?: { reason?: string }) => Promise<Selection | undefined>;
}
```

**Archivo**: [extensionApi.ts](../../../../../CopilotEngine/src/extension/api/vscode/extensionApi.ts)

```typescript
export class CopilotExtensionApi implements ICopilotExtensionApi {
    public static readonly version = 1;

    async selectScope(editor?: TextEditor, options?: { reason?: string }) { ... }
    
    getContextProviderAPI(_version: 'v1'): Copilot.ContextProviderApiV1 { ... }
}
```

### 2.3 Lo Que NO Expone

| Servicio | ¿Expuesto? | Ubicación Interna |
|----------|------------|-------------------|
| `IRequestLogger` | ❌ | `platform/requestLogger/node/requestLogger.ts` |
| `onDidChangeRequests` | ❌ | `requestLoggerImpl.ts:L282` |
| `getRequests()` | ❌ | `requestLoggerImpl.ts:L280` |
| `_entries[]` | ❌ | `requestLoggerImpl.ts:L240` |

---

## 3. Alternativas Investigadas

### 3.1 Comandos Debug de Copilot

**Archivo**: [requestLogTree.ts](../../../../../CopilotEngine/src/extension/log/vscode-node/requestLogTree.ts#L27-33)

```typescript
const showHtmlCommand = 'vscode.copilot.chat.showRequestHtmlItem';
const exportLogItemCommand = 'github.copilot.chat.debug.exportLogItem';
const exportPromptArchiveCommand = 'github.copilot.chat.debug.exportPromptArchive';
const exportPromptLogsAsJsonCommand = 'github.copilot.chat.debug.exportPromptLogsAsJson';
const exportAllPromptLogsAsJsonCommand = 'github.copilot.chat.debug.exportAllPromptLogsAsJson';
const saveCurrentMarkdownCommand = 'github.copilot.chat.debug.saveCurrentMarkdown';
const showRawRequestBodyCommand = 'github.copilot.chat.debug.showRawRequestBody';
```

**Problema**: Estos comandos requieren parámetros internos (TreeItem objects) que no están disponibles desde extensiones externas.

### 3.2 ContextProviderAPI

**Archivo**: [api.ts](../../../../../CopilotEngine/src/platform/inlineCompletions/common/api.ts#L28-38)

```typescript
export interface ContextProviderApiV1 {
    registerContextProvider<T extends SupportedContextItem>(
        provider: ContextProvider<T>
    ): vscode.Disposable;
}
```

**Uso documentado**:
```typescript
const copilot = vscode.extensions.getExtension("github.copilot");
const contextProviderAPI = copilot.exports.getContextProviderAPI("v1");
```

**Problema**: Solo permite APORTAR contexto a Copilot, no LEER requests de Copilot.

### 3.3 TextDocumentContentProvider (ccreq:)

**Archivo**: [requestLoggerImpl.ts#L251-277](../../../../../CopilotEngine/src/extension/prompt/vscode-node/requestLoggerImpl.ts#L251-277)

```typescript
this._register(workspace.registerTextDocumentContentProvider(
    ChatRequestScheme.chatRequestScheme, {
        onDidChange: Event.map(this.onDidChangeRequests, () => 
            Uri.parse(ChatRequestScheme.buildUri({ kind: 'latest' }))),
        provideTextDocumentContent: (uri) => { ... }
    }
));
```

**Hallazgo clave**: El `onDidChange` event SÍ se expone a través del scheme `ccreq:`, PERO:
- Solo se dispara para `ccreq:latest.copilotmd`
- No hay forma de suscribirse desde extensión externa
- La suscripción es automática de VS Code al abrir el documento

### 3.4 FileSystemWatcher

**Investigación**: Los logs de Copilot se escriben a disco en:
```
~/.vscode/extensions/github.copilot-chat-*/logs/
```

**Problema**: 
- Los logs en disco NO contienen el contenido completo del request
- Solo son metadata/referencias
- El contenido real está en `_entries[]` (memoria efímera)

---

## 4. Diagrama de Inaccesibilidad

```
┌─────────────────────────────────────────────────────────────────┐
│                     CopilotEngine (interno)                     │
│                                                                 │
│  ┌─────────────────┐     ┌─────────────────────────────────┐   │
│  │  RequestLogger  │────▶│  _entries[] (memoria efímera)   │   │
│  │                 │     └─────────────────────────────────┘   │
│  │                 │                    │                       │
│  │  onDidChange ◀──┼────────────────────┘                       │
│  │  Requests       │                                            │
│  └────────┬────────┘                                            │
│           │                                                     │
│           │  (interno)                                          │
│           ▼                                                     │
│  ┌─────────────────┐                                            │
│  │  ccreq: scheme  │◀──── provideTextDocumentContent()          │
│  │  (virtual docs) │                                            │
│  └────────┬────────┘                                            │
│           │                                                     │
├───────────┼─────────────────────────────────────────────────────┤
│           │  BARRERA DE API PÚBLICA                             │
├───────────┼─────────────────────────────────────────────────────┤
│           │                                                     │
│           ▼                                                     │
│  ┌─────────────────┐                                            │
│  │  CopilotExtAPI  │   ← ÚNICO punto de acceso externo          │
│  │                 │                                            │
│  │  • selectScope()│                                            │
│  │  • getContext   │                                            │
│  │    ProviderAPI()│                                            │
│  │                 │                                            │
│  │  ❌ NO expone:  │                                            │
│  │  • RequestLogger│                                            │
│  │  • onDidChange  │                                            │
│  │  • getRequests()│                                            │
│  └─────────────────┘                                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
          │
          │  vscode.extensions.getExtension('GitHub.copilot-chat')
          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    VsCodeExtension (nuestra)                    │
│                                                                 │
│  Solo podemos:                                                  │
│  • vscode.workspace.openTextDocument('ccreq:latest.copilotmd')  │
│  • vscode.workspace.openTextDocument('ccreq:{id}.copilotmd')    │
│    (pero {id} solo funciona si está en _entries[])              │
│                                                                 │
│  NO podemos:                                                    │
│  • Suscribirnos a onDidChangeRequests                           │
│  • Acceder a _entries[] directamente                            │
│  • Recibir notificaciones de nuevos requests                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Conclusión

### 5.1 Veredicto: ❌ NO VIABLE

La Opción B (Event Hook via `onDidChangeRequests`) **no es implementable** porque:

1. **API no expuesta**: `IRequestLogger` es un servicio interno de CopilotEngine, no se exporta a extensiones externas
2. **No hay eventos accesibles**: `onDidChangeRequests` es un evento interno sin forma de suscripción externa
3. **Comandos debug inutilizables**: Los comandos `github.copilot.chat.debug.*` requieren parámetros internos
4. **ContextProviderAPI es unidireccional**: Solo permite aportar contexto, no leer requests

### 5.2 Impacto en la Estrategia

| Opción | Estado | Próximo Paso |
|--------|--------|--------------|
| **A (Polling)** | ✅ Viable | **IMPLEMENTAR** |
| **B (Event Hook)** | ❌ Descartada | — |
| **C (Persistencia)** | ✅ Viable | Complemento de A |

### 5.3 Recomendación Final

**Proceder con Opción A+C (Polling + Persistencia)**:

1. **Fase 1**: Polling de `ccreq:latest.copilotmd` cada 3 segundos
2. **Fase 2**: Persistir cache a disco entre sesiones
3. **Futuro**: Si GitHub expone API en versiones futuras, migrar a Event Hook

---

## 6. Alternativa Teórica (no recomendada)

### Monkey-patching del RequestLogger

**Concepto**: Inyectar código en el proceso de CopilotEngine para interceptar eventos.

```typescript
// ⚠️ ALTAMENTE NO RECOMENDADO - Solo documentado para completitud
const copilotExt = vscode.extensions.getExtension('GitHub.copilot-chat');
if (copilotExt?.isActive) {
    // Intentar acceder a internals (frágil, rompe con actualizaciones)
    const internals = (copilotExt as any)._internal;
    // ...
}
```

**Por qué NO implementar**:
- Romperá con cada actualización de Copilot
- Viola términos de servicio de GitHub
- No es mantenible
- Riesgo de seguridad

---

## Referencias

- [CopilotEngine/api.d.ts](../../../../../CopilotEngine/src/extension/api/vscode/api.d.ts) — API pública
- [CopilotEngine/extensionApi.ts](../../../../../CopilotEngine/src/extension/api/vscode/extensionApi.ts) — Implementación
- [CopilotEngine/requestLogger.ts](../../../../../CopilotEngine/src/platform/requestLogger/node/requestLogger.ts) — Interface IRequestLogger
- [CopilotEngine/requestLoggerImpl.ts](../../../../../CopilotEngine/src/extension/prompt/vscode-node/requestLoggerImpl.ts) — Implementación con _entries[]
- [05_solucion-arquitectonica-propuesta.md](./05_solucion-arquitectonica-propuesta.md) — Documento previo
