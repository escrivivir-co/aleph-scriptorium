# Backlog: Blueprint Refinement para Release Party

> **Épica**: SCRIPT-1.32.0  
> **Padre**: RELEASE-1.0.0-beta.1  
> **Effort estimado**: 21 pts  
> **Estado**: 📋 Planificando  
> **Fecha**: 2026-01-01

---

## Contexto

La RELEASE_PARTY es una demo en 12 estadios (monomito) donde Clippy descubre el Scriptorium. Los blueprints son el corazón visual de la demo. Necesitamos:

1. **Pulir** lo existente (blueprint-po.md con Paso 7.5)
2. **Decidir** qué hacer con blueprint-copilot.md
3. **Actualizar** portada y panels para coherencia

---

## Análisis del Estado Actual

### ✅ Lo que ya tenemos

| Blueprint | Estado | Slides | Foco |
|-----------|--------|--------|------|
| `blueprint.md` | ✅ Completo | ~15 | UX: Taxonomía de agentes |
| `blueprint-mmco.md` | ✅ Completo | ~10 | Ontología: Niveles 0-4 |
| `blueprint-copilot.md` | ⚠️ Revisar | 12 | Flujo: Prompt → LLM (técnico) |
| `blueprint-po.md` | ✅ Recién refactorizado | 47 | Demo: 4 roles × 8 pasos + subcubos |
| `blueprint-logic-flow.md` | ✅ Completo | ~12 | Ciclo: Prolog → MCP → Teatro |

### 🔄 Lo que falta

| Necesidad | Prioridad | Decisión |
|-----------|-----------|----------|
| Revisar estética blueprint-po.md en web real | 🔴 Alta | Verificar, ajustar |
| blueprint-copilot.md: ¿multicapa o nuevo? | 🟡 Media | Ver propuesta abajo |
| Portada index.md actualizada | 🟡 Media | Añadir Self-Reflection |
| Panel Aleph (demo.md) coherente | 🟢 Baja | Verificar iframes |

---

## Propuesta: Qué hacer con blueprint-copilot.md

### Opción A: Multicapa (Extender)

**Pros**: Reutiliza lo existente, menos trabajo
**Contras**: Puede sobrecargar un blueprint ya denso

```
blueprint-copilot.md actual:
  Fase 0-6: Prompt → Registry → Agent → Instructions → Assembly → LLM → Output

+ Nueva capa Y=1600 (igual que Paso 7.5 en PO):
  "Self-Reflection Demo": Cómo el Scriptorium se observa usando estas herramientas
```

### Opción B: Nuevo Blueprint (Separar)

**Pros**: Foco claro, narrativa propia
**Contras**: Más trabajo, fragmentación

```
blueprint-reflection.md (NUEVO):
  Fase 1: El problema (amnesia de CopilotEngine)
  Fase 2: El diagnóstico (copilot-logs-mcp-server)
  Fase 3: La solución (Snapshots)
  Fase 4: El bucle (Auto-reflexión → Mejora)
  Fase 5: La terapia (Bridge debugging)
```

### **Recomendación: Opción A (Multicapa)**

Razones:
1. Ya tenemos Paso 7.5 en blueprint-po.md con la narrativa de Self-Reflection
2. blueprint-copilot.md es el contexto técnico perfecto para añadir una capa
3. La RELEASE_PARTY ya tiene estructura en obra.yaml que referencia el flujo Copilot
4. Coherencia: "El Viaje de tu Pregunta" + "Cómo el sistema se observa"

---

## Stories

| ID | Nombre | Effort | Prioridad | Descripción |
|----|--------|--------|-----------|-------------|
| S01 | Auditoría visual blueprint-po.md | 3 pts | 🔴 | Verificar render web, ajustar CSS |
| S02 | Añadir capa Self-Reflection a blueprint-copilot.md | 8 pts | 🟡 | Subcubo Y=700 con 4-5 slides |
| S03 | Actualizar index.md y demo.md | 3 pts | 🟡 | Coherencia con nuevos contenidos |
| S04 | Sincronizar obra.yaml con blueprints | 5 pts | 🟢 | Referencias cruzadas |
| S05 | Validación final Release Party | 2 pts | 🔴 | Test completo de la demo |

**Total**: 21 pts

---

## Tasks por Story

### S01: Auditoría visual blueprint-po.md (3 pts)

| Task | Descripción | Effort |
|------|-------------|--------|
| T001 | Servir Jekyll local y navegar todos los slides | 0.5 |
| T002 | Verificar depth-hint funcionando en Paso 5 y Paso 7 | 0.5 |
| T003 | Auditar estilos Paso 7.5 Self-Reflection (bug-insight, block-info, etc.) | 1 |
| T004 | Ajustar responsive si hay problemas | 0.5 |
| T005 | Verificar overview panorámico incluye nuevos slides | 0.5 |

**DoD**: Navegación fluida, estilos coherentes, sin errores visuales.

---

