---
name: Protocolo de Cotrabajo Multi-Agente
description: Reglas para sesiones de trabajo colaborativo asíncrono entre agentes.
applyTo: "ARCHIVO/DISCO/SESIONES_COTRABAJO/**/*.md"
---

# Protocolo de Cotrabajo Multi-Agente

> **Épica**: COWORK-1.0.0  
> **Versión**: 1.0.0  
> **Propósito**: Coordinar trabajo asíncrono entre múltiples agentes usando ficheros como medio de comunicación.

---

## 1. Principio Fundamental

> **El chat NO es el medio de trabajo — los ficheros SÍ.**

Los agentes NO pueden usar el chat para transmitir información sustantiva. El chat solo sirve para indicar **estados de coordinación**. Todo contenido debe quedar registrado en la carpeta de sesión.

---

## 2. Estructura de Carpeta de Sesión

```
ARCHIVO/DISCO/SESIONES_COTRABAJO/
└── {YYYY-MM-DD}_{tema-kebab}/
    ├── 00_SESION.md              # Metadatos de la sesión
    ├── 01_TABLERO.md             # Índice DRY de turnos
    ├── 02_ACTAS/                 # Contenido por turno
    │   ├── T001_{agente}_{tema}.md
    │   └── ...
    ├── 03_REFERENCIAS/           # Material de contexto
    │   ├── backlog.md
    │   └── fuentes.md
    └── 04_PROTOCOLO.md           # Copia de este protocolo
```

### 2.1 Fichero 00_SESION.md

```markdown
# Sesión: {Tema}

## Metadatos

| Campo | Valor |
|-------|-------|
| **Fecha inicio** | YYYY-MM-DD HH:MM |
| **Estado** | 🟢 ACTIVA / 🟡 PAUSADA / 🔴 CERRADA |
| **Épica relacionada** | {EPIC-ID} |
| **Carpeta** | ARCHIVO/DISCO/SESIONES_COTRABAJO/{nombre}/ |

## Participantes

| Agente | Rol | Estado actual |
|--------|-----|---------------|
| @agente1 | {rol} | {ESTADO} |
| @agente2 | {rol} | {ESTADO} |

## Objetivo

{Descripción del objetivo de la sesión}

## Restricciones

- {Restricción 1}
- {Restricción 2}

## Referencias de Backlog

- [{EPIC-ID}](ruta/al/borrador)
```

### 2.2 Fichero 01_TABLERO.md (Índice DRY)

```markdown
# Tablero de Turnos

> **Regla DRY**: Este fichero es un ÍNDICE. El contenido está en 02_ACTAS/.

## Turno Actual

| # | Agente | Estado | Acta |
|---|--------|--------|------|
| 3 | @agente2 | ✍️ WRITING | [T003](02_ACTAS/T003_agente2_tema.md) |

## Historial de Turnos

| # | Agente | Inicio | Fin | Resumen (1 línea) | Acta |
|---|--------|--------|-----|-------------------|------|
| 1 | @agente1 | 10:00 | 10:15 | Definió estructura inicial | [T001](02_ACTAS/T001_...) |
| 2 | @agente3 | 10:20 | 10:35 | Revisó y añadió tests | [T002](02_ACTAS/T002_...) |

## Cola de Espera

| Posición | Agente | Prioridad |
|----------|--------|-----------|
| 1 | @agente1 | Normal |
| 2 | @agente4 | Alta (bloqueado) |
```

### 2.3 Carpeta 02_ACTAS/

Cada turno genera un fichero con formato:

```markdown
# Acta T{NNN}: {Tema del turno}

## Metadatos

| Campo | Valor |
|-------|-------|
| **Turno** | {NNN} |
| **Agente** | @{nombre} |
| **Inicio** | YYYY-MM-DD HH:MM |
| **Fin** | YYYY-MM-DD HH:MM |
| **Estado final** | ✅ DONE |

## Contexto Leído

- Actas revisadas: T001, T002
- Referencias consultadas: {lista}

## Aportación

{Contenido sustantivo del turno}

## Decisiones Tomadas

1. {Decisión 1}
2. {Decisión 2}

## Preguntas para Siguientes Turnos

- [ ] {Pregunta 1} → sugerido: @agente
- [ ] {Pregunta 2}

## Siguiente Turno Sugerido

@{agente} para {tarea}
```

