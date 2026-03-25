# Acta T002: Spike Profundo — Tríada @ox/@indice/@scrum

> **Agentes**: @ox (Auditoría) + @indice (Navegación) + @scrum (Tracking)  
> **Fecha**: 2026-01-04  
> **Estado**: ✅ DONE  
> **Trigger**: Devolución PO (T001b) — Gaps detectados

---

## Resumen Ejecutivo

El PO devolvió T001 identificando **3 gaps críticos**. La tríada ejecutó spike profundo para recuperar premisas y conectar hilos.

| Gap | Estado | Hallazgo Principal |
|-----|--------|-------------------|
| TypedPrompting | ✅ RESUELTO | Context Manager + Packs ya especificados (SCRIPT-2.1.0/2.3.0) |
| MCPPresets | ✅ RESUELTO | AgentPrologBrain.pack.json v3.0.0 ya existe |
| Eferencia/Aferencia | ✅ RESUELTO | Implementación completa en IOT-SBR-LOGICA |

---

## 1. Gap TypedPrompting — Hallazgos @indice

### Fuente Consultada

`BACKLOG_BORRADORES/Diciembre_29_TypedPrompting_ContextManager/01_backlog-borrador.md`

### Premisas Clave Recuperadas

| Épica | Nombre | Estado | Owner |
|-------|--------|--------|-------|
| SCRIPT-2.1.0 | Context Manager Core | ⏳ Pendiente | @indice |
| SCRIPT-2.3.0 | Context Packs System | ⏳ Pendiente | @ox |
| SCRIPT-2.2.4 | MCP Integration | ⏳ Parcial (T018, T024-T030 ✅) | Lucas |

### Conexión con Dramaturgia

```
TypedPrompting → Context Packs → MCPPresets → Teatro
     │                               │
     └── foco-activo.schema.json    └── AgentPrologBrain.pack.json
              │                               │
              └── reduce tokens 60%          └── empaqueta tools Prolog
```

**Premisa clave del PO** (cita):
> "Carga dinámica de instrucciones según foco del usuario, coordinada por @indice, @ox y @aleph."

### Implicación para el Dramaturgo

El **dramatugo** puede definir un **foco** (ej: "editar obra con Prolog") y el sistema carga SOLO las instrucciones relevantes:
- `teatro-interactivo.instructions.md` ✅
- `prolog-editor.instructions.md` ✅
- `mcp-presets.instructions.md` ✅
- (descarta 16 instrucciones irrelevantes)

---

## 2. Gap MCPPresets — Hallazgos @ox

### Fuente Consultada

`.github/plugins/mcp-presets/packs/AgentPrologBrain.pack.json`

### Pack Ya Existe (v3.0.0)

```json
{
  "id": "AgentPrologBrain",
  "version": "3.0.0",
  "description": "Pack completo para agentes con razonamiento Prolog",
  "mcpServer": {
    "id": "prolog-mcp-server",
    "port": 3006
  },
  "tools": [ /* 12 tools */ ],
  "resources": [ /* 6 resources */ ],
  "prompts": [ /* 8 prompts */ ]
}
```

### 12 Tools del Pack

| Tool | Descripción |
|------|-------------|
| `prolog_create_session` | Crear sesión para obra Teatro |
| `prolog_query` | Ejecutar consulta Prolog |
| `prolog_assert_fact` | Añadir hecho a KB |
| `prolog_consult_file` | Cargar archivo .pl |
| `prolog_destroy_session` | Liberar recursos |
| `prolog_list_sessions` | Listar sesiones activas |
| `prolog_get_templates` | Catálogo de templates |
| `prolog_load_rules_from_db` | Cargar de SQLite |
| `prolog_save_rule_to_db` | Persistir regla |
| `prolog_retract_fact` | Eliminar hecho |
| `prolog_list_facts` | Listar hechos de predicado |
| `prolog_get_brain_metadata` | Metadatos del cerebro |

### Estructura de un Preset para Máquina Sensor/Actuador

**Propuesta** basada en schema existente:

```json
{
  "id": "MaquinaSensorActuador",
  "name": "Preset Scriptorium como Máquina",
  "mcpServer": "prolog-mcp-server",
  "tools": ["prolog_query", "prolog_assert_fact"],
  "resources": ["prolog://knowledge_base", "prolog://session_metadata"],
  "prompts": ["razonamiento_sensor_actuador"]
}
```

---

## 3. Gap Eferencia/Aferencia — Hallazgos @ox

### Fuentes Consultadas

- `IOT-SBR-LOGICA/01_transcripcion-po-session.md` (202 líneas)
- `IOT-SBR-LOGICA/02_analisis-submodulo.md` (329 líneas)

### Cita del PO (Premisa Vital)

> *"El hilo en el que pido eferencia/aferencia es vital porque es casi medio feature"*

### Patrón Implementado — Diagrama Completo

