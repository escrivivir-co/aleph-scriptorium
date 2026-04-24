---
mode: agent
tools: ['vscode', 'execute']
description: "Validar sintaxis y semántica de una especificación API."
---

# Validar Especificación API

Quiero validar una especificación OpenAPI, AsyncAPI o MCPSpec para detectar errores de sintaxis, coherencia semántica y drift respecto al runtime.

## Especificación a validar

- **Archivo**: (ruta al archivo yaml/json)
- **Tipo**: (openapi | asyncapi | mcpspec)

## Herramientas de Validación

### OpenAPI
```bash
# Redocly (recomendado)
redocly lint specs/proyecto/openapi.yaml

# OpenAPI Generator
openapi-generator-cli validate -i specs/proyecto/openapi.yaml

# Spectral (personalizable)
spectral lint specs/proyecto/openapi.yaml
```

### AsyncAPI
```bash
asyncapi validate specs/proyecto/asyncapi.yaml
```

### MCPSpec

- Validar contra `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/mcpspec.schema.json`
- Revisar alineación con la spec oficial MCP:
	- `capabilities` del servidor vs features del cliente
	- `outputSchema` en tools
	- `resourceTemplates` si hay URIs parametrizadas
	- `mimeType`, `uri`, `arguments` y `annotations` normativas
- Si el servidor existe, contrastar con MCP Inspector:
	- capabilities reales
	- tools/resources/prompts listados
	- errores y resultados estructurados

## Output Esperado

- ✅ Sin errores → Spec válida
- ⚠️ Warnings → Mejoras sugeridas (opcional)
- ❌ Errores → Requiere corrección

---

**Agente**: @openasyncapi-editor validar
