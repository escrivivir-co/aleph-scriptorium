# PrologEditor API Specifications

Este directorio contiene las especificaciones formales de las APIs del PrologEditor.

## Archivos

| Archivo | Estándar | Propósito |
|---------|----------|-----------|
| `openapi.yaml` | OpenAPI 3.1 | REST API (HTTP/JSON) |
| `asyncapi.yaml` | AsyncAPI 3.0 | Pub/Sub (MQTT) |

## Visualización

### Swagger UI (REST)

```bash
# Desde backend/
npm install swagger-ui-express yaml
npm start
# Abrir http://localhost:8000/api-docs
```

### AsyncAPI Studio (Pub/Sub)

```bash
# Opción 1: Web
# Abrir https://studio.asyncapi.com/ y cargar asyncapi.yaml

# Opción 2: Docker
docker run -p 8001:80 -v $(pwd):/specs asyncapi/studio
```

## Generación de Código

### Clientes TypeScript

```bash
# Instalar generador
npm install -D @openapitools/openapi-generator-cli

# Angular client
npx openapi-generator-cli generate \
  -i openapi.yaml \
  -g typescript-angular \
  -o ../generated/angular-client

# Fetch client
npx openapi-generator-cli generate \
  -i openapi.yaml \
  -g typescript-fetch \
  -o ../generated/fetch-client
```

### Servidor Express (stub)

```bash
npx openapi-generator-cli generate \
  -i openapi.yaml \
  -g nodejs-express-server \
  -o ../generated/express-server
```

### Cliente Python

```bash
npx openapi-generator-cli generate \
  -i openapi.yaml \
  -g python \
  -o ../generated/python-client
```

### Cliente MQTT (AsyncAPI)

```bash
npm install -D @asyncapi/generator

npx ag asyncapi.yaml @asyncapi/nodejs-template -o ../generated/mqtt-client
```

## Validación

### Lint OpenAPI

```bash
npm install -D @stoplight/spectral-cli
npx spectral lint openapi.yaml
```

### Lint AsyncAPI

```bash
npm install -D @asyncapi/parser
npx asyncapi validate asyncapi.yaml
```

## Integración con Backend

Ver [01_backlog-borrador.md](../../ARCHIVO/DISCO/BACKLOG_BORRADORES/Enero_02_PrologEditor_API_Contracts/01_backlog-borrador.md) para el plan completo de iteraciones.
