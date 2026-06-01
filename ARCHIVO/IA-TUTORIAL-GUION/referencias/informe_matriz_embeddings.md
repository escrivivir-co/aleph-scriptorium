# Informe Técnico: La Matriz de Embeddings y su Integración

> [!NOTE]
> **Objetivo del Informe:** Explicar el ciclo de vida del dato inmediatamente después de la tokenización: cómo los IDs discretos se convierten en representaciones semánticas densas, cómo se dimensiona esta estructura, su evolución durante el entrenamiento y su empaquetado para inferencia.

---

## 1. El Vínculo: Del Tokenizador a la Matriz

El tokenizador es solo un traductor que convierte texto (cadenas de caracteres) a números enteros (IDs). Sin embargo, las redes neuronales no entienden números enteros como categorías aisladas, necesitan matemáticas continuas (vectores).

Aquí es donde entra la **Matriz de Embeddings** (Embedding Matrix).
*   Es una tabla de búsqueda (Lookup Table).
*   Su forma matemática es `[Tamaño del Vocabulario, Dimensión Oculta]`.
*   Si nuestro tokenizador generó un vocabulario de 32,000 tokens, la matriz tendrá exactamente 32,000 filas.
*   Cuando el tokenizador entrega el ID `405`, el modelo simplemente va a la fila `405` de la matriz y extrae el vector de números decimales almacenado allí.

---

## 2. Dimensionamiento: La Dimensión Oculta ($d_{model}$)

La "Dimensión Oculta" (*hidden size* o $d_{model}$) determina la longitud del vector que representa cada token. Si $d_{model} = 4096$, cada token se define por 4096 coordenadas flotantes.

### 2.1. ¿Qué significa esta dimensión?
Cada componente (o combinación de componentes) del vector actúa como un "eje de significado". Durante el entrenamiento, la red aprende a usar estas dimensiones para codificar conceptos abstractos: género, tiempo verbal, pluralidad, tono (sarcasmo, formalidad), o conceptos semánticos concretos (ej. "es un animal", "es un objeto de madera"). 

### 2.2. Cómo elegir el tamaño y sus Trade-offs

Elegir la dimensión oculta es un equilibrio entre **capacidad de representación** y **coste computacional**.

| Tamaño ($d_{model}$) | Casos de Uso Comunes | Características |
| :--- | :--- | :--- |
| **Bajo** (256 - 768) | Modelos pequeños, BERT clásico, móviles. | Rápido, bajo consumo de VRAM. |
| **Medio** (1024 - 2048) | LLMs compactos (1B a 3B parámetros). | Buen balance entre eficiencia y comprensión semántica. |
| **Alto** (4096 - 8192+) | LLMs masivos (Llama 3 8B/70B, GPT-4). | Capacidad de capturar matices hiper-complejos y razonamiento avanzado. |

> [!WARNING]
> **El peso de la Matriz:** La matriz de embeddings ocupa mucha memoria. Si tienes 64,000 tokens (Jamba) y $d_{model} = 4096$, utilizando precisión FP16 (2 bytes por parámetro), la matriz sola pesa: `64,000 * 4096 * 2 bytes ≈ 524 Megabytes`. Y esto es solo la capa de entrada.

### 2.3. Degradaciones según el tamaño
*   **Sub-dimensionado (Under-parameterized):** Si la dimensión es muy baja (ej. 128) y el vocabulario muy grande, los vectores se ven forzados a comprimir demasiada información. Ocurre un "cuello de botella semántico". Palabras con significados distintos terminan con vectores muy similares matemáticamente, provocando que el modelo se confunda, alucine o pierda matices (ej. confundir ironía con afirmación literal).
*   **Sobre-dimensionado (Over-parameterized):** Si la dimensión es gigantesca (ej. 16384) pero el corpus de la lengua minoritaria es muy pequeño, la matriz es demasiado "grande" para la información disponible. El modelo sufrirá de *Overfitting* (memorizará el texto de entrenamiento en lugar de generalizar reglas idiomáticas). Además, el coste de VRAM hará inviable su entrenamiento.

