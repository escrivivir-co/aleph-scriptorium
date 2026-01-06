# Backlog Borrador: NODE-RED-INTEGRATION — Integración Completa Node-RED

**Opportunity**: Aleph Scriptorium  
**Sprint**: FC1  
**Effort total**: 34 pts  
**Estado**: 📝 Borrador (pendiente aprobación)

---

## Contexto

### El problema

El Scriptorium tiene dos submódulos Node-RED parcialmente integrados:

| Submódulo | Plugin | Estado |
|-----------|--------|--------|
| `WiringEditor` | `wire-editor` | Estructura creada, sin arranque |
| `WiringAppHypergraphEditor` | `wiring-app` | Estructura creada, sin arranque |

Falta:
1. Scripts de setup multiplataforma (Windows/macOS/Linux)
2. Guía de instalación de contribs (nodos AlephScript + wiki-racer)
3. Tasks.json para arranque de Node-RED Editor y UI
4. Iframes en demo.md para visualizar los editores
5. Agentes expertos que guíen al usuario

### La solución

Integración completa en 4 fases:
1. **Setup**: Scripts que instalan Node-RED y contribs
2. **Arranque**: Tasks.json con stacks NRE (Editor) y NRU (UI)
3. **Demo**: Iframes en demo.md
4. **Agentes**: Instrucciones actualizadas para guiar cada fase

### Arquitectura de Puertos

| Servicio | Puerto | Descripción |
|----------|--------|-------------|
| Node-RED Editor | 1880 | Editor visual de flows |
| Node-RED UI/Dashboard | 1880/ui | UI runtime generada |
| GamifyUI (Angular) | 3088 | UI alternativa (WiringEditor) |

---

## Submódulos Involucrados

### WiringEditor (node-red-alephscript-sdk)

```
WiringEditor/
├── packages/
│   ├── node-red-contrib-alephscript/  # 13 nodos custom
│   │   └── src/nodes/
│   │       ├── bot-node.ts
│   │       ├── enhanced-bot-node.ts
│   │       ├── app-channel-node.ts
│   │       ├── sys-channel-node.ts
│   │       ├── ui-channel-node.ts
│   │       ├── orchestrator-node.ts
│   │       ├── app-format-node.ts
│   │       ├── sys-format-node.ts
│   │       ├── ui-format-node.ts
│   │       ├── alephscript-config.ts
│   │       ├── alephscript-bot-registry.ts
│   │       ├── alephscript-room-tester.ts
│   │       └── alephscript-stream-monitor.ts
│   └── node-red-gamify-ui/            # Angular 17+ UI
├── examples/                           # Flows de ejemplo
└── INSTALLATION.md                     # Guía existente
```

### WiringAppHypergraphEditor (wiki-racer)

```
WiringAppHypergraphEditor/
├── node-red-contrib-wikir-racer/      # 1 nodo: game
│   ├── flow.json                       # Flow completo wiki-racer
│   ├── game.js                         # Nodo del juego
│   └── game.html                       # UI del nodo
├── src/                                # Motor lógica FIA
└── CRIPTA/                             # Datos persistidos
```

---

## Feature Cycles

| Ciclo | Objetivo | Effort | Entregables |
|-------|----------|--------|-------------|
| **FC1** | Setup multiplataforma | 8 pts | Scripts bash/cmd |
| **FC2** | Tasks.json + demo.md | 8 pts | 6 tasks + 2 iframes |
| **FC3** | Guía instalación contribs | 10 pts | 3 guías de nodos |
| **FC4** | Agentes actualizados | 8 pts | Instrucciones wire-editor/wiring-app |

---

## Stories

### NODE-RED-S01 — Scripts de Setup Multiplataforma
**Puntos**: 8  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Crear scripts que instalen Node-RED globalmente y configuren el entorno.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T001 | Crear `scripts/setup-node-red.sh` (Unix/macOS) | 2 | ⏳ |
| T002 | Crear `scripts/setup-node-red.cmd` (Windows) | 2 | ⏳ |
| T003 | Script verificación prerequisitos | 1 | ⏳ |
| T004 | Documentar en README-SCRIPTORIUM.md de WiringEditor | 1 | ⏳ |
| T005 | Health check para Node-RED (puerto 1880) | 2 | ⏳ |

