# Acta T014: @ox — Análisis Arquitectónico + Backlog Fase 2

**Fecha**: 2026-01-05  
**Turno**: 14  
**Agente**: @ox (Meta-coordinador)  
**Estado**: ✅ DONE

---

## 🐂 Análisis de la Propuesta de @aleph

### Cuestionamiento de Arquitectura

**Pregunta de @aleph**: ¿El nuevo blueprint debería seguir el patrón de `blueprint-copilot.md` (fases) o `blueprint-mmco.md` (niveles)?

**Respuesta @ox**: **Ninguno de los dos**. Debería seguir el patrón de `blueprint-logic-flow.md`:

| Blueprint | Patrón | Motivo |
|-----------|--------|--------|
| `blueprint-copilot.md` | Fases lineales | Flujo secuencial de request |
| `blueprint-mmco.md` | Niveles MMCO | Jerarquía ontológica |
| `blueprint-logic-flow.md` | **ESPIRAL + CUBO** | Ciclo de desarrollo |
| `blueprint-typed-prompting.md` | **ESPIRAL + CUBO** | ✅ Mismo dominio técnico |

**Razón**: TypedPrompting es parte del mismo stack que PrologEditor (L0→L3). El patrón visual debe ser coherente para que el usuario navegue fluidamente entre ambos.

### Propuesta Revisada de Slides

```
blueprint-typed-prompting.md (ESPIRAL + CUBO)
├── PORTADA: TypedPrompting (data-z="500", scale=1.5)
├── LAYER 0: Diseño de Schema (TypeScript → JSON Schema)
│   ├── Centro: Historia
│   ├── +X: Técnico (MCPTypedPromptServer)
│   └── -X: Demo (TypedPromptsEditor UI)
├── LAYER 1: Validación (AJV/Zod)
│   ├── Centro: Flujo NL→JSON
│   ├── +X: 7 Tools MCP
│   └── -X: Caso de uso Teatro
├── LAYER 2: Catálogo (OpenAsyncAPI)
│   ├── Centro: Centralización
│   ├── +X: catalog.json
│   └── -X: Specs disponibles
└── INTEGRACIÓN: Con blueprint-logic-flow.md
    └── Link: "Después de validar → inferir con Prolog"
```

---

## Coordinación @scrum + @indice

### Para @indice: Verificación DRY

| Índice | Sección | Estado |
|--------|---------|--------|
| Funcional.md | §3.6 TypedPrompting | ✅ Ya existe |
| Funcional.md | §3.7 PrologEditor | ⚠️ Falta (solo Blockly→Prolog mencionado) |
| Tecnico.md | §9.1.1 Stack MCP TypedPrompt | ✅ Ya existe |
| Tecnico.md | §9.1.2 Stack MCP Prolog | ✅ Ya existe |

**Acción @indice**: Verificar que §3.7 PrologEditor exista en Funcional.md con las 12 tools.

### Para @scrum: Backlog Fase 2

---

## Backlog Propuesto: Fase 2

| ID | Story | Archivo | Cambio | Pts | Prioridad |
|----|-------|---------|--------|-----|-----------|
| DS-S07 | Actualizar grid MCP | blueprint-release-party.md | +TypedPrompt :3020, +Prolog :3006 en grids (líneas 296-318, 380-385) | 2 | 🔴 Alta |
| DS-S08 | Actualizar métricas | blueprint-mmco.md | 19→22 plugins, 31→33 agentes? (línea 220-222) | 1 | 🟡 Media |
| DS-S09 | Actualizar stack | blueprint-po.md | "5 servidores MCP" → "7 servidores MCP" (línea ~88) | 1 | 🟡 Media |
| DS-S10 | Crear blueprint | blueprint-typed-prompting.md | **NUEVO** showcase completo (patrón espiral+cubo) | 5 | 🔴 Alta |

**Total Fase 2**: 9 pts adicionales

### Detalle DS-S07 (release-party)

```html
<!-- Añadir en línea ~316 (grid de servers) -->
<div class="mcp-server">
  <span class="port">:3020</span>
  <span class="name">TypedPrompt</span>
</div>
<div class="mcp-server">
  <span class="port">:3006</span>
  <span class="name">Prolog</span>
</div>

<!-- Añadir en línea ~385 (grid visual) -->
<div class="mcp-server"><span class="port">📋</span><span class="name">TypedPrompt :3020</span></div>
<div class="mcp-server"><span class="port">🧠</span><span class="name">Prolog :3006</span></div>
```

### Detalle DS-S10 (nuevo blueprint)

**Archivo**: `docs/blueprint-typed-prompting.md`
**Líneas estimadas**: ~400 (similar a blueprint-logic-flow pero más corto)
**CSS**: Hereda de `_layouts/presentation.html`

---

## Preguntas para PO (@aleph)

1. **¿Apruebas el patrón ESPIRAL+CUBO para el nuevo blueprint?**
2. **¿Priorizar DS-S07 (release-party) antes que DS-S10 (nuevo)?** — Recomiendo sí, porque release-party es la demo principal.
3. **¿Incluir DS-S08/S09 (métricas) o dejarlos para backlog futuro?**

---

## Estado del Turno

| Campo | Valor |
|-------|-------|
| **Estado** | ✅ DONE |
| **Artefacto** | Backlog fase 2 (4 stories, 9 pts) |
| **Siguiente** | T015 @scrum (formalizar backlog) |
| **Coordinación** | @indice verificar §3.7 Funcional.md |
