# Backlog Sprint SCRIPT-1.10.0: Integración AS-GYM

> **Sprint**: SCRIPT-1.10.0 — Almas para Agentes  
> **Feature Cycle**: 1  
> **Modelo**: Extensión del plugin AGENT_CREATOR con catálogo FIA  
> **Effort total**: 45 puntos  
> **Última actualización**: 2025-12-24

---

## Objetivo del Sprint

**Extender el plugin AGENT_CREATOR** para que, además de los ingredientes actuales (agentes base, fuentes de datos), permita seleccionar:

1. **FIA (Fundamentos de Inteligencia Artificial)**: Paradigmas de razonamiento del submódulo `as-gym`
2. **Presets MCP**: Packs de herramientas del plugin `mcp-presets`

El resultado es un **protocolo unificado DRY** de creación de personajes que integra los 4 ingredientes.

---

## Estado Actual

| Métrica | Valor |
|---------|-------|
| **Iteraciones** | 5 |
| **Stories** | 10 |
| **Tasks totales** | 51 |
| **Completadas** | 15 (T001-T004, T050, Tutatix) |
| **En progreso** | 0 |
| **Pendientes** | 36 |
| **% Avance** | **29%** |

---

## Épicas

| ID | Nombre | Opportunity | Effort | Prioridad |
|----|--------|-------------|--------|-----------|
| SCRIPT-1.10.0 | Integración AS-GYM | Scriptorium | 45 pts | P0 |

---

## Feature Cycle 1: Estructura

| Iteración | Nombre | Objetivo | Effort | Estado |
|-----------|--------|----------|--------|--------|
| FC1-I1 | Catálogo FIA | Exponer paradigmas en formato consultable | 18% | ✅ |
| FC1-I2 | Extensión AGENT_CREATOR | Añadir FIA + MCP-Presets al flujo | 27% | ⏳ |
| FC1-I3 | Protocolo DRY | Documentar flujo unificado de creación | 15% | ⏳ |
| FC1-I4 | Documentación Web | README técnico + docs/ usuario | 18% | ⏳ |
| FC1-I5 | **Sistema de Épocas** | Permitir personajes con modos de operación diferenciados | 22% | ✅ Tutatix creado |

> **Nota**: I5 añadida tras análisis de gaps con caso de uso Tutatix (ver `03_gap-analysis-tutatix.md`)

---

## Iteración 1: Catálogo FIA ✅

**Objetivo**: Crear un catálogo consultable de paradigmas FIA en `as-gym/` que el plugin AGENT_CREATOR pueda ofrecer al usuario.

**Effort**: 8 puntos  
**Estado**: ✅ Completada

### Stories

#### SCRIPT-1.10.0-S01: Diseñar Esquema del Catálogo FIA ✅
**Effort**: 3 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T001 | Definir schema JSON para `fia-catalog.json` | 1 | ✅ |
| T002 | Mapear cada paradigma a afinidad con banderas | 0.5 | ✅ |
| T003 | Documentar capacidades/limitaciones por paradigma | 1 | ✅ |
| T004 | Crear archivo `as-gym/fia-catalog.json` | 0.5 | ✅ |
| T050 | **Crear sub-catálogo de modelos por paradigma** | 0.5 | ✅ |

**Definition of Done**: ✅
- Archivo `fia-catalog.json` existe con los 10 paradigmas documentados
- Cada paradigma tiene: id, nombre, descripción, afinidad_banderas, capacidades, limitaciones
- **Nuevo**: Cada paradigma tiene array `modelos[]` con modelos específicos

**Archivos creados**:
- `as-gym/fia-catalog.json` (10 paradigmas, modelos incluidos)
- `as-gym/red_semantica.schema.json` (JSON Schema para redes)
- `as-gym/BACKLOG-SCRIPTORIUM.md` (5 suposiciones documentadas)
- `as-gym/README-SCRIPTORIUM.md` (guía de integración)

**Esquema propuesto para `fia-catalog.json`**:

