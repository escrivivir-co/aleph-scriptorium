# Backlog Borrador: SCRIPT-1.12.0 — Plugin Blockly Editor

**Opportunity**: Aleph Scriptorium  
**Sprint**: 2  
**Effort total**: 34 pts  
**Estado**: 📝 Borrador (pendiente aprobación)

---

## Contexto

### Problema

Los agentes-personaje del Teatro tienen:
- Personalidad (via AGENT_CREATOR)
- Paradigma de razonamiento (via AS-GYM/FIA)

Pero **no tienen forma visual de programar su comportamiento**. La lógica se define en prompts textuales, no en código ejecutable.

### Solución

El plugin **blockly-editor** proporciona:
1. **Editor visual** para diseñar lógica con bloques
2. **Paletas específicas** por paradigma FIA
3. **Generador JavaScript** para crear rutinas ejecutables
4. **Runtime** integrado con Teatro (impress.js)

### Entregables

- Plugin `blockly-editor` en `.github/plugins/`
- Campo `rutina` en schema de actores.json
- Extensión del Teatro para ejecutar rutinas
- Paleta SBR (Sistemas Basados en Reglas)
- Documentación en GH-Pages

---

## Feature Cycles

| Ciclo | Objetivo | Effort |
|-------|----------|--------|
| FC1 | Infraestructura del plugin + integración básica | 13 pts |
| FC2 | Paleta SBR + runtime en Teatro | 13 pts |
| FC3 | Documentación + publicación | 8 pts |

---

## Stories

### SCRIPT-1.12.0-S01 — Estructura del Plugin
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Crear la estructura base del plugin siguiendo el protocolo de PLUGINS.md.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T001 | Crear `.github/plugins/blockly-editor/manifest.md` | 0.5 | ⏳ |
| T002 | Crear `agents/blockly-editor.agent.md` | 0.5 | ⏳ |
| T003 | Crear `instructions/blockly-editor.instructions.md` | 0.5 | ⏳ |
| T004 | Crear `ARCHIVO/PLUGINS/BLOCKLY_EDITOR/` | 0.5 | ⏳ |
| T005 | Crear `ARCHIVO/PLUGINS/BLOCKLY_EDITOR/paletas/` | 0.5 | ⏳ |
| T006 | Crear `ARCHIVO/PLUGINS/BLOCKLY_EDITOR/rutinas/` | 0.5 | ⏳ |

#### Definition of Done
- [ ] Plugin tiene manifest.md válido con frontmatter YAML
- [ ] Estructura sigue convenciones de PLUGINS.md
- [ ] Carpetas de datos runtime creadas

---

### SCRIPT-1.12.0-S02 — Bridge Agent y Registry
**Puntos**: 2  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Crear el agente bridge y registrar el plugin en el sistema.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T007 | Crear `.github/agents/plugin_ox_blocklyeditor.agent.md` | 0.5 | ⏳ |
| T008 | Actualizar `registry.json` con el nuevo plugin | 0.5 | ⏳ |
| T009 | Actualizar `aleph.agent.md` con handoff al bridge | 0.5 | ⏳ |
| T010 | Actualizar `ox.agent.md` con índice del plugin | 0.5 | ⏳ |

#### Definition of Done
- [ ] Bridge en `.github/agents/` (detectable por VS Code)
- [ ] Plugin aparece en `registry.json` con estado enabled
- [ ] @aleph tiene handoff `[BLOCKLY-EDITOR]` funcional

---

### SCRIPT-1.12.0-S03 — Prompts del Plugin
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Crear prompts para las operaciones principales del editor.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T011 | Crear `prompts/abrir-editor.prompt.md` | 1 | ⏳ |
| T012 | Crear `prompts/crear-rutina.prompt.md` | 1 | ⏳ |
| T013 | Crear `prompts/guardar-rutina.prompt.md` | 1 | ⏳ |
| T014 | Crear `prompts/asignar-paleta.prompt.md` | 1 | ⏳ |
| T015 | Crear `prompts/exportar-codigo.prompt.md` | 1 | ⏳ |

#### Definition of Done
- [ ] Cada prompt tiene estructura estándar
- [ ] Prompts referenciados en manifest.md
- [ ] Handoffs apuntan a prompts correctos

---

