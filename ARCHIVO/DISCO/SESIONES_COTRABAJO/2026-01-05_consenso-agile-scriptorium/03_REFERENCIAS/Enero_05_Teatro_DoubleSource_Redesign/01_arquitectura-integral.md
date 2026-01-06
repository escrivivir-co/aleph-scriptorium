# Arquitectura Integral: Doble Carga de Fuentes de Agentes (2026-01-05)

> **Propuesta**: Mecanismo transversal de "aparentar personaje" para cualquier agente  
> **Alcance**: Teatro + Agent-Creator + Sistema Global (copilot-instructions.md)  
> **Épica**: SCRIPT-2.4.0 (Agentic Personalization Layer)  
> **Auto-reflexión**: Activada

---

## 🎭 Problema: Estado Actual

### Hoy (Fragmentado)

```
Usuario: @teatro Necesito interpretar a Lucas

Teatro → Lee lucas.agent.md
      → "Lucas es Scrum Master"
      
Usuario: "Pero necesito sus plantillas"

Teatro → "No sé dónde están"
      → Usuario navega manualmente a templates-index.json
```

**Problemas**:
- ❌ Dos fuentes de verdad para Lucas: teatro + agentes
- ❌ Plantillas, brains, FIAs, Blocklys NO se cargan automáticamente
- ❌ Cada agente debe reimplementar lógica de "personajes"
- ❌ Context bloat: cargar TODO vs cargar NADA

---

## 🎯 Solución: Doble Fuente Modular

### Visión

```
┌─────────────────────────────────────────────────────────────┐
│   CUALQUIER AGENTE (@lucas, @teatro, @aleph, etc.)         │
│              ↓                                               │
│   "Voy a interpretar a {personaje}"                        │
└─────────────────────────┬───────────────────────────────────┘
                          │
              [FASE 0: Reconstrucción de Contexto]
                          │
         ┌────────────────┴────────────────┐
         ▼                                 ▼
    [FUENTE 1]                      [FUENTE 2]
    Agentes del Plugin              Personajes Agent-Creator
    (Teatro propio)                 (Con recursos asociados)
         │                                 │
         └─────────────┬───────────────────┘
                       │
              [ÍNDICES LIGEROS] (DRY, sin bloat)
                       │
         ┌─────────────┴─────────────────┐
         ▼                               ▼
    [FUENTE 1 INDEX]            [FUENTE 2 INDEX]
    teatro-agents.json          personajes-registry.json
         │                               │
         └─────────────┬─────────────────┘
                       │
        [FASE 1: Sugerencias DRY]
            ↓
    "Opciones probables para {personaje}:
     - Brain Prolog: lucas-prolog.brain.pl
     - Plantillas: 12 en AgentLoreSDK/...
     - ARG Board: lucas en itaca-digital.yaml
     - FIAs: 0 (sin definir aún)"
            │
    [Usuario selecciona o skip]
            │
        [FASE 2: Carga Bajo Demanda]
            ↓
    - read_file(personaje.agent.md) [core]
    - read_file(personaje-prolog.brain.pl) [si Brain=true]
    - read_file(templates-index.json) [si Templates=true]
    - read_file(itaca-digital.yaml) [si ARG=true]
    - etc.
            │
        [FASE 3: Síntesis]
            ↓
    "Aquí está {personaje} completo, con capacidades X, Y, Z"
```

---

## 📋 Protocolo: Reconstrucción de Contexto en 4 Fases

### FASE 0: Detección de Intención

```
Entrada: Usuario invoca @agente con mención a personaje
         Ej: "@lucas Dame la visión de Penelope"
             "@teatro Interpreta a Lucas en Ítaca"

Sistema:
  1. Parse nombre de personaje
  2. Detecta: ¿Es personaje de Teatro? ¿Agente creado? ¿Ambos?
  3. Avanza a FASE 1
```

### FASE 1: Indexación DRY (Sin Bloat)

Crear dos índices **ligeros** (metadatos solo):

#### teatro-agents.json

