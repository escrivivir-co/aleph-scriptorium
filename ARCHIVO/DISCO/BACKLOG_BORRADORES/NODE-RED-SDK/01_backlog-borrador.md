# Backlog Borrador: SCRIPT-1.13.0 — Plugin WireEditor (Node-RED)

**Opportunity**: Aleph Scriptorium  
**Sprint**: 2 (integración con Sprint 1 existente)  
**Effort total**: 38 pts  
**Estado**: 📝 Borrador (pendiente aprobación)

---

## Contexto

### El problema

Scriptorium carece de capacidad para:
- Crear flujos de procesamiento de datos visuales
- Conectar agentes con streams externos (Kick, Twitch, etc.)
- Diseñar pequeñas UIs para configuración y monitoreo
- Integrar lógica de inferencia (FIA) con servicios externos

### La solución

Plugin **WireEditor** que:
1. Gestiona proyectos Node-RED en `ARCHIVO/DISCO/WIRING/`
2. Provee plantillas de flows, subflows y nodos
3. Asesora al usuario sobre qué nodos usar
4. Sincroniza artefactos entre Scriptorium y Node-RED
5. Habilita comunicación asíncrona vía feeds JSON

### Submódulo

- **Nombre**: `node-red-alephscript-sdk`
- **Paquetes**: node-red-contrib-alephscript (13 nodos), node-red-gamify-ui (Angular)
- **Rama**: `integration/beta/scriptorium`

---

## Feature Cycles / Iteraciones

| Ciclo | Objetivo | Effort | Sprint |
|-------|----------|--------|--------|
| **FC1** | Infraestructura y Asesoramiento | 15 pts | 1 |
| **FC2** | Plantillas y Ejemplos | 10 pts | 1 |
| **FC3** | Sincronización y Feeds | 8 pts | 2 |
| **FC4** | Nodos Custom y Dashboard | 5 pts | 2-3 |

---

## Stories

### SCRIPT-1.13.0-S01 — Estructura del Plugin WireEditor
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Crear la estructura base del plugin siguiendo el protocolo de PLUGINS.md.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T001 | Crear `.github/plugins/wire-editor/manifest.md` | 0.5 | ⏳ |
| T002 | Crear `agents/wire-editor.agent.md` (agente principal) | 1 | ⏳ |
| T003 | Crear `instructions/wire-editor.instructions.md` | 0.5 | ⏳ |
| T004 | Crear `ARCHIVO/PLUGINS/WIRE_EDITOR/README.md` | 0.5 | ⏳ |
| T005 | Crear bridge `plugin_ox_wireeditor.agent.md` | 0.5 | ⏳ |

#### Definition of Done
- [ ] El plugin tiene manifest.md válido
- [ ] La estructura sigue las convenciones de PLUGINS.md
- [ ] El agente tiene handoffs para cada operación principal

---

### SCRIPT-1.13.0-S02 — Estructura DISCO/WIRING
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Crear la estructura de carpetas en DISCO para proyectos Node-RED.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T006 | Crear `ARCHIVO/DISCO/WIRING/README.md` | 0.5 | ⏳ |
| T007 | Crear `ARCHIVO/DISCO/WIRING/catalog.json` (esqueleto) | 0.5 | ⏳ |
| T008 | Crear `ARCHIVO/DISCO/WIRING/feeds/` con README | 0.5 | ⏳ |
| T009 | Crear `ARCHIVO/DISCO/WIRING/projects/` con README | 0.5 | ⏳ |
| T010 | Crear `ARCHIVO/DISCO/WIRING/templates/` con estructura | 0.5 | ⏳ |
| T011 | Definir schema de catalog.json | 0.5 | ⏳ |

#### Definition of Done
- [ ] Estructura de carpetas creada
- [ ] catalog.json con schema documentado
- [ ] READMEs explican propósito de cada carpeta

---

### SCRIPT-1.13.0-S03 — Prompts del Plugin
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Crear los prompts para las operaciones principales del plugin.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T012 | Crear `prompts/crear-proyecto.prompt.md` | 1 | ⏳ |
| T013 | Crear `prompts/importar-flow.prompt.md` | 1 | ⏳ |
| T014 | Crear `prompts/exportar-flow.prompt.md` | 1 | ⏳ |
| T015 | Crear `prompts/asesorar-nodos.prompt.md` | 1 | ⏳ |
| T016 | Crear `prompts/conectar-feed.prompt.md` | 1 | ⏳ |

