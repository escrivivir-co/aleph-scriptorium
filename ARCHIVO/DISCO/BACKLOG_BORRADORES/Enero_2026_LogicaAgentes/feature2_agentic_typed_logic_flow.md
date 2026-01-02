# Feature 2: SCRIPT-2.2.0 — Agentic Typed Logic Flow

> **Carpeta Showcase** — Lucas (Scrum Master)  
> **Fecha**: 1 de enero de 2026  
> **Sprint**: FC1  
> **Fuente**: [BACKLOG_BORRADORES/Diciembre_31_Test_0x_Destilacion/](../../BACKLOG_BORRADORES/Diciembre_31_Test_0x_Destilacion/)

---

## 🎯 Resumen para Demo

**Titular**: *"Packs tipados: el contrato entre lo que el agente puede y lo que pide"*

### ¿Qué es?

Un flujo arquitectónico que:
1. **Tipa** las herramientas MCP con schemas JSON
2. **Empaqueta** tools + resources + prompts en Packs
3. **Conecta** los Packs con agentes del Teatro/ARG en runtime

### ¿Para qué sirve?

| Capa | Sin Packs Tipados | Con Packs Tipados |
|------|-------------------|-------------------|
| Diseño | Herramientas sueltas, sin contrato | Schema validado, autocompletado |
| Runtime | "¿Qué tools tiene este agente?" | `mcpPacks: [AgentPrologBrain]` |
| Debug | Error críptico en JSON | Validación `ajv` con mensajes claros |

---

## 📦 Componentes del Showcase

### 1. Blueprint Agéntico (existente)

```
BACKLOG_BORRADORES/Diciembre_31_Test_0x_Destilacion/03_together_all.md
```

**Estado**: ✅ Mapeado por @ox + @lucas

### 2. TypedPrompting Plugin (en refinamiento)

```
.github/plugins/typed-prompting/
├── manifest.md
├── agents/typed-prompting.agent.md
├── instructions/typed-prompting.instructions.md
└── schemas/
    ├── context-request.schema.json
    └── pack.schema.json
```

### 3. Packs por Crear

#### AgentPrologBrain.pack.json

```json
{
  "$schema": "./pack.schema.json",
  "id": "AgentPrologBrain",
  "version": "1.0.0",
  "description": "Pack para agentes que razonan con lógica Prolog",
  "mcpServer": "prolog-mcp-server",
  "tools": [
    { "name": "query_prolog", "description": "Ejecutar query Prolog" },
    { "name": "assert_fact", "description": "Añadir hecho a KB" },
    { "name": "consult_kb", "description": "Cargar archivo .pl" }
  ],
  "resources": [
    { "uri": "prolog://knowledge_base", "description": "Base de conocimiento activa" }
  ],
  "prompts": [
    { "name": "razonamiento_sbr", "template": "Dado {contexto}, infiere usando reglas Prolog..." }
  ]
}
```

#### AgentFIACreator.pack.json

```json
{
  "$schema": "./pack.schema.json",
  "id": "AgentFIACreator",
  "version": "1.0.0",
  "description": "Pack para crear agentes basados en paradigmas FIA",
  "mcpServer": "aaia-mcp-server",
  "tools": [
    { "name": "listar_paradigmas", "description": "Listar paradigmas en fia-catalog" },
    { "name": "crear_agente_fia", "description": "Crear agente con paradigma FIA" }
  ],
  "resources": [
    { "uri": "aaia://fia-catalog", "description": "Catálogo de 10 paradigmas" }
  ],
  "prompts": [
    { "name": "seleccion_paradigma", "template": "Para el problema {problema}, elige paradigma..." }
  ]
}
```

---

## 🎬 Escenas del Showcase

### Escena 1: Definir Pack tipado

**Narración**: "El desarrollador crea un pack con schema validation"

```bash
# Crear pack con autocompletado
code .github/plugins/mcp-presets/packs/AgentPrologBrain.pack.json
```

