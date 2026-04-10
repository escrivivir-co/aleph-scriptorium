# Conversación PO-SM: OntologyAgentEditor

**Fecha**: 2025-12-26
**Plugin objetivo**: Extensión de `agent-creator` con capacidades ontológicas
**Épicas relacionadas**: SCRIPT-1.20.0, SCRIPT-1.21.0, SCRIPT-1.22.0, SCRIPT-1.23.0
**Participantes**: @aleph (PO), @scrum (SM), @flove-ox, @agent-creator, @ox

---

## Sesión 1: Diagnóstico del Estado Actual

### @aleph (Product Owner)

> Tenemos 4 épicas ontológicas:
>
> | Épica | Estado | Entregables |
> |-------|--------|-------------|
> | SCRIPT-1.20.0 FVEEditor | 30% | Template CONFLUENTISM, exportadores |
> | SCRIPT-1.21.0 Metamodel | 35% | Validación UFO, principios FAIR |
> | SCRIPT-1.22.0 Agentes | **100%** | 5 agentes especializados |
> | SCRIPT-1.23.0 MMCO | 16% | Pipeline coherencia φ |
>
> El gap: **AGENT_CREATOR no sabe usar nada de esto**.
>
> Quiero que un usuario pueda:
> 1. Crear un agente con "alma ontológica"
> 2. Validar que su ontología es coherente
> 3. Exportar schemas tipados para el agente

---

### @scrum (Scrum Master)

> Entendido. Identifico 3 gaps técnicos:
>
> **Gap 1: Schema de receta**  
> `recipe.json` no tiene campo `ontology` ni `paradigm`.
>
> **Gap 2: Flujo de creación**  
> `crear-agente.prompt.md` no pregunta por paradigma ontológico.
>
> **Gap 3: Validación**  
> No hay handoff desde AgentCreator hacia FVEEditor para validar.

---

### @flove-ox (Orquestador Ontológico)

> Desde mi perspectiva, puedo ofrecer:
>
> ```
> ┌──────────────────────────────────────────────────────────────┐
> │                 CAPACIDADES DISPONIBLES                       │
> ├──────────────────────────────────────────────────────────────┤
> │                                                                │
> │   @flovedocs   → Cargar template de 3 niveles                 │
> │   @metamodel   → Validar contra UFO (5 capas)                 │
> │   @mmco        → Calcular coherencia φ (vector 5D, NO escalar)│
> │                                                                │
> │   NOTA (2025-12-28): φ es un vector multi-dimensional:        │
> │   Φ = (φ_verdad, φ_poder, φ_material, φ_limites, φ_registro)  │
> │   Cada dimensión usa técnica O.R.G.A.N.I.Z.E diferente.       │
> │   Ver SCRIPT-1.23.0 para caracterización MMCO completa.       │
> │                                                                │
> └──────────────────────────────────────────────────────────────┘
> ```
>
> Lo que necesito de @agent-creator:
> - Campo `ontology` en receta con schema a validar
> - Handoff "Solicitar paradigma" que me invoque

---

### @agent-creator

> Actualmente mi flujo es:
>
> ```
> 1. Elegir agente(s) base
> 2. Conectar fuente de datos
> 3. Definir especialidad
> 4. Generar agent.md + recipe.json
> 5. [Opcional] Desplegar en Teatro ARG
> ```
>
> Propongo ampliar el paso 3:
>
> ```
> 3a. Definir especialidad
> 3b. [Opcional] ¿Tiene paradigma ontológico?
>     → Sí: Invocar @flove-ox para seleccionar/crear
>     → No: Continuar sin validación
> ```
>
> Esto añade campos a la receta:
> ```json
> {
>   "ontology": {
>     "paradigm": "CONFLUENTISM|UFO|custom",
>     "schema_path": "ARCHIVO/PLUGINS/FLOVE_EDITOR/schemas/...",
>     "validated": true,
>     "mmco_score": {
>       "phi_verdad": 0.85,
>       "phi_poder": 0.72,
>       "phi_material": 0.90,
>       "phi_limites": 0.78,
>       "phi_registro": 0.88
>     }
>   }
> }
> ```
>
> **Nota (2025-12-28)**: `mmco_score` es ahora un vector 5D, no un escalar. Cada dimensión corresponde a una bandera con su técnica O.R.G.A.N.I.Z.E específica. Ver SCRIPT-1.23.0 refactorizada.

---

### @ox (Meta-coordinador)

> Desde la perspectiva de la ontología del sistema:
>
> **Lo que ya tenemos bien:**
> - 5 agentes FVEEditor funcionando (SCRIPT-1.22.0 ✅)
> - Mapeos FVE↔UFO↔MMCO documentados
>
> **Lo que falta integrar:**
> - AGENT_CREATOR no conoce estos agentes
> - TypedPrompting podría validar los schemas
> - El Teatro ARG podría usar personajes con "alma ontológica"
>
> **Propuesta de bridges:**
> ```
> @agent-creator ──[solicitar paradigma]──▶ @flove-ox
> @flove-ox ──[validar UFO]──▶ @metamodel
> @flove-ox ──[calcular φ]──▶ @mmco
> @agent-creator ──[exportar schema]──▶ @typed-prompting
> ```

---

## Sesión 2: Diseño de la Integración

### @aleph

> Apruebo la arquitectura de @ox. Ahora definamos los entregables:
>
> **Story 1: Extensión del Schema de Receta**
> - Añadir bloque `ontology` opcional
> - Validar con AJV o Zod
>
> **Story 2: Handoffs AgentCreator → FVEOx**
> - Nuevo handoff "Asignar paradigma ontológico"
> - Nuevo handoff "Validar coherencia ontológica"
>
> **Story 3: Prompt de Creación Extendido**
> - Modificar `crear-agente.prompt.md` con paso 3b
>
> **Story 4: Tests de Auditoría Ontológica**
> - Añadir tests específicos a agentes con ontología
> - Heredar tests de @yellowflag + @metamodel

---

### @scrum

> Estructuro como backlog borrador:
>
> **Effort estimado**: 15 pts (3 sprints de 5 pts cada uno)
>
> | Story | Descripción | Effort | Prioridad |
> |-------|-------------|--------|-----------|
> | S01 | Schema recipe.ontology | 3 | Must |
> | S02 | Handoffs bidireccionales | 5 | Must |
> | S03 | Prompt crear-agente extendido | 3 | Must |
> | S04 | Tests de auditoría | 2 | Should |
> | S05 | Documentación e integración | 2 | Must |
>
> **Dependencias resueltas:**
> - ✅ SCRIPT-1.22.0 completada (agentes disponibles)
> - 🔄 SCRIPT-1.20.0 S07 pendiente (esta story la cierra)
> - 🔄 SCRIPT-1.21.0 S04 pendiente (valida contra UFO)

---

## Decisiones

| ID | Decisión | Rationale |
|----|----------|-----------|
| D1 | `ontology` es opcional en recetas | No forzar ontología a agentes simples |
| D2 | `paradigm` soporta valores: CONFLUENTISM, UFO, custom | Extensible a futuro |
| D3 | Validación se ejecuta on-demand, no automática | Evita bloquear flujo de creación |
| D4 | mmco_score se almacena en receta | Trazabilidad de coherencia |
| D5 | Tests ontológicos heredan de @yellowflag | Consistencia con límites conceptuales |

---

## Siguiente paso

- [x] Generar backlog borrador `01_backlog-borrador.md`
- [x] Aprobar con usuario
- [x] Publicar en BACKLOG-SCRIPTORIUM.md como SCRIPT-1.24.0

