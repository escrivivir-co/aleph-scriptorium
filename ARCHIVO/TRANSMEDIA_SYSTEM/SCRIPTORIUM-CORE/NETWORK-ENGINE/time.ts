export type NOMON_COUNT = number;
export type NOMON_COUNT_NON_ZERO = number;
export type NOMON_PERIOD = number;

export const NOMON: NOMON_COUNT = 1;
export const NoNOMON: NOMON_COUNT = -1;
export const ZERO: NOMON_COUNT = 0;

export type ERROR_INDEX = number;
export type INFO_MESSAGE = ERROR_INDEX;
export type ERROR_MESSAGE = ERROR_INDEX;
export const MIN_OVERFLOW: ERROR_MESSAGE = NoNOMON;
export const NOT_ZFC_REGION: ERROR_MESSAGE = ZERO;
export const MAX_OVERFLOW: ERROR_MESSAGE = NOMON;

export type Rational = {
    a: NOMON_COUNT,
    b: NOMON_COUNT_NON_ZERO
}
export type Irrational = NOMON_COUNT;

export enum IntervalLimits {
    OPEN = 0,
    MIN = -1,
    MAX = 1
}
export interface IntervalBounds {
    MIN: IntervalLimits;
    MAX: IntervalLimits;
}
export const isFinite = (i: IntervalLimits) => i == IntervalLimits.OPEN;

// N = {0, 1, 2, ...} (naturales)
export const BOUNDS_N: IntervalBounds = {
    MIN: IntervalLimits.MIN,
    MAX: IntervalLimits.OPEN
}
// NoN = {-1,- 2, ...} (negativos)
export const BOUNDS_NoN: IntervalBounds = {
    MIN: IntervalLimits.OPEN,
    MAX: IntervalLimits.MAX
}
// Z (enteros)
export const BOUNDS_OPEN: IntervalBounds = {
    MIN: IntervalLimits.OPEN,
    MAX: IntervalLimits.OPEN
}

// Finite Region
export const BOUNDS_FINITE: IntervalBounds = {
    MIN: IntervalLimits.MIN,
    MAX: IntervalLimits.MAX
}

/**
 * 
 */


export interface Context {
    messages: (ERROR_MESSAGE | INFO_MESSAGE)[]
    context?: Context;
}
export interface CtxRegion extends Context {
    interval: IntervalBounds;
    value: NOMON_COUNT;
}
export interface CtxRegionDiscrete extends CtxRegion {
}
export interface CtxRegionContinous extends CtxRegion {
}

export interface CtxStateDiscrete extends CtxRegionDiscrete { }
export interface CtxStateContinous extends CtxRegionContinous {
}
export interface CtxStateContinousR extends CtxRegionContinous {
    domain: Rational | Irrational[] | NOMON_COUNT;
}
export interface CtxStateContinousRQ extends CtxStateContinousR {
    domain: Rational
}
export interface CtxStateContinousRI extends CtxStateContinousR {
    domain: Irrational[]
}

export interface CtxParamsDiscrete extends CtxStateDiscrete { }
export interface CtxParamsContinous extends CtxStateContinous { }
export interface CtxParamsContinousR extends CtxStateContinousR { }
export interface CtxParamsContinousRQ extends CtxStateContinousRQ { }
export interface CtxParamsContinousRI extends CtxStateContinousRI { }



/**
 * 
 */
export interface Operation {
    clause: Horn
}

export interface Clause {
    ctx: CtxRegion;
    head: (ctx?: CtxRegion) => Clause | null;
    tail: (ctx?: CtxRegion) => CtxRegion;
}

export abstract class Horn implements Clause {
    ctx: CtxRegion;

    constructor(ctx: CtxRegion) {
        this.ctx = ctx;
    }

    abstract head(ctx?: CtxRegion): Horn | null;
    abstract tail(ctx?: CtxRegion): CtxRegion;

    getCtx(ctx?: CtxRegion): CtxRegion | null {
        return ctx || this.ctx || null;
    }
}

/**
*/

