---
mode: 'agent'
description: 'Opera una FIA: ciclos de percepción-razonamiento-acción'
---

# Operar FIA

## Objetivo

Ejecutar el ciclo cognitivo de una FIA: Percepción → Razonamiento → Acción.

## Pre-requisitos

1. Sesión AAIA activa con FIAs cargadas
2. Conocer el `sessionId` y `fiaIndex` a operar

## Ciclo Cognitivo

```
┌─────────────────────────────────────────────────────────────────┐
│                   CICLO FIA                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. PERCEPCIÓN (Aferencia)                                      │
│     └── aaia_send_percepto({ sessionId, percepto })             │
│                    │                                            │
│                    ▼                                            │
│  2. RAZONAMIENTO (Proceso)                                      │
│     └── aaia_step_fia({ sessionId, fiaIndex })                  │
│                    │                                            │
│                    ▼                                            │
│  3. ACCIÓN (Eferencia)                                          │
│     └── aaia_get_eferencia({ sessionId, fiaIndex })             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Paso 1: Enviar Percepto

```typescript
// Estímulo del entorno
const percepto = {
  tipo: "sensor",
  fuente: "luz",
  payload: { valor: "on", intensidad: 0.8 }
};

await aaia_send_percepto({
  sessionId: "${sessionId}",
  percepto
});
```

## Paso 2: Ejecutar Razonamiento

```typescript
// Un paso de razonamiento
const result = await aaia_step_fia({
  sessionId: "${sessionId}",
  fiaIndex: 0
});

// Resultado
{
  success: true,
  runState: "PLAY",
  cycles: 1,
  eferencia: {
    tipo: "accion",
    payload: { motor: "start" }
  }
}
```

## Paso 3: Obtener Acción

```typescript
// Si necesitas solo la eferencia
const eferencia = await aaia_get_eferencia({
  sessionId: "${sessionId}",
  fiaIndex: 0
});
```

## Ciclo Continuo

Para operación continua:

```typescript
// Ciclo de N iteraciones
for (let i = 0; i < N; i++) {
  // 1. Percepto (si hay nuevo estímulo)
  if (hayNuevoEstimulo()) {
    await aaia_send_percepto({ sessionId, percepto });
  }
  
  // 2. Step
  const result = await aaia_step_fia({ sessionId, fiaIndex: 0 });
  
  // 3. Procesar eferencia
  if (result.eferencia) {
    procesarAccion(result.eferencia);
  }
  
  // 4. Delay (opcional)
  await delay(100);
}
```

## Paradigmas y Comportamiento

| Paradigma | Razonamiento | Eferencia típica |
|-----------|--------------|------------------|
| `logica` | Query Prolog | Hechos/reglas derivadas |
| `sbr` | Evaluar reglas | Acciones disparadas |
| `situada` | Sensor → actuador | Comandos IoT |
| `conexionista` | Forward pass | Predicción numérica |

## Integración Prolog

Si la FIA es de paradigma `logica`:

```prolog
% El step ejecuta internamente:
?- razonar(Percepto, Accion).
Percepto = sensor(luz, on),
Accion = actuador(motor, start).
```

## Resultado

La FIA ha completado un ciclo cognitivo. Repetir según necesidad.

## Siguiente

- Consultar mundo: `aaia_query_mundo`
- Detener FIA: `aaia_stop_fia`
- Destruir sesión: `aaia_destroy_session`
