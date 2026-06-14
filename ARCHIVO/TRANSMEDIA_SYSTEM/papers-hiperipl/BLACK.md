---
color: BLACK
rol: Modelo de amenaza — NRx, privacidad, captura, Schmitt, anti-doxxing
audiencia: Security researchers, cypherpunks, críticos NRx, auditores EF
status: DRAFT
decisiones: ABIERTAS
dispositivo: HiperIPL / HiperILP — pendiente de fijar
---

# BLACK — Modelo de amenaza y deslinde

*Vía negra disciplinada. Quién ataca HiperIPL, cómo se defiende la privacidad del disidente, y por qué el dispositivo no es NRx con interfaz amable.*

---

## §0 — Posición en la future-machine

BLACK protege **Capa 1–3 (corpus)** y **Capa 4 (grafo)** contra:

- **Captura** (mando disfrazado de voz).
- **Vigilancia** (transparencia panóptica).
- **Secesión feudal** (exit NRx).

Es la contraparte de RED: RED dice cómo nos gobernamos; BLACK dice **de quién nos defendemos**.

El nodo azul debe permitir **participación sin doxxing** — o confiesa ser templo/panóptico.

---

## §1 — Vocabulario fijado

De [`00-LEXICON.md`](./00-LEXICON.md): hipótesis A, exit NRx, exclusión silenciosa, transparencia panóptica, hipótesis C, Schmitt en protocolo.

Términos BLACK:

| Término | Definición |
|---|---|
| **Amenaza NRx** | CEO-monarca, patchwork, humano contingente, exit de élites |
| **Captura plutocrática** | Stakers/validadores controlan visibilidad y gobernanza |
| **Doxxing legislativo** | Ledger público expone apoyos para represalia |
| **Simetría del secreto** | Mismo cripto protege disidente y evasor — aceptada o no |
| **Tornado moment** | Estado sanciona contrato autónomo (Tornado Cash 2022) |

---

## §2 — Qué usamos del ecosistema

| Componente | Ruta | Rol BLACK |
|---|---|---|
| mapa §4, §6 | `mapa-ilustracion-2.0.md` | Vitalik vs Thiel; Monero/Zcash |
| dossier 04 | `dossier-hiperipl/04-stress-test.md` | Fork=NRx, Schmitt |
| mapa.md N1–N7 | AgentLoreSDK | Vía negra anarquista |
| Monero/Zcash | mapa §6 | Modelo privacidad |
| Tornado Cash | mapa §3.3 | Precedente represión |
| zk / attestations | vocabulario WHITE | Anti-doxxing candidato |

---

## §3 — HiperIPL desde la lente BLACK

### 3.1 Matriz de amenazas

| Amenaza | Vector | Mitigación candidata | SPEC? |
|---|---|---|---|
| **NRx / network state** | Exit como primera opción | exit-to-community | RED |
| **Plutocracia** | 1 token 1 voto | 1p1v, FQ | RED |
| **Schmitt** | Multisig fork | Permissionless distro | RED/YELLOW |
| **Panóptico** | Cadena transparente | zk support / pool privado | BLACK |
| **Exclusión silenciosa** | Sin hardware/educación | Acceso público, BOE Oasis | BLUE |
| **Sybil** | Identidad falsa | Attestations / proof of personhood | SPEC?-004 |
| **Estado** | Sanción contratos | Jurisdicción / off-chain BOE | SPEC?-002 |
| **Anestésico** | Engagement sin efecto | GREEN derivación | GREEN |

### 3.2 Deslinde explícito de NRx

| Tesis NRx/Land | Respuesta HiperIPL (aspiración, no hecho) |
|---|---|
| Humano contingente | Humano titular de voz; IA responde *ante*, no *en* |
| Exit > voice | Voice + exit último recurso |
| CEO-monarca | Core vacío + neutralidad creíble |
| Patchwork señoríos | Distros federadas, no feudos cerrados |
| Aceleracionismo | d/acc: defensa + democracia |

**Genealogía incómoda (honesta):** misma cuna (Thiel, cypherpunks, exit). BLACK no niega — **discute la herencia**.

### 3.3 Privacidad: espectro documentado

| Nivel | Tecnología | Protege disidente | Riesgo |
|---|---|---|---|
| 0 | Ethereum transparente | No | Panóptico |
| 1 | Pseudónimo wallet | Parcial | Clustering |
| 2 | zk attestation ("soy persona") | Alto | Sybil si mal diseñado |
| 3 | Apoyo en pool privado (Tornado-like) | Alto | Sanción estatal |
| 4 | BOE solo Oasis/SSB | Alto off-chain | Menor anclaje L2 |

**Ningún nivel elegido** — SPEC?-027.

### 3.4 Simetría del secreto

La inviolabilidad del domicilio protege al culpable también. HiperIPL hereda la pregunta del mapa §10.3: ¿acepta la simetría? Opciones: sí / no / contexto (iniciativas de derechos vs financiación).

---

## §4 — Decisiones abiertas (`SPEC?`)

| ID | Decisión | Opciones | Estado | Quién |
|---|---|---|---|---|
| SPEC?-027 | Nivel privacidad apoyos | 0–4 (ver §3.3) | ABIERTA | Cypherpunks + RED |
| SPEC?-028 | Simetría secreto | Aceptar / rechazar / híbrido | ABIERTA | Jurídico |
| SPEC?-029 | Resistencia censura | Multi-chain / Oasis / ambos | ABIERTA | Infra |
| SPEC?-030 | Threat model formal | STRIDE / custom / ninguno | ABIERTA | Security |
| SPEC?-002 | BOE off-chain vs on-chain | (ver WHITE) | ABIERTA | — |

---

## §5 — Integración AgentLoreSDK/docs

- **`aleph-actores.md`**: actores amenaza (Estado, ballena, NRx) como nodos meta.
- **Parking Nave:** modo "solo lectura" sin wallet para observadores.
- **Capa negra en mapa R/N/RN:** posicionar iniciativas capturadas como eigenstates de riesgo.

---

## §6 — Referencias DRY

- [`mapa-ilustracion-2.0.md`](../mapa-ilustracion-2.0.md) §3–§4, §6, §10
- [`dossier-hiperipl/04-stress-test.md`](../dossier-hiperipl/04-stress-test.md)
- Vitalik d/acc (2025); Tornado Cash sanctions (2022)