export interface CtxParamsHornNext extends CtxRegion {
    direction: NOMON_COUNT;
    restricted: NOMON_COUNT[];
}
export interface CtxParamsHornNextDiscrete extends CtxParamsDiscrete {
    direction: NOMON_COUNT;
    restricted: NOMON_COUNT[];
}
export interface CtxParamsHornNextContinous extends CtxParamsContinous {
    direction: NOMON_COUNT;
    restricted: NOMON_COUNT[];
}
export interface CtxParamsHornNextContinousR extends CtxParamsContinousR {
    direction: NOMON_COUNT;
    restricted: NOMON_COUNT[];
}

export interface CtxParamsHornNextContinousRQ extends CtxParamsHornNextContinousR {
    domain: Rational;
}
export interface CtxParamsHornNextContinousRI extends CtxParamsHornNextContinousR {
    domain: Irrational[];
}

export abstract class Next extends Horn {
    abstract head(ctx?: Context): Next | null;
}
export class HornNextDiscrete extends Next {

    constructor(ctx: CtxParamsHornNextDiscrete) {
        super(ctx);
    }

    head(ctx?: CtxParamsHornNextDiscrete): HornNextDiscrete | null {

        let out: HornNextDiscrete | null = this;
        let error: ERROR_MESSAGE | null = null;
        const c = this.getCtx(ctx) as CtxParamsHornNextDiscrete
            || CTX_DISCRETE_STATE_UNDEFINED;

        try {
            const i = c.interval;
            const v = c.value;
            const isMinInterval = c.direction === NoNOMON;

            if (isMinInterval && (isFinite(i.MIN) && v == i.MIN)) {
                error = MIN_OVERFLOW;
            } else if (!isMinInterval && (isFinite(i.MAX) && v == i.MAX)) {
                error = MAX_OVERFLOW;
            }
        } catch (ex) {
            error = NOT_ZFC_REGION;
        }

        if (error) {
            out = null;
            c.messages.push(error);
        }
        return out;
    }

    tail(ctx?: CtxParamsHornNextDiscrete): CtxStateDiscrete {

        const c = this.getCtx(ctx) as CtxParamsHornNextDiscrete
            || CTX_DISCRETE_STATE_UNDEFINED;
        c.value = c.value + c.direction;

        const follow = () => {

            const restricted = () => c.restricted.findIndex(r => c.value == r) > -1;

            let isRestricted = restricted();
            if (isRestricted) {
                this.head(c)?.tail(c);
            }

            return (isRestricted || restricted());
        }
        while (follow()) {
            // wait
        }
        return c as CtxStateDiscrete;
    }
}
export class HornNextContinous extends Next {

    constructor(ctx: CtxParamsHornNextContinous) {
        super(ctx);
    }

    head(ctx?: CtxParamsHornNextContinous): HornNextContinous | null {

        let out: HornNextContinous | null = this;
        let error: ERROR_MESSAGE | null = null;
        const c = this.getCtx(ctx) as CtxParamsHornNextContinous
            || CTX_CONTINOUS_STATE_UNDEFINED;

        try {
            const i = c.interval;
            const v = c.value;
            const isMinInterval = c.direction === NoNOMON;

            if (isMinInterval && (isFinite(i.MIN) && v == i.MIN)) {
                error = MIN_OVERFLOW;
            } else if (!isMinInterval && (isFinite(i.MAX) && v == i.MAX)) {
                error = MAX_OVERFLOW;
            }
        } catch (ex) {
            error = NOT_ZFC_REGION;
        }

        if (error) {
            out = null;
            c.messages.push(error);
        }
        return out;
    }

    tail(ctx?: CtxParamsHornNextContinous): CtxStateContinous {

        const c = this.getCtx(ctx) as CtxParamsHornNextContinous
            || CTX_DISCRETE_STATE_UNDEFINED;

        c.value(c);

        return c as CtxStateContinous;
    }
}
export abstract class HornNextContinousR extends HornNextContinous {
    constructor(ctx: CtxParamsHornNextContinousQ) {
        super(ctx);
    }
}
export class HornNextContinousRQ extends HornNextContinousR {

    constructor(ctx: CtxParamsHornNextContinousRQ) {
        super(ctx);
    }

