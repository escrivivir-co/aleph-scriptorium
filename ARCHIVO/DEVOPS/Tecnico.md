# Índice Técnico — Aleph Scriptorium

> **Agente responsable**: @ox  
> **Propósito**: Mapa de arquitectura para equipo Scrum y mantenedores  
> **Última actualización**: 2026-04-26  
> **Estado**: 🌿 Actualizado (VectorMachineUI indexado)

---

## 1. Arquitectura General

### 1.1. Diagrama de Capas

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USUARIOS                                     │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    CAPA UI (Producción)                              │
│               @aleph · @revisor · @periodico                         │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                  CAPA BACKEND (Auditoría)                            │
│    @blueflag · @blackflag · @redflag · @yellowflag · @orangeflag     │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│    CAPA PLUGINS (consulte .github/plugins/registry.json para lista) │
│        plugin_ox_* → .github/plugins/{id}/agents/                    │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                  CAPA SUBMÓDULOS (23 repos)                          │
│              Infraestructura externa (Git submodules)                │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    CAPA META (Gestión)                               │
│                   @ox · @pluginmanager · @indice                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.2. Tecnologías Base

| Componente | Tecnología | Versión |
|------------|------------|---------|
| Editor | VS Code | Latest |
| IA | GitHub Copilot Chat | Latest |
| Agentes | Markdown + YAML frontmatter | — |
| Web | Jekyll + GitHub Pages | 4.x |
| Control versiones | Git + Submodules | 2.x |
| Runtime plugins | Variable por plugin | — |

---

## 2. Ontología Copilot (.github/)

### 2.1. Estructura de Directorios

