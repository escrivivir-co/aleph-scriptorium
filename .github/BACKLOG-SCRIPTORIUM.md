# Backlog — Aleph Scriptorium

> **Opportunity**: Aleph Scriptorium  
> **Versión**: 0.0.1  
> **Sprint actual**: 0 (Bootstrap)

---

## Épica: SCRIPT-0.0.1 — Kit Mínimo del Scriptorium

**Objetivo**: Establecer la infraestructura base para agentes de escritura política.

**Entregables**:
- Protocolo DevOps
- Agente Aleph actualizado
- Prompts de extracción y commit
- Instrucciones de contexto

---

## Stories

### SCRIPT-0.0.1-S01: Protocolo DevOps
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T001 | Crear `.github/DEVOPS.md` | ✅ |
| T002 | Definir convención de commits | ✅ |
| T003 | Establecer estructura de sprints | ✅ |

---

### SCRIPT-0.0.1-S02: Agente Aleph
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T004 | Añadir sección DevOps a `aleph.agent.md` | ✅ |
| T005 | Integrar generación de commit messages | ✅ |
| T006 | Añadir checklist de trazabilidad | ✅ |
| T016 | Añadir handoffs (auditores + vestíbulo + cartas) | ✅ |

---

### SCRIPT-0.0.1-S03: Prompts Operativos
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T007 | Crear prompt `commit-message.prompt.md` | ✅ |
| T008 | Revisar `extraer-archivar.prompt.md` | ✅ |

---

### SCRIPT-0.0.1-S04: Instrucciones de Contexto
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T009 | Verificar `diagnostico.instructions.md` | ✅ |
| T010 | Verificar `marco-conceptual.instructions.md` | ✅ |
| T011 | Verificar `voz-manifiesto.instructions.md` | ✅ |
| T015 | Refactorizar `copilot-instructions.md` como Hub | ✅ |

---

### SCRIPT-0.0.1-S05: Puertas de entrada (README)
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T012 | Añadir “puertas” por perfil en `README.md` | ✅ |
| T017 | Añadir vestíbulo y cartas al README | ✅ |

---

### SCRIPT-0.0.1-S06: Cartas-puerta (instrucciones)
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T013 | Documentar mecanismo de cartas-puerta en `.github/instructions/` | ✅ |

---

### SCRIPT-0.0.1-S07: Vestíbulo de entrada
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T014 | Crear prompt `vestibulo-cartas.prompt.md` | ✅ |
| T018 | Crear agentes `vestibulo.agent.md` y `cartas-puerta.agent.md` | ✅ |

---

### SCRIPT-0.0.1-S08: Feature Noticias (Periódico)
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T019 | Crear carpeta `ARCHIVO/NOTICIAS/` con README | ✅ |
| T020 | Crear instrucciones `periodico.instructions.md` | ✅ |
| T021 | Crear agente `periodico.agent.md` con handoffs | ✅ |
| T022 | Crear prompt `periodico-editar.prompt.md` | ✅ |
| T023 | Crear prompt `periodico-publicar.prompt.md` | ✅ |
| T024 | Actualizar `copilot-instructions.md` con Periódico | ✅ |
| T025 | Integrar Periódico en `vestibulo-cartas.prompt.md` | ✅ |
| T026 | Actualizar README.md con sección Noticias | ✅ |

---

## Métricas Sprint 0

| Métrica | Valor |
|---------|-------|
| Tasks totales | 26 |
| Completadas | 26 |
| En progreso | 0 |
| Pendientes | 0 |
| % Avance | 100% |

---

# Épica: SCRIPT-0.1.0 — Sistema de Plugins

**Objetivo**: Implementar protocolo de extensibilidad mediante plugins para Scriptorium.

**Entregables**:
- Protocolo de plugins (PLUGINS.md)
- Agente plugin-manager
- Estructura plugins/ con registry
- Plugin ARG Board instalado

---

## Stories

### SCRIPT-0.1.0-S01: Protocolo de Plugins
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T027 | Crear `.github/PLUGINS.md` con especificación completa | ✅ |
| T028 | Definir estructura de manifest.md | ✅ |
| T029 | Documentar ciclo de vida de plugins | ✅ |

---

### SCRIPT-0.1.0-S02: Agente Plugin Manager
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T030 | Crear `agents/plugin-manager.agent.md` | ✅ |
| T031 | Implementar handoffs de instalación/desinstalación | ✅ |
| T032 | Crear `prompts/plugin-install.prompt.md` | ✅ |

---

### SCRIPT-0.1.0-S03: Infraestructura de Plugins
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T033 | Crear directorio `.github/plugins/` | ✅ |
| T034 | Inicializar `registry.json` | ✅ |
| T035 | Actualizar `copilot-instructions.md` con sección Plugins | ✅ |

---

### SCRIPT-0.1.0-S04: Plugin ARG Board (Conversión)
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T036 | Crear manifest.md para ARG Board | ✅ |
| T037 | Convertir chatmodes a agents/ | ✅ |
| T038 | Migrar prompts relevantes | ✅ |
| T039 | Copiar documentación AS_DOCS/ a docs/ | ✅ |
| T040 | Migrar META/ builders a meta/ | ✅ |

---

### SCRIPT-0.1.0-S05: Integración con Aleph
**Estado**: ✅ Completada

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T041 | Añadir handoffs de ARG Board a aleph.agent.md | ✅ |
| T042 | Registrar plugin en registry.json | ✅ |
| T043 | Crear informe de implementación | ✅ |

---

## Métricas Sprint 0.1

| Métrica | Valor |
|---------|-------|
| Tasks totales | 17 |
| Completadas | 17 |
| En progreso | 0 |
| Pendientes | 0 |
| % Avance | 100% |

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2024-12-19 | Creación inicial del backlog | Aleph |
| 2024-12-19 | Completar DEVOPS.md | Aleph |
| 2024-12-20 | Añadir feature Noticias (Periódico) — S08 | Aleph |
| 2025-12-20 | Añadir Épica SCRIPT-0.1.0 — Sistema de Plugins | Aleph |
| 2025-12-20 | Completar instalación plugin ARG Board | Aleph |
