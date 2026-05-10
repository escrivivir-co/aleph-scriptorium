---
id: agent-creator
name: "Creador de Agentes Especializados"
version: "1.1.0"
description: "Plugin para crear, editar e instalar agentes personalizados combinando agentes base con fuentes de datos del ARCHIVO/DISCO. Integración opcional con ARG_BOARD para despliegue como personajes."
author: "Aleph Scriptorium"
license: "AIPL"

# Compatibilidad
scriptorium_version: ">=0.0.1"
dependencies: []
optional_dependencies:
  - id: "arg-board"
    reason: "Permite desplegar agentes creados como personajes en obras del Teatro ARG"
  - id: "foro-scraper"
    reason: "Permite solicitar más datos de fuentes de scraping activas"

# Recursos exportados
agents:
  - name: "AgentCreator"
    file: "agents/agent-creator.agent.md"
    description: "Orquestador principal para creación de agentes especializados"

prompts:
  - name: "crear-agente"
    file: "prompts/crear-agente.prompt.md"
    description: "Inicia el proceso de creación de un nuevo agente"
  - name: "editar-agente"
    file: "prompts/editar-agente.prompt.md"
    description: "Edita un agente existente añadiendo fuentes o capacidades"
  - name: "fusionar-agentes"
    file: "prompts/fusionar-agentes.prompt.md"
    description: "Combina dos o más agentes en uno especializado"
  - name: "conectar-fuente"
    file: "prompts/conectar-fuente.prompt.md"
    description: "Conecta una fuente de datos (DISCO/ARCHIVO) a un agente"
  - name: "desplegar-en-arg"
    file: "prompts/desplegar-en-arg.prompt.md"
    description: "Despliega un agente como personaje en una obra del Teatro ARG"
  - name: "validar-agente"
    file: "prompts/validar-agente.prompt.md"
    description: "Protocolo de validación en 3 fases para agentes creados"
  - name: "analizar-alineamiento"
    file: "prompts/analizar-alineamiento.prompt.md"
    description: "Análisis de alineamiento (Fase C) con scoring y veredicto"

instructions:
  - name: "agent-creator"
    file: "instructions/agent-creator.instructions.md"
  - name: "validacion-agente"
    file: "instructions/validacion-agente.instructions.md"

# Integración con Aleph
handoffs:
  - label: "Crear nuevo agente especializado"
    agent: "AgentCreator"
    prompt: "Inicia el proceso de creación de un agente especializado a partir de agentes base y fuentes de datos."
  - label: "Editar agente existente"
    agent: "AgentCreator"
    prompt: "Modifica un agente existente añadiendo nuevas fuentes de conocimiento o capacidades."
  - label: "Fusionar agentes"
    agent: "AgentCreator"
    prompt: "Combina las capacidades de múltiples agentes en uno nuevo especializado."
  - label: "Conectar fuente de datos"
    agent: "AgentCreator"
    prompt: "Conecta una carpeta de DISCO o ARCHIVO como fuente de conocimiento para un agente."
  - label: "Desplegar en Teatro ARG"
    agent: "AgentCreator"
    prompt: "Despliega un agente creado como personaje en una obra del Teatro ARG (requiere plugin ARG_BOARD)."
  - label: "Validar agente creado"
    agent: "AgentCreator"
    prompt: "Ejecuta protocolo de validación en 3 fases para verificar alineamiento del agente con sus fuentes."
  - label: "Analizar alineamiento"
    agent: "Aleph"
    prompt: "Analiza cuestionario completado y emite veredicto de alineamiento (Fase C del protocolo)."
---

# Plugin: Agent Creator

## Propósito

Este plugin permite **crear agentes especializados** mediante la combinación de:

1. **Agentes base**: Uno o varios agentes existentes del Scriptorium
2. **Fuentes de datos**: Carpetas de DISCO o ARCHIVO con conocimiento específico

## Casos de uso

### Especialización temática
Crear un agente que combine las capacidades de auditoría de Yellowflag con conocimiento específico de un tema (ej: criterio de demarcación científica).

### Agentes de dominio
Crear agentes expertos en un dominio particular a partir de material scrapeado (foros, blogs) + agentes metodológicos.

### Extensión dinámica
Añadir nuevas fuentes de conocimiento a agentes existentes sin modificar el agente original.

## Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                    AgentCreator                          │
│                   (Orquestador)                          │
└─────────────────────┬───────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
┌───────────┐  ┌───────────┐  ┌───────────┐
│ Agentes   │  │ Fuentes   │  │  Output   │
│   Base    │  │  Datos    │  │  Nuevo    │
│           │  │           │  │  Agente   │
├───────────┤  ├───────────┤  ├───────────┤
│@yellowflag│  │DISCO/     │  │agents/    │
│@blueflag  │  │ARCHIVO/   │  │created/   │
│@redflag   │  │PLUGINS/   │  │           │
│etc.       │  │           │  │           │
└───────────┘  └───────────┘  └───────────┘
```

## Flujo de creación

### 1. Selección de agentes base
El usuario indica qué agente(s) servirán como fundamento metodológico.

### 2. Conexión de fuentes
El usuario indica qué carpetas de DISCO/ARCHIVO contienen el conocimiento a integrar.

### 3. Definición de especialización
El usuario describe qué capacidad específica tendrá el nuevo agente.

### 4. Generación
AgentCreator genera el archivo `.agent.md` con:
- System prompt especializado
- Fuentes de verdad conectadas
- Handoffs heredados + nuevos
- Tests de auditoría específicos

### 5. Instalación
El nuevo agente se guarda en `ARCHIVO/PLUGINS/AGENT_CREATOR/agents/created/`.

## Conexión con FORO_SCRAPER

Cuando una fuente de datos proviene de un job de scraping activo:
- El agente creado puede solicitar más páginas
- El estado del job se sincroniza con las necesidades del agente
- Handoff bidireccional: Agente → Scraper (pedir más datos)

## Ejemplo: Yellowflag + Foro de Demarcación

```
Agente base: @yellowflag (auditoría de límites, gnosis, cuadrantes)
Fuente: DISCO/Foro_t8941392/ (criterio de demarcación, Popper, sincronicidades)

Resultado: @tarotista
- Especialista en límites del conocimiento científico
- Conoce el debate Popper/Kuhn/Feyerabend
- Puede auditar propuestas desde la perspectiva de demarcación
- Integra sincronicidades (Pauli/Jung) con teoría integral
```

## Almacenamiento

```
ARCHIVO/PLUGINS/AGENT_CREATOR/
├── agents/
│   └── created/           # Agentes generados
│       └── {nombre}.agent.md
├── recipes/               # Recetas de combinación guardadas
│   └── {nombre}.recipe.json
└── logs/                  # Historial de creaciones
    └── creation-log.json
```
