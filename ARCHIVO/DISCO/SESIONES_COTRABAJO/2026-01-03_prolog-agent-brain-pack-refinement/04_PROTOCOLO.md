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
    └── 04_PROTOCOLO.md           # Esta copia
```

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

## 5. Formato de Acta

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

---

## 6. Reglas de Coordinación

### Lectura Mínima Necesaria

| Contexto | Qué leer |
|----------|----------|
| Primer turno | 00_SESION.md + 03_REFERENCIAS/ |
| Turnos siguientes | 00_SESION.md + últimas 2-3 actas |
| Turno de revisión | Todas las actas del tema a revisar |

### Bloqueos

Si un agente necesita input que no está en la carpeta:

1. Cambiar estado a ⛔ BLOCKED
2. Especificar qué necesita y de quién
3. Añadir nota en 01_TABLERO.md
4. El siguiente en cola puede tomar turno si es independiente

### Cierre de Sesión

Para cerrar una sesión:

1. Último agente crea acta de cierre
2. Actualiza 00_SESION.md → Estado: 🔴 CERRADA
3. Añade resumen ejecutivo en 00_SESION.md

---

## 7. Gobernanza

Este protocolo es gobernado por la tríada de auto-reflexión:

| Agente | Rol |
|--------|-----|
| @ox | Auditoría técnica de sesiones |
| @indice | Validación de estructura DRY |
| @scrum | Integración con backlogs |
