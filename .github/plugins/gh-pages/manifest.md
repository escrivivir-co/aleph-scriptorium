---
id: gh-pages
name: "Website Publisher (GitHub Pages)"
version: "1.2.0"
description: "Plugin para publicar contenido del Scriptorium en GitHub Pages. Fuente de verdad: docs/ (raíz). Soporta dos modos: fusionar (añadir contenido) y reemplazar (sustituir todo). Incluye protocolo de plantillas blueprint."
author: "Aleph Scriptorium"
license: "MIT"

# Compatibilidad
scriptorium_version: ">=0.0.1"
dependencies: []

# Directorio de datos de runtime
data_directory: "ARCHIVO/PLUGINS/GH_PAGES/"

# Fuente de verdad del sitio web
site_source: "docs/"
site_note: "SCRIPT-0.14.0: No hay plantilla duplicada. docs/ (raíz) es la única fuente de verdad."

# URL canónica del sitio publicado
site_url: "https://escrivivir-co.github.io/aleph-scriptorium/"
repository: "https://github.com/escrivivir-co/aleph-scriptorium"

# Agentes exportados
agents:
  - name: "GHPages"
    file: "agents/ghpages.agent.md"
    description: "Agente principal - Orquesta publicación en GitHub Pages (fusionar/reemplazar)"

# Prompts exportados
prompts:
  - name: "gh-pages-init"
    file: "prompts/gh-pages-init.prompt.md"
    description: "Inicializar GitHub Pages en el repositorio"
  
  - name: "gh-pages-merge"
    file: "prompts/gh-pages-merge.prompt.md"
    description: "Fusionar nuevo contenido sin eliminar el existente"
  
  - name: "gh-pages-replace"
    file: "prompts/gh-pages-replace.prompt.md"
    description: "Reemplazar todo el contenido de la página"
  
  - name: "gh-pages-publish"
    file: "prompts/gh-pages-publish.prompt.md"
    description: "Publicación general (detecta modo automáticamente)"
  
  - name: "create-blueprint"
    file: "prompts/create-blueprint.prompt.md"
    description: "Crear nueva presentación blueprint con patrón de navegación 3D"

# Instrucciones
instructions:
  - name: "gh-pages"
    file: "instructions/gh-pages.instructions.md"
    description: "Flujos de trabajo y convenciones del plugin"
  
  - name: "blueprint-templates"
    file: "instructions/blueprint-templates.instructions.md"
    description: "Protocolo de plantillas para blueprints impress.js (patrones cruz, columna, cubo)"

# Handoffs para integración con agentes core
handoffs:
  - label: "Publicar en GitHub Pages"
    agent: "GHPages"
    prompt: "Publica contenido en GitHub Pages. Especifica fuente (NOTICIAS/, FUNDACION/, ARCHIVO/) y modo (fusionar/reemplazar)."
  
  - label: "Inicializar GitHub Pages"
    agent: "GHPages"
    prompt: "Configura GitHub Pages por primera vez: crea branch gh-pages, despliega plantilla Jekyll y actualiza README."
  
  - label: "Fusionar noticias en web"
    agent: "GHPages"
    prompt: "Añade las planas de NOTICIAS/ al sitio web sin eliminar contenido existente."
  
  - label: "Reemplazar contenido web"
    agent: "GHPages"
    prompt: "Sustituye todo el contenido del sitio con la fuente especificada."
  
  - label: "Crear blueprint"
    agent: "GHPages"
    prompt: "Crea una nueva presentación blueprint con navegación 3D. Usa --patron=cruz|columna|cubo."

# Metadatos adicionales
tags:
  - publicación
  - github-pages
  - jekyll
  - web
  - noticias
  - blueprint
  - impress.js

# Modos de operación
modes:
  merge:
    description: "Añade contenido nuevo manteniendo el existente"
    use_cases:
      - "Refrescar periódico con noticias del mes"
      - "Añadir nuevo capítulo sin borrar anteriores"
  replace:
    description: "Sustituye todo el contenido"
    use_cases:
      - "Crear página dedicada a un capítulo"
      - "Reiniciar con nuevo eje del ARCHIVO"
      - "Publicar versión limpia"

# Fuentes soportadas
sources:
  - path: "ARCHIVO/NOTICIAS/"
    type: "posts"
    description: "Planas noticieras → _posts/"
  - path: "PROYECTOS/FUNDACION/CAPITULOS/"
    type: "pages"
    description: "Capítulos → pages/"
  - path: "ARCHIVO/marco/"
    type: "collection"
    description: "Marco conceptual → _marco/"
  - path: "ARCHIVO/CARTAS/"
    type: "pages"
    description: "Cartas-puerta → pages/"
---

# 🌐 Website Publisher (GitHub Pages)

Plugin para publicar contenido del Aleph Scriptorium en GitHub Pages. Separa claramente la **orquestación** (qué publicar) de la **presentación** (cómo mostrar).

## Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│              PLUGIN GH-PAGES                            │
├─────────────────────────────────────────────────────────┤
│  ORQUESTACIÓN (qué publicar)                           │
│    ├── @GHPages (agente principal)                     │
│    ├── Modos: fusionar | reemplazar                    │
│    └── Fuentes: NOTICIAS/ | FUNDACION/ | ARCHIVO/      │
├─────────────────────────────────────────────────────────┤
│  PLANTILLA (cómo mostrar)                              │
│    ├── Jekyll minimalista blanco/negro                 │
│    ├── _layouts/, _includes/, assets/                  │
│    └── Generador de índices y navegación               │
├─────────────────────────────────────────────────────────┤
│  PUBLICACIÓN (dónde ir)                                │
│    ├── Source: main (branch)                           │
│    ├── Carpeta: docs/ (GitHub Pages)                   │
│    └── URL: escrivivir-co.github.io/aleph-scriptorium  │
└─────────────────────────────────────────────────────────┘
```

## Modos de Operación

### Fusionar (`merge`)

Añade contenido nuevo **sin eliminar** el existente. Ideal para:
- Actualizar el periódico con noticias del mes
- Añadir nuevos capítulos progresivamente
- Expandir secciones del ARCHIVO

### Reemplazar (`replace`)

**Sustituye todo** el contenido (excepto plantilla base). Ideal para:
- Crear página dedicada a un capítulo
- Reiniciar el sitio con un nuevo eje temático
- Publicar versiones limpias

## Integración

Este plugin se integra con tres agentes core:

| Agente | Uso típico |
|--------|------------|
| **@Aleph** | Publicar capítulos tras revisión |
| **@Periodico** | Fusionar planas noticieras |
| **@Revisor** | Publicar contenido aprobado |

## Plantilla

Usa Jekyll con diseño minimalista blanco/negro inspirado en el estilo del Scriptorium:
- Tipografía serif (Charter, Georgia)
- Sin distracciones visuales
- Banderas con color sutil en bordes
- Responsive y accesible
