# Prompt: Inicializar GitHub Pages

> **Plugin**: gh-pages  
> **Agente**: @GHPages  
> **Uso**: Primera configuración de GitHub Pages en el repositorio

---

## Contexto

Este prompt guía la inicialización de GitHub Pages para el repositorio Aleph Scriptorium. Solo debe ejecutarse **una vez** por repositorio.

## Instrucciones para el Agente

### 1. Verificar Estado Actual

```bash
# Verificar que existe la carpeta del sitio
ls -la docs

# Verificar configuración de GitHub Pages en el repo
# (esto requiere verificar en GitHub Settings: Source = main /docs)
```

### 2. Establecer Mecanismo de Publicación

El sitio se edita siempre en `docs/` (branch `main`).

En GitHub Settings → Pages:
- **Source**: `Deploy from a branch`
- **Branch**: `main`
- **Folder**: `/docs`

### 3. Desplegar Plantilla Jekyll

Copiar estructura desde `.github/plugins/gh-pages/meta/jekyll-template/` hacia `docs/`:

```
_config.yml          → Configurar con datos del proyecto (en docs/_config.yml)
_layouts/            → Copiar tal cual
_includes/           → Copiar tal cual
assets/css/main.css  → Copiar tal cual
index.md             → Personalizar con contenido inicial
```

### 4. Configurar `docs/_config.yml`

```yaml
title: Aleph Scriptorium
description: El taller de escritura donde la IA trabaja para ti, no al revés.
url: https://escrivivir-co.github.io
baseurl: /aleph-scriptorium
repository: escrivivir-co/aleph-scriptorium
```

### 5. Crear Configuración Runtime

Crear `ARCHIVO/PLUGINS/GH_PAGES/config.json`:

```json
{
  "initialized": true,
  "initialized_at": "2025-12-21T00:00:00Z",
  "site_url": "https://escrivivir-co.github.io/aleph-scriptorium/",
  "pages_source": "main/docs",
  "docs_folder": "docs",
  "last_publish": null,
  "publish_count": 0
}
```

### 6. Actualizar README.md Principal

Añadir en la sección de Status:

```markdown
| **Sitio Web** | [escrivivir-co.github.io/aleph-scriptorium](https://escrivivir-co.github.io/aleph-scriptorium/) |
```

### 7. Commit

```bash
git add .
git commit -m "feat(gh-pages): inicializar GitHub Pages con plantilla Jekyll (docs)

- Crear branch gh-pages con plantilla minimalista B/N
- Configurar Jekyll para colecciones (capítulos, marco, noticias)
- Establecer URL canónica del proyecto

refs #SCRIPT-0.5.0-T087"

git push origin main
```

### 8. Verificar en GitHub

1. Ir a Settings → Pages
2. Confirmar Source: `gh-pages` branch
3. Verificar URL publicada

---

## Output Esperado

```
✅ GitHub Pages inicializado correctamente

Configuración:
- Source: main /docs
- URL: https://escrivivir-co.github.io/aleph-scriptorium/
- Plantilla: Jekyll minimalista B/N

Próximos pasos:
- @GHPages fusionar NOTICIAS diciembre
- @GHPages reemplazar FUNDACION cap01

Commit: feat(gh-pages): inicializar GitHub Pages con plantilla Jekyll
```

---

## Checklist de Inicialización

- [ ] Branch gh-pages creado
- [ ] Plantilla Jekyll desplegada
- [ ] `_config.yml` configurado
- [ ] `config.json` creado en ARCHIVO/PLUGINS/GH_PAGES/
- [ ] README.md actualizado con URL
- [ ] Push realizado
- [ ] GitHub Pages habilitado en Settings
