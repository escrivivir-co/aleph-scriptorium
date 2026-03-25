---
mode: agent
tools: ['vscode', 'execute']
description: "Generar código cliente o servidor desde especificación API."
---

# Generar Cliente/Servidor

Quiero generar código desde una especificación OpenAPI o AsyncAPI.

## Parámetros

1. **Especificación**: (id del catálogo o ruta directa)
2. **Tipo de código**: (client | server | both)
3. **Lenguaje**: (typescript | python | go | java | nodejs)
4. **Destino**: (ruta de salida, default: `generated/{proyecto}/{lenguaje}`)

## Comandos por Lenguaje

### TypeScript Client (Fetch)
```bash
openapi-generator-cli generate \
  -i specs/proyecto/openapi.yaml \
  -g typescript-fetch \
  -o generated/proyecto/typescript-client \
  --additional-properties=npmName=@scriptorium/proyecto-client,supportsES6=true
```

### Python Client
```bash
openapi-generator-cli generate \
  -i specs/proyecto/openapi.yaml \
  -g python \
  -o generated/proyecto/python-client \
  --additional-properties=packageName=scriptorium_proyecto
```

### Node.js Server (Express)
```bash
openapi-generator-cli generate \
  -i specs/proyecto/openapi.yaml \
  -g nodejs-express-server \
  -o generated/proyecto/express-server
```

## Post-Generación

```bash
cd generated/proyecto/{lenguaje}
npm install  # o pip install -e .
npm run build  # si aplica
```

---

**Agente**: @openasyncapi-editor generar
