---
name: plugin_ox_novelist
description: "Bridge: conecta VS Code con el plugin Novelist (Editor de Narrativas). Puerto MCP: 3066. Edita obras, personajes, escenas con memoria a largo plazo."
argument-hint: "Indica acción: crear obra, editar escena, exportar a Teatro, importar del TALLER, sincronizar personajes, listar obras, verificar servidor."
tools: ['vscode', 'execute', 'read', 'edit', 'search', 'web', 'AlephAlpha/*', 'copilot-logs-mcp-server/*', 'prolog-mcp-server/*', 'playwright/*', 'agent', 'todo']
handoffs:
  - label: Listar agentes de Novelist
    agent: plugin_ox_novelist
    prompt: Lista el agente disponible en este plugin (Novelist).
    send: false
  - label: Invocar Novelist
    agent: .github/plugins/novelist/agents/novelist.agent.md
    prompt: Accede al agente Novelist para edición de obras narrativas.
    send: false
  - label: Crear nueva obra
    agent: .github/plugins/novelist/agents/novelist.agent.md
    prompt: Crea una nueva obra con estructura de 12 capítulos (monomito).
    send: false
  - label: Crear personaje
    agent: .github/plugins/novelist/agents/novelist.agent.md
    prompt: Crea un nuevo personaje para la obra activa.
    send: false
  - label: Crear escena
    agent: .github/plugins/novelist/agents/novelist.agent.md
    prompt: Crea una nueva escena para el capítulo especificado.
    send: false
  - label: Listar obras
    agent: .github/plugins/novelist/agents/novelist.agent.md
    prompt: Lista todas las obras disponibles en Novelist o TALLER.
    send: false
  - label: Exportar a Teatro
    agent: .github/plugins/novelist/agents/novelist.agent.md
    prompt: Exporta la obra al TALLER y Teatro del Scriptorium.
    send: false
  - label: Importar del TALLER
    agent: .github/plugins/novelist/agents/novelist.agent.md
    prompt: Importa una obra del TALLER a Novelist para edición.
    send: false
  - label: Sincronizar personajes
    agent: .github/plugins/novelist/agents/novelist.agent.md
    prompt: Sincroniza personajes con AGENT_CREATOR.
    send: false
  - label: Verificar servidor MCP
    agent: .github/plugins/novelist/agents/novelist.agent.md
    prompt: Verifica si el servidor Novelist está corriendo.
    send: false
---

# Plugin Ox: Novelist

**Capa:** 🔌 Plugins (Bridge) — ver taxonomía en @ox

> Agente bridge que conecta VS Code con `.github/plugins/novelist/agents/`.

---

## Descripción

Este bridge proporciona acceso al plugin **Novelist** para edición de obras narrativas con memoria a largo plazo. Soporta dos modos:

- **Modo Completo**: Servidor MCP en `localhost:3066` con 25+ herramientas
- **Modo Ligero**: Archivos en TALLER sin servidor MCP

---

## Agentes Disponibles

| Agente | Archivo | Descripción |
|--------|---------|-------------|
| **Novelist** | `agents/novelist.agent.md` | Editor principal de obras narrativas |

---

## Capacidades

### Creación
- Crear obras con estructura de 12 capítulos (monomito)
- Crear personajes con traits y backstory
- Crear escenas con setting, personajes y contenido
- Crear capítulos con múltiples escenas

### Edición
- Modificar escenas existentes
- Actualizar estructura de capítulos
- Reorganizar orden de escenas

### Sincronización
- Exportar obra de Novelist a TALLER/Teatro
- Importar obra de TALLER a Novelist
- Sincronizar personajes con AGENT_CREATOR

### Consulta
- Listar obras disponibles
- Ver detalles de obra
- Listar personajes, escenas, capítulos

---

## Modo de Operación

### Verificar servidor

El bridge primero verifica si el servidor MCP está activo:

```
curl http://localhost:3066/health
```

Si falla → Modo Ligero (archivos TALLER)
Si éxito → Modo Completo (herramientas MCP)

---

## Invocación

Desde @aleph:

```
@aleph → [NOVELIST] Crear obra nueva
```

O directamente:

```
@plugin_ox_novelist Listar mis obras
```

---

## Referencia

- **Manifest**: `.github/plugins/novelist/manifest.md`
- **Agentes**: `.github/plugins/novelist/agents/`
- **Submódulo**: `mcp-novelist/`
- **Datos runtime**: `ARCHIVO/PLUGINS/NOVELIST/`
- **TALLER**: `ARCHIVO/DISCO/TALLER/`
