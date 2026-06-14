# Devolución al equipo de diseño — re-anclaje HiperIPL en Scriptorium federado

> **Para:** equipo de diseño Scriptorium (autores de `dossier-hiperipl/` y `papers-hiperipl/`).
> **De:** auditoría ASI NETWORK-ENGINE (14-jun-2026).
> **Estado:** contribución corregida — no modifica los papers; propone correcciones de procedencia.
> **Análisis completo:** ver carpeta `SCRIPTORIUM-CORE/NETWORK-ENGINE/SCRATCHPAD/`.

---

## Resumen ejecutivo

1. **El dossier filosófico (00-05) está bien.** Mantenerlo como base de presentación.
2. **El puente `[TEC]` apunta al linaje correcto** del Scriptorium (plan maestro + future-machine +
   nodo azul), pero las **rutas deben reescribirse** para el workspace `aleph-scriptorium`
   (no `/Users/morente/Desktop/THEIA_PATH/...`).
3. **Varias piezas que parecían "externas" existen** como submódulos del mismo monorepo:
   `DocumentMachineSDK`, `.github_V1`, `SCRIPTORIUM-GAMES`, `BlockchainComPort`, etc.
4. **Otras piezas no están migradas** a esta máquina: Cartógrafo `yo-no-soy-yo`, `mapa-ilustracion-2.0.md`,
   `EXTERNO.md`, `future-pipeline-engine/`. Marcarlas explícitamente como **NO MIGRADO**.
5. **Falta cruzar el dosier del 6-jun** (`SESION_06_JUNIO`): díptico, 4 juegos, Epic F de federación.
6. **Hallazgo de reúso:** el pack `red-blue-white-black` de `simulador-voces` solapa con sus papers
   RED/BLUE/WHITE/BLACK — no recrear deliberación desde cero.
7. **`draft_01.ts` no compila hoy** — no presentarlo como "capa de garantías ejecutable" hasta spike.
8. **`contract-adapters` no es seam EVM** — es frontera hacia MCP/UI; anclaje on-chain sigue en `SPEC?`.

---

## Qué corregir en la próxima revisión del LEXICON

| Acción | Detalle |
|---|---|
| Reescribir rutas | Prefijo `aleph-scriptorium/` relativo al root; tabla en [`hiperipl-reanclaje.md`](../SCRIPTORIUM-CORE/NETWORK-ENGINE/SCRATCHPAD/hiperipl-reanclaje.md) |
| Añadir G4 + G5 | Referencias a `SESION_06_JUNIO/` y `simulador-voces` |
| Graduar madurez | Aplicar READY/BUILD/MISS a §C (ver tabla re-anclaje) |
| Cartógrafo | Cambiar ruta `AgentLoreSDK/...` → estado MISS + puntero real en SCRIPTORIUM-GAMES |
| `01_PLAN_MAESTRO` | Confirmar ruta `ARCHIVO/TRANSMEDIA_SYSTEM/SCRIPTORIUM-CORE/01_PLAN_MAESTRO_TOPDOWN.md` |
| EVM | Mantener en §4 SPEC?; no afirmar en §2 "READY" |

---

## Cómo encaja HiperIPL en el Scriptorium (una frase)

> HiperIPL es un **caso de uso** que superpone la **future-machine** (ingestión y grafo),
> el **díptico 6-jun** (sujeto + topología federada), el **simulador de voces** (deliberación)
> y el **dossier filosófico** (tribunales), con **NETWORK-ENGINE** como cerebro de contratos
> que **proyecta** hacia servicios hermanos (SSB, Pub.Rooms, nodo azul).

Diagrama y correspondencias: [`hiperipl-reconciliacion.md`](../SCRIPTORIUM-CORE/NETWORK-ENGINE/SCRATCHPAD/hiperipl-reconciliacion.md).

---

## Hoja de ruta de integración (para PO / scrum)

No es un programa nuevo: se monta sobre **Epic F** y **MVP** ya definidos el 6-jun.

| Fase | Entregable HiperIPL |
|---|---|
| 0 | Relay hub (prerrequisito federación) |
| 1 | `DomainContract` iniciativa + app `hiperipl` lectura |
| 2 | Sesión `simulador-voces` + export grafo |
| 3 | Topología `subscribesTo` + medida ℵ |
| 4 | Adaptadores SSB + Pub.Rooms |
| 5 | Formalismo + L2 (posterior) |

Detalle: [`hiperipl-integracion.md`](../SCRIPTORIUM-CORE/NETWORK-ENGINE/SCRATCHPAD/hiperipl-integracion.md).

---

## Documentos de soporte (NETWORK-ENGINE / SCRATCHPAD)

| Archivo | Contenido |
|---|---|
| [`auditoria-hiperipl.md`](../SCRIPTORIUM-CORE/NETWORK-ENGINE/SCRATCHPAD/auditoria-hiperipl.md) | Veredicto corregido + matriz migración |
| [`hiperipl-reanclaje.md`](../SCRIPTORIUM-CORE/NETWORK-ENGINE/SCRATCHPAD/hiperipl-reanclaje.md) | Tabla rutas + READY/BUILD/MISS |
| [`hiperipl-reconciliacion.md`](../SCRIPTORIUM-CORE/NETWORK-ENGINE/SCRATCHPAD/hiperipl-reconciliacion.md) | Genealogías reconciliadas |
| [`hiperipl-integracion.md`](../SCRIPTORIUM-CORE/NETWORK-ENGINE/SCRATCHPAD/hiperipl-integracion.md) | Roadmap de construcción |

---

## Ruta de promoción (cuando scrum valide)

1. **Corto plazo:** incorporar correcciones de procedencia en `00-LEXICON.md` (rutas + §C graduado).
2. **Medio plazo:** spike Slice A+B (app `hiperipl` + `Initiative` contract) en Sprint posterior al relay (Fase 0).
3. **Largo plazo:** promover programa federación + HiperIPL a
   `SCRIPTORIUM-CORE/NETWORK-ENGINE/DOSSIERS/federation-topology.md`
   (DoD ya previsto en [`Federation_ASI_Program.md`](../SCRIPTORIUM-CORE/NETWORK-ENGINE/SCRATCHPAD/SESION_06_JUNIO/Federation_ASI_Program.md) §10).

---

## Lo que no pedimos cambiar

- Tesis filosófica del dossier (centro vacío, guillotina, tribunales, Gaia).
- Regla de oro `SPEC?` (no cerrar decisiones en el dossier).
- Estructura de papers de colores.
- Reencuadre "caso de uso future-machine diseñado desde nodo azul" — **es correcto**;
  solo falta anclaje operativo y cruce con 6-jun.