```
.github/
.├── agents/                 # ~32 core agent files in `.github/agents/` (plus bridge agents and agents in submodules). Calcule el total con: `ls **/.github/agents/*.agent.md | wc -l`
.│   ├── aleph.agent.md
.│   ├── plugin_ox_*.agent.md
.│   └── ...
.├── instructions/           # 10+ instrucciones de contexto
│   ├── voz-manifiesto.instructions.md
│   ├── cartas-puerta.instructions.md
│   └── ...
├── prompts/               # 18+ prompts reutilizables
│   ├── as_commit-message.prompt.md
│   ├── as_instalar_submodulo.prompt.md
│   └── ...
.├── plugins/               # Consulte `.github/plugins/registry.json` para la lista y el conteo canónico
.│   ├── registry.json      # Índice maestro (fuente canónica)
.│   └── {plugin-id}/
│       ├── manifest.md
│       ├── agents/
│       ├── prompts/
│       ├── instructions/
│       └── docs/
├── tests/                 # Tests automatizados
├── BACKLOG-SCRIPTORIUM.md
├── copilot-instructions.md # Hub de instrucciones
├── DEVOPS.md              # Protocolo DevOps
├── PLUGINS.md             # Protocolo de plugins
└── workspace-config.json  # Configuración del workspace
```

### 2.2. Archivos Críticos

| Archivo | Propósito | Actualizar cuando... |
|---------|-----------|---------------------|
| `registry.json` | Índice de plugins | Instalar/desinstalar plugin |
| `workspace-config.json` | Config rama/workspace | Cambiar rama de trabajo |
| `copilot-instructions.md` | Hub de contexto | Añadir instrucciones |
| `DEVOPS.md` | Protocolo de commits | Cambiar metodología |
| `PLUGINS.md` | Protocolo de plugins | Cambiar estructura |
| `BACKLOG-SCRIPTORIUM.md` | **Índice DRY** de referencias | Añadir/eliminar referencia |

### 2.5. Sistema de Backlogs (DRY v2.0)

> **Protocolo**: El backlog oficial es un índice ligero (~50 líneas) que referencia borradores y archivados.

| Tipo | Ubicación | Propósito |
|------|-----------|-----------|
| Índice oficial | `.github/BACKLOG-SCRIPTORIUM.md` | Solo referencias |
| Borradores | `ARCHIVO/DISCO/BACKLOG_BORRADORES/` | Contenido detallado activo |
| Archivados | `ARCHIVO/DISCO/BACKLOG_ARCHIVADOS/` | Sprints cerrados |
| Fotos estado | `ARCHIVO/FOTOS_ESTADO/` | Capturas de métricas |

→ Ver [scrum-protocol.instructions.md](.github/plugins/scrum/instructions/scrum-protocol.instructions.md)

### 2.6. Sistema de Cotrabajo Multi-Agente (COWORK-1.0.0)

> **Feature**: Sesiones colaborativas asíncronas entre múltiples agentes

**Arquitectura**:

```
SESIONES_COTRABAJO/
└── {YYYY-MM-DD}_{tema}/
    ├── 00_SESION.md       # Metadatos + participantes
    ├── 01_TABLERO.md      # Índice DRY de turnos
    ├── 02_ACTAS/          # Contenido por turno
    │   └── T00X_{agente}_{tema}.md
    ├── 03_REFERENCIAS/    # Material de contexto
    └── 04_PROTOCOLO.md    # Copia local del protocolo
```

**Principio**: El chat NO es el medio de trabajo (solo estados), los ficheros SÍ (todo queda registrado).

**Flujo de Turno**:

1. Verificar turno en `01_TABLERO.md`
2. Estado: 📖 READING → leer actas relevantes
3. Estado: 🤔 THINKING → procesar
4. Estado: ✍️ WRITING → crear acta en `02_ACTAS/`
5. Actualizar `01_TABLERO.md` con resumen DRY
6. Estado: ✅ DONE → pasar turno

**Archivos clave**:

| Archivo | Propósito |
|---------|----------|
| `cotrabajo.instructions.md` | Protocolo completo |
| `iniciar-cotrabajo.prompt.md` | Crear nueva sesión |

**Índice de sesiones**: [SESIONES_COTRABAJO/INDEX.md](../DISCO/SESIONES_COTRABAJO/INDEX.md)

→ Ver [cotrabajo.instructions.md](.github/plugins/scriptorium-pack/instructions/cotrabajo.instructions.md)

### 2.3. Anatomía de un Agente

```yaml
---
name: NombreAgente
description: "Descripción breve"
argument-hint: "Guía de uso"
tools: ['vscode', 'read', 'edit', 'search', ...]
handoffs:
  - label: "Acción X"
    agent: OtroAgente
    prompt: "Instrucción..."
    send: false
---

# Contenido Markdown del agente
```

### 2.4. Anatomía de una Instrucción

```yaml
---
name: Nombre
description: Descripción
applyTo: "**/*.md"  # Glob de archivos
---

