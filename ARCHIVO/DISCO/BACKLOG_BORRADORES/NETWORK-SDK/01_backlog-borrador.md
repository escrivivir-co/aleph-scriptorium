# Backlog Borrador: SCRIPT-1.11.0 — Plugin Network (Oasis/Scuttlebutt)

> **Estado**: 🟡 BORRADOR (pendiente aprobación)  
> **Sprint propuesto**: SCRIPT-1.11.0  
> **Feature Cycle**: 1  
> **Effort estimado**: 28 puntos  
> **Fecha creación**: 2025-12-24

---

## Objetivo del Sprint

Crear el plugin `network` que permita **sincronizar BOEs entre Scriptoriums** mediante la red Oasis (Scuttlebutt). Esto habilita:

1. **Teatro distribuido**: Obras ARG con participantes en distintos Scriptoriums
2. **Colaboración P2P**: Sin servidor central, funciona offline
3. **Registro inmutable**: El BOE como cadena de mensajes firmados

---

## Épicas

| ID | Nombre | Effort | Prioridad |
|----|--------|--------|-----------|
| SCRIPT-1.11.0 | Plugin Network (Oasis/Scuttlebutt) | 28 pts | P1 |

---

## Iteraciones

| Iteración | Nombre | Objetivo | Effort | Estado |
|-----------|--------|----------|--------|--------|
| I1 | Estructura del Plugin | Crear plugin `network` básico | 6 pts | ⏳ |
| I2 | Adaptador Oasis | Conectar con ARG_BOARD plataformas | 8 pts | ⏳ |
| I3 | Sincronización de BOEs | Merge multi-autor | 8 pts | ⏳ |
| I4 | Documentación y Demo | Manual Alice-Bob + Hoja pedido | 6 pts | ⏳ |

---

## Iteración 1: Estructura del Plugin (6 pts)

**Objetivo**: Crear la estructura básica del plugin siguiendo el protocolo de PLUGINS.md.

### Story: SCRIPT-1.11.0-S01 — Crear Plugin Network
**Effort**: 6 pts  
**Prioridad**: Must

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T001 | Crear `.github/plugins/network/manifest.md` | 0.5 | ⏳ |
| T002 | Crear `agents/network.agent.md` | 1 | ⏳ |
| T003 | Crear `instructions/network.instructions.md` | 1 | ⏳ |
| T004 | Crear `prompts/publicar-boe.prompt.md` | 0.5 | ⏳ |
| T005 | Crear `prompts/recibir-boe.prompt.md` | 0.5 | ⏳ |
| T006 | Crear `prompts/sincronizar-boe.prompt.md` | 0.5 | ⏳ |
| T007 | Crear `prompts/configurar-oasis.prompt.md` | 0.5 | ⏳ |
| T008 | Crear bridge `plugin_ox_network.agent.md` | 0.5 | ⏳ |
| T009 | Registrar en `registry.json` | 0.5 | ⏳ |
| T010 | Actualizar `aleph.agent.md` con handoffs | 0.5 | ⏳ |

**Definition of Done**:
- Plugin network instalado según protocolo
- Bridge detectado por VS Code
- Handoffs disponibles desde @aleph

---

## Iteración 2: Adaptador Oasis (8 pts)

**Objetivo**: Crear el adaptador de plataforma `oasis` para ARG_BOARD.

### Story: SCRIPT-1.11.0-S02 — Adaptador de Plataforma Oasis
**Effort**: 5 pts  
**Prioridad**: Must

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T011 | Diseñar schema de mensaje Oasis para BOE | 1 | ⏳ |
| T012 | Crear `adaptador-oasis.json` en plataformas de ARG | 1 | ⏳ |
| T013 | Implementar serializador BOE → Feed Message | 1 | ⏳ |
| T014 | Implementar deserializador Feed Message → BOE | 1 | ⏳ |
| T015 | Documentar formato de mensajes | 1 | ⏳ |

### Story: SCRIPT-1.11.0-S03 — Conexión con Docker
**Effort**: 3 pts  
**Prioridad**: Should

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T016 | Documentar cómo arrancar Oasis con Docker | 1 | ⏳ |
| T017 | Crear script `scripts/start-oasis.sh` | 1 | ⏳ |
| T018 | Documentar puertos y API local de Oasis | 1 | ⏳ |

