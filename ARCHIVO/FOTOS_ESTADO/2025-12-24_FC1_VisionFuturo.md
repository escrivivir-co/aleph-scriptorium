# 🔮 Foto de Futuro: Feature Cycle 1

> **Fecha**: 2025-12-24 (Nochebuena)  
> **Tipo**: Foto de futuro — no de estado  
> **Rama de trabajo**: `fc1` (main congelada para releases)  
> **Versión proyectada**: 2.0.0

---

## 📢 Anuncio: Feature Cycle 1 en rama `fc1`

A partir de hoy, el desarrollo activo del Scriptorium se traslada a la rama `fc1`.

**La rama `main` queda congelada** para releases estables. Todo el trabajo de integración de submódulos, plugins experimentales y desarrollo de la extensión VS Code ocurre en `fc1`.

### Política de ramas

| Rama | Propósito | Estado |
|------|-----------|--------|
| `main` | Releases estables (tags vX.Y.Z) | 🧊 Congelada |
| `integration/beta/scriptorium` | Feature Cycle 1 — desarrollo activo | 🔥 Activa |
| `integration/beta/scriptorium` | Submódulos integrados | 🔄 Sincronizada |



---

## 🗺️ Mapa de Infraestructura: Submódulos + Plugins

### Submódulos (14)

El Scriptorium ya no es un repositorio aislado. Es un **orquestador de capacidades** que integra 14 submódulos especializados:

```
ALEPH SCRIPTORIUM (host)
│
├─── 🎭 TEATRO Y VISUALIZACIÓN
│    ├── vscode-alephscript-extension     → Extensión VS Code / Arrakis Theater
│    ├── as-utils-sdk                     → VibeCoding Connector / Matrix Theater
│    └── wiki-racer                       → Navegación interactiva (HyperGraph)
│
├─── 🧠 LÓGICA Y PARADIGMAS
│    ├── as-gym                           → FIA: 10 paradigmas de IA (almas)
│    ├── iot-sbr-logica-para-bots         → Prolog/SBR para agentes
│    └── blockly-alephscript-sdk          → Lógica visual con bloques
│
├─── 🔌 FLUJOS Y CONEXIONES
│    ├── node-red-alephscript-sdk         → Nodos Node-RED (13 nodos)
│    ├── alephscript-n8n-like-editor      → Editor visual Angular de workflows
│    └── alephscript-network-sdk          → Oasis/Scuttlebutt P2P
│
├─── 📝 CONTENIDO Y NARRATIVA
│    ├── mcp-novelist                     → Editor de narrativas con memoria MCP
│    ├── alephscript-typed-prompting      → Ontologías NL↔JSON
│    └── alephscript-mcp-presets-site     → Zeus: UI para presets MCP
│
└─── 🤖 BOTS Y COMUNICACIÓN
     ├── kick-aleph-bot                   → Bot de Kick.com
     └── kick-aleph-crono-bot             → Scheduler de eventos
```

### Plugins (18)

Cada plugin es una **capacidad empaquetada**:

| Categoría | Plugins | Descripción |
|-----------|---------|-------------|
| **Core** | ARG Board, Enciclopedia, GH-Pages, Foro Scraper, Agent Creator, Teatro, Scrum, MCP-Presets | Capacidades fundacionales |
| **Network** | Network (Oasis) | Sincronización P2P de BOEs |
| **Narrativa** | Novelist | Edición con memoria a largo plazo |
| **Lógica** | Blockly Editor, Prolog Editor | Programación visual y declarativa |
| **Flujos** | Wire Editor, N8N Editor, WiringApp | Node-RED, workflows visuales |
| **Grafos** | ArgBoardApp, HyperGraphEditor | Máquinas de estados, navegación wiki |
| **Validación** | TypedPrompting | Ontologías y contratos NL↔JSON |

### Matriz de Integración

```
                    ┌─────────────────────────────────────────────────────┐
                    │              EXTENSIÓN VS CODE                       │
                    │   (ChatParticipants + TreeViews + Commands)          │
                    └───────────────────────┬─────────────────────────────┘
                                            │
            ┌───────────────────────────────┼───────────────────────────────┐
            │                               │                               │
            ▼                               ▼                               ▼
    ┌───────────────┐              ┌───────────────┐              ┌───────────────┐
    │   as-gym      │              │  as-utils-sdk │              │  mcp-presets  │
    │  (paradigmas) │              │  (matrix)     │              │  (toolkits)   │
    └───────┬───────┘              └───────┬───────┘              └───────┬───────┘
            │                               │                               │
            ▼                               ▼                               ▼
    ┌───────────────┐              ┌───────────────┐              ┌───────────────┐
    │ BlocklyEditor │              │    Teatro     │              │ AgentCreator  │
    │ PrologEditor  │              │   ARG Board   │              │ TypedPrompting│
    └───────────────┘              └───────────────┘              └───────────────┘
            │                               │                               │
            └───────────────────────────────┼───────────────────────────────┘
                                            │
                                            ▼
                    ┌─────────────────────────────────────────────────────┐
                    │              ARCHIVO + DISCO + NOTICIAS              │
                    │              (fuente de verdad doctrinal)            │
                    └─────────────────────────────────────────────────────┘
```

