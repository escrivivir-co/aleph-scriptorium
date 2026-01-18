---
name: Scrum Master
description: "Bridge: Plugin Scrum v3.0 con Modelo Generativo. @scrum interpreta a Lucas. Sesiones PRODUCEN artefactos."
argument-hint: "planificar | borrador | generar-desde-sesion | aprobar | tracking | cerrar | status"
tools: ['vscode', 'execute', 'read', 'edit', 'search', 'web', 'copilot-logs-mcp-server/*', 'devops-mcp-server/*', 'prolog-mcp-server/*', 'agent', 'todo']
handoffs:
  - label: Planificar nuevo sprint
    agent: .github/plugins/scrum/agents/scrum.agent.md
    prompt: Inicia planificación creando carpeta y referencia en índice.
    send: false
  - label: Crear backlog borrador
    agent: .github/plugins/scrum/agents/scrum.agent.md
    prompt: Genera backlog borrador en DISCO a partir de la planificación.
    send: false
  - label: 🆕 Generar desde sesión cotrabajo
    agent: .github/plugins/scrum/agents/scrum.agent.md
    prompt: Genera borrador desde sesión de cotrabajo cerrada (Modelo Generativo).
    send: false
  - label: Aprobar épica
    agent: .github/plugins/scrum/agents/scrum.agent.md
    prompt: Cambia estado en índice (📋→✅).
    send: false
  - label: Actualizar tracking
    agent: .github/plugins/scrum/agents/scrum.agent.md
    prompt: Actualiza el estado de las tasks en el borrador activo.
    send: false
  - label: Cerrar sprint
    agent: .github/plugins/scrum/agents/scrum.agent.md
    prompt: Archiva sprint. Opción --incluir-sesiones para sesiones relacionadas.
    send: false
  - label: Mostrar status (incluye sesiones)
    agent: .github/plugins/scrum/agents/scrum.agent.md
    prompt: Muestra métricas, borradores activos y sesiones activas.
    send: false
  
  # === Expertise Lucas ===
  - label: 🎭 Cargar contexto Lucas
    agent: .github/plugins/scrum/agents/scrum.agent.md
    prompt: Carga expertise de Lucas (identidad + brain Prolog + plantillas).
    send: false
  - label: 📚 Buscar plantilla Scrum
    agent: .github/plugins/scrum/agents/scrum.agent.md
    prompt: Consulta templates-index.json de Lucas para plantillas Scrum.
    send: false
  
  # === Info ===
  - label: Listar capacidades
    agent: plugin_ox_scrum
    prompt: Lista comandos y capacidades del plugin Scrum v3.0.
    send: false
---

# Plugin Ox: Scrum v3.0.0

**Capa**: 🔌 Plugins (Bridge) — ver taxonomía en @ox

> Bridge que conecta VS Code con `.github/plugins/scrum/agents/`.

---

## ⚠️ BREAKING CHANGE desde v2.0.0

Este plugin implementa cambios arquitectónicos significativos:

1. **Modelo Generativo**: Sesiones de cotrabajo PRODUCEN borradores
2. **Interpreta a Lucas**: Sin duplicación de expertise Scrum
3. **Nuevo comando**: `generar-desde-sesion`

---

## Descripción

El plugin **Scrum v3.0** implementa gestión ágil con dos innovaciones:

### 1. Modelo Generativo

```
Sesión Cotrabajo  ──PRODUCE──►  Borrador Épica
    │                              │
    │ permanece intacta            │ referencia origen
    └──────────────────────────────┘
```

Las sesiones **NO se transforman** en borradores. Los **producen** como output.

### 2. Interpreta a Lucas

El agente @scrum no tiene expertise propia. "Interpreta" a Lucas:

```
@scrum ──interpreta──► Lucas (ARCHIVO/DISCO/TALLER/ELENCO/lucas/)
                           │
                           ├── lucas.agent.md (identidad)
                           ├── lucas-prolog.brain.pl (razonamiento)
                           └── templates-index.json (plantillas)
```

---

## Agentes disponibles

| Agente | Archivo | Descripción |
|--------|---------|-------------|
| **Scrum** | `scrum.agent.md` | Scrum Master que interpreta a Lucas |

---

## Comandos

| Comando | Descripción | Nuevo |
|---------|-------------|-------|
| `planificar` | Crear carpeta + referencia | |
| `borrador` | Generar backlog detallado | |
| `generar-desde-sesion` | Producir borrador desde sesión | 🆕 |
| `aprobar` | Cambiar estado en índice | |
| `tracking` | Actualizar tasks en borrador | |
| `cerrar` | Archivar (opción: --incluir-sesiones) | 🔄 |
| `status` | Métricas + sesiones activas | 🔄 |

---

## Flujo Modelo Generativo

```
1. SESIÓN COTRABAJO
   └── Multi-agente → Actas → Consenso
   
2. CIERRE PRODUCTIVO
   └── @scrum generar-desde-sesion
   
3. BORRADOR GENERADO
   └── origen: {sesión}
   └── Epic/Stories/Tasks
   
4. FLUJO SCRUM NORMAL
   └── aprobar → tracking → cerrar
```

---

## Expertise Lucas

Para conocimiento Scrum avanzado, el bridge puede invocar:

| Handoff | Qué carga |
|---------|-----------|
| 🎭 Cargar contexto Lucas | Identidad + capacidades |
| 📚 Buscar plantilla Scrum | templates-index.json → AgentLoreSDK |

### Plantillas Disponibles (via Lucas)

| Categoría | Plantillas |
|-----------|------------|
| project-management | pac-create-epic, milestone-tracker, project-health-check |
| documentation | technical-writer, changelog-generator |

---

## Integración con Cotrabajo

| Acción | Comando |
|--------|---------|
| Ver sesiones activas | `@scrum status` |
| Generar borrador desde sesión | `@scrum generar-desde-sesion {ruta}` |
| Cerrar sprint + sesiones | `@scrum cerrar --incluir-sesiones` |

---

## Ubicaciones

| Tipo | Ruta |
|------|------|
| Plugin | `.github/plugins/scrum/` |
| Agente real | `.github/plugins/scrum/agents/scrum.agent.md` |
| Lucas | `ARCHIVO/DISCO/TALLER/ELENCO/lucas/` |
| Sesiones | `ARCHIVO/DISCO/SESIONES_COTRABAJO/` |
| Borradores | `ARCHIVO/DISCO/BACKLOG_BORRADORES/` |

---

**Versión**: 3.0.0  
**Épica origen**: SCRUM-REFACTOR-1.0.0