#### Definition of Done
- [ ] Cada prompt tiene estructura estándar (objetivo, input, proceso, output)
- [ ] Prompts documentan casos de uso concretos

---

### SCRIPT-1.13.0-S04 — Plantillas de Flows Básicos
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Copiar y adaptar flows de ejemplo del submódulo como plantillas del plugin.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T017 | Adaptar `basic-bot-connection` como plantilla | 1 | ⏳ |
| T018 | Adaptar `multi-channel-bot` como plantilla | 1 | ⏳ |
| T019 | Adaptar `basic-kick-bot-commands` como plantilla | 1 | ⏳ |
| T020 | Crear plantilla `feed-writer` (escribir a JSON) | 1 | ⏳ |
| T021 | Crear plantilla `feed-reader` (leer de JSON) | 1 | ⏳ |

#### Definition of Done
- [ ] Plantillas en `DISCO/WIRING/templates/flows/`
- [ ] Cada plantilla tiene README con instrucciones
- [ ] Plantillas probadas con Node-RED

---

### SCRIPT-1.13.0-S05 — Catálogo de Nodos con Asesoramiento
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Crear catálogo de los 13 nodos del submódulo con guía de uso.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T022 | Crear `ARCHIVO/PLUGINS/WIRE_EDITOR/nodos-catalogo.json` | 1 | ⏳ |
| T023 | Documentar casos de uso por nodo | 1 | ⏳ |
| T024 | Crear tabla de decisión: caso → nodo recomendado | 0.5 | ⏳ |
| T025 | Integrar catálogo en prompt `asesorar-nodos` | 0.5 | ⏳ |

#### Definition of Done
- [ ] Catálogo JSON con los 13 nodos
- [ ] Cada nodo tiene casos de uso documentados
- [ ] Agente puede recomendar nodos según caso

---

### SCRIPT-1.13.0-S06 — Integración con kick-aleph-bot (UC1)
**Puntos**: 5  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

#### Descripción
Implementar caso de uso UC1: Stream Kick + Tarotista.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T026 | Crear proyecto `kick-tarotista` en WIRING/projects/ | 1 | ⏳ |
| T027 | Adaptar flow para filtrar comandos con prefijo | 1 | ⏳ |
| T028 | Configurar nodo para escribir en feeds/kick-commands.json | 1 | ⏳ |
| T029 | Documentar conexión Tarotista → feed | 1 | ⏳ |
| T030 | Crear guía completa del caso de uso | 1 | ⏳ |

#### Definition of Done
- [ ] Proyecto funcionando en WIRING/projects/kick-tarotista/
- [ ] Documentación paso a paso
- [ ] Tarotista puede leer feed de comandos

---

### SCRIPT-1.13.0-S07 — Feeds Asíncronos (Protocolo)
**Puntos**: 5  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

#### Descripción
Implementar protocolo de feeds asíncronos para comunicación Scriptorium ↔ Node-RED.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T031 | Definir schema de feed JSON | 0.5 | ⏳ |
| T032 | Crear subflow `feed-writer` reutilizable | 1 | ⏳ |
| T033 | Crear subflow `feed-reader` reutilizable | 1 | ⏳ |
| T034 | Crear subflow `feed-response-handler` | 1 | ⏳ |
| T035 | Documentar protocolo de feeds en instructions | 1 | ⏳ |
| T036 | Añadir ejemplo de lectura de feed desde agente | 0.5 | ⏳ |

#### Definition of Done
- [ ] Subflows en templates/subflows/
- [ ] Protocolo documentado
- [ ] Ejemplo funcional de lectura desde agente

---

### SCRIPT-1.13.0-S08 — Integración Sistema (Fase 7)
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Actualizar archivos del sistema para integrar el plugin.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T037 | Actualizar `registry.json` con wire-editor | 0.5 | ⏳ |
| T038 | Actualizar `aleph.agent.md` con handoff | 0.5 | ⏳ |
| T039 | Actualizar `ox.agent.md` (4 zonas) | 0.5 | ⏳ |
| T040 | Actualizar `setup-workspace.sh` (4 zonas) | 0.5 | ⏳ |
| T041 | Actualizar `scripts/README.md` | 0.5 | ⏳ |
| T042 | Verificar integridad con validación cruzada | 0.5 | ⏳ |

