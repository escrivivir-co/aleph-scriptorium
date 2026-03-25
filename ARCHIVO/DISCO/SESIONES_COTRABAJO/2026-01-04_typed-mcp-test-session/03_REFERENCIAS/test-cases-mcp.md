# Test Cases: MCPTypedPromptServer

> **Para**: @ox  
> **Épica**: TYPED-MCP-1.0.0  
> **Prerrequisito**: Backend en 3019 + MCP Server en 3020

---

## Setup

### 1. Arrancar Backend (3019)

```bash
cd TypedPromptsEditor
npm run dev
# Verificar: curl http://localhost:3019/api/schemas
```

### 2. Arrancar MCP Server (3020)

Opción A: Task de VS Code
```
Terminal → Run Task → "TPE: Start [MCP Server]"
```

Opción B: Manual
```bash
cd MCPGallery/mcp-mesh-sdk
npm run start:typed-prompt
```

### 3. Verificar Health

```bash
curl http://localhost:3020/health
# Esperado: { "status": "ok" }
```

---

## Test Cases por Tool

### TC-001: typed_list_schemas

**Objetivo**: Listar todos los schemas disponibles.

**Input MCP**:
```json
{
  "tool": "typed_list_schemas",
  "arguments": {}
}
```

**Esperado**:
```json
{
  "success": true,
  "count": N,
  "schemas": [
    { "id": 1, "name": "...", ... },
    ...
  ]
}
```

**Curl equivalente (REST)**:
```bash
curl http://localhost:3019/api/schemas
```

| Check | Criterio |
|-------|----------|
| ✅ | `success: true` |
| ✅ | `schemas` es array |
| ✅ | Cada schema tiene `id`, `name`, `jsonSchema` |

---

### TC-002: typed_get_schema

**Objetivo**: Obtener un schema específico por ID.

**Input MCP**:
```json
{
  "tool": "typed_get_schema",
  "arguments": { "schemaId": 1 }
}
```

**Esperado**:
```json
{
  "success": true,
  "schema": {
    "id": 1,
    "name": "...",
    "typeScript": "interface ...",
    "jsonSchema": "{...}",
    ...
  }
}
```

**Curl equivalente (REST)**:
```bash
curl http://localhost:3019/api/schemas/1
```

| Check | Criterio |
|-------|----------|
| ✅ | Schema retornado con ID correcto |
| ✅ | Contiene `typeScript` y `jsonSchema` |
| ⚠️ | ID inexistente → `success: false, error: "Not found"` |

---

### TC-003: typed_list_libraries

**Objetivo**: Listar bibliotecas de schemas.

**Input MCP**:
```json
{
  "tool": "typed_list_libraries",
  "arguments": {}
}
```

**Esperado**:
```json
{
  "success": true,
  "count": N,
  "libraries": [
    { "id": 1, "name": "...", "description": "..." },
    ...
  ]
}
```

**Curl equivalente (REST)**:
```bash
curl http://localhost:3019/api/libraries
```

| Check | Criterio |
|-------|----------|
| ✅ | `libraries` es array |
| ✅ | Cada library tiene `id`, `name` |

---

### TC-004: typed_convert_interface

**Objetivo**: Convertir TypeScript interface a JSON Schema.

**Input MCP**:
```json
{
  "tool": "typed_convert_interface",
  "arguments": {
    "typescript": "interface User { name: string; age: number; }",
    "name": "User"
  }
}
```

**Esperado**:
```json
{
  "success": true,
  "jsonSchema": "{\"type\":\"object\",\"properties\":{\"name\":{\"type\":\"string\"},\"age\":{\"type\":\"number\"}},\"required\":[\"name\",\"age\"]}"
}
```

| Check | Criterio |
|-------|----------|
| ✅ | `jsonSchema` es JSON válido |
| ✅ | Propiedades `name` y `age` presentes |
| ✅ | Tipos correctos (string, number) |

---

### TC-005: typed_validate_message

**Objetivo**: Validar un mensaje JSON contra un schema existente.

**Prerrequisito**: Tener un schema con ID conocido (ej: ID=1).

**Input MCP (mensaje válido)**:
```json
{
  "tool": "typed_validate_message",
  "arguments": {
    "schemaId": 1,
    "message": "{\"field1\":\"value1\"}"
  }
}
```

