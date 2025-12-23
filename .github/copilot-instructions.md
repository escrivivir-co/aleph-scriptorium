# Instrucciones Globales (Copilot)

> **Hub Central de Instrucciones**
> Este archivo actúa como índice maestro. No duplica reglas definidas en otros documentos.

## 1. Identidad del Workspace

Este es un proyecto de **escritura política** dividido en dos "Opportunities":
1. **Aleph Scriptorium** (`.github/`): Infraestructura, agentes y herramientas.
2. **Fundación** (`ARCHIVO/`, `PROYECTOS/`): Contenido doctrinal y capítulos del texto fundacional (2026).

## 2. Protocolo DevOps y Gestión

**Fuente de verdad**: [DEVOPS.md](DEVOPS.md)

- **Metodología**: Agile/Scrum adaptado.
- **Backlogs**:
  - Scriptorium: [BACKLOG-SCRIPTORIUM.md](BACKLOG-SCRIPTORIUM.md)
  - Fundación: [../PROYECTOS/FUNDACION/BACKLOG-FUNDACION.md](../PROYECTOS/FUNDACION/BACKLOG-FUNDACION.md)
- **Commits**: Seguir estrictamente la convención definida en DEVOPS.md.

## 3. Taxonomía de Agentes

> **Fuente de verdad**: [agents/ox.agent.md](agents/ox.agent.md)  
> **DRY**: En caso de duda sobre agentes disponibles o su función, invocar `@ox`.

### Arquitectura por Capas

```
🐂 OX (Meta) ← Oráculo: conoce todos los agentes
     │
     ├─── 🟢 UI (Producción)
     │         @aleph, @revisor, @periodico
     │
     ├─── 🔵⚫🔴🟡🟠 Backend (Auditoría)
     │         @blueflag, @blackflag, @redflag, @yellowflag, @orangeflag
     │
     ├─── ⚪ Sistema (Navegación)
     │         @vestibulo, @cartaspuerta
     │
     ├─── ⚙️ Meta (Gestión)
     │         @pluginmanager, @ox
     │
     └─── 🔌 Plugins (Extensiones)
               Por plugin instalado (ver sección 7)
```

### Índice Rápido

| Capa | Agentes | Función |
|------|---------|---------|
| **UI** | @aleph, @revisor, @periodico | Producción e interfaz con usuario |
| **Backend** | @blueflag, @blackflag, @redflag, @yellowflag, @orangeflag | Auditoría (5 Banderas) |
| **Sistema** | @vestibulo, @cartaspuerta | Navegación y orientación |
| **Meta** | @pluginmanager, @ox | Gestión del sistema |
| **Plugins** | Variable | Capacidades extendidas |

### Agente Oráculo (Ox)

`@ox` es el meta-agente que:
- Conoce el índice completo de agentes (JSON embebido)
- Genera documentación actualizada (README, manuales)
- Diagnostica inconsistencias entre agentes
- Responde "¿qué agente uso para X?"

**Invocar cuando**: No sepas qué agente usar, necesites documentación, o detectes inconsistencias.

### Plugin Bridges

> **Problema**: VS Code solo carga agentes desde `.github/agents/`, no desde carpetas de plugins.
> **Solución**: Agentes bridge (`plugin_ox_{nombre}`) que delegan a los agentes reales.

| Bridge | Plugin | Agentes |
|--------|--------|---------|
| `@plugin_ox_argboard` | ARG Board | Arrakis, BOE, Decoherence... (8) |
| `@plugin_ox_enciclopedia` | Enciclopedia | Bibliotecario, HDF-EC (2) |
| `@plugin_ox_ghpages` | GH-Pages | GHPages (1) |
| `@plugin_ox_foroscraper` | Foro Scraper | ForoScraper (1) |
| `@plugin_ox_agentcreator` | Agent Creator | AgentCreator (1) |
| `@plugin_ox_teatro` | Teatro | Teatro (1) |
| `@plugin_ox_scrum` | Scrum | Scrum (1) |

**Invocar plugins a través de bridges**: Los handoffs de @aleph apuntan a bridges detectables por VS Code.

### Plugin Discovery (Settings de Workspace)

> **SCRIPT-1.5.0**: Los prompts e instructions de plugins ahora son accesibles vía `.vscode/settings.json`.

Los settings de workspace añaden carpetas adicionales para detectar recursos de plugins:

