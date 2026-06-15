# 01 — Síntesis del proyecto: qué es HIPER_CREDIT

*Reconstrucción limpia. Sin teología del templo, sin réplica dialéctica a Borrego. El artefacto, su problema y su lugar.*

---

## El problema que ataca

La vivienda dejó de ser principalmente un bien de uso para convertirse en **activo financiero**. El precio no refleja solo ladrillo y suelo: refleja el **esfuerzo financiero máximo** que el comprador medio puede sostener — plazo hipotecario, tipo de interés, acceso al crédito. Alargar plazos y bajar tipos no abarató la vivienda de forma estable: **reajustó el precio al alza** hasta devolver (y superar) el esfuerzo histórico de 4–5 salarios anuales a ratios de 8–12 o más.

En los términos del `mapa-ilustracion-2.0.md` (§5), esto es el mismo diagnóstico que la Ilustración 2.0 en general: **buena carta de derechos formal, mal mecanismo material**. Las garantías negativas (propiedad, contrato, mercado) funcionan; el **grifo del crédito** —quién abre el caudal, a qué plazo, con qué interés— queda capturado por banca, promotoras y tenedores de suelo. El ciudadano comparece como deudor perpetuo, no como habitante.

**HIPER_CREDIT (HiperGrifo) es un intento de construir la pieza que falta: la capa de crédito-regulado.**

## Qué es, en una frase

HIPER_CREDIT es un **dispositivo de regulación crediticia** para bienes de primera necesidad (empezando por la vivienda): infraestructura donde las condiciones del grifo —plazo, tipo, acceso— se fijan con **neutralidad creíble**, persisten de forma auditable y no pueden ser reescritas unilateralmente por quien lucra con la especulación.

Complementa a **HiperIPL**: si HiperIPL ataca el mal parlamento (la voz archivada), HiperGrifo ataca el mal grifo (el crédito que infla el precio).

## Qué hace (el artefacto, no la metáfora)

| Función | Mecanismo | Qué garantiza |
|---|---|---|
| **Medir** | Primitiva `Effort`: ratio precio/renta y esfuerzo financiero | El diagnóstico no depende del relato del mercado |
| **Regular** | Primitiva `Faucet`: apertura/cierre del crédito por plazo, LTV, destino | El grifo no lo gira solo la banca en la sombra |
| **Proteger** | Primitiva `Temple`: la vivienda como bien de uso, no solo activo | Límites no votables a la financiarización total |
| **Exponer** | Primitiva `Rain`: intensidad del relato que disfraza el daño | "Dice que llueve" queda cartografiado, no invisible |
| **Intervenir** | Primitiva `Whip`: shock crediticio (p. ej. plazo máx. 10 años) | Escenario `⊢` de choque demand-side — no el único |

La nomenclatura (`Temple`, `Faucet`, `Effort`, `Rain`, `Whip`) es deliberadamente la del spike **`grifo-lang`**: teología degradada a primitivas testables.

## Lo que HIPER_CREDIT NO es

- **No es el episodio evangélico del templo.** El látigo de cuerdas es intuición de diseño; el artefacto es regulación auditable.
- **No es solo la propuesta de Borrego.** El shock a diez años es un escenario legítimo (`grafo/escenarios.json`), no la constitución del proyecto.
- **No es sustituto de política habitacional.** Parque público, topes de alquiler, impuesto a vacíos son escenarios `⊬` supply-side que el dossier no descarta.
- **No es neutral por ser técnico.** Un grifo que solo corta al deudor y deja al especulador intacto reproduce la desigualdad (Marx). Ver `04`.

## Dónde encaja en el mapa

| Eje del mapa | Posición de HIPER_CREDIT |
|---|---|
| Voz vs. mando (§7) | Regula el **mando financiero** para abrir espacio a la **voz** habitacional (quién accede, a qué coste real) |
| Las tres hipótesis (§8) | Indeterminado: puede ser palanca (2.0), anestésico (simular regulación sin bajar precios) o feudo bancario (neofeudalismo del crédito) |
| Capas analítico/continental (§9) | `Effort`, límites de plazo/LTV = capa analítica (Horn); qué barrio, qué mix social = capa continental (delibera HiperIPL) |
| Cuatro dominios del corpus | Sistema-mundo, clima, fiscal, vivienda comparten patrón: daño real + relato falso (`mapa-financializacion.md`) |

## Estado de madurez (honesto)

HIPER_CREDIT es hoy un **concepto de diseño + spike `grifo-lang`**, no un protocolo desplegado. Presentarlo significa:

1. el problema (financiarización del techo),
2. la genealogía (`02`),
3. el mecanismo sin teología (`03`),
4. el stress-test (`04`),
5. la simulación reproducible (`packages/grifo-lang`).

Eso distingue proyecto de ocurrencia de chat.
