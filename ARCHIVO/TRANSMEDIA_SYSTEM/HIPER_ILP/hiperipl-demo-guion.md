# Guion de demo — HiperIPL para el equipo de diseño Scriptorium

> **Función:** storyboard de una demo de HiperIPL. **No** prepara ni toca nada ejecutable:
> es el guion escrito. **Audiencia:** equipo de diseño (autores de `dossier-hiperipl/` y
> `papers-hiperipl/`). **Énfasis:** reconciliar los papers con el dosier del 6-jun.
> **Estado:** propuesta. No cierra `SPEC?`.
> **Relacionados:** [`hiperipl-reconciliacion.md`](hiperipl-reconciliacion.md),
> [`hiperipl-integracion.md`](hiperipl-integracion.md), [`hiperipl-reanclaje.md`](hiperipl-reanclaje.md).

---

## 0. Tesis de la demo (una frase)

> Vuestros **papers de colores no son teoría suelta**: son las **voces de un dispositivo que
> ya existe** (`simulador-voces`), y HiperIPL es el **caso de uso** que las hace deliberar sobre
> una iniciativa real, federada con el díptico del 6-jun y medida con el lenguaje Aleph.

La demo está construida para que el equipo de diseño **vea su propio trabajo enchufado** a piezas
que corren, y entienda dónde encaja con el 6-jun (díptico + federación) que los papers no citaban.

---

## 1. Qué respalda cada acto (anclaje real, no humo)

| Acto | Pieza real que lo respalda | Estado | Qué se finge (Wizard-of-Oz) |
|---|---|---|---|
| 1. Proponer | `dossier-hiperipl/01-sintesis-proyecto.md` | READY (doc) | Nada: es narración |
| 2. Deliberar | `simulador-voces` + pack `red-blue-white-black` | READY (skill) | Nada: corre en vivo (si suben a Nivel 0) |
| 3. Cartografiar/medir | `graph` app (`aleph0..3`) + cuaderno azul `liria_rojipardismo_*.html` | READY (app) / BUILD (Nave HiperIPL) | La Nave force-directed con forks (no migrada): se usa cuaderno azul como sustituto |

> Rutas: `ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-GAMES/SCRIPTORIUM-CATALOG-PLAYER/.github/skills/simulador-voces/`,
> `NETWORK-ENGINE/packages/apps/src/catalog/graph/app.ts`,
> `DocumentMachineSDK/docs/azul/cuadernos/`.

---

## 2. Escaleta (storyboard de 3 actos, ~15-20 min)

### Acto 1 — Proponer: "la voz que se archiva" (≈3 min)

- **En pantalla:** una iniciativa popular legislativa concreta (elegir una real: p. ej. un tema
  de agua/territorio que conecte con la objeción Gaia de GREEN).
- **Narración:** problema del dossier `01` — la IPL existe pero está diseñada para fracasar
  (plazos, umbrales, archivo). HiperIPL = la capa de voz que falta (no "el atrio del Reino").
- **Qué demuestra:** el encuadre filosófico del equipo de diseño es el punto de partida, intacto.
- **Beat de reconciliación:** "esto es vuestro `dossier-hiperipl`; ahora vamos a verlo *correr*".

### Acto 2 — Deliberar: las cuatro voces de color (≈8 min, el centro)

- **En pantalla / en vivo:** una sesión de `simulador-voces` sobre la iniciativa del Acto 1, con
  el pack `red-blue-white-black`, en sus 5 rondas (Mapeo → Delta → Tensión → Síntesis → Final).
- **Narración guiada ronda a ronda:**
  - Ronda 1 (Mapeo): cada voz emite su veredicto micro-posicional desde su Voice Card.
  - Ronda 3 (Tensión): lectura cruzada — RED lee a BLACK, etc. (esto **es** la fricción
    deliberativa que pedía el tribunal de Freud en `dossier-hiperipl/04`).
  - Ronda 4 (Síntesis): cada voz produce una **directriz operativa** → candidatos a nodos de grafo.
- **Qué demuestra:** los colores WHITE/BLUE/RED/BLACK de los papers **ya son voces ejecutables**;
  la deliberación no hay que inventarla.
- **Beat de reconciliación (clímax para esta audiencia):** "RED/BLUE/WHITE/BLACK de vuestros papers
  == el pack `red-blue-white-black` que ya existe. Faltan **YELLOW** (formalismo `draft_01`) y
  **GREEN** (Gaia) como voces: ese es el hueco a llenar, no recrear el simulador". (Ver
  [`hiperipl-reconciliacion.md`](hiperipl-reconciliacion.md) §4.)

