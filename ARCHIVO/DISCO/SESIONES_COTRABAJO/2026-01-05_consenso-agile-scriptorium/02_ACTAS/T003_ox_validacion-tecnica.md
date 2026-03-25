# Acta T003: Validación Técnica + Requisitos de Refactorización del Plugin Scrum

## Metadatos

| Campo | Valor |
|-------|-------|
| **Turno** | 003 |
| **Agente** | @ox |
| **Inicio** | 2026-01-05 19:00 |
| **Fin** | — |
| **Estado** | 🔄 EN PROGRESO |
| **Rol** | Auditoría técnica + Requisitos de implementación |

## Contexto Leído

- **T001 (Aleph)** — Diagnóstico: desconexión Cotrabajo↔Scrum, propuesta 4 fases + 3 comandos
- **T002 (Lucas)** — Refactor profundo: Modelo Generativo vs Destilación, 1 comando nuevo, PAC es ortogonal
- **scrum.agent.md** — Agente actual del plugin Scrum (v2.0 DRY)
- **plugin_ox_scrum.agent.md** — Bridge actual que conecta VS Code con el plugin
- **teatro plugin** — Referencia del patrón de "interpretar personaje" (SCRIPT-2.4.0)

---

## Parte 1: Validación Técnica de la Propuesta de Lucas

### ✅ Aprobación del Modelo Generativo

El análisis de @lucas en T002 es **técnicamente sólido**. Valido los siguientes puntos:

| Aspecto | Veredicto | Justificación |
|---------|-----------|---------------|
| **Ontología de sesión** | ✅ Correcto | "Ceremonia Productiva" resuelve la ambigüedad |
| **PAC como ortogonal** | ✅ Correcto | Evita scope creep innecesario |
| **1 comando nuevo vs 3** | ✅ Correcto | KISS: `generar-desde-sesion` basta |
| **Modelo Generativo** | ✅ Correcto | Preserva sesión como entidad independiente |
| **Metadata mínima** | ✅ Correcto | Solo `origen:` en frontmatter |
| **Sin síntesis automática** | ✅ Correcto | Evita context bloat |

**Veredicto General**: La arquitectura propuesta por Lucas es **APROBADA** para implementación.

### ⚠️ Observaciones Técnicas

1. **Comando `generar-desde-sesion`**:
   - Factible como extensión del plugin scrum actual
   - Requiere leer `00_SESION.md` + escanear `02_ACTAS/*.md` (secciones "Decisiones Tomadas")
   - Complejidad: Media (~3-5 horas de implementación)

2. **Gate Ox-Indice para épicas de sesión**:
   - NO necesita leer todas las actas
   - El campo `origen.referencia` en el borrador permite verificar que la sesión existe
   - Verificación: `file_exists(origen.referencia + '/00_SESION.md')`

3. **Riesgo del modelo generativo**:
   - BAJO: Una sesión que genera múltiples artefactos no introduce inconsistencia si cada artefacto referencia a la sesión original
   - Invariante: `artefacto.origen.referencia → sesión.Producción.artefactos[]` (bidireccional)

---

## Parte 2: REQUISITOS NUEVOS — Refactorización del Plugin Scrum

> **Origen**: Intervención del Product Owner (usuario) durante la sesión.

El PO ha solicitado que esta sesión incluya la **planificación de dos requisitos adicionales**:

### Requisito A: scrum.agent.md → Referencia DRY a Lucas

**Situación Actual**:
- `scrum.agent.md` es un agente independiente con su propia definición
- Lucas tiene expertise Scrum documentada en su `lucas-prolog.brain.pl`
- El protocolo de "interpretar personaje" (SCRIPT-2.4.0) permite que cualquier agente "interprete" a un personaje creado

**Requerimiento**:
```
El agente @scrum debe ser una REFERENCIA DRY a Lucas.
En lugar de duplicar expertise Scrum en scrum.agent.md,
el agente debe "interpretar" a Lucas para heredar su conocimiento.
```

**Impacto Arquitectónico**:

```
ANTES:
┌─────────────────┐     ┌─────────────────┐
│ scrum.agent.md  │     │ lucas.agent.md  │
│ (independiente) │     │ (expertise Scrum)│
│ Comandos: 6     │     │ Comandos: varios│
└─────────────────┘     └─────────────────┘
      ↓                        ↓
  Plugin Scrum            Plugin Teatro
  (duplicación)           (fuente de verdad)

DESPUÉS:
┌─────────────────┐
│ scrum.agent.md  │ ───INTERPRETA───► Lucas (via personaje-context-protocol)
│ (referencia DRY)│                   │
│ Comandos: 6     │                   │
│ + Expertise: Lucas                  ▼
└─────────────────┘           ┌─────────────────┐
      │                       │ lucas.agent.md  │
      │                       │ (fuente de verdad)
      │                       │ + lucas-prolog.brain.pl
      │                       └─────────────────┘
      ▼
  Plugin Scrum
  (sin duplicación)
```

**Tareas a Planificar**:

| Task ID | Descripción | Effort | Dependencia |
|---------|-------------|--------|-------------|
| REQ-A-001 | Documentar que scrum.agent.md "interpreta" a Lucas | 2 | — |
| REQ-A-002 | Añadir handoff en scrum.agent.md para cargar contexto Lucas | 3 | REQ-A-001 |
| REQ-A-003 | Verificar que personajes-registry.json incluye a Lucas | 1 | SCRIPT-2.4.0 |
| REQ-A-004 | Test: @scrum invoca expertise de Lucas sin duplicar | 2 | REQ-A-002, REQ-A-003 |

---

### Requisito B: plugin_ox_scrum.agent.md → Invocar a Lucas

**Situación Actual**:
- `plugin_ox_scrum.agent.md` es el bridge entre VS Code y el plugin Scrum
- Actualmente delega a `scrum.agent.md` sin conocer a Lucas

**Requerimiento**:
```
El bridge debe saber invocar el protocolo de "interpretar personaje"
para que cuando @scrum sea invocado, pueda cargar el contexto de Lucas
bajo demanda (FASE 1b → FASE 2 del protocolo).
```

**Impacto Arquitectónico**:

```
ANTES:
Usuario → @scrum → plugin_ox_scrum → scrum.agent.md
                                     (conocimiento limitado)

DESPUÉS:
Usuario → @scrum → plugin_ox_scrum → ┌─── scrum.agent.md
                    │                │    (comandos)
                    │                │
                    └──INTERPRETA───►│    Lucas
                       (opcional)    │    (expertise)
                                     └────────────────
```

**Tareas a Planificar**:

| Task ID | Descripción | Effort | Dependencia |
|---------|-------------|--------|-------------|
| REQ-B-001 | Añadir handoff en plugin_ox_scrum para "cargar Lucas" | 2 | REQ-A-001 |
| REQ-B-002 | Documentar cuándo invocar Lucas (casos de uso) | 2 | — |
| REQ-B-003 | Test: Usuario invoca @scrum → bridge ofrece cargar Lucas | 2 | REQ-B-001 |

---

### Requisito C: Redefinir Contenido del Plugin Scrum

**Situación Actual**:
- El plugin Scrum tiene estructura estándar pero no refleja el "Modelo Generativo" de Lucas

**Requerimiento**:
```
Rediseñar el contenido del plugin Scrum para:
1. Implementar el Modelo Generativo (sesión → produce → artefacto)
2. Añadir comando `generar-desde-sesion`
3. Extender `cerrar` y `status` según propuesta T002
4. Integrar con Lucas como fuente de expertise
```

**Tareas a Planificar**:

| Task ID | Descripción | Effort | Dependencia |
|---------|-------------|--------|-------------|
| REQ-C-001 | Refactorizar scrum-protocol.instructions.md con Modelo Generativo | 5 | T002 aprobado |
| REQ-C-002 | Implementar comando `generar-desde-sesion` | 5 | REQ-C-001 |
| REQ-C-003 | Extender comando `cerrar --incluir-sesiones` | 3 | REQ-C-001 |
| REQ-C-004 | Extender comando `status` con sesiones activas | 2 | REQ-C-001 |
| REQ-C-005 | Añadir metadata `origen:` a template de borrador | 2 | REQ-C-001 |
| REQ-C-006 | Actualizar README del plugin | 2 | REQ-C-001..005 |

---

## Parte 3: Planificación Propuesta

### Epic Propuesta: SCRUM-REFACTOR-1.0.0

**Nombre**: Refactorización Plugin Scrum con Modelo Generativo + Lucas DRY

