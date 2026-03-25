# Backlog Borrador: BLOCKLY-INTEGRATION — Integración Completa Blockly Editor

**Opportunity**: Aleph Scriptorium  
**Sprint**: FC1  
**Effort total**: 26 pts  
**Estado**: 📝 Borrador (pendiente aprobación)

---

## Contexto

### El problema

El Scriptorium tiene el submódulo `BlocklyEditor` parcialmente integrado:

| Submódulo | Plugin | Estado |
|-----------|--------|--------|
| `BlocklyEditor` | `blockly-editor` | Estructura creada, sin arranque |

Falta:
1. Scripts de setup multiplataforma (Windows/macOS/Linux)
2. Tasks.json para arranque del Editor UI y Runtime
3. Iframes en demo.md para visualizar el editor
4. Instrucciones actualizadas con fases de trabajo

### La solución

Integración completa en 4 fases:
1. **Setup**: Scripts que instalan dependencias y construyen el SDK
2. **Arranque**: Tasks.json con stack BLE (Editor, Runtime)
3. **Demo**: Iframes en demo.md
4. **Agentes**: Instrucciones actualizadas para guiar cada fase

### Arquitectura de Puertos

| Servicio | Puerto | Descripción |
|----------|--------|-------------|
| Blockly Gamify UI | 4200 | Editor visual Angular |
| Blockly Runtime UI | 4300 | Runtime de ejecución |

---

## Submódulo: BlocklyEditor

```
BlocklyEditor/
├── packages/
│   ├── blockly-alephscript-blocks/    # Librería de bloques (6 categorías)
│   │   ├── src/
│   │   │   ├── blocks/                # Definiciones de bloques
│   │   │   ├── generators/            # Generadores JavaScript
│   │   │   └── toolbox/               # Configuración de toolbox
│   │   └── package.json
│   │
│   ├── blockly-gamify-ui/             # Editor visual (Angular 19)
│   │   ├── src/
│   │   │   └── app/components/        # Componentes UI
│   │   └── package.json               # Puerto 4200
│   │
│   └── blockly-runtime-gamify-ui/     # Runtime de ejecución
│       └── package.json               # Puerto 4300
│
├── examples/                          # Proyectos de ejemplo
├── scripts/
│   ├── configure.cjs                  # Configuración
│   └── postinstall.cjs                # Post-instalación
└── vibecoding/                        # Documentación de desarrollo
```

### Categorías de Bloques

| Categoría | Bloques | Uso en Scriptorium |
|-----------|---------|-------------------|
| **Bot** | Crear, configurar, acciones | Agentes del Teatro |
| **Channel** | Conectar, gestionar canales | Comunicación ARG |
| **Message** | Enviar, recibir, filtrar | Eventos de obra |
| **Room** | Crear, navegar salas | Escenas del Teatro |
| **Orchestrator** | Gestionar procesos, workflows | Monomito/BOE |
| **Format** | Formatear datos, plantillas | Presentación |

### Paletas por Paradigma FIA

| Paradigma FIA | Paleta | Bloques Específicos |
|---------------|--------|---------------------|
| `logica/` | Logic+ | Proposiciones, inferencia |
| `sbr/` | Rules | IF-THEN, condiciones |
| `simbolica/` | Symbols | Marcos, redes semánticas |

---

## Feature Cycles

| Ciclo | Objetivo | Effort | Entregables |
|-------|----------|--------|-------------|
| **FC1** | Setup multiplataforma | 8 pts | Scripts bash/cmd |
| **FC2** | Tasks.json + demo.md | 8 pts | 5 tasks + 1 iframe |
| **FC3** | Instrucciones actualizadas | 5 pts | Fases de trabajo |
| **FC4** | Health check + verificación | 5 pts | Scripts de validación |

---

## Stories

