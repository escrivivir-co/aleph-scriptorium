# Backlog Borrador — Plugin TypedPrompting

> **Fecha**: 2025-12-24  
> **Estado**: 📝 Borrador (pendiente de aprobación)  
> **Submódulo**: `alephscript-typed-prompting`  
> **Épica**: SCRIPT-1.11.0

---

## Épica: SCRIPT-1.11.0 — Plugin TypedPrompting

**Objetivo**: Crear un plugin transversal para edición de ontologías y validación de conversaciones entre lenguaje natural y datos estructurados JSON. Todos los agentes del Scriptorium tendrán acceso a sus funcionalidades.

**Estado**: 🆕 Nueva (Feature Cycle 1)

**Submódulo**: `alephscript-typed-prompting`  
**Rama de integración**: `integration/beta/scriptorium`  
**Conversación PO-SM**: `ARCHIVO/DISCO/BACKLOG_BORRADORES/TYPED_PROMPTING/conversacion-po-sm.md`

---

## Contexto

### El problema

Los agentes del Scriptorium se comunican entre sí y con usuarios sin:
- **Validación estructurada** de mensajes
- **Contratos de comunicación** definidos
- **Ontologías compartidas** entre agentes

### La solución

Integrar `alephscript-typed-prompting` como plugin transversal que proporciona:
- **Editor de ontologías**: Diseño visual de schemas TypeScript → JSON Schema
- **Validación de mensajes**: Verificar respuestas de LLM contra schemas
- **Bibliotecas de contratos**: Colecciones reutilizables por dominio
- **Modo Asistente**: Guía para diseñar ontologías
- **Modo Gestor**: Instalación de reglas en agentes y flujos

### Arquitectura del submódulo

```
alephscript-typed-prompting/
├── client/                     # Frontend React
│   └── src/
│       ├── pages/              # 13 páginas de funcionalidad
│       ├── components/         # Componentes UI
│       └── hooks/              # Hooks personalizados
├── server/                     # Backend Express
│   ├── routes/                 # 8 rutas API
│   ├── handlers/               # Lógica de negocio
│   └── swagger.ts              # Documentación API
├── shared/                     # Código compartido
│   └── schema.ts               # Definiciones TypeScript + Zod
├── data/                       # Datos de ejemplo
│   └── stored-prompts.json     # Schemas y prompts de demo
└── README-SCRIPTORIUM.md       # Integración con Scriptorium
```

### Mapeo ontológico con Scriptorium

| Concepto TypedPrompting | Concepto Scriptorium | Uso |
|-------------------------|----------------------|-----|
| Schema | Contrato de comunicación | Validar mensajes entre agentes |
| Library | Biblioteca de contratos | Agrupar por dominio (ARG, Teatro) |
| StoredPrompt | Prompt tipado | Template con validación |
| ValidationHistory | Log de auditoría | Registro de validaciones |
| AIConfig | MCP Preset | Configuración de proveedor |

---

## Story: SCRIPT-1.11.0-S01 — Estructura del Plugin
**Puntos**: 2  
**Prioridad**: Must  
**Estado**: 🔄 En Progreso

### Descripción
Crear la estructura base del plugin siguiendo el protocolo de PLUGINS.md.

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T001 | Crear `.github/plugins/typed-prompting/manifest.md` | ⏳ |
| T002 | Crear `agents/typed-prompting.agent.md` (agente principal) | ⏳ |
| T003 | Crear `instructions/typed-prompting.instructions.md` | ⏳ |
| T004 | Crear `ARCHIVO/PLUGINS/TYPED_PROMPTING/` estructura | ⏳ |
| T005 | Crear `ARCHIVO/PLUGINS/TYPED_PROMPTING/schemas/` (vacío) | ⏳ |
| T006 | Crear `ARCHIVO/PLUGINS/TYPED_PROMPTING/libraries/` (vacío) | ⏳ |
| T007 | Crear bridge `plugin_ox_typedprompting.agent.md` en `.github/agents/` | ⏳ |

