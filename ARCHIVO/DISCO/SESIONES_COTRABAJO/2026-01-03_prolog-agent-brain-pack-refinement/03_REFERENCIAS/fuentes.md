# Fuentes y Referencias

## Documentación de Arquitectura

| Documento | Ubicación | Cuándo Consultar |
|-----------|-----------|------------------|
| Guía Arquitectura MCP | `ARCHIVO/DISCO/BACKLOG_BORRADORES/Enero_02_PrologAgentPack/guia-arquitectura-mcp-stack.md` | Mapa de capas |
| PrologEditor Agent | `.github/plugins/prolog-editor/agents/prolog-editor.agent.md` | Capacidades del agente |
| Manifest PrologEditor | `.github/plugins/prolog-editor/manifest.md` | Configuración del plugin |

---

## Personaje Lucas

| Recurso | Ubicación | Propósito |
|---------|-----------|-----------|
| Agent Definition | `ARCHIVO/DISCO/TALLER/ELENCO/lucas/lucas.agent.md` | Identidad y rol |
| Prolog Brain | `ARCHIVO/DISCO/TALLER/ELENCO/lucas/lucas-prolog.brain.pl` | Lógica declarativa |

---

## Código Fuente

### Frontend Angular

| Componente | Path |
|------------|------|
| SessionManager | `PrologEditor/frontend/src/app/components/session-manager/` |
| RuleEditor | `PrologEditor/frontend/src/app/components/rule-editor/` |
| KnowledgeBase | `PrologEditor/frontend/src/app/components/knowledge-base/` |
| BrainEditor | `PrologEditor/frontend/src/app/components/brain-editor/` |
| PrologService | `PrologEditor/frontend/src/app/services/prolog.service.ts` |

### Backend REST

| Archivo | Path |
|---------|------|
| Server Principal | `PrologEditor/backend/src/server.ts` |
| MCPPrologClient | `MCPGallery/mcp-mesh-sdk/src/clients/MCPPrologClient.ts` |

### MCP Server

| Archivo | Path |
|---------|------|
| MCPPrologServer | `MCPGallery/mcp-mesh-sdk/src/MCPPrologServer.ts` |
| Launcher | `MCPGallery/mcp-mesh-sdk/src/MCPLauncherServer.ts` |

### SDK Core

| Archivo | Path |
|---------|------|
| Tipos Prolog | `MCPGallery/mcp-core-sdk/src/types/prolog/` |
| Browser Exports | `MCPGallery/mcp-core-sdk/src/browser.ts` |

---

## APIs

| Spec | Ubicación |
|------|-----------|
| OpenAPI (REST) | `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/openapi.yaml` |
| Use Cases | `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/usecases-*.yaml` |

---

## Backlog

| Épica | Borrador |
|-------|----------|
| PROLOG-DRY-1.0.0 | `ARCHIVO/DISCO/BACKLOG_BORRADORES/Enero_02_PrologAgentPack/guia-arquitectura-mcp-stack.md` |
| TEATRO-PROLOG-1.0.0 | `ARCHIVO/DISCO/BACKLOG_BORRADORES/Enero_02_PrologAgentPack/05_backlog-teatro-prolog-integration.md` |
| PROLOG-UI-2.0.0 | `ARCHIVO/DISCO/BACKLOG_BORRADORES/Enero_02_PrologAgentPack/02_backlog-ui-refactor.md` |
