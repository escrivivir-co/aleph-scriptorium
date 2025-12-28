# Crítica de Ingeniería de Prompting: Pathykar.inner.md

**Fecha**: 2025-12-28  
**Documento analizado**: `Pathykar.inner.md` (8849 líneas)  
**Tipo de documento**: Dump de request de Copilot Chat (panel/editAgent)  
**Analista**: @periodico (método 5W + Banderas aplicado al propio sistema)

---

## Resumen Ejecutivo

**Pathykar.inner.md es un documento problemático desde la perspectiva de ingeniería de prompting.** Contiene un dump completo de una solicitud a Copilot Chat que incluye:

- Metadatos de la request (líneas 1-33)
- System prompt completo (líneas 35-127)
- **23 attachments embebidos completos** (líneas 129-5563)
- Mensajes de usuario (líneas 5566-7477)
- Respuesta del modelo (líneas 7478-8849)

### Métricas de Contexto

| Métrica | Valor | Problema |
|---------|-------|----------|
| **Tokens de prompt** | 117,877 | 92% del límite de 128K |
| **Tokens cacheados** | 115,430 | 98% redundante |
| **Líneas totales** | 8,849 | Inmanejable para humanos |
| **Attachments** | 23 | Mayoría innecesarios para la tarea |
| **Ratio señal/ruido** | ~3% | Solo ~250 líneas son la tarea real |

---

## Fase 1: Diagnóstico Estructural (5W)

### WHO: ¿Quién produce este documento?

- **Productor técnico**: VS Code Copilot Chat (panel/editAgent)
- **Usuario real**: El operador humano del Scriptorium
- **Problema**: El documento mezcla metadatos de sistema con contenido de trabajo, sin separación clara

### WHAT: ¿Qué contiene exactamente?

| Sección | Líneas | % del doc | Contenido |
|---------|--------|-----------|-----------|
| Metadatos | 1-33 | 0.4% | Request ID, tokens, modelo |
| System prompt | 35-127 | 1% | Instrucciones base de Copilot |
| **Attachments** | 129-5563 | **61%** | 23 archivos completos embebidos |
| Instructions list | 5500-5565 | 0.7% | Lista de instrucciones aplicables |
| User messages | 5566-7477 | 22% | 3 turnos de conversación |
| Response | 7478-8849 | 15% | Respuesta del modelo |

**Hallazgo crítico**: El 61% del documento son attachments que el sistema incluyó automáticamente, la mayoría irrelevantes para la tarea específica.

### WHERE: ¿Dónde se rompe la coherencia?

1. **Línea 129**: Comienza cascade de attachments no solicitados
2. **Líneas 129-857**: `periodico.instructions.md` y `submodulo-integracion.instructions.md` completos (irrelevantes para tarea MMCO)
3. **Líneas 858-1240**: `scrum-protocol.instructions.md` (útil pero redundante)
4. **Líneas 1586-1730**: `copilot-instructions.md` (ya está en system prompt)
5. **Líneas 1731-1992**: `DEVOPS.md` completo (parcialmente relevante)
6. **Líneas 1993-2442**: `BACKLOG-SCRIPTORIUM.md` completo (relevante pero extenso)
7. **Líneas 2514-3148**: `ox.agent.md` completo (aparece 2 veces en el documento)

### WHEN: ¿Cuándo ocurre el problema?

- **Timestamp**: 2025-12-28T01:26:58.947Z
- **Duración**: 15962ms (16 segundos)
- **Problema temporal**: El 98% de tokens estaban cacheados, indicando que esta conversación heredó contexto masivo de turnos anteriores

### WHY: ¿Por qué ocurre?

**Causas identificadas**:

1. **Auto-inclusión de instructions**: El sistema `applyTo` incluye automáticamente archivos por patrón glob
2. **Sin filtrado de relevancia**: Todo archivo que matchea un patrón se incluye completo
3. **Attachments manuales redundantes**: El usuario adjuntó archivos que ya estaban en context automático
4. **Herencia de contexto**: Los 115,430 tokens cacheados sugieren acumulación de turnos previos

---

## Fase 2: Auditoría de Banderas

### 🔵 Blueflag (Verdad/Evidencia)

