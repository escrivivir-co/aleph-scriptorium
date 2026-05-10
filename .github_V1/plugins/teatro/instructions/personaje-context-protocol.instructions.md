---
name: Protocolo de Reconstrucción de Contexto Agentico
description: Mecanismo para que CUALQUIER agente interprete a un personaje creado, cargando múltiples fuentes de conocimiento bajo demanda sin context bloat.
applyTo: ".github/plugins/teatro/**/*.md, .github/plugins/agent-creator/**/*.md, cualquier agente que invoque a personaje"
---

# Protocolo de Reconstrucción de Contexto Agentico

> **Origen**: Propuesta SCRIPT-2.4.0 (2026-01-05)  
> **Gobernantes**: @ox (auditoría), @teatro (orquestación), @indice (navegación)  
> **Auto-reflexión**: Activada (monitoreo de caché, bloat)

---

## 1. Propósito

Cuando **cualquier agente** (@lucas, @teatro, @aleph, etc.) necesita "interpretar" a un **personaje creado** (Lucas, Penelope, Viajero, etc.), debe poder:

1. **Descubrir** qué recursos existen para ese personaje (brain, plantillas, FIAs, etc.)
2. **Sugerir** sin preguntar (DRY pattern)
3. **Cargar bajo demanda** (evitar context bloat)
4. **Sintetizar** un contexto personalizado
5. **Cachear** para reutilización

---

## 2. Arquitectura: Doble Fuente

```
PERSONAJE: Lucas
├── FUENTE 1: Agent-Creator (core)
│   └── lucas.agent.md (identidad, capacidades, handoffs)
│
├── FUENTE 2: Prolog Brain (optional)
│   └── lucas-prolog.brain.pl (razonamiento lógico)
│
├── FUENTE 3: Plantillas (optional)
│   └── templates-index.json (12 plantillas indexadas)
│
├── FUENTE 4: Teatro ARG (optional)
│   └── itaca-digital.yaml (roles en obras)
│
└── FUENTE 5: FIAs / Blockly (future)
    └── [definir estructura]
```

**Clave**: No cargar TODO, cargar ÍNDICES y luego bajo demanda.

---

## 3. FASE 0: Detección de Intención

### Entrada

```
Agente recibe mención a personaje:
  "@lucas Dame la visión de Penelope"
  "@teatro Interpreta a Lucas en Ítaca"
  "@revisor Audita la coherencia como Lucas"
```

### Proceso

```
1. Parse nombre de personaje de la entrada
2. Consultar personajes-registry.json
3. Si existe → avanzar a FASE 1
4. Si NO existe → sugerir crear con @plugin_ox_agentcreator
```

---

## 4. FASE 1: Indexación DRY (Sin Bloat)

### Fuente: personajes-registry.json

Archivo centralizado que contiene **metadatos** de todos los personajes creados.

```json
{
  "$schema": ".github/plugins/agent-creator/schemas/personajes-registry.schema.json",
  "updated_at": "2026-01-05T12:00:00Z",
  "indexed_at": "2026-01-05T12:00:00Z",
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
          "pack": "AgentPrologBrain v1.0.0",
          "predicates": 50,
          "size_kb": 12
        },
        "templates_index": {
          "exists": true,
          "file": "ARCHIVO/DISCO/TALLER/ELENCO/lucas/templates-index.json",
          "count": 12,
          "categories": ["documentation", "project-management"],
          "size_kb": 5
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
        "last_used_in_session": "2026-01-05T10:00:00Z",
        "complexity": "medium",
        "recommended_for": ["scrum", "coherencia", "teatro"]
      }
    }
  ]
}
```

### Lectura de Índice

```javascript
// Pseudo-código
function get_personaje_index(id) {
  registry = read_file("personajes-registry.json")  // ~2KB
  return registry.personajes.find(p => p.id === id)
}

// Resultado: ~500 bytes de metadatos
lucas_index = get_personaje_index("lucas")
// →  {
//      brain_prolog: true (12KB),
//      templates_index: true (5KB),
//      teatro_roles: true,
//      fia: false,
//      ...
//    }
```

**Ahorro**: 2.5KB de índice vs 21KB si lees TODO.

---

## 5. FASE 1b: Sugerencias DRY (No Preguntar, Mostrar)

### Pattern: Display + Choice

