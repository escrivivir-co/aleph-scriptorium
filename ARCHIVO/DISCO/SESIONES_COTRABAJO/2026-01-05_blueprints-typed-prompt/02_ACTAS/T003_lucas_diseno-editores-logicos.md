# Acta T003: Diseño Visual — Sección "Editores Lógicos"

## Metadatos

| Campo | Valor |
|-------|-------|
| **Turno** | T003 |
| **Agente** | @lucas (Scrum Master del Índice) |
| **Rol** | Diseño UX + Validación DRY |
| **Inicio** | 2026-01-05 15:00 |
| **Fin** | 2026-01-05 15:30 |
| **Estado** | ✅ DONE |

---

## Contexto Leído

- ✅ T001 (backlog inicial @periodico)
- ✅ T002 (reformulación @ox — 7 stories, 15 pts)
- ✅ docs/demo.md (estructura actual)
- ✅ Instrucciones de cotrabajo (04_PROTOCOLO.md)

---

## Análisis de Estado Actual

### Estructura demo.md

| Sección Actual | Cards | Puertos |
|----------------|-------|---------|
| Featured | Index GH-Pages | — |
| Gestores | Zeus Presets | 3012 |
| Narrativa | Novelist Editor | 8080 |
| Blueprints | Blueprint UX, MMCO, Copilot, PO | — |
| Featured | Release Party | — |

**Observación**: No existe sección "Editores Lógicos". Los editores están dispersos o ausentes.

### Editores a Añadir

| Editor | Puerto | Estado | Screenshot |
|--------|--------|--------|------------|
| TypedPromptsEditor | 3019 | ⚠️ Verificar | Pendiente |
| PrologEditor | 5001 | ⚠️ Verificar | Pendiente |

---

## 🎨 Propuesta de Diseño

### 1. Nueva Sección: "Editores Lógicos"

**Ubicación**: Entre "Gestores" (Zeus) y "Blueprints"

**Justificación**: Los editores lógicos son **herramientas de producción** (como Zeus y Novelist), no documentación (como Blueprints).

### 2. Orden de Cards Propuesto

```
┌─────────────────────────────────────────────────────────────┐
│                      DEMO GALLERY                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ████████████████████████████████████████████████████████  │
│  █            🏠 Index GH-Pages (featured)             █   │
│  ████████████████████████████████████████████████████████  │
│                                                             │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │ ⚡ Zeus Presets  │  │ 📝 Novelist     │                 │
│  │    :3012         │  │    :8080        │                 │
│  └──────────────────┘  └──────────────────┘                │
│                                                             │
│  ─────────────── EDITORES LÓGICOS ───────────────          │  ← NUEVA
│                                                             │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │ 🧠 TypedPrompts  │  │ 🔬 PrologEditor │                 │
│  │    :3019         │  │    :5001        │                 │
│  └──────────────────┘  └──────────────────┘                │
│                                                             │
│  ─────────────────── BLUEPRINTS ────────────────────       │
│                                                             │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐             │
│  │ Blueprint  │ │ Blueprint  │ │ Blueprint  │             │
│  │ UX         │ │ MMCO       │ │ Copilot    │             │
│  └────────────┘ └────────────┘ └────────────┘             │
│                                                             │
│  ████████████████████████████████████████████████████████  │
│  █          🎉 Release Party (featured)                █   │
│  ████████████████████████████████████████████████████████  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 3. Status Badges Propuestos

Añadir en la barra de estado superior:

```html
<span class="status-badge">
  <span class="dot"></span>
  TypedPrompts :3019
</span>
<span class="status-badge">
  <span class="dot"></span>
  Prolog :5001
</span>
```

### 4. Código HTML para Cards

#### TypedPromptsEditor Card

```html
<!-- TypedPromptsEditor -->
<div class="iframe-card">
  <div class="iframe-header">
    <span class="iframe-title">🧠 TypedPrompts Editor</span>
    <div class="iframe-actions">
      <a href="http://localhost:3019" target="_blank">↗ Abrir</a>
    </div>
  </div>
  <div class="iframe-container">
    <div class="iframe-placeholder" id="typed-placeholder">
      <span class="icon">🧠</span>
      <p>TypedPrompts Editor</p>
      <p><code>localhost:3019</code></p>
      <p>Ejecuta: <code>npm run dev</code> en TypedPromptsEditor/</p>
    </div>
    <iframe src="http://localhost:3019" loading="lazy"></iframe>
  </div>
