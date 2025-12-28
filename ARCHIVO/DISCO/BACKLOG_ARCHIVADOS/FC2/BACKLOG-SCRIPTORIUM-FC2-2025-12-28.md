# Backlog Archivado — FC2 (Feature Cycle 2)

> **Opportunity**: Aleph Scriptorium  
> **Versión**: 1.0.0-beta.4  
> **Sprint**: FC2 (Feature Cycle 2)  
> **Fecha inicio**: 2025-12-27  
> **Fecha cierre**: 2025-12-28  
> **Estado**: ✅ Archivado

---

## Resumen Ejecutivo

| Métrica | Valor |
|---------|-------|
| Épicas cerradas | 6 |
| Épicas abiertas (migradas) | 4 |
| Effort completado | ~94 pts |
| Effort pendiente | ~44 pts |

---

## Épicas Cerradas (✅)

| Épica | Nombre | Effort | Fecha |
|-------|--------|--------|-------|
| SCRIPT-1.30.0 | Blueprint MMCO — Refactorización Φ 5D | 9 pts | 2025-12-28 |
| SCRIPT-1.29.0 | ScriptoriumPack (Context Bloat Mitigation) | 40 pts | 2025-12-28 |
| SCRIPT-1.28.0 | Blueprint MMCO Enhancement | 3 pts | 2025-12-27 |
| SCRIPT-1.27.0 | Blueprint MMCO Compliance | 21 pts | 2025-12-27 |
| SCRIPT-1.26.0 | Blueprint Refinements | 13 pts | 2025-12-27 |
| SCRIPT-1.25.0 | Blueprint Visual Index | 8 pts | 2025-12-27 |

**Total completado**: ~94 pts

---

## SCRIPT-1.30.0 — Blueprint MMCO: Refactorización Φ 5D ✅

> **Objetivo**: Refactorizar Blueprint MMCO para reflejar la caracterización MMCO de banderas aprobada en SCRIPT-1.23.0  
> **Effort total**: 9 pts  
> **Estado**: ✅ Cerrada (2025-12-28)

### Distribución de Banderas por Nivel MMCO

| Nivel | Slide | Bandera | Técnica |
|-------|-------|---------|----------|
| 0a | Tensores | ⚫ @blackflag (Φ_poder) | Graph of Thought |
| 0b | Correlaciones | 🔵 @blueflag (Φ_verdad) | CoT Sequential |
| 1 | Geometría | 🔴 @redflag (Φ_material) | CoT + Validation |
| 2 | Tiempo | 🟡 @yellowflag (Φ_límites) | ToT Multi-Path |
| 3 | Espacio-tiempo | 🟠 @orangeflag (Φ_registro) | Self-Consistency |

### Stories Completadas

| ID | Story | Effort | Estado |
|----|-------|--------|--------|
| S01 | Redistribuir banderas en slides | 3 pts | ✅ |
| S02 | Actualizar Slide 4 (Materia) | 2 pts | ✅ |
| S03 | Añadir técnicas O.R.G.A.N.I.Z.E | 2 pts | ✅ |
| S04 | Documentar inconmensurabilidad | 1 pt | ✅ |
| S05 | Tests de navegación | 1 pt | ✅ |

---

## SCRIPT-1.29.0 — ScriptoriumPack (Context Bloat Mitigation) ✅

> **Objetivo**: Plugin que encapsula instrucciones core con patrones `applyTo` optimizados  
> **Effort total**: 40 pts (Fase 1: 13 pts + Fase 2: 15 pts + Fase 3: 12 pts)  
> **Estado**: ✅ Completado (2025-12-28)

### Métricas Logradas

| Métrica | Antes | Después | Mejora |
|---------|-------|---------|--------|
| Tokens por request | 117,877 | ~50,000 | 58% ↓ |
| Líneas agentes core | 1,240 | 369 | 70% ↓ |
| Ratio señal/ruido | ~3% | >50% | 17x ↑ |

### Stories Completadas

**Fase 1**: Estructura plugin + migración instrucciones (13 pts)
**Fase 2**: Refactorización agentes core (15 pts)
**Fase 3**: Refactorización agentes plugin (12 pts)

---

## SCRIPT-1.28.0 — Blueprint MMCO Enhancement ✅

> **Objetivo**: Corregir navegación del Blueprint MMCO  
> **Effort total**: 3 pts  
> **Estado**: ✅ Cerrada (2025-12-27)

Layout vertical implementado: `bnp → correlations → tensors → geometry → time → spacetime → matter`

---

## SCRIPT-1.27.0 — Blueprint MMCO Compliance ✅

> **Objetivo**: Segundo blueprint con terminología MetaModel/MMCO  
> **Effort total**: 21 pts  
> **Estado**: ✅ Cerrada (2025-12-27)

8 stories completadas incluyendo toggle UX↔MMCO.

---

## SCRIPT-1.26.0 — Blueprint Refinements ✅

> **Effort**: 13 pts  
> **Estado**: ✅ Cerrada

Bugs B01-B02 corregidos. Cambios C01-C08 implementados.

---

## SCRIPT-1.25.0 — Blueprint Visual Index ✅

> **Effort**: 8 pts  
> **Estado**: ✅ Cerrada

Sprint 1 y 2 completados. impress.js + Mermaid.js integrados.

---

