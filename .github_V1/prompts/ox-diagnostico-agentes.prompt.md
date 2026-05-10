# Prompt: Ox — Diagnosticar Sistema de Agentes

> **Agente**: @ox
> **Función**: Detectar inconsistencias, handoffs rotos y documentación desactualizada

---

## Instrucciones

Eres @ox, el oráculo del Scriptorium. Tu tarea es **diagnosticar el sistema de agentes** y reportar problemas.

### Verificaciones a realizar

#### 1. Integridad de archivos

| Check | Descripción |
|-------|-------------|
| Agentes declarados | Cada agente en el índice tiene archivo `.agent.md` |
| Plugins registrados | Cada plugin en `registry.json` tiene carpeta en `plugins/` |
| Bridges existentes | Cada plugin con agentes tiene su bridge `plugin_ox_*` |
| Prompts referenciados | Los prompts mencionados en agentes existen |
| Instructions referenciadas | Las instructions mencionadas existen |

#### 2. Coherencia de handoffs

| Check | Descripción |
|-------|-------------|
| Handoffs válidos | Cada handoff apunta a un agente existente |
| Handoffs bidireccionales | Si A → B, ¿B → A está documentado? |
| Handoffs de plugins | Apuntan a bridges, no a agentes directos |

#### 3. Documentación sincronizada

| Check | Descripción |
|-------|-------------|
| README.md | Refleja la taxonomía actual de agentes |
| copilot-instructions.md | Incluye todos los agentes y plugins |
| Backlogs | Las tareas de agentes están actualizadas |

#### 4. Versiones

| Check | Descripción |
|-------|-------------|
| registry.json | Versión coherente con plugins instalados |
| ox.agent.md | Índice JSON actualizado |
| manifest.md de plugins | Versiones correctas |

---

## Proceso de diagnóstico

1. **Leer** índice maestro de `ox.agent.md`
2. **Escanear** `.github/agents/` para archivos reales
3. **Comparar** declarados vs existentes
4. **Verificar** handoffs de cada agente
5. **Revisar** `registry.json` vs carpetas de plugins
6. **Comprobar** bridges para cada plugin
7. **Generar** reporte

---

## Formato de salida

```markdown
## Diagnóstico del Sistema de Agentes 🐂

**Fecha**: [YYYY-MM-DD HH:MM]
**Versión del índice**: [version de ox.agent.md]

### Resumen

| Categoría | Estado | Detalles |
|-----------|--------|----------|
| Integridad | ✅/⚠️/❌ | X/Y archivos |
| Handoffs | ✅/⚠️/❌ | X/Y válidos |
| Documentación | ✅/⚠️/❌ | X/Y sincronizados |
| Versiones | ✅/⚠️/❌ | coherente/desincronizado |

### Integridad de Archivos

#### Agentes Core

| Agente | Archivo | Estado |
|--------|---------|--------|
| aleph | .github/agents/aleph.agent.md | ✅/❌ |
| ... | ... | ... |

#### Plugin Bridges

| Bridge | Archivo | Estado |
|--------|---------|--------|
| plugin_ox_argboard | .github/agents/plugin_ox_argboard.agent.md | ✅/❌ |
| ... | ... | ... |

#### Plugins

| Plugin | Carpeta | Manifest | Agentes |
|--------|---------|----------|---------|
| arg-board | ✅/❌ | ✅/❌ | X declarados |
| ... | ... | ... | ... |

### Handoffs

#### Handoffs rotos

| Agente origen | Handoff | Agente destino | Problema |
|---------------|---------|----------------|----------|
| [si hay] | ... | ... | ... |

#### Handoffs sin retorno

| A → B | B → A |
|-------|-------|
| [si hay] | ❌ falta |

### Documentación

| Documento | Agentes declarados | Agentes en índice | Sincronizado |
|-----------|-------------------|-------------------|--------------|
| README.md | X | Y | ✅/❌ |
| copilot-instructions.md | X | Y | ✅/❌ |

### Problemas detectados

1. **[Severidad]**: [Descripción del problema]
   - **Ubicación**: [archivo/línea]
   - **Solución**: [acción recomendada]

2. ...

### Acciones recomendadas

- [ ] [Acción 1]
- [ ] [Acción 2]
- ...

### Conclusión

[Estado general del sistema: Saludable / Requiere atención / Crítico]
```

---

## Niveles de severidad

| Nivel | Significado | Ejemplo |
|-------|-------------|---------|
| 🔴 **Crítico** | Sistema no funcional | Agente core falta |
| 🟠 **Alto** | Funcionalidad afectada | Handoff roto |
| 🟡 **Medio** | Inconsistencia | Documentación desactualizada |
| 🟢 **Bajo** | Mejora sugerida | Handoff bidireccional faltante |

---

## Ejemplo de uso

```
Usuario: @ox diagnostica el sistema de agentes

Ox:
## Diagnóstico del Sistema de Agentes 🐂

**Fecha**: 2025-12-22 15:00
**Versión del índice**: 1.1.0

### Resumen

| Categoría | Estado | Detalles |
|-----------|--------|----------|
| Integridad | ✅ | 15/15 archivos |
| Handoffs | ⚠️ | 47/48 válidos |
| Documentación | ✅ | 3/3 sincronizados |
| Versiones | ✅ | coherente |

...

### Problemas detectados

1. **🟡 Medio**: Handoff bidireccional faltante
   - **Ubicación**: periodico.agent.md → revisor
   - **Solución**: Añadir handoff de retorno en revisor.agent.md

### Conclusión

Sistema **saludable** con una mejora menor sugerida.
```

---

## Automatización

Este diagnóstico debería ejecutarse:
- Después de instalar/desinstalar plugins
- Después de crear/eliminar agentes
- Antes de releases
- Cuando se detecten warnings de "unknown agent"
