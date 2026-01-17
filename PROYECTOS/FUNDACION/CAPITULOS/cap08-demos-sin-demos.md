# Capítulo 8: Demos sin demos

*Desplazamiento: Escalar*

> **Fuente**: T04x02 (Algoritmos opacos)  
> **Tamiz aplicado**: T011 A2 (Opacidad como Decisión Política)

---

## Algoritmos opacos

> "Hay una idea que distingue entre algoritmos transparentes y opacos. En los transparentes (como los árboles de decisión) es posible reseguir el impacto que tiene un parámetro en el resultado. Mientras que en los opacos (como las redes neuronales) habría un momento de pérdida de trazabilidad." — T04x02

Los algoritmos que determinan qué ves, qué compras, qué crees, no fueron votados. No pueden serlo. Su complejidad excede la deliberación.

**Pero aquí está el truco**: los algoritmos opacos **podrían explicarse**. 

---

## La opacidad como decisión política

Existen herramientas de explicabilidad:
- XAI (Explainable AI)
- LIME (Local Interpretable Model-agnostic Explanations)
- SHAP (SHapley Additive exPlanations)

La explicabilidad es **técnicamente posible**. No se usa porque **no se quiere**:

| Motivo | Mecanismo | Consecuencia |
|--------|-----------|--------------|
| **Coste empresarial** | Explicabilidad = revelar ventajas competitivas | Secreto comercial |
| **Evasión regulatoria** | Modelo opaco = no auditable | GDPR burlada |
| **Control de la ilusión** | "Parece que entiende" mientras hace pattern-matching ciego | Marketing de IA |

**4 mecanismos de coerción estructurada** mantienen la opacidad:
1. Secreto comercial (patentes)
2. Encrypting de pesos del modelo
3. Contratos ToS que prohíben ingeniería inversa
4. Acceso restringido a datos de entrenamiento

La intratabilidad es falsa. La intencionalidad es real. **La opacidad no es límite técnico: es política**.

---

## ¿Democracia sobre lo incomprensible?

La Ilustración asumía ciudadanos informados deliberando. ¿Qué pasa cuando ni los expertos entienden los sistemas que nos gobiernan?

**Opción A — Regulación por efectos**:
- No entender el algoritmo, pero medir sus consecuencias
- Si discrimina, prohibirlo
- Si manipula, sancionarlo
- Gobernar outputs, no procesos

**Opción B — Tecnocracia explícita**:
- Delegar en quienes mejor entienden (o dicen entender)
- Gobierno de ingenieros
- Problema: ¿quién elige a los ingenieros?

**Opción C — Resignación**:
- Aceptar que hay zonas de la realidad social que ya no son gobernables democráticamente
- No porque alguien lo impida: porque la complejidad lo impide

---

## El demos sin demos

Democracia: gobierno del pueblo. ¿Qué pueblo?

El pueblo que no puede auditar los sistemas que lo gobiernan **no es un demos**. Es un **público**: espectadores de decisiones que otros (o ninguno) tomaron.

Nadie entiende completamente cómo funciona el algoritmo de recomendación de TikTok, incluyendo a quienes lo construyeron. No porque sea secreto: porque es **intratable**. Demasiados parámetros, demasiadas interacciones.

Demos sin demos: gobierno sin pueblo que pueda gobernar.

---

## Referencia cruzada

- **Texto fuente**: [T04x02 §Algoritmos transparentes y opacos](../../ARCHIVO/DISCO/SESIONES_COTRABAJO/2026-01-11_refactorizacion-fundacion/03_REFERENCIAS/TEXTOS/04x02.md)
- **Próximo capítulo**: [Cap. 9 — Ecosistemas políticos](cap09-ecosistemas-politicos.md)
- **Banderas aplicadas**: 🔵 @blueflag (XAI existe), ⚫ @blackflag (quién lucra), 🔴 @redflag (4 mecanismos coercitivos)
