# Apéndice: El Viaje del Token a través de las Estructuras de Datos

> [!NOTE]
> **Objetivo del Documento:** Mostrar paso a paso, sin notación matemática compleja, cómo la información cambia de forma. Veremos cómo una simple lista de números evoluciona hasta convertirse en una tabla gigante de decimales, cómo se procesa, y cómo vuelve a colapsar en una lista para predecir la siguiente palabra.

---

## 1. El Vocabulario (Estructura de Diccionario)
Todo empieza antes del modelo. El vocabulario es simplemente una lista gigante o un diccionario (como un archivo JSON).
*   **Forma:** Una lista plana de 32,000 posiciones.
*   **Contenido:** Textos base asociados a un índice. Por ejemplo, en la posición 405 está la palabra "hola", y en la posición 12 está "mundo".

## 2. El Tokenizador (De Texto a Array Unidimensional)
Cuando escribes una frase, el tokenizador actúa como un buscador.
*   **Entrada:** Texto en bruto (`"hola mundo"`).
*   **Salida:** Un Array (lista) de números enteros (los índices del diccionario).
*   **Estructura de Datos Resultante:** `[405, 12]`
En este punto, nuestra información es solo una lista plana unidimensional de tamaño 2.

## 3. Matriz de Embeddings (Despliegue Bidimensional)
Los números enteros no sirven para el modelo, así que necesitamos darles profundidad.
La Matriz de Embeddings es la primera gran estructura interna del modelo. Es una tabla gigante estática.
*   **Forma de la Matriz Base:** `[32000 filas x 4096 columnas]`.
*   **La Operación:** El modelo mira nuestro array `[405, 12]`. Va a la tabla gigante, copia la fila 405 entera y luego la fila 12 entera.
*   **Estructura de Datos Resultante:** Nuestra humilde lista se ha transformado en una pequeña matriz bidimensional con forma `[2 x 4096]`. Ahora tenemos 2 filas, y cada fila contiene 4096 números decimales que representan la semántica de esa palabra. 

## 4. Las Matrices de Atención (El Batido de Datos)
Esta pequeña tabla de `[2 x 4096]` va a pasar por el centro del cerebro del modelo: las capas Transformer.
Dentro de estas capas hay muchísimas matrices de pesos estáticas que el modelo aprendió durante su entrenamiento (las famosas matrices Q, K, V de Atención).
*   **La Operación:** Nuestra matriz de entrada de `[2 x 4096]` se multiplica contra estas matrices estáticas internas (que tienen un tamaño de `[4096 x 4096]`).
*   **¿Qué pasa con los datos?:** Al multiplicar las filas entre sí, los 4096 decimales de "hola" se mezclan ligeramente con los 4096 decimales de "mundo". Se están compartiendo contexto.
*   **Estructura de Datos Resultante:** Aunque los decimales dentro cambian drásticamente y se enriquecen, la forma geométrica exterior de nuestros datos se mantiene intacta. Seguimos teniendo una matriz de forma `[2 x 4096]`.

## 5. El Un-Embedding / Generación de Logits (Colapso Estructural)
Llegamos al final del modelo y queremos adivinar la siguiente palabra.
Solo nos interesa el "futuro" del último token leído, así que agarramos la última fila de nuestra matriz de datos (la fila enriquecida de "mundo").
*   **Los datos ahora:** Vuelven a ser un Array unidimensional de tamaño `[4096]`.
Ahora cruzamos este array contra la Matriz de Salida (LM Head), que actúa como un embudo a la inversa.
*   **Matriz de Salida:** Es una tabla gigante con forma `[4096 filas x 32000 columnas]`. 
*   **La Operación:** Se cruza nuestro array de 4096 números contra esta tabla masiva.
*   **Estructura de Datos Resultante:** El resultado matemático de esta operación es un nuevo Array unidimensional, gigante, con forma `[32000]`. A esta lista la llamamos **Logits**. Tenemos un número (puntuación) para cada palabra posible del diccionario.

## 6. Softmax y Secuenciación (La Lista Final de Probabilidades)
Esa lista de `[32000]` puntuaciones contiene números muy raros (positivos y negativos enormes).
*   **La Operación (Softmax):** Se aplica una función que aplasta todo el Array de `[32000]` posiciones.
*   **Estructura de Datos Resultante:** Sigue siendo una lista plana de `[32000]`, pero ahora todos los números van del 0 al 1 y, sumados, dan exactamente 1 (el 100% de probabilidad).
*   **Elección Final:** El proceso final escoge un único ganador tirando un dado trucado con esos porcentajes. Digamos que gana la posición 8900 (la palabra "feliz").
*   **Retorno al Inicio:** El número 8900 se añade a nuestra lista original en el paso 2. Ahora nuestra entrada es `[405, 12, 8900]`. Este ciclo exacto de despliegues y colapsos de matrices comenzará otra vez.