```json
{
  "version": "1.0.0",
  "paradigmas": {
    "logica": {
      "id": "logica",
      "nombre": "Lógica Formal",
      "descripcion": "Razonamiento proposicional, predicados, lógica modal",
      "carpeta": "paradigmas/logica/",
      "afinidad_banderas": ["blueflag"],
      "capacidades": ["deducción", "verificación formal", "consistencia"],
      "limitaciones": ["no maneja incertidumbre", "explosión combinatoria"],
      "nivel_madurez": "estable"
    },
    "conexionista": {
      "id": "conexionista",
      "nombre": "Redes Neuronales",
      "descripcion": "Deep learning, patrones emergentes, embeddings",
      "carpeta": "paradigmas/conexionista/",
      "afinidad_banderas": ["yellowflag"],
      "capacidades": ["reconocimiento patrones", "generalización", "embeddings"],
      "limitaciones": ["caja negra", "requiere datos", "no explicable"],
      "nivel_madurez": "experimental"
    }
  }
}
```

---

#### SCRIPT-1.10.0-S02: Poblar Catálogo con 10 Paradigmas
**Effort**: 5 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T005 | Documentar paradigma `logica/` | 0.5 | ⏳ |
| T006 | Documentar paradigma `conexionista/` | 0.5 | ⏳ |
| T007 | Documentar paradigma `simbolica/` | 0.5 | ⏳ |
| T008 | Documentar paradigma `sbc/` (basado en casos) | 0.5 | ⏳ |
| T009 | Documentar paradigma `sbr/` (basado en reglas) | 0.5 | ⏳ |
| T010 | Documentar paradigma `situada/` | 0.5 | ⏳ |
| T011 | Documentar paradigma `hibrido/` | 0.5 | ⏳ |
| T012 | Documentar paradigma `cientifica/` | 0.5 | ⏳ |
| T013 | Documentar paradigma `gramaticas/` | 0.5 | ⏳ |
| T014 | Documentar paradigma `sistemas/` | 0.5 | ⏳ |
| T050 | Añadir sub-catálogo de modelos por paradigma (ej: `simbolica` → `red_semantica`, `frames`) | 1 | ⏳ |

> **T050 añadida**: Caso de uso Tutatix requiere seleccionar modelos específicos, no solo paradigmas de alto nivel.

**Definition of Done**: 
- Los 10 paradigmas están en `fia-catalog.json` con metadata completa
- Cada paradigma tiene al menos 1 bandera afín identificada

**Tabla de Afinidades Paradigma ↔ Bandera**:

| Paradigma | Bandera Primaria | Banderas Secundarias | Razón |
|-----------|------------------|----------------------|-------|
| `logica` | @blueflag | - | Verdad formal, proposiciones verificables |
| `conexionista` | @yellowflag | @blueflag | Patrones emergentes, límites de explicabilidad |
| `simbolica` | @aleph | @blueflag | Producción, manipulación de símbolos |
| `sbc` | @revisor | @blueflag | Casos precedentes, coherencia histórica |
| `sbr` | @blackflag | @redflag | Reglas de poder, condiciones de aplicación |
| `situada` | @redflag | @yellowflag | Contexto material, embodiment |
| `hibrido` | @aleph | (todas) | Orquestación de paradigmas |
| `cientifica` | @blueflag | @revisor | Método científico, falsificabilidad |
| `gramaticas` | @orangeflag | @blueflag | Registro, estructura formal del lenguaje |
| `sistemas` | @redflag | @yellowflag | Emergencia, feedback loops, escala |

---

## Iteración 2: Extensión AGENT_CREATOR

**Objetivo**: Refactorizar el plugin AGENT_CREATOR para incluir FIA y MCP-Presets como ingredientes opcionales.

**Effort**: 12 puntos

### Stories

#### SCRIPT-1.10.0-S03: Extender Schema de Recipe
**Effort**: 3 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T015 | Añadir campo `fia_paradigmas` al schema de recipe | 0.5 | ⏳ |
| T016 | Añadir campo `mcp_presets` al schema de recipe | 0.5 | ⏳ |
| T017 | Actualizar `tarotista.recipe.json` como ejemplo | 0.5 | ⏳ |
| T018 | Actualizar `nonsi.json` como ejemplo | 0.5 | ⏳ |
| T019 | Documentar schema extendido en README | 1 | ⏳ |

