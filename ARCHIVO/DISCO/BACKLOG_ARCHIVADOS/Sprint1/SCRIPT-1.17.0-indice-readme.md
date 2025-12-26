# Épica Archivada: SCRIPT-1.17.0 — Índice README y Vinculación @indice

> **Estado**: ✅ Completada (100%)  
> **Sprint**: 1 (Feature Cycle 1)  
> **Fecha archivo**: 2025-01-03  
> **Tasks completadas**: 12/12

---

## Objetivo

Crear un índice estructural del README.md que permita orquestar refactorizaciones, vincular con el agente @indice y generar warnings en commits cuando cambios en el codebase deberían reflejarse en el README.

---

## Stories Completadas

### S01 — Creación del Índice README ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T001 | Crear `ARCHIVO/DISCO/README/index.md` | ✅ |
| T002 | Documentar 12 secciones del README | ✅ |
| T003 | Mapear fuentes de verdad | ✅ |
| T004 | Documentar operaciones de refactorización | ✅ |

### S02 — Vinculación con @indice ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T005 | Añadir handoff "Consultar índice README" | ✅ |
| T006 | Añadir handoff "Actualizar índice README" | ✅ |

### S03 — Warning en Commit-Message ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T007 | Añadir Paso 2.7 en as_commit-message.prompt | ✅ |
| T008 | Definir criterios de warning | ✅ |
| T009 | Documentar formato del warning | ✅ |
| T010 | Añadir sugerencia de actualización | ✅ |

### S04 — Documentación y Publicación ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T011 | Añadir referencia cruzada en §8 | ✅ |
| T012 | Publicar épica | ✅ |

---

## Criterios de Warning

| Archivo modificado | Sección README afectada |
|--------------------|-------------------------|
| `registry.json` (nuevo plugin) | Plugins, contadores |
| `.gitmodules` (nuevo submódulo) | Submódulos, contadores |
| `.github/agents/*.agent.md` | Agentes, contadores |
| `package.json` (versión) | Badges, Estado |
| `workspace-config.json` | Estado |

---

## Entregables

| Tipo | Archivo |
|------|---------|
| Índice | `ARCHIVO/DISCO/README/index.md` |
| Agente | `indice.agent.md` (handoffs README) |
| Prompt | `as_commit-message.prompt.md` (Paso 2.7) |

---

## Changelog

| Fecha | Cambio |
|-------|--------|
| 2025-12-24 | Crear y completar épica |
| 2025-01-03 | **Archivar** — 100% completada |
