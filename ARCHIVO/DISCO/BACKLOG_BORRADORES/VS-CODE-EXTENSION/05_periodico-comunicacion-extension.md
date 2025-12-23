# Periódico: Plana Noticiera de la Integración Extension

> **Agente**: 📰 Periódico (Producción Noticiera)
> **Fecha**: 2025-12-23
> **Ronda**: 3 de 4 (Ox ✅ → Aleph ✅ → **Periódico** → Revisor)

---

## ESCRIVIVIR.CO — EDICIÓN ESPECIAL

### CABECERA

```
══════════════════════════════════════════════════════════════════
                         ESCRIVIVIR.CO
   // integración tecnológica · infraestructura doctrinal · método 5W + banderas
══════════════════════════════════════════════════════════════════
               Nº ESPECIAL · 23 DICIEMBRE 2025 · SPRINT 2
══════════════════════════════════════════════════════════════════
```

---

## TITULAR PRINCIPAL

### 🔴 «El Scriptorium extiende sus tentáculos: 19 agentes colonizarán VS Code»

> La extensión Arrakis Theater será refactorizada para albergar la ontología completa del Scriptorium. Dos elencos coexistirán en el mismo teatro digital.

---

## LOS HECHOS (5W)

### WHO — ¿Quién actúa?

| Actor | Rol | Interés |
|-------|-----|---------|
| **PO (Usuario)** | Decide prioridades | Potenciar flujo de trabajo |
| **SM (@scrum)** | Planifica sprint | 8 épicas, 39 pts, 74 tasks |
| **@ox** | Audita ontología | Coexistencia paralela |
| **@aleph** | Preserva doctrina | Producción no bloqueada |
| **Arrakis Theater** | Extensión base | 60% código reutilizable |

### WHAT — ¿Qué ocurre?

1. **Fork** de `vscode-alephscript-extension` → `scriptorium-vscode-extension`
2. **Carga dinámica** de 19 agentes desde `.github/agents/`
3. **Vista de plugins** desde `registry.json` (7 plugins)
4. **ChatParticipants** para agentes principales (5-10 iniciales)
5. **Vista de backlogs** (DISCO + oficiales)
6. **Migración opcional** del elenco Arrakis al Teatro ARG

### WHERE — ¿Dónde?

- **Código fuente**: `vscode-alephscript-extension/`
- **Agentes**: `.github/agents/` (19 archivos)
- **Plugins**: `.github/plugins/` (7 plugins, 33 prompts ocultos)
- **Backlog borrador**: `ARCHIVO/DISCO/BACKLOG_BORRADORES/`
- **Producción**: GitHub Actions + VSIX local

### WHEN — ¿Cuándo?

| Hito | Fecha estimada |
|------|----------------|
| Planificación completada | 2025-12-23 ✅ |
| Sprint 2 inicio | 2025-12-24 |
| Iteración 1 (core + agentes) | Semana 1 |
| Iteración 2 (plugins + chat) | Semana 2 |
| Iteración 3 (backlogs + status) | Semana 3 |
| Iteración 4 (prompts + testing) | Semana 4 |
| Release v0.1.0-scriptorium | ~2026-01-20 |

### WHY — ¿Por qué?

**Motivo oficial**: Potenciar el flujo de trabajo del Scriptorium desde VS Code.

**Motivo real**: El sistema de agentes ha crecido (19 core + plugins) y necesita una interfaz visual que Copilot Chat nativo no ofrece:
- TreeView de agentes por capa
- Vista de plugins con estado
- Panel de sprint status
- QuickPick de 30+ prompts

---

## EL ANÁLISIS (4 Banderas)

### 🔴 REDFLAG — Infraestructura y Escala

**Pregunta**: ¿Es viable técnicamente?

| Capacidad | Estado |
|-----------|--------|
| Fork de repo existente | ✅ Código disponible |
| TypeScript + VS Code API | ✅ Stack conocido |
| Carga de 20+ agentes | ⚠️ Lazy loading requerido |
| FileWatcher para refresh | ✅ API disponible |
| ChatParticipant registration | ✅ API ^1.95.0 |

**Veredicto**: Viable. El 60% del código se reutiliza; el 40% se añade/modifica.

### 🔵 BLUEFLAG — Utilidad y Evidencia

**Pregunta**: ¿Mejora realmente el flujo de trabajo?

