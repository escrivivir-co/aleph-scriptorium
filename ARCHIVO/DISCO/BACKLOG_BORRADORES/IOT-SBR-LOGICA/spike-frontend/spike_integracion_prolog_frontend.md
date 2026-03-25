# Spike: Integración PrologEditor/frontend en Aleph Scriptorium

> **Epic**: SCRIPT-2.3.0 — Prolog MCP Server Integration  
> **Sprint**: FC1  
> **Fecha**: 2 de enero de 2026  
> **Autor**: @ox (spike técnico)  
> **Revisores**: @aleph (producción), @indice (navegación DRY)

---

## 1. Contexto del Problema

### 1.1 Estado Actual

| Componente | Estado | Ubicación | Puerto |
|------------|--------|-----------|--------|
| **MCPPrologServer** | ✅ Integrado en LauncherServer | `MCPGallery/mcp-mesh-sdk/src/MCPPrologServer.ts` | 3006 |
| **PrologEditor/backend** | ✅ Funcional standalone | `PrologEditor/backend/` | 8000 |
| **PrologEditor/frontend** | ⚠️ Standalone, NO integrado | `PrologEditor/frontend/` | 5001 |

### 1.2 Pregunta Central

> **¿Cómo servimos el frontend Angular de PrologEditor dentro del ecosistema Aleph Scriptorium?**

El MCPPrologServer ya está orquestado por MCPLauncherServer (puerto 3050), pero el frontend Angular es una app SPA separada que:
- Requiere `ng serve` para desarrollo
- Necesita build para producción
- No tiene punto de entrada desde `docs/` (Jekyll/GH-Pages)

---

## 2. Análisis Técnico

### 2.1 Stack de PrologEditor/frontend

```yaml
Framework: Angular 18.2.4
Lenguaje: TypeScript 5.5.2
Puerto dev: 5001
Build output: dist/
Dependencias críticas:
  - @angular/forms (editor de reglas)
  - @angular/router (navegación SPA)
  - rxjs (comunicación con backend)
```

### 2.2 Opciones de Integración

#### Opción A: Iframe en docs/ (GH-Pages)

**Concepto**: Servir el frontend Angular como app separada y embeber vía iframe en una página de docs/.

```
docs/prolog-editor.md  ←── iframe ←── localhost:5001 (o hosting externo)
```

**Pros**:
- Mínima modificación al frontend
- Separación de concerns
- Ya tenemos patrón similar (impress.js embeds)

**Contras**:
- Requiere hosting separado para el Angular app
- Cross-origin issues potenciales
- No funciona en GH-Pages estático sin servidor

**Viabilidad**: ⚠️ Solo para desarrollo local

---

#### Opción B: Build Angular → assets/ de Jekyll

**Concepto**: Compilar el frontend Angular y copiar el build a `docs/assets/prolog-editor/`.

```bash
cd PrologEditor/frontend
ng build --output-path ../../docs/assets/prolog-editor/ --base-href /assets/prolog-editor/
```

```
docs/
├── assets/
│   └── prolog-editor/
│       ├── index.html
│       ├── main.js
│       ├── polyfills.js
│       └── styles.css
└── prolog-editor.md  ←── Página wrapper
```

**Pros**:
- Funciona en GH-Pages (estático)
- Un solo deploy
- No requiere servidor adicional

**Contras**:
- El frontend Angular llama a backend (8000) que NO existe en GH-Pages
- Hay que mockear/adaptar los servicios para modo "sin backend"
- O conectar a MCPPrologServer (3006) en lugar de backend Express

**Viabilidad**: ✅ Con adaptaciones

---

#### Opción C: MCPLauncherServer sirve el frontend

**Concepto**: Extender MCPLauncherServer para servir el build del frontend Angular como recursos estáticos.

```typescript
// En MCPLauncherServer.ts
import express from 'express';

// Servir frontend Angular en /prolog-editor/
app.use('/prolog-editor', express.static('PrologEditor/frontend/dist'));
```

```
http://localhost:3050/prolog-editor/  ←── Angular SPA
http://localhost:3006/                 ←── MCPPrologServer API
```

**Pros**:
- Todo orquestado desde un punto (LauncherServer)
- El backend Prolog ya está en 3006
- No requiere GH-Pages para funcionar

**Contras**:
- Acopla frontend al servidor MCP
- Requiere build del Angular antes de lanzar
- Más complejidad en LauncherServer

**Viabilidad**: ✅ Buena para desarrollo/demo

---

#### Opción D: VS Code WebView Extension

**Concepto**: Crear una extensión VS Code que embeba el frontend Angular como WebView.

