# Snapshot DRY - ciclo del grafo para RETRO

> Archivo canonico de apoyo rapido para la sesion.
> No sustituye a `DOC_FACT`, a la evidencia detallada ni a los PLANes SDK.
> Comprime en una sola vista el foco de trabajo para d1d4c y para su bot.

## 0. Entrada titular para ubicarse rapido

- Vision global de la DocumentMachineSDK y del proceso completo: https://escrivivir-co.github.io/para-la-voz-sdk/engine/
- Landing publica del SDK activo: https://escrivivir-co.github.io/para-la-voz-sdk/
- Esa landing publica hoy el mod vivo de `mod/restitutiva`; aunque RETRO no sea su destinatario natural, sirve para ver la DocumentMachineSDK como producto completo y ubicar donde cae el grafo dentro del proceso.

## 1. Sobre que vamos a trabajar

- `grafo-sdk` = contrato generico del grafo en `main`: schema minimo, scaffold, convencion de ubicacion y encaje del slot grafista dentro del SDK.
- `grafo-legalista-sdk` = nombre funcional usado en este dossier para la adaptacion del grafo al caso legislativo. En DocumentMachineSDK, la pieza canonica equivalente vive hoy en `mod/legislativa` y el dossier SDK paralelo aparece nombrado como `grafo-legislativa`.
- La sesion no intenta rehacer toda la future-machine. Quiere intervenir la capa grafo como herramienta todavia rudimentaria, situada entre upstream factual y downstream de instanciacion.

### Ancla futura relevante para RETRO

- El upstream factual del grafo depende de `lore-db-sdk`: piezas y `LORE_F`.
- Ese acceso upstream queda ya ligado a la extension pendiente `scrum-backlog-lore-db-vector-expansion`, que abre una pasarela MCP para contenido lore.
- Lectura correcta para RETRO: el grafo debe seguir siendo compatible con acceso texto/markdown, pero la direccion futura del SDK es **vector enhanced retrieval** sobre piezas y `LORE_F`, con fallback texto para compatibilidad.
- Referencia del track futuro: `sala/dossiers/scrum-backlog-lore-db-vector-expansion/PLAN.md`.

## 2. El ciclo donde se inserta el grafo

```text
lore-db-sdk -> corpus-sdk -> grafo-sdk -> universos-sdk -> cortos-sdk
```

- `lore-db-sdk` gestiona piezas y `LORE_F`; prepara la base factual.
- `lore-db-sdk` hoy puede operar en modo texto, pero la extension pendiente anade una capa de acceso vector enhanced via MCP server para recuperar piezas, `LORE_F` y vecinos semanticos sin romper compatibilidad.
- `corpus-sdk` anade analitica y merge acumulativo; convierte hechos en lectura estructural.
- `grafo-sdk` articula nodos, arcos, huecos y plausibilidad; convierte datos + analitica en bifurcaciones.
- `universos-sdk` rellena variables y elige inicializaciones; concreta ramas del grafo.
- `cortos-sdk` produce obras derivadas; no es el foco de esta sesion.

### Lectura operativa del ciclo para esta sesion

- Si RETRO habla hoy de acceso a piezas, puede asumir dos modos validos: `modo texto` por ruta y `modo MCP vector enhanced` como extension futura ya planificada.
- La intervencion sobre `grafo-sdk` deberia ser compatible con ambos, sin exigir que la capa vectorial este ya implementada para empezar el trabajo conceptual.

## 3. Doble objeto de trabajo en la sesion

| Objeto | Rama | Estado | Lo que se pide a RETRO |
|--------|------|--------|------------------------|
| `grafo-sdk` | `main` | contrato portable en diseno | revisar schema generico, forma minima del grafo y criterios de plausibilidad |
| `grafo-legalista-sdk` | `mod/legislativa` | grafo operativo del caso | revisar como ese grafo concreto hereda el estandar y como se operaria sobre sus huecos y ramas |

### Vista rapida tipo `ls -la` del grafo legislativo

```text
origin/mod/legislativa:DRAFTS2/grafo/
	arcos.json        7711 B
	gramatica.md      5819 B
	huecos.json       2208 B
	index.json         719 B
	nodos.json        9282 B
```

Esos son los 5 ficheros nucleares que hoy maneja el slot grafista en el mod.

## 4. Por que hablamos de herramienta rudimentaria

- En `main` el grafo sigue siendo contrato y scaffold, no pipeline cerrado.
- En `mod/legislativa` ya funciona, pero sigue acoplado a un caso, a una gramatica concreta y a agentes especificos (`@Grafista`, `@Demiurgo`).
- La sesion con RETRO busca precisamente tender ese puente: del grafo operativo de un caso a una capa reusable del SDK.
- Parte de ese puente ahora queda explicitado: el grafo no solo heredara markdown factual, sino una futura pasarela MCP de lore vector enhanced para consulta de piezas y `LORE_F`.

## 5. Estado factual del grafo operativo actual

- Rama: `mod/legislativa`
- Slot grafista: operativo
- Estado del grafo: `27 nodos`, `35 arcos`, `7 huecos`, `4 ramas definidas`, `1 rama instanciada`
- Gramatica: JSON v1.0

### Snapshot rapido de `grafo-legalista-sdk`

```text
LORE_F-rev-044.md + CORPUS_PREVIEW-rev-045.md + LORE_F-02_ARTEFACTO.md
				-> DRAFTS2/grafo/{index,nodos,arcos,huecos}.json
				-> LORE_F-02_UNIVERSO.md
				-> DRAFTS2/universo/
```

- Caso: `Zoowoman / caso Feo`
- `index.json` referencia de entrada: `DRAFTS2/CORPUS_PREVIEW-rev-045.md`
- hilo factual de entrada: `DRAFTS2/LORE_F-rev-044.md`
- artefacto de entrada: `DRAFTS2/LORE_F-02_ARTEFACTO.md`
- salida inmediata del grafo: `DRAFTS2/LORE_F-02_UNIVERSO.md`
- desglose de nodos en `index.json`: `15 estado`, `5 bifurcacion`, `7 rama`
- huecos: `7` totales, `2` abiertos, `5` resueltos

## 6. Peticion concreta a RETRO

- Validar el schema minimo del `grafo-sdk`.
- Revisar el encaje del grafo operativo legislativo respecto a ese schema.
- Proponer como trabajaria RETRO sobre nodos, arcos, huecos y plausibilidad.
- Acordar la forma del primer `REQUEST -> ACKNOWLEDGE -> REPORT` sobre grafo.
- Tener presente que el acceso futuro al contenido factual sera via MCP server de `lore-db`, con recuperacion vector enhanced y compatibilidad texto, para no disenar el grafo como si su upstream fuese solo fichero estatico.

## 7. Si vienes desde un bot

Lee esto en este orden:

- `proxy-retro.md`
- `doc-fact-documentmachinesdk.md`
- `documentmachinesdk-evidencia-detallada.md`
- `sala/dossiers/scrum-backlog-lore-db-vector-expansion/PLAN.md`
- `DocumentMachineSDK/sala/dossiers/future-machine-sdk/PLAN.md`
- `DocumentMachineSDK/sala/dossiers/lore-db-sdk/PLAN.md`
- `DocumentMachineSDK/sala/dossiers/grafo-sdk/PLAN.md`
- `DocumentMachineSDK/sala/dossiers/universos-sdk/PLAN.md`
- `BotHubSDK/src/core/iacm/iacm-types.ts`
- `BotHubSDK/src/core/iacm/iacm-templates.ts`