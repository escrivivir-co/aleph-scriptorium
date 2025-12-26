# Informe de Implementación: Sistema de Plugins para ALEPH Scriptorium

> **Feature**: Sistema de Plugins  
> **Versión**: 0.1.0  
> **Fecha**: 2025-12-20  
> **Epic**: SCRIPT-0.1.0  


---

## 1. Resumen Ejecutivo

Este informe documenta el diseño e implementación de un **sistema de plugins** para ALEPH Scriptorium, incluyendo la conversión del proyecto **ARG Board** como primer plugin instalado.

### Entregables

| Entregable | Descripción | Estado |
|------------|-------------|--------|
| Protocolo de Plugins | Especificación en `PLUGINS.md` | ✅ |
| Manifiesto de Plugin | Template `plugin.manifest.md` | ✅ |
| Plugin ARG Board | Tablero de Juego ARG instalado | ✅ |
| Agente Plugin Manager | Orquestador de instalación | ✅ |
| Backlog actualizado | SCRIPT-0.1.0 stories | ✅ |

---

## 2. Análisis Funcional

### 2.1. Problema a Resolver

ALEPH Scriptorium es un sistema de escritura política con infraestructura de agentes IA. Actualmente:

- La estructura es **monolítica**: todo el ingenio vive en `.github/`
- No existe mecanismo para **extender** capacidades sin modificar el core
- Los proyectos derivados (como ARG Board) viven **fuera** del sistema base

### 2.2. Solución Propuesta

Implementar un **sistema de plugins** que permita:

1. **Encapsular** funcionalidades en módulos independientes
2. **Instalar** plugins sin modificar el core de Scriptorium
3. **Desinstalar** plugins manteniendo integridad del sistema
4. **Versionar** plugins con semántica compatible con el backlog

### 2.3. Casos de Uso

```
┌─────────────────────────────────────────────────────────────┐
│                    ALEPH SCRIPTORIUM                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Agentes   │  │   Prompts   │  │Instructions │         │
│  │   (core)    │  │   (core)    │  │   (core)    │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              PLUGINS/ (extensiones)                  │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐    │   │
│  │  │ ARG_BOARD  │  │  NOTICIAS  │  │   FUTURO   │    │   │
│  │  │  (Motor    │  │  (Periód.) │  │   PLUGIN   │    │   │
│  │  │   ARG)     │  │            │  │            │    │   │
│  │  └────────────┘  └────────────┘  └────────────┘    │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 2.4. Requisitos Funcionales

| ID | Requisito | Prioridad |
|----|-----------|-----------|
| RF-01 | Instalar plugins desde carpeta externa | Alta |
| RF-02 | Registrar agentes del plugin en el sistema | Alta |
| RF-03 | Registrar prompts del plugin | Alta |
| RF-04 | Mantener aislamiento entre plugins | Media |
| RF-05 | Generar commits automáticos de instalación | Media |
| RF-06 | Validar compatibilidad de versiones | Baja |

---

## 3. Análisis Técnico

### 3.1. Arquitectura del Sistema de Plugins

```
.github/
├── PLUGINS.md              # Protocolo y especificación
├── plugins/                # Directorio de plugins instalados
│   ├── registry.json       # Registro de plugins activos
│   └── {plugin_id}/        # Plugin instalado
│       ├── manifest.md     # Metadatos del plugin
│       ├── agents/         # Agentes del plugin
│       ├── prompts/        # Prompts del plugin
│       ├── instructions/   # Instrucciones específicas
│       └── data/           # Datos/configuración del plugin
├── agents/
│   └── plugin-manager.agent.md  # Agente gestor de plugins
└── prompts/
    └── as_plugin-install.prompt.md # Prompt de instalación
```

### 3.2. Estructura de un Plugin

Cada plugin debe contener un **manifiesto** (`manifest.md`) con frontmatter YAML:

```yaml
---
id: arg-board
name: "Tablero de Juego ARG"
version: "1.0.0"
description: "Motor de juego ARG transmedia"
author: "Casa Arrakis"
scriptorium_version: ">=0.0.1"
dependencies: []
agents:
  - name: "Arrakis"
    file: "agents/arrakis.agent.md"
  - name: "BOE"
    file: "agents/boe.agent.md"
