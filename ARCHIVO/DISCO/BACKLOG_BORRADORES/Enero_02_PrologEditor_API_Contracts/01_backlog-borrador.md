# Épica: PrologEditor API Contracts

> **ID**: PROLOG-API-1.0.0  
> **Sprint**: FC1  
> **Fecha creación**: 2026-01-02  
> **Estado**: 📋 Planificación

---

## 1. Análisis de Interfaces Detectadas

### 1.1 Resumen de Contratos

| Tipo | Protocolo | Cantidad | Especificación |
|------|-----------|----------|----------------|
| **REST/HTTP** | JSON over HTTP | 9 endpoints | OpenAPI 3.1 |
| **Pub/Sub** | MQTT | 2 topics | AsyncAPI 3.0 |

### 1.2 Perfilado REST API (OpenAPI)

| Endpoint | Método | Request Body | Response | Controller |
|----------|--------|--------------|----------|------------|
| `/api/rules` | POST | `Rule` | `Rule` + id | `prolog-controller.saveRule` |
| `/api/rules` | GET | — | `Rule[]` | `prolog-controller.getRules` |
| `/api/rules/:id` | GET | — | `Rule[]` | `prolog-controller.getRules` |
| `/api/rules/:id` | DELETE | — | 204 No Content | `prolog-controller.deleteRule` |
| `/api/run-rule` | POST | `{text: string}` | `{status, payload}` | `prolog-controller.runRule` |
| `/api/sdk-templates` | GET | — | `Template[]` | `prolog-controller.getSdkTemplates` |
| `/api/template/:templateName` | GET | — | `{content: string}` | `prolog-controller.getTemplateContent` |
| `/api/user-app` | POST | `{appName, content}` | `{message}` | `prolog-controller.saveUserApp` |
| `/api/telemetry/process` | POST | `{telemetry}` | `Result` | `telemetry-controller.processTelemetry` |
| `/api/telemetry/status` | GET | — | `TelemetryStatus[]` | `telemetry-controller.getTelemetryStatus` |

### 1.3 Perfilado Pub/Sub (AsyncAPI)

| Protocolo | Topic | Dirección | Payload | Servicio |
|-----------|-------|-----------|---------|----------|
| MQTT | `sensor/temperature` | subscribe | `{sensor, value}` | `mqtt-service.js` |
| MQTT | `sensor/humidity` | subscribe | `{sensor, value}` | `mqtt-service.js` |
| MQTT | (dinámico) | publish | string | `mqtt-service.publishMessage` |

---

## 2. Esquemas de Datos Identificados

### 2.1 Modelos Core

```typescript
// Rule (SQLite + API)
interface Rule {
  id?: number;           // Auto-generated
  name: string;
  content: string;
  app?: string;          // Filter key
  predicate?: string;    // rulesControl table
  arity?: string;
  example?: string;
  evalCompatible?: string;
}

// Template
interface Template {
  name: string;
  description?: string;
  files: string[];
}

// Telemetry
interface Telemetry {
  sensor: string;
  value: number | string;
}

// Query Result
interface QueryResult {
  status: number;
  payload: Array<{[key: string]: any}>;
}

// Error Response
interface ErrorResponse {
  error: string;
}
```

---

## 3. Plan de Iteraciones

### Iteración 1: Scaffolding OpenAPI (Effort: 3)

| Task | Descripción | DoD |
|------|-------------|-----|
| T1.1 | Crear estructura `PrologEditor/api-specs/` | Carpeta creada |
| T1.2 | Instalar swagger-ui-express en backend | package.json actualizado |
| T1.3 | Crear `openapi.yaml` base v1.0.0 | Info + servers + paths vacíos |
| T1.4 | Configurar endpoint `/api-docs` | Swagger UI accesible |

**Entregable**: Swagger UI corriendo en `http://localhost:8000/api-docs`

---

### Iteración 2: Especificación OpenAPI Completa (Effort: 5)

| Task | Descripción | DoD |
|------|-------------|-----|
| T2.1 | Definir schemas: Rule, Template, Telemetry | Components/schemas completos |
| T2.2 | Especificar paths `/api/rules` (CRUD) | 4 operaciones documentadas |
| T2.3 | Especificar paths `/api/run-rule` | Request/Response con examples |
| T2.4 | Especificar paths `/api/sdk-templates` | 2 operaciones documentadas |
| T2.5 | Especificar paths `/api/user-app` | POST documentado |
| T2.6 | Especificar paths `/api/telemetry/*` | 2 operaciones documentadas |
| T2.7 | Añadir error responses (4xx, 5xx) | Todos los endpoints |

**Entregable**: `openapi.yaml` completo validado con spectral

---

### Iteración 3: Especificación AsyncAPI (MQTT) (Effort: 3)

| Task | Descripción | DoD |
|------|-------------|-----|
| T3.1 | Crear `asyncapi.yaml` base v3.0.0 | Info + servers MQTT |
| T3.2 | Definir channels sensor/temperature | Subscribe operation |
| T3.3 | Definir channels sensor/humidity | Subscribe operation |
| T3.4 | Definir channel dinámico publish | Publish operation |
| T3.5 | Configurar AsyncAPI Studio local | Visualización accesible |

**Entregable**: AsyncAPI spec + Studio en `http://localhost:8001`

---

### Iteración 4: Generación de Clientes (Effort: 5)

