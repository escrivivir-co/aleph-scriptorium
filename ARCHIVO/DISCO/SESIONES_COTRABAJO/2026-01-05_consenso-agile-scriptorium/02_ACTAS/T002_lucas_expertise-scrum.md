# Acta T002: Arquitectura de Trabajo Ágil para Scriptorium

## Metadatos

| Campo | Valor |
|-------|-------|
| **Turno** | 002 |
| **Agente** | @lucas (refactorizado por agente 3x) |
| **Inicio** | 2026-01-05 17:00 |
| **Fin** | 2026-01-05 18:30 |
| **Estado final** | ✅ DONE |
| **Revisión** | Refactor profundo — análisis arquitectónico |

## Contexto Leído

- **T001 (Aleph)** — Diagnóstico: dos sistemas desconectados, propuesta 4 fases
- **lucas-prolog.brain.pl** — Predicados: `ubicacion_canonica/2`, `documentacion_coherente/1`, `consejo/2`, `recibir_senal/2`, `procesar_cambio/2`
- **scrum-protocol.instructions.md** — Principio DRY, flujo 4 fases actual
- **scrum-workflow.instructions.md** — Gate Ox-Indice R1-R2, comandos @scrum
- **cotrabajo.instructions.md** — Estructura de sesión, 8 estados de agente
- **templates-index.json** — 12 plantillas en 2 categorías

---

## Aportación

### 1. Crítica Fundamental: El Problema NO es Técnico

**T001 diagnosticó bien el síntoma** (dos árboles desconectados), pero la propuesta de "4 fases + 3 comandos" trata el problema como si fuera de **tooling**. No lo es.

El problema real es de **ontología de proceso**:

```prolog
% ¿Qué ES una sesión de cotrabajo desde el punto de vista Scrum?
ubicacion_canonica(sesion_cotrabajo, ???).  % NO DEFINIDO

% Actualmente tenemos:
ubicacion_canonica(que, 'ARCHIVO/').
ubicacion_canonica(como, '.github/instructions').
ubicacion_canonica(cuando, 'BACKLOG-SCRIPTORIUM.md').
ubicacion_canonica(quien, '.github/agents').
ubicacion_canonica(donde, 'ARCHIVO/DEVOPS/Funcional.md').

% FALTA: ¿Qué es una sesión? ¿Dónde vive conceptualmente?
```

**Diagnóstico profundo**: La desconexión existe porque no hemos decidido si una sesión de cotrabajo es:

| Hipótesis | Implicación | Problema |
|-----------|-------------|----------|
| **A. Un tipo de conversación PO-SM** | Equivalente a `conversacion-po-sm.md` | No refleja la complejidad multi-agente |
| **B. Un artefacto independiente** | Vive paralelo al backlog | Crea dos fuentes de verdad |
| **C. Una fase del proceso Scrum** | Antecede a la conversación PO-SM | Cambia la jerarquía Scrum |
| **D. Un evento ceremonial** | Como Sprint Planning o Retro | No produce artefactos directos |

**Mi propuesta**: Ninguna de las anteriores. Una sesión de cotrabajo es **C + D híbrido**: una **ceremonia productiva** que genera **input estructurado** para el proceso Scrum estándar.

---

### 2. Redefinición Ontológica: La Sesión como Ceremonia Productiva

**Premisa**: En Scrum ortodoxo, las ceremonias (Planning, Daily, Review, Retro) son **eventos que producen decisiones, no artefactos**. Los artefactos (Backlog, Sprint Backlog, Incremento) se derivan de esas decisiones.

**Problema con Cotrabajo**: Una sesión produce **actas** (artefactos) durante el proceso, no solo al final. Esto rompe la separación limpia evento/artefacto.

**Solución: Modelo de Ceremonia Productiva**