# Contenido de la instrucción
```

---

## 3. Sistema de Plugins

### 3.1. Registro Maestro

**Ubicación**: `.github/plugins/registry.json`

```json
{
  "version": "1.0.0",
  "plugins": {
    "{id}": {
      "name": "...",
      "version": "...",
      "enabled": true,
      "agents_count": N,
      "prompts_count": M,
      "data_directory": "ARCHIVO/PLUGINS/{ID}/",
      "bridge_agent": "plugin_ox_{id}",
      "dependencies": [...],
      "submodule": "nombre-submodulo"  // opcional
    }
  }
}
```

### 3.2. Plugins Instalados

> Fuente canónica: `.github/plugins/registry.json` — consulte ese archivo para la lista y el conteo actualizados (campo `last_updated`).

| Plugin | Versión | Submódulo | Bridge |
|--------|---------|-----------|--------|
| arg-board | 1.0.0 | — | plugin_ox_argboard |
| enciclopedia | 1.0.0 | — | plugin_ox_enciclopedia |
| gh-pages | 1.1.0 | — | plugin_ox_ghpages |
| foro-scraper | 1.1.0 | — | plugin_ox_foroscraper |
| agent-creator | 1.1.0 | — | plugin_ox_agentcreator |
| teatro | 1.0.0 | — | plugin_ox_teatro |
| scrum | 1.0.0 | — | plugin_ox_scrum |
| mcp-presets | 1.0.0 | alephscript-mcp-presets-site | plugin_ox_mcppresets |
| network | 1.0.0 | alephscript-network-sdk | plugin_ox_network |
| novelist | 1.0.0 | mcp-novelist | plugin_ox_novelist |
| blockly-editor | 1.0.0 | blockly-alephscript-sdk | plugin_ox_blocklyeditor |
| wire-editor | 1.0.0 | node-red-alephscript-sdk | plugin_ox_wireeditor |
| prolog-editor | 1.0.0 | iot-sbr-logica-para-bots | plugin_ox_prologeditor |
| typed-prompting | 1.0.0 | alephscript-typed-prompting | plugin_ox_typedprompting |
| n8n-editor | 1.0.0 | alephscript-n8n-like-editor | plugin_ox_n8neditor |
| wiring-app | 1.0.0 | wiki-racer | plugin_ox_wiringapp |
| arg-board-app | 1.0.0 | wiki-racer | plugin_ox_argboardapp |
| hypergraph-editor | 1.0.0 | wiki-racer | plugin_ox_hypergrapheditor |
| consejo-asesor | 1.0.0 | onfalo-asesor-sdk | plugin_ox_consejoasesor |
| lore-sdk | 1.0.0 | DocumentMachineSDK | plugin_ox_loresdk |
| vector-machine | 1.0.0 | VectorMachineSDK (+ VectorMachineUI) | plugin_ox_vectormachine |

### 3.3. Estructura de un Plugin

```
.github/plugins/{id}/        # CÓDIGO (inmutable)
├── manifest.md              # Metadatos obligatorios
├── agents/                  # Agentes del plugin
├── prompts/                 # Prompts del plugin
├── instructions/            # Instrucciones del plugin
├── docs/                    # Documentación
└── meta/                    # Builders, config estática

ARCHIVO/PLUGINS/{ID}/        # DATOS (mutable)
├── .arrakis/               # Estado teatro (si ARG)
├── BOE/                    # Boletín Oficial (si aplica)
└── ...                     # Datos de runtime
```

### 3.4. Plugin Discovery

**VS Code Settings** (`.vscode/settings.json`):

```json
{
  "chat.promptFilesLocations": {
    ".github/prompts": true,
    ".github/plugins/*/prompts": true
  },
  "chat.instructionsFilesLocations": {
    ".github/instructions": true,
    ".github/plugins/*/instructions": true
  }
}
```

> **Script**: `scripts/setup-workspace.sh` genera estos settings.

---

## 4. Sistema de Submódulos

### 4.1. Submódulos Instalados (23)

> Fuente canónica: `.gitmodules` + `git submodule status`.

| Submódulo | Rama | Plugin asociado | Runtime |
|-----------|------|-----------------|---------|
| vscode-alephscript-extension | integration/beta/scriptorium | — | TypeScript |
| alephscript-mcp-presets-site | integration/beta/scriptorium | mcp-presets | Next.js |
| as-utils-sdk | integration/beta/scriptorium | — | Node.js |
| as-gym | integration/beta/scriptorium | — | TypeScript |
| alephscript-network-sdk | integration/beta/scriptorium | network | Docker |
| kick-aleph-bot | integration/beta/scriptorium | — | Node.js |
| kick-aleph-crono-bot | integration/beta/scriptorium | — | Node.js |
| mcp-novelist | integration/beta/scriptorium | novelist | Node.js |
| blockly-alephscript-sdk | integration/beta/scriptorium | blockly-editor | Angular |
| node-red-alephscript-sdk | integration/beta/scriptorium | wire-editor | Node-RED |
| iot-sbr-logica-para-bots | integration/beta/scriptorium | prolog-editor | SWI-Prolog |
| alephscript-typed-prompting | integration/beta/scriptorium | typed-prompting | Vite |
| alephscript-n8n-like-editor | integration/beta/scriptorium | n8n-editor | Angular 18 |
| wiki-racer | integration/beta/scriptorium | wiring-app, arg-board-app, hypergraph-editor | TypeScript |
| vscode-copilot-chat | integration/beta/scriptorium | — | TypeScript |
| state-machine-mcp-driver | integration/beta/scriptorium | — | TypeScript |
| mcp-agent-lore-sdk | — (sin branch fijada) | — | Markdown + templates |
| heteronimos-semi-asistidos-sdk | integration/beta/scriptorium | bot-hub-sdk | TypeScript |
| threejs-gamify-ui | — (sin branch fijada) | — | Three.js |
| para-la-voz-sdk | integration/beta/scriptorium | lore-sdk | Markdown + Jekyll |
| onfalo-asesor-sdk | integration/beta/scriptorium | consejo-asesor | Markdown + TypeScript SDK |
| aleph-deep-wiki | integration/beta/scriptorium | vector-machine | Docker + Python + FastAPI + ChromaDB |
| vm-sdk-chromadb-admin | integration/beta/scriptorium | vector-machine (auxiliar) | Next.js + React + TypeScript + ChromaDB UI |

### 4.2. Protocolo de Integración

**Fuente de verdad**: `.github/instructions/submodulo-integracion.instructions.md`

**Fases**:
1. Instalar submódulo (`git submodule add`)
2. Inspección de codebase
3. Casar con instrucciones
4. Conversación Scrum (PO ↔ SM)
5. Generar backlog borrador
6. Inicializar plugin y rama
7. Integrar en sistema (6 archivos críticos)
8. Publicar y anunciar

### 4.3. Archivos a Actualizar (Integración)

| Archivo | Zonas a modificar |
|---------|-------------------|
| `registry.json` | 1 entrada de plugin |
| `aleph.agent.md` | 1 handoff nuevo |
| `ox.agent.md` | 4 zonas (versión, plugin, bridge, handoff) |
| `setup-workspace.sh` | 4 zonas (comentario, vars, settings, llamada) |
| `scripts/README.md` | 2 zonas (contador, lista) |
| `.gitmodules` | 1 entrada (automático) |

### 4.4. Comandos de Submódulos

```bash
# Estado actual
git submodule status