| Task | Descripción | DoD |
|------|-------------|-----|
| T4.1 | Configurar openapi-generator-cli | npm script disponible |
| T4.2 | Generar cliente TypeScript/Angular | `generated/angular-client/` |
| T4.3 | Generar cliente TypeScript/Fetch | `generated/fetch-client/` |
| T4.4 | Generar servidor Node/Express stub | `generated/express-server/` |
| T4.5 | Generar cliente Python | `generated/python-client/` |
| T4.6 | Documentar proceso en README | Instrucciones claras |

**Entregable**: 4 clientes generados + 1 server stub

---

### Iteración 5: Integración y Validación (Effort: 5)

| Task | Descripción | DoD |
|------|-------------|-----|
| T5.1 | Reemplazar prolog.service.ts con generado | Frontend funcional |
| T5.2 | Reemplazar telemetry.service.ts con generado | Frontend funcional |
| T5.3 | Añadir validación OpenAPI middleware | express-openapi-validator |
| T5.4 | Tests de contrato (API vs Spec) | Jest tests pasando |
| T5.5 | CI/CD: validar spec en PR | GitHub Action |

**Entregable**: Pipeline de validación continua

---

### Iteración 6: AsyncAPI Codegen (Effort: 3)

| Task | Descripción | DoD |
|------|-------------|-----|
| T6.1 | Configurar asyncapi-generator | npm script disponible |
| T6.2 | Generar cliente MQTT TypeScript | `generated/mqtt-client/` |
| T6.3 | Generar documentación HTML | `docs/asyncapi/` |
| T6.4 | Integrar con frontend (WebSocket adapter?) | Opcional: evaluar |

**Entregable**: Cliente MQTT generado

---

## 4. Herramientas Recomendadas

### OpenAPI (REST)

| Herramienta | Propósito | Instalación |
|-------------|-----------|-------------|
| **swagger-ui-express** | Visualizar spec | `npm i swagger-ui-express` |
| **@apidevtools/swagger-parser** | Validar spec | `npm i -D @apidevtools/swagger-parser` |
| **@stoplight/spectral-cli** | Linter OpenAPI | `npm i -D @stoplight/spectral-cli` |
| **openapi-generator-cli** | Generar código | `npm i -D @openapitools/openapi-generator-cli` |
| **express-openapi-validator** | Validar requests | `npm i express-openapi-validator` |

### AsyncAPI (Pub/Sub)

| Herramienta | Propósito | Instalación |
|-------------|-----------|-------------|
| **@asyncapi/studio** | Visualizar spec | Docker o web |
| **@asyncapi/generator** | Generar código | `npm i -D @asyncapi/generator` |
| **@asyncapi/parser** | Validar spec | `npm i -D @asyncapi/parser` |

---

## 5. Estructura de Archivos Propuesta

```
PrologEditor/
├── api-specs/
│   ├── openapi.yaml          # REST API spec
│   ├── asyncapi.yaml         # MQTT spec
│   └── .spectral.yaml        # Linter config
├── generated/
│   ├── angular-client/       # Para frontend
│   ├── fetch-client/         # Vanilla JS
│   ├── python-client/        # Interop
│   ├── express-server/       # Reference impl
│   └── mqtt-client/          # MQTT TypeScript
├── backend/
│   └── src/
│       └── middleware/
│           └── openapi-validator.js
└── docs/
    ├── openapi/              # Swagger UI static
    └── asyncapi/             # AsyncAPI HTML
```

---

## 6. Decisiones Arquitectónicas

### ¿Por qué OpenAPI 3.1?

- Compatibilidad con JSON Schema draft 2020-12
- Soporte nativo para `examples`
- Mejor tooling ecosystem

### ¿Por qué AsyncAPI 3.0?

- Estándar maduro para event-driven APIs
- Soporte para MQTT, WebSocket, Kafka
- Generadores de código actualizados

### ¿WebSocket vs MQTT en Frontend?

El frontend Angular no tiene cliente MQTT nativo. Opciones:

1. **WebSocket Bridge**: Backend expone WS que traduce a MQTT
2. **MQTT over WebSocket**: Usar librería mqtt.js con WS transport
3. **Server-Sent Events**: Para telemetry unidireccional

**Recomendación**: Opción 2 (mqtt.js) para mantener consistencia con backend.

---

## 7. Métricas de Éxito

| Métrica | Objetivo |
|---------|----------|
| Cobertura de endpoints en spec | 100% |
| Validación de spec en CI | Pasando |
| Clientes generados funcionando | ≥3 lenguajes |
| Tests de contrato | ≥80% coverage |
| Tiempo de onboarding con docs | <30 min |

---

## 8. Riesgos y Mitigaciones

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| Schemas dinámicos en Rule | Alto | Documentar comportamiento, usar `additionalProperties` |
| MQTT topics dinámicos | Medio | Usar pattern matching en AsyncAPI |
| Breaking changes en spec | Alto | Versionado semántico + changelog |

---

## 9. Referencias

- [OpenAPI 3.1 Specification](https://spec.openapis.org/oas/v3.1.0)
- [AsyncAPI 3.0 Specification](https://www.asyncapi.com/docs/reference/specification/v3.0.0)
- [Swagger UI Express](https://github.com/scottie1984/swagger-ui-express)
- [OpenAPI Generator](https://openapi-generator.tech/)
- [AsyncAPI Generator](https://github.com/asyncapi/generator)

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-01-02 | Creación inicial con análisis completo | @scrum |
