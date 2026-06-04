# Informe de Anatomía de los Tokenizadores
*Análisis técnico de estrategias de tokenización para lenguas minoritarias y cooficiales en el ecosistema de IA.*

Basado en el escrutinio de la investigación académica reciente (*VerChol*, *MoVoC*, *Confounding Factors*) y el despliegue empírico de proyectos del ecosistema español (Latxa, Carvalho, RoBERTa-ca, Aguila), este informe disecciona las decisiones arquitectónicas necesarias para implementar un tokenizador nativo para una lengua minoritaria.

---

## 1. Estructura y Algoritmos en el Ecosistema Actual

En la evaluación de los proyectos de vanguardia, el panorama algorítmico es casi monárquico:
- **BPE (Byte Pair Encoding) es el rey indiscutible**: Prácticamente todos los proyectos relevantes, tanto los modelos multilingües institucionales (ALIA/Salamandra) como los adaptados (Aguila-7B, RoBERTa-ca, Carvalho_pt-gl), utilizan **BPE**. Particularmente, se usa la variante *Byte-Level BPE* (a nivel de byte en lugar de carácter), frecuentemente implementada con librerías como *SentencePiece* o *HuggingFace Tokenizers*.
- **Tamaños de Vocabulario (Vocab Size) Estandarizados**: Es sorprendente ver que, independientemente del presupuesto del proyecto, los tamaños de vocabulario convergen drásticamente en el rango de **31.000 a 50.300 tokens** (ej. RoBERTa-ca: 50.262, Aguila-7B: 50.257, Carvalho_pt-gl: 50.257, BERT-spanish-wwm: ~31.000). Mantener este tamaño previene el sobredimensionamiento de la matriz de embeddings y asegura que cada token reciba suficientes actualizaciones estadísticas durante el entrenamiento (evitando tokens "huérfanos").

### Estrategias de Construcción
La industria se divide en dos enfoques principales según el presupuesto:
1. **Adaptación de Vocabulario (Extensión)**: Modelos como RoBERTa-ca, Carvalho y Latxa parten de tokenizadores preexistentes (mRoBERTa, Llama 2/3). Entrenan un pequeño modelo BPE sobre su corpus regional y "fusionan" los tokens más frecuentes de la nueva lengua que no estaban en el original, redimensionando la matriz de embeddings e inicializando los nuevos pesos de forma inteligente (ej. con la media de la matriz o aplicando ruido mínimo).
2. **Desde Cero (Scratch)**: Los proyectos fundacionales con fondos institucionales (ej. Salamandra del BSC) prefieren entrenar el BPE sobre un corpus meticulosamente balanceado desde cero. Esto asegura que lenguas como el catalán o el vasco no se vean penalizadas estadísticamente frente al inglés o español mayoritario.

---

## 2. Desafíos Documentados: Fertilidad y Morfología

Los *papers* recientes, en especial aquellos analizando lenguas no indoeuropeas o minoritarias, denuncian graves deficiencias de los LLMs modernos al tratar **lenguas aglutinantes y ricas morfológicamente**. 

### La Inflación de la "Fertilidad" de Tokens
La *fertilidad* es el promedio de "pedazos" (tokens) en los que se divide una palabra normal. 
El BPE estándar es agnóstico a la gramática; es puramente estadístico. En lenguas con muchos datos (inglés), el BPE aprende subpalabras con sentido. Pero al aplicarlo "a ciegas" a lenguas minoritarias (con menos gigabytes de datos), la falta de estadísticas hace que las palabras se "trituren" en fragmentos diminutos. 
- **Problema**: Una alta fertilidad dispara los costes de inferencia, acorta artificialmente la "memoria" del modelo (Context Window) y dificulta que las matrices de atención QKV formen relaciones semánticas coherentes.

### Pérdida de Límites Morfológicos (Fragmentación)
En lenguas aglutinantes (como el euskera o el turco), una sola palabra como *etxearekin* codifica (raíz + caso + artículo).
Estudios como *VerChol* y *MoVoC* denuncian que el BPE estadístico severa y destruye los límites morfológicos reales de las lenguas aglutinantes. Al separar `etxe` y `arekin` de manera arbitraria según la compresión de bytes, el LLM tiene enormes dificultades para aprender la sintaxis subyacente. Los modelos sufren sistemáticamente peores índices de perplejidad y rendimiento en generación.

---

## 3. Conclusión Estratégica: Reglas de Oro para Nuestro Tokenizador

Si nuestro objetivo es construir un tokenizador nativo y eficiente para una lengua minoritaria, la revisión de la literatura actual dicta las siguientes "mejores prácticas":

1. **Tokenización Híbrida o Informada por la Gramática (Morphology-Aware)**
   - No debemos confiar ciegamente en BPE sobre un corpus minoritario.
   - **Solución (MoVoC)**: Debemos inicializar nuestro tokenizador BPE "sembrándolo" primero con un diccionario manual de morfemas (raíces, prefijos, sufijos de conjugaciones comunes) de nuestra lengua. Solo después dejamos que BPE calcule el resto de subpalabras por compresión estadística. Esto "fuerza" a la red neuronal a respetar las junturas sintácticas reales de la lengua.
2. **Byte-Fallback Obligatorio**
   - Asegúrate de activar el flag `byte_fallback = True` en *SentencePiece*. Las lenguas minoritarias a menudo cuentan con diacríticos únicos o palabras prestadas raras. Si el modelo se encuentra un carácter que no conoce, en lugar de vomitar el terrorífico token `<UNK>` (Unknown), se descompondrá suavemente a nivel de bytes (UTF-8) y se reconstruirá a la salida, asegurando pérdida nula de información léxica.
3. **Punto Dulce de Dimensión de Embeddings**
   - El objetivo es un tamaño de vocabulario global `vocab_size` en torno a los **32.000 a 40.000 tokens**. Si intentamos copiar a los modelos gigantes (Llama-3 usa 128k tokens), en una lengua minoritaria dispersaremos tanto nuestros escasos datos de entrenamiento que la mayoría de tokens nunca actualizarán sus gradientes (pesos), resultando en vectores inútiles.
4. **La Estrategia de Extensión (Continual Pretraining)**
   - Salvo que tengamos centros de supercomputación, **no se debe entrenar el tokenizador y el modelo desde cero**. Se debe optar por la "Adaptación de Vocabulario": usar el tokenizador de un modelo monolingüe (como un BERT en español o Llama-3), extraer sus tokens inútiles, añadir ~15,000 subpalabras extraídas matemáticamente de nuestro corpus minoritario, y redimensionar la Matriz de Embeddings.

> **Resumen Ejecutivo:** El éxito de nuestro proyecto residirá en asistir al algoritmo de compresión BPE con reglas morfológicas (diccionarios) y restringir drásticamente el tamaño del vocabulario para concentrar la retropropagación en menos vectores, pero más ricos y estables.
