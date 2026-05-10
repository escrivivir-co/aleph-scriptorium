---
id: lista-herramientas-mcp
title: Lista herramientas MCP
description: Instrucciones para que un agente descubra y liste servidores y herramientas MCP accesibles desde el entorno.
tags: [mcp, discovery, devops, playwright, novelist, copilot-logs]
---

Objetivo
-------

Sin mirar la codebase, ni usar la consola, examina la herramienas en servidores mcp que vs code le expone internamente a la extensión Github Copilot Chat. No ejecutarlas ni probarlas. Solo un catálogo de funciones disponibles. (MCP Tool Calling).

Instrucciones al agente
-----------------------

- 1) Detectar capacidades disponibles en el runtime
  - Consulta las funciones MCP expuestas en el entorno (por ejemplo, nombres que empiecen por `mcp_`).
  - Prioriza las familias comunes: `mcp_devops-*`, `mcp_playwright_*`, `mcp_alephalpha_*`, `mcp_copilot-logs-*`, `mcp_playwright_browser_*`.

- 2) Comprobar herramientas locales por familia
  - DevOps / Mesh: usar `mcp_devops-mcp-se_get_server_status` y `mcp_devops-mcp-se_get_server_info`.
  - Playwright: identificar funciones `mcp_playwright_browser_*` y, si procede, ejecutar `mcp_playwright_browser_install` (instalar navegador) seguido de `mcp_playwright_browser_tabs` o `mcp_playwright_browser_network_requests` para una prueba leve.
  - Novelist / AlephAlpha: listar capacidades (`mcp_alephalpha_alephAlpha_listCharacters`, `mcp_alephalpha_alephAlpha_getDocumentation` o equivalentes) y probar salud si existe `/health`.
  - Copilot logs: usar `mcp_copilot-logs-_get_usage_metrics` y `mcp_copilot-logs-_get_diagnostics` para validar acceso.

- 5) Generar salida estructurada
  - Presenta una lista. Para cada server, las tools que ofrece.