# Actualizar todos
git submodule update --remote --merge

# Inicializar tras clonar
git submodule update --init --recursive

# Añadir nuevo
git submodule add {URL} [{nombre}]
cd {nombre}
git checkout -b integration/beta/scriptorium
```

---

## 5. Configuración del Workspace

### 5.1. Rama de Trabajo

**Fuente de verdad**: `workspace-config.json` (raíz)

```json
{
  "workspace": {
    "branch": "integration/beta/scriptorium",
    "commit_policy": {
      "protected_branches": ["main", "master"]
    }
  },
  "git": {
    "submodule_branch": "integration/beta/scriptorium"
  }
}
```

### 5.2. Scripts Disponibles

| Script | Propósito |
|--------|-----------|
| `setup-workspace.sh` | Genera settings, sincroniza submódulos |
| `setup-jekyll.sh` | Instala dependencias Jekyll |
| `serve-site.sh` | Levanta servidor local |
| `validate-site.sh` | Valida build antes de push |

---

## 6. Flujo DevOps

### 6.1. Metodología

**Base**: Agile/Scrum adaptado  
**Ciclo**: Sprints × Feature Cycles

### 6.2. Convención de Commits

```
<tipo>(<scope>): <descripción>

[cuerpo]

refs #TASK-ID
```

**Tipos**: `feat`, `fix`, `docs`, `refactor`, `style`, `chore`, `archive`

**Scopes Scriptorium**: `script/agents`, `script/prompts`, `script/plugins`, `script/devops`

**Scopes Fundación**: `fund/archivo`, `fund/caps`, `fund/plan`

### 6.3. Verificación de Rama

```bash
# Antes de CUALQUIER commit
BRANCH=$(cat workspace-config.json | grep '"branch"' | cut -d'"' -f4)
CURRENT=$(git branch --show-current)

if [ "$CURRENT" != "$BRANCH" ]; then
  echo "⚠️ Rama incorrecta: $CURRENT (esperado: $BRANCH)"
  exit 1