### S02: Añadir capa Self-Reflection a blueprint-copilot.md (8 pts)

**Concepto**: Añadir un subcubo después de "Output" (Fase 6) que muestre cómo el Scriptorium usa el flujo Copilot para auto-observarse.

| Task | Descripción | Effort |
|------|-------------|--------|
| T006 | Diseñar coordenadas del subcubo (X=12000, Y=700) | 1 |
| T007 | Crear slide intro "El sistema que se observa" | 1 |
| T008 | Crear slide "Logs MCP: Capturando el viaje" | 1.5 |
| T009 | Crear slide "Snapshots: Memoria persistente" | 1.5 |
| T010 | Crear slide "Métricas: healthScore, antipatrones" | 1.5 |
| T011 | Crear slide "El bucle completo" (cierre) | 1 |
| T012 | Añadir CSS si faltan estilos | 0.5 |

**Estructura de coordenadas**:
```
Slide actual Output:     data-x="12000" data-y="0"
                              ↓ depth-hint
Nuevo subcubo:
  reflection-intro:      data-x="12000" data-y="700"
  reflection-logs:       data-x="13200" data-y="700"
  reflection-snapshots:  data-x="14400" data-y="700"
  reflection-metrics:    data-x="15600" data-y="700"
  reflection-loop:       data-x="16800" data-y="700"
```

**DoD**: 5 slides navegables, coherentes con estética copilot-step.

---

### S03: Actualizar index.md y demo.md (3 pts)

| Task | Descripción | Effort |
|------|-------------|--------|
| T013 | Añadir nav-card para Auto-Reflexión en index.md | 0.5 |
| T014 | Verificar orden de cards en portada (featured primero) | 0.5 |
| T015 | Actualizar demo.md con iframe del subcubo si aplica | 1 |
| T016 | Verificar links cruzados entre blueprints | 0.5 |
| T017 | Actualizar "Contribuir" con mención a MCP Snapshots | 0.5 |

**DoD**: Portada coherente, navegación sin links rotos.

---

### S04: Sincronizar obra.yaml con blueprints (5 pts)

| Task | Descripción | Effort |
|------|-------------|--------|
| T018 | Mapear estadios de obra.yaml a slides de blueprint-po.md | 1.5 |
| T019 | Verificar referencias `slide_principal` en obra.yaml | 1 |
| T020 | Añadir estadio para Self-Reflection en obra.yaml | 1 |
| T021 | Documentar correspondencias en carta-equipo-blueprint.md | 1 |
| T022 | Validar que demos interactivos (urls) funcionan | 0.5 |

**DoD**: obra.yaml y blueprints sincronizados, referencias correctas.

---

### S05: Validación final Release Party (2 pts)

| Task | Descripción | Effort |
|------|-------------|--------|
| T023 | Run all demo servers (`alephscript.demo.runAll`) | 0.5 |
| T024 | Navegar secuencia completa de la demo | 0.5 |
| T025 | Verificar que iframes cargan correctamente | 0.5 |
| T026 | Documentar cualquier issue encontrado | 0.5 |

**DoD**: Demo funciona end-to-end sin errores.

---

## Decisiones Pendientes (para discutir)

### D1: ¿Multicapa en blueprint-copilot.md o nuevo blueprint?

**Propuesta**: Multicapa (Opción A)
- Añadir subcubo Y=700 después de "Output"
- Mantener coherencia con patrón de blueprint-po.md

### D2: ¿Actualizar obra.yaml con nuevo estadio?

**Propuesta**: Sí
- Añadir estadio 7.5 "El sistema que se observa" entre cap. 7 y 8
- Referencia cruzada a blueprint-copilot.md subcubo

### D3: ¿Prioridad de portada vs. blueprints?

**Propuesta**: Blueprints primero (S01, S02), portada después (S03)
- La demo se navega principalmente por blueprints
- La portada es solo punto de entrada

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| FEATURE-SNAPSHOTS-1.0.0 | ✅ Completado | Sistema de snapshots funcional |
| SCRIPT-1.29.0 | ✅ Completado | Protocolo auto-reflexión |
| Jekyll local | ✅ Funcional | `./scripts/serve-site.sh` |
| Demo servers | ⚠️ Verificar | Necesita `Run All` |

---

## Riesgos

| Riesgo | Probabilidad | Mitigación |
|--------|--------------|------------|
| CSS de Paso 7.5 no renderiza bien | Media | T003 auditoría temprana |
| obra.yaml desincronizado | Baja | T018-T019 verificación |
| Demo servers caídos | Baja | T023 verificación |

---

## Criterios de Éxito

1. **Profesional**: Estética coherente, sin errores visuales
2. **Efectista**: Navegación fluida, "wow factor" en transiciones 3D
3. **Útil**: Cada slide aporta valor narrativo a la demo
4. **Coherente**: Todas las piezas conectadas (blueprints ↔ obra.yaml ↔ portada)

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-01-01 | Crear backlog borrador | @scrum |

