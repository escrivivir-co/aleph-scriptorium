---
name: Herramientas MCP disponibles
description: Herramientas de contexto extendido disponibles para los agentes del proyecto.
applyTo: "**/*"
---
# Herramientas MCP disponibles

Este documento lista las herramientas de Model Context Protocol (MCP) y extensiones disponibles para los agentes del proyecto.

## 1. Built-In (VS Code)

Herramientas nativas de VS Code disponibles automáticamente:

- **Filesystem**: lectura, escritura, búsqueda de archivos en el workspace.
- **Terminal**: ejecución de comandos en terminal.
- **Editor**: navegación, selección, edición de código.
- **Search**: búsqueda semántica y grep en el workspace.
- **Git**: operaciones básicas de control de versiones.

## 2. Web Search for Copilot

Extensión oficial de Microsoft (`ms-vscode.vscode-websearchforcopilot`).

**Capacidades**:
- Búsqueda en motores de búsqueda web desde el chat de Copilot.
- Consulta de información actualizada no disponible en el contexto local.

**Uso en el proyecto**:
- Verificar referencias a actualidad, noticias o fuentes externas.
- Consultar documentación oficial cuando sea necesario.
- Contrastar información de los textos fuente con fuentes públicas.

## 3. Playwright (Browser MCP)

Si está configurado, permite navegación web programática:

- `browser_navigate`: navegar a URLs.
- `browser_snapshot`: capturar estado accesible de páginas.
- `browser_click`, `browser_type`: interacción con elementos.

**Uso en el proyecto**:
- Consultar fuentes primarias cuando el texto las referencia.
- Verificar enlaces y citas.

## 4. Herramientas adicionales

El agente puede **identificar y solicitar** otras herramientas MCP según necesidad:

- Si una tarea requiere capacidades no disponibles, el agente debe:
  1. Identificar qué herramienta sería necesaria.
  2. Informar al usuario de la limitación.
  3. Proponer alternativas con las herramientas disponibles.

## Uso en el proyecto

### Para extracción y archivo de material

Cuando se procese un documento fuente que contiene:
- Referencias a noticias o actualidad → usar Web Search para verificar/contextualizar.
- Enlaces a fuentes externas → usar Playwright para consultar si es necesario.
- Nombres propios o eventos recientes → el agente puede buscar contexto adicional.

### Limitaciones a tener en cuenta

- Web Search puede no tener acceso a contenido de pago o restringido.
- Las búsquedas deben ser específicas y relevantes para el proyecto.
- El agente debe informar cuando no pueda verificar una referencia.
