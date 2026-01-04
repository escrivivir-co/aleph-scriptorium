# Acta T001b: Devolución de Spike — Gaps de Planificación

> **Agente**: @aleph (Orquestador)  
> **Fecha**: 2026-01-04  
> **Tipo**: DEVOLUCIÓN DE SPIKE  
> **Estado**: ✅ REGISTRADO

---

## Resumen Ejecutivo

El PO ha revisado T001 y detecta que la planificación de @ox, aunque correcta en lo macro, **no aborda puntos clave** del ciclo completo. Se devuelve el spike a la tríada @ox/@indice/@scrum para investigación más profunda.

---

## Gaps Identificados por PO

### 1. TypedPrompting — No Mencionado

| Pregunta sin responder |
|------------------------|
| ¿Cómo se integra el Context Manager con el modelo Sensor/Actuador? |
| ¿Qué ontología tipada describe las señales entre agentes? |
| ¿Dónde encaja `alephscript-typed-prompting` en el ciclo del dramaturgo? |

**Fuente a recuperar**: `BACKLOG_BORRADORES/Diciembre_29_TypedPrompting_ContextManager/`

### 2. MCPPresets en la Galería — No Mencionado

| Pregunta sin responder |
|------------------------|
| ¿Cómo se empaqueta el preset para que otros dramaturgos lo reusen? |
| ¿Qué estructura tiene un preset de "máquina con sensor/actuador"? |
| ¿Cómo se registra en la mesh de MCPGallery? |

**Fuente a recuperar**: `.github/plugins/mcp-presets/` y `MCPGallery/mcp-mesh-sdk/`

### 3. Hilo Eferencia/Aferencia — Subutilizado

@ox mencionó `IOT-SBR-LOGICA` pero no extrajo las premisas clave:

| Concepto | Definición del PO | Estado en T001 |
|----------|-------------------|----------------|
| **Aferencia** | Señal entrante (sensor→cerebro) | ⚠️ Mencionado, no expandido |
| **Eferencia** | Señal saliente (cerebro→actuador) | ⚠️ Mencionado, no expandido |
| **Inteligencias situadas** | Agentes con contexto local | ❌ No abordado |

**Cita del PO**: *"El hilo en el que pido eferencia/aferencia es vital porque es casi medio feature"*

---

## Directiva del PO

> **Doblar esfuerzos en investigación más profunda para planificar con mayor detalle.**

### Agentes Convocados

| Agente | Misión Específica |
|--------|-------------------|
| **@ox** | Recuperar premisas de `IOT-SBR-LOGICA/01_transcripcion-po-session.md` completo |
| **@indice** | Mapear conexiones TypedPrompting ↔ Teatro ↔ MCPPresets |
| **@scrum** | Identificar borradores relacionados no mencionados en T001 |

### Entregables Esperados

| # | Entregable | Responsable |
|---|------------|-------------|
| 1 | Mapa de dependencias: TypedPrompting → Prolog → Teatro | @indice |
| 2 | Extracto de premisas clave del hilo eferencia/aferencia | @ox |
| 3 | Lista de borradores a consultar antes de especificar | @scrum |
| 4 | Propuesta de estructura de MCPPreset para el caso de uso | @ox + @indice |

---

## Contexto para la Tríada

### El Ciclo Completo que Buscamos

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        CICLO DEL DRAMATURGO                             │
│                                                                         │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐              │
│  │ TypedPrompting│    │ PrologEditor │    │   Teatro     │              │
│  │ (ontología)  │───►│ (brain.pl)   │───►│ (obra.yaml)  │              │
│  └──────────────┘    └──────────────┘    └──────────────┘              │
│         │                   │                   │                       │
│         ▼                   ▼                   ▼                       │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐              │
│  │  MCPPresets  │◄───│ MCPGallery   │◄───│  ARG Board   │              │
│  │ (empaquetado)│    │ (mesh/catalog)│   │ (ejecución)  │              │
│  └──────────────┘    └──────────────┘    └──────────────┘              │
│                                                                         │
│  AFERENCIA ──────────────────────────────────────────► EFERENCIA       │
│  (sensor→cerebro)                                    (cerebro→actuador)│
└─────────────────────────────────────────────────────────────────────────┘
```

### Archivos Clave a Recuperar

| Archivo | Qué buscar |
|---------|------------|
| `IOT-SBR-LOGICA/01_transcripcion-po-session.md` | Definiciones PO de aferencia/eferencia |
| `IOT-SBR-LOGICA/02_analisis-submodulo.md` | Implementación actual del patrón SBR |
| `Diciembre_29_TypedPrompting_ContextManager/` | Context Packs + integración MCP |
| `.github/plugins/mcp-presets/` | Estructura de presets existentes |
| `MCPGallery/mcp-mesh-sdk/src/` | Cómo se registran servers en la mesh |

---

## Actualización de Cola

El spike se devuelve. Nueva cola:

| Turno | Agente | Objetivo |
|-------|--------|----------|
| T002 | @ox + @indice + @scrum | Spike profundo: TypedPrompting + MCPPresets + eferencia/aferencia |
| T003 | @plugin_ox_teatro | (Pendiente resultados de T002) |
| T004 | @plugin_ox_prologeditor | (Pendiente resultados de T002) |

---

## Nota del Orquestador

El PO tiene razón: **planificar sin estas piezas es planificar incompleto**. 

La tríada debe "doblar esfuerzos" = leer más borradores, extraer más premisas, conectar más puntos antes de que @plugin_ox_teatro valide la obra.

**Regla aplicada**: BP-01 (Consultar @indice Primero) + Bloqueo Preventivo (R3 de DEVOPS.md)
