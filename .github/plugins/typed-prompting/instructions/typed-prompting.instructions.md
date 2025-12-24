---
name: TypedPrompting (ontologías y validación)
description: Contexto y reglas para gestión de ontologías y validación de conversaciones NL↔JSON.
applyTo: "ARCHIVO/PLUGINS/TYPED_PROMPTING/**/*.json, .github/plugins/typed-prompting/**/*.md, alephscript-typed-prompting/**/*"
---

# Instrucciones: Plugin TypedPrompting

> **Fuente de verdad**: `ARCHIVO/PLUGINS/TYPED_PROMPTING/`  
> **Submódulo**: `alephscript-typed-prompting/`

## Qué es TypedPrompting

TypedPrompting es un **sistema de validación de conversaciones** que permite:

1. **Diseñar ontologías** en TypeScript que se convierten a JSON Schema
2. **Validar mensajes** de LLM contra schemas definidos
3. **Crear contratos** de comunicación entre agentes
4. **Instalar reglas** en agentes y flujos ARG

---

## Conceptos Clave

### Schema

Un schema define la estructura esperada de un mensaje:

```typescript
// TypeScript (fuente)
interface ConsultaUsuario {
  pregunta: string;
  contexto?: string;
  urgencia: 'baja' | 'media' | 'alta';
}

// JSON Schema (generado)
{
  "type": "object",
  "properties": {
    "pregunta": { "type": "string" },
    "contexto": { "type": "string" },
    "urgencia": { "enum": ["baja", "media", "alta"] }
  },
  "required": ["pregunta", "urgencia"]
}
```

### Biblioteca

Colección de schemas relacionados por dominio:

```json
{
  "id": 1,
  "name": "Scriptorium Agents",
  "description": "Schemas para comunicación entre agentes del Scriptorium",
  "schemas": ["consulta-usuario", "respuesta-agente", "auditoria-bandera"]
}
```

### Contrato de Comunicación

Definición de qué mensajes pueden intercambiarse:

```
Agente A ──[schema-request]──▶ Agente B
Agente B ──[schema-response]──▶ Agente A
```

---

## Modos de Operación

### Modo Asistente

Para usuarios que necesitan diseñar ontologías:

| Acción | Descripción |
|--------|-------------|
| Estudiar caso de uso | Analizar requisitos y proponer estructura |
| Sugerir ontología | Buscar en bibliotecas y recomendar |
| Crear schema visual | Abrir editor web interactivo |
| Importar ontología | Cargar desde archivo o URL |

### Modo Gestor

Para instalar reglas en el sistema:

| Acción | Descripción |
|--------|-------------|
| Instalar en agente | Añadir validationSchema a receta |
| Instalar en flujo ARG | Definir communicationProtocol |
| Exportar biblioteca | Generar paquete reutilizable |
| Validar mensaje | Verificar contra schema |

---

## Estructura de Datos

### Campo validationSchema (para agentes)

Se añade a la receta del agente en AGENT_CREATOR:

```json
{
  "name": "mi-agente",
  "base": ["aleph"],
  "validationSchema": {
    "input": ["schema-consulta"],
    "output": ["schema-respuesta"],
    "mode": "strict"
  }
}
```

**Modos disponibles**:

| Modo | Comportamiento |
|------|----------------|
| `strict` | Rechaza mensajes inválidos (no procesa) |
| `warn` | Advierte en log pero procesa |
| `log` | Solo registra, no afecta flujo |

### Campo communicationProtocol (para ARG)

Se añade a la obra en ARG_BOARD:

```json
{
  "id": "mi-obra",
  "titulo": "Demo",
  "communicationProtocol": {
    "version": "1.0.0",
    "contracts": {
      "tarotista→usuario": "schema-lectura",
      "usuario→tarotista": "schema-pregunta"
    },
    "enforcement": "warn"
  }
}
```

---

## Ubicación de Archivos

| Tipo | Ruta |
|------|------|
| Schemas del usuario | `ARCHIVO/PLUGINS/TYPED_PROMPTING/schemas/custom/` |
| Schemas de ejemplo | `ARCHIVO/PLUGINS/TYPED_PROMPTING/schemas/examples/` |
| Bibliotecas | `ARCHIVO/PLUGINS/TYPED_PROMPTING/libraries/` |
| Logs de validación | `ARCHIVO/PLUGINS/TYPED_PROMPTING/validation-logs/` |
| Datos del submódulo | `alephscript-typed-prompting/data/` |

---

## Integración con Banderas

Los auditores pueden usar schemas para validar:

| Bandera | Uso |
|---------|-----|
| @blueflag | Schema de evidencia (claims verificables) |
| @blackflag | Schema de poder (actores, intereses) |
| @redflag | Schema de recursos (materiales, costes) |
| @yellowflag | Schema de límites (condiciones, excepciones) |
| @orangeflag | Schema de registro (género, estilo) |

---

## Flujo Típico

### 1. Diseñar Schema

```
Usuario → "Necesito validar consultas de usuarios"
     │
     ▼
@typedprompting → Analiza caso de uso
     │
     ▼
Propone → interface ConsultaUsuario { ... }
     │
     ▼
Usuario → Aprueba o modifica
     │
     ▼
Sistema → Genera JSON Schema y guarda
```

### 2. Instalar en Agente

```
Usuario → "Instala este schema en @revisor"
     │
     ▼
@typedprompting → Localiza receta de revisor
     │
     ▼
Añade → validationSchema al JSON
     │
     ▼
Usuario → Confirma
     │
     ▼
Sistema → Guarda receta actualizada
```

### 3. Validar Mensaje

```
Mensaje entrante → { "pregunta": "...", "urgencia": "alta" }
     │
     ▼
Validador → Compara con JSON Schema
     │
     ├── ✅ Válido → Procesar mensaje
     └── ❌ Inválido → Según modo (strict/warn/log)
```

---

## Servidor Web

El submódulo incluye servidor de desarrollo:

```bash
cd alephscript-typed-prompting
npm install
npm run dev
# http://localhost:5000
```

### API REST

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/schemas` | GET | Listar schemas |
| `/api/schemas` | POST | Crear schema |
| `/api/validate` | POST | Validar mensaje |
| `/api/convert` | POST | TypeScript → JSON Schema |
| `/api/libraries` | GET | Listar bibliotecas |

Documentación Swagger: `/api-docs`

---

## Lo que NO hacer

- **No crear schemas sin caso de uso claro**: El schema debe servir un propósito
- **No usar modo strict en desarrollo**: Empezar con warn o log
- **No mezclar dominios**: Una biblioteca = un contexto semántico
- **No ignorar errores de validación**: Siempre investigar fallos
- **No hardcodear API keys**: Usar variables de entorno

---

## Dependencias Opcionales

| Plugin | Integración |
|--------|-------------|
| AGENT_CREATOR | Campo validationSchema en recetas |
| ARG_BOARD | Campo communicationProtocol en obras |
| MCP_PRESETS | Sincronización de AIConfigs |

---

## Referencias

- Manifest: `.github/plugins/typed-prompting/manifest.md`
- Agente: `.github/plugins/typed-prompting/agents/typed-prompting.agent.md`
- Submódulo: `alephscript-typed-prompting/README-SCRIPTORIUM.md`
- Backlog: `ARCHIVO/DISCO/BACKLOG_BORRADORES/TYPED_PROMPTING/`
