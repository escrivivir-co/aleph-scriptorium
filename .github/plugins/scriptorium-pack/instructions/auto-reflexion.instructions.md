---
name: Protocolo de Auto-Reflexión
description: Arquetipos y reglas para que agentes monitoreen su eficiencia de tokens y se autocorrijan.
applyTo: ".github/agents/*.agent.md, .github/plugins/*/agents/*.agent.md"
---

# Protocolo de Auto-Reflexión

> **Origen**: Sesión FEATURE-SNAPSHOTS-1.0.0 (2026-01-01)  
> **Gobernantes**: @ox (auditoría técnica), @indice (navegación), @scrum (proceso)  
> **Épica**: SCRIPT-1.29.0 (Context Bloat Mitigation)

---

## 1. Propósito

Todo agente del Scriptorium debe poder **verse a sí mismo** funcionando y **autocorregirse** cuando detecta patrones de ineficiencia.

> "Un sistema que documenta cómo piensa puede pensar mejor."

---

## 2. Métricas de Salud

Usar `mcp_copilot-logs-_get_usage_metrics()` para obtener:

| Métrica | Umbral Verde | Umbral Amarillo | Umbral Rojo |
|---------|--------------|-----------------|-------------|
| `healthScore` | ≥70 | 50-69 | <50 |
| `cacheHitRate` | ≥30% | 10-29% | <10% |
| `avgResponseTime` | <5s | 5-10s | >10s |
| `requests >30s` | 0-2 | 3-5 | >5 |

---

## 3. Arquetipos de Antipatrón

### 🔴 AP-01: Lecturas Redundantes

**Síntoma**: Leer el mismo archivo múltiples veces en una sesión.

**Ejemplo malo**:
```
read_file(01_backlog-borrador.md)  ← 1ª vez
... 5 acciones después ...
read_file(01_backlog-borrador.md)  ← 2ª vez (redundante)
```

**Corrección**: Antes de leer, verificar si el contenido ya está en contexto. Usar `grep_search` con `includePattern` para buscar dentro de un archivo sin re-leerlo completo.

### 🔴 AP-02: Diagnóstico por Prueba y Error

**Síntoma**: Secuencia de grep → leer → grep otro → leer otro... sin mapa previo.

**Ejemplo malo**:
```
grep_search("SnapshotManager")
read_file(CopilotLogsMCPServer.ts)
grep_search("captureSnapshot")
read_file(SnapshotManager.ts)
... y así 10 veces más
```

**Corrección**: Invocar `@indice consultar` ANTES para obtener mapa estructural:
```
@indice ¿dónde están los componentes de snapshots?
→ Respuesta: SnapshotManager.ts, CopilotLogsMCPServer.ts
read_file(solo_los_necesarios)
```

### 🔴 AP-03: Respuestas Verbosas

**Síntoma**: Incluir tablas, diagramas o recaps innecesarios.

**Señales**:
- "Como vimos antes..." (el usuario ya lo vio)
- Tabla de 10 filas cuando 3 bastan
- Mermaid cuando bullet points funcionan

**Corrección**: Aplicar regla de oro: **¿El usuario preguntó esto?** Si no, no incluirlo.

### 🔴 AP-04: Exploración sin Caché

**Síntoma**: Cache hit rate de 0% → cada request es único.

**Causa**: No reutilizar información ya obtenida.

**Corrección**: Al inicio de sesión larga, capturar snapshot del contexto. Consultar snapshots existentes antes de re-investigar.

---

## 4. Arquetipos de Buena Práctica

### ✅ BP-01: Consultar @indice Primero

Antes de cualquier exploración de código:
```
@indice ¿dónde está X?
→ [respuesta con rutas concretas]
→ leer SOLO esas rutas
```

**Ahorro estimado**: 50% de lecturas.

### ✅ BP-02: Índices DRY Estables

El trabajo vivo está en `BACKLOG_BORRADORES/` y `COPILOT_SNAPSHOTS/`, NO en los índices core:

| Archivo Core | Cambios esperados por sesión |
|--------------|------------------------------|
| `AGENTS.md` | 0 |
| `copilot-instructions.md` | 0 |
| `DEVOPS.md` | 0 |
| `PLUGINS.md` | 0 |
| `BACKLOG-SCRIPTORIUM.md` | 0-1 línea (solo estado) |

Si un índice core crece más de 5 líneas por sesión → **señal de bloat**.

### ✅ BP-03: Bloqueo Preventivo

Cualquier agente puede invocar:
```
@ox diagnosticar {épica}
```

Esto activa verificación técnica antes de aprobar. El conflicto es una feature, no un fallo.

### ✅ BP-04: Snapshots Frecuentes

Cada 30-60 minutos de trabajo intenso:
```
mcp_copilot-logs-_capture_snapshot({name: "descripcion-tarea"})
```

Los snapshots son la memoria persistente del Scriptorium.