**Test de Evidencia**:
- ¿Los attachments incluidos son necesarios para la tarea?
- **Veredicto**: ❌ NO. De 23 attachments, solo 5-6 son relevantes para "ejecutar taller MMCO Editor"

**Attachments necesarios vs. incluidos**:

| Attachment | Necesario | Incluido | Veredicto |
|------------|-----------|----------|-----------|
| `periodico-taller-mmco.prompt.md` | ✅ Sí | ✅ Sí | ✅ Correcto |
| `conversacion.md` | ✅ Sí | ✅ Sí (2 veces) | ⚠️ Duplicado |
| `pathykar.agent.md` | ✅ Sí | ✅ Sí | ✅ Correcto |
| `periodico.agent.md` | ✅ Sí | ✅ Sí | ✅ Correcto |
| `ox.agent.md` | ✅ Sí | ✅ Sí (2 veces) | ⚠️ Duplicado |
| `BACKLOG-SCRIPTORIUM.md` | ⚠️ Parcial | ✅ Completo | ⚠️ Excesivo |
| `periodico.instructions.md` | ❌ No | ✅ Completo | ❌ Innecesario |
| `submodulo-integracion.instructions.md` | ❌ No | ✅ Completo | ❌ Innecesario |
| `foro-scraper.instructions.md` | ❌ No | ✅ Completo | ❌ Innecesario |
| `copilot-instructions.md` | ❌ No (ya en system) | ✅ Completo | ❌ Redundante |
| `DEVOPS.md` | ⚠️ Parcial | ✅ Completo | ⚠️ Excesivo |
| `PLUGINS.md` | ❌ No | ✅ Completo | ❌ Innecesario |
| `plugin-manager.agent.md` | ❌ No | ✅ Completo | ❌ Innecesario |
| `registry.json` | ❌ No | ✅ Completo | ❌ Innecesario |
| `indice.agent.md` | ❌ No | ✅ Completo | ❌ Innecesario |
| `aleph.agent.md` | ⚠️ Parcial | ✅ Completo | ⚠️ Excesivo |

**Diagnóstico Blueflag**: 
> El sistema incluye ~70,000 tokens de contexto irrelevante porque los patrones glob de `applyTo` son demasiado amplios.

---

### ⚫ Blackflag (Poder/Captura)

**Test de Captura del Contexto**:
- ¿Quién controla qué entra en el contexto?
- **Veredicto**: ⚠️ El usuario NO controla. El sistema de `instructions` inyecta automáticamente.

**Mapa de poder sobre el contexto**:

```
┌─────────────────────────────────────────────────────────────────┐
│                    CONTROL DEL CONTEXTO                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Usuario → 3% (userRequest + attachments manuales)               │
│                                                                  │
│  Sistema VS Code → 97%                                           │
│    ├── System prompt (fijo)                                      │
│    ├── Instructions auto-matched (glob patterns)                 │
│    ├── Workspace info (auto)                                     │
│    └── Cached context (heredado)                                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Diagnóstico Blackflag**:
> El usuario perdió control del contexto. Los patrones glob de `.github/instructions/*.md` capturan archivos que no debían estar en esta conversación.

---

### 🔴 Redflag (Estructura/Material)

**Test de Escala**:
- ¿Es sostenible operar con 117K tokens por request?
- **Veredicto**: ❌ NO. A 128K límite, solo quedan 10K para respuesta.

**Test de Recursos**:

| Recurso | Usado | Límite | % Ocupado |
|---------|-------|--------|-----------|
| Prompt tokens | 117,877 | 127,997 | 92% |
| Response tokens | 695 | 16,000 | 4% |
| Tiempo | 15.9s | N/A | Lento |

**Diagnóstico Redflag**:
> El documento evidencia un sistema que opera al límite de sus recursos. Cualquier tarea compleja agotará el contexto antes de poder responder adecuadamente.

---

### 🟡 Yellowflag (Límites/Condiciones)

**Test de Confusión Condiciones↔Contenido**:
- ¿El documento confunde metadatos de sistema con contenido de trabajo?
- **Veredicto**: ✅ SÍ. Es un dump técnico que mezcla:
  - Instrucciones para el modelo (condiciones)
  - Contenido de la tarea (trabajo real)
  - Respuestas generadas (output)

**Test de Límites**:
- ¿Qué NO debería estar en este documento?
  1. Metadatos de request (requestId, timestamps) → Deberían estar en logs
  2. System prompt → Es fijo, no aporta información nueva
  3. Instructions auto-inyectadas → Deberían ser explícitas, no automáticas

**Diagnóstico Yellowflag**:
> El documento NO respeta la separación entre "condiciones de operación" y "contenido de trabajo". Es un blob monolítico que no puede navegarse.

---

### 🟠 Orangeflag (Registro/Auditorio)

**Test de Auditorio**:
- ¿Para quién es este documento?
  - ¿Para el modelo? → Contiene demasiado ruido
  - ¿Para el humano? → Es ilegible (8849 líneas)
  - ¿Para debugging? → Falta estructura de logs

**Test de Registro**:
- ¿Es dialéctico (para examinar) o retórico (para persuadir)?
- **Veredicto**: Es un **log técnico** que pretende ser **documento de trabajo**. Hay confusión de género.

**Diagnóstico Orangeflag**:
> El documento no tiene auditorio claro. No sirve al modelo (demasiado ruido), no sirve al humano (ilegible), no sirve como log (falta estructura).

---

## Fase 3: Síntesis de Fallos

### Clasificación de Fallos

| Categoría | Fallo | Severidad | Causa Raíz |
|-----------|-------|-----------|------------|
| **Contexto** | 70K tokens irrelevantes | 🔴 Crítico | Patrones glob demasiado amplios |
| **Contexto** | Attachments duplicados | 🟡 Medio | Usuario + sistema duplican |
| **Estructura** | Sin separación metadatos/contenido | 🔴 Crítico | Dump sin post-proceso |
| **Estructura** | 8849 líneas sin navegación | 🔴 Crítico | Falta índice/TOC |
| **Control** | Usuario no controla inyección | 🔴 Crítico | Sistema automático sin override |
| **Recursos** | 92% tokens consumidos | 🟡 Medio | Herencia de contexto |
| **Auditorio** | Documento sin propósito claro | 🟡 Medio | Confusión log vs. trabajo |

---

## Fase 4: Plan de Optimización

### Nivel 1: Correcciones Inmediatas

| Acción | Impacto | Effort |
|--------|---------|--------|
| **Reducir patrones glob** | -50K tokens | 1 pt |
| Cambiar `ARCHIVO/DISCO/**/*.md` → `ARCHIVO/DISCO/Diciembre_25_MMCO_Editor/**/*.md` | | |
| **Eliminar instructions redundantes** | -20K tokens | 1 pt |
| `copilot-instructions.md` ya está en system prompt | | |
| **No cachear contexto entre tareas** | -100K tokens | 2 pts |
| Iniciar conversaciones limpias para tareas nuevas | | |

### Nivel 2: Refactorización de Instrucciones

| Acción | Impacto | Effort |
|--------|---------|--------|
| **Crear instrucción específica para MMCO** | Contexto enfocado | 3 pts |
| Un solo archivo con todo lo necesario para el taller | | |
| **Usar `isSummarized` para agentes** | -30K tokens | 2 pts |
| `ox.agent.md` aparece completo 2 veces, debería resumirse | | |
| **Documentar qué instructions se auto-inyectan** | Visibilidad | 1 pt |
| El usuario debe saber qué entra automáticamente | | |

### Nivel 3: Cambios Arquitectónicos

| Acción | Impacto | Effort |
|--------|---------|--------|
| **Separar logs de documentos de trabajo** | Claridad | 5 pts |
| `Pathykar.inner.md` no debería existir como documento editable | | |
| **Crear sistema de "presets de contexto"** | Control | 8 pts |
| Perfiles de instrucciones por tipo de tarea | | |
| **Implementar filtro de relevancia** | -60% tokens | 13 pts |
| Antes de inyectar, validar si el archivo es relevante para la tarea | | |

---

## Fase 5: Mapa Ordenado de Pathykar.inner.md

Si se requiere navegar este documento, aquí está la estructura:

```
Pathykar.inner.md (8849 líneas)
│
├── [1-33] METADATOS DE REQUEST
│   ├── requestType, model, tokens
│   ├── timestamps, requestId
│   └── usage stats
│
├── [35-127] SYSTEM PROMPT
│   ├── Identidad del modelo
│   ├── Instrucciones generales
│   └── Reglas de output
│
├── [129-5563] ATTACHMENTS INYECTADOS (61% del documento)
│   ├── [129-393] periodico.instructions.md ❌ Innecesario
│   ├── [394-857] submodulo-integracion.instructions.md ❌ Innecesario
│   ├── [858-1240] scrum-protocol.instructions.md ⚠️ Parcial
│   ├── [1241-1585] foro-scraper.instructions.md ❌ Innecesario
│   ├── [1586-1730] copilot-instructions.md ❌ Redundante
│   ├── [1731-1992] DEVOPS.md ⚠️ Parcial
│   ├── [1993-2442] BACKLOG-SCRIPTORIUM.md ✅ Relevante
│   ├── [2443-2513] BACKLOG-FUNDACION.md ❌ Innecesario
│   ├── [2514-3148] ox.agent.md ✅ Relevante (1ª aparición)
│   ├── [3149-3735] PLUGINS.md ❌ Innecesario
│   ├── [3736-4142] plugin-manager.agent.md ❌ Innecesario
│   ├── [4143-4864] registry.json ❌ Innecesario
│   ├── [4865-5086] indice.agent.md ❌ Innecesario
│   └── [5087-5563] aleph.agent.md ⚠️ Parcial
│
├── [5564-5733] PRIMER TURNO USUARIO
│   ├── environment_info
│   ├── workspace_info
│   └── userRequest (primera tarea)
│
├── [5734-6956] ATTACHMENTS MANUALES
│   ├── [5738-5914] conversacion.md ✅ Relevante
│   ├── [5915-6266] ox.agent.md ✅ Relevante (2ª aparición - DUPLICADO)
│   ├── [6267-6491] pathykar.agent.md ✅ Relevante
│   ├── [6492-6747] periodico.agent.md ✅ Relevante
│   └── [6748-7148] periodico-taller-mmco.prompt.md ✅ Relevante
│
├── [7149-7476] SEGUNDO TURNO USUARIO
│   ├── Folders adjuntos
│   └── userRequest (segunda tarea)
│
└── [7477-8849] RESPUESTA DEL MODELO
    ├── Edición de conversacion.md
    └── Resumen y siguientes pasos