```
┌─────────────────────────────────────────────────────────────────────┐
│               CEREMONIA PRODUCTIVA (nuevo concepto)                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ENTRADA (trigger)                                                  │
│  ├─► Necesidad detectada (user story, bug, investigación)          │
│  ├─► Gate: ¿Requiere trabajo multi-agente estructurado?            │
│  │   ├─► NO → Conversación PO-SM directa → Borrador                │
│  │   └─► SÍ → Iniciar Sesión de Cotrabajo                          │
│                                                                     │
│  PROCESO (la sesión)                                                │
│  ├─► 00_SESION.md define: objetivo, participantes, restricciones   │
│  ├─► 02_ACTAS/ captura trabajo incremental (turnos)                │
│  ├─► 01_TABLERO.md es índice DRY (no artefacto sustantivo)         │
│  └─► ESTADO: {ABIERTA, PAUSADA, CERRADA}                           │
│                                                                     │
│  SALIDA (artefacto)                                                 │
│  ├─► Tipo A: Ninguno (sesión exploratoria) → Actas bastan          │
│  ├─► Tipo B: Protocolo (sesión normativa) → Nueva instrucción      │
│  ├─► Tipo C: Épica (sesión productiva) → Borrador de backlog       │
│  └─► Tipo D: Conocimiento (spike) → Documento de hallazgos         │
│                                                                     │
│  RESIDUO (siempre)                                                  │
│  └─► SESIONES_COTRABAJO/{fecha}_{tema}/ permanece como registro    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Clave**: La sesión NO se "convierte" en borrador. La sesión **produce** un borrador como output. Son entidades distintas con relación generativa.

---

### 3. Por Qué PAC es Irrelevante para Este Problema

Las plantillas PAC (Product as Code) resuelven un problema diferente: **estructura de datos de backlog**. Nuestro problema es de **flujo de proceso**.

```prolog
% PAC resuelve:
plantilla('pac-create-epic', 'project-management', _, 'Crear épicas con estructura PAC').
plantilla('pac-validate', 'project-management', _, 'Validar estructura de backlog').

% Nuestro problema:
consejo(confundido, 
    'Ante la confusión, invoca @ox. El oráculo conoce todos los agentes.').
% → PAC no sabe qué es @ox ni qué es una sesión de cotrabajo
```

**Diagnóstico**: Adoptar metadata PAC en frontmatter es **ortogonal** al problema. Podemos hacerlo o no; no afecta la integración Cotrabajo↔Scrum.

**Recomendación**: Ignorar PAC para esta sesión. Tratarlo como mejora futura independiente (EPIC separada).

---

### 4. Arquitectura Propuesta: El Modelo Generativo

En lugar de "destilación" (implica pérdida), propongo **generación**: la sesión genera artefactos sin consumirse.

```
┌─────────────────────────────────────────────────────────────────────┐
│                    MODELO GENERATIVO                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│                    SESIÓN DE COTRABAJO                              │
│                    (Entidad persistente)                            │
│                           │                                         │
│                           │ GENERA (no se transforma)               │
│                           ▼                                         │
│         ┌─────────────────┴─────────────────┐                       │
│         │                                   │                       │
│         ▼                                   ▼                       │
│  ┌──────────────┐                   ┌──────────────┐               │
│  │   BORRADOR   │                   │   ACTAS      │               │
│  │  (derivado)  │                   │ (registro)   │               │
│  └──────┬───────┘                   └──────────────┘               │
│         │                                                           │
│         │ APRUEBA (Gate Ox-Indice)                                  │
│         ▼                                                           │
│  ┌──────────────┐                                                   │
│  │    ÍNDICE    │                                                   │
│  │   OFICIAL    │                                                   │
│  └──────────────┘                                                   │
│                                                                     │
│  INVARIANTES:                                                       │
│  1. Sesión SIEMPRE existe independiente del borrador                │
│  2. Borrador PUEDE existir sin sesión (conversación PO-SM)          │
│  3. Relación es 1:N (una sesión puede generar varios borradores)    │
│  4. Archivado preserva ambos con enlaces                            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Diferencia clave con propuesta T001**:
- T001: Sesión → Destila → Borrador (transformación)
- T002: Sesión → Genera → Borrador (producción)

La sesión **no desaparece** al generar borrador. Permanece como registro histórico.

---

### 5. El Protocolo Unificado: Tres Caminos, Un Destino

