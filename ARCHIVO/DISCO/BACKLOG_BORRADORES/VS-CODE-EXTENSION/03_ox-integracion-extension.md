# Ox: Auditoría de Integración Scriptorium ↔ Extension

> **Agente**: 🐂 Ox (Oráculo del Scriptorium)
> **Fecha**: 2025-12-23
> **Ronda**: 1 de 4 (Ox → Aleph → Periódico → Revisor)

---

## 1. Contexto de Intervención

El PO y SM han generado borradores completos para el Sprint 2:
- [01_planificacion-extension-vscode.md](01_planificacion-extension-vscode.md) — Auditoría y sinergias
- [02_backlog-extension-vscode.md](02_backlog-extension-vscode.md) — 8 épicas, 39 pts, 74 tasks

**Rol de Ox**: Auditar la propuesta desde la ontología de agentes y garantizar que la integración no pierda el mapa del sistema.

---

## 2. Inventario de Agentes (Fuente de Verdad)

### Agentes Core del Scriptorium (19)

| Capa | Agentes | Archivos |
|------|---------|----------|
| 🟢 **UI** (3) | @aleph, @revisor, @periodico | `.github/agents/` |
| 🔵⚫🔴🟡🟠 **Backend** (5) | @blueflag, @blackflag, @redflag, @yellowflag, @orangeflag | `.github/agents/` |
| ⚪ **Sistema** (2) | @vestibulo, @cartaspuerta | `.github/agents/` |
| ⚙️ **Meta** (2) | @pluginmanager, @ox | `.github/agents/` |
| 🔌 **Bridges** (7) | @plugin_ox_{argboard, enciclopedia, ghpages, foroscraper, agentcreator, teatro, scrum} | `.github/agents/` |

### Agentes del Arrakis Theater (5)

| ID | Nombre | Categoría |
|----|--------|-----------|
| `isaac` | Isaac - Marinero Fiel | framework-retro |
| `don-alvaro` | Don Álvaro - Capataz | framework-retro |
| `capitan-didac` | Capitán Dídac | framework-retro |
| `indra` | Indra - Integration | technical-devops |
| `backend-agent` | Backend Agent | technical-devops |

---

## 3. Diagnóstico: Modelo de Coexistencia

### Opción A: Reemplazo Total (❌ NO recomendado)

Eliminar agentes de Arrakis y sustituir por Scriptorium.

**Problema**: Pierde el elenco teatral histórico (Isaac, Don Álvaro, etc.) que tiene su propio valor narrativo.

### Opción B: Integración Paralela (✅ RECOMENDADO)

Mantener ambos elencos en espacios separados:

```
ScriptoriumChatManager
├── Elenco Scriptorium (dinámico)
│   ├── UI: @aleph, @revisor, @periodico
│   ├── Backend: 5 banderas
│   ├── Sistema: @vestibulo, @cartaspuerta
│   └── Meta/Plugins: @ox, @pluginmanager, bridges
│
└── Elenco Arrakis (legacy)
    └── Teatro: Isaac, Don Álvaro, Dídac, Indra, Backend
```

**Ventajas**:
- No se pierde historia del proyecto
- Los agentes Arrakis pueden usarse para demos teatrales
- Carga dinámica solo para Scriptorium
- Separación clara de responsabilidades

### Opción C: Fusión (🟡 Posible pero complejo)

Migrar agentes Arrakis como "personajes" del Teatro ARG del Scriptorium.

**Implicación**: Isaac, Don Álvaro, etc. se convertirían en actores de `ARCHIVO/PLUGINS/ARG_BOARD/.arrakis/actores.json`.

---

## 4. Recomendaciones de Ox

### 4.1. Actualización del Índice Maestro

Añadir al JSON de `ox.agent.md` una nueva sección para tracking de la extensión:

```json
{
  "integraciones": {
    "vscode-extension": {
      "version": "0.1.0-scriptorium",
      "status": "planificado",
      "modelo": "coexistencia-paralela",
      "agentes_migrables": 19,
      "chatparticipants_iniciales": 5
    }
  }
}
```

### 4.2. Mapeo de Capas → ChatParticipants