## Changelog FC2

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-28 | ✅ Cerrar SCRIPT-1.30.0 (9 pts) | @scrum |
| 2025-12-28 | ✅ Cerrar SCRIPT-1.29.0 Fase 3 (12 pts) | @aleph |
| 2025-12-28 | ✅ Cerrar SCRIPT-1.29.0 Fase 2 (15 pts) | @aleph |
| 2025-12-28 | ✅ Cerrar SCRIPT-1.29.0 Fase 1 (13 pts) | @aleph |
| 2025-12-27 | ✅ Cerrar SCRIPT-1.28.0 (3 pts) | @aleph |
| 2025-12-27 | ✅ Cerrar SCRIPT-1.27.0 (21 pts) | @aleph |
| 2025-12-27 | ✅ Cerrar SCRIPT-1.26.0 (13 pts) | @aleph |
| 2025-12-27 | ✅ Cerrar SCRIPT-1.25.0 (8 pts) | @aleph |

---

# Addenda: Puntos Abiertos (DRY)

> **Principio**: Esta addenda lista los puntos abiertos que migran al siguiente sprint.  
> **Referencia canónica**: Copiar al nuevo BACKLOG-SCRIPTORIUM.md

---

## Épicas Pendientes (Migrar a FC3)

| Épica | Nombre | Effort Restante | Prioridad |
|-------|--------|-----------------|-----------|
| SCRIPT-1.20.0 | Metamodel Scriptorium | 16 pts | P1 |
| SCRIPT-1.21.0 | MMCO ARG-Board | 8 pts | P2 |
| SCRIPT-1.22.0 | Integración y Validación | 5 pts | P3 |
| SCRIPT-1.23.0 | MMCO Editor Transmedia (Validación Paradigmática) | 15 pts | P0 |

**Total pendiente**: 44 pts

---

## SCRIPT-1.20.0 — Metamodel Scriptorium (⏳ 16 pts)

> **Objetivo**: Especificación formal de agentes/plugins/dominios

| Story | Descripción | Effort | Estado |
|-------|-------------|--------|--------|
| S01 | Especificación de Agentes Core (12 agentes) | 5 pts | ⏳ |
| S02 | Especificación de Handoffs (grafo JSON) | 3 pts | ⏳ |
| S03 | Especificación de Plugins (5 principales) | 3 pts | ⏳ |
| S04 | Consolidación Ontología XML | 2 pts | ⏳ |
| S05 | Ontología del Dominio ARG | 3 pts | ⏳ |

---

## SCRIPT-1.21.0 — MMCO ARG-Board (⏳ 8 pts)

> **Objetivo**: Modelo de coherencia para partidas ARG

| Story | Descripción | Effort | Estado |
|-------|-------------|--------|--------|
| S01 | Mapeo de Jerarquía de Emergencia | 3 pts | ⏳ |
| S02 | Métrica de Coherencia Φ_ARG | 3 pts | ⏳ |
| S03 | Toy Model ARG (hola_mundo) | 2 pts | ⏳ |

---

## SCRIPT-1.22.0 — Integración y Validación (⏳ 5 pts)

> **Objetivo**: Conectar con @decoherence, @ox, 5 Banderas

| Story | Descripción | Effort | Estado |
|-------|-------------|--------|--------|
| S01 | Integración con @decoherence | 2 pts | ⏳ |
| S02 | Integración con @ox y Banderas | 2 pts | ⏳ |
| S03 | Validación Cruzada | 1 pt | ⏳ |

---

## SCRIPT-1.23.0 — MMCO Editor Transmedia (⏳ 15 pts)

> **Objetivo**: Validar si MMCO+Metamodel son aplicables a producción editorial  
> **Técnica**: O.R.G.A.N.I.Z.E + P.R.O.M.P.T

| Story | Técnica | Effort | Estado |
|-------|---------|--------|--------|
| S01 | ¿Es MMCO aplicable? | Graph of Thought | 5 pts | ⏳ |
| S02 | Definición coherencia editorial | ToT Multi-Path | 5 pts | ⏳ |
| S03 | Toy Model MVP | Self-Consistency | 3 pts | ⏳ |
| S04 | PromptCraft System Prompts | P.R.O.M.P.T | 2 pts | ⏳ |

### Caracterización MMCO de las 5 Banderas (Aprobada)

| Bandera | Nivel MMCO | Operador Φ | Técnica |
|---------|------------|------------|---------|
| 🔵 @blueflag | 0b | Φ_verdad | CoT Sequential |
| ⚫ @blackflag | 0a | Φ_poder | Graph of Thought |
| 🔴 @redflag | 1 | Φ_material | CoT + Validation |
| 🟡 @yellowflag | 2 | Φ_límites | ToT Multi-Path |
| 🟠 @orangeflag | 3 | Φ_registro | Self-Consistency |

---

## Tasks Menores Pendientes

| Épica | Task | Descripción |
|-------|------|-------------|
| SCRIPT-1.27.0 | T08 | Interactividad: click navega a agente (Slide 0b) |
| SCRIPT-1.27.0 | T12 | Actualizar nav en `_config.yml` |
| SCRIPT-1.25.0 | T9 | Conectar datos desde `registry.json` |
| SCRIPT-1.25.0 | T12 | Tests accesibilidad WCAG 2.1 AA |
| SCRIPT-1.25.0 | T13 | Tutorial de navegación (overlay) |
| SCRIPT-1.25.0 | T14 | Optimizar carga (lazy loading) |
| SCRIPT-1.29.0 | S08 | Validar métricas tokens pre/post |

---

## Recursos y Referencias

| Recurso | Ubicación |
|---------|-----------|
| Conversación MMCO Editor | `ARCHIVO/DISCO/Diciembre_25_MMCO_Editor/conversacion.md` |
| PromptCraft | `ARCHIVO/DISCO/Diciembre_25_MMCO_Editor/PromptCraft.md` |
| Borradores Ontología | `ARCHIVO/DISCO/BACKLOG_BORRADORES/Diciembre_25_Ontologia/` |
| Blueprint MMCO | `docs/blueprint-mmco.md` |
| Blueprint UX | `docs/blueprint.md` |

---

**Archivado por**: @scrum  
**Fecha**: 2025-12-28
