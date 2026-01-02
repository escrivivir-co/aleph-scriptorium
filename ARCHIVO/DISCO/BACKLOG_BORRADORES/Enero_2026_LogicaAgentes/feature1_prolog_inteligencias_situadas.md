# Feature 1: IOT-SBR-LOGICA — PrologEditor: Inteligencias Situadas

> **Carpeta Showcase** — Lucas (Scrum Master)  
> **Fecha**: 1 de enero de 2026  
> **Sprint**: FC1  
> **Fuente**: [BACKLOG_BORRADORES/IOT-SBR-LOGICA/](../../BACKLOG_BORRADORES/IOT-SBR-LOGICA/)

---

## 🎯 Resumen para Demo

**Titular**: *"Prolog como servidor MCP: lógica declarativa invocable por cualquier agente"*

### ¿Qué es?

Un plugin que permite:
1. **Editar** reglas Prolog desde VS Code
2. **Ejecutar** queries contra SWI-Prolog
3. **Exponer** como servidor MCP en la mesh (puerto 3006)

### ¿Para qué sirve?

| Caso de Uso | Ejemplo |
|-------------|---------|
| Sistemas de reglas de negocio | BOE: validar requisitos legales |
| IoT con lógica situacional | Sensores → hechos → inferencias |
| Agentes con razonamiento | @arrakis consulta reglas de supervivencia |

---

## 📦 Componentes del Showcase

### 1. PrologServer (existente)

```
AAIAGallery/alephscript/src/FIA/paradigmas/sbr/app/prolog/server.ts
```

**Estado**: ✅ Funcional (validado en sesión PO)

### 2. Plugin PrologEditor (por completar)

```
.github/plugins/prolog-editor/
├── manifest.md
├── agents/prolog-editor.agent.md
├── instructions/prolog-editor.instructions.md
└── prompts/
    ├── crear-regla.prompt.md
    ├── ejecutar-query.prompt.md
    └── exponer-mcp.prompt.md
```

### 3. Integración MCP (por crear)

```javascript
// MCPGallery/mcp-mesh-sdk/src/configs/prolog.config.ts
export const DEFAULT_PROLOG_MCP_SERVER_CONFIG = {
  id: "prolog-mcp-server",
  port: 3006,
  tools: ["query_prolog", "assert_fact", "retract_fact", "consult_kb"],
  resources: ["knowledge_base", "inference_log"]
};
```

---

## 🎬 Escenas del Showcase

### Escena 1: Crear regla Prolog

**Narración**: "El usuario define reglas de supervivencia para Arrakis"

```prolog
% Regla: agua es recurso crítico si población > 1000
recurso_critico(agua) :- 
    poblacion(P), 
    P > 1000.

% Hecho inicial
poblacion(1500).
```

**Acción**: Guardar en `ARCHIVO/PLUGINS/PROLOG_EDITOR/rules/arrakis.pl`

### Escena 2: Ejecutar query

**Narración**: "El agente @arrakis consulta si hay recursos críticos"

```prolog
?- recurso_critico(X).
X = agua.
```

**Visualización**: Terminal con respuesta SWI-Prolog

### Escena 3: Exponer como MCP

**Narración**: "El servidor Prolog se registra en la mesh"

```bash
# Verificar que el servidor está en la mesh
curl http://localhost:4001/ai/ui/mcp/list | jq '.catalog[] | select(.id == "prolog-mcp-server")'
```

**Resultado**: Servidor disponible para cualquier agente del Teatro

---

## 🔗 Conexión con Feature 2

Esta feature se **fusiona** con "Agentic Typed Logic Flow" así:

```
┌─────────────────────┐         ┌──────────────────────────┐
│ Feature 1:          │         │ Feature 2:               │
│ PrologEditor        │ ──────► │ Typed Logic Flow         │
│ (produce servidor)  │         │ (consume como pack)      │
└─────────────────────┘         └──────────────────────────┘
         │                                   │
         │ MCP Server (3006)                 │ AgentPrologBrain.pack.json
         ▼                                   ▼
┌────────────────────────────────────────────────────────────┐
│                    Teatro / ARG-Board                       │
│         (agentes consumen Prolog en tiempo real)           │
└────────────────────────────────────────────────────────────┘
```

---

## 📋 Checklist Demo

- [ ] PrologServer arrancado (`npm run prolog` o similar)
- [ ] Reglas de ejemplo cargadas en `knowledge_base`
- [ ] LauncherServer con config de Prolog
- [ ] Pack AgentPrologBrain disponible
- [ ] Obra del Teatro con `mcpPacks: [AgentPrologBrain]`

---

## 🗂️ Referencias

| Recurso | Ubicación |
|---------|-----------|
| Backlog completo | [IOT-SBR-LOGICA/01_backlog-borrador.md](../../BACKLOG_BORRADORES/IOT-SBR-LOGICA/01_backlog-borrador.md) |
| Sesión PO | [IOT-SBR-LOGICA/conversacion-po-sm.md](../../BACKLOG_BORRADORES/IOT-SBR-LOGICA/conversacion-po-sm.md) |
| PrologServer código | [alephscript/.../prolog/server.ts](../../../AAIAGallery/alephscript/src/FIA/paradigmas/sbr/app/prolog/server.ts) |
| Plugin bridge | [.github/agents/plugin_ox_prologeditor.agent.md](../../../.github/agents/plugin_ox_prologeditor.agent.md) |

---

*Lucas — Scrum Master del Índice, 1 de enero de 2026*
