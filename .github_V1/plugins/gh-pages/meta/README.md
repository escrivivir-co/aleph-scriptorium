# meta/

> **Estado**: Vacía (ver decisión arquitectural SCRIPT-0.14.0)

## Decisión Arquitectural

Esta carpeta **está vacía intencionalmente**.

### Problema Resuelto

Anteriormente existía `meta/jekyll-template/` que duplicaba el contenido de `docs/` (raíz), causando:
- Mantenimiento doble
- Inconsistencias entre "plantilla" y "producción"
- Confusión sobre la fuente de verdad

### Solución Implementada

**Una única fuente de verdad**: `docs/` (raíz del repositorio)

- El sitio web vive en `docs/` y es servido directamente por GitHub Pages
- No hay plantilla separada que deba copiarse
- Todos los cambios se hacen directamente en `docs/`

### ¿Para qué se usaría meta/?

En el futuro, esta carpeta podría contener:
- Scripts de build (si se necesitan)
- Configuraciones de CI/CD específicas
- Templates de componentes (partials) para copiar a `docs/`

Pero actualmente **no hay contenido** porque no se necesita una capa de abstracción adicional.

---

**Referencia**: [BACKLOG-SCRIPTORIUM.md#SCRIPT-0.14.0](../../../../BACKLOG-SCRIPTORIUM.md)
