# Conversación PO↔SM: TypedPrompting

> **Fecha**: 2025-12-24  
> **Submódulo**: `alephscript-typed-prompting`  
> **URL**: https://github.com/escrivivir-co/alephscript-typed-prompting  
> **Estado**: ✅ Aprobado para backlog

---

## Contexto de la Instalación

**Submódulo instalado**: `alephscript-typed-prompting` (#12 de 12)  
**Rama de integración**: `integration/beta/scriptorium`  
**Modo**: Consultivo → Autónomo (tras aprobación)

---

## Análisis Técnico del Submódulo

### Arquitectura

| Aspecto | Descripción |
|---------|-------------|
| **Tipo** | Aplicación web full-stack (Node + React) |
| **Frontend** | React + Vite + Tailwind + Radix UI + Monaco Editor |
| **Backend** | Express + Drizzle ORM + PostgreSQL (Neon) |
| **API** | REST con Swagger documentado |
| **Validación** | AJV (JSON Schema) + Zod |
| **IA** | OpenAI, DeepSeek, Ollama, Anthropic |
| **Puerto** | 3019 (desarrollo) |

### Entidades Principales

```typescript
// Schema: Definiciones TypeScript ↔ JSON Schema
interface Schema {
  id: number;
  name: string;
  typeScript: string;      // Código TypeScript
  jsonSchema: string;      // JSON Schema generado
  category: string;
  labels: string[];
  description: string;
  libraryId: number | null;
}

// Library: Colecciones de schemas
interface Library {
  id: number;
  name: string;
  description: string;
}

// StoredPrompt: Prompts tipados
interface StoredPrompt {
  id: number;
  name: string;
  content: string;
  type: 'typing' | 'conversation';
  schemaId: number;
  modelId: number;
  selectedSchemas: Array<{id: number; name: string}>;
  rawOutgoingPrompt: string;
  rawIncomingResponse: string;
}

// ValidationHistory: Historial de validaciones
interface ValidationHistory {
  id: number;
  schemaId: number;
  prompt: string;
  response: string;
  validationReport: { valid: boolean; errors: Array<{path: string; message: string}> };
  isValid: boolean;
}

// AIConfig: Configuraciones de proveedores
interface AIConfig {
  id: number;
  name: string;
  provider: 'openai' | 'deepseek' | 'ollama' | 'anthropic';
  apiKey: string | null;
  baseUrl: string | null;
  models: string[];
  isActive: boolean;
}
```

### Páginas del Frontend (Funcionalidades)

| Página | Función | Mapeo Scriptorium |
|--------|---------|-------------------|
| `interface-to-schema` | Convertir TypeScript → JSON Schema | Gestor |
| `prompt-to-interface` | Generar interface desde prompt | Asistente |
| `prompt-with-schema` | Prompts tipados con validación | Gestor |
| `simple-message-validation` | Validar mensajes contra schema | Gestor |
| `structured-conversations` | Conversaciones estructuradas | Asistente |
| `schema-creator` | Editor visual de schemas | Asistente |
| `repository` | Gestión de bibliotecas | Ambos |
| `validator` | Validador de respuestas | Gestor |
| `sdk-docs` | Documentación de la API | — |

---

## Instrucciones del PO

> **Transcripción literal**:
>
> "Básicamente, todos los agentes deben tener acceso a las funcionalidades de este plugin TypedPrompting.
>
> Cuando examines la codebase verás que es un editor de ontologías y esquemas para que se puedan hacer validación de conversación entre el lenguaje natural de las conversaciones y datos estructurados para json que luego usar para mejorar Scriptorium o para la capa de usuario.
>
> Los casos de uso serían:
>
> - **Asistente**: Ayuda al usuario para mapear ontologías y para importarlas. Estudio de caso de uso para sugerir una ontología o protocolo de validación.
> - **Gestor**: Instalación de conjuntos de reglas en un agente o en un flujo ARG_BOARD. Este proveerá a los agentes que participan de una guía de como deberán comunicarse con los otros agentes y el usuario."

---

## Análisis del SM

### Viabilidad: ✅ VIABLE

**Razones**:

1. **Complementa el pipeline existente**:
   - ARG_BOARD define **qué** hacen los agentes (roles, personajes, obras)
   - TypedPrompting define **cómo se comunican** (schemas, validación)
   - Es la pieza que falta para **contratos de comunicación**

2. **Encaja con la arquitectura de plugins**:
   - El patrón "todos los agentes acceden" se resuelve con un **plugin transversal**
   - Similar a cómo funciona `mcp-presets` (capacidades compartidas)

3. **Casos de uso concretos**:
   - Validar respuestas de LLM antes de procesarlas
   - Generar schemas desde prompts para nuevos flujos
   - Documentar contratos entre agentes en obras ARG

4. **Integración natural con plugins existentes**:
   - `agent-creator`: Campo `validationSchema` en recetas
   - `arg-board`: Schemas de comunicación entre personajes
   - `mcp-presets`: Schemas para herramientas MCP

### Riesgos Identificados

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Requiere PostgreSQL/Neon | Alta | Medio | Modo offline con JSON local |
| UI web separada (no VS Code) | Media | Bajo | Documentar como herramienta externa |
| Complejidad de schemas | Media | Medio | Templates predefinidos |
| Dependencia de IA externa | Alta | Medio | Soporte Ollama local |

### Mapeo Ontológico con Scriptorium

| Concepto TypedPrompting | Concepto Scriptorium | Relación |
|-------------------------|----------------------|----------|
| Schema | Contrato de comunicación | Los agentes usan schemas para validar mensajes |
| Library | Biblioteca de contratos | Agrupación por dominio (ARG, Teatro, Fundación) |
| StoredPrompt | Prompt tipado | Template reutilizable con validación |
| ValidationHistory | Log de auditoría | Registro de comunicaciones validadas |
| AIConfig | MCP Preset | Configuración de proveedor |

### Mapeo con Banderas

| Bandera | Uso de TypedPrompting |
|---------|----------------------|
| @blueflag | Validar que respuestas cumplan schema (evidencia) |
| @blackflag | Detectar respuestas malformadas (captura) |
| @redflag | Verificar schemas de recursos materiales |
| @yellowflag | Alertar sobre límites de traducción NL↔JSON |
| @orangeflag | Validar registro de conversaciones |

---

## Propuesta de Plugin

### Nombre: `typed-prompting`

### Modos de Operación

| Modo | Función | Handoffs |
|------|---------|----------|
| **Asistente** | Guía interactiva para diseñar ontologías | Estudiar caso de uso, Sugerir schema, Importar ontología |
| **Gestor** | Instalación de reglas en agentes/flujos | Instalar en agente, Instalar en flujo ARG, Exportar biblioteca |

### Arquitectura de Integración

```
┌─────────────────────────────────────────────────────────────────────┐
│                     SCRIPTORIUM                                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   ┌───────────────┐      ┌───────────────┐      ┌───────────────┐    │
│   │ AGENT_CREATOR │─────▶│TYPED_PROMPTING│◀─────│   ARG_BOARD   │    │
│   │               │      │               │      │               │    │
│   │  Campo:       │      │  Schemas      │      │  Contratos    │    │
│   │  validSchema  │      │  Libraries    │      │  personajes   │    │
│   └───────────────┘      └───────┬───────┘      └───────────────┘    │
│                                  │                                    │
│                                  ▼                                    │
│                         ┌───────────────┐                            │
│                         │  MCP_PRESETS  │                            │
│                         │  (AIConfigs)  │                            │
│                         └───────────────┘                            │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Stories Propuestas

| ID | Story | Puntos | Prioridad |
|----|-------|--------|-----------|
| S01 | Estructura plugin + bridge | 2 | Must |
| S02 | Modo Asistente: Estudiar caso de uso | 3 | Must |
| S03 | Modo Asistente: Sugerir ontología | 3 | Should |
| S04 | Modo Gestor: Instalar reglas en agente | 5 | Must |
| S05 | Modo Gestor: Instalar reglas en flujo ARG | 5 | Must |
| S06 | Integración con AGENT_CREATOR | 3 | Should |
| S07 | Documentación y tests | 2 | Must |

**Total estimado**: 23 puntos (1 Feature Cycle)

---

## Decisión

**✅ APROBADO** para generar backlog borrador.

El plugin `typed-prompting` se creará como plugin transversal con:
- Bridge en `.github/agents/plugin_ox_typedprompting.agent.md`
- Manifest en `.github/plugins/typed-prompting/manifest.md`
- Datos en `ARCHIVO/PLUGINS/TYPED_PROMPTING/`

---

## Próximos Pasos

1. ✅ Crear `01_backlog-borrador.md`
2. ✅ Crear `README-SCRIPTORIUM.md` en submódulo
3. ⏳ Crear estructura de plugin
4. ⏳ Crear bridge agent
5. ⏳ Actualizar `registry.json`
6. ⏳ Actualizar `setup-workspace.sh`
7. ⏳ Commits separados