#### Comandos de Setup

**Unix/macOS**:
```bash
#!/bin/bash
# scripts/setup-node-red.sh

echo "🔧 Installing Node-RED globally..."
npm install -g --unsafe-perm node-red

echo "📦 Installing dashboard..."
cd ~/.node-red
npm install node-red-dashboard

echo "🔌 Installing AlephScript contribs..."
npm install "$WORKSPACE/WiringEditor/packages/node-red-contrib-alephscript"

echo "🎮 Installing Wiki-Racer contrib..."
npm install "$WORKSPACE/WiringAppHypergraphEditor/node-red-contrib-wikir-racer"

echo "✅ Setup complete! Run: node-red"
```

**Windows**:
```cmd
@echo off
REM scripts/setup-node-red.cmd

echo Installing Node-RED globally...
npm install -g --unsafe-perm node-red

echo Installing dashboard...
cd %USERPROFILE%\.node-red
npm install node-red-dashboard

echo Installing AlephScript contribs...
npm install "%~dp0..\WiringEditor\packages\node-red-contrib-alephscript"

echo Installing Wiki-Racer contrib...
npm install "%~dp0..\WiringAppHypergraphEditor\node-red-contrib-wikir-racer"

echo Setup complete! Run: node-red
```

#### Definition of Done
- [ ] Scripts funcionan en Windows, macOS, Linux
- [ ] Node-RED arranca con los 14 nodos custom (13 AlephScript + 1 wiki-racer)
- [ ] Health check verifica puerto 1880

---

### NODE-RED-S02 — Tasks.json para Arranque
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Añadir tasks para arrancar Node-RED Editor y UI.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T006 | Task `NRE: Start [Editor]` - Node-RED en 1880 | 1 | ⏳ |
| T007 | Task `NRE: Start [GamifyUI]` - Angular en 3088 | 1 | ⏳ |
| T008 | Task `NRE: Open [Editor]` - Abrir navegador 1880 | 0.5 | ⏳ |
| T009 | Task `NRE: Open [Dashboard]` - Abrir 1880/ui | 0.5 | ⏳ |
| T010 | Task `NRE: Setup [Contribs]` - Instalar nodos | 1 | ⏳ |
| T011 | Task `NRE: Health Check` - Verificar servicios | 1 | ⏳ |

#### Nomenclatura de Tasks

```
NRE: Node-RED Editor
├── NRE: Start [Editor]      → Puerto 1880
├── NRE: Start [GamifyUI]    → Puerto 3088
├── NRE: Open [Editor]       → http://localhost:1880
├── NRE: Open [Dashboard]    → http://localhost:1880/ui
├── NRE: Setup [Contribs]    → Instala nodos
└── NRE: Health Check        → Verifica servicios
```

#### Definition of Done
- [ ] 6 tasks añadidas a tasks.json
- [ ] Nomenclatura consistente con APB, TPE, OAE, etc.
- [ ] Documentación de puertos en comments

---

### NODE-RED-S03 — Iframes en demo.md
**Puntos**: 3  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

#### Descripción
Añadir iframes para Node-RED Editor y Dashboard.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T012 | Iframe Node-RED Editor (1880) | 1 | ⏳ |
| T013 | Iframe Node-RED Dashboard (1880/ui) | 1 | ⏳ |
| T014 | Badges de status en barra superior | 0.5 | ⏳ |
| T015 | Script auto-check para 1880 | 0.5 | ⏳ |

#### Definition of Done
- [ ] 2 iframes en sección "WIRING EDITORS"
- [ ] Badges :1880 y :1880/ui
- [ ] Auto-check funcional

---

