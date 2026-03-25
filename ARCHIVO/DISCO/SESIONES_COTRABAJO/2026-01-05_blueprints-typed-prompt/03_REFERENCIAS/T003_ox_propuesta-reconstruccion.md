# Acta T003: Propuesta de Reconstrucción del Histórico

## Metadatos

| Campo | Valor |
|-------|-------|
| **Turno** | T003 |
| **Agente** | @ox (Meta-coordinador) |
| **Rol** | Facilitador → Propuesta a PO |
| **Inicio** | 2026-01-05 15:00 |
| **Fin** | 2026-01-05 15:15 |
| **Estado** | ✅ DONE |

---

## 🐂 Mensaje para @aleph (PO)

### Problema Detectado

Al revisar la carpeta `docs/`, he identificado que el scope de la sesión está **incompleto**:

#### Blueprints Existentes en docs/ (6)

| Blueprint | Incluido en T001? | Estado |
|-----------|-------------------|--------|
| `blueprint.md` | ✅ Sí | Pendiente edición |
| `blueprint-copilot.md` | ✅ Sí | Pendiente edición |
| `blueprint-logic-flow.md` | ✅ Sí | Pendiente edición |
| `blueprint-mmco.md` | ❌ **NO** | ⚠️ Gap |
| `blueprint-po.md` | ❌ **NO** | ⚠️ Gap |
| `blueprint-release-party.md` | ❌ **NO** | ⚠️ Gap |

#### Otros Archivos Clave en docs/ (12)

| Archivo | Incluido en T001? | Necesita actualización? |
|---------|-------------------|------------------------|
| `ecosistema.md` | ✅ Sí | Sí (promocionar plugins) |
| `demo.md` | ✅ Sí | Sí (nuevas cards) |
| `roadmap.md` | ✅ Sí | Sí (épicas FC1) |
| `index.md` | ❌ NO | 🔍 Revisar |
| `acerca.md` | ❌ NO | 🔍 Revisar |
| `agentes.md` | ❌ NO | 🔍 Revisar |
| `archivo.md` | ❌ NO | 🔍 Revisar |
| `fundacion.md` | ❌ NO | 🔍 Revisar |
| `leeme.md` | ❌ NO | 🔍 Revisar |
| `periodico.md` | ❌ NO | 🔍 Revisar |
| `teatro.md` | ❌ NO | 🔍 Revisar |
| `teatro-mvp-limitations.md` | ❌ NO | 🔍 Revisar |

#### Blueprint FALTANTE (a crear)

| Blueprint | Propósito |
|-----------|-----------|
| `blueprint-typed-prompting.md` | **NUEVO** — Documentar TypedPrompting + catálogo OpenAsyncAPI |

---

### Propuesta: Reconstruir el Histórico

Para que los agentes procesen correctamente el scope completo desde el inicio, propongo:

1. **Refactorizar T001** (@periodico) → Expandir a TODOS los blueprints + el nuevo
2. **Refactorizar T002** (@ox) → Mantener crítica metodológica pero ajustar stories
3. **Reiniciar sesión** → Los agentes verán el scope completo desde el principio

#### Nuevo Scope Propuesto

| Categoría | Archivos | Acción |
|-----------|----------|--------|
| **Blueprints a editar** | 6 existentes | Revisar todos para mencionar TypedPrompting/Prolog |
| **Blueprint a crear** | `blueprint-typed-prompting.md` | Nuevo documento |
| **Páginas a actualizar** | ecosistema, demo, roadmap | Promoción de features |
| **Páginas a revisar** | index, acerca, agentes, archivo, etc. | Verificar coherencia |
| **Índices DRY** | Funcional.md, Tecnico.md | Actualizar antes de docs/ |

---

### Tabla Completa de Cambios (Visión Ejecutiva)

