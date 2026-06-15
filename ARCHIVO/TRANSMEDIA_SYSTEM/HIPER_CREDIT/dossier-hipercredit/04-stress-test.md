# 04 — Stress-test

*HIPER_CREDIT pasado por el tribunal del mapa antes de que lo pase el examinador. Esto es lo que separa un proyecto de una ocurrencia de chat.*

---

## 1. Los tres tribunales (mapa §1)

El mapa establece que toda Ilustración 2.0 debe responder a tres jueces. HiperGrifo comparece ante los tres.

### Marx — ¿quién posee el grifo?

Ya desarrollado en el doc `03`: un shock que solo restringe al comprador minorista **deja intacta la propiedad del grifo** (banca, fondos, tenedores de suelo). El avatar criptográfico que audita `Effort` puede ser igual de formal que el ciudadano de 1789: todos iguales ante el smart contract, mientras Blackstone compra al contado.

| Promesa | Objeción Marx |
|---|---|
| El grifo se cierra para todos | Quien tiene cash no usa el grifo; el shock le beneficia |
| Transparencia del esfuerzo | La transparencia no redistribuye el suelo |
| Reglas neutrales (Faucet) | Quien escribe el ABI inicial: ¿banca consorcio o comunidad? |

**Veredicto:** HiperGrifo pasa el tribunal de Marx solo si el `Whip` va acompañado de medidas supply-side (`⊬`): gravamen a vacíos, prohibición de compra por fondos en Temple, recuperación de cartera pública — y si la gobernanza del grifo no es capturada por los mismos que `DEFENDS_FAUCET` en `antagonistas.json`. Sin eso, es la Declaración de 1789 con peor interfaz: igualdad ante el préstamo, propiedad intacta en la tierra de los fondos.

### Freud — ¿qué se reprime para que el orden funcione?

El sueño del shock limpio —precios caen, mercado sano, esfuerzo normalizado— es también el sueño de no tener que lidiar con el **sacrificio desigual**. Aplicado al crédito: HiperGrifo puede prometer una regulación sin fricción, sin el cuerpo del desahuciado, sin la familia que perdió la vivienda en 2008, sin la vergüenza del patrimonio negativo.

Pero **un shock sin esa fricción no es justicia: es simulación.** La represión específica de HiperGrifo es la represión del **perdedor silencioso** — quien ya tiene hipoteca a 30 años cuando se activa `maxTerm=10`, quien no puede refinanciar, quien vende con pérdida mientras el fondo compra.

**Veredicto:** HiperGrifo debe diseñar **fricción de transición** (quitas, reestructuración, alquiler con opción de compra, moratoria para deudores pre-shock), o producirá un superyó de hierro: la ley del grifo sin padre que perdone la deuda antigua.

### Marcuse — ¿qué sujeto produce?

La pregunta no es si la simulación corre en Bun, sino **qué humano queda después**. HiperGrifo puede producir una **ilusión de regulación eficaz** que canalice el malestar hacia dashboards de `Effort` y desmovilice la acción sobre el especulador (ocupación, expropiación, bloqueo de fondos).

Esto es *desublimación represiva*: se te libera la indignación, pero solo en el formato que la máquina puede procesar (gráfico de colapso, slider de shock). El gesto de simular produce la sensación de haber actuado. **Veredicto:** riesgo estructural. La única respuesta honesta: el protocolo debe **saber callar y derivar** — cuando la señal es desahucio inminente, la respuesta no es otro escenario `⊢` sino presencia en la puerta.

---

## 2. La objeción Blackstone (el aporte genuino del corpus, refactorizado)

El mapa no nombró a los **fondos de inversión inmobiliaria** como antagonista constitucional. El corpus sí — y eso se incorpora.

### Lo que se conserva (traducido)

| Formulación corpus | Traducción al mapa |
|---|---|
| "Tras 2008, Blackstone compró carteras a precio de derribo" | La crisis no redistribuye hacia el deudor; **reconcentra** en quien tiene liquidez |
| "Es absurdo que los fondos alquilen más caro eternamente" | Hipótesis C parcial: el simulacro de mercado puede sostenerse por decades con rent-seeking |
| Borrego: "el tulipán pringa" | Pringa el deudor; el fondo **acumula** tulipanes baratos |
| El shock sin tocar al fondo | Recaída en mando: el látigo al peregrino |

### Lo que se rechaza