**Visualización**: VS Code con JSON schema hints

### Escena 2: Registrar Pack en LauncherServer

**Narración**: "El pack se registra para que la mesh lo conozca"

```typescript
// MCPLauncherServer.ts
CONFIGS_BASE_MCP_SERVER.push({
  ...DEFAULT_PROLOG_MCP_SERVER_CONFIG,
  pack: "AgentPrologBrain"
});
```

**Visualización**: Logs del LauncherServer mostrando pack registrado

### Escena 3: Obra del Teatro consume Pack

**Narración**: "La obra 'Duna' declara que sus agentes usan PrologBrain"

```yaml
# ARCHIVO/PLUGINS/TEATRO/obras/duna/obra.yaml
mcpPacks:
  - AgentPrologBrain
  - AgentFIACreator

escenas:
  - nombre: "Consejo de Agua"
    agentes:
      - arrakis
      - boe
    contexto: "Decidir distribución de agua usando reglas Prolog"
```

**Visualización**: Agentes en escena invocando `query_prolog` en su turno

### Escena 4: Agente en runtime usa tool MCP

**Narración**: "@arrakis consulta si el agua es recurso crítico"

```
[Teatro] Turno de @arrakis
[MCP] Invocando tool: query_prolog
[MCP] Query: recurso_critico(X)
[MCP] Respuesta: X = agua
[Teatro] @arrakis: "El agua es recurso crítico. Debemos proteger los pozos."
```

---

## 🔗 Cadena Completa (Fusión F1 + F2)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  CICLO COMPLETO: "De la edición de lógica al uso en escena"                  │
└──────────────────────────────────────────────────────────────────────────────┘

     ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
     │  FEATURE 1  │      │   BRIDGE    │      │  FEATURE 2  │
     │  PrologEdit │ ───► │  MCP Mesh   │ ───► │ Typed Packs │
     │  (editor)   │      │ (servidor)  │      │  (contrato) │
     └─────────────┘      └─────────────┘      └──────┬──────┘
                                                      │
                                                      ▼
                                           ┌──────────────────┐
                                           │   CONSUMIDORES   │
                                           │  Teatro + ARG    │
                                           │ (agentes vivos)  │
                                           └──────────────────┘

```

**Narrativa Demo**: 
1. Usuario **edita** reglas Prolog (F1)
2. Servidor Prolog se **expone** como MCP (F1→Bridge)
3. Pack **AgentPrologBrain** **tipa** las herramientas (F2)
4. Obra del Teatro **declara** uso del pack (F2)
5. Agente **invoca** query Prolog **en escena** (Runtime)

---

## 📋 Checklist Demo

- [ ] Schema `pack.schema.json` creado y validado
- [ ] Pack `AgentPrologBrain.pack.json` creado
- [ ] LauncherServer con pack registrado
- [ ] Obra de ejemplo con `mcpPacks: [AgentPrologBrain]`
- [ ] Ejecución en vivo mostrando invocación MCP

---

## 🗂️ Referencias

| Recurso | Ubicación |
|---------|-----------|
| Blueprint agéntico | [03_together_all.md](../../BACKLOG_BORRADORES/Diciembre_31_Test_0x_Destilacion/03_together_all.md) |
| Chuletario PO | [02_putting_all_together.md](../../BACKLOG_BORRADORES/Diciembre_31_Test_0x_Destilacion/02_putting_all_together.md) |
| TypedPrompting backlog | [Diciembre_29_TypedPrompting_ContextManager/](../../BACKLOG_BORRADORES/Diciembre_29_TypedPrompting_ContextManager/) |
| Teatro plugin | [.github/plugins/teatro/](../../../.github/plugins/teatro/) |
| ARG-Board plugin | [.github/plugins/arg-board/](../../../.github/plugins/arg-board/) |

---

*Lucas — Scrum Master del Índice, 1 de enero de 2026*
