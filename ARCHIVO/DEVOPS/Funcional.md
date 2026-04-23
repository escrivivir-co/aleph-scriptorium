# Índice Funcional — Aleph Scriptorium

> **Agente responsable**: @aleph  
> **Propósito**: Mapa de navegación para usuarios del sistema  
> **Última actualización**: 2026-04-23  
> **Estado**: 🌿 Actualizado (MCP-CHANNELS-1.0.0 indexado)

---

## 1. ¿Qué es Aleph Scriptorium?

**Framework de escritura asistida por IA** para proyectos de largo aliento.

| Concepto | Descripción |
|----------|-------------|
| **Scriptorium** | El taller de escritura (agentes, prompts, instrucciones) |
| **Fundación** | El texto en producción (12 capítulos, 2026) |
| **Teatro** | Sistema de experiencias transmedia interactivas |
| **ARCHIVO** | Memoria doctrinal y datos de runtime |

---

## 2. Puntos de Entrada para Usuarios

### 2.1. Vestíbulo (Orientación)

| Perfil de usuario | Carta-puerta | Ubicación |
|-------------------|--------------|-----------|
| Maestro Vista Total | Completitud, corrección | `ARCHIVO/CARTAS/carta-maestro-vista-total.md` |
| Maestro Blueflag | Evidencia, falsificabilidad | `ARCHIVO/CARTAS/carta-maestro-blueflag.md` |
| Maestro Blackflag | Poder, adversario, captura | `ARCHIVO/CARTAS/carta-maestro-blackflag.md` |
| Maestro Redflag | Escala, enforcement, viabilidad | `ARCHIVO/CARTAS/carta-maestro-redflag.md` |
| Maestro Yellowflag | Integración, límites, condiciones | `ARCHIVO/CARTAS/carta-maestro-yellowflag.md` |

> **Agentes**: `@vestibulo` → `@cartaspuerta`

### 2.2. Web Pública

| Página | URL relativa | Propósito |
|--------|--------------|-----------|
| Inicio | `/` | Landing con galería de features |
| Ecosistema | `/ecosistema/` | Agentes, plugins, submódulos |
| Teatro | `/teatro/` | Cartelera de obras transmedia |
| Periódico | `/periodico/` | Noticias con método doctrinal |
| Archivo | `/archivo/` | Navegación del ARCHIVO |
| Roadmap | `/roadmap/` | Estado del proyecto + fotos |
| Fundación | `/fundacion/` | El texto de 2026 |
| Blueprint Logic Flow | `/blueprint-logic-flow/` | Agentic Typed Logic Flow (IOT-SBR + SCRIPT-2.2.0) |
| Blueprint TypedPrompting | `/blueprint-typed-prompting/` | TypedPrompting MCP (7 tools, schemas) |

> **Fuente**: `docs/` (Jekyll + GitHub Pages)

---

## 3. Capacidades Principales

### 3.1. Producción de Texto (@aleph)

| Capacidad | Descripción | Handoff |
|-----------|-------------|---------|
| Redactar capítulos | Texto fundacional con método | — |
| Invocar auditores | Stress-test de propuestas | 5 Banderas |
| Verificar doctrina | Coherencia con ARCHIVO | @revisor |
| Gestionar backlog | Scrum adaptado | @plugin_ox_scrum |

### 3.2. Producción Periodística (@periodico)

| Capacidad | Descripción | Ubicación |
|-----------|-------------|-----------|
| Editar noticia | Conversación editorial en DISCO | `ARCHIVO/DISCO/` |
| Publicar noticia | Plana final con 5W + Banderas | `ARCHIVO/NOTICIAS/` |
| Generar imagen | Prompt de cabecera | `imagen-cabecera.prompt.md` |

### 3.3. Teatro Interactivo (@plugin_ox_teatro)

| Capacidad | Descripción |
|-----------|-------------|
| Generar obra | YAML con 12 estadios (monomito) |
| Instalar obra | Registrar en cartelera |
| Ejecutar obra | Poner en escena (impress.js) |
| Crear personaje | Vía AGENT_CREATOR → ARG_BOARD |

### 3.4. Consulta Documental

| Plugin | Qué consulta | Agente |
|--------|--------------|--------|
| Enciclopedia | Tomos filosóficos | @plugin_ox_enciclopedia |
| Foro Scraper | Foros y blogs externos | @plugin_ox_foroscraper |
| MCP-Presets | Herramientas MCP | @plugin_ox_mcppresets |

### 3.4.b. Consejo, SDK Editorial y Vectorización

