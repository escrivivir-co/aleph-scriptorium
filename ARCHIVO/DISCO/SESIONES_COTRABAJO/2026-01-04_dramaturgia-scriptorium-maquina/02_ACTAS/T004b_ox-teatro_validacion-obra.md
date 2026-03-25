# T004b — @ox + @plugin_ox_teatro: Validación itaca-digital.yaml

> **Turno**: 4b (paralelo a T004a)  
> **Agentes**: @ox (técnico), @plugin_ox_teatro (dominio)  
> **Timestamp**: 2026-01-04T15:XX:XX

---

## 1. Verificación Realizada

| Aspecto | Estado | Evidencia |
|---------|--------|-----------|
| Estructura YAML | ✅ OK | 12 estadios monomito completos |
| personaje_guia | ⚠️ REVISAR | Declarado `penelope`, pero Lucas es MENTOR |
| elenco | ✅ OK | Lucas declarado con arquetipo MENTOR |
| mcpPacks | ✅ OK | AgentPrologBrain v1.0.0 declarado |
| brain.pl | ✅ OK | Apunta a `lucas-prolog.brain.pl` |
| sessionConfig | ✅ OK | sessionId + autoConsult definidos |

---

## 2. Hallazgos Clave

### 2.1 mcpPacks YA Existe

```yaml
mcpPacks:
  - id: AgentPrologBrain
    version: "1.0.0"
    sessionConfig:
      sessionId: "itaca-digital-session"
      autoConsult:
        - "ARCHIVO/DISCO/TALLER/ELENCO/lucas/lucas-prolog.brain.pl"
```

**Validación**: ✅ La estructura coincide con el esquema propuesto en T003. Solo necesita upgrade a v3.0.0 para alinearse con `AgentPrologBrain.pack.json` actual.

### 2.2 Lucas como MENTOR (no personaje_guia)

```yaml
personaje_guia: penelope  # ← Actual

elenco:
  - id: lucas
    arquetipo: MENTOR
    estadio: 11  # Resurrección
```

**Análisis**: La obra tiene a Penélope como guía principal (meta-narrador del monomito), mientras Lucas opera en estadio 11 como MENTOR técnico. Esto es **coherente dramáticamente**:

- Penélope = guía narrativa (el hilo que teje/desteje)
- Lucas = mentor técnico (valida coherencia documental)

**Propuesta**: Mantener estructura actual. Lucas interviene cuando el sensor detecta problemas.

### 2.3 Integración Sensor/Actuator

Para implementar UC-SENSOR-01 (Ox detecta "parado" → Lucas anuncia), necesitamos extender:

#### A. En lucas-prolog.brain.pl (extensión propuesta en T003)

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

#### B. En mcpPacks (upgrade)

```yaml
mcpPacks:
  - id: AgentPrologBrain
    version: "3.0.0"  # ← Upgrade
    sessionConfig:
      sessionId: "itaca-digital-session"
      autoConsult:
        - "ARCHIVO/DISCO/TALLER/ELENCO/lucas/lucas-prolog.brain.pl"
    sensorConfig:  # ← NUEVO
      enableOxBridge: true
      pollingInterval: 5000
```

---

## 3. Compatibilidad con Esquema Teatro

| Campo Requerido | Presente | Válido |
|-----------------|----------|--------|
| id | ✅ | `itaca-digital` |
| titulo | ✅ | válido |
| tipo | ✅ | `narrativa` |
| personaje_guia | ✅ | `penelope` |
| estadios[12] | ✅ | completos |
| meta | ✅ | duracion, nivel, tags |

**Campos Opcionales Usados**:
- `elenco`: ✅ Lucas declarado
- `mcpPacks`: ✅ AgentPrologBrain declarado

---

## 4. Propuesta de Actualización

### 4.1 Cambios Mínimos (MVP)

```yaml
# Solo upgrade de versión
mcpPacks:
  - id: AgentPrologBrain
    version: "3.0.0"  # ← De 1.0.0 a 3.0.0
```

### 4.2 Cambios Completos (Feature UC-SENSOR-01)

```yaml
mcpPacks:
  - id: AgentPrologBrain
    version: "3.0.0"
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

---

## 5. Validación Técnica

| Requisito T003 | Estado |
|----------------|--------|
| Obra declara mcpPacks | ✅ YA EXISTE |
| Lucas es personaje con brain | ✅ YA EXISTE |
| brain.pl extensible para sensor/actuator | ✅ PROPUESTO |
| Compatibilidad con AgentPrologBrain v3.0.0 | ⚠️ REQUIERE UPGRADE |

---

## 6. Sign-Off Técnico

**@ox verifica**:
- [x] itaca-digital.yaml es válido según esquema Teatro
- [x] mcpPacks puede añadirse/actualizarse
- [x] Lucas puede actuar como MENTOR + Actuator
- [x] Extensión de brain.pl es factible

**@plugin_ox_teatro confirma**:
- [x] Obra sigue los 12 estadios del monomito
- [x] personaje_guia coherente con narrativa
- [x] elenco extensible para más personajes

---

## 7. Siguiente Paso

→ **Convergencia con T004a**: Esperar que Lucas + @scrum completen las tasks del backlog.

→ **T005**: @scrum registra épica DRAMATURGIA-MAQUINA-1.0.0 con:
- Story 1: Upgrade mcpPacks a v3.0.0
- Story 2: Extender lucas-prolog.brain.pl con sensor/actuator
- Story 3: Implementar UC-SENSOR-01 completo
- Story 4: Integrar con ARG_BOARD para visualización

---

**Estado**: ✅ DONE  
**Handoff**: Esperar T004a → T005
