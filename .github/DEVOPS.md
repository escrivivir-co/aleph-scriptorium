# Protocolo DevOps — Aleph Scriptorium

> **Resumen**: Metodología Agile/Scrum adaptada a producción textual. 12 sprints × 4 iteraciones = 48 iteraciones anuales. 4 ciclos de desarrollo: un FC por trimestre.

**Versión**: 0.0.1  
**Rama de trabajo**: Ver `workspace-config.json`

---

## Referencia Rápida

### Rama de Trabajo

```bash
# Verificar rama configurada
cat workspace-config.json | grep '"branch"'
git branch --show-current
```

**Ramas protegidas**: `main`, `master` — No commits directos

---

### Convención de Commits

```
<tipo>(<scope>): <descripción corta>

[cuerpo opcional]

[footer: refs #TASK-ID]
```

| Tipo | Uso |
|------|-----|
| `feat` | Nueva funcionalidad o contenido |
| `fix` | Corrección de error |
| `docs` | Documentación |
| `refactor` | Reestructuración sin cambio funcional |
| `chore` | Mantenimiento |
| `archive` | Extracción de material fuente |

### Scopes

| Opportunity | Scopes |
|-------------|--------|
| Scriptorium | `script/agents`, `script/prompts`, `script/instructions`, `script/devops` |
| Fundación | `fund/archivo`, `fund/caps`, `fund/plan` |

---

### Jerarquía de Trabajo

```
Opportunity
└── Epic (Sprint = 1 mes)
    └── Story (Iteración = 1 semana)
        └── Task (Unidad atómica)
```

---

### Definition of Ready (DoR) — Gate de Aprobación

> **Resolución R1-R2 de Asamblea 2026-01-01**: Toda épica debe pasar auditoría Ox-Indice antes de aprobación PO-SM.

**Checklist obligatorio antes de aprobar épica**:

- [ ] **Verificación de componentes**: Todo archivo/módulo referenciado existe o está marcado "a crear"
- [ ] **Gap analysis documentado**: Diferencias entre plan y realidad técnica identificadas
- [ ] **Estimación validada**: Por quien implementará, no solo por quien planifica
- [ ] **Auditoría Ox**: Viabilidad técnica verificada
- [ ] **Auditoría Indice**: Coherencia estructural con ARCHIVO verificada

**Bloqueo preventivo** (R3): Cualquier agente puede invocar `@ox diagnosticar` ante sospecha de gaps técnicos. No es acusación; es petición de clarificación.

---

### Definition of Done (DoD)

**Task**: Implementado + Consistente con ARCHIVO + README actualizado  
**Story**: Todas las tasks + Commit conforme  
**Epic**: Capítulo completo + Checklist verificado + Release tag + Asamblea documentada (R4)

---

### Versionado

```
<opportunity>-<major>.<minor>.<patch>
```

- `scriptorium-0.0.1` — Bootstrap
- `fundacion-0.1.0` — Sprint 1 completado

---

## Opportunities

| Opportunity | Descripción | Carpeta | Versión |
|-------------|-------------|---------|---------|
| Aleph Scriptorium | Kit de agentes de escritura | `.github/` | 0.0.1 |
| Fundación | 12 capítulos (2026) | `PROYECTOS/FUNDACION/` | 0.0.1 |

---

## Sprints 2026

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

## Instrucciones para Agentes

Antes de commit:

```bash
BRANCH=$(cat workspace-config.json | grep '"branch"' | cut -d'"' -f4)
CURRENT=$(git branch --show-current)
[ "$CURRENT" != "$BRANCH" ] && echo "⚠️ Cambiar a: git checkout $BRANCH" && exit 1
```

1. Identificar Opportunity afectada
2. Asignar/crear Task en backlog
3. Generar commit conforme a convención
4. Actualizar estado en backlog
