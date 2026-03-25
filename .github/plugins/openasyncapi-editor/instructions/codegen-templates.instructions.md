---
description: "Plantillas y guías para generación de código desde especificaciones API."
applyTo: "ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/generated/**/*"
---

# Instrucciones: Generación de Código

> Activación contextual: al generar código desde especificaciones.

---

## 1. Prerrequisitos

### Instalación Global

```bash
# OpenAPI Generator (requiere Java 11+)
npm install -g @openapitools/openapi-generator-cli

# AsyncAPI CLI
npm install -g @asyncapi/cli

# Redocly CLI (alternativa ligera para OpenAPI)
npm install -g @redocly/cli
```

### Verificar Instalación

```bash
openapi-generator-cli version
asyncapi --version
redocly --version
```

---

## 2. Generadores OpenAPI

### Cliente TypeScript (Recomendado)

```bash
openapi-generator-cli generate \
  -i specs/proyecto/openapi.yaml \
  -g typescript-fetch \
  -o generated/proyecto/typescript-client \
  --additional-properties=npmName=@scriptorium/proyecto-client,supportsES6=true,withInterfaces=true
```

**Archivos Generados:**
```
generated/proyecto/typescript-client/
├── src/
│   ├── apis/
│   │   └── RulesApi.ts
│   ├── models/
│   │   └── Rule.ts
│   └── runtime.ts
├── package.json
└── tsconfig.json
```

### Cliente Python

```bash
openapi-generator-cli generate \
  -i specs/proyecto/openapi.yaml \
  -g python \
  -o generated/proyecto/python-client \
  --additional-properties=packageName=scriptorium_proyecto
```

### Stub Express Server

```bash
openapi-generator-cli generate \
  -i specs/proyecto/openapi.yaml \
  -g nodejs-express-server \
  -o generated/proyecto/express-stub
```

### Lista Completa de Generadores

```bash
openapi-generator-cli list
```

Generadores populares:
| Generador | Uso |
|-----------|-----|
| `typescript-fetch` | Cliente browser/Node |
| `typescript-axios` | Cliente con Axios |
| `python` | Cliente Python |
| `go` | Cliente Go |
| `nodejs-express-server` | Stub servidor Express |
| `spring` | Servidor Java Spring |
| `openapi-yaml` | Normalizar spec |

---

## 3. Generadores AsyncAPI

### Servidor Node.js MQTT

```bash
asyncapi generate fromTemplate \
  specs/proyecto/asyncapi.yaml \
  @asyncapi/nodejs-template \
  -o generated/proyecto/nodejs-mqtt-server \
  -p server=mosquitto
```

### Cliente TypeScript

```bash
asyncapi generate fromTemplate \
  specs/proyecto/asyncapi.yaml \
  @asyncapi/typescript-nats-template \
  -o generated/proyecto/typescript-client
```

### Lista de Templates

```bash
asyncapi config templates
```

Templates populares:
| Template | Protocolo |
|----------|-----------|
| `@asyncapi/nodejs-template` | MQTT, AMQP |
| `@asyncapi/python-paho-template` | MQTT |
| `@asyncapi/html-template` | Documentación |
| `@asyncapi/typescript-nats-template` | NATS |

---

## 4. Configuración Avanzada

### Archivo de Configuración OpenAPI

Crear `.openapi-generator-config.yaml`:

```yaml
# Opciones globales
npmName: "@scriptorium/proyecto-client"
npmVersion: "1.0.0"
supportsES6: true
withInterfaces: true
useSingleRequestParameter: true

# Mapeos de tipos personalizados
typeMappings:
  DateTime: Date
  
# Importaciones adicionales
importMappings:
  DateTime: "@types/date-fns"
```

Uso:
```bash
openapi-generator-cli generate \
  -i spec.yaml \
  -g typescript-fetch \
  -o ./out \
  -c .openapi-generator-config.yaml
```

### Archivo de Configuración AsyncAPI

Los templates AsyncAPI usan parámetros `-p`:

```bash
asyncapi generate fromTemplate spec.yaml @asyncapi/nodejs-template \
  -p server=mosquitto \
  -p asyncapiFileDir=./src
```

---

## 5. Post-Generación

### TypeScript Client

```bash
cd generated/proyecto/typescript-client
npm install
npm run build
```

### Integrar en Proyecto

```typescript
// En tu código
import { RulesApi, Configuration } from '@scriptorium/proyecto-client';

const config = new Configuration({
  basePath: 'http://localhost:8000/api'
});

const rulesApi = new RulesApi(config);
const rules = await rulesApi.getAllRules();
```

### Python Client

```bash
cd generated/proyecto/python-client
pip install -e .
```

```python
from scriptorium_proyecto import ApiClient, RulesApi

client = ApiClient()
client.configuration.host = 'http://localhost:8000/api'
rules_api = RulesApi(client)
rules = rules_api.get_all_rules()
```

---

## 6. Documentación Estática

### Redoc (OpenAPI)

```bash
# HTML único
redocly build-docs specs/proyecto/openapi.yaml \
  --output docs/proyecto/api-docs.html

# Con tema personalizado
redocly build-docs specs/proyecto/openapi.yaml \
  --output docs/proyecto/api-docs.html \
  --theme.openapi.theme.colors.primary.main='#5D3FD3'
```

### AsyncAPI HTML

```bash
asyncapi generate fromTemplate \
  specs/proyecto/asyncapi.yaml \
  @asyncapi/html-template \
  -o docs/proyecto/asyncapi-docs
```

---

## 7. Validación Pre-Generación

### Siempre Validar Antes

```bash
# OpenAPI
redocly lint specs/proyecto/openapi.yaml
# O
openapi-generator-cli validate -i specs/proyecto/openapi.yaml

# AsyncAPI
asyncapi validate specs/proyecto/asyncapi.yaml
```

### Errores Comunes

| Error | Solución |
|-------|----------|
| "Could not resolve reference" | Verificar $ref paths |
| "Invalid operationId" | Usar camelCase sin espacios |
| "Missing required field" | Completar campos info.* |

---

## 8. CI/CD Integration

### GitHub Action para Generación

```yaml
# .github/workflows/generate-clients.yml
name: Generate API Clients
on:
  push:
    paths:
      - 'specs/**/*.yaml'

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Generate TypeScript Client
        run: |
          npm install -g @openapitools/openapi-generator-cli
          openapi-generator-cli generate \
            -i specs/proyecto/openapi.yaml \
            -g typescript-fetch \
            -o generated/proyecto/typescript-client
            
      - name: Commit Generated Code
        run: |
          git add generated/
          git commit -m "chore: regenerate API clients" || true
          git push
```

---

## 9. Troubleshooting

### Java Not Found

```bash
# macOS
brew install openjdk@11

# O usar Docker
docker run --rm -v $(pwd):/local openapitools/openapi-generator-cli generate \
  -i /local/spec.yaml -g typescript-fetch -o /local/out
```

### Template Not Found (AsyncAPI)

```bash
# Instalar template específico
npm install -g @asyncapi/nodejs-template
```

### Tipos Incorrectos

Revisar `components/schemas` en la spec. Usar `format` para precisión:

```yaml
schemas:
  Rule:
    properties:
      id:
        type: integer
        format: int64  # Importante para tipos numéricos
      createdAt:
        type: string
        format: date-time  # Genera Date en TS
```