```
┌─────────────────────────────────────────────────────────────────┐
│                    PARADIGMA SBR (IoT-App)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   AFERENCIA                  BRAIN                 EFERENCIA    │
│   (Sensores)               (Reglas)              (Actuadores)   │
│                                                                 │
│  ┌──────────────┐     ┌─────────────────┐     ┌──────────────┐ │
│  │ sensor/7     │ ──▶ │ regla/5         │ ──▶ │ accion*/3    │ │
│  │              │     │ condicion→accion│     │              │ │
│  │ - sensorMotor│     ├─────────────────┤     │ - accionMotor│ │
│  │ - sensorTrabajo    │ condicionMotor  │     │ - accionDepo.│ │
│  │ - sensorDeposito   │ condicionDeposito     └──────────────┘ │
│  └──────────────┘     └─────────────────┘                       │
│                                                                 │
│  telemetryToPrologFacts()              sensor_valor_actual_guardar/2
│  (entrada desde MQTT)                  (salida a actuadores)    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Vocabulario Teórico ↔ Implementación

| Concepto | Definición | Implementación |
|----------|------------|----------------|
| **Aferencia** | Señal entrante (percepción) | `sensor/7`, `telemetryToPrologFacts()` |
| **Procesamiento** | Cerebro (inferencia) | `regla/5`, predicados `condicion*` |
| **Eferencia** | Señal saliente (acción) | predicados `accion*`, `sensor_valor_actual_guardar/2` |
| **Inteligencia situadas** | Agente con contexto local | Sistema completo sensor→regla→acción |
| **SBR** | Sistema Basado en Reglas | El proyecto completo |

### Predicados Prolog Clave

**Aferencia** — `sensor/7`:
```prolog
sensor(IdSensor, Nombre, Descripcion, Unidad, ValorActual, ValorConsigna, ValorIncremento)
```

**Brain** — `regla/5`:
```prolog
regla(Id, Condicion, Accion, Descripcion, Activa)
```

**Eferencia** — `accion*/3`:
```prolog
accionMotor(_, IdSensor, _) :-
    transicionMotor(IdSensor),
    transicionTrabajo,
    transicionDeposito(Restante),
    (Restante =:= 1 -> parar ; true).
