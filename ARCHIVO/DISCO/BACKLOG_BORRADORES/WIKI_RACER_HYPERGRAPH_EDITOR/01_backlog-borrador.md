# Backlog Borrador: SCRIPT-1.13.0 — HyperGraphEditor (Navegador de Hipergrafos)

**Opportunity**: Aleph Scriptorium  
**Sprint**: 2  
**Effort total**: 26 pts  
**Estado**: 📝 Borrador (pendiente aprobación)

---

## Contexto

**Problema**: No existe forma de navegar y trazar caminos entre nodos de un grafo hipervinculado.

**Solución**: HyperGraphEditor abstrae el motor de wiki-racer para navegar cualquier sistema con hipervínculos (Wikipedia, ARCHIVO/, Enciclopedia).

**Submódulo fuente**: `wiki-racer`  
**Dependencias**: Ninguna (plugin transversal)

---

## Feature Cycles

| Ciclo | Objetivo | Effort |
|-------|----------|--------|
| FC1 | Estructura del plugin + agente | 5 pts |
| FC2 | Motor abstracto + interfaz IGraphSource | 8 pts |
| FC3 | Preset MediaWiki | 5 pts |
| FC4 | Almacenamiento y visualización | 8 pts |

---

## Stories

### SCRIPT-1.13.0-S01 — Estructura del Plugin HyperGraphEditor
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Crear la estructura base del plugin transversal.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T001 | Crear `.github/plugins/hypergraph-editor/manifest.md` | 0.5 | ⏳ |
| T002 | Crear `agents/hypergraph-editor.agent.md` | 1 | ⏳ |
| T003 | Crear `instructions/hypergraph-editor.instructions.md` | 0.5 | ⏳ |
| T004 | Crear `ARCHIVO/PLUGINS/HYPERGRAPH_EDITOR/README.md` | 0.5 | ⏳ |
| T005 | Crear bridge `plugin_ox_hypergrapheditor.agent.md` | 1 | ⏳ |
| T006 | Actualizar `registry.json` | 0.5 | ⏳ |
| T007 | Crear `prompts/navegar-grafo.prompt.md` | 1 | ⏳ |

#### Definition of Done
- [ ] Plugin tiene manifest.md válido
- [ ] Bridge detectable por VS Code
- [ ] Aparece en registry.json

---

### SCRIPT-1.13.0-S02 — Motor Abstracto + IGraphSource
**Puntos**: 8  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Abstraer el motor de wiki-racer para aceptar cualquier fuente de grafos.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T008 | Definir interfaz `IGraphSource` | 1 | ⏳ |
| T009 | Definir tipos `Node`, `Link`, `Path` | 1 | ⏳ |
| T010 | Crear `ARCHIVO/PLUGINS/HYPERGRAPH_EDITOR/schemas/graph-source.schema.json` | 1 | ⏳ |
| T011 | Documentar protocolo de presets | 1 | ⏳ |
| T012 | Crear `prompts/crear-preset.prompt.md` | 1 | ⏳ |
| T013 | Adaptar motor wiki-racer a IGraphSource | 2 | ⏳ |
| T014 | Test: motor con mock source | 1 | ⏳ |

#### Definition of Done
- [ ] Interfaz IGraphSource documentada
- [ ] Motor funciona con cualquier implementación de IGraphSource
- [ ] Test con mock pasa

---

### SCRIPT-1.13.0-S03 — Preset MediaWiki
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Implementar preset para Wikipedia/MediaWiki como ejemplo.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T015 | Crear `ARCHIVO/PLUGINS/HYPERGRAPH_EDITOR/presets/mediawiki.json` | 1 | ⏳ |
| T016 | Implementar conector MediaWiki API | 2 | ⏳ |
| T017 | Configurar filtros (excluir Especial:, Archivo:, etc.) | 0.5 | ⏳ |
| T018 | Crear `prompts/buscar-camino-wikipedia.prompt.md` | 1 | ⏳ |
| T019 | Test: camino entre 2 artículos Wikipedia ES | 0.5 | ⏳ |

#### Definition of Done
- [ ] Preset mediawiki.json creado
- [ ] Conector funciona con Wikipedia ES
- [ ] Test de camino exitoso

---

### SCRIPT-1.13.0-S04 — Almacenamiento y Visualización
**Puntos**: 8  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

#### Descripción
Guardar caminos trazados y visualizar grafos explorados.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T020 | Crear schema de almacenamiento de caminos | 1 | ⏳ |
| T021 | Crear `ARCHIVO/PLUGINS/HYPERGRAPH_EDITOR/graphs/` para datos | 0.5 | ⏳ |
| T022 | Implementar guardado de camino en JSON | 1 | ⏳ |
| T023 | Crear `prompts/guardar-camino.prompt.md` | 1 | ⏳ |
| T024 | Crear `prompts/cargar-camino.prompt.md` | 1 | ⏳ |
| T025 | Documentar formato de visualización (para futuro) | 1 | ⏳ |
| T026 | Integrar con BlocklyEditor para visualización (opcional) | 1.5 | ⏳ |
| T027 | Actualizar docs/leeme.md con HyperGraphEditor | 1 | ⏳ |

#### Definition of Done
- [ ] Caminos se guardan en formato JSON
- [ ] Caminos se pueden cargar y continuar
- [ ] Documentación de visualización para futuro

---

## Métricas

| Métrica | Valor |
|---------|-------|
| Stories totales | 4 |
| Tasks totales | 27 |
| Effort total | 26 pts |
| Prioridad Must | 3 stories (18 pts) |
| Prioridad Should | 1 story (8 pts) |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| Submódulo wiki-racer | ✅ Instalado | Rama integration/beta/scriptorium |
| Conexión a Internet | ⚠️ Requerida | Para preset MediaWiki |

---

## Presets Planificados

| Preset | Sprint | Prioridad |
|--------|--------|-----------|
| `mediawiki.json` | Sprint 2 | Must |
| `archivo.json` | Sprint 3 | Should |
| `enciclopedia.json` | Sprint 3 | Could |

---

## Pendiente aprobación

Usuario debe revisar y aprobar con `@scrum aprobar`.
