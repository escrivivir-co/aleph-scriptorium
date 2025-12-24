# Conversación PO-SM: Plugin PrologEditor

**Fecha**: 2025-01-04  
**Submódulo**: `iot-sbr-logica-para-bots`  
**Plugin objetivo**: `prolog-editor`  
**Instrucciones del usuario**:
- Relacionar con blockly-editor y AS-GYM
- Exportar desde Scriptorium a editor Prolog e importar de vuelta
- Conectar con AGENT_CREATOR y ARG_BOARD
- Perfil académico: usuarios con alto conocimiento de Prolog
- Sistema de asistencia para generar plantillas de código Prolog
- Condicionar el comportamiento del Scriptorium y obras con reglas Prolog

---

## Análisis Técnico (SM)

### Inventario del Submódulo

| Componente | Tecnología | Estado |
|------------|------------|--------|
| Backend API | Express.js + swipl | ✅ Funcional |
| Motor Prolog | SWI-Prolog binding | ✅ Funcional |
| Parser predicados | JS regex | ✅ Funcional |
| Template system | JSON + .pl | ✅ 3 templates |
| Frontend | Angular 14 | ✅ Funcional |
| Rule editor UI | Angular component | ✅ Funcional |
| Persistencia | SQLite | ✅ Funcional |
| MQTT/IoT | mqtt.js | ⚠️ Opcional |

### Gaps Identificados

| Gap | Descripción | Prioridad | Solución propuesta |
|-----|-------------|-----------|-------------------|
| G1 | Sin exportación Blockly → Prolog | Must | Crear transpilador de bloques a sintaxis Prolog |
| G2 | Templates no editables desde Scriptorium | Must | Prompt de asistencia + almacenamiento en ARCHIVO |
| G3 | Sin integración FIA/red_semantica | Should | Mapear predicados a nodos FIA |
| G4 | Sin validación sintáctica | Should | Hook pre-ejecución con parser |
| G5 | Sin almacenamiento ARCHIVO | Must | ARCHIVO/PLUGINS/PROLOG_EDITOR/ |
| G6 | Sin conexión ARG_BOARD | Should | Ejecutar reglas en estadios de obras |
| G7 | Sin conexión AGENT_CREATOR | Should | Campo `prologRules` en recetas |

### Riesgos Técnicos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| SWI-Prolog no instalado | Alta | Alto | Modo degradado sin ejecución + instrucciones |
| Binding swipl incompatible | Media | Alto | Documentar versiones compatibles |
| Complejidad Prolog para no-expertos | Baja | Bajo | Perfil académico declarado |
| Templates mal formados | Media | Medio | Validación JSON + sintaxis .pl |

### Arquitectura Propuesta

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        PROLOG-EDITOR PLUGIN                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ┌──────────────┐      ┌──────────────┐      ┌──────────────┐          │
│   │ BlocklyEditor│─────▶│ PrologEditor │◀─────│AGENT_CREATOR │          │
│   │ (visual)     │export│ (lógica)     │import│ (recetas)    │          │
│   └──────────────┘      └──────┬───────┘      └──────────────┘          │
│                                │                                         │
│                    ┌───────────┴───────────┐                            │
│                    ▼                       ▼                            │
│           ┌──────────────┐        ┌──────────────┐                      │
│           │  Templates   │        │  ARG_BOARD   │                      │
│           │  (.pl files) │        │ (obras/BOE)  │                      │
│           └──────────────┘        └──────────────┘                      │
│                    │                       │                            │
│                    └───────────┬───────────┘                            │
│                                ▼                                         │
│                       ┌──────────────┐                                  │
│                       │   AS-GYM     │                                  │
│                       │ (FIA/SBR)    │                                  │
│                       └──────────────┘                                  │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Visión de Producto (PO)

### Casos de Uso Objetivo

#### UC1: Crear template Prolog asistido
**Actor**: Usuario académico  
**Flujo**:
1. Usuario describe lógica que quiere implementar
2. PrologEditor genera template base con predicados
3. Usuario ajusta código Prolog
4. Sistema valida y guarda en ARCHIVO

#### UC2: Exportar Blockly → Prolog
**Actor**: Usuario con obra en BlocklyEditor  
**Flujo**:
1. Usuario tiene rutina visual en Blockly
2. Invoca exportación a Prolog
3. PrologEditor transpila bloques a predicados
4. Usuario revisa y ajusta código Prolog resultante

#### UC3: Condicionar agente con reglas Prolog
**Actor**: Usuario con agente en AGENT_CREATOR  
**Flujo**:
1. Usuario tiene receta de agente
2. Añade campo `prologRules` con referencia a archivo .pl
3. Agente usa reglas para decidir comportamiento

#### UC4: Ejecutar reglas en obra teatral
**Actor**: Usuario con obra en ARG_BOARD  
**Flujo**:
1. Estadio de obra tiene condición Prolog
2. Teatro evalúa predicado
3. Transición de estadio según resultado

#### UC5: Integrar con paradigma SBR de FIA
**Actor**: Usuario avanzado  
**Flujo**:
1. Usuario tiene red semántica FIA
2. Mapea nodos a hechos Prolog
3. Define reglas de inferencia sobre FIA

### Criterios de Éxito

- [ ] CE1: Usuario puede crear template desde cero con asistencia
- [ ] CE2: Exportación Blockly → Prolog genera código válido
- [ ] CE3: Agentes pueden usar reglas Prolog para decisiones
- [ ] CE4: Obras pueden condicionar transiciones con Prolog
- [ ] CE5: Plantillas reimportables tras edición manual

### Perfil de Usuario Objetivo

> **Académico con alto conocimiento de Prolog**

| Característica | Valor |
|----------------|-------|
| Conocimiento Prolog | Alto (sabe escribir predicados) |
| Conocimiento Scriptorium | Medio (usa agentes básicos) |
| Objetivo | Lógica declarativa para agentes/obras |
| Tolerancia complejidad | Alta |
| Necesita asistencia en | Integración con plugins Scriptorium |

---

## Decisiones

### D1: Modo de ejecución
**Decisión**: Modo híbrido (offline templates + online ejecución opcional)  
**Rationale**: SWI-Prolog puede no estar instalado, pero plantillas siguen siendo útiles

### D2: Almacenamiento de templates
**Decisión**: `ARCHIVO/PLUGINS/PROLOG_EDITOR/templates/`  
**Rationale**: Consistente con otros plugins

### D3: Integración BlocklyEditor
**Decisión**: Prompt de exportación que genera .pl desde rutina  
**Rationale**: No modificar BlocklyEditor, añadir capacidad de exportación

### D4: Integración AGENT_CREATOR
**Decisión**: Campo opcional `prologRules` en receta JSON  
**Rationale**: No invasivo, el campo es ignorado si no hay Prolog

### D5: Integración ARG_BOARD
**Decisión**: Condiciones Prolog en estadios como alternativa a JavaScript  
**Rationale**: Usuarios avanzados pueden preferir lógica declarativa

---

## Siguiente Paso

- [x] Generar backlog borrador
- [ ] Usuario revisa y aprueba