```
Agente lee resultado de FASE 1 y MUESTRA (sin preguntar):

💡 Lucas — Contexto Detectado:
  ✅ Cerebro Prolog (lucas-prolog.brain.pl)
     - 50 predicados, 12 KB
     - Capacidades: documentacion_coherente/1, ubicacion_canonica/2, ...
     
  ✅ Plantillas (templates-index.json)
     - 12 plantillas (documentation, project-management)
     - Ej: project-health-check, technical-writer, ...
     
  ✅ Roles en Teatro
     - Ítaca Digital (estadio 11: "La Integración")
     - Camino del Tarotista (estadio 11)
     - Hola Mundo (tutorial)
     
  ❌ FIA — No configurada
  ❌ Blockly — No configurada

¿Cuál necesitas cargar?
  → Prolog Brain
  → Plantillas
  → Theater Roles
  → Todo
  → Nada (solo agent.md)
```

**Clave**: Mostrar opciones, usuario elige, evita preguntas innecesarias.

---

## 6. FASE 2: Carga Bajo Demanda (Secuencial, Controlada)

### OPCIÓN 1: Solo Agent.md (Default)

```javascript
context = read_file(lucas.agent.md)  // ~3KB
// Usuario tiene identidad + capacidades base
```

### OPCIÓN 2: + Prolog Brain

```javascript
context += read_file(lucas-prolog.brain.pl)  // +12KB
// Usuario tiene lógica declarativa disponible
// Nota: Crea sesión MCPPrologServer si no existe
```

### OPCIÓN 3: + Plantillas

```javascript
context += read_file(templates-index.json)  // +5KB
// Usuario ve metadatos de plantillas
// Para contenido específico: read_file(AgentLoreSDK/...) bajo demanda
```

### OPCIÓN 4: + Teatro Roles

```javascript
context += read_file(itaca-digital.yaml)  // +10KB
// Usuario ve cómo Lucas opera en contexto de obra
```

### OPCIÓN 5: TODO

```javascript
// Total ~30KB = manejable, pero normalmente no necesario
```

---

## 7. FASE 3: Síntesis (Contexto Personalizado)

Después de cargar las fuentes seleccionadas:

```markdown
# Lucas — Contexto Reconstruido (Sesión {ID})

**Modo**: Interpretación de Lucas (Agent-Creator v1.1.0)

**Capacidades Cargadas**:

## Nativas (Herramientas VS Code)
- Validar ediciones de índice
- Consultar dónde documentar información
- Generar commits conformes al protocolo
- Auditar coherencia entre índices
- Detectar violaciones DRY
- [Templates] Cargar plantillas de AgentLoreSDK

## Lógicas (MCP Prolog — CARGADAS)
- Razonar con lógica declarativa sobre documentación
- Ofrecer consejos contextuales a viajeros
- Validar coherencia DRY usando predicados

## Recursos Disponibles

### Plantillas AgentLoreSDK (12)
- project-management: project-health-check, milestone-tracker, pac-create-epic, ...
- documentation: technical-writer, changelog-generator, ...

### Prolog Queries (50 predicados)
- documentacion_coherente(X)
- ubicacion_canonica(Tipo, Donde)
- tarea_pendiente(Epic, Tarea, Estado)
- consejo(Situacion, Mensaje)

### Teatro Roles
- Ítaca Digital: Estadio 11 (Mentor, Razonador)
- Camino del Tarotista: Estadio 11 (Integración)
- Hola Mundo: Tutorial (Introductor)

---

Adelante. ¿Qué necesitas de Lucas?
```

---

## 8. FASE 4: Cacheo y Reutilización

### Sesión de Caché

```
Contexto de sesión:
  - personaje: lucas
  - sources_loaded: [agent.md, brain_prolog.brain.pl, templates_index.json]
  - loaded_at: 2026-01-05T10:15:00Z
  - cached_contents:
      lucas.agent.md: [contenido]
      lucas-prolog.brain.pl: [contenido]
      templates-index.json: [contenido]

Si usuario vuelve a pedir lucas:
  → Usar caché (sin re-leer archivos)
  → Hit rate tracking: mcp_copilot-logs-_get_usage_metrics()
```

---

## 9. Integración con Auto-Reflexión

### Buenas Prácticas (BP)

- ✅ **BP-01**: Consultar índices ANTES de leer archivos
  ```javascript
  // BIEN
  index = read_file(personajes-registry.json)  // 2KB
  user_chooses = ["brain_prolog"]
  content = read_file(lucas-prolog.brain.pl)  // 12KB
  
  // MAL
  read_file(lucas.agent.md)           // 3KB
  read_file(lucas-prolog.brain.pl)    // 12KB
  read_file(templates-index.json)     // 5KB
  read_file(itaca-digital.yaml)       // 10KB
  // Total 30KB sin necesidad
  ```

- ✅ **BP-02**: Índices DRY estables
  - personajes-registry.json = FUENTE ÚNICA de metadatos
  - NO duplicar en agent.md, NO duplicar en teatro.md

- ✅ **BP-06**: Cacheo bajo demanda
  - Cachear después de FASE 1 (índice consultado)
  - Cachear FASE 2 selecciones (usuario eligió qué cargar)
  - Reutilizar en próxima invocación