fi
```

### 6.4. Backlogs (Modelo DRY)

> **Épica**: SCRIPT-1.29.0 (Context Bloat Mitigation)

| Componente | Ubicación | Contenido |
|------------|-----------|-----------|
| **Índice** | `.github/BACKLOG-SCRIPTORIUM.md` | Solo referencias (~50 líneas) |
| **Borradores** | `ARCHIVO/DISCO/BACKLOG_BORRADORES/` | Épicas en desarrollo |
| **Archivados** | `ARCHIVO/DISCO/BACKLOG_ARCHIVADOS/` | Sprints cerrados |
| **Fotos** | `ARCHIVO/FOTOS_ESTADO/` | Métricas de cierre |

**Regla DRY**: El agente @scrum solo escribe filas de referencia en el índice, nunca contenido detallado.

---

## 7. Datos de Runtime (ARCHIVO/)

### 7.1. Estructura

```
ARCHIVO/
├── CARTAS/            # Cartas-puerta (estático)
├── DEVOPS/            # Este documento + Funcional.md
├── DISCO/             # Memoria de trabajo (activo)
│   ├── BACKLOG_BORRADORES/
│   ├── COPILOT_SNAPSHOTS/  # Snapshots de conversaciones Copilot (auto-generado)
│   ├── TALLER/        # Proyectos de usuario
│   └── ...
├── ENCICLOPEDIA/      # Tomos consultables
├── FOTOS_ESTADO/      # Capturas de sprint
├── NOTICIAS/          # Planas publicadas
├── PERFILES/          # Fichas de usuarios
├── PLUGINS/           # Datos de runtime por plugin
│   ├── AGENT_CREATOR/
│   ├── ARG_BOARD/
│   ├── ...
│   └── README.md
├── SITE/              # Assets adicionales
├── diagnostico/       # Eje pasado (memoria)
├── justificacion/     # Eje pasado (memoria)
└── marco/             # Eje activo (herramientas)
```

### 7.2. Datos por Plugin

| Plugin | Carpeta ARCHIVO | Contenido principal |
|--------|-----------------|---------------------|
| ARG_BOARD | `PLUGINS/ARG_BOARD/` | `.arrakis/`, BOE/ |
| AGENT_CREATOR | `PLUGINS/AGENT_CREATOR/` | recipes/, agents/created/, creation-log.json |
| GH_PAGES | `PLUGINS/GH_PAGES/` | published/ |
| SCRUM | `PLUGINS/SCRUM/` | sprints/ |
| TEATRO | `PLUGINS/TEATRO/` | obras/, cartelera.json |
| MCP_PRESETS | `PLUGINS/MCP_PRESETS/` | presets/, catalog.json |
| COPILOT_LOGS | `DISCO/COPILOT_SNAPSHOTS/` | INDEX.md, ABSTRACT.md, {id}/metadata.json |
| ... | ... | ... |

### 7.3. Personajes Creados (AGENT_CREATOR)

| Personaje | Agente Base | Rol | Obras |
|-----------|-------------|-----|-------|
| tarotista | @yellowflag | Oráculo epistémico (demarcación científica) | hola_mundo, camino_del_tarotista |
| nonsi | @blackflag + @redflag | Auditora marxista (estructura + sombras) | hola_mundo, camino_del_tarotista |
| tutatix | @blueflag | Guardián epistémico (red semántica FIA) | hola_mundo |
| lucas | @aleph + @ox | Scrum Master del Índice (DRY) | hola_mundo, camino_del_tarotista |
| pathykar | @indice | Arquitecto Central + Product Owner | hola_mundo, camino_del_tarotista |

**Ubicación**: `ARCHIVO/PLUGINS/AGENT_CREATOR/agents/created/`

---

## 8. Web (docs/)

### 8.1. Estructura Jekyll

```
docs/
├── _config.yml        # Configuración Jekyll
├── _includes/         # Partials HTML
├── _layouts/          # Templates (incluye presentation.html)
├── _site/             # Build (ignorado)
├── assets/
│   ├── css/           # main.css + blueprint.css
│   └── js/
├── teatro/            # Obras impress.js
├── index.md           # Landing
├── blueprint.md       # Vista UX (7 slides impress.js)
├── blueprint-mmco.md  # Vista MMCO (jerarquía emergencia) ← SCRIPT-1.27.0
├── ecosistema.md      # Agentes + Plugins + Submódulos
├── teatro.md          # Cartelera
├── periodico.md       # Noticias
└── ...
```

### 8.2. Despliegue

**Rama**: GitHub Pages desde `docs/` en branch configurado  
**URL**: `https://escrivivir-co.github.io/aleph-scriptorium/`