**Definition of Done**:
- Adaptador `oasis` registrado en ARG_BOARD
- BOE se serializa/deserializa correctamente
- Documentación de cómo iniciar Oasis

---

## Iteración 3: Sincronización de BOEs (8 pts)

**Objetivo**: Implementar el protocolo de sincronización multi-autor.

### Story: SCRIPT-1.11.0-S04 — Extensión del BOE Multi-Autor
**Effort**: 3 pts  
**Prioridad**: Must

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T019 | Añadir campo `origen` a entradas de BOE | 1 | ⏳ |
| T020 | Añadir campo `autor_id` (clave pública Oasis) | 0.5 | ⏳ |
| T021 | Añadir campo `firma` (signature SSB) | 0.5 | ⏳ |
| T022 | Actualizar schema de BOE en ARG_BOARD | 1 | ⏳ |

### Story: SCRIPT-1.11.0-S05 — Protocolo de Merge
**Effort**: 5 pts  
**Prioridad**: Must

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T023 | Diseñar algoritmo de merge append-only | 1 | ⏳ |
| T024 | Implementar ordenación por timestamp | 1 | ⏳ |
| T025 | Implementar detección de duplicados (por hash) | 1 | ⏳ |
| T026 | Crear prompt `resolver-conflicto-boe.prompt.md` | 1 | ⏳ |
| T027 | Documentar protocolo de merge | 1 | ⏳ |

**Definition of Done**:
- BOE soporta entradas de múltiples orígenes
- Merge produce BOE consistente sin pérdida de datos
- Conflictos detectados y resueltos automáticamente

---

## Iteración 4: Documentación y Demo (6 pts)

**Objetivo**: Crear documentación de uso y propuesta para Oasis.

### Story: SCRIPT-1.11.0-S06 — Manual Alice-Bob
**Effort**: 3 pts  
**Prioridad**: Should

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T028 | Crear `docs/alice-bob-demo.md` con flujo completo | 1.5 | ⏳ |
| T029 | Crear diagramas de secuencia del demo | 1 | ⏳ |
| T030 | Añadir sección "Cómo probar" con comandos | 0.5 | ⏳ |

### Story: SCRIPT-1.11.0-S07 — Hoja de Pedido a Oasis
**Effort**: 3 pts  
**Prioridad**: Should

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T031 | Crear `docs/hoja-pedido-oasis.md` | 1 | ⏳ |
| T032 | Documentar propuesta de protocolo de enrolamiento | 1 | ⏳ |
| T033 | Documentar propuesta de sincronización de BOEs | 0.5 | ⏳ |
| T034 | Crear issue template para enviar a Oasis | 0.5 | ⏳ |

**Definition of Done**:
- Manual Alice-Bob completo y ejecutable
- Hoja de pedido lista para enviar al proyecto Oasis

---

## Métricas

| Métrica | Target | Mínimo |
|---------|--------|--------|
| Tasks completadas | 34 | 20 |
| Cobertura I1 | 100% | 100% |
| Cobertura I2-I4 | 80% | 50% |
| Documentación | 4 docs | 2 docs |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| Submódulo alephscript-network-sdk | ✅ Instalado | Rama integration/beta/scriptorium |
| Plugin arg-board | ✅ Activo | Requiere extensión de plataformas |
| Plugin teatro | ✅ Activo | Genera BOEs |
| Docker runtime | ⚠️ Externo | Usuario debe tener Docker |

---

## Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Docker no disponible | Media | Alto | Documentar modo mock/simulado |
| API Oasis cambia | Baja | Medio | Versionar adaptador |
| Merge conflicts | Media | Medio | CRDT para campos críticos |

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-24 | Crear borrador inicial | @scrum |
| 2025-12-24 | Añadir conversación PO-SM | @scrum |

---

## Aprobación

**Estado**: 🟡 PENDIENTE

Para aprobar este backlog:
1. Revisar con `/aprobar-backlog.prompt.md`
2. Mover a backlog principal (`BACKLOG-SCRIPTORIUM.md`)
3. Crear épica SCRIPT-1.11.0 en el backlog
