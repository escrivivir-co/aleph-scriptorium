---
mode: agent
tools: ['vscode', 'execute']
description: "Validar sintaxis y semántica de una especificación API."
---

# Validar Especificación API

Quiero validar una especificación OpenAPI o AsyncAPI para detectar errores de sintaxis y mejores prácticas.

## Especificación a validar

- **Archivo**: (ruta al archivo yaml/json)
- **Tipo**: (openapi | asyncapi)

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

## Output Esperado

- ✅ Sin errores → Spec válida
- ⚠️ Warnings → Mejoras sugeridas (opcional)
- ❌ Errores → Requiere corrección

---

**Agente**: @openasyncapi-editor validar