| Plugin | Qué hace | Agente |
|--------|-----------|--------|
| Consejo Asesor (ONFALO) | Debate, auditoría, producción y pipeline relato desde el submódulo privado ONFALO | @plugin_ox_consejoasesor |
| LoreSDK | SDK documental/editorial para `feed`, `diff`, `merge`, `design` y `status`; `@voz` y catálogo solo con lore activo | @plugin_ox_loresdk |
| VectorMachine | Prepara la integración del stack vectorial `VectorMachineSDK` y la futura fachada MCP del Scriptorium para proyecto indexable | @plugin_ox_vectormachine |

### 3.5. Copilot Logs (MCP Server)

> **Feature**: FEATURE-SNAPSHOTS-1.0.0

| Tool | Descripción |
|------|-------------|
| `help` | Guía + advertencia sobre límite 100 requests |
| `capture_snapshot` | Guardar conversación actual |
| `list_snapshots` | Ver snapshots guardados |
| `get_snapshot(id)` | Recuperar snapshot |
| `get_latest_request` | Último request (siempre funciona) |
| `generate_abstract` | Generar resumen semántico con LLM |

**Ubicación de datos**: `ARCHIVO/DISCO/COPILOT_SNAPSHOTS/`

⚠️ **Advertencia**: Los logs tienen límite ~100 requests en memoria. Capturar snapshots cada 30 min.

### 3.6. Validación de Schemas (TypedPrompting)

> **Feature**: TYPED-MCP-1.0.0 — MCPTypedPromptEditor Refactor

**Concepto**: Validación bidireccional NL↔JSON para conversaciones estructuradas.

| Componente | Puerto | Descripción |
|------------|--------|-------------|
| TypedPromptsEditor | 3019 | UI Vite para edición de ontologías |
| MCPTypedPromptServer | 3020 | Server MCP con 7 tools + 3 prompts |

**Tools del Server (3020)**:

| Tool | Descripción |
|------|-------------|
| `typed_create_schema` | Crear nuevo schema de validación |
| `typed_validate` | Validar mensaje contra schema |
| `typed_list_schemas` | Listar schemas disponibles |
| `typed_get_schema` | Obtener schema específico |
| `typed_delete_schema` | Eliminar schema |
| `typed_export_openapi` | Exportar a OpenAPI |
| `typed_import_openapi` | Importar desde OpenAPI |

**Ubicación código**: `MCPGallery/mcp-mesh-sdk/src/MCPTypedPromptServer.ts`  
**Spec OpenAPI**: `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/TypedPromptsEditor/` (931 líneas)

💡 **Uso**: Definir schemas antes de crear agentes. Los schemas garantizan coherencia en el diálogo.

### 3.7. Prolog MCP Server (SCRIPT-2.3.0 + TEATRO-PROLOG-1.0.0)

> **Feature**: Inteligencias situadas + Typed Logic Flow + Teatro Integration

**Capacidades**: 12 tools, 6 resources, 8 prompts

| Tool | Descripción |
|------|-------------|
| `prolog_create_session` | Crear sesión Prolog aislada para una obra |
| `prolog_destroy_session` | Limpiar sesión y liberar recursos |
| `prolog_list_sessions` | Listar sesiones activas |
| `prolog_query` | Ejecutar query Prolog con todos los solutions |
| `prolog_assert_fact` | Añadir hecho a la KB |
| `prolog_consult_file` | Cargar archivo .pl con caching |
| `prolog_get_templates` | Obtener catálogo de templates Prolog |
| `prolog_retract_fact` | Eliminar hecho de la KB |
| `prolog_list_facts` | Listar hechos de un predicado |
| `prolog_save_brain` | Guardar estado del cerebro a archivo |
| `prolog_load_brain` | Cargar cerebro desde archivo .brain.pl |
| `prolog_get_brain_metadata` | Obtener metadatos del cerebro |

**Puerto**: 3006  
**Ubicación**: `MCPGallery/mcp-mesh-sdk/src/MCPPrologServer.ts`

💡 **Uso**: Cada obra del Teatro tiene su propia KB Prolog aislada. Ver guía DRY en `guia-arquitectura-mcp-stack.md`.

### 3.8. MCPChannels SDK (MCP-CHANNELS-1.0.0)

> **Feature**: Socket.IO mesh para comunicación entre servidores MCP y UIs

**Concepto**: Los servidores MCP se conectan a un mesh Socket.IO (puerto 3010) y registran sus capacidades. Las UIs pueden descubrir e invocar capacidades via protocolo MASTER-ROOM.

| Componente | Puerto | Descripción |
|------------|--------|-------------|
| Socket.IO Mesh | 3010 | Servidor Socket.IO (namespace /runtime) |
| SocketIoMesh | 3010 | Orchestration layer con REST API |
| @alephscript/angular | — | Cliente Angular para UIs |

