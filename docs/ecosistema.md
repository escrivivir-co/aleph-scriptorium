---
layout: default
title: Ecosistema
description: "18 submódulos → 21 plugins → 33+ agentes → Tú"
permalink: /ecosistema/
---

# 🧬 El Ecosistema Aleph

Tras una hackathon de "asides" dic/ene 25/26, de la infraestructura a la interfaz, la cosa queda en: **18 submódulos** alimentan **21 plugins** que empoderan **33+ agentes** para trabajar contigo.

```
[Stack Vs Code] ─→ [workspace] ─→ 
─→ [Submódulos] ─→ [Plugins] ─→ [Agentes] ─→
─→ [Chat | Codebase | Portales | Salas]
     
```

> 📐 **Arquitectura completa**: Ver [board.md](https://github.com/escrivivir-co/aleph-scriptorium/blob/main/board.md) — Blueprint del producto

---

## 📦 Infraestructura — 18 Submódulos

Repositorios externos integrados que proporcionan capacidades especializadas.

### Stacks Principales

| Stack | Submódulo | Runtime | Función |
|-------|-----------|---------|---------|
| **MCP Mesh** | [MCPGallery](../MCPGallery/) | Node.js | 6 servidores MCP orquestados |
| **Prolog** | [PrologEditor](../PrologEditor/) | Angular + SWI | Editor de lógica simbólica |
| **Blockly** | [BlocklyEditor](../BlocklyEditor/) | Angular 19 | Bloques visuales → código |
| **Wiring** | [WiringEditor](../WiringEditor/) | Node-RED | Flujos de datos |
| **TypedPrompts** | [TypedPromptsEditor](../TypedPromptsEditor/) | Vite | Ontologías NL↔JSON |
| **Novelist** | [NovelistEditor](../NovelistEditor/) | Node.js | Producción narrativa |

### SDKs y Herramientas

| Submódulo | Función |
|-----------|---------|
| [VsCodeExtension](../VsCodeExtension/) | Extensión Arrakis (Hacker Panels) |
| [CopilotEngine](../CopilotEngine/) | Análisis del motor conversacional |
| [OnthologyEditor](../OnthologyEditor/) | Modelado de dominios (Flove, MMCO) |
| [AAIAGallery](../AAIAGallery/) | Galería de agentes AlephScript |
| [AgentLoreSDK](../AgentLoreSDK/) | Plantillas de agentes (637+ items) |
| [StateMachine](../StateMachine/) | Máquinas de estados |
| [StreamDesktop](../StreamDesktop/) | Streaming de teatro |

> 📁 **Lista canónica**: Ver [.gitmodules](https://github.com/escrivivir-co/aleph-scriptorium/blob/main/.gitmodules) para la lista completa.

---

## 🔌 Plugins — 21 Extensiones

> 📄 **Fuente canónica**: [registry.json](https://github.com/escrivivir-co/aleph-scriptorium/blob/main/.github/plugins/registry.json)

### ✅ Core Pack (Preinstalado)

| Plugin | Handoff | Descripción |
|--------|---------|-------------|
| **ScriptoriumPack** | — | Instrucciones core con activación selectiva |

### 🎯 Operativos (9)

Plugins completamente funcionales:

| Plugin | Handoff | Descripción |
|--------|---------|-------------|
| **ARG Board** | `@plugin_ox_argboard` | Motor transmedia. BOE, obras, 8 agentes |
| **Enciclopedia** | `@plugin_ox_enciclopedia` | Biblioteca de tomos (HDF 61 caps) |
| **GH-Pages** | `@plugin_ox_ghpages` | Publicación web CI/CD |
| **Foro Scraper** | `@plugin_ox_foroscraper` | Scraping pausable (vBulletin, phpBB) |
| **Agent Creator** | `@plugin_ox_agentcreator` | Fábrica de agentes + AgentLoreSDK |
| **Teatro** | `@plugin_ox_teatro` | Experiencias 3D con impress.js |
| **Scrum** | `@plugin_ox_scrum` | Modelo Generativo v3.0 + Lucas DRY |
| **MCP-Presets** | `@plugin_ox_mcppresets` | Gestión de toolkits MCP |
| **OpenAsyncAPI** | `@plugin_ox_openasyncapieditor` | Specs OpenAPI/AsyncAPI |

### 🚧 En Desarrollo (11)

| Plugin | Handoff | Stack relacionado |
|--------|---------|-------------------|
| Network | `@plugin_ox_network` | BlockchainComPort |
| Novelist | `@plugin_ox_novelist` | NovelistEditor |
| Blockly Editor | `@plugin_ox_blocklyeditor` | BlocklyEditor |
| Wire Editor | `@plugin_ox_wireeditor` | WiringEditor |
| Prolog Editor | `@plugin_ox_prologeditor` | PrologEditor + MCP Prolog |
| Typed Prompting | `@plugin_ox_typedprompting` | TypedPromptsEditor |
| N8N Editor | `@plugin_ox_n8neditor` | WorkflowEditor |
| Wiring App | `@plugin_ox_wiringapp` | WiringAppHypergraphEditor |
| ARG Board App | `@plugin_ox_argboardapp` | wiki-racer states |
| HyperGraph Editor | `@plugin_ox_hypergrapheditor` | Navegador de grafos |
| Flove Editor | `@plugin_ox_floveeditor` | OnthologyEditor/Flove |

---

## 🐂 Agentes — 33+ Especialistas

> 📄 **Índice maestro**: [AGENTS.md](https://github.com/escrivivir-co/aleph-scriptorium/blob/main/.github/agents/AGENTS.md)

### Arquitectura de Capas

```
┌─────────────────────────────────────────────────────────────────────┐
│                         🟢 UI (Producción)                          │
│               @aleph · @revisor · @periodico                         │
└───────────────────────────────┬─────────────────────────────────────┘
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│               🏴 BACKEND (Las 5 Banderas de Auditoría)              │
│    @blueflag · @blackflag · @redflag · @yellowflag · @orangeflag     │
└───────────────────────────────┬─────────────────────────────────────┘
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    🔌 PLUGINS (21 bridges)                          │
│        @plugin_ox_* → delegan a agentes internos                     │
└───────────────────────────────┬─────────────────────────────────────┘
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    ⚙️ META (Gestión del sistema)                     │
│               @ox · @pluginmanager · @indice · @scrum                │
└─────────────────────────────────────────────────────────────────────┘
```

### 🟢 UI — Producción (3)

| Agente | Rol |
|--------|-----|
| `@aleph` | Escriba principal. Planifica, redacta, coordina |
| `@revisor` | Control de calidad. Coherencia con ARCHIVO |
| `@periodico` | Redactor de noticias. Método 5W + banderas |

### 🏴 Backend — Las 5 Banderas (5)

Sistema de auditoría doctrinal:

| Agente | Audita |
|--------|--------|
| `@blueflag` | **Verdad**: evidencia, fuentes, falsificabilidad |
| `@blackflag` | **Poder**: captura, coste represivo, sombras |
| `@redflag` | **Escala**: viabilidad, enforcement, estructura |
| `@yellowflag` | **Límites**: condiciones vs contenido |
| `@orangeflag` | **Registro**: dialéctica, retórica, estilo |

### ⚙️ Meta — Gestión (4)

| Agente | Rol |
|--------|-----|
| `@ox` | Oráculo. Conoce todos los agentes, genera docs |
| `@pluginmanager` | Instala, activa, desactiva plugins |
| `@indice` | Navegador DRY. Consulta índices Funcional/Técnico |
| `@scrum` | Master Agile. Modelo Generativo v3.0 |

### 🔌 Bridges — Conectores (21)

Los bridges conectan VS Code con los agentes internos de cada plugin:

| Categoría | Bridges |
|-----------|---------|
| **Producción** | `@plugin_ox_novelist`, `@plugin_ox_teatro`, `@plugin_ox_argboard` |
| **Lógica** | `@plugin_ox_prologeditor`, `@plugin_ox_blocklyeditor`, `@plugin_ox_typedprompting` |
| **Flujos** | `@plugin_ox_wireeditor`, `@plugin_ox_n8neditor`, `@plugin_ox_wiringapp` |
| **Datos** | `@plugin_ox_enciclopedia`, `@plugin_ox_foroscraper`, `@plugin_ox_network` |
| **DevOps** | `@plugin_ox_ghpages`, `@plugin_ox_scrum`, `@plugin_ox_agentcreator` |
| **Specs** | `@plugin_ox_openasyncapieditor`, `@plugin_ox_mcppresets` |
| **Apps** | `@plugin_ox_argboardapp`, `@plugin_ox_hypergrapheditor`, `@plugin_ox_floveeditor` |

---

## 🧠 Cómo Entiende el Scriptorium a Copilot

El Scriptorium no solo usa Copilot Chat — **entiende cómo funciona por dentro**.

> 📐 **Análisis detallado**: Ver [blueprint-copilot.md](blueprint-copilot.md)

### El Viaje de tu Pregunta

```
Tu pregunta → Sistema prepara contexto → Modelo (Claude/GPT/Gemini) → Respuesta
```

El submódulo [CopilotEngine](../CopilotEngine/) es una captura del código fuente de la extensión de Microsoft para entender —y eventualmente modificar— cómo piensa tu asistente.

| Aspecto | Lo que sabemos |
|---------|----------------|
| **Registro de modelos** | Copilot selecciona instrucciones diferentes según uses Claude, GPT o Gemini |
| **Estructura del mensaje** | Las instrucciones se organizan en "Tags" XML que el modelo interpreta |
| **Context bloat** | Microsoft añade mensajes de sistema; DRY mitiga la saturación |

### Gestión del Contexto

| Estrategia | Implementación |
|------------|----------------|
| **DRY** | Índices como herramientas, no ficheros completos |
| **Instrucciones selectivas** | Filtros `applyTo` cargan solo lo relevante |
| **Auto-reflexión** | Agentes monitorizan su propia eficiencia |

### Pregúntale a @ox

```
@ox ¿Cómo funciona el system message de Copilot?
@ox ¿Qué diferencia hay entre el prompt de Claude y GPT?
@ox ¿Cómo optimizo mis instrucciones para Claude?
```

---

## 💬 Cómo Interactuar

### Flujo de Handoffs

```
Tú → @aleph → [handoff] → @plugin_ox_* → [agente interno] → Resultado
```

### Tabla de Invocación Rápida

| Si quieres... | Invoca a... | Ejemplo |
|---------------|-------------|---------|
| Redactar contenido | `@aleph` | `@aleph redacta capítulo 3` |
| Auditar evidencia | `@blueflag` | `@blueflag audita las afirmaciones` |
| Detectar capturas | `@blackflag` | `¿quién gana con esta propuesta?` |
| Evaluar viabilidad | `@redflag` | `¿es implementable a escala?` |
| Crear un agente | `@plugin_ox_agentcreator` | `crea agente especializado` |
| Publicar en web | `@plugin_ox_ghpages` | `publica docs/` |
| Planificar sprint | `@scrum` | `genera épica para X` |
| Saber qué agente usar | `@ox` | `¿qué agente uso para retórica?` |

### Ejemplo de Sesión

```bash
# Redactar
@aleph quiero escribir sobre tecnofeudalismo

# Auditar (ronda de banderas)
@blueflag audita evidencia del borrador
@blackflag ¿quién captura esta propuesta?
@redflag ¿es viable a escala nacional?

# Publicar
@plugin_ox_ghpages publica el artículo
```

---

## 🛠️ Servidores MCP

El ecosistema incluye **6 servidores MCP** orquestados desde [MCPGallery](../MCPGallery/mcp-mesh-sdk/):

| Servidor | Puerto | Función |
|----------|--------|---------|
| **Launcher** | 3050 | Orquestación de todos los servidores |
| **Prolog** | 3006 | Lógica simbólica + templates IoT |
| **TypedPrompt** | 3020 | Validación de ontologías |
| **WikiBrowser** | 3002 | Navegación de grafos wiki |
| **StateMachine** | 3004 | Máquinas de estados |
| **DevOps** | 3003 | Automatización CI/CD |

> 📐 **Tasks disponibles**: Ver sección "Panel de Servicios" en [board.md](https://github.com/escrivivir-co/aleph-scriptorium/blob/main/board.md#8-panel-de-servicios-y-apps)

---

## 🚀 ¿Listo para escribir?

18 submódulos. 21 plugins. 33+ agentes. Todo trabajando para ti.

**Siguiente paso**: Explora el [Blueprint del Producto](https://github.com/escrivivir-co/aleph-scriptorium/blob/main/board.md) para entender la arquitectura completa.

[Fork en GitHub →](https://github.com/escrivivir-co/aleph-scriptorium)
