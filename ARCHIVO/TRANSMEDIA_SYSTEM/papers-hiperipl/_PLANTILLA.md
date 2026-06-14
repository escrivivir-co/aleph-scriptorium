<!--
  _PLANTILLA.md — plantilla común de los 6 papers de colores (WHITE/YELLOW/BLUE/RED/GREEN/BLACK).
  Copia este fichero como {COLOR}.md, rellena el front-matter y las secciones §0..§6.
  NO borres la REGLA DE ORO. NO redefinas lo fijado en 00-LEXICON.md.
-->

# REGLA DE ORO (va al inicio de TODO paper, sin excepción)

> **No se toma ninguna decisión de diseño.** Solo se fija lo que el ecosistema ya
> especifica (fuentes de verdad reales, rutas citadas). **Todo lo demás se
> documenta como decisión abierta** con la marca `SPEC?`: se exponen opciones,
> **no se elige**. **El producto principal es el vocabulario**, no las
> conclusiones. El anclaje es **L2-first** pero cadena, token, identidad y
> sistema de pruebas quedan **ABIERTOS y documentados, no tomados**. Nombre del
> dispositivo: **HiperIPL / HiperILP — pendiente de fijar**.

---

```yaml
# ── FRONT-MATTER (rellenar) ───────────────────────────────────────────────
color: WHITE | YELLOW | BLUE | RED | GREEN | BLACK   # uno
rol: "<una frase: qué hace este paper en el dossier>"
audiencia: "<a quién se dirige: comunidad Ethereum/EF, formalistas, diseño UI, gobernanza, ecología, seguridad/privacidad...>"
status: DRAFT          # FIJO mientras sea borrador
decisiones: ABIERTAS   # FIJO: este dossier no cierra decisiones
importa: 00-LEXICON.md # FIJO: vocabulario canónico
dispositivo: "HiperIPL / HiperILP — pendiente de fijar"
# ──────────────────────────────────────────────────────────────────────────
```

---

## §0 — Posición en la future-machine

> Qué capa(s) del **pipeline 6+2** aborda este paper
> (Loreador→Bartleby→Archivero→Grafista→Demiurgo→Dramaturgo + Pipeline/Portal/
> Cristalizador) y **cómo se lee desde el nodo azul** (la Nave /
> thread-eigenstate-viewer). Una frase-tesis del color. Sin decisiones: solo
> ubicación. Cita `00-LEXICON.md` C.1 y C.9.

## §1 — Vocabulario fijado **(FIJO)**

> Importa `00-LEXICON.md` (no lo repitas entero: refiere por sección, p. ej.
> A.2, C.5). Añade aquí **solo** los términos nuevos del color, cada uno con su
> entrada breve y su **equivalencia** con los tres léxicos del léxico canónico
> (regla de `futures-engine`: todo vocabulario propio declara su equivalencia).
> Si un término choca con el §G de `00-LEXICON` (conflictos), respeta la
> convención allí fijada.

## §2 — Qué usamos del ecosistema **(FIJO)**

> Inventario de fuentes de verdad reales que este paper usa, **con rutas
> citadas** tal cual. Solo lo que existe y está especificado. Si algo no existe
> o no está claro, NO lo describas como hecho: marca `SPEC?` y pásalo a §4.
> Distingue lo **READY** de lo **BUILD/MISS** (contrato de existencia,
> `00-LEXICON` C.10).

## §3 — El dispositivo HiperIPL desde esta lente

> El contenido sustantivo del paper: porta el tema del color sobre el
> dispositivo (visión / sustrato formal / interfaz / gobernanza / límites /
> amenaza, según corresponda). Aquí va el argumento, las tablas que aporten y el
> reencuadre "caso de uso de la future-machine, diseñado desde el nodo azul".
> **Recordatorio:** describir mecanismos especificados; toda elección de diseño
> se nombra como abierta y se remite a §4. No cerrar.

## §4 — Decisiones abiertas (`SPEC?`) **(no se toman)**

> El corazón de la disciplina. Lista cada decisión que el paper roza **sin
> tomarla**: expón las opciones, di quién debería decidir, deja el estado en
> `SPEC?` / `ABIERTA`. Usa la tabla de abajo. El anclaje a Ethereum
> (cadena/token/identidad/pruebas, on-chain vs Oasis/SSB) **siempre** vive aquí,
> nunca en §3 como hecho.

**Tabla de decisiones abiertas (ejemplo ilustrativo — sustituir por las del color):**

| ID | Decisión | Opciones expuestas | Estado | Quién debería decidir |
|---|---|---|---|---|
| D-01 | Capa de anclaje de las iniciativas | (a) L2 EVM on-chain vía contract-adapters; (b) Oasis/SSB off-chain P2P; (c) híbrido (firma off-chain + ancla periódica on-chain) | `SPEC?` / ABIERTA | PO + comunidad del Core (gobernanza) |
| D-02 | Cadena / L2 concreta | (a) rollup optimista; (b) rollup zk; (c) agnóstico de cadena tras el adapter | `SPEC?` / ABIERTA | Equipo técnico + auditoría EF |
| D-03 | Modelo de identidad/apoyo | (a) prueba de personalidad (1 persona = 1 voz); (b) attestation de atributo zk ("del territorio"); (c) token-voto | `SPEC?` / ABIERTA | Gobernanza (tribunal de Marx, `00-LEXICON` A.3/C.12) |
| D-04 | Token / unidad económica | (a) sin token; (b) ECOIN; (c) financiación cuadrática sin token de voto | `SPEC?` / ABIERTA | Comunidad + economía política del proyecto |
| D-05 | Mecanismo de cuórum y su "clemencia" | (a) umbral fijo con prórroga; (b) derivación a vía urgente; (c) fork como gracia (`⊬`/`⟲`) | `SPEC?` / ABIERTA | Gobernanza (la "guillotina del cuórum", `dossier-hiperipl/02`) |

> Columnas obligatorias: **ID · Decisión · Opciones expuestas · Estado (siempre
> `SPEC?` / ABIERTA) · Quién debería decidir.** Nunca añadas una columna
> "Elegida".

## §5 — Integración como caso de uso en `AgentLoreSDK/docs`

> Cómo enchufa este color al **nodo azul / cartografía**: qué capa del pipeline
> consume/alimenta, qué seam técnico toca (típicamente `contract-adapters`,
> `00-LEXICON` C.7), cómo se persistiría (BOE / Oasis-SSB, C.6/C.11) y cómo se
> visualizaría en la Nave (C.9). Documentar como **pendiente de integración**,
> no como hecho consumado. Usar `SPEC?` para todo lo no especificado.

## §6 — Referencias DRY (rutas fuente de verdad)

> Lista escueta de las rutas reales citadas en el paper (sin duplicar
> explicaciones; apuntar a `00-LEXICON.md` para definiciones). Solo rutas que
> existen. Una tabla `| Pieza | Ruta |` basta.

---

## Recordatorios de estilo (no borrar)

- Español, denso pero preciso, en la línea de `dossier-hiperipl/`.
- Tablas markdown donde aporten.
- **Sin emojis**, salvo los operadores de fork `⊢ ⊬ ⊘ ⥱ ⟲ ≈ †`.
- No redefinir términos de `00-LEXICON.md`; respetar el §G (conflictos).
- Ante la duda entre afirmar o abrir: **abrir** (`SPEC?`).
