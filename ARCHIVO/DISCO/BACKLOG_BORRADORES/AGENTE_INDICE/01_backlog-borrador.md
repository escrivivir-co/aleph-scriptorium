# Backlog Borrador: SCRIPT-1.14.0 — Agente Índice

**Estado**: 📝 Borrador (pendiente aprobación)  
**Épica**: SCRIPT-1.14.0  
**Fecha**: 2025-12-24  
**Conversación PO-SM**: `ARCHIVO/DISCO/BACKLOG_BORRADORES/AGENTE_INDICE/conversacion-po-sm.md`

---

## Objetivo

Crear un agente `@indice` integrado en `.github/agents/` que:
1. Sea el gemelo funcional del personaje Lucas
2. Mantenga `Funcional.md` y `Tecnico.md` como única fuente de verdad
3. Sirva como "portero" consultado antes de cada intervención
4. Combine visión @aleph (usuario) + @ox (técnica)

---

## Feature Cycles

| Ciclo | Objetivo | Effort |
|-------|----------|--------|
| FC1 | Agente base + instrucciones + prompts + integración pre-commit | 18 pts |

**Total**: 18 pts

---

## Arquitectura de Integración Pre-Commit

### Flujo de Validación

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      FLUJO PRE-COMMIT CON ÍNDICE                        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   Agente completa trabajo                                                │
│         │                                                                │
│         ▼                                                                │
│   ┌─────────────────┐                                                    │
│   │ commit-message  │ ← Invoca validación automáticamente                │
│   │   .prompt.md    │                                                    │
│   └────────┬────────┘                                                    │
│            │                                                             │
│            ▼                                                             │
│   ┌─────────────────┐     ┌─────────────────┐                           │
│   │ Paso 2.5 (NUEVO)│────▶│ @indice validar │                           │
│   │ Validar Índice  │     │ (no bloqueante) │                           │
│   └────────┬────────┘     └────────┬────────┘                           │
│            │                       │                                     │
│            │              ┌────────┴────────┐                           │
│            │              ▼                 ▼                           │
│            │         ✅ OK              ⚠️ Warning                       │
│            │              │                 │                           │
│            │              │    ┌────────────┴────────────┐              │
│            │              │    │ "Índice desactualizado: │              │
│            │              │    │  - Tecnico.md no tiene  │              │
│            │              │    │    plugin X             │              │
│            │              │    │  Sugerencia: @indice    │              │
│            │              │    │    actualizar"          │              │
│            │              │    └─────────────────────────┘              │
│            │              │                 │                           │
│            ▼              ▼                 ▼                           │
│   ┌─────────────────────────────────────────────────────────┐          │
│   │              Paso 3: Generar mensaje                     │          │
│   │              (continúa normalmente)                      │          │
│   └─────────────────────────────────────────────────────────┘          │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### Puntos de Integración

| Archivo | Cambio | Propósito |
|---------|--------|-----------|
| `copilot-instructions.md` | Nueva sección §8 | Advertir existencia del índice |
| `commit-message.prompt.md` | Nuevo Paso 2.5 | Invocar validación automática |
| `indice-validar.prompt.md` | Crear | Ejecutar 5 tests rápidos |
| `indice-dry.instructions.md` | Crear | Reglas de validación |

### Características del Warning

- **No bloqueante**: El commit puede continuar
- **Informativo**: Indica qué falta actualizar
- **Accionable**: Sugiere comando para corregir
- **Rápido**: Solo compara archivos modificados vs índices

---

## Story: SCRIPT-1.14.0-S01 — Agente Índice Base
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

### Descripción
Crear el agente `@indice` con estructura base, handoffs y relación con Lucas.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T001 | Crear `.github/agents/indice.agent.md` con frontmatter | 1 | ⏳ |
| T002 | Definir 8 handoffs (consultar, actualizar, validar por índice) | 1 | ⏳ |
| T003 | Documentar relación gemelo con personaje Lucas | 0.5 | ⏳ |
| T004 | Definir 5 tests de coherencia (igual que Lucas) | 0.5 | ⏳ |
| T005 | Añadir sección "Flujo de consulta" con ejemplos | 1 | ⏳ |
| T006 | Añadir sección "Contrato DRY" | 1 | ⏳ |

### Criterios de Aceptación
- [ ] AC1: Agente detectable por VS Code (`@indice` aparece en chat)
- [ ] AC2: Contiene 8 handoffs funcionales
- [ ] AC3: Documenta relación con Lucas

### Entregable
```
.github/agents/indice.agent.md
```

---

## Story: SCRIPT-1.14.0-S02 — Instrucciones DRY
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

