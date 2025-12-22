# Test: Visualizador Impress.js (Desktop y Móvil)

> **ID**: T038  
> **Sprint**: 1.0.0 (Teatro Interactivo)  
> **Tipo**: Test de UI/UX manual

---

## Objetivo

Validar que el visualizador 3D funciona correctamente en diferentes dispositivos y navegadores.

---

## URLs de Test

| Obra | URL Local | URL Producción |
|------|-----------|----------------|
| Hola Mundo | `localhost:4000/aleph-scriptorium/teatro/hola-mundo/` | [Producción](https://escrivivir-co.github.io/aleph-scriptorium/teatro/hola-mundo/) |
| Camino del Tarotista | `localhost:4000/aleph-scriptorium/teatro/camino-del-tarotista/` | [Producción](https://escrivivir-co.github.io/aleph-scriptorium/teatro/camino-del-tarotista/) |

---

## Matriz de Dispositivos

### Desktop

| Navegador | Versión mínima | Estado |
|-----------|----------------|--------|
| Chrome | 90+ | ⬜ |
| Firefox | 88+ | ⬜ |
| Safari | 14+ | ⬜ |
| Edge | 90+ | ⬜ |

### Móvil

| Dispositivo | Navegador | Estado |
|-------------|-----------|--------|
| iPhone (Safari) | iOS 14+ | ⬜ |
| iPhone (Chrome) | iOS 14+ | ⬜ |
| Android (Chrome) | Android 10+ | ⬜ |
| Android (Firefox) | Android 10+ | ⬜ |
| iPad (Safari) | iPadOS 14+ | ⬜ |

---

## Checklist Visual (Desktop)

### Carga Inicial

- [ ] La página carga sin errores en consola
- [ ] Impress.js se inicializa correctamente
- [ ] Primera diapositiva visible (estadio 1)
- [ ] Fondo degradado visible (`--color-fondo-inicio` → `--color-fondo-fin`)

### Navegación

- [ ] Flecha derecha (→) avanza a siguiente diapositiva
- [ ] Flecha izquierda (←) retrocede
- [ ] Flecha arriba (↑) va al inicio
- [ ] Espacio avanza
- [ ] Click en diapositiva la selecciona

### Controles del Teatro

- [ ] Slider de anillos visible
- [ ] Slider filtra diapositivas por anillo
- [ ] Árbol-índice lateral visible
- [ ] Click en nodo del árbol navega a diapositiva
- [ ] Indicador de diapositiva actual (x/12)

### Transiciones 3D

- [ ] Transición suave entre diapositivas
- [ ] Rotación visible al cambiar de anillo
- [ ] Escala correcta (diapositivas no se salen del viewport)
- [ ] Z-index correcto (diapositiva activa siempre visible)

### Estilos

- [ ] Tipografía legible (Crimson Text / sans-serif)
- [ ] Colores del tema Dark Enlightenment aplicados
- [ ] Diapositivas con borde sutil visible
- [ ] Contenido de escenas renderizado (markdown → HTML)

---

## Checklist Visual (Móvil)

### Carga

- [ ] Página carga en menos de 3 segundos (3G)
- [ ] No hay scroll horizontal no deseado
- [ ] Viewport configurado correctamente

### Navegación Táctil

- [ ] Swipe izquierda/derecha navega
- [ ] Tap en diapositiva la selecciona
- [ ] Pinch-to-zoom funciona (si aplica)

### Responsividad

- [ ] Diapositivas se adaptan al ancho
- [ ] Texto legible sin zoom
- [ ] Controles accesibles con pulgar
- [ ] Árbol-índice colapsable/hamburger

### Orientación

- [ ] Portrait funciona
- [ ] Landscape funciona
- [ ] Rotación no rompe layout

---

## Problemas Conocidos (MVP)

| Problema | Severidad | Workaround |
|----------|-----------|------------|
| Swipe táctil puede no funcionar | Media | Usar botones de navegación |
| Árbol-índice puede ocultarse | Baja | Rotar a landscape |
| 3D puede ser lento en móviles antiguos | Baja | Deshabilitar transiciones CSS |

Ver: [docs/teatro-mvp-limitations.md](../../docs/teatro-mvp-limitations.md)

---

## Resultado

### Desktop

| Navegador | Carga | Navegación | 3D | Estilos | Total |
|-----------|-------|------------|-----|---------|-------|
| Chrome | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| Firefox | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| Safari | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| Edge | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |

### Móvil

| Dispositivo | Carga | Táctil | Responsive | Total |
|-------------|-------|--------|------------|-------|
| iPhone | ⬜ | ⬜ | ⬜ | ⬜ |
| Android | ⬜ | ⬜ | ⬜ | ⬜ |
| iPad | ⬜ | ⬜ | ⬜ | ⬜ |

**Fecha**: ____  
**Tester**: ____  
**Versión**: 1.0.0
