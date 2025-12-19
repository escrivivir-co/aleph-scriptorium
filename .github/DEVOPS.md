# Protocolo DevOps — Aleph Scriptorium

> **Versión**: 0.0.1  
> **Metodología**: Agile/Scrum adaptado a producción textual  
> **Ciclo**: 12 sprints × 4 iteraciones = 48 iteraciones anuales

---

## 1. Ontología del proyecto

### Opportunities (Productos)

| Opportunity | Descripción | Carpeta raíz | Versión actual |
|-------------|-------------|--------------|----------------|
| **Aleph Scriptorium** | Kit de herramientas para agentes de escritura política | `.github/` | 0.0.1 |
| **Fundación** | Texto fundacional en 12 capítulos (2026) | `PROYECTOS/FUNDACION/` | 0.0.1 |

### Jerarquía de trabajo

```
Opportunity
└── Epic (Sprint = 1 mes = 1 capítulo)
    └── Story (Iteración = 1 semana)
        └── Task (Unidad atómica de trabajo)
```

---

## 2. Convención de commits

### Formato

```
<tipo>(<scope>): <descripción corta>

[cuerpo opcional]

[footer: refs #TASK-ID]
```

### Tipos permitidos

| Tipo | Uso |
|------|-----|
| `feat` | Nueva funcionalidad o contenido |
| `fix` | Corrección de error o inconsistencia |
| `docs` | Documentación (READMEs, instrucciones) |
| `refactor` | Reestructuración sin cambio funcional |
| `style` | Formato, voz, estilo (sin cambio de contenido) |
| `chore` | Mantenimiento, configuración |
| `archive` | Extracción y archivo de material fuente |

### Scopes por Opportunity

**Scriptorium** (`script`):
- `script/agents` — Definiciones de agentes
- `script/prompts` — Prompts reutilizables
- `script/instructions` — Instrucciones de contexto
- `script/devops` — Protocolo y metodología

**Fundación** (`fund`):
- `fund/archivo` — Material en ARCHIVO/
- `fund/caps` — Capítulos en PROYECTOS/FUNDACION/CAPITULOS/
- `fund/plan` — Índices y planificación

### Ejemplos

```
feat(script/agents): añadir protocolo devops a Aleph

Incorpora metodología Scrum adaptada y convención de commits
para gestión de sprints y trazabilidad.

refs #SCRIPT-0.0.1-T001
```

```
archive(fund/archivo): extraer crítica tecnofeudalismo (Ferrín)

Procesa NC_2.pdf y crea documento 11-tecnofeudalismo-critica-puentes.md
con dos capas: agitprop y académica.

refs #FUND-0.0.1-T003
```

---

## 3. Estructura de Sprints

### Sprint 0 (Actual) — Bootstrap

**Objetivo**: Establecer infraestructura mínima para ambas opportunities.

| Epic | Stories | Estado |
|------|---------|--------|
| SCRIPT-0.0.1 | Crear protocolo DevOps | ✅ |
| SCRIPT-0.0.1 | Actualizar agente Aleph | 🔄 |
| FUND-0.0.1 | Consolidar ARCHIVO/marco | ✅ |
| FUND-0.0.1 | Definir indicadores cap.1 | ✅ |

### Sprints 1–12 (2026)

Cada sprint = 1 mes = 1 capítulo de Fundación.

| Sprint | Capítulo | Desplazamiento |
|--------|----------|----------------|
| 1 | Anacronismo productivo | Temporal |
| 2 | Autómata soberano | Antropológico |
| 3 | Problema de la escala | Escalar |
| 4 | Repertorio de arquitecturas | Temporal |
| 5 | Formas de vida | Temporal |
| 6 | Futuros cancelados | Temporal |
| 7 | Infraestructuras como actores | Antropológico |
| 8 | Demos sin demos | Escalar |
| 9 | Ecosistemas políticos | Antropológico |
| 10 | Régimen material | Escalar |
| 11 | El sacrificio | Escalar |
| 12 | La sombra del texto | Meta |

---

## 4. Definición de Done

### Para una Task
- [ ] Código/texto implementado
- [ ] Consistente con ARCHIVO/marco
- [ ] Sin contradicciones con capítulos previos
- [ ] README actualizado si aplica

### Para una Story
- [ ] Todas las tasks completadas
- [ ] Commit(s) con mensaje conforme a convención
- [ ] Sin errores de lint/formato

### Para un Epic (Sprint)
- [ ] Capítulo completo según estructura
- [ ] Checklist de calidad Aleph verificado
- [ ] Indicadores de fracaso definidos
- [ ] Release tag creado

---

## 5. Tags y Releases

### Formato de versión

```
<opportunity>-<major>.<minor>.<patch>
```

- **Major**: Cambio de fase (0 = bootstrap, 1 = producción)
- **Minor**: Sprint completado
- **Patch**: Correcciones dentro del sprint

### Ejemplos

- `scriptorium-0.0.1` — Bootstrap inicial
- `fundacion-0.1.0` — Sprint 1 completado
- `fundacion-0.1.1` — Corrección en Sprint 1

---

## 6. Backlog inicial

### Scriptorium 0.0.1

| ID | Task | Estado |
|----|------|--------|
| SCRIPT-0.0.1-T001 | Crear DEVOPS.md | ✅ |
| SCRIPT-0.0.1-T002 | Actualizar aleph.agent.md con protocolo | 🔄 |
| SCRIPT-0.0.1-T003 | Crear prompt de commit asistido | ⏳ |

### Fundación 0.0.1

| ID | Task | Estado |
|----|------|--------|
| FUND-0.0.1-T001 | Consolidar marco/08-11 | ✅ |
| FUND-0.0.1-T002 | Crear diagnostico/05 | ✅ |
| FUND-0.0.1-T003 | Refinar 11-tecnofeudalismo (dos capas) | ✅ |
| FUND-0.0.1-T004 | Actualizar READMEs | ✅ |

---

## 7. Instrucciones para Aleph

Cuando Aleph realice cambios, debe:

1. **Identificar la Opportunity** afectada por el cambio.
2. **Asignar o crear Task** en el backlog correspondiente.
3. **Generar commit message** conforme a la convención.
4. **Actualizar estado** en este documento o en el backlog de la opportunity.

### Comando de commit asistido

Aleph puede generar el mensaje de commit ejecutando:

```bash
git add -A && git commit -m "<mensaje generado>"
```

O preparar el mensaje para revisión del usuario antes de ejecutar.