```prolog
% Definición de caminos hacia el backlog oficial
camino_a_backlog(directo, 'Conversación PO-SM → Borrador').
camino_a_backlog(ceremonial, 'Sesión Cotrabajo → Borrador').
camino_a_backlog(emergente, 'Trabajo técnico → Borrador retroactivo').

% Gate unificado (siempre pasa por aquí)
gate_aprobacion(Borrador) :-
    verificar_componentes(Borrador),      % @ox
    verificar_gap_analysis(Borrador),      % @ox
    verificar_estimacion(Borrador),        % @scrum
    verificar_coherencia(Borrador),        % @indice
    verificar_rutas(Borrador).             % @indice
```

**Visualización**:

```
          ┌─────────────────┐
          │ NECESIDAD       │
          │ DETECTADA       │
          └────────┬────────┘
                   │
         ¿Complejidad multi-agente?
                   │
          ┌────────┴────────┐
          │                 │
          ▼                 ▼
    ┌─────────┐       ┌──────────┐
    │ SIMPLE  │       │ COMPLEJA │
    │         │       │          │
    └────┬────┘       └────┬─────┘
         │                 │
         ▼                 ▼
┌─────────────────┐ ┌──────────────────┐
│ CAMINO DIRECTO  │ │ CAMINO CEREMONIAL│
│                 │ │                  │
│ PO-SM Dialog    │ │ Sesión Cotrabajo │
│ (1 agente)      │ │ (N agentes)      │
│                 │ │                  │
│ Produce:        │ │ Produce:         │
│ conversacion.md │ │ 02_ACTAS/        │
│ + borrador.md   │ │ + borrador.md    │
└────────┬────────┘ └────────┬─────────┘
         │                   │
         └─────────┬─────────┘
                   │
                   ▼
          ┌───────────────┐
          │ GATE OX-INDICE│
          │ (R1-R2)       │
          │               │
          │ Checklist:    │
          │ □ Componentes │
          │ □ Gap analysis│
          │ □ Estimación  │
          │ □ Coherencia  │
          │ □ Rutas       │
          └───────┬───────┘
                  │
                  ▼
          ┌───────────────┐
          │ ÍNDICE OFICIAL│
          │ BACKLOG-      │
          │ SCRIPTORIUM   │
          └───────────────┘
```

---

### 6. Metadata Mínima Viable (Sin PAC)

**Principio**: Añadir solo lo necesario para trazabilidad, no estructura completa PAC.

**En 00_SESION.md** (añadir al cerrar):

```markdown
## Producción

| Campo | Valor |
|-------|-------|
| **Tipo de cierre** | PRODUCTIVA / EXPLORATORIA / NORMATIVA |
| **Artefactos generados** | |
| - Borrador | [link a BACKLOG_BORRADORES/...] o "Ninguno" |
| - Protocolo | [link a .github/instructions/...] o "Ninguno" |
| - Documento | [link a ARCHIVO/...] o "Ninguno" |
| **Gate pasado** | ✅ / ⏳ Pendiente / N/A |
| **Epic ID asignado** | EPIC-ID o "N/A" |
```

**En 01_backlog-borrador.md** (añadir en frontmatter existente):

```yaml
---
# Metadata existente...
epic_id: "EPIC-ID"
status: "borrador"

# NUEVO: Origen (solo si aplica)
origen:
  tipo: "sesion_cotrabajo"  # | "conversacion_po_sm" | "emergente"
  referencia: "ARCHIVO/DISCO/SESIONES_COTRABAJO/2026-01-05_consenso-agile-scriptorium/"
  actas_relevantes: ["T001", "T002", "T005"]  # opcional
---
```

**Eso es todo**. No necesitamos PAC spec, success_criteria, constraints, etc. El borrador en Markdown ya contiene esa información en forma narrativa.

---

### 7. Comandos Propuestos: Solo Uno Nuevo

El análisis original proponía 3 comandos. Es excesivo. Propongo **1 comando nuevo** y **2 extensiones**:

#### A. NUEVO: `@scrum generar-desde-sesion`

```bash
@scrum generar-desde-sesion {ruta_sesion}
```

**Comportamiento**:
1. Lee `00_SESION.md` para obtener objetivo y participantes
2. Lee `02_ACTAS/` para extraer decisiones (busca secciones "## Decisiones Tomadas")
3. Pregunta al usuario: ¿Tipo de artefacto? (borrador / protocolo / documento)
4. Genera estructura inicial en ubicación correspondiente
5. Añade metadata de origen en el artefacto generado
6. Actualiza `00_SESION.md` con sección "Producción"