### 8.3. Desarrollo Local

```bash
# Instalar dependencias
cd docs && bundle install

# Levantar servidor
bundle exec jekyll serve --livereload

# Validar antes de push
../scripts/validate-site.sh
```

---

## 9. Mapeo de Puertos (Submódulos)

| Submódulo | Puerto | Servicio |
|-----------|--------|----------|
| alephscript-n8n-like-editor | 4200 | Angular dev |
| alephscript-n8n-like-editor | 4000 | SSR |
| alephscript-typed-prompting | 3019 | Vite editor |
| mcp-novelist | 3066 | MCP server |
| node-red-alephscript-sdk | 1880 | Node-RED |
| alephscript-network-sdk | — | Docker compose |
| vm-sdk-chromadb-admin | 3001 | Next.js admin UI |

### 9.1. MCP Mesh Servers (MCPGallery)

| Servidor | Puerto | Config | Bot Socket.IO |
|----------|--------|--------|---------------|
| xplus1-server | 3001 | DEFAULT_XPLUS1_MCP_SERVER_CONFIG | — |
| wiki-browser-server | 3002 | DEFAULT_WIKI_MCP_SERVER_CONFIG | — |
| devops-mcp-server | 3003 | DEFAULT_DEVOPS_MCP_SERVER_CONFIG | ProserpinaBot |
| state-machine-server | 3004 | DEFAULT_STATE_MACHINE_MCP_SERVER_CONFIG | — |
| prolog-mcp-server | 3006 | DEFAULT_PROLOG_MCP_SERVER_CONFIG | EuridiceBot |
| typed-prompt-mcp-server | 3020 | DEFAULT_TYPED_PROMPT_MCP_SERVER_CONFIG | — |
| launcher-server | 3050 | DEFAULT_LAUNCHER_MCP_SERVER_CONFIG | — |
| **socket-io-mesh** | **3010** | **SocketIoMesh (REST + WS)** | **Orchestrator** |

### 9.1.1. Stack MCP TypedPrompt (TYPED-MCP-1.0.0)

> **Feature**: Validación de schemas NL↔JSON

| Componente | Puerto | Tipo | Descripción |
|------------|--------|------|-------------|
| TypedPromptsEditor | 3019 | UI (Vite) | Editor visual de ontologías |
| MCPTypedPromptServer | 3020 | MCP Server | 7 tools + 3 prompts de validación |

**Arquitectura**:
```
Usuario → TypedPromptsEditor (3019) → HTTP → MCPTypedPromptServer (3020)
                                              ↓
                                    Schemas en ARCHIVO/PLUGINS/TYPED_PROMPTING/
```

**Arranque**:
```bash
# UI (3019)
cd TypedPromptsEditor && npm run dev

# MCP Server (3020)
cd MCPGallery/mcp-mesh-sdk && npm run start:typed-prompt
```

### 9.1.2. Stack MCP Prolog (SCRIPT-2.3.0)

> **Feature**: Lógica declarativa + Inteligencias Situadas

| Componente | Puerto | Tipo | Descripción |
|------------|--------|------|-------------|
| PrologEditor Frontend | 5001 | UI (Angular) | Editor visual con tabs: Query, Facts, Brain |
| PrologEditor Backend | 8000 | REST API (Express) | Proxy a SWI-Prolog |
| MCPPrologServer | 3006 | MCP Server | 12 tools + 6 resources + 8 prompts |

**Arquitectura**:
```
Usuario → PrologEditor (5001) → REST → Backend (8000) → SWI-Prolog
                                 ↓
            MCPPrologServer (3006) → Sesiones aisladas por obra
```