prompts:
  - name: "genesis"
    file: "prompts/arrakis-genesis.prompt.md"
instructions:
  - name: "mcp-arg"
    file: "instructions/arg-mcp.instructions.md"
---
```

### 3.3. Flujo de Instalación

```
┌──────────────┐     ┌─────────────────┐     ┌──────────────────┐
│  Plugin      │────▶│  Plugin Manager │────▶│  Scriptorium     │
│  (externo)   │     │  (validación)   │     │  (integración)   │
└──────────────┘     └─────────────────┘     └──────────────────┘
       │                     │                        │
       │ 1. manifest.md      │ 2. Validar deps       │ 3. Copiar a
       │    + estructura     │    + versiones        │    plugins/
       │                     │                        │
       └─────────────────────┴────────────────────────┘
                             │
                    4. Actualizar registry.json
                    5. Generar commit
```

### 3.4. Protocolo de Comunicación Plugin ↔ Core

Los plugins pueden:

1. **Exponer agentes**: Se registran en el sistema de handoffs del agente Aleph
2. **Exponer prompts**: Se indexan en `copilot-instructions.md`
3. **Declarar instrucciones**: Se añaden a la tabla de instrucciones
4. **Leer contexto**: Acceso read-only a `ARCHIVO/` y `PROYECTOS/`
5. **No modificar core**: El plugin NO puede alterar archivos fuera de su carpeta

### 3.5. Seguridad y Aislamiento

| Recurso | Permiso Plugin |
|---------|----------------|
| `.github/plugins/{id}/` | Read/Write |
| `.github/agents/` | Read (integración) |
| `.github/prompts/` | Read (integración) |
| `ARCHIVO/` | Read |
| `PROYECTOS/` | Read |
| `.github/DEVOPS.md` | Read |
| `package.json` | No access |

---

## 4. Plugin ARG Board: Conversión

### 4.1. Análisis del Plugin Fuente

**PLUGIN_ARG_BOARD** es un motor de juego ARG transmedia con:

| Componente | Descripción | Archivos |
|------------|-------------|----------|
| **8 ChatModes** | Agentes especializados | `.github/chatmodes/*.md` |
| **67 Prompts** | Comandos del sistema ARG | `.github/prompts/*.md` |
| **Documentación** | AlephScript 7GL Framework | `AS_DOCS/` |
| **Meta-builders** | Especificaciones de agentes | `META/*_builder.md` |
| **Ejemplos** | Instancias de juego | `GAMES/`, `EJEMPLOS/` |
| **Datos** | BOE, BDCs, Decoherence | `BOE/`, `ChatExport_*/` |

### 4.2. Mapeo de Conversión

```
PLUGIN_ARG_BOARD/                    →   .github/plugins/arg-board/
├── .github/chatmodes/               →   agents/
├── .github/prompts/                 →   prompts/
├── .github/copilot-instructions.md  →   instructions/
├── AS_DOCS/                         →   docs/
├── META/                            →   meta/
├── BOE/                             →   data/boe/
├── GAMES/                           →   data/games/
└── manifest.md (nuevo)              →   manifest.md
```

### 4.3. Agentes del Plugin

| ChatMode Original | Agente Convertido | Rol |
|-------------------|-------------------|-----|
| `arrakis.chatmode.md` | `arrakis.agent.md` | Director de Teatro ARG |
| `boe.chatmode.md` | `boe.agent.md` | Gestor de Boletín Oficial |
| `git.chatmode.md` | `git-arg.agent.md` | Orquestador de turnos |
| `decoherence.chatmode.md` | `decoherence.agent.md` | Validador de coherencia |
| `automata_heroe.chatmode.md` | `heroe.agent.md` | Jugador autónomo |
| `impressjs.chatmode.md` | `impressjs.agent.md` | Generador de tableros 3D |
| `mbox.chatmode.md` | `mbox.agent.md` | Extractor de emails |
| `platform_com.chatmode.md` | `platform-com.agent.md` | Comunicación multi-plataforma |

### 4.4. Handoffs al Core

El plugin ARG Board se integra con Aleph mediante handoffs:

```yaml
handoffs:
  - label: Abrir Teatro ARG
    agent: Arrakis
    prompt: Inicializa teatro transmedia con BOE, BDCs y sistema de turnos
  - label: Consultar BOE del juego
    agent: BOE
    prompt: Consulta disposiciones oficiales del tablero ARG activo