**Definition of Done**: 
- Recipes soportan los 4 ingredientes: `agentes_base`, `fuentes_datos`, `fia_paradigmas`, `mcp_presets`
- Ejemplos actualizados funcionan

**Schema extendido de recipe**:

```json
{
  "name": "nombre-agente",
  "version": "1.0.0",
  "created_at": "ISO8601",
  "agentes_base": [
    {
      "id": "yellowflag",
      "file": ".github/agents/yellowflag.agent.md",
      "elementos_heredados": ["test1", "test2"]
    }
  ],
  "fuentes_datos": [
    {
      "ruta": "DISCO/Carpeta/",
      "tipo": "scraping|documento|enciclopedia",
      "conceptos_extraidos": ["c1", "c2"]
    }
  ],
  "fia_paradigmas": [
    {
      "id": "logica",
      "version": "1.0.0",
      "capacidades_usadas": ["deduccion", "verificacion"]
    }
  ],
  "mcp_presets": [
    {
      "id": "preset-id",
      "name": "Nombre del Preset",
      "items": ["tool1", "tool2"]
    }
  ],
  "especialidad": "Descripción de la especialización"
}
```

---

#### SCRIPT-1.10.0-S04: Actualizar Prompt de Creación
**Effort**: 5 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T020 | Refactorizar `crear-agente.prompt.md` con 4 pasos | 2 | ⏳ |
| T021 | Añadir paso "Seleccionar FIA" con catálogo | 1 | ⏳ |
| T022 | Añadir paso "Seleccionar Presets MCP" con catálogo | 1 | ⏳ |
| T023 | Actualizar ejemplo de sesión | 1 | ⏳ |

**Definition of Done**: 
- Prompt guía los 4 ingredientes en orden lógico
- Ejemplo de sesión muestra el flujo completo

**Flujo de creación actualizado (4 ingredientes)**:

```
┌─────────────────────────────────────────────────────────────────────┐
│                 PROTOCOLO DE CREACIÓN DE PERSONAJE                   │
│                         (4 Ingredientes DRY)                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   PASO 1: METODOLOGÍA                                                 │
│   ¿Qué agente(s) base heredar?                                       │
│   → @yellowflag, @blueflag, @blackflag, @redflag, @orangeflag...     │
│                                                                       │
│   PASO 2: CONOCIMIENTO                                                │
│   ¿Qué fuente(s) de datos conectar?                                  │
│   → DISCO/ (scraping), ARCHIVO/ (doctrina), ENCICLOPEDIA/ (tomos)    │
│                                                                       │
│   PASO 3: RAZONAMIENTO (NUEVO)                                       │
│   ¿Qué paradigma(s) FIA usar?                                        │
│   → logica, conexionista, sbr, sbc, simbolica, situada...            │
│                                                                       │
│   PASO 4: HERRAMIENTAS (NUEVO)                                       │
│   ¿Qué preset(s) MCP asignar?                                        │
│   → Presets de zeus, herramientas especializadas                     │
│                                                                       │
│   PASO 5: ESPECIALIZACIÓN                                             │
│   ¿Cómo se llama y qué hace?                                         │
│   → Nombre, descripción, tests específicos                           │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

#### SCRIPT-1.10.0-S05: Actualizar Plantilla de Agente Generado
**Effort**: 4 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T024 | Añadir sección "Paradigma FIA" en plantilla `.agent.md` | 1 | ⏳ |
| T025 | Añadir sección "Herramientas MCP" en plantilla | 1 | ⏳ |
| T026 | Generar handoffs específicos por paradigma FIA | 1 | ⏳ |
| T027 | Generar handoffs específicos por preset MCP | 1 | ⏳ |

**Definition of Done**: 
- Agentes generados incluyen las 4 secciones: Metodología, Conocimiento, Razonamiento, Herramientas

**Plantilla extendida de agente generado**:

```markdown
---
name: {nombre}
description: "{descripción fusionada}"
tools: ['vscode', 'read', 'search', 'agent', ...mcp_tools]
handoffs: [heredados + fia + mcp]
---

# Agente: {Nombre}

