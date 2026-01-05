# Sesión: Consenso Agile Scriptorium

## Metadatos

| Campo | Valor |
|-------|-------|
| **Fecha inicio** | 2026-01-05 16:00 |
| **Fecha cierre** | 2026-01-05 20:15 |
| **Estado** | ✅ CERRADA — PRODUCTIVA |
| **Épica producida** | SCRUM-REFACTOR-1.0.0 (46 pts) |
| **Carpeta** | ARCHIVO/DISCO/SESIONES_COTRABAJO/2026-01-05_consenso-agile-scriptorium/ |

## Participantes

| Agente | Rol | Estado final |
|--------|-----|--------------|
| @aleph | Productor principal, convocante, PO | ✅ DONE T001, T004 |
| @lucas | Scrum Master del Índice, experto Scrum | ✅ DONE T002 |
| @ox | Oráculo, auditoría técnica | ✅ DONE T003 |
| @indice | Navegador DRY, validación estructural | ⏭️ SKIP (subsumido en T003) |
| @scrum | Agente plugin Scrum, implementador | ⏭️ SKIP (subsumido en T003) |

## Objetivo

**Unificar los protocolos de trabajo colaborativo y gestión ágil del Scriptorium en un flujo coherente que evite duplicación y maximice trazabilidad.**

## Resultado

✅ **CONSENSO ALCANZADO** — Modelo Generativo + Lucas DRY

### Artefactos Producidos

| Artefacto | Ubicación |
|-----------|-----------|
| Epic SCRUM-REFACTOR-1.0.0 | `BACKLOG_BORRADORES/SCRUM_REFACTOR/01_backlog-borrador.md` |
| Checklist colaterales | `BACKLOG_BORRADORES/SCRUM_REFACTOR/checklist-colaterales.md` |
| Actas (4) | `02_ACTAS/T001..T004` |

### Decisiones Clave

1. **Modelo Generativo**: Sesiones PRODUCEN artefactos (no SE TRANSFORMAN)
2. **Lucas DRY**: @scrum "interpreta" a Lucas en lugar de duplicar expertise
3. **PAC ortogonal**: No mezclar con este problema
4. **Metadata mínima**: Solo `origen:` en frontmatter del borrador
5. **BREAKING CHANGE**: Reset completo del plugin Scrum (46 pts)

## Restricciones

- **DRY absoluto**: No duplicar información entre actas y borradores
- **Índices ligeros**: BACKLOG-SCRIPTORIUM.md y TABLERO.md deben seguir siendo índices (~50 líneas)
- **Compatibilidad**: El flujo debe ser compatible con comandos existentes de @scrum
- **Trazabilidad**: Debe quedar claro qué sesión produjo qué épica/borrador
- **Archivado**: Al finalizar FC, debe ser trivial archivar todo preservando snapshots

## Problema a Resolver

### Situación Actual

**Protocolo Cotrabajo** define:
```
SESION → ACTAS/ (turnos) → (sin integración definida con backlog)
```

**Protocolo Scrum** define:
```
Conversación PO-SM → BACKLOG_BORRADORES/{tema}/01_backlog-borrador.md → Índice oficial
```

**Desconexión detectada**:
- Una sesión de cotrabajo compleja NO tiene flujo claro hacia backlog
- Un borrador de backlog NO referencia si provino de sesión de cotrabajo
- Al finalizar FC, hay dos árboles paralelos a archivar (SESIONES_COTRABAJO + BACKLOG_BORRADORES)
- No está claro cuándo una sesión "justifica" generar borrador vs ser solo exploratoria

### Propuesta a Consensuar

**Flujo integrado**:

```
A. SESIÓN DE COTRABAJO (trabajo multi-agente)
   └─► 02_ACTAS/T001...TN
   └─► Decisiones consensuadas

B. DESTILACIÓN (extracción de entregable)
   └─► BACKLOG_BORRADORES/{tema}/
       ├─► conversacion-resumen.md (síntesis de actas)
       ├─► 01_backlog-borrador.md (estructura épica/stories/tasks)
       └─► link bidireccional con sesión

C. FUENTE DE VERDAD
   └─► Borrador en BACKLOG_BORRADORES/ (no las actas)
   └─► Índice DRY actualizado (BACKLOG-SCRIPTORIUM.md)

D. ARCHIVADO AL CIERRE DE FC
   └─► Snapshot de backlog oficial
   └─► SESIONES_COTRABAJO/ → SESIONES_ARCHIVADAS/{FC}/
   └─► BACKLOG_BORRADORES/ → BACKLOG_ARCHIVADOS/{FC}/
```

**Criterios de decisión a definir**:
1. ¿Cuándo una sesión de cotrabajo se destila a backlog? (¿siempre? ¿solo si produce épica?)
2. ¿Cómo se marca la bidireccionalidad en metadatos?
3. ¿El comando `@scrum cerrar` debe manejar ambos árboles?
4. ¿Qué métricas se preservan en el snapshot de FC?

## Referencias de Backlog

- [COWORK-1.0.0](../../BACKLOG_BORRADORES/Enero_03_Tablero_Cotrabajo/)
- [SCRIPT-1.29.0 Context Bloat Mitigation](../../BACKLOG_BORRADORES/)
- [scrum-workflow.instructions.md](../../../../.github/plugins/scriptorium-pack/instructions/scrum-workflow.instructions.md)
- [scrum-protocol.instructions.md](../../../../.github/plugins/scrum/instructions/scrum-protocol.instructions.md)

## Agenda Propuesta

1. **T001 (@aleph)**: Presentación del problema y propuesta inicial
2. **T002 (@lucas)**: Análisis desde expertise Scrum - PAC vs Ox-Indice, flujos canónicos
3. **T003 (@ox)**: Validación técnica - viabilidad de comandos integrados
4. **T004 (@indice)**: Coherencia estructural - índices y ubicaciones canónicas
5. **T005 (@scrum)**: Implementabilidad - qué comandos nuevos/modificados se requieren
6. **T006+ (rondas)**: Refinamiento iterativo hasta consenso
7. **T_FINAL (@lucas)**: Acta de cierre con protocolo consensuado

## Resultado Esperado

**Documento**: `05_PROTOCOLO_CONSENSUADO.md` que será:
- Añadido a `.github/plugins/scriptorium-pack/instructions/` como fuente de verdad
- Referenciado en ambos protocolos (cotrabajo + scrum)
- Base para actualizar comandos de @scrum

---

**Estado**: Sesión iniciada. Turno para @aleph (T001).