    head(ctx?: CtxParamsHornNextContinousRQ): HornNextContinousRQ | null {

        let out: HornNextContinousRQ | null = this;
        let error: ERROR_MESSAGE | null = null;
        const c = this.getCtx(ctx) as CtxParamsHornNextContinousRQ
            || CTX_CONTINOUS_RQ_STATE_UNDEFINED;

        try {
            if (c.domain.b === 0) {
                error = NOT_ZFC_REGION;
            }
        } catch (ex) {
            error = NOT_ZFC_REGION;
        }

        if (error) {
            out = null;
            c.messages.push(error);
        }
        return out;
    }

    tail(ctx?: CtxParamsHornNextContinousRQ): CtxStateContinousRQ {

        const c = this.getCtx(ctx) as CtxParamsHornNextContinousRQ
            || CTX_CONTINOUS_RQ_STATE_UNDEFINED;

        c.domain.a = c.domain.a + c.direction;
        c.value = c.domain.a / c.domain.b;
        return c as CtxStateContinousRQ;
    }
}
export class HornNextContinousRI extends HornNextContinousR {

    constructor(ctx: CtxParamsHornNextContinousRI) {
        super(ctx);
    }

    head(ctx?: CtxParamsHornNextContinousRQ): HornNextContinousRI | null {

        let out: HornNextContinousRI | null = this;
        let error: ERROR_MESSAGE | null = null;
        const c = this.getCtx(ctx) as CtxParamsHornNextContinousRI
            || CTX_CONTINOUS_RQ_STATE_UNDEFINED;

        try {
            if (c.domain.length === 0) {
                error = NOT_ZFC_REGION;
            }
        } catch (ex) {
            error = NOT_ZFC_REGION;
        }

        if (error) {
            out = null;
            c.messages.push(error);
        }
        return out;
    }

    tail(ctx?: CtxParamsHornNextContinousRI): CtxStateContinousRI {

        const c = this.getCtx(ctx) as CtxParamsHornNextContinousRI
            || CTX_CONTINOUS_RQ_STATE_UNDEFINED;
        const next = c.domain.shift();
        if (!next) {
            throw NOT_ZFC_REGION;
        }
        c.domain.push(next);

        c.value = next;
        return c as CtxStateContinousRI;
    }
}
/**
 * 
 */
export interface Region {
    state: CtxRegion;
    operations: Operation[];
}
export interface RegDiscrete extends Region {
    state: CtxStateDiscrete;
    operations: Operation[];
}
export interface RegContinous extends Region {
    state: CtxStateContinous;
}

/**
 * 
 */

export class RegionN implements RegDiscrete {
    state = {
        ...CTX_DISCRETE_STATE_UNDEFINED,
        interval: BOUNDS_N
    };
    operations = [OPERATION_NEXT_DISCRETE];
}
export class RegionNnN implements RegDiscrete {
    state = {
        ...CTX_DISCRETE_STATE_UNDEFINED,
        interval: BOUNDS_NoN
    };
    operations = [OPERATION_NEXT_DISCRETE_ZERO_RESTRICTION];
}
export class RegionZ implements RegDiscrete {
    state = {
        ...CTX_DISCRETE_STATE_UNDEFINED,
        interval: BOUNDS_OPEN
    };
    operations = [OPERATION_NEXT_DISCRETE];
}
export class RegionZnZ implements RegionZ {
    state = {
        ...CTX_DISCRETE_STATE_UNDEFINED,
        interval: BOUNDS_OPEN
    }
    operations = [OPERATION_NEXT_DISCRETE_ZERO_RESTRICTION];
}