**Rol**: {Especialidad}
**Capa**: 🔌 Plugins (Generado por AGENT_CREATOR)

---

## 1. Metodología (Agentes Base)

| Agente | Elementos Heredados |
|--------|---------------------|
| @yellowflag | cuadrantes, pre/trans, gnosis |

---

## 2. Conocimiento (Fuentes de Datos)

| Fuente | Tipo | Conceptos |
|--------|------|-----------|
| DISCO/Foro/ | scraping | c1, c2 |

---

## 3. Razonamiento (Paradigma FIA)

| Paradigma | Capacidades | Limitaciones |
|-----------|-------------|--------------|
| logica | deducción, verificación | no incertidumbre |

**Afinidad**: Refuerza metodología de @blueflag

---

## 4. Herramientas (Presets MCP)

| Preset | Items |
|--------|-------|
| {nombre} | tool1, tool2 |

---

## Tests de Auditoría

### Heredados (de agentes base)
- ...

### Específicos (de especialidad)
- ...

### Por Paradigma FIA
- Si `logica`: Test de consistencia formal
- Si `sbr`: Test de cobertura de reglas
```

---

## Iteración 3: Protocolo DRY

**Objetivo**: Documentar el protocolo unificado de creación de personajes evitando duplicación.

**Effort**: 7 puntos

### Stories

#### SCRIPT-1.10.0-S06: Actualizar Instructions del Plugin
**Effort**: 4 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T028 | Refactorizar `agent-creator.instructions.md` | 2 | ⏳ |
| T029 | Añadir sección "Los 4 Ingredientes" con diagrama | 1 | ⏳ |
| T030 | Añadir sección "Cuándo usar cada ingrediente" | 1 | ⏳ |

**Definition of Done**: 
- Instructions explica los 4 ingredientes de forma DRY
- Diagrama visual del flujo de creación

**Tabla "Cuándo usar cada ingrediente"**:

| Ingrediente | Cuándo Usar | Cuándo NO Usar |
|-------------|-------------|----------------|
| **Agente Base** | Siempre (obligatorio) | - |
| **Fuente de Datos** | El agente necesita conocimiento específico | Solo usa doctrina general |
| **Paradigma FIA** | Requiere razonamiento estructurado | Simple Q&A sin lógica |
| **Preset MCP** | Necesita herramientas externas | Solo usa herramientas base |

---

#### SCRIPT-1.10.0-S07: Crear Prompt de Referencia Rápida
**Effort**: 3 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T031 | Crear `referencia-rapida.prompt.md` con cheatsheet | 1.5 | ⏳ |
| T032 | Incluir tabla de paradigmas FIA disponibles | 0.5 | ⏳ |
| T033 | Incluir tabla de presets MCP disponibles | 0.5 | ⏳ |
| T034 | Incluir ejemplos de combinaciones comunes | 0.5 | ⏳ |

**Definition of Done**: 
- Prompt de referencia rápida usable sin leer toda la documentación

**Ejemplos de combinaciones comunes**:

| Caso de Uso | Agente Base | Fuente | FIA | Preset |
|-------------|-------------|--------|-----|--------|
| Auditor filosófico | @yellowflag | Enciclopedia/HDF | logica | - |
| Analizador de noticias | @periodico | DISCO/Noticias/ | sbr | web-search |
| Verificador de hechos | @blueflag | ARCHIVO/marco | logica + sbc | - |
| Diseñador de sistemas | @redflag | DISCO/Foro/ | sistemas | - |

---

## Iteración 4: Documentación Web

**Objetivo**: Documentar el feature para usuarios técnicos (README) y usuarios finales (GH-Pages).

**Effort**: 7 puntos

### Stories

#### SCRIPT-1.10.0-S08: Actualizar README AGENT_CREATOR
**Effort**: 3 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T035 | Añadir sección "Los 4 Ingredientes" al README | 1 | ⏳ |
| T036 | Documentar integración con as-gym | 1 | ⏳ |
| T037 | Documentar integración con mcp-presets | 0.5 | ⏳ |
| T038 | Añadir diagrama de arquitectura actualizado | 0.5 | ⏳ |

**Definition of Done**: 
- README técnico completo con los 4 ingredientes documentados

---

#### SCRIPT-1.10.0-S09: Crear Página en GH-Pages
**Effort**: 4 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T039 | Crear `docs/agentes-personalizados.md` | 2 | ⏳ |
| T040 | Añadir sección "Cómo crear tu propio agente" | 1 | ⏳ |
| T041 | Añadir galería de agentes creados | 0.5 | ⏳ |
| T042 | Añadir enlace desde `docs/agentes.md` | 0.5 | ⏳ |

**Definition of Done**: 
- Página pública documenta el feature para usuarios finales
- Accesible desde el menú de navegación

**Estructura de `docs/agentes-personalizados.md`**:

```markdown
---
layout: page
title: Agentes Personalizados
permalink: /agentes-personalizados/
---

