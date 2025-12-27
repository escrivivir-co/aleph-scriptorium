# Backlog Borrador: CLI Scriptorium

> **Estado**: 📋 Borrador (pendiente aprobación PO)  
> **Fecha propuesta**: 2025-12-27  
> **Épica padre**: CLI-1.0.0  
> **Ubicación borrador**: `ARCHIVO/DISCO/BACKLOG_BORRADORES/CLI_SCRIPTORIUM/`

---

## 1. Resumen Ejecutivo

### Objetivo
Aplicación de consola Node.js + TypeScript que modela `.github/` desde los índices DRY, con hot-reload de plantillas Markdown.

### Entregables
- Monorepo con 7 paquetes
- CLI ejecutable (`scriptorium`)
- Hot-reload de agentes/plugins/prompts
- Menús interactivos derivados de SPLASH

### Dependencias
- Node.js 20+
- pnpm 8+
- TypeScript 5.3+

---

## 2. Épicas por Equipo

### 2.1 EQUIPO TYPES

**Responsabilidad**: Definir todas las interfaces y tipos del sistema.

| ID | Story | Descripción | Puntos |
|----|-------|-------------|--------|
| TYPES-1.1 | Tipos de agentes | Completar `agents.ts` con todos los campos | 3 |
| TYPES-1.2 | Tipos de plugins | Completar `plugins.ts` con validaciones | 3 |
| TYPES-1.3 | Tipos de menú | Completar `menu.ts` con SPLASH/README | 5 |
| TYPES-1.4 | Tipos de sync | Completar `sync.ts` con eventos | 3 |
| TYPES-1.5 | Tipos de runtime | Completar `runtime.ts` con métricas | 5 |
| TYPES-2.1 | JSON Schemas | Crear schemas de validación | 5 |
| TYPES-2.2 | Tests de tipos | Verificar tipado con `tsd` | 3 |

**DoD**:
- [ ] No hay `any` en el código
- [ ] JSDoc en todas las interfaces públicas
- [ ] README del paquete actualizado

---

### 2.2 EQUIPO CORE

**Responsabilidad**: Implementar parsers, loaders y sincronización.

| ID | Story | Descripción | Puntos |
|----|-------|-------------|--------|
| CORE-1.1 | Parser Markdown | Implementar `IMarkdownParser` | 5 |
| CORE-1.2 | Parser frontmatter | Integrar gray-matter | 3 |
| CORE-1.3 | Extractor secciones | Extraer headings jerárquicos | 5 |
| CORE-1.4 | Extractor tablas | Parsear tablas Markdown | 3 |
| CORE-2.1 | Agent Loader | Implementar `IAgentLoader` | 5 |
| CORE-2.2 | Plugin Loader | Implementar `IPluginLoader` | 5 |
| CORE-2.3 | Instruction Loader | Implementar `IInstructionLoader` | 3 |
| CORE-2.4 | Prompt Loader | Implementar `IPromptLoader` | 3 |
| CORE-2.5 | Index Loader | Cargar Funcional.md y Tecnico.md | 5 |
| CORE-3.1 | File Watcher | Integrar chokidar con debounce | 5 |
| CORE-3.2 | Sync Service | Implementar `ISyncService` | 8 |
| CORE-3.3 | Cache Manager | Implementar `ICacheManager` | 5 |
| CORE-3.4 | Event Aggregator | Agregar eventos con debounce | 3 |

**DoD**:
- [ ] Tests unitarios >80%
- [ ] Funciona con hot-reload <1s
- [ ] Maneja errores gracefully

---

### 2.3 EQUIPO UI

**Responsabilidad**: Renderizado de consola y menús interactivos.

| ID | Story | Descripción | Puntos |
|----|-------|-------------|--------|
| UI-1.1 | Menu Renderer | Implementar `IMenuRenderer` | 5 |
| UI-1.2 | Render SPLASH | Mapear secciones SPLASH a menú | 5 |
| UI-1.3 | Render README | Sincronizar con estructura README | 3 |
| UI-2.1 | Componente Box | Cajas con bordes y títulos | 2 |
| UI-2.2 | Componente Table | Tablas formateadas | 3 |
| UI-2.3 | Componente List | Listas con bullets/números | 2 |
| UI-2.4 | Componente Progress | Barras de progreso | 2 |
| UI-2.5 | Componente Spinner | Spinners animados | 2 |
| UI-2.6 | Componente Tree | Árboles de estructura | 3 |
| UI-3.1 | Input Select | Selección de menú | 3 |
| UI-3.2 | Input Text | Input de texto con validación | 2 |
| UI-3.3 | Input Autocomplete | Autocompletado dinámico | 5 |
| UI-3.4 | Input Editor | Editor multilínea | 3 |
| UI-4.1 | Tema Default | Tema Scriptorium | 2 |
| UI-4.2 | Tema Banderas | Colores de las 5 banderas | 2 |

**DoD**:
- [ ] Funciona en macOS/Linux/Windows
- [ ] Colores desactivables con `--no-color`
- [ ] Accesible (no depende solo de color)

---

### 2.4 EQUIPO RUNTIME

**Responsabilidad**: Ejecución de agentes y sistema de prompts.

| ID | Story | Descripción | Puntos |
|----|-------|-------------|--------|
| RUNTIME-1.1 | Agent Loader | Cargar agentes en memoria | 5 |
| RUNTIME-1.2 | Agent Invoker | Ejecutar agente con contexto | 8 |
| RUNTIME-1.3 | Handoff Executor | Ejecutar handoffs encadenados | 5 |
| RUNTIME-1.4 | Metrics Collector | Recopilar métricas de ejecución | 3 |
| RUNTIME-2.1 | Prompt Loader | Cargar prompts con frontmatter | 3 |
| RUNTIME-2.2 | Prompt Renderer | Renderizar con variables | 5 |
| RUNTIME-2.3 | Variable Extractor | Extraer {{ variables }} | 3 |
| RUNTIME-2.4 | Prompt Validator | Validar variables requeridas | 3 |
| RUNTIME-3.1 | MCP Integration | Integrar con servidores MCP | 8 |

