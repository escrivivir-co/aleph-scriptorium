# Backlog: Model Selector para Generate Abstract

> **Épica**: SCRIPT-2.2.0  
> **Effort total**: 21 pts  
> **Estado**: ✅ Completado  
> **Fecha**: 2026-01-02

---

## Contexto

### Problema
El método `generate_abstract` en `SnapshotManager.ts` tiene hardcodeado el modelo:
```typescript
const models = await vscode.lm.selectChatModels({ vendor: 'copilot', family: 'gpt-4o' });
```

### Objetivo
Permitir que el usuario seleccione el modelo LLM desde la UI de Copilot Metrics, con un archivo JSON de configuración para fácil actualización.

### Investigación Realizada

1. **Ubicación del código actual**:
   - `VsCodeExtension/src/copilotLogs/SnapshotManager.ts` línea 439
   - `VsCodeExtension/src/copilotLogs/CopilotMetricsPanelProvider.ts` (WebView)
   - `VsCodeExtension/src/copilotLogs/templates/MetricsPanelTemplate.ts` (Template HTML)

2. **Modelos detectados en logs**:
   - Los logs capturan el campo `model` de cada request (ej: `claude-3.5-sonnet`)
   - El servicio `CopilotLogExporterService` ya agrupa stats `byModel`

3. **API VS Code disponible**:
   - `vscode.lm.selectChatModels({ vendor, family })` para obtener modelos
   - No hay API pública para listar TODOS los modelos disponibles del usuario

4. **Posibilidad de leer modelos desde logs**:
   - ✅ Viable: Podemos extraer los modelos únicos usados históricamente
   - ❌ Limitación: Solo muestra modelos YA usados, no los disponibles pero no usados

---

## Arquitectura Propuesta

```
┌─────────────────────────────────────────────────────────┐
│                   Copilot Metrics Panel                  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  🤖 Model Selector for Generate Abstract         │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │ [v] Claude Opus 4.5              ▼         │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  │  [ Generate Abstract ]                            │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│     models-config.json (fácil actualización)            │
│  {                                                      │
│    "models": [                                          │
│      { "id": "claude-opus-4.5", "name": "...", ... }   │
│    ]                                                    │
│  }                                                      │
└─────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│            SnapshotManager.generateAbstract()           │
│  - Recibe modelId como parámetro                        │
│  - Lee config para mapear a vendor/family               │
│  - Selecciona modelo con vscode.lm.selectChatModels()   │
└─────────────────────────────────────────────────────────┘
```

---

## Stories

| ID | Nombre | Effort | Estado |
|----|--------|--------|--------|
| S01 | Crear archivo de configuración de modelos | 3 pts | ✅ |
| S02 | Service de gestión de modelos | 5 pts | ✅ |
| S03 | UI selector en Copilot Metrics Panel | 5 pts | ✅ |
| S04 | Integrar selector con generate_abstract | 5 pts | ✅ |
| S05 | Enriquecer lista con modelos de logs | 3 pts | ✅ |

---

## Tasks Detalladas

### S01: Crear archivo de configuración de modelos

**Effort**: 3 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T001 | Crear `VsCodeExtension/src/copilotLogs/config/models-config.json` | 1 | ✅ |
| T002 | Definir interface `ModelConfig` en types | 1 | ✅ |
| T003 | Incluir modelos: Claude (Haiku, Sonnet 4, Opus 4.5), Gemini Pro 3, GPT-5.2 | 1 | ✅ |

**Estructura del JSON**:
```json
{
  "models": [
    {
      "id": "claude-opus-4.5",
      "name": "Claude Opus 4.5",
      "vendor": "copilot",
      "family": "claude-opus",
      "description": "Most capable, best for complex reasoning",
      "tier": "premium"
    },
    {
      "id": "claude-sonnet-4",
      "name": "Claude Sonnet 4",
      "vendor": "copilot",
      "family": "claude-sonnet",
      "description": "Balanced performance and speed",
      "tier": "standard"
    },
    {
      "id": "claude-haiku-3.5",
      "name": "Claude Haiku 3.5",
      "vendor": "copilot",
      "family": "claude-haiku",
      "description": "Fast and lightweight",
      "tier": "lite"
    },
    {
      "id": "gemini-pro-3",
      "name": "Gemini Pro 3",
      "vendor": "copilot",
      "family": "gemini-pro",
      "description": "Google's advanced model",
      "tier": "standard"
    },
    {
      "id": "gpt-5.2",
      "name": "GPT-5.2",
      "vendor": "copilot",
      "family": "gpt-5",
      "description": "OpenAI's latest",
      "tier": "premium"
    },
    {
      "id": "gpt-4o",
      "name": "GPT-4o",
      "vendor": "copilot",
      "family": "gpt-4o",
      "description": "Fast multimodal (default actual)",
      "tier": "standard"
    }
  ],
  "defaultModel": "claude-sonnet-4"
}
```

**Definition of Done**: JSON válido, types exportados, tests pasando

---

### S02: Service de gestión de modelos

