# Kickoff Agente - DocumentMachineSDK

## Mision

Preparar la parte 2 del broadcast final con foco en `DocumentMachineSDK`, nombre actual del producto antes conocido como `para-la-voz-sdk`, y aterrizar su papel dentro de la sesion propuesta de asesoria sobre crear grafos.

La tarea no es solo descriptiva: debe rastrear ramas concretas de la codebase externa, ubicar la `future-machine`, el `slot grafista`, los agentes y archivos de pipeline relacionados, y traducir eso a una propuesta de conversacion operativa via `bot_horse`.

## Entregable Principal

- Completar `sala/dossiers/scriptorium-bot-hub-integration/fuentes/broadcast/02-parte-scriptorium-documentmachinesdk.md`

## Contexto Base

- `DocumentMachineSDK` y `BotHubSDK` son productos de la codebase externa `ALEPH/.github`
- La sesion deseada no parte de una federacion real confirmada sino de una simulacion operativa propuesta a didac/Retro
- El canal que interesa al cierre de esa simulacion es el de Horse, porque soporta la conversacion estructurada

## Ramas A Rastrear En La Codebase Externa

- `main` — referencia actual, indicada como v2
- `mod/restitutiva` — referencia historica con gh-pages, indicada como v1
- `mod/legistlativa` — referencia indicada como v2

Si el nombre exacto de alguna rama no coincide, localizar la variante real y dejarlo anotado.

## Objetivos De Investigacion

### A. Ubicar El Producto

- Ubicar `DocumentMachineSDK` como pieza de Scriptorium.
- Determinar como se inserta en la pipeline de documentos, agentes o addons.

### B. Ubicar La Arquitectura Narrativa Y Operativa

- Encontrar el concepto de `future-machine`.
- Encontrar el `slot grafista`.
- Identificar los agentes que manejan cada paso de la pipeline.
- Identificar los archivos que soportan esa pipeline.

### C. Ubicar Addons Relevantes

- Buscar agentes de addons como `sala/dossier`, `media extraction` y similares.
- Identificar como se conectan con la pieza de dossier o con la conversacion viva.

### D. Aclarar La Peticion De Ayuda

- Explicar que se quiere ayuda para `dossier grafo-sdk`.
- Explicar que se quiere ayuda para `grafo-legalista-sdk`.
- Distinguir que se busca asesoria de diseño y pipeline, no solo integracion tecnica.

## Lo Que Debe Cubrir

- Renombrado a `DocumentMachineSDK`
- Papel del producto dentro del ecosistema Scriptorium
- Relacion con BotHubSDK como producto hermano
- Vinculo entre la sesion propuesta y la especialidad de Retro: `crear grafos`
- Valor narrativo y operativo del lore Rabbit/Spider/Horse aportado por el product owner
- Relacion entre `future-machine`, `slot grafista`, dossier y addons implicados
- Pistas concretas de agentes, archivos y pipeline en las ramas inspeccionadas

## Evidencia Disponible

- `sala/dossiers/scriptorium-bot-hub-integration/fuentes/kickoff/03-evidencia-product-owner-lore.md`
- `sala/dossiers/scriptorium-bot-hub-integration/fuentes/broadcast/00-plan-general.md`
- `README-SCRIPTORIUM.md`
- Cualquier referencia adicional localizada en la codebase externa `ALEPH/.github`

## Entregables Esperados Del Agente

- Completar `sala/dossiers/scriptorium-bot-hub-integration/fuentes/broadcast/02-parte-scriptorium-documentmachinesdk.md`
- Aportar lista breve de ramas, agentes y archivos clave encontrados
- Explicar el lugar de `future-machine` y del `slot grafista`
- Formular el encaje de la asesoria de Retro sobre grafos
- Proponer un protocolo IACM sencillo para esa sesion

## Hipotesis Inicial De Protocolo IACM Para La Sesion

Mirando por encima el IACM, la sesion puede dividirse en dos procesos:

1. Proceso simple de guia conversacional:
	- flujo tipo `QUESTION -> ANSWER`
	- sirve para orientar la conversacion en vivo y aclarar terminos, nodos, actores o pasos de pipeline

2. Proceso mas complejo de peticion documental:
	- flujo tipo `REQUEST -> ACKNOWLEDGE -> REPORT`
	- sirve para pedir un informe o devolucion estructurada de un lado u otro

## Conversacion Objetivo Via bot_horse

La sesion federada o simulada via `bot_horse` deberia servir para:

- presentar el `grafo-sdk`
- pedir inscripcion y registro scrum backlog en el dossier a partir de la conversacion en vivo
- diseñar un formulario de `PETICION DE DISENO SDS`
- pedir a Retro un `RETRO-HYPERGRAPH SDS` que permita montar el paquete y su upgrade posterior

## Preguntas A Resolver

- Como describir `DocumentMachineSDK` sin sobreafirmar implementacion si aun faltan referencias concretas.
- Que parte del lore del product owner entra como vision de producto y cual como operativa de sesion.
- Como conectar la asesoria sobre grafos con la escena de plaza de agentes del Scriptorium.
- En que rama y ficheros aparece realmente `future-machine`.
- Que agentes son responsables del dossier, del grafista y de los addons relevantes.
- Como nombrar el formulario SDS y el retorno `RETRO-HYPERGRAPH SDS` sin sobrediseñarlo todavia.

## Restricciones

- Tratar la nota del product owner como contexto y recurso de diseño, no como release note cerrada.
- Mantener compatible esta parte con una lectura corta dentro del broadcast final.
- Evitar duplicar lo ya cubierto en BotHubSDK salvo para explicar la relacion entre ambos productos.
- No afirmar hallazgos en ramas o addons que no esten efectivamente trazados.