---
id: novelist
name: "Editor de Narrativas (MCP Novelist)"
version: "1.0.0"
description: "Plugin para editar obras narrativas con memoria a largo plazo usando servidor MCP. Sincroniza con TALLER, AGENT_CREATOR y Teatro."
author: "Aleph Scriptorium"
license: "MIT"

# Compatibilidad
scriptorium_version: ">=1.0.0"
dependencies:
  - arg-board
  - agent-creator
  - teatro

# Submódulo fuente
submodule: "mcp-novelist"
submodule_branch: "integration/beta/scriptorium"

# Recursos exportados
agents:
  - name: "Novelist"
    file: "agents/novelist.agent.md"
    description: "Agente principal para edición de obras narrativas"

prompts:
  - name: "novelist-crear-obra"
    file: "prompts/novelist-crear-obra.prompt.md"
    description: "Crear nueva obra desde cero o desde plantilla"
  - name: "novelist-exportar-teatro"
    file: "prompts/novelist-exportar-teatro.prompt.md"
    description: "Exportar obra de Novelist a Teatro"
  - name: "novelist-importar-taller"
    file: "prompts/novelist-importar-taller.prompt.md"
    description: "Importar obra del TALLER a Novelist"
  - name: "novelist-sincronizar-personajes"
    file: "prompts/novelist-sincronizar-personajes.prompt.md"
    description: "Sincronizar personajes con AGENT_CREATOR"

instructions:
  - name: "novelist"
    file: "instructions/novelist.instructions.md"
    description: "Contexto y reglas para edición narrativa"

# Integración con Aleph
handoffs:
  - label: "Crear obra en Novelist"
    agent: "Novelist"
    prompt: "Crea una nueva obra narrativa con estructura de 12 capítulos (monomito)."
  - label: "Exportar obra a Teatro"
    agent: "Novelist"
    prompt: "Exporta la obra actual de Novelist al TALLER y Teatro."
  - label: "Importar obra del TALLER"
    agent: "Novelist"
    prompt: "Importa una obra existente del TALLER a Novelist para edición."
  - label: "Sincronizar personajes"
    agent: "Novelist"
    prompt: "Sincroniza personajes entre Novelist y AGENT_CREATOR."
  - label: "Listar obras en Novelist"
    agent: "Novelist"
    prompt: "Lista todas las obras disponibles en el servidor Novelist."

# Configuración MCP
mcp:
  server_port: 3066
  server_name: "Novelist"
  transport: "http"
  tools_prefix: "alephAlpha_"
---

# Plugin: Novelist (Editor de Narrativas)

**Capa**: 🔌 Plugins  
**Submódulo**: `mcp-novelist`  
**Puerto MCP**: 3066

---

## Descripción

El plugin Novelist proporciona herramientas de edición narrativa con memoria a largo plazo, usando la metáfora de novelas para organizar:

- **Novelas** (obras) → contenedores de historia
- **Capítulos** → fases del monomito (12 estadios)
- **Escenas** → momentos narrativos con contenido
- **Personajes** → entidades del elenco (sincronizables con AGENT_CREATOR)

---

## Modos de Operación

### Modo Completo (Con servidor MCP)

Requiere que el servidor `mcp-novelist` esté corriendo:

```bash
cd mcp-novelist && npm start
# Servidor en http://localhost:3066
```

Habilita 25+ herramientas MCP para:
- Crear/modificar novelas, capítulos, escenas, personajes
- Auto-guardado configurable
- Persistencia en `novel-data.json`

### Modo Ligero (Sin servidor MCP)

Funciona solo con archivos locales del TALLER:
- Lee/escribe `obra.yaml` y `escenas/*.md`
- Sin herramientas MCP (usa prompts)
- Persistencia en archivos del TALLER

---

## Flujo Principal

```
┌──────────────────────────────────────────────────────────────────┐
│                     FLUJO NOVELIST                                │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│   1. CREAR                    2. EDITAR                          │
│   @aleph → [NOVELIST]         Editor/Albacea chatmodes           │
│   Crear obra                  Modificar estructura               │
│        │                           │                              │
│        ▼                           ▼                              │
│   novel-data.json  ◄──────────────────────────────┐              │
│        │                                          │               │
│        ▼                                          │               │
│   3. EXPORTAR                 4. SINCRONIZAR                     │
│   Novelist → Teatro           Personajes ↔ AGENT_CREATOR         │
│        │                           │                              │
│        ▼                           ▼                              │
│   TALLER/{obra}/              ELENCO/{personaje}/                │
│   ├── obra.yaml               └── recipe.json                   │
│   ├── escenas/*.md                                               │
│   └── personajes/                                                │
│        │                                                          │
│        ▼                                                          │
│   5. PUBLICAR                                                     │
│   @aleph → [TEATRO]                                              │
│   Poner en escena                                                │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

---

## Mapeo de Herramientas MCP → Prompts

| MCP Tool | Prompt Equivalente | Modo |
|----------|-------------------|------|
| `alephAlpha_createNovel` | `novelist-crear-obra.prompt.md` | Ambos |
| `alephAlpha_createCharacter` | `novelist-crear-personaje.prompt.md` | Ambos |
| `alephAlpha_createScene` | `novelist-crear-escena.prompt.md` | Ambos |
| `alephAlpha_listNovels` | Comando de bridge | Completo |
| `alephAlpha_exportNovel` | `novelist-exportar-teatro.prompt.md` | Ambos |

---

## Dependencias

| Plugin | Propósito | Obligatorio |
|--------|-----------|-------------|
| `arg-board` | TALLER y estructura de obras | ✅ |
| `agent-creator` | Sincronización de personajes | ✅ |
| `teatro` | Publicación de obras | ✅ |

---

## Configuración

### VS Code MCP

**`.vscode/mcp.json`**:

```json
{
  "servers": {
    "Novelist": {
      "type": "http",
      "url": "http://localhost:3066"
    }
  }
}
```

### Verificar conexión

```
@aleph → [NOVELIST] Status del servidor
```

---

## Invocación

```
@aleph → [NOVELIST] {acción}
```

O directamente:

```
@plugin_ox_novelist {acción}
```

---

## Referencias

- **Submódulo**: `mcp-novelist/`
- **README Integración**: `mcp-novelist/README-SCRIPTORIUM.md`
- **Bridge**: `.github/agents/plugin_ox_novelist.agent.md`
- **Datos runtime**: `ARCHIVO/PLUGINS/NOVELIST/`
- **TALLER**: `ARCHIVO/DISCO/TALLER/`
