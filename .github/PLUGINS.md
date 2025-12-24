# Protocolo de Plugins — Aleph Scriptorium

> **Versión**: 1.0.0  
> **Estado**: Activo  
> **Fecha**: 2025-12-20

---

## 1. Propósito

Este documento define el **protocolo oficial** para crear, instalar y gestionar plugins en ALEPH Scriptorium. Los plugins permiten extender las capacidades del sistema sin modificar el núcleo base.

---

## 2. Arquitectura

### 2.1. Ubicación del Código

```
.github/
├── plugins/                    # Directorio de plugins (código)
│   ├── registry.json          # Índice de plugins instalados
│   └── {plugin-id}/           # Cada plugin en su carpeta
│       ├── manifest.md        # Metadatos (obligatorio)
│       ├── agents/            # Agentes del plugin
│       ├── prompts/           # Prompts del plugin
│       ├── instructions/      # Instrucciones específicas
│       ├── docs/              # Documentación
│       └── meta/              # Builders y configuración estática
```

### 2.2. Ubicación de Datos de Runtime

Los datos generados durante la ejecución de un plugin se almacenan separados del código:

```
ARCHIVO/
└── PLUGINS/                    # Directorio de datos de plugins
    └── {PLUGIN_ID}/           # Carpeta por plugin (SCREAMING_SNAKE_CASE)
        ├── .arrakis/          # Estado del teatro (si aplica)
        ├── BOE/               # Boletín Oficial (si aplica)
        └── ...                # Otros datos generados
```

**Convención de nombres**:
- Código del plugin: `kebab-case` → `.github/plugins/arg-board/`
- Datos del plugin: `SCREAMING_SNAKE_CASE` → `ARCHIVO/PLUGINS/ARG_BOARD/`

**Razón de la separación**:
- El código es **inmutable** tras la instalación
- Los datos son **mutables** durante la ejecución
- Permite backup selectivo y versionado diferenciado


#### Plugin Bridges

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

#### Plugin Discovery (Settings de Workspace)

> **SCRIPT-1.5.0**: Los prompts e instructions de plugins ahora son accesibles vía `.vscode/settings.json`.

Los settings de workspace añaden carpetas adicionales para detectar recursos de plugins:

| Setting | Propósito |
|---------|-----------|
| `chat.promptFilesLocations` | Detecta prompts de plugins (33 adicionales) |
| `chat.instructionsFilesLocations` | Detecta instructions de plugins (7 adicionales) |
| `chat.useNestedAgentsMdFiles` | Busca AGENTS.md en subcarpetas |
| `chat.promptFilesRecommendations` | Muestra prompts sugeridos |

**Resultado**: Los prompts de plugins aparecen al escribir `/` en el chat.

### 2.3. Settings de Workspace para Plugin Discovery

> **SCRIPT-1.5.0**: VS Code solo detecta automáticamente recursos en las carpetas canónicas (`.github/prompts/`, `.github/instructions/`). Los plugins requieren settings adicionales.

> **SCRIPT-1.15.0**: Los plugins se instalan **desactivados por defecto** en settings para evitar sobrecarga del sistema. El usuario activa solo los que necesita en cada sesión.

El archivo `.vscode/settings.json` debe incluir las rutas de cada plugin instalado:

```json
{
  "chat.promptFilesLocations": {
    ".github/prompts": true,
    ".github/plugins/{id}/prompts": false
  },
  "chat.instructionsFilesLocations": {
    ".github/instructions": true,
    ".github/plugins/{id}/instructions": false
  }
}
```

**Comportamiento por defecto (SCRIPT-1.15.0)**:
- Los plugins se añaden con valor `false` (desactivados)
- El usuario activa con `@pluginmanager activar {id}`
- Los plugins activados funcionan normalmente
- Ver [FAQ en plugin-manager.agent.md](agents/plugin-manager.agent.md) para resolución de problemas

**Umbrales de plugins activos**:

| Plugins Activos | Estado | Efecto |
|-----------------|--------|--------|
| 0-3 | 🟢 Óptimo | Sin impacto |
| 4-6 | 🟡 Aceptable | Mínimo impacto |
| 7-10 | 🟠 Cargado | Posible lentitud en autocompletado |
| 11+ | 🔴 Sobrecargado | Recomendado desactivar algunos |

**Al instalar un plugin**, el Plugin Manager debe añadir automáticamente las rutas del nuevo plugin a estos settings con valor `false`.