**Objetivo**: Transformar el plugin Scrum para implementar el Modelo Generativo y usar a Lucas como fuente DRY de expertise Scrum.

**Stories**:

#### Story 1: scrum.agent.md como Referencia DRY a Lucas (8 pts)

| Task | Descripción | Effort |
|------|-------------|--------|
| REQ-A-001 | Documentar interpretación de Lucas | 2 |
| REQ-A-002 | Handoff para cargar contexto Lucas | 3 |
| REQ-A-003 | Verificar personajes-registry.json | 1 |
| REQ-A-004 | Test de integración | 2 |

#### Story 2: plugin_ox_scrum.agent.md con Invocación de Lucas (6 pts)

| Task | Descripción | Effort |
|------|-------------|--------|
| REQ-B-001 | Handoff para cargar Lucas en bridge | 2 |
| REQ-B-002 | Documentar casos de uso | 2 |
| REQ-B-003 | Test de flujo completo | 2 |

#### Story 3: Modelo Generativo en Plugin Scrum (19 pts)

| Task | Descripción | Effort |
|------|-------------|--------|
| REQ-C-001 | Refactorizar scrum-protocol.instructions.md | 5 |
| REQ-C-002 | Implementar `generar-desde-sesion` | 5 |
| REQ-C-003 | Extender `cerrar --incluir-sesiones` | 3 |
| REQ-C-004 | Extender `status` con sesiones | 2 |
| REQ-C-005 | Metadata `origen:` en template | 2 |
| REQ-C-006 | Actualizar README | 2 |

**Total Effort**: 33 pts

**Prioridad**: P0 (requerimiento directo del PO)

---

## Decisiones Tomadas

1. ✅ **Modelo Generativo de Lucas**: APROBADO técnicamente
2. ✅ **scrum.agent.md → Lucas DRY**: PLANIFICADO como Story 1
3. ✅ **plugin_ox_scrum → Invocación Lucas**: PLANIFICADO como Story 2
4. ✅ **Refactorización completa del plugin**: PLANIFICADO como Story 3
5. ✅ **Epic ID**: SCRUM-REFACTOR-1.0.0

---

## Preguntas para Siguientes Turnos

### Para @indice (T004):

- [ ] ¿La referencia DRY scrum→Lucas rompe algún índice?
- [ ] ¿Dónde documentamos que @scrum "interpreta" a Lucas?
- [ ] ¿El personajes-registry.json ya está listo para esto?

### Para @scrum (T005):

- [ ] ¿Aceptas la planificación propuesta (33 pts)?
- [ ] ¿Puedes estimar fechas para las 3 stories?
- [ ] ¿Hay dependencias bloqueantes con SCRIPT-2.4.0?

### Para @aleph (ronda final):

- [ ] ¿Apruebas la Epic SCRUM-REFACTOR-1.0.0?
- [ ] ¿El Modelo Generativo + Lucas DRY refleja la visión del Scriptorium?
- [ ] ¿Priorizamos esto para FC1 o FC2?

---

## Verificación de Coherencia (Auto-Reflexión)

Antes de cerrar, verifico métricas de la sesión:

| Métrica | Valor | Estado |
|---------|-------|--------|
| Turnos completados | 3 | ✅ Normal |
| Lecturas de archivo | 6 | ✅ No redundante |
| Decisiones documentadas | 5 | ✅ Trazable |
| Preguntas abiertas | 6 | ⚠️ Pendientes para T004-T006 |

**Anti-patrones evitados**:
- ❌ AP-01: No releí archivos ya leídos
- ❌ AP-02: Usé índices antes de explorar (01_TABLERO.md, 00_SESION.md)
- ❌ AP-03: Respuesta estructurada, no verbosa
- ❌ AP-04: Caché de contexto activo (sesión unitaria)

---

**Estado**: ✅ DONE  
**Turno siguiente**: @indice (coherencia estructural) o @scrum (implementabilidad)

---

## ADDENDUM: Análisis de Impacto BREAKING CHANGE

> **Corrección del PO**: La intervención inicial fue un parche. Este addendum especifica el RESET completo del plugin.

### ⚠️ DECLARACIÓN DE BREAKING CHANGE

