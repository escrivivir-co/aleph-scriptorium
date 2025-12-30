---
description: "FAQ y protocolo detallado para gestión del ciclo de vida de plugins."
applyTo: ".github/plugins/*/manifest.md, .github/plugins/registry.json, .vscode/settings.json"
---

# Instrucciones: Ciclo de Vida de Plugins

> Activación contextual: al trabajar con manifests, registry o settings de plugins.

---

## Protocolo de Instalación

### 1. Validar Fuente

```
📁 Plugin externo
├── manifest.md     ← OBLIGATORIO
├── agents/         ← Al menos uno
└── ...
```

### 2. Extraer Metadatos

Lee el frontmatter YAML del `manifest.md`:

```yaml
---
id: plugin-id
name: "Nombre"
version: "1.0.0"
scriptorium_version: ">=0.0.1"
agents: [...]
prompts: [...]
handoffs: [...]
---
```

### 3. Verificar Compatibilidad

- `scriptorium_version` debe ser compatible con la versión actual
- `dependencies` deben estar instalados y activos
- `id` no debe existir en `registry.json`

### 4. Copiar Estructura

```bash
cp -r /ruta/plugin/  .github/plugins/{id}/
```

### 5. Actualizar Registry

```json
{
  "plugins": {
    "{id}": {
      "name": "...",
      "version": "...",
      "installed_at": "...",
      "enabled": true
    }
  }
}
```

### 6. Crear Bridge Agent

VS Code solo carga agentes desde `.github/agents/`.

Crear `.github/agents/plugin_ox_{id}.agent.md`:

```yaml
---
name: plugin_ox_{id}
description: "Bridge: conecta VS Code con agentes de {nombre}."
handoffs:
  - label: Invocar {Agente1}
    agent: .github/plugins/{id}/agents/{agente1}.agent.md
    prompt: {descripción}
    send: false
---
```

### 7. Integrar Handoffs en Aleph

Añadir al agente Aleph (apuntando al bridge):

```yaml
handoffs:
  - label: "[{ID}] Acceder plugin"
    agent: plugin_ox_{id}
    prompt: "Accede al plugin {nombre} a través de su bridge."
```

### 8. Generar Commit

```bash
# Verificar rama de trabajo
BRANCH=$(cat workspace-config.json | grep '"branch"' | cut -d'"' -f4)
CURRENT=$(git branch --show-current)

if [ "$CURRENT" != "$BRANCH" ]; then
  echo "⚠️ Rama incorrecta. Cambiar con: git checkout $BRANCH"
  exit 1
fi

git commit -m "feat(script/plugins): instalar plugin \"{name}\" v{version}"
```

---

## Gestión de Settings (SCRIPT-1.15.0)

### Distinción Importante

| Archivo | Campo | Controla |
|---------|-------|----------|
| `registry.json` | `enabled` | Si el plugin está **funcional** (agentes disponibles) |
| `settings.json` | `true/false` | Si los prompts/instructions son **visibles** en Chat |

Un plugin puede estar:
- `registry.enabled: true` + `settings: false` → Funcional pero prompts ocultos
- `registry.enabled: true` + `settings: true` → Funcional y prompts visibles
- `registry.enabled: false` → Plugin deshabilitado completamente

### Umbrales de Plugins Activos

| Plugins Activos | Estado | Mensaje |
|-----------------|--------|---------|
| 0-3 | 🟢 Óptimo | Sin aviso |
| 4-6 | 🟡 Aceptable | "Considera desactivar los no usados" |
| 7-10 | 🟠 Cargado | "Puede afectar velocidad del autocompletado" |
| 11+ | 🔴 Sobrecargado | "Recomendamos desactivar al menos {N-5} plugins" |

---

## Servidores MCP (Opcional)

### Plugins con Servidores MCP

Algunos plugins pueden aportar **servidores MCP** que VS Code Copilot puede invocar.

### Propiedad `mcpServers` en Manifest

```yaml
mcpServers:
  - id: "devops-mcp-server"
    port: 3003
    source: "MCPGallery/mcp-mesh-sdk"
    startCommand: "npm start"
```

### Protocolo de Registro

1. **Detectar**: Leer `mcpServers` del manifest
2. **Validar**: Verificar que `source` existe y tiene `package.json`
3. **Registrar**: Añadir a `.vscode/mcp.json`
4. **Documentar**: Añadir a tabla en PLUGINS.md

### Formato .vscode/mcp.json

```jsonc
{
  "servers": {
    "devops-mcp-server": {
      "type": "http",
      "url": "http://localhost:3003"
    }
  }
}
```

### Catálogo Dinámico

Para listar servidores activos:
```bash
curl http://localhost:4001/ai/ui/mcp/list | jq '.catalog'
```

→ Ver [PLUGINS.md](../../../PLUGINS.md) sección "Servidores MCP" para la lista completa.

---

### "El chat está muy lento al autocompletar"

**Causa**: Demasiados plugins activos. VS Code indexa todas las carpetas.

**Diagnóstico**:
```
@pluginmanager status
```

**Solución**:
```
@pluginmanager desactivar {id}
```

Desactiva plugins que no uses en esta sesión. Seguirán instalados.

---

### "¿Por qué los plugins nuevos no se activan automáticamente?"

**Diseño intencional (SCRIPT-1.15.0)**: Los plugins se instalan desactivados para:
- Evitar sobrecarga del sistema
- Dar control al usuario
- Mantener el chat ágil

Activa solo los que necesites en cada sesión.

---

### "¿Cuáles son los plugins recomendados para empezar?"

Para usuarios nuevos:
1. `teatro` — Experiencias transmedia
2. `scrum` — Gestión de backlogs
3. `gh-pages` — Publicación web

Para desarrolladores:
1. `agent-creator` — Crear agentes
2. `mcp-presets` — Gestión de herramientas MCP
3. `foro-scraper` — Extracción de contenido

---

## Validaciones

### Manifest Válido

- [ ] Tiene frontmatter YAML
- [ ] Campo `id` presente y kebab-case
- [ ] Campo `version` en formato semver
- [ ] Campo `scriptorium_version` presente
- [ ] Al menos un agente definido

### Estructura Válida

- [ ] `manifest.md` existe
- [ ] Carpeta `agents/` existe con al menos un archivo
- [ ] Archivos referenciados en manifest existen

### Sin Conflictos

- [ ] ID no duplicado en registry
- [ ] Nombres de agentes únicos (con namespace)
- [ ] Dependencias resueltas

---

## Mensajes de Error

| Código | Mensaje | Solución |
|--------|---------|----------|
| E001 | Manifest no encontrado | Crear `manifest.md` en raíz del plugin |
| E002 | ID duplicado | Cambiar `id` en manifest |
| E003 | Versión incompatible | Actualizar Scriptorium o usar versión compatible |
| E004 | Dependencia faltante | Instalar plugin dependiente primero |
| E005 | Archivo referenciado no existe | Verificar rutas en manifest |

---

## Referencia

- [PLUGINS.md](../../../PLUGINS.md) — Protocolo completo
- [DEVOPS.md](../../../DEVOPS.md) — Convención de commits