```json
{
  "$schema": ".github/plugins/teatro/schemas/agents-index.schema.json",
  "updated_at": "2026-01-05T12:00:00Z",
  "agents": [
    {
      "id": "teatro",
      "name": "Teatro",
      "file": ".github/plugins/teatro/agents/teatro.agent.md",
      "type": "orchestrator",
      "capabilities": ["generar-obra", "instalar-obra", "ejecutar-obra"]
    },
    {
      "id": "arrakis",
      "name": "Arrakis (ARG Board)",
      "file": ".github/plugins/arg-board/agents/arrakis.agent.md",
      "type": "obra",
      "capabilities": ["gestionar-obras", "tracking-actores"]
    }
    // ... otros agentes del plugin teatro
  ]
}
```

#### personajes-registry.json

```json
{
  "$schema": ".github/plugins/agent-creator/schemas/personajes-registry.schema.json",
  "updated_at": "2026-01-05T12:00:00Z",
  "personajes": [
    {
      "id": "lucas",
      "nombre": "Lucas — Scrum Master del Índice",
      "agent_file": "ARCHIVO/DISCO/TALLER/ELENCO/lucas/lucas.agent.md",
      "origen": "agent-creator",
      "sources": {
        "brain_prolog": {
          "exists": true,
          "file": "ARCHIVO/DISCO/TALLER/ELENCO/lucas/lucas-prolog.brain.pl",
          "pack": "AgentPrologBrain v1.0.0"
        },
        "templates_index": {
          "exists": true,
          "file": "ARCHIVO/DISCO/TALLER/ELENCO/lucas/templates-index.json",
          "count": 12
        },
        "fia": {
          "exists": false,
          "reason": "No definida aún"
        },
        "blockly": {
          "exists": false,
          "reason": "No definida aún"
        },
        "teatro_roles": {
          "exists": true,
          "obras": ["hola-mundo", "camino-tarotista", "itaca-digital"],
          "estadio_preferido": 11
        }
      },
      "meta": {
        "created_at": "2026-01-03T00:00:00Z",
        "last_used": "2026-01-05T10:00:00Z",
        "complexity": "medium"
      }
    },
    // ... otros personajes creados
  ]
}
```

### FASE 1b: Sugerencias DRY (No preguntar, mostrar)

```javascript
// Pseudo-código: Si usuario busca personaje:

consultar_personajes_registry("lucas")
  → {
      brain_prolog: "Sí",
      templates_index: "Sí (12 plantillas)",
      teatro_roles: "Sí (3 obras)",
      fia: "No",
      blockly: "No"
    }

// Sin preguntar, mostrar:
"💡 Detecté que Lucas tiene:
  ✅ Cerebro Prolog (lucasxxx.brain.pl)
  ✅ Plantillas AgentLoreSDK (12)
  ✅ Roles en 3 obras de Teatro
  ❌ FIA no configurada
  ❌ Blockly no configurado
  
  ¿Cuál necesitas?"
```

### FASE 2: Carga Bajo Demanda (Secuencial, Controlada)

```
Usuario selecciona: "Brain Prolog + Plantillas"

Sistema:
  1. read_file(lucas-prolog.brain.pl) [~386 líneas, manejable]
  2. read_file(templates-index.json) [~50 líneas, ligero]
  3. ¿Necesitas contenido de plantillas? 
     → Si: cargar bajo demanda específica
     → No: solo metadatos

[Sin cargar TODO. Sin context bloat]
```

### FASE 3: Síntesis (Contexto Personalizado)

```markdown
# Lucas — Contexto Reconstruido

**Modo**: Interpretación de Lucas (Agent-Creator)

**Capacidades Cargadas**:
- Nativas: Validar índices, generar commits, cargar plantillas
- Prolog: Razonamiento DRY, consejos contextuales
- Theater: Roles en Ítaca Digital (estadio 11)

**Plantillas Disponibles**:
- project-management/project-health-check
- documentation/technical-writer
- ... (12 total)

**Brain Status**: Prolog session ready (MCPPrologServer:3006)

---

Adelante con tu pregunta sobre Lucas.
```

