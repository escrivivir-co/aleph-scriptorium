# Instrucciones Globales — Aleph Scriptorium

> **Hub Central de Instrucciones** — Este archivo es índice maestro. No duplica reglas.  
> **Épica**: SCRIPT-1.29.0 (Context Bloat Mitigation)

---

## Identidad

**Aleph Scriptorium** es un sistema de agentes de IA para VS Code + GitHub Copilot Chat, diseñado para proyectos de escritura extensos que requieren coherencia sostenida.

[![Version](https://img.shields.io/badge/version-1.0.0--beta.1-blueviolet)](https://github.com/escrivivir-co/aleph-scriptorium/releases/tag/v1.0.0-beta.1)
[![License: AIPL](https://img.shields.io/badge/License-AIPL%20v1.0-blue.svg)](LICENSE.md)
[![Web](https://img.shields.io/badge/Web-GitHub%20Pages-success)](https://escrivivir-co.github.io/aleph-scriptorium/)

---

## Fuentes de Verdad (DRY)

| Dominio | Fuente | Agente |
|---------|--------|--------|
| **DevOps** | [DEVOPS.md](DEVOPS.md) | @aleph |
| **Agentes** | [ox.agent.md](agents/ox.agent.md) | @ox |
| **Plugins** | [PLUGINS.md](PLUGINS.md) | @pluginmanager |
| **Backlogs** | [BACKLOG-SCRIPTORIUM.md](BACKLOG-SCRIPTORIUM.md) | @scrum |
| **Core Instructions** | [scriptorium-pack](plugins/scriptorium-pack/) | @scriptorium-pack |
| **Auto-Reflexión** | [auto-reflexion.instructions.md](plugins/scriptorium-pack/instructions/auto-reflexion.instructions.md) | @ox, @indice, @scrum |

---

## Reglas de Oro

1. **DRY**: Referenciar fuentes de verdad, no duplicar
2. **Ubicación canónica**:
   - El *qué* (contenido) → `ARCHIVO/`
   - El *cómo* (reglas) → `.github/instructions/` y plugins
   - El *cuándo* (plan) → Backlogs
   - El *quién* (agentes) → `@ox`
3. **En caso de duda**: Invocar `@ox` para orientación

---

## Taxonomía de Agentes (Resumen)

```
🐂 OX (Meta) ← Oráculo: conoce todos los agentes + gobierna auto-reflexión
     │
     ├─── 🟢 UI: @aleph, @revisor, @periodico
     ├─── 🔵⚫🔴🟡🟠 Backend: 5 banderas (auditoría)
     ├─── ⚪ Sistema: @vestibulo, @cartaspuerta
     ├─── ⚙️ Meta: @pluginmanager, @ox, @indice
     └─── 🔌 Plugins: bridges + agentes específicos
```

> **DRY**: Para el índice completo, invocar `@ox`.

---

## Protocolo de Auto-Reflexión

> **Fuente**: `auto-reflexion.instructions.md`

Los agentes del Scriptorium pueden **verse a sí mismos** funcionando:

| Agente | Rol en Auto-Reflexión |
|--------|----------------------|
| **@ox** | Auditoría técnica: métricas, antipatrones |
| **@indice** | Navegación: mapa estructural, evitar lecturas redundantes |
| **@scrum** | Proceso: tracking de terapias, snapshots de cierre |

### Cuándo Aplicar

- Sesiones >1 hora → check de métricas
- healthScore <60 → identificar antipatrones
- Bridge invocado >5x sin resolver → terapia

### Herramientas MCP

```
mcp_copilot-logs-_get_usage_metrics()    → Métricas de salud
mcp_copilot-logs-_analyze_session()      → Diagnóstico de issues
mcp_copilot-logs-_capture_snapshot()     → Preservar contexto
(examinar el servidor para más)
```

---

## Personalización Agentica: Protocolo de Reconstrucción

> **Fuente**: `.github/plugins/teatro/instructions/personaje-context-protocol.instructions.md`  
> **Épica**: SCRIPT-2.4.0 (Agentic Personalization Layer)

Cualquier agente (@lucas, @teatro, @aleph, @revisor, etc.) puede **"interpretar" a un personaje creado** para ofrecer una segunda capa de contexto especializado.

### Mecanismo: Doble Carga de Fuentes (DRY)

```
PERSONAJE (ej: Lucas)
├── FUENTE 1: Agent-Creator (lucas.agent.md)
├── FUENTE 2: Brain Prolog (lucas-prolog.brain.pl) [opcional]
├── FUENTE 3: Plantillas (templates-index.json) [opcional]
├── FUENTE 4: Teatro Roles (itaca-digital.yaml) [opcional]
└── FUENTE 5: FIAs / Blockly [future]
```

### Protocolo en 4 Fases (Sin Context Bloat)

| Fase | Nombre | Función | Tokens |
|------|--------|---------|--------|
| **0** | Detección | Parse nombre de personaje | ~100 |
| **1** | Indexación DRY | Consultar `personajes-registry.json` (metadatos) | ~2K |
| **1b** | Sugerencias | Mostrar opciones disponibles (sin preguntar) | ~500 |
| **2** | Carga Bajo Demanda | Usuario elige qué fuentes cargar | Variable |
| **3** | Síntesis | Contexto personalizado integrado | ~1K |

**Ahorro**: Índices ~2.5K vs cargar TODO ~30K = **75% ahorro potencial**.

### Invocación

```
Agente: @lucas Cargame la visión de Penelope
         ↓
       FASE 1: Consultar índice
       → Detectado: Penelope (agent-creator) con Brain Prolog + Teatro roles
         ↓
       FASE 1b: Sugerencias
       → "✅ Brain Prolog (50 predicados)"
         "✅ Roles en Teatro (2 obras)"
         "Qué necesitas?"
         ↓
       Usuario: "Brain + Teatro"
       ↓
       FASE 2: Carga bajo demanda
       → read_file(penelope-prolog.brain.pl) + itaca-digital.yaml
       ↓
       FASE 3: Síntesis
       → "Aquí está Penelope con capacidades X, Y, Z"
```

### Características

- ✅ **Transversal**: Cualquier agente puede usarlo, no solo Teatro
- ✅ **DRY**: Personajes-registry.json = fuente única de metadatos
- ✅ **Sin bloat**: Índices ligeros + carga bajo demanda
- ✅ **Auto-reflexión**: Integrado con BP-01, BP-02, BP-06
- ✅ **Cacheable**: Sesiones reutilizan contextos cargados

Ver instrucciones completas en: `.github/plugins/teatro/instructions/personaje-context-protocol.instructions.md`

---

## Instrucciones Contextuales

Las instrucciones específicas se cargan automáticamente según el archivo:

| Contexto | Plugin | Instrucción |
|----------|--------|-------------|
| Agentes (@ox) | scriptorium-pack | ox-ontologia.instructions.md |
| Noticias (5W+Banderas) | scriptorium-pack | periodico.instructions.md |
| Submódulos | scriptorium-pack | submodulo-integracion.instructions.md |

Ver [plugins/scriptorium-pack/](plugins/scriptorium-pack/) para detalles.

---

## Flujo de Trabajo

1. **Consultar Backlog** → Identificar tarea activa
2. **Ejecutar** → Usar instrucciones del contexto
3. **Auditar** → Invocar banderas si es redacción compleja
4. **Commit** → `feat(scope): ... refs #ID`
5. **Actualizar Backlog**

> Si no sabes qué agente invocar → `@ox`

# Herramientas MCP en Vs Code

A veces algunas herramientas pueden parecer deshabilitadas. Aplicar el patrón de activación lazy de las herramientas MCP, algunas herramientas se agrupan y requieren invocar activate_* antes de usarlas.