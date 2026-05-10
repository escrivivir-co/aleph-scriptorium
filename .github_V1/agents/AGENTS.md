# Índice Maestro de Agentes — Aleph Scriptorium

> **Fuente DRY**: Este archivo es la ÚNICA fuente de verdad para el índice de agentes.  
> **Épica**: SCRIPT-1.29.0 (Fase 2)  
> **Versión**: 1.9.0  
> **Última actualización**: 2025-12-28

---

## Resumen Ejecutivo

| Capa | Total | Descripción |
|------|-------|-------------|
| 🟢 UI | 3 | Producción e interfaz con usuario |
| 🔵⚫🔴🟡🟠 Backend | 5 | Auditoría y validación (5 Banderas) |
| ⚪ Sistema | 2 | Navegación y orientación |
| ⚙️ Meta | 3 | Gestión del propio sistema |
| 🔌 Plugins | 18+ | Agentes añadidos por plugins |

**Total agentes**: 32+ (core + bridges)

---

## Taxonomía Visual

```
                         ┌─────────────────────────────────────┐
                         │            🐂 OX (Meta)             │
                         │   Oráculo · Documentación · Índice  │
                         └─────────────────┬───────────────────┘
                                           │
        ┌──────────────────────────────────┼──────────────────────────────────┐
        │                                  │                                  │
        ▼                                  ▼                                  ▼
┌───────────────┐                 ┌────────────────┐                ┌─────────────────┐
│  🟢 UI (3)    │                 │ ⚪ Sistema (2) │                │  ⚙️ Meta (3)    │
│ Producción    │                 │  Navegación    │                │   Gestión       │
├───────────────┤                 ├────────────────┤                ├─────────────────┤
│ @aleph        │                 │ @vestibulo     │                │ @pluginmanager  │
│ @revisor      │                 │ @cartaspuerta  │                │ @ox             │
│ @periodico    │                 └────────────────┘                │ @indice         │
└───────────────┘                                                   └─────────────────┘
        │
        │ ← invocan para auditoría
        ▼
┌───────────────────────────────────────────────────────────────────┐
│                     🔵⚫🔴🟡🟠 BACKEND (5 Banderas)               │
│                     Auditoría y Validación Doctrinal              │
├───────────────────────────────────────────────────────────────────┤
│ @blueflag    │ @blackflag   │ @redflag    │ @yellowflag │ @orangeflag │
│ Verdad       │ Sombras      │ Estructura  │ Límites     │ Registro    │
└───────────────────────────────────────────────────────────────────┘
        │
        │ ← invocan vía bridges
        ▼
┌───────────────────────────────────────────────────────────────────┐
│                      🔌 PLUGIN BRIDGES (19)                       │
└───────────────────────────────────────────────────────────────────┘
```

---

## Capa UI (Producción)

| Agente | Archivo | Rol | Invocación |
|--------|---------|-----|------------|
| **Aleph** | `aleph.agent.md` | Productor principal. Planifica, redacta, orquesta. | `@aleph` |
| **Revisor** | `revisor.agent.md` | Auditor doctrinal. Verifica coherencia con ARCHIVO. | `@revisor` |
| **Periódico** | `periodico.agent.md` | Producción periodística. Método 5W + Banderas. | `@periodico` |

---

## Capa Backend (5 Banderas)

| Agente | Archivo | Rol | Tests |
|--------|---------|-----|-------|
| **Blueflag** | `blueflag.agent.md` | Auditor de Verdad | Evidencia, Utilidad, Falsificabilidad, Posverdad |
| **Blackflag** | `blackflag.agent.md` | Auditor de Sombras | Pólvora, Posverdad técnica, Captura enemiga |
| **Redflag** | `redflag.agent.md` | Auditor de Estructura | Escala, Coerción, Suministro, Régimen material |
| **Yellowflag** | `yellowflag.agent.md` | Auditor de Límites | Pre/Trans, Cuadrantes, Mercantilización, Inconmensurabilidad |
| **Orangeflag** | `orangeflag.agent.md` | Auditor de Registro | Registro, Género, Estilo, Auditorio |

---

## Capa Sistema (Navegación)

| Agente | Archivo | Rol | Invocación |
|--------|---------|-----|------------|
| **Vestíbulo** | `vestibulo.agent.md` | Menú de entrada. Identifica perfil y asigna carta-puerta. | `@vestibulo` |
| **Cartas-Puerta** | `cartas-puerta.agent.md` | Área de contenido. Presenta la carta-puerta sin mezclar. | `@cartaspuerta` |

---

## Capa Meta (Gestión)

| Agente | Archivo | Rol | Invocación |
|--------|---------|-----|------------|
| **Plugin-Manager** | `plugin-manager.agent.md` | Gestión de plugins. Instalar, activar, desinstalar. | `@pluginmanager` |
| **Ox** | `ox.agent.md` | Oráculo. Índice de agentes, documentación, diagnóstico. | `@ox` |
| **Índice** | `indice.agent.md` | Navegador DRY. Consulta, actualiza y valida índices. | `@indice` |