```

---

## 5. Implementación

### 5.1. Stories de la Épica SCRIPT-0.1.0

| Story ID | Título | Estado |
|----------|--------|--------|
| S01 | Crear protocolo PLUGINS.md | ✅ |
| S02 | Implementar plugin-manager.agent.md | ✅ |
| S03 | Crear template manifest.md | ✅ |
| S04 | Convertir ARG Board a plugin | ✅ |
| S05 | Integrar handoffs en Aleph | ✅ |
| S06 | Actualizar copilot-instructions.md | ✅ |

### 5.2. Archivos Generados

```
.github/
├── PLUGINS.md                           # Protocolo completo
├── BACKLOG-SCRIPTORIUM.md               # Actualizado con SCRIPT-0.1.0
├── copilot-instructions.md              # Actualizado con sección Plugins
├── agents/
│   └── plugin-manager.agent.md          # Nuevo agente
├── prompts/
│   └── as_plugin-install.prompt.md         # Nuevo prompt
└── plugins/
    ├── registry.json                    # Registro de plugins
    └── arg-board/                       # Plugin instalado
        ├── manifest.md
        ├── agents/
        ├── prompts/
        ├── instructions/
        ├── docs/
        ├── meta/
        └── data/
```

---

## 6. Commits Propuestos

### Commit 1: Diseño de Sistema de Plugins

```
feat(script/devops): añadir sistema de plugins a Scriptorium

Implementa protocolo de extensibilidad mediante plugins:
- Especificación completa en PLUGINS.md
- Agente plugin-manager para orquestación
- Template manifest.md para nuevos plugins
- Estructura plugins/ con registry.json

BREAKING: Nueva estructura de directorios en .github/

refs #SCRIPT-0.1.0-S01, #SCRIPT-0.1.0-S02, #SCRIPT-0.1.0-S03
```

### Commit 2: Plugin ARG Board

```
feat(script/plugins): instalar plugin "Tablero de Juego ARG"

Convierte PLUGIN_ARG_BOARD como primer plugin del ecosistema:
- 8 agentes especializados (Arrakis, BOE, Decoherence, etc.)
- 67 prompts de sistema ARG
- Framework AlephScript 7GL (AS_DOCS/)
- Integración con handoffs de Aleph

Incluye datos de ejemplo: BOE/, ChatExport/, GAMES/

refs #SCRIPT-0.1.0-S04, #SCRIPT-0.1.0-S05, #SCRIPT-0.1.0-S06
```

---

## 7. Riesgos y Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Conflicto de nombres de agentes | Media | Alto | Namespace por plugin_id |
| Plugins incompatibles | Baja | Medio | Validación de `scriptorium_version` |
| Corrupción de registry.json | Baja | Alto | Backup antes de cada operación |
| Plugin malicioso | Muy baja | Crítico | Solo plugins de fuentes confiables |

---

## 8. Próximos Pasos

1. **Validación**: Ejecutar plugin ARG Board en entorno de pruebas
2. **Documentación**: Guía de desarrollo de plugins
3. **Automatización**: CI/CD para validación de plugins
4. **Catálogo**: Crear índice público de plugins disponibles

---

## Apéndice A: Glosario

| Término | Definición |
|---------|------------|
| **Plugin** | Módulo de extensión autocontenido con agentes, prompts e instrucciones |
| **Manifest** | Archivo de metadatos que describe un plugin |
| **Registry** | Índice JSON de plugins instalados en el sistema |
| **Handoff** | Mecanismo de delegación entre agentes |
| **ARG** | Alternate Reality Game - Juego de Realidad Alternativa |
| **BOE** | Boletín Oficial del Estado - Registro inmutable del juego |
| **BDC** | Base De Conocimiento - Feeds conversacionales exportados |
| **7GL** | Lenguaje de 7ª generación (AlephScript) |

---

**Fin del Informe**