### Acto 3 — Cartografiar y medir: del debate a la topología (≈5 min)

- **En pantalla:** el `graph` app cargando un grafo Aleph (hoy `aleph0..3`; en la narración se
  reskinea a "iniciativa + apoyos + forks") y un cuaderno azul abierto como ejemplo de "Nave".
- **Narración:** la directriz de la Ronda 4 se vuelve nodo del grafo; la red de iniciativas es la
  **topología `Aleph_board`** del 6-jun; el alcance se mediría con `draft_01` (NOMON=hops, ℵ=alcance).
- **Qué demuestra:** la salida de la deliberación tiene un destino estructural (grafo navegable).
- **Beat de reconciliación (el puente con el 6-jun):** "vuestra hiperplaza == el `Aleph_board` del
  díptico; la persistencia/federación == la proyección `projectDomainToFederation()` del Epic F;
  la cartografía == el nodo azul". HiperIPL es un **caso de uso** que cose ambos cuerpos.

---

## 3. El momento de reconciliación (lo que esta audiencia se tiene que llevar)

Tres frases-ancla, una por brecha que detectamos:

1. **Colores → voces:** "Vuestros papers de colores ya tienen cuerpo: son `simulador-voces`."
2. **HiperIPL → díptico:** "Una iniciativa es un `Aleph_app` (sujeto); su red es `Aleph_board`
   (topología). El 6-jun ya construyó el anfitrión que los papers no citaban."
3. **future-machine ↔ federación:** "No competís con el díptico: la future-machine *ingiere y
   bifurca* el debate; la federación *ancla y persiste* la red. Se superponen."

Apoyo visual sugerido: el diagrama de [`hiperipl-reconciliacion.md`](hiperipl-reconciliacion.md) §2
(las cinco genealogías convergiendo en HiperIPL).

---

## 4. Honestidad en vivo (disclaimers que dan credibilidad)

Decirlo explícitamente durante la demo evita que parezca venta:

- La **Nave ideal** (grafo force-directed con forks `⊢⊬⊘⥱⟲≈`) **no está migrada** a esta máquina
  (solo hay un puntero al Mac). Hoy se sustituye por el cuaderno azul.
- `draft_01.ts` **no compila** todavía → la medida ℵ/HC se narra, no se ejecuta.
- **Federación real (SSB/Pub.Rooms)** y **anclaje EVM** son fases posteriores / `SPEC?`.
- `mapa-ilustracion-2.0.md` y `EXTERNO.md` (base del dossier) **no están** en el workspace.

---

## 5. Decisiones abiertas que la demo *expone* (sin cerrarlas)

La demo es buena ocasión para que el equipo de diseño vea sus `SPEC?` "en situación":

| SPEC? | Aparece en | Pregunta que la demo deja sobre la mesa |
|---|---|---|
| SPEC?-004 | Acto 2/3 | ¿Cómo firma un apoyo sin doxxing? (identidad SSB, F2) |
| SPEC?-008 | Acto 3 | ¿El grafo de iniciativas vive en RDF, Mongo o SSB on-read? (F1) |
| SPEC?-011 | Acto 2 (voz GREEN) | ¿El límite eco pesa más que el cuórum? |
| SPEC?-013 | Acto 3 | ¿Stack de la Nave: cuaderno estático, Threejs, Angular? |
| — | Acto 2 | ¿Se añaden voces YELLOW y GREEN al pack de colores? |

Ninguna se decide en la demo: se **muestran como frente abierto** (regla de oro de los papers).

---

## 6. Si más adelante se quiere subir de nivel

Este guion es Nivel "solo guion". Para activarlo:

- **Nivel 0 (sin código):** preparar la sesión `simulador-voces` con la iniciativa elegida y
  dejar listos `bun run start graph` + un cuaderno azul. Esfuerzo bajo.
- **Nivel 1 (slice fino):** construir la app `hiperipl` (Slice A de
  [`hiperipl-integracion.md`](hiperipl-integracion.md)) derivada de `aleph-os-dynamic` + `graph`.
  Esfuerzo ~1-2 días.

---

## 7. Checklist previo (cuando se decida ejecutar la demo)

- [ ] Elegir la iniciativa legislativa concreta (que toque agua/territorio para activar GREEN).
- [ ] Preparar Voice Cards del pack `red-blue-white-black` para el tema elegido.
- [ ] Decidir sustituto de Nave: cuaderno azul existente vs reskin del `graph` app.
- [ ] Tener a mano el diagrama de reconciliación (§2 de `hiperipl-reconciliacion.md`).
- [ ] Guion de disclaimers (§4) impreso para no improvisar la parte honesta.
