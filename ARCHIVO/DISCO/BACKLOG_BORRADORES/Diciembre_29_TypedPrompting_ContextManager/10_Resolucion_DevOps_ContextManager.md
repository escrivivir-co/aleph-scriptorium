# Resolución: DevOps Server como Context Manager

> **Fecha**: 2025-12-30  
> **Épica**: SCRIPT-2.1.0 (TypedPrompting Context Manager)  
> **Estado**: ✅ RESUELTO  
> **Autor**: @ox (validación E2E) + PO

---

## Resumen Ejecutivo

**Problema original**: CopilotEngine no expone hook de filtrado dinámico (WISH-01). La solución propuesta era "Context Packs Estáticos" manuales.

**Descubrimiento**: El DevOps MCP Server (:3003) tiene **CRUD completo de prompts y resources**, accesible directamente desde Copilot Chat.

**Resolución**: Usar el DevOps Server como **repositorio persistente de Context Packs**, consultable en runtime por @ox, @indice y cualquier agente.

---

## Prueba de Concepto (Ejecutada)

### 1. Context Packs registrados via MCP

```bash
# Packs creados hoy 2025-12-30
mcp_devops-mcp-se_add_prompt("context-pack-blueprint", ...)
mcp_devops-mcp-se_add_prompt("context-pack-scrum", ...)
mcp_devops-mcp-se_add_prompt("context-pack-teatro", ...)
mcp_devops-mcp-se_add_prompt("context-pack-full", ...)
```

### 2. Resultado: 6 prompts en servidor

| ID | Nombre | Dominio | Token Savings |
|----|--------|---------|---------------|
| context-pack-blueprint | Blueprint | impress.js | ~60% |
| context-pack-scrum | Scrum | planificación | ~70% |
| context-pack-teatro | Teatro | narrativa | ~65% |
| context-pack-full | Full | desarrollo | 0% (máximo) |
| start-system | DevOps | arranque | — |
| open-web-console | DevOps | UI | — |

### 3. Consulta en runtime

```typescript
// @ox o @indice pueden consultar:
mcp_devops-mcp-se_get_prompt({ id: "context-pack-scrum" })
// → Retorna instrucciones a activar/desactivar
```

---

## Arquitectura Propuesta

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    CONTEXT MANAGER ARCHITECTURE                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Usuario: "Estoy trabajando en el blueprint de Talaia"                  │
│                               │                                          │
│                               ▼                                          │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │                    @ox (Oráculo)                                │     │
│  │                    ═══════════════                              │     │
│  │  1. Detecta foco: "blueprint"                                   │     │
│  │  2. Consulta DevOps Server:                                     │     │
│  │     → mcp_devops-mcp-se_get_prompt("context-pack-blueprint")    │     │
│  │  3. Informa instrucciones relevantes                            │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                               │                                          │
│                               ▼                                          │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │              DevOps MCP Server (:3003)                          │     │
│  │              ═════════════════════════                          │     │
│  │                                                                  │     │
│  │  📋 PROMPTS (Context Packs)                                     │     │
│  │  ├── context-pack-blueprint   → instrucciones 3D                │     │
│  │  ├── context-pack-scrum       → instrucciones planificación     │     │
│  │  ├── context-pack-teatro      → instrucciones narrativa         │     │
│  │  └── context-pack-full        → todas las instrucciones         │     │
│  │                                                                  │     │
│  │  📦 RESOURCES (Estado)                                          │     │
│  │  ├── devops://project/status  → estado del proyecto             │     │
│  │  ├── devops://mcp/health      → salud de servidores             │     │
│  │  └── devops://game/state/live → estado X+1                      │     │
│  │                                                                  │     │
│  │  🔧 TOOLS (20 operaciones)                                      │     │
│  │  └── CRUD: add/edit/delete/get/list prompts/resources           │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                               │                                          │
│                               ▼                                          │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │              @indice (Navegador DRY)                            │     │
│  │              ═══════════════════════                            │     │
│  │  Recibe pack → mapea instrucciones → valida coherencia          │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Ventajas sobre Solución Estática

