# Acta T003: Nexo Técnico → Dramaturgo + Handoff a Lucas

> **Agente**: @aleph (Orquestador)  
> **Fecha**: 2026-01-04  
> **Estado**: ✅ DONE  
> **Tipo**: NEXO + HANDOFF

---

## 1. Verificación de Protocolo

### Estado de la Carpeta

| Archivo | Estado | Observación |
|---------|--------|-------------|
| `00_SESION.md` | ⚠️ DESACTUALIZADO | Estados de agentes no reflejan T002 |
| `01_TABLERO.md` | ✅ OK | Historial correcto, cola actualizada |
| `02_ACTAS/` | ✅ OK | 3 actas generadas (T001, T001b, T002) |
| `03_REFERENCIAS/` | ⚠️ INCOMPLETO | Falta vincular a IOT-SBR-LOGICA |
| `04_PROTOCOLO.md` | ✅ OK | Copia local correcta |

### Correcciones Necesarias

1. **00_SESION.md**: Actualizar estados de agentes (@ox, @indice, @scrum → ✅ DONE T002)
2. **03_REFERENCIAS/backlog.md**: Añadir referencias a borradores recuperados en T002

*Nota*: No aplico correcciones ahora para no interrumpir el flujo. Las anoto para el cierre de sesión.

---

## 2. Valoración de T002 (@ox + @indice + @scrum)

### Lo que hicieron bien ✅

| Aspecto | Valoración |
|---------|------------|
| **Recuperación de premisas** | Excelente — Citas del PO textual de IOT-SBR-LOGICA |
| **Mapa de dependencias** | Completo — 7 pasos del ciclo del dramaturgo |
| **Propuesta de épica** | Bien estructurada — 13 pts, 5 stories |
| **Vocabulario técnico** | Claro — Aferencia/Eferencia/SBR mapeados a implementación |

### Lo que faltó ⚠️

| Gap | Crítica Constructiva |
|-----|---------------------|
| **Lucas no aparece como ACTOR** | T002 habla de "Lucas anuncia" pero no detalla CÓMO. El personaje tiene su propio brain.pl con predicados que NO incluyen sensor/actuador. |
| **No hay query ejemplo** | Ox propone `sensor(ox, parado)` pero no muestra cómo Lucas lo consultaría con sus predicados actuales (`documentacion_coherente/1`, `ubicacion_canonica/2`). |
| **Screen Dramaturgo** | Es S04 (3 pts) pero no especifica qué vería el dramaturgo. ¿Una UI? ¿Un dashboard Prolog? ¿Logs? |
| **TypedPrompting conexión** | Se menciona `foco-activo.schema.json` pero no hay spec de qué foco activaría el ciclo sensor/actuador. |

### Veredicto

> **T002 es sólido como investigación, pero le falta el "último kilómetro" hacia Lucas.**

La tríada mapeó el territorio técnico correctamente. Ahora necesitamos que **Lucas, como personaje**, traduzca esto a su vocabulario de MENTOR.

---

## 3. Traducción: Visión Técnica → Vocabulario de Lucas

### Lo que el PO pide (en palabras simples)

```
"Quiero que cuando Ox detecte 'parado', Lucas lo sepa y avise a los demás personajes de la obra."
```

### Lo que Lucas ya sabe hacer

Según `lucas-prolog.brain.pl`:

| Predicado | Capacidad |
|-----------|-----------|
| `documentacion_coherente(X)` | Listar docs sin duplicados |
| `ubicacion_canonica(Tipo, Donde)` | Dónde buscar según tipo de pregunta |
| `consejo(Situacion, Mensaje)` | Dar consejos contextuales |
| `estadio_actual(Personaje, N)` | Saber en qué estadio está |
| `reporte_salud(R)` | Estado del sistema de índices |

### Lo que Lucas NO sabe (aún)

| Predicado Faltante | Capacidad Requerida |
|--------------------|---------------------|
| `sensor(Agente, Estado, Timestamp)` | Recibir señales de otros agentes |
| `estado_sistema(Estado)` | Conocer estado actual del Scriptorium |
| `anunciar(Mensaje, Destinatarios)` | Informar a otros personajes |
| `suscriptor(Personaje, Evento)` | Quién quiere recibir qué señal |

### Propuesta de Extensión para lucas-prolog.brain.pl

```prolog
%% =============================================================================
%% SENSOR/ACTUADOR — Scriptorium como Máquina
%% =============================================================================

%% HECHOS DINÁMICOS — Estado del sistema
:- dynamic estado_sistema/1.
:- dynamic sensor/3.
:- dynamic suscriptor/2.

%% Estado inicial
estado_sistema(activo).

%% Suscriptores por defecto (personajes de Ítaca Digital que quieren saber)
suscriptor(penelope, estado_cambio).
suscriptor(orfeo, estado_cambio).
suscriptor(edipo, estado_cambio).

%% AFERENCIA — Recibir señal de Ox
recibir_señal_ox(Estado) :-
    get_time(Timestamp),
    assertz(sensor(ox, Estado, Timestamp)),
    (estado_sistema(EstadoAnterior), EstadoAnterior \= Estado
        -> procesar_cambio_estado(EstadoAnterior, Estado)
        ;  true).

%% CEREBRO — Procesar cambio de estado
procesar_cambio_estado(Anterior, Nuevo) :-
    retractall(estado_sistema(_)),
    assertz(estado_sistema(Nuevo)),
    format(atom(Mensaje), 'Cambio de estado: ~w → ~w', [Anterior, Nuevo]),
    anunciar_a_suscriptores(estado_cambio, Mensaje).

%% EFERENCIA — Anunciar a personajes suscritos
anunciar_a_suscriptores(Evento, Mensaje) :-
    forall(
        suscriptor(Personaje, Evento),
        anunciar(Personaje, Mensaje)
    ).

%% Anuncio individual (hook para integración con Teatro)
anunciar(Personaje, Mensaje) :-
    format('📢 Lucas → ~w: ~w~n', [Personaje, Mensaje]).

%% Query para el PO: ¿Qué haría Lucas si Ox manda "parado"?
demo_sensor_actuador :-
    writeln('--- Demo Sensor/Actuador ---'),
    writeln('1. Estado inicial:'),
    estado_sistema(E1), format('   estado_sistema(~w)~n', [E1]),
    writeln('2. Ox envía señal "parado":'),
    recibir_señal_ox(parado),
    writeln('3. Lucas anuncia a suscriptores:'),
    estado_sistema(E2), format('   nuevo estado_sistema(~w)~n', [E2]).
```

