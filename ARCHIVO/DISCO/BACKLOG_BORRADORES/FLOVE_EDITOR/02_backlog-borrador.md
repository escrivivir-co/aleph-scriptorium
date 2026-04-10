# Backlog Borrador: SCRIPT-1.20.0 — FVEEditor

> **Sprint**: Feature Cycle 1  
> **Fecha inicio**: 2025-01-02  
> **Estado**: ✅ Publicado en BACKLOG-SCRIPTORIUM.md (consolidado 2025-12-26)  
> **Effort total**: 29 puntos

---

## Contexto

Este backlog define la creación del plugin **FVEEditor** para integrar la ontología FVE.org en el ecosistema ALEPH Scriptorium. La ontología FVE ofrece un marco biocéntrico/holístico complementario a los paradigmas FIA existentes en as-gym.

### Fuentes de ontología

| Fuente | Contenido | Estado |
|--------|-----------|--------|
| demos.flove.org/whole | Tabla de taxonomía completa | ✅ Capturada |
| flove.org | Filosofía y paradigmas | ✅ Explorada |
| Codeberg FVEDocs/Main | Documentación técnica | ✅ Explorada |
| FVETables25.12.pdf | Tablas actualizadas (Dic 2025) | ⏳ Pendiente download |

---

## Épicas

| ID | Nombre | Opportunity | Effort | Prioridad |
|----|--------|-------------|--------|-----------|
| SCRIPT-1.20.0 | Fuente de Datos FVEOnto | Scriptorium | 8 pts | P0 |
| SCRIPT-1.21.0 | Plugin FVEEditor | Scriptorium | 13 pts | P1 |
| SCRIPT-1.22.0 | Integración AGENT_CREATOR | Scriptorium | 8 pts | P1 |

---

## Feature Cycle 1: Estructura

