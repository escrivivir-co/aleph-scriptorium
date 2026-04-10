# Feature Cycle 1: TypedPrompting Context Manager

> **Estado**: 🔄 Refinado  
> **Sprint**: FC1 (Q1 2026)  
> **Creado**: 2025-12-29  
> **Refinado**: 2025-12-29 ([conversación](03_conversacion-refinamiento-backlog.md))  
> **Autor**: @scrum + PO + Lucas + @ox + @indice + @aleph

---

## Resumen Ejecutivo

Implementar un **gestor de contexto dinámico** basado en TypedPrompting que reduzca el context bloat de 127K a ~50K tokens por request.

**Problema actual**: El log [AgenteGhPagesInnerVoices.md](../../DEPRECATED/AgenteGhPagesInnerVoices.md) muestra 127,548 tokens (99.6% del límite) con solo 162 tokens de respuesta útil.

**Solución**: Carga dinámica de instrucciones según foco del usuario, coordinada por @indice, @ox y @aleph.

---

## Épicas del Ciclo

| # | Épica | Nombre | Effort | Deps | Owner |
|---|-------|--------|--------|------|-------|
| 1 | SCRIPT-2.1.0 | Context Manager Core | 5 pts | — | @indice |
| 2 | SCRIPT-2.3.0 | Context Packs System | 5 pts | 2.1.0 | @ox |
| 3 | SCRIPT-2.2.4 | MCP Integration (fusión 2.2+2.4) | 5 pts | 2.3.0 | Lucas |
| — | SCRIPT-2.5.0 | Dynamic Tool Filtering | 8 pts | **Diferido FC2** | — |

**Total FC1**: 15 pts (3 épicas)  
**Diferido FC2**: 8 pts (1 épica invasiva)

---

## Métricas Objetivo

| Métrica | Antes | Después FC1 | Reducción |
|---------|-------|-------------|-----------|
| Tokens por request | 127K | ~50K | 60% |
| Instructions cargadas | 19 | 3-5 | 75% |
| Time to first token | 55s | ~20s | 65% |
| Tools inyectados | 47 | 47 | 0% (diferido a FC2) |

---

## Épica 1: SCRIPT-2.1.0 — Context Manager Core

**Owner**: @indice  
**Effort**: 5 pts

### S01: Definir ContextRequest Schema (2 pts)

| Task | Descripción | Estado |
|------|-------------|--------|
| T001 | Crear `context-request.schema.json` | ⏳ |
| T002 | Crear `foco-activo.schema.json` | ⏳ |
| T003 | Validar con ajv en modo warn | ⏳ |
| T004 | Documentar en typed-prompting.instructions.md | ⏳ |

### S02: Implementar @indice.resolverFoco() (2 pts)

| Task | Descripción | Estado |
|------|-------------|--------|
| T005 | Añadir handoff "Resolver contexto por foco" | ⏳ |
| T006 | Crear `resolver-foco.prompt.md` | ⏳ |
| T007 | Implementar mapeo dominio→instrucciones | ⏳ |

### S03: Hook de Conversación (1 pt)

| Task | Descripción | Estado |
|------|-------------|--------|
| T008 | Invocar @indice antes de construir system message | ⏳ |
| T009 | Documentar flujo en Tecnico.md | ⏳ |

**Criterio de Aceptación**:
- [ ] Schema validado con mode: warn
- [ ] @indice retorna array de instrucciones filtradas
- [ ] Tokens por request reducidos >30%

---

## Épica 2: SCRIPT-2.3.0 — Context Packs System

**Owner**: @ox  
**Effort**: 5 pts

### S01: Extender manifest.md con contextTriggers (1 pt)

| Task | Descripción | Estado |
|------|-------------|--------|
| T010 | Definir schema `contextTriggers` | ⏳ |
| T011 | Actualizar manifest de 3 plugins ejemplo | ⏳ |

### S02: Crear context-packs.json (2 pts)

| Task | Descripción | Estado |
|------|-------------|--------|
| T012 | Agregar triggers de todos los plugins | ⏳ |
| T013 | Mapear packs a settings.json locations | ⏳ |

### S03: Activación en settings.json (1 pt)

| Task | Descripción | Estado |
|------|-------------|--------|
| T014 | Crear estructura `scriptorium.contextPacks` | ⏳ |
| T015 | Crear `scripts/activate-pack.sh` | ⏳ |

### S04: Documentación (1 pt)

| Task | Descripción | Estado |
|------|-------------|--------|
| T016 | Actualizar Tecnico.md con packs | ⏳ |
| T017 | Actualizar PLUGINS.md con nuevo campo manifest | ⏳ |

**Criterio de Aceptación**:
- [ ] Cada plugin declara sus triggers
- [ ] @ox puede validar coherencia de packs
- [ ] Script activate-pack.sh funcional

---

## Épica 3: SCRIPT-2.2.4 — MCP Integration

**Owner**: Lucas  
**Effort**: 5 pts  
**Nota**: Fusión de SCRIPT-2.2.0 (MCP Resources Schema) + SCRIPT-2.4.0 (MCPGallery Integration)  
**Anexo**: [09_Integracion_MCPGallery_Servidores.md](09_Integracion_MCPGallery_Servidores.md)

### S01: Mapear MCPGallery a TypedPrompting (2 pts)

| Task | Descripción | Estado |
|------|-------------|--------|
| T018 | Analizar `MCPGallery/preset.json` | ✅ |
| T019 | Crear `mcp-integration.schema.json` | ⏳ |
| T020 | Mapear items a contracts | ⏳ |

### S02: MCP Resources Schema (1 pt)