```typescript
// VsCodeExtension/src/panels/PrologEditorPanel.ts
const panel = vscode.window.createWebviewPanel(
  'prologEditor',
  'Prolog Editor',
  vscode.ViewColumn.One,
  { enableScripts: true }
);
panel.webview.html = getAngularAppHtml();
```

**Pros**:
- Integración nativa con VS Code
- Puede comunicarse directamente con MCPPrologServer
- Experiencia de usuario cohesiva

**Contras**:
- Requiere extensión VS Code adicional
- Complejidad de desarrollo
- No accesible fuera de VS Code

**Viabilidad**: ✅ Para roadmap FC2+

---

#### Opción E: Reemplazar frontend por React/docs

**Concepto**: No integrar el Angular existente, sino crear una UI simplificada en React/Preact que viva directamente en `docs/`.

```
docs/
└── prolog-editor/
    ├── index.md          # Jekyll wrapper
    └── app/
        ├── PrologEditor.jsx
        └── services/
            └── mcpClient.js  # Cliente MCP directo
```

**Pros**:
- UI ligera, sin build step complejo
- Puede usar cliente MCP directamente
- Control total del diseño

**Contras**:
- Reescribir UI existente
- Pérdida de funcionalidad del Angular (forms, validación)
- Esfuerzo de desarrollo significativo

**Viabilidad**: ⚠️ Solo si Angular es insalvable

---

## 3. Matriz de Decisión

| Criterio | Peso | A (iframe) | B (Jekyll) | C (Launcher) | D (WebView) | E (React) |
|----------|------|------------|------------|--------------|-------------|-----------|
| Funciona en GH-Pages | 3 | ❌ 0 | ✅ 3 | ❌ 0 | ❌ 0 | ✅ 3 |
| Funciona local | 3 | ✅ 3 | ✅ 3 | ✅ 3 | ✅ 3 | ✅ 3 |
| Mínimo esfuerzo | 2 | ✅ 2 | ⚠️ 1 | ⚠️ 1 | ❌ 0 | ❌ 0 |
| Usa código existente | 2 | ✅ 2 | ✅ 2 | ✅ 2 | ⚠️ 1 | ❌ 0 |
| Integración MCP | 2 | ⚠️ 1 | ⚠️ 1 | ✅ 2 | ✅ 2 | ✅ 2 |
| **TOTAL** | 12 | **8** | **10** | **8** | **6** | **8** |

**Ganador preliminar**: **Opción B (Jekyll)** con 10 puntos.

---

## 4. Propuesta: Enfoque Híbrido (B + C)

### 4.1 Fase 1: Desarrollo Local (Opción C)

Para desarrollo y demos inmediatas:

1. **Añadir task en VS Code** para levantar PrologEditor completo:
   ```json
   {
     "label": "PrologEditor: Start Full Stack",
     "type": "shell",
     "command": "cd PrologEditor && npm start"
   }
   ```

2. **Configurar proxy** en Angular para apuntar a MCPPrologServer:
   ```typescript
   // PrologEditor/frontend/src/proxy.conf.json
   {
     "/api": {
       "target": "http://localhost:3006",
       "secure": false,
       "pathRewrite": { "^/api": "" }
     }
   }
   ```

3. **Documentar en docs/demo.md** como demo disponible en localhost:5001

### 4.2 Fase 2: Publicación Estática (Opción B)

Para GH-Pages y distribución:

1. **Adaptar servicios Angular** para modo offline/demo:
   - Crear `MockPrologService` con datos de ejemplo
   - Detectar si hay backend disponible

2. **Script de build para Jekyll**:
   ```bash
   # scripts/build-prolog-editor.sh
   cd PrologEditor/frontend
   ng build --output-path ../../docs/assets/prolog-editor/ \
            --base-href /assets/prolog-editor/
   ```

3. **Crear página wrapper** en docs/:
   ```markdown
   ---
   layout: default
   title: Prolog Editor
   permalink: /prolog-editor/
   ---
   <div id="prolog-editor-app"></div>
   <script src="/assets/prolog-editor/main.js"></script>
   ```

### 4.3 Fase 3: VS Code WebView (Roadmap FC2)

Para experiencia integrada completa:
- Evaluar si vale la pena después de validar Fase 1 y 2
- Considerar usar VsCodeExtension existente

---

## 5. Dependencias y Requisitos

### 5.1 Para Fase 1

| Requisito | Estado | Responsable |
|-----------|--------|-------------|
| Node.js 18+ | ✅ | Usuario |
| SWI-Prolog | ✅ | Usuario |
| MCPLauncherServer | ✅ | Ya existe |
| Task de VS Code | 📋 | @aleph |