| # | Archivo | Tipo | Cambio Principal | Prioridad |
|---|---------|------|------------------|-----------|
| 1 | `Funcional.md` | Índice | +§3.6 TypedPrompting +§3.7 PrologEditor | 🔴 Crítica |
| 2 | `Tecnico.md` | Índice | +Stacks MCP (3006, 3019, 3020, 5001, 8000) | 🔴 Crítica |
| 3 | `blueprint-typed-prompting.md` | **NUEVO** | TypedPrompting + OpenAsyncAPI catalog | 🔴 Alta |
| 4 | `ecosistema.md` | Editar | Mover 3 plugins a "Operativos" | 🔴 Alta |
| 5 | `demo.md` | Editar | +Sección "Editores Lógicos" (2 cards) | 🔴 Alta |
| 6 | `blueprint.md` | Editar | +Capa "Validación de Schemas" | 🟡 Media |
| 7 | `blueprint-logic-flow.md` | Editar | +MCP servers en diagrama IOT-SBR | 🟡 Media |
| 8 | `blueprint-copilot.md` | Editar | +2 servidores MCP en tabla | 🟡 Media |
| 9 | `blueprint-mmco.md` | Revisar | ¿Menciona TypedPrompting? | 🟡 Media |
| 10 | `blueprint-po.md` | Revisar | ¿Épicas TypedPrompting/Prolog? | 🟡 Media |
| 11 | `blueprint-release-party.md` | Revisar | ¿Demo screens actualizados? | 🟡 Media |
| 12 | `roadmap.md` | Editar | +Épicas cerradas FC1 | 🟡 Media |
| 13 | `index.md` | Revisar | ¿Landing menciona editores? | 🟢 Baja |
| 14 | `agentes.md` | Revisar | ¿Lista actualizada? | 🟢 Baja |
| 15 | `acerca.md` | Revisar | ¿Descripción actualizada? | 🟢 Baja |

---

### Contenido del Nuevo Blueprint

#### `docs/blueprint-typed-prompting.md`

**Estructura propuesta**:

```markdown
---
layout: presentation
title: Blueprint TypedPrompting
description: "Validación de conversaciones NL↔JSON + Catálogo de Specs"
permalink: /blueprint-typed-prompting/
---

# Blueprint: TypedPrompting + OpenAsyncAPI

## SLIDE 1: Problema
- Las conversaciones LLM no tienen contrato de estructura
- Los schemas viven dispersos sin catálogo central

## SLIDE 2: Solución  
- MCPTypedPromptServer (3020) → Validación de mensajes
- TypedPromptsEditor (3019) → UI de gestión
- OpenAsyncApiEditor → Catálogo centralizado

## SLIDE 3: Stack Técnico
- 7 tools MCP
- 3 prompts
- 2 resources
- OpenAPI spec (931 líneas)

## SLIDE 4: Integración
- Con PrologEditor (inferencia post-validación)
- Con Teatro (contratos de obras)
- Con Copilot Chat (via mcp.json)

## SLIDE 5: Casos de Uso
- Validar output de agente antes de procesar
- Generar schemas desde TypeScript
- Catalogar APIs del ecosistema
```

---

## Solicitud a @aleph

**@aleph**, como PO te solicito:

1. **Aprobar** la expansión del scope a TODOS los blueprints
2. **Aprobar** la creación del nuevo `blueprint-typed-prompting.md`
3. **Autorizar** la refactorización del histórico (T001, T002) para que:
   - @periodico vea el scope completo desde el inicio
   - Los agentes procesen la tarea correctamente al reiniciar

### Opción A: Refactorizar T001 + T002
Reescribo las actas existentes con el scope expandido.

### Opción B: Continuar con T004+
Mantengo el histórico y añado el scope adicional como nuevas stories.

**Recomendación @ox**: Opción A — refactorizar para claridad.

---

## Estado del Turno

| Campo | Valor |
|-------|-------|
| **Estado** | ✅ DONE |
| **Artefacto** | Propuesta de reconstrucción para PO |
| **Siguiente** | @aleph (decisión PO) |
| **Acción pendiente** | Aprobar scope expandido + autorizar refactorización |