### SCRIPT-1.12.0-S04 — Actualizar Schema actores.json
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Añadir campo `rutina` al schema de actores en ARG_BOARD.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T016 | Actualizar `ARG_BOARD/.arrakis/actores.json` con campo `rutina` | 1 | ⏳ |
| T017 | Actualizar documentación de ARG_BOARD | 0.5 | ⏳ |
| T018 | Crear schema JSON de rutina | 1 | ⏳ |
| T019 | Añadir rutina vacía a Tarotista y NonsiAuditor | 0.5 | ⏳ |

#### Schema de Rutina

```json
{
  "rutina": {
    "tipo": "blockly-js",
    "archivo": "nombre-rutina.js",
    "paleta": "sbr|logica|simbolica|conexionista",
    "triggers": ["estadio_inicio", "interaccion_usuario", "temporizador"],
    "version": "1.0.0"
  }
}
```

#### Definition of Done
- [ ] Campo `rutina` documentado en schema
- [ ] Personajes existentes tienen rutina vacía
- [ ] Validación de schema funciona

---

### SCRIPT-1.12.0-S05 — Paleta SBR (Sistemas Basados en Reglas)
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Crear la primera paleta de bloques para el paradigma SBR de as-gym.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T020 | Diseñar bloques IF-THEN básicos | 1 | ⏳ |
| T021 | Crear generadores JavaScript para bloques SBR | 1.5 | ⏳ |
| T022 | Crear `paletas/sbr.json` con configuración de toolbox | 1 | ⏳ |
| T023 | Documentar bloques SBR disponibles | 0.5 | ⏳ |
| T024 | Test: generar código desde bloques SBR | 1 | ⏳ |

#### Bloques SBR Propuestos

| Bloque | Descripción | Generador |
|--------|-------------|-----------|
| `sbr_regla` | Define una regla IF-THEN | `if (condicion) { accion }` |
| `sbr_condicion` | Condición evaluable | `evaluarCondicion(...)` |
| `sbr_accion` | Acción a ejecutar | `ejecutarAccion(...)` |
| `sbr_variable` | Variable del contexto | `contexto.variable` |
| `sbr_evento` | Emitir evento | `emitirEvento(nombre, datos)` |
| `sbr_esperar` | Esperar evento | `await esperarEvento(nombre)` |

#### Definition of Done
- [ ] Paleta sbr.json creada
- [ ] Al menos 6 bloques funcionales
- [ ] Generador produce código JS válido
- [ ] Documentación de uso

---

### SCRIPT-1.12.0-S06 — Runtime en Teatro (impress.js)
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Extender el Teatro para ejecutar rutinas JavaScript de personajes.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T025 | Crear `docs/assets/js/blockly-runtime.js` | 1.5 | ⏳ |
| T026 | Modificar `obra.html` para cargar rutinas | 1 | ⏳ |
| T027 | Implementar trigger `estadio_inicio` | 0.5 | ⏳ |
| T028 | Implementar trigger `interaccion_usuario` | 0.5 | ⏳ |
| T029 | Sandbox de ejecución (seguridad) | 1 | ⏳ |
| T030 | Test: ejecutar rutina de Tarotista en Camino | 0.5 | ⏳ |

#### API del Runtime

```javascript
// blockly-runtime.js
const BlocklyRuntime = {
  cargarRutina: async (actorId) => { ... },
  ejecutar: (codigo, contexto) => { ... },
  registrarTrigger: (evento, callback) => { ... },
  contexto: {
    estadioActual: 0,
    actor: null,
    obra: null
  }
};
```

#### Definition of Done
- [ ] Runtime carga y ejecuta rutinas JS
- [ ] Al menos 2 triggers funcionando
- [ ] Sandbox previene código malicioso
- [ ] Test pasa con Tarotista

---

### SCRIPT-1.12.0-S07 — Embed del Editor
**Puntos**: 3  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

#### Descripción
Crear página de editor Blockly embebible en Teatro.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T031 | Crear `docs/teatro/blockly-editor.html` | 1 | ⏳ |
| T032 | Cargar Blockly desde CDN | 0.5 | ⏳ |
| T033 | Implementar comunicación postMessage | 0.5 | ⏳ |
| T034 | Botón "Editar rutina" en ficha de personaje | 0.5 | ⏳ |
| T035 | Guardar/cargar workspace Blockly | 0.5 | ⏳ |

#### Definition of Done
- [ ] Editor abre en página standalone
- [ ] Puede cargar paleta SBR
- [ ] Comunicación con página padre funciona
- [ ] Guarda workspace en localStorage

---

