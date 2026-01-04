# Acta T015: @scrum — Formalización Backlog Fase 2

**Fecha**: 2026-01-05  
**Turno**: 15  
**Agente**: @scrum  
**Estado**: ✅ DONE

---

## Backlog Fase 2 (Formalizado)

### Aprobaciones PO Implícitas

| Pregunta @ox | Respuesta |
|--------------|-----------|
| Patrón ESPIRAL+CUBO | ✅ Aprobado (coherencia con logic-flow) |
| Priorizar DS-S07 antes de DS-S10 | ✅ Aprobado (release-party es demo principal) |
| Incluir DS-S08/S09 | ✅ Incluir (completar cobertura) |

---

## Stories Fase 2

### DS-S07: Grid MCP en Release Party (2 pts) 🔴

**Archivo**: `docs/blueprint-release-party.md`  
**Agente**: @periodico  
**Cambios**:

| Línea | Sección | Acción |
|-------|---------|--------|
| ~316 | Grid MCP (Ox slide) | +2 servers: TypedPrompt :3020, Prolog :3006 |
| ~385 | Grid visual (SM slide) | +2 servers con iconos |
| ~88 | Stack técnico | "5 servidores" → "7 servidores" |

### DS-S08: Métricas MMCO (1 pt) 🟡

**Archivo**: `docs/blueprint-mmco.md`  
**Agente**: @periodico  
**Cambios**:

| Línea | Elemento | Antes | Después |
|-------|----------|-------|---------|
| 220 | plugins | 19 | 22 |
| 221 | agentes | 31 | 31+ |

### DS-S09: Stack PO (1 pt) 🟡

**Archivo**: `docs/blueprint-po.md`  
**Agente**: @periodico  
**Cambios**:

| Línea | Sección | Cambio |
|-------|---------|--------|
| ~88 | tech-layer MCP | "5 servidores" → "7 servidores (mesh)" |

### DS-S10: Nuevo Blueprint TypedPrompting (5 pts) 🔴

**Archivo**: `docs/blueprint-typed-prompting.md` (NUEVO)  
**Agente**: @aleph (con soporte @periodico)  
**Estructura** (patrón ESPIRAL+CUBO):

```
PORTADA → LAYER 0 (Schema) → LAYER 1 (Validation) → LAYER 2 (Catalog) → INTEGRACIÓN
    ↓           ↓                   ↓                    ↓
  Centro     +X Técnico          +X Tools             +X Specs
             -X Demo UI          -X Teatro            -X Links
```

**Estimación**: ~400 líneas HTML/impress.js

---

## Orden de Ejecución

| Turno | Agente | Story | Dependencia |
|-------|--------|-------|-------------|
| T016 | @indice | Verificar Funcional.md §3.7 | — |
| T017 | @periodico | DS-S07 (release-party) | — |
| T018 | @periodico | DS-S08 + DS-S09 (métricas) | — |
| T019 | @aleph | DS-S10 (nuevo blueprint) | DS-S07 como referencia |
| T020 | @lucas | Pruebas visuales Jekyll | Todos completados |
| T021 | @aleph | Validación PO + cierre | Pruebas OK |

---

## Métricas Proyectadas

| Métrica | Fase 1 | Fase 2 | Total |
|---------|--------|--------|-------|
| Stories | 6 | 4 | 10 |
| Puntos | 13 | 9 | 22 |
| Turnos | 12 | ~9 | ~21 |

---

## Estado del Turno

| Campo | Valor |
|-------|-------|
| **Estado** | ✅ DONE |
| **Artefacto** | Backlog fase 2 formalizado |
| **Siguiente** | T016 @indice |