---

## Capa Plugins (Bridges)

> **Nota**: Los bridges en `.github/agents/` delegan a agentes reales en `.github/plugins/{id}/agents/`

| Bridge | Plugin | Delega a | Invocación |
|--------|--------|----------|------------|
| `plugin_ox_argboard` | arg-board | 8 agentes | `@plugin_ox_argboard` |
| `plugin_ox_enciclopedia` | enciclopedia | 2 agentes | `@plugin_ox_enciclopedia` |
| `plugin_ox_ghpages` | gh-pages | 1 agente | `@plugin_ox_ghpages` |
| `plugin_ox_foroscraper` | foro-scraper | 1 agente | `@plugin_ox_foroscraper` |
| `plugin_ox_agentcreator` | agent-creator | 1 agente | `@plugin_ox_agentcreator` |
| `plugin_ox_teatro` | teatro | 1 agente | `@plugin_ox_teatro` |
| `plugin_ox_scrum` | scrum | 1 agente | `@plugin_ox_scrum` |
| `plugin_ox_mcppresets` | mcp-presets | 1 agente | `@plugin_ox_mcppresets` |
| `plugin_ox_network` | network | 1 agente | `@plugin_ox_network` |
| `plugin_ox_novelist` | novelist | 1 agente | `@plugin_ox_novelist` |
| `plugin_ox_blocklyeditor` | blockly-editor | 1 agente | `@plugin_ox_blocklyeditor` |
| `plugin_ox_wireeditor` | wire-editor | 1 agente | `@plugin_ox_wireeditor` |
| `plugin_ox_prologeditor` | prolog-editor | 1 agente | `@plugin_ox_prologeditor` |
| `plugin_ox_typedprompting` | typed-prompting | 1 agente | `@plugin_ox_typedprompting` |
| `plugin_ox_n8neditor` | n8n-editor | 1 agente | `@plugin_ox_n8neditor` |
| `plugin_ox_wiringapp` | wiring-app | 1 agente | `@plugin_ox_wiringapp` |
| `plugin_ox_argboardapp` | arg-board-app | 1 agente | `@plugin_ox_argboardapp` |
| `plugin_ox_hypergrapheditor` | hypergraph-editor | 1 agente | `@plugin_ox_hypergrapheditor` |
| `plugin_ox_openasyncapieditor` | openasyncapi-editor | 1 agente | `@plugin_ox_openasyncapieditor` |
| `plugin_ox_aaiaeditor` | aaia-editor | 1 agente | `@plugin_ox_aaiaeditor` |
| `plugin_ox_bothubsdk` | bot-hub-sdk | 1 agente | `@plugin_ox_bothubsdk` |
| `plugin_ox_nodejsnotebooks` | nodejs-notebooks | 1 agente | `@plugin_ox_nodejsnotebooks` |

### Detalle por Plugin

| Plugin | Directorio | Agentes |
|--------|------------|---------|
| arg-board | `.github/plugins/arg-board/agents/` | Arrakis, BOE, Decoherence, GitARG, AutomataHeroe, ImpressJS, MBox, PlatformCom |
| enciclopedia | `.github/plugins/enciclopedia/agents/` | Bibliotecario, HDF-ErnestoCastro |
| gh-pages | `.github/plugins/gh-pages/agents/` | GHPages |
| foro-scraper | `.github/plugins/foro-scraper/agents/` | ForoScraper |
| agent-creator | `.github/plugins/agent-creator/agents/` | AgentCreator |
| teatro | `.github/plugins/teatro/agents/` | Teatro |
| scrum | `.github/plugins/scrum/agents/` | Scrum |
| mcp-presets | `.github/plugins/mcp-presets/agents/` | McpPresets |
| network | `.github/plugins/network/agents/` | Network |
| novelist | `.github/plugins/novelist/agents/` | Novelist |
| blockly-editor | `.github/plugins/blockly-editor/agents/` | BlocklyEditor |
| wire-editor | `.github/plugins/wire-editor/agents/` | WireEditor |
| prolog-editor | `.github/plugins/prolog-editor/agents/` | PrologEditor |
| typed-prompting | `.github/plugins/typed-prompting/agents/` | TypedPrompting |
| n8n-editor | `.github/plugins/n8n-editor/agents/` | N8NEditor |
| wiring-app | `.github/plugins/wiring-app/agents/` | WiringApp |
| arg-board-app | `.github/plugins/arg-board-app/agents/` | ArgBoardApp |
| hypergraph-editor | `.github/plugins/hypergraph-editor/agents/` | HyperGraphEditor |
| openasyncapi-editor | `.github/plugins/openasyncapi-editor/agents/` | OpenAsyncApiEditor |
| aaia-editor | `.github/plugins/aaia-editor/agents/` | AAIAEditor |
| bot-hub-sdk | `.github/plugins/bot-hub-sdk/agents/` | BotHubSDK |
| nodejs-notebooks | `.github/plugins/nodejs-notebooks/agents/` | NodejsNotebooks |

