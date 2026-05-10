---
trigger: "Valida el sitio Jekyll localmente antes de publicar"
input:
  - Cambios recientes en docs/
  - Layout o includes modificados
output:
  - Compilación exitosa o errores detectados
  - Reporte de páginas generadas
---

# Prompt: Validar Sitio Localmente

## Objetivo

Compilar el sitio Jekyll localmente para detectar errores de sintaxis **antes** de hacer push a GitHub, evitando el loop "push → error en Actions → fix → repeat".

---

## Prerequisito: Instalación de Jekyll

Si es la primera vez que validas localmente:

### Paso 1: Instalar Jekyll

```bash
./scripts/setup-jekyll.sh
```

Esto instalará:
- Bundler (gestor de gemas Ruby)
- Jekyll 4.3
- Plugins necesarios (jekyll-seo-tag, etc.)
- Dependencias en `docs/Gemfile`

**Nota**: Solo necesitas hacerlo una vez. El script crea `docs/Gemfile` y `docs/Gemfile.lock`.

---

## Flujo de Validación

### Opción A: Validación rápida (solo build)

```bash
./scripts/validate-site.sh
```

**Qué hace**:
- Compila Jekyll en `docs/_site/`
- Detecta errores de sintaxis Liquid
- Reporta archivos generados
- **No inicia servidor**

**Cuándo usar**: Antes de cada commit que afecte `docs/`.

### Opción B: Validación con servidor local

```bash
./scripts/serve-site.sh
```

**Qué hace**:
- Compila Jekyll
- Inicia servidor en `http://localhost:4000`
- Recarga automática con `--livereload`
- Permite navegar el sitio como si estuviera en GitHub Pages

**Cuándo usar**: Para probar interactividad (teatro, navegación, etc.).

---

## Casos de Uso

### 1. Modificaste un layout

```bash
# Editas docs/_layouts/obra.html
./scripts/validate-site.sh

# Si pasa:
git add docs/_layouts/obra.html
git commit -m "fix: corregir sintaxis Liquid"
git push

# Si falla, ver error y corregir antes de push
```

### 2. Añadiste nueva página

```bash
# Creas docs/teatro/nueva-obra.md
./scripts/serve-site.sh

# Navega a http://localhost:4000/teatro/nueva-obra/
# Verifica que se vea correctamente
# Ctrl+C para detener servidor
git add docs/teatro/nueva-obra.md
git commit -m "feat: añadir obra X"
```

### 3. Integraste nueva sección

```bash
# Modificas _config.yml, _includes/, assets/
./scripts/serve-site.sh

# Prueba navegación completa
# Verifica estilos y JavaScript
```

---

## Errores Comunes y Solución

### Error: "Invalid syntax for include tag"

**Causa**: Variable en `include_relative` o ruta con `../`

**Solución**:
- Usar `include` con variable en `capture`
- Mover archivos a `_includes/` si necesario
- Ver [BUG-001](../../.github/BACKLOG-SCRIPTORIUM.md)

### Error: "Could not locate Gemfile"

**Causa**: No ejecutaste `setup-jekyll.sh` o no estás en directorio correcto

**Solución**:
```bash
./scripts/setup-jekyll.sh
```

### Error: "Liquid Exception: ... in /_layouts/X.html"

**Causa**: Sintaxis Liquid incorrecta (tag mal cerrado, filtro inválido)

**Solución**:
- Ver línea exacta en el error
- Consultar [documentación Liquid](https://shopify.github.io/liquid/)

---

## Integración con GH-Pages Plugin

Cuando uses `@ghpages`, el agente te preguntará:

> "¿Validaste localmente con `./scripts/validate-site.sh`?"

Si no lo hiciste, te sugerirá:
1. Hacer validación local
2. Ver errores si los hay
3. Solo entonces publicar

---

## Ventajas del Flujo Local

| Sin validación local | Con validación local |
|---------------------|----------------------|
| Push → esperar 2-5 min → ver error en Actions | Validar en 10s → corregir → push con confianza |
| Loop infinito si múltiples errores | Detectar todos los errores de una vez |
| Consumir minutos de Actions innecesariamente | Usar Actions solo para deploys válidos |
| No ver sitio real hasta deploy | Ver exactamente cómo se verá en GH Pages |

---

## Comandos Resumidos

```bash
# Primera vez (instalar Jekyll)
./scripts/setup-jekyll.sh

# Validación rápida (pre-commit)
./scripts/validate-site.sh

# Servidor local con hot-reload
./scripts/serve-site.sh

# URL del servidor local
http://localhost:4000
```

---

## Notas Técnicas

### Diferencias Jekyll local vs GitHub Pages

GitHub Pages usa Jekyll 3.9.x con plugins limitados. Tu local puede tener Jekyll 4.3.

**Mitigación**: El `Gemfile` usa versiones compatibles con GH Pages.

### Cache de Bundler

Las gemas se instalan en `~/.gem/ruby/`. No hace falta reinstalar para cada proyecto.

### Ignorar _site/ en Git

El directorio `docs/_site/` (generado por Jekyll) ya está en `.gitignore`. No lo commitees.

---

## Referencias

- Scripts: `scripts/setup-jekyll.sh`, `validate-site.sh`, `serve-site.sh`
- Bug relacionado: [BUG-001](../../.github/BACKLOG-SCRIPTORIUM.md)
- Jekyll docs: https://jekyllrb.com/docs/
- Liquid syntax: https://shopify.github.io/liquid/
