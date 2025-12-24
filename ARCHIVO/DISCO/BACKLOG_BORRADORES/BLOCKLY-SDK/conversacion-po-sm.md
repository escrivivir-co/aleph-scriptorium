# Conversación PO-SM: Blockly AlephScript SDK

**Fecha**: 2025-12-24  
**Submódulo**: `blockly-alephscript-sdk`  
**Plugin objetivo**: `blockly-editor`  
**Sprint referencia**: SCRIPT-1.12.0

---

## Apertura

**@scrum (SM)**: Integramos el noveno submódulo: `blockly-alephscript-sdk`. Este repositorio contiene un **SDK monorepo** con tres paquetes: una librería de bloques personalizados de Blockly, un editor visual Angular, y un runtime para ejecutar el código generado.

**PO**: Exacto. La visión es crear un **editor de lógica visual** para los agentes-personaje. Cuando un usuario crea un personaje con AGENT_CREATOR y le asigna una FIA de as-gym, puede diseñar visualmente la rutina del personaje usando bloques de Blockly.

**PO (directriz)**: El foco es:
1. **Integrar** blockly-sdk como extensión del Teatro
2. **Conectar** con AGENT_CREATOR y AS-GYM para el flujo de 4 ingredientes
3. **Extender** impress.js para ejecutar rutinas JavaScript generadas
4. **Publicar** paletas de bloques alineadas con paradigmas FIA

---

## Análisis Técnico (SM)

### Inventario del Submódulo

```
blockly-alephscript-sdk/
├── packages/
│   ├── blockly-alephscript-blocks/    # 🎯 Librería de bloques (TypeScript)
│   ├── blockly-gamify-ui/             # 🎯 Editor Angular (IDE visual)
│   └── blockly-runtime-gamify-ui/     # 🎯 Runtime de ejecución
├── examples/projects/                  # Proyectos demo
├── scripts/                            # Scripts de configuración
└── vibecoding/                         # Documentación dev
```

### Componentes Clave

| Paquete | Función | Integración |
|---------|---------|-------------|
| `blockly-alephscript-blocks` | Definiciones de bloques + generadores JS | Paletas para paradigmas FIA |
| `blockly-gamify-ui` | Editor visual drag-and-drop | Embed en Teatro o standalone |
| `blockly-runtime-gamify-ui` | Ejecutor de código generado | Integrar en visor impress.js |

### Bloques Actuales

6 categorías de bloques predefinidos:
- **Bot**: Crear bots, configurar, definir acciones
- **Channel**: Conectar/gestionar canales Socket.IO
- **Message**: Enviar/recibir/filtrar mensajes
- **Room**: Crear/navegar salas
- **Orchestrator**: Gestionar procesos, workflows
- **Format**: Formatear datos y plantillas

### Stack Tecnológico

- **Lenguaje**: TypeScript
- **Framework UI**: Angular 19
- **Styling**: Angular Material
- **Comunicación**: Socket.IO
- **Build**: npm workspaces

---

### Gaps Identificados

| Gap | Descripción | Prioridad | Sprint |
|-----|-------------|-----------|--------|
| G1 | Teatro no ejecuta rutinas JS de personajes | Must | 1 |
| G2 | Schema actores.json sin campo `rutina` | Must | 1 |
| G3 | No existen paletas específicas para paradigmas FIA | Should | 1 |
| G4 | Editor Blockly no es embebible (requiere Angular) | Should | 2 |
| G5 | Falta integración con network-sdk (Socket.IO P2P) | Could | 2 |
| G6 | MCP-Presets no tiene preset de "Blockly Editor" | Could | 1 |

### Riesgos Técnicos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Angular pesado para embed | Media | Medio | Usar iframe sandboxed |
| Conflicto Blockly + impress.js | Baja | Alto | Lazy loading, namespace |
| Paradigmas FIA incompletos | Media | Bajo | Empezar con SBR (reglas) |
| Runtime en navegador lento | Baja | Medio | Web Workers |

---

## Visión de Producto (PO)

### Casos de Uso Objetivo

1. **UC1 — Diseñar lógica de personaje**
   - Usuario abre editor Blockly desde ficha de personaje
   - Arrastra bloques de la paleta del paradigma FIA asignado
   - Genera código JavaScript
   - Guarda rutina en actores.json

2. **UC2 — Ejecutar rutina en obra**
   - Teatro carga obra con personajes
   - Para cada personaje con rutina: cargar script
   - Ejecutar rutina en eventos del monomito (estadios)
   - Mostrar resultado en diapositiva impress.js

3. **UC3 — Paletas por paradigma**
   - Usuario elige paradigma FIA para personaje (ej: SBR)
   - Editor muestra paleta específica de bloques de reglas
   - Bloques traducen a código del paradigma

