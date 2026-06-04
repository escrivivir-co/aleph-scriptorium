estoy implementando un editor de common kads en typescript (angular) Quiero saber: - a) hay alguno ya hecho FOSS - b) para los formularios, hay un repo donde pueda descargar las plantillas o no cada implementación los crea? ¿hay un descargable de las specs?

Si estás construyendo un editor CommonKADS en Angular, la respuesta corta es:

### a) ¿Existe algún editor CommonKADS FOSS ya hecho?

No parece existir hoy un editor CommonKADS moderno, activo y ampliamente adoptado comparable a lo que es un BPMN Modeler o un UML Editor. He buscado proyectos recientes y lo que aparece son principalmente:

-   Repositorios académicos que usan CommonKADS como metodología, no como editor visual.
-   Material docente, PDFs, ontologías y ejemplos.
-   La metodología oficial y documentación histórica.

Históricamente existieron herramientas comerciales y académicas asociadas a KADS/CommonKADS, pero no he encontrado un equivalente FOSS moderno mantenido activamente.

De hecho, si haces un editor Angular hoy probablemente estés entrando en un nicho con muy poca competencia.

* * * * *

### b) ¿Existen plantillas descargables para los formularios?

Sí, y aquí está la parte interesante.

CommonKADS define una serie de modelos y worksheets bastante estandarizados:

-   Organization Model (OM)
    -   OM-1 Problems & Opportunities
    -   OM-2 Process Aspects
    -   OM-3 Task Aspects
    -   OM-4 Knowledge Assets
    -   OM-5 Communication Aspects
-   Task Model (TM)
-   Agent Model (AM)
-   Knowledge Model (KM)
-   Communication Model (CM)
-   Design Model (DM)

Las worksheets forman parte de la metodología y aparecen en el libro y en múltiples materiales académicos.

Por ejemplo, el worksheet **OM-1 Problems and Opportunities** aparece explícitamente en documentación pública.

* * * * *

### ¿Hay un repositorio con las plantillas en JSON/XML?

No parece haber un estándar técnico oficial tipo:

```
{  "model": "OM-1",  "fields": [...]}
```

CommonKADS estandariza:

-   los modelos,
-   las hojas de trabajo,
-   la semántica,

pero **no un formato de intercambio moderno** para herramientas.

Por eso cada implementación suele definir:

-   su propio metamodelo,
-   su propio JSON,
-   su propia persistencia.

* * * * *

### Lo que yo haría para un editor Angular

Definiría un metamodelo propio:

```
interface Worksheet {  id: string;  type: 'OM1' | 'OM2' | 'TM1' | 'AM1' | 'KM';  sections: Section[];}interface Section {  id: string;  title: string;  fields: Field[];}interface Field {  id: string;  label: string;  type: 'text' | 'textarea' | 'table' | 'select';  value: any;}
```

Y después tendría una librería de plantillas:

```
const OM1_TEMPLATE: Worksheet = { ... };const OM2_TEMPLATE: Worksheet = { ... };
```

que cargarías dinámicamente.

* * * * *

### ¿Dónde sacar las especificaciones completas?

Las fuentes más útiles son:

