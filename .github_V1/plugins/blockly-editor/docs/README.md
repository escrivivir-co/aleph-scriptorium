# Blockly Editor — Documentación

Plugin para edición de lógica visual de agentes-personaje usando bloques de Blockly.

---

## Resumen

| Aspecto | Valor |
|---------|-------|
| **ID** | `blockly-editor` |
| **Versión** | 1.0.0 |
| **Submódulo** | `blockly-alephscript-sdk` |
| **Dependencias** | arg-board, agent-creator, teatro |
| **Bridge** | `plugin_ox_blocklyeditor` |

---

## Visión

Completar el flujo de creación de personajes con **4 ingredientes**:

1. ✅ **Agentes Base** (metodología) — AGENT_CREATOR
2. ✅ **Fuentes de Datos** (conocimiento) — AGENT_CREATOR
3. ✅ **Paradigmas FIA** (razonamiento) — AS-GYM
4. ⬅️ **Rutinas** (comportamiento) — BLOCKLY-EDITOR

---

## Casos de Uso

### UC1: Crear rutina para personaje nuevo

```
1. Usuario crea personaje con AGENT_CREATOR
2. Elige paradigma FIA (ej: SBR)
3. @blocklyeditor crear rutina {personaje} --paleta sbr
4. Abre editor visual
5. Arrastra bloques IF-THEN
6. Guarda → genera JavaScript
7. Teatro ejecuta en triggers
```

### UC2: Editar rutina existente

```
1. @blocklyeditor abrir editor {personaje}
2. Carga workspace anterior
3. Modifica bloques
4. Guarda → versión incrementada
```

### UC3: Cambiar paradigma

```
1. @blocklyeditor asignar paleta {personaje} logica
2. Recibe advertencia de compatibilidad
3. Confirma → nueva paleta
4. Abre editor con bloques de lógica
```

---

## Arquitectura

```
┌────────────────────────────────────────────────────────────┐
│                    BLOCKLY EDITOR                           │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │   Paletas   │    │   Editor    │    │  Generador  │     │
│  │   (JSON)    │───▶│  (Angular)  │───▶│    (JS)     │     │
│  └─────────────┘    └─────────────┘    └──────┬──────┘     │
│                                                │             │
│                                                ▼             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │  Workspaces │◀──▶│   Rutinas   │───▶│   Teatro    │     │
│  │   (XML)     │    │    (JS)     │    │  (Runtime)  │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

---

## Archivos Clave

| Tipo | Ubicación |
|------|-----------|
| Manifest | `.github/plugins/blockly-editor/manifest.md` |
| Agente | `.github/plugins/blockly-editor/agents/blockly-editor.agent.md` |
| Instructions | `.github/plugins/blockly-editor/instructions/blockly-editor.instructions.md` |
| Bridge | `.github/agents/plugin_ox_blocklyeditor.agent.md` |
| Paletas | `ARCHIVO/PLUGINS/BLOCKLY_EDITOR/paletas/` |
| Rutinas | `ARCHIVO/PLUGINS/BLOCKLY_EDITOR/rutinas/` |
| Workspaces | `ARCHIVO/PLUGINS/BLOCKLY_EDITOR/workspaces/` |

---

## Paletas Disponibles

| Paleta | Paradigma | Estado | Bloques |
|--------|-----------|--------|---------|
| `sbr` | Sistemas Basados en Reglas | ✅ | 12 |
| `logica` | Lógica Formal | ⏳ Sprint 3 | — |
| `simbolica` | IA Simbólica | ⏳ Sprint 3 | — |
| `conexionista` | Redes Neuronales | ⏳ Sprint 4 | — |
| `gramaticas` | Gramáticas Formales | ⏳ Sprint 4 | — |

---

## API del Runtime

El código generado tiene acceso a:

```javascript
contexto = {
  estadio: 3,                    // Número de estadio (1-12)
  actor: { id, nombre, avatar }, // Datos del personaje
  obra: { id, titulo },          // Datos de la obra
  
  emitir: (evento, datos) => {}, // Emitir evento
  esperar: async (evento) => {}, // Esperar evento
  log: (mensaje) => {},          // Registrar
  alerta: (mensaje) => {},       // Mostrar mensaje
  
  memoria: {},                   // Estado persistente
};
```

---

## Roadmap

### Sprint 1 (MVP)
- ✅ Paleta SBR
- ⏳ Runtime básico
- ⏳ Integración Teatro

### Sprint 2
- Embed iframe en Teatro
- Editor página web

### Sprint 3
- Paleta Lógica
- Paleta Simbólica

### Sprint 4
- Paleta Conexionista
- Modo colaborativo

---

## Referencias

- Submódulo: `blockly-alephscript-sdk/README-SCRIPTORIUM.md`
- Backlog: `ARCHIVO/DISCO/BACKLOG_BORRADORES/BLOCKLY-SDK/01_backlog-borrador.md`
- FIA Catalog: `as-gym/fia-catalog.json`
