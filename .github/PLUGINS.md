# Protocolo de Plugins — Aleph Scriptorium

> **Resumen**: Protocolo para crear, instalar y gestionar plugins. Los plugins extienden capacidades sin modificar el núcleo.

**Versión**: 1.0.0  
**Agente gestor**: `@pluginmanager`

---

## Referencia Rápida

### Ubicaciones

| Tipo | Ubicación | Convención |
|------|-----------|------------|
| Código | `.github/plugins/{id}/` | kebab-case |
| Datos | `ARCHIVO/PLUGINS/{ID}/` | SCREAMING_SNAKE_CASE |
| Bridges | `.github/agents/plugin_ox_{id}.agent.md` | — |

### Estructura Mínima

```
mi-plugin/
├── manifest.md           # Obligatorio (frontmatter YAML)
└── agents/
    └── mi-agente.agent.md
```

### Manifest (frontmatter)

```yaml
---
id: mi-plugin
name: "Mi Plugin"
version: "1.0.0"
scriptorium_version: ">=0.0.1"
agents:
  - name: "NombreAgente"
    file: "agents/mi-agente.agent.md"

# (Opcional) Servidores MCP que el plugin aporta
mcpServers:
  - id: "mi-server"
    port: 3XXX
    source: "submódulo/ruta"        # Dónde está el código
    startCommand: "npm start"       # Cómo arrancarlo
---
```

---

## Comandos de @pluginmanager

| Comando | Descripción |
|---------|-------------|
| `instalar <ruta>` | Instala plugin desde ruta local |
| `listar` | Muestra plugins con estado |
| `activar <id>` | Activa en settings.json |
| `desactivar <id>` | Desactiva en settings.json |
| `status` | Diagnóstico: activos, umbrales |
| `desinstalar <id>` | Elimina completamente |

---

## Flujo de Instalación

```
1. Validar manifest.md
2. Copiar a .github/plugins/{id}/
3. Crear bridge: plugin_ox_{id}.agent.md
4. Registrar en registry.json
5. Actualizar settings.json (desactivado por defecto)
6. Commit según DEVOPS.md
```

---

## Umbrales de Plugins Activos

| Plugins | Estado | Efecto |
|---------|--------|--------|
| 0-3 | 🟢 Óptimo | Sin impacto |
| 4-6 | �� Aceptable | Mínimo impacto |
| 7-10 | 🟠 Cargado | Posible lentitud |
| 11+ | 🔴 Sobrecargado | Desactivar algunos |

---

## Bridges Instalados

| Bridge | Plugin | Agentes | MCP Servers |
|--------|--------|---------|-------------|
| `@plugin_ox_argboard` | ARG Board | 8 agentes | — |
| `@plugin_ox_enciclopedia` | Enciclopedia | 2 agentes | — |
| `@plugin_ox_ghpages` | GH-Pages | 1 agente | — |
| `@plugin_ox_foroscraper` | Foro Scraper | 1 agente | — |
| `@plugin_ox_agentcreator` | Agent Creator | 1 agente | — |
| `@plugin_ox_teatro` | Teatro | 1 agente | — |
| `@plugin_ox_scrum` | Scrum | 1 agente | — |
| `@plugin_ox_mcppresets` | MCP Presets | 1 agente | 6 servers (mesh) |
| `@plugin_ox_typedprompting` | TypedPrompting | 1 agente | 1 server (3020) |
| `@plugin_ox_openasyncapieditor` | OpenAsyncAPI Editor | 1 agente | — |

---

## Servidores MCP (Opcional)

Los plugins pueden registrar **servidores MCP** que se añaden a `.vscode/mcp.json`.

### Propiedad `mcpServers` en Manifest

```yaml
mcpServers:
  - id: "devops-mcp-server"         # ID único
    port: 3003                       # Puerto HTTP
    source: "MCPGallery/mcp-mesh-sdk" # Submódulo fuente
    startCommand: "npm start"        # Comando de arranque
    description: "DevOps automation" # Descripción
```

### Servidores Disponibles (MCPGallery/mcp-mesh-sdk)