## Crea tu propio agente

El Scriptorium te permite crear **agentes especializados** 
combinando 4 ingredientes:

### 🎭 1. Metodología
Elige un agente base que define la perspectiva...

### 📚 2. Conocimiento
Conecta fuentes de datos del repositorio...

### 🧠 3. Razonamiento
Selecciona un paradigma de inteligencia artificial...

### 🔧 4. Herramientas
Asigna presets de herramientas MCP...

## Galería de Agentes

| Agente | Especialidad | Ingredientes |
|--------|--------------|--------------|
| Tarotista | Criterio de demarcación | yellowflag + foro + - + - |
| NonsiAuditor | Auditoría poder/viabilidad | blackflag+redflag + nonsi + - + - |

## Cómo empezar

Invoca `@AgentCreator` en el chat de Copilot...
```

---

## Iteración 5: Sistema de Épocas ✅

> **Añadida tras análisis de gaps con caso de uso Tutatix**  
> Ver: `03_gap-analysis-tutatix.md`  
> **Estado**: ✅ Completada con proof-of-concept Tutatix

**Objetivo**: Permitir que los personajes tengan modos de operación diferenciados (épocas).

**Effort**: 10 puntos

**Contexto**: El caso de uso Tutatix reveló que algunos personajes necesitan:
- **Época de Edición**: Construir/modificar estructuras FIA (ej: red semántica)
- **Época de Conversación**: Usar las estructuras como límites de contexto

### Stories

#### SCRIPT-1.10.0-S10: Sistema de Épocas para Personajes FIA ✅
**Effort**: 10 pts  
**Prioridad**: Must  
**Justificación**: Sin épocas, no se puede crear Tutatix ni ningún personaje con modos de operación diferenciados.  
**Estado**: ✅ Completada (Tutatix creado como proof-of-concept)

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T051 | Diseñar schema de `epochs` en recipe.json | 1 | ✅ |
| T052 | Implementar selector de época en `crear-agente.prompt.md` | 1 | ⏳ |
| T053 | Documentar patrones de épocas (write/read, contexto limitado) | 1 | ✅ |
| T054 | Definir estructura de carpeta con FIA persistente por agente | 1 | ✅ |
| T055 | Crear prompt `editar-red-semantica.prompt.md` | 2 | ⏳ |
| T056 | Crear prompt `cargar-contexto-fia.prompt.md` | 1 | ⏳ |
| T057 | Extender schema de `actores.json` con epochs | 1 | ✅ |
| T058 | Actualizar `desplegar-en-arg.prompt.md` con config de épocas | 1 | ⏳ |
| T059 | Crear prueba de concepto: personaje Tutatix | 1 | ✅ |

**Archivos creados para Tutatix**:
- `AGENT_CREATOR/agents/created/tutatix/tutatix.agent.md` ✅
- `AGENT_CREATOR/agents/created/tutatix/tutatix.recipe.json` ✅
- `AGENT_CREATOR/agents/created/tutatix/fia/red_semantica.json` ✅
- `DISCO/TALLER/ELENCO/tutatix/README.md` ✅

**Integración ARG**:
- `actores.json` actualizado con Tutatix ✅
- `obras.json` actualizado (hola_mundo + escena 4) ✅

**Definition of Done**:
- ✅ Se puede crear un personaje con 2+ épocas
- ✅ Las épocas persisten configuración FIA
- ✅ El despliegue en ARG respeta las épocas
- ⏳ El usuario puede cambiar de época vía comando
- ✅ Tutatix desplegado en obra "Hola Mundo"

**Schema de epochs propuesto**:

```json
"epochs": [
  {
    "id": "edicion",
    "nombre": "Edición de Red Semántica",
    "descripcion": "El usuario construye/edita la red semántica",
    "fia_activo": "simbolica.red_semantica",
    "modo": "write",
    "system_prompt_override": "Actúa como editor colaborativo..."
  },
  {
    "id": "conversacion",
    "nombre": "Conversación Limitada",
    "descripcion": "Conversa usando solo conceptos de la red",
    "fia_activo": "simbolica.red_semantica",
    "modo": "read",
    "system_prompt_override": "Responde usando SOLO los conceptos de la red..."
  }
],
"epoch_default": "conversacion"
```

**Estructura de carpeta con FIA persistente**:

```
ARCHIVO/PLUGINS/AGENT_CREATOR/agents/created/tutatix/
├── tutatix.agent.md        # Definición del agente
├── tutatix.recipe.json     # Receta de 4 ingredientes + épocas
└── fia/
    └── red_semantica.json  # Red semántica persistida