**DoD**:
- [ ] Timeouts configurables
- [ ] Límite de handoffs encadenados
- [ ] Logs estructurados

---

### 2.5 EQUIPO CLI

**Responsabilidad**: Integrar todo en comandos ejecutables.

| ID | Story | Descripción | Puntos |
|----|-------|-------------|--------|
| CLI-1.1 | Setup Commander | Configurar framework CLI | 3 |
| CLI-1.2 | Comando menu | Menú principal interactivo | 5 |
| CLI-1.3 | Comando agents | Listar agentes por capa | 3 |
| CLI-1.4 | Comando invoke | Invocar agente | 5 |
| CLI-1.5 | Comando plugins | Gestionar plugins | 5 |
| CLI-1.6 | Comando sync | Sincronización manual | 3 |
| CLI-1.7 | Comando status | Estado del sistema | 3 |
| CLI-1.8 | Comando index | Ver índices DRY | 3 |
| CLI-1.9 | Comando config | Configuración persistente | 3 |
| CLI-1.10 | Comando dev | Modo desarrollo con watch | 5 |
| CLI-2.1 | State Manager | Gestionar ScriptoriumState | 5 |
| CLI-2.2 | Config persistente | Integrar conf | 3 |
| CLI-2.3 | Update Notifier | Notificar actualizaciones | 2 |
| CLI-3.1 | Docs: README | Documentación del CLI | 3 |
| CLI-3.2 | Docs: Ejemplos | Casos de uso documentados | 3 |

**DoD**:
- [ ] Help completo para cada comando
- [ ] Exit codes estándar
- [ ] Errores informativos

---

## 3. Priorización Sugerida

### Fase 1: Fundamentos (Sprint 1-2)
1. TYPES-1.* (todos los tipos)
2. CORE-1.* (parsers)
3. CORE-2.1-2.2 (loaders básicos)

### Fase 2: Sincronización (Sprint 3)
1. CORE-3.* (watchers, sync)
2. TYPES-2.* (schemas)

### Fase 3: UI (Sprint 4)
1. UI-1.* (renderizado menú)
2. UI-2.* (componentes)
3. UI-3.* (input)

### Fase 4: Runtime (Sprint 5)
1. RUNTIME-1.* (agentes)
2. RUNTIME-2.* (prompts)

### Fase 5: CLI (Sprint 6)
1. CLI-1.* (comandos)
2. CLI-2.* (estado)
3. CLI-3.* (docs)

---

## 4. Criterios de Aceptación Global

### Por Paquete
- [ ] Tipado estricto (tsconfig strict)
- [ ] Tests unitarios (vitest)
- [ ] Exports limpios en index.ts
- [ ] README con ejemplos

### Por Épica
- [ ] Interfaces definidas antes de implementar
- [ ] Sin dependencias circulares
- [ ] Code review aprobado

### Sistema Completo
- [ ] Hot-reload funciona en <1s
- [ ] Menú refleja estructura de índices
- [ ] Agentes invocables desde CLI
- [ ] Plugins activables/desactivables

---

## 5. Riesgos Identificados

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Parsing complejo | Media | Alto | Tests exhaustivos de edge cases |
| Race conditions en sync | Alta | Alto | Event aggregation + debounce |
| Incompatibilidad Windows | Media | Medio | CI en Windows |
| Memoria con muchos watchers | Baja | Medio | Pooling de watchers |

---

## 6. Archivos Entregados (Anchura)

### Tipos (`packages/types/`)
- [x] `index.ts` - Exports
- [x] `agents.ts` - Tipos de agentes
- [x] `plugins.ts` - Tipos de plugins
- [x] `instructions.ts` - Tipos de instrucciones
- [x] `prompts.ts` - Tipos de prompts
- [x] `menu.ts` - Tipos de menú
- [x] `sync.ts` - Tipos de sincronización
- [x] `workspace.ts` - Tipos de workspace
- [x] `runtime.ts` - Tipos de runtime

### Core (`packages/core/`)
- [x] `index.ts` - Exports
- [x] `interfaces.ts` - Interfaces de servicios
- [ ] `loaders.ts` - Stub (implementar)
- [ ] `parsers.ts` - Stub (implementar)
- [ ] `sync.ts` - Stub (implementar)

### UI (`packages/menu-renderer/`)
- [x] `index.ts` - Interfaces de renderizado

### Runtime (`packages/agent-runtime/`)
- [x] `index.ts` - Interfaces de runtime

### CLI (`apps/cli/`)
- [x] `src/index.ts` - Interfaces de comandos

### Schemas (`schemas/`)
- [x] `agent-definition.schema.json`
- [x] `plugin-registry.schema.json`
- [x] `menu-definition.schema.json`

### Config
- [x] `package.json` - Monorepo root
- [x] `pnpm-workspace.yaml`
- [x] `tsconfig.base.json`
- [x] `turbo.json`

---

## 7. Próximos Pasos

1. **Revisar borrador** con PO
2. **Asignar equipos** a épicas
3. **Setup monorepo** (`pnpm install`)
4. **Implementar TYPES** primero (fundamento)
5. **Iterar** según priorización

---

> **Nota**: Este backlog define **anchura** (qué hacer). La **profundidad** (cómo hacerlo) queda para cada equipo durante el refinamiento de sprints.
