# Épica Archivada: SCRIPT-1.12.0 — Protocolo de Submódulos

> **Estado**: ✅ Completada (100%)  
> **Sprint**: 1 (Feature Cycle 1)  
> **Fecha archivo**: 2025-01-03

---

## Objetivo

Estandarizar el proceso de inspección e integración de submódulos, definiendo un set común de backlog items para garantizar consistencia y calidad en la incorporación de código externo.

---

## Checklist de Inspección

Para cada nuevo submódulo, se deben generar las siguientes tareas de inspección:

1. **Análisis de Arquitectura**: Identificar patrones (MVC, Hexagonal, etc.), lenguajes y frameworks.
2. **Inventario de Recursos**: Listar agentes, prompts, instrucciones y herramientas existentes.
3. **Análisis de Dependencias**: Identificar librerías externas, requisitos de sistema y conflictos potenciales.
4. **Puntos de Integración**: Detectar APIs, webhooks, esquemas de datos y puntos de extensión.
5. **Mapeo Ontológico**: Alinear conceptos del submódulo con la taxonomía del Scriptorium (UI, Backend, Sistema).
6. **Evaluación de Calidad**: Revisar cobertura de tests, linter rules y documentación.

---

## Tasks Completadas

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T001 | Documentar checklist en `submodulo-integracion.instructions.md` | ✅ |
| T002 | Crear plantilla de issue/ticket para inspección | ✅ |

---

## Entregables

| Tipo | Archivo |
|------|---------|
| Instrucciones | `.github/instructions/submodulo-integracion.instructions.md` |
| Prompt | `.github/prompts/as_instalar_submodulo.prompt.md` |

---

## Changelog

| Fecha | Cambio |
|-------|--------|
| 2025-12-24 | Añadir épica |
| 2025-12-24 | Documentar checklist |
| 2025-01-03 | **Archivar** — 100% completada |
