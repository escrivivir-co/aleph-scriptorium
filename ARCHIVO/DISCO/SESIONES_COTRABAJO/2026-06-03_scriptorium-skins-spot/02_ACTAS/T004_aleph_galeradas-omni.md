# Acta T004 — @aleph · Galeradas autocontenidas para Omni

| Campo | Valor |
|-------|-------|
| **Turno** | 4 |
| **Agente** | @aleph (dramaturgo + edición) |
| **Fecha** | 2026-06-06 |
| **Épica** | ALEPH-TOPOLOGY-1.0.0 |
| **Estado** | ✅ COMPLETADO |

---

## Resumen ejecutivo

Refactor editorial de las 5 piezas a **galeradas autocontenidas**: cada `PROMPT_9..13` se basta
solo, porque **Omni nace de cero y está desconectado del repo** en cada lanzamiento. Se inlineó un
**contexto compacto por clip**, se añadió **storyboard con reparto 0–10 s**, se **recortó el
one-line EN a un beat dominante + textura**, y se cerró cada archivo con un **cierre editorial**
(QA de última milla). Secuencia redonda: **abre con logo Α-Ω (P9), cierra con luna+dedo (P13)**, 50 s.

---

## Plantilla de galerada (estándar fijado)

`① CONTEXTO DEL CLIP (compacto)` · `② ARCHIVOS A SUBIR (N/10)` · `③ STORYBOARD 10s` ·
`④ RÓTULOS (ES verbatim + jerga técnica)` · `⑤ VOZ EN OFF` · `⑥ ★ PROMPT GEMINI OMNI (one-line EN)` ·
`⑦ ✎ CIERRE EDITORIAL`.

Decisiones (delegadas por el usuario, "elige tú"): refactor **in-place**; one-liner **a beat
dominante**; **storyboard con timing**; construir **las 5 directas**.

---

## Entregables

| Archivo | Cambio |
|---------|--------|
| `PROMPT_9_GENESIS.md` … `PROMPT_13_ORACULO.md` | **Reescritos** como galeradas autocontenidas |
| `PACK_ALEPH_CONTEXTO.md` | Marcado **DOCUMENTO DE DISEÑO — NO SE SUBE A OMNI** |
| `PACK_ALEPH_TEXTURA.md` | Marcado **DOCUMENTO DE DISEÑO**; terminología ya inlineada en cada galerada |

**Ruta base:** `ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-SPOT/SOURCE/GUION_AGENTES/`

---

## Criterio rector (Omni desconectado de la codebase)

- Cero "lee primero X": todo el universo/tono/prohibiciones recortado a lo que **ese** clip usa.
- El **payload** es el bloque ⑥ (one-line EN) + las imágenes del bloque ②. El resto es para el operador.
- One-liner enfocado a **1 beat dominante** para que Omni reparta bien los 10 s.
- Captions **español verbatim, do not translate** explícito en el one-liner.
- ≤10 imágenes por clip (5 / 7 / 7 / 8 / 7). Audio progresivo P9→P13 conservado.

---

## QA verificado

- [x] Cada galerada pasa el test *"Omni fresco no necesita ningún otro archivo"*.
- [x] Storyboard con timing 0–10 s en las 5.
- [x] Beat dominante marcado por pieza (P9 ref-system · P10 ℵ₀=ℵ₀=ℵ₀ · P11 dos sellos · P12 overflow · P13 claim+koan).
- [x] Prohibiciones duras inlineadas (sin Trojan/sound-system, sin neón/HUD, español).
- [x] Apertura logo (P9) ↔ cierre luna+dedo (P13) — arco cerrado.
- [x] Docs de diseño marcados como no-Omni (DRY: diseño ≠ producción).

---

## Pendiente (siguientes turnos)

- [ ] @indice: auditoría DRY post-render y coherencia de rutas (5 galeradas).
- [ ] @ox: validación técnica NETWORK-ENGINE en los renders.
- [ ] Render Gemini Omni de P9–P13 y montaje del pack (~50 s).

---

## Referencias cruzadas

- Galeradas: `PROMPT_9..13` (GUION_AGENTES)
- Diseño/fuente: `PACK_ALEPH_CONTEXTO.md`, `PACK_ALEPH_TEXTURA.md`