```

**Extensión de actores.json**:

```json
"tutatix": {
  "nombre": "Tutatix",
  "tipo": "personaje",
  "arquetipo": "MENTOR",
  "origen": {
    "agente_base": "blueflag",
    "fia_modelo": "simbolica.red_semantica"
  },
  "epochs": {
    "edicion": { "comando": "@tutatix editar" },
    "conversacion": { "comando": "@tutatix consultar" }
  },
  "epoch_actual": "conversacion"
}
```

---

## Métricas

| Métrica | Target | Mínimo | Estado |
|---------|--------|--------|--------|
| Tasks completadas | 51/51 | 43/51 | ⏳ |
| Effort completado | 45 pts | 38 pts | ⏳ |
| % Avance | 100% | 85% | ⏳ |
| Stories completadas | 10/10 | 8/10 | ⏳ |
| Documentación web | 1 página | 1 página | ⏳ |

> **Nota**: Métricas actualizadas tras análisis de gaps (Tutatix). Ver `03_gap-analysis-tutatix.md`.

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| Submódulo as-gym | ✅ Añadido | Rama integration/beta/scriptorium |
| Plugin AGENT_CREATOR | ✅ Instalado | v1.1.0 |
| Plugin MCP-PRESETS | ✅ Instalado | v1.0.0 |
| Plugin GH-PAGES | ✅ Instalado | Para docs/ |
| Catálogo FIA | ⏳ Por crear | T001-T014 |

---

## Riesgos Identificados

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Paradigmas FIA incompletos | Media | Bajo | Marcar nivel_madurez en catálogo |
| Complejidad del flujo 4-ingredientes | Baja | Medio | Hacer ingredientes 3-4 opcionales |
| Usuario confundido por opciones | Media | Bajo | Referencia rápida + ejemplos |
| Presets MCP no disponibles | Baja | Bajo | Plugin ya instalado |

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-24 | Crear backlog borrador desde conversación PO-SM | @scrum |
| 2025-12-24 | Definir esquema de catálogo FIA | @scrum |
| 2025-12-24 | Añadir I5 + S10 (Sistema de Épocas) tras análisis gaps Tutatix | @scrum |
| 2025-12-24 | Diseñar protocolo 4 ingredientes DRY | @scrum |

---

## Anexo: Arquitectura Integrada

```
┌─────────────────────────────────────────────────────────────────────┐
│                         AGENT_CREATOR v2.0                           │
│                    (Plugin de Creación de Agentes)                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   ┌───────────────┐   ┌───────────────┐   ┌───────────────┐          │
│   │ 1. AGENTES    │   │ 2. FUENTES    │   │ 3. FIA        │          │
│   │    BASE       │   │    DATOS      │   │    PARADIGMAS │          │
│   │               │   │               │   │               │          │
│   │ .github/      │   │ DISCO/        │   │ as-gym/       │          │
│   │ agents/       │   │ ARCHIVO/      │   │ fia-catalog   │          │
│   │               │   │ ENCICLOPEDIA/ │   │ .json         │          │
│   └───────┬───────┘   └───────┬───────┘   └───────┬───────┘          │
│           │                   │                   │                   │
│           └───────────────────┼───────────────────┘                   │
│                               │                                       │
│                               ▼                                       │
│                   ┌───────────────────────┐                          │
│                   │  RECIPE (JSON)        │                          │
│                   │  4 ingredientes       │                          │
│                   └───────────┬───────────┘                          │
│                               │                                       │
│           ┌───────────────────┼───────────────────┐                   │
│           │                   │                   │                   │
│           ▼                   ▼                   ▼                   │
│   ┌───────────────┐   ┌───────────────┐   ┌───────────────┐          │
│   │ AGENTE        │   │ DESPLIEGUE    │   │ 4. MCP        │          │
│   │ GENERADO      │   │ ARG_BOARD     │   │    PRESETS    │          │
│   │               │   │               │   │               │          │
│   │ agents/       │   │ actores.json  │   │ MCP_PRESETS/  │          │
│   │ created/      │   │ obras.json    │   │ presets/      │          │
│   └───────────────┘   └───────────────┘   └───────────────┘          │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Anexo: Protocolo DRY de Creación

