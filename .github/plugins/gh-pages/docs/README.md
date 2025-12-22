# 🌐 Plugin GH-Pages — Documentación

> **Plugin**: gh-pages  
> **Versión**: 1.1.0  
> **URL del sitio**: [escrivivir-co.github.io/aleph-scriptorium](https://escrivivir-co.github.io/aleph-scriptorium/)

---

## Descripción

El plugin **GH-Pages** permite publicar contenido del Aleph Scriptorium en GitHub Pages. Separa claramente la **orquestación** (qué publicar) de la **presentación** (cómo mostrar).

---

## Arquitectura (Fuente Única de Verdad)

```
┌─────────────────────────────────────────────────────────────────┐
│                    PLUGIN GH-PAGES                               │
├─────────────────────────────────────────────────────────────────┤
│  .github/plugins/gh-pages/         ← CÓDIGO (inmutable)         │
│  ├── manifest.md                   Metadatos del plugin          │
│  ├── agents/ghpages.agent.md       Agente orquestador            │
│  ├── prompts/                      Comandos disponibles          │
│  ├── instructions/                 Flujos de trabajo             │
│  ├── docs/README.md                Este archivo                  │
│  └── meta/README.md                Explicación arquitectural     │
├─────────────────────────────────────────────────────────────────┤
│  docs/                             ← FUENTE DE VERDAD (web)      │
│  ├── _config.yml                   Configuración Jekyll          │
│  ├── _includes/                    Headers, footers              │
│  ├── _layouts/                     Plantillas Jekyll             │
│  ├── assets/css/main.css           Estilos globales              │
│  └── *.md                          Páginas del sitio             │
├─────────────────────────────────────────────────────────────────┤
│  ARCHIVO/PLUGINS/GH_PAGES/         ← DATOS (runtime)             │
│  └── config.json                   Estado de publicación         │
└─────────────────────────────────────────────────────────────────┘
```

**Punto clave**: `docs/` en la raíz del repositorio es la **única fuente de verdad** para el sitio web. No hay plantillas duplicadas.

---

## Modos de Operación

| Modo | Descripción | Caso de Uso |
|------|-------------|-------------|
| **Fusionar** | Añade contenido sin eliminar existente | Actualizar periódico con noticias del mes |
| **Reemplazar** | Sustituye todo el contenido | Crear página dedicada a un capítulo |

---

## Inicio Rápido

### 1. Verificar estado

El sitio ya está inicializado. Verificar en GitHub Settings → Pages:
- **Source**: `main /docs`
- **URL**: https://escrivivir-co.github.io/aleph-scriptorium/

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

| Fuente | Comando | Destino en docs/ |
|--------|---------|------------------|
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

## Plantilla Jekyll (en docs/)

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
├── docs/README.md              ← (este archivo)
└── meta/README.md              ← (explicación arquitectural)
```

### Sitio Web (fuente de verdad)

```
docs/                           ← Raíz del repositorio
├── _config.yml
├── _layouts/
├── _includes/
├── assets/css/main.css
├── index.md
├── agentes.md
├── fundacion.md
├── periodico.md
├── noticias.md
└── archivo.md
```

### Datos (runtime)

```
ARCHIVO/PLUGINS/GH_PAGES/
├── config.json
└── published/manifest.json
```

---

## Flujo de Actualización del Sitio

### Para modificar contenido

1. Editar directamente en `docs/` (raíz)
2. Commit y push a `main`
3. GitHub Pages reconstruye automáticamente (~40s)
4. Verificar en producción

### Para modificar estilos o estructura

1. Editar `docs/assets/css/main.css` o `docs/_includes/*.html`
2. Commit y push a `main`
3. GitHub Pages reconstruye
4. Hard refresh si es necesario (Cmd+Shift+R)

---

## Troubleshooting

| Problema | Solución |
|----------|----------|
| Sitio no actualiza | Verificar que GitHub Pages está habilitado en Settings → Pages |
| CSS no carga | Revisar `baseurl` en `docs/_config.yml` |
| Build falló | Revisar logs en GitHub Actions |
| Cache del navegador | Hard refresh (Cmd+Shift+R) |

---

## Comandos Útiles

```bash
# Ver archivos del sitio
ls -la docs/

# Ver cambios pendientes
git status

# Verificar estado de GitHub Pages
# → GitHub Settings → Pages
```

---

## Referencias

- [Manifest del plugin](../manifest.md)
- [Agente GHPages](../agents/ghpages.agent.md)
- [Instrucciones](../instructions/gh-pages.instructions.md)
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