**Documentación oficial**:
- [Prompt Files Locations](https://code.visualstudio.com/docs/copilot/customization/prompt-files)
- [Instructions Files Locations](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)

### 2.4. Registro de Plugins

El archivo `registry.json` mantiene el estado de todos los plugins:

```json
{
  "version": "1.0.0",
  "plugins": {
    "plugin-id": {
      "name": "Nombre del Plugin",
      "version": "1.0.0",
      "installed_at": "2025-12-20T10:00:00Z",
      "enabled": true,
      "agents_count": 3,
      "prompts_count": 10
    }
  },
  "last_updated": "2025-12-20T10:00:00Z"
}
```

---

## 3. Estructura de un Plugin

### 3.1. Manifiesto (Obligatorio)

Cada plugin DEBE contener un archivo `manifest.md` con frontmatter YAML:

```yaml
---
id: mi-plugin                    # Identificador único (kebab-case)
name: "Mi Plugin"                # Nombre legible
version: "1.0.0"                 # Semver
description: "Descripción breve"
author: "Nombre del autor"
license: "MIT"

# Compatibilidad
scriptorium_version: ">=0.0.1"   # Versión mínima de Scriptorium
dependencies: []                  # IDs de plugins requeridos

# Recursos exportados
agents:
  - name: "NombreAgente"
    file: "agents/mi-agente.agent.md"
    description: "Qué hace este agente"

prompts:
  - name: "mi-prompt"
    file: "prompts/mi-prompt.prompt.md"
    description: "Qué hace este prompt"

instructions:
  - name: "mi-instruccion"
    file: "instructions/mi-instruccion.instructions.md"

# Integración con Aleph
handoffs:
  - label: "Acción descriptiva"
    agent: "NombreAgente"
    prompt: "Prompt inicial para el agente"
---

# Mi Plugin

Contenido Markdown con documentación del plugin.
```

### 3.2. Convenciones de Nombres

| Recurso | Convención | Ejemplo |
|---------|------------|---------|
| Plugin ID | kebab-case | `arg-board` |
| Carpetas | kebab-case | `agents/`, `prompts/` |
| Agentes | PascalCase.agent.md | `Arrakis.agent.md` |
| Prompts | kebab-case.prompt.md | `genesis.prompt.md` |
| Instrucciones | kebab-case.instructions.md | `mcp-arg.instructions.md` |

### 3.3. Estructura Mínima

```
mi-plugin/
├── manifest.md           # Obligatorio
└── agents/               # Al menos uno de estos
    └── mi-agente.agent.md
```

### 3.4. Estructura Completa

```
.github/plugins/mi-plugin/       # CÓDIGO (inmutable)
├── manifest.md
├── agents/
│   ├── agente-uno.agent.md
│   └── agente-dos.agent.md
├── prompts/
│   ├── accion-uno.prompt.md
│   └── accion-dos.prompt.md
├── instructions/
│   └── contexto.instructions.md
├── docs/
│   ├── guia-usuario.md
│   └── arquitectura.md
└── meta/
    └── builder.md

ARCHIVO/PLUGINS/MI_PLUGIN/       # DATOS (mutable)
├── .arrakis/                    # Estado del teatro (si ARG)
│   ├── theater_state.json
│   ├── obras.json
│   └── actores.json
├── BOE/                         # Boletín Oficial
│   └── boe-YYYY-MM-DD.json
└── ...                          # Otros datos de runtime
```

---

## 4. Ciclo de Vida

### 4.1. Estados

```
┌──────────┐     ┌───────────┐     ┌──────────┐
│ EXTERNO  │────▶│ INSTALADO │◀───▶│ ENABLED  │
│          │     │ (disabled)│     │          │
└──────────┘     └───────────┘     └──────────┘
      │                │                 │
      │                ▼                 │
      │          ┌──────────┐           │
      └─────────▶│ REMOVED  │◀──────────┘
                 └──────────┘
```

### 4.2. Instalación

1. **Validar** manifiesto y estructura
2. **Verificar** compatibilidad de versiones
3. **Resolver** dependencias
4. **Copiar** a `.github/plugins/{id}/`
5. **Registrar** en `registry.json`
6. **Integrar** handoffs en Aleph (si definidos)
7. **Commit** según protocolo DevOps

### 4.3. Activación/Desactivación

```json
// En registry.json
{
  "plugins": {
    "mi-plugin": {
      "enabled": true   // ← Cambiar a false para desactivar
    }
  }
}
```

Plugins desactivados:
- No aparecen en handoffs de Aleph
- Sus prompts no se indexan
- Sus agentes no están disponibles

### 4.4. Desinstalación

1. **Verificar** que ningún otro plugin depende de él
2. **Eliminar** carpeta `.github/plugins/{id}/`
3. **Actualizar** `registry.json`
4. **Limpiar** referencias en handoffs
5. **Commit** con tipo `chore(script/plugins)`

---

## 5. Permisos y Aislamiento

### 5.1. Matriz de Permisos

| Recurso | Permiso | Notas |
|---------|---------|-------|
| `.github/plugins/{id}/` | RW | Carpeta del plugin |
| `.github/plugins/registry.json` | R | Solo lectura |
| `.github/agents/` | R | Para integración |
| `.github/prompts/` | R | Para integración |
| `.github/instructions/` | R | Para integración |
| `ARCHIVO/` | R | Contexto doctrinal |
| `PROYECTOS/` | R | Contexto proyectos |
| Otros plugins | ❌ | No acceso cruzado |

### 5.2. Restricciones

Los plugins NO pueden:
- Modificar archivos del core (`.github/*.md`)
- Acceder a otros plugins directamente
- Modificar `registry.json` (solo el manager)
- Ejecutar comandos del sistema operativo
- Acceder a secretos o credenciales

---

## 6. Integración con Aleph

### 6.1. Handoffs Automáticos

Los handoffs definidos en el manifiesto se añaden al agente Aleph:

```yaml
# En manifest.md del plugin
handoffs:
  - label: "Abrir Teatro ARG"
    agent: "Arrakis"
    prompt: "Inicializa teatro transmedia..."
```

Se traduce a:

```yaml
# En aleph.agent.md (añadido automáticamente)
handoffs:
  - label: "[ARG-BOARD] Abrir Teatro ARG"
    agent: Arrakis
    prompt: "Inicializa teatro transmedia..."
    send: false
```

### 6.2. Namespace

Para evitar conflictos, los recursos del plugin se prefijan:

- Handoffs: `[{PLUGIN-ID}] {label}`
- Agentes: `{PluginId}/{AgentName}`
- Prompts: `{plugin-id}/{prompt-name}`

---

## 7. Desarrollo de Plugins

### 7.1. Crear Nuevo Plugin

1. Crear carpeta con estructura mínima
2. Escribir `manifest.md` con metadatos
3. Implementar agentes y prompts
4. Testear en aislamiento
5. Instalar con el agente Plugin Manager

### 7.2. Testear Plugin

```bash
# Desde el directorio del plugin
# Verificar estructura
ls -la
cat manifest.md

# Validar YAML del frontmatter
head -50 manifest.md
```

### 7.3. Publicar Plugin

Los plugins pueden distribuirse como:
- Carpeta en repositorio Git
- Archivo .zip con estructura
- Submódulo Git

---

## 8. Versionado

### 8.1. Semver para Plugins

```
MAJOR.MINOR.PATCH

MAJOR: Cambios incompatibles en API/estructura
MINOR: Nueva funcionalidad compatible
PATCH: Correcciones de bugs
```

### 8.2. Compatibilidad con Scriptorium

En el manifiesto:

```yaml
scriptorium_version: ">=0.0.1"    # Cualquier versión desde 0.0.1
scriptorium_version: "~0.1.0"    # Solo versiones 0.1.x
scriptorium_version: "^1.0.0"    # Versiones 1.x.x
```

---

## 9. Ejemplos

### 9.1. Plugin Mínimo

```yaml
---
id: hola-mundo
name: "Hola Mundo"
version: "1.0.0"
description: "Plugin de ejemplo"
author: "Demo"
scriptorium_version: ">=0.0.1"
dependencies: []
agents:
  - name: "Saludador"
    file: "agents/saludador.agent.md"
    description: "Agente que saluda"
---
# Hola Mundo
Plugin de demostración.
```

### 9.2. Plugin Complejo (ARG Board)

Ver: [plugins/arg-board/manifest.md](plugins/arg-board/manifest.md)

---

## 10. Agente Gestor

**Plugin Manager** (`agents/plugin-manager.agent.md`) proporciona:

| Handoff | Acción |
|---------|--------|
| Instalar plugin | Copia y registra un plugin externo |
| Listar plugins | Muestra plugins instalados y su estado |
| Activar plugin | Habilita un plugin desactivado |
| Desactivar plugin | Deshabilita sin eliminar |
| Desinstalar plugin | Elimina completamente |

---

## 11. Bridge Agents (Plugin Ox)

> **Problema**: VS Code solo carga agentes desde `.github/agents/`, no desde carpetas de plugins.

> **Solución**: Crear **agentes bridge** mínimos que conectan VS Code con los agentes reales de cada plugin.

### 11.1. Filosofía

Igual que `@ox` es el oráculo del sistema que conoce todos los agentes, cada `plugin_ox_{nombre}` es el **oráculo de su plugin**:

- Vive en `.github/agents/` (donde VS Code lo detecta)
- Sigue patrón **DRY**: no duplica lógica, solo referencia
- Expone handoffs que delegan a los agentes reales
- Documenta el índice de agentes del plugin

### 11.2. Nomenclatura

```
plugin_ox_{nombrePlugin}.agent.md
```

Ejemplos:
- `plugin_ox_argboard.agent.md`
- `plugin_ox_enciclopedia.agent.md`
- `plugin_ox_ghpages.agent.md`
- `plugin_ox_foroscraper.agent.md`
- `plugin_ox_agentcreator.agent.md`

### 11.3. Plantilla de Bridge Agent

```yaml
---
name: plugin_ox_{NombrePlugin}
description: "Bridge: conecta VS Code con agentes de {nombre}. Ver .github/plugins/{id}/agents/"
argument-hint: "Invoca agentes del plugin {nombre} o consulta su índice."
tools: ['agent']
handoffs:
  - label: Listar agentes de {nombre}
    agent: plugin_ox_{nombre}
    prompt: Lista agentes disponibles en este plugin.
    send: false
  - label: Invocar {Agente1}
    agent: .github/plugins/{id}/agents/{agente1}.agent.md
    prompt: {descripción}
    send: false
  # ... un handoff por cada agente del plugin
---

# Plugin Ox: {NombrePlugin}

**Capa:** 🔌 Plugins (Bridge) — ver taxonomía en @ox

> Agente bridge que conecta VS Code con `.github/plugins/{id}/agents/`.

## Agentes disponibles

| Agente | Archivo | Descripción |
|--------|---------|-------------|
| ... | ... | ... |

## Referencia

- Manifest: `.github/plugins/{id}/manifest.md`
- Agentes: `.github/plugins/{id}/agents/`
```

### 11.4. Flujo de Instalación (actualizado)

Al instalar un plugin con agentes, el Plugin Manager debe:

```
1. VALIDAR manifest.md
   ↓
2. COPIAR a .github/plugins/{id}/
   ↓
3. CREAR plugin_ox_{id}.agent.md en .github/agents/  ← NUEVO
   ↓
4. REGISTRAR en registry.json (incluir bridge: true)
   ↓
5. ACTUALIZAR handoffs en aleph.agent.md (apuntar al bridge)
   ↓
6. COMMIT
```

### 11.5. Arquitectura de Capas

```
┌─────────────────────────────────────────┐
│              🐂 OX (Meta)               │
│     Oráculo · Documentación · Índice    │
└───────────────────┬─────────────────────┘
                    │
    ┌───────────────┴───────────────┐
    ▼                               ▼
┌──────────┐                 ┌──────────────┐
│ 🟢 UI    │ ───────────────▶│ 🔌 BRIDGES   │
│ @aleph   │   invoca        │ (detectables)│
└──────────┘                 └──────┬───────┘
                                    │ delega
                                    ▼
                            ┌──────────────┐
                            │ 🔌 PLUGINS   │
                            │  (reales)    │
                            └──────────────┘
```

### 11.6. Bridges Instalados

| Bridge | Plugin | Agentes |
|--------|--------|---------|
| `plugin_ox_argboard` | arg-board | Arrakis, BOE, Decoherence, GitARG, Heroe, ImpressJS, MBox, PlatformCom |
| `plugin_ox_enciclopedia` | enciclopedia | Bibliotecario |
| `plugin_ox_ghpages` | gh-pages | GHPages |
| `plugin_ox_foroscraper` | foro-scraper | ForoScraper |
| `plugin_ox_agentcreator` | agent-creator | AgentCreator |
| `plugin_ox_teatro` | teatro | Teatro |
| `plugin_ox_scrum` | scrum | Scrum |
| `plugin_ox_mcppresets` | mcp-presets | McpPresets |

---

## Referencias

- [DEVOPS.md](DEVOPS.md) — Protocolo de commits
- [BACKLOG-SCRIPTORIUM.md](BACKLOG-SCRIPTORIUM.md) — Backlog de tareas
- [copilot-instructions.md](copilot-instructions.md) — Hub de instrucciones