**NO hace**:
- Síntesis automática de actas (riesgo de context bloat)
- Validación Gate (eso es `@scrum aprobar`)
- Actualización de índice oficial (eso es `@scrum aprobar`)

#### B. EXTENDER: `@scrum cerrar`

Añadir parámetro opcional:

```bash
@scrum cerrar {epic_id} --incluir-sesiones
```

Cuando se usa `--incluir-sesiones`:
1. Busca sesiones que generaron la épica (via metadata origen)
2. Las incluye en el archivado de FC

#### C. EXTENDER: `@scrum status`

Añadir visualización de sesiones activas:

```
Sprint FC1
═══════════════════════
Épicas: 3 activas, 29 cerradas

Sesiones de Cotrabajo activas:
├─ 2026-01-05_consenso-agile-scriptorium (5 participantes, 2 turnos)
└─ (ninguna otra)

Borradores pendientes de aprobar: 2
```

---

### 8. El Ciclo Completo: Feature Cycle con Ceremonias

```
┌─────────────────────────────────────────────────────────────────────┐
│                      FEATURE CYCLE (FC)                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  SEMANA 1-2: PLANIFICACIÓN                                          │
│  ├─► Sprint Planning (ceremonia Scrum estándar)                    │
│  ├─► Sesiones de Cotrabajo para épicas complejas                   │
│  └─► Borradores generados → Gate → Índice                          │
│                                                                     │
│  SEMANA 3-10: EJECUCIÓN                                             │
│  ├─► Trabajo técnico (código, docs, tests)                         │
│  ├─► Dailies (opcional, según equipo)                              │
│  ├─► Sesiones de Cotrabajo ad-hoc para decisiones técnicas         │
│  └─► Tracking via `@scrum tracking`                                │
│                                                                     │
│  SEMANA 11-12: CIERRE                                               │
│  ├─► Sprint Review (demo, validación PO)                           │
│  ├─► Retrospectiva (puede ser sesión de cotrabajo)                 │
│  ├─► `@scrum cerrar` para cada épica completada                    │
│  └─► Snapshot + Archivado                                          │
│                                                                     │
│  ARCHIVADO FC:                                                      │
│  ├─► BACKLOG_BORRADORES/{FC}/* → BACKLOG_ARCHIVADOS/{FC}/          │
│  ├─► SESIONES_COTRABAJO/{FC}/* → SESIONES_ARCHIVADAS/{FC}/         │
│  ├─► Snapshot de BACKLOG-SCRIPTORIUM.md                            │
│  └─► Enlaces bidireccionales preservados                           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

### 9. Validación con Cerebro Prolog

Verifico coherencia de la propuesta con mis predicados:

```prolog
% ¿La propuesta respeta DRY?
documentacion_coherente(sesion_cotrabajo) :- 
    % Sesión vive en SESIONES_COTRABAJO/ (única fuente)
    % Borrador vive en BACKLOG_BORRADORES/ (única fuente)
    % No hay duplicación, solo referencias
    true.

% ¿Ubicaciones canónicas?
ubicacion_canonica(sesion, 'ARCHIVO/DISCO/SESIONES_COTRABAJO/').
ubicacion_canonica(borrador, 'ARCHIVO/DISCO/BACKLOG_BORRADORES/').
ubicacion_canonica(indice, '.github/BACKLOG-SCRIPTORIUM.md').
% → Añadir ubicacion_canonica(sesion, ...) al brain

% ¿Consejo aplicable?
consejo(duplicando,
    'Si copias información, pregúntate: ¿hay una fuente única? DRY es ley.').
% → La propuesta NO copia actas a borrador, solo referencia

% ¿Reporte de salud?
reporte_salud('OK: Sistema de índices coherente') :-
    sistema_indices_sano,
    % NUEVO: También verificar que sesiones referenciadas existen
    sesiones_referenciadas_existen.