### 2.4 Carpeta 03_REFERENCIAS/

Contiene extractos relevantes, NO copias completas:

- `backlog.md` — Extracto del backlog relevante
- `fuentes.md` — Links y referencias externas
- Otros ficheros según necesidad

### 2.5 Fichero 04_PROTOCOLO.md

Copia inmutable de esta instrucción para que los agentes la consulten sin dependencias externas.

---

## 3. Estados de Agente

| Estado | Código | Emoji | Uso en chat |
|--------|--------|-------|-------------|
| Sin turno | `IDLE` | ⚪ | "⚪ IDLE" |
| Esperando | `WAITING` | ⏳ | "⏳ WAITING - posición 2" |
| Leyendo | `READING` | 📖 | "📖 READING 01_TABLERO.md" |
| Pensando | `THINKING` | 🤔 | "🤔 THINKING" |
| Escribiendo | `WRITING` | ✍️ | "✍️ WRITING T003" |
| Revisando | `REVIEWING` | 🔍 | "🔍 REVIEWING T002" |
| Bloqueado | `BLOCKED` | ⛔ | "⛔ BLOCKED - necesito input de @ox" |
| Completado | `DONE` | ✅ | "✅ DONE T003 - turno para @aleph" |

### Regla de Comunicación en Chat

> **PROHIBIDO**: Transmitir contenido sustantivo en el chat.  
> **PERMITIDO**: Solo estados de la enumeración anterior.

**Ejemplo correcto**:
```
Usuario: @aleph ¿cómo vas?
Aleph: ✍️ WRITING T003 - 02_ACTAS/T003_aleph_estructura.md
```

**Ejemplo incorrecto**:
```
Usuario: @aleph ¿cómo vas?
Aleph: Estoy trabajando en la estructura, creo que deberíamos usar...
       [contenido que debería estar en el acta]
```

---

## 4. Flujo de Turno

```
┌─────────────────────────────────────────────────────────────┐
│                    CICLO DE TURNO                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. VERIFICAR TURNO                                         │
│     └─► Leer 01_TABLERO.md → ¿Es mi turno?                 │
│         ├─► NO → Estado: ⏳ WAITING                         │
│         └─► SÍ → Continuar                                  │
│                                                             │
│  2. LEER CONTEXTO                                           │
│     └─► Estado: 📖 READING                                  │
│         ├─► Leer 00_SESION.md (objetivo, restricciones)     │
│         ├─► Leer últimas N actas en 02_ACTAS/               │
│         └─► Leer 03_REFERENCIAS/ si es necesario            │
│                                                             │
│  3. PROCESAR                                                │
│     └─► Estado: 🤔 THINKING                                 │
│         └─► Analizar contexto, preparar aportación          │
│                                                             │
│  4. ESCRIBIR ACTA                                           │
│     └─► Estado: ✍️ WRITING                                  │
│         ├─► Crear 02_ACTAS/T{NNN}_{agente}_{tema}.md        │
│         └─► Seguir formato de acta                          │
│                                                             │
│  5. ACTUALIZAR TABLERO                                      │
│     └─► Editar 01_TABLERO.md                                │
│         ├─► Mover turno actual a historial                  │
│         ├─► Añadir resumen DRY (1 línea)                    │
│         └─► Asignar siguiente turno                         │
│                                                             │
│  6. PASAR TURNO                                             │
│     └─► Estado: ✅ DONE T{NNN} - turno para @{siguiente}    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Reglas de Coordinación

### 5.1 Lectura Mínima Necesaria

| Contexto | Qué leer |
|----------|----------|
| Primer turno | 00_SESION.md + 03_REFERENCIAS/ |
| Turnos siguientes | 00_SESION.md + últimas 2-3 actas |
| Turno de revisión | Todas las actas del tema a revisar |

### 5.2 Conflictos de Turno

Si dos agentes creen tener el turno:

1. Verificar timestamp en 01_TABLERO.md
2. El más reciente tiene prioridad
3. El otro pasa a ⏳ WAITING

### 5.3 Bloqueos

Si un agente necesita input que no está en la carpeta:

1. Cambiar estado a ⛔ BLOCKED
2. Especificar qué necesita y de quién
3. Añadir nota en 01_TABLERO.md
4. El siguiente en cola puede tomar turno si es independiente

### 5.4 Cierre de Sesión

Para cerrar una sesión:

1. Último agente crea acta de cierre
2. Actualiza 00_SESION.md → Estado: 🔴 CERRADA
3. Añade resumen ejecutivo en 00_SESION.md
4. Opcional: mover a ARCHIVO/DISCO/SESIONES_ARCHIVADAS/

---

## 6. Integración con Scrum

### Inicio de Sesión desde Backlog

```
@scriptorium-pack cotrabajo iniciar
  --tema "Diseño arquitectura EPIC-X"
  --participantes @aleph @ox @indice
  --backlog ARCHIVO/DISCO/BACKLOG_BORRADORES/mi-epic/
  --objetivo "Producir documento de diseño técnico"
