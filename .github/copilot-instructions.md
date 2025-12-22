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

## 3. Agentes y Roles

**Agente Principal**: **Aleph**
- **Definición**: [agents/aleph.agent.md](agents/aleph.agent.md)
- **Responsabilidad**: Producción, orquestación y gestión del ciclo de vida.

**Sistema de Auditores**:
- `@blueflag` (Verdad/Evidencia), `@blackflag` (Sombra/Coste), `@redflag` (Estructura/Viabilidad), `@yellowflag` (Límites/Condiciones), `@orangeflag` (Registro/Interlocución), `@revisor` (Doctrina).
- Consultar `aleph.agent.md` para el flujo de invocación.

**Agente Periódico** (Noticias):
- **Definición**: [agents/periodico.agent.md](agents/periodico.agent.md)
- **Responsabilidad**: Producción de planas noticieras con método 5W + Banderas.
- **Handoffs**: `editar` (inicia/continúa en DISCO) y `publicar` (genera plana en NOTICIAS).

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
3. **Auditar**: Invocar auditores si es una tarea de redacción compleja.
4. **Commit**: Generar mensaje siguiendo protocolo (`feat(scope): ... refs #ID`).
5. **Actualizar Backlog**: Marcar tarea como completada.

## 6. Reglas de Oro (DRY)

- **No duplicar**: Si una regla está en `DEVOPS.md` o en `instructions/`, referénciala, no la copies.
- **Ubicación**:
  - El *qué* (contenido) está en `ARCHIVO/`.
  - El *cómo* (reglas) está en `.github/instructions/`.
  - El *cuándo* (plan) está en los Backlogs.

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
- `demarcacion-yellowflag`: Yellowflag + criterio de demarcación científica (Foro_t8941392)

**Capacidades**:
- Crear agentes combinando base + fuentes
- Editar agentes añadiendo conocimiento
- Fusionar múltiples agentes
- Conectar con FORO_SCRAPER para más datos

**Documentación**: [plugins/agent-creator/docs/](plugins/agent-creator/docs/)
