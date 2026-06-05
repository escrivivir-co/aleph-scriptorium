MCP.instructions.md
===================

Contexto
--------

Este proyecto utiliza Model Context Protocol (MCP) como arquitectura de contexto.

No debe interpretarse MCP como un simple sistema de Tool Calling.

Toda propuesta debe asumir la especificación moderna de MCP.

* * * * *

Corrección Fundamental
======================

Incorrecto:

```
LLM ↓Tools
```

* * * * *

Correcto:

```
LLM ↓Context System ↓Resources ↓Prompts ↓Sampling ↓Tools
```

* * * * *

Filosofía
=========

Las tools ejecutan acciones.

Los resources representan conocimiento.

Los prompts representan protocolos de interacción.

El sampling representa delegación cognitiva.

* * * * *

Regla Fundamental
=================

Antes de diseñar una tool preguntar:

> ¿Esto es realmente una acción o es información?

Si es información:

probablemente debe ser un Resource.

* * * * *

Jerarquía MCP
=============

Nivel 1
-------

Resources

* * * * *

Nivel 2
-------

Resource Templates

* * * * *

Nivel 3
-------

Prompts

* * * * *

Nivel 4
-------

Sampling

* * * * *

Nivel 5
-------

Tools

* * * * *

Resource First
==============

La abstracción principal es:

```
Resource
```

No:

```
Tool
```

* * * * *

Qué es un Resource
==================

Un resource representa contexto disponible para razonamiento.

Ejemplos:

```
ontology://aleph
```

```
universe://current
```

```
workspace://dossiers/aleph
```

```
config://runtime
```

```
graph://ontology
```

* * * * *

Qué NO es un Resource
=====================

Operaciones.

Ejemplos:

```
createUniverse()deleteNode()saveOntology()
```

Eso son Tools.

* * * * *

Resource Templates
==================

Los Resource Templates son generadores de contexto.

Ejemplos:

```
ontology://{ontologyId}
```

```
universe://{universeId}
```

```
workspace://{workspaceId}
```

* * * * *

Regla
=====

Cuando aparezcan identificadores dinámicos:

preferir Resource Templates.

No multiplicar recursos concretos.

* * * * *

Prompt First Design
===================

Antes de crear una Tool preguntar:

> ¿Podría resolverse mediante un Prompt MCP?

Muchas interacciones son semánticas.

No operacionales.

* * * * *

Ejemplo
=======

Incorrecto:

```
Tool:GenerateOntology()
```

* * * * *

Correcto:

```
Prompt:Design an ontology from...
```

* * * * *

Sampling
========

Sampling no es una curiosidad.

Sampling es un mecanismo arquitectónico.

* * * * *

Interpretación
==============

Sampling permite:

```
Modelo ↓Modelo
```

No:

```
Usuario ↓Tool
```

* * * * *

Regla
=====

Cuando una tarea requiera:

-   reflexión
-   revisión
-   crítica
-   evaluación
-   planificación

considerar Sampling antes que Tools.

* * * * *

Tools Last
==========

Las Tools son el último recurso.

Sólo deben existir cuando hay:

-   efectos
-   mutaciones
-   IO
-   llamadas externas

* * * * *

Anti-Pattern
============

Incorrecto:

```
Todo es una Tool
```

* * * * *

Resultado:

```
200 endpoints disfrazados
```

* * * * *

Arquitectura Recomendada
========================

```
Resources ↓Prompts ↓Sampling ↓Tools
```

* * * * *

MCP y Network-Engine
====================

Network-Engine es especialmente compatible con MCP.

Porque:

```
UniversosOntologíasMáquinasActoresDossiersRFCs
```

son principalmente contexto.

No operaciones.

* * * * *

Ejemplo Aleph
=============

Incorrecto:

```
createAlephUniverse()expandAlephUniverse()describeAlephUniverse()
```

* * * * *

Correcto:

```
Resource:aleph://universes/{id}Prompt:Design expansion strategySampling:Critique expansion strategyTool:persist expansion
```

* * * * *

Dossiers
========

Los Dossiers deben exponerse preferentemente como Resources.

Ejemplos:

```
dossier://aleph/vision
```

```
dossier://aleph/ontology
```

```
dossier://aleph/runtime
```

* * * * *

RFCs
====

Los RFCs deben considerarse Resources de primer nivel.

* * * * *

Prompt Engineering
==================

Un Prompt MCP es un protocolo.

No una cadena de texto.

Debe:

-   declarar objetivo
-   declarar inputs
-   declarar outputs
-   declarar contexto requerido

* * * * *

Tool Design Rule
================

Antes de crear una Tool preguntar:

Pregunta 1
----------

¿Podría ser un Resource?

* * * * *

Pregunta 2
----------

¿Podría ser un Prompt?

* * * * *

Pregunta 3
----------

¿Podría ser Sampling?

* * * * *

Pregunta 4
----------

¿Existe realmente una mutación?

Sólo si la respuesta es sí:

crear Tool.

* * * * *

REST Analogy
============

Pensamiento incorrecto:

```
Tool = Endpoint
```

* * * * *

Pensamiento correcto:

```
Resource = DominioPrompt = Query LanguageSampling = Reasoning LayerTool = Mutation Layer
```

* * * * *

Checklist Anti-Legacy
=====================

Antes de introducir una nueva Tool:

□ ¿Existe ya un Resource equivalente?

□ ¿Existe ya un Resource Template?

□ ¿Podría resolverse con un Prompt?

□ ¿Podría resolverse mediante Sampling?

□ ¿Existe una mutación real?

□ ¿Estoy creando una Tool o un endpoint REST disfrazado?

□ ¿Estoy modelando contexto o acciones?

* * * * *

Objetivo
========

No queremos utilizar MCP como un catálogo de herramientas.

Queremos utilizar MCP como un sistema declarativo de gestión de contexto capaz de exponer conocimiento, protocolos de razonamiento y capacidades operativas de forma desacoplada.

Las Tools son una consecuencia de la arquitectura.

No su centro.

* * * * *

Y para tu caso concreto de **Network-Engine**, añadiría una regla extra muy fuerte:

> **Todo lenguaje derivado debe exponer primero Resources y Resource Templates. Las Tools sólo aparecen cuando la semántica del lenguaje exige mutación o efectos externos.**

Porque eso obliga al agente a pensar:

```
¿Qué conocimiento existe?
```

antes de pensar:

```
¿Qué endpoint implemento?
```

que es exactamente el cambio mental que suele faltar cuando alguien viene de REST, bots o tool-calling clásico.