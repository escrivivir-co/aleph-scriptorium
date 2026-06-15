# 03 — El templo y el grifo

*La intuición más profunda del corpus, degradada de Logos a mecanismo — y confrontada con la objeción de Marx que el chat esquivó al poetizar.*

---

## El hallazgo que se conserva

El corpus terminó con una reflexión afilada: la propuesta de Borrego tiene algo del episodio evangélico en que Jesús trenza un látigo y expulsa a los cambistas del templo. No porque el comercio sea malo, sino porque **metieron el mercado dentro del sagrado**. La vivienda —bien de primera necesidad— fue absorbida por la lógica financiera; el crédito a 30 años es el mecanismo que convirtió el techo en producto y al trabajador en deudor perpetuo.

Esto es excelente como **intuición de diseño**. Pero hay que hacer dos operaciones: **traducirla** y **confrontarla**.

---

## Operación 1: traducir teología a primitivas

| Versión corpus (teológica) | Versión refactor (mecanismo) | Primitiva `grifo-lang` |
|---|---|---|
| El templo profanado | Vivienda tratada como activo puro | `Temple` |
| El grifo del crédito | Caudal hipotecario (plazo, tipo, LTV) | `Faucet` |
| El esfuerzo del peregrino | Años de salario medio para comprar | `Effort` |
| "Dice que llueve" | Relato que disfraza el daño (greenwash, mercado) | `Rain` |
| El látigo de cuerdas | Shock crediticio (p. ej. plazo ≤ 10 años) | `Whip` |

Ganancia: **se puede simular** si un `Whip` baja `Effort` o solo expulsa a quien no tiene capital propio. El spike `grifo-lang` existe para eso.

### Neutralidad creíble del grifo

Como el centro vacío de HiperIPL, el grifo de HiperGrifo debe ser **verificable**:

| Criterio | Pregunta testable |
|---|---|
| ¿Favorece a un actor nombrable? | ¿La regla beneficia a banca X o fondo Y? |
| ¿Es auditable? | ¿Cualquiera puede leer plazo máx., LTV, excepciones? |
| ¿Separa uso y especulación? | `SPEC?` — ¿misma regla para primera vivienda y fondo? |

Si no, el templo sigue siendo casa de mercado con iconografía nueva.

---

## Operación 2: confrontar con Marx

El corpus casi admite la objeción y la esquiva con poesía: *"purificación moral del mercado de la vivienda"*.

Marx responde: **la moral no obtiene tregua; obtiene escondite.**

| Promesa del shock crediticio | Objeción material |
|---|---|
| Los precios caen | Los que tienen cash compran barato (post-2008: Blackstone, Cerberus) |
| El deudor queda libre | El deudor queda **fuera** del mercado de compra |
| Se acaba la especulación | La especulación **cambia de mano**, no desaparece |
| El sacrificio es igualitario | El sacrificio recae en quien **necesita** crédito para vivir |

**Conclusión:** un `Whip` que solo cierra `Faucet` al consumidor es látigo en la espalda del necesitado, no en la mesa del cambista — **salvo** que vaya acompañado de:

- límites a compra por fondos y no residentes (`SPEC?`),
- recuperación de vacíos para parque público (`SPEC?`),
- transparencia de tenencia (`SPEC?`),
- topes de alquiler/compra supply-side (`⊬` en `escenarios.json`).

---

## La síntesis: dos grifos, no uno

Error del corpus: pensar un solo gesto (el látigo). El refactor distingue:

- **Grifo analítico (capa de garantías):** límites no interpretables — plazo máx., LTV máx. para especulación, `Effort` máximo alertable. Horn/`Next` en `grifo-lang`. Código para el singular.
- **Grifo continental (capa de fines):** qué barrio, qué mix, qué excepción social. Delibera HiperIPL. Palabra para el universal.

**Fórmula:** el código garantiza que el grifo no lo posea la banca en la sombra; la palabra decide el reparto del suelo — nunca al revés.

---

## Relación con los cuatro dominios

La metáfora *"nos mean y dicen que llueve"* atraviesa sistema-mundo, clima, fiscal y vivienda (`mapa-financializacion.md`). En todos, `Rain` mide el relato; el daño es otro canal (contaminación, evasión, especulación). HiperGrifo empieza por vivienda porque ahí el corpus cerró con mecanismo concreto — no porque los otros dominios sean secundarios.

---

## Conclusión del documento

El templo y el látigo son **genealogía moral**, no arquitectura. La arquitectura son cinco primitivas y cláusulas Horn que cualquiera puede auditar. Si el `Whip` no distingue `Temple` (uso) de especulación, el proyecto reproduce el patrón que dice combatir: daño al de abajo, relato de lluvia desde arriba.
