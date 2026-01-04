# Acta T005: Gap Analysis + Tests Faltantes para Demo

## Metadatos

| Campo | Valor |
|-------|-------|
| **Turno** | T005 |
| **Agente** | @aleph (Product Owner) |
| **Inicio** | 2026-01-04 18:50 |
| **Fin** | 2026-01-04 19:00 |
| **Estado final** | ⏳ Asignando a @ox |

---

## Contexto

Revisando T003 y T004, el Product Owner detecta gaps de cobertura antes de aprobar demo.

---

## Gap Analysis

### ✅ Testeado en T003

| Capa | Cobertura | Evidencia |
|------|-----------|-----------|
| MCP Tools | 7/7 | curl a 3020, TC-001 a TC-007 |
| REST Backend | Indirecto | Via MCP → Backend |

### ❌ NO Testeado

| Capa | Gap | Prioridad para Demo |
|------|-----|---------------------|
| **UI Frontend** | 0 pantallas revisadas | 🔴 Alta |
| **MCP Resources** | TC-R01/R02 mencionados, sin evidencia | 🟡 Media |
| **MCP Prompts** | 0/3 prompts testeados | 🟡 Media |
| **E2E con Copilot** | No invocado desde VS Code Chat | 🔴 Alta |

---

## Tests Adicionales para @ox

### TC-UI-001: Acceso a UI

**Objetivo**: Verificar que la UI de TypedPromptsEditor carga correctamente.

**Pasos**:
1. Abrir navegador en `http://localhost:3019`
2. Verificar que carga la interfaz

**Criterios**:
| Check | Criterio |
|-------|----------|
| ✅ | Página carga sin errores de consola |
| ✅ | Monaco Editor visible |
| ✅ | Lista de schemas visible (si hay datos) |

---

### TC-UI-002: Listar Schemas en UI

**Objetivo**: Ver los schemas existentes en la interfaz.

**Pasos**:
1. Navegar a sección de Schemas
2. Verificar que aparecen los 4+ schemas que retornó TC-001

**Criterios**:
| Check | Criterio |
|-------|----------|
| ✅ | Lista muestra schemas con nombre e ID |
| ✅ | Click en schema muestra detalle |

---

### TC-UI-003: Crear Schema desde UI

**Objetivo**: Crear un schema usando la interfaz visual.

**Pasos**:
1. Click en "Nuevo Schema" o equivalente
2. Ingresar nombre: "UITestSchema"
3. Ingresar TypeScript: `interface UITest { field: string; }`
4. Guardar

**Criterios**:
| Check | Criterio |
|-------|----------|
| ✅ | Schema aparece en lista |
| ✅ | Detalle muestra TypeScript y JSON Schema |

---

### TC-UI-004: Validar Mensaje desde UI

**Objetivo**: Usar la función de validación en la UI.

**Pasos**:
1. Seleccionar un schema existente
2. Ingresar mensaje JSON a validar
3. Ejecutar validación

**Criterios**:
| Check | Criterio |
|-------|----------|
| ✅ | Mensaje válido muestra ✅ |
| ✅ | Mensaje inválido muestra errores |

---

### TC-R01: Resource typed-prompt://schemas

**Objetivo**: Verificar que el resource MCP retorna lista de schemas.

**Comando**:
```bash
curl -s -X POST "http://127.0.0.1:3020/mcp" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":100,"method":"resources/read","params":{"uri":"typed-prompt://schemas"}}'
```

**Criterios**:
| Check | Criterio |
|-------|----------|
| ✅ | Respuesta contiene array de schemas |
| ✅ | Cada schema tiene id, name |

---

### TC-R02: Resource typed-prompt://schemas/{id}

**Objetivo**: Verificar resource de schema individual.

**Comando**:
```bash
curl -s -X POST "http://127.0.0.1:3020/mcp" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":101,"method":"resources/read","params":{"uri":"typed-prompt://schemas/1"}}'
```

**Criterios**:
| Check | Criterio |
|-------|----------|
| ✅ | Retorna schema con id=1 |
| ✅ | Incluye typeScript y jsonSchema |