---

## Handoffs por Agente

### @aleph

| Label | Target | Descripción |
|-------|--------|-------------|
| Solicitar auditoría de verdad | @blueflag | Tests de evidencia, utilidad, falsificabilidad |
| Solicitar auditoría de sombras | @blackflag | Coste represivo, autodefensa |
| Solicitar auditoría de estructura | @redflag | Escala, enforcement, suministro |
| Solicitar revisión doctrinal | @revisor | Coherencia con ARCHIVO |
| Solicitar auditoría de límites | @yellowflag | Condiciones vs contenido |
| Solicitar auditoría de registro | @orangeflag | Dialéctica/retórica, género, estilo |
| Abrir vestíbulo de entrada | @vestibulo | Identifica perfil del lector |
| Presentar carta-puerta | @cartaspuerta | Presenta carta según perfil |
| Consultar oráculo de agentes | @ox | Índice, documentación, diagnóstico |
| Consultar índice DRY | @indice | Funcional.md o Tecnico.md |
| Validar índice antes de commit | @indice | 5 tests de coherencia |
| Gestionar plugins | @pluginmanager | Instalar, activar, desinstalar |
| [PLUGIN] * | @plugin_ox_* | Acceso a todos los plugins instalados |

### @ox

| Label | Target | Descripción |
|-------|--------|-------------|
| Generar sección de agentes para README | @ox | Taxonomía actualizada |
| Inicializar setup del workspace | @ox | scripts/setup-workspace.sh |
| Mapear agentes a ChatParticipants | @ox | Generar mapeo VS Code |
| Generar manual de usuario | @ox | Por perfil (dev, escritor, tutor) |
| Diagnosticar agentes | @ox | Detectar inconsistencias |
| ¿Qué agente uso para...? | @ox | Consulta por tarea |
| Listar agentes por capa | @ox | UI/Backend/Sistema/Meta |
| Invocar agente de UI | @aleph | Delegar a capa UI |
| Invocar agente de Backend | @blueflag | Delegar a capa Backend |
| Invocar PluginManager | @pluginmanager | Gestión plugins |
| Invocar agente Índice | @indice | Consultas DRY rápidas |
| Listar plugin bridges | @ox | Todos los plugin_ox_* |
| Invocar bridge * | @plugin_ox_* | Acceso a todos los plugins |
| Tomar foto de estado del sprint | @aleph | Foto estado + discurso motivacional |
| Crear release | @ox | Protocolo de release |

### @indice

| Label | Target | Descripción |
|-------|--------|-------------|
| Consultar índice funcional | @indice | Buscar en Funcional.md |
| Consultar índice técnico | @indice | Buscar en Tecnico.md |
| Actualizar índices | @indice | Sincronizar con codebase |
| Validar coherencia pre-commit | @indice | 5 tests DRY |
| Buscar en ambos índices | @indice | Respuesta completa |
| Añadir entrada a Funcional.md | @indice | Nueva capacidad |
| Añadir entrada a Tecnico.md | @indice | Nueva estructura |
| Diagnosticar índice desactualizado | @indice | Detectar discrepancias |
| Consultar índice SPLASH | @plugin_ox_ghpages | docs/ estructura |
| Consultar índice README | @indice | Secciones a actualizar |

### Banderas (Backend)

| Bandera | Handoffs principales |
|---------|---------------------|
| @blueflag | Auditoría de verdad (evidencia, utilidad, falsificabilidad) |
| @blackflag | Auditoría de sombras (coste represivo, autodefensa, enemigo) |
| @redflag | Auditoría de estructura (escala, enforcement, suministro) |
| @yellowflag | Auditoría de límites (pre/trans, gnosis, inconmensurabilidad) |
| @orangeflag | Auditoría de registro (dialéctica, género, estilo, auditorio) |

---

## Cuándo Usar Cada Agente

| Tarea | Agente | Ejemplo |
|-------|--------|---------|
| Redactar contenido | @aleph | "Escribe borrador del capítulo 3" |
| Auditar evidencia | @blueflag | "Verifica las fuentes de esta tesis" |
| Verificar coherencia | @revisor | "¿Es coherente con ARCHIVO?" |
| Publicar en web | @plugin_ox_ghpages | "Publica docs/ en GitHub Pages" |
| Buscar dónde está algo | @indice | "¿Dónde creo instrucciones de plugin?" |
| Consultar qué agente usar | @ox | "¿Qué agente uso para scraping?" |
| Gestionar plugins | @pluginmanager | "Instala el plugin novelist" |
| Crear agentes | @plugin_ox_agentcreator | "Crea un agente especializado en X" |

---

## Protocolo de Actualización

1. **Al añadir agente**: Actualizar este archivo + registry.json
2. **Al añadir plugin**: Añadir bridge en `.github/agents/` + entrada aquí
3. **Al modificar handoffs**: Actualizar sección correspondiente
4. **Validar**: `@ox diagnosticar agentes` para detectar inconsistencias