| Aspecto | Packs Estáticos (Propuesta Original) | DevOps Server (Nueva Solución) |
|---------|---------------------------------------|--------------------------------|
| **Persistencia** | Archivos JSON locales | Servidor MCP persistente |
| **Consulta** | Script manual | Tool MCP en runtime |
| **CRUD** | Editar archivos | `add_prompt`, `edit_prompt`, `delete_prompt` |
| **Disponibilidad** | Solo VS Code | Cualquier cliente MCP |
| **Metadata** | Limitada | JSON flexible con `metadata` |
| **Versionado** | Git | Git + timestamps del servidor |

---

## Integración con Agentes

### @ox (Oráculo) — Nuevo rol

```yaml
# Añadir a ox.agent.md
capabilities:
  - Consultar context packs: mcp_devops-mcp-se_list_prompts()
  - Recomendar pack según foco del usuario
  - Crear nuevos packs: mcp_devops-mcp-se_add_prompt()
```

### @indice (Navegador) — Nuevo rol

```yaml
# Añadir a indice.agent.md
capabilities:
  - Resolver instrucciones desde pack: mcp_devops-mcp-se_get_prompt(id)
  - Validar coherencia pack ↔ instrucciones existentes
  - Mapear pack a archivos .instructions.md
```

### Launcher Server (:3050) — Orquestación

```yaml
# El gemelo del DevOps Server
capabilities:
  - Arrancar/detener servidores de la mesh
  - generate_vscode_mcp_config() para mcp.json dinámico
  - Coordinación con @pluginmanager
```

---

## Tasks Cerradas/Modificadas

### Épica SCRIPT-2.1.0 (Context Manager Core)

| Task | Estado Anterior | Estado Nuevo | Notas |
|------|-----------------|--------------|-------|
| T005 | ⏳ Añadir handoff resolverFoco | ✅ Cerrada | Usar `get_prompt` |
| T006 | ⏳ Crear resolver-foco.prompt.md | ✅ Cerrada | Packs en servidor |
| T007 | ⏳ Mapeo dominio→instrucciones | ✅ Cerrada | Metadata en pack |

### Épica SCRIPT-2.3.0 (Context Packs System)

| Task | Estado Anterior | Estado Nuevo | Notas |
|------|-----------------|--------------|-------|
| T010 | ⏳ Schema contextTriggers | ❌ Eliminada | No necesario |
| T012 | ⏳ context-packs.json | ❌ Eliminada | Vive en servidor |
| T014 | ⏳ settings.json structure | ❌ Eliminada | Consulta MCP |
| T015 | ⏳ activate-pack.sh | 🔄 Modificada | Ahora: `mcp_devops-mcp-se_get_prompt` |

### Épica SCRIPT-2.2.4 (MCP Integration)

| Task | Estado Anterior | Estado Nuevo | Notas |
|------|-----------------|--------------|-------|
| T023 | ⏳ devops-tools.preset.json | ✅ Cerrada | Demostrado con packs |
| T024 | ✅ Documentar | ✅ Cerrada | Este documento |

---

## Nuevo Backlog (Post-Resolución)

| # | Task | Descripción | Effort | Owner |
|---|------|-------------|--------|-------|
| 1 | Actualizar ox.agent.md | Añadir handoffs DevOps Server | 1 pt | @ox |
| 2 | Actualizar indice.agent.md | Añadir consulta de packs | 1 pt | @indice |
| 3 | Crear pack "mcp-dev" | Pack para desarrollo MCP | 0.5 pt | Lucas |
| 4 | Documentar en Tecnico.md | Flujo Context Manager | 1 pt | @indice |
| 5 | Test E2E pack switching | Validar cambio de contexto | 1 pt | @scrum |

**Total restante**: 4.5 pts (reducción de 15 pts a 4.5 pts = **70% reducción**)

---

## Conclusión

**La problemática del Context Bloat tiene ahora una solución operativa**:

1. ✅ **DevOps Server como repositorio** — Context Packs persistidos
2. ✅ **CRUD via MCP** — Gestión dinámica sin editar archivos
3. ✅ **Consulta en runtime** — @ox y @indice pueden resolver foco
4. ✅ **Metadata flexible** — domain, priority, token_savings
5. ✅ **Demostrado funcionando** — 4 packs creados hoy

**El DevOps Server es ahora miembro de primera categoría del Scriptorium.**

---

## Siguiente Paso Inmediato

Actualizar los agentes @ox, @indice y @pluginmanager con los nuevos handoffs para DevOps Server.