> **Principio**: No repetir la misma información en múltiples lugares.

### Fuentes de verdad

| Información | Fuente Única | No duplicar en |
|-------------|--------------|----------------|
| Lista de agentes base | `@ox` (índice maestro) | crear-agente.prompt |
| Lista de paradigmas FIA | `fia-catalog.json` | instructions, README |
| Lista de presets MCP | `catalog.json` (mcp-presets) | instructions, README |
| Schema de recipe | `agent-creator.instructions.md` | prompts, README |

### Cómo evitar duplicación

1. **Prompts referencian fuentes**: "Consulta `fia-catalog.json` para paradigmas disponibles"
2. **README incluye enlace**: "Ver [catálogo FIA](as-gym/fia-catalog.json)"
3. **Instructions define una vez**: El schema de recipe se define una vez y se referencia
4. **GH-Pages enlaza a README**: No duplica, enlaza a documentación técnica

### Señales de duplicación (anti-patterns)

- ❌ Listar paradigmas en el prompt Y en las instructions
- ❌ Documentar schema en README Y en instructions
- ❌ Copiar tabla de agentes base en cada documento
- ✅ Definir una vez, referenciar siempre

---

## Anexo: Ejemplo de Recipe Completa

```json
{
  "name": "filosofo-analitico",
  "version": "1.0.0",
  "created_at": "2025-12-24T12:00:00Z",
  "created_by": "AgentCreator",
  
  "agentes_base": [
    {
      "id": "blueflag",
      "file": ".github/agents/blueflag.agent.md",
      "elementos_heredados": ["evidencia", "falsificabilidad", "utilidad"]
    },
    {
      "id": "yellowflag",
      "file": ".github/agents/yellowflag.agent.md",
      "elementos_heredados": ["cuadrantes", "pre_trans"]
    }
  ],
  
  "fuentes_datos": [
    {
      "ruta": "ARCHIVO/ENCICLOPEDIA/HDF-ernesto-castro/",
      "tipo": "enciclopedia",
      "capitulos_usados": [1, 2, 3, 4, 5],
      "conceptos_extraidos": ["presocraticos", "platon", "aristoteles"]
    }
  ],
  
  "fia_paradigmas": [
    {
      "id": "logica",
      "version": "1.0.0",
      "capacidades_usadas": ["deduccion", "verificacion_formal"]
    }
  ],
  
  "mcp_presets": [
    {
      "id": "web-research",
      "name": "Web Research Tools",
      "items": ["web_search", "fetch_webpage"]
    }
  ],
  
  "especialidad": "Análisis filosófico con rigor lógico",
  
  "tests_especificos": [
    "falacia_detectada",
    "argumento_valido",
    "premisa_oculta"
  ],
  
  "handoffs_añadidos": [
    "consultar_enciclopedia",
    "verificar_logica_formal",
    "buscar_fuente_web"
  ]
}
```