---

## 🔌 Integración: Tres Niveles de Implementación

### Nivel 1: Plugin Teatro Mejorado

**Nuevo handoff en teatro.agent.md**:

```yaml
- label: "🎭 Interpretar personaje (with context)"
  agent: Teatro
  prompt: |
    1. Parse personaje requerido
    2. Consulta personajes-registry.json
    3. Muestra opciones de fuentes disponibles
    4. Carga bajo demanda lo que usuario solicite
    5. Sintetiza contexto personalizado
  send: false
```

**Nueva instrucción**: `teatro-interpret-personaje.instructions.md`

### Nivel 2: Sistema Global (Copilot Instructions)

Agregar a `copilot-instructions.md`:

```markdown
## Mecanismo de Personalizaciones Agenticas

Cualquier agente (@lucas, @teatro, @aleph) puede **interpretar** a un personaje creado.

### Protocolo de Reconstrucción de Contexto

1. **FASE 0: Detección** → Parse de personaje
2. **FASE 1: Indexación DRY** → Consultar registros (sin cargar contenido)
3. **FASE 1b: Sugerencias** → Mostrar opciones disponibles
4. **FASE 2: Carga Bajo Demanda** → Usuario elige qué cargar
5. **FASE 3: Síntesis** → Contexto personalizado

Ver: `.github/plugins/teatro/instructions/personaje-context-protocol.instructions.md`
```

### Nivel 3: Agent-Creator como Proveedor de Índices

**Nueva responsabilidad de agent-creator**:
- Mantener `personajes-registry.json` actualizado cuando se crean agentes
- Ejecutar script de sincronización: `scripts/sync-personajes-registry.sh`

---

## 📊 Mapeo de Fuentes

```
Personaje: Lucas
├── Fuente 1: Agent-Creator
│   └── lucas.agent.md
│       ├── Identidad, capacidades, handoffs
│       ├── Tools disponibles
│       └── Referencias a otras fuentes
│
├── Fuente 2: Brain Prolog (Optional)
│   └── lucas-prolog.brain.pl
│       ├── Predicados: documentacion_coherente/1
│       ├── Índices: indice_funcional/2
│       └── Scrum: tarea_pendiente/3
│
├── Fuente 3: Plantillas (Optional)
│   └── templates-index.json
│       ├── Metadatos: 12 plantillas indexadas
│       ├── Categorías: documentation, project-management
│       └── Rutas: AgentLoreSDK/cli-tool/components/...
│
├── Fuente 4: Teatro ARG (Optional)
│   └── itaca-digital.yaml
│       ├── Elenco: lucas en estadio 11
│       ├── Brain: prolog auto-consult
│       └── Sensor/Actuador: notificaciones
│
└── Fuente 5: FIAs / Blockly (Future)
    └── [Definir estructura]
```

---

## 🛡️ Gestión de Context Bloat (DRY)

### Principios

1. **Nunca cargar TODO**: Los índices contienen METADATOS, no contenido
2. **Bajo demanda secuencial**: Una fuente a la vez, usuario elige
3. **Caché de sesión**: Si usuario pide lucas 5 veces, cachear registro
4. **Sugerencias no pregunta**: Mostrar opciones, usuario decide
5. **Sin Re-lectura**: Consultar índices vs read_file completo

### Estimaciones de Tokens

| Acción | Tokens |
|--------|--------|
| Consultar personajes-registry.json | ~2K |
| Mostrar sugerencias (FASE 1b) | ~500 |
| read_file(lucas.agent.md) | ~3K |
| read_file(lucas-prolog.brain.pl) | ~4K |
| read_file(templates-index.json) | ~1K |
| **Total si carga TODO** | ~10.5K |
| **Total PHASE 1 only** | ~2.5K |
| **Savings** | 75% con indexación |

---

## 📝 Archivos Nuevos a Crear

### 1. Índices (Generados/Mantenidos por plugins)

```
.github/plugins/teatro/index/teatro-agents.json
.github/plugins/agent-creator/index/personajes-registry.json
```