---

## 4. Caso de Uso Estable para el PO

### Nombre

**UC-SENSOR-01: Ox detecta "parado" → Lucas anuncia a personajes**

### Actores

| Actor | Tipo | Descripción |
|-------|------|-------------|
| @ox | Sensor | Detecta estados del Scriptorium (sesión, error, parado) |
| Lucas | Actuador | Personaje MENTOR que anuncia cambios |
| Personajes Ítaca | Receptores | Penélope, Orfeo, Edipo (suscritos a eventos) |

### Precondiciones

1. MCPPrologServer corriendo en puerto 3006
2. Sesión de obra `itaca-digital` creada
3. `lucas-prolog.brain.pl` cargado con extensión sensor/actuador

### Flujo Principal

```
1. PO (o sistema) → @ox: detectar_estado()
2. @ox → MCPPrologServer: prolog_assert_fact({fact: "sensor(ox, parado, 1704369600)"})
3. MCPPrologServer → Lucas brain: trigger recibir_señal_ox(parado)
4. Lucas brain → procesar_cambio_estado(activo, parado)
5. Lucas brain → anunciar_a_suscriptores(estado_cambio, "Cambio: activo → parado")
6. Lucas → Penélope, Orfeo, Edipo: 📢 "Cambio de estado..."
```

### Postcondiciones

1. `estado_sistema(parado)` es verdadero
2. `sensor(ox, parado, Timestamp)` está en la KB
3. Todos los suscriptores han recibido notificación

### Variantes

| Variante | Descripción |
|----------|-------------|
| V1 | Ox envía "activo" → Lucas anuncia reactivación |
| V2 | Ox envía "error" → Lucas añade consejo de recuperación |
| V3 | Nuevo personaje se suscribe → Lucas lo añade a `suscriptor/2` |

---

## 5. Handoff a Lucas

### Convocatoria

> **@Lucas** (Scrum Master del Índice, MENTOR de Ítaca Digital)

Tienes el **Turno 4** de esta sesión.

### Tu Misión

1. **Revisar** la propuesta de extensión de tu brain.pl (sección 3)
2. **Validar** que el caso de uso UC-SENSOR-01 es coherente con tu rol de MENTOR
3. **Proponer ajustes** si algo no encaja con tu vocabulario (`consejo/2`, `estadio_actual/2`, etc.)
4. **Confirmar** o rechazar la integración

### Preguntas para Ti

| # | Pregunta |
|---|----------|
| 1 | ¿`anunciar/2` debería ser un `consejo/2` especial? |
| 2 | ¿Los personajes suscritos deberían estar en `itaca-digital.yaml` o en tu brain? |
| 3 | ¿El cambio de estado debería afectar `estadio_actual/2`? |
| 4 | ¿Quieres predicados adicionales para tu rol de "guardián de coherencia"? |

### Entregable Esperado

```
02_ACTAS/T004_lucas_validacion-extension.md
```

---

## 6. Actualización de Cola

| Turno | Agente | Estado | Objetivo |
|-------|--------|--------|----------|
| T001 | @ox | ✅ DONE | Mapa territorio |
| T001b | @aleph | ✅ DONE | Devolución gaps |
| T002 | @ox+@indice+@scrum | ✅ DONE | Spike profundo |
| **T003** | **@aleph** | ✅ DONE | Nexo + Handoff |
| T004 | **Lucas** | ⏳ WAITING | Validar extensión brain |
| T005 | @scrum | ⚪ IDLE | Registrar épica |

---

*Acta generada por @aleph — Turno 3 (Nexo + Handoff) de sesión DRAMATURGIA-MAQUINA*

---

## ANEXO: Trabajo en Paralelo (T004a / T004b)

> **Trigger**: @ox contactó durante redacción de T003. Propone paralelizar.

### Hilos Paralelos Autorizados

| Hilo | Agentes | Objetivo | Entregable |
|------|---------|----------|------------|
| **T004a** | Lucas + @scrum | Batallar backlog → nivel task | Stories con tasks desglosadas |
| **T004b** | @ox + @plugin_ox_teatro | Validar `itaca-digital.yaml` + mcpPacks | Verificación técnica de la obra |

### Justificación

El protocolo de cotrabajo permite trabajo paralelo cuando:
- Los hilos son **independientes** (no se pisan)
- Ambos reportan al **mismo tablero**
- El orquestador (@aleph) **autoriza** la bifurcación

### Handoffs

**→ T004a (Lucas + @scrum)**:
- Input: UC-SENSOR-01 + épica 13 pts de T002
- Output: `02_ACTAS/T004a_lucas-scrum_backlog-tasks.md`

**→ T004b (@ox + @plugin_ox_teatro)**:
- Input: `itaca-digital.yaml` + AgentPrologBrain.pack.json
- Output: `02_ACTAS/T004b_ox-teatro_validacion-obra.md`

### Sincronización

Ambos hilos convergen en **T005** (@scrum → registro final de épica).
