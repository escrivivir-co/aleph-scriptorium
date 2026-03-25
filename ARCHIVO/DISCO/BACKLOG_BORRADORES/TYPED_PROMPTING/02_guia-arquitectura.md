# Guía de Arquitectura — TypedPromptsEditor

> **Fecha de análisis**: 2026-01-04  
> **Versión del paquete**: 1.0.0  
> **Submódulo**: `TypedPromptsEditor/`  
> **Plugin ID**: `typed-prompting`

---

## Resumen Ejecutivo

**TypedPromptsEditor** es un editor full-stack para:
1. **Diseñar ontologías** TypeScript → JSON Schema
2. **Validar mensajes** de LLM contra schemas
3. **Gestionar bibliotecas** de contratos de comunicación
4. **Configurar proveedores IA** (OpenAI, DeepSeek, Ollama, Anthropic)

---

## 1. Stack Tecnológico

### Frontend (React 18 + Vite)

| Categoría | Tecnología | Versión |
|-----------|------------|---------|
| Framework | React | 18.3.x |
| Build | Vite | 5.4.x |
| Routing | Wouter | 3.3.x |
| State | TanStack Query | 5.60.x |
| UI Components | Radix UI | 1.x - 2.x |
| Styling | Tailwind CSS | 3.4.x |
| Icons | Lucide React | 0.475.x |
| Code Editor | Monaco Editor | 4.7.x |
| Forms | React Hook Form + Zod | 7.x + 3.x |
| i18n | React Intl | 7.1.x |

### Backend (Express + TypeScript)

| Categoría | Tecnología | Versión |
|-----------|------------|---------|
| Server | Express | 4.21.x |
| Build | TSX (dev) + ESBuild | 4.x + 0.25.x |
| ORM | Drizzle | 0.39.x |
| DB | PostgreSQL (Neon) | 0.10.x |
| Validation | Zod + AJV | 3.x + 8.x |
| API Docs | Swagger UI | 5.0.x |
| AI SDK | OpenAI | 4.85.x |

### Shared

| Categoría | Tecnología |
|-----------|------------|
| Schema Generator | ts-json-schema-generator |
| Validation | AJV + ajv-formats |
| Type Safety | Drizzle-Zod |

---

## 2. Estructura del Proyecto

