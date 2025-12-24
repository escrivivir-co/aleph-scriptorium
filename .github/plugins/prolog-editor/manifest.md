---
id: prolog-editor
name: "Editor de Lógica Prolog"
version: "1.0.0"
description: "Plugin para diseñar y ejecutar reglas Prolog que condicionan el comportamiento de agentes y obras. Sistema de asistencia para generar plantillas de código Prolog para usuarios académicos."
author: "Aleph Scriptorium"
license: "MIT"

scriptorium_version: ">=1.0.0"
dependencies: []
optional_dependencies:
  - blockly-editor
  - agent-creator
  - arg-board
  - as-gym

agents:
  - name: "PrologEditor"
    file: "agents/prolog-editor.agent.md"
    description: "Agente principal para gestión de templates y reglas Prolog"

prompts:
  - name: "crear-template-prolog"
    file: "prompts/crear-template-prolog.prompt.md"
    description: "Crear un nuevo template Prolog asistido"
  - name: "ejecutar-consulta"
    file: "prompts/ejecutar-consulta.prompt.md"
    description: "Ejecutar consulta Prolog contra motor SWI-Prolog"
  - name: "listar-templates"
    file: "prompts/listar-templates.prompt.md"
    description: "Listar templates disponibles"
  - name: "importar-reglas"
    file: "prompts/importar-reglas.prompt.md"
    description: "Importar archivo .pl al repositorio de reglas"
  - name: "exportar-blockly-prolog"
    file: "prompts/exportar-blockly-prolog.prompt.md"
    description: "Transpilar rutina Blockly a código Prolog"

instructions:
  - name: "prolog-editor"
    file: "instructions/prolog-editor.instructions.md"

handoffs:
  - label: "Crear template Prolog"
    agent: "PrologEditor"
    prompt: "Genera un nuevo template Prolog con predicados para el dominio especificado."
  - label: "Ejecutar consulta Prolog"
    agent: "PrologEditor"
    prompt: "Ejecuta una consulta Prolog usando el motor SWI-Prolog."
  - label: "Exportar Blockly a Prolog"
    agent: "PrologEditor"
    prompt: "Transpila una rutina Blockly a código Prolog equivalente."
  - label: "Listar templates"
    agent: "PrologEditor"
    prompt: "Lista los templates Prolog disponibles en el sistema."
  - label: "Importar reglas .pl"
    agent: "PrologEditor"
    prompt: "Importa un archivo .pl al repositorio de reglas del Scriptorium."
---

# Plugin: Editor de Lógica Prolog

## Propósito

Este plugin proporciona capacidades de programación lógica declarativa para el Scriptorium, permitiendo:

1. **Crear templates Prolog**: Asistencia para generar plantillas de código Prolog
2. **Ejecutar consultas**: Motor SWI-Prolog para evaluar predicados
3. **Exportar desde Blockly**: Transpilar lógica visual a código Prolog
4. **Integrar con agentes**: Reglas Prolog que condicionan comportamiento
5. **Condicionar obras**: Predicados como condiciones de transición

## Perfil de Usuario

> **Académico con alto conocimiento de Prolog**

Este plugin está diseñado para usuarios que:
- Conocen la sintaxis y semántica de Prolog
- Entienden programación lógica declarativa
- Buscan alternativas a JavaScript imperativo
- Quieren lógica formal en sus agentes/obras

## Requisitos del Sistema

### Obligatorios
- Node.js 18+
- ARCHIVO/PLUGINS/PROLOG_EDITOR/ (se crea automáticamente)

### Opcionales (para ejecución)
- SWI-Prolog 9.x (`brew install swi-prolog` en macOS)
- Binding swipl (`npm install swipl` en el submódulo)

## Integraciones

| Plugin | Integración |
|--------|-------------|
| BlocklyEditor | Exportar rutinas visuales a código Prolog |
| AGENT_CREATOR | Campo `prologRules` en recetas |
| ARG_BOARD | Condiciones Prolog en estadios |
| AS-GYM | Paradigma SBR (Sistema Basado en Reglas) |

## Templates Incluidos

| Template | Descripción |
|----------|-------------|
| `state-machine` | Máquina de estados con predicados de transición |
| `agent-behavior` | Reglas de comportamiento para agentes |
| `obra-conditions` | Condiciones para estadios de obras |

## Submódulo Fuente

`iot-sbr-logica-para-bots` — Sistema de gestión de reglas Prolog con:
- Backend Express.js + SWI-Prolog
- Frontend Angular
- API REST para CRUD de reglas
- Parser de predicados exportados