4. **UC4 — Exportar preset MCP**
   - Usuario guarda configuración de paleta + proyecto
   - Exporta como preset MCP-compatible
   - Puede compartir con otros Scriptoriums vía network-sdk

### Criterios de Éxito

- [ ] Editor Blockly carga desde enlace en Teatro
- [ ] Al menos 1 paleta de paradigma FIA (SBR recomendado)
- [ ] Rutinas ejecutan en estadios del monomito
- [ ] Campo `rutina` en schema de actores.json
- [ ] Documentación en GH-Pages

---

## Decisiones Arquitectónicas

### D1: Estrategia de integración con Teatro

**Decisión**: Embed por iframe (no integración Angular profunda)

**Rationale**:
- Menor acoplamiento
- Teatro (Jekyll) es estático, Angular dinámico
- Comunicación vía postMessage
- Permite actualizar editor independientemente

**Implementación**:
```html
<!-- En layout de obra.html -->
<div id="blockly-editor" class="panel-lateral">
  <iframe src="/teatro/blockly-editor.html" sandbox="allow-scripts"></iframe>
</div>
```

### D2: Paletas de bloques

**Decisión**: Empezar con paleta SBR (Sistemas Basados en Reglas)

**Rationale**:
- SBR es el paradigma más simple y didáctico
- IF-THEN se mapea naturalmente a bloques
- Compatible con @blackflag (reglas de poder)
- Expandir después a lógica, simbolica, etc.

### D3: Campo rutina en actores.json

**Decisión**: Añadir campo `rutina` con estructura:

```json
{
  "id": "tarotista",
  "nombre": "El Tarotista",
  "rutina": {
    "tipo": "blockly-js",
    "archivo": "tarotista-rutina.js",
    "paleta": "sbr",
    "triggers": ["estadio_inicio", "interaccion_usuario"]
  }
}
```

**Rationale**:
- Separar código generado del schema
- Permitir múltiples triggers
- Identificar paleta para edición posterior

---

## Próximos Pasos

- [x] Crear conversación PO-SM
- [x] Documentar gaps y decisiones
- [ ] Generar backlog borrador (01_backlog-borrador.md)
- [ ] Crear plugin blockly-editor
- [ ] Integrar con sistema

---

## Diagrama de Integración

```
┌──────────────────────────────────────────────────────────────────────────┐
│                          FLUJO BLOCKLY-EDITOR                             │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌─────────────────┐                                                      │
│  │ AGENT_CREATOR   │                                                      │
│  │ (recipe.json)   │                                                      │
│  │                 │                                                      │
│  │ - agentes base  │                                                      │
│  │ - fuente datos  │                                                      │
│  │ - paradigma FIA ◄───────────── [AS-GYM: fia-catalog.json]             │
│  └────────┬────────┘                                                      │
│           │                                                               │
│           │ crear agente                                                  │
│           ▼                                                               │
│  ┌─────────────────┐         ┌─────────────────┐                         │
│  │ ARG_BOARD       │         │ BLOCKLY-EDITOR  │                         │
│  │ (actores.json)  │◄───────▶│ (UI iframe)     │                         │
│  │                 │ editar  │                 │                         │
│  │ - id            │ rutina  │ - Paleta SBR    │                         │
│  │ - nombre        │         │ - Workspace     │                         │
│  │ - avatar        │         │ - Generador JS  │                         │
│  │ - rutina ◄──────┼─────────┤                 │                         │
│  │   - tipo        │ guardar │ Output:         │                         │
│  │   - archivo     │         │ {actor}.js      │                         │
│  │   - paleta      │         └─────────────────┘                         │
│  │   - triggers    │                                                      │
│  └────────┬────────┘                                                      │
│           │                                                               │
│           │ ejecutar obra                                                 │
│           ▼                                                               │
│  ┌─────────────────┐                                                      │
│  │ TEATRO          │                                                      │
│  │ (impress.js)    │                                                      │
│  │                 │                                                      │
│  │ - Cargar obra   │                                                      │
│  │ - Por actor:    │                                                      │
│  │   • Cargar      │                                                      │
│  │     rutina.js   │◄────────── [blockly-runtime]                        │
│  │   • Ejecutar en │                                                      │
│  │     triggers    │                                                      │
│  │ - Mostrar       │                                                      │
│  │   resultado     │                                                      │
│  └─────────────────┘                                                      │
│                                                                           │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Notas de la Sesión

- El PO enfatiza que Blockly es un **editor de lógica**, no un IDE completo
- Los bloques generan JavaScript que se inyecta en personajes
- El runtime de Blockly ejecuta en el navegador (sin backend)
- La integración con MCP-Presets es nice-to-have para Sprint 2
- Priorizar paleta SBR porque es la más didáctica
