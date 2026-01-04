# Acta T001: Backlog de Refactorización de Blueprints

## Metadatos

| Campo | Valor |
|-------|-------|
| **Turno** | T001 |
| **Agente** | @periodico |
| **Rol** | Editor principal |
| **Inicio** | 2026-01-05 10:00 |
| **Fin** | — (en progreso) |
| **Estado** | ✍️ WRITING |

---

## Contexto Periodístico

### Los Hechos (5W)

| W | Contenido |
|---|-----------|
| **WHO** | TypedPromptEditor (stack 3019/3020) + OpenAsyncApiEditor (catálogo) |
| **WHAT** | Dos capacidades FC1 completadas necesitan visibilidad en docs/ |
| **WHERE** | 6 blueprints: blueprint.md, blueprint-logic-flow.md, demo.md, ecosistema.md, roadmap.md, blueprint-copilot.md |
| **WHEN** | Épicas cerradas 2026-01-04, promoción pendiente |
| **WHY** | Los editores están "invisibles" en la documentación pública. La demo FC1 los necesita posicionados. |

---

## Análisis por Bandera

### 🔵 Blueflag (Verdad)

**Hallazgo**: En [ecosistema.md](docs/ecosistema.md#L77) TypedPrompting aparece como "🚧 En Desarrollo":

```markdown
| Typed Prompting | `@plugin_ox_typedprompting` | Ontologías NL↔JSON |
```

**Realidad**: El stack está **operativo** (MCPTypedPromptServer 3020, Backend 3019, UI funcional).

**Acción**: Mover de "En Desarrollo" a "Operativos".

### 🔴 Redflag (Escala)

**Hallazgo**: [blueprint.md](docs/blueprint.md) tiene arquitectura de 4 capas pero no menciona:
- Validación de schemas (TypedPrompting)
- Catálogo de APIs (OpenAsyncApiEditor)

**Acción**: Añadir en capa "Recursos" referencia a MCP Gallery + TypedPrompting.

### 🟡 Yellowflag (Límites)

**Hallazgo**: [demo.md](docs/demo.md) muestra iframes pero NO incluye:
- TypedPromptsEditor (puerto 3019)
- PrologEditor (puerto 5001)

**Acción**: Añadir cards de demo para ambos editores.

---

## 📋 BACKLOG BORRADOR

### Épica: BLUEPRINTS-REFACTOR-1.0.0

**Objetivo**: Posicionar TypedPromptEditor y OpenAsyncApiEditor como ciudadanos de primera en docs/

**Effort total estimado**: 13 pts

---

### Story 1: Ecosistema.md — Promoción de Plugins

| Campo | Valor |
|-------|-------|
| **ID** | BP-S01 |
| **Prioridad** | 🔴 Alta |
| **Effort** | 2 pts |

**Descripción**: 
Como visitante de docs/, quiero ver TypedPrompting y PrologEditor en la sección "Operativos", para saber que puedo usarlos ahora.

**Tareas**:
- [ ] T01: Mover `Typed Prompting` de "En Desarrollo" a "Operativos" (L55-L65)
- [ ] T02: Mover `Prolog Editor` de "En Desarrollo" a "Operativos"
- [ ] T03: Añadir puertos y endpoints en la descripción (3019, 3020, 5001)

**Archivo afectado**: [docs/ecosistema.md](docs/ecosistema.md)

---

### Story 2: Blueprint.md — Arquitectura Completa

| Campo | Valor |
|-------|-------|
| **ID** | BP-S02 |
| **Prioridad** | 🔴 Alta |
| **Effort** | 3 pts |

**Descripción**:
Como arquitecto, quiero que el diagrama de capas incluya TypedPrompting y OpenAsyncApiEditor, para entender el flujo de validación.

**Tareas**:
- [ ] T04: En SLIDE 2 (core), añadir `TypedPrompting` en capa Recursos junto a "Prompts (typed)"
- [ ] T05: Añadir nueva slide SLIDE 3.5: "Validación de Schemas" entre Ontología y Plugins
- [ ] T06: Actualizar métricas (19→20 plugins si aplica)

**Archivo afectado**: [docs/blueprint.md](docs/blueprint.md)

---

### Story 3: Demo.md — Cards de Editores

| Campo | Valor |
|-------|-------|
| **ID** | BP-S03 |
| **Prioridad** | 🔴 Alta |
| **Effort** | 3 pts |

**Descripción**:
Como usuario de la demo, quiero ver iframes de TypedPromptsEditor y PrologEditor, para explorarlos sin salir de la galería.

**Tareas**:
- [ ] T07: Añadir iframe-card para TypedPromptsEditor (puerto 3019)
- [ ] T08: Añadir iframe-card para PrologEditor (puerto 5001)
- [ ] T09: Añadir status-badge con estado de puertos
- [ ] T10: Ordenar cards por categoría (Editores → Docs → Gestores)

**Archivo afectado**: [docs/demo.md](docs/demo.md)

---

### Story 4: Blueprint-Logic-Flow.md — Integración TypedPrompting

| Campo | Valor |
|-------|-------|
| **ID** | BP-S04 |
| **Prioridad** | 🟡 Media |
| **Effort** | 2 pts |

**Descripción**:
Como desarrollador de lógica, quiero ver cómo TypedPrompting valida las conversaciones del flujo IOT-SBR, para entender el ciclo completo.

**Tareas**:
- [ ] T11: En LAYER 2, añadir referencia a MCPTypedPromptServer como validador
- [ ] T12: Enlazar a OpenAPI spec para detalles técnicos

**Archivo afectado**: [docs/blueprint-logic-flow.md](docs/blueprint-logic-flow.md)

---

### Story 5: Roadmap.md — FC1 Completado

| Campo | Valor |
|-------|-------|
| **ID** | BP-S05 |
| **Prioridad** | 🟡 Media |
| **Effort** | 2 pts |

**Descripción**:
Como stakeholder, quiero ver que FC1 incluyó TypedPrompting y PrologEditor, para trackear el progreso.

**Tareas**:
- [ ] T13: Añadir TYPED-MCP-1.0.0 en épicas cerradas de FC1
- [ ] T14: Añadir PROLOG-UI-2.0.0 en épicas cerradas de FC1
- [ ] T15: Actualizar métricas de effort completado

**Archivo afectado**: [docs/roadmap.md](docs/roadmap.md)

---

### Story 6: Blueprint-Copilot.md — MCPTypedPromptServer

| Campo | Valor |
|-------|-------|
| **ID** | BP-S06 |
| **Prioridad** | 🟢 Baja |
| **Effort** | 1 pt |

**Descripción**:
Como usuario de Copilot, quiero saber que existe MCPTypedPromptServer, para invocar validación desde chat.

**Tareas**:
- [ ] T16: Mencionar MCPTypedPromptServer (puerto 3020) en sección de servidores MCP

**Archivo afectado**: [docs/blueprint-copilot.md](docs/blueprint-copilot.md)

---

## Resumen de Prioridades

| Prioridad | Stories | Effort |
|-----------|---------|--------|
| 🔴 Alta | BP-S01, BP-S02, BP-S03 | 8 pts |
| 🟡 Media | BP-S04, BP-S05 | 4 pts |
| 🟢 Baja | BP-S06 | 1 pt |
| **Total** | 6 stories | **13 pts** |

---

## Propuesta de Secuencia

```
1. BP-S01 (ecosistema) → Base factual correcta
2. BP-S03 (demo) → Showcase visual inmediato  
3. BP-S02 (blueprint) → Arquitectura actualizada
4. BP-S04 (logic-flow) → Integración técnica
5. BP-S05 (roadmap) → Tracking histórico
6. BP-S06 (copilot) → Detalle complementario
```

---

## Próximo Turno

**@lucas**: Diseño de contenido + showcase visual

**Entregables esperados de @lucas**:
1. Mockups de las cards para demo.md
2. Diagrama de arquitectura actualizado para blueprint.md
3. Screenshots de TypedPromptsEditor funcionando

---

## Estado del Turno

| Campo | Valor |
|-------|-------|
| **Estado** | ✅ DONE |
| **Artefacto producido** | Este backlog (6 stories, 16 tasks, 13 pts) |
| **Siguiente turno** | @lucas (diseño) |