**Bots registrados**:

| Bot | Servidor | Room | Capabilities |
|-----|----------|------|--------------|
| ProserpinaBot | DevOpsServer | `devops-mcp-server_ROOM` | DEVOPS_STATUS, DEVOPS_HEALTH, PROMPT_LIST |
| EuridiceBot | MCPPrologServer | `prolog-mcp-server_ROOM` | PROLOG_QUERY, PROLOG_ASSERT, PROLOG_RETRACT, PROLOG_LOAD_FILE, PROLOG_GET_SESSIONS |

**REST API del Mesh**:

| Endpoint | Descripción |
|----------|-------------|
| `GET /mesh` | Estado completo del mesh |
| `GET /mesh/rooms` | Lista de rooms activas |
| `GET /mesh/rooms/:id` | Detalle de room |
| `GET /mesh/capabilities` | Todas las capabilities |
| `POST /mesh/invoke/:room` | Invocar capability |
| `GET /mesh/health` | Health check |

**Specs OpenAPI/AsyncAPI**: `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/MCPChannels/`

💡 **Uso**: Cualquier UI Angular puede suscribirse a rooms y recibir eventos en tiempo real.

### 3.9. MCP Packs (Packs Tipados)

> **Feature**: SCRIPT-2.3.0 — Agentic Typed Logic Flow

| Pack | Descripción | Uso |
|------|-------------|-----|
| `AgentPrologBrain` | Razonamiento Prolog para agentes | Personajes Teatro con cerebro lógico |

**Personajes con Cerebro Prolog**:

| Personaje | Obra | Cerebro |
|-----------|------|---------|
| Lucas | Ítaca Digital | `lucas.brain.pl` |

**Queries de ejemplo** (Lucas):
```prolog
?- documentacion_coherente(X).    % Validar DRY
?- ubicacion_canonica(como, Donde). % Dónde buscar
?- consejo(perdido, Mensaje).       % Guía al viajero
```

**UI para Dramaturgos**: El componente `BrainEditorComponent` permite crear cerebros Prolog visualmente sin conocimientos de lógica. Accesible en PrologEditor → tab "🧠 Brain Editor".

### 3.10. Cotrabajo Multi-Agente (COWORK-1.0.0)

> **Feature**: Sesiones colaborativas asíncronas entre agentes

**Concepto clave**: El chat es un semáforo, no una autopista.

| Componente | Descripción |
|------------|-------------|
| Sesión | Carpeta estructurada para trabajo colaborativo |
| Tablero | Índice DRY de turnos y estados |
| Actas | Contenido producido por cada turno |
| Protocolo | Reglas inmutables de coordinación |

**Estados de Agente**:

| Estado | Emoji | Uso |
|--------|-------|-----|
| IDLE | ⚪ | Sin turno asignado |
| WAITING | ⏳ | En cola |
| READING | 📖 | Leyendo contexto |
| THINKING | 🤔 | Procesando |
| WRITING | ✍️ | Escribiendo acta |
| REVIEWING | 🔍 | Revisando otro |
| BLOCKED | ⛔ | Necesita input |
| DONE | ✅ | Turno completado |

**Invocación**:
```
@scriptorium-pack cotrabajo iniciar
  --tema "diseño-api"
  --participantes @ox @indice @scrum
  --objetivo "Especificación OpenAPI"
```

**Ubicación**: `ARCHIVO/DISCO/SESIONES_COTRABAJO/{fecha}_{tema}/`

**Sesiones activas**: Ver [SESIONES_COTRABAJO/INDEX.md](../DISCO/SESIONES_COTRABAJO/INDEX.md)

→ Protocolo completo: [cotrabajo.instructions.md](../.github/plugins/scriptorium-pack/instructions/cotrabajo.instructions.md)

### 3.6. Publicación (@plugin_ox_ghpages)

| Modo | Descripción |
|------|-------------|
| Fusionar | Añade contenido sin borrar |
| Reemplazar | Sobrescribe sección |

---

## 4. Sistema de Agentes (Capas)

### 4.1. Capa UI (Producción)

| Agente | Símbolo | Función |
|--------|---------|---------|
| @aleph | 🟢 | Productor principal |
| @revisor | 🟢 | Auditor doctrinal |
| @periodico | 🟢 | Producción periodística |

### 4.2. Capa Backend (Auditoría)