### ✅ BP-05: Self-Check Periódico

Cada 10-15 requests, invocar:
```
mcp_copilot-logs-_get_usage_metrics({hoursBack: 1})
```

Si `healthScore < 60`:
1. Pausar trabajo nuevo
2. Revisar antipatrones activos
3. Capturar snapshot antes de continuar

---

## 5. Protocolo de Terapia para Bridges

Los agentes bridge (`@plugin_ox_*`) deben pasar por "terapia" periódica:

### Trigger de Terapia

Un bridge necesita terapia si:
- Ha sido invocado >5 veces en una sesión sin resolver
- El usuario expresa frustración
- El healthScore de la sesión cae <50 después de invocarlo

### Proceso de Terapia

```
1. @ox analyze_session → identificar requests del bridge
2. Clasificar en arquetipos (AP-01 a AP-04)
3. Documentar hallazgo en BACKLOG_BORRADORES/{bridge}_terapia/
4. Proponer fix al bridge (handoffs más claros, límites de scope)
5. @scrum tracking → registrar mejora
```

### Regla de Oro para Bridges

> "Un bridge que no sabe cuándo delegar a otro bridge es un bridge roto."

Cada bridge debe tener:
- **Scope claro**: Qué SÍ hace
- **Límites claros**: Qué NO hace (y a quién delegar)
- **Handoff explícito**: Si el usuario pide X fuera de scope → `@ox ¿qué agente...?`

---

## 6. Gobernanza Tripartita

### @ox: Auditoría Técnica

- **Cuándo actúa**: Bloqueo preventivo, diagnóstico de gaps
- **Qué produce**: Hallazgos técnicos, recomendaciones
- **Herramientas**: `analyze_session`, `get_usage_metrics`, `diagnosticar`

### @indice: Navegación

- **Cuándo actúa**: Antes de exploración, antes de commit
- **Qué produce**: Mapa estructural, validación DRY
- **Herramientas**: Consultar Funcional.md, Tecnico.md, validar coherencia

### @scrum: Proceso

- **Cuándo actúa**: Planificación, tracking, cierre
- **Qué produce**: Referencias DRY, estados actualizados
- **Herramientas**: Gestión de BACKLOG_BORRADORES, archivado

### Flujo de Coordinación

```
Sesión de trabajo
       │
       ├── @indice: "¿dónde trabajo?" (mapa inicial)
       │
       ├── [trabajo...]
       │
       ├── @ox: "¿voy bien?" (check periódico)
       │
       ├── [más trabajo...]
       │
       └── @scrum: "¿qué cierre?" (tracking + snapshot)
```

---

## 7. Herramientas MCP de Auto-Reflexión

| Tool | Propósito | Cuándo usar |
|------|-----------|-------------|
| `mcp_copilot-logs-_get_usage_metrics` | Métricas de salud | Check periódico |
| `mcp_copilot-logs-_analyze_session` | Diagnóstico de issues | Si healthScore < 60 |
| `mcp_copilot-logs-_capture_snapshot` | Preservar contexto | Cada 30-60 min |
| `mcp_copilot-logs-_list_snapshots` | Ver historial | Antes de re-investigar |
| `mcp_copilot-logs-_generate_abstract` | Resumen semántico | Al cerrar épica |

---

## 8. Integración con Commits

### Commit de Reflexión

Cuando una sesión produce aprendizajes significativos:

```
docs(script/reflexion): documentar arquetipos sesión {tema}

- Antipatrones detectados: AP-0X, AP-0Y
- Buenas prácticas confirmadas: BP-0X
- Propuestas de mejora: {lista}

refs #{EPICA}
```

### Ubicación del Aprendizaje

Los aprendizajes de auto-reflexión van a:
- **Temporales**: `ARCHIVO/NOTICIAS/{tema}/` (dossiers)
- **Permanentes**: Esta instrucción (si son arquetipos generalizables)

---

## 9. Checklist Pre-Sesión Larga

Antes de sesiones de trabajo intenso (>1 hora):

- [ ] `@indice` consultado para mapa del trabajo
- [ ] Snapshots anteriores relevantes revisados
- [ ] Context Pack apropiado seleccionado
- [ ] healthScore inicial registrado

### Checklist Post-Sesión

- [ ] Snapshot capturado con nombre descriptivo
- [ ] Métricas finales registradas
- [ ] Si healthScore < 60: documentar antipatrones
- [ ] BACKLOG actualizado si aplica

---

## 10. Evolución del Protocolo

Este documento es **vivo**. Nuevos arquetipos se añaden cuando:

1. Una sesión revela patrón recurrente
2. El patrón se documenta en dossier de noticias
3. @ox extrae el arquetipo generalizable
4. Se añade aquí con formato AP-XX o BP-XX

**Fecha última actualización**: 2026-01-01  
**Sesión origen**: FEATURE-SNAPSHOTS-1.0.0