### 2. Instrucciones

```
.github/plugins/teatro/instructions/personaje-context-protocol.instructions.md
.github/plugins/agent-creator/instructions/registry-maintenance.instructions.md
```

### 3. Scripts

```
scripts/sync-personajes-registry.sh
scripts/teatr-validate-indices.sh
```

### 4. Schemas

```
.github/plugins/teatro/schemas/agents-index.schema.json
.github/plugins/agent-creator/schemas/personajes-registry.schema.json
```

---

## ✅ Cambios en Archivos Existentes

### 1. copilot-instructions.md

**Agregar sección**:

```markdown
## Personalización Agentica: Protocolo de Reconstrucción

Cualquier agente puede "aparentar" ser un personaje del Scriptorium para ofrecer una segunda capa de contexto.

### Mecanismo de Carga DRY
- FASE 1: Indexación (metadatos)
- FASE 2: Sugerencias (sin preguntar)
- FASE 3: Carga bajo demanda (usuario elige)
- FASE 4: Síntesis (contexto personalizado)

Ver instrucciones en: `.github/plugins/teatro/instructions/personaje-context-protocol.instructions.md`
```

### 2. teatro.agent.md

**Agregar handoff**:

```yaml
- label: "🎭 Interpretar personaje"
  agent: Teatro
  prompt: "Reconstruct context for a character using the personaje-context protocol..."
  send: false
```

### 3. agent-creator.agent.md

**Agregar responsabilidad**:

```yaml
postProcessing:
  - action: "Actualizar personajes-registry.json"
    cuando: "Al crear agente"
    ejecutar: "scripts/sync-personajes-registry.sh"
```

---

## 🔗 Interacción con Auto-Reflexión

Este mecanismo se monitorea con:

- ✅ **BP-01**: Consultar índices antes (teatro-agents.json, personajes-registry.json)
- ✅ **BP-02**: Fuentes DRY estables (índices = fuente única)
- ✅ **BP-06**: Cacheo bajo demanda (no re-leer personajes-registry)
- ⚠️ **AP-04**: Monitor de exploración sin caché (si usuario pide muchos personajes)

### Métrica a Seguir

```
GET personajes-registry.json
  → cacheHitRate debe ser >70% (personajes repetidos)
  → Si <50% → investigar patrón de uso anómalo
```

---

## 📊 Comparativa: Antes vs Después

| Aspecto | Antes | Después |
|---------|-------|---------|
| **Fuentes para un personaje** | 1 (agent.md) | 5+ (modular) |
| **Descubrimiento de recursos** | Manual | Automático (FASE 1b) |
| **Context bloat** | Variable (sin control) | Controlado (índices + bajo demanda) |
| **Reutilización entre agentes** | No (teatro-específico) | Sí (transversal) |
| **DRY compliance** | 70% | 95%+ |
| **Setup para nuevo personaje** | Editar 2 archivos | Auto-sincroniza vía script |

---

## 🚀 Plan de Implementación

### Fase 1 (Esta semana)
- [ ] Crear schemas para ambos índices
- [ ] Generar índices iniciales (teatro-agents.json, personajes-registry.json)
- [ ] Escribir instrucciones de protocolo

### Fase 2 (Próxima semana)
- [ ] Actualizar teatro.agent.md con handoff
- [ ] Escribir script de sincronización
- [ ] Validar con Lucas (test case)

### Fase 3 (Siguientes 2 semanas)
- [ ] Actualizar copilot-instructions.md
- [ ] Generalizar para otros agentes (@aleph, @revisor, etc.)
- [ ] Tests end-to-end

---

## 📌 Conclusión

Esta arquitectura:
- ✅ Resuelve duplicación de fuentes
- ✅ Permite "aparentar personaje" en cualquier agente
- ✅ Mantiene DRY con indexación ligera
- ✅ Evita context bloat con carga bajo demanda
- ✅ Integrada con auto-reflexión para monitoreo

**Siguiente paso**: ¿Aprobado el diseño? Si sí, procedo a generar los archivos.

