# Acta T002: Ronda de Crítica y Reformulación

## Metadatos

| Campo | Valor |
|-------|-------|
| **Turno** | T002 |
| **Agente** | @ox (Meta-coordinador) |
| **Rol** | Facilitador de ronda multi-agente |
| **Inicio** | 2026-01-05 14:00 |
| **Fin** | — (en progreso) |
| **Estado** | ✍️ WRITING |

---

## 🐂 Anuncio de Intervención

> **@ox toma el turno**

El agente @periodico produjo un backlog valioso en T001 pero utilizó el **método de Banderas** (Blueflag, Redflag, Yellowflag) que **NO es el protocolo vigente** del Scriptorium para esta sesión.

**Corrección necesaria**: En Aleph Scriptorium, las "miradas complementarias" se realizan a través de **agentes de plugins y scriptorium**, no mediante las Banderas doctrinales.

Convoco una **ronda de perspectivas** para reformular el backlog de forma congruente.

---

## 📋 Crítica al Backlog T001

### Lo Bueno ✅

| Aspecto | Evaluación |
|---------|------------|
| **Estructura 5W** | Bien aplicada: WHO/WHAT/WHERE/WHEN/WHY claros |
| **6 Stories** | Cobertura completa de blueprints objetivo |
| **16 Tasks** | Granularidad apropiada |
| **13 pts Effort** | Estimación razonable |
| **Secuencia propuesta** | Lógica: base factual → visual → arquitectura |

### Lo Problemático ⚠️

| Problema | Descripción |
|----------|-------------|
| **Uso de Banderas** | El análisis usa Blueflag/Redflag/Yellowflag que son para auditoría doctrinal de textos fundacionales, NO para gestión de docs técnicos |
| **Falta de perspectiva plugin** | No invoca a @plugin_ox_typedprompting ni @plugin_ox_prologeditor como fuentes de verdad |
| **Desconexión con Índices** | No referencia Funcional.md ni Tecnico.md (DRY) |
| **Métricas genéricas** | "19→20 plugins" sin verificar en registry.json |

---

## 🔄 Ronda de Perspectivas Complementarias

### 1️⃣ Perspectiva @indice (Navegación DRY)

> **Consulta**: ¿Están TypedPrompting y PrologEditor correctamente indexados?

**Hallazgos en [Funcional.md](../../../DEVOPS/Funcional.md)**:
- ✅ Sección 3.5 "Copilot Logs" existe como feature
- ⚠️ **Falta** sección para TypedPrompting (validación de schemas)
- ⚠️ **Falta** sección para PrologEditor (lógica declarativa)

**Hallazgos en [Tecnico.md](../../../DEVOPS/Tecnico.md)**:
- ✅ Arquitectura 4 capas documentada
- ⚠️ **Falta** Stack MCP TypedPrompt (3019/3020)
- ⚠️ **Falta** Stack MCP Prolog (5001/8000/3006)

**Acción requerida**: Antes de editar `docs/`, actualizar los índices DRY.

---

### 2️⃣ Perspectiva @lucas (Diseño UX)

> **Consulta**: ¿Cómo mostrar las features en demo.md?

**Propuesta visual**:

| Categoría | Cards a añadir | Puerto | Prioridad |
|-----------|----------------|--------|-----------|
| **Editores Lógicos** | TypedPromptsEditor | 3019 | Alta |
| **Editores Lógicos** | PrologEditor | 5001 | Alta |
| **Gestores MCP** | MCPTypedPromptServer | 3020 | Media |
| **Gestores MCP** | MCPPrologServer | 3006 | Media |

**Mockup de organización**:
```
[demo.md]
├── Docs (Jekyll 4000)
├── Gestores (Zeus 3012)
├── Editores Lógicos ← NUEVA SECCIÓN
│   ├── TypedPromptsEditor (3019)
│   ├── PrologEditor (5001)
│   └── BlocklyEditor (TBD)
└── Narrativa (Novelist 8080)
```

---

### 3️⃣ Perspectiva @aleph (PO)

> **Consulta**: ¿Cuál es la prioridad real para FC1?

**Criterios de priorización**:

| Criterio | TypedPrompting | PrologEditor |
|----------|----------------|--------------|
| Demo funcional | ✅ 3019 opera | ✅ 5001 opera |
| Tests pasando | ✅ 83% auto | ✅ 88.5% E2E |
| Docs actualizados | ⚠️ Falta | ⚠️ Falta |
| Plugin operativo | ✅ TYPED-MCP-1.0.0 | ✅ PROLOG-UI-2.0.0 |

**Veredicto PO**: Ambos están **listos para promoción**. La prioridad es:
1. Corregir `ecosistema.md` (base factual)
2. Añadir cards en `demo.md` (showcase visual)
3. Actualizar índices DRY (Funcional.md, Tecnico.md)

---

### 4️⃣ Perspectiva @scrum (Proceso)

> **Consulta**: ¿Cómo integrar con el backlog general?

**Estado actual en BACKLOG-SCRIPTORIUM.md**:
- TYPED-MCP-1.0.0 → ✅ Cerrada
- PROLOG-UI-2.0.0 → ✅ Cerrada
- BLUEPRINTS-TYPED-1.0.0 → 🟢 Nueva (esta sesión)

**Propuesta de reformulación**:
- Renombrar épica: `BLUEPRINTS-TYPED-1.0.0` → `DOCS-SHOWCASE-FC1-1.0.0`
- Incluir: TypedPrompting + PrologEditor + índices DRY
- Effort ajustado: 13 pts → 15 pts (añadir actualización de índices)

---

### 5️⃣ Perspectiva @pluginmanager (Plugins)

> **Consulta**: ¿Estado real de los plugins en registry.json?

**Verificación en [registry.json](../../../../.github/plugins/registry.json)**:

| Plugin | Estado registry | Realidad |
|--------|-----------------|----------|
| typed-prompting | `installed` | ✅ Operativo |
| prolog-editor | `installed` | ✅ Operativo |
| openasyncapi-editor | `installed` | ✅ Operativo |

**Corrección para ecosistema.md**:
- Mover 3 plugins de "En Desarrollo" a "Operativos"
- Total operativos: 8 → **11**
- Total en desarrollo: 11 → **8**

---

## 📋 BACKLOG REFORMULADO

### Épica: DOCS-SHOWCASE-FC1-1.0.0

**Objetivo**: Promocionar TypedPrompting, PrologEditor y OpenAsyncApiEditor en docs/ usando miradas complementarias de plugins.

**Effort total estimado**: 15 pts

---

### Story 1: Índices DRY — Actualización Previa (NUEVA)

| Campo | Valor |
|-------|-------|
| **ID** | DS-S00 |
| **Prioridad** | 🔴 Crítica (bloqueante) |
| **Effort** | 2 pts |
| **Perspectiva** | @indice |

**Descripción**: 
Como mantenedor, quiero que Funcional.md y Tecnico.md reflejen los stacks TypedPrompt y Prolog, para que los docs/ puedan referenciarlos DRY.

**Tareas**:
- [ ] T00a: Añadir §3.6 "Validación de Schemas (TypedPrompting)" en Funcional.md
- [ ] T00b: Añadir §3.7 "Lógica Declarativa (PrologEditor)" en Funcional.md
- [ ] T00c: Añadir "Stack MCP TypedPrompt" en Tecnico.md (puertos 3019/3020)
- [ ] T00d: Añadir "Stack MCP Prolog" en Tecnico.md (puertos 5001/8000/3006)

**Archivos afectados**:
- [ARCHIVO/DEVOPS/Funcional.md](../../../DEVOPS/Funcional.md)
- [ARCHIVO/DEVOPS/Tecnico.md](../../../DEVOPS/Tecnico.md)

---

### Story 2: Ecosistema.md — Promoción de Plugins (Reformulada)

| Campo | Valor |
|-------|-------|
| **ID** | DS-S01 |
| **Prioridad** | 🔴 Alta |
| **Effort** | 2 pts |
| **Perspectiva** | @pluginmanager |

**Descripción**: 
Como visitante de docs/, quiero ver TypedPrompting, PrologEditor y OpenAsyncApiEditor en la sección "Operativos", para saber que puedo usarlos ahora.