### BLOCKLY-S01 — Scripts de Setup Multiplataforma
**Puntos**: 8  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Crear scripts que instalen dependencias y construyan todos los paquetes.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T001 | Crear `scripts/setup-blockly.sh` (Unix/macOS) | 2 | ⏳ |
| T002 | Crear `scripts/setup-blockly.cmd` (Windows) | 2 | ⏳ |
| T003 | Script verificación prerequisitos (Angular CLI) | 1 | ⏳ |
| T004 | Documentar en README-SCRIPTORIUM.md | 1 | ⏳ |
| T005 | Health check para puertos 4200/4300 | 2 | ⏳ |

#### Comandos de Setup

**Unix/macOS**:
```bash
#!/bin/bash
# scripts/setup-blockly.sh

echo "🔧 Installing Blockly SDK dependencies..."
cd BlocklyEditor

echo "📦 Installing all packages..."
npm run install:all

echo "🔨 Building all packages..."
npm run build:all

echo "✅ Setup complete! Run: npm run dev:ui"
```

**Windows**:
```cmd
@echo off
REM scripts/setup-blockly.cmd

echo Installing Blockly SDK dependencies...
cd BlocklyEditor

echo Installing all packages...
call npm run install:all

echo Building all packages...
call npm run build:all

echo Setup complete! Run: npm run dev:ui
```

#### Definition of Done
- [ ] Scripts funcionan en Windows, macOS, Linux
- [ ] Los 3 paquetes construidos correctamente
- [ ] Health check verifica puertos 4200 y 4300

---

### BLOCKLY-S02 — Tasks.json para Arranque
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Añadir tasks para arrancar el editor Blockly.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T006 | Task `BLE: Start [Editor]` - Angular en 4200 | 1 | ⏳ |
| T007 | Task `BLE: Start [Runtime]` - Runtime en 4300 | 1 | ⏳ |
| T008 | Task `BLE: Build [All]` - Construir SDK | 1 | ⏳ |
| T009 | Task `BLE: Open [Editor]` - Abrir navegador | 0.5 | ⏳ |
| T010 | Task `BLE: Setup` - Instalar dependencias | 1 | ⏳ |
| T011 | Task `BLE: Health Check` - Verificar servicios | 0.5 | ⏳ |

#### Nomenclatura de Tasks

```
BLE: Blockly Editor
├── BLE: Start [Editor]      → Puerto 4200 (Angular)
├── BLE: Start [Runtime]     → Puerto 4300 (Runtime)
├── BLE: Build [All]         → Construir todos los paquetes
├── BLE: Setup               → npm run install:all
├── BLE: Open [Editor]       → http://localhost:4200
└── BLE: Health Check        → Verificar servicios
```

#### Definition of Done
- [ ] 6 tasks añadidas a tasks.json
- [ ] Nomenclatura consistente con APB, TPE, NRE, etc.
- [ ] Documentación de puertos en comments

---

### BLOCKLY-S03 — Iframe en demo.md
**Puntos**: 3  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

#### Descripción
Añadir iframe para el editor Blockly.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T012 | Iframe Blockly Editor (4200) | 1 | ⏳ |
| T013 | Badge de status en barra superior | 0.5 | ⏳ |
| T014 | Script auto-check para 4200 | 0.5 | ⏳ |
| T015 | Documentar en sección VISUAL EDITORS | 1 | ⏳ |

#### Definition of Done
- [ ] 1 iframe en sección "VISUAL EDITORS"
- [ ] Badge :4200
- [ ] Auto-check funcional

---

### BLOCKLY-S04 — Actualizar Instrucciones
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Actualizar instrucciones con fases de trabajo del agente.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T016 | Actualizar `blockly-editor.instructions.md` | 3 | ⏳ |
| T017 | Añadir handoffs para setup/instalación | 1 | ⏳ |
| T018 | Añadir handoffs para ejecución/uso | 1 | ⏳ |

#### Capacidades del Agente @plugin_ox_blocklyeditor

