---
layout: default
title: Ecosistema
description: "14 submódulos → 19 plugins → 31 agentes → Tú"
permalink: /ecosistema/
---

# 🧬 El Ecosistema Aleph

De la infraestructura a la interfaz: **14 submódulos** alimentan **19 plugins** que empoderan **31 agentes** para trabajar contigo.

```
[Submódulos] ─→ [Plugins] ─→ [Agentes] ─→ [Tú]
     14             19           31
```

---

## 📦 Infraestructura — 14 Submódulos

Repositorios externos integrados que proporcionan capacidades especializadas.

| Nombre | Runtime | Descripción |
|--------|---------|-------------|
| **VS Code Extension** | TypeScript | Extensión oficial. TreeViews, ChatParticipants |
| **MCP Zeus** | Next.js | Gestor de presets MCP (puerto 3012) |
| **AS-Utils SDK** | Node.js | VibeCoding Connector, Teatro Matrix |
| **AS-Gym** | TypeScript | 10 paradigmas IA: lógica, conexionista, SBR/SBC |
| **Blockly SDK** | Angular | Editor visual de bloques, genera JavaScript |
| **Motor Prolog** | SWI-Prolog | Lógica declarativa, templates IoT |
| **Node-RED SDK** | Node-RED | 13 nodos: bot, channel, format, orchestration |
| **N8N Editor** | Angular 18 | Editor visual de workflows, D3.js + Monaco |
| **Network SDK** | Docker | Red P2P Oasis/Scuttlebutt |
| **Typed Prompting** | Vite | Ontologías NL↔JSON, validación AJV/Zod |
| **MCP Novelist** | Node.js | Servidor MCP para narrativas (puerto 3066) |
| **Wiki Racer** | TypeScript | Navegación de grafos, IGraphSource abstracto |
| **Kick Bot** | Node.js | Bot para plataforma Kick |
| **Kick Crono** | Node.js | Bot cronológico, tareas programadas |