### Descripción
Crear instrucciones que definen el contrato DRY para los índices.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T007 | Crear `.github/instructions/indice-dry.instructions.md` | 1 | ⏳ |
| T008 | Documentar estructura esperada de Funcional.md | 0.5 | ⏳ |
| T009 | Documentar estructura esperada de Tecnico.md | 0.5 | ⏳ |
| T010 | Definir reglas de actualización (qué añadir, qué no) | 0.5 | ⏳ |
| T011 | Definir applyTo: ARCHIVO/DEVOPS/*.md | 0.5 | ⏳ |

### Criterios de Aceptación
- [ ] AC1: Instructions se aplican automáticamente a ARCHIVO/DEVOPS/
- [ ] AC2: Contiene reglas claras de qué documentar y cómo
- [ ] AC3: Define límites (solo estructura, no contenido completo)

### Entregable
```
.github/instructions/indice-dry.instructions.md
```

---

## Story: SCRIPT-1.14.0-S03 — Prompts del Índice
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

### Descripción
Crear 3 prompts para las operaciones principales del índice.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T012 | Crear `indice-consultar.prompt.md` (UC1) | 1.5 | ⏳ |
| T013 | Crear `indice-actualizar.prompt.md` (UC3) | 1.5 | ⏳ |
| T014 | Crear `indice-validar.prompt.md` (UC4) | 1.5 | ⏳ |
| T015 | Documentar ejemplos de uso en cada prompt | 0.5 | ⏳ |

### Criterios de Aceptación
- [ ] AC1: Prompt consultar responde "¿dónde está X?" con ruta exacta
- [ ] AC2: Prompt actualizar detecta discrepancias y propone ediciones
- [ ] AC3: Prompt validar ejecuta 5 tests y reporta resultado

### Entregables
```
.github/prompts/indice-consultar.prompt.md
.github/prompts/indice-actualizar.prompt.md
.github/prompts/indice-validar.prompt.md
```

---

## Story: SCRIPT-1.14.0-S04 — Integración con Sistema
**Puntos**: 2  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

### Descripción
Integrar `@indice` con @aleph, @ox y el flujo DevOps.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T016 | Añadir handoff `[ÍNDICE] Consultar mapa del proyecto` en aleph.agent.md | 0.5 | ⏳ |
| T017 | Actualizar ox.agent.md con @indice en índice de agentes | 0.5 | ⏳ |
| T018 | Actualizar copilot-instructions.md con @indice | 0.5 | ⏳ |
| T019 | Documentar en Tecnico.md (sección Agentes → Meta) | 0.5 | ⏳ |

### Criterios de Aceptación
- [ ] AC1: @aleph tiene handoff funcional a @indice
- [ ] AC2: @ox lista @indice en capa Meta
- [ ] AC3: copilot-instructions menciona @indice

### Archivos modificados
```
.github/agents/aleph.agent.md
.github/agents/ox.agent.md
.github/copilot-instructions.md
ARCHIVO/DEVOPS/Tecnico.md
```

---

## Story: SCRIPT-1.14.0-S05 — Integración Pre-Commit (Warning Automático)
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

### Descripción
Integrar validación de índice en el flujo de commits para detectar desincronización.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T020 | Añadir sección §8 en copilot-instructions.md sobre Índice DRY | 0.5 | ⏳ |
| T021 | Modificar commit-message.prompt.md: añadir Paso 2.5 "Validar Índice" | 1 | ⏳ |
| T022 | Implementar lógica de warning no bloqueante en Paso 2.5 | 0.5 | ⏳ |
| T023 | Definir formato de warning con sugerencia accionable | 0.5 | ⏳ |
| T024 | Documentar flujo en indice-dry.instructions.md | 0.5 | ⏳ |

### Criterios de Aceptación
- [ ] AC1: Al generar commit, se ejecuta validación automática
- [ ] AC2: Warning es visible pero no bloquea el commit
- [ ] AC3: Warning incluye comando sugerido para corregir

### Archivos modificados
```
.github/copilot-instructions.md (§8 nuevo)
.github/prompts/commit-message.prompt.md (Paso 2.5)
.github/instructions/indice-dry.instructions.md
```

### Ejemplo de Warning

```
⚠️ VALIDACIÓN DE ÍNDICE

El índice puede estar desactualizado:
- Tecnico.md: No menciona plugin "n8n-editor" (detectado en registry.json)
- Funcional.md: OK

Sugerencia: Ejecutar `@indice actualizar` antes o después del commit.
Este warning es informativo y no bloquea el commit.

¿Continuar con el commit? (S/n)
```

---

## Métricas Borrador

| Métrica | Valor |
|---------|-------|
| Stories totales | 5 |
| Tasks totales | 24 |
| Puntos totales | 18 |
| Prioridad Must | 5 stories (18 pts) |
| Completadas | 0 |
| % Avance | 0% |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| SCRIPT-1.13.0 (Lucas + Índices) | ✅ Completada | Base para este feature |
| Funcional.md | ✅ Creado | Índice funcional |
| Tecnico.md | ✅ Creado | Índice técnico |
| Personaje Lucas | ✅ Desplegado | Gemelo en Teatro |

---

## Arquitectura Propuesta

```
.github/
├── agents/
│   ├── indice.agent.md          # ← NUEVO (S01)
│   ├── aleph.agent.md           # ← MODIFICAR (S04)
│   └── ox.agent.md              # ← MODIFICAR (S04)
├── prompts/
│   ├── commit-message.prompt.md     # ← MODIFICAR (S05: Paso 2.5)
│   ├── indice-consultar.prompt.md   # ← NUEVO (S03)
│   ├── indice-actualizar.prompt.md  # ← NUEVO (S03)
│   └── indice-validar.prompt.md     # ← NUEVO (S03)
├── instructions/
│   └── indice-dry.instructions.md   # ← NUEVO (S02)
└── copilot-instructions.md      # ← MODIFICAR (S04 + S05: §8)

ARCHIVO/DEVOPS/
├── Funcional.md                 # Fuente de verdad (usuario)
└── Tecnico.md                   # Fuente de verdad (técnico)
```

---

## Relación @indice ↔ lucas

```
                    ┌─────────────────────────────────────┐
                    │        ARCHIVO/DEVOPS/              │
                    │   Funcional.md  │  Tecnico.md       │
                    │        (Fuente Única de Verdad)     │
                    └──────────┬──────────────┬───────────┘
                               │              │
              ┌────────────────┘              └────────────────┐
              │                                                 │
              ▼                                                 ▼
    ┌─────────────────┐                             ┌─────────────────┐
    │   @indice       │                             │   lucas         │
    │   (agente)      │                             │   (personaje)   │
    ├─────────────────┤                             ├─────────────────┤
    │ .github/agents/ │                             │ ELENCO/lucas/   │
    │ Invocación:     │                             │ Obras ARG:      │
    │   @indice       │                             │   hola_mundo    │
    │ Contexto:       │                             │   camino_...    │
    │   Trabajo       │                             │ Contexto:       │
    │   técnico       │                             │   Teatro        │
    └─────────────────┘                             └─────────────────┘
              │                                                 │
              │                                                 │
              └───────────────────┬─────────────────────────────┘
                                  │
                                  ▼
                    ┌─────────────────────────────────────┐
                    │         MISMOS 5 TESTS              │
                    │  coherencia_funcional_tecnico       │
                    │  dry_violation                      │
                    │  indice_desactualizado              │
                    │  archivo_huerfano                   │
                    │  commit_sin_trazabilidad            │
                    └─────────────────────────────────────┘
```

---

## Casos de Uso Detallados

### UC1: Consultar Índice

```
Usuario: "¿Dónde creo las instrucciones de un nuevo plugin?"

@indice:
1. Consulta Tecnico.md → Sección 2.2 "Ontología .github/"
2. Encuentra: ".github/plugins/{id}/instructions/"
3. Consulta Funcional.md → Sección 4 "Memoria ARCHIVO"
4. Complementa con contexto funcional

Respuesta:
"Las instrucciones de un plugin van en:
 `.github/plugins/{id}/instructions/{id}.instructions.md`
 
 Ver:
 - [Tecnico.md#ontologia](ARCHIVO/DEVOPS/Tecnico.md#2-ontología-github)
 - [PLUGINS.md](PLUGINS.md#estructura-de-un-plugin)"
```

### UC3: Actualizar Índice

```
Usuario: "Acabo de instalar el plugin novelist, actualiza el índice"

@indice:
1. Escanea registry.json → Encuentra "novelist"
2. Compara con Tecnico.md → No está en lista de plugins
3. Propone edición:

   En Tecnico.md, sección 3.1:
   + | novelist | MCP Novelist | Narrativas con memoria | ⏳ |

4. Tras aprobación → Aplica cambio
5. Verifica Funcional.md → Ya está cubierto por descripción genérica
```

### UC4: Validar Pre-Commit

```
Antes de commit:

@indice ejecuta:
✅ coherencia_funcional_tecnico: OK
✅ dry_violation: OK
❌ indice_desactualizado: Tecnico.md no menciona plugin n8n-editor
✅ archivo_huerfano: OK
✅ commit_sin_trazabilidad: OK

Resultado: 1 error

"El índice Tecnico.md no refleja el plugin n8n-editor.
 Añade en sección 3.1 antes de hacer commit."
```

---

## Pendiente Aprobación

| Pregunta | Opciones |
|----------|----------|
| ¿Nombre del agente? | `@indice` (propuesto) vs alternativas |
| ¿Aprobar 4 stories? | Sí / No / Modificar |
| ¿Prioridad correcta? | Todos Must es correcto para MVP |
| ¿Modo de ejecución? | Autónomo (continuar) / Consultivo (pausar) |

---

## Comando para aprobar

```
@scrum aprobar SCRIPT-1.14.0
```

Esto moverá el backlog a `.github/BACKLOG-SCRIPTORIUM.md` y comenzará la implementación.