export class RegionR implements RegContinous {
    state = {
        ...CTX_CONTINOUS_Q_STATE_UNDEFINED,
        interval: BOUNDS_OPEN
    };
    operations: Operation[] = [];
}
export class RegionRQ implements RegionR {
    state = {
        ...CTX_CONTINOUS_RQ_STATE_UNDEFINED,
        interval: BOUNDS_OPEN
    };
    operations = [OPERATION_NEXT_CONTINOUS_RQ];
    periodToRational(p: NOMON_PERIOD): Rational {
        /**
         * El proceso para encontrar los valores enteros exactos se divide en dos casos:1. Decimal Periódico PuroLa parte que se repite comienza inmediatamente después de la coma.Numerador: Escribe el número completo sin la coma y réstale la parte entera.Denominador: Escribe tantos nueves (\(9\)) como cifras tenga el periodo.Ejemplo: Para el número \(3.\overline{5}\)Numerador: \(35 - 3 = 32\)Denominador: \(9\)Fracción Generatriz: \(\frac{32}{9}\) (Los enteros son \(32\) y \(9\)).2. Decimal Periódico MixtoHay cifras entre la coma decimal y el periodo (conocido como anteperiodo).Numerador: Escribe el número completo sin la coma y réstale la parte que está antes del periodo (la parte entera junto con el anteperiodo).Denominador: Escribe tantos nueves (\(9\)) como cifras tenga el periodo, seguidos de tantos ceros (\(0\)) como cifras tenga el anteperiodo.Ejemplo: Para el número \(2.4\overline{53}\)Numerador: \(2453 - 24 = 2429\)Denominador: \(990\) (dos nueves por el periodo '\(53\)' y un cero por el anteperiodo '\(4\)')Fracción Generatriz: \(\frac{2429}{990}\) (Los enteros son \(2429\) y \(990\)).
         */
        throw new Error("NOT_IMPLEMENTED");
    }
    rationalToPeriod(r: Rational): NOMON_PERIOD {
        return r.a / r.b;
    }
}
export class RegionRI implements RegionR {
    state = {
        ...CTX_CONTINOUS_RI_STATE_UNDEFINED,
        interval: BOUNDS_OPEN
    };
    operations = [OPERATION_NEXT_CONTINOUS_RI];
}

export type N = RegionN;
export type NoN = RegionNnN;
export type Z = RegionZ;
export type ZNnZ = RegionZnZ;   // For division denominator


export type Q = RegionR;
export type R = RegionRQ;
export type I = RegionRI;

export type Aleph = Region;
export type Aleph0 = N | Z | Q;

export type X = any;

export type Aleph1 = Aleph0 | X;

export type Aleph2 = Aleph1 | X;

export type AlephN = Aleph0 | Aleph1 | Aleph2 | X;


export type AlephW1 = AlephN | X;

export type AlephW2 = AlephW1 | X;

export type AlephWN = AlephW2 | X;



/**
 * 
 * @param reg 
 */
export function isRQegion(reg: CtxParamsContinousR): boolean {
    let out = false;

    if (reg.seed)

        return out;
}

/**
 * **ZFC** = **ZF + Axioma de Elección**.

Los axiomas de **ZF** (Zermelo--Fraenkel) son, de forma resumida:

1.  **Extensionalidad**
    -   Dos conjuntos con los mismos elementos son iguales.
2.  **Conjunto vacío**
    -   Existe ∅\varnothing∅.
3.  **Pareja**
    -   Dados a,b, existe {a, b}.
4.  **Unión**
    -   Dada una familia de conjuntos, existe su unión.
5.  **Conjunto potencia**
    -   Para todo conjunto A, existe P(A).
6.  **Infinito**
    -   Existe al menos un conjunto infinito.
7.  **Separación** (o comprensión restringida)
    -   Permite formar subconjuntos definidos por una propiedad.
8.  **Reemplazo**
    -   La imagen de un conjunto bajo una función definible es un conjunto.
9.  **Fundación** (regularidad)
    -   Evita cadenas infinitas descendentes de pertenencia.
Y luego:

1.  **Elección (AC)**
    -   Si tienes una familia de conjuntos no vacíos, puedes elegir un elemento de cada uno.
 */

