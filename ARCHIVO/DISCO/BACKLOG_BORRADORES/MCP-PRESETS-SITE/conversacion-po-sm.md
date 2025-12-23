# Conversación PO-SM: Plugin MCP-PRESETS

> **Código**: MCP-PRESETS-SITE  
> **Fecha**: 2025-12-23  
> **Estado**: Borrador  
> **Sprint target**: 2

---

## Contexto del Submódulo

**Repositorio**: `alephscript-mcp-presets-site`  
**Rama de trabajo**: `integration/beta/scriptorium`  
**Tecnología**: Node.js + Express + HyperAxe (patrón Diogenes)

### Resumen Técnico del Proyecto Zeus

El proyecto Zeus es una **interfaz web para gestión de presets MCP** (Model Context Protocol). Sus capacidades principales son:

1. **Descubrimiento de servidores MCP**: Conecta con endpoints para obtener catálogos de herramientas/recursos/prompts disponibles.
2. **Gestión de Presets**: CRUD de presets que agrupan herramientas MCP seleccionadas.
3. **Modelo de datos**:
   - `MCPModel`: Servidor MCP con tools[], resources[], prompts[]
   - `PresetModel`: Agrupación de items MCP con prompt asociado
4. **API REST**: Endpoints para listar, crear, actualizar presets.
5. **Persistencia**: JSON local (preset-config.json).

---

## Sesión de Planificación

### PO (Product Owner) inicia:

> **PO**: Necesitamos integrar el configurador de presets MCP en Scriptorium. El objetivo es doble:
>
> 1. **Gestionar packs MCP**: Crear, importar y exportar colecciones de herramientas/recursos/prompts MCP que los agentes puedan usar.
> 2. **Asignar packs a agentes**: Conectar con AGENT_CREATOR para que cada agente especializado tenga su "toolkit" MCP asociado.
>
> El caso de uso principal es: "Como usuario del Scriptorium, quiero poder definir qué herramientas MCP tiene disponible cada agente que creo, para que sus capacidades estén bien delimitadas."

### SM (Scrum Master) responde:

> **SM**: Entendido. Veo tres áreas de trabajo:
>
> 1. **Infraestructura**: Submódulo ya instalado, rama `integration/beta/scriptorium` preparada.
> 2. **Plugin de Scriptorium**: Nuevo plugin `mcp-presets` que consume los datos del site.
> 3. **Integración con AGENT_CREATOR**: Extender el workflow de creación de agentes para asignar presets.
>
> ¿Cuál es la prioridad? ¿Empezamos por el plugin standalone o directamente la integración?

### PO:

> **PO**: Prioridad al plugin standalone primero. Necesitamos poder:
> - Listar los presets disponibles desde el site
> - Importar un preset al Scriptorium (como JSON en ARCHIVO/PLUGINS/MCP_PRESETS/)
> - Exportar la configuración de presets para compartir
>
> La integración con AGENT_CREATOR es fase 2, una vez tengamos el core funcionando.

### SM:

> **SM**: Perfecto. Propongo esta estructura para el plugin:
>
> ```
> .github/plugins/mcp-presets/
> ├── manifest.md
> ├── agents/
> │   └── mcp-presets.agent.md
> ├── prompts/
> │   ├── listar-presets.prompt.md
> │   ├── importar-preset.prompt.md
> │   ├── exportar-preset.prompt.md
> │   └── asignar-a-agente.prompt.md
> └── instructions/
>     └── mcp-presets.instructions.md
>
> ARCHIVO/PLUGINS/MCP_PRESETS/
> ├── presets/                   # Presets importados
> │   └── {preset-id}.json
> ├── catalog.json               # Catálogo local de servidores MCP conocidos
> └── agent-assignments.json     # Mapeo agente → presets asignados
> ```
>
> El agente tendrá handoffs para cada operación CRUD.

### PO:

> **PO**: Me gusta. Pero necesito clarificar el flujo de datos:
>
> **Escenario 1: Offline (solo Scriptorium)**
> - El usuario tiene presets exportados como JSON
> - Los importa manualmente al Scriptorium
> - Los asigna a agentes
>
> **Escenario 2: Conectado (Zeus corriendo)**
> - El agente consulta la API de Zeus para listar presets disponibles
> - El usuario selecciona cuáles importar
> - Se sincronizan automáticamente
>
> ¿Soportamos ambos?

### SM:

> **SM**: Sí, pero con prioridades:
>
> **Sprint 2 (MVP)**: Escenario 1 (offline) + preparación para escenario 2
> - Importar/exportar JSON manual
> - Validación de esquemas
> - Estructura de datos compatible con la API de Zeus
>
> **Sprint 3 (Integración)**: Escenario 2
> - Conexión con Zeus vía HTTP
> - Sincronización bidireccional
> - UI/prompts para selección interactiva

### PO:

> **PO**: De acuerdo. Para el MVP, ¿cuáles son las historias de usuario?

### SM:

> **SM**: Propongo estas historias para Sprint 2:
>
> **S01 - Estructura del Plugin**
> - Crear manifest.md con metadatos
> - Crear agente principal
> - Crear instrucciones base
> - Crear estructura de datos en ARCHIVO/PLUGINS/MCP_PRESETS/
>
> **S02 - Importar Preset (Offline)**
> - Prompt para importar archivo JSON
> - Validación del esquema PresetModel
> - Guardar en presets/{id}.json
> - Registrar en catalog.json
>
> **S03 - Listar Presets Locales**
> - Prompt para listar presets disponibles
> - Mostrar metadata (nombre, descripción, items)
> - Indicar si está asignado a algún agente
>
> **S04 - Exportar Preset**
> - Prompt para exportar preset seleccionado
> - Generar JSON compatible con Zeus
> - Opción de exportar múltiples como bundle
>
> **S05 - Asignar Preset a Agente**
> - Prompt para vincular preset con agente existente
> - Actualizar agent-assignments.json
> - Integración básica con AGENT_CREATOR (inyectar tools en recipe)
>
> **S06 - Bridge Agent + Registry**
> - Crear plugin_ox_mcppresets.agent.md
> - Actualizar registry.json
> - Actualizar aleph.agent.md con handoffs
>
> **S07 - Documentación**
> - README del plugin
> - Actualizar PLUGINS.md
> - Ejemplos de presets

### PO:

> **PO**: Las historias son correctas. Añado criterios de aceptación clave:
>
> **Para S02 (Importar)**:
> - AC1: Si el JSON no cumple el esquema, rechazar con mensaje claro
> - AC2: Si el preset ya existe (por id), preguntar si sobrescribir
> - AC3: Preservar todos los campos de Zeus (serverId, items, serverContent)
>
> **Para S05 (Asignar a Agente)**:
> - AC1: Un agente puede tener múltiples presets
> - AC2: Un preset puede estar asignado a múltiples agentes
> - AC3: La asignación se refleja en la recipe del agente (campo `mcpPresets: []`)

### SM:

> **SM**: Perfecto. ¿Hay algo específico sobre el esquema de datos de Zeus que debamos tener en cuenta?

### PO:

> **PO**: Sí, basándome en el análisis del código:
>
> **PresetModel (campos obligatorios para compatibilidad)**:
> ```json
> {
>   "id": "string (timestamp)",
>   "name": "string",
>   "description": "string",
>   "category": "General|Development|Analysis|Creative|productivity",
>   "prompt": "string (el prompt asociado)",
>   "parameters": {},
>   "serverId": "string|null (nombre del servidor MCP)",
>   "items": ["tool1", "tool2", "resource1"],
>   "createdAt": "ISO8601",
>   "updatedAt": "ISO8601"
> }
> ```
>
> **MCPModel (para el catálogo)**:
> ```json
> {
>   "serverId": "string",
>   "name": "string",
>   "url": "string",
>   "status": "connected|disconnected|error",
>   "tools": [{ "name": "", "description": "", "parameters": {}, "schema": null }],
>   "resources": [{ "name": "", "uri": "", "mimeType": "", "description": "" }],
>   "prompts": [{ "name": "", "description": "", "arguments": [] }]
> }
> ```

### SM:

> **SM**: Claro. Entonces la validación de importación verificará estos campos. 
>
> Una última pregunta: ¿cómo se conecta esto con la extensión de VS Code (`vscode-alephscript-extension`)?

### PO:

> **PO**: Buena pregunta. La extensión tiene su propia gestión de MCP (ArrakisTheater_OperaConfig.json). Para Sprint 2, **no conectamos directamente**. 
>
> Para Sprint 3+, la visión es:
> - La extensión puede consumir presets del Scriptorium
> - Los presets se sincronizan entre Zeus → Scriptorium → Extension
> - Pero eso es trabajo futuro.
>
> Por ahora, el plugin de Scriptorium es **standalone** con capacidad de exportar formatos compatibles.

### SM:

> **SM**: Entendido. Resumo el alcance del Sprint 2:
>
> | # | Story | Puntos | Prioridad |
> |---|-------|--------|-----------|
> | S01 | Estructura del Plugin | 3 | Must |
> | S02 | Importar Preset | 5 | Must |
> | S03 | Listar Presets | 3 | Must |
> | S04 | Exportar Preset | 3 | Should |
> | S05 | Asignar a Agente | 5 | Should |
> | S06 | Bridge + Registry | 2 | Must |
> | S07 | Documentación | 2 | Must |
>
> **Total**: 23 puntos
> **Capacidad Sprint**: ~25 puntos
>
> ¿Aprobamos?

### PO:

> **PO**: Aprobado. Procedemos a generar el backlog formal.

---

## Decisiones Clave

1. **Submódulo configurado**: `alephscript-mcp-presets-site` en rama `integration/beta/scriptorium`
2. **Modo MVP**: Offline primero, API después
3. **Esquemas compatibles**: Usamos PresetModel y MCPModel de Zeus
4. **Integración con AGENT_CREATOR**: Via campo `mcpPresets` en recipes
5. **Sin conexión directa a extensión VS Code** en Sprint 2

---

## Próximo Paso

Generar backlog formal en `.github/BACKLOG-SCRIPTORIUM.md` como épica SCRIPT-1.7.0.

