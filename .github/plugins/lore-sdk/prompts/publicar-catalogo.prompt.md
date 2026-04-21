---
name: Publicar Catálogo
description: "Jekyll: borradores → publicados → commit → GitHub Pages"
applyTo: "LoreSDK/**/*.md, ARCHIVO/PLUGINS/LORE_SDK/**/*"
---

# Prompt: Publicar Catálogo

## Objetivo

Publicar el catálogo de poemas del mod activo en Jekyll GitHub Pages.

## Pre-requisitos

- Mod activo con `@voz` cristalizada
- Al menos un poema en `docs/_poemas/` (estado: `published: false`)
- `docs/_config.yml` configurado con el nombre del mod

## Proceso

### Paso 1: Inventario

1. Leer `LoreSDK/docs/_poemas/` — listar todos los archivos `.md`
2. Para cada poema, mostrar:
   - Título (del front matter `title:`)
   - Fecha (del nombre de archivo `YYYY-MM-DD-slug.md`)
   - Estado actual: `published: false` (borrador) o `published: true`
   - Tensión de origen (del front matter `tension:`)

### Paso 2: Selección

3. Presentar lista al usuario:
   ```
   Borradores disponibles:
   - 2026-04-10 "La derrota histórica" (E.01 — traducción)
   - 2026-04-14 "Verbo de obligación" (E.07 — arte≠propaganda)
   
   ¿Cuáles publicar?
   ```
4. El usuario selecciona (puede ser todos, algunos, o pedir edición antes)

### Paso 3: Publicar

5. Para cada poema seleccionado:
   - Cambiar `published: false` → `published: true` en el front matter
   - Verificar que no hay metalenguaje en el cuerpo (sin mención a IA/agentes)
   - Verificar que hay un `title:` descriptivo y una `date:` válida

### Paso 4: Commit

6. Hacer commit de los cambios:
   ```
   git add docs/_poemas/
   git commit -m "feat(poemas): publicar [N] poemas — mod [nick]

   Poemas publicados:
   - [YYYY-MM-DD-slug]: [título]
   ..."
   ```

### Paso 5: Deploy

7. Instruir al usuario sobre el deploy:
   ```
   Para publicar en GitHub Pages:
   
   Opción A (automática): Si tienes CI/CD configurado:
   git push origin main
   → GitHub Actions se encarga del deploy
   
   Opción B (manual via plugin gh-pages):
   @plugin_ox_ghpages → Publicar en GitHub Pages
   
   URL del catálogo: https://[usuario].github.io/para-la-voz-sdk/
   ```

## Output Esperado

```
✅ [N] poemas publicados
✅ Commit generado
📤 Pendiente: git push para deploy en GitHub Pages

Poemas en catálogo:
- [título 1] — [fecha]
- [título 2] — [fecha]

URL: https://escrivivir-co.github.io/para-la-voz-sdk/catalogo
```

## Notas

- **Borradores**: Los poemas son `published: false` por defecto (generados por @voz). Nunca se publican sin revisión explícita del usuario.
- **Subsumption**: Verificar siempre que el cuerpo del poema no mencione IA, modelos o tecnología.
- **Integración**: Para deploy automático via CI/CD, ver `.github/workflows/` en el submódulo.