**Arranque** (via tasks.json):
```bash
# Full stack
npm run start:launcher  # 3050 + 3006
npm run start:backend   # 8000
npm run start:frontend  # 5001
```

**Prerequisitos**: SWI-Prolog en PATH (`swipl --version`)

### 9.2. MCP Packs (Packs Tipados)

> **Feature**: SCRIPT-2.3.0 — Agentic Typed Logic Flow

**Ubicación**: `.github/plugins/mcp-presets/packs/`

| Pack | Versión | MCP Server | Descripción |
|------|---------|------------|-------------|
| AgentPrologBrain | 1.0.0 | prolog-mcp-server | Razonamiento Prolog para agentes Teatro |

**Schema de validación**: `.github/plugins/mcp-presets/schemas/pack.schema.json`

**Uso en recetas AGENT_CREATOR**:
```json
{
  "mcpPacks": [{
    "id": "AgentPrologBrain",
    "prologBrain": { "file": "path/to/brain.pl" }
  }]
}
```

---

## 10. Tests y Validación

### 10.1. Ubicación

`.github/tests/`

### 10.2. Validaciones Críticas

| Validación | Comando/Ubicación |
|------------|-------------------|
| Build Jekyll | `scripts/validate-site.sh` |
| Agentes coherentes | `@ox diagnosticar agentes` |
| Plugins registrados | `grep en registry.json` |
| Submódulos sync | `git submodule status` |

---

## 11. Flujo de Release

**Fuente de verdad**: `.github/prompts/crear-release.prompt.md`

### 11.1. Pasos

1. Actualizar README.md (badge, métricas)
2. Actualizar docs/roadmap.md (fotos, estado)
3. Commit en rama de desarrollo
4. Merge a main (con indicador `-preview` si continúa)
5. Crear tag anotado
6. Push: main + rama + tag

### 11.2. Versionado

```
v{major}.{minor}.{patch}[-{prerelease}]

Ejemplos:
- v1.0.0-beta.1 — Primera piedra
- v1.0.0-beta.3 — Semillas de Futuro
```

---

## 12. Checklists de Mantenimiento

### 12.1. Añadir Plugin

- [ ] Crear estructura en `.github/plugins/{id}/`
- [ ] Crear `manifest.md` con frontmatter
- [ ] Crear agente(s) en `agents/`
- [ ] Crear bridge en `.github/agents/plugin_ox_{id}.agent.md`
- [ ] Añadir a `registry.json`
- [ ] Añadir handoff en `aleph.agent.md`
- [ ] Actualizar `ox.agent.md` (índice)
- [ ] Crear `ARCHIVO/PLUGINS/{ID}/README.md`
- [ ] Actualizar `setup-workspace.sh` (settings)

### 12.2. Añadir Submódulo

- [ ] `git submodule add {URL}`
- [ ] Crear rama `integration/beta/scriptorium`
- [ ] Crear `README-SCRIPTORIUM.md` en submódulo
- [ ] Crear plugin asociado (si aplica)
- [ ] Actualizar 6 archivos críticos
- [ ] Documentar en `docs/leeme.md`
- [ ] Añadir a `docs/roadmap.md`

### 12.3. Nueva Versión

- [ ] Cerrar sprint en backlog
- [ ] Actualizar contadores en README
- [ ] Generar foto de estado
- [ ] Actualizar roadmap
- [ ] Merge + tag + push

---

## 13. Referencias Rápidas

| Recurso | Ubicación |
|---------|-----------|
| Hub de instrucciones | `.github/copilot-instructions.md` |
| Protocolo DevOps | `.github/DEVOPS.md` |
| Protocolo Plugins | `.github/PLUGINS.md` |
| Protocolo Submódulos | `.github/instructions/submodulo-integracion.instructions.md` |
| Índice de agentes | `.github/agents/ox.agent.md` (JSON embebido) |
| Registro de plugins | `.github/plugins/registry.json` |
| Config workspace | `workspace-config.json` (raíz) |

---

> **Regla DRY**: Este índice es un mapa de navegación. No duplica contenido. Si necesitas detalle, navega al archivo referenciado.
