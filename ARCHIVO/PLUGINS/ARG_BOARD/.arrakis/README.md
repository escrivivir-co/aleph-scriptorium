# Teatro Arrakis — Scriptorium Transmedia

> **Estado**: CASTING  
> **Temporada**: 1  
> **Modo**: auto (timeout 10 turnos)  
> **Fecha génesis**: 2025-12-20

---

## 🎭 El Teatro

Este es un **juego de Realidad Alternativa (ARG)** transmedia que adapta el proyecto del **Aleph Scriptorium** —un texto fundacional serializado en 12 capítulos durante 2026— al formato teatral del framework AlephScript 7GL.

### Lore

> *Un texto escrito desde una izquierda no ingenua, que sabe que la indignación sin mecanismo se pudre en resentimiento.*

El universo del juego se basa en tres **desplazamientos metodológicos**:

| Desplazamiento | Operación | Capítulos |
|----------------|-----------|-----------|
| **Anacronismo productivo** | Recuperar futuros cancelados como repertorio | 1, 4, 5, 6 |
| **Actores no-humanos** | IA, ecosistemas, infraestructuras como actores políticos | 2, 7, 9 |
| **Problema de la escala** | Decisiones planetarias sin demos legítimo | 3, 8, 11 |

---

## 🎪 Obras Activas

### Call for Fundación (Monomito)

El camino del héroe para completar el texto fundacional.

```
PARTIDA (Ene-Abr)          INICIACIÓN (May-Ago)        RETORNO (Sep-Dic)
├── 1. Mundo Ordinario ✅   ├── 6. Pruebas ⏳           ├── 9. Recompensa ⏳
├── 2. Llamada ✅           ├── 7. Cueva ⏳             ├── 10. Regreso ⏳
├── 3. Rechazo ✅           └── 8. Ordalía ⏳           ├── 11. Resurrección ⏳
├── 4. Mentor ✅                                        └── 12. Elixir ⏳
└── 5. Umbral 🔄
```

**Héroe**: Aleph  
**Etapa actual**: 5 (Cruce del Umbral)  
**Tarea**: Completar Cap01 "Anacronismo productivo"

### Call for Noticias (Periódico)

Producción continua de planas noticieras con método 5W + 3 Banderas.

**Ciclo**: Semanal  
**Planas publicadas**: 3  
**Última**: Humanismo extremo y repliegue

---

## 🎭 Actores Registrados

| Actor | Arquetipo | Rol | Estado |
|-------|-----------|-----|--------|
| **Aleph** | HERALD | Product Owner narrativo | Activo |
| **Blueflag** | MENTOR | Guardián de Verdad | Disponible |
| **Blackflag** | SHADOW | Guardián de Sombras | Disponible |
| **Redflag** | THRESHOLD_GUARDIAN | Guardián de Estructura | Disponible |
| **Periódico** | ALLY | Redacción doctrinal | Activo |
| **Arrakis** | HERALD | Director de Teatro | Activo |

---

## 📜 BOE (Boletín Oficial)

El registro inmutable de eventos del teatro.

| Fecha | Número | Disposiciones |
|-------|--------|---------------|
| 2025-12-20 | 1 | Génesis, 5 actores, 2 obras |

Ver: [BOE/boe-2025-12-20.json](../BOE/boe-2025-12-20.json)

---

## 🎫 Tickets Activos

| ID | Título | Asignado | Estado |
|----|--------|----------|--------|
| FUND-001 | Completar borrador Cap01 | Aleph | En progreso |
| FUND-002 | Auditoría triple Cap01 | Blue/Black/Red | Pendiente |
| NEWS-001 | Próxima plana noticiera | Periódico | Pendiente |

---

## 🔧 Comandos del Teatro

```
/arrakis-genesis         → Inicializar teatro (hecho ✅)
/arrakis-actor-register  → Registrar nuevo actor
/arrakis-obra-register   → Registrar nueva obra
/arrakis-turno-auto      → Avanzar turno automáticamente
/arrakis-eval-monomito   → Evaluar progreso del héroe
```

---

## 📁 Estructura

```
ARCHIVO/PLUGINS/ARG_BOARD/       # Datos del plugin (runtime)
├── .arrakis/
│   ├── theater_state.json       # Estado del teatro
│   ├── obras.json               # Catálogo de obras
│   ├── actores.json             # Registro de agentes
│   ├── monomitos.json           # Progreso del Camino del Héroe
│   ├── tickets.json             # Tickets activos
│   └── README.md                # Este archivo
│
└── BOE/
    └── boe-2025-12-20.json      # Boletín del día

.github/plugins/arg-board/       # Código del plugin (inmutable)
├── manifest.md
├── agents/
├── prompts/
├── instructions/
├── docs/
└── meta/
```

---

## 🔗 Referencias

- **Plugin ARG Board (código)**: [.github/plugins/arg-board/](../../../../.github/plugins/arg-board/)
- **Documentación**: [.github/plugins/arg-board/docs/](../../../../.github/plugins/arg-board/docs/)
- **Lore (ARCHIVO)**: [ARCHIVO/](../../../)
- **Capítulos**: [PROYECTOS/FUNDACION/CAPITULOS/](../../../../PROYECTOS/FUNDACION/CAPITULOS/)