> 📁 **Detalle**: Ver [scripts/README.md](https://github.com/escrivivir-co/aleph-scriptorium/blob/main/scripts/README.md) para la lista completa de submódulos.

---

## 🔌 Plugins — 19 Extensiones

### ✅ Operativos (8)

Plugins completamente funcionales, listos para usar.

| Plugin | Agentes | Handoff | Descripción |
|--------|---------|---------|-------------|
| **ARG Board** | 8 | \`@plugin_ox_argboard\` | Motor transmedia. BOE, obras, actores |
| **Enciclopedia** | 2 | \`@plugin_ox_enciclopedia\` | Biblioteca de tomos. HDF (61 caps) |
| **GH-Pages** | 1 | \`@plugin_ox_ghpages\` | Publicación web. Fusionar/reemplazar |
| **Foro Scraper** | 1 | \`@plugin_ox_foroscraper\` | Scraping pausable. vBulletin, phpBB |
| **Agent Creator** | 1 | \`@plugin_ox_agentcreator\` | Fábrica de agentes especializados |
| **Teatro** | 1 | \`@plugin_ox_teatro\` | Experiencias 3D con impress.js |
| **Scrum** | 1 | \`@plugin_ox_scrum\` | Gestión ágil de backlogs (5 fases) |
| **MCP-Presets** | 1 | \`@plugin_ox_mcppresets\` | Gestión de toolkits MCP |

### 🚧 En Desarrollo (11)

Plugins con estructura definida, en proceso de implementación.

| Plugin | Handoff | Descripción |
|--------|---------|-------------|
| Network | \`@plugin_ox_network\` | Sincronización P2P de BOEs |
| Novelist | \`@plugin_ox_novelist\` | Narrativas con memoria MCP |
| Blockly Editor | \`@plugin_ox_blocklyeditor\` | Lógica visual para personajes |
| Wire Editor | \`@plugin_ox_wireeditor\` | Diseñador de flujos Node-RED |
| Prolog Editor | \`@plugin_ox_prologeditor\` | Lógica declarativa SWI-Prolog |
| Typed Prompting | \`@plugin_ox_typedprompting\` | Ontologías NL↔JSON |
| N8N Editor | \`@plugin_ox_n8neditor\` | Editor visual de workflows |
| Wiring App | \`@plugin_ox_wiringapp\` | Flows estilo wiki-racer |
| ARG Board App | \`@plugin_ox_argboardapp\` | Máquina de estados wiki-racer |
| HyperGraph Editor | \`@plugin_ox_hypergrapheditor\` | Navegador de grafos |

> 📄 **Detalle completo**: Ver [.github/plugins/registry.json](https://github.com/escrivivir-co/aleph-scriptorium/blob/main/.github/plugins/registry.json)

---

## 🐂 Agentes — 31 Especialistas

### 🟢 UI — Producción (3)

| Agente | Rol |
|--------|-----|
| \`@aleph\` | Escriba principal. Planifica, redacta, coordina |
| \`@revisor\` | Control de calidad. Coherencia con ARCHIVO |
| \`@periodico\` | Redactor de noticias. Método 5W + banderas |

### 🏴 Backend — Las 5 Banderas (5)

| Agente | Audita |
|--------|--------|
| \`@blueflag\` | **Verdad**: evidencia, fuentes, falsificabilidad |
| \`@blackflag\` | **Poder**: captura, coste represivo, sombras |
| \`@redflag\` | **Escala**: viabilidad, enforcement, estructura |
| \`@yellowflag\` | **Límites**: condiciones vs contenido |
| \`@orangeflag\` | **Registro**: dialéctica, retórica, estilo |

### ⚪ Sistema — Navegación (3)

| Agente | Rol |
|--------|-----|
| \`@vestibulo\` | Recepción. Orienta visitantes |
| \`@cartaspuerta\` | Genera cartas de presentación |
| \`@indice\` | Navegador DRY. Consulta índices |

### ⚙️ Meta — Gestión (2)

| Agente | Rol |
|--------|-----|
| \`@ox\` | Oráculo. Conoce todos los agentes |
| \`@pluginmanager\` | Instala, activa, desactiva plugins |

### 🔌 Bridges — Conectores (18)

Los bridges conectan VS Code con los agentes internos de cada plugin:

\`\`\`
@plugin_ox_argboard     @plugin_ox_enciclopedia   @plugin_ox_ghpages
@plugin_ox_foroscraper  @plugin_ox_agentcreator   @plugin_ox_teatro
@plugin_ox_scrum        @plugin_ox_mcppresets     @plugin_ox_network
@plugin_ox_novelist     @plugin_ox_blocklyeditor  @plugin_ox_wireeditor
@plugin_ox_prologeditor @plugin_ox_typedprompting @plugin_ox_n8neditor
@plugin_ox_wiringapp    @plugin_ox_argboardapp    @plugin_ox_hypergrapheditor
\`\`\`

> 📄 **Índice maestro**: Ver [@ox](https://github.com/escrivivir-co/aleph-scriptorium/blob/main/.github/agents/ox.agent.md)

---

## 💬 Cómo Interactuar

### Flujo de Handoffs

\`\`\`
Tú → @aleph → [handoff] → @plugin_ox_* → [agente interno] → Resultado
\`\`\`

### Tabla de Invocación Rápida

| Si quieres... | Invoca a... | Ejemplo |
|---------------|-------------|---------|
| Redactar un capítulo | \`@aleph\` | \`@aleph redacta capítulo 3 sobre vivienda\` |
| Auditar evidencia | \`@blueflag\` | \`@blueflag audita las afirmaciones\` |
| Detectar capturas | \`@blackflag\` | \`¿quién gana con esta propuesta?\` |
| Evaluar viabilidad | \`@redflag\` | \`¿es implementable a escala?\` |
| Crear un agente | \`@plugin_ox_agentcreator\` | \`crea agente basado en yellowflag\` |
| Publicar en web | \`@plugin_ox_ghpages\` | \`publica docs/periodico.md\` |
| Crear obra | \`@plugin_ox_teatro\` | \`genera obra camino del héroe\` |
| Extraer de foro | \`@plugin_ox_foroscraper\` | \`descarga hilo de burbuja.info\` |
| Consultar enciclopedia | \`@plugin_ox_enciclopedia\` | \`busca "Kant" en HDF\` |
| Saber qué agente usar | \`@ox\` | \`¿qué agente uso para retórica?\` |

### Ejemplo de Sesión

\`\`\`bash
# Redactar
@aleph quiero escribir sobre tecnofeudalismo

# Auditar
@blueflag audita evidencia del borrador
@blackflag ¿quién captura esta propuesta?
@redflag ¿es viable a escala nacional?

# Publicar
@plugin_ox_ghpages publica el artículo
\`\`\`

---

## 🚀 ¿Listo para escribir?

14 submódulos. 19 plugins. 31 agentes. Todo trabajando para ti.

[Fork en GitHub →](https://github.com/escrivivir-co/aleph-scriptorium)