</div>
```

#### PrologEditor Card

```html
<!-- PrologEditor -->
<div class="iframe-card">
  <div class="iframe-header">
    <span class="iframe-title">🔬 Prolog Editor</span>
    <div class="iframe-actions">
      <a href="http://localhost:5001" target="_blank">↗ Abrir</a>
    </div>
  </div>
  <div class="iframe-container">
    <div class="iframe-placeholder" id="prolog-placeholder">
      <span class="icon">🔬</span>
      <p>Prolog Editor (Angular)</p>
      <p><code>localhost:5001</code></p>
      <p>Ejecuta: <code>npm run start:frontend</code> en PrologEditor/</p>
    </div>
    <iframe src="http://localhost:5001" loading="lazy"></iframe>
  </div>
</div>
```

### 5. Script de Health Check Extendido

Añadir en el array `servers`:

```javascript
const servers = [
  { id: 'zeus-placeholder', url: 'http://localhost:3012', iframe: true },
  { id: 'novelist-placeholder', url: 'http://localhost:8080', iframe: true },
  // Nuevos editores lógicos
  { id: 'typed-placeholder', url: 'http://localhost:3019', iframe: true },
  { id: 'prolog-placeholder', url: 'http://localhost:5001', iframe: true }
];
```

---

## 📊 Verificación de Índices DRY

### Consulta a Funcional.md

> **¿Están documentadas las capacidades?**

| Capacidad | Sección Funcional.md | Estado |
|-----------|---------------------|--------|
| Validación de Schemas | — | ⚠️ FALTA |
| Lógica Declarativa | — | ⚠️ FALTA |

**Acción requerida**: DS-S00 (Story 0 de @ox) debe completarse ANTES de editar demo.md.

### Consulta a Tecnico.md

> **¿Están documentados los stacks técnicos?**

| Stack | Sección Tecnico.md | Estado |
|-------|-------------------|--------|
| MCP TypedPrompt (3019/3020) | — | ⚠️ FALTA |
| MCP Prolog (5001/8000/3006) | — | ⚠️ FALTA |

**Conclusión @lucas**: El backlog de @ox es correcto. DS-S00 es bloqueante.

---

## Decisiones Tomadas

1. ✅ Ubicación de "Editores Lógicos": entre Gestores y Blueprints
2. ✅ Iconos: 🧠 (TypedPrompts), 🔬 (Prolog)
3. ✅ Estructura de cards: mismo formato que Zeus/Novelist
4. ✅ DS-S00 (índices DRY) es prerequisito bloqueante
5. ✅ Se necesitan screenshots reales (no mockups estáticos)

---

## Tareas Ejecutables

### Para DS-S00 (índices DRY) — Bloqueante

- [ ] T00a: Añadir §3.6 en Funcional.md
- [ ] T00b: Añadir §3.7 en Funcional.md  
- [ ] T00c: Añadir Stack TypedPrompt en Tecnico.md
- [ ] T00d: Añadir Stack Prolog en Tecnico.md

### Para DS-S02 (demo.md) — Desbloqueado tras DS-S00

- [ ] T06: Insertar sección "Editores Lógicos" en demo.md (L230)
- [ ] T07: Añadir card TypedPromptsEditor
- [ ] T08: Añadir card PrologEditor
- [ ] T09: Añadir status badges (3019, 5001)
- [ ] T10: Extender script de health check

---

## Preguntas para Siguientes Turnos

- [ ] **@aleph (PO)**: ¿Apruebas el orden de prioridades (DS-S00 bloqueante)?
- [ ] **@periodico**: ¿Puedes capturar screenshots con los servidores activos?

---

## Siguiente Turno Sugerido

**Opción A**: @aleph (PO) → Aprobar backlog reformulado + prioridad DS-S00
**Opción B**: @periodico → Ejecutar DS-S00 con método corregido

**Recomendación @lucas**: Opción A — El PO debe aprobar antes de ejecutar.

---

## Consulta Prolog (Cerebro Lucas)

```prolog
?- documentacion_coherente(editores_logicos).
false.  % No hay documentación coherente aún

?- ubicacion_canonica(como, Donde).
Donde = '.github/instructions'.

?- consejo(perdido, M).
M = 'Cuando no sepas dónde buscar, consulta @indice. El mapa existe.'.
```

**Diagnóstico del cerebro**: El sistema de índices NO está listo para los editores lógicos. Primero documentar, luego promocionar.

---

## Estado del Turno

| Campo | Valor |
|-------|-------|
| **Estado** | ✅ DONE |
| **Artefacto producido** | Mockup visual + código HTML para cards |
| **Decisión clave** | DS-S00 es bloqueante |
| **Siguiente turno** | @aleph (PO) para aprobación |
