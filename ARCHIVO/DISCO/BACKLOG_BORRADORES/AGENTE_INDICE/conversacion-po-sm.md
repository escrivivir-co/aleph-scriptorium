# Conversación PO-SM: Agente Índice (Gemelo de Lucas)

**Fecha**: 2025-12-24 (Nochebuena)  
**Sprint**: FC1  
**Épica propuesta**: SCRIPT-1.14.0  

---

## Fase 1: Análisis del Problema (SM)

### Contexto

En SCRIPT-1.13.0 creamos:
- `ARCHIVO/DEVOPS/Funcional.md`: Índice para usuarios
- `ARCHIVO/DEVOPS/Tecnico.md`: Índice para equipo técnico
- **Personaje Lucas**: Scrum Master del Índice, desplegado en Teatro ARG

**El problema**: Lucas es un **personaje** (actor en obras), no un **agente del sistema**. Esto significa:
- No está en `.github/agents/` → VS Code no lo detecta como agente invocable
- No tiene handoffs en `@aleph` → No aparece en el flujo de trabajo normal
- No tiene prompts/instructions propios → No es reutilizable fuera del Teatro

### Propuesta

Crear un **agente gemelo** de Lucas que:
1. Viva en `.github/agents/` (detectable por VS Code)
2. Sea invocable desde `@aleph` como cualquier otro agente
3. Mantenga los índices DRY como fuente de verdad
4. Sirva como "portero" que se consulta **antes de cada intervención**

---

## Fase 2: Visión de Producto (PO)

### Casos de uso objetivo

| UC | Actor | Trigger | Resultado |
|----|-------|---------|-----------|
| UC1 | Usuario | "¿Dónde está X?" | Índice responde con ruta exacta |
| UC2 | Agente | Antes de editar | Consulta índice para saber qué leer |
| UC3 | Scrum | Validar coherencia | Detecta desincronización índice↔codebase |
| UC4 | DevOps | Antes de commit | Verifica que índices están actualizados |

### Criterios de éxito

- [ ] Agente detectable por VS Code (`@indice` o similar)
- [ ] Handoff en `@aleph` para consultar índice
- [ ] Prompts para actualizar Funcional.md y Tecnico.md
- [ ] Instrucciones que definen el contrato DRY
- [ ] Tests de coherencia (igual que personaje Lucas)

---

## Fase 3: Debate Técnico

### SM: Nombre del agente

**Opciones**:
| Opción | Invocación | Pros | Contras |
|--------|------------|------|---------|
| A | `@indice` | Corto, descriptivo | Puede confundirse con índice de búsqueda |
| B | `@lucas` | Coherente con personaje | Conflicto potencial con Teatro |
| C | `@indexador` | Acción clara | Largo |
| D | `@mapa` | Metáfora navegación | Menos técnico |

**Decisión propuesta**: `@indice` — Es el más directo y no colisiona con nada.

### PO: Relación con personaje Lucas

El agente `@indice` y el personaje `lucas` son **gemelos**:
- Mismo origen de datos: `ARCHIVO/DEVOPS/`
- Mismos tests de coherencia
- Mismos 5 capacidades

**Diferencia**:
| Aspecto | @indice (agente) | lucas (personaje) |
|---------|------------------|-------------------|
| Ubicación | `.github/agents/` | `ARCHIVO/DISCO/TALLER/ELENCO/` |
| Invocación | `@indice` en chat | Escenas de obras ARG |
| Contexto | Trabajo técnico | Teatro narrativo |
| Handoffs | Desde @aleph | Desde @plugin_ox_argboard |

### SM: Arquitectura del agente

```
.github/
├── agents/
│   └── indice.agent.md           # Agente principal
├── prompts/
│   ├── indice-consultar.prompt.md    # UC1: Consultar índice
│   ├── indice-actualizar.prompt.md   # UC3: Actualizar índice
│   └── indice-validar.prompt.md      # UC4: Validar coherencia
└── instructions/
    └── indice-dry.instructions.md    # Contrato DRY
```

### PO: Flujo de consulta (UC1)

```
Usuario: "¿Dónde documento las instrucciones de un nuevo plugin?"

@aleph → [Consultar índice] → @indice

@indice:
1. Lee Funcional.md → Sección "Memoria ARCHIVO"
2. Lee Tecnico.md → Sección "Ontología .github/"
3. Responde: ".github/plugins/{id}/instructions/{id}.instructions.md"
4. Opcionalmente: Muestra ruta exacta con enlace
```

