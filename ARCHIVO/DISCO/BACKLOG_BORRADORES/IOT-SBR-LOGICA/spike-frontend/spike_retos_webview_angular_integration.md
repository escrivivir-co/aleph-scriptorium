# Investigación: Retos de Integración Frontend Angular → VS Code WebView

> **Épica**: SCRIPT-2.3.0 / IOT-SBR-LOGICA  
> **Fecha**: 2 de enero de 2026  
> **Autor**: @ox (spike técnico)  
> **Documento padre**: [DRY_decision_vscode_prolog_integration.md](DRY_decision_vscode_prolog_integration.md)

---

## 1. Mapa del Frontend Angular Actual

### 1.1 Estructura de Componentes

```
PrologEditor/frontend/src/app/
│
├── app.module.ts              ← NgModule principal (NO portable)
├── app.component.ts           ← Root component
├── app.component.html         ← Layout principal con Bootstrap grid
│
├── components/
│   ├── dashboard/             ← Componente vacío (placeholder)
│   ├── rule-editor/           ← ⭐ CRÍTICO: Editor de reglas
│   ├── rule-list/             ← ⭐ CRÍTICO: Lista CRUD
│   └── telemetry-monitor/     ← Monitor IoT (secundario)
│
├── services/
│   ├── prolog.service.ts      ← ⭐ CRÍTICO: API client
│   └── telemetry.service.ts   ← IoT service
│
├── models/                    ← (vacío o interfaces)
│
└── environments/
    └── environment.ts         ← ⚠️ PROBLEMA: URL dinámica con window.location
```

### 1.2 Mapa Visual de UI

```
┌──────────────────────────────────────────────────────────────────────────┐
│  PrologEditor Frontend (Angular)                                         │
│  Puerto: 5001                                                            │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  AppComponent (container Bootstrap)                                  │ │
│  │                                                                      │ │
│  │  ┌──────────────────────────────────────────────────────────────┐   │ │
│  │  │  <app-rule-list>                                              │   │ │
│  │  │  • Lista de reglas guardadas                                  │   │ │
│  │  │  • Botones: Ejecutar, Borrar                                  │   │ │
│  │  │  • Input: @theApp (filtro por aplicación)                     │   │ │
│  │  └──────────────────────────────────────────────────────────────┘   │ │
│  │                                                                      │ │
│  │  ┌──────────────────────────────────────────────────────────────┐   │ │
│  │  │  <app-rule-editor>                                            │   │ │
│  │  │  • Dropdown: Seleccionar template SDK                         │   │ │
│  │  │  • Textarea: Editor de regla                                  │   │ │
│  │  │  • Formulario dinámico: Args para predicados                  │   │ │
│  │  │  • Botones: Guardar, Ejecutar                                 │   │ │
│  │  │  • Output: @ruleSaved, @appSelected                           │   │ │
│  │  └──────────────────────────────────────────────────────────────┘   │ │
│  │                                                                      │ │
│  │  ┌──────────────────────────────────────────────────────────────┐   │ │
│  │  │  <app-dashboard>                                              │   │ │
│  │  │  (vacío - placeholder para métricas futuras)                  │   │ │
│  │  └──────────────────────────────────────────────────────────────┘   │ │
│  │                                                                      │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Análisis de Dependencias Angular

### 2.1 Dependencias de package.json

| Dependencia | Versión | ¿Portable a WebView? | Notas |
|-------------|---------|---------------------|-------|
| `@angular/core` | 18.2.4 | ❌ NO | Framework completo, ~2MB |
| `@angular/forms` | 18.2.4 | ❌ NO | FormsModule, ngModel |
| `@angular/common` | 18.2.4 | ❌ NO | ngIf, ngFor, HttpClient |
| `@angular/router` | 18.2.4 | ⚠️ No usado | SPA sin rutas |
| `rxjs` | 7.8.0 | ⚠️ Parcial | Solo para HTTP |
| `zone.js` | 0.14.10 | ❌ NO | Change detection |

### 2.2 Veredicto sobre Portabilidad

> **🚫 NO es viable portar el bundle Angular compilado a WebView**

Razones:
1. **Tamaño**: ~2MB mínimo (Angular + zone.js)
2. **CSP**: VS Code WebViews tienen Content Security Policy estricta
3. **Zone.js**: Conflictos con el event loop de VS Code
4. **HTTP**: `HttpClient` no funciona en contexto WebView aislado

---

## 3. Retos Específicos de Integración

### 3.1 🔴 RETO 1: Comunicación de Datos

**Problema**: Angular usa `HttpClient` → backend en puerto 8000

```typescript
// PrologEditor/frontend/src/app/services/prolog.service.ts
private apiUrl = environment.apiUrl;