| Setting | Propósito |
|---------|-----------|
| `chat.promptFilesLocations` | Detecta prompts de plugins (33 adicionales) |
| `chat.instructionsFilesLocations` | Detecta instructions de plugins (7 adicionales) |
| `chat.useNestedAgentsMdFiles` | Busca AGENTS.md en subcarpetas |
| `chat.promptFilesRecommendations` | Muestra prompts sugeridos |

**Resultado**: Los prompts de plugins aparecen al escribir `/` en el chat.

## 4. Instrucciones de Contenido (Doctrina)

El contenido se rige por instrucciones específicas. **No improvisar** estilos ni estructuras.

| Contexto | Instrucción Maestra |
|----------|---------------------|
| **Voz y Estilo** | [instructions/voz-manifiesto.instructions.md](instructions/voz-manifiesto.instructions.md) |
| **Diagnóstico** | [instructions/diagnostico.instructions.md](instructions/diagnostico.instructions.md) (Memoria, no guía) |
| **Justificación** | [instructions/justificacion.instructions.md](instructions/justificacion.instructions.md) (Memoria, no guía) |
| **Marco Conceptual** | [instructions/marco-conceptual.instructions.md](instructions/marco-conceptual.instructions.md) (Herramientas activas) |
| **Presentación** | [instructions/cartas-puerta.instructions.md](instructions/cartas-puerta.instructions.md) (Cartas de entrada) |
| **Noticias (Periódico)** | [instructions/periodico.instructions.md](instructions/periodico.instructions.md) (5W + Banderas) |
| **Herramientas MCP** | [instructions/mcp-tools.instructions.md](instructions/mcp-tools.instructions.md) |

## 5. Flujo de Trabajo (Resumen)

1. **Consultar Backlog**: Identificar tarea activa.
2. **Ejecutar**: Usar las instrucciones específicas del contexto (ver tabla arriba).
3. **Auditar**: Invocar auditores (capa Backend) si es tarea de redacción compleja.
4. **Commit**: Generar mensaje siguiendo protocolo (`feat(scope): ... refs #ID`).
5. **Actualizar Backlog**: Marcar tarea como completada.

> **Nota DRY**: Si no sabes qué agente invocar, consulta `@ox`.

## 6. Reglas de Oro (DRY)

- **No duplicar**: Si una regla está en `DEVOPS.md` o en `instructions/`, referénciala, no la copies.
- **Ubicación**:
  - El *qué* (contenido) está en `ARCHIVO/`.
  - El *cómo* (reglas) está en `.github/instructions/`.
  - El *cuándo* (plan) está en los Backlogs.
  - El *quién* (agentes) está en `@ox` → [agents/ox.agent.md](agents/ox.agent.md).

## 7. Sistema de Plugins

**Fuente de verdad**: [PLUGINS.md](PLUGINS.md)

Los plugins extienden las capacidades de Scriptorium sin modificar el core.

**Agente Gestor**: **Plugin Manager**
- **Definición**: [agents/plugin-manager.agent.md](agents/plugin-manager.agent.md)
- **Responsabilidad**: Instalar, activar, desactivar y desinstalar plugins.

**Registro de Plugins**: [plugins/registry.json](plugins/registry.json)

### Plugins Instalados

| Plugin | Versión | Descripción |
|--------|---------|-------------|
| **GH-Pages** | 1.0.0 | Publicación en GitHub Pages (modos fusionar/reemplazar) |
| **ARG Board** | 1.0.0 | Motor de juego ARG transmedia (AlephScript 7GL) |
| **Enciclopedia** | 1.0.0 | Biblioteca de tomos enciclopédicos con búsquedas temporales y temáticas |
| **Foro Scraper** | 1.0.0 | Scraping de foros con MCP Playwright (pausable/reanudable) |

### Plugin: GH-Pages

Publicador de contenido en GitHub Pages con dos modos de operación.

**Agentes disponibles**:
- `GHPages`: Orquestador de publicación

**Modos**:
- `fusionar`: Añade contenido sin eliminar lo existente
- `reemplazar`: Sustituye todo el contenido de la sección

