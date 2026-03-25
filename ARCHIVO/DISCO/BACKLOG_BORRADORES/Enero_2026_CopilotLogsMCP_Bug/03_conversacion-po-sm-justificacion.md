# Conversación PO-SM: Justificación de Decisiones Técnicas

> **Fecha**: 2026-01-01  
> **Participantes**: PO (Lucas), SM (@scrum / @ox)  
> **Contexto**: Auditoría del bug BUG-MCLOGS-1.0.0

---

## Reclamo del PO

**PO (Lucas)**: Tengo entendido que cuando diseñamos el MCP Server embebido en la extensión VS Code, se dijo que tendríamos **acceso total** a los archivos `ccreq:`. ¿Por qué ahora `get_copilot_request` retorna vacío?

Además, recuerdo que hablamos de guardar **5 archivos en caché** porque aunque teníamos acceso, no siempre se podía acceder temporalmente. ¿Se implementó eso?

---

## Respuesta del SM

**SM (@ox)**: Entiendo la confusión. Déjame explicar lo que se habló, lo que se implementó, y la limitación real que encontramos.

---

### 1. Lo que se habló: "Acceso total embebiendo MCP"

**Fuente documentada**: [conversacion-po-sm.md](../Diciembre_30_CopilotLogExporter/conversacion-po-sm.md) (30 diciembre 2025)

En la fase 2 de diseño, evaluamos 4 opciones:

| Opción | Descripción | Viabilidad |
|--------|-------------|------------|
| A) Servidor MCP standalone | Node.js independiente | ❌ No tiene acceso a VS Code API |
| B) Plugin de DevOpsServer | Extender mcp-mesh-sdk | ❌ Mismo problema |
| **C) Extensión VS Code + MCP** | **Server MCP dentro de extensión** | **✅ Acceso total** |
| D) Fork CopilotEngine | Modificar fuente | ❌ Mantenimiento imposible |

**Decisión**: Opción C — porque el Extension Host **ES Node.js** y puede:
- Levantar `http.createServer()` normalmente
- Usar el SDK MCP de Anthropic
- **Acceder a `vscode.workspace.openTextDocument(ccreq:...)`**

**Lo que prometimos**: Acceso a la API de VS Code desde el MCP Server.

**Lo que entregamos**: ✅ Sí lo tenemos. El código funciona:

```typescript
// VsCodeExtension/src/copilotLogs/CcreqDocumentResolver.ts:201-210
const doc = await vscode.workspace.openTextDocument(uri);
const content = doc.getText();
```

---

### 2. La limitación descubierta (post-implementación)

**Fuente documentada**: [11_CopilotLogsMCP_Implementacion_Final.md](../VS-CODE-EXTENSION/11_CopilotLogsMCP_Implementacion_Final.md) (líneas 139-156)

Durante las pruebas finales descubrimos que el esquema `ccreq:` de GitHub Copilot Chat tiene una **limitación arquitectónica**:

```typescript
// CopilotEngine/src/extension/prompt/vscode-node/requestLoggerImpl.ts
provideTextDocumentContent: (uri) => {
  const entry = uriData.kind === 'latest' 
      ? this._entries.at(-1)      // ✅ Último entry - SIEMPRE funciona
      : this._entries.find(...)    // ❌ Busca en _entries[] - SOLO sesión actual
}
```

**El problema**:
- `_entries[]` es un array **en memoria** de la sesión actual
- Cuando VS Code se reinicia, `_entries[]` se vacía
- Los IDs históricos existen en logs de disco, pero **no en `_entries[]`**

**Resultado**:
- `ccreq:latest` → ✅ Siempre funciona (toma el último)
- `ccreq:{id_sesion_actual}` → ✅ Funciona mientras la sesión esté viva
- `ccreq:{id_historico}` → ❌ No encuentra el entry

---

### 3. Lo que se habló: Caché de 5 archivos

