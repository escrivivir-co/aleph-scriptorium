# Backlog Borrador: SCRIPT-1.18.0 — Cobertura y Homogeneización de Índices

**Estado**: ✅ Aprobado y publicado en BACKLOG-SCRIPTORIUM.md  
**Fecha**: 2025-12-24 (Nochebuena)  
**Conversación PO-SM**: `conversacion-po-sm.md`  
**Fusión**: Combina análisis de INDICES_COBERTURA + INDICES_HOMOGENEIZACION
**Publicado**: `.github/BACKLOG-SCRIPTORIUM.md` (SCRIPT-1.18.0)

---

## Arquitectura de Índices (Validada)

```
┌─────────────────────────────────────────────────────────────────┐
│              DEVOPS (Funcional.md + Tecnico.md)                 │
│            ═══════════════════════════════════                   │
│                 ÚNICA FUENTE DE VERDAD DEL SISTEMA               │
│                        (NO SE MODIFICA)                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│   ┌──────────────────────────┐    ┌──────────────────────────┐  │
│   │     ÍNDICE SPLASH        │    │     ÍNDICE README        │  │
│   │    (Mapa de docs/)       │    │   (Mapa de README.md)    │  │
│   │                          │    │                          │  │
│   │  Cobertura: Funcional    │    │  Cobertura: Técnica      │  │
│   │  Agente: @GHPages        │    │  Agente: @indice         │  │
│   │  Refactoriza: Web        │    │  Refactoriza: README.md  │  │
│   └──────────────────────────┘    └──────────────────────────┘  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Principios

1. **DEVOPS es intocable**: Funcional.md y Tecnico.md son la fuente de verdad
2. **SPLASH describe cómo editar docs/**: Mapa para @GHPages y refactorizaciones web
3. **README describe cómo sincronizar README.md**: Mapa para @indice

---

## Objetivo de la Épica

Refactorizar los índices SPLASH y README para:
- **Cobertura**: Que describan completamente cómo refactorizar sus respectivos targets
- **Homogeneización**: Que sigan el mismo estilo visual y estructural
- **DRY**: Que referencien a DEVOPS en lugar de duplicar

---

## Matriz de Decisiones: SPLASH (Mapa de docs/)

### Índice: `ARCHIVO/DISCO/SPLASH/index.md`
**Propósito**: Guía para refactorizar GH-Pages (docs/)
**Agente responsable**: @GHPages

| # | Sección | Decisión | Justificación |
|---|---------|----------|---------------|
| 1 | Arquitectura Jekyll | **a) Dejar** | Core del mapa web |
| 2 | Estructura index.md | **a) Dejar** | Único lugar |
| 3 | Sistema CSS | **a) Dejar** | Único lugar |
| 4 | Páginas del Sitio | **b) Modificar** | Añadir ecosistema.md |
| 5 | Operaciones | **a) Dejar** | Procedimientos únicos |
| 6 | Checklist | **b) Modificar** | Homogeneizar formato |
| 7 | Pendientes (TODO) | **e) Eliminar** | Mover a backlog formal |
| 8 | Referencias | **b) Modificar** | Añadir enlace a DEVOPS |

### Tareas SPLASH

- [ ] Añadir ecosistema.md a tabla de páginas
- [ ] Homogeneizar checklist al formato estándar
- [ ] Mover TODOs a épica formal
- [ ] Añadir referencia: "Fuente de verdad: DEVOPS"

---

## Matriz de Decisiones: README (Mapa de README.md)

### Índice: `ARCHIVO/DISCO/README/index.md`
**Propósito**: Guía para sincronizar README.md con codebase
**Agente responsable**: @indice

| # | Sección | Decisión | Justificación |
|---|---------|----------|---------------|
| 1 | Propósito | **a) Dejar** | Meta necesario |
| 2 | Estructura README | **a) Dejar** | Core del mapa |
| 3 | Badges | **a) Dejar** | Único lugar |
| 4 | Secciones sincronizables | **b) Modificar** | Referenciar DEVOPS |
| 5 | Cuándo actualizar | **a) Dejar** | Único lugar |
| 6 | Operaciones | **a) Dejar** | Procedimientos únicos |
| 7 | Checklist | **b) Modificar** | Homogeneizar formato |
| 8 | Referencias | **b) Modificar** | Añadir enlace a DEVOPS |
| 9 | Cuándo NO actualizar | **a) Dejar** | Único lugar |

### Tareas README

- [ ] Simplificar §4: referenciar DEVOPS para contadores
- [ ] Homogeneizar checklist al formato estándar
- [ ] Añadir referencia: "Fuente de verdad: DEVOPS"

---

## Formato Estándar de Checklist

Ambos índices usarán este formato:

```markdown
### Checklist: [Nombre]

