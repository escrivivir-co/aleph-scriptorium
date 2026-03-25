---
description: "Protocolo de gestión del catálogo de especificaciones OpenAPI y AsyncAPI."
applyTo: "ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/**/*.yaml, ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/catalog.json"
---

# Instrucciones: Protocolo OpenAsyncAPI

> Activación contextual: al trabajar con especificaciones API o catálogo.

---

## 1. Estructura del Catálogo

```
ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/
├── catalog.json              # Índice maestro
├── specs/                    # Copias locales
│   ├── {proyecto}/
│   │   ├── openapi.yaml
│   │   └── asyncapi.yaml
│   └── ...
├── generated/                # Código generado
│   └── {proyecto}/
│       └── {lenguaje}/
└── docs/                     # Documentación estática
    └── {proyecto}/
        └── index.html
```

---

## 2. Schema de catalog.json

```json
{
  "$schema": "catalog.schema.json",
  "version": "1.0.0",
  "updated_at": "2026-01-02T12:00:00Z",
  "specs": [
    {
      "id": "unique-id",
      "project": "NombreProyecto",
      "type": "openapi | asyncapi",
      "spec_version": "3.1.0 | 3.0.0",
      "api_version": "1.0.0",
      "title": "Título de la API",
      "description": "Descripción breve",
      "origin": "ruta/relativa/desde/workspace",
      "local": "specs/proyecto/file.yaml",
      "status": "draft | validated | deprecated",
      "cataloged_at": "ISO8601",
      "validated_at": "ISO8601 | null",
      "tags": ["iot", "rest", "mqtt"]
    }
  ]
}
```

---

## 3. Flujo de Catalogación

### Paso 1: Detectar Spec

```
Buscar en proyecto:
- **/openapi.yaml, **/openapi.json
- **/asyncapi.yaml, **/asyncapi.json
- **/swagger.yaml, **/swagger.json
```

### Paso 2: Extraer Metadatos

```yaml
# De OpenAPI
info:
  title: → catalog.title
  version: → catalog.api_version
  description: → catalog.description

# De AsyncAPI
info:
  title: → catalog.title
  version: → catalog.api_version
```

### Paso 3: Generar ID

```
{proyecto}-{tipo}
# Ejemplo: prolog-editor-openapi, prolog-editor-asyncapi
```

### Paso 4: Copiar a Local (Opcional)

```bash
cp origen/openapi.yaml ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/proyecto/
```

### Paso 5: Validar

```bash
# OpenAPI 3.x
redocly lint specs/proyecto/openapi.yaml

# AsyncAPI 3.x
asyncapi validate specs/proyecto/asyncapi.yaml
```

### Paso 6: Registrar

Añadir entrada a `catalog.json` con status `validated` o `draft`.

---

## 4. Estados de Spec

| Estado | Significado | Acción |
|--------|-------------|--------|
| `draft` | No validada | Requiere validación |
| `validated` | Pasó linting | Lista para uso |
| `deprecated` | Obsoleta | Marcar para limpieza |
| `error` | Fallo de validación | Revisar errores |

---

## 5. Validación

### OpenAPI

| Tool | Comando | Nivel |
|------|---------|-------|
| redocly | `redocly lint spec.yaml` | Estricto |
| spectral | `spectral lint spec.yaml` | Personalizable |
| openapi-generator | `openapi-generator-cli validate -i spec.yaml` | Básico |

### AsyncAPI

| Tool | Comando | Nivel |
|------|---------|-------|
| asyncapi-cli | `asyncapi validate spec.yaml` | Oficial |

### Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `schema-validation-error` | Schema inválido | Revisar $ref y tipos |
| `no-server-description` | Server sin desc | Añadir description |
| `operation-operationId` | Falta operationId | Añadir a cada operación |

---

## 6. Generación de Código

### Plantilla de Comando

```bash
# OpenAPI → Cliente TypeScript
openapi-generator-cli generate \
  -i ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/{proyecto}/openapi.yaml \
  -g typescript-fetch \
  -o ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/generated/{proyecto}/typescript-client \
  --additional-properties=npmName=@scriptorium/{proyecto}-client

# AsyncAPI → Servidor Node.js
asyncapi generate fromTemplate \
  specs/{proyecto}/asyncapi.yaml \
  @asyncapi/nodejs-template \
  -o generated/{proyecto}/nodejs-server
```

### Configuración por Defecto

```yaml
# .openapi-generator-config.yaml
npmName: "@scriptorium/{proyecto}-client"
supportsES6: true
withInterfaces: true
```

---

## 7. Sincronización

### Desde Origen

Cuando la spec origen cambia:

```bash
# 1. Detectar cambio (manual o CI)
diff origen/openapi.yaml specs/proyecto/openapi.yaml

# 2. Actualizar copia local
cp origen/openapi.yaml specs/proyecto/

# 3. Re-validar
redocly lint specs/proyecto/openapi.yaml

# 4. Actualizar catalog.json
# - Incrementar api_version si corresponde
# - Actualizar validated_at
```

### Periodicidad Recomendada

| Frecuencia | Trigger |
|------------|---------|
| Por commit | CI/CD en origen |
| Semanal | Revisión manual |
| Por release | Bump de versión |

---

## 8. Publicación de Docs

### Swagger UI Estático

```bash
# Generar HTML
redocly build-docs specs/proyecto/openapi.yaml -o docs/proyecto/index.html
```

### Integrar en GH-Pages

```yaml
# docs/_data/apis.yml
apis:
  - name: PrologEditor
    openapi: /apis/prolog-editor/openapi.html
    asyncapi: /apis/prolog-editor/asyncapi.html
```

---

## 9. Commit Convention

```bash
# Catalogar nueva
feat(script/plugins): catalogar spec {proyecto} v{version}

# Actualizar existente
fix(script/plugins): sync spec {proyecto} desde origen

# Generar código
feat(script/plugins): generar cliente {lenguaje} para {proyecto}

# Documentación
docs(script/plugins): publicar docs API {proyecto}
```

---

## 10. Integración con TypedPrompting

Las specs pueden usarse como fuente para schemas de TypedPrompting:

```typescript
// Extraer schema de componente OpenAPI
const schema = spec.components.schemas.Rule;

// Convertir a TypedPrompt
{
  "name": "Rule",
  "schema": schema,
  "examples": [/* desde spec.paths.*.examples */]
}
```