| Servidor | Puerto | Descripción |
|----------|--------|-------------|
| `xplus1-server` | 3001 | X+1 control |
| `wiki-browser-server` | 3002 | Wikipedia browsing |
| `devops-mcp-server` | 3003 | DevOps automation (default) |
| `state-machine-server` | 3004 | X+1 state machine |
| `prolog-mcp-server` | 3006 | Prolog queries + KB management (SCRIPT-2.3.0) |
| `typed-prompt-mcp-server` | 3020 | Schema validation + ontology management (TYPED-MCP-1.0.0) |
| `launcher-server` | 3050 | Server orchestration |

### Flujo de Registro

1. Plugin declara `mcpServers` en manifest
2. `@pluginmanager` detecta y actualiza `.vscode/mcp.json`
3. Usuario arranca el servidor (manual o script)
4. VS Code Copilot puede invocar tools del servidor

### Catálogo Dinámico (via Zeus)

Para listar servidores activos en la mesh:
```bash
curl http://localhost:4001/ai/ui/mcp/list | jq '.catalog'
```

→ Ver [MCPGallery/README-SCRIPTORIUM.md](../MCPGallery/README-SCRIPTORIUM.md) para arquitectura completa.

---

## Ciclo de Vida

```
EXTERNO → INSTALADO (disabled) ↔ ENABLED → REMOVED
```

### Activación en Settings

```json
{
  "chat.promptFilesLocations": {
    ".github/plugins/{id}/prompts": true
  },
  "chat.instructionsFilesLocations": {
    ".github/plugins/{id}/instructions": true
  }
}
```

---

## Permisos

| Recurso | Permiso |
|---------|---------|
| `.github/plugins/{id}/` | RW (su carpeta) |
| `registry.json` | R (solo lectura) |
| Otros plugins | ❌ No acceso |

---

## Convenciones de Nombres

| Recurso | Convención | Ejemplo |
|---------|------------|---------|
| Plugin ID | kebab-case | `arg-board` |
| Agentes | PascalCase.agent.md | `Arrakis.agent.md` |
| Prompts | kebab-case.prompt.md | `genesis.prompt.md` |

---

## Caso de Uso: Integración de Catálogos Externos via MCP

> **Épica**: AGENT-TEMPLATES-1.0.0  
> **Plugin ejemplo**: `agent-creator` + `AgentLoreSDK`

### Problema

Un plugin necesita acceder a un **catálogo externo** (otro submódulo o repositorio) para ofrecer plantillas, componentes o recursos predefinidos al usuario durante su flujo de trabajo.

### Solución: Patrón Submódulo + Índice + Detección Proactiva DRY

```
┌─────────────────────────────────────────────────────────────────┐
│                    PATRÓN DE INTEGRACIÓN                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. SUBMÓDULO (Acceso)                                         │
│     └── AgentLoreSDK/ (raíz del workspace)                     │
│         → Submódulo #18: mcp-agent-lore-sdk                    │
│                                                                 │
│  2. ÍNDICE (Navegación)                                        │
│     └── .github/plugins/agent-creator/index/catalog.json       │
│         → Metadatos escaneados del catálogo                    │
│                                                                 │
│  3. DETECCIÓN PROACTIVA DRY (Comportamiento)                   │
│     └── Paso 1.5 en crear-agente.prompt.md                     │
│         → Infiere dominio de keywords del usuario              │
│         → Sugiere plantillas SIN preguntar                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Estructura de Archivos

```
AgentLoreSDK/                      # Submódulo en raíz (#18)
└── cli-tool/
    └── components/
        ├── agents/                # 25 categorías, 165 items
        ├── commands/              # 20 categorías, 217 items
        ├── skills/                # 10 categorías, 255 items
        └── templates/             # 6 lenguajes

.github/plugins/agent-creator/
├── manifest.md                    # Declara externalCatalogs
├── index/
│   ├── catalog.json               # Índice maestro (61 categorías, 637+ items)
│   ├── catalog.schema.json        # Esquema de validación
│   └── README.md                  # Documentación de uso
└── prompts/
    └── crear-agente.prompt.md     # Flujo con Paso 1.5 DRY
```

### Manifest: Declarar Catálogo Externo

```yaml
---
id: agent-creator
name: "Agent Creator"
version: "2.0.0"
scriptorium_version: ">=1.0.0"

# Catálogos externos
externalCatalogs:
  - id: "agent-lore-sdk"
    source: "AgentLoreSDK/cli-tool"
    indexFile: "index/catalog.json"
