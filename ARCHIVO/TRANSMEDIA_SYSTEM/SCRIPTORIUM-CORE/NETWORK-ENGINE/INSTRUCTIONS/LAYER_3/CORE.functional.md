# Core Functional Constitution

## Visión Conceptual del Núcleo

El paquete `@network-engine/core` no es simplemente una librería compartida de utilidades.

Es la encarnación de los axiomas de la plataforma.

Define qué entidades existen, cómo se comunican y cómo evolucionan. Todo lo que ocurre en un Aleph o en cualquier universo derivado debe poder expresarse mediante los conceptos definidos aquí.

---

# El Vocabulario Ontológico (`types.ts`)

Los tipos en el core actúan como el vocabulario fundamental de la plataforma.

* **Universos (`UniverseId`)**: Espacios conceptuales aislados donde ocurren las simulaciones, inferencias o construcciones matemáticas.
* **Eventos (`CoreEvent`)**: Hechos inmutables que han ocurrido. Son la única forma de introducir información o forzar una transición en el sistema.
* **Plugins (`NetworkPlugin`)**: Capacidades abstractas (ej. inferencia, persistencia) que pueden conectarse al núcleo para expandir lo que un universo puede hacer, sin alterar sus axiomas base.

---

# Las Leyes de Evolución (`engine.ts`)

El motor de estados representa las leyes fundamentales de la "física" de la plataforma.

No define la lógica de negocio de una aplicación concreta, sino las invariantes del ecosistema:
* Un universo nace (`CREATE_UNIVERSE`).
* Un universo evoluciona o deduce nuevos hechos (`INFER_KNOWLEDGE`).
* El sistema puede entrar en error o reiniciarse.

Cualquier lenguaje o máquina que se construya (Capa 2 o 3) operará siempre sometido a estas leyes fundamentales de transición.

---

# El Flujo del Tiempo y la Observación (`orchestrator.ts`)

El orquestador es el observador del sistema.

* **El Event Bus**: Representa el flujo del tiempo. Todos los eventos pasan por aquí en estricto orden cronológico.
* **El Actor de Estado**: Consume el flujo del tiempo y actualiza la realidad (el Contexto).
* **Los Streams de Observación**: Permiten que el mundo exterior (aplicaciones, plugins, interfaces de usuario) reaccione a cambios en la realidad sin intervenir directamente en ella.

---

# Agnósticismo de Entorno

Funcionalmente, el núcleo asume que existe en un vacío absoluto.

No sabe lo que es un archivo, un disco duro, una red de internet o una pantalla.

Este vacío es intencional: asegura que los axiomas matemáticos y lógicos de la plataforma sigan siendo válidos independientemente de si la simulación corre en un servidor masivo, en el navegador de un usuario, o en un entorno aislado de pruebas.