**Tareas**:
- [ ] T01: Mover `Typed Prompting` de "En Desarrollo" a "Operativos" (L77→L55)
- [ ] T02: Mover `Prolog Editor` de "En Desarrollo" a "Operativos"
- [ ] T03: Mover `OpenAsyncAPI Editor` de "En Desarrollo" a "Operativos" (implícito, ya existe)
- [ ] T04: Añadir puertos en descripción: TypedPrompting (3019/3020), Prolog (5001/8000/3006)
- [ ] T05: Actualizar conteos: Operativos 8→11, En Desarrollo 11→8

**Archivo afectado**: [docs/ecosistema.md](../../../../docs/ecosistema.md)

---

### Story 3: Demo.md — Nueva Sección "Editores Lógicos" (Reformulada)

| Campo | Valor |
|-------|-------|
| **ID** | DS-S02 |
| **Prioridad** | 🔴 Alta |
| **Effort** | 3 pts |
| **Perspectiva** | @lucas |

**Descripción**:
Como usuario de la demo, quiero ver una sección "Editores Lógicos" con cards de TypedPromptsEditor y PrologEditor, para explorar las capacidades de validación y lógica declarativa.

**Tareas**:
- [ ] T06: Crear sección "Editores Lógicos" entre Gestores y Narrativa
- [ ] T07: Añadir iframe-card para TypedPromptsEditor (puerto 3019)
- [ ] T08: Añadir iframe-card para PrologEditor (puerto 5001)
- [ ] T09: Añadir status-badges con health check de puertos
- [ ] T10: Capturar screenshots de ambos editores funcionando

**Archivo afectado**: [docs/demo.md](../../../../docs/demo.md)

---

### Story 4: Blueprint.md — Capa de Validación (Reformulada)

| Campo | Valor |
|-------|-------|
| **ID** | DS-S03 |
| **Prioridad** | 🟡 Media |
| **Effort** | 3 pts |
| **Perspectiva** | @aleph (PO) |

**Descripción**:
Como arquitecto, quiero que el diagrama de capas incluya "Validación de Schemas" entre Ontología y Plugins, mostrando TypedPrompting y PrologEditor como parte del flujo.

**Tareas**:
- [ ] T11: Añadir SLIDE "Validación de Schemas" con mención a TypedPrompting
- [ ] T12: Añadir SLIDE "Lógica Declarativa" con mención a PrologEditor
- [ ] T13: Referenciar OpenAPI specs en OPENASYNCAPI_EDITOR (DRY)
- [ ] T14: Actualizar diagrama ASCII con nuevas capas

**Archivo afectado**: [docs/blueprint.md](../../../../docs/blueprint.md)

---

### Story 5: Blueprint-Logic-Flow.md — Integración IOT-SBR (Sin cambios)

| Campo | Valor |
|-------|-------|
| **ID** | DS-S04 |
| **Prioridad** | 🟡 Media |
| **Effort** | 2 pts |
| **Perspectiva** | @plugin_ox_prologeditor |

**Descripción**:
Como desarrollador de lógica, quiero ver cómo TypedPrompting y PrologEditor se integran en el flujo IOT-SBR, para entender el ciclo completo de validación + inferencia.

**Tareas**:
- [ ] T15: En LAYER 2, añadir MCPTypedPromptServer como validador pre-inferencia
- [ ] T16: En LAYER 3, añadir MCPPrologServer como motor de inferencia
- [ ] T17: Enlazar a OpenAPI/AsyncAPI specs para detalles técnicos

**Archivo afectado**: [docs/blueprint-logic-flow.md](../../../../docs/blueprint-logic-flow.md)

---

### Story 6: Roadmap.md — FC1 Completado (Sin cambios sustanciales)

| Campo | Valor |
|-------|-------|
| **ID** | DS-S05 |
| **Prioridad** | 🟡 Media |
| **Effort** | 2 pts |
| **Perspectiva** | @scrum |

**Descripción**:
Como stakeholder, quiero ver que FC1 incluyó TypedPrompting y PrologEditor en las épicas cerradas.

