# Acta T004a: Backlog → Tasks (Lucas + @scrum)

> **Agentes**: Lucas (MENTOR) + @scrum  
> **Fecha**: 2026-01-04  
> **Estado**: ✅ DONE  
> **Tipo**: DESGLOSE DE ÉPICA  
> **Paralelo con**: T004b (@ox + @plugin_ox_teatro)  
> **Revisión @aleph**: APROBADO

---

## Índice

1. [Presentación de Lucas](#1-presentación-de-lucas)
2. [Respuestas a Preguntas de T003](#2-respuestas-a-preguntas-de-t003)
3. [Puntos del PO](#3-puntos-del-po)
4. [Desglose de Épica](#4-desglose-de-épica)
5. [Entregables](#5-entregables)

---

## 1. Presentación de Lucas

**Identidad**: Lucas — Scrum Master del Índice, MENTOR de Ítaca Digital (estadio 11).

| Aspecto | Valor |
|---------|-------|
| **Capa** | 🔌 Plugin → AGENT_CREATOR |
| **Arquetipo** | MENTOR |
| **Cerebro** | `lucas-prolog.brain.pl` |
| **Función** | Coherencia dual Funcional/Técnico |

### Capacidades Prolog

| Predicado | Uso en sesión |
|-----------|---------------|
| `documentacion_coherente(X)` | Verificar que UC-SENSOR-01 no duplica |
| `ubicacion_canonica(Tipo, Donde)` | Decidir dónde va cada entregable |
| `consejo(Situacion, Mensaje)` | Guiar al equipo |

### Rol en UC-SENSOR-01

Soy el **Actuador** del modelo Scriptorium-como-Máquina:
- Recibo señales de @ox (sensor)
- Proceso con mi brain Prolog (cerebro SBR)
- Anuncio a personajes suscritos (eferencia)

---

## 2. Respuestas a Preguntas de T003

| # | Pregunta @aleph | Respuesta Lucas |
|---|-----------------|-----------------|
| 1 | ¿`anunciar/2` = `consejo/2` especial? | **Diferente**: `consejo` guía, `anunciar` informa. Propongo `notificar/2` con semántica broadcast. |
| 2 | ¿Suscriptores en obra o brain? | **Ambos**: Obra define quién PUEDE; brain decide quién RECIBE según contexto. |
| 3 | ¿Estado afecta `estadio_actual/2`? | **No directo**. Estadio = arco narrativo; estado = operacional. Posible `estado_impacta_estadio/2`. |
| 4 | ¿Predicados adicionales? | **Sí**: `verificar_coherencia_antes_de_anunciar/0` — No anuncio sin verificar DRY. |

---

## 3. Puntos del PO

> *Sección para registrar indicaciones del PO durante la sesión.*

### 3.1 Integración de T004b (@ox + @plugin_ox_teatro)

**Input**: Acta [T004b_ox-teatro_validacion-obra.md](T004b_ox-teatro_validacion-obra.md)

#### Hallazgos Clave de @ox

| Aspecto | Estado | Implicación para Lucas |
|---------|--------|------------------------|
| mcpPacks YA EXISTE | ✅ | Solo upgrade v1.0.0 → v3.0.0 |
| Lucas es MENTOR (no guía) | ✅ | Penélope es guía narrativa; yo soy mentor técnico |
| brain.pl extensible | ✅ | Añadir predicados sensor/actuator |
| Estructura YAML válida | ✅ | No hay bloqueos técnicos |

#### Rol de Lucas Clarificado

```
Penélope = Guía narrativa (hilo que teje/desteje el monomito)
Lucas    = Mentor técnico (valida coherencia, estadio 11)
```

**Mi intervención**: Cuando @ox (sensor) detecta problemas → yo (actuador) anuncio al elenco.

#### Propuesta de @ox para brain.pl

```prolog
%% AFERENCIA — Recibir señal de Ox
recibir_senal_ox(Estado) :-
    get_time(Timestamp),
    assertz(sensor(ox, Estado, Timestamp)),
    (estado_actual(E), E \= Estado
        -> procesar_cambio(E, Estado)
        ;  true).

%% EFERENCIA — Anunciar a personajes
anunciar(Personaje, Mensaje) :-
    format(atom(Log), "[LUCAS→~w] ~w", [Personaje, Mensaje]),
    log_accion(anunciar, Personaje, Log).
```

#### Propuesta de @ox para mcpPacks

```yaml
mcpPacks:
  - id: AgentPrologBrain
    version: "3.0.0"  # ← Upgrade
    sessionConfig:
      sessionId: "itaca-digital-session"
      autoConsult:
        - "ARCHIVO/DISCO/TALLER/ELENCO/lucas/lucas-prolog.brain.pl"
      sensorBridge:
        enabled: true
        source: "@ox"
        target: "lucas"
        events:
          - trigger: "estado_parado"
            action: "anunciar_a_elenco"
```

#### Validación Lucas

| Propuesta @ox | ¿Acepto? | Ajuste |
|---------------|----------|--------|
| `recibir_senal_ox/1` | ✅ Sí | Renombrar a `recibir_señal/2` para generalizar (no solo ox) |
| `anunciar/2` | ✅ Sí | Añadir `verificar_coherencia_antes/0` como precondición |
| Upgrade v3.0.0 | ✅ Sí | Alinea con AgentPrologBrain.pack.json |
| sensorBridge config | ⚠️ Parcial | Eventos deben venir de obra, no hardcoded |

### 3.2 (Siguiente punto del PO)

<!-- Aquí va el siguiente punto -->

---

## 4. Desglose de Épica

> **DEVOLUCIÓN @aleph**: ✅ RESUELTA — Desglose completado.

### Epic: DRAMATURGIA-MAQUINA-1.0.0 (13 pts)

**Objetivo**: Screen del Dramaturgo + Ciclo Sensor/Actuador

| Story | Pts | Tasks |
|-------|-----|-------|
| S01: Spec AsyncAPI señales | 3 | T01.1, T01.2, T01.3 |
| S02: Rutina Prolog sensor | 3 | T02.1, T02.2, T02.3 |
| S03: Actualizar itaca-digital.yaml | 2 | T03.1, T03.2 |
| S04: Wireframe Vista Dramaturgo | 3 | T04.1, T04.2, T04.3 |
| S05: Documentar ciclo en blueprint | 2 | T05.1, T05.2 |
| **TOTAL** | **13** | **13 tasks** |

---

### Tasks Desglosadas

#### S01: Spec AsyncAPI señales Ox→Lucas (3 pts)

| Task | Descripción | Owner | Entregable |
|------|-------------|-------|------------|
| T01.1 | Definir channels: `scriptorium/sensor/{agente}` | @ox | Esquema de channels |
| T01.2 | Definir messages: `SensorSignal`, `ActuatorResponse` | Lucas | Payloads JSON Schema |
| T01.3 | Compilar spec `dramaturgo-signals.asyncapi.yaml` | @plugin_ox_openasyncapieditor | `OPENASYNCAPI_EDITOR/specs/` |

**Criterio de aceptación**: Spec válida en AsyncAPI Studio

---

#### S02: Rutina Prolog sensor (3 pts)

| Task | Descripción | Owner | Entregable |
|------|-------------|-------|------------|
| T02.1 | Implementar `recibir_señal/2` generalizado | Lucas | Predicado en brain.pl |
| T02.2 | Implementar `procesar_cambio/2` con `verificar_coherencia_antes/0` | Lucas | Predicado con DRY check |
| T02.3 | Implementar `notificar/2` (variante de consejo para broadcast) | Lucas | Predicado eferencia |

**Criterio de aceptación**: `demo_sensor_actuador/0` ejecuta sin errores

---

#### S03: Actualizar itaca-digital.yaml (2 pts)

| Task | Descripción | Owner | Entregable |
|------|-------------|-------|------------|
| T03.1 | Upgrade mcpPacks v1.0.0 → v3.0.0 | @plugin_ox_teatro | YAML actualizado |
| T03.2 | Añadir sensorBridge config con eventos dinámicos | Lucas | Configuración validada |

**Criterio de aceptación**: Schema Teatro valida OK

---

#### S04: Wireframe Vista Dramaturgo (3 pts)

| Task | Descripción | Owner | Entregable |
|------|-------------|-------|------------|
| T04.1 | Diseñar layout 3-columnas: Sensor / Brain / Actuador | @aleph | Boceto markdown |
| T04.2 | Especificar widgets por columna | @indice | Lista de componentes |
| T04.3 | Mockup en `docs/teatro/dramaturgo-view.md` | @plugin_ox_ghpages | Wireframe publicable |

**Criterio de aceptación**: PO aprueba mockup

---

#### S05: Documentar ciclo en blueprint (2 pts)

| Task | Descripción | Owner | Entregable |
|------|-------------|-------|------------|
| T05.1 | Añadir sección "Scriptorium como Máquina" a blueprint existente | @scrum | `docs/blueprint.md` (sección) |
| T05.2 | Referenciar desde README principal | @ox | Link en README.md |

**Criterio de aceptación**: Blueprint renderiza en GH-Pages

---

### Matriz de Dependencias

```
S01 ──────────────┐
                  ├──▶ S05
S02 ──▶ S03 ─────┘
      
S04 (paralelo)
```

### Validación Lucas

Como Scrum Master del Índice, verifico:

| Check | Estado |
|-------|--------|
| Stories suman 13 pts | ✅ 3+3+2+3+2 = 13 |
| Tasks atómicas (<1 día) | ✅ 13 tasks |
| Owners asignados | ✅ Mixto (agentes + personajes) |
| Entregables ubicados | ✅ Todos en rutas conocidas |
| Sin duplicación con backlog global | ✅ Épica local a sesión |

| ID | Descripción | Owner | Deps |
|----|-------------|-------|------|
| T01.1 | Definir schema señal Ox→Lucas | @ox | — |
| T01.2 | Crear dramaturgo-signals.asyncapi.yaml | @plugin_ox_openasyncapieditor | T01.1 |
| ... | ... | ... | ... |
```

### Fichero Auxiliar Permitido

Si necesitan conversación extensa:
```
03_REFERENCIAS/backlog-simulado.md
```

---

## 5. Entregables

| Entregable | Estado | Ubicación |
|------------|--------|-----------|
| Acta T004a | ✅ Completado | Este archivo |
| Tasks desglosadas | ✅ 13 tasks | Sección 4 |
| Validación Lucas | ✅ Checklist aprobado | Sección 4 |

---

*Acta completada — Lucas + @scrum — T004a — Aprobado por @aleph*
