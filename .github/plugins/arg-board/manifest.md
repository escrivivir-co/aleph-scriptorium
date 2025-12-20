---
id: arg-board
name: "Tablero de Juego ARG Transmedia"
version: "1.0.0"
description: "Motor conversacional para orquestar agentes y humanos en juegos de Realidad Alternativa (ARG) sobre tableros transmedia con repositorios Git, BOE y BDCs."
author: "Casa Arrakis"
license: "MIT"
repository: "https://github.com/escrivivir-co/vscode-alephscript-extension"

# Compatibilidad
scriptorium_version: ">=0.0.1"
dependencies: []

# Framework
framework: "AlephScript 7GL"
paradigm: "Teatro Digital / DevOps Narrativo"

# Agentes exportados
agents:
  - name: "Arrakis"
    file: "agents/arrakis.agent.md"
    description: "Director de Teatro ARG - Orquesta partidas y coordina actores"
    archetype: "HERALD"
  
  - name: "BOE"
    file: "agents/boe.agent.md"
    description: "Gestor del Boletín Oficial - Registro inmutable de eventos y decisiones"
    archetype: "MENTOR"
  
  - name: "GitARG"
    file: "agents/git-arg.agent.md"
    description: "Orquestador de turnos - Gestiona commits, PRs y ramas como movimientos"
    archetype: "TRICKSTER"
  
  - name: "Decoherence"
    file: "agents/decoherence.agent.md"
    description: "Validador de coherencia - Verifica consistencia entre BOE, BDC y código"
    archetype: "SHADOW"
  
  - name: "AutomataHeroe"
    file: "agents/heroe.agent.md"
    description: "Agente autónomo que sigue el Camino del Héroe en 12 etapas"
    archetype: "SHAPESHIFTER"
  
  - name: "ImpressJS"
    file: "agents/impressjs.agent.md"
    description: "Generador de tableros 3D navegables desde conversaciones"
    archetype: "ALLY"
  
  - name: "MBox"
    file: "agents/mbox.agent.md"
    description: "Extractor de emails - Convierte archivos MBOX a formato BDC"
    archetype: "ALLY"
  
  - name: "PlatformCom"
    file: "agents/platform-com.agent.md"
    description: "Comunicación multi-plataforma - Sincroniza feeds de Telegram, Discord, Oasis"
    archetype: "GODDESS"

# Prompts exportados (selección principal)
prompts:
  - name: "arrakis-genesis"
    file: "prompts/arrakis-genesis.prompt.md"
    description: "Inicializar un nuevo teatro ARG"
  
  - name: "arrakis-turno-auto"
    file: "prompts/arrakis-turno-auto.prompt.md"
    description: "Avanzar turno automáticamente"
  
  - name: "boe-init"
    file: "prompts/boe-init.prompt.md"
    description: "Inicializar BOE para un tablero"
  
  - name: "boe-agregar"
    file: "prompts/boe-agregar.prompt.md"
    description: "Agregar disposición al BOE"
  
  - name: "deco-scan-lite"
    file: "prompts/deco-scan-lite.prompt.md"
    description: "Escaneo rápido de coherencia"
  
  - name: "heroe-genesis"
    file: "prompts/heroe-genesis.prompt.md"
    description: "Iniciar camino del héroe para un agente"
  
  - name: "git-init-turno"
    file: "prompts/git-init-turno.prompt.md"
    description: "Iniciar nuevo turno de juego"

# Instrucciones
instructions:
  - name: "arg-engine"
    file: "instructions/arg-engine.instructions.md"
    description: "Instrucciones del motor ARG"

# Handoffs para integración con Aleph
handoffs:
  - label: "Abrir Teatro ARG"
    agent: "Arrakis"
    prompt: "Inicializa un teatro transmedia con BOE, BDCs y sistema de turnos para juego ARG."
  
  - label: "Consultar BOE del juego"
    agent: "BOE"
    prompt: "Consulta disposiciones oficiales del tablero ARG activo."
  
  - label: "Validar coherencia del tablero"
    agent: "Decoherence"
    prompt: "Ejecuta validación de coherencia entre BOE, BDC y código del tablero."
  
  - label: "Generar tablero 3D"
    agent: "ImpressJS"
    prompt: "Transforma conversaciones BDC en presentación 3D navegable con impress.js."

# Metadatos adicionales
tags:
  - ARG
  - transmedia
  - teatro-digital
  - monomito
  - devops-narrativo
  - 7GL

sources:
  - "PLUGIN_ARG_BOARD/.github/chatmodes/"
  - "PLUGIN_ARG_BOARD/.github/prompts/"
  - "PLUGIN_ARG_BOARD/AS_DOCS/"
  - "PLUGIN_ARG_BOARD/META/"
---

# 🎮 Tablero de Juego ARG Transmedia

Motor conversacional para orquestar agentes (IA) y humanos en juegos de tipo **ARG (Alternate Reality Game)** sobre tableros transmedia.

## Componentes del Sistema

### Tableros
- **Repositorios Git** como tableros de juego
- **BOE (Boletín Oficial del Estado)** como fuente de verdad y memoria histórica
- **BDC (Bases de Conocimiento)** como feeds conversacionales

### Plataformas
- Oasis (Scuttlebutt)
- Telegram
- Discord
- Twitch

## Arquitectura AlephScript 7GL

El motor utiliza **AlephScript**, un lenguaje de 7ª generación que trata el desarrollo de software como **producción teatral**:

```
┌─────────────────────────────────────────────────┐
│           MÁQUINA DE ESTADOS TEATRO             │
├─────────────────────────────────────────────────┤
│  GENESIS → CASTING → EN_CARTEL → CLAUSURADO    │
└─────────────────────────────────────────────────┘
```

### 8 Arquetipos DevOps

| Arquetipo | Rol DevOps | Fase Principal |
|-----------|------------|----------------|
| HERALD | Product Owner | GENESIS |
| THRESHOLD_GUARDIAN | Scrum Master | GENESIS→CASTING |
| SHAPESHIFTER | Frontend Dev | CASTING→EN_CARTEL |
| ALLY | Backend Dev | CASTING→EN_CARTEL |
| MENTOR | Database Admin | EN_CARTEL |
| TRICKSTER | DevOps Engineer | EN_CARTEL→CLAUSURADO |
| SHADOW | QA/Tester | EN_CARTEL |
| GODDESS | SysAdmin | GENESIS+CLAUSURADO |

## Uso Básico

### Iniciar Teatro

```
@Arrakis /arrakis-genesis
```

### Registrar Obra

```
@Arrakis /arrakis-obra-register
```

### Avanzar Turno

```
@GitARG /git-init-turno
```

### Validar Coherencia

```
@Decoherence /deco-scan-lite
```

## Documentación

- [docs/00_INDEX.md](docs/00_INDEX.md) - Índice de documentación AlephScript
- [meta/arrakis_builder.md](meta/arrakis_builder.md) - Especificación del agente director

## Inspiración

El sistema se inspira en el **planeador de Conway** como metáfora del hacking:

> "El hacking se trata de algo simple (las reglas), y un hacker toma eso. Luego comienzan a empujar, pinchar, romper, experimentar con las reglas simples. En este caos algo sucede: el juego rompe sus ataduras."

---

*Plugin desarrollado para ALEPH Scriptorium*