**Tareas**:
- [ ] T18: Añadir TYPED-MCP-1.0.0 (34 pts) en épicas cerradas FC1
- [ ] T19: Añadir PROLOG-UI-2.0.0 en épicas cerradas FC1
- [ ] T20: Actualizar métricas de effort completado: ~215 pts

**Archivo afectado**: [docs/roadmap.md](../../../../docs/roadmap.md)

---

### Story 7: Blueprint-Copilot.md — Servidores MCP (Reformulada)

| Campo | Valor |
|-------|-------|
| **ID** | DS-S06 |
| **Prioridad** | 🟢 Baja |
| **Effort** | 1 pt |
| **Perspectiva** | @plugin_ox_mcppresets |

**Descripción**:
Como usuario de Copilot Chat, quiero saber que existen MCPTypedPromptServer y MCPPrologServer, para invocar validación y lógica desde el chat.

**Tareas**:
- [ ] T21: Añadir MCPTypedPromptServer (3020) en tabla de servidores
- [ ] T22: Añadir MCPPrologServer (3006) en tabla de servidores

**Archivo afectado**: [docs/blueprint-copilot.md](../../../../docs/blueprint-copilot.md)

---

## Resumen de Prioridades Reformulado

| Prioridad | Stories | Effort | Cambio vs T001 |
|-----------|---------|--------|----------------|
| 🔴 Crítica | DS-S00 (índices DRY) | 2 pts | +2 pts (NUEVA) |
| 🔴 Alta | DS-S01, DS-S02 | 5 pts | = |
| 🟡 Media | DS-S03, DS-S04, DS-S05 | 7 pts | +2 pts |
| 🟢 Baja | DS-S06 | 1 pt | = |
| **Total** | 7 stories (vs 6) | **15 pts** | +2 pts |

---

## Propuesta de Secuencia Reformulada

```
1. DS-S00 (índices DRY) → Base de referencia canónica ← NUEVO
2. DS-S01 (ecosistema) → Base factual correcta
3. DS-S02 (demo) → Showcase visual inmediato  
4. DS-S03 (blueprint) → Arquitectura actualizada
5. DS-S04 (logic-flow) → Integración técnica
6. DS-S05 (roadmap) → Tracking histórico
7. DS-S06 (copilot) → Detalle complementario
```

---

## Diferencias Clave: Método Reformulado

| Aspecto | T001 (Periódico) | T002 (Ox) |
|---------|------------------|-----------|
| **Análisis** | Banderas (Blueflag/Redflag/Yellowflag) | Perspectivas de Plugins |
| **Fuentes** | Observación directa de docs/ | Índices DRY + registry.json |
| **Validación** | Implícita | Explícita con @indice, @pluginmanager |
| **Scope** | 6 stories | 7 stories (+índices DRY) |
| **Effort** | 13 pts | 15 pts |

---

## Próximo Turno

**Opciones**:

1. **@lucas** → Ejecutar DS-S02 (diseño visual demo.md)
2. **@periodico** → Revisar reformulación y adaptar método
3. **@aleph (PO)** → Aprobar backlog reformulado

**Recomendación @ox**: Pasar a **@lucas** para mockups, luego **@periodico** retoma con método corregido.

---

## Estado del Turno

| Campo | Valor |
|-------|-------|
| **Estado** | ✅ DONE |
| **Artefacto producido** | Backlog reformulado (7 stories, 22 tasks, 15 pts) |
| **Siguiente turno recomendado** | @lucas (diseño) o @aleph (aprobación PO) |

---

## Aprendizaje para Auto-Reflexión

> **Antipatrón detectado**: Uso de Banderas para contenido técnico no-doctrinal.

Las Banderas (Blueflag, Blackflag, Redflag, Yellowflag, Orangeflag) son para **auditoría doctrinal** de textos fundacionales, NO para gestión de documentación técnica.

Para docs técnicos, usar:
- **@indice** → Verificación DRY
- **@pluginmanager** → Estado de plugins
- **@lucas** → Diseño UX
- **@aleph** → Priorización PO
- **@scrum** → Integración con backlog

