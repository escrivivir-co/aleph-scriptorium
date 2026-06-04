# Prompts de Investigación: Ecosistema IA y Tokenizadores en España

Este archivo contiene el contexto base y las instrucciones precisas para delegar la investigación de campo a un agente experto en búsqueda web.

---

## Contexto Inicial (System Prompt)
*Provee este texto al agente antes de comenzar para que entienda quiénes somos y cuál es nuestro objetivo final.*

> **Contexto del Proyecto:**
> Eres un agente experto en investigación y búsqueda avanzada en la red. Trabajas para un equipo técnico que está elaborando una guía de desarrollo y formación para construir un tokenizador nativo dirigido a una lengua minoritaria. 
> Nuestro repositorio actual ya cuenta con fundamentos técnicos sólidos: hemos documentado el estado del arte de tokenizadores (Inglés, Español, Jamba), la arquitectura de la Matriz de Embeddings, el flujo de Atención (QKV), y mecánicas de Backpropagation. 
> Ahora, antes de empezar a programar nuestro tokenizador, necesitamos que mapees el terreno actual de la Inteligencia Artificial en el idioma español y en sus lenguas cooficiales. Queremos aprender de sus éxitos, sus estrategias comunitarias y sus decisiones arquitectónicas.

---

## PROMPT A: Mapeo del Ecosistema de Modelos
*Ejecutar primero. El objetivo es obtener un catálogo exhaustivo de proyectos.*

> **Prompt A:**
> Realiza una búsqueda web exhaustiva y construye un mapa detallado del ecosistema actual de modelos de lenguaje (LLMs) relacionados con el español. Maximiza tus capacidades de búsqueda para encontrar la mayor cantidad de proyectos posibles.
> 
> Quiero que clasifiques los resultados en un gradiente: desde iniciativas institucionales/corporativas de gran presupuesto, hasta proyectos puramente FOSS (Free and Open Source Software) o académicos.
> 
> Estructura tu reporte obligatoriamente en estas tres categorías:
> 
> **a.1) Modelos bilingües o multilingües donde el español es secundario:** Modelos globales que han sido afinados o adaptados al español (ej. Llama-3 en español, fine-tunings comunitarios).
> **a.2) Modelos nativos donde el español es el idioma principal o "madre":** Proyectos entrenados desde cero (pre-entrenamiento) con el español como eje central.
> **a.3) Lenguas cooficiales y soluciones conjuntas:** Modelos, corpus y soluciones de IA enfocadas en las lenguas cooficiales de España (catalán, gallego, euskera, etc.) y proyectos institucionales o FOSS que ofrezcan soluciones multilingües para todo el territorio.

---

## PROMPT B: Experiencias y Anatomía de los Tokenizadores
*Ejecutar solo cuando el agente haya entregado la lista completa del Prompt A.*

> **Prompt B:**
> A partir del mapa de proyectos que acabas de generar, realiza una inmersión técnica específica en las decisiones de **tokenización** de esos proyectos.
> 
> Busca documentación técnica, papers académicos o repositorios de GitHub de esos proyectos y responde a lo siguiente:
> 
> 1. ¿Cómo son estructuralmente los tokenizadores que utilizan estos proyectos en español y lenguas cooficiales? (Ej. ¿Usan algoritmos BPE, Unigram? ¿Utilizan SentencePiece o tokenizers de Hugging Face? ¿Construyen vocabularios desde cero o amplían vocabularios existentes de modelos ingleses?).
> 2. ¿Qué experiencias concretas o problemas han documentado? (Especial atención a problemas de "fertilidad" de tokens, fragmentación de morfología compleja, o el manejo de caracteres especiales/diacríticos de las lenguas cooficiales).
> 3. Conclusión estratégica: Basado en este "bosque de opciones" del panorama español, ¿qué mejores prácticas, atajos técnicos o advertencias críticas podemos extraer para aplicarlas a nuestra propia meta de crear un tokenizador para una lengua minoritaria?