### NODE-RED-S04 — Guía de Instalación de Contribs
**Puntos**: 10  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Documentar instalación de los 3 tipos de nodos.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T016 | Guía: Nodos base Node-RED Dashboard | 2 | ⏳ |
| T017 | Guía: Nodos AlephScript (13 nodos) | 4 | ⏳ |
| T018 | Guía: Nodos Wiki-Racer (1 nodo game) | 2 | ⏳ |
| T019 | Tabla de referencia de todos los nodos | 2 | ⏳ |

#### Tabla de Nodos

**Nivel 1: Nodos Base (Dashboard)**
```bash
cd ~/.node-red && npm install node-red-dashboard
```
- ui_button, ui_slider, ui_text, ui_chart, ui_gauge, etc.

**Nivel 2: Nodos AlephScript (13 nodos)**
```bash
npm install /path/to/WiringEditor/packages/node-red-contrib-alephscript
```

| Nodo | Tipo | Descripción |
|------|------|-------------|
| alephscript-bot | Bot | Conecta con servidor AlephScript |
| alephscript-enhanced-bot | Bot | Bot con capacidades extendidas |
| alephscript-app-channel | Channel | Canal de aplicación |
| alephscript-sys-channel | Channel | Canal de sistema |
| alephscript-ui-channel | Channel | Canal de UI |
| alephscript-orchestrator | Control | Orquestador de flujos |
| alephscript-app-format | Format | Formateador de app |
| alephscript-sys-format | Format | Formateador de sistema |
| alephscript-ui-format | Format | Formateador de UI |
| alephscript-config | Config | Configuración global |
| alephscript-bot-registry | Dashboard | Registro de bots |
| alephscript-room-tester | Dashboard | Tester de rooms |
| alephscript-stream-monitor | Dashboard | Monitor de streams |

**Nivel 3: Nodos Wiki-Racer (1 nodo)**
```bash
npm install /path/to/WiringAppHypergraphEditor/node-red-contrib-wikir-racer
```

| Nodo | Tipo | Descripción |
|------|------|-------------|
| game | Game | Motor de partidas wiki-racer |

#### Definition of Done
- [ ] 3 guías documentadas
- [ ] Tabla de referencia completa (14 nodos)
- [ ] Comandos de instalación verificados

---

### NODE-RED-S05 — Actualizar Instrucciones de Plugins
**Puntos**: 8  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Actualizar instrucciones de wire-editor y wiring-app con capacidades de setup.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T020 | Actualizar `wire-editor.instructions.md` | 3 | ⏳ |
| T021 | Actualizar `wiring-app.instructions.md` | 3 | ⏳ |
| T022 | Añadir handoffs para setup/instalación | 1 | ⏳ |
| T023 | Añadir handoffs para ejecución/uso | 1 | ⏳ |

#### Capacidades del Agente @plugin_ox_wireeditor

| Fase | Capacidad | Handoff |
|------|-----------|---------|
| Setup | Verificar Node-RED instalado | `@wire-editor verificar setup` |
| Setup | Instalar Node-RED | `@wire-editor instalar node-red` |
| Setup | Instalar dashboard | `@wire-editor instalar dashboard` |
| Config | Instalar nodos AlephScript | `@wire-editor instalar alephscript` |
| Config | Verificar nodos instalados | `@wire-editor verificar nodos` |
| Edición | Crear nuevo flow | `@wire-editor crear flow` |
| Edición | Importar flow JSON | `@wire-editor importar flow` |
| Edición | Exportar flow | `@wire-editor exportar flow` |
| Uso | Abrir editor | `@wire-editor abrir editor` |
| Uso | Abrir dashboard | `@wire-editor abrir dashboard` |

#### Capacidades del Agente @plugin_ox_wiringapp

| Fase | Capacidad | Handoff |
|------|-----------|---------|
| Setup | Instalar nodo wiki-racer | `@wiring-app instalar wiki-racer` |
| Config | Cargar template wiki-racer | `@wiring-app cargar template` |
| Edición | Crear juego navegación | `@wiring-app crear juego` |
| Uso | Iniciar partida | `@wiring-app iniciar partida` |