```

---

## 4. Borradores Relacionados — Hallazgos @scrum

### Borradores No Mencionados en T001

| Carpeta | Contenido | Relevancia |
|---------|-----------|------------|
| `Enero_2026_LogicaAgentes/` | HOJA_RUTA.md + features 1 y 2 | 🔴 ALTA |
| `Diciembre_31_Test_0x_Destilacion/` | Blueprint agéntico | 🔴 ALTA |
| `Enero_02_PrologAgentPack/` | TEATRO-PROLOG-1.0.0 completado | ✅ Ya mencionado |

### Conversación Clave Recuperada

**Archivo**: `Enero_2026_LogicaAgentes/HOJA_RUTA.md`

El PO ya describió las piezas del puzzle:
- a) PrologEditor/frontend para editar "Mundos, reglas,..."
- b) Import/export como AgentPrologBrain.pack.json
- c) MCPPrologServer para runtime MCP
- d) TypedPrompting para crear packs de MCPPresets
- e) Ejemplo con Lucas en "Ítaca Digital"

**Estado**: Todo existe excepto la **conexión visible para el dramaturgo**.

---

## 5. Mapa de Dependencias @indice

### Flujo Completo del Ciclo Dramaturgo

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        CICLO DEL DRAMATURGO (v2)                        │
│                                                                         │
│  1. DEFINIR FOCO                                                        │
│     └── TypedPrompting → foco-activo.schema.json                       │
│                                                                         │
│  2. EDITAR LÓGICA                                                       │
│     └── PrologEditor/frontend → brain.pl + sensor/7 + regla/5          │
│                                                                         │
│  3. EMPAQUETAR                                                          │
│     └── MCPPresets → AgentPrologBrain.pack.json                        │
│                                                                         │
│  4. ASIGNAR A PERSONAJE                                                 │
│     └── AgentCreator → lucas.agent.md + mcpPacks: [AgentPrologBrain]   │
│                                                                         │
│  5. INSTALAR EN OBRA                                                    │
│     └── Teatro → itaca-digital.yaml + mcpPacks declaration             │
│                                                                         │
│  6. EJECUTAR EN ESCENA                                                  │
│     └── ARG_BOARD (Arrakis) → MCPPrologServer carga KB                 │
│                                                                         │
│  7. CICLO SENSOR/ACTUADOR                                               │
│     └── Aferencia → Brain → Eferencia                                  │
│     └── Ox detecta "parado" → Lucas anuncia a personajes               │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Componentes Existentes vs Faltantes

| Componente | Estado | Ubicación |
|------------|--------|-----------|
| TypedPrompting plugin | ✅ Existe | `.github/plugins/typed-prompting/` |
| Context Packs schema | ⚠️ Especificado, no implementado | `context-packs.json` (T012-T013) |
| PrologEditor frontend | ✅ Existe | `PrologEditor/frontend/` |
| AgentPrologBrain.pack | ✅ v3.0.0 | `mcp-presets/packs/` |
| lucas.agent.md | ✅ Existe | `ARCHIVO/DISCO/TALLER/ELENCO/lucas/` |
| lucas.brain.pl | ✅ Existe | Junto al agente |
| itaca-digital.yaml | ✅ Existe | `ARCHIVO/PLUGINS/TEATRO/obras/` |
| MCPPrologServer | ✅ Puerto 3006 | `MCPGallery/mcp-mesh-sdk/src/` |
| **Screen Dramaturgo** | ❌ FALTA | Vista unificada sensor/brain/actuador |

---

## 6. Propuesta de Épica Revisada

### Nombre Sugerido

**DRAMATURGIA-MAQUINA-1.0.0**: Screen del Dramaturgo + Ciclo Sensor/Actuador

### Stories Propuestas

| Story | Descripción | Effort | Deps |
|-------|-------------|--------|------|
| S01 | Spec AsyncAPI para señales Ox→Lucas | 3 pts | — |
| S02 | Rutina Prolog `sensor(ox, parado)` → acción Lucas | 3 pts | S01 |
| S03 | Actualizar itaca-digital.yaml con mcpPacks | 2 pts | S02 |
| S04 | Wireframe "Vista Dramaturgo" | 3 pts | — |
| S05 | Documentar ciclo en blueprint | 2 pts | S01-S03 |
| **TOTAL** | | **13 pts** | |

### Entregables Esperados

| # | Entregable | Ubicación |
|---|------------|-----------|
| 1 | `dramaturgo-signals.asyncapi.yaml` | `OPENASYNCAPI_EDITOR/specs/` |
| 2 | `sensor-actuador.brain.pl` | `PrologEditor/brain-templates/` |
| 3 | `itaca-digital.yaml` (actualizado) | `ARCHIVO/PLUGINS/TEATRO/obras/` |
| 4 | `dramaturgo-view.md` (wireframe) | `docs/teatro/` |
| 5 | `blueprint-dramaturgo.md` | `docs/` |

---

## 7. Próximos Turnos (Cola Actualizada)

| Turno | Agente | Objetivo |
|-------|--------|----------|
| **T003** | @plugin_ox_teatro | Validar `itaca-digital.yaml` + mcpPacks |
| **T004** | @plugin_ox_prologeditor | Crear rutina `sensor(ox, parado)` |
| **T005** | @scrum | Registrar épica DRAMATURGIA-MAQUINA-1.0.0 |

---

## 8. Conexión con Resoluciones Existentes

### Del Protocolo Scrum (R1-R4)

| Resolución | Aplicación en Este Spike |
|------------|-------------------------|
| **R1** | Auditoría Ox completada — gaps técnicos identificados |
| **R2** | Auditoría Índice completada — coherencia estructural verificada |
| **R3** | Bloqueo preventivo aplicado (devolución PO) |
| **R4** | Asamblea documentada implícitamente (cotrabajo multi-agente) |

### Del Protocolo Auto-Reflexión

| Buena Práctica | Aplicación |
|----------------|------------|
| **BP-01** | @indice consultado primero — mapa de 4 borradores |
| **BP-02** | Índices DRY estables — no modificados |
| **BP-03** | Bloqueo preventivo respetado |

---

## Referencias Consultadas

| Archivo | Líneas | Relevancia |
|---------|--------|------------|
| [01_backlog-borrador.md (TypedPrompting)](../../BACKLOG_BORRADORES/Diciembre_29_TypedPrompting_ContextManager/01_backlog-borrador.md) | 1-280 | Context Manager + Épicas |
| [01_transcripcion-po-session.md](../../BACKLOG_BORRADORES/IOT-SBR-LOGICA/01_transcripcion-po-session.md) | 1-202 | Premisas PO eferencia/aferencia |
| [02_analisis-submodulo.md](../../BACKLOG_BORRADORES/IOT-SBR-LOGICA/02_analisis-submodulo.md) | 1-329 | Patrón SBR implementado |
| [AgentPrologBrain.pack.json](../../../../.github/plugins/mcp-presets/packs/AgentPrologBrain.pack.json) | 1-100 | Pack v3.0.0 |
| [HOJA_RUTA.md](../../BACKLOG_BORRADORES/Enero_2026_LogicaAgentes/HOJA_RUTA.md) | 1-100 | Piezas del puzzle PO |
| [mcp-presets.instructions.md](../../../../.github/plugins/mcp-presets/instructions/mcp-presets.instructions.md) | 1-100 | Estructura de presets |
| [typed-prompting.instructions.md](../../../../.github/plugins/typed-prompting/instructions/typed-prompting.instructions.md) | 1-100 | Ontologías y validación |

---

*Acta generada por @ox + @indice + @scrum — Turno 2 (Spike Profundo) de sesión DRAMATURGIA-MAQUINA*