#### Definition of Done
- [ ] Plugin en registry.json
- [ ] Handoffs funcionando
- [ ] setup-workspace.sh actualizado
- [ ] Validación de integridad pasa

---

### SCRIPT-1.13.0-S09 — Documentación y Tests
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Documentar el plugin y validar funcionamiento.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T043 | Crear `docs/README.md` del plugin completo | 1 | ⏳ |
| T044 | Actualizar `docs/leeme.md` (sección avanzada) | 0.5 | ⏳ |
| T045 | Test: importar flow desde submódulo | 0.5 | ⏳ |
| T046 | Test: exportar flow a WIRING | 0.5 | ⏳ |
| T047 | Test: agente asesora nodos correctamente | 0.5 | ⏳ |

#### Definition of Done
- [ ] Documentación completa
- [ ] Tests manuales pasados
- [ ] Sección en docs/leeme.md

---

### SCRIPT-1.13.0-S10 — Plantillas Avanzadas (Sprint 2)
**Puntos**: 3  
**Prioridad**: Could  
**Estado**: ⏳ Pendiente

#### Descripción
Plantillas para casos de uso avanzados (Dashboard, configuración).

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T048 | Crear plantilla `dashboard-config-form` | 1 | ⏳ |
| T049 | Crear plantilla `health-monitor` | 1 | ⏳ |
| T050 | Crear plantilla `multi-bot-orchestrator` | 1 | ⏳ |

#### Definition of Done
- [ ] Plantillas en templates/flows/
- [ ] Cada plantilla documentada
- [ ] README con casos de uso

---

## Métricas

| Métrica | Valor |
|---------|-------|
| Stories totales | 10 |
| Tasks totales | 50 |
| Effort total | 38 pts |
| Prioridad Must | 6 stories (22 pts) |
| Prioridad Should | 2 stories (10 pts) |
| Prioridad Could | 2 stories (6 pts) |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| Submódulo node-red-alephscript-sdk | ✅ Instalado | Rama integration/beta/scriptorium |
| Node-RED (externo) | ⚠️ Usuario | Debe instalar manualmente |
| Plugin Teatro | ✅ Instalado | Para conexión con actores |
| kick-aleph-bot | ✅ Submódulo | Para UC1 |
| @alephscript/core | ⚠️ Externo | Modo offline si no disponible |

---

## Riesgos Identificados

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Usuario sin Node-RED | Alta | Alto | Documentar instalación, modo offline |
| Complejidad para nuevos usuarios | Media | Medio | Plantillas y asesoramiento |
| Dependencia @alephscript/core | Media | Bajo | Modo offline para MVP |
| Conflictos de puertos | Baja | Bajo | Configuración documentada |

---

## Roadmap de Feature Cycles

### FC1: Infraestructura y Asesoramiento (Sprint 1)

| Story | Objetivo | Effort |
|-------|----------|--------|
| S01 | Estructura del plugin | 3 |
| S02 | Estructura DISCO/WIRING | 3 |
| S03 | Prompts del plugin | 5 |
| S05 | Catálogo de nodos | 3 |
| **Total FC1** | | **14 pts** |

### FC2: Plantillas y Ejemplos (Sprint 1)

| Story | Objetivo | Effort |
|-------|----------|--------|
| S04 | Plantillas básicas | 5 |
| S06 | UC1 Kick + Tarotista | 5 |
| **Total FC2** | | **10 pts** |

### FC3: Sincronización y Feeds (Sprint 2)

| Story | Objetivo | Effort |
|-------|----------|--------|
| S07 | Protocolo de feeds | 5 |
| S08 | Integración sistema | 3 |
| S09 | Documentación | 3 |
| **Total FC3** | | **11 pts** |

### FC4: Avanzado (Sprint 2-3)

| Story | Objetivo | Effort |
|-------|----------|--------|
| S10 | Plantillas avanzadas | 3 |
| **Total FC4** | | **3 pts** |

---

## Pendiente Aprobación

Usuario puede revisar y aprobar con:
```
@scrum aprobar SCRIPT-1.13.0
```

O modificar el backlog antes de aprobar.