-   [CommonKADS.org](https://commonkads.org/?utm_source=chatgpt.com) (visión general oficial)
-   El libro **Knowledge Engineering and Management: The CommonKADS Methodology**, que es la referencia principal.
-   Materiales académicos que incluyen las worksheets OM/TM/AM/KM y ejemplos de cumplimentación.

Si quieres, puedo ayudarte a reconstruir las plantillas OM-1 ... OM-5, TM, AM y KM en un esquema JSON/TypeScript listo para Angular Reactive Forms. Eso suele ahorrar bastante trabajo porque la estructura es bastante repetitiva.

ok, recibido. Y luego, para esto mismo habia unos npm que hacian maquinas de estado, cual es el state of the art foss

Si tu editor CommonKADS va a tener workflows, validaciones, navegación entre modelos o asistentes ("wizard"), usar una máquina de estados suele ser una muy buena idea.

### El estado del arte FOSS actualmente

#### 1\. XState ⭐ (la referencia actual)

Es, con diferencia, la librería más conocida y madura para Statecharts en TypeScript.

Ventajas:

-   Basada en Statecharts de Harel (mucho más potente que una FSM simple).
-   Tipado fuerte en TypeScript.
-   Estados jerárquicos.
-   Estados paralelos.
-   Guards.
-   Invocación de servicios asíncronos.
-   Persistencia e hidratación.
-   Visualización de diagramas.

Ejemplo:

```
const machine = createMachine({  initial: 'editing',  states: {    editing: {      on: {        VALIDATE: 'validating'      }    },    validating: {      invoke: {        src: validateWorksheet,        onDone: 'valid',        onError: 'invalid'      }    },    valid: {},    invalid: {}  }});
```

Para Angular sigue siendo probablemente la opción más sólida.

* * * * *

#### 2\. [Robot3](https://github.com/matthewp/robot?utm_source=chatgpt.com)

Muy pequeña y elegante.

Ventajas:

-   Muy poco peso.
-   API funcional.
-   Fácil de entender.

Desventajas:

-   Menos ecosistema.
-   Sin tooling visual serio.
-   Menos expresiva para máquinas complejas.

La usaría para aplicaciones relativamente simples.

* * * * *

#### 3\. [Machina.js](https://github.com/ifandelse/machina.js?utm_source=chatgpt.com)

Fue popular hace años.

Hoy la consideraría más una pieza histórica que una opción moderna para un proyecto nuevo.

* * * * *

#### 4\. Signals + Store (sin FSM)

Muchos equipos Angular 17+ han abandonado FSM explícitas y usan:

-   Angular Signals
-   NgRx Signal Store
-   Component Store
-   RxJS

para modelar estado.

Funciona bien cuando el flujo no es muy formal.

* * * * *

Para un editor CommonKADS
-------------------------

Yo distinguiría dos niveles:

### Estado de la aplicación

```
Proyecto ├─ Organización ├─ Tareas ├─ Agentes ├─ Conocimiento └─ Diseño
```

Aquí usaría:

-   Signals
-   NgRx Signal Store

porque es básicamente estado de dominio.

* * * * *

### Workflow de edición

Por ejemplo:

```
draft ↓review ↓validated ↓published
```

o

```
OM-1 ↓OM-2 ↓OM-3 ↓TM ↓AM ↓KM
```

Aquí sí usaría XState.

Las máquinas de estado brillan cuando tienes:

-   pasos obligatorios,
-   validaciones,
-   permisos,
-   estados terminales,
-   undo/redo de workflow.

* * * * *

### Mi recomendación para 2026

Para Angular moderno:

-   Estado global → [NgRx Signal Store](https://ngrx.io/guide/signals?utm_source=chatgpt.com)
-   Workflow complejo → XState

Esa combinación es probablemente la arquitectura más común y mantenible para una aplicación como un editor CommonKADS.

Crea un prompt para la parte de xstate que me ha salido un agente que dice me lo implementa.

Puedes darle un prompt bastante específico para evitar que te genere una FSM simplona y conseguir una arquitectura mantenible.

* * * * *

Prompt
======

Actúa como un arquitecto senior de Angular, TypeScript y XState v5.

Estoy desarrollando un editor CommonKADS en Angular 21.

Quiero que diseñes e implementes la arquitectura completa de workflow utilizando XState v5.

Contexto funcional
------------------

La aplicación permite crear y editar proyectos CommonKADS.

Cada proyecto contiene los modelos:

-   OM-1
-   OM-2
-   OM-3
-   OM-4
-   OM-5
-   TM
-   AM
-   KM
-   CM
-   DM

Cada modelo tiene formularios editables.

El usuario puede navegar libremente entre modelos, pero el sistema debe conocer el estado de cada uno.

Objetivos
---------

Diseña una máquina de estados robusta y escalable que:

1.  Controle el ciclo de vida de cada modelo:

```
empty↓editing↓completed↓validated↓approved
```

1.  Permita volver atrás:

```
approved -> editingvalidated -> editingcompleted -> editing
```

1.  Mantenga el estado global del proyecto:

```
draftin_progressready_for_reviewapprovedpublished
```

1.  Calcule automáticamente el estado global a partir del estado de los modelos.
2.  Soporte persistencia.
3.  Soporte restauración desde JSON.
4.  Soporte autosave.
5.  Sea compatible con Angular Signals.
6.  Sea totalmente tipado con TypeScript estricto.
7.  Evite cualquier API obsoleta de XState.

Requisitos técnicos
-------------------

Utiliza:

-   Angular 21
-   TypeScript 5+
-   XState v5
-   Signals
-   RxJS únicamente cuando sea imprescindible

Entregables
-----------

Genera:

### 1\. Arquitectura

Explica:

-   máquinas principales
-   máquinas hijas
-   actores
-   contexto
-   eventos
-   guards
-   actions

### 2\. Modelado

Define:

```
ProjectStateWorksheetStateProjectContextProjectEventWorksheetEvent
```

### 3\. Implementación

Proporciona código completo para:

-   projectMachine
-   worksheetMachine

### 4\. Integración Angular

Crea:

```
ProjectWorkflowService
```

con:

-   creación
-   carga
-   persistencia
-   señales derivadas

### 5\. Selectores

Incluye ejemplos de:

```
isProjectReadycompletionPercentageapprovedWorksheetspendingWorksheets
```

### 6\. Persistencia

Define formato JSON serializable:

```
{  "projectId": "",  "state": "",  "worksheets": []}
```

### 7\. Escalabilidad

Explica cómo añadir nuevos modelos CommonKADS sin modificar la máquina principal.

Restricciones
-------------

NO uses ejemplos simplificados.

NO generes pseudocódigo.

NO utilices versiones antiguas de XState.

NO utilices NgRx.

El código debe compilar en Angular 21 y XState v5.

Prioriza mantenibilidad, tipado fuerte, testabilidad y separación de responsabilidades.

* * * * *

Ese prompt suele producir resultados bastante mejores porque obliga al agente a pensar en **actores, persistencia, composición de máquinas y Angular Signals**, que son los puntos donde la mayoría de ejemplos de XState se quedan cortos. Para un editor CommonKADS además le estás empujando hacia una arquitectura de "máquina por worksheet + máquina agregadora de proyecto", que es probablemente el diseño más limpio.

Genial. ¿Puedes crear el complementario que hemos fisto visto para Estado global → NgRx Signal Store?

Sí. De hecho yo separaría claramente:

-   **XState = workflow y reglas de negocio temporales**
-   **Signal Store = estado de aplicación, caché y acceso a datos**

Un error muy común es intentar meter todo en XState y acabar con una máquina monstruosa.

* * * * *

Prompt
======

Actúa como un arquitecto senior especializado en Angular 21, TypeScript 5, Signals y NgRx Signal Store.

Estoy desarrollando un editor CommonKADS.

Ya existe una arquitectura independiente basada en XState v5 que controla los workflows y ciclos de vida de los modelos.

NO quiero duplicar responsabilidades.

Tu objetivo es diseñar exclusivamente la capa de estado global utilizando NgRx Signal Store.

* * * * *

Contexto
--------

Un proyecto CommonKADS contiene:

-   OM-1
-   OM-2
-   OM-3
-   OM-4
-   OM-5
-   TM
-   AM
-   KM
-   CM
-   DM

Cada worksheet tiene:

```
id: stringtype: WorksheetTypetitle: stringcontent: unknownmetadata: WorksheetMetadata
```

Existe además:

```
ProjectUserPreferencesValidationResultsNavigationStateUIState
```

* * * * *

Principio arquitectónico
------------------------

XState gestiona:

-   workflows
-   transiciones
-   estados de aprobación
-   validaciones de proceso
-   máquinas de estados

NgRx Signal Store gestiona:

-   datos del proyecto
-   navegación
-   selección actual
-   filtros
-   preferencias
-   persistencia
-   cache
-   consultas derivadas

No mezclar responsabilidades.

* * * * *

Objetivos
---------

Diseña una arquitectura Signal Store que:

### 1

Mantenga en memoria:

```
Project ├─ worksheets ├─ metadata ├─ settings └─ relationships
```

### 2

Permita:

-   cargar proyecto
-   crear proyecto
-   guardar proyecto
-   importar JSON
-   exportar JSON

### 3

Mantenga navegación:

```
selectedWorksheetselectedTabbreadcrumbs
```

### 4

Mantenga UI:

```
loadingsavingerrorsdialogsnotifications
```

### 5

Mantenga preferencias:

```
themelanguageautosavelayout
```

### 6

Sea compatible con:

-   Angular Signals
-   Standalone Components
-   OnPush
-   Lazy Loading

### 7

Sea totalmente tipado.

* * * * *

Requisitos técnicos
-------------------

Utiliza:

-   Angular 21
-   NgRx Signal Store
-   TypeScript estricto

Evita:

-   NgRx clásico
-   reducers
-   actions
-   effects tradicionales
-   RxJS innecesario

* * * * *

Entregables
-----------

### Arquitectura

Explica:

-   stores principales
-   stores secundarios
-   dependencias

* * * * *

### Diseño de estado

Define:

```
ProjectStoreStateWorksheetStateNavigationStateUIStatePreferencesState
```

* * * * *

### Implementación

Genera código completo para:

```
ProjectStore
```

incluyendo:

-   state
-   computed
-   methods

* * * * *

### Computed Signals

Incluye:

```
currentWorksheetallWorksheetsworksheetCountcompletionPercentageprojectStatisticsnavigationTree
```

* * * * *

### Persistencia

Implementa:

```
loadProject()saveProject()importProject()exportProject()
```

* * * * *

### Integración con XState

Explica exactamente:

-   qué datos viven en Signal Store
-   qué datos viven en XState
-   cómo se comunican
-   qué eventos se intercambian

Incluye diagramas de flujo.

* * * * *

### Escalabilidad

Explica cómo soportar:

-   plugins
-   nuevos tipos de worksheet
-   múltiples proyectos abiertos
-   colaboración futura

* * * * *

Restricciones
-------------

No pongas lógica de workflow dentro del Store.

No pongas estados de aprobación dentro del Store.

No pongas reglas de negocio temporales dentro del Store.

Esas responsabilidades pertenecen exclusivamente a XState.

El resultado debe seguir principios de arquitectura limpia, DDD y separación estricta de responsabilidades.

* * * * *

Con los dos prompts juntos acabas con una arquitectura bastante sólida:

```
Angular Components         │         ▼NgRx Signal Store(datos)         │         ▼XState Actors(workflows)         │         ▼Persistence Layer(LocalStorage / IndexedDB / API)
```

donde:

-   **Signal Store** sabe *qué hay*.
-   **XState** sabe *en qué estado está y qué puede ocurrir después*.

Esa separación suele escalar mucho mejor cuando el proyecto pasa de 10 pantallas a 100+.