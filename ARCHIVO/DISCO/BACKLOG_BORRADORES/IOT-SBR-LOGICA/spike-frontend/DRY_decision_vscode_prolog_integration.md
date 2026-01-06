# DRY: Decisión — Integración PrologEditor en VsCodeExtension

> **Épica**: SCRIPT-2.3.0 + IOT-SBR-LOGICA  
> **Fecha decisión**: 2 de enero de 2026  
> **Autor**: @ox  
> **Estado**: ✅ **APROBADO** — Opción D (WebView) + Backend embebido

---

## 1. Decisión Ejecutiva

> **SE IMPLEMENTARÁ la Opción D con extensiones:**
> 
> 1. Frontend PrologEditor como **WebView nativo** en VsCodeExtension
> 2. Backend refactorizado para correr **embebido** en la extensión
> 3. Comandos VS Code para lanzar **editores de especificación** (Swagger UI, AsyncAPI Studio)

### Justificación

| Criterio | Peso | Resultado |
|----------|------|-----------|
| **Cohesión ecosistema** | Alto | ✅ Todo en VsCodeExtension |
| **DRY** | Alto | ✅ Reutiliza BaseHackerPanelProvider |
| **UX** | Alto | ✅ Sin salir de VS Code |
| **Mantenibilidad** | Medio | ✅ Un solo punto de entrada |
| **Complejidad** | Medio | ⚠️ Requiere refactor backend |

---

## 2. Mapa de Referencias DRY

### 2.1 Documentos Fuente (NO DUPLICAR)

| Documento | Contenido | Reutilizar |
|-----------|-----------|------------|
| [spike_opcion_d_vscode_webview.md](spike_opcion_d_vscode_webview.md) | Diseño completo del WebView Provider | §3.2 `PrologEditorWebViewProvider` |
| [spike_opcion_c_gamification_ui.md](spike_opcion_c_gamification_ui.md) | Alternativa GamificationUI | §3.1 Solo como fallback |
| [spike_integracion_prolog_frontend.md](spike_integracion_prolog_frontend.md) | Análisis de opciones A-E | §3 Matriz de decisión |
| [chuletario_mapeo_statemachine_vscodeextension.md](chuletario_mapeo_statemachine_vscodeextension.md) | Mapeo de componentes | §2-6 Todo el mapeo |

### 2.2 Código Existente a Reutilizar

| Componente | Ubicación | Propósito |
|------------|-----------|-----------|
| `BaseHackerPanelProvider` | [VsCodeExtension/src/views/BaseHackerPanelProvider.ts](../../../../../VsCodeExtension/src/views/BaseHackerPanelProvider.ts) | Clase base para WebViews |
| `TeatroWebViewProvider` | [VsCodeExtension/src/views/TeatroWebViewProvider.ts](../../../../../VsCodeExtension/src/views/TeatroWebViewProvider.ts) | Patrón a seguir |
| `hacker-base.css` | [VsCodeExtension/media/hacker-base.css](../../../../../VsCodeExtension/media/hacker-base.css) | Estilos base |
| `hacker-themes.css` | [VsCodeExtension/media/hacker-themes.css](../../../../../VsCodeExtension/media/hacker-themes.css) | Sistema de temas |
| OpenAPI spec | [specs/PrologEditor/openapi.yaml](../../../../../ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/openapi.yaml) | Contrato REST API |
| AsyncAPI spec | [specs/PrologEditor/asyncapi.yaml](../../../../../ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/asyncapi.yaml) | Contrato eventos |

### 2.3 Herramientas de Especificación

| Script | Comando | Puerto | Propósito |
|--------|---------|--------|-----------|
| `swagger-ui` | `npm run swagger-ui` | 8080 | Visualizar OpenAPI |
| `asyncapi-studio` | `npm run asyncapi-studio` | 8081 | Visualizar AsyncAPI |
| `validate:openapi` | `npm run validate:openapi` | — | Validar spec |
| `validate:asyncapi` | `npm run validate:asyncapi` | — | Validar spec |
| `generate:ts-client` | `npm run generate:ts-client` | — | Generar cliente TS |

> **Fuente**: [ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/package.json](../../../../../ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/package.json)

---

## 3. Arquitectura Final

### 3.1 Diagrama de Componentes

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           VsCodeExtension                                        │
│                    scriptorium-vscode-extension v0.1.0                           │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  ┌──────────────────────┐  ┌──────────────────────┐  ┌────────────────────────┐ │
│  │ TeatroWebViewProvider│  │PrologEditorProvider  │  │ OpenAPIEditorProvider  │ │
│  │ (existente)          │  │ ← NUEVO             │  │ ← NUEVO (futuro)       │ │
│  └──────────┬───────────┘  └──────────┬───────────┘  └────────────────────────┘ │
│             │                         │                                          │
│             │    BaseHackerPanelProvider (compartido)                           │
│             │                         │                                          │
│             ▼                         ▼                                          │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                         PrologBackendService                              │   │
│  │                         (embebido en extensión)                           │   │
│  │                                                                           │   │
│  │   Operaciones:                         Comunicación:                      │   │
│  │   • executeQuery(query)                • postMessage() ↔ WebView         │   │
│  │   • assertFact(fact)                   • MCPDriverAdapter → MCP Server   │   │
│  │   • consultFile(path)                  • Eventos VS Code                  │   │
│  │   • listKnowledgeBases()                                                  │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
│                                      │                                           │
├──────────────────────────────────────┼───────────────────────────────────────────┤
│  📋 COMANDOS VS CODE (nuevos)        │                                           │
│                                      │                                           │
│  • alephscript.prolog.openEditor     │  Abrir WebView de PrologEditor           │
│  • alephscript.prolog.executeQuery   │  Ejecutar query desde command palette    │
│  • alephscript.spec.openSwagger      │  npm run swagger-ui (puerto 8080)        │
│  • alephscript.spec.openAsyncAPI     │  npm run asyncapi-studio (puerto 8081)   │
│  • alephscript.spec.validate         │  Validar specs                           │
│  • alephscript.spec.generateClient   │  Generar cliente TypeScript              │
│                                      │                                           │
└──────────────────────────────────────┼───────────────────────────────────────────┘
                                       │ HTTP/JSON-RPC (opcional, si MCP activo)
                                       ▼
                          ┌─────────────────────────┐
                          │   MCPPrologServer       │
                          │   puerto 3006           │
                          │   (opcional - fallback) │
                          └─────────────────────────┘
```

### 3.2 Modos de Operación

| Modo | Backend | Comunicación | Cuándo usar |
|------|---------|--------------|-------------|
| **Embebido** | Dentro de la extensión | postMessage directo | Desarrollo rápido |
| **MCP** | MCPPrologServer (3006) | MCP Tools | Producción/integración |
| **Híbrido** | Embebido + MCP fallback | Automático | Default recomendado |

---

## 4. Plan de Implementación

### Fase 1: WebView Provider (2-3 horas)

| Task | Archivo | Referencia |
|------|---------|------------|
| Crear `PrologEditorWebViewProvider.ts` | `VsCodeExtension/src/views/` | [spike_opcion_d §3.2](spike_opcion_d_vscode_webview.md#32-clase-prologeditorwebviewprovider) |
| Crear `prolog-editor.css` | `VsCodeExtension/media/` | [spike_opcion_d §3.1](spike_opcion_d_vscode_webview.md#31-estructura-de-archivos) |
| Crear `prolog-editor.js` | `VsCodeExtension/media/` | [spike_opcion_d §3.3](spike_opcion_d_vscode_webview.md#33-javascript-del-webview) |

### Fase 2: Backend Embebido (2-3 horas)

| Task | Archivo | Referencia |
|------|---------|------------|
| Crear `PrologBackendService.ts` | `VsCodeExtension/src/services/` | Nuevo (basado en OpenAPI spec) |
| Implementar operaciones CRUD | — | [openapi.yaml paths](../../../../../ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/openapi.yaml) |
| Storage local (SQLite o JSON) | — | Similar a `PrologEditor/backend/` |

### Fase 3: Comandos de Especificación (1 hora)

| Task | Archivo | Referencia |
|------|---------|------------|
| Añadir comandos a `package.json` | `VsCodeExtension/package.json` | Ver §5.1 |
| Implementar handlers en `extension.ts` | `VsCodeExtension/src/extension.ts` | Ver §5.2 |

### Fase 4: Integración MCP (opcional, 2 horas)

| Task | Archivo | Referencia |
|------|---------|------------|
| Conectar con MCPPrologServer | `VsCodeExtension/src/core/` | [chuletario §6](chuletario_mapeo_statemachine_vscodeextension.md#6-conexión-mcp) |
| Fallback automático | — | Si MCP no disponible → embebido |

---

## 5. Especificaciones Técnicas

### 5.1 Comandos a Añadir en package.json

```json
{
  "commands": [
    {
      "command": "alephscript.prolog.openEditor",
      "title": ">>> Open Prolog Editor",
      "icon": "$(symbol-method)",
      "category": "🔮 Prolog Editor"
    },
    {
      "command": "alephscript.prolog.executeQuery",
      "title": ">>> Execute Prolog Query",
      "icon": "$(play)",
      "category": "🔮 Prolog Editor"
    },
    {
      "command": "alephscript.spec.openSwagger",
      "title": "Open Swagger UI",
      "icon": "$(json)",
      "category": "📋 API Specs"
    },
    {
      "command": "alephscript.spec.openAsyncAPI",
      "title": "Open AsyncAPI Studio",
      "icon": "$(symbol-event)",
      "category": "📋 API Specs"
    },
    {
      "command": "alephscript.spec.validate",
      "title": "Validate API Specs",
      "icon": "$(check)",
      "category": "📋 API Specs"
    },
    {
      "command": "alephscript.spec.generateClient",
      "title": "Generate TypeScript Client",
      "icon": "$(code)",
      "category": "📋 API Specs"
    }
  ]
}
```

### 5.2 Handlers de Comandos

```typescript
// VsCodeExtension/src/extension.ts (extracto)

