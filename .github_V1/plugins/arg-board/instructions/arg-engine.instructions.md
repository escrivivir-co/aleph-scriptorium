# Instrucciones del Motor ARG

> **Plugin**: arg-board v1.0.0  
> **Framework**: AlephScript 7GL

---

## 1. Contexto General

Este plugin implementa un **motor de juego ARG (Alternate Reality Game)** transmedia basado en el framework **AlephScript 7GL**, que trata el desarrollo de software como **producción teatral**.

### Conceptos Clave

| Concepto | Descripción |
|----------|-------------|
| **Teatro** | Proyecto/espacio de juego |
| **Obra** | Partida o aventura específica |
| **Actor** | Participante (humano o agente IA) |
| **Turno** | Unidad de tiempo de juego |
| **BOE** | Registro inmutable de eventos |
| **BDC** | Feed de conversaciones como evidencia |
| **Monomito** | Estructura narrativa del Camino del Héroe |

---

## 2. Arquitectura del Sistema

### Componentes Core

```
┌─────────────────────────────────────────────────────────────┐
│                    TEATRO ARRAKIS                           │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐       │
│  │ ARRAKIS │  │   BOE   │  │  GIT    │  │  DECO   │       │
│  │(director)│  │(registro)│ │(turnos) │  │(válida) │       │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘       │
│       │            │            │            │             │
│       └────────────┴────────────┴────────────┘             │
│                         │                                   │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐       │
│  │  HEROE  │  │ IMPRESS │  │  MBOX   │  │PLATFORM │       │
│  │(jugador)│  │  (3D)   │  │(emails) │  │  (com)  │       │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘       │
└─────────────────────────────────────────────────────────────┘
```

### Flujo de Datos

```
Plataformas → BDC → BOE → Git → Decoherence → Reportes
     ↑                              │
     └──────────────────────────────┘
```

---

## 3. Estados del Teatro

La máquina de estados del teatro sigue este flujo:

```
GENESIS → CASTING → REGISTRANDO_OBRAS → PREPARANDO_ESTRENO
                                              │
                                              ▼
         CLAUSURADO ← CLAUSURANDO ← EVALUANDO ← EN_CARTEL ← EN_ESCENA
```

### Transiciones

| Estado Actual | Evento | Estado Siguiente |
|---------------|--------|------------------|
| - | `/arrakis-genesis` | GENESIS |
| GENESIS | Estructura creada | CASTING |
| CASTING | Actores registrados | REGISTRANDO_OBRAS |
| REGISTRANDO_OBRAS | Obras creadas | PREPARANDO_ESTRENO |
| PREPARANDO_ESTRENO | Estreno invocado | EN_ESCENA |
| EN_ESCENA | Primer turno | EN_CARTEL |
| EN_CARTEL | Evaluación programada | EVALUANDO |
| EVALUANDO | Continuar | EN_CARTEL |
| EVALUANDO | Clausurar | CLAUSURANDO |
| CLAUSURANDO | Cierre completo | CLAUSURADO |

---

## 4. El Camino del Héroe (Monomito)

### 12 Etapas

| # | Etapa | Fase | Primitiva AlephScript |
|---|-------|------|----------------------|
| 1 | Mundo Ordinario | PARTIDA | `DECLARA ESTADO_INICIAL` |
| 2 | Llamada a la Aventura | PARTIDA | `RECIBE LLAMADA` |
| 3 | Rechazo de la Llamada | PARTIDA | `EVALUA RIESGO` |
| 4 | Encuentro con el Mentor | PARTIDA | `BUSCA MENTOR` |
| 5 | Cruce del Umbral | INICIACIÓN | `CRUZA UMBRAL` |
| 6 | Pruebas, Aliados, Enemigos | INICIACIÓN | `ENFRENTA PRUEBAS` |
| 7 | Acercamiento a la Cueva | INICIACIÓN | `PREPARA CLIMAX` |
| 8 | Ordalía | INICIACIÓN | `SUPERA ORDALIA` |
| 9 | Recompensa | RETORNO | `OBTIENE ELIXIR` |
| 10 | Camino de Regreso | RETORNO | `INICIA RETORNO` |
| 11 | Resurrección | RETORNO | `TRANSFORMA` |
| 12 | Regreso con el Elixir | RETORNO | `COMPARTE ELIXIR` |

---

## 5. Arquetipos DevOps → Narrativos

### Mapeo

| Arquetipo | Rol DevOps | Fase Principal |
|-----------|------------|----------------|
| HERALD | Product Owner | GENESIS |
| THRESHOLD_GUARDIAN | Scrum Master | GENESIS→CASTING |
| SHAPESHIFTER | Frontend Dev | CASTING→EN_CARTEL |
| ALLY | Backend Dev | CASTING→EN_CARTEL |
| MENTOR | Database Admin | EN_CARTEL |
| TRICKSTER | DevOps Engineer | EN_CARTEL→CLAUSURADO |
| SHADOW | QA/Tester | EN_CARTEL |
| GODDESS | SysAdmin | GENESIS+CLAUSURADO |

---

## 6. Estructura de Datos

### Directorios del Sistema

```
.arrakis/                    # Estado del teatro
├── theater_state.json
├── obras.json
├── actores.json
├── monomitos.json
└── tickets.json

.heroe/{id}/                 # Estado de cada héroe
├── state.json
├── lore.md
├── credentials.json.enc
└── cache/

BOE/                         # Registro oficial
└── boe-YYYY-MM-DD.json

ChatExport_*/                # BDCs
└── result.json

DECOHERENCE/                 # Validación
├── index.json
├── cache/
└── reports/
```

---

## 7. Buenas Prácticas

### Al Desarrollar Obras

1. **Definir objetivo claro** para cada monomito
2. **Registrar actores** antes de estrenar
3. **Validar coherencia** antes de cerrar turnos
4. **Documentar decisiones** en BOE

### Al Usar Agentes

1. **Delegar** operaciones especializadas
2. **No modificar** BOE directamente (usar agente BOE)
3. **Sincronizar** con Decoherence regularmente
4. **Persistir** estado en checkpoints

### Al Gestionar Plataformas

1. **Registrar** plataformas en BOE
2. **Respetar** autoridades agénticas
3. **Replicar** regularmente a BDCs
4. **Notificar** conflictos detectados

---

## 8. Referencias

- [00_INDEX.md](../docs/00_INDEX.md) — Índice de documentación AlephScript
- [arrakis.agent.md](../agents/arrakis.agent.md) — Agente director
- [manifest.md](../manifest.md) — Metadatos del plugin