### Criterios de Aceptación
- [ ] El plugin tiene manifest.md válido con frontmatter YAML
- [ ] La estructura sigue las convenciones de PLUGINS.md
- [ ] El bridge está en `.github/agents/` (detectable por VS Code)
- [ ] El agente tiene handoffs para cada modo (Asistente/Gestor)

---

## Story: SCRIPT-1.11.0-S02 — Modo Asistente: Estudiar Caso de Uso
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

### Descripción
Implementar el modo Asistente para analizar casos de uso y sugerir ontologías.

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T008 | Crear `prompts/estudiar-caso-uso.prompt.md` | ⏳ |
| T009 | Implementar análisis de requisitos de comunicación | ⏳ |
| T010 | Generar recomendación de schema base | ⏳ |
| T011 | Documentar flujo de conversación | ⏳ |

### Criterios de Aceptación
- [ ] El usuario describe su caso de uso en lenguaje natural
- [ ] El agente identifica entidades y relaciones
- [ ] Se genera una propuesta de ontología con justificación
- [ ] Se ofrece importar la ontología propuesta

---

## Story: SCRIPT-1.11.0-S03 — Modo Asistente: Sugerir Ontología
**Puntos**: 3  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

### Descripción
Implementar sugerencias de ontologías basadas en bibliotecas existentes.

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T012 | Crear `prompts/sugerir-ontologia.prompt.md` | ⏳ |
| T013 | Implementar búsqueda en bibliotecas existentes | ⏳ |
| T014 | Generar comparativa de opciones | ⏳ |
| T015 | Permitir personalización de sugerencia | ⏳ |

### Criterios de Aceptación
- [ ] El agente busca en bibliotecas existentes
- [ ] Presenta opciones ordenadas por relevancia
- [ ] Explica pros/contras de cada opción
- [ ] Permite combinar/modificar sugerencias

---

## Story: SCRIPT-1.11.0-S04 — Modo Gestor: Instalar Reglas en Agente
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

### Descripción
Implementar instalación de schemas de validación en agentes del Scriptorium.

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T016 | Crear `prompts/instalar-en-agente.prompt.md` | ⏳ |
| T017 | Añadir campo `validationSchema` al schema de recetas | ⏳ |
| T018 | Implementar inyección de schema en agente | ⏳ |
| T019 | Crear mecanismo de validación en runtime | ⏳ |
| T020 | Documentar integración con AGENT_CREATOR | ⏳ |

### Criterios de Aceptación
- [ ] Un agente puede tener uno o más schemas asignados
- [ ] La receta del agente incluye referencia al schema
- [ ] El agente valida mensajes entrantes/salientes
- [ ] Se genera log de validaciones fallidas

### Estructura campo validationSchema
```json
{
  "validationSchema": {
    "input": ["schema-id-1", "schema-id-2"],
    "output": ["schema-id-3"],
    "mode": "strict" | "warn" | "log"
  }
}
```

---

## Story: SCRIPT-1.11.0-S05 — Modo Gestor: Instalar Reglas en Flujo ARG
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

### Descripción
Implementar instalación de schemas en flujos de obras ARG_BOARD.

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T021 | Crear `prompts/instalar-en-flujo-arg.prompt.md` | ⏳ |
| T022 | Añadir campo `communicationProtocol` a obras.json | ⏳ |
| T023 | Definir contratos entre personajes de la obra | ⏳ |
| T024 | Implementar validación en transiciones de escena | ⏳ |
| T025 | Documentar integración con ARG_BOARD | ⏳ |

### Criterios de Aceptación
- [ ] Una obra puede tener protocolo de comunicación definido
- [ ] Los personajes tienen schemas de entrada/salida
- [ ] Las transiciones validan mensajes intercambiados
- [ ] Se registra en BOE cuando hay violaciones