```
TypedPromptsEditor/
├── package.json              # Dependencias y scripts
├── vite.config.ts            # Config Vite (frontend)
├── drizzle.config.ts         # Config Drizzle ORM
├── tsconfig.json             # Config TypeScript
├── tailwind.config.ts        # Config Tailwind
│
├── client/                   # 🎨 FRONTEND
│   ├── index.html           # Entry point HTML
│   └── src/
│       ├── App.tsx          # Router principal (wouter)
│       ├── main.tsx         # Bootstrap React
│       ├── index.css        # Tailwind imports
│       │
│       ├── pages/           # 📄 13 PÁGINAS
│       │   ├── welcome.tsx              # Home
│       │   ├── schema-creator.tsx       # Editor visual de schemas
│       │   ├── repository.tsx           # Bibliotecas de schemas
│       │   ├── validator.tsx            # Validador avanzado
│       │   ├── ai-config.tsx            # Configuración IA
│       │   ├── prompt-to-interface.tsx  # Prompt → TypeScript
│       │   ├── prompt-with-schema.tsx   # Prompts tipados
│       │   ├── interface-to-schema.tsx  # TypeScript → JSON Schema
│       │   ├── structured-conversations.tsx  # Conversaciones
│       │   ├── simple-message-validation.tsx # Validador simple
│       │   ├── sdk-docs.tsx             # Documentación SDK
│       │   └── not-found.tsx            # 404
│       │
│       ├── components/      # 🧩 COMPONENTES
│       │   ├── nav-bar.tsx              # Navegación
│       │   ├── code-editor.tsx          # Monaco wrapper
│       │   ├── schema-creator.tsx       # Editor de schema
│       │   ├── schema-selector.tsx      # Selector de schemas
│       │   ├── conversation-tree.tsx    # Árbol de conversación
│       │   ├── repository-tree.tsx      # Árbol de bibliotecas
│       │   ├── repository-search.tsx    # Búsqueda
│       │   │
│       │   ├── prompt-interface/        # 🎯 MÓDULO PRINCIPAL
│       │   │   ├── AccordionLayout.tsx
│       │   │   ├── GenerateButton.tsx
│       │   │   ├── InterfaceTable.tsx
│       │   │   ├── InterfaceViewer.tsx
│       │   │   ├── LibrarySelector.tsx
│       │   │   ├── MainContent.tsx
│       │   │   ├── ModelSelector.tsx
│       │   │   ├── PromptInput.tsx
│       │   │   ├── QueryWrapper.tsx
│       │   │   ├── RawDataSection.tsx
│       │   │   ├── ResponseSection.tsx
│       │   │   ├── ResponseViewer.tsx
│       │   │   ├── StoredPrompts.tsx
│       │   │   ├── ValidationReport.tsx
│       │   │   ├── ValidationSection.tsx
│       │   │   └── types.ts
│       │   │
│       │   └── ui/                      # 📦 shadcn/ui (45+ componentes)
│       │
│       ├── hooks/           # Custom hooks
│       ├── lib/             # Utilidades
│       └── localization/    # i18n (solo EN por ahora)
│
├── server/                   # ⚙️ BACKEND
│   ├── index.ts             # Entry point Express
│   ├── routes.ts            # Router principal
│   ├── storage.ts           # Persistencia (JSON/PostgreSQL)
│   ├── swagger.ts           # OpenAPI docs
│   ├── db.ts                # Conexión Drizzle
│   ├── vite.ts              # Middleware dev
│   │
│   ├── routes/              # 📡 8 ENDPOINTS API
│   │   ├── schema.routes.ts           # CRUD schemas
│   │   ├── library.routes.ts          # CRUD bibliotecas
│   │   ├── ai-config.routes.ts        # Config IA
│   │   ├── validation.routes.ts       # Validación
│   │   ├── interface-generation.routes.ts  # TS → JSON
│   │   ├── stored-prompts.routes.ts   # Prompts guardados
│   │   ├── client-package.routes.ts   # Export SDK
│   │   └── converter.ts               # Conversión TS→JSON
│   │
│   └── handlers/            # Lógica de negocio
│       └── model-handlers.ts
│
├── shared/                   # 🔗 CÓDIGO COMPARTIDO
│   └── schema.ts            # Tipos + Zod + Drizzle tables
│
└── data/                     # 💾 DATOS LOCALES
    └── stored-prompts.json  # Persistencia sin DB
```

---

## 3. Modelo de Datos

### Entidades Principales

```typescript
// Schema: Definición de estructura de mensajes
interface Schema {
  id: number;
  name: string;
  typeScript: string;      // Código fuente
  jsonSchema: string;      // Schema generado
  category: string;        // E-commerce, Scriptorium...
  labels: string[];        // Tags para búsqueda
  description: string;
  libraryId?: number;      // FK a Library
  createdAt: string;
}

// Library: Colección de schemas por dominio
interface Library {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}

// AIConfig: Proveedor de IA configurado
interface AIConfig {
  id: number;
  name: string;
  provider: 'openai' | 'deepseek' | 'ollama' | 'anthropic';
  apiKey: string | null;
  baseUrl: string | null;
  models: string[];
  isActive: boolean;
  settings?: string;       // JSON con params
  createdAt: string;
}

// StoredPrompt: Prompt guardado con validación
interface StoredPrompt {
  id: number;
  name: string;
  content: string;
  modelId: number;
  modelName: string;
  schemaId: number;
  modelParams: string;
  type: 'typing' | 'conversation';
  libraryId: number | null;
  libraryName: string | null;
  selectedSchemas: Array<{ id: number; name: string }>;
  rawOutgoingPrompt: string;
  rawIncomingResponse: string;
  createdAt: string;
}

// ValidationHistory: Log de validaciones
interface ValidationHistory {
  id: number;
  schemaId: number;
  prompt: string;
  response: string;
  validationReport: {
    valid: boolean;
    errors: Array<{ path: string; message: string }>;
  };
  isValid: boolean;
  createdAt: string;
}
```