**Esperado (válido)**:
```json
{
  "success": true,
  "valid": true,
  "report": { "valid": true, "errors": [] }
}
```

**Input MCP (mensaje inválido)**:
```json
{
  "tool": "typed_validate_message",
  "arguments": {
    "schemaId": 1,
    "message": "{\"wrongField\":123}"
  }
}
```

**Esperado (inválido)**:
```json
{
  "success": true,
  "valid": false,
  "report": { 
    "valid": false, 
    "errors": [
      { "path": "...", "message": "..." }
    ] 
  }
}
```

| Check | Criterio |
|-------|----------|
| ✅ | Mensaje válido → `valid: true` |
| ✅ | Mensaje inválido → `valid: false` con errores |
| ⚠️ | schemaId inexistente → `success: false` |

---

### TC-006: typed_create_schema

**Objetivo**: Crear un nuevo schema.

**Input MCP**:
```json
{
  "tool": "typed_create_schema",
  "arguments": {
    "name": "TestSchema",
    "typescript": "interface TestSchema { foo: string; }",
    "jsonSchema": "{\"type\":\"object\",\"properties\":{\"foo\":{\"type\":\"string\"}},\"required\":[\"foo\"]}",
    "category": "test"
  }
}
```

**Esperado**:
```json
{
  "success": true,
  "schema": {
    "id": N,
    "name": "TestSchema",
    ...
  }
}
```

**Curl equivalente (REST)**:
```bash
curl -X POST http://localhost:3019/api/schemas \
  -H "Content-Type: application/json" \
  -d '{"name":"TestSchema","typescript":"...","jsonSchema":"...","category":"test"}'
```

| Check | Criterio |
|-------|----------|
| ✅ | Schema creado con nuevo ID |
| ✅ | Verificar con `typed_get_schema` que existe |

---

### TC-007: typed_suggest_ontology

**Objetivo**: Obtener sugerencias de ontologías para un caso de uso.

**Input MCP**:
```json
{
  "tool": "typed_suggest_ontology",
  "arguments": {
    "useCase": "Validar mensajes de chat entre agentes del Scriptorium",
    "domain": "Teatro"
  }
}
```

**Esperado**:
```json
{
  "success": true,
  "suggestions": [
    { "schemaId": N, "name": "...", "relevance": 85, "reason": "..." },
    ...
  ]
}
```

| Check | Criterio |
|-------|----------|
| ✅ | `suggestions` es array (puede estar vacío si no hay matches) |
| ✅ | Cada sugerencia tiene `schemaId`, `relevance` |

---

## Test de Resources MCP

### TC-R01: typed-prompt://schemas

```bash
# Via MCP client, request resource
# URI: typed-prompt://schemas
```

**Esperado**: Lista de schemas en JSON.

---

### TC-R02: typed-prompt://schemas/{id}

```bash
# URI: typed-prompt://schemas/1
```

**Esperado**: Detalle del schema con ID 1.

---

## Checklist de Validación

| # | Test | Estado | Notas |
|---|------|--------|-------|
| TC-001 | typed_list_schemas | ⏳ | |
| TC-002 | typed_get_schema | ⏳ | |
| TC-003 | typed_list_libraries | ⏳ | |
| TC-004 | typed_convert_interface | ⏳ | |
| TC-005 | typed_validate_message | ⏳ | |
| TC-006 | typed_create_schema | ⏳ | |
| TC-007 | typed_suggest_ontology | ⏳ | |
| TC-R01 | Resource: schemas | ⏳ | |
| TC-R02 | Resource: schemas/{id} | ⏳ | |

---

## Resultado Esperado para Demo

Cuando todos los tests pasen:

```
✅ 7/7 Tools funcionando
✅ 2/2 Resources accesibles
✅ Backend 3019 + MCP 3020 integrados

→ Listo para demo con Product Owner
```

---

## Troubleshooting

### Error: "Connection refused" en 3020

1. Verificar que el MCP Server está corriendo
2. Verificar logs en terminal

### Error: "Connection refused" en 3019

1. Verificar que TypedPromptsEditor backend está corriendo
2. `cd TypedPromptsEditor && npm run dev`

### Error: "Schema not found"

1. El backend puede estar vacío (sin schemas)
2. Crear uno con TC-006 primero
