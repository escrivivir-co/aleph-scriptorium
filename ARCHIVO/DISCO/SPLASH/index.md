# Índice Estructural: Web GH-Pages

> **Propósito**: Mapa técnico-funcional para orquestar ediciones en `docs/`  
> **Fuente de verdad**: `docs/index.md` + `docs/assets/css/main.css`  
> **Actualizado**: 2025-12-24

---

## 1. Arquitectura Jekyll

### 1.1 Layouts

| Layout | Archivo | Uso |
|--------|---------|-----|
| `default` | `_layouts/default.html` | Base: header + main.container + footer |
| `post` | `_layouts/post.html` | Periódico |
| `page` | `_layouts/page.html` | Páginas genéricas |
| `obra` | `_layouts/obra.html` | Teatro impress.js |

### 1.2 Includes

| Include | Función |
|---------|---------|
| `header.html` | Navbar sticky + menú hamburguesa (JS inline) |
| `footer.html` | Footer simplificado (2 columnas) |

### 1.3 Config (`_config.yml`)

```yaml
navigation:    # Menú header (9 items)
collections:   # capitulos, marco, cartas, diagnostico, justificacion
defaults:      # layouts por tipo
plugins:       # jekyll-feed, jekyll-seo-tag, jekyll-sitemap
```

---

## 2. Estructura index.md (Home)

### 2.1 Mapa Visual

```
┌─────────────────────────────────────────────────────────────┐
│ .home-page                                                   │
├─────────────────────────────────────────────────────────────┤
│  1. RELEASE-BANNER    │ .release-banner                     │
│  2. HERO              │ .home-hero                          │
│  3. NAV-CARDS         │ .home-nav (9 cards)                 │
│  4. ECOSISTEMA        │ .eco-strip                          │
│  5. PRISMA            │ .home-prism                         │
│  6. STATUS            │ .home-status-simple                 │
│  7. JOIN              │ .home-join                          │
│  8. LEGAL             │ .home-legal                         │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Detalle por Sección

| # | Sección | Clase CSS | Líneas index.md |
|---|---------|-----------|-----------------|
| 1 | Release Banner | `.release-banner` | 9-16 |
| 2 | Hero | `.home-hero` | 18-24 |
| 3 | Nav Cards | `.home-nav` | 26-72 |
| 4 | Ecosistema | `.eco-strip` | 74-88 |
| 5 | Prisma | `.home-prism` | 90-114 |
| 6 | Status | `.home-status-simple` | 116-148 |
| 7 | Join | `.home-join` | 150-170 |
| 8 | Legal | `.home-legal` | 172-192 |

### 2.3 Contenido por Sección

| # | Elementos | Editables |
|---|-----------|-----------|
| 1 | `.release-badge` + `.release-text` | Versión, CTA |
| 2 | `.hero-symbol` + h1 + `.hero-tagline` + `.hero-prompt` | Símbolo, tagline |
| 3 | 9× `.nav-card` con icon/title/desc | Cards de navegación |
| 4 | 3× `.eco-item` + flechas | VibeBitacora → Aleph → Euler |
| 5 | `.prism-visual` + `.prism-labels` + copy | Visual 5 banderas |
| 6 | `.status-metric` (4) + `.feature-highlight` (4) | Métricas, features |
| 7 | Copy + `.join-actions` (3 btns) + `.join-code` | CTAs, código clone |
| 8 | `.legal-content` | Licencia AIPL |

---

## 3. Sistema CSS

### 3.1 Variables (`:root`)

| Variable | Valor | Uso |
|----------|-------|-----|
| `--bg` | `#ffffff` | Fondo |
| `--fg` | `#1a1a1a` | Texto principal |
| `--muted` | `#444444` | Texto secundario |
| `--border` | `#e5e5e5` | Bordes claros |
| `--font-mono` | SF Mono | Títulos, código |
| `--max-width-wide` | 1200px | Home |

### 3.2 Banderas

| Bandera | Variable | Color |
|---------|----------|-------|
| Blue | `--blue` | `#2563eb` |
| Black | `--black` | `#1a1a1a` |
| Red | `--red` | `#dc2626` |
| Yellow | `--yellow` | `#ca8a04` |
| Orange | `--orange` | `#ea580c` |

### 3.3 Ubicación en main.css

| Componente | Líneas aprox. |
|------------|---------------|
| Variables | 11-44 |
| Header | 169-225 |
| Footer | 227-340 |
| Home page | 680-1020 |
| Leeme page | 1022-1200 |

---

## 4. Páginas del Sitio

| Página | Archivo | Clase wrapper |
|--------|---------|---------------|
| Home | `index.md` | `.home-page` |
| Léeme | `leeme.md` | `.leeme-page` |
| Ecosistema | `ecosistema.md` | — |
| Teatro | `teatro.md` | — |
| Periódico | `periodico.md` | `.periodico-*` |
| Fundación | `fundacion.md` | — |
| Archivo | `archivo.md` | — |
| Roadmap | `roadmap.md` | `.roadmap-*` |
| Acerca | `acerca.md` | — |

---

## 5. Operaciones

### 5.1 Editar Sección

```
1. Identificar # en tabla 2.2
2. Ir a líneas de index.md
3. Modificar contenido HTML/Markdown
4. (Opcional) Ajustar clase CSS
5. Validar: bundle exec jekyll serve
```

### 5.2 Añadir Sección

```html
<section class="home-section">
<h2>// Nuevo Título</h2>
<!-- contenido -->
</section>
```

### 5.3 Modificar Nav Cards

Sincronizar con `_config.yml`:
```yaml
navigation:
  - title: Nuevo
    url: /nuevo/
```

---

## 6. Checklist

- [ ] Jekyll build sin errores
- [ ] Responsive (320/768/1200px)
- [ ] Menú hamburguesa funciona
- [ ] Métricas actualizadas
- [ ] Versión banner correcta

---

## 7. Pendientes (TODO)

- [ ] Crear favicon.ico con símbolo ℵ
- [ ] Optimizar imágenes para web
- [ ] Añadir Open Graph meta tags

---

## 8. Referencias

| Recurso | Ruta |
|---------|------|
| Plugin | `.github/plugins/gh-pages/` |
| CSS | `docs/assets/css/main.css` |
| Config | `docs/_config.yml` |
| Instrucciones | `.github/plugins/gh-pages/instructions/gh-pages.instructions.md` |