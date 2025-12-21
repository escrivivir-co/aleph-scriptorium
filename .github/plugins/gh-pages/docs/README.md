# 🌐 Plugin GH-Pages — Documentación

> **Plugin**: gh-pages  
> **Versión**: 1.0.0  
> **URL del sitio**: [escrivivir-co.github.io/aleph-scriptorium](https://escrivivir-co.github.io/aleph-scriptorium/)

---

## Descripción

El plugin **GH-Pages** permite publicar contenido del Aleph Scriptorium en GitHub Pages. Separa claramente la **orquestación** (qué publicar) de la **presentación** (cómo mostrar).

---

## Modos de Operación

| Modo | Descripción | Caso de Uso |
|------|-------------|-------------|
| **Fusionar** | Añade contenido sin eliminar existente | Actualizar periódico con noticias del mes |
| **Reemplazar** | Sustituye todo el contenido | Crear página dedicada a un capítulo |

---

## Inicio Rápido

### 1. Inicializar (primera vez)

```
@GHPages inicializar
```

Esto crea el branch `gh-pages`, despliega la plantilla Jekyll y configura el sitio.

**Actualización (mecanismo actual)**:
- El sitio vive en `docs/` (branch `main`).
- GitHub Pages se configura como `main /docs`.
- El agente publica editando `docs/` y haciendo commit/push a `main`.

### 2. Publicar Noticias

```
@GHPages fusionar NOTICIAS diciembre
```

Añade las planas de diciembre al sitio sin eliminar contenido previo.

### 3. Publicar Capítulo

```
@GHPages reemplazar FUNDACION cap01
```

Crea una página dedicada solo al capítulo 1 (limpia contenido anterior).

---

## Fuentes Soportadas

| Fuente | Comando | Destino Jekyll |
|--------|---------|----------------|
| Noticias | `NOTICIAS` | `_posts/` |
| Fundación | `FUNDACION cap01` | `_capitulos/` |
| Marco | `ARCHIVO/marco` | `_marco/` |
| Cartas | `ARCHIVO/CARTAS` | `_cartas/` |

---

## Integración con Agentes

El plugin se integra con tres agentes del core:

### Desde @Aleph

```
@GHPages publicar capítulo revisado
```

### Desde @Periodico

```
@GHPages fusionar noticias del mes
```

### Desde @Revisor

```
@GHPages publicar contenido aprobado
```

---

## Plantilla Jekyll

La plantilla incluye:

- **Diseño minimalista** blanco/negro
- **Tipografía serif** (Charter, Georgia)
- **Banderas** con colores sutiles en bordes
- **Responsive** y accesible
- **Sin JavaScript** requerido

### Paleta de Colores

```css
--bg: #ffffff;      /* Fondo */
--fg: #1a1a1a;      /* Texto */
--muted: #666666;   /* Texto secundario */
--border: #e5e5e5;  /* Bordes */
```

### Banderas

| Bandera | Color |
|---------|-------|
| 🔵 Blueflag | `#2563eb` |
| ⚫ Blackflag | `#1a1a1a` |
| 🔴 Redflag | `#dc2626` |
| 🟡 Yellowflag | `#ca8a04` |
| 🟠 Orangeflag | `#ea580c` |

---

## Estructura de Archivos

### Plugin (código)

```
.github/plugins/gh-pages/
├── manifest.md
├── agents/ghpages.agent.md
├── prompts/
│   ├── gh-pages-init.prompt.md
│   ├── gh-pages-merge.prompt.md
│   ├── gh-pages-replace.prompt.md
│   └── gh-pages-publish.prompt.md
├── instructions/gh-pages.instructions.md
├── docs/README.md (este archivo)
└── meta/jekyll-template/
```

### Datos (runtime)

```
ARCHIVO/PLUGINS/GH_PAGES/
├── config.json
└── published/manifest.json
```

### Sitio (branch gh-pages)

```
docs/ (main)
├── _config.yml
├── _layouts/
├── _includes/
├── _posts/
├── _capitulos/
├── assets/css/main.css
└── index.md
```

---

## Configuración

### config.json

```json
{
  "initialized": true,
  "site_url": "https://escrivivir-co.github.io/aleph-scriptorium/",
  "pages_source": "main/docs",
  "docs_folder": "docs",
  "last_publish": "2025-12-21T10:00:00Z"
}
```

### published/manifest.json

Registro de todas las publicaciones realizadas.

---

## ⚠️ Protocolo de Actualización del Sitio

### Arquitectura de publicación (crítico)

El sistema de GH-Pages tiene **dos capas**:

| Capa | Ubicación | Función |
|------|-----------|---------|
| **Plantilla** | `.github/plugins/gh-pages/meta/jekyll-template/` | Modelo de referencia (no se publica directamente) |
| **Producción** | `docs/` (branch `main`) | Sitio real que sirve GitHub Pages |

**Punto clave**: GitHub Pages está configurado como `main /docs`. Los cambios en la plantilla (`meta/jekyll-template/`) **no se reflejan automáticamente** en el sitio publicado. Hay que portarlos manualmente a `docs/`.

### Flujo para actualizar estilos o estructura

1. **Hacer cambios en la plantilla** (opcional, para mantener el modelo):
   ```
   .github/plugins/gh-pages/meta/jekyll-template/assets/css/main.css
   .github/plugins/gh-pages/meta/jekyll-template/_includes/footer.html
   ```

2. **Portar los cambios a producción** (obligatorio para que se vean):
   ```
   docs/assets/css/main.css
   docs/_includes/footer.html
   ```

3. **Commit y push a `main`**:
   ```bash
   git add docs/
   git commit -m "fix(gh-pages): <descripción del cambio>"
   git push origin main
   ```

4. **Esperar rebuild de Pages** (~40s):
   - Verificar en: `https://github.com/<owner>/<repo>/actions/workflows/pages/pages-build-deployment`

5. **Validar en producción**:
   - Navegar al sitio y verificar que los cambios se reflejan.

### Diagnóstico cuando el sitio no refleja cambios

| Síntoma | Causa probable | Solución |
|---------|----------------|----------|
| Cambios en plantilla no aparecen | Plantilla ≠ producción | Portar cambios a `docs/` |
| Push hecho pero no se ve | Build aún corriendo | Esperar ~40s y refrescar |
| Build exitoso pero igual | Cache del navegador | Hard refresh (Cmd+Shift+R) |
| Build falló | Error en Jekyll | Revisar logs en Actions |

### Verificar estado de sincronización

```bash
# ¿Qué commit tiene origin/main?
git fetch origin && git log -1 --oneline origin/main

# ¿Cuándo fue el último build de Pages?
# → Ver en GitHub Actions

# ¿El commit está en origin?
git branch -r --contains <commit-sha>
```

---

## Troubleshooting

| Problema | Solución |
|----------|----------|
| Sitio no actualiza | Verificar que GitHub Pages está habilitado en Settings → Pages |
| CSS no carga | Revisar `baseurl` en `_config.yml` |
| Branch no existe | Ejecutar `@GHPages inicializar` |
| Cambios en plantilla no se ven | Portar cambios de `meta/jekyll-template/` a `docs/` |
| Enlaces de GitHub rotos | Usar `{% assign github_url = "https://github.com/" | append: site.repository %}` en Liquid |

---

## Comandos Útiles

```bash
# Ver archivos del sitio
ls -la docs

# Ver cambios pendientes del sitio
git status

# Ver diff entre plantilla y producción (footer)
diff .github/plugins/gh-pages/meta/jekyll-template/_includes/footer.html docs/_includes/footer.html

# Ver diff entre plantilla y producción (CSS)
diff .github/plugins/gh-pages/meta/jekyll-template/assets/css/main.css docs/assets/css/main.css
```

---

## Referencias

- [Manifest del plugin](../manifest.md)
- [Agente GHPages](../agents/ghpages.agent.md)
- [Instrucciones](../instructions/gh-pages.instructions.md)
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
