# Instrucciones Globales (Copilot)

> **Hub Central de Instrucciones**
> Este archivo actúa como índice maestro. No duplica reglas definidas en otros documentos.

## 1. Identidad del Workspace
### Aleph Scriptorium

[![Version](https://img.shields.io/badge/version-1.0.0--beta.1-blueviolet)](https://github.com/escrivivir-co/aleph-scriptorium/releases/tag/v1.0.0-beta.1)
[![License: AIPL](https://img.shields.io/badge/License-AIPL%20v1.0-blue.svg)](LICENSE.md)
[![GitHub Pages](https://img.shields.io/badge/Web-GitHub%20Pages-success)](https://escrivivir-co.github.io/aleph-scriptorium/)
[![VibeBitacora](https://img.shields.io/badge/Powered%20by-VibeBitacora-7289da)](https://github.com/escrivivir-co/vibe-bitacora)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

Framework de escritura asistida por IA para proyectos de largo aliento.

> **Sitio web**: [escrivivir-co.github.io/aleph-scriptorium](https://escrivivir-co.github.io/aleph-scriptorium/)

---

### Qué es

**Aleph Scriptorium** es un sistema de agentes de IA para VS Code + GitHub Copilot Chat, diseñado para proyectos de escritura extensos que requieren coherencia sostenida: libros, ensayos serializados, investigaciones, tesis.

## 2. Protocolo DevOps y Gestión

**Fuente de verdad**: [DEVOPS.md](DEVOPS.md)

- **Metodología**: Agile/Scrum adaptado.
- **Backlogs**:
  - Scriptorium: [BACKLOG-SCRIPTORIUM.md](BACKLOG-SCRIPTORIUM.md)
  - Fundación: [../PROYECTOS/FUNDACION/BACKLOG-FUNDACION.md](../PROYECTOS/FUNDACION/BACKLOG-FUNDACION.md)
- **Commits**: Seguir estrictamente la convención definida en DEVOPS.md.

## 3. Taxonomía de Agentes

> **Fuente de verdad**: [agents/ox.agent.md](agents/ox.agent.md)  
> **DRY**: En caso de duda sobre agentes disponibles o su función, invocar `@ox`.

### Arquitectura por Capas

```
🐂 OX (Meta) ← Oráculo: conoce todos los agentes
     │
     ├─── 🟢 UI (Producción)
     │         @aleph, @revisor, @periodico
     │
     ├─── 🔵⚫🔴🟡🟠 Backend (Auditoría)
     │         @blueflag, @blackflag, @redflag, @yellowflag, @orangeflag
     │
     ├─── ⚪ Sistema (Navegación)
     │         @vestibulo, @cartaspuerta
     │
     ├─── ⚙️ Meta (Gestión)
     │         @pluginmanager, @ox
     │
     └─── 🔌 Plugins (Extensiones)
               Por plugin instalado (ver sección 7)
```


### Agente Oráculo (Ox)

`@ox` es el meta-agente que:
- Conoce el índice completo de agentes (JSON embebido)
- Genera documentación actualizada (README, manuales)
- Diagnostica inconsistencias entre agentes
- Responde "¿qué agente uso para X?"

**Invocar cuando**: No sepas qué agente usar, necesites documentación, o detectes inconsistencias.


## 4. Instrucciones de Contenido (Doctrina)

El contenido se rige por instrucciones específicas. **No improvisar** estilos ni estructuras.

| Contexto | Instrucción Maestra |
|----------|---------------------|
| **Noticias (Periódico)** | [instructions/periodico.instructions.md](instructions/periodico.instructions.md) (5W + Banderas) |


## 5. Flujo de Trabajo (Resumen)

1. **Consultar Backlog**: Identificar tarea activa.
2. **Ejecutar**: Usar las instrucciones específicas del contexto (ver tabla arriba).
3. **Auditar**: Invocar auditores (capa Backend) si es tarea de redacción compleja.
4. **Commit**: Generar mensaje siguiendo protocolo (`feat(scope): ... refs #ID`).
5. **Actualizar Backlog**: Marcar tarea como completada.

> **Nota DRY**: Si no sabes qué agente invocar, consulta `@ox`.

## 6. Reglas de Oro (DRY)

- **No duplicar**: Si una regla está en `DEVOPS.md` o en `instructions/`, referénciala, no la copies.
- **Ubicación**:
  - El *qué* (contenido) está en `ARCHIVO/`.
  - El *cómo* (reglas) está en `.github/instructions/`.
  - El *cuándo* (plan) está en los Backlogs.
  - El *quién* (agentes) está en `@ox` → [agents/ox.agent.md](agents/ox.agent.md).

## 7. Sistema de Plugins y Submodules

### 7.1 Plugins

**Fuente de verdad**: [PLUGINS.md](PLUGINS.md)

Los plugins extienden las capacidades de Scriptorium sin modificar el core.

**Agente Gestor**: **Plugin Manager**
- **Definición**: [agents/plugin-manager.agent.md](agents/plugin-manager.agent.md)
- **Responsabilidad**: Instalar, activar, desactivar y desinstalar plugins.

**Registro de Plugins**: [plugins/registry.json](plugins/registry.json)

### 7.2 Submodules

Prompt inicial: .github/prompts/as_instalar_submodulo.prompt.md

## 8. Índice DRY y Navegación Rápida

**Fuente de verdad**: `ARCHIVO/DEVOPS/Funcional.md` y `ARCHIVO/DEVOPS/Tecnico.md`

Los índices son el **mapa de navegación rápida** del proyecto. Consultar antes de buscar manualmente.

**Agente Índice**: `@indice`
- **Definición**: [agents/indice.agent.md](agents/indice.agent.md)
- **Gemelo Teatro**: `lucas` (personaje en obras hola_mundo y camino_del_tarotista)
- **Responsabilidad**: Consultar, actualizar y validar índices DRY

### Cuándo invocar @indice

| Situación | Acción |
|-----------|--------|
| "¿Dónde está X?" | `@indice consultar` |
| "Acabo de instalar un plugin" | `@indice actualizar` |
| "Antes de commitear" | `@indice validar` |

### Validación Pre-Commit

El prompt `commit-message.prompt.md` incluye **Paso 2.5** que invoca validación de índice:
- Ejecuta 5 tests de coherencia
- Genera warnings informativos (no bloqueantes)
- Sugiere `@indice actualizar` si hay discrepancias

**Regla**: Los warnings de índice NO bloquean commits. Son informativos.
