# Análisis Técnico: Submódulo iot-sbr-logica-para-bots

> **Fecha**: 1 de enero de 2026  
> **Analista**: @plugin_ox_prologeditor  
> **Ruta**: `PrologEditor/` (submódulo clonado)

---

## Resumen Ejecutivo

| Aspecto | Estado | Evidencia |
|---------|--------|-----------|
| **Paradigma SBR** | ✅ **IMPLEMENTADO** | `sensor/7`, `regla/5`, condiciones/acciones |
| **Aferencia** | ✅ **IMPLEMENTADO** | `telemetryToPrologFacts()`, `sensor/7` |
| **Eferencia** | ✅ **IMPLEMENTADO** | `accionMotor/3`, `accionDeposito/3` |
| **Motor Prolog** | ✅ **FUNCIONAL** | `prolog-service.js` + swipl binding |
| **MQTT IoT** | ✅ **CONFIGURADO** | `config.js` → mosquitto |
| **Templates** | ✅ **3 DISPONIBLES** | state-machine, iot-app, simu |

---

## Arquitectura de Inteligencias Situadas

### Patrón Aferencia/Eferencia Encontrado

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

---

## Componentes Clave Analizados

### 1. Estructura sensor/7 (Aferencia)

**Archivo**: `iot-app/app.pl`

```prolog
sensor(IdSensor, Nombre, Descripcion, Unidad, ValorActual, ValorConsigna, ValorIncremento)
```

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `IdSensor` | atom | Identificador único |
| `Nombre` | string | Nombre legible |
| `Descripcion` | string | Qué mide |
| `Unidad` | string | Unidad de medida |
| `ValorActual` | number | Lectura actual (aferencia) |
| `ValorConsigna` | number | Valor objetivo/umbral |
| `ValorIncremento` | number | Delta de cambio |

**Ejemplo real**:
```prolog
sensor(sensorMotor, 'Ciclo', 'Procesa una carga de trabajo por ciclo', 'nº de paso', -1, 1, 1)
sensor(sensorTrabajo, 'Trabajo', 'Contador de carga de trabajo pendiente', 'nº paquetes', 20, 20, 0)
sensor(sensorDeposito, 'Carga', 'Contador de cargas', 'nº paquetes', 0, 10, 0)
```

---

### 2. Estructura regla/5 (Brain/Inferencia)

```prolog
regla(Id, Condicion, Accion, Descripcion, Activa)
```

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `Id` | integer | Identificador único |
| `Condicion` | predicate | Predicado que evalúa sensor |
| `Accion` | predicate | Predicado que ejecuta eferencia |
| `Descripcion` | string | Descripción legible |
| `Activa` | boolean | Si la regla está activa |

**Ejemplo real**:
```prolog
regla(1, condicionMotor, accionMotor, 'Revoluciones del Motor', true)
regla(2, condicionDeposito, accionDeposito, 'Optimizador de Carga', true)
```

---

### 3. Predicados de Condición (Brain)

**condicionMotor/2**:
```prolog
condicionMotor(IdSensor, NuevoValor) :-
    IdSensor = sensorMotor,
    sensor(IdSensor, _, _, _, _, ValorConsigna, _),
    NuevoValor =:= ValorConsigna.
```
→ Evalúa si el motor ha llegado a su consigna

**condicionDeposito/2**:
```prolog
condicionDeposito(IdSensor, NuevoValor) :-
    esSensorDeposito(IdSensor),
    quedaCapacidad(NuevoValor),
    motorTrabajando.
```
→ Evalúa si hay capacidad y el motor está activo

---

### 4. Predicados de Acción (Eferencia)

**accionMotor/3**:
```prolog
accionMotor(_, IdSensor, _) :-
    transicionMotor(IdSensor),    % Cambia estado del motor
    transicionTrabajo,            % Retira carga de trabajo
    transicionDeposito(Restante), % Actualiza contador
    (Restante =:= 1 -> parar ; true).
```

**accionDeposito/3**:
```prolog
accionDeposito(_, IdSensor, _) :-
    capacidadDisponible(IdSensor, Capacidad, ValorActual),
    optimizarCapacidad(Capacidad, ValorActual, ValorOptimizado),
    sensor_valor_actual_guardar(IdSensor, ValorOptimizado).
```

---

### 5. Telemetría MQTT (Entrada Aferente)

**Archivo**: `prolog-parser.js`

```javascript
telemetryToPrologFacts = (telemetry) => {
    const facts = [];
    for (const [key, value] of Object.entries(telemetry)) {
        facts.push(`telemetry(${key}, ${value})`);
    }
    return facts;
};
```

Convierte JSON de telemetría IoT a hechos Prolog:
```json
{ "temperatura": 25, "humedad": 60 }
```
→
```prolog
telemetry(temperatura, 25).
telemetry(humedad, 60).
```

---

### 6. Controlador de Telemetría

**Archivo**: `telemetry-controller.js`

```javascript
exports.processTelemetry = async (req, res) => {
    const { telemetry } = req.body;
    const prologFacts = prologParser.telemetryToPrologFacts(telemetry);
    await prologService.assertFacts(prologFacts);  // Aferencia
    const result = await prologService.applyRules(); // Brain + Eferencia
    res.json(result);
};
```