---

## 4. API REST

### Endpoints Disponibles

| Método | Ruta | Descripción |
|--------|------|-------------|
| **Schemas** | | |
| GET | `/api/schemas` | Listar todos los schemas |
| POST | `/api/schemas` | Crear nuevo schema |
| GET | `/api/schemas/:id` | Obtener schema por ID |
| PUT | `/api/schemas/:id` | Actualizar schema |
| DELETE | `/api/schemas/:id` | Eliminar schema |
| **Libraries** | | |
| GET | `/api/libraries` | Listar bibliotecas |
| POST | `/api/libraries` | Crear biblioteca |
| GET | `/api/libraries/:id` | Obtener biblioteca |
| GET | `/api/libraries/:id/schemas` | Schemas de biblioteca |
| **AI Config** | | |
| GET | `/api/ai-configs` | Listar configuraciones |
| POST | `/api/ai-configs` | Crear configuración |
| PUT | `/api/ai-configs/:id` | Actualizar |
| DELETE | `/api/ai-configs/:id` | Eliminar |
| **Validation** | | |
| POST | `/api/validate` | Validar mensaje contra schema |
| GET | `/api/validation-history` | Historial de validaciones |
| **Conversion** | | |
| POST | `/api/convert/ts-to-json` | TypeScript → JSON Schema |
| POST | `/api/generate-interface` | Prompt → TypeScript |
| **Prompts** | | |
| GET | `/api/stored-prompts` | Listar prompts guardados |
| POST | `/api/stored-prompts` | Guardar prompt |

**Documentación Swagger**: `/api-docs` (cuando el servidor corre)

---

## 5. Páginas del Frontend

| Página | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| Welcome | `/` | Home con overview | ✅ |
| Schema Creator | `/schema-creator` | Editor visual de TypeScript | ✅ |
| Repository | `/repository` | Bibliotecas y búsqueda | ✅ |
| Validator | `/validator` | Validación avanzada | ✅ |
| AI Config | `/ai-config` | Configurar proveedores IA | ✅ |
| Prompt to Interface | `/prompt-to-interface` | Generar TS desde prompt | ✅ |
| Prompt with Schema | `/prompt-with-schema` | Prompts tipados | ✅ |
| Interface to Schema | `/interface-to-schema` | TS → JSON Schema | ✅ |
| Structured Conversations | `/structured-conversations` | Conversaciones | ✅ |
| Simple Validation | `/simple-message-validation` | Validador rápido | ✅ |
| SDK Docs | `/sdk-docs` | Documentación | ✅ |

---

## 6. Scripts NPM

| Script | Comando | Descripción |
|--------|---------|-------------|
| `dev` | `tsx server/index.ts` | Desarrollo con hot-reload |
| `build` | `vite build && esbuild...` | Build producción |
| `start` | `node dist/index.js` | Producción |
| `check` | `tsc` | Verificar tipos |
| `db:push` | `drizzle-kit push` | Migrar DB |

---

## 7. Modos de Persistencia

### Modo Local (JSON)

Sin configurar `DATABASE_URL`, usa archivos JSON en `data/`:

```
data/
├── stored-prompts.json    # Prompts guardados
├── schemas.json           # Schemas (auto-generado)
└── libraries.json         # Bibliotecas (auto-generado)
```

### Modo PostgreSQL (Neon)

Con `DATABASE_URL` configurada:

```env
DATABASE_URL=postgresql://user:pass@host:5432/db
```

Tablas Drizzle:
- `schemas`
- `libraries`
- `validation_histories`

---

## 8. Proveedores de IA Soportados

| Proveedor | Models | Base URL |
|-----------|--------|----------|
| OpenAI | gpt-4, gpt-4-turbo, gpt-3.5-turbo | api.openai.com/v1 |
| DeepSeek | deepseek-chat, deepseek-coder | api.deepseek.com/v1 |
| Ollama | llama2, codellama, mistral | localhost:11434 |
| Anthropic | claude-3-* | api.anthropic.com |

### Modelo "Dummy" (desarrollo)

```json
{
  "name": "Dummy Model",
  "provider": "openai",
  "baseUrl": "http://localhost:3019",
  "models": ["dummy"]
}
```

---

## 9. Integración con Scriptorium

### Estado Actual del Plugin

| Componente | Estado | Ubicación |
|------------|--------|-----------|
| Manifest | ✅ | `.github/plugins/typed-prompting/manifest.md` |
| Agente | ✅ | `.github/plugins/typed-prompting/agents/` |
| Instrucciones | ✅ | `.github/plugins/typed-prompting/instructions/` |
| Prompts | 🟡 2/4 | `.github/plugins/typed-prompting/prompts/` |
| Bridge | ✅ | `.github/agents/plugin_ox_typedprompting.agent.md` |
| Datos | ⏳ | `ARCHIVO/PLUGINS/TYPED_PROMPTING/` |

### Prompts Pendientes

| Prompt | Archivo | Estado |
|--------|---------|--------|
| estudiar-caso-uso | ✅ Existe | ✅ |
| instalar-en-agente | ✅ Existe | ✅ |
| sugerir-ontologia | ⏳ Falta | ❌ |
| instalar-en-flujo-arg | ⏳ Falta | ❌ |

### Handoffs Disponibles

Desde `@plugin_ox_typedprompting`:

1. **Diseñar ontología (Asistente)** → Analiza caso de uso
2. **Sugerir ontología existente** → Busca en bibliotecas
3. **Instalar reglas en agente (Gestor)** → Añade `validationSchema`
4. **Instalar protocolo en flujo ARG** → Define contratos
5. **Validar mensaje contra schema** → Verificación
6. **Abrir editor web** → localhost:3019

---

## 10. Requerimientos para Upgrade

### Node.js

- **Mínimo**: Node.js 18+
- **Recomendado**: Node.js 20 LTS

### Dependencias Desactualizadas

| Paquete | Actual | Última | Prioridad |
|---------|--------|--------|-----------|
| vite | 5.4.14 | 6.x | 🟡 Media |
| typescript | 5.6.3 | 5.7.x | 🟢 Baja |
| openai | 4.85.4 | 4.90+ | 🟢 Baja |

### Acciones Recomendadas

1. **Inmediato**: Completar prompts faltantes (2)
2. **Corto plazo**: Crear schemas de ejemplo en `ARCHIVO/PLUGINS/TYPED_PROMPTING/`
3. **Medio plazo**: Integrar con AGENT_CREATOR (S06 del backlog)
4. **Opcional**: Upgrade a Vite 6.x (breaking changes menores)

---

## 11. Comandos de Desarrollo

### Arrancar en Desarrollo

```bash
cd TypedPromptsEditor
npm install
npm run dev
# → http://localhost:3019
```

### Build y Producción

```bash
npm run build
npm start
# → http://localhost:3019
```

### Con PostgreSQL

```bash
export DATABASE_URL="postgresql://..."
npm run db:push
npm run dev
```

---

## 12. Mapeo con Tasks del Backlog

| Story | Estado Backlog | Estado Real |
|-------|----------------|-------------|
| S01 Estructura Plugin | 🔄 | ✅ Completado |
| S02 Estudiar Caso Uso | ⏳ | 🟡 Prompt existe |
| S03 Sugerir Ontología | ⏳ | ❌ Prompt falta |
| S04 Instalar en Agente | ⏳ | 🟡 Prompt existe |
| S05 Instalar en ARG | ⏳ | ❌ Prompt falta |
| S06 AGENT_CREATOR | ⏳ | ⏳ Pendiente |
| S07 Documentación | ⏳ | 🟡 Parcial |

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-01-04 | Crear guía de arquitectura | @ox |