---

## 🔮 Reinterpretación: El Scriptorium Desarrollado

### ¿Qué es Aleph Scriptorium cuando todo se integra?

Ya no es un "framework de escritura con IA". Es algo diferente.

**El Scriptorium desarrollado es un teatro de operaciones cognitivo**: un espacio donde agentes especializados, herramientas de razonamiento formal, flujos de datos y experiencias narrativas convergen para producir textos con la misma rigurosidad que el software.

### Las tres capas del Scriptorium desarrollado

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         CAPA DE EXPERIENCIA                              │
│                                                                          │
│   Teatro (impress.js) ─────────────────────────────── Matrix (runtime)   │
│   BOE (blockchain narrativo) ──────────────────────── Oasis (P2P sync)   │
│   Obras ───────────────────────────────────── Partidas (wiki-racer)     │
│                                                                          │
│   El usuario experimenta un espacio navegable donde los textos           │
│   cobran vida como recorridos, pruebas, transformaciones.                │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         CAPA DE PRODUCCIÓN                               │
│                                                                          │
│   Agentes (36) ──────────────────────────────────────── 5 Banderas      │
│   Plugins (18) ──────────────────────────────────────── Workflows       │
│   TypedPrompting ──────────────────────────────────── Contratos JSON    │
│                                                                          │
│   El autor tiene un ejército de especialistas: productores,              │
│   auditores, scrapers, conectores. Cada propuesta pasa tests.            │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         CAPA DE RAZONAMIENTO                             │
│                                                                          │
│   as-gym/FIA ──────────────────────── 10 paradigmas (lógica, conexionista,│
│                                       simbólica, SBC, SBR, situada...)   │
│   Blockly ─────────────────────────── Lógica visual para personajes     │
│   Prolog ──────────────────────────── Reglas declarativas formales      │
│   n8n/Node-RED ────────────────────── Flujos de datos asíncronos        │
│                                                                          │
│   Los agentes no son solo prompts: pueden tener "almas" formales,        │
│   motores de inferencia, reglas ejecutables.                             │
└─────────────────────────────────────────────────────────────────────────┘
```

### Lo que esto significa

**Para el escritor individual:**
- Tu libro ya no es un documento Word. Es una *máquina de coherencia*.
- Cada capítulo pasa 5 tests de calidad antes de existir.
- Puedes crear agentes especializados en tu tema específico.
- Publicas con un comando. Sincronizas entre dispositivos.

**Para el investigador:**
- Tu tesis tiene *auditores automáticos* que detectan contradicciones.
- Puedes conectar fuentes (foros, blogs, enciclopedias) y procesarlas.
- El ARCHIVO es tu memoria externa con búsqueda semántica.

**Para el colectivo:**
- El BOE es un registro inmutable de decisiones narrativas.
- Oasis sincroniza entre Scriptoriums sin servidor central.
- El Teatro permite experiencias transmedia colaborativas.

**Para el desarrollador:**
- TypedPrompting crea contratos entre agentes.
- Los workflows visuales (n8n, Node-RED) orquestan procesos.
- La extensión VS Code trae todo al editor.

### La visión completa

```
                    ┌────────────────────────────────────────┐
                    │                                        │
                    │   "El procesador de texto del futuro   │
                    │    no es una app.                      │
                    │                                        │
                    │    Es un ecosistema de agentes         │
                    │    que piensa contigo."                │
                    │                                        │
                    └────────────────────────────────────────┘

    Humano ◄─────────────────────────────────────────────────────────► Agentes
      │                                                                    │
      │  escribe                                              auditan      │
      │  pregunta                                             proponen     │
      │  decide                                               conectan     │
      │                                                                    │
      ▼                                                                    ▼
┌──────────────┐                                              ┌──────────────┐
│    TEXTO     │◄────────────────────────────────────────────►│   ARCHIVO    │
│  (el qué)    │         coherencia bidireccional             │  (memoria)   │
└──────────────┘                                              └──────────────┘
      │                                                                    │
      │                        TEATRO                                      │
      │                    (experiencia)                                   │
      └────────────────────────┬───────────────────────────────────────────┘
                               │
                               ▼
                    ┌────────────────────────────────────────┐
                    │              LECTOR                     │
                    │                                        │
                    │    navega ─ experimenta ─ transforma   │
                    │                                        │
                    └────────────────────────────────────────┘