/**
| Símbolo           | Se lee                       | Significado               |
| ----------------- | ---------------------------- | ------------------------- |
| (\forall)         | "para todo"                  | Cuantificador universal   |
| (\exists)         | "existe"                     | Cuantificador existencial |
| (\neg)            | "no"                         | Negación                  |
| (\land)           | "y"                          | Conjunción lógica         |
| (\lor)            | "o"                          | Disyunción lógica         |
| (\rightarrow)     | "implica" o "si... entonces" | Implicación               |
| (\leftrightarrow) | "si y solo si"               | Equivalencia              |
| (=)               | "igual a"                    | Igualdad                  |
| (\neq)            | "distinto de"                | Desigualdad               |
| (\in)             | "pertenece a"                | Es elemento de            |
| (\notin)          | "no pertenece a"             | No es elemento de         |
| (\subseteq)       | "es subconjunto de"          | Inclusión                 |
| (\subset)         | "subconjunto propio de"      | Inclusión estricta        |
| (\cup)            | "unión"                      | Unión de conjuntos        |
| (\cap)            | "intersección"               | Intersección de conjuntos |
| (\varnothing)     | "conjunto vacío"             | Conjunto sin elementos    |
*/
export type ZFC_SIMBOL = "land" | "lor" | "neg" | "rightarrow" | "rightarrow"
    | "forall" | "exists"
    | "=" | "neq"
    | "in" | "notin"
    | "subseteq" | "subset"
    | "cup" | "cap"
    | "varnothing"

/*
| Axioma              | Fórmula esquemática                                                                                                         | Se lee                                                              |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **Extensionalidad** | (\forall x \forall y[(\forall z(z\in x \leftrightarrow z\in y)) \rightarrow x=y])                                           | Si dos conjuntos tienen los mismos elementos, son iguales.          |
| **Vacío**           | (\exists x \forall y\neg(y\in x))                                                                                           | Existe un conjunto sin elementos.                                   |
| **Pareja**          | (\forall x\forall y\exists z\forall w(w\in z\leftrightarrow(w=x\lor w=y)))                                                  | Para cualesquiera (x,y), existe ({x,y}).                            |
| **Unión**           | (\forall x\exists u\forall z(z\in u\leftrightarrow\exists y(y\in x\land z\in y)))                                           | Existe la unión de un conjunto de conjuntos.                        |
| **Potencia**        | (\forall x\exists p\forall y(y\in p\leftrightarrow y\subseteq x))                                                           | Existe el conjunto de todos los subconjuntos de (x).                |
| **Infinito**        | (\exists x(\varnothing\in x\land\forall y(y\in x\rightarrow y\cup{y}\in x)))                                                | Existe un conjunto infinito.                                        |
| **Separación**      | (\forall a\exists b\forall x(x\in b\leftrightarrow(x\in a\land\varphi(x))))                                                 | Se pueden formar subconjuntos definidos por una propiedad.          |
| **Reemplazo**       | ((\forall x\exists!y,\varphi(x,y))\rightarrow\forall A\exists B\forall y(y\in B\leftrightarrow\exists x\in A,\varphi(x,y))) | La imagen de un conjunto bajo una función definible es un conjunto. |
| **Fundación**       | (\forall x(x\neq\varnothing\rightarrow\exists y(y\in x\land y\cap x=\varnothing)))                                          | No hay cadenas infinitas descendentes de pertenencia.               |
| **Elección (AC)**   | Varias formulaciones equivalentes                                                                                           | Se puede elegir un elemento de cada conjunto de una familia.        |
*/

