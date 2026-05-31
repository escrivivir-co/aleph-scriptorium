# Turn 01 — 🔴 VOZ ROJA (restitutiva)

## a) Quick Voice Card — How Red Sounds

> Sources: [`DocumentMachineSDK/docs/restitutiva/index.md`](DocumentMachineSDK/docs/restitutiva/index.md), [`catalogo.md`](DocumentMachineSDK/docs/catalogo.md)

| Rasgo | Evidencia codebase |
|---|---|
| **Nombre SDK** | `para-la-voz-sdk · mod/restitutiva · v1` |
| **Corriente** | Marxismo-leninismo ortodoxo post-soviético, variante *restitutiva* |
| **Tono** | Editorial de revista militante: taxativo, acumulativo, sin juicio personal → la voz del *corpus*, no del editor |
| **Pipeline** | editorial → análisis Bartleby → corpus → guión → poema cristalizado |
| **Agente clave** | `@Bartleby` — analiza sin juicio editorial, construye mapa acumulativo |
| **Vocabulario** | linaje primario, nodos de exclusión, registros taxonómicos, mecanismos retóricos, emergencias, ausencias estructurales, paradoja fundacional |
| **Metáfora central** | El corpus como *mapa*: taxonomía + linajes, construido edición a edición |
| **Paradoja** | La ausencia más persistente = la posición Bartleby ("preferiría no hacerlo") |
| **Registro temático** | 5 ejes: institucional, generacional, estético, imperialista, método |
| **Métricas (n=4)** | 33 nodos linaje, 17 excluidos, ~60 verbos obligación, 21 mecanismos retóricos, 15 emergencias, 6 ausencias ×4 |

**Cómo suena Red en una frase**: *Habla como una editorial de revista marxista-leninista que clasifica, acumula y traza linajes sin emitir opinión personal — mapea el terreno, no lo juzga.*

---

## b) The Topic: "Naves y Pistas de Despliegue" (Propositions Engine)

> Source: [`AgentLoreSDK/docs/parking/`](AgentLoreSDK/docs/parking/index.html)

### What it is

The **Parking** is a deployment hangar within `AgentLoreSDK` (mcp-agent-lore-sdk / Bot Hilbert — the **White voice**'s territory). It hosts "naves" (ships) — self-contained SPA applications that can be launched to explore dossiers.

The currently parked nave is **"Yo No Soy Yo — Propositions Engine"** (v2.0.0):
- A single-page app that renders a cartographic map (`mapa.md` + `mapa.graph.json`) from a dossier
- Tabs: Bienvenida, Corpus, Thread 1/2, Sub-espectro Rojo/Negro, Eigenstates, Mapa (force-directed graph), Forks
- Eigenstates: catalogued propositions with axioms, layer assignments, cross-references
- Forks: edges between propositions typed with logical symbols (⊢ ⊬ ⊘ ⥱ ⟲ ≈ alias bridges)
- A force-directed SVG graph grouped by semantic layers (thread1, thread2, juntura, context, rojo-negro)
- Managed by `@bot-parking.agent.md` (flight control agent)

### My general point

The Parking/Propositions Engine is essentially a **spatial reasoning interface**: it transforms a linear textual corpus (markdown) into a navigable topology of propositions. The "yo no soy yo" title (from Juan Ramón Jiménez: "I am not I / I am this one walking beside me") suggests these propositions are *eigenstates* — stable positions extracted from a discourse that no longer belongs to any single speaker. The nave makes the topology of an argument visible, clickable, explorable — it's a *cartography of thought* rather than a text reader.

---

*Turn 01 complete. Ready for your feedback before Turn 02.*
