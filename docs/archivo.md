---
layout: default
title: Archivo
description: Mapa de navegación del ARCHIVO/ — Memoria permanente del Scriptorium
permalink: /archivo/
---

# 📚 El Archivo

Memoria permanente del Scriptorium: doctrina, datos y flujos de integración. Aquí reside todo el conocimiento consolidado del proyecto.

---

## Estructura de Carpetas

| Carpeta | Contenido | Uso |
|---------|-----------|-----|
| `CARTAS/` | 6 cartas-puerta por perfil | Entrada al proyecto según interés del lector |
| `DEVOPS/` | Funcional.md, Tecnico.md | Índices DRY del proyecto |
| `DISCO/` | Carpetas temporales | Material de coyuntura (conectar/desconectar) |
| `ENCICLOPEDIA/` | Tomos académicos indexados | Búsquedas por período y tema |
| `NOTICIAS/` | Planas 5W + Banderas | Resultado del ciclo periodístico |
| `PERFILES/` | Fichas de lector | Creadas por `@vestibulo` |
| `PLUGINS/` | Estado de runtime | Configuración y logs de plugins |
| `FOTOS_ESTADO/` | Capturas del proyecto | Documentación visual |
| `SITE/` | Contenido web auxiliar | Recursos para GitHub Pages |

---

## Vestíbulo — Entrada según Perfil

Cada **carta-puerta** presenta el proyecto por un eje distinto. Invoca `@vestibulo` para identificar tu perfil automáticamente.

| 🏷️ | Carta | Enfoque | Link |
|----|-------|---------|------|
| 🔭 | Vista Total | Completitud y método | [Leer](https://github.com/escrivivir-co/aleph-scriptorium/blob/main/ARCHIVO/CARTAS/carta-maestro-vista-total.md) |
| 🔵 | Blueflag | Evidencia y falsificabilidad | [Leer](https://github.com/escrivivir-co/aleph-scriptorium/blob/main/ARCHIVO/CARTAS/carta-maestro-blueflag.md) |
| ⚫ | Blackflag | Poder y adversario | [Leer](https://github.com/escrivivir-co/aleph-scriptorium/blob/main/ARCHIVO/CARTAS/carta-maestro-blackflag.md) |
| 🔴 | Redflag | Escala y viabilidad | [Leer](https://github.com/escrivivir-co/aleph-scriptorium/blob/main/ARCHIVO/CARTAS/carta-maestro-redflag.md) |
| 🟡 | Yellowflag | Límites e integración | [Leer](https://github.com/escrivivir-co/aleph-scriptorium/blob/main/ARCHIVO/CARTAS/carta-maestro-yellowflag.md) |
| 🟠 | Orangeflag | Registro e interlocución | [Leer](https://github.com/escrivivir-co/aleph-scriptorium/blob/main/ARCHIVO/CARTAS/carta-maestro-orangeflag.md) |

---

## Ejes Doctrinales

| Eje | Estado | Descripción | Docs |
|-----|--------|-------------|------|
| **marco/** | 🟢 Activo | Herramientas para diseño político. La vacuna anti-naïf. | [15 docs](https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/marco) |
| **diagnostico/** | 📋 Memoria | Estado de la cuestión. Se asume, no se recorre. | [5 docs](https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/diagnostico) |
| **justificacion/** | 📋 Memoria | Por qué este proyecto. Punto de partida, no tema. | [4 docs](https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/justificacion) |

**Conceptos clave del marco**: Selección sistémica · Acción colectiva (Olson, Michels) · Geopolítica 2025 · Soberanía (Rousseau) · Hybris y crematística (Aristóteles)

---

## Flujo DISCO ↔ ARCHIVO

```
FUENTES EXTERNAS (Foros, Blogs, PDFs, Tomos)
                    ↓
           DISCO (temporal)
                    ↓
    ┌───────────────┼───────────────┐
    ↓               ↓               ↓
@foroscraper   @bibliotecario   @agentcreator
    └───────────────┼───────────────┘
                    ↓
        extraer-archivar.prompt.md
        (Clasificar + Auditar 5 Banderas)
                    ↓
           ARCHIVO (permanente)
                    ↓
    ┌───────────────┼───────────────┐
    ↓               ↓               ↓
@periodico      @arrakis        @ghpages
```

### Procesos Principales

| # | Proceso | Plugin/Prompt | Función |
|---|---------|---------------|---------|
| 1 | Extracción | `extraer-archivar.prompt.md` | Clasificar DISCO → ARCHIVO por eje doctrinal |
| 2 | Consulta tomos | `@bibliotecario` | Búsquedas en ENCICLOPEDIA |
| 3 | Crear agentes | `@agentcreator` | Combinar agente base + fuente de DISCO |
| 4 | Noticias | `@periodico` | Método 5W + Banderas |
| 5 | Publicar web | `@ghpages` | Desplegar en GitHub Pages |
| 6 | Scraping | `@foroscraper` | Descargar foros/blogs a DISCO |

---

## Agentes por Capa

| Capa | Agentes | Función |
|------|---------|---------|
| **UI** | `@aleph` `@revisor` `@periodico` | Producción |
| **Backend** | `@blueflag` `@blackflag` `@redflag` `@yellowflag` `@orangeflag` | Auditoría (5 Banderas) |
| **Sistema** | `@vestibulo` `@cartaspuerta` | Navegación |
| **Meta** | `@ox` `@pluginmanager` | Gestión |
| **Plugins** | `@foroscraper` `@bibliotecario` `@agentcreator` `@ghpages` `@arrakis` + más | Extensiones |

> Consulta el índice completo: `@ox listar agentes por capa`

---

## Plugins

Los plugins extienden las capacidades del Scriptorium. Ver documentación completa en [PLUGINS.md](https://github.com/escrivivir-co/aleph-scriptorium/blob/main/.github/PLUGINS.md).

**Plugins activos**: enciclopedia · foro-scraper · agent-creator · gh-pages · arg-board (teatro) · boe · decoherence · gitarg · automata-heroe

---

## Referencias Rápidas

- **Índices DRY**: `ARCHIVO/DEVOPS/Funcional.md` y `Tecnico.md`
- **Prompts**: `.github/prompts/`
- **Definiciones de agentes**: `.github/agents/`
- **Web pública**: [escrivivir-co.github.io/aleph-scriptorium](https://escrivivir-co.github.io/aleph-scriptorium/)

---

[← Volver](/) | [Ecosistema](/ecosistema/) | [Periódico](/periodico/) | [Roadmap](/roadmap/)
