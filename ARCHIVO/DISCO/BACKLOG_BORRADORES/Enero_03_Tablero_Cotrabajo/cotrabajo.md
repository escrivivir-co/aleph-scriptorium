---
layout: default
title: "Cotrabajo Multi-Agente"
description: "Guía para organizar sesiones de trabajo colaborativo entre agentes"
---

# Cotrabajo Multi-Agente

> **Versión**: 1.0.0 (COWORK-1.0.0)  
> **Plugin**: scriptorium-pack  
> **Fecha**: 2026-01-03

---

## ¿Qué es el Cotrabajo?

El **Cotrabajo** es un protocolo para organizar sesiones de trabajo colaborativo **asíncrono** entre múltiples agentes. 

La idea clave es simple:

> **El chat es un semáforo, no una autopista.**

Esto significa que los agentes NO usan el chat para transmitir información sustantiva. El chat solo sirve para indicar **estados de coordinación**. Todo el contenido queda registrado en ficheros.

---

## ¿Por qué usar Cotrabajo?

| Problema sin Cotrabajo | Solución con Cotrabajo |
|------------------------|------------------------|
| Información dispersa en chats | Todo en carpeta estructurada |
| Sin trazabilidad de decisiones | Cada turno genera un acta |
| Conflictos de edición | Turnos explícitos |
| Difícil reconstruir qué pasó | Historial en tablero DRY |

---

## Inicio Rápido

### 1. Iniciar una sesión

```
@scriptorium-pack cotrabajo iniciar
```

Se te pedirá:
- **Tema**: Nombre de la sesión (kebab-case)
- **Participantes**: Lista de agentes (@ox, @indice, @scrum, ...)
- **Objetivo**: Qué producir
- **Backlog** (opcional): Épica relacionada

### 2. Estructura creada

```
ARCHIVO/DISCO/SESIONES_COTRABAJO/2026-01-03_mi-tema/
├── 00_SESION.md       # Metadatos
├── 01_TABLERO.md      # Quién tiene el turno
├── 02_ACTAS/          # Contenido producido
├── 03_REFERENCIAS/    # Material de contexto
└── 04_PROTOCOLO.md    # Reglas de coordinación
```

### 3. Flujo de trabajo

1. Abre VS Code con N sesiones de chat (una por agente)
2. Cada agente lee el tablero para ver si es su turno
3. Si es su turno, cambia estado y trabaja
4. Al terminar, escribe su acta y pasa el turno

---

## Estados de Agente

Los agentes solo pueden comunicar estos estados en el chat:

| Estado | Emoji | Significado | Ejemplo en chat |
|--------|-------|-------------|-----------------|
| Sin turno | ⚪ | No asignado | "⚪ IDLE" |
| Esperando | ⏳ | En cola | "⏳ WAITING - posición 2" |
| Leyendo | 📖 | Contexto | "📖 READING 01_TABLERO.md" |
| Pensando | 🤔 | Procesando | "🤔 THINKING" |
| Escribiendo | ✍️ | Produciendo | "✍️ WRITING T003" |
| Revisando | 🔍 | Auditando | "🔍 REVIEWING T002" |
| Bloqueado | ⛔ | Necesita input | "⛔ BLOCKED - necesito @ox" |
| Completado | ✅ | Turno listo | "✅ DONE T003 - turno @aleph" |

### ⚠️ Importante

**PROHIBIDO**: Escribir contenido sustantivo en el chat.

```
❌ INCORRECTO
Usuario: @aleph ¿cómo vas?
Aleph: Estoy trabajando en la estructura del API. 
       Creo que deberíamos usar REST en vez de GraphQL porque...

✅ CORRECTO  
Usuario: @aleph ¿cómo vas?
Aleph: ✍️ WRITING T003 - 02_ACTAS/T003_aleph_estructura-api.md
```

---

## El Tablero (01_TABLERO.md)

El tablero es un **índice DRY** que muestra:

### Turno Actual

| # | Agente | Estado | Acta |
|---|--------|--------|------|
| 3 | @indice | ✍️ WRITING | [T003](02_ACTAS/T003_indice_validacion.md) |

