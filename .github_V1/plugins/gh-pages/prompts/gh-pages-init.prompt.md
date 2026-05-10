# Prompt: Verificar Inicialización de GitHub Pages

> **Plugin**: gh-pages  
> **Agente**: @GHPages  
> **Uso**: Verificar que GitHub Pages está correctamente configurado

---

## Contexto

Este prompt verifica que GitHub Pages está correctamente configurado para el repositorio Aleph Scriptorium. El sitio ya está inicializado; este prompt solo verifica el estado.

**Decisión arquitectural (SCRIPT-0.14.0)**: No hay plantilla duplicada. `docs/` (raíz) es la única fuente de verdad.

---

## Instrucciones para el Agente

### 1. Verificar Estado Actual

```bash
# Verificar que existe la carpeta del sitio
ls -la docs/

# Verificar archivos esenciales
ls docs/_config.yml docs/_includes/ docs/_layouts/ docs/assets/
```

### 2. Verificar Configuración de GitHub Pages

En GitHub Settings → Pages, debe estar configurado:
- **Source**: `Deploy from a branch`
- **Branch**: `main`
- **Folder**: `/docs`

### 3. Verificar `docs/_config.yml`

Debe contener:

```yaml
title: Aleph Scriptorium
description: El taller de escritura donde la IA trabaja para ti, no al revés.
url: https://escrivivir-co.github.io
baseurl: /aleph-scriptorium
repository: escrivivir-co/aleph-scriptorium
```

### 4. Verificar Configuración Runtime

Verificar que existe `ARCHIVO/PLUGINS/GH_PAGES/config.json`:

```json
{
  "initialized": true,
  "site_url": "https://escrivivir-co.github.io/aleph-scriptorium/",
  "pages_source": "main/docs",
  "docs_folder": "docs"
}
```

---

## Output Esperado

### Si está correctamente inicializado:

```
✅ GitHub Pages configurado correctamente

Configuración:
- Source: main /docs
- URL: https://escrivivir-co.github.io/aleph-scriptorium/
- Fuente de verdad: docs/ (raíz del repositorio)

Páginas disponibles:
- index.md (portada)
- agentes.md
- fundacion.md
- periodico.md
- noticias.md
- archivo.md

Próximos pasos:
- @GHPages fusionar NOTICIAS diciembre
- @GHPages reemplazar FUNDACION cap01
```

### Si falta configuración:

```
⚠️ Configuración incompleta

Faltantes:
- [ ] config.json no existe
- [ ] _config.yml no configurado

Acciones correctivas:
1. Crear ARCHIVO/PLUGINS/GH_PAGES/config.json
2. Verificar docs/_config.yml
```

---

## Checklist de Verificación

- [ ] Carpeta `docs/` existe con contenido
- [ ] `docs/_config.yml` configurado
- [ ] `docs/_layouts/` existe
- [ ] `docs/_includes/` existe  
- [ ] `docs/assets/css/main.css` existe
- [ ] `ARCHIVO/PLUGINS/GH_PAGES/config.json` existe
- [ ] GitHub Pages habilitado en Settings (main /docs)
