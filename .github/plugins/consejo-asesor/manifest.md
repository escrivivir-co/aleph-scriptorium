---
id: consejo-asesor
name: "Consejo Asesor (ONFALO)"
version: "1.0.0"
description: "Sistema de produccion intelectual con 14 agentes especializados (voz, antagonistas, auditores, produccion, navegacion, inteligencia) que operan en 7 modos dialecticos. Integra pipeline de meta-relato para generar relatos desde materiales brutos."
author: "Aleph Scriptorium"
license: "MIT"
scriptorium_version: ">=0.0.1"
dependencies: []
optional_dependencies:
  - novelist
  - agent-creator
  - enciclopedia
agents:
  - name: "ConsejoAsesor"
    file: "agents/consejo-asesor.agent.md"
prompts:
  - name: "ca-debate"
    file: "prompts/ca-debate.prompt.md"
  - name: "ca-auditoria"
    file: "prompts/ca-auditoria.prompt.md"
  - name: "ca-produccion"
    file: "prompts/ca-produccion.prompt.md"
  - name: "ca-corresponsalia"
    file: "prompts/ca-corresponsalia.prompt.md"
  - name: "ca-crear-proyecto"
    file: "prompts/ca-crear-proyecto.prompt.md"
  - name: "ca-pipeline-relato"
    file: "prompts/ca-pipeline-relato.prompt.md"
instructions:
  - name: "consejo-asesor"
    file: "instructions/consejo-asesor.instructions.md"
handoffs:
  - label: "Abrir Consejo Asesor"
    agent: "ConsejoAsesor"
  - label: "Debatir tema con el consejo"
    agent: "ConsejoAsesor"
    prompt: "Inicia modo DEBATE"
  - label: "Auditar texto"
    agent: "ConsejoAsesor"
    prompt: "Inicia modo AUDITORIA"
  - label: "Producir articulo"
    agent: "ConsejoAsesor"
    prompt: "Inicia modo PRODUCCION con @articulador"
  - label: "Corresponsalia"
    agent: "ConsejoAsesor"
    prompt: "Inicia modo CORRESPONSALIA"
  - label: "Crear proyecto ONFALO"
    agent: "ConsejoAsesor"
    prompt: "Crea un nuevo proyecto con proyecto.config.md"
  - label: "Pipeline relato"
    agent: "ConsejoAsesor"
    prompt: "Ejecuta pipeline: laboratorio -> fichas -> relato"
source:
  type: "reference"
  path: "/Users/morente/Desktop/THEIA_PATH/ONFALO"
  note: "Placeholder minimo v1.0. Migracion exhaustiva de agentes ONFALO pendiente."
---

# Consejo Asesor (ONFALO)

Plugin que integra el sistema de consejo-asesor de ONFALO en el Scriptorium ALEPH.

## Que es

Un sistema de produccion intelectual basado en 14 agentes IA especializados que debaten, auditan y producen textos. Los proyectos creados con el consejo sirven de INPUT para el pipeline de meta-relato, generando relatos desde materiales brutos.

## Modos de operacion

| Modo | Agentes | Producto |
|------|---------|----------|
| DEBATE | protagonista + antagonista(s) | Transcripcion dialectica |
| AUDITORIA | verdad + sombra + registro | Informe + veredicto |
| PRODUCCION | articulador / integrador | Texto en voz del proyecto |
| NAVEGACION | portal | Presentacion personalizada |
| ESCRILEER | todos | Lectura viva iterativa |
| OBSERVATORIO | observatorio | Collage mediatico |
| CORRESPONSALIA | articulador + auditores + calibrador | Articulo periodistico |

## Pipeline

```
LABORATORIO/ (brutos) -> PRODUCCIONES/INPUT/ (fichas) -> PRODUCCIONES/OUTPUT/ (relatos)
```