---

### TC-P01: Prompt study_case

**Objetivo**: Verificar que el prompt study_case genera respuesta.

**Comando**:
```bash
curl -s -X POST "http://127.0.0.1:3020/mcp" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":200,"method":"prompts/get","params":{"name":"study_case","arguments":{"context":"Sistema de gestión de tareas con usuarios y proyectos"}}}'
```

**Criterios**:
| Check | Criterio |
|-------|----------|
| ✅ | Respuesta contiene messages[] |
| ✅ | Contenido es relevante al contexto |

---

### TC-P02: Prompt suggest_ontology

**Objetivo**: Verificar prompt de sugerencia de ontologías.

**Comando**:
```bash
curl -s -X POST "http://127.0.0.1:3020/mcp" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":201,"method":"prompts/get","params":{"name":"suggest_ontology","arguments":{"domain":"Teatro"}}}'
```

**Criterios**:
| Check | Criterio |
|-------|----------|
| ✅ | Respuesta contiene messages[] |
| ✅ | Menciona schemas existentes si aplica |

---

### TC-P03: Prompt install_in_agent

**Objetivo**: Verificar prompt de instalación en agente.

**Comando**:
```bash
curl -s -X POST "http://127.0.0.1:3020/mcp" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":202,"method":"prompts/get","params":{"name":"install_in_agent","arguments":{"agentId":"aleph","schemaId":"1"}}}'
```

**Criterios**:
| Check | Criterio |
|-------|----------|
| ✅ | Respuesta contiene guía de instalación |
| ✅ | Menciona validationSchema o similar |

---

### TC-E2E-001: Invocar Tool desde VS Code Copilot

**Objetivo**: Verificar integración real con Copilot Chat.

**Pasos**:
1. Abrir VS Code con workspace aleph-scriptorium
2. Verificar que `typed-prompt-mcp-server` está en `.vscode/mcp.json`
3. Abrir Copilot Chat
4. Escribir: "Lista los schemas disponibles en typed-prompt"
5. Verificar que Copilot invoca `typed_list_schemas`

**Criterios**:
| Check | Criterio |
|-------|----------|
| ✅ | Copilot reconoce el servidor MCP |
| ✅ | Invoca tool correctamente |
| ✅ | Muestra resultados al usuario |

---

## Checklist para Demo

| # | Test | Tipo | Estado |
|---|------|------|--------|
| TC-UI-001 | Acceso a UI | UI | ⏳ |
| TC-UI-002 | Listar Schemas UI | UI | ⏳ |
| TC-UI-003 | Crear Schema UI | UI | ⏳ |
| TC-UI-004 | Validar Mensaje UI | UI | ⏳ |
| TC-R01 | Resource schemas | MCP | ⏳ |
| TC-R02 | Resource schema/{id} | MCP | ⏳ |
| TC-P01 | Prompt study_case | MCP | ⏳ |
| TC-P02 | Prompt suggest_ontology | MCP | ⏳ |
| TC-P03 | Prompt install_in_agent | MCP | ⏳ |
| TC-E2E-001 | Copilot Chat | E2E | ⏳ |

**Mínimo para demo**: TC-UI-001, TC-UI-002, TC-E2E-001

---

## Instrucciones para @ox

1. **Ejecutar tests TC-UI-001 a TC-UI-004** (navegador)
2. **Ejecutar tests TC-R01, TC-R02** (curl)
3. **Ejecutar tests TC-P01 a TC-P03** (curl)
4. **Ejecutar TC-E2E-001** (VS Code Copilot Chat)
5. **Crear acta T006** con resultados
6. Si ≥80% pasa → Listo para demo
7. Si <80% → Documentar blockers

---

## Pregunta para @ox

¿Tienes acceso a la UI en http://localhost:3019? Si el frontend no está corriendo, usar:
```bash
cd TypedPromptsEditor && npm run dev
```

---

**Firma**: @aleph  
**Fecha**: 2026-01-04T19:00:00Z
