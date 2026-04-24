# Punto de investigación — Alternativas simples sin Docker para lore-vector-db-infra

> **Fecha:** 22-abr-2026
> **Autor:** GPT-5.4 (GitHub Copilot)
> **Estado:** investigación exploratoria
> **Relacionada con:** `sala/PLAN-VECTOR/ANALISIS.md`

## 1. Pregunta

Se pide evaluar si la línea `lore-vector-db-infra` puede tener un equivalente ligero, al estilo de `DocumentMachineSDK/.github/skills/media-extraction/`: dependencias locales, scripts plantilla, persistencia en disco y cero Docker.

La respuesta corta es **sí**: para este caso se puede montar un paquetito similar, siempre que se asuma un alcance de **single-user, local-first, sin servicio central**.

## 2. Patrón reusable extraído de media-extraction

La skill `media-extraction` ya define un patrón portable útil para esta capa:

- Dependencias instalables a nivel usuario, sin tocar infraestructura del repo.
- Scripts plantilla autocontenidos en `.github/skills/<skill>/templates/`.
- Carpetas `tmp/` para trabajo efímero y caché reutilizable.
- Protocolo de verificación explícito antes de usar el pipeline.
- Fallbacks cuando falta una dependencia fuerte.
- Cierre operativo claro: estado, procesos vivos y artefactos persistidos.

Ese patrón se puede replicar casi tal cual para una `lore-vector-lite`.

## 3. Opciones simples sin Docker

### Opción A — LanceDB embebido

**Forma:** librería embebida que persiste a directorio local. No requiere daemon ni contenedor.

**Encaje con el repo:** alto.

- Tiene modo embebido OSS y SDK en TypeScript y Python.
- Guarda datos y metadatos juntos, útil para `id`, `tipo`, `mod`, `path`, `lore_f_refs`, `sha`, `model_version`.
- Permite búsqueda vectorial, full-text e híbrida sin cambiar el contrato de consulta.
- Facilita una futura migración a un servicio mayor sin rehacer el modelo mental.

**Ventajas:**

- No Docker.
- No servidor residente.
- Buen equilibrio entre simplicidad y capacidad.
- Mejor historia para crecer luego a MCP server real.

**Pegas:**

- Es más pesado que un simple SQLite.
- Si el paquetito se hace en Python, se duplica parte del camino si luego el servidor final se escribe en TypeScript.

### Opción B — sqlite-vec

**Forma:** SQLite local + extensión vectorial + consultas SQL.

**Encaje con el repo:** medio-alto.

- Muy atractivo como PoC o paquete ultraligero.
- Un solo fichero `.db` simplifica backup, diff de estado y transporte entre sesiones.
- Buena opción si el objetivo inmediato es `indexar -> buscar -> devolver IDs`.

**Ventajas:**

- Cero Docker.
- Cero servicio.
- Huella mínima.
- SQL directo, fácil de inspeccionar.

**Pegas:**

- Menos ergonomía para filtros ricos y búsqueda híbrida.
- Distribuir la extensión nativa según OS/arch puede ser más delicado.
- Más trabajo manual si se quiere una experiencia parecida a Qdrant.

### Opción C — Chroma local en Python

**Forma:** librería o stack local persistido en disco, sin Docker obligatorio.

**Encaje con el repo:** medio.

- Muy parecido al ecosistema RAG clásico en Python.
- Encaja bien si se quiere copiar el estilo exacto de `media-extraction`: `pip install --user`, scripts `.py`, caché local.

**Ventajas:**

- Familiar para flujos Python.
- Metadata filters razonables.
- Arranque rápido como skill portable.

**Pegas:**

- Peor encaje si el objetivo final es un MCP server TS en `mcp-mesh-sdk/src/`.
- Históricamente tiende a empujar a modo servicio o puente Python si el uso crece.
- Menos limpio como arquitectura final para esta codebase.

### Opción D — Índice local sin DB real

**Forma:** embeddings guardados en JSON/Parquet/SQLite simple + búsqueda cosine en script.

**Encaje con el repo:** medio para demo, bajo para producto.

**Ventajas:**

- El más simple de todos.
- Sirve para probar contrato de `sync/search/get_by_id`.

**Pegas:**

- No es realmente una DB vectorial.
- Escala peor.
- Se queda corto en cuanto aparezcan filtros y búsquedas combinadas.

No lo recomiendo salvo como shim de validación temprana.

## 4. Recomendación operativa

Si el objetivo es un **paquetito similar a media-extraction**, pero pensando ya en el salto a MCP server real, mi recomendación es:

### Recomendación principal

**LanceDB embebido + skill portable local-first**.

Es la mejor combinación entre:

- simplicidad de uso sin Docker,
- persistencia local en disco,
- capacidad suficiente para `Pieza` y `LORE_F`,
- y compatibilidad conceptual con la arquitectura MCP futura.

### Recomendación ultraligera

**sqlite-vec** si quieres un primer paso aún más minimalista, asumiendo que luego habrá que rehacer parte de la ergonomía.

## 5. Qué forma tendría el paquetito

Nombre tentativo:

- `lore-vector-lite`
- o `lore-local-index`

Estructura espejo del patrón `media-extraction`:

```text
DocumentMachineSDK/.github/skills/lore-vector-lite/
├── SKILL.md
└── templates/
    ├── lore_sync_local.py
    ├── lore_query_local.py
    └── lore_status_local.py
```

Dependencias posibles si se sigue la vía Python-style del skill:

```bash
python -m pip install --user lancedb sentence-transformers pyyaml markdown-it-py
```

Alternativa ultraligera:

```bash
python -m pip install --user sqlite-vec sentence-transformers pyyaml
```

Carpetas de trabajo recomendadas:

```text
tmp/
├── lore-vector/         <- zona de trabajo local
│   ├── .gitkeep
│   └── state.json
└── lore-vector-cache/   <- indice persistente reutilizable
    ├── .gitkeep
    ├── index.db
    └── snapshots/
```

## 6. Contrato mínimo del paquetito

Aunque todavía no exista el MCP server, el paquetito debe estabilizar el contrato de uso. Mínimo:

### `lore_sync_local`

- Recorre piezas `.md` y `LORE_F.md`.
- Detecta altas, cambios y borrados con git + hash.
- Reindexa solo lo cambiado.
- Persiste metadata por pieza:
  - `id`
  - `tipo`
  - `mod`
  - `path`
  - `sha`
  - `lore_f_refs`
  - `model_version`
  - `updated_at`
  - `deleted_at`

### `lore_query_local`

- Busca por lenguaje natural.
- Permite filtros por `tipo`, `mod`, `LORE_F`, `id`.
- Devuelve primero IDs, luego snippets y score.

### `lore_status_local`

- Estado del índice local.
- Cobertura vs disco (`LORE_INDEX`, piezas, `LORE_F`).
- Modelo usado y fecha de última sincronización.

## 7. Cómo tratar Pieza y LORE_F

Para no romper la lógica actual del SDK:

- **Pieza** sigue siendo la unidad canónica del índice.
- **LORE_F** se trata como agregado navegable.

Dos variantes válidas:

1. `LORE_F` solo como filtro/índice de IDs.
2. `LORE_F` como documento agregado con vector propio y, además, relación a sus piezas.

Si el paquetito nace simple, recomiendo:

- v0: `LORE_F` como filtro de IDs
- v1: añadir vector propio del agregado

Así se simplifica el primer sync y se mantiene una senda clara de crecimiento.

## 8. Limitaciones de un paquete sin Docker

Hay que dejarlas explícitas para no vender más de lo que da:

- No hay multiusuario real.
- No hay endpoint HTTP nativo para healthchecks del Launcher.
- La concurrencia multiagente simultánea es más frágil.
- El índice vive pegado al workspace local.
- La observabilidad y el reinicio controlado son más pobres que en un servicio dedicado.

Por eso lo veo como:

- **excelente para desarrollo, mods individuales y experimentación**, y
- **paso previo razonable** antes de subir a `lore-vector-db-infra` con servicio persistente.

## 9. Conclusión

Sí, **se puede hacer un paquetito similar a `media-extraction` para una vector DB sin Docker**.

La mejor ruta no es replicar Qdrant en pequeño, sino fijar un contrato local-first con:

- dependencias user-level,
- scripts plantilla,
- persistencia en `tmp/`,
- y operaciones `sync / query / status`.

Para esta codebase, la mejor apuesta es **LanceDB embebido** si quieres algo simple pero no desechable. Si quieres una prueba todavía más pequeña, **sqlite-vec** sirve como escalón de validación.

## 10. Efecto sobre el plan principal

Este hallazgo abre una bifurcación útil en `PV-A`:

- `PV-A1` `lore-vector-lite` — paquete portable sin Docker para validación local.
- `PV-A2` `lore-vector-db-infra` — servicio dockerizado cuando haga falta operación más robusta.

La clave es mantener el mismo contrato lógico en ambos, para que el salto no rompa al Loreador ni al MCP server futuro.