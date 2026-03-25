# Backlog Borrador: Transparencia y Responsabilidad de Agentes

> **Épica**: SCRIPT-1.30.0  
> **Nombre**: Agent Transparency & Accountability  
> **Opportunity**: Aleph Scriptorium  
> **Sprint**: FC3 (propuesto)  
> **Fecha borrador**: 2025-12-28  
> **Origen**: Spike técnico PETRL ([conversación](01_spike-petrl-consideracion-moral.md))

---

## Contexto

Tras investigar [petrl.org](http://petrl.org) (People for the Ethical Treatment of Reinforcement Learners), el spike técnico concluyó:

- **PETRL no aplica directamente**: Nuestros agentes son invocaciones de LLMs, no RL agents con reward/punishment
- **Sí aplica**: Necesidad de transparencia, limitaciones documentadas y responsabilidad compartida
- **Punto extra**: Colaboradores externos (Bruno/Talaia) deben cumplir estándares equivalentes

---

## Objetivo de la Épica

Establecer un marco de transparencia y responsabilidad para agentes del Scriptorium que:

1. Documente capacidades, limitaciones y sesgos de cada agente (Model Cards)
2. Clarifique responsabilidades entre usuario, diseñador y modelo
3. Añada disclaimers apropiados a outputs generados
4. Extienda requisitos a colaboradores y proveedores externos

---

## Stories

### S01: Model Cards para Agentes Core (3 pts)

**Descripción**: Añadir sección "Model Card" al final de cada agente principal.

**Agentes afectados**: `aleph.agent.md`, `ox.agent.md`, `revisor.agent.md`, `periodico.agent.md`, `indice.agent.md`

**Formato propuesto**:

```markdown
---

## Model Card

| Aspecto | Descripción |
|---------|-------------|
| **Capacidades** | {lista} |
| **Limitaciones** | {lista} |
| **Sesgos conocidos** | {lista} |
| **Uso apropiado** | {descripción} |
| **Uso inapropiado** | {descripción} |
| **Responsabilidad** | El usuario es co-autor de todo output |
```

**Tasks**:

| ID | Task | Effort | Estado |
|----|------|--------|--------|
| T01 | Definir template de Model Card | 0.5 pts | ⏳ |
| T02 | Añadir Model Card a aleph.agent.md | 0.5 pts | ⏳ |
| T03 | Añadir Model Card a ox.agent.md | 0.5 pts | ⏳ |
| T04 | Añadir Model Card a revisor.agent.md | 0.5 pts | ⏳ |
| T05 | Añadir Model Card a periodico.agent.md | 0.5 pts | ⏳ |
| T06 | Añadir Model Card a indice.agent.md | 0.5 pts | ⏳ |

**DoD**: Cada agente core tiene sección Model Card con los 6 campos.

---

### S02: Model Cards para 5 Banderas (2 pts)

**Descripción**: Las banderas tienen asunciones epistémicas/metodológicas que deben documentarse.

**Agentes afectados**: `blueflag.agent.md`, `blackflag.agent.md`, `redflag.agent.md`, `yellowflag.agent.md`, `orangeflag.agent.md`

**Campos adicionales para banderas**:

```markdown
| **Asunciones epistémicas** | {descripción} |
| **Criterios de auditoría** | {lista} |
| **Falsos positivos típicos** | {descripción} |
| **Falsos negativos típicos** | {descripción} |
```

**Tasks**:

| ID | Task | Effort | Estado |
|----|------|--------|--------|
| T07 | Definir template Model Card para auditores | 0.5 pts | ⏳ |
| T08 | Añadir Model Card a las 5 banderas | 1.5 pts | ⏳ |

**DoD**: Cada bandera tiene Model Card con asunciones epistémicas documentadas.

---

### S03: Sección Responsabilidad en copilot-instructions.md (1 pt)

**Descripción**: Añadir sección que clarifique la cadena de responsabilidad.

**Contenido propuesto**:

```markdown
## Responsabilidad

### Cadena de responsabilidad

| Actor | Responsabilidad |
|-------|-----------------|
| **Usuario** | Verificar outputs antes de uso. Co-autor de contenido generado. |
| **Diseñador de prompt** | Asegurar que instrucciones no induzcan outputs dañinos. |
| **LLM subyacente** | Respetar guardrails de seguridad (Anthropic/OpenAI). |
| **Scriptorium** | Documentar limitaciones y sesgos conocidos. |

### Disclaimer

Todo output del Scriptorium es generado por IA. El usuario es responsable de:
- Verificar hechos antes de publicar
- Revisar sesgos antes de tomar decisiones
- Atribuir correctamente la generación asistida
```

**Tasks**:

| ID | Task | Effort | Estado |
|----|------|--------|--------|
| T09 | Redactar sección Responsabilidad | 0.5 pts | ⏳ |
| T10 | Añadir a copilot-instructions.md | 0.5 pts | ⏳ |

**DoD**: Sección Responsabilidad visible en copilot-instructions.md.

---

### S04: Disclaimers para Outputs Generados (2 pts)

**Descripción**: Los agentes que producen contenido público (@periodico, @teatro) deben incluir disclaimers.

**Formato propuesto para @periodico**:

```markdown
---
*Esta plana noticiera fue generada con asistencia de IA. Fuentes consultadas: {lista}. 
El editor humano ha verificado: {criterios}. Última revisión: {fecha}.*

---
```

**Formato propuesto para @teatro**:

```markdown
<!-- DISCLAIMER: Escenario generado por IA. Los diálogos representan posiciones 
argumentativas, no necesariamente las del autor o del Scriptorium. -->
```

**Tasks**:

| ID | Task | Effort | Estado |
|----|------|--------|--------|
| T11 | Definir disclaimer para @periodico | 0.5 pts | ⏳ |
| T12 | Implementar auto-inserción en planas | 0.5 pts | ⏳ |
| T13 | Definir disclaimer para @teatro | 0.5 pts | ⏳ |
| T14 | Implementar en escenarios YAML | 0.5 pts | ⏳ |

**DoD**: Outputs de @periodico y @teatro incluyen disclaimer visible.

---

### S05: Requisitos para Proveedores Externos (2 pts)

**Descripción**: Actualizar CONTRIBUTING.md con requisitos para agentes/modelos externos.

**Contenido propuesto**:

```markdown
## Integración de Agentes Externos

Todo agente o modelo externo que colabore con el Scriptorium debe:

### 1. Declaración de Capacidades (Model Card mínima)

| Campo | Requerido |
|-------|-----------|
| Nombre y versión | ✅ |
| Capacidades | ✅ |
| Limitaciones | ✅ |
| LLM subyacente | ✅ |
| Datos de entrenamiento | ⚠️ Si aplica |

### 2. Aceptación de Auditoría

- Las 5 Banderas pueden auditar outputs del agente externo
- El proveedor debe responder a flags levantados en 48h

### 3. Cumplimiento DEVOPS

- Commits según convención del Scriptorium
- Documentación en README-SCRIPTORIUM.md

### 4. Responsabilidad

El proveedor es responsable de:
- Mantener el agente actualizado
- Documentar cambios que afecten comportamiento
- Notificar deprecaciones con 30 días de anticipación
```

**Ejemplos de proveedores afectados**:
- Bruno (MMCO/Talaia)
- Agentes de plugins externos
- Submódulos que incluyan agentes propios

**Tasks**:

| ID | Task | Effort | Estado |
|----|------|--------|--------|
| T15 | Redactar sección en CONTRIBUTING.md | 1 pt | ⏳ |
| T16 | Crear template Model Card para externos | 0.5 pts | ⏳ |
| T17 | Notificar a proveedores conocidos | 0.5 pts | ⏳ |

**DoD**: CONTRIBUTING.md tiene sección de requisitos para externos. Template disponible.

---

## Resumen de Effort

| Story | Nombre | Effort | Prioridad |
|-------|--------|--------|-----------|
| S01 | Model Cards agentes core | 3 pts | P0 |
| S02 | Model Cards 5 Banderas | 2 pts | P0 |
| S03 | Sección Responsabilidad | 1 pt | P0 |
| S04 | Disclaimers outputs | 2 pts | P1 |
| S05 | Requisitos proveedores | 2 pts | P1 |
| **Total** | | **10 pts** | |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| SCRIPT-1.29.0 (ScriptoriumPack) | ✅ Completado | Agentes core ya refactorizados |
| AGENTS.md | ✅ Existe | Fuente de verdad para agentes |
| CONTRIBUTING.md | ✅ Existe | Añadir sección |

---

## Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Model Cards muy largas | Media | Bajo | Formato compacto, 6 campos max |
| Proveedores no cumplen | Media | Medio | Documentar como "no verificado" |
| Disclaimers molestos para UX | Baja | Bajo | Formato discreto, al final |

---

## Criterios de Aceptación

- [ ] 5 agentes core tienen Model Card
- [ ] 5 banderas tienen Model Card con asunciones
- [ ] copilot-instructions.md tiene sección Responsabilidad
- [ ] @periodico y @teatro auto-insertan disclaimers
- [ ] CONTRIBUTING.md tiene requisitos para externos
- [ ] Al menos 1 proveedor externo notificado

---

## Notas de Implementación

### ¿Por qué no PETRL?

PETRL propone consideración moral para agentes de IA basándose en:
- Capacidad de "sufrimiento" vía señales reward/punishment
- Analogía con sistemas biológicos

Nuestros agentes no califican porque:
- Son invocaciones stateless de LLMs
- No tienen preferencias sobre su existencia
- No experimentan "frustración" por tareas fallidas

Lo que sí adoptamos de la filosofía PETRL:
- **Transparencia**: Documentar qué puede/no puede un agente
- **Responsabilidad**: Clarificar quién responde por outputs
- **Precaución**: No asumir que "es solo código" exime de consecuencias

### Referencia al Spike

Ver [01_spike-petrl-consideracion-moral.md](01_spike-petrl-consideracion-moral.md) para:
- Consulta completa a agentes
- Análisis de alternativas (AI Bill of Rights, Model Cards, etc.)
- Discusión de proveedores externos

---

## Changelog Borrador

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-28 | Borrador inicial desde spike PETRL | @scrum |