**Effort**: 5 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T004 | Crear `ModelConfigService.ts` | 2 | ✅ |
| T005 | Método `getAvailableModels()` que carga config | 1 | ✅ |
| T006 | Método `getModelById(id)` para lookup | 1 | ✅ |
| T007 | Método `enrichWithHistoricalModels(logs)` para añadir modelos de logs | 1 | ✅ |

**Definition of Done**: Service singleton, métodos probados, exportado en index.ts

---

### S03: UI selector en Copilot Metrics Panel

**Effort**: 5 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T008 | Añadir sección "Generate Abstract" en `MetricsPanelTemplate.ts` | 2 | ✅ |
| T009 | Dropdown con modelos disponibles | 1 | ✅ |
| T010 | Botón "Generate Abstract" con callback | 1 | ✅ |
| T011 | Handler en `CopilotMetricsPanelProvider.ts` para nuevo comando | 1 | ✅ |

**UI Preview**:
```html
<div class="metric-card">
    <h3>🤖 Generate Abstract</h3>
    <select id="model-selector">
        <option value="claude-sonnet-4">Claude Sonnet 4</option>
        ...
    </select>
    <button onclick="generateAbstract()">Generate</button>
</div>
```

**Definition of Done**: UI funcional, selector poblado, botón envía mensaje

---

### S04: Integrar selector con generate_abstract

**Effort**: 5 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T012 | Modificar `SnapshotManager.generateAbstract()` para recibir modelId | 2 | ✅ |
| T013 | Resolver vendor/family desde ModelConfigService | 1 | ✅ |
| T014 | Actualizar tool MCP `generate_abstract` con parámetro opcional | 1 | ✅ |
| T015 | Manejar fallback si modelo no disponible | 1 | ✅ |

**Cambio en MCP Tool**:
```typescript
this.server.tool(
    'generate_abstract',
    'Generate ABSTRACT.md with semantic summaries using selected LLM.',
    { 
        modelId: { type: 'string', description: 'Model ID (optional, uses default if not specified)' }
    },
    async ({ modelId }) => { ... }
);
```

**Definition of Done**: Abstract se genera con modelo seleccionado, fallback funcional

---

### S05: Enriquecer lista con modelos de logs

**Effort**: 3 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T016 | Extraer modelos únicos de `CopilotUsageMetrics.byModel` | 1 | ✅ |
| T017 | Fusionar con modelos de config (prioridad config) | 1 | ✅ |
| T018 | Mostrar indicador visual para modelos "descubiertos" vs "predefinidos" | 1 | ✅ |

**Definition of Done**: Lista muestra modelos del usuario aunque no estén en config

---

## Métricas

| Métrica | Target | Mínimo | Estado |
|---------|--------|--------|--------|
| Tasks completadas | 18/18 | 12/18 | ✅ 18/18 |
| Effort completado | 21 pts | 13 pts | ✅ 21 pts |
| % Avance | 100% | 60% | ✅ 100% |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| CopilotMetricsPanelProvider | ✅ Existe | Base para UI |
| SnapshotManager | ✅ Existe | Necesita refactor menor |
| MCP Server copilot-logs | ✅ Funcional | Tool ya existe |

---

## Notas Técnicas

### Limitación de la API

La API `vscode.lm.selectChatModels()` **no permite listar todos los modelos disponibles**. Solo filtra por vendor/family. Por eso:

1. **Solución principal**: Archivo JSON de configuración con modelos conocidos
2. **Enriquecimiento**: Leer logs para descubrir modelos usados
3. **Futuro**: Si VS Code expone API de lista, actualizamos

### Mapeo vendor/family

| Model ID | Vendor | Family |
|----------|--------|--------|
| claude-opus-4.5 | copilot | claude-opus |
| claude-sonnet-4 | copilot | claude-sonnet |
| claude-haiku-3.5 | copilot | claude-haiku |
| gemini-pro-3 | copilot | gemini-pro |
| gpt-5.2 | copilot | gpt-5 |
| gpt-4o | copilot | gpt-4o |

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-01-02 | ✅ Épica completada: 18 tasks, 21 pts | @scrum |
| 2026-01-02 | 📋 Borrador inicial | @scrum |

## Archivos Creados/Modificados

| Archivo | Tipo | Descripción |
|---------|------|-------------|
| `src/copilotLogs/config/models-config.json` | ✅ Nuevo | Configuración de modelos LLM |
| `src/copilotLogs/types/model.types.ts` | ✅ Nuevo | Types para modelo |
| `src/copilotLogs/ModelConfigService.ts` | ✅ Nuevo | Service de gestión de modelos |
| `src/copilotLogs/templates/MetricsPanelTemplate.ts` | 🔄 Modificado | Sección Generate Abstract con selector |
| `src/copilotLogs/CopilotMetricsPanelProvider.ts` | 🔄 Modificado | Handler generateAbstract |
| `src/copilotLogs/SnapshotManager.ts` | 🔄 Modificado | generateAbstract con modelId |
| `src/copilotLogs/CopilotLogsMCPServer.ts` | 🔄 Modificado | Tool con parámetro modelId |
| `src/copilotLogs/index.ts` | 🔄 Modificado | Exports nuevos |
