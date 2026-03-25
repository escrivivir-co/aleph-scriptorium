---
layout: default
title: Vista Dramaturgo
description: Wireframe del screen para dramaturgos que operan el ciclo Sensor/Actuador
permalink: /teatro/dramaturgo-view/
---

# Vista Dramaturgo — Wireframe

> **Épica**: DRAMATURGIA-MAQUINA-1.0.0  
> **Story**: S04 (3 pts)  
> **Versión**: 1.0.0

---

## Concepto

La **Vista Dramaturgo** es el screen principal para operar el modelo "Scriptorium como Máquina". Permite visualizar y controlar el ciclo Sensor → Cerebro → Actuador en tiempo real.

---

## Layout: 3 Columnas

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           VISTA DRAMATURGO                                  │
│                     Obra: Ítaca Digital · Sesión: activa                    │
├───────────────────────┬───────────────────────┬─────────────────────────────┤
│                       │                       │                             │
│   🔵 SENSOR           │   🧠 CEREBRO          │   🟢 ACTUADOR               │
│   (Aferencia)         │   (Procesamiento)     │   (Eferencia)               │
│                       │                       │                             │
│ ┌───────────────────┐ │ ┌───────────────────┐ │ ┌─────────────────────────┐ │
│ │ Estado Actual     │ │ │ Brain Activo      │ │ │ Notificaciones          │ │
│ │ ════════════════  │ │ │ ════════════════  │ │ │ ═════════════════════   │ │
│ │ ● OPERATIVO       │ │ │ lucas-prolog      │ │ │ 17:30 → penelope        │ │
│ │                   │ │ │ .brain.pl         │ │ │ "Estado: parado"        │ │
│ │ Último cambio:    │ │ │                   │ │ │                         │ │
│ │ 17:35 por @ox     │ │ │ Predicados:       │ │ │ 17:30 → orfeo           │ │
│ └───────────────────┘ │ │ · recibir_senal/2 │ │ │ "Estado: parado"        │ │
│                       │ │ · procesar_cambio │ │ │                         │ │
│ ┌───────────────────┐ │ │ · notificar/2     │ │ │ 17:35 → viajero         │ │
│ │ Log de Señales    │ │ │ · verificar_dry   │ │ │ "Estado: operativo"     │ │
│ │ ════════════════  │ │ └───────────────────┘ │ └─────────────────────────┘ │
│ │ 17:35 ox:operativo│ │                       │                             │
│ │ 17:30 ox:parado   │ │ ┌───────────────────┐ │ ┌─────────────────────────┐ │
│ │ 17:25 ox:operativo│ │ │ DRY Check         │ │ │ Suscriptores            │ │
│ │ 17:20 indice:ok   │ │ │ ════════════════  │ │ │ ═════════════════════   │ │
│ └───────────────────┘ │ │ ✅ Coherencia OK  │ │ │ ☑ penelope              │ │
│                       │ │                   │ │ │ ☑ orfeo                 │ │
│ ┌───────────────────┐ │ │ Último check:     │ │ │ ☑ viajero               │ │
│ │ Simular Señal     │ │ │ 17:35:00          │ │ │ ☐ ulises (offline)      │ │
│ │ ════════════════  │ │ │                   │ │ └─────────────────────────┘ │
│ │ Agente: [ox    ▼] │ │ │ Duplicados: 0     │ │                             │ │
│ │ Estado: [______▼] │ │ │ Índices: sync     │ │ ┌─────────────────────────┐ │
│ │ [Enviar Señal]    │ │ └───────────────────┘ │ │ Enviar Manual           │ │
│ └───────────────────┘ │                       │ │ ═════════════════════   │ │
│                       │ ┌───────────────────┐ │ │ A: [penelope  ▼]        │ │
│                       │ │ Query Prolog      │ │ │ Msg: [______________]   │ │
│                       │ │ ════════════════  │ │ │ [Notificar]             │ │
│                       │ │ ?- estado_actual  │ │ └─────────────────────────┘ │
│                       │ │    (X).           │ │                             │
│                       │ │ [Ejecutar]        │ │                             │
│                       │ └───────────────────┘ │                             │
│                       │                       │                             │
├───────────────────────┴───────────────────────┴─────────────────────────────┤
│ 📊 Métricas: Señales hoy: 47 │ Notificaciones: 142 │ DRY checks: 23 (100% ✅)│
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## T04.1: Layout 3 Columnas

