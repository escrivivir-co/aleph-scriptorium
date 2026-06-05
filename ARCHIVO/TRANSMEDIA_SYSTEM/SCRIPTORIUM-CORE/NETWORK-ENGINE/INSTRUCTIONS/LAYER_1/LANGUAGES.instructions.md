# Language Technical Design (Layer 1)

## Propósito

Este documento establece las **reglas técnicas obligatorias** para programar un lenguaje derivado en el monorepo.
Define el "cómo" se materializa el diseño funcional (`LAYER_3`) utilizando el sustrato del `core`.

---

## 1. Gramática Tipada (Type-Level Programming)

Un lenguaje no es válido si sus reglas solo viven en runtime. TypeScript debe poder demostrar la validez semántica en tiempo de compilación.

### Identificadores (Branded Types)
Cada lenguaje debe proteger sus propias entidades (Fuerzas, Teorías, Axiomas) evitando que un `string` primitivo colisione con otro contexto.
```ts
type ForceId = string & { readonly __brand: unique symbol };
```

### Eventos (Discriminated Unions)
Los eventos deben componerse a partir de `CoreEventBase` para garantizar que el Orquestador genérico pueda enrutarlos:
```ts
export type MyLangEvent =
  | CoreEventBase<'IMPACT', { forceId: ForceId }>
  | CoreEventBase<'COLLAPSE', { reason: string }>;
```

### Inyección Semántica (Phantom Types)
El lenguaje DEBE exportar su contrato utilizando el metamodelo genérico del Core:
```ts
export type MyLangSemantics = LanguageSemantics<MyLangContext, MyLangEvent>;
```

---

## 2. Configuración de Runtime (XState)

Un lenguaje no debe sobreescribir ni reescribir una máquina de estados manual. 
Debe invocar obligatoriamente a la factoría del Core `createNetworkMachine<TSemantics>()`.

El bloque de XState resultante quedará estrictamente limitado a los `actions` y `guards` que el `MyLangEvent` defina. 
Cualquier intento de mutar un estado que no esté en `MyLangContext` lanzará un error de compilación.

---

## 3. DSL (Domain Specific Language) Wrapper

Las capas superiores (Capa 3: Aplicaciones) **NUNCA** deben interactuar directamente con `orchestrator.dispatch({ type: '...' })`.
El paquete del lenguaje debe exportar una clase contenedora que ofrezca una API fluida o semántica.

**Regla de Oro:** Ocultar el bus de eventos detrás de métodos de dominio.
```ts
// MAL:
engine.dispatch({ type: 'IMPACT', payload: { forceId } });

// BIEN (El Lenguaje provee el DSL):
universe.absorbForce(forceId);
```

---

## 4. Reglas de Paquetería (Scaffolding)

1. **Ubicación:** `packages/<nombre>-lang/`.
2. **Dependencias:** Debe depender de `@network-engine/core` vía `workspace:*`.
3. **Exportación (`index.ts`):** Debe exportar el DSL Wrapper, la interfaz `TSemantics` y los constructores de identificadores (Branded factories).
4. **Validación:** El lenguaje debe compilar (`bun run typecheck`) sin inferencias fallidas hacia `any` en la factoría de la máquina.