---

## 3. Dinámica de Entrenamiento: Actualización de la Matriz

¿Cómo aprenden estos vectores su significado? No se programan a mano, se descubren geométricamente.

1.  **Inicialización:** Al iniciar un entrenamiento desde cero (Scratch), la matriz se rellena con ruido aleatorio (distribución normal/gaussiana). Todas las palabras son "basura" semántica.
2.  **Forward Pass (Hacia adelante):** Se ingresa una frase. El tokenizador da los IDs -> se extraen las filas (con valores aleatorios) -> pasan por las capas Transformer -> el modelo intenta predecir el siguiente token y falla (porque los vectores no tienen sentido).
3.  **Cálculo de Pérdida (Loss):** Se calcula qué tan equivocada fue la predicción (Cross-Entropy Loss).
4.  **Backpropagation (Hacia atrás):** El error fluye de vuelta por toda la red hasta llegar a la Matriz de Embeddings. Se calcula el gradiente (la dirección matemática hacia la que deben cambiar los números para equivocarse menos la próxima vez).
5.  **Actualización (Optimizador):** El optimizador (ej. AdamW) empuja levemente los valores flotantes **únicamente de las filas de los tokens que aparecieron en esa frase**.
6.  **Semántica Emergente:** Tras repetir esto miles de millones de veces, tokens que aparecen en contextos similares (ej. "el **perro** ladra", "el **lobo** ladra") reciben actualizaciones de gradiente similares. Matemáticamente, las filas de "perro" y "lobo" terminan siendo vectores muy cercanos en el espacio N-dimensional. El modelo "comprende" que son conceptos afines.

---

## 4. Exportación e Inferencia

Al finalizar el entrenamiento, la matriz de embeddings ha madurado. Sus valores aleatorios ahora dibujan un mapa perfecto del idioma.

### 4.1. Empaquetado de los Pesos
En frameworks modernos (como PyTorch), la matriz es un módulo (usualmente llamado `nn.Embedding` o embebido en `lm_head` si se usa *weight tying*). Cuando se finaliza el modelo:
*   Se "congelan" los valores flotantes.
*   Se exportan a archivos binarios altamente eficientes, típicamente en formato **`.safetensors`** (el estándar actual por seguridad y velocidad de carga) o `.bin` (legado de PyTorch).

### 4.2. El Contrato Inquebrantable
Existe un acoplamiento estricto y de vida o muerte entre los archivos exportados:
*   El **`tokenizer.json`** dictamina qué texto es qué ID.
*   Los **`.safetensors`** asumen ciegamente que la fila 5 representa exactamente lo que el tokenizador dice que es el ID 5.

> [!CAUTION]
> **Crash por Desincronización:** Si, tras exportar el modelo, modificas el tokenizador (agregando una palabra nueva al vocabulario) sin re-entrenar o redimensionar la matriz de embeddings en los pesos, el software de inferencia (vLLM, Transformers) crasheará instantáneamente con un `IndexError` (intentando buscar la fila 32001 en una matriz de 32000 filas).

### 4.3. Carga en Motores de Inferencia
Cuando despliegas el modelo para que los usuarios lo consuman:
1.  El motor de inferencia lee el `config.json` para saber que la dimensión oculta es, digamos, 4096.
2.  Carga los `.safetensors` en la VRAM de las GPUs.
3.  Instancia el `tokenizer.json` en la RAM del procesador normal (CPU).
4.  **Flujo en vivo:** El usuario escribe "Hola". El tokenizador en CPU lo convierte en ID `184`. El ID se envía a la GPU. La GPU hace un *Lookup* indexado ultrarrápido extrayendo la fila `184` de la matriz, y el vector viaja por las capas de inferencia para generar la respuesta.
