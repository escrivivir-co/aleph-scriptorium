# Dossier HiperGrifo / HIPER_CREDIT

*Presentación de proyecto. Materiales refactorizados a partir del corpus de conversación (`base.md`), puestos en contraste con el `mapa-ilustracion-2.0.md` y el dossier hermano `HIPER_ILP/`.*

---

## Qué es este dossier (y qué no)

Una conversación sobre cuatro dominios —sistema-mundo, global warming, presión fiscal, vivienda— convergió en una metáfora recurrente: **el capital nos mean en la cara y dice que llueve**. El daño es real; el relato que lo disfraza también. En el caso de la vivienda, un interlocutor (Borrego) propuso un *shock* crediticio —prohibir hipotecas a más de diez años— para hundir el precio como activo especulativo. El corpus (`base.md`) analizó lo genuino de esa propuesta, su genealogía (Minsky, Hudson, Ryan-Collins) y su mapa de antagonistas, y conectó la intuición con la imagen del templo profanado y el látigo.

Ese material tiene hallazgos reales. Pero tiene un defecto de forma que lo invalida como presentación: **mezcla análisis objetivo con réplica dialéctica y metáfora teológica sin degradarla a mecanismo testable**.

Este dossier **no** reproduce las conclusiones del chat ni su forma. Hace tres cosas:

1. **Conserva** lo que el corpus aporta de verdad: el diagnóstico de la financiarización de la vivienda como función del esfuerzo crediticio, la genealogía heterodoxa, el mapa de antagonistas, la metáfora templo/grifo/látigo como intuición de diseño.
2. **Disciplina** esos hallazgos con el aparato del mapa: el eje voz/mando, los tres tribunales (Marx, Freud, Marcuse), las tres hipótesis, la regla de capas (código para el singular, palabra para el universal).
3. **Reposiciona** HIPER_CREDIT: no es una ocurrencia de chat ni una teología del templo, sino **la capa de crédito-regulado que complementa la capa de voz de HiperIPL** en la Ilustración 2.0. Si HiperIPL ataca el mal parlamento, HiperGrifo ataca el mal grifo.

---

## La tesis del refactor (la espina dorsal)

> HIPER_CREDIT no es el episodio evangélico del templo. Es el **órgano de regulación crediticia de la Ilustración 2.0** — y como tal debe sobrevivir a los mismos tres tribunales y elegir bando en el eje voz/mando. Su teología (templo, látigo, usura) debe degradarse a **primitivas testables** (Temple, Faucet, Effort, Rain, Whip). Si no, el grifo se convierte en un nuevo ídolo: otro shock que golpea al necesitado y deja intacto al especulador.

---

## Índice de materiales

| Doc | Título | Función |
|---|---|---|
| `01` | Síntesis del proyecto | Qué es HIPER_CREDIT/HiperGrifo, el problema, complementariedad con HiperIPL |
| `02` | Genealogía: corrientes | Minsky, Hudson, Ryan-Collins, usura/templo, Borrego |
| `03` | El templo y el grifo | Degradar teología a mecanismo: Temple, Faucet, Effort, Rain, Whip |
| `04` | Stress-test | Tribunales Marx/Freud/Marcuse + objeción Blackstone |

**Orden de lectura recomendado para presentar:** `01` (qué es) → `02` y `03` (linaje y mecanismo) → `04` (por qué resiste la crítica dura).

---

## Mapa de procedencias (honestidad sobre las fuentes)

| Idea | Viene de | Qué le hace el refactor |
|---|---|---|
| Shock crediticio (máx. 10 años) | Borrego / `base.md` | Se conserva como escenario `⊢`; se confronta con alternativas supply-side (`⊬`) |
| Diagnóstico esfuerzo = precio | Borrego + Ryan-Collins | Se formaliza como primitiva `Effort` |
| Genealogía Minsky/Hudson | `base.md` §b | Se disciplina con mapa §1 y §8 |
| Mapa de antagonistas | `base.md` §c | Se serializa en `grafo/antagonistas.json` |
| Metáfora templo/látigo/usura | `base.md` (reflexión final) | Se degrada a primitivas en `03` y `grifo-lang` |
| Cuatro dominios / "dice que llueve" | Conversación inicial | Se puentea en `mapa-financializacion.md` |
| Eje voz/mando, tribunales, capas | `mapa-ilustracion-2.0.md` | Instrumento de disciplina |
| Complementariedad con HiperIPL | Plan artefacto | HiperIPL = voz; HiperGrifo = grifo regulado |

---

## Artefactos hermanos

| Artefacto | Función | Ruta |
|---|---|---|
| Corpus semilla | Conversación cruda (no editar) | `../base.md` |
| Papers de colores | Puente técnico Ethereum ↔ Scriptorium | `../papers-hipercredit/` |
| Mapa de financialización | Puente 4 dominios ↔ Ilustración 2.0 | `../mapa-financializacion.md` |
| Grafos | Antagonistas y escenarios futures-engine | `../grafo/` |
| grifo-lang | Spike Capa 2: primitivas + Horn + simulación | `../packages/grifo-lang/` |