---
```

### Esquema del Índice (catalog.json)

```json
{
  "$schema": "./catalog.schema.json",
  "source": "AgentLoreSDK/cli-tool",
  "scanned_at": "2026-01-04T16:00:00Z",
  "summary": {
    "total_categories": 61,
    "total_items": 637
  },
  "categories": {
    "agents": {
      "description": "Agentes especializados",
      "count": 25,
      "items": [
        { "id": "security", "name": "Security", "path": "components/agents/security/", "items": 5, "tags": ["security", "audit"] },
        { "id": "deep-research-team", "name": "Deep Research Team", "path": "components/agents/deep-research-team/", "items": 13, "tags": ["research", "analysis"] }
      ]
    },
    "commands": { "count": 20, "items": ["..."] },
    "skills": { "count": 10, "items": ["..."] },
    "templates": { "count": 6, "items": ["..."] }
  }
}
```

### Principio DRY: Detección Proactiva

> "Un agente que no sugiere plantillas existentes **dilapida esfuerzo del usuario**."

El Paso 1.5 de `crear-agente.prompt.md` implementa detección proactiva:

1. **Infiere dominio** de las palabras del usuario (mapeo de keywords)
2. **Consulta catalog.json** buscando categorías matching
3. **Muestra proactivamente** (no pregunta "¿quieres ver?")
4. **Usuario decide**: explorar, seleccionar, o skip

### Flujo de Uso: Detección Proactiva DRY

```
Usuario: "Quiero mejorar a Lucas con capacidades Scrum"
                         │
                         ▼
         ┌───────────────────────────────────┐
         │  1. Análisis del agente existente │
         │     → Lee lucas.agent.md          │
         │     → Lee lucas-prolog.brain.pl   │
         └───────────────┬───────────────────┘
                         │
                         ▼
         ┌───────────────────────────────────┐
         │  2. Detección Proactiva DRY       │
         │     Keywords: "scrum", "lucas",   │
         │               "coherencia"        │
         │     → project-management (18)     │
         │     → documentation (4)           │
         │     → productivity (12)           │
         └───────────────┬───────────────────┘
                         │
                         ▼
         ┌───────────────────────────────────┐
         │  3. Sugerencia (sin preguntar)    │
         │     💡 "Tengo plantillas que      │
         │        podrían ahorrarte trabajo" │
         │     → Lista categorías relevantes │
         └───────────────┬───────────────────┘
                         │
                         ▼
         ┌───────────────────────────────────┐
         │  4. Usuario elige o skip          │
         │     → Explora → Selecciona        │
         │     → Fusiona con agente base     │
         └───────────────────────────────────┘
```

### Ejemplo de Interacción (Demo PO)

```markdown
**PO**: Quiero mejorar a Lucas, el Scrum Master del Índice

**AgentCreator**: Analizando Lucas...
- Ubicación: ARCHIVO/DISCO/TALLER/ELENCO/lucas/
- Rol actual: Mentor en Teatro ARG, guardián de coherencia documental
- Cerebro: 329 líneas de Prolog

💡 Detecté que Lucas trabaja con **documentación**, **coherencia** y **Scrum**.

| # | Tipo | Categoría | Items |
|---|------|-----------|-------|
| 1 | agents | documentation | 4 |
| 2 | skills | productivity | 12 |
| 3 | commands | project-management | 18 |

¿Cuál exploramos? (1-3/skip)

**PO**: 3

**AgentCreator**: En project-management tengo 18 plantillas:
- backlog-grooming.md, velocity-tracker.md, blockers-report.md...

¿Cuáles fusiono con Lucas?

**PO**: backlog-grooming, velocity-tracker, blockers-report

**AgentCreator**: ✅ Lucas mejorado.
- lucas.agent.md actualizado (3 handoffs nuevos)
- lucas-prolog.brain.pl extendido (nuevas reglas Scrum)
```

### Plugins que Usan Este Patrón

| Plugin | Catálogo Externo | Uso |
|--------|------------------|-----|
| `agent-creator` | `AgentLoreSDK` | Plantillas de agentes, skills, commands |
| `typed-prompting` | `OnthologyEditor/schemas` | Esquemas de validación |
| `teatro` | `NovelistEditor/templates` | Plantillas narrativas |

---

## Detalle Extendido

→ Ver `plugin-lifecycle.instructions.md` para:
- Protocolo de instalación paso a paso
- FAQ de resolución de problemas
- Validaciones de manifest
- Mensajes de error

→ Ver `registry.json` para estado actual de plugins instalados