// Prolog Editor
context.subscriptions.push(
    vscode.commands.registerCommand('alephscript.prolog.openEditor', () => {
        PrologEditorWebViewProvider.createOrShow(context.extensionUri);
    })
);

// API Specs - Terminal commands
context.subscriptions.push(
    vscode.commands.registerCommand('alephscript.spec.openSwagger', async () => {
        const terminal = vscode.window.createTerminal('Swagger UI');
        terminal.sendText('cd ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR && npm run swagger-ui');
        terminal.show();
        
        // Abrir en Simple Browser después de espera
        setTimeout(() => {
            vscode.commands.executeCommand('simpleBrowser.show', 'http://localhost:8080');
        }, 3000);
    })
);

context.subscriptions.push(
    vscode.commands.registerCommand('alephscript.spec.openAsyncAPI', async () => {
        const terminal = vscode.window.createTerminal('AsyncAPI Studio');
        terminal.sendText('cd ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR && npm run asyncapi-studio');
        terminal.show();
        
        setTimeout(() => {
            vscode.commands.executeCommand('simpleBrowser.show', 'http://localhost:8081');
        }, 3000);
    })
);
```

### 5.3 Contrato de Mensajes WebView ↔ Extension

> **Fuente**: [spike_opcion_d §3.2](spike_opcion_d_vscode_webview.md#32-clase-prologeditorwebviewprovider)

| Mensaje (WebView → Extension) | Payload | Respuesta |
|-------------------------------|---------|-----------|
| `createSession` | `{sessionId, obraId}` | `sessionCreated` |
| `executeQuery` | `{query}` | `queryResult` |
| `assertFact` | `{fact}` | `factAsserted` |
| `consultFile` | `{filePath}` | `fileConsulted` |
| `browseFile` | — | `fileLoaded` |
| `saveToFile` | `{content, fileName?}` | `fileSaved` |

| Mensaje (Extension → WebView) | Payload | Trigger |
|-------------------------------|---------|---------|
| `sessionCreated` | `{session, result}` | Después de createSession |
| `queryResult` | `{query, result}` | Después de executeQuery |
| `error` | `{message}` | En cualquier error |
| `applyTheme` | `{theme}` | Cambio de tema VS Code |

---

## 6. Validación Pre-Implementación

### Checklist Definition of Ready

- [x] **Spike completado**: Opciones A-E analizadas
- [x] **Decisión documentada**: Este archivo
- [x] **Specs API disponibles**: openapi.yaml + asyncapi.yaml
- [x] **Código base existe**: BaseHackerPanelProvider, TeatroWebViewProvider
- [x] **Mapeo de componentes**: chuletario completo
- [x] **Estimación validada**: ~8 horas total (4 fases)

### Riesgos Identificados

| Riesgo | Probabilidad | Mitigación |
|--------|--------------|------------|
| Complejidad backend embebido | Media | Usar OpenAPI spec como guía |
| Conflictos con MCP existente | Baja | Modo híbrido con fallback |
| Tamaño del bundle | Baja | Solo incluir lo esencial |

---

## 7. NO DUPLICAR

> **Regla DRY**: Este documento es el **índice de decisión**. Los detalles de implementación están en los spikes referenciados.

| Si necesitas... | Consulta | NO crees |
|-----------------|----------|----------|
| Código del Provider | [spike_opcion_d §3.2](spike_opcion_d_vscode_webview.md#32-clase-prologeditorwebviewprovider) | Otro spike |
| Mapeo de componentes | [chuletario §2](chuletario_mapeo_statemachine_vscodeextension.md#2-tabla-de-mapeo-principal) | Otra tabla |
| Matriz de decisión | [spike_integracion §3](spike_integracion_prolog_frontend.md#3-matriz-de-decisión) | Otra matriz |
| Especificación API | [openapi.yaml](../../../../../ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/openapi.yaml) | Documentación separada |

---

## 8. Próximos Pasos

1. **Crear story** en BACKLOG-SCRIPTORIUM.md: `PROLOG-VSCODE-1.0.0`
2. **Fase 1**: Implementar PrologEditorWebViewProvider
3. **Test**: Verificar WebView se renderiza correctamente
4. **Fase 2**: Implementar backend embebido
5. **Fase 3**: Añadir comandos de especificación
6. **Demo**: Preparar para Release Party v1.0.0-beta.1

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-01-02 | Documento inicial con decisión aprobada | @ox |
