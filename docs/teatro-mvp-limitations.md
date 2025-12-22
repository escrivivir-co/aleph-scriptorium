---
layout: default
title: Limitaciones Técnicas (MVP)
description: Análisis de viabilidad y hoja de ruta técnica del Teatro Interactivo
---

# 🎭 Teatro Interactivo: Limitaciones Técnicas (MVP)

> **Estado**: Sprint 1 (Bootstrap)
> **Stack**: Jekyll + Vanilla JS + CSS3 Transforms

Este documento detalla las decisiones técnicas tomadas para el MVP del Teatro Interactivo, sus limitaciones conscientes y la hoja de ruta hacia una implementación reactiva completa.

---

## 1. Arquitectura Actual (MVP)

Para el Sprint 1, hemos optado por una arquitectura **estática y ligera** que aprovecha la infraestructura existente de GitHub Pages sin requerir backends complejos.

### Stack Tecnológico
- **Generación**: Jekyll (Liquid templates)
- **Visualización**: impress.js (modificado)
- **Estilos**: CSS3 (Variables + Transforms 3D)
- **Lógica**: JavaScript Vanilla (ES6+)

### Ventajas
- ✅ **Coste cero**: Alojamiento gratuito en GitHub Pages.
- ✅ **SEO nativo**: Contenido indexable por buscadores.
- ✅ **Performance**: Carga inicial rápida (sin hidratación de frameworks pesados).
- ✅ **Mantenibilidad**: Código simple, sin cadenas de compilación complejas (webpack/vite).

---

## 2. Limitaciones Conscientes

Al no usar un framework reactivo (React/Angular/Vue) ni un backend persistente, aceptamos las siguientes limitaciones en esta fase:

### ❌ Sin Estado Persistente
- El progreso del usuario no se guarda entre sesiones.
- Si recargas la página, vuelves al inicio (o al hash de la URL).
- **Solución futura**: `localStorage` (v1.1) o base de datos (v2.0).

### ❌ Generación Estática
- Las obras deben "compilarse" (build de Jekyll) para existir.
- No se pueden crear obras dinámicamente en el navegador sin un commit previo.
- **Impacto**: El ciclo "Crear → Ver" requiere un commit y deploy (~1-2 min).

### ❌ Sin Multijugador
- La experiencia es solitaria.
- No puedes ver a otros usuarios navegando el mismo anillo.
- **Solución futura**: WebSockets / Firebase (v2.0).

### ❌ Interactividad Limitada
- Los personajes (agentes) son estáticos en la web.
- Para interactuar con ellos, el usuario debe volver al editor (VS Code).
- **Solución futura**: Chat widget embebido conectado a API (v2.0).

---

## 3. Hoja de Ruta (Roadmap)

### v1.0: MVP (Actual)
- Visualización 3D básica (anillos).
- Navegación por teclado y slider.
- Contenido estático generado desde YAML.

### v1.1: Mejoras de UX (Svelte/Alpine)
- Persistencia local (`localStorage`) para recordar por dónde ibas.
- Transiciones más fluidas entre anillos.
- Buscador de estadios en tiempo real.

### v2.0: "Euler" (Angular/React)
- **Single Page Application (SPA)** completa.
- **Backend**: Supabase o Firebase.
- **Multi-usuario**: Cursores visibles de otros lectores.
- **Editor en vivo**: Crear obras sin tocar código.

---

## 4. Conclusión

El MVP cumple el objetivo de **"Visualizar el Scriptorium como un Teatro"** con la menor fricción técnica posible. Priorizamos la **narrativa** y la **estructura** sobre la complejidad tecnológica prematura.
