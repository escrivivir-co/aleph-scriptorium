# Decisión PO: Refactorizar FC1

> **Fecha**: 2025-12-29  
> **Decisión**: Refactorizar (Opción B)  
> **Origen**: Impedimentos técnicos reportados por @indice ([05_Refinamiento](05_Refinamiento_Agente_Indice.md))

---

## Resumen Ejecutivo

**Antes**: "TypedPrompting Context Manager" (15 pts, filtrado dinámico)  
**Después**: "Context Packs Manual" (8 pts, packs estáticos)

**Razón**: CopilotEngine no expone hook de filtrado dinámico. El WISH-01 ya está documentado para upstream.

---

## Backlog Refactorizado

| # | Épica | Nombre Original | Nombre Nuevo | Effort |
|---|-------|-----------------|--------------|--------|
| 1 | SCRIPT-2.1.0 | Context Manager Core | **Mapeo Dominio→Instrucciones** | 3 pts |
| 2 | SCRIPT-2.3.0 | Context Packs System | **Context Packs Estáticos** | 2 pts |
| 3 | SCRIPT-2.2.4 | MCP Integration | **MCP Presets Básico** | 3 pts |
| — | SCRIPT-2.5.0 | Dynamic Tool Filtering | **ELIMINADO** (depende de WISH-01) | — |

**Total FC1**: 8 pts (antes: 15 pts, reducción 47%)

---

## Cambios por Épica

### SCRIPT-2.1.0: Mapeo Dominio→Instrucciones (3 pts)

**Eliminado**:
- ~~Hook en conversación~~ (no existe API)
- ~~@indice.resolverFoco() como handoff dinámico~~ (no hay donde hookearlo)

**Conservado**:
| Story | Descripción | Effort |
|-------|-------------|--------|
| S01 | Documentar mapeo en Funcional.md | 1 pt |
| S02 | Crear 4 archivos pack JSON | 1 pt |
| S03 | Script `activate-pack.sh` | 1 pt |

**Criterio de Aceptación Revisado**:
- [ ] Tabla dominio→instrucciones en Funcional.md
- [ ] 4 packs: `blueprint.json`, `teatro.json`, `scrum.json`, `full.json`
- [ ] Script funcional con feedback al usuario

### SCRIPT-2.3.0: Context Packs Estáticos (2 pts)

**Eliminado**:
- ~~contextTriggers en manifest~~ (sin resolución dinámica no tiene sentido)
- ~~context-packs.json agregado~~ (simplificamos a archivos individuales)

**Conservado**:
| Story | Descripción | Effort |
|-------|-------------|--------|
| S01 | Estructura `.github/context-packs/` | 1 pt |
| S02 | Documentar en Tecnico.md | 1 pt |

### SCRIPT-2.2.4: MCP Presets Básico (3 pts)

**Sin cambios mayores** — Mantiene valor independiente del filtrado dinámico.

---

## Impedimento Documentado

### WISH-01: Hook de Filtrado Dinámico

**Ubicación**: [CopilotEngine/README-SCRIPTORIUM.md#WISH-01](../../../../CopilotEngine/README-SCRIPTORIUM.md#wish-01-hook-de-filtrado-dinámico-de-instrucciones)

**Estado**: Documentado, pendiente de upstream consideration.

**Condición de reactivación**: Si VS Code/Copilot expone API de filtrado, crear nueva épica SCRIPT-2.6.0 para aprovecharla.

---

## Métricas Revisadas

| Métrica | Antes | Después (con pack activo) |
|---------|-------|---------------------------|
| Tokens por request | 127K | ~30K |
| Instructions cargadas | 19 | 2-4 |
| Reducción | — | 75% |
| Automático | ❌ | ❌ (manual) |

---

## Entregables Revisados

| # | Entregable | Épica | Ubicación |
|---|------------|-------|-----------|
| 1 | Mapeo dominio→instrucciones | 2.1.0 | Funcional.md |
| 2 | blueprint.json | 2.1.0 | .github/context-packs/ |
| 3 | teatro.json | 2.1.0 | .github/context-packs/ |
| 4 | scrum.json | 2.1.0 | .github/context-packs/ |
| 5 | full.json | 2.1.0 | .github/context-packs/ |
| 6 | activate-pack.sh | 2.1.0 | scripts/ |
| 7 | Documentación packs | 2.3.0 | Tecnico.md |
| 8 | devops-tools.preset.json | 2.2.4 | mcp-presets/presets/ |

---

## DoD Revisado

- [ ] 3 épicas cerradas
- [ ] 8 entregables en ubicaciones canónicas
- [ ] Tokens por request <40K **con pack blueprint activo**
- [ ] Commits conformes a DEVOPS.md

---

## Siguiente Paso

1. **PO aprueba** este documento
2. **SM actualiza** `01_backlog-borrador.md` con scope reducido
3. **Equipo ejecuta** en FC1 con 8 pts (vs 15 original)

---

*Decisión documentada por @ox — 2025-12-29*