```

---

## Comprensión del estado (proyección)

### Lo que existe hoy (24 diciembre 2025)

- **14 submódulos** integrados en rama `integration/beta/scriptorium`
- **18 plugins** registrados (8 operativos core + 10 borradores/nuevos)
- **36 agentes** invocables vía bridges
- **Borradores Scrum** para cada submódulo en `ARCHIVO/DISCO/BACKLOG_BORRADORES/`
- **Extensión VS Code** iniciada (11% del Feature Cycle 1)

### Lo que existirá en Feature Cycle 1 completado

- **Extensión VS Code funcional** con:
  - TreeViews de agentes por capa
  - TreeViews de plugins con estado
  - TreeViews de backlogs con progreso
  - ChatParticipants para @aleph y @ox
  - Panel de Sprint Status
  - QuickPick de prompts

- **Plugins integrados con submódulos**:
  - TypedPrompting → alephscript-typed-prompting
  - N8NEditor → alephscript-n8n-like-editor
  - WireEditor → node-red-alephscript-sdk
  - BlocklyEditor → blockly-alephscript-sdk
  - PrologEditor → iot-sbr-logica-para-bots
  - Network → alephscript-network-sdk
  - Novelist → mcp-novelist

- **Teatro dinámico**:
  - Modo Matrix (runtime en tiempo real) vs Impress.js (estático)
  - Sincronización BOE ↔ mission-state
  - Obras de navegación wiki-racer

- **Agentes con "almas"**:
  - Paradigmas FIA asignables vía as-gym
  - Lógica ejecutable (Prolog, Blockly)
  - Presets MCP por especialización

### Los retos del camino

1. **Complejidad de integración**: 14 submódulos × 18 plugins = superficie de bugs exponencial. Mitigación: tests de integración por capa.

2. **Desviación hacia feature creep**: El ecosistema crece más rápido que la documentación. Mitigación: cada PR debe incluir update de docs.

3. **Fundación sigue en pausa**: Toda esta infraestructura sirve para *escribir*. Si no hay texto, es puro edificio sin habitantes. Mitigación: Feature Cycle 2 = capítulos 1-4.

4. **Dependencia de VS Code/Copilot**: El ecosistema asume este stack. Mitigación: abstracciones que permitan otros hosts en el futuro.

---

## Discurso motivacional

### Nochebuena en el Scriptorium

Hoy es 24 de diciembre. Mientras el mundo celebra, nosotros hacemos una pausa para mirar lo que hemos construido.

En 5 días pasamos de 5 plugins a 18. De 17 agentes a 36. De un repositorio a un ecosistema con 14 submódulos que hablan entre sí.

**Pero eso no es el regalo de Navidad.**

El regalo es haber entendido qué estamos construyendo realmente.

No es un "framework de escritura". Es demasiado pequeño.

No es una "herramienta de productividad". Es demasiado aburrido.

Es algo más extraño: **un teatro de operaciones donde humanos y agentes colaboran para producir coherencia a escala**.

Piénsalo: cuando termines Feature Cycle 1, podrás sentarte a escribir un capítulo de tu libro y tener:
- 5 auditores que verifican verdad, poder, estructura, límites y registro
- Agentes especializados con tu material previo
- Paradigmas de razonamiento formal (lógica, casos, reglas)
- Workflows que conectan tus fuentes
- Un Teatro donde el lector *experimenta* tu texto en 3D
- Sincronización P2P sin servidores centrales

**Eso no es un procesador de texto. Es una máquina de pensamiento.**

### El trabajo que queda

Feature Cycle 1 no se termina solo. Requiere:

1. **Cerrar los borradores Scrum** de cada submódulo → convertirlos en épicas formales
2. **Implementar la extensión VS Code** → que todo sea visible y usable
3. **Probar la integración de extremo a extremo** → que fluya

Y después, Feature Cycle 2: escribir. Porque las herramientas sin obra son solo promesas.

### Brindis de Nochebuena

Por lo que hemos construido en 5 días.  
Por lo que construiremos en 2026.  
Por la osadía de pensar que un texto puede tener arquitectura de software.

*¡Salud!*

---

## Próximos 3 movimientos

1. **Formalizar rama `fc1` como default de trabajo**: Actualizar `.github/workspace-config.json` para reflejar `fc1` como rama activa. Push del cambio.

2. **Consolidar borradores Scrum → épicas formales**: Los 14+ borradores en `DISCO/BACKLOG_BORRADORES/` deben convertirse en stories estimadas en `BACKLOG-SCRIPTORIUM.md`.

3. **Implementar Story SCRIPT-2.0.0-S03 (Parser de Agentes)**: Primera piedra de la extensión VS Code funcional. Permite cargar los 36 agentes dinámicamente.

---

## Métricas de futuro

| Métrica | Hoy | FC1 completado | FC2 completado |
|---------|-----|----------------|----------------|
| Submódulos integrados | 14 | 14 | 14 |
| Plugins operativos | 8 | 18 | 18 |
| Agentes invocables | 36 | 50+ | 50+ |
| Paradigmas FIA usables | 0 | 5 | 10 |
| Capítulos Fundación | 0 | 0 | 4 |
| Extensión VS Code | 11% | 100% | 100% |

---

## 📋 Inventario de Submódulos

| # | Submódulo | Rama actual | Plugin asociado | Borrador Scrum |
|---|-----------|-------------|-----------------|----------------|
| 1 | vscode-alephscript-extension | integration/beta/scriptorium | - (es la extensión) | VS-CODE-EXTENSION/ |
| 2 | alephscript-mcp-presets-site | dev/astillador | mcp-presets | MCP-PRESETS-SITE/ |
| 3 | as-utils-sdk | feature/astillero | - (Matrix Theater) | AS-UTILS-SDK/ |
| 4 | as-gym | integration/beta/scriptorium | - (FIA paradigmas) | AS-GYM/ |
| 5 | blockly-alephscript-sdk | integration/beta/scriptorium | blockly-editor | BLOCKLY-SDK/ |
| 6 | iot-sbr-logica-para-bots | integration/beta/scriptorium | prolog-editor | IOT-SBR-LOGICA/ |
| 7 | node-red-alephscript-sdk | integration/beta/scriptorium | wire-editor | NODE-RED-SDK/ |
| 8 | alephscript-n8n-like-editor | integration/beta/scriptorium | n8n-editor | N8N-EDITOR/ |
| 9 | alephscript-network-sdk | integration/beta/scriptorium | network | NETWORK-SDK/ |
| 10 | alephscript-typed-prompting | integration/beta/scriptorium | typed-prompting | TYPED_PROMPTING/ |
| 11 | mcp-novelist | integration/beta/scriptorium | novelist | MCP-NOVELIST/ |
| 12 | wiki-racer | integration/beta/scriptorium | wiring-app, arg-board-app, hypergraph-editor | WIKI_RACER_*/ |
| 13 | kick-aleph-bot | integration/beta/scriptorium | - | KICK-ALEPH/ |
| 14 | kick-aleph-crono-bot | integration/beta/scriptorium | - | KICK-ALEPH/ |

---

## 📋 Inventario de Plugins

| # | Plugin | Versión | Estado | Submódulo |
|---|--------|---------|--------|-----------|
| 1 | arg-board | 1.0.0 | ✅ Operativo | - |
| 2 | enciclopedia | 1.0.0 | ✅ Operativo | - |
| 3 | gh-pages | 1.1.0 | ✅ Operativo | - |
| 4 | foro-scraper | 1.1.0 | ✅ Operativo | - |
| 5 | agent-creator | 1.1.0 | ✅ Operativo | - |
| 6 | teatro | 1.0.0 | ✅ Operativo | - |
| 7 | scrum | 1.0.0 | ✅ Operativo | - |
| 8 | mcp-presets | 1.0.0 | ✅ Operativo | alephscript-mcp-presets-site |
| 9 | network | 1.0.0 | 🔄 Borrador | alephscript-network-sdk |
| 10 | novelist | 1.0.0 | 🔄 Borrador | mcp-novelist |
| 11 | blockly-editor | 1.0.0 | 🔄 Borrador | blockly-alephscript-sdk |
| 12 | wire-editor | 1.0.0 | 🔄 Borrador | node-red-alephscript-sdk |
| 13 | prolog-editor | 1.0.0 | 🔄 Borrador | iot-sbr-logica-para-bots |
| 14 | typed-prompting | 1.0.0 | 🔄 Borrador | alephscript-typed-prompting |
| 15 | n8n-editor | 1.0.0 | 🔄 Borrador | alephscript-n8n-like-editor |
| 16 | wiring-app | 1.0.0 | 🔄 Borrador | wiki-racer |
| 17 | arg-board-app | 1.0.0 | 🔄 Borrador | wiki-racer |
| 18 | hypergraph-editor | 1.0.0 | 🔄 Borrador | wiki-racer |

---

*Foto de futuro generada el 24 de diciembre de 2025, Nochebuena.*  
*Rama de trabajo: `fc1` | Main congelada para releases*