```
┌─────────────────────────────────────────────────────────────────┐
│                     FEATURE CYCLE 1                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│   I1 (30%)          I2 (45%)           I3 (25%)                  │
│   ┌─────────┐       ┌─────────┐        ┌─────────┐               │
│   │ Ontology│ ────▶ │ Plugin  │ ────▶  │Integr.  │               │
│   │ Schema  │       │ Core    │        │ AC      │               │
│   └─────────┘       └─────────┘        └─────────┘               │
│   8 pts             13 pts             8 pts                     │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Iteración 1: Fuente de Datos FVEOnto (SCRIPT-1.20.0)

**Objetivo**: Capturar y estructurar la ontología FVE como JSON Schema  
**Effort**: 8 puntos (30% del ciclo)

### Stories

#### SCRIPT-1.20.0-S01: Captura de Ontología
**Effort**: 3 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T001 | Crear carpeta `ARCHIVO/PLUGINS/FLOVE_EDITOR/` | 0.5 | ⏳ |
| T002 | Copiar tabla de taxonomía de demos.flove.org/whole | 0.5 | ⏳ |
| T003 | Documentar los 10 campos de la ontología | 1 | ⏳ |
| T004 | Documentar las 4 capas (Substance, Fields, Paradigms, Apps) | 1 | ⏳ |

**Definition of Done**: Documentación completa de la ontología en formato Markdown.

---

#### SCRIPT-1.20.0-S02: JSON Schema de Ontología
**Effort**: 5 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T005 | Diseñar estructura base del schema | 1 | ⏳ |
| T006 | Definir tipo `FVEField` (10 campos) | 1 | ⏳ |
| T007 | Definir tipo `FVEParadigm` (6 paradigmas core) | 1 | ⏳ |
| T008 | Definir tipo `FVEApp` (7 aplicaciones) | 1 | ⏳ |
| T009 | Crear `flove-ontology.schema.json` completo | 1 | ⏳ |

**Definition of Done**: Schema JSON válido que pasa validación AJV.

---

### Entregables Iteración 1

| Artefacto | Ruta | Estado |
|-----------|------|--------|
| README.md | `ARCHIVO/PLUGINS/FLOVE_EDITOR/README.md` | ⏳ |
| Ontología (docs) | `ARCHIVO/PLUGINS/FLOVE_EDITOR/ontology/` | ⏳ |
| JSON Schema | `ARCHIVO/PLUGINS/FLOVE_EDITOR/schemas/flove-ontology.schema.json` | ⏳ |

---

## Iteración 2: Plugin FVEEditor Core (SCRIPT-1.21.0)

**Objetivo**: Crear estructura completa del plugin siguiendo protocolo PLUGINS.md  
**Effort**: 13 puntos (45% del ciclo)

### Stories

#### SCRIPT-1.21.0-S01: Estructura del Plugin
**Effort**: 3 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T010 | Crear `.github/plugins/flove-editor/manifest.md` | 1 | ⏳ |
| T011 | Crear estructura de carpetas (agents/, prompts/, instructions/) | 0.5 | ⏳ |
| T012 | Crear `instructions/flove-editor.instructions.md` | 1 | ⏳ |
| T013 | Actualizar `registry.json` con nuevo plugin | 0.5 | ⏳ |

**Definition of Done**: Estructura de plugin válida según PLUGINS.md.

---

#### SCRIPT-1.21.0-S02: Agente FVEEditor
**Effort**: 5 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T014 | Crear `agents/flove-editor.agent.md` con frontmatter | 1 | ⏳ |
| T015 | Definir 6 handoffs principales | 1 | ⏳ |
| T016 | Documentar capacidades del agente | 1 | ⏳ |
| T017 | Crear bridge `plugin_ox_floveeditor.agent.md` en `.github/agents/` | 1 | ⏳ |
| T018 | Actualizar `ox.agent.md` con índice del nuevo bridge | 1 | ⏳ |

**Definition of Done**: Agente invocable vía `@plugin_ox_floveeditor`.

---

#### SCRIPT-1.21.0-S03: Prompts del Plugin
**Effort**: 5 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T019 | Crear `prompts/crear-regla-flove.prompt.md` | 1 | ⏳ |
| T020 | Crear `prompts/explorar-paradigma.prompt.md` | 1 | ⏳ |
| T021 | Crear `prompts/asignar-campo.prompt.md` | 1 | ⏳ |
| T022 | Crear `prompts/exportar-logica.prompt.md` | 1 | ⏳ |
| T023 | Crear `prompts/validar-coherencia-flove.prompt.md` | 1 | ⏳ |

**Definition of Done**: 5 prompts funcionales documentados.

---

### Entregables Iteración 2

| Artefacto | Ruta | Estado |
|-----------|------|--------|
| Manifest | `.github/plugins/flove-editor/manifest.md` | ⏳ |
| Agent | `.github/plugins/flove-editor/agents/flove-editor.agent.md` | ⏳ |
| Bridge | `.github/agents/plugin_ox_floveeditor.agent.md` | ⏳ |
| Prompts (5) | `.github/plugins/flove-editor/prompts/*.prompt.md` | ⏳ |
| Instructions | `.github/plugins/flove-editor/instructions/flove-editor.instructions.md` | ⏳ |

---

## Iteración 3: Integración con AGENT_CREATOR (SCRIPT-1.22.0)

**Objetivo**: Habilitar creación de agentes con "alma FVE"  
**Effort**: 8 puntos (25% del ciclo)

### Stories

#### SCRIPT-1.22.0-S01: Extensión del Schema de Recipes
**Effort**: 3 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T024 | Añadir campo `floveParadigm` al schema de recipes | 1 | ⏳ |
| T025 | Añadir campo `floveFields` (array de campos) | 0.5 | ⏳ |
| T026 | Añadir campo `floveApps` (array de apps) | 0.5 | ⏳ |
| T027 | Documentar nuevos campos en AGENT_CREATOR/README.md | 1 | ⏳ |

**Definition of Done**: Schema de recipes acepta campos FVE.

---

#### SCRIPT-1.22.0-S02: Flujo de Creación con FVE
**Effort**: 3 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T028 | Modificar `crear-agente.prompt.md` para ofrecer opción FVE | 1 | ⏳ |
| T029 | Crear paso de selección de paradigma FVE | 1 | ⏳ |
| T030 | Integrar validación contra `flove-ontology.schema.json` | 1 | ⏳ |

**Definition of Done**: Flujo de creación incluye opción FVE.

---

#### SCRIPT-1.22.0-S03: Ejemplo Demostración
**Effort**: 2 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T031 | Crear recipe `flove-demo.recipe.json` con paradigma Confluentism | 1 | ⏳ |
| T032 | Crear agente de ejemplo `flove-demo.agent.md` | 1 | ⏳ |

**Definition of Done**: Agente de demostración funcional.

---

### Entregables Iteración 3

| Artefacto | Ruta | Estado |
|-----------|------|--------|
| Schema extendido | (en AGENT_CREATOR) | ⏳ |
| Prompt modificado | (en AGENT_CREATOR) | ⏳ |
| Recipe demo | `ARCHIVO/PLUGINS/AGENT_CREATOR/recipes/flove-demo.recipe.json` | ⏳ |
| Agent demo | `ARCHIVO/PLUGINS/AGENT_CREATOR/agents/created/flove-demo.agent.md` | ⏳ |

---

## Métricas

| Métrica | Target | Mínimo | Estado |
|---------|--------|--------|--------|
| Tasks totales | 32/32 | 20/32 | ⏳ |
| Effort completado | 29 pts | 18 pts | ⏳ |
| % Avance | 100% | 60% | ⏳ |
| Prompts creados | 5 | 3 | ⏳ |
| Schema válido | ✅ | ⚠️ | ⏳ |
| Agente demo | ✅ | ❌ | ⏳ |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| Plugin AGENT_CREATOR | ✅ Instalado | Base para integración |
| demos.flove.org | ⚠️ Inestable | Usar copia local |
| Codeberg FVEDocs | ✅ Disponible | Backup de ontología |
| Plugin TypedPrompting | ⏳ Opcional | Para validación JSON |

---

## Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Ontología FVE cambia | Media | Medio | Versionar schema con fecha |
| demos.flove.org offline | Alta | Bajo | Copia en ARCHIVO/PLUGINS/ |
| Conflicto con as-gym | Baja | Medio | Namespace `flove_` |
| Complejidad excesiva | Media | Alto | Empezar con 3 campos |

---

## Handoffs propuestos para @aleph

| Handoff | Target |
|---------|--------|
| `[FLOVE-EDITOR] Crear regla lógica` | FVEEditor |
| `[FLOVE-EDITOR] Explorar paradigma` | FVEEditor |
| `[FLOVE-EDITOR] Asignar campo ontológico` | FVEEditor |
| `[FLOVE-EDITOR] Exportar lógica` | FVEEditor |
| `[FLOVE-EDITOR] Validar coherencia FVE` | FVEEditor |

---

## Pendiente aprobación

Usuario debe revisar y aprobar con `@scrum aprobar`.

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-01-02 | Crear backlog borrador desde conversación PO-SM | @scrum |
