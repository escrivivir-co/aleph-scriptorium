# Backlog Borrador: SCRIPT-1.28.0 — Blueprint MMCO Enhancement

> **Sprint**: FC2 (actual)
> **Feature Cycle**: 2
> **Estado**: 📝 Borrador (pendiente aprobación)
> **Effort total**: 3 puntos
> **Prioridad**: P0 (Crítico — bloquea presentación Talaia/Flove)

---

## Contexto

El Blueprint MMCO (SCRIPT-1.27.0) tiene problemas críticos de navegación:

| Problema | Causa | Impacto |
|----------|-------|---------|
| Diapositivas superpuestas | Todas en (X=0, Y=0), solo varía Z | Ilegible |
| Vista panorámica rota | Todas apiladas en mismo punto | Imposible navegar |
| Flechas no funcionan correctamente | Saltos entre slides superpuestos | UX roto |

**Evidencia**: Screenshots en `.playwright-mcp/`:
- `blueprint-mmco-bnp.png` — Superposición visible
- `blueprint-mmco-overview.png` — Vista panorámica ilegible

---

## Épica

| ID | Nombre | Opportunity | Effort | Prioridad |
|----|--------|-------------|--------|-----------|
| SCRIPT-1.28.0 | Blueprint MMCO Enhancement | Scriptorium | 3 pts | P0 |

---

## Story

### SCRIPT-1.28.0-S01: Refactorizar coordenadas para navegación funcional

**Objetivo**: Las 8 diapositivas deben ser navegables sin superposición, manteniendo la narrativa MMCO.

**Effort**: 3 pts

**Arquitectura propuesta** (Layout Lineal Vertical):

```
                    overview (y=0, z=3000, scale=6)
                         ↑
            matter (y=3500) ← Nivel 4
                         ↑
         spacetime (y=2500) ← Nivel 3
                         ↑
             time (y=1500) ← Nivel 2
                         ↑
          geometry (y=500) ← Nivel 1 (centro visual)
                         ↑
           tensors (y=-500) ← Nivel 0a
                         ↑
      correlations (y=-1500) ← Nivel 0b
                         ↑
               bnp (y=-2500, z=-500) ← Nivel 0c (base)
```

**Nuevo mapeo de coordenadas**:

| Slide ID | Nivel MMCO | Antes (x,y,z) | Después (x,y,z) | scale |
|----------|------------|---------------|-----------------|-------|
| bnp | 0c | 0, 0, -3000 | 0, -2500, -500 | 2 → 1.5 |
| correlations | 0b | 0, 0, -2000 | 0, -1500, 0 | 1 |
| tensors | 0a | 0, 0, -1000 | 0, -500, 0 | 1 |
| geometry | 1 | 0, 0, 0 | 0, 500, 0 | 1 |
| time | 2 | 0, 0, 1000 | 0, 1500, 0 | 1 |
| spacetime | 3 | 0, 0, 2000 | 0, 2500, 0 | 1 |
| matter | 4 | 0, 0, 3000 | 0, 3500, 0 | 1.5 → 1.2 |
| overview-mmco | — | 0, 0, 0 | 0, 500, 3000 | 6 |

---

## Tasks

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T001 | Actualizar coordenadas de las 8 diapositivas en `blueprint-mmco.md` | 1 pt | ⏳ |
| T002 | Verificar navegación local con Jekyll (serve-site.sh + Playwright) | 0.5 pt | ⏳ |
| T003 | Ajustar CSS si es necesario (reducir `width` de slides si overflow) | 0.5 pt | ⏳ |
| T004 | Tomar screenshots de validación post-fix | 0.5 pt | ⏳ |
| T005 | Commit con mensaje conforme a DEVOPS.md | 0.5 pt | ⏳ |

---

## Definition of Done

- [ ] Las 8 diapositivas son visibles sin superposición
- [ ] Navegación con flechas (← →) funciona correctamente
- [ ] Tecla O muestra vista panorámica legible
- [ ] Contenido MMCO (textos, principios) sin cambios
- [ ] Screenshots de validación tomados
- [ ] Commit en rama correcta según workspace-config.json

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| SCRIPT-1.27.0 | ✅ Completado | Blueprint MMCO creado (con bug) |
| Jekyll/serve-site.sh | ✅ Funcional | Servidor local operativo |
| MCP Playwright | ✅ Disponible | Para validación |

---

## Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| CSS incompatible | Media | Medio | Reusar estilos del blueprint UX |
| Layout no intuitivo | Baja | Bajo | Mantener orden ascendente 0c→4 |

---

## Pendiente aprobación

Usuario debe revisar y aprobar con:

```
@scrum aprobar SCRIPT-1.28.0
```

O solicitar implementación directa:

```
Implementar SCRIPT-1.28.0 directamente
```