```

**Resultado**: La propuesta es consistente con el modelo mental de Lucas.

---

### 10. Diferencias con Propuesta Original (T001 + versión anterior T002)

| Aspecto | Propuesta Original | Esta Propuesta |
|---------|-------------------|----------------|
| **Modelo conceptual** | Destilación (transformación) | Generación (producción) |
| **PAC** | Adoptar metadata híbrida | Ignorar, es ortogonal |
| **Comandos nuevos** | 3 (`destilar`, `relacionar`, `archivar-fc`) | 1 nuevo + 2 extensiones |
| **Metadata** | Compleja (PAC spec completo) | Mínima (solo `origen:`) |
| **Tipos de sesión** | 4 (Exploratoria, Decisional, Productiva, Investigación) | 3 (Exploratoria, Normativa, Productiva) |
| **Relación sesión↔borrador** | 1:1 | 1:N |
| **Síntesis automática** | Sí (`conversacion-resumen.md`) | No (riesgo de bloat) |

---

## Decisiones Tomadas

1. ✅ **Modelo Generativo**: La sesión PRODUCE artefactos, no se TRANSFORMA en ellos
2. ✅ **PAC es ortogonal**: No mezclar mejoras de metadata con integración de proceso
3. ✅ **Un solo comando nuevo**: `@scrum generar-desde-sesion`
4. ✅ **Metadata mínima**: Solo `origen:` en frontmatter, no PAC completo
5. ✅ **Tres tipos de cierre**: Exploratoria, Normativa, Productiva
6. ✅ **Relación 1:N**: Una sesión puede generar múltiples artefactos
7. ✅ **Sin síntesis automática**: El agente humano/IA decide qué extraer

---

## Preguntas para Siguientes Turnos

### Para @ox (T003):

- [ ] ¿El comando `generar-desde-sesion` es implementable como extensión del plugin actual?
- [ ] ¿Cómo verificamos en el Gate que una épica proviene de sesión sin leer todas las actas?
- [ ] ¿El modelo generativo introduce riesgos de inconsistencia?

### Para @indice (T004):

- [ ] ¿La metadata `origen:` en frontmatter rompe algún índice existente?
- [ ] ¿Necesitamos actualizar Funcional.md con la nueva ubicación canónica de sesiones?
- [ ] ¿El modelo 1:N (una sesión → varios borradores) afecta coherencia?

### Para @scrum (T005):

- [ ] ¿La extensión de `@scrum cerrar --incluir-sesiones` es viable?
- [ ] ¿El `@scrum status` puede leer metadata de sesiones activas?
- [ ] ¿Cuál es el esfuerzo de implementación del comando nuevo?

### Para @aleph (ronda final):

- [ ] ¿Los 3 tipos de cierre cubren los casos de uso reales?
- [ ] ¿El modelo generativo refleja cómo realmente trabajamos?
- [ ] ¿Aprobamos esta arquitectura como base del protocolo?

---

## Actualización Propuesta para lucas-prolog.brain.pl

```prolog
%% =============================================================================
%% INTEGRACIÓN COTRABAJO-SCRUM (Consenso Agile FC1)
%% =============================================================================

%% Ubicación canónica de sesiones
ubicacion_canonica(sesion, 'ARCHIVO/DISCO/SESIONES_COTRABAJO/').

%% Tipos de cierre de sesión
tipo_cierre_sesion(exploratoria, 'No genera artefacto, actas bastan').
tipo_cierre_sesion(normativa, 'Genera protocolo/instrucción').
tipo_cierre_sesion(productiva, 'Genera borrador de épica').

%% Relación generativa sesión → artefacto
genera(Sesion, Artefacto, Tipo) :-
    sesion_cerrada(Sesion, Tipo),
    Tipo \= exploratoria,
    artefacto_de_sesion(Sesion, Artefacto).

%% Validación de coherencia extendida
sistema_indices_sano_v2 :-
    sistema_indices_sano,
    sesiones_referenciadas_existen,
    borradores_con_origen_valido.
```

---

## Siguiente Turno Sugerido

**@ox** para validación técnica:
1. Factibilidad del comando `generar-desde-sesion`
2. Impacto en arquitectura del plugin
3. Riesgos del modelo generativo

**Duración estimada**: 20-30 min

---

**Estado**: ✅ DONE (refactorizado)  
**Turno siguiente**: @ox (validación técnica)

---

**Estado**: ✅ DONE  
**Turno siguiente**: @ox (validación técnica)