### SCRIPT-1.12.0-S08 — Integración setup-workspace.sh
**Puntos**: 2  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Actualizar script de configuración con nuevo submódulo.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T036 | Actualizar comentario de contador (9 submódulos) | 0.25 | ⏳ |
| T037 | Añadir variables SUBMODULE_BLOCKLY_* | 0.25 | ⏳ |
| T038 | Añadir plugin a settings.json template | 0.5 | ⏳ |
| T039 | Añadir llamada setup_submodule | 0.25 | ⏳ |
| T040 | Actualizar scripts/README.md | 0.25 | ⏳ |
| T041 | Actualizar mensaje final | 0.25 | ⏳ |
| T042 | Verificar consistencia (9 = 9 = 9) | 0.25 | ⏳ |

#### Definition of Done
- [ ] Contador actualizado a 9
- [ ] Variables SUBMODULE_BLOCKLY_DIR y _URL
- [ ] settings.json tiene rutas del plugin
- [ ] Llamada setup_submodule al final
- [ ] scripts/README.md documenta submódulo

---

### SCRIPT-1.12.0-S09 — Documentación GH-Pages
**Puntos**: 3  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

#### Descripción
Documentar el plugin para usuarios finales.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T043 | Actualizar `docs/agentes.md` con Blockly Editor | 0.5 | ⏳ |
| T044 | Crear sección en `docs/archivo.md` | 0.5 | ⏳ |
| T045 | Actualizar `docs/roadmap.md` con épica | 0.5 | ⏳ |
| T046 | Tutorial: "Crear primera rutina" | 1 | ⏳ |
| T047 | Añadir screenshots del editor | 0.5 | ⏳ |

#### Definition of Done
- [ ] Documentación pública en GH-Pages
- [ ] Tutorial para usuarios nuevos
- [ ] Screenshots del editor

---

### SCRIPT-1.12.0-S10 — Integración con MCP-Presets (Nice-to-have)
**Puntos**: 3  
**Prioridad**: Could  
**Estado**: ⏳ Pendiente

#### Descripción
Crear preset MCP para el editor Blockly.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T048 | Crear preset `blockly-editor.json` | 1 | ⏳ |
| T049 | Incluir paleta SBR en preset | 0.5 | ⏳ |
| T050 | Documentar asignación a agentes | 0.5 | ⏳ |
| T051 | Test: importar preset en nuevo Scriptorium | 1 | ⏳ |

#### Definition of Done
- [ ] Preset exportable en formato Zeus
- [ ] Paleta SBR incluida
- [ ] Documentación de uso

---

## Métricas

| Métrica | Valor |
|---------|-------|
| Stories totales | 10 |
| Tasks totales | 51 |
| Effort total | **34 pts** |
| Prioridad Must | 7 stories (25 pts) |
| Prioridad Should | 2 stories (6 pts) |
| Prioridad Could | 1 story (3 pts) |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| Submódulo blockly-alephscript-sdk | ✅ Instalado | Rama integration/beta/scriptorium |
| Plugin Teatro | ✅ Instalado | Extiende visor impress.js |
| Plugin AGENT_CREATOR | ✅ Instalado | Flujo de creación de personajes |
| Plugin ARG_BOARD | ✅ Instalado | Schema actores.json |
| Submódulo as-gym | ✅ Instalado | fia-catalog.json para paradigmas |
| Blockly (CDN) | ⚠️ Externo | https://unpkg.com/blockly |

---

## Riesgos Identificados

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Editor Angular pesado | Media | Medio | Empezar con embed iframe simple |
| Conflicto Blockly + impress.js | Baja | Alto | Namespacing, lazy loading |
| Paradigmas FIA incompletos | Media | Bajo | Empezar solo con SBR |
| Seguridad en ejecución de JS | Baja | Alto | Sandbox con lista blanca |
| Complejidad del runtime | Media | Medio | MVP mínimo: 2 triggers |

---

## Roadmap Futuro (Post-Sprint 2)

### Sprint 3: Paletas Adicionales
- Paleta Lógica (proposicional, predicados)
- Paleta Simbólica (redes semánticas)
- Paleta Conexionista (bloques para embeddings)

### Sprint 4: Integración Profunda
- Editor standalone (sin iframe)
- Debugger visual de rutinas
- Sincronización P2P de rutinas via network-sdk

### Sprint 5: Extensión VS Code
- Integrar editor en extensión Arrakis Theater
- ChatParticipant para generar bloques desde prompt

---

## Pendiente aprobación

Usuario debe revisar y aprobar con `@scrum aprobar`.

Para aprobar:
```
@scrum aprobar SCRIPT-1.12.0 — Plugin Blockly Editor
```
