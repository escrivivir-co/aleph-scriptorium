---
layout: default
title: Léeme
description: Guía de instalación y primeros pasos con Aleph Scriptorium
permalink: /leeme/
---

# 🚀 Primeros Pasos

> ⏱ **Tiempo estimado**: 10 minutos

---

## Requisitos

| Herramienta | Versión | Notas |
|-------------|---------|-------|
| **VS Code** | 1.95+ | [Descargar](https://code.visualstudio.com/download) |
| **GitHub Copilot Chat** | Última | [Instalar extensión](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) |
| **Git** | 2.x+ | Para clonar submódulos |
| **Node.js** | 18+ | Opcional (solo plugins avanzados) |

### Planes GitHub Copilot

| Plan | Precio | Incluye |
|------|--------|---------|
| Free | $0/mes | 2000 completions, 50 mensajes chat/mes |
| **Pro** ⭐ | $10/mes | Ilimitado |
| Business | $19/mes | + Gestión organización |
| Enterprise | Consultar | + Fine-tuning |

---

## Instalación

```bash
# 1. Clonar con submódulos
git clone --recursive https://github.com/escrivivir-co/aleph-scriptorium.git

# 2. Entrar al directorio
cd aleph-scriptorium

# 3. Configurar workspace (settings, submódulos)
./scripts/setup-workspace.sh

# 4. Abrir en VS Code
code .
```

### Verificar instalación

En Copilot Chat (`Ctrl+Shift+I` / `Cmd+Shift+I`):

```
@aleph hola
```

Si el agente responde, ¡instalación completa!

---

## Primer Uso

### 1. Orientación inicial

```
@vestibulo ¿por dónde empiezo?
```

El **Vestíbulo** identifica tu perfil y te dirige a la carta-puerta adecuada.

### 2. Consultar el oráculo

```
@ox ¿qué agentes tengo disponibles?
```

**Ox** conoce todos los agentes y puede orientarte.

### 3. Empezar a escribir

```
@aleph redactar introducción sobre [tema]
```

---

## Mapa de Agentes

| Capa | Agentes | Función |
|------|---------|---------|
| 🟢 **Producción** | `@aleph`, `@revisor`, `@periodico` | Redacción y auditoría |
| 🔵⚫🔴🟡🟠 **Auditoría** | `@blueflag`, `@blackflag`, `@redflag`, `@yellowflag`, `@orangeflag` | Banderas críticas |
| ⚪ **Navegación** | `@vestibulo`, `@cartaspuerta` | Orientación |
| ⚙️ **Meta** | `@ox`, `@pluginmanager` | Sistema |

### Cartas-Puerta

| Carta | Perfil | Enfoque |
|-------|--------|---------|
| Vista Total | Completitud | El *cómo* del proyecto |
| 🔵 Blueflag | Evidencia | Falsificabilidad, posverdad |
| ⚫ Blackflag | Poder | Adversarios, captura |
| 🔴 Redflag | Viabilidad | Escala, régimen material |
| 🟡 Yellowflag | Integración | Límites, condiciones vs contenido |

---

## Plugins

Los plugins extienden capacidades sin modificar el core.

| Plugin | Comando | Función |
|--------|---------|---------|
| **Enciclopedia** | `@plugin_ox_enciclopedia` | Búsqueda en tomos académicos |
| **Foro Scraper** | `@plugin_ox_foroscraper` | Archivo de hilos/blogs |
| **Agent Creator** | `@plugin_ox_agentcreator` | Crear agentes especializados |
| **ARG-BOARD** | `@plugin_ox_argboard` | Teatro transmedia |

→ Ver detalles en [PLUGINS.md](https://github.com/escrivivir-co/aleph-scriptorium/blob/main/.github/PLUGINS.md)

---

## Configuración Avanzada

### Submódulos

El workspace incluye 14 submódulos (`MCPGallery`, `WorkflowEditor`, `BlocklyEditor`...).

→ Ver [scripts/README.md](https://github.com/escrivivir-co/aleph-scriptorium/blob/main/scripts/README.md)

### Compatibilidad IDEs

| IDE | Estado |
|-----|--------|
| **VS Code** | ✅ Completo |
| Cursor | 🔄 En desarrollo |
| Windsurf | 🔄 En desarrollo |
| Claude Code | 🔬 Investigación |
| JetBrains | ⏳ Futuro |

**Requisitos para otros IDEs:**
- Soporte `.agent.md`
- Chat IA conversacional
- Acceso filesystem
- Herramientas MCP

---

## Licencia y Costes

### AIPL v1.0

| Aspecto | Términos |
|---------|----------|
| Uso | Libre (académico/experimental) |
| Modificación | Sin restricciones |
| Distribución | Con o sin atribución |
| Comercialización | Framework libre; contenido "Fundación" © Escrivivir.co |

### Costes

> **Escrivivir.co NO cobra** por Aleph Scriptorium.  
> Solo pagas tu suscripción a GitHub Copilot.

**Optimización de costes:**
- Usa modo **Auto** para rutinas (-10%)
- **Claude Sonnet** para análisis complejos
- **o1-preview** solo cuando sea imprescindible

→ [Licencia completa](https://github.com/escrivivir-co/aleph-scriptorium/blob/main/LICENSE.md)

---

[← Inicio]({{ site.baseurl }}/) · [Ecosistema]({{ site.baseurl }}/ecosistema/) · [Archivo]({{ site.baseurl }}/archivo/)