#### Definition of Done
- [ ] Instrucciones actualizadas con todas las fases
- [ ] Handoffs documentados
- [ ] Integración con tasks.json

---

## Diagrama de Integración

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        NODE-RED INTEGRATION                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    SUBMÓDULOS (Código)                              │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │                                                                      │   │
│  │  WiringEditor/                    WiringAppHypergraphEditor/         │   │
│  │  ├── packages/                    ├── node-red-contrib-wikir-racer/  │   │
│  │  │   ├── node-red-contrib-        │   ├── game.js (1 nodo)          │   │
│  │  │   │   alephscript/ (13 nodos)  │   └── flow.json (template)      │   │
│  │  │   └── node-red-gamify-ui/      └── src/ (motor FIA)              │   │
│  │  └── INSTALLATION.md                                                │   │
│  │                                                                      │   │
│  └──────────────────────────┬──────────────────────────────────────────┘   │
│                             │                                               │
│                             ▼                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    PLUGINS (Agentes)                                │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │                                                                      │   │
│  │  .github/plugins/wire-editor/    .github/plugins/wiring-app/        │   │
│  │  ├── agents/wire-editor.agent    ├── agents/wiring-app.agent        │   │
│  │  ├── instructions/               ├── instructions/                  │   │
│  │  └── prompts/                    └── prompts/                       │   │
│  │      ├── crear-proyecto          ├── crear-flow-juego               │   │
│  │      ├── importar-flow           └── importar-template              │   │
│  │      └── asesorar-nodos                                             │   │
│  │                                                                      │   │
│  └──────────────────────────┬──────────────────────────────────────────┘   │
│                             │                                               │
│                             ▼                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    INFRAESTRUCTURA                                   │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │                                                                      │   │
│  │  scripts/                         .vscode/tasks.json                │   │
│  │  ├── setup-node-red.sh            ├── NRE: Start [Editor]           │   │
│  │  ├── setup-node-red.cmd           ├── NRE: Start [GamifyUI]         │   │
│  │  └── nre-health-check.sh          ├── NRE: Open [Editor]            │   │
│  │                                   ├── NRE: Open [Dashboard]          │   │
│  │  docs/demo.md                     ├── NRE: Setup [Contribs]         │   │
│  │  ├── iframe :1880 (Editor)        └── NRE: Health Check             │   │
│  │  └── iframe :1880/ui (Dashboard)                                     │   │
│  │                                                                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Flujo de Usuario

```
1. Setup inicial
   Usuario: @wire-editor verificar setup
   Agente: → Detecta Node-RED no instalado
           → Ofrece: scripts/setup-node-red.sh

2. Instalación de contribs
   Usuario: @wire-editor instalar alephscript
   Agente: → Ejecuta npm install en ~/.node-red
           → Verifica 13 nodos disponibles

3. Crear flow
   Usuario: @wire-editor crear flow "mi-bot"
   Agente: → Crea DISCO/WIRING/projects/mi-bot/
           → Template inicial con nodos AlephScript

4. Ejecutar
   Usuario: Ctrl+Shift+P → "Tasks: Run Task" → "NRE: Start [Editor]"
   → Node-RED arranca en :1880
   → Usuario importa flow desde DISCO/WIRING/

5. Jugar wiki-racer
   Usuario: @wiring-app cargar template
   Agente: → Importa WiringAppHypergraphEditor/node-red-contrib-wikir-racer/flow.json
           → Configura nodo game
           → Abre dashboard en :1880/ui
```

---

## Dependencias Externas

| Dependencia | Versión | Verificación |
|-------------|---------|--------------|
| Node.js | 18+ | `node --version` |
| npm | 8+ | `npm --version` |
| Node-RED | 3+ | `node-red --version` |
| node-red-dashboard | latest | Paleta Node-RED |

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-01-05 | Creación del borrador unificado | @ox |
