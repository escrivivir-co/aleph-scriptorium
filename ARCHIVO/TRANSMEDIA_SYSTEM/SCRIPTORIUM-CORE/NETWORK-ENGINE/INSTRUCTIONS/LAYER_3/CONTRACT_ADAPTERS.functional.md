# Contract Adapters Functional Design (Layer 3)

## Propósito

Este documento establece el **diseño funcional** de `@network-engine/contract-adapters`.

No explica la implementación (`LAYER_1/CONTRACT_ADAPTERS.instructions.md`) ni la operación DevOps. Define qué **significa** este componente en el metamodelo de Network-Engine.

---

## 1. Identidad funcional

Un *contract adapter* es un **traductor de frontera**: convierte vocabularios ajenos a la plataforma en el lenguaje interno de contratos (`DomainContract`).

No es:

* el núcleo de la plataforma;
* un lenguaje derivado (Capa 2);
* un runtime MCP;
* una ontología o universo (Capa 4).

Es un **puente de migración y interoperabilidad** entre sistemas externos y el anfitrión Network-Engine.

---

## 2. Frontera funcional

**Pertenece al adapter:**

* Interpretar metadatos externos (nombres, schemas, defaults, hints UI).
* Proyectar recursos, prompts y mutaciones iniciales según política Network-Engine.
* Preservar schemes URI externos solo como opción explícita de transición.

**Pertenece a la plataforma (`core`):**

* La definición canónica de `DomainContract`.
* Las reglas de versionado (`SemVer`) y efectos declarados.

**Pertenece a proyecciones (`mcp`, `mcp-runtime`, HTTP):**

* Materializar contratos en protocolos concretos.

---

## 3. Ontología mínima

El adapter introduce **3 primitivas funcionales**:

1. **Metadato externo** — descripción schema-driven ajena al repo.
2. **Contrato adaptado** — `DomainContract` válido para la plataforma.
3. **Política de migración** — qué se genera por defecto (resources sí, tools CRUD no salvo decisión).

---

## 4. Semántica funcional

### A. Estados

El adapter es **stateless**: cada llamada a `fromEntityMetadata()` es una transformación pura.

### B. Eventos

No emite eventos de dominio. Su salida es un valor (`DomainContract`) consumido downstream.

### C. Reglas

* Toda lectura heredada (`list`, `export`) debe mapearse preferentemente a **Resource**, no a Tool.
* Toda mutación heredada debe declararse como **MutationCapability** con efecto explícito.
* Los prompts legacy tipo "usa la tool X" deben reescribirse como protocolos semánticos en migraciones posteriores.

### D. Contexto

El adapter no mantiene memoria. El contexto vive en el contrato generado y en los repositorios que lo consuman.

---

## 5. Contrato de Inception

1. **¿Qué aporta que no aporte `core`?** Traducción desde vocabularios externos sin contaminar el núcleo.
2. **¿Qué primitivas introduce?** Metadato externo, contrato adaptado, política de migración.
3. **¿Qué reutiliza del núcleo?** `DomainContract` y tipos asociados.
4. **¿Qué capacidades habilita?** Migración incremental del SDK legacy sin renombrar la plataforma.
5. **¿Podría ser solo JSON?** No: la transformación requiere reglas tipadas y testeables.

---

## Trazabilidad

| Concepto | Artefacto físico |
| --- | --- |
| CONTRACT_ADAPTERS | `packages/contract-adapters` |
| DomainContract (destino) | `packages/core/src/contracts.ts` |
| Proyección MCP (downstream) | `packages/mcp/src/projection.ts` |

Ver Matriz completa en [`LAYER_1/ECOSYSTEM.md`](../LAYER_1/ECOSYSTEM.md).
