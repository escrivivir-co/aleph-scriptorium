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
gh-pages branch/
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
  "branch": "gh-pages",
  "last_publish": "2025-12-21T10:00:00Z"
}
```

### published/manifest.json

Registro de todas las publicaciones realizadas.

---

## Troubleshooting

| Problema | Solución |
|----------|----------|
| Sitio no actualiza | Verificar que GitHub Pages está habilitado en Settings → Pages |
| CSS no carga | Revisar `baseurl` en `_config.yml` |
| Branch no existe | Ejecutar `@GHPages inicializar` |

---

## Comandos Útiles

```bash
# Ver branch gh-pages
git branch -a | grep gh-pages

# Cambiar a gh-pages
git checkout gh-pages

# Volver a main
git checkout main

# Ver historial de publicaciones
git log --oneline gh-pages
```

---

## Referencias

- [Manifest del plugin](../manifest.md)
- [Agente GHPages](../agents/ghpages.agent.md)
- [Instrucciones](../instructions/gh-pages.instructions.md)
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
