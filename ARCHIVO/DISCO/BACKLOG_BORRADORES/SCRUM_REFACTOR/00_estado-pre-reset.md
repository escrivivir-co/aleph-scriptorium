# Estado Pre-Reset — Plugin Scrum v2.0.0

> **FASE 0**: Documentación del estado actual antes de BREAKING CHANGE  
> **Fecha**: 2026-01-05  
> **Snapshot**: `2026-01-05_01-56_sesion-cerrada-scrum-refactor-1-0-0`

---

## Inventario de Archivos

### Plugin Core (`/.github/plugins/scrum/`)

| Archivo | Líneas | Descripción |
|---------|--------|-------------|
| `manifest.md` | 227 | Manifiesto v2.0.0 — "Gestión Scrum DRY" |
| `agents/scrum.agent.md` | 221 | Agente Scrum Master DRY |
| `instructions/scrum-protocol.instructions.md` | 380 | Protocolo DRY completo |
| `prompts/planificar-sprint.prompt.md` | 101 | Crear carpeta + referencia |
| `prompts/crear-backlog-borrador.prompt.md` | 181 | Generar borrador en DISCO |
| `prompts/aprobar-backlog.prompt.md` | ~80 | Cambiar estado en índice |
| `prompts/tracking-sprint.prompt.md` | ~80 | Actualizar tasks en borrador |
| `prompts/retrospectiva.prompt.md` | 150 | Cerrar y archivar |

**Total**: ~1,420 líneas

### Bridge (`/.github/agents/`)

| Archivo | Líneas | Descripción |
|---------|--------|-------------|
| `plugin_ox_scrum.agent.md` | 106 | Bridge VS Code → Plugin |

---

## Identidad Actual

### manifest.md

```yaml
id: scrum
name: "Gestión Scrum DRY"
version: "2.0.0"
description: "Plugin para gestión ágil con modelo DRY: el backlog principal es un índice ligero que referencia borradores y archivados. Diseñado para mitigar context bloat."
```

### scrum.agent.md

```yaml
name: Scrum
description: "Scrum Master DRY. Gestiona índice de referencias a borradores/archivados. Co-gobierna auto-reflexión: tracking de terapias y snapshots."
argument-hint: "planificar | borrador | aprobar | tracking | cerrar | status | terapia | snapshot"
```

---

## Comandos Existentes

| Comando | Descripción | En índice | En borrador |
|---------|-------------|-----------|-------------|
| `planificar` | Crear carpeta + referencia | ✅ Añadir fila | ✅ Crear carpeta |
| `borrador` | Generar backlog detallado | ❌ | ✅ |
| `aprobar` | Cambiar estado | ✅ Cambiar emoji | ❌ |
| `tracking` | Actualizar tasks | ❌ | ✅ |
| `cerrar` | Archivar sprint | ✅ Mover a histórico | ✅ Mover carpeta |
| `status` | Mostrar métricas | ✅ Leer | ✅ Leer |
| `terapia` | Crear carpeta terapia | — | ✅ |
| `snapshot` | Capturar estado Copilot | — | — |

---

## Handoffs Actuales

### En scrum.agent.md (11 handoffs)

1. Planificar sprint (crear referencia)
2. Generar borrador detallado
3. Aprobar épica (cambiar estado)
4. Actualizar tracking (en borrador)
5. Cerrar sprint (archivar)
6. Mostrar status DRY
7. Delegar a Aleph (DevOps)
8. 📸 Registrar snapshot de cierre
9. 🧠 Abrir terapia de bridge
10. 📊 Registrar métricas de sesión
11. 👥 Iniciar sesión de cotrabajo
12. 📋 Vincular sesión cotrabajo a épica
13. ✅ Cerrar sesión cotrabajo con tracking

### En plugin_ox_scrum.agent.md (7 handoffs)

1. Listar capacidades de Scrum
2. Planificar nuevo sprint
3. Crear backlog borrador
4. Aprobar y publicar backlog
5. Actualizar tracking
6. Cerrar sprint
7. Mostrar status actual

---

## Protocolo Actual (Flujo 5 Fases)

```
1. PLANIFICAR → Conversación PO-SM en DISCO
2. EDITAR → Backlog borrador en DISCO
3. APROBAR → Publicar en backlogs oficiales
4. TRACKING → Actualizar estado durante desarrollo
5. CERRAR → Retrospectiva y foto de estado
```

### Fase 2.5: Auditoría (Resolución R1)

```
1. @ox auditoría técnica
2. @indice auditoría estructural
3. Si gaps críticos → volver a Fase 2
4. Si OK → Fase 3
```

---

## Integraciones Actuales

| Componente | Integración |
|------------|-------------|
| @aleph | Recibe tasks, reporta completadas |
| @ox | Registra @scrum en índice de agentes |
| DEVOPS.md | Scrum sigue protocolo de commits |
| copilot-logs-mcp-server | Snapshots y métricas |
| devops-mcp-server | Herramientas DevOps |

---

## Métricas Gestionadas

| Métrica | Descripción |
|---------|-------------|
| Effort total | Suma de puntos del sprint |
| Effort completado | Puntos de tasks ✅ |
| % Avance | Completado / Total × 100 |
| Velocity | Effort/iteración promedio |
| Buffer consumido | Puntos de mejoras usados |

---

## Gaps Identificados (Razón del Reset)

### Gap 1: Sin conexión formal con Cotrabajo

Las sesiones de cotrabajo (`SESIONES_COTRABAJO/`) no tienen puente formal al sistema Scrum. Los handoffs existentes son superficiales:
- `👥 Iniciar sesión de cotrabajo` → Delega a @scriptorium-pack (no a protocolo interno)
- `📋 Vincular sesión cotrabajo a épica` → Registro manual
- `✅ Cerrar sesión cotrabajo con tracking` → Sin comando implementado

### Gap 2: Expertise duplicada

El agente @scrum tiene conocimiento Scrum hardcodeado. Lucas tiene expertise Scrum más rica en su brain Prolog. Duplicación viola DRY.

### Gap 3: Sin tipo de cierre diferenciado

El comando `cerrar` no distingue entre:
- Sesión exploratoria (sin producción)
- Sesión normativa (decisiones)
- Sesión productiva (genera borrador)

---

## Qué Se Preserva

| Elemento | Decisión |
|----------|----------|
| Principio DRY | ✅ Se mantiene |
| Ubicaciones canónicas | ✅ Se mantiene |
| Comandos básicos | ✅ Se mantiene (refactorizado) |
| Flujo 5 fases | ✅ Se mantiene + Modelo Generativo |
| Fase 2.5 (Auditoría) | ✅ Se mantiene |
| Métricas | ✅ Se mantiene |

## Qué Cambia

| Elemento | Cambio |
|----------|--------|
| Identidad del agente | "Interpreta a Lucas" |
| Comando `generar-desde-sesion` | **NUEVO** |
| Comando `cerrar` | Extensión: `--incluir-sesiones` |
| Comando `status` | Extensión: sesiones activas |
| Metadata de borrador | Añadir `origen:` |

---

## Checklist FASE 0

- [x] Snapshot capturado (`2026-01-05_01-56_sesion-cerrada-scrum-refactor-1-0-0`)
- [x] Estado documentado (este archivo)
- [ ] Rama de backup creada (usuario)
- [x] Inventario de archivos completo
- [x] Gaps documentados
- [x] Decisiones de preservación registradas

---

**Estado**: ✅ FASE 0 COMPLETA (pendiente rama backup por usuario)  
**Siguiente**: FASE 1 — Reset Plugin (S1: scrum.agent.md → Lucas DRY)