### SM: Flujo de actualización (UC3)

```
Usuario: "Acabo de añadir un nuevo plugin, actualiza el índice"

@aleph → [Actualizar índice] → @indice

@indice:
1. Escanea .github/plugins/registry.json
2. Compara con Funcional.md y Tecnico.md
3. Detecta discrepancias
4. Propone ediciones concretas
5. Aplica cambios tras aprobación
```

### PO: Flujo de validación pre-commit (UC4)

```
Antes de commit:

@aleph → [Validar coherencia] → @indice

@indice ejecuta tests:
- coherencia_funcional_tecnico: ¿Ambos índices consistentes?
- dry_violation: ¿Hay duplicación?
- indice_desactualizado: ¿Índice refleja realidad?
- archivo_huerfano: ¿Archivos sin documentar?
- commit_sin_trazabilidad: ¿Commit sigue DevOps?

Si falla algún test → Bloquear commit con mensaje
```

---

## Fase 4: Decisiones

| # | Decisión | Rationale |
|---|----------|-----------|
| D1 | Nombre: `@indice` | Descriptivo, corto, no colisiona |
| D2 | Híbrido ox+aleph | Visión funcional + técnica |
| D3 | Fuente única: ARCHIVO/DEVOPS/ | DRY absoluto |
| D4 | Gemelo de Lucas | Comparten lógica, difieren en contexto |
| D5 | 3 prompts + 1 instruction | Consultar, actualizar, validar + contrato |
| D6 | Tests iguales a Lucas | Coherencia entre gemelos |
| D7 | Handoff en @aleph | Integración con flujo principal |

---

## Fase 5: Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Índices desactualizados | Alta | Alto | Prompt de validación pre-commit |
| Duplicación @indice↔lucas | Media | Medio | Documentar que son gemelos, mismo origen |
| Índices demasiado grandes | Baja | Medio | Mantener solo estructura, no contenido |
| Conflicto de nombres | Baja | Bajo | @indice es único en el sistema |

---

## Fase 6: Integración Pre-Commit (Añadida)

**PO**: Quiero que cada vez que un agente vaya a hacer commit, se pase una revisión rápida y NO bloqueante para ver si el índice ha sido violado o necesita ser actualizado.

**SM**: Propuesta de arquitectura:

### Puntos de Integración

1. **copilot-instructions.md §8**: Nueva sección que advierte de la existencia del índice
2. **commit-message.prompt.md Paso 2.5**: Nuevo paso que invoca validación automática

### Flujo Pre-Commit

```
Agente completa trabajo
       │
       ▼
commit-message.prompt.md
       │
       ├── Paso 1: Identificar cambios
       │
       ├── Paso 2: Clasificar por opportunity
       │
       ├── Paso 2.5 (NUEVO): Validar Índice  ←────┐
       │       │                                   │
       │       ▼                                   │
       │   Comparar archivos modificados           │
       │   vs ARCHIVO/DEVOPS/*.md                  │
       │       │                                   │
       │       ├── ✅ OK → continuar               │
       │       │                                   │
       │       └── ⚠️ Warning (no bloqueante)      │
       │               "Índice desactualizado"     │
       │               "Sugerencia: @indice        │
       │                actualizar"                │
       │               (continúa de todos modos)   │
       │                                           │
       ├── Paso 3: Generar mensaje                 │
       │                                           │
       └── Paso 4: Presentar al usuario            │
```

### Características del Warning

- **No bloqueante**: El commit puede continuar
- **Informativo**: Indica qué falta actualizar
- **Accionable**: Sugiere comando `@indice actualizar`
- **Rápido**: Solo compara archivos modificados vs índices

**PO**: Exacto. Que sea un reminder, no un bloqueador.

**SM**: Añado Story S05 con 5 tasks adicionales (3 pts). Total épica: 5 stories, 24 tasks, 18 pts.

| # | Decisión | Rationale |
|---|----------|-----------|
| D8 | Warning no bloqueante | UX fluida, no interrumpe trabajo |
| D9 | Integrar en commit-message.prompt.md | Punto único de entrada a commits |

---

## Siguiente paso

**Estado**: ✅ Aprobado por PO

Backlog borrador generado: `01_backlog-borrador.md`

Siguiente: Publicar épica en BACKLOG-SCRIPTORIUM.md y commitear.
