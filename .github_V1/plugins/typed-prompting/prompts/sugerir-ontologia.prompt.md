---
name: Sugerir ontología
description: Modo Asistente - Buscar en bibliotecas existentes y sugerir ontologías relevantes para el caso de uso
applyTo: "ARCHIVO/PLUGINS/TYPED_PROMPTING/**/*"
---

# Prompt: Sugerir Ontología

> **Plugin**: TypedPrompting  
> **Modo**: Asistente  
> **Agente**: @typedprompting

## Invocación

```
@typedprompting Sugerir ontología

Dominio: {Dominio del caso de uso}
Requisitos:
- {Requisito 1}
- {Requisito 2}
- {Requisito N}

Restricciones (opcional):
- {Restricción de compatibilidad}
- {Restricción de formato}
```

---

## Flujo de Sugerencia

### 1. Consultar Bibliotecas

Buscar en las bibliotecas disponibles:

```typescript
// Bibliotecas conocidas del Scriptorium
const bibliotecas = [
  "ARCHIVO/PLUGINS/TYPED_PROMPTING/libraries/scriptorium.json",
  "ARCHIVO/PLUGINS/TYPED_PROMPTING/schemas/examples/",
];

// Búsqueda por dominio
const criterios = {
  dominio: "ARG" | "Teatro" | "DevOps" | "IoT" | "Prolog",
  etiquetas: ["validación", "comunicación", "agente"],
  compatibilidad: "ajv" | "zod" | "json-schema-draft-07"
};
```

### 2. Evaluar Relevancia

Para cada ontología encontrada, calcular puntuación:

| Factor | Peso | Descripción |
|--------|------|-------------|
| Cobertura de campos | 40% | ¿Cubre los atributos necesarios? |
| Compatibilidad | 30% | ¿Funciona con el stack objetivo? |
| Madurez | 20% | ¿Está probada en producción? |
| Extensibilidad | 10% | ¿Se puede extender sin romper? |

### 3. Presentar Sugerencias

Formato de respuesta:

```markdown
## Ontologías Sugeridas

### 1. {nombre-schema} (relevancia: 85%)

**Ubicación**: `schemas/{categoria}/{nombre}.json`

**Cobertura**:
- ✅ Campo X cubierto
- ✅ Campo Y cubierto  
- ⚠️ Campo Z requiere extensión

**Ejemplo de uso**:
```typescript
import { NombreSchema } from '@typedprompts/schemas';

const mensaje: NombreSchema = {
  campo1: "valor",
  campo2: 123
};
```

**Extensión propuesta** (si aplica):
```typescript
interface NombreSchemaExtendido extends NombreSchema {
  campoAdicional: string;
}
```

---

### 2. {otro-schema} (relevancia: 70%)
...
```

---

## Integración con MCP

Este prompt está diseñado para integrarse con `MCPTypedPromptServer`:

```typescript
// Tool: typed_suggest_ontology
const result = await mcpClient.callTool('typed_suggest_ontology', {
  useCase: "Validar consultas de usuarios",
  domain: "Teatro",
  constraints: ["compatible con Prolog", "extensible"]
});
```

---

## Ejemplos

### Ejemplo 1: Buscar para Teatro ARG

```
@typedprompting Sugerir ontología

Dominio: Teatro ARG - Comunicación entre personajes
Requisitos:
- Mensajes de diálogo
- Acciones de personaje
- Estados emocionales

Restricciones:
- Compatible con lucas.brain.pl
- Debe tener campo "intent" para Prolog
```

**Respuesta esperada**:

```
## Ontologías Sugeridas

### 1. lucas-query-request (relevancia: 95%)
Ubicación: ARCHIVO/PLUGINS/TYPED_PROMPTING/schemas/lucas-query-request.schema.json

Cobertura:
- ✅ intent (5 valores soportados)
- ✅ params (estructura flexible)
- ✅ context.sessionId para Teatro

Extensión propuesta: Ninguna necesaria
```

### Ejemplo 2: Buscar para IoT

```
@typedprompting Sugerir ontología

Dominio: IoT - Telemetría de sensores
Requisitos:
- Lecturas de temperatura
- Timestamps
- Identificador de dispositivo
```

---

## Referencias

- Biblioteca principal: `ARCHIVO/PLUGINS/TYPED_PROMPTING/libraries/scriptorium.json`
- Schemas de Lucas: `ARCHIVO/PLUGINS/TYPED_PROMPTING/schemas/lucas-*.json`
- Pack MCP: `.github/plugins/mcp-presets/packs/TypedPromptEditor.pack.json` (planificado)
