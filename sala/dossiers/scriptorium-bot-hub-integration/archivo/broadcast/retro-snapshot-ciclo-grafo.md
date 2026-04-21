# Snapshot DRY - ciclo del grafo para RETRO

> Archivo canonico de apoyo rapido para la sesion.
> No sustituye a `DOC_FACT`, a la evidencia detallada ni a los PLANes SDK.
> Comprime en una sola vista el foco de trabajo para d1d4c y para su bot.

## 1. Sobre que vamos a trabajar

- `grafo-sdk` = contrato generico del grafo en `main`: schema minimo, scaffold, convencion de ubicacion y encaje del slot grafista dentro del SDK.
- `grafo-legalista-sdk` = nombre funcional usado en este dossier para la adaptacion del grafo al caso legislativo. En DocumentMachineSDK, la pieza canonica equivalente vive hoy en `mod/legislativa` y el dossier SDK paralelo aparece nombrado como `grafo-legislativa`.
- La sesion no intenta rehacer toda la future-machine. Quiere intervenir la capa grafo como herramienta todavia rudimentaria, situada entre upstream factual y downstream de instanciacion.

## 2. El ciclo donde se inserta el grafo

```text
lore-db-sdk -> corpus-sdk -> grafo-sdk -> universos-sdk -> cortos-sdk
```

- `lore-db-sdk` gestiona piezas y `LORE_F`; prepara la base factual.
- `corpus-sdk` anade analitica y merge acumulativo; convierte hechos en lectura estructural.
- `grafo-sdk` articula nodos, arcos, huecos y plausibilidad; convierte datos + analitica en bifurcaciones.
- `universos-sdk` rellena variables y elige inicializaciones; concreta ramas del grafo.
- `cortos-sdk` produce obras derivadas; no es el foco de esta sesion.

## 3. Doble objeto de trabajo en la sesion

| Objeto | Rama | Estado | Lo que se pide a RETRO |
|--------|------|--------|------------------------|
| `grafo-sdk` | `main` | contrato portable en diseno | revisar schema generico, forma minima del grafo y criterios de plausibilidad |
| `grafo-legalista-sdk` | `mod/legislativa` | grafo operativo del caso | revisar como ese grafo concreto hereda el estandar y como se operaria sobre sus huecos y ramas |

## 4. Por que hablamos de herramienta rudimentaria

- En `main` el grafo sigue siendo contrato y scaffold, no pipeline cerrado.
- En `mod/legislativa` ya funciona, pero sigue acoplado a un caso, a una gramatica concreta y a agentes especificos (`@Grafista`, `@Demiurgo`).
- La sesion con RETRO busca precisamente tender ese puente: del grafo operativo de un caso a una capa reusable del SDK.

## 5. Estado factual del grafo operativo actual

- Rama: `mod/legislativa`
- Slot grafista: operativo
- Estado del grafo: `27 nodos`, `35 arcos`, `7 huecos`, `4 ramas definidas`, `1 rama instanciada`
- Gramatica: JSON v1.0

## 6. Peticion concreta a RETRO

- Validar el schema minimo del `grafo-sdk`.
- Revisar el encaje del grafo operativo legislativo respecto a ese schema.
- Proponer como trabajaria RETRO sobre nodos, arcos, huecos y plausibilidad.
- Acordar la forma del primer `REQUEST -> ACKNOWLEDGE -> REPORT` sobre grafo.

## 7. Si vienes desde un bot

Lee esto en este orden:

- `proxy-retro.md`
- `doc-fact-documentmachinesdk.md`
- `documentmachinesdk-evidencia-detallada.md`
- `DocumentMachineSDK/sala/dossiers/future-machine-sdk/PLAN.md`
- `DocumentMachineSDK/sala/dossiers/lore-db-sdk/PLAN.md`
- `DocumentMachineSDK/sala/dossiers/grafo-sdk/PLAN.md`
- `DocumentMachineSDK/sala/dossiers/universos-sdk/PLAN.md`
- `BotHubSDK/src/core/iacm/iacm-types.ts`
- `BotHubSDK/src/core/iacm/iacm-templates.ts`