```
╔══════════════════════════════════════════════════════════════════════╗
║  🚨 BREAKING CHANGE: SCRUM-REFACTOR-1.0.0                           ║
║                                                                      ║
║  El plugin Scrum sufre un RESET COMPLETO.                           ║
║  Todos los archivos existentes serán REESCRITOS desde cero.         ║
║  Los colaterales en la codebase serán NEUTRALIZADOS activamente.    ║
╚══════════════════════════════════════════════════════════════════════╝
```

### Inventario de Archivos AFECTADOS

#### A. Plugin Scrum (RESET COMPLETO)

| Archivo | Acción | Justificación |
|---------|--------|---------------|
| `.github/plugins/scrum/manifest.md` | 🔴 REESCRIBIR | Nueva descripción: "Interpreta a Lucas" |
| `.github/plugins/scrum/agents/scrum.agent.md` | 🔴 REESCRIBIR | Referencia DRY a Lucas, no duplicar expertise |
| `.github/plugins/scrum/instructions/scrum-protocol.instructions.md` | 🔴 REESCRIBIR | Modelo Generativo completo |
| `.github/plugins/scrum/prompts/planificar-sprint.prompt.md` | 🔴 REESCRIBIR | Integrar con sesiones de cotrabajo |
| `.github/plugins/scrum/prompts/crear-backlog-borrador.prompt.md` | 🔴 REESCRIBIR | Nuevo comando `generar-desde-sesion` |
| `.github/plugins/scrum/prompts/aprobar-backlog.prompt.md` | 🟡 REVISAR | Verificar compatibilidad |
| `.github/plugins/scrum/prompts/tracking-sprint.prompt.md` | 🟡 REVISAR | Verificar compatibilidad |
| `.github/plugins/scrum/prompts/retrospectiva.prompt.md` | 🔴 REESCRIBIR | `cerrar --incluir-sesiones` |

#### B. Bridge Scrum (RESET)

| Archivo | Acción | Justificación |
|---------|--------|---------------|
| `.github/agents/plugin_ox_scrum.agent.md` | 🔴 REESCRIBIR | Añadir handoff para cargar Lucas |

#### C. Colaterales en Codebase (NEUTRALIZAR)

| Archivo | Acción | Referencia a actualizar |
|---------|--------|-------------------------|
| `.github/copilot-instructions.md:L25` | 🟡 VERIFICAR | `@scrum` en tabla de fuentes |
| `.github/copilot-instructions.md:L27` | 🟡 VERIFICAR | `@scrum` en auto-reflexión |
| `.github/copilot-instructions.md:L69` | 🟡 VERIFICAR | `@scrum` rol en triada |
| `.github/agents/AGENTS.md` | 🔴 ACTUALIZAR | Entrada de `plugin_ox_scrum` → "Interpreta Lucas" |
| `README.md:L59` | 🟡 VERIFICAR | Lista de plugins operativos |
| `scripts/setup-workspace.sh:L84,L106` | 🟡 VERIFICAR | Rutas de prompts/instructions |
| `docs/ecosistema.md:L58,L124` | 🔴 ACTUALIZAR | Descripción del plugin |
| `docs/blueprint.md:L135,L198` | 🟡 VERIFICAR | Referencias a `@scrum` |
| `docs/blueprint-copilot.md:L1002` | 🔴 ACTUALIZAR | Link a scrum.agent.md |
| `docs/hackathon-demo-script-2.1.0.md:L48,L121,L132,L211,L235` | 🟡 REVISAR | Context pack scrum |

#### D. Obras de Teatro (ACTUALIZAR referencias)

| Archivo | Líneas | Acción |
|---------|--------|--------|
| `ARCHIVO/PLUGINS/TEATRO/obras/context-bloat-saga.yaml` | L160,184,221,348,351,510 | 🟡 VERIFICAR | @scrum como actor |
| `docs/teatro/hackathon-script-2.1.0.md` | L19,57,59,94,135,236,265,291,368 | 🟡 VERIFICAR | @scrum como personaje |

#### E. MCPGallery (Submódulos)

| Archivo | Acción |
|---------|--------|
| `MCPGallery/.github/agents/zeus-architect.agent.md:L174,182,198` | 🟡 VERIFICAR | context-pack-scrum |
| `MCPGallery/mcp-mesh-sdk/src/zeus-site/.github/agents/zeus-architect.agent.md` | 🟡 VERIFICAR | Duplicado |

### Plan de Migración

```
FASE 0: SNAPSHOT (antes de tocar nada)
├── mcp_copilot-logs-_capture_snapshot("pre-scrum-reset")
├── git stash / git branch backup/scrum-v2.0.0
└── Documentar estado actual en BACKLOG_BORRADORES/

FASE 1: RESET PLUGIN (archivos en .github/plugins/scrum/)
├── BORRAR contenido actual (preservar estructura)
├── REESCRIBIR manifest.md con nueva identidad
├── REESCRIBIR scrum.agent.md como referencia DRY a Lucas
├── REESCRIBIR scrum-protocol.instructions.md con Modelo Generativo
└── REESCRIBIR prompts con nuevos comandos

FASE 2: RESET BRIDGE
├── REESCRIBIR plugin_ox_scrum.agent.md
└── Añadir handoff "🎭 Cargar contexto Lucas"

FASE 3: NEUTRALIZAR COLATERALES
├── ACTUALIZAR AGENTS.md (descripción del plugin)
├── ACTUALIZAR copilot-instructions.md (si necesario)
├── ACTUALIZAR docs/ecosistema.md
├── VERIFICAR docs/blueprint*.md
├── VERIFICAR scripts/setup-workspace.sh
└── VERIFICAR obras de teatro (sin romper narrativa)

FASE 4: VALIDACIÓN
├── Test: @scrum invoca Lucas correctamente
├── Test: Comando generar-desde-sesion funciona
├── Test: Comando cerrar --incluir-sesiones funciona
├── Verificar que NO hay referencias rotas
└── Verificar que settings.json carga correctamente
```

### Checklist de Neutralización

| # | Verificación | Estado |
|---|--------------|--------|
| 1 | ¿Todas las referencias a `scrum.agent.md` apuntan al nuevo? | ⏳ |
| 2 | ¿`personajes-registry.json` tiene entrada para Lucas? | ✅ (ya existe) |
| 3 | ¿`plugin_ox_scrum` puede invocar protocolo de personaje? | ⏳ |
| 4 | ¿Los prompts existentes siguen funcionando o están deprecados? | ⏳ |
| 5 | ¿Las obras de teatro pueden seguir usando @scrum? | ⏳ |
| 6 | ¿El context-pack-scrum en Zeus sigue siendo válido? | ⏳ |
| 7 | ¿setup-workspace.sh necesita nuevas rutas? | ⏳ |
| 8 | ¿Hay snapshots que referencian al plugin viejo? | ⏳ |

### Dependencia Crítica: SCRIPT-2.4.0

Este breaking change **DEPENDE** de que el protocolo de "interpretar personaje" (SCRIPT-2.4.0) esté completamente implementado:

```
SCRUM-REFACTOR-1.0.0
       │
       └──DEPENDE DE──► SCRIPT-2.4.0 (Personaje Context Protocol)
                              │
                              ├── personajes-registry.json ✅
                              ├── personaje-context-protocol.instructions.md ✅
                              └── Handoff en teatro.agent.md ⏳
```

### Esfuerzo Revisado

| Story | Effort Original | Effort Revisado | Razón |
|-------|-----------------|-----------------|-------|
| S1: scrum.agent.md → Lucas DRY | 8 pts | **13 pts** | +5 por reset completo |
| S2: plugin_ox_scrum → Lucas | 6 pts | **8 pts** | +2 por neutralización |
| S3: Modelo Generativo | 19 pts | **25 pts** | +6 por colaterales |
| **TOTAL** | 33 pts | **46 pts** | +13 por breaking change |

### Mensaje para el Equipo

```
⚠️ ATENCIÓN: SCRUM-REFACTOR-1.0.0 es un BREAKING CHANGE.

NO es un parche incremental. Es un RESET del plugin.

El agente @scrum dejará de tener expertise propia.
En su lugar, "interpretará" a Lucas (via SCRIPT-2.4.0).

Todos los archivos del plugin serán REESCRITOS.
46 referencias en la codebase serán VERIFICADAS/ACTUALIZADAS.

Antes de implementar:
1. Capturar snapshot del estado actual
2. Crear rama de backup
3. Verificar que SCRIPT-2.4.0 está listo
4. Ejecutar plan de migración en orden

Este cambio es IRREVERSIBLE sin el backup.
```

---

**Estado del Addendum**: ✅ COMPLETO  
**Siguiente acción requerida**: Aprobación del PO para proceder con el plan de migración