| Agente | Símbolo | Tests |
|--------|---------|-------|
| @blueflag | 🔵 | Evidencia, utilidad, falsificabilidad |
| @blackflag | ⚫ | Poder, sombras, captura |
| @redflag | 🔴 | Escala, enforcement, suministro |
| @yellowflag | 🟡 | Límites, condiciones, inconmensurabilidad |
| @orangeflag | 🟠 | Registro, estilo, auditorio |

### 4.3. Capa Sistema (Navegación)

| Agente | Símbolo | Función |
|--------|---------|---------|
| @vestibulo | ⚪ | Identifica perfil, asigna carta-puerta |
| @cartaspuerta | ⚪ | Presenta carta-puerta |

### 4.4. Capa Meta (Gestión)

| Agente | Símbolo | Función |
|--------|---------|---------|
| @pluginmanager | ⚙️ | Gestión de plugins |
| @ox | 🐂 | Oráculo, índice, documentación |
| @indice | 🗂️ | Navegador DRY, validación pre-commit |

### 4.5. Capa Plugins (Bridges)

> Bridges en `.github/agents/plugin_ox_*.agent.md`

| Bridge | Plugin | Agentes internos |
|--------|--------|------------------|
| @plugin_ox_argboard | ARG Board | 8 agentes |
| @plugin_ox_enciclopedia | Enciclopedia | 2 agentes |
| @plugin_ox_ghpages | GH-Pages | 1 agente |
| @plugin_ox_foroscraper | Foro Scraper | 1 agente |
| @plugin_ox_agentcreator | Agent Creator | 1 agente |
| @plugin_ox_teatro | Teatro | 1 agente |
| @plugin_ox_scrum | Scrum | 1 agente |
| @plugin_ox_mcppresets | MCP-Presets | 1 agente |
| @plugin_ox_network | Network | 1 agente |
| @plugin_ox_novelist | Novelist | 1 agente |
| @plugin_ox_blocklyeditor | Blockly Editor | 1 agente |
| @plugin_ox_wireeditor | Wire Editor | 1 agente |
| @plugin_ox_prologeditor | Prolog Editor | 1 agente |
| @plugin_ox_typedprompting | TypedPrompting | 1 agente |
| @plugin_ox_n8neditor | N8N Editor | 1 agente |
| @plugin_ox_wiringapp | WiringApp | 1 agente |
| @plugin_ox_argboardapp | ArgBoardApp | 1 agente |
| @plugin_ox_hypergrapheditor | HyperGraphEditor | 1 agente |
| @plugin_ox_consejoasesor | Consejo Asesor | 1 agente bridge |
| @plugin_ox_loresdk | LoreSDK | 1 agente bridge |
| @plugin_ox_vectormachine | VectorMachine | 1 agente |

---

## 5. Flujos de Trabajo Principales

### 5.1. Redactar Capítulo

```
Usuario → @aleph (redactar)
           ↓
       [borrador]
           ↓
       @blueflag (evidencia) → @blackflag (sombras) → @redflag (estructura)
           ↓
       @revisor (coherencia)
           ↓
       [capítulo listo]
```

### 5.2. Producir Noticia

```
Usuario → @periodico [EDITAR]
           ↓
       DISCO/{carpeta}/conversacion.md
           ↓
       Alice (frame) ↔ Bob (hechos)
           ↓
       5 Banderas (auditoría)
           ↓
       @periodico [PUBLICAR]
           ↓
       NOTICIAS/{plana}.md
```

### 5.3. Crear Agente Especializado

```
Usuario → @plugin_ox_agentcreator
           ↓
       [receta + fuente DISCO]
           ↓
       [agente.agent.md generado]
           ↓
       @plugin_ox_argboard (desplegar como personaje)
```

### 5.4. Publicar Obra en Teatro

```
Usuario → @plugin_ox_teatro [generar]
           ↓
       obra.yaml (12 estadios)
           ↓
       @plugin_ox_teatro [instalar]
           ↓
       cartelera actualizada
           ↓
       @plugin_ox_ghpages [publicar]
           ↓
       docs/teatro/{obra}/
```

---

## 6. Memoria del Sistema (ARCHIVO)

### 6.1. Estructura Principal

| Carpeta | Contenido | Mutabilidad |
|---------|-----------|-------------|
| `CARTAS/` | Cartas-puerta (presentación) | Estable |
| `DEVOPS/` | Documentación técnica/funcional | Estable |
| `DISCO/` | Memoria de trabajo (borradores) | Activa |
| `ENCICLOPEDIA/` | Tomos consultables | Estable |
| `FOTOS_ESTADO/` | Capturas de sprint | Creciente |
| `NOTICIAS/` | Planas publicadas | Creciente |
| `PERFILES/` | Fichas de usuarios | Creciente |
| `PLUGINS/` | Datos de runtime de plugins | Activa |
| `SITE/` | Assets adicionales web | Estable |
| `diagnostico/` | Estado de la cuestión | Memoria |
| `justificacion/` | Por qué hace falta | Memoria |
| `marco/` | Herramientas conceptuales | Activo |

