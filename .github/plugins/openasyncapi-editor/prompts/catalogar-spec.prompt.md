---
mode: agent
tools: ['vscode', 'read', 'edit']
description: "Añadir nueva especificación al catálogo del Scriptorium."
---

# Catalogar Especificación API

Quiero añadir una nueva especificación OpenAPI o AsyncAPI al catálogo del Scriptorium.

## Información a proporcionar

1. **Proyecto**: ¿De qué proyecto es la API?
2. **Ruta**: ¿Dónde está el archivo de especificación?
3. **Tipo**: ¿Es OpenAPI o AsyncAPI?

## Proceso

1. Validar que la especificación existe y es válida
2. Extraer metadatos (título, versión, descripción)
3. Generar ID único para el catálogo
4. Opcionalmente copiar a `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/`
5. Registrar en `catalog.json`

## Ejemplo

```
Proyecto: BlocklyEditor
Ruta: BlocklyEditor/api-specs/openapi.yaml
Tipo: openapi
```

---

**Agente**: @openasyncapi-editor catalogar
