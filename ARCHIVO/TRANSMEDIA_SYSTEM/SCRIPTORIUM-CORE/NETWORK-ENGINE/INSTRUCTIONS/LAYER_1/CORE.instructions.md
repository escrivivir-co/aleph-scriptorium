# Core Technical Constitution

## Arquitectura de Dependencias

`@network-engine/core` es el estrato más bajo del monorepo a nivel de dependencias.

*   **Prohibido:** Importar módulos `node:*`.
*   **Prohibido:** Importar APIs globales de runtime (`Bun.*`, `Deno.*`, `window`, `document`).
*   **Permitido:** `xstate` (semántica operacional pura).
*   **Permitido:** `rxjs` (infraestructura reactiva pura).

---

# Estructura y Reglas por Archivo

## `types.ts` (Contratos y Tipos)

**Regla:** Solo código de tipos, interfaces y factory functions mínimas para Branded Types.

**Patrones Obligatorios:**
1.  **Branded Types:** Usar para IDs que no deben cruzarse accidentalmente.
    ```ts
    type UniverseId = string & { readonly __brand: unique symbol };
    ```
2.  **Template Literal Types:** Usar para prefijos estándar de eventos o estados.
    ```ts
    type StandardEventName = `${EventAction}_${EntityType}`;
    ```
3.  **Discriminated Unions:** Usar obligatoriamente para modelar la jerarquía de `CoreEvent`.
4.  **Const Type Parameters:** Usar en interfaces de plugins o apps para preservar información literal estricta.

---

## `engine.ts` (Semántica Operacional)

**Regla:** Contiene exclusivamente la máquina de estados de XState 5.

**Patrones Obligatorios:**
1.  Usar la sintaxis moderna: `setup({ ... }).createMachine({ ... })`.
2.  Los tipos del contexto y eventos deben inyectarse en el bloque `types: {}` del `setup`.
3.  Toda mutación de contexto debe realizarse mediante acciones puras definidas en el bloque `actions` del `setup`.
4.  La máquina no debe ejecutar efectos secundarios asíncronos directamente; invoca actores o despacha eventos.

---

## `orchestrator.ts` (Coordinación y Señales)

**Regla:** Actúa como el puente reactivo (RxJS) hacia la máquina de estados.

**Patrones Obligatorios:**
1.  **Event Bus:** Un único `Subject<CoreEvent>` recibe todas las entradas.
2.  **Suscripción Segura:** El Event Bus despacha eventos al `stateActor`.
3.  **Streams Derivados:** Exponer observables públicos combinando u operando sobre el event bus, nunca exponiendo el `Subject` mutable directo.
4.  No implementar aquí lógica de transición de estado (eso pertenece a `engine.ts`).

---

## `env.ts` (Configuración de Entorno)

**Regla:** Único punto de acceso seguro a variables de entorno cross-runtime.

**Patrón Obligatorio:**
*   Debe usar comprobaciones defensivas (`typeof process !== 'undefined'`) para no fallar en entornos Browser.

---

## `index.ts` (Barril de Exportación)

**Regla:** Define la API pública estricta del paquete `@network-engine/core`.

*   Todo lo exportado aquí se considera un contrato estable.
*   No exportar utilidades o tipos internos que sean detalles de implementación.

---

# Evolución del Código

## Al añadir un nuevo tipo o contrato
*   Asegurar que no asume la presencia de un disco duro, una red TCP o un DOM.

## Al añadir un nuevo evento
*   Añadirlo al union type principal (`CoreEvent`).
*   Configurar su transición correspondiente en la máquina en `engine.ts`.

## Al añadir un nuevo stream
*   Derivarlo del bus de eventos usando operadores puros de RxJS (`filter`, `map`).

---

# Checklist Técnico de Merge

□ No incluye `node:*`, `Bun.*` ni dependencias DOM.

□ Las acciones de la máquina viven dentro de `setup()`.

□ Los identificadores usan Branded Types.

□ Los eventos usan Discriminated Unions.

□ Todo el código exportado desde `index.ts` es seguro para ser consumido por un adaptador de Node o de Browser indistintamente.

□ Ejecuta `npm run typecheck` en el workspace sin errores.