### 6.2. DISCO (Memoria de Trabajo)

| Carpeta | Uso | Índice |
|---------|-----|--------|
| `BACKLOG_BORRADORES/` | Épicas activas (contenido detallado) | [INDEX.md](../DISCO/BACKLOG_BORRADORES/INDEX.md) |
| `BACKLOG_ARCHIVADOS/` | Sprints cerrados | — |
| `COPILOT_SNAPSHOTS/` | Snapshots de conversaciones Copilot | — |
| `SESIONES_COTRABAJO/` | Sesiones colaborativas multi-agente | [INDEX.md](../DISCO/SESIONES_COTRABAJO/INDEX.md) |
| `Diciembre_25_*/` | Sesiones editoriales diciembre | — |
| `Foro_*/` | Material scrapeado | — |
| `TALLER/` | Proyectos de usuario (obras) | — |
| `WIRING/` | Flujos Node-RED | — |

> **DRY**: El backlog oficial (`.github/BACKLOG-SCRIPTORIUM.md`) es un índice de ~50 líneas que referencia estas carpetas.

---

## 7. Invocaciones Comunes

### 7.1. Empezar a Escribir

```
@aleph Redacta el capítulo 3 sobre vivienda.
```

### 7.2. Auditar Propuesta

```
@blueflag Audita las afirmaciones de este texto: [texto]
```

### 7.3. Crear Noticia

```
@periodico EDITAR
Tema: Geopolítica diciembre 2025
Fuentes: [archivos adjuntos]
```

### 7.4. Orientarse en el Proyecto

```
@vestibulo ¿Por dónde empiezo?
```

### 7.5. Consultar Qué Agente Usar

```
@ox ¿Qué agente uso para auditar evidencia?
```

### 7.6. Crear Agente Especializado

```
@plugin_ox_agentcreator Crea un agente basado en yellowflag con fuente DISCO/Foro_t8941392/
```

---

## 8. Recursos de Ayuda

| Recurso | Ubicación | Propósito |
|---------|-----------|-----------|
| README principal | `/README.md` | Visión general |
| Manual de usuario | `docs/leeme.md` | Guía de uso |
| Roadmap | `docs/roadmap.md` | Estado y próximos pasos |
| Acerca de | `docs/acerca.md` | Historia y filosofía |
| Contribuir | `/CONTRIBUTING.md` | Cómo aportar |

---

## 9. Métricas del Sistema

### 9.1. Contadores Actuales

| Recurso | Fuente / cómo calcular |
|---------|------------------------|
| Agentes core | Ver ` .github/agents/ ` — contar con: `ls .github/agents/*.agent.md | wc -l` |
| Agentes bridge | Ver ` .github/agents/plugin_ox_*.agent.md ` o sumar todos los `.agent.md` en el workspace: `ls **/.github/agents/*.agent.md | wc -l` |
| Plugins instalados | Fuente canónica: `.github/plugins/registry.json` (conteo: `python -c "import json;print(len(json.load(open('.github/plugins/registry.json'))['plugins']))"`) |
| Submódulos | Fuente canónica: `.gitmodules` (conteo: `git config --file .gitmodules --get-regexp path | wc -l`) |
| Prompts (.github) | `ls .github/prompts/*.md | wc -l` |
| Instructions (.github) | `ls .github/instructions/*.md | wc -l` |

### 9.2. Sistema de Backlogs (DRY)

> **Protocolo v2.0**: El backlog oficial es un índice de referencias, no contiene detalles.

| Componente | Ubicación | Propósito |
|------------|-----------|----------|
| Índice | `.github/BACKLOG-SCRIPTORIUM.md` | Solo referencias |
| Borradores | `BACKLOG_BORRADORES/` | Trabajo activo |
| Archivados | `BACKLOG_ARCHIVADOS/` | Histórico |

---

## 10. Próximos Pasos (Onboarding)

1. **Explorar el Vestíbulo**: `@vestibulo`
2. **Leer una carta-puerta** según tu perfil
3. **Consultar el Roadmap**: `docs/roadmap.md`
4. **Probar un flujo simple**: Crear noticia o consultar enciclopedia
5. **Revisar el Teatro**: Abrir obra demo "Camino del Tarotista"

---

> **Regla DRY**: Este índice apunta a ubicaciones. No duplica contenido. Si necesitas detalle, navega al archivo referenciado.
