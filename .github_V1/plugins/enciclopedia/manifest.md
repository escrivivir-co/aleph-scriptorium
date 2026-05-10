---
id: enciclopedia
name: "Biblioteca de Tomos Enciclopédicos"
version: "1.0.0"
description: "Motor de consulta para tomos enciclopédicos cargados en ARCHIVO/ENCICLOPEDIA/. Permite búsquedas temporales y temáticas sobre índices de obras académicas."
author: "Aleph Scriptorium"
license: "MIT"

# Compatibilidad
scriptorium_version: ">=0.0.1"
dependencies: []

# Directorio de datos de runtime
data_directory: "ARCHIVO/PLUGINS/ENCICLOPEDIA/"

# Agentes exportados
agents:
  - name: "Bibliotecario"
    file: "agents/bibliotecario.agent.md"
    description: "Gestor principal de tomos - Coordina búsquedas y carga de nuevos tomos"
  
  - name: "HDF-ErnestoCastro"
    file: "agents/tomos/hdf-ernesto-castro.agent.md"
    description: "Agente del tomo 'Historia de la Filosofía' (Ernesto Castro, 2017) - 61 conferencias"

# Prompts exportados
prompts:
  - name: "cargar-tomo"
    file: "prompts/cargar-tomo.prompt.md"
    description: "Cargar un nuevo tomo a la biblioteca"
  
  - name: "buscar-temporal"
    file: "prompts/buscar-temporal.prompt.md"
    description: "Búsqueda por período histórico o siglo"
  
  - name: "buscar-tematica"
    file: "prompts/buscar-tematica.prompt.md"
    description: "Búsqueda transversal por tema o concepto"

# Instrucciones
instructions:
  - name: "enciclopedia"
    file: "instructions/enciclopedia.instructions.md"
    description: "Instrucciones del motor de consulta enciclopédica"

# Handoffs para integración con Aleph
handoffs:
  - label: "Consultar biblioteca de tomos"
    agent: "Bibliotecario"
    prompt: "Lista los tomos disponibles en la enciclopedia y permite búsquedas globales."
  
  - label: "Buscar en Historia de la Filosofía"
    agent: "HDF-ErnestoCastro"
    prompt: "Busca en el tomo 'Historia de la Filosofía' por período, filósofo o temática."

# Metadatos adicionales
tags:
  - enciclopedia
  - filosofía
  - academia
  - consulta
  - índices

# Tomos cargados (se actualiza al cargar nuevos)
tomos:
  - id: "hdf-ernesto-castro"
    nombre: "Historia de la Filosofía"
    autor: "Ernesto Castro"
    año: "2017-2018"
    capitulos: 61
    fuente: "ARCHIVO/ENCICLOPEDIA/Historia de la filosofía (Ernesto Castro, Madrid, 2017)/"
---

# 📚 Biblioteca de Tomos Enciclopédicos

Motor de consulta para tomos enciclopédicos del proyecto. Permite navegar índices de obras académicas mediante búsquedas temporales (por período histórico) y temáticas (por concepto transversal).

## Propósito

El plugin **no pretende**:
- Transcribir o resumir el contenido de los materiales
- Sustituir la consulta del material original
- Ser un motor de búsqueda de texto completo

Su función es **orientar**: dado un interés, señalar qué capítulo consultar.

## Tomos Disponibles

### Historia de la Filosofía (Ernesto Castro, 2017)

Serie de 61 conferencias de audio que recorren la historia de la filosofía occidental desde Aristóteles hasta Deleuze.

**Períodos cubiertos**:
- Filosofía Antigua (caps. 1-8)
- Filosofía Medieval (caps. 9-16)
- Renacimiento y Modernidad Temprana (caps. 17-20)
- Racionalismo y Empirismo (caps. 21-29)
- Idealismo Alemán (caps. 30-35)
- Filosofía del s. XIX (caps. 36-45)
- Filosofía del s. XX (caps. 46-61)

## Uso

### Consulta General

```
@Bibliotecario ¿Qué tomos tienes disponibles?
```

### Búsqueda Temporal

```
@HDF-ErnestoCastro ¿Qué filósofos del siglo XVII?
```

### Búsqueda Temática

```
@HDF-ErnestoCastro ¿Quién habla de ética?
```

### Referencia Directa

```
@HDF-ErnestoCastro Dame info sobre Hegel
```

## Arquitectura

```
┌─────────────────┐
│  Bibliotecario  │ ← Gestor global
└────────┬────────┘
         │ delega
         ▼
┌─────────────────┐
│ Agente de Tomo  │ ← Conoce un índice específico
└─────────────────┘
```

Cada tomo cargado genera un agente especializado que conoce su índice y puede responder consultas sobre él.

---

*Plugin desarrollado para ALEPH Scriptorium*
