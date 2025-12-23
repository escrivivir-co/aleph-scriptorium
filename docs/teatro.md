---
layout: default
title: Teatro
description: Teatro Interactivo - Experiencias transmedia guiadas con navegación 3D
---

# 🎭 Teatro Interactivo

> Experiencias transmedia navegables en el Scriptorium

<div class="teatro-container" markdown="1">

<section class="zona-escena" markdown="1">

## 🎬 En Escena

<div class="obra-destacada" markdown="1">

### El Camino del Tarotista

<div class="obra-meta">
  <span class="badge badge-tipo">Onboarding</span>
  <span class="badge badge-nivel">Introductorio</span>
  <span class="badge badge-duracion">2-3 horas</span>
</div>

> Recorrido guiado por todas las features del Scriptorium.
> 12 estadios siguiendo el Camino del Héroe: vestíbulo, biblioteca, hemeroteca, scriptorium, foro, laboratorio, teatro, ordalía, publicación, mapa, integración y elixir.

**Personaje guía**: 🧙 Tarotista (demarcacion-yellowflag)

<div class="obra-acciones">
  <a href="{{ '/teatro/camino-del-tarotista/' | relative_url }}" class="btn-primario">▶️ Abrir Pantalla</a>
  <a href="#pantalla-info" class="btn-secundario">ℹ️ Cómo navegar</a>
</div>

</div>

</section>

<section class="zona-galeria" markdown="1">

## 📋 Galería

<div class="galeria-grid" markdown="1">

<div class="obra-card" markdown="1">

### Hola Mundo

<div class="obra-meta">
  <span class="badge badge-tipo">Laboratorio</span>
  <span class="badge badge-nivel">Introductorio</span>
  <span class="badge badge-duracion">15-30 min</span>
</div>

> Obra de demostración del pipeline AGENT_CREATOR → ARG_BOARD.
> El Tarotista se presenta y demuestra el método de auditoría.

**Personaje guía**: 🧙 Tarotista

<a href="{{ '/teatro/hola-mundo/' | relative_url }}" class="btn-terciario">▶️ Ver obra</a>

</div>

<div class="obra-card obra-placeholder" markdown="1">

### + Nueva Obra

> Usa `@aleph quiero crear una obra de teatro` para diseñar tu propia experiencia de 12 estadios.

<a href="#crear-obra" class="btn-terciario">📝 Crear obra</a>

</div>

</div>

### 📚 Archivo

<div class="archivo-obras" markdown="1">

*Las obras clausuradas se archivarán aquí.*

</div>

</section>

<section class="zona-pantalla" id="pantalla-info" markdown="1">

## 🖥️ Pantalla Impress.js

El visualizador 3D te permite navegar las obras como un espacio tridimensional organizado en **anillos concéntricos**.

### Navegación con teclado

| Tecla | Acción |
|-------|--------|
| `→` o `Espacio` | Siguiente diapositiva |
| `←` | Diapositiva anterior |
| `↑` `↓` | Navegar entre anillos |
| `O` | Vista general (overview) |
| `Esc` | Salir de overview |

### Sistema de Anillos

```
        ┌─────────────────────┐
       /         Anillo 3      \    ← Retorno (estadios 9-12)
      │     ┌─────────────┐     │
      │    /   Anillo 2    \    │   ← Pruebas (estadios 5-8)
      │   │  ┌─────────┐   │    │
      │   │ /  Anillo 1 \  │    │   ← Preparación (estadios 1-4)
      │   │ │  Centro 0 │  │    │   ← Inicio
      │   │ \___________/  │    │
      │   \_______________/     │
       \_____________________ /
```

| Anillo | Estadios | Fase del Monomito |
|--------|----------|-------------------|
| **0** | Inicio | Centro (bienvenida) |
| **1** | 1-4 | Partida (mundo ordinario → umbral) |
| **2** | 5-8 | Iniciación (pruebas → ordalía) |
| **3** | 9-12 | Retorno (recompensa → elixir) |

### Controles adicionales

- **Slider de anillo**: Salta directamente a un anillo
- **Índice lateral**: Acceso directo a cualquier estadio
- **Modo fallback**: Si tu navegador no soporta 3D, verás navegación lineal

</section>

</div>

---

<section id="crear-obra" markdown="1">

## Cómo crear una obra

### 1. Generar

```
@aleph quiero crear una obra de teatro sobre [tema]
```

El sistema te guiará para diseñar los 12 estadios con pruebas y personajes.

### 2. Instalar

```
@aleph instala la obra [nombre]
```

La obra aparecerá en la galería (en cartel).

### 3. Ejecutar

```
@aleph pon en escena la obra [nombre]
```

Se generará la página impress.js y se publicará. La obra pasará a "En Escena".

</section>

---

## Recursos

- [Documentación del plugin Teatro →](https://github.com/escrivivir-co/aleph-scriptorium/tree/main/.github/plugins/teatro)
- [Limitaciones del MVP →]({{ '/teatro-mvp-limitations' | relative_url }})
- [Backlog Sprint 1 →]({{ '/roadmap' | relative_url }})