### 5.2 Para Fase 2

| Requisito | Estado | Responsable |
|-----------|--------|-------------|
| Adaptar PrologService | 📋 | @plugin_ox_prologeditor |
| Script de build | 📋 | @aleph |
| Página Jekyll | 📋 | @plugin_ox_ghpages |
| Test en GH-Pages | 📋 | @ox |

---

## 6. Riesgos y Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Angular incompatible con Jekyll | Media | Alto | Usar subfolder independiente |
| CORS entre frontend y MCP | Alta | Medio | Configurar headers en servidor |
| Build Angular rompe | Media | Medio | CI pipeline de validación |
| GH-Pages no sirve SPA | Alta | Alto | Usar hash routing en Angular |

---

## 7. Preguntas para @aleph y @indice

### Para @aleph (Producción)

1. **¿Priorizamos demo local (Fase 1) o publicación estática (Fase 2)?**
   - Si Release Party es inminente → Fase 1
   - Si queremos documentación pública → Fase 2

2. **¿El frontend debe conectar a MCPPrologServer (3006) o al backend Express original (8000)?**
   - MCPPrologServer tiene tools MCP
   - Backend Express tiene API REST tradicional

3. **¿Añadimos PrologEditor a la Demo Gallery (`docs/demo.md`)?**
   - Sí → Crear entrada con instrucciones
   - No → Solo documentar en README

### Para @indice (Navegación DRY)

1. **¿Dónde ubicamos la documentación del frontend?**
   - `.github/plugins/prolog-editor/docs/` (junto al plugin)
   - `docs/prolog-editor/` (en GH-Pages)
   - Ambos con referencia DRY

2. **¿Actualizamos Funcional.md con la capacidad "editar_reglas_prolog_ui"?**
   - Actualmente solo referencia PrologEditor/frontend
   - Falta entrada para UI web accesible

---

## 8. Siguiente Paso Propuesto

### Acción Inmediata

Crear **task de VS Code** para levantar PrologEditor completo y **añadir entrada en Demo Gallery**:

```json
// .vscode/tasks.json
{
  "label": "Demo: PrologEditor Full Stack",
  "type": "shell",
  "command": "cd PrologEditor && npm install && npm start",
  "isBackground": true,
  "problemMatcher": []
}
```

```markdown
<!-- docs/demo.md -->
### Prolog Editor

**Puerto**: 5001 (frontend) + 8000 (backend)  
**Estado**: 🟡 Desarrollo local  
**Comando**: `cd PrologEditor && npm start`

Editor visual para crear y ejecutar reglas Prolog.
```

---

## 9. Referencias

- [PrologEditor README-SCRIPTORIUM](../../PrologEditor/README-SCRIPTORIUM.md)
- [MCPLauncherServer](../../MCPGallery/mcp-mesh-sdk/src/MCPLauncherServer.ts)
- [MCPPrologServer](../../MCPGallery/mcp-mesh-sdk/src/MCPPrologServer.ts)
- [Plugin prolog-editor](../../../.github/plugins/prolog-editor/manifest.md)
- [Demo Gallery](../../docs/demo.md)
- [Backlog Epic SCRIPT-2.3.0](./ejemplo_lucas_import_export.md)

---

**Estado del Spike**: 📋 Pendiente revisión @aleph + @indice











Muy bien, lo que traigo ahora es más complejo. Hazlo por pasos y con cuidado.

Vamos a hacer un siguiente archivo para el caso Opción C: MCPLauncherServer sirve el frontend. Pero ojo, con restricciones:

- Primero, vamos a instalar un nuevo submodulo, #file:as_instalar_submodulo.prompt.md y después seguimos la conversación porque vamos a inicializar el upstream en nuestra rama habitual par submodulos y a quedarnos solo con lo que necesitamos, borrando todo lo extra. Nombre clave del modulo: StateMachine  https://github.com/escrivivir-co/state-machine-mcp-driver 

- Segundo, una vez tengamos incializado el submodulo podremos investigar lo siguiente: a) la statemachine es un sistema nodejs que de un lado lanza servidores MCP (eso no lo queremos ya lo tenemos en nuestra mesh de MCPGallery); pero del otro lado es un servidor de pantallas de gamificacion (ver que nuestra #file:VsCodeExtension ya está conectada y tiene view panels para gestionarlas ), esta es la parte que nos interesa. ¿Cómo resolver la Opción C pero usando gamification ui para nuestro frontend angular? Crea spike.