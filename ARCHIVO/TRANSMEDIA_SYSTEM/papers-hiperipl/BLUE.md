---
color: BLUE
rol: Nodo azul — interfaz humano-red, cartografía, Nave
audiencia: Diseñadores UI/UX, participantes ciudadanos, curadores ARG/transmedia
status: DRAFT
decisiones: ABIERTAS
dispositivo: HiperIPL / HiperILP — pendiente de fijar
---

# BLUE — Nodo azul: interfaz humano-red

*Lente central del dossier. Cómo la ciudadanía ve, navega y propone en el mapa — sin confundir UI con contenido.*

---

## §0 — Posición en la future-machine

BLUE es **Capa 6 (Dramaturgo / obra)** en su dimensión **de superficie**: lo que el pipeline produce **para humanos**.

```
Grafista (grafo) → Demiurgo (universo) → Dramaturgo (obra) → NODO AZUL (Nave)
```

El nodo azul **no decide**; **renderiza y permite navegar**. Es el mármol de la plaza, no la palabra (`dossier-hiperipl/03`).

**Fuente de verdad UI:** `DocumentMachineSDK/docs/azul/cuadernos/` (liria_rojipardismo_2d/3d/clusters.html) — cartografía publicada.

**Precedente navegable:** `AgentLoreSDK/docs/parking/yo-no-soy-yo-propositions-engine/nave/` (thread-eigenstate-viewer).

---

## §1 — Vocabulario fijado

De [`00-LEXICON.md`](./00-LEXICON.md): nodo azul, Nave, eigenstate, BOE, interfaz humano-red, universo, operaciones expandir/bifurcar/podar.

Términos BLUE:

| Término | Definición |
|---|---|
| **Interfaz humano-red (HNI)** | Superficie donde agentes humanos leen y actúan sobre el grafo sin poseer el Core |
| **Cuaderno azul** | Artefacto HTML/visual derivado de `docs/azul` para un caso de uso |
| **Eigenstate UI** | Nodo del grafo renderizado con posición, etiqueta, enlaces de fork |
| **Modo cartografía** | Vista de mapa completo (clusters, 2d, 3d) |
| **Modo iniciativa** | Vista centrada en un nodo T=0 con apoyos y escenarios T+ |

---

## §2 — Qué usamos del ecosistema

| Componente | Ruta | Rol BLUE |
|---|---|---|
| docs/azul | `DocumentMachineSDK/docs/azul/cuadernos/*.html` | Plantilla visual cartográfica |
| Nave yo-no-soy-yo | `AgentLoreSDK/docs/parking/.../nave/` | Patrón app.js + index + styles |
| mapa.graph.json | `AgentLoreSDK/.../mapa.graph.json` | Input del viewer |
| UISDKThreejs | submódulo `threejs-gamify-ui` | 3D opcional |
| HyperGraphEditor | plugin registry | Navegación de grafos |
| arg-board / ImpressJS | plugins | Tablero 3D ARG (referencia) |
| gh-pages | `docs/` → escrivivir-co.github.io | Publicación del cuaderno |

---

## §3 — HiperIPL desde la lente BLUE

### 3.1 Diseño desde el nodo azul (no al revés)

El error EXTERNO: construir teología y luego buscar UI. El refactor: **el dispositivo se define por lo que el ciudadano puede ver y hacer en la Nave**.

Flujos mínimos (especificación UX, no implementación):

| Acción | Operación universo | Vista |
|---|---|---|
| Explorar campo político | navegar grafo | Modo cartografía |
| Proponer iniciativa | `expandir` nodo T=0 | Formulario → nodo nuevo |
| Apoyar | `anclar` apoyo a nodo | Botón firma / wallet |
| Ver consecuencias | ramas T+ del futures-engine | Panel lateral dramático |
| Disentir del Core | `bifurcar` / `podar` | Wizard distro (advertencia RED) |
| Consultar BOE | leer registro canónico | Vista BOE sincronizada |

### 3.2 Relación cuadernos azul existentes

Los cuadernos `liria_rojipardismo_*` demuestran:

- **2d** — mapa legible en pantalla estándar.
- **3d** — profundidad temporal o jerárquica (T-N abajo, T+ arriba — propuesta, no fijada).
- **clusters** — agrupación por eigenstate / vía roja-negra.

HiperIPL debería producir un cuaderno **`hiperipl_2d.html`** (nombre ABIERTO) con el mismo pipeline de generación — SPEC?-013.

### 3.3 Human-network interfaces

La HNI no es solo wallet + formulario. Es:

1. **Lectura** — entender el mapa de posiciones (Cartógrafo).
2. **Acción** — firmar, proponer, bifurcar (con fricción deliberativa — Freud).
3. **Memoria** — BOE / itinerarios de sesión.
4. **Ficción útil** — escenarios del Dramaturgo como *cartografía de posibilidades*, no propaganda.

### 3.4 Riesgos UI (no decididos, documentados)

| Riesgo | Mitigación candidata |
|---|---|
| Mapa hermoso, inaccionable | Enlace explícito a acción territorial (GREEN) |
| Solo holders ven iniciativas | Modo lectura pública sin wallet |
| Gamificación especulativa | Sin yield por firmar (Marcuse) |
| 3D inaccesible | Siempre fallback 2d + texto (`mapa.md`) |

---

## §4 — Decisiones abiertas (`SPEC?`)

| ID | Decisión | Opciones | Estado | Quién |
|---|---|---|---|---|
| SPEC?-013 | Stack UI cuaderno | HTML estático / Threejs / Angular (n8n-editor port) | ABIERTA | UI lead |
| SPEC?-014 | Modos de vista | 2d only / 2d+3d / clusters obligatorio | ABIERTA | UX |
| SPEC?-015 | Wallet en UI | Obligatoria para leer / solo para actuar / read-only público | ABIERTA | Accesibilidad |
| SPEC?-016 | Idioma del mapa | ES only / i18n / generado por corpus | ABIERTA | PO |
| SPEC?-017 | Hosting Nave | gh-pages / scriptorium.escrivivir.co / IPFS | ABIERTA | DevOps |

---

## §5 — Integración AgentLoreSDK/docs

Estructura propuesta:

```
AgentLoreSDK/docs/
  biblioteca/hiperipl/
    mapa.md
    mapa.graph.json
  parking/hiperipl/nave/
    index.html    # fork de yo-no-soy-yo nave
    app.js        # carga grafo HiperIPL
    styles.css
DocumentMachineSDK/docs/azul/cuadernos/
  hiperipl_2d.html   # cuaderno publicado
```

Pipeline de generación: `@Grafista` exporta JSON → script (SPEC?-018) → cuaderno azul + Nave.

---

## §6 — Referencias DRY

- [`00-LEXICON.md`](./00-LEXICON.md)
- `DocumentMachineSDK/docs/azul/`
- `AgentLoreSDK/docs/parking/yo-no-soy-yo-propositions-engine/nave/`
- `dossier-hiperipl/03-el-centro-vacio.md` (mármol vs palabra)