| Columna | Ancho | Función | Color |
|---------|-------|---------|-------|
| **Sensor** | 30% | Aferencia: recibir señales | 🔵 Azul |
| **Cerebro** | 35% | Procesamiento: brain Prolog + DRY | 🧠 Púrpura |
| **Actuador** | 35% | Eferencia: notificar elenco | 🟢 Verde |

---

## T04.2: Widgets por Columna

### Columna SENSOR (Aferencia)

| Widget | Tipo | Datos |
|--------|------|-------|
| **Estado Actual** | Badge + timestamp | `estado_actual/1` |
| **Log de Señales** | Lista scrollable | `sensor_log/3` |
| **Simular Señal** | Form (dropdown + input) | Dispara `recibir_senal/2` |

### Columna CEREBRO (Procesamiento)

| Widget | Tipo | Datos |
|--------|------|-------|
| **Brain Activo** | Card con lista predicados | Archivo .brain.pl cargado |
| **DRY Check** | Status card | `verificar_coherencia_antes/0` |
| **Query Prolog** | Text input + botón | MCP `prolog_query` |

### Columna ACTUADOR (Eferencia)

| Widget | Tipo | Datos |
|--------|------|-------|
| **Notificaciones** | Timeline scrollable | `notificacion_log/3` |
| **Suscriptores** | Checklist | `suscriptor/1` |
| **Enviar Manual** | Form (dropdown + input) | Dispara `notificar/2` |

---

## T04.3: Integración con AsyncAPI

Los widgets se conectan a los channels definidos en `dramaturgo-signals.asyncapi.yaml`:

| Widget | Channel MQTT | Operación |
|--------|--------------|-----------|
| Log de Señales | `scriptorium/sensor/{agente}` | subscribe |
| Simular Señal | `scriptorium/sensor/{agente}` | publish |
| Notificaciones | `scriptorium/notificacion/{personaje}` | subscribe |
| DRY Check | `scriptorium/alerta/dry` | subscribe |

---

## Flujo de Datos

```
┌─────────────┐     MQTT      ┌─────────────┐     Prolog    ┌─────────────┐
│  Widget     │ ────────────▶ │  Backend    │ ────────────▶ │  MCP        │
│  Simular    │               │  Express    │               │  Prolog     │
└─────────────┘               └─────────────┘               └─────────────┘
                                    │
                                    │ WebSocket
                                    ▼
                              ┌─────────────┐
                              │  Frontend   │
                              │  Angular    │
                              └─────────────┘
```

---

## Responsive

| Breakpoint | Layout |
|------------|--------|
| Desktop (≥1200px) | 3 columnas |
| Tablet (768-1199px) | 2 columnas (Sensor+Cerebro / Actuador) |
| Mobile (<768px) | 1 columna (tabs) |

---

## Próximos Pasos

1. [ ] Implementar componentes Angular
2. [ ] Conectar a backend MQTT
3. [ ] Integrar con MCPPrologServer
4. [ ] Añadir persistencia de logs

---

## Referencias

- **Spec AsyncAPI**: [dramaturgo-signals.asyncapi.yaml](../../ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/dramaturgo-signals.asyncapi.yaml)
- **Brain Prolog**: [lucas-prolog.brain.pl](../../ARCHIVO/DISCO/TALLER/ELENCO/lucas/lucas-prolog.brain.pl)
- **Obra Teatro**: [itaca-digital.yaml](../../ARCHIVO/PLUGINS/TEATRO/obras/itaca-digital.yaml)
- **Blueprint**: [/blueprint/#machine](/blueprint/#machine)

---

*Wireframe v1.0.0 — DRAMATURGIA-MAQUINA-1.0.0 — S04*