| Fase | Capacidad | Handoff |
|------|-----------|---------|
| Setup | Verificar Angular CLI instalado | `@blockly-editor verificar setup` |
| Setup | Instalar SDK | `@blockly-editor setup` |
| Setup | Construir paquetes | `@blockly-editor build` |
| Config | Asignar paleta a personaje | `@blockly-editor asignar paleta` |
| Edición | Abrir editor para personaje | `@blockly-editor abrir {personaje}` |
| Edición | Crear rutina nueva | `@blockly-editor crear rutina` |
| Edición | Guardar workspace | `@blockly-editor guardar` |
| Uso | Ejecutar rutina en Teatro | `@blockly-editor ejecutar` |

#### Definition of Done
- [ ] Instrucciones actualizadas con todas las fases
- [ ] Handoffs documentados
- [ ] Integración con tasks.json

---

## Diagrama de Integración

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        BLOCKLY INTEGRATION                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    SUBMÓDULO (Código)                               │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │                                                                      │   │
│  │  BlocklyEditor/                                                      │   │
│  │  ├── packages/                                                       │   │
│  │  │   ├── blockly-alephscript-blocks/ (6 categorías de bloques)     │   │
│  │  │   ├── blockly-gamify-ui/          (Angular 19, puerto 4200)     │   │
│  │  │   └── blockly-runtime-gamify-ui/  (Runtime, puerto 4300)        │   │
│  │  └── scripts/configure.cjs                                          │   │
│  │                                                                      │   │
│  └──────────────────────────┬──────────────────────────────────────────┘   │
│                             │                                               │
│                             ▼                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    PLUGIN (Agente)                                  │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │                                                                      │   │
│  │  .github/plugins/blockly-editor/                                    │   │
│  │  ├── agents/blockly-editor.agent.md                                 │   │
│  │  ├── instructions/blockly-editor.instructions.md                    │   │
│  │  └── prompts/                                                       │   │
│  │      ├── abrir-editor.prompt.md                                     │   │
│  │      ├── crear-rutina.prompt.md                                     │   │
│  │      └── asignar-paleta.prompt.md                                   │   │
│  │                                                                      │   │
│  └──────────────────────────┬──────────────────────────────────────────┘   │
│                             │                                               │
│                             ▼                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    INFRAESTRUCTURA                                   │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │                                                                      │   │
│  │  scripts/                         .vscode/tasks.json                │   │
│  │  ├── setup-blockly.sh             ├── BLE: Start [Editor]           │   │
│  │  └── setup-blockly.cmd            ├── BLE: Start [Runtime]          │   │
│  │                                   ├── BLE: Build [All]              │   │
│  │  docs/demo.md                     ├── BLE: Setup                    │   │
│  │  └── iframe :4200 (Editor)        └── BLE: Health Check             │   │
│  │                                                                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Flujo de Usuario

```
1. Setup inicial
   Usuario: @blockly-editor verificar setup
   Agente: → Detecta Angular CLI no instalado
           → Ofrece: npm install -g @angular/cli

2. Instalación del SDK
   Usuario: @blockly-editor setup
   Agente: → Ejecuta scripts/setup-blockly.sh
           → Construye los 3 paquetes

3. Crear rutina para personaje
   Usuario: @blockly-editor abrir Tarotista
   Agente: → Carga workspace existente o crea nuevo
           → Abre editor en http://localhost:4200

4. Diseñar lógica
   Usuario: [Arrastra bloques en el editor]
   → Genera código JavaScript automáticamente

5. Guardar y ejecutar
   Usuario: @blockly-editor guardar
   Agente: → Exporta workspace.xml
           → Genera rutina.js
           → Asigna a actores.json

6. Ejecutar en Teatro
   Usuario: @blockly-editor ejecutar
   Agente: → Abre Teatro con runtime de Blockly
```

---

## Dependencias Externas

| Dependencia | Versión | Verificación |
|-------------|---------|--------------|
| Node.js | 18+ | `node --version` |
| npm | 8+ | `npm --version` |
| Angular CLI | 19+ | `ng version` |
| Blockly | 12+ | Incluido en packages |

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-01-05 | Creación del borrador | @ox |