### Antipatrones a Evitar (AP)

- ❌ **AP-01**: Lectura redundante de personajes-registry.json
  - Si usuario invoca 5 veces en sesión → cachear después de 1ª lectura
  - Métrica: cacheHitRate debe ser >70%

- ❌ **AP-04**: Exploración sin caché
  - Si user pide 10 personajes diferentes → monitor de patrones anómalo

---

## 10. Mantenimiento de Índices

### Responsabilidad: agent-creator

Cuando se **crea un agente** especializado:

```bash
# Script ejecutado post-creación
scripts/sync-personajes-registry.sh

# Acciones:
# 1. Lee nuevos archivos creados (agent.md, brain.pl, etc.)
# 2. Extrae metadatos
# 3. Actualiza personajes-registry.json
# 4. Valida schema
# 5. Commit automático: "chore(agent-creator): sync personajes registry"
```

---

## 11. Protocolo: Invocación Ejemplo

### Caso: Usuario pide "@teatro Interpreta a Lucas"

```
1. FASE 0: Detectar intención
   Input: "@teatro Interpreta a Lucas"
   → Personaje: lucas

2. FASE 1: Indexación
   read_file(personajes-registry.json)  [2KB]
   → lucas_index = {brain_prolog: ✓, templates: ✓, teatro: ✓, ...}

3. FASE 1b: Sugerencias
   Display:
   "✅ Brain Prolog (50 predicados)"
   "✅ Plantillas (12)"
   "✅ Roles en Teatro"
   "❌ FIA"
   "Qué cargas?"

4. Usuario elige: "Brain Prolog + Plantillas"

5. FASE 2: Carga
   read_file(lucas-prolog.brain.pl)    [12KB]
   read_file(templates-index.json)     [5KB]
   → Total 19KB

6. FASE 3: Síntesis
   Output: "Aquí está Lucas con 50 predicados + 12 plantillas"

7. FASE 4: Cacheo
   session_cache[lucas] = {
     index: {...},
     brain: {...},
     templates: {...}
   }
```

**Tokens utilizados**: ~2.5KB (FASE 1) + 17KB (FASE 2) = 19.5KB vs 40KB sin optimización (75% ahorro potencial).

---

## 12. Generalizando a Otros Agentes

### Cualquier agente puede "interpretar"

```javascript
// En @aleph, @revisor, @lucia, etc.

if (user_input.mentions_personaje) {
  // Usar protocolo genérico
  index = consultar_personajes_registry(personaje_name)
  suggestions = generar_sugerencias(index)
  mostrar(suggestions)
  
  user_selection = esperar_respuesta()
  
  contexto = cargar_bajo_demanda(personaje_name, user_selection)
  sintesis = generar_sintesis(personaje_name, contexto)
  
  retornar(sintesis)
}
```

**Beneficio**: Un protocolo para todos los agentes, reutilizable.

---

## 13. Testing

### Unit Tests

```bash
# test-personaje-context-protocol.ts

describe("Personaje Context Protocol", () => {
  test("FASE 1: read personajes-registry.json", () => {
    index = read_file(personajes-registry.json)
    expect(index.personajes).toBeDefined()
    expect(index.personajes[0].id).toBe("lucas")
  })
  
  test("FASE 1b: Sugerencias correctas para lucas", () => {
    suggestions = generar_sugerencias("lucas")
    expect(suggestions).toContain("Brain Prolog")
    expect(suggestions).not.toContain("FIA")
  })
  
  test("FASE 2: Carga brain correctamente", () => {
    brain = read_file(lucas-prolog.brain.pl)
    expect(brain).toMatch(/documentacion_coherente/)
    expect(brain.length).toBeLessThan(50000)  // <50KB
  })
  
  test("FASE 3: Síntesis generada correctamente", () => {
    sintesis = generar_sintesis("lucas", {brain: true, templates: true})
    expect(sintesis).toContain("50 predicados")
    expect(sintesis).toContain("12 plantillas")
  })
  
  test("FASE 4: Cacheo funciona", () => {
    // 1ª llamada: lee archivos
    // 2ª llamada: usa caché (métricas iguales, pero más rápido)
  })
})
```

---

## 14. Conclusión

Este protocolo:
- ✅ Permite **doble carga de fuentes** sin duplicación
- ✅ Funciona en **CUALQUIER agente** (no solo teatro)
- ✅ **DRY**: Índices centralizados, contenido bajo demanda
- ✅ **Sin bloat**: Carga controlada, usuario elige
- ✅ **Auto-reflexión**: Integrated con métricas y antipatrones

**Próximo**: Implementar índices y actualizar sistema global.

