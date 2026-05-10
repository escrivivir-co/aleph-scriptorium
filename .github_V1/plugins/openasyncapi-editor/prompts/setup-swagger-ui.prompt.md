---
mode: agent
tools: ['vscode', 'execute', 'web']
description: "Guía asistida para instalar Swagger UI local."
---

# Setup: Swagger UI Local

Guía paso a paso para instalar y configurar Swagger UI para visualizar especificaciones OpenAPI.

## Opción 1: Docker (Recomendado)

```bash
# Levantar con spec local
docker run -p 8080:8080 \
  -e SWAGGER_JSON=/spec/openapi.yaml \
  -v $(pwd)/specs/proyecto:/spec \
  swaggerapi/swagger-ui

# Abrir en navegador
open http://localhost:8080
```

## Opción 2: swagger-ui-dist (NPM)

```bash
# Instalar
npm install swagger-ui-dist http-server

# Copiar assets
cp -r node_modules/swagger-ui-dist ./swagger-ui

# Modificar swagger-ui/swagger-initializer.js
# Cambiar url a tu spec local

# Servir
npx http-server ./swagger-ui -p 8080
```

## Opción 3: Integrado en Express

```javascript
// app.js
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
const swaggerDocument = YAML.load('./specs/proyecto/openapi.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(8080, () => {
  console.log('Swagger UI: http://localhost:8080/api-docs');
});
```

```bash
npm install express swagger-ui-express yamljs
node app.js
```

## Opción 4: Redoc (Alternativa estática)

```bash
# Generar HTML estático
redocly build-docs specs/proyecto/openapi.yaml -o api-docs.html

# Abrir directamente
open api-docs.html
```

## Verificación

1. Abrir URL en navegador
2. Verificar que la spec se carga correctamente
3. Probar "Try it out" en algún endpoint

---

**Agente**: @openasyncapi-editor swagger