```

### Cierre de Sesión con Tracking

Al cerrar, el resumen ejecutivo puede convertirse en:

- Entrada en borrador de backlog
- Acta de asamblea
- Input para retrospectiva

---

## 7. Comandos del Agente

| Comando | Acción |
|---------|--------|
| `cotrabajo iniciar` | Crea carpeta de sesión + ficheros base |
| `cotrabajo turno` | Muestra quién tiene el turno actual |
| `cotrabajo estado` | Muestra estado de todos los participantes |
| `cotrabajo siguiente` | Pasa turno al siguiente en cola |
| `cotrabajo cerrar` | Cierra sesión con resumen |

---

## 8. Métricas de Sesión

Al cerrar sesión, registrar en 00_SESION.md:

| Métrica | Valor |
|---------|-------|
| Turnos totales | {N} |
| Participantes activos | {N} |
| Bloqueos | {N} |
| Duración total | {HH:MM} |
| Actas producidas | {N} |
| Decisiones tomadas | {N} |

---

## 9. Ejemplo de Sesión Completa

```
SESIONES_COTRABAJO/
└── 2026-01-03_diseno-cowork-protocol/
    ├── 00_SESION.md
    │   Estado: 🟢 ACTIVA
    │   Participantes: @aleph, @ox, @scrum
    │   Objetivo: Diseñar protocolo de cotrabajo
    │
    ├── 01_TABLERO.md
    │   Turno actual: 3 - @scrum - ✍️ WRITING
    │   Historial: T001(@aleph), T002(@ox)
    │
    ├── 02_ACTAS/
    │   ├── T001_aleph_estructura-inicial.md
    │   ├── T002_ox_validacion-tecnica.md
    │   └── T003_scrum_integracion-backlog.md (en progreso)
    │
    ├── 03_REFERENCIAS/
    │   ├── backlog.md (extracto COWORK-1.0.0)
    │   └── fuentes.md (links a auto-reflexion, scrum-protocol)
    │
    └── 04_PROTOCOLO.md (copia de esta instrucción)
```

---

## 10. Gobernanza

Este protocolo es gobernado por la tríada de auto-reflexión:

| Agente | Rol |
|--------|-----|
| @ox | Auditoría técnica de sesiones |
| @indice | Validación de estructura DRY |
| @scrum | Integración con backlogs |

Cambios a este protocolo requieren:
1. Propuesta en sesión de cotrabajo
2. Aprobación por mayoría de participantes
3. Documentación en asamblea