```

---

## Conclusiones

### Tesis Principal

> **Pathykar.inner.md evidencia un anti-patrón de ingeniería de prompting: el "context bloat" o hinchazón de contexto.** El sistema de auto-inyección de instrucciones, combinado con la herencia de contexto entre turnos, produce documentos de ~120K tokens donde solo ~3K son relevantes para la tarea.

### Recomendaciones Prioritarias

1. **Inmediato**: Reducir patrones glob de `applyTo` en todas las instrucciones
2. **Corto plazo**: Documentar qué entra automáticamente en el contexto
3. **Medio plazo**: Implementar presets de contexto por tipo de tarea
4. **Largo plazo**: Sistema de filtrado de relevancia antes de inyección

### Métricas de Éxito Post-Optimización

| Métrica | Actual | Target |
|---------|--------|--------|
| Tokens por request | 117K | <30K |
| Attachments relevantes | 26% | >80% |
| Ratio señal/ruido | 3% | >50% |
| Tiempo de respuesta | 16s | <5s |

---

## Anexo: Archivos que NO deberían haberse incluido

| Archivo | Líneas | Tokens est. | Razón de exclusión |
|---------|--------|-------------|-------------------|
| `submodulo-integracion.instructions.md` | 463 | ~5K | Tarea no es sobre submódulos |
| `foro-scraper.instructions.md` | 345 | ~4K | Tarea no es sobre scraping |
| `PLUGINS.md` | 586 | ~6K | Tarea no es sobre gestión de plugins |
| `plugin-manager.agent.md` | 406 | ~4K | Tarea no es sobre gestión de plugins |
| `registry.json` | 721 | ~3K | Datos, no instrucciones |
| `indice.agent.md` | 221 | ~2K | No se invoca @indice |
| `BACKLOG-FUNDACION.md` | 70 | ~1K | Opportunity diferente |
| `copilot-instructions.md` | 144 | ~2K | Ya está en system prompt |

**Total recuperable**: ~27K tokens (23% del contexto actual)