### Historial de Turnos

| # | Agente | Inicio | Fin | Resumen (1 línea) | Acta |
|---|--------|--------|-----|-------------------|------|
| 1 | @ox | 10:00 | 10:15 | Definió arquitectura | [T001](02_ACTAS/T001_ox_arquitectura.md) |
| 2 | @scrum | 10:20 | 10:35 | Añadió tracking | [T002](02_ACTAS/T002_scrum_tracking.md) |

### Cola de Espera

| Posición | Agente | Prioridad |
|----------|--------|-----------|
| 1 | @aleph | Normal |
| 2 | @ox | Alta (bloqueado) |

---

## Las Actas (02_ACTAS/)

Cada turno produce un fichero con formato estándar:

```markdown
# Acta T003: Validación de estructura

## Metadatos

| Campo | Valor |
|-------|-------|
| **Turno** | 003 |
| **Agente** | @indice |
| **Inicio** | 2026-01-03 10:40 |
| **Fin** | 2026-01-03 10:55 |
| **Estado final** | ✅ DONE |

## Contexto Leído

- Actas revisadas: T001, T002
- Referencias: backlog.md, Tecnico.md

## Aportación

[Aquí va el contenido sustantivo del trabajo]

## Decisiones Tomadas

1. Usar estructura X en vez de Y
2. Añadir validación Z

## Preguntas para Siguientes Turnos

- [ ] ¿Cómo manejar caso límite W? → sugerido: @ox
- [ ] ¿Incluir tests? → sugerido: @scrum

## Siguiente Turno Sugerido

@aleph para implementar las decisiones
```

---

## Ciclo de Turno

```
┌────────────────────────────────────────────────────────┐
│                    CICLO DE TURNO                      │
├────────────────────────────────────────────────────────┤
│                                                        │
│  1. VERIFICAR                                          │
│     └─► Leer 01_TABLERO.md                            │
│         ├─► ¿Es mi turno? NO → ⏳ WAITING             │
│         └─► ¿Es mi turno? SÍ → continuar              │
│                                                        │
│  2. LEER                                               │
│     └─► Estado: 📖 READING                            │
│         └─► Leer actas anteriores + referencias       │
│                                                        │
│  3. PENSAR                                             │
│     └─► Estado: 🤔 THINKING                           │
│         └─► Analizar y preparar aportación            │
│                                                        │
│  4. ESCRIBIR                                           │
│     └─► Estado: ✍️ WRITING                            │
│         └─► Crear 02_ACTAS/T00X_agente_tema.md        │
│                                                        │
│  5. ACTUALIZAR TABLERO                                 │
│     └─► Editar 01_TABLERO.md                          │
│         └─► Mover turno a historial + asignar next    │
│                                                        │
│  6. PASAR TURNO                                        │
│     └─► Estado: ✅ DONE T00X - turno para @next       │
│                                                        │
└────────────────────────────────────────────────────────┘
```

---

## Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `@scriptorium-pack cotrabajo iniciar` | Crear nueva sesión |
| `@scriptorium-pack cotrabajo turno` | Ver quién tiene el turno |
| `@scriptorium-pack cotrabajo estado` | Estado de todos los participantes |
| `@scriptorium-pack cotrabajo siguiente` | Pasar turno al siguiente |
| `@scriptorium-pack cotrabajo cerrar` | Cerrar sesión con resumen |

---

## Ejemplo Práctico

### Escenario: Diseñar API de un nuevo servicio

**Participantes**: @ox (arquitectura), @indice (validación DRY), @scrum (tracking)

**Sesión**: `SESIONES_COTRABAJO/2026-01-03_diseño-api-notificaciones/`

---

**Turno 1: @ox**

Chat: "✍️ WRITING T001 - 02_ACTAS/T001_ox_arquitectura.md"

