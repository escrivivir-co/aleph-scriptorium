# Épica Archivada: SCRIPT-1.15.0 — Optimización de Settings para Plugins

> **Estado**: ✅ Completada (100%)  
> **Sprint**: 1 (Feature Cycle 1)  
> **Fecha archivo**: 2025-01-03  
> **Tasks completadas**: 28/28

---

## Objetivo

Mejorar el protocolo de PLUGINS.md para que los plugins se instalen desactivados por defecto en `.vscode/settings.json`, evitando sobrecarga del sistema. Incluir FAQ, comandos de activación/desactivación y sistema de avisos por umbrales.

---

## Distinción registry vs settings

| Archivo | Campo | Controla |
|---------|-------|----------|
| `registry.json` | `enabled` | Si el plugin está **funcional** |
| `settings.json` | `true/false` | Si los prompts son **visibles** en Chat |

---

## Umbrales de Plugins Activos

| Plugins Activos | Estado | Mensaje |
|-----------------|--------|---------|
| 0-3 | 🟢 Óptimo | Sin aviso |
| 4-6 | 🟡 Aceptable | Considera desactivar los no usados |
| 7-10 | 🟠 Cargado | Puede afectar velocidad |
| 11+ | 🔴 Sobrecargado | Recomendado desactivar |

---

## Stories Completadas

### S01 — Instalación por Defecto con false ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T001 | Modificar as_plugin-install.prompt.md | ✅ |
| T002 | Añadir mensaje post-instalación | ✅ |
| T003 | Actualizar plugin-manager.agent.md | ✅ |
| T004 | Actualizar PLUGINS.md sección 2.3 | ✅ |

### S02 — FAQ de Resolución de Problemas ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T005 | Crear sección FAQ en plugin-manager | ✅ |
| T006-T010 | 5 FAQs documentadas | ✅ |

### S03 — Handoffs de Activación/Desactivación ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T011-T016 | Handoffs activar/desactivar/status | ✅ |

### S04 — Sistema de Avisos por Umbrales ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T017-T021 | Umbrales y mensajes | ✅ |

### S05 — Comando Status ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T022-T024 | Handoff y formato de status | ✅ |

### S06 — Documentación y Publicación ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T025-T028 | Documentación final | ✅ |

---

## Entregables

| Tipo | Archivo |
|------|---------|
| Prompt | `as_plugin-install.prompt.md` (modificado) |
| Agente | `plugin-manager.agent.md` (FAQ + handoffs) |
| Docs | `PLUGINS.md` sección 2.3 |

---

## Changelog

| Fecha | Cambio |
|-------|--------|
| 2025-01-02 | Crear y completar épica |
| 2025-01-03 | **Archivar** — 100% completada |