| Task | Descripción | Estado |
|------|-------------|--------|
| T021 | Crear schema para `resource://` URIs | ⏳ |
| T022 | Añadir mimeType validation | ⏳ |

### S03: Preset de Ejemplo (1 pt)

| Task | Descripción | Estado |
|------|-------------|--------|
| T023 | Crear `devops-tools.preset.json` | ⏳ |
| T024 | Documentar en mcp-presets.instructions.md | ✅ |

### S04: Integración con @aleph (1 pt)

| Task | Descripción | Estado |
|------|-------------|--------|
| T025 | Añadir handoff "Invocar preset" | ✅ |
| T026 | Probar ejecución de preset | ⏳ |

### S05: Configurar mcp.json (NUEVO)

| Task | Descripción | Estado |
|------|-------------|--------|
| T027 | Crear `.vscode/mcp.json` con servidores | ✅ |
| T028 | Documentar protocolo en PLUGINS.md | ✅ |
| T029 | Actualizar manifest mcp-presets con mcpServers | ✅ |
| T030 | Añadir scripts de arranque en mcp-mesh-sdk | ✅ |

**Criterio de Aceptación**:
- [x] Presets de MCPGallery importables como packs
- [ ] Resources MCP validados por schema
- [x] @aleph puede invocar preset por nombre
- [x] 4 servidores MCP registrados en mcp.json

---

## Épica Diferida: SCRIPT-2.5.0 — Dynamic Tool Filtering

**Status**: 🔮 Diferido a FC2  
**Effort**: 8 pts  
**Razón**: Requiere modificación invasiva de CopilotEngine (interceptar messagesApi.ts)

| Story | Descripción | Notas |
|-------|-------------|-------|
| S01 | Identificar hook de extensión | Investigar extensionService |
| S02 | Filtrar tools antes de serialización | Modificar messagesApi.ts |
| S03 | Mapear tools por dominio | Reusar context-packs.json |

---

## Dependencias

| Épica | Relación | Estado |
|-------|----------|--------|
| SCRIPT-1.29.0 | Prerequisito (Context Bloat Mitigation) | ✅ Cerrado |
| typed-prompting plugin | Base tecnológica | ✅ Instalado |
| mcp-presets plugin | Tool filtering | ✅ Instalado |
| indice.agent.md | Resolver de contexto | ✅ Existente |

### Submódulos Relevantes (según Tecnico.md)

| Submódulo | Uso en FC1 |
|-----------|------------|
| `CopilotEngine/` | Referencia para hooks (no modificar) |
| `TypedPromptsEditor/` | UI para validar schemas |
| `MCPGallery/` | Fuente de presets |
| `OnthologyEditor/` | Paradigma FVE (futuro) |

---

## Hallazgos de Refinamiento

### CopilotEngine: Dinamismo sin Reinicio

```typescript
// customInstructionsService.ts - NO requiere reiniciar VS Code
observableFromEvent(
    (handleChange) => configurationService.onDidChangeConfiguration(e => {
        if (e.affectsConfiguration(INSTRUCTIONS_LOCATION_KEY)) {
            handleChange(e);  // ← SE REFRESCA EN CALIENTE
        }
    })
)
```

**Excepción**: Nuevos archivos `.agent.md` pueden requerir `Developer: Reload Window`.

### Fusión de Épicas

Las épicas originales SCRIPT-2.2.0 y SCRIPT-2.4.0 se fusionaron en **SCRIPT-2.2.4** porque:
- MCP Resources Schema (2.2.0) y MCPGallery Integration (2.4.0) son dos caras de la misma moneda
- MCPGallery ya tiene schema funcional reutilizable
- Reduce overhead de coordinación

---

## Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| CopilotEngine no expone API de filtrado | Alta | Medio | Diferir a FC2, usar settings.json |
| Performance de resolución | Media | Bajo | Cache de packs en memoria |
| Conflictos entre packs | Baja | Medio | Prioridad por especificidad |
| Cambios breaking en VS Code | Baja | Alto | Versionar dependencia |

---

## Entregables

| # | Entregable | Épica | Ubicación |
|---|------------|-------|-----------|
| 1 | context-request.schema.json | 2.1.0 | TYPED_PROMPTING/schemas/ |
| 2 | foco-activo.schema.json | 2.1.0 | TYPED_PROMPTING/schemas/ |
| 3 | resolver-foco.prompt.md | 2.1.0 | typed-prompting/prompts/ |
| 4 | context-packs.json | 2.3.0 | .github/plugins/ |
| 5 | activate-pack.sh | 2.3.0 | scripts/ |
| 6 | mcp-integration.schema.json | 2.2.4 | TYPED_PROMPTING/schemas/ |
| 7 | devops-tools.preset.json | 2.2.4 | mcp-presets/presets/ |

---

## Definition of Done (FC1 Completo)

- [ ] 3 épicas cerradas con todos los tasks ✅
- [ ] 7 entregables en ubicaciones canónicas
- [ ] Tokens por request <60K en prueba manual
- [ ] Documentación actualizada (Tecnico.md, PLUGINS.md)
- [ ] Commits conformes a DEVOPS.md
- [ ] Prueba de integración: `@aleph crea blueprint` con contexto reducido

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-29 | Refinamiento con PO, Lucas, @ox, @indice, @aleph | @scrum |
| 2025-12-29 | Fusión SCRIPT-2.2.0 + 2.4.0 → 2.2.4 | @scrum |
| 2025-12-29 | Diferir SCRIPT-2.5.0 a FC2 | @scrum |
| 2025-12-29 | Creación inicial del borrador | @scrum |