| Paso | Descripción | Verificación |
|------|-------------|--------------|
| 1 | ... | [ ] |
| 2 | ... | [ ] |
```

---

## Sección de Referencias (Añadir a Ambos)

```markdown
---

## Referencias

| Documento | Propósito |
|-----------|-----------|
| `ARCHIVO/DEVOPS/Funcional.md` | Fuente de verdad: capacidades y flujos |
| `ARCHIVO/DEVOPS/Tecnico.md` | Fuente de verdad: arquitectura y plugins |
| `@indice` | Agente de navegación DRY |
```

---

## Stories

### SCRIPT-1.18.0-S01: Refactorizar SPLASH
**Effort**: 3 pts  
**Prioridad**: Must

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T001 | Añadir ecosistema.md a tabla de páginas (§4) | ⏳ |
| T002 | Homogeneizar checklist §6 al formato estándar | ⏳ |
| T003 | Mover TODOs §7 a épica formal | ⏳ |
| T004 | Añadir sección Referencias con enlace a DEVOPS | ⏳ |

**Definition of Done**:
- [ ] SPLASH referencia DEVOPS como fuente de verdad
- [ ] Checklist usa formato tabla estándar
- [ ] No hay TODOs sueltos

---

### SCRIPT-1.18.0-S02: Refactorizar README Index
**Effort**: 3 pts  
**Prioridad**: Must

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T005 | Simplificar §4: quitar duplicados, referenciar DEVOPS | ⏳ |
| T006 | Homogeneizar checklist §7 al formato estándar | ⏳ |
| T007 | Añadir sección Referencias con enlace a DEVOPS | ⏳ |

**Definition of Done**:
- [ ] README index referencia DEVOPS como fuente de verdad
- [ ] Checklist usa formato tabla estándar
- [ ] §4 no duplica contadores de DEVOPS

---

### SCRIPT-1.18.0-S03: Validación y Cierre
**Effort**: 2 pts  
**Prioridad**: Must

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T008 | Ejecutar @indice para validar coherencia | ⏳ |
| T009 | Verificar que GH-Pages compila sin errores | ⏳ |
| T010 | Actualizar README.md con cambios si aplica | ⏳ |

**Definition of Done**:
- [ ] @indice no reporta warnings
- [ ] jekyll build pasa
- [ ] Commit generado

---

## Métricas

| Métrica | Valor |
|---------|-------|
| Stories | 3 |
| Tasks | 10 |
| Puntos | 8 |
| Prioridad Must | 3 stories (8 pts) |
| Completadas | 0 |
| % Avance | 0% |

---

## Dependencias

| Dependencia | Estado |
|-------------|--------|
| DEVOPS/Funcional.md | ✅ Existe (no se modifica) |
| DEVOPS/Tecnico.md | ✅ Existe (no se modifica) |
| SPLASH/index.md | ✅ Existe (target de S01) |
| README/index.md | ✅ Existe (target de S02) |
| @indice | ✅ Operativo |
| @GHPages | ✅ Operativo |

---

## Orden de Ejecución

```
S01 (SPLASH) → S02 (README) → S03 (Validación)
```

---

## Próximos Pasos

1. **PO aprueba** este backlog fusionado
2. Eliminar carpeta `INDICES_HOMOGENEIZACION` (duplicada)
3. Ejecutar S01 → S02 → S03
4. Publicar como épica SCRIPT-1.18.0 en backlog principal

---

## Historial

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-24 | Crear análisis inicial (2 carpetas) | @scrum |
| 2025-12-24 | Fusionar en backlog único | @scrum |
| 2025-12-24 | Validar arquitectura 3 índices | Usuario |

