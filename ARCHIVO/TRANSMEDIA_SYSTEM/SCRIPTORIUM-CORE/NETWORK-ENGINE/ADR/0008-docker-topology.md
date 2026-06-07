# ADR 0008: Topología Docker — mongo, graphdb, graphql

## Estado

Aceptado.

## Contexto

El programa ASI requiere un entorno reproducible para desarrollo e integración que materialice los adaptadores LAYER_0:

- MongoDB con replica-set (requisito de change streams).
- Ontotext GraphDB (SPARQL endpoint para `GraphDbStore`).
- Servicio GraphQL Bun como gateway de proyección.

## Decisión

### 1. `docker-compose.yml` en la raíz

Tres servicios principales:

| Servicio | Imagen | Puerto | Notas |
| --- | --- | --- | --- |
| `mongo` | `mongo:7` | 27017 | Replica-set single-node; init `rs.initiate()` |
| `graphdb` | `ontotext/graphdb:10.6.0` | 7200 | Repositorio SPARQL para `GraphDbPlugin` |
| `graphql` | build local (`oven/bun`) | 4000 | Gateway GraphQL desde `packages/apps/gateway` (`@network-engine/gateway`) usando `startGraphQLServer` de `@network-engine/edge-graphql` |

Servicios opcionales (hub pubsub 3001, aleph-os MCP 3100) quedan fuera del compose mínimo; pueden añadirse en fases posteriores.

### 2. Variables de entorno

- `MONGO_URI`: `mongodb://mongo:27017/?replicaSet=rs0`
- `GRAPHDB_ENDPOINT`: `http://graphdb:7200`
- `GRAPHQL_PORT`: `4000`

Alineadas con convenciones de `packages/node/.env.example` y `packages/mongo/.env.example`.

### 3. Healthchecks

- Mongo: `mongosh` ping + verificación de replica-set.
- GraphDB: HTTP GET al endpoint REST.
- GraphQL: HTTP GET `/health`.

## Consecuencias

### Positivas

- Change streams verificables en CI/smoke local con `docker compose up`.
- Paridad dev/prod para adaptadores documentales y RDF.

### Negativas

- GraphDB image es pesada; arranque lento en máquinas locales.
- Replica-set init añade complejidad al primer `docker compose up`.

## Referencias

- [`docker-compose.yml`](../docker-compose.yml)
- [`packages/graphql/Dockerfile`](../packages/graphql/Dockerfile)
- [`ADR 0005`](./0005-document-store-async-first.md)
