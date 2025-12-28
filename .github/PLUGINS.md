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

| Bridge | Plugin | Agentes |
|--------|--------|---------|
| `@plugin_ox_argboard` | ARG Board | 8 agentes |
| `@plugin_ox_enciclopedia` | Enciclopedia | 2 agentes |
| `@plugin_ox_ghpages` | GH-Pages | 1 agente |
| `@plugin_ox_foroscraper` | Foro Scraper | 1 agente |
| `@plugin_ox_agentcreator` | Agent Creator | 1 agente |
| `@plugin_ox_teatro` | Teatro | 1 agente |
| `@plugin_ox_scrum` | Scrum | 1 agente |
| `@plugin_ox_mcppresets` | MCP Presets | 1 agente |

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

## Detalle Extendido

→ Ver `plugin-lifecycle.instructions.md` para:
- Protocolo de instalación paso a paso
- FAQ de resolución de problemas
- Validaciones de manifest
- Mensajes de error

→ Ver `registry.json` para estado actual de plugins instalados
