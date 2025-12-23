# Borrador: Plugin MCP-PRESETS

> **Código**: MCP-PRESETS-SITE  
> **Estado**: ✅ APROBADO Y PUBLICADO  
> **Fecha aprobación**: 2025-12-23  
> **Publicado en**: `.github/BACKLOG-SCRIPTORIUM.md` (épica SCRIPT-1.7.0)

---

## Contenido

| Archivo | Descripción | Estado |
|---------|-------------|--------|
| [conversacion-po-sm.md](conversacion-po-sm.md) | Conversación de planificación entre PO y SM | ✅ Archivado |
| [backlog-borrador.md](backlog-borrador.md) | Borrador del backlog con épica SCRIPT-1.7.0 | ✅ Aprobado |

---

## Resumen

Este borrador define el plugin `mcp-presets` para Scriptorium, que permite:

1. **Importar/Exportar presets MCP** desde/hacia el proyecto Zeus
2. **Gestionar catálogo local** de herramientas/recursos/prompts MCP
3. **Asignar presets a agentes** creados con AGENT_CREATOR

**Stories aprobadas**: 7 (23 puntos, 33 tasks)

---

## Submódulo Asociado

| Campo | Valor |
|-------|-------|
| **Repositorio** | `alephscript-mcp-presets-site` |
| **URL** | https://github.com/escrivivir-co/alephscript-mcp-presets-site |
| **Rama de trabajo** | `integration/beta/scriptorium` |
| **Rama base** | `dev/astillador` |

---

## Decisiones Clave

1. **Modo MVP**: Offline primero, API después
2. **Esquemas compatibles**: Usamos PresetModel y MCPModel de Zeus
3. **Integración con AGENT_CREATOR**: Via campo `mcpPresets` en recipes
4. **Sin conexión directa a extensión VS Code** en Sprint 1

---

## Referencias

- [PLUGINS.md](../../../.github/PLUGINS.md) — Protocolo de plugins
- [AGENT_CREATOR](../../PLUGINS/AGENT_CREATOR/) — Plugin de creación de agentes
- [Zeus plan](../../../alephscript-mcp-presets-site/zeus/PLANIFICACION/plan_zeus.md) — Plan arquitectónico del proyecto fuente

