# Acta T007: Transmisión de Plantillas AgentLoreSDK → ARG-Board + Teatro

## Metadatos

| Campo | Valor |
|-------|-------|
| **Turno** | 7 |
| **Agente** | @plugin_ox_agentcreator |
| **Inicio** | 2026-01-05 10:00 |
| **Fin** | 2026-01-05 10:45 |
| **Estado** | ✅ DONE |

## Contexto Leído

- Actas revisadas: T001-T006, T007_PO_DEMO.md (archivo de referencia)
- Estado actual de Lucas:
  - **Personaje teatral**: `ARCHIVO/DISCO/TALLER/ELENCO/lucas/` ✅
  - **Agente ejecutable**: `ARCHIVO/PLUGINS/AGENT_CREATOR/agents/created/lucas.agent.md` ✅
  - **Cerebro Prolog**: `lucas-prolog.brain.pl` con reglas de plantillas ✅
  - **Índice templates**: `templates-index.json` ✅
  - **Schemas TypedPrompt**: `lucas-template-*.schema.json` ✅

## Diagnóstico: ¿Qué quedó pendiente de la Demo PO?

### Lo que se presentó ✅
1. Submódulo AgentLoreSDK instalado (#18)
2. Catálogo indexado (catalog.json, 637+ items)
3. Paso 1.5 "Detección Proactiva DRY" en crear-agente.prompt.md
4. Lucas mejorado con handoffs `[Templates]`
5. Schemas TypedPrompt para requests/responses

### Lo que falta ❌
1. **Registro en ARG-Board**: Lucas no aparece en `obras.json` como personaje con plantillas
2. **Transmisión a Teatro**: El plugin teatro referencia a Lucas pero NO conoce sus plantillas nuevas
3. **Caracterización completa**: Las plantillas deben ser parte de la identidad del personaje en la obra

## Plan de Acción

### T7.1: Caracterizar plantillas en el personaje teatral

**Problema**: `templates-index.json` existe en ELENCO pero no está referenciado en la obra.

**Solución**: Actualizar la configuración de obra para que Lucas tenga acceso a sus plantillas.

### T7.2: Registrar en ARG-Board

**Problema**: ARG-Board no tiene conocimiento de las nuevas capacidades de Lucas.

**Solución**: Añadir entrada en `obras.json` o en el agente Arrakis para reconocer a Lucas como "actor con plantillas".

### T7.3: Actualizar Teatro para transmitir plantillas

**Problema**: El prompt `teatro-razonar-personaje.prompt.md` invoca a Lucas pero no pasa contexto de plantillas.

**Solución**: Añadir paso de "carga de plantillas" cuando el contexto lo requiera.

---

## Análisis de Integración

### Arquitectura Actual

```
┌────────────────────────────────────────────────────────────────────────┐
│                    FLUJO DE PLANTILLAS (ANTES)                         │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  AgentLoreSDK/     →    catalog.json    →    crear-agente.prompt.md   │
│  (submódulo)            (índice global)       (solo creación)          │
│                                                                        │
│  ❌ NO HAY FLUJO hacia ARG-Board/Teatro                                │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### Arquitectura Propuesta

```
┌────────────────────────────────────────────────────────────────────────┐
│                    FLUJO DE PLANTILLAS (DESPUÉS)                       │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│                         AgentLoreSDK/                                  │
│                              │                                         │
│                    ┌─────────┴─────────┐                               │
│                    ▼                   ▼                               │
│             catalog.json        templates-index.json                   │
│             (global)            (por personaje)                        │
│                    │                   │                               │
│                    ▼                   ▼                               │
│         crear-agente.prompt.md    lucas-prolog.brain.pl               │
│         (creación)                (razonamiento)                       │
│                                        │                               │
│                              ┌─────────┴─────────┐                     │
│                              ▼                   ▼                     │
│                        ARG-Board            Teatro                     │
│                     (registro actor)    (ejecución obra)               │
│                              │                   │                     │
│                              └─────────┬─────────┘                     │
│                                        ▼                               │
│                              lucas-template-*.schema.json              │
│                              (tipado de requests/responses)            │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Implementación ✅

### T7.1: Caracterización en ELENCO ✅

**Estado**: Ya existía desde sesión anterior.

- `ARCHIVO/DISCO/TALLER/ELENCO/lucas/lucas.agent.md` — Handoffs [Templates]
- `ARCHIVO/DISCO/TALLER/ELENCO/lucas/templates-index.json` — Índice de 12 plantillas
- `ARCHIVO/DISCO/TALLER/ELENCO/lucas/lucas-prolog.brain.pl` — Reglas plantilla/4, cargar_plantilla/2

### T7.2: Registro en ARG-Board ✅

**Archivo modificado**: `ARCHIVO/PLUGINS/ARG_BOARD/.arrakis/obras.json`

**Cambios**:
- `hola_mundo.actores_config.lucas` — Añadida configuración de templates
- `camino_del_tarotista.actores_config.lucas` — Añadida configuración de templates con rol

```json
"lucas": {
  "templates_enabled": true,
  "templates_index": "ARCHIVO/DISCO/TALLER/ELENCO/lucas/templates-index.json",
  "templates_categories": ["documentation", "project-management"],
  "brain_file": "ARCHIVO/DISCO/TALLER/ELENCO/lucas/lucas-prolog.brain.pl"
}
```

### T7.3: Instrucción para Teatro ✅

**Archivo modificado**: `.github/plugins/teatro/instructions/teatro-interactivo.instructions.md`

**Sección añadida**: "Integración con AgentLoreSDK (Plantillas)"

Documenta:
- Configuración en obras.json (`actores_config`)
- Flujo de carga de plantillas (6 pasos)
- TypedPrompt schemas para plantillas
- Ubicación de índices por personaje
- Catálogo global de AgentLoreSDK

---

## Resultados

| Task | Estado | Archivo modificado |
|------|--------|-------------------|
| T7.1 | ✅ | Ya existía |
| T7.2 | ✅ | obras.json |
| T7.3 | ✅ | teatro-interactivo.instructions.md |

## Preguntas Resueltas

- [x] ¿Las obras existentes deben actualizarse? → **SÍ**, `hola_mundo` y `camino_del_tarotista` actualizadas
- [x] ¿El schema debe validarse? → **SÍ**, schemas `lucas-template-*.schema.json` ya existen

## Estado Final de Archivos

| Archivo | Existe | Tiene plantillas |
|---------|--------|------------------|
| lucas.agent.md (ELENCO) | ✅ | ✅ Handoffs [Templates] |
| lucas.agent.md (AGENT_CREATOR) | ✅ | ✅ MCP Pack AgentLoreSDK |
| templates-index.json | ✅ | ✅ 12 plantillas |
| lucas-prolog.brain.pl | ✅ | ✅ Reglas plantilla/4, cargar_plantilla/2 |
| obras.json (ARG_BOARD) | ✅ | ✅ actores_config para lucas |
| teatro-interactivo.instructions.md | ✅ | ✅ Sección AgentLoreSDK |
| templates-index.json | ✅ | ✅ 12 plantillas |
| lucas-prolog.brain.pl | ✅ | ✅ Reglas plantilla/4, cargar_plantilla/2 |
| obras.json (ARG_BOARD) | ⬜ Verificar | ❓ |
| teatro-interactivo.instructions.md | ✅ | ❌ Sin referencia a plantillas |

---

## Siguiente Turno Sugerido

@plugin_ox_scrum para revisión y cierre, o @plugin_ox_teatro para implementar la transmisión.
