# Backlog: Integración Novelist-Teatro-TALLER

> **Épica**: SCRIPT-1.30.0 — Novelist Integration  
> **Sprint**: FC3  
> **Fecha**: 2025-12-28

---

## Stories

### S01: Infraestructura Plugin Novelist (Sistema)
> Schemas, bridge y configuración base del plugin

**Tasks**:
- [x] T01: Crear schemas JSON (novela.schema.json, estructura.schema.json)
- [x] T02: Actualizar bridge plugin_ox_novelist.agent.md
- [x] T03: Actualizar README de ARCHIVO/PLUGINS/NOVELIST

**Commit**: `feat(script/plugins): añadir schemas y actualizar bridge novelist`

---

### S02: Obra Teatro Ítaca Digital (Sistema)
> Creación de la obra teatral con estructura monomito

**Tasks**:
- [x] T04: Crear itaca-digital.yaml (12 estadios)

**Commit**: `feat(script/teatro): crear obra itaca-digital con 12 estadios monomito`

---

### S03: Taller NOVELA_TRANSMEDIA (Sistema)
> Espacio de trabajo para mapeo selectivo

**Tasks**:
- [x] T05: Crear estructura de taller (mapeo, inicialización, arquitectura)
- [x] T06: Crear documentación de gobierno (README, PORTADA, INVENTARIO)

**Commit**: `feat(script/taller): inicializar NOVELA_TRANSMEDIA para mapeo selectivo`

---

### S04: Novela Novelist Ítaca Digital (Contenido)
> Inicialización de la novela en formato Novelist

**Tasks**:
- [x] T07: Crear novela.json, estructura.json, sincronizacion.json
- [x] T08: Crear 12 capítulos markdown
- [x] T09: Crear README de la obra

**Commit**: `feat(novelist/obras): inicializar novela itaca-digital con 12 capítulos`

---

## Resumen de Commits

| # | Scope | Tipo | Descripción |
|---|-------|------|-------------|
| 1 | script/plugins | feat | Schemas y bridge novelist |
| 2 | script/teatro | feat | Obra itaca-digital.yaml |
| 3 | script/taller | feat | Taller NOVELA_TRANSMEDIA |
| 4 | novelist/obras | feat | Novela itaca-digital |

---

## División Sistema vs Contenido

### Sistema (Commits 1-3)
- Infraestructura reutilizable
- No específico de "Ítaca Digital" 
- Plugin, schemas, taller vacío

### Contenido (Commit 4)
- Específico de la fuente NOVELA
- Capítulos con contenido inicial
- Sincronización con fuente remota