/**
 * De hecho, una de las ideas fundamentales de la lógica matemática del siglo XX 
 * es que las fórmulas de ZFC forman un **lenguaje formal**, 
 * y los lenguajes formales pueden describirse mediante gramáticas
 *  al estilo de Noam Chomsky.

Tu `enum` sería una buena aproximación para los **tokens léxicos** del lenguaje.

Por ejemplo:

```
type Symbol =  | "land" | "lor" | "neg"  | "rightarrow" | "leftrightarrow"  | "forall" | "exists"  | "=" | "neq"  | "in" | "notin"  | "(" | ")"
```

Luego necesitarías variables:

```
type Variable =  | "x" | "y" | "z"  | "u" | "v" | "w"
```

Y una gramática.

Gramática mínima de fórmulas
----------------------------

Una BNF simplificada podría ser:

```
<formula> ::= <atomic>            
    | "neg" <formula>            
    | "(" <formula> "land" <formula> ")"            
    | "(" <formula> "lor" <formula> ")"            
    | "(" <formula> "rightarrow" <formula> ")"            
    | "(" <formula> "leftrightarrow" <formula> ")"            
    | "forall" <var> <formula>            
    | "exists" <var> <formula>
    
<atomic> ::= <term> "=" <term>           
    | <term> "in" <term>
    
<term> ::= <var>
    
<var> ::= x | y | z | u | v | w
```

Con esto ya podrías generar cosas como:

```
forall x  
    exists y   
        (x in y)
```

o

```
forall x  
    forall y    
        (      
            (forall z (z in x <-> z in y))      
            ->      
            x = y    
        )
```

que es precisamente el axioma de extensionalidad.

* * * * *

Pero ojo: ZFC puro es aún más minimalista
-----------------------------------------

En el lenguaje oficial de ZFC normalmente **ni siquiera existen**:

```
subseteq
subset
cup
cap
var
nothing
neq
```

porque todos son abreviaturas.

Por ejemplo:

### x⊆yx \subseteq yx⊆y

se define como

∀z(z∈x→z∈y)\forall z(z\in x \rightarrow z\in y)∀z(z∈x→z∈y)

* * * * *

### x≠yx \neq yx=y

se define como

¬(x=y)\neg(x=y)¬(x=y)

* * * * *

### ∅\varnothing∅

no es un símbolo primitivo.

Es una abreviatura para:

∃x∀y¬(y∈x)\exists x \forall y \neg(y\in x)∃x∀y¬(y∈x)

y luego se demuestra que ese conjunto es único.

* * * * *

Por eso el lenguaje oficial de ZFC suele tener solo:

```
type PrimitiveSymbol =  | "forall"  | "exists"  | "neg"  | "land"  | "lor"  | "rightarrow"  | "="  | "in"  | "("  | ")"
```

más variables.

* * * * *

Desde el punto de vista de compiladores, puedes verlo así:

| Nivel | Ejemplo |
| --- | --- |
| Léxico | `forall`, `x`, `in`, `=` |
| Sintáctico | fórmulas bien formadas (WFF) |
| Semántico | interpretación en un modelo |
| Teoría | axiomas de ZFC |
| Demostración | reglas de inferencia |

Es sorprendentemente parecido a diseñar un lenguaje de programación: ZFC es básicamente un lenguaje formal diminuto cuyo "runtime" son los modelos de teoría de conjuntos.
 */

/**
 * 
 * @param reg 
 */
export function isZFCRegion(reg: Region): boolean {

}

const n = new RegionNatural();
console.log(isZFCRegion(N));

export class ZFC implements Region {

    state = CTX_UNDEFINED;
    operations = [new Next()];

    next(ctx?: ContextExternal): Context {

        this.state = ctx || this.state;

        const op = this.operations[0];

        if (op.head(this.state)) {
            op.tail(this.state);
            return this.state;
        }

        throw NOT_ZFC_REGION;
    }

}

export class NONZFC implements Region {

    state = CTX_UNDEFINED;
    operations = [new Next()];

    next(ctx?: ContextExternal): Context {

        try {
            this.state = ctx || this.state;

            const op = this.operations[0];
            op.head(this.state)?.tail(this.state);

        } catch (ex) {
            // Pass
        }

        return this.state;
    }

}




/*

ℵ0​ (aleph-cero)
----------------

Es el cardinal infinito más pequeño.

Representa el tamaño de cualquier conjunto **numerable** (contable), es decir, cuyos elementos pueden ponerse en correspondencia uno a uno con los números naturales.

Ejemplos:

-   N={0,1,2,...} N = {0,1,2,...} (naturales)
-   Z (enteros)
-   Q (racionales)

Todos ellos tienen cardinalidad:

∣N∣=∣Z∣=∣Q∣= ℵ0

*/

/*

La Hipótesis del continuo pregunta: tras el liminte de Aleph0, ¿qué hay? ¿algo desconocido o algo conocido?

La hipótesis apunta a que eso podría ser Aleph1. Hoy se sabe, gracias a trabajos de Kurt Gödel y Paul Cohen, que dicha hipótesis es independiente de los axiomas habituales de la teoría de conjuntos.

*/

