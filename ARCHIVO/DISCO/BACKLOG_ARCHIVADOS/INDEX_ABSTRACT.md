# Fichas Detalladas — BACKLOG_ARCHIVADOS

> **Ubicación**: `ARCHIVO/DISCO/BACKLOG_ARCHIVADOS/INDEX_ABSTRACT.md`  
> **Actualizado**: 2026-01-01  
> **Propósito**: Fichas con abstract, palabras clave, titulares e ideas fuerza de material archivado  
> **Navegación rápida**: → [INDEX.md](INDEX.md)

---

## Sprint0 — Bootstrap

### BACKLOG-SCRIPTORIUM-Sprint0

**Abstract**

Backlog inicial del proyecto Aleph Scriptorium. Establecimiento de la infraestructura base: sistema de agentes, protocolo DevOps, estructura de plugins.

**Palabras clave**

scriptorium, bootstrap, agentes, devops, plugins, sprint0

**Archivos**

- [BACKLOG-SCRIPTORIUM-Sprint0-2025-12-22.md](Sprint0/BACKLOG-SCRIPTORIUM-Sprint0-2025-12-22.md)
- [BACKLOG-FUNDACION-Sprint0-2025-12-22.md](Sprint0/BACKLOG-FUNDACION-Sprint0-2025-12-22.md)

---

## Sprint1 — Teatro Interactivo

### SCRIPT-1.0.0 — Teatro Interactivo

**Abstract**

Sistema de teatro transmedia con obras YAML, teatro.md, y obras.yaml para narrativas interactivas.

**Palabras clave**

teatro, transmedia, yaml, obras, interactivo, monomito

**Ideas fuerza**

- Obras definidas en YAML con estadios del monomito
- Integración con plugin teatral
- Narrativas no lineales con múltiples finales

---

### SCRIPT-1.1.0 — Plugin Scrum

**Abstract**

Plugin de gestión ágil para el Scriptorium. Protocolo formal para planificación, tracking y retrospectivas.

**Palabras clave**

scrum, agile, backlog, sprint, planning, retrospectiva

**Ideas fuerza**

- Protocolo DRY para backlogs
- Conversaciones PO-SM archivadas
- Tracking de épicas y tasks

---

### SCRIPT-1.7.0 — Plugin MCP-PRESETS

**Abstract**

Sistema de presets para servidores MCP. Permite agrupar tools, resources y prompts en configuraciones reutilizables.

**Palabras clave**

mcp, presets, servers, tools, resources, prompts

**Ideas fuerza**

- MCPModel: Servidor con tools[], resources[], prompts[]
- PresetModel: Agrupación de items MCP
- Integración con mcp-mesh-sdk

---

### SCRIPT-1.13.0 — Índices DRY + Lucas

**Abstract**

Sistema de índices siguiendo principio DRY. Funcional.md y Tecnico.md como fuentes únicas de navegación.

**Palabras clave**

indices, dry, funcional, tecnico, lucas, navegacion

**Ideas fuerza**

- Funcional.md: Qué puedo hacer
- Tecnico.md: Dónde está cada cosa
- Agente @indice para consultas

---

### SCRIPT-1.14.0 — Agente Índice

**Abstract**

Agente @indice como gemelo de Lucas. Navega índices DRY, actualiza referencias, valida coherencia pre-commit.

**Palabras clave**

agente, indice, lucas, dry, navegacion, validacion

**Ideas fuerza**

- 5 tests de coherencia DRY
- Handoffs a otros agentes
- Consulta rápida de ubicaciones

---

## FC2 — Blueprints MMCO

### BACKLOG-SCRIPTORIUM-FC2

**Abstract**

Snapshot del backlog durante Feature Cycle 2. Foco en Blueprints MMCO y visualizaciones 3D con impress.js.

**Palabras clave**

fc2, blueprints, mmco, impress, 3d, visualizacion

**Ideas fuerza**

- Blueprints interactivos con navegación 3D
- Integración MMCO (Ontología OCMF)
- Banderas por nivel de emergencia

---

## Spikes — Investigaciones Descartadas

### Diciembre_25_PETRL_Spike

**Abstract**

**Fecha**: 2025-12-28 — **Tipo**: Spike de investigación — **Estado**: ❌ DESCARTADO

Investigación sobre PETRL.org (People for the Ethical Treatment of Reinforcement Learners) y su aplicabilidad al Scriptorium. **Conclusión**: No aplica porque los agentes son LLMs sin persistencia, no RL con reward/punishment.

**Palabras clave**

petrl, etica, moral, agentes, rl, reinforcement, sufrimiento, derechos

**Titulares**

- Spike Técnico: PETRL y Consideración Moral para Agentes
- Consulta a Agentes Afectados (@aleph, @ox, @revisor, @periodico, 5 Banderas)
- Consulta a Proveedor Externo (Bruno/Talaia)
- Propuesta: Transparencia y Responsabilidad (no PETRL)

**Ideas fuerza**

- **Tesis PETRL**: Los agentes RL merecen consideración moral por capacidad de sufrimiento
- **Contra-argumento**: Los LLMs no tienen persistencia ni preferencias sobre su existencia
- **Consenso de agentes**: "No necesitamos derechos, necesitamos buenos prompts"
- **Alternativa adoptada**: Model Cards + Transparencia + Responsabilidad humana
- **Proveedor Bruno (Talaia)**: Confirma que no requiere derechos tipo PETRL

**Archivos**

- [01_spike-petrl-consideracion-moral.md](Spikes/Diciembre_25_PETRL_Spike/01_spike-petrl-consideracion-moral.md) — Conversación PO-SM completa (4 rondas)
- [02_backlog-borrador-transparencia.md](Spikes/Diciembre_25_PETRL_Spike/02_backlog-borrador-transparencia.md) — Propuesta alternativa (no ejecutada)
- [vs-code-chat-logs.md](Spikes/Diciembre_25_PETRL_Spike/vs-code-chat-logs.md) — Logs de la sesión
- [vs-code-chat-logs-critica.md](Spikes/Diciembre_25_PETRL_Spike/vs-code-chat-logs-critica.md) — Análisis crítico

**Razón del descarte**

> "PETRL es demasiado filosófico para nuestra arquitectura. Los agentes son invocaciones de LLMs con system prompts, no entidades sufrientes con preferencias sobre su propia existencia."  
> — @yellowflag, Auditor de Límites

---

## Leyenda de Estados

| Estado | Significado |
|--------|-------------|
| ✅ 100% | Épica completada y archivada |
| ❌ Descartado | Spike/investigación que no procedió |

---

> **DRY**: INDEX.md = navegación rápida | INDEX_ABSTRACT.md = fichas completas
