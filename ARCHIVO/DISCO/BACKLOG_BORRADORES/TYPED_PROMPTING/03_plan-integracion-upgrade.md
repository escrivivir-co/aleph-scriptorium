# Plan de Integración y Upgrade — TypedPromptsEditor

> **Fecha**: 2026-01-04  
> **Épica**: SCRIPT-1.11.0  
> **Estado backlog original**: 0% (sin tasks completadas)  
> **Estado real detectado**: ~40% (estructura plugin existe)

---

## 1. Gap Analysis

### Lo que EXISTE vs Lo que FALTA

| Componente | Backlog dice | Realidad | Gap |
|------------|--------------|----------|-----|
| **manifest.md** | T001 ⏳ | ✅ Existe y completo | Ninguno |
| **Agent principal** | T002 ⏳ | ✅ Existe | Ninguno |
| **Instructions** | T003 ⏳ | ✅ Existe (275 líneas) | Ninguno |
| **ARCHIVO/PLUGINS/TYPED_PROMPTING/** | T004-T006 ⏳ | ⚠️ No verificado | Crear estructura |
| **Bridge plugin_ox** | T007 ⏳ | ✅ Existe | Ninguno |
| **Prompt estudiar-caso-uso** | T008 ⏳ | ✅ Existe | Ninguno |
| **Prompt sugerir-ontologia** | T012 ⏳ | ❌ No existe | **Crear** |
| **Prompt instalar-en-agente** | T016 ⏳ | ✅ Existe | Ninguno |
| **Prompt instalar-en-flujo-arg** | T021 ⏳ | ❌ No existe | **Crear** |

### Discrepancia Backlog ↔ Realidad

El backlog muestra 0% avance pero la realidad es:

- **S01 (Estructura)**: ✅ **Completado** (7/7 tasks)
- **S02-S05 (Modos)**: 🟡 **Parcial** (2/4 prompts existen)
- **S06-S07**: ⏳ **Pendiente**

**Acción requerida**: Actualizar backlog a estado real.

---

## 2. Estructura ARCHIVO Pendiente

### Crear en `ARCHIVO/PLUGINS/TYPED_PROMPTING/`

```
ARCHIVO/PLUGINS/TYPED_PROMPTING/
├── README.md                    # Documentación del plugin
├── schemas/
│   ├── examples/
│   │   ├── consulta-usuario.json
│   │   ├── respuesta-agente.json
│   │   └── auditoria-bandera.json
│   └── custom/                  # Vacío (usuario crea aquí)
├── libraries/
│   ├── scriptorium.json         # Biblioteca core
│   └── custom/                  # Vacío (usuario crea aquí)
└── validation-logs/             # Logs de validación
```

---

## 3. Prompts Faltantes

### 3.1 sugerir-ontologia.prompt.md

```markdown
---
mode: assistant
description: Buscar y sugerir ontologías existentes en las bibliotecas del Scriptorium.
---

# Prompt: Sugerir Ontología

## Contexto
El usuario necesita una ontología para comunicación entre agentes pero no sabe si ya existe una adecuada.

## Instrucciones

1. **Preguntar dominio**: ¿Qué tipo de comunicación necesitas? (agente-usuario, agente-agente, flujo ARG)

2. **Buscar en bibliotecas**:
   - Consultar `ARCHIVO/PLUGINS/TYPED_PROMPTING/libraries/`
   - Buscar schemas con tags relevantes
   - Ordenar por relevancia

3. **Presentar opciones**:
   - Mostrar top 3 schemas candidatos
   - Explicar pros/contras de cada uno
   - Indicar si requiere adaptación

4. **Ofrecer acciones**:
   - Usar schema existente tal cual
   - Adaptar schema existente
   - Crear schema nuevo desde cero

## Ejemplo de respuesta

"He encontrado 3 schemas que podrían servirte:

1. **consulta-usuario** (Scriptorium library)
   - Pros: Simple, validado en producción
   - Contras: No incluye campo de urgencia
   
2. **dialogo-agente** (Custom library)
   - Pros: Incluye metadata de contexto
   - Contras: Más complejo de implementar

¿Quieres que adapte alguno o prefieres crear uno nuevo?"
```

### 3.2 instalar-en-flujo-arg.prompt.md

```markdown
---
mode: manager
description: Definir contratos de comunicación entre personajes de una obra ARG.
---

# Prompt: Instalar Protocolo en Flujo ARG

## Contexto
El usuario quiere definir cómo se comunican los personajes de una obra ARG_BOARD.

## Instrucciones

1. **Identificar obra**: ¿Qué obra ARG quieres configurar?

2. **Listar personajes**: Obtener personajes de la obra desde `ARCHIVO/PLUGINS/ARG_BOARD/obras/`

3. **Definir contratos**: Para cada par de personajes que interactúan:
   - Schema de mensajes A→B
   - Schema de mensajes B→A
   - Modo de enforcement (strict/warn)

4. **Generar communicationProtocol**:

```json
{
  "version": "1.0.0",
  "contracts": {
    "tarotista→usuario": "schema-lectura-tarot",
    "usuario→tarotista": "schema-pregunta-consulta"
  },
  "enforcement": "warn"
}
```

5. **Instalar en obra**: Añadir campo `communicationProtocol` a la configuración de la obra.

## Resultado

Actualizar el archivo de la obra con el protocolo definido y confirmar la instalación.
```

---

## 4. Plan de Upgrade (Priorizado)

### Fase 1: Corrección de Estado (Inmediato)

| Tarea | Esfuerzo | Prioridad |
|-------|----------|-----------|
| Actualizar backlog con estado real | 15 min | 🔴 Alta |
| Crear `ARCHIVO/PLUGINS/TYPED_PROMPTING/` | 20 min | 🔴 Alta |
| Crear prompt `sugerir-ontologia` | 30 min | 🔴 Alta |
| Crear prompt `instalar-en-flujo-arg` | 30 min | 🔴 Alta |

**Total Fase 1**: ~1.5 horas

### Fase 2: Schemas de Ejemplo (Corto plazo)

| Tarea | Esfuerzo | Prioridad |
|-------|----------|-----------|
| Crear 3 schemas ejemplo (Scriptorium) | 1 hora | 🟡 Media |
| Crear biblioteca scriptorium.json | 30 min | 🟡 Media |
| Documentar en README del plugin | 30 min | 🟡 Media |

**Total Fase 2**: ~2 horas

### Fase 3: Integración AGENT_CREATOR (Medio plazo)

| Tarea | Esfuerzo | Prioridad |
|-------|----------|-----------|
| Modificar receta.json para soportar validationSchema | 2 horas | 🟡 Media |
| Añadir paso en wizard de creación | 2 horas | 🟡 Media |
| Tests de integración | 1 hora | 🟡 Media |

**Total Fase 3**: ~5 horas

### Fase 4: Upgrade Dependencias (Opcional)

| Tarea | Esfuerzo | Riesgo |
|-------|----------|--------|
| Upgrade Vite 5 → 6 | 2 horas | 🟡 Breaking changes |
| Upgrade OpenAI SDK | 30 min | 🟢 Compatible |
| Upgrade TypeScript | 30 min | 🟢 Compatible |

**Total Fase 4**: ~3 horas (si se decide hacer)

---

## 5. Ejecución Local (Verificado)

### Prerequisitos

```bash
# Verificar Node.js
node --version  # >= 18.0.0

# Verificar npm
npm --version
```

### Arranque

```bash
cd TypedPromptsEditor
npm install
npm run dev

# Abrir en navegador
# http://localhost:3019
```

### Verificar API

```bash
# Swagger docs
curl http://localhost:3019/api-docs

# Listar schemas
curl http://localhost:3019/api/schemas

# Listar AI configs
curl http://localhost:3019/api/ai-configs
```

---

## 6. Integración con Tareas en Curso

### Conexión con otras épicas FC1

| Épica | Relación |
|-------|----------|
| PROLOG-PROMPTS-1.0.0 | Schemas para queries Prolog |
| TEATRO-PROLOG-1.0.0 | Contratos personaje↔usuario |
| COWORK-1.0.0 | Validación entre agentes |

### Sinergias

- Los schemas de TypedPrompting pueden **validar respuestas Prolog**
- Los contratos ARG pueden **usar schemas como protocolo**
- El cotrabajo multi-agente se beneficia de **mensajes validados**

---

## 7. Decisiones Pendientes

| Decisión | Opciones | Recomendación |
|----------|----------|---------------|
| Puerto del servidor | 5000 (actual) vs 5002 (evitar colisión) | Mantener 5000 |
| DB en producción | JSON local vs PostgreSQL | JSON para MVP, PG para prod |
| Task en tasks.json | Añadir o no | Sí, añadir como `TPE: Start [Server]` |

---

## 8. Acciones Inmediatas

### Para @scrum

1. Actualizar backlog-borrador con estado real
2. Cerrar S01 como completada
3. Añadir tasks de Fase 1 a sprint activo

### Para @aleph

1. Crear prompts faltantes
2. Crear estructura ARCHIVO
3. Verificar arranque local

### Para @ox

1. Actualizar AGENTS.md si cambian handoffs
2. Documentar en índice de plugins

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-01-04 | Crear plan de integración | @ox |