| Flujo actual (Copilot Chat) | Flujo con extensión |
|-----------------------------|---------------------|
| Invocar `@agente` de memoria | TreeView clickeable |
| Buscar prompt en carpetas | QuickPick con filtro |
| Tracking manual de sprint | Panel visual de progreso |
| Handoffs como texto | Followups como botones |

**Veredicto**: Sí mejora. La visibilidad de agentes, plugins y backlogs reduce fricción cognitiva.

### ⚫ BLACKFLAG — Sombras y Riesgos

**Pregunta**: ¿Qué puede salir mal?

| Riesgo | Probabilidad | Mitigación |
|--------|--------------|------------|
| Conflicto con extensión original | Media | Cambiar ID de extensión |
| Pérdida de doctrina en ChatParticipants | Alta | SystemPrompts + carga de instructions |
| Divergencia de estado (caché) | Media | FileWatcher + invalidación |
| Distracción de Fundación | Baja | 70/30 split de capacidad |

**Veredicto**: Riesgos manejables. El principal (pérdida de doctrina) tiene mitigación propuesta.

### 🟡 YELLOWFLAG — Límites y Condiciones

**Pregunta**: ¿Qué escapa al diseño?

- **Lo que SÍ captura**: Gestión de agentes, plugins, backlogs, prompts
- **Lo que NO captura**: Contenido doctrinal (solo condiciones de acceso)
- **Peligro detectado**: Los ChatParticipants podrían "simplificar" la doctrina si los systemPrompts son superficiales

**Veredicto**: La extensión debe ser **infraestructura**, no sustituto de la doctrina. Los agentes en VS Code deben comportarse igual que en Copilot Chat nativo.

---

## TESIS DEL NÚMERO

> **La extensión no es un fin: es un medio para hacer visible lo que ya existe.** 
> 
> El Scriptorium tiene 19 agentes, 7 plugins, 30+ prompts. Pero están "ocultos" en carpetas que solo el usuario experto conoce. La extensión los saca a la luz sin alterar su naturaleza.
>
> **El riesgo** es confundir visibilidad con control. Que la interfaz gráfica termine dictando lo que los agentes pueden hacer. Por eso Ox propone coexistencia paralela: el elenco Scriptorium carga dinámicamente; el elenco Arrakis permanece como legacy teatral.

---

## IMAGEN DE CABECERA (Prompt)

### Concepto

Dos bibliotecas conectadas por un puente de cristal. A la izquierda, el Scriptorium (pergaminos, banderas de colores, un buey dorado). A la derecha, el Teatro Arrakis (terminal verde-negro, personajes con trajes de marinero). En el centro, fluyen líneas de código que se transforman en palabras.

### Prompt (Midjourney/DALL-E)

```
Two connected spaces: on the left, a medieval scriptorium with colored flags (blue, black, red, yellow, orange) hanging from wooden beams, golden ox statue, scrolls on desks. On the right, a hacker-style theater with green-on-black terminals, five sailors in period costumes (captain, boatswain, sailor). A glass bridge connects them, with streams of code transforming into handwritten words. Dark enlightenment style, editorial illustration, dramatic lighting, 16:9 aspect ratio.
```

### Capas semióticas

| Capa | Elemento | Significado |
|------|----------|-------------|
| **Centro** | Puente de cristal | Integración transparente |
| **Izquierda** | Scriptorium + banderas | Sistema de auditoría doctrinal |
| **Derecha** | Teatro + marineros | Legacy de Arrakis Theater |
| **Flujo** | Código → palabras | Infraestructura al servicio del contenido |

---

## HANDOFF A @REVISOR

**Turno**: Ronda 4 de 4 (Final)

**Contexto para @revisor**:
- Sprint 2 planificado con 8 épicas (39 pts, 74 tasks)
- Modelo de coexistencia paralela aprobado por Ox y Aleph
- Riesgos principales identificados y mitigados
- Plana noticiera preparada para comunicación

**Preguntas para @revisor**:
1. ¿La propuesta es coherente con el ARCHIVO (marco, diagnóstico, justificación)?
2. ¿Los systemPrompts propuestos capturan la vacuna anti-naïf?
3. ¿Falta algún mecanismo de defensa contra captura?
4. ¿El split 70/30 (extension/fundación) es adecuado?

---

**Firma**: 📰 Periódico (Método 5W + Banderas)  
**Timestamp**: 2025-12-23T11:00:00Z