**URL canónica**: [escrivivir-co.github.io/aleph-scriptorium](https://escrivivir-co.github.io/aleph-scriptorium/)

**Documentación**: [plugins/gh-pages/docs/](plugins/gh-pages/docs/)

### Plugin: ARG Board

Motor conversacional para juegos de Realidad Alternativa transmedia.

**Agentes disponibles**:
- `Arrakis`: Director de Teatro ARG
- `BOE`: Gestor de Boletín Oficial del juego
- `GitARG`: Orquestador de turnos Git
- `Decoherence`: Validador de coherencia
- `AutomataHeroe`: Jugador autónomo (Camino del Héroe)
- `ImpressJS`: Generador de tableros 3D
- `MBox`: Extractor de emails a BDC
- `PlatformCom`: Comunicación multi-plataforma

**Documentación**: [plugins/arg-board/docs/](plugins/arg-board/docs/)

### Plugin: Enciclopedia

Biblioteca de tomos enciclopédicos con motor de búsqueda temporal y temática.

**Agentes disponibles**:
- `Bibliotecario`: Gestor principal de tomos
- `HDF-ErnestoCastro`: Especialista en "Historia de la Filosofía" (61 caps.)

**Tomos cargados**:
- Historia de la Filosofía (Ernesto Castro, 2017-2018)

**Documentación**: [plugins/enciclopedia/docs/](plugins/enciclopedia/docs/)

### Plugin: Foro Scraper

Scraping de hilos de foros con gestión de estado pausable/reanudable.

**Agentes disponibles**:
- `ForoScraper`: Gestor de trabajos de scraping

**Foros soportados**:
- Foro / vBulletin (`showthread.php?t=X&page=N`)
- phpBB (`viewtopic.php?t=X&start=N`)
- Discourse (`/t/slug/id/N`)

**Comandos**:
- Iniciar scraping con URL de muestra
- Pausar/Reanudar trabajos
- Ver estado de todos los jobs

**Documentación**: [plugins/foro-scraper/docs/](plugins/foro-scraper/docs/)

### Plugin: Agent Creator

Creador de agentes especializados combinando agentes base con fuentes de datos.

**Agentes disponibles**:
- `AgentCreator`: Orquestador de creación de agentes

**Agentes creados**:
- `tarotista`: Yellowflag + criterio de demarcación científica (Foro_t8941392)

**Capacidades**:
- Crear agentes combinando base + fuentes
- Editar agentes añadiendo conocimiento
- Fusionar múltiples agentes
- Conectar con FORO_SCRAPER para más datos

**Documentación**: [plugins/agent-creator/docs/](plugins/agent-creator/docs/)
### Plugin: Teatro Interactivo

Sistema unificado para experiencias de teatro transmedia interactivo.

**Agentes disponibles**:
- `Teatro`: Orquestador del teatro transmedia

**Prompts**:
- `teatro-generar-obra.prompt.md`: UC1 - Generar YAML de obra
- `teatro-instalar-obra.prompt.md`: UC2 - Registrar en cartelera
- `teatro-ejecutar-obra.prompt.md`: UC3 - Publicar página impress.js

**Dependencias**: ARG_BOARD, AGENT_CREATOR, GH_PAGES

**Conceptos clave**:
- **BOE**: Boletín Oficial del Estado Escénico = mapa de diapositivas impress.js
- **Monomito**: Ciclo de 12 etapas (Camino del Héroe) en 3 anillos
- **Elenco**: Personajes inyectados desde AGENT_CREATOR
- **TALLER**: Espacio de desarrollo de obras (`ARCHIVO/DISCO/TALLER/`)

**Flujo**:
1. Desarrollar en TALLER (YAML + personajes + escenas)
2. Instalar obra (registro en ARG_BOARD)
3. Ejecutar obra (publicar página impress.js)

**Documentación**: [plugins/teatro/docs/](plugins/teatro/docs/)

### Plugin: Scrum

Gestión ágil de backlogs con protocolo formal de 5 fases.

**Agentes disponibles**:
- `Scrum`: Scrum Master / coordinador del ciclo

**Prompts**:
- `planificar-sprint.prompt.md`: Fase 1 - Conversación PO-SM
- `crear-backlog-borrador.prompt.md`: Fase 2 - Generar backlog en DISCO
- `aprobar-backlog.prompt.md`: Fase 3 - Publicar en backlogs oficiales
- `tracking-sprint.prompt.md`: Fase 4 - Actualizar estado de tasks
- `retrospectiva.prompt.md`: Fase 5 - Cierre, foto de estado, next sprint

**Principios**:
- **Puntos de esfuerzo**: 1-13 sin correlación cronológica
- **Separación espacial**: DISCO (borradores) → .github/ (oficial)
- **Roles**: PO (usuario), SM (@scrum), DevOps (@aleph)

**Flujo**:
1. Planificar en DISCO (conversación PO-SM)
2. Generar backlog borrador
3. Aprobar y publicar en backlogs oficiales
4. Tracking durante desarrollo
5. Cerrar sprint (retro + foto de estado)

**Documentación**: [plugins/scrum/instructions/scrum-protocol.instructions.md](plugins/scrum/instructions/scrum-protocol.instructions.md)