saveRule(rule: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/rules`, rule);  // ❌ No funciona en WebView
}
```

**En WebView**: No hay acceso directo a HTTP desde el contexto aislado.

**Solución propuesta**: Patrón postMessage bridge

```
┌─────────────────────┐         ┌─────────────────────┐
│  WebView (HTML/JS)  │◄────────│  Extension Host     │
│                     │         │                     │
│  saveRule() ──────► │ post    │ ───► PrologBackend  │
│                     │ Message │      Service        │
│  ◄──── onResult()   │         │ ◄─── HTTP/MCP       │
└─────────────────────┘         └─────────────────────┘
```

**Código de referencia** (ya existe en TeatroWebViewProvider):

```typescript
// VsCodeExtension/src/views/TeatroWebViewProvider.ts:29-62
webviewView.webview.onDidReceiveMessage(message => {
    switch (message?.command) {
        case 'activateAgent':
            this.teatroProvider.activateAgent(message.agentId);
            break;
        // ... más handlers
    }
});
```

---

### 3.2 🔴 RETO 2: Navegación SPA

**Problema**: Angular Router gestiona navegación client-side.

**Análisis del código actual**: 
- ✅ **NO hay router configurado** en `app.module.ts`
- Toda la UI está en un solo `AppComponent`
- No hay `RouterModule.forRoot()` ni rutas

**Veredicto**: ⚠️ **No es un reto real** — el frontend es monolítico, sin navegación.

**Pero si hubiera navegación**: VS Code WebViews NO soportan `history.pushState`. Solución: tabs virtuales con `display: none/block`.

---

### 3.3 🟡 RETO 3: Estado Global (Formularios)

**Problema**: Angular Forms (`FormsModule`) gestiona estado de inputs.

```typescript
// rule-editor.component.ts
ruleText: string = '';
selectedTemplate: any = {};
```

```html
<!-- rule-editor.component.html (inferido) -->
<textarea [(ngModel)]="ruleText"></textarea>
<select [(ngModel)]="selectedTemplate">
```

**En WebView vanilla**: Replicar con estado JavaScript plano.

```javascript
// prolog-editor.js (WebView)
let state = {
    ruleText: '',
    selectedTemplate: null,
    queryHistory: []
};

document.getElementById('ruleEditor').addEventListener('input', (e) => {
    state.ruleText = e.target.value;
});
```

**Complejidad**: ⚠️ Media — Hay que replicar bindings manualmente.

---

### 3.4 🟡 RETO 4: URL Dinámica del Backend

**Problema**: `environment.ts` calcula URL con `window.location`:

```typescript
// environment.ts
apiUrl: window.location.protocol + '//' + 
        window.location.hostname.replace('-5001', '-8000') + ':8000/api'
```

**En WebView**: `window.location` apunta a `vscode-webview://...`, no a localhost.

**Solución**: La URL no se usa. En WebView, la comunicación es vía postMessage → Extension Host → Backend/MCP.

---

### 3.5 🟢 RETO 5: Estilos Bootstrap

**Problema**: El HTML usa clases Bootstrap (`container`, `row`, `col-md-12`).

```html
<!-- app.component.html -->
<div class="container mt-4">
  <div class="row">
    <div class="col-md-12">
```

**Solución**: 
- **Opción A**: Incluir Bootstrap CSS (160KB) — viable pero pesado
- **Opción B**: Reemplazar con estilos Hacker existentes — **RECOMENDADO**

Ya tenemos sistema de estilos coherente:
- `hacker-base.css` (layout base)
- `hacker-themes.css` (matrix/light/dark)
- Patrón grid propio con `flex`

---

### 3.6 🟢 RETO 6: Llamadas Asíncronas

**Problema**: Angular usa `Observable` de RxJS:

```typescript
this.prologService.getRules(app).subscribe(
    (rules) => { this.rules = rules; },
    (error) => { console.error('Error:', error); }
);
```

**En WebView vanilla**: Usar Promises + callbacks de postMessage:

```javascript
// Enviar request
vscode.postMessage({ command: 'getRules', app: 'my-app' });

// Recibir response
window.addEventListener('message', event => {
    if (event.data.command === 'rulesLoaded') {
        renderRules(event.data.rules);
    }
});
```

**Complejidad**: 🟢 Baja — es el patrón estándar de WebViews.

---

## 4. Secciones a IMPORTAR vs REESCRIBIR

### 4.1 Matriz de Decisión por Componente

| Componente | Líneas | Lógica | ¿Importar? | Acción |
|------------|--------|--------|------------|--------|
| `prolog.service.ts` | 45 | API calls | ⚠️ Parcial | Extraer endpoints, reescribir como handlers |
| `rule-editor.component.ts` | 117 | Forms + templates | ❌ No | Reescribir en JS vanilla |
| `rule-editor.component.html` | ~50 | Template Angular | ❌ No | Reescribir en HTML |
| `rule-list.component.ts` | 136 | Lista + CRUD | ❌ No | Reescribir en JS vanilla |
| `telemetry-monitor.component.ts` | 24 | Status IoT | ⏸️ Posponer | No crítico para MVP |
| `environment.ts` | 5 | Config | ❌ No | No aplica |

### 4.2 Lo que SÍ se puede extraer

#### De `prolog.service.ts` — Endpoints API:

```typescript
// EXTRAER estas rutas para el backend embebido
POST /api/rules           → saveRule(rule)
POST /api/run-rule        → runRule(ruleText)
GET  /api/rules/:app      → getRules(app)
DELETE /api/rules/:id     → deleteRule(id)
GET  /api/sdk-templates   → getSdkTemplates()
GET  /api/template/:name  → getTemplateContent(name)
```

> **YA DOCUMENTADO EN**: [openapi.yaml](../../../../../ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/openapi.yaml)

#### De `rule-editor.component.ts` — Lógica de negocio:

```typescript
// EXTRAER patrón de ejecución de predicados
onSubmit(rule: any, event: any) {
    // Mapeo de argumentos a ejemplo
    let exampleCall = rule.example;
    args.forEach((arg, index) => {
        exampleCall = exampleCall.replace(`Arg${index + 1}`, arg);
    });
    rule.evalCompatible = exampleCall;
}
```

Este patrón se replica en `prolog-editor.js` del WebView.

---

## 5. Arquitectura Final del WebView

### 5.1 Estructura de Archivos

```
VsCodeExtension/
├── src/
│   ├── views/
│   │   └── PrologEditorWebViewProvider.ts   ← Nuevo (basado en spike_opcion_d)
│   └── services/
│       └── PrologBackendService.ts          ← Nuevo (backend embebido)
│
├── media/
│   ├── prolog-editor.css                    ← Nuevo (Hacker theme)
│   ├── prolog-editor.js                     ← Nuevo (lógica UI)
│   ├── hacker-base.css                      ← Existente (reutilizar)
│   └── hacker-themes.css                    ← Existente (reutilizar)
│
└── package.json                              ← Añadir comandos
```

### 5.2 Mapeo Angular → WebView

| Angular | WebView Equivalent | Archivo |
|---------|-------------------|---------|
| `AppModule` | N/A | No aplica |
| `AppComponent` | HTML en Provider | `PrologEditorWebViewProvider.ts` |
| `RuleEditorComponent` | Sección HTML + handlers | `prolog-editor.js` |
| `RuleListComponent` | Sección HTML + handlers | `prolog-editor.js` |
| `PrologService` | Backend Service | `PrologBackendService.ts` |
| `FormsModule` | Estado JS + listeners | `prolog-editor.js` |
| `HttpClientModule` | postMessage bridge | Provider ↔ Service |
| Bootstrap CSS | Hacker CSS | `prolog-editor.css` |

### 5.3 Flujo de Datos Detallado

```
┌────────────────────────────────────────────────────────────────────────────┐
│                           VS Code Extension Host                            │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────┐      ┌─────────────────────────┐              │
│  │ PrologEditorWebView     │      │ PrologBackendService    │              │
│  │ Provider                │      │                         │              │
│  │                         │      │ • getRules(app)         │              │
│  │ handleMessage() ────────┼──────► • saveRule(rule)        │              │
│  │                         │      │ • runRule(text)         │              │
│  │ postMessage() ◄─────────┼──────┤ • getTemplates()        │              │
│  │                         │      │                         │              │
│  └────────────┬────────────┘      └───────────┬─────────────┘              │
│               │                               │                             │
│               │ postMessage                   │ HTTP/MCP                    │
│               │                               │                             │
├───────────────┼───────────────────────────────┼─────────────────────────────┤
│               ▼                               ▼                             │
│  ┌─────────────────────────┐      ┌─────────────────────────┐              │
│  │ WebView (HTML/JS)       │      │ MCPPrologServer (3006)  │              │
│  │                         │      │ o Backend Express (8000)│              │
│  │ • Rule Editor UI        │      │                         │              │
│  │ • Template Selector     │      │ Fallback si MCP no      │              │
│  │ • Query Console         │      │ está disponible         │              │
│  │ • Results Display       │      │                         │              │
│  └─────────────────────────┘      └─────────────────────────┘              │
│                                                                             │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Contrato de Mensajes (WebView ↔ Extension)

### 6.1 Mensajes del WebView → Extension

| Comando | Payload | Handler en Provider |
|---------|---------|---------------------|
| `getRules` | `{app: string}` | `handleGetRules()` |
| `saveRule` | `{rule: RuleInput}` | `handleSaveRule()` |
| `deleteRule` | `{id: number}` | `handleDeleteRule()` |
| `runRule` | `{text: string}` | `handleRunRule()` |
| `getTemplates` | `{}` | `handleGetTemplates()` |
| `getTemplateContent` | `{name: string}` | `handleGetTemplateContent()` |
| `executeQuery` | `{query: string}` | `handleExecuteQuery()` |
| `browseFile` | `{}` | `handleBrowseFile()` |
| `saveToFile` | `{content, fileName?}` | `handleSaveToFile()` |

### 6.2 Mensajes de Extension → WebView

| Comando | Payload | Trigger |
|---------|---------|---------|
| `rulesLoaded` | `{rules: Rule[]}` | Después de getRules |
| `ruleSaved` | `{id: number, text: string}` | Después de saveRule |
| `ruleDeleted` | `{id: number}` | Después de deleteRule |
| `ruleResult` | `{result: any}` | Después de runRule |
| `templatesLoaded` | `{templates: Template[]}` | Después de getTemplates |
| `templateContent` | `{content: string}` | Después de getTemplateContent |
| `queryResult` | `{query, result}` | Después de executeQuery |
| `fileLoaded` | `{filePath, content}` | Después de browseFile |
| `error` | `{message: string}` | En cualquier error |
| `applyTheme` | `{theme: string}` | Cambio de tema |

---

## 7. Estimación de Esfuerzo Refinada

| Tarea | Horas | Complejidad | Dependencias |
|-------|-------|-------------|--------------|
| **HTML Layout** (basado en spike) | 1h | 🟢 Baja | spike_opcion_d §3.2 |
| **CSS Hacker Theme** | 1h | 🟢 Baja | hacker-base.css |
| **JS Estado + Handlers** | 2h | 🟡 Media | Mensajes definidos |
| **Provider TypeScript** | 2h | 🟡 Media | BaseHackerPanelProvider |
| **Backend Service** | 2h | 🟡 Media | OpenAPI spec |
| **Integración MCP** | 1h | 🟢 Baja | MCPDriverAdapter existente |
| **Tests básicos** | 1h | 🟢 Baja | — |
| **Total** | **10h** | — | — |

---

## 8. Checklist Pre-Implementación

### Requisitos técnicos

- [x] Spike detallado: `spike_opcion_d_vscode_webview.md`
- [x] OpenAPI spec: `specs/PrologEditor/openapi.yaml`
- [x] Clase base: `BaseHackerPanelProvider.ts`
- [x] Patrón de referencia: `TeatroWebViewProvider.ts`
- [x] Estilos base: `hacker-base.css`, `hacker-themes.css`
- [x] Contrato de mensajes: §6 de este documento
- [ ] Backend Service: PrologBackendService.ts (a crear)
- [ ] WebView assets: prolog-editor.{css,js} (a crear)

### Riesgos mitigados

| Riesgo original | Mitigación |
|-----------------|------------|
| Angular no portable | Reescribir en vanilla JS |
| HttpClient no funciona | postMessage bridge |
| Bootstrap pesado | Hacker CSS propio |
| Navegación SPA | No hay (app monolítica) |
| Estado de formularios | Estado JS + listeners |

---

## 9. Referencias Cruzadas DRY

| Si necesitas... | Consulta |
|-----------------|----------|
| Código completo del Provider | [spike_opcion_d §3.2](spike_opcion_d_vscode_webview.md#32-clase-prologeditorwebviewprovider) |
| JavaScript del WebView | [spike_opcion_d §3.3](spike_opcion_d_vscode_webview.md#33-javascript-del-webview) |
| Endpoints API | [openapi.yaml](../../../../../ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/openapi.yaml) |
| Patrón de WebView existente | [TeatroWebViewProvider.ts](../../../../../VsCodeExtension/src/views/TeatroWebViewProvider.ts) |
| Decisión arquitectónica | [DRY_decision_vscode_prolog_integration.md](DRY_decision_vscode_prolog_integration.md) |

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-01-02 | Documento inicial con análisis de componentes Angular | @ox |