### Estructura campo communicationProtocol
```json
{
  "communicationProtocol": {
    "version": "1.0.0",
    "contracts": {
      "tarotista→usuario": "schema-lectura-tarot",
      "usuario→tarotista": "schema-pregunta-consulta"
    },
    "enforcement": "strict" | "warn"
  }
}
```

---

## Story: SCRIPT-1.11.0-S06 — Integración con AGENT_CREATOR
**Puntos**: 3  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

### Descripción
Integrar TypedPrompting en el flujo de creación de agentes.

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T026 | Actualizar flujo de creación en AGENT_CREATOR | ⏳ |
| T027 | Añadir paso "Definir contrato de comunicación" | ⏳ |
| T028 | Crear selector de schemas existentes | ⏳ |
| T029 | Permitir crear schema inline durante creación | ⏳ |

### Criterios de Aceptación
- [ ] Al crear agente, se ofrece definir contrato
- [ ] Se pueden seleccionar schemas de biblioteca
- [ ] Se puede crear schema nuevo en el momento
- [ ] La receta resultante incluye validationSchema

---

## Story: SCRIPT-1.11.0-S07 — Documentación y Tests
**Puntos**: 2  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

### Descripción
Documentar el plugin y crear tests de integración.

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T030 | Crear `ARCHIVO/PLUGINS/TYPED_PROMPTING/README.md` | ⏳ |
| T031 | Actualizar `.github/PLUGINS.md` con sección typed-prompting | ⏳ |
| T032 | Crear ejemplos de schemas en `schemas/examples/` | ⏳ |
| T033 | Documentar API del servidor web | ⏳ |
| T034 | Test: flujo Asistente completo | ⏳ |
| T035 | Test: flujo Gestor → Agente | ⏳ |
| T036 | Test: flujo Gestor → ARG | ⏳ |

### Criterios de Aceptación
- [ ] README explica el propósito y uso del plugin
- [ ] PLUGINS.md incluye el nuevo plugin en la tabla de bridges
- [ ] Hay al menos 3 schemas de ejemplo
- [ ] Tests documentados y ejecutables

---

## Métricas SCRIPT-1.11.0

| Métrica | Valor |
|---------|-------|
| Stories totales | 7 |
| Tasks totales | 36 |
| Puntos totales | 23 |
| Prioridad Must | 5 stories (17 pts) |
| Prioridad Should | 2 stories (6 pts) |
| Completadas | **0** |
| % Avance | **0%** |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| Submódulo alephscript-typed-prompting | ✅ Añadido | Rama integration/beta/scriptorium |
| Plugin AGENT_CREATOR | ✅ Instalado | Integración en S06 |
| Plugin ARG_BOARD | ✅ Instalado | Integración en S05 |
| PostgreSQL/Neon (opcional) | ⚠️ Externa | Modo offline con JSON local |
| Node.js 18+ | ✅ | Para servidor web |

---

## Riesgos Identificados

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| DB externa requerida | Alta | Medio | Implementar modo offline con JSON |
| UI separada de VS Code | Media | Bajo | Documentar como herramienta complementaria |
| Schemas complejos | Media | Medio | Templates predefinidos + asistente |
| Validación costosa | Baja | Bajo | Modo "log" para debugging |

---

## Roadmap Futuro (Post-Feature Cycle 1)

### Feature Cycle 2: Integración Profunda
- Validación en tiempo real durante conversaciones
- Dashboard de violaciones de contrato
- Generación automática de schemas desde conversaciones

### Feature Cycle 3: Extensión VS Code
- Panel lateral con schemas del workspace
- Autocompletado de mensajes válidos
- Diagnóstico inline de violaciones

---

## Aprobación

| Rol | Nombre | Fecha | Estado |
|-----|--------|-------|--------|
| PO | Usuario | 2025-12-24 | ✅ Aprobado |
| SM | @scrum | 2025-12-24 | ✅ Aprobado |
| Dev | @aleph | — | ⏳ Pendiente |

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-24 | Crear backlog borrador | @scrum |
| 2025-12-24 | Aprobar desde conversación PO-SM | @scrum |
