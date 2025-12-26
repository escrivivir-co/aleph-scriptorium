# Épica Archivada: SCRIPT-1.14.0 — Agente Índice (@indice)

> **Estado**: ✅ Completada (100%)  
> **Sprint**: 1 (Feature Cycle 1)  
> **Fecha archivo**: 2025-01-03  
> **Tasks completadas**: 24/24

---

## Objetivo

Crear un agente `@indice` integrado en `.github/agents/` que sirva como "portero" del proyecto, consultado antes de cada intervención para determinar qué leer. Gemelo funcional del personaje Lucas.

---

## Arquitectura

```
.github/
├── agents/
│   └── indice.agent.md          # Agente principal
├── prompts/
│   ├── indice-consultar.prompt.md
│   ├── indice-actualizar.prompt.md
│   └── indice-validar.prompt.md
└── instructions/
    └── indice-dry.instructions.md
```

---

## Stories Completadas

### S01 — Agente Índice Base ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T001 | Crear `.github/agents/indice.agent.md` | ✅ |
| T002 | Definir 8 handoffs | ✅ |
| T003 | Documentar relación gemelo con Lucas | ✅ |
| T004 | Definir 5 tests de coherencia | ✅ |
| T005 | Añadir sección "Flujo de consulta" | ✅ |
| T006 | Añadir sección "Contrato DRY" | ✅ |

### S02 — Instrucciones DRY ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T007 | Crear `indice-dry.instructions.md` | ✅ |
| T008 | Documentar estructura de Funcional.md | ✅ |
| T009 | Documentar estructura de Tecnico.md | ✅ |
| T010 | Definir reglas de actualización | ✅ |
| T011 | Definir applyTo | ✅ |

### S03 — Prompts del Índice ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T012 | Crear `indice-consultar.prompt.md` | ✅ |
| T013 | Crear `indice-actualizar.prompt.md` | ✅ |
| T014 | Crear `indice-validar.prompt.md` | ✅ |
| T015 | Documentar ejemplos de uso | ✅ |

### S04 — Integración con Sistema ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T016 | Añadir handoff @indice en aleph.agent.md | ✅ |
| T017 | Actualizar ox.agent.md con @indice | ✅ |
| T018 | Actualizar copilot-instructions.md | ✅ |
| T019 | Documentar en Tecnico.md | ✅ |

### S05 — Integración Pre-Commit ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T020 | Añadir sección §8 en copilot-instructions.md | ✅ |
| T021 | Modificar as_commit-message.prompt.md: Paso 2.5 | ✅ |
| T022 | Implementar lógica de warning no bloqueante | ✅ |
| T023 | Definir formato de warning | ✅ |
| T024 | Documentar flujo en instrucciones | ✅ |

---

## Entregables

| Tipo | Archivo |
|------|---------|
| Agente | `.github/agents/indice.agent.md` |
| Instrucciones | `.github/instructions/indice-dry.instructions.md` |
| Prompt | `indice-consultar.prompt.md` |
| Prompt | `indice-actualizar.prompt.md` |
| Prompt | `indice-validar.prompt.md` |

---

## Changelog

| Fecha | Cambio |
|-------|--------|
| 2025-12-24 | Crear conversación PO-SM |
| 2025-12-24 | Generar backlog borrador |
| 2025-01-01 | Implementar S01-S05 |
| 2025-01-03 | **Archivar** — 100% completada |