Acta T001:
```markdown
## Aportación

Propongo la siguiente estructura de endpoints:

- POST /notifications - Crear notificación
- GET /notifications/{id} - Obtener por ID
- PUT /notifications/{id}/read - Marcar como leída
- DELETE /notifications/{id} - Eliminar

Patrón: RESTful con versionado en URL (/v1/).

## Siguiente Turno

@indice para validar coherencia con otros servicios
```

Chat: "✅ DONE T001 - turno @indice"

---

**Turno 2: @indice**

Chat: "📖 READING T001"
Chat: "🤔 THINKING"
Chat: "✍️ WRITING T002"

Acta T002:
```markdown
## Contexto Leído

- T001: Propuesta REST de @ox

## Aportación

Verificación de coherencia:
- ✅ Patrón RESTful consistente con otros servicios
- ✅ Versionado en URL coincide con convención
- ⚠️ Falta endpoint de bulk operations

Propuesta: Añadir POST /notifications/bulk para crear múltiples.

## Siguiente Turno

@scrum para definir tracking de implementación
```

Chat: "✅ DONE T002 - turno @scrum"

---

**Turno 3: @scrum**

Chat: "✍️ WRITING T003"

Acta T003:
```markdown
## Aportación

Tasks para backlog:

| ID | Descripción | Effort |
|----|-------------|--------|
| T001 | Implementar POST /notifications | 3 |
| T002 | Implementar GET /notifications/{id} | 2 |
| T003 | Implementar PUT /read | 2 |
| T004 | Implementar DELETE | 2 |
| T005 | Implementar POST /bulk | 3 |

Total: 12 pts

## Decisiones

1. Añadir bulk operations por sugerencia de @indice
2. Prioridad: endpoints básicos primero, bulk al final
```

Chat: "✅ DONE T003 - sesión lista para cerrar"

---

## Resolución de Conflictos

### Dos agentes creen tener el turno

1. Verificar timestamp en 01_TABLERO.md
2. El más reciente tiene prioridad
3. El otro pasa a ⏳ WAITING

### Un agente está bloqueado

1. Cambiar a ⛔ BLOCKED
2. Especificar qué necesita y de quién
3. El siguiente en cola puede tomar turno si es independiente

---

## Cierre de Sesión

Al terminar el trabajo:

1. Último agente crea acta de cierre
2. Actualizar 00_SESION.md → Estado: 🔴 CERRADA
3. Añadir resumen ejecutivo
4. Opcional: mover a SESIONES_ARCHIVADAS/

### Métricas de Sesión

Al cerrar, registrar:

| Métrica | Valor |
|---------|-------|
| Turnos totales | N |
| Participantes activos | N |
| Bloqueos | N |
| Duración total | HH:MM |
| Decisiones tomadas | N |

---

## Integración con Scrum

Las sesiones de cotrabajo pueden:

- **Vincularse a épicas**: Referencia en borrador de backlog
- **Generar entradas**: El resumen se convierte en input para el backlog
- **Alimentar retrospectivas**: Las actas documentan el proceso de decisión

```
@scrum vincular sesión 2026-01-03_diseño-api → EPIC-API-1.0.0
```

---

## FAQ

### ¿Cuántos agentes pueden participar?

No hay límite técnico, pero recomendamos 2-5 para mantener turnos ágiles.

### ¿Puedo saltar turnos?

Sí, si el siguiente en cola tiene trabajo independiente. Documenta en el tablero.

### ¿Qué pasa si un agente no responde?

Después de tiempo prudencial, el siguiente puede tomar el turno. Añadir nota en tablero.

### ¿Puedo tener múltiples sesiones activas?

Sí, cada una tiene su carpeta independiente.

---

## Referencia Técnica

- **Instrucción**: `.github/plugins/scriptorium-pack/instructions/cotrabajo.instructions.md`
- **Prompt**: `.github/plugins/scriptorium-pack/prompts/iniciar-cotrabajo.prompt.md`
- **Agente**: `@scriptorium-pack`
- **Ubicación de sesiones**: `ARCHIVO/DISCO/SESIONES_COTRABAJO/`

---

> "Un sistema que documenta cómo colabora puede colaborar mejor."
