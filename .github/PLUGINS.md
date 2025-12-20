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

### 2.3. Registro de Plugins

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

## Referencias

- [DEVOPS.md](DEVOPS.md) — Protocolo de commits
- [BACKLOG-SCRIPTORIUM.md](BACKLOG-SCRIPTORIUM.md) — Backlog de tareas
- [copilot-instructions.md](copilot-instructions.md) — Hub de instrucciones