| Capa Scriptorium | ChatParticipant ID propuesto | Prioridad |
|------------------|------------------------------|-----------|
| 🟢 UI | `scriptorium.aleph`, `scriptorium.revisor`, `scriptorium.periodico` | P0 |
| 🔵 Blueflag | `scriptorium.blueflag` | P0 |
| ⚫ Blackflag | `scriptorium.blackflag` | P0 |
| 🔴 Redflag | `scriptorium.redflag` | P0 |
| 🟡 Yellowflag | `scriptorium.yellowflag` | P1 |
| 🟠 Orangeflag | `scriptorium.orangeflag` | P1 |
| ⚙️ Meta | `scriptorium.ox`, `scriptorium.pluginmanager` | P1 |
| ⚪ Sistema | `scriptorium.vestibulo` | P2 |
| 🔌 Bridges | Via handoffs, no ChatParticipants directos | P2 |

### 4.3. Handoffs Críticos a Preservar

Los handoffs definidos en cada `.agent.md` DEBEN traducirse a `followupProvider` en el ChatParticipant:

```typescript
// Ejemplo: @aleph tiene handoff a @blueflag
followups: [
  { label: "🔵 Auditar verdad", command: "@blueflag", send: false },
  { label: "⚫ Auditar sombras", command: "@blackflag", send: false },
  // ...
]
```

### 4.4. Detección de Plugins

La extensión DEBE leer `.github/plugins/registry.json` para:
1. Mostrar plugins instalados en TreeView
2. Detectar bridges disponibles
3. Exponer prompts de plugins en QuickPick

---

## 5. Advertencias (Yellowflag)

### ⚠️ Riesgo de pérdida de contexto doctrinal

La extensión VS Code opera **fuera** del sistema de instrucciones (`.github/instructions/`). Los ChatParticipants no tendrán acceso automático a:

- Vacuna anti-naïf (`marco-conceptual.instructions.md`)
- Voz del manifiesto (`voz-manifiesto.instructions.md`)
- Diagnóstico doctrinal (`diagnostico.instructions.md`)

**Mitigación propuesta**: El ChatParticipant de @aleph debe incluir en su `systemPrompt` una referencia a las instrucciones clave o cargarlas dinámicamente.

### ⚠️ Riesgo de duplicación de estado

Si la extensión mantiene caché de agentes y el Scriptorium también (vía Copilot Chat), pueden divergir.

**Mitigación**: FileWatcher para refresh en ambos lados.

---

## 6. Propuesta de Nueva Épica: SCRIPT-2.8.0

> **Añadir a la planificación**

| ID | Épica | Effort | Prioridad |
|----|-------|--------|-----------|
| SCRIPT-2.8.0 | Migración de Elenco Arrakis a ARG_BOARD | 3 pts | P2 |

### Tasks propuestas

| Task ID | Descripción | Effort |
|---------|-------------|--------|
| T075 | Crear recetas para Isaac, Don Álvaro, Dídac, Indra, Backend | 1 |
| T076 | Registrar en `actores.json` de ARG_BOARD | 0.5 |
| T077 | Crear obra "Genesis del Teatro" con elenco Arrakis | 1 |
| T078 | Documentar en `ARCHIVO/PLUGINS/ARG_BOARD/ELENCO/` | 0.5 |

---

## 7. Handoff a @aleph

**Turno**: Ronda 2 de 4

**Contexto para @aleph**:
- El Sprint 2 propone integrar la extensión VS Code
- Ox ha auditado la ontología y propuesto coexistencia paralela
- Se añade épica SCRIPT-2.8.0 para migrar elenco Arrakis

**Preguntas para @aleph**:
1. ¿Qué systemPrompt debe tener cada ChatParticipant para mantener la doctrina?
2. ¿Cómo se gestionan los handoffs en el contexto de la extensión?
3. ¿Qué prioridad tiene la producción textual (Fundación) respecto a esta integración?

---

## Archivos modificados por Ox

| Archivo | Cambio |
|---------|--------|
| `ox.agent.md` | Añadir herramientas `execute`, `web`, `playwright/*` |
| `03_ox-integracion-extension.md` | Este documento (NUEVO) |

---

**Firma**: 🐂 Ox (Oráculo del Scriptorium)  
**Timestamp**: 2025-12-23T10:30:00Z
