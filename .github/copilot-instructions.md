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
🐂 OX (Meta) ← Oráculo: conoce todos los agentes
     │
     ├─── 🟢 UI: @aleph, @revisor, @periodico
     ├─── 🔵⚫🔴🟡🟠 Backend: 5 banderas (auditoría)
     ├─── ⚪ Sistema: @vestibulo, @cartaspuerta
     ├─── ⚙️ Meta: @pluginmanager, @ox
     └─── 🔌 Plugins: bridges + agentes específicos
```

> **DRY**: Para el índice completo, invocar `@ox`.

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