**Fuente documentada**: [11_CopilotLogsMCP_Implementacion_Final.md](../VS-CODE-EXTENSION/11_CopilotLogsMCP_Implementacion_Final.md) (líneas 105-135)

**Sí, se implementó**. El caché LRU de 5 elementos fue parte del diseño original:

```typescript
// VsCodeExtension/src/copilotLogs/CcreqDocumentResolver.ts:14-21
export interface CacheConfig {
    /** Maximum number of requests to keep in cache (default: 5) */
    maxCacheSize: number;
}

const DEFAULT_CACHE_CONFIG: CacheConfig = {
    maxCacheSize: 5
};
```

**Comportamiento implementado**:

1. **Resolución exitosa → Cache**: Cuando `openTextDocument(ccreq:...)` funciona, guardamos el contenido en caché
2. **LRU Eviction**: Si hay más de 5 entries, eliminamos el más antiguo
3. **Touch on Access**: Acceder a un entry lo mueve al final (más reciente)
4. **Persistencia**: ❌ No persiste entre sesiones VS Code

**Evidencia en código** (líneas 80-100):

```typescript
const contentCache: Map<string, CcreqDocumentContent> = new Map();
const cacheOrder: string[] = [];

function trimCache(): void {
    while (cacheOrder.length > cacheConfig.maxCacheSize) {
        const oldestId = cacheOrder.shift();
        if (oldestId) {
            contentCache.delete(oldestId);
            console.log(`[CcreqResolver] Cache evicted: ${oldestId}`);
        }
    }
}
```

---

### 4. El bug actual: Expectativa vs Realidad

| Lo que el usuario ve | Lo que espera | Lo que pasa |
|---------------------|---------------|-------------|
| `list_copilot_requests` muestra 6 IDs históricos | `get_copilot_request(id)` retorna contenido | Retorna objeto vacío |

**¿Por qué pasa esto?**

`list_copilot_requests` **escanea logs de disco**:
```
~/Library/Application Support/Code/logs/{TIMESTAMP}/.../GitHub Copilot Chat.log
```

Estos logs contienen **metadata** (IDs, timestamps), pero **NO el contenido completo**.

El contenido solo está disponible vía `ccreq:` si el ID está en `_entries[]` (sesión actual).

---

### 5. Qué se puede hacer

| Opción | Viabilidad | Effort |
|--------|------------|--------|
| **A) Usar `get_latest_request`** | ✅ Funciona siempre | 0 pts |
| **B) Aumentar caché a 50** | ✅ Retiene más de la sesión | 0 pts (usar `configure_cache`) |
| **C) Persistir caché en disco** | ⚠️ Posible, requiere implementación | 3 pts |
| **D) Hook en Copilot para capturar pre-reinicio** | ❓ Requiere investigación | 5+ pts |
| **E) Reportar a GitHub** | ⚠️ Es limitación upstream | N/A |

---

## Conclusión del SM

**PO**: Entonces, ¿cumplimos lo prometido?

**SM**: **Parcialmente**.

| Promesa | Estado |
|---------|--------|
| Acceso a VS Code API desde MCP Server | ✅ Cumplido |
| Caché de 5 elementos | ✅ Cumplido |
| Acceso a todos los IDs históricos | ❌ Limitación upstream |

**La limitación no es un bug nuestro**, es una característica del diseño de GitHub Copilot Chat:
- `_entries[]` es efímero por diseño
- Los logs de disco no contienen el contenido completo (solo metadata)

**Workaround inmediato**: Aumentar caché y usar `get_latest_request` para capturar más requests de la sesión activa.

---

## Decisión PO

**PO**: Entendido. Entonces:
1. **Documentar** como limitación conocida (no bug crítico)
2. **Añadir** al backlog una story opcional para persistencia de caché
3. **Comunicar** workarounds a usuarios del sistema

**SM**: Perfecto. Lo registro.

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-01-01 | 📋 Conversación de justificación técnica | @ox / @scrum |
