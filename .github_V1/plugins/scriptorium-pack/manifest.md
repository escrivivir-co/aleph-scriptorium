---
id: scriptorium-pack
name: "ScriptoriumPack (Core Instructions)"
version: "1.0.0"
description: "Plugin que encapsula instrucciones core del Scriptorium con activación selectiva. Reduce context bloat al cargar solo instrucciones relevantes por tipo de tarea."
author: "Aleph Scriptorium"
license: "AIPL v1.0"

scriptorium_version: ">=1.0.0"
dependencies: []

agents:
  - name: "ScriptoriumPack"
    file: "agents/scriptorium-pack.agent.md"
    description: "Bridge agent para activación de instrucciones core."

instructions:
  - name: "ox-ontologia"
    file: "instructions/ox-ontologia.instructions.md"
    description: "Contexto del índice de agentes. Se activa con @ox."
    
  - name: "periodico"
    file: "instructions/periodico.instructions.md"
    description: "Método 5W+Banderas para edición de noticias."
    
  - name: "submodulo-integracion"
    file: "instructions/submodulo-integracion.instructions.md"
    description: "Protocolo de instalación y configuración de submódulos."
    
  - name: "indice-dry"
    file: "instructions/indice-dry.instructions.md"
    description: "Contrato para índices Funcional.md y Tecnico.md."
    
  - name: "cotrabajo"
    file: "instructions/cotrabajo.instructions.md"
    description: "Protocolo de sesiones colaborativas multi-agente."

prompts:
  - name: "iniciar-cotrabajo"
    file: "prompts/iniciar-cotrabajo.prompt.md"
    description: "Crear nueva sesión de cotrabajo."

handoffs:
  - label: "Activar contexto de agentes (@ox)"
    agent: "ScriptoriumPack"
  - label: "Activar modo edición periodística"
    agent: "ScriptoriumPack"
  - label: "Activar modo configuración submódulos"
    agent: "ScriptoriumPack"
  - label: "Iniciar sesión de cotrabajo"
    agent: "ScriptoriumPack"
---

# ScriptoriumPack — Core Instructions Plugin

> **Épica**: SCRIPT-1.29.0  
> **Propósito**: Mitigar context bloat mediante activación selectiva de instrucciones

## Problema Resuelto

Este plugin resuelve el problema de **context bloat** identificado en `critica-prompting-pathykar.md`:

| Métrica | Antes | Target |
|---------|-------|--------|
| Tokens por request | 117,877 | <50,000 |
| Ratio señal/ruido | ~3% | >50% |
| Attachments relevantes | 26% | >80% |

## Instrucciones Incluidas

### 1. ox-ontologia.instructions.md

- **Activación**: Cuando se trabaja con `@ox` o archivos de índice de agentes
- **applyTo**: `.github/agents/ox.agent.md, .github/agents/AGENTS.md`
- **Contenido**: Taxonomía de agentes, índice maestro, flujo de actualización

### 2. periodico.instructions.md

- **Activación**: Solo en sesiones de edición de noticias
- **applyTo**: `ARCHIVO/DISCO/**/conversacion*.md, ARCHIVO/NOTICIAS/**/2*.md`
- **Contenido**: Método 5W + 4 Banderas, actores Alice/Bob, flujos editar/publicar

### 3. submodulo-integracion.instructions.md

- **Activación**: Solo en operaciones de configuración de submódulos
- **applyTo**: `scripts/setup-*.sh, .gitmodules, **/README-SCRIPTORIUM.md`
- **Contenido**: Flujo de 8 fases, convenciones de naming, verificación

## Patrón de Optimización

Este plugin aplica el **isSummarized Pattern**:

> Las primeras 50-100 líneas de cualquier instrucción deben ser auto-contenidas y útiles sin leer el resto.

Ver [context-optimization.md](docs/context-optimization.md) para detalles.

## Uso

Las instrucciones se cargan automáticamente según los patrones `applyTo`. Para activación manual:

```
@scriptorium-pack [ox|periodico|submodulo]
```
