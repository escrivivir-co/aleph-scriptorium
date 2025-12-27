# Épica Archivada: SCRIPT-1.4.0 — Sistema de Avatares para Personajes

> **Estado**: ✅ Completada (100%)  
> **Sprint**: 1 (Feature Cycle 1)  
> **Fecha archivo**: 2025-01-03  
> **Tasks completadas**: 9/9

---

## Objetivo

Estandarizar la gestión de avatares para personajes creados en AGENT_CREATOR, integrando con ARG_BOARD y Teatro.

---

## Estructura Estándar

```
ARCHIVO/DISCO/TALLER/ELENCO/{personaje}/
├── {personaje}.agent.md    # Definición del personaje
└── avatar.png              # Imagen del personaje (256x256 recomendado)
```

## Campos Añadidos

| Archivo | Campo | Ejemplo |
|---------|-------|---------|
| `*.agent.md` (frontmatter) | `avatar:` | `"ARCHIVO/DISCO/TALLER/ELENCO/nonsi/avatar.png"` |
| `*.recipe.json` | `"avatar":` | `"ARCHIVO/DISCO/TALLER/ELENCO/nonsi/avatar.png"` |
| `actores.json` | `"avatar":` | `"ARCHIVO/DISCO/TALLER/ELENCO/tarotista/avatar.png"` |

---

## Stories Completadas

### S01 — Definir Estándar de Avatares ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T001 | Definir estructura de carpeta ELENCO/{personaje}/ | ✅ |
| T002 | Añadir campo `avatar` al frontmatter de agentes | ✅ |
| T003 | Añadir campo `avatar` al schema de recipes | ✅ |
| T004 | Añadir campo `avatar` al schema de actores.json | ✅ |

### S02 — Implementar en Personajes Existentes ✅

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T005 | Añadir avatar a personaje Tarotista | ✅ |
| T006 | Añadir avatar a personaje NonsiAuditor | ✅ |
| T007 | Actualizar actores.json con avatares | ✅ |
| T008 | Actualizar recetas con campo avatar | ✅ |
| T009 | Registrar NonsiAuditor en creation-log.json | ✅ |

---

## Personajes con Avatar

| Personaje | Avatar | Ubicación |
|-----------|--------|-----------|
| Tarotista | ✅ | `ARCHIVO/DISCO/TALLER/ELENCO/tarotista/avatar.png` |
| NonsiAuditor | ✅ | `ARCHIVO/DISCO/TALLER/ELENCO/nonsi/avatar.png` |

---

## Changelog

| Fecha | Cambio |
|-------|--------|
| 2025-12-23 | Añadir épica |
| 2025-12-23 | Implementar S01-S02 |
| 2025-01-03 | **Archivar** — 100% completada |