Borrego niega que el escenario fondo-beneficiado sea "absurdo" porque confía en el colapso final de la pirámide. El refactor **no apuesta a la teleología**: documenta el escenario `REACCUMULATION` en `grifo-lang` como rama con plausibilidad **alta** en `escenarios.json`, no como imposibilidad.

### La corrección de diseño

Inspirada en la objeción Gaia de HiperIPL (límite duro no votable), aquí:

> **La captura por fondos sistémicos es una restricción dura candidata:** ningún shock de `Faucet` puede ejecutarse sin cláusula anti-acumulación (derecho de tanteo público, prohibición de paquetes >N viviendas a vehículos financieros en zona Temple).

`SPEC?` — no implementado en el spike; documentado en YELLOW y BLACK.

---

## 3. Las tres hipótesis del mapa, aplicadas (mapa §8)

| Hipótesis | HiperGrifo bajo esa luz | Qué la activa | Qué la desactiva |
|---|---|---|---|
| **A. Neofeudalismo** | Los fondos son los nuevos señores; el crédito, el vasallaje; Blackstone, el castillo | Shock solo al minorista; REACCUMULATION sin límite | Cláusulas anti-fondo; vivienda pública; supply-side `⊬` |
| **B. Ilustración 2.0 (palanca)** | Grifo auditable que ningún banco relaja en secreto; Effort visible para todos | Persistencia de reglas; Rain vs Effort público | — (es el objetivo) |
| **C. Desierto de lo real (anestésico)** | Simular el shock sustituye regular; el desahucio continúa mientras el slider se mueve | UI de shock como única salida ofrecida | Derivación a acción; medir desahucios evitados, no solo precio simulado |

La síntesis: **HiperGrifo no es viable o inviable; es el nombre de un conflicto** — la disputa por quién cierra el grifo, sobre quién cae el látigo, y quién compra en el `COLLAPSE`.

---

## 4. El problema del shock: gracia, Schmitt y la trampa del comprador único

### El shock como derecho de gracia (a favor)

El mapa (§3) lee el fork de The DAO como gracia comunitaria. En HiperGrifo, activar `Next(Whip)` cuando `Effort > band` es análogo: la comunidad elige la justicia (precio accesible) sobre la estabilidad del balance bancario (inmutabilidad del crédito largo). Es el derecho de decir: **este grifo ya no**.

### El shock como trampa de Schmitt (en contra)

Pero el mapa (§10) avisa: **¿quién decide la excepción?** Si solo el regulador o el multisig del protocolo puede activar el `Whip`, reaparece el soberano de Schmitt. Y hay una trampa peor:

> Un shock que solo afecta hipotecas de persona física **define al enemigo** como el deudor necesitado, no como el acumulador. Eso no es gracia: es **estado de excepción contra el peregrino**.

Esta es la convergencia más incómoda del dossier: **la celebración ingénua del shock de Borrego reproduce la lógica de "sacrificio del deudor"** que el corpus ya criticó antes de enamorarse de la metáfora del templo.

### La corrección

HiperGrifo necesita lo que HiperIPL necesita de Vitalik: **voz antes del shock**.

- El `Whip` no es automático por defecto: requiere iniciativa HiperIPL + cuórum — o cláusula constitucional pre-acordada (`SPEC?`).
- Toda activación de `SHOCK_PENDING` debe publicar **informe de impacto** (deudores afectados, fondos en posición de compra, alquiler proyectado).
- El escenario `⊬` (supply-side) debe estar **siempre visible** en el nodo azul como alternativa al shock puro.

El shock como gracia: sí, si golpea al cambista. El shock como látigo al peregrino: es el Terror frío del deudor.

---

## 5. Tribunales cruzados: resumen

| Tribunal / prueba | ¿Pasa? | Condición |
|---|---|---|
| Marx | Condicional | Shock + anti-fondo; gobernanza no capturada |
| Freud | Condicional | Transición con quita/moratoria; no solo simulación |
| Marcuse / anestésico | Riesgo estructural | Saber callar y derivar; medir desahucios, no solo precio |
| Objeción Blackstone | Condicional | Cláusulas anti-acumulación; escenario REACCUMULATION tomado en serio |
| Tres hipótesis | Indeterminado | Activar B, desactivar A y C con mecanismos concretos |
| Shock / Schmitt | Condicional | Voz (HiperIPL) antes de Whip; supply-side visible |

Un proyecto que llega al examinador con esta tabla ya respondida no está vendiendo la imagen del látigo: está mostrando que sabe **a quién azota** y **quién compra cuando caen las mesas**.