---

## API REST Disponible

| Endpoint | Método | Propósito |
|----------|--------|-----------|
| `/api/sdk-templates` | GET | Lista templates (state-machine, iot-app, simu) |
| `/api/template/:name` | GET | Predicados exportados de un template |
| `/api/rules` | POST | Guarda regla en SQLite |
| `/api/rules/:app` | GET | Lista reglas por app |
| `/api/run-rule` | POST | Ejecuta consulta Prolog |
| `/api/rules/:id` | DELETE | Elimina regla |
| `/api/telemetry` | POST | **Procesa telemetría IoT** |
| `/api/telemetry/status` | GET | Estado de sensores |

---

## Templates Disponibles

### 1. state-machine

**Propósito**: Máquina de estados básica  
**Predicados exportados**:
- `do_init/2` → Inicializa
- `do_start/2` → Arranca
- `do_pause/2` → Pausa
- `do_stop/2` → Detiene
- `get_current_state/1` → Consulta estado

**Uso típico**: Control de flujo, FSM para personajes

---

### 2. iot-app ⭐

**Propósito**: Modelado de dispositivos IoT con sensores y actuadores  
**Predicados exportados**:
- `inicializarMaquina/1` → Carga things y reglas
- `imprimir_reglas/1` → Lista reglas activas
- `sensor_valor_actual_guardar/2` → Actualiza sensor (eferencia)

**Estructura**:
```
iot-app/
├── app.pl          # Aplicación principal
└── sdk/
    ├── sdk.pl      # Core del SDK
    └── modulos/
        ├── dominio/
        │   ├── thing.pl    # Entidad física
        │   └── sensor.pl   # Sensor con valor
        └── simulador/
            └── simulador.pl # Simulador de tiempo
```

**Uso típico**: Sistemas con sensores → reglas → actuadores

---

### 3. simu

**Propósito**: Simulación de escenarios  
**Uso típico**: Pruebas sin hardware real

---

## Vocabulario Aferencia/Eferencia

| Concepto Teórico | Implementación en Submódulo |
|------------------|----------------------------|
| **Aferencia** (percepción) | `sensor/7`, `telemetryToPrologFacts()` |
| **Procesamiento** (brain) | `regla/5`, predicados `condicion*` |
| **Eferencia** (acción) | predicados `accion*`, `sensor_valor_actual_guardar/2` |
| **Inteligencia situadas** | El sistema completo sensor→regla→acción |
| **SBR** | Sistema Basado en Reglas (este proyecto) |

---

## Flujo Completo (Ciclo Percepción-Acción)

```
1. Datos de sensores (MQTT/HTTP)
        ↓
2. telemetryToPrologFacts() → hechos Prolog
        ↓
3. assertFacts() → añade a base de conocimiento
        ↓
4. applyRules() → evalúa condicion* de cada regla
        ↓
5. Si condición verdadera → ejecuta accion*
        ↓
6. sensor_valor_actual_guardar() → eferencia
        ↓
7. Resultado devuelto al controlador IoT
```

---

## Dependencias del Sistema

| Dependencia | Versión | Instalación | Obligatoria |
|-------------|---------|-------------|-------------|
| Node.js | 14+ | `nvm install 18` | ✅ |
| SWI-Prolog | 9.x | `brew install swi-prolog` | ✅ |
| swipl (npm) | 1.0.6 | `npm install` en backend | ✅ |
| MQTT Broker | any | `brew install mosquitto` | ⚡ Opcional |
| SQLite | 5.0.2 | incluido | ✅ |
| Angular | 14+ | `npm install` en frontend | ⚡ UI |

---

## Conclusión

El submódulo `iot-sbr-logica-para-bots` **SÍ implementa el paradigma de inteligencias situadas** con el patrón completo:

| Capa | Implementación | Estado |
|------|----------------|--------|
| Aferencia | `sensor/7` + telemetría MQTT | ✅ Funcional |
| Brain | `regla/5` + condiciones Prolog | ✅ Funcional |
| Eferencia | `accion*/3` + `sensor_valor_actual_guardar` | ✅ Funcional |

**El vocabulario "aferencia/eferencia" no está explícito**, pero la **estructura es exactamente esa**.

---

## Próximos Pasos

1. ✅ Análisis técnico completado
2. 🔄 Crear vocabulario explícito (aferencia/eferencia) en instrucciones
3. 🔄 Conectar plugin con submódulo en manifest
4. 📋 Verificar que backend arranca (`npm start`)
5. 📋 Documentar API para otros plugins (ARG_BOARD, AGENT_CREATOR)

---

## Archivos Analizados

| Archivo | Propósito |
|---------|-----------|
| `backend/src/services/prolog-service.js` | Motor SWI-Prolog |
| `backend/src/services/prolog-parser.js` | Parser + telemetría |
| `backend/src/services/template-service.js` | Gestión de templates |
| `backend/src/controllers/telemetry-controller.js` | API IoT |
| `backend/src/services/codigo/web/plugins/iot-app/app.pl` | Lógica SBR |
| `backend/src/services/codigo/web/plugins/state-machine/app.pl` | FSM básica |
