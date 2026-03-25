# 05. Solución Arquitectónica Propuesta

> **Épica**: BUG-MCLOGS-1.0.0  
> **Fecha**: 2026-01-06  
> **Autor**: @ox + @indice (investigación de código)

---

## 1. Diagnóstico Confirmado

### Root Cause (CopilotEngine)

**Archivo**: [requestLoggerImpl.ts](../../../../../CopilotEngine/src/extension/prompt/vscode-node/requestLoggerImpl.ts#L258)

```typescript
// Línea 258
const entry = uriData.kind === 'latest' 
    ? this._entries.at(-1)                              // ✅ FUNCIONA
    : this._entries.find(e => e.id === uriData.id);     // ❌ FALLA si ID no está en sesión actual
```

**Hallazgo clave en L240-395**:
```typescript
private readonly _entries: LoggedInfo[] = [];           // L240: Array efímero

// L385-399: Las entradas se guardan en memoria con límite configurable
private async _addEntry(entry: LoggedInfo): Promise<boolean> {
    this._entries.push(entry);
    const maxEntries = this._configService.getConfig(ConfigKey.Advanced.RequestLoggerMaxEntries);
    if (this._entries.length > maxEntries) {
        this._entries.shift();   // LRU: elimina el más antiguo
    }
}
```

**Configuración de maxEntries** (package.json L3625):
```json
"github.copilot.chat.debug.requestLogger.maxEntries": {
    "default": 100
}
```

### Implicación

| Escenario | `_entries[]` | Resultado |
|-----------|-------------|-----------|
| Request actual | ✅ Contiene ID | Devuelve contenido |
| Request de hace 5 min | ❌ Puede no estar (FIFO) | `Request not found` |
| Request de sesión anterior | ❌ Array vacío al inicio | `Request not found` |
| `latest` | ✅ Siempre `at(-1)` | Devuelve último |

---

## 2. Estado de la Cache en VsCodeExtension

### Flujo Actual (roto)

```
list_copilot_requests()  →  DiskLogScanner  →  IDs de ficheros .log
         ↓
get_copilot_request(id)  →  ccreq:{id}.copilotmd  →  CopilotEngine._entries.find()
         ↓                                                    ↓
         ❌  "Request not found" (si ID no está en _entries[])
```

### Por Qué la Cache Está Vacía

**Archivo**: [CcreqDocumentResolver.ts](../../../../../VsCodeExtension/src/copilotLogs/CcreqDocumentResolver.ts#L220-256)

```typescript
// resolveDocument() - L220
const parsed = this.parseContent(content, requestId, format);
if (parsed && parsed.raw && parsed.raw.length > 0) {
    contentCache.set(requestId, parsed);  // ← Solo se cachea si hay contenido
}
```

**Problema**: Como `ccreq:{id}` retorna `"Request not found"`, la cache NUNCA se puebla para IDs históricos.

**Única excepción que funciona** (L256):
```typescript
// resolveLatest() - Extrae ID real del contenido
const idMatch = content.match(/Request ID:\s*`?([a-f0-9]+)`?/i);
const requestId = idMatch ? idMatch[1] : 'latest';
if (parsed && requestId !== 'latest') {
    contentCache.set(requestId, parsed);  // ✅ Cachea latest con su ID real
}
```

---

## 3. Solución Propuesta: Auto-Cache Proactivo

### Opción A: Captura Automática vía Event Listener

**Concepto**: Escuchar eventos de CopilotEngine y cachear cada request automáticamente.

**Implementación en VsCodeExtension**:

```typescript
// Nuevo: CopilotRequestCapture.ts
export class CopilotRequestCapture {
    private disposables: vscode.Disposable[] = [];
    
    activate() {
        // Escuchar cambios en ccreq:latest.copilotmd
        const latestUri = vscode.Uri.parse('ccreq:latest.copilotmd');
        
        // Opción 1: Polling cada N segundos
        setInterval(async () => {
            const resolver = new CcreqDocumentResolver();
            const latest = await resolver.resolveLatest();
            if (latest && latest.requestId !== 'latest') {
                cacheRequestContent(latest.requestId, latest);
            }
        }, 5000);  // Cada 5 segundos
        
        // Opción 2: FileSystemWatcher (si ccreq fuera un filesystem)
        // No aplicable - ccreq es virtual
    }
}
```

**Pros**: Simple de implementar  
**Contras**: Polling ineficiente, puede perder requests cortos

### Opción B: Hook en onDidChangeRequests (Preferida)

**Concepto**: CopilotEngine ya emite `onDidChangeRequests`. VsCodeExtension debe escucharlo.

**Archivo CopilotEngine** ([requestLoggerImpl.ts#L282-284](../../../../../CopilotEngine/src/extension/prompt/vscode-node/requestLoggerImpl.ts#L282)):
```typescript
private _onDidChangeRequests = new Emitter<void>();
public readonly onDidChangeRequests = this._onDidChangeRequests.event;
```

**Nueva implementación en VsCodeExtension**:

```typescript
// extension.ts o CopilotLogExporterService.ts
export function activateRequestCapture(context: vscode.ExtensionContext) {
    // Acceder al RequestLogger de Copilot (si expuesto)
    const copilotExt = vscode.extensions.getExtension('GitHub.copilot');
    if (!copilotExt?.isActive) return;
    
    // Si hay API pública:
    const requestLogger = copilotExt.exports?.requestLogger;
    if (requestLogger?.onDidChangeRequests) {
        requestLogger.onDidChangeRequests(async () => {
            const resolver = new CcreqDocumentResolver();
            const latest = await resolver.resolveLatest();
            if (latest && latest.requestId !== 'latest') {
                cacheRequestContent(latest.requestId, latest);
                console.log(`[AutoCapture] Cached: ${latest.requestId}`);
            }
        });
    }
}
```

**Pros**: Captura inmediata, sin polling  
**Contras**: Requiere que CopilotEngine exponga API (no garantizado)

### Opción C: Modificar maxCacheSize + Persistencia

**Concepto**: Aumentar cache y persistir a disco.

**Cambios en CcreqDocumentResolver.ts**:

```typescript
// Nuevo: Persistir cache a disco
const CACHE_FILE = path.join(os.tmpdir(), 'vscode-copilot-logs-cache.json');

export function loadPersistentCache(): void {
    try {
        const data = fs.readFileSync(CACHE_FILE, 'utf-8');
        const entries = JSON.parse(data) as Array<[string, CcreqDocumentContent]>;
        entries.forEach(([id, content]) => {
            contentCache.set(id, content);
            cacheOrder.push(id);
        });
        trimCache();  // Respetar maxSize
    } catch { /* No cache file yet */ }
}

export function savePersistentCache(): void {
    const entries = Array.from(contentCache.entries())
        .slice(-cacheConfig.maxCacheSize);  // Solo los últimos N
    fs.writeFileSync(CACHE_FILE, JSON.stringify(entries, null, 2));
}

// Llamar savePersistentCache() en:
// - deactivate()
// - Después de cada cacheRequestContent()
```

**Pros**: Cache sobrevive reinicios de VS Code  
**Contras**: No resuelve el problema de captura inicial

---

## 4. Recomendación: Implementación Híbrida

### Fase 1: Polling Inmediato (hotfix)

```typescript
// En CopilotLogExporterService.ts
private startAutoCapture(): void {
    this.captureInterval = setInterval(async () => {
        const latest = await this.resolver.resolveLatest();
        if (latest?.requestId && latest.requestId !== 'latest') {
            if (!getCachedRequestIds().includes(latest.requestId)) {
                cacheRequestContent(latest.requestId, latest);
            }
        }
    }, 3000);
}
```

### Fase 2: Persistencia de Cache

```typescript
// Al activar extensión
loadPersistentCache();

// Al desactivar
context.subscriptions.push({
    dispose: () => savePersistentCache()
});
```

### Fase 3: Hook a Copilot API (si disponible)

```typescript
// Intentar acceder a API exportada de GitHub Copilot
const copilotApi = vscode.extensions.getExtension('GitHub.copilot')?.exports;
if (copilotApi?.onRequestLogged) {
    copilotApi.onRequestLogged((request) => {
        cacheRequestContent(request.id, request);
    });
}
```

---

## 5. Decisión Arquitectónica

| Opción | Esfuerzo | Efectividad | Dependencia Externa |
|--------|----------|-------------|---------------------|
| A (Polling) | Bajo | Media | Ninguna |
| B (Event Hook) | Medio | Alta | API Copilot |
| C (Persistencia) | Bajo | Baja* | Ninguna |
| **Híbrida (A+C)** | **Medio** | **Alta** | **Ninguna** |

*Baja porque no resuelve captura inicial, solo retención.

### Decisión: **Opción Híbrida (A+C)**

**Razón**: 
- No depende de APIs no documentadas de GitHub Copilot
- Polling de 3s es aceptable para nuestro caso de uso
- Persistencia permite recuperar cache entre sesiones
- Se puede mejorar a Opción B si Copilot expone API en futuro

---

## 6. Archivos a Modificar

| Archivo | Cambio |
|---------|--------|
| `CcreqDocumentResolver.ts` | + `loadPersistentCache()`, `savePersistentCache()` |
| `CopilotLogExporterService.ts` | + `startAutoCapture()`, `stopAutoCapture()` |
| `extension.ts` | + Llamar `loadPersistentCache()` en activate, save en deactivate |
| `CopilotLogsMCPServer.ts` | Sin cambios (usará cache poblada) |

---

## 7. Próximos Pasos

1. **Crear Story**: SCRIPT-2.1.1-S003 "Implementar Auto-Cache Proactivo"
2. **Tasks**:
   - [ ] T001: Añadir polling en CopilotLogExporterService
   - [ ] T002: Implementar persistencia de cache
   - [ ] T003: Tests de integración
3. **Métricas de éxito**:
   - `get_copilot_request(id)` retorna contenido para IDs < 5 min
   - Cache persiste entre reinicios de VS Code
   - Sin degradación de rendimiento

---

## Referencias

- [01_backlog-borrador.md](./01_backlog-borrador.md): Bug original
- [04_correccion-bug-verificacion-empirica.md](./04_correccion-bug-verificacion-empirica.md): Verificación empírica
- [CopilotEngine/requestLoggerImpl.ts](../../../../../CopilotEngine/src/extension/prompt/vscode-node/requestLoggerImpl.ts): Root cause
- [VsCodeExtension/CcreqDocumentResolver.ts](../../../../../VsCodeExtension/src/copilotLogs/CcreqDocumentResolver.ts): Cache implementation
