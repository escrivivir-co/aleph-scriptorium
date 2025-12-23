

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
