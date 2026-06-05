# Network-Engine Platform Architecture

## Jerarquía Arquitectónica de Capas

Toda decisión técnica en la plataforma debe respetar el siguiente modelo de capas estrictas. 

Las dependencias siempre fluyen hacia abajo. Las capas superiores consumen las inferiores.

### Capa 0: Metalenguaje Anfitrión
**Tecnología:** TypeScript 6
* Es el estrato fundamental. Provee el sistema de tipos avanzado (DSLs tipadas, metamodelos) que permite la construcción del resto.

### Capa 1: Plataforma (Network-Engine)
**Paquetes:** `@network-engine/core`, adaptadores (`node`, `browser`), `apps`
* Proporciona los contratos, primitivas (Universe, Machine, Event) y los mecanismos de extensión (Plugins).
* No contiene lógica específica de ningún lenguaje derivado.

### Capa 2: Lenguajes Derivados
**Implementación:** (Ej. Aleph Language, Forcing Language)
* Consumen la Capa 1 para definir sus propias reglas semánticas.

### Capa 3: Máquinas
**Implementación:** Instancias ejecutables
* Sistemas corriendo bajo las reglas de un Lenguaje de la Capa 2.

### Capa 4: Universos
**Implementación:** Contenido en tiempo de ejecución
* Los datos, nodos, relaciones y hechos procesados por las Máquinas.

---

# Regla de Diseño Estratégico

Cuando aparezca una nueva funcionalidad técnica a implementar:

NO preguntar primero:

> ¿Cómo la implementamos?

Preguntar primero:

> ¿En qué capa pertenece?

* Plataforma (Capa 1)
* Lenguaje (Capa 2)
* Máquina (Capa 3)
* Universo (Capa 4)

Si pertenece a un lenguaje (Capa 2), **no debe** ser implementado en el núcleo de Network-Engine (Capa 1).

---

# Relaciones Técnicas y Fronteras

## Relación con TypeScript

Debemos utilizar las características modernas de TypeScript para explorar:

* DSLs tipadas (Template Literal Types, Branded Types)
* Metamodelos y sistemas declarativos
* Semánticas expresables mediante tipos
* Type-level programming

## Relación con XState

* **Frontera:** XState es la semántica operacional y herramienta de orquestación de la plataforma.
* **Restricción:** No debe confundirse con la lógica del núcleo en sí misma. Es una herramienta de coordinación de actores.

## Relación con RxJS

* **Frontera:** RxJS es la infraestructura reactiva fundamental (señales, eventos, observación).
* **Restricción:** No usar para almacenar estado ni para crear máquinas de estado encubiertas.

## Relación con Ontologías Externas (OWL/RDF)

* **Frontera:** Son formatos de serialización o huéspedes.
* **Restricción:** Nunca deben convertirse en el centro arquitectónico ni acoplarse al núcleo de procesamiento primario.