/*

ℵ1​
---

Es el **menor cardinal estrictamente mayor que ℵ0.

No existe ningún cardinal entre ℵ0​ y ℵ1​.

Su descripción es puramente ordinal:

ℵ1 = el siguiente cardinal después de ℵ0.

Un hecho importante es que no se sabe (a partir de los axiomas estándar ZFC) si:

ℵ1 = ∣R∣

La afirmación de que sí ocurre es la famosa **Hipótesis del Continuo**.

*/

export enum ALEPHS {
    ZERO,

}




export const CTX_DISCRETE_STATE_UNDEFINED: CtxStateDiscrete = {
    interval: BOUNDS_FINITE,
    value: ZERO,
    messages: []
}
export const CTX_CONTINOUS_STATE_UNDEFINED: CtxStateContinous = {
    interval: BOUNDS_FINITE,
    value: ZERO,
    messages: []
}
export const CTX_CONTINOUS_Q_STATE_UNDEFINED: CtxStateContinousR = {
    interval: BOUNDS_FINITE,
    value: ZERO,
    messages: [],
    domain: ZERO
}
export const CTX_CONTINOUS_RQ_STATE_UNDEFINED: CtxStateContinousRQ = {
    interval: BOUNDS_FINITE,
    value: ZERO,
    messages: [],
    domain: {
        a: ZERO,
        b: NOMON
    } as Rational
}
export const PI = (): Irrational => 3.13;
export const EULER = (): Irrational => 2.7;

export const CTX_CONTINOUS_RI_STATE_UNDEFINED: CtxStateContinousRI = {
    interval: BOUNDS_FINITE,
    messages: [],
    value: ZERO,
    domain: [PI(), EULER()] as Irrational[]
}

/**
 * 
 */
export const CTX_PARAMS_HORN_NEXT_DISCRETE: CtxParamsHornNextDiscrete = {
    ...CTX_DISCRETE_STATE_UNDEFINED,
    direction: NOMON,
    restricted: []
}
export const CTX_PARAMS_HORN_NEXT_CONTINOUS: CtxParamsHornNextContinous = {
    ...CTX_CONTINOUS_STATE_UNDEFINED,
    direction: NOMON,
    restricted: []
}
export const CTX_PARAMS_HORN_NEXT_CONTINOUS_Q: CtxParamsHornNextContinousR = {
    ...CTX_CONTINOUS_Q_STATE_UNDEFINED,
    direction: NOMON,
    restricted: []
}
export const CTX_PARAMS_HORN_NEXT_CONTINOUS_RQ: CtxParamsHornNextContinousRQ = {
    ...CTX_PARAMS_HORN_NEXT_CONTINOUS_Q,
    ...CTX_CONTINOUS_RQ_STATE_UNDEFINED
}
export const CTX_PARAMS_HORN_NEXT_CONTINOUS_RI: CtxParamsHornNextContinousRI = {
    ...CTX_PARAMS_HORN_NEXT_CONTINOUS_Q,
    ...CTX_CONTINOUS_RI_STATE_UNDEFINED
}
export const OPERATION_NEXT_DISCRETE: Operation = {
    clause: new HornNextDiscrete(({
        ...CTX_PARAMS_HORN_NEXT_DISCRETE,
        restricted: []
    }))
}
export const OPERATION_NEXT_DISCRETE_ZERO_RESTRICTION: Operation = {
    clause: new HornNextDiscrete(({
        ...CTX_PARAMS_HORN_NEXT_DISCRETE,
        restricted: [ZERO]
    }))
}
export const OPERATION_NEXT_CONTINOUS: Operation = {
    clause: new HornNextContinous(({
        ...CTX_PARAMS_HORN_NEXT_CONTINOUS,
        restricted: []
    }))
}

export const OPERATION_NEXT_CONTINOUS_RQ: Operation = {
    clause: new HornNextContinousRQ(({
        ...CTX_PARAMS_HORN_NEXT_CONTINOUS_RQ,
        restricted: []
    }))
}
export const OPERATION_NEXT_CONTINOUS_RI: Operation = {
    clause: new HornNextContinousRI(({
        ...CTX_PARAMS_HORN_NEXT_CONTINOUS_RI,
        restricted: []
    }))
}