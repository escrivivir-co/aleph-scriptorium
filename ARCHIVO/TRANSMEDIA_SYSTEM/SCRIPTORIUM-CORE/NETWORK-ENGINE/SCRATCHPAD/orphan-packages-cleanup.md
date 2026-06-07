# Orphan packages — triage (no ejecutar sin OK)

**Fecha:** 2026-06-07  
**Contexto:** post-rename `graph` → `graphdb` y extracción de la capa `edge-*`.  
**Alcance:** docs-only. **No se ejecuta ninguna acción destructiva** en esta pasada.

## Resumen

Dos directorios bajo `packages/` **no son paquetes**: no tienen ningún archivo git-tracked, solo artefactos de build / dependencias que `.gitignore` ya excluye. Son cruft del sistema de archivos local, no parte del monorepo.

## Directorios huérfanos (no git-tracked)

### `packages/graph/`

- **Contenido observado:** solo `dist/` (`index.js`, `plugin.js`, `in-memory-store.js`, `sparql.js`, `keys.js` + `.map`/`.d.ts`) y `tsconfig.tsbuildinfo`. Sin `src/` ni `package.json`.
- **Origen:** residuo del rename a `@network-engine/graphdb`. El `dist/` viejo quedó tras el `tsc -b` previo al rename.
- **Estado git:** 0 archivos tracked (todo su contenido está gitignored).
- **Paquete canónico:** `packages/graphdb/` → `@network-engine/graphdb`.

### `packages/aleph-os-mcp-app/`

- **Contenido observado:** solo `node_modules/` (un binario suelto `@esbuild`). Sin `src/` ni `package.json` válido en el árbol tracked.
- **Origen:** instalación/experimento abandonado.
- **Estado git:** 0 archivos tracked (todo su contenido está gitignored).
- **Ubicación canónica de MCP Apps:** `packages/apps/src/catalog/aleph-os/`.

## Verificación de `.gitignore`

Contenido actual de `.gitignore` (raíz `NETWORK-ENGINE/`):

```
node_modules
**/tsconfig.tsbuildinfo
**/dist
**/modelcontextprotocol-main
.cursor/*.log
```

Conclusión por patrón:

- `node_modules` → **ignorado** (cubre `packages/aleph-os-mcp-app/node_modules/`).
- `**/dist` → **ignorado** (cubre `packages/graph/dist/`).
- `**/tsconfig.tsbuildinfo` → **ignorado** (cubre `packages/graph/tsconfig.tsbuildinfo`).

Es decir: **sí**, tanto `dist/` como `node_modules/` están ignorados. Por eso ambos directorios son invisibles para git (cero archivos tracked) y se confirman como cruft, no como paquetes. El único riesgo es que el `dist/` residual reaparezca tras builds locales antiguos o confunda a herramientas que recorren `packages/*`.

## Comando de limpieza propuesto (requiere aprobación del usuario)

Desde la raíz `NETWORK-ENGINE/`.

PowerShell (Windows):

```powershell
Remove-Item -Recurse -Force packages/graph, packages/aleph-os-mcp-app -ErrorAction SilentlyContinue
```

Bash (equivalente):

```bash
rm -rf packages/graph packages/aleph-os-mcp-app
```

**No ejecutado** en esta sesión de armonización docs-only. Borra solo artefactos no versionados; git no registrará cambios (no hay archivos tracked en esos directorios).

## Recomendación opcional para `.gitignore` (no aplicada)

Si el cruft reaparece con frecuencia, añadir entradas explícitas — **solo tras visto bueno del operador**, y fuera de este WP (no se toca `.gitignore` en esta pasada):

```gitignore
packages/graph/
packages/aleph-os-mcp-app/
```

## Nota para el finalizer

- Estos dos directorios **no** deben aparecer como paquetes en ECOSYSTEM / MONOREPO (ya excluidos en la doc armonizada).
- La limpieza física queda pendiente de aprobación; no bloquea la verificación documental.
