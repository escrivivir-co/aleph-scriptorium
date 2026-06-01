# Informe Técnico: Ciclo de Vida del Token, Atención y Bifurcación Entrenamiento/Inferencia

> [!NOTE]
> **Objetivo del Informe:** Completar la arquitectura mental del funcionamiento del modelo. Partiendo del informe anterior (donde los tokens se convertían en vectores de embeddings), aquí explicaremos cómo esos vectores interactúan entre sí a través de la Atención (Q, K, V) y cómo el proceso final de la red difiere drásticamente si estamos **entrenando** el modelo o utilizándolo en **inferencia** (producción).

---

## 1. El Motor Interno: Matrices de Atención (Q, K, V) y los Embeddings

Antes de llegar a la predicción final, los vectores de embeddings que salieron de nuestra matriz inicial deben viajar a través de las capas del Transformer. Aquí es donde entra el mecanismo de "Auto-Atención" (*Self-Attention*).

Cada vector de embedding se multiplica por tres matrices de pesos distintas ($W^Q$, $W^K$, $W^V$) para generar tres nuevos vectores:

1.  **Query (Q - Consulta):** "Buscando contexto". *Ej: Soy el adjetivo 'rojo', estoy buscando un sustantivo al que modificar.*
2.  **Key (K - Clave):** "Ofreciendo identidad". *Ej: Soy el sustantivo 'manzana', aquí estoy.*
3.  **Value (V - Valor):** "Contenido semántico puro". *Ej: Soy el significado base de la fruta.*

La red multiplica los *Queries* de todas las palabras por las *Keys* de las palabras anteriores para obtener una "puntuación de atención". Si el *Query* de 'rojo' hace un buen *match* con la *Key* de 'manzana', su puntuación sube, y el modelo absorberá el *Value* de 'manzana'.

> [!IMPORTANT]
> **Vínculo con la actualización de Embeddings:** Las matrices Q, K y V aprenden **"cómo relacionar"** conceptos gramaticales y contextuales. Cuando el error (Loss) fluye hacia atrás durante el entrenamiento (*Backpropagation*), pasa primero por las matrices Q, K y V, ajustando sus reglas lógicas. Luego, el gradiente sigue bajando hasta impactar finalmente en la **Matriz de Embeddings** (explicada en el informe anterior), ajustando la "definición base" de la palabra. *Atención define el contexto; el Embedding define la esencia.*

---

Tras pasar por múltiples capas de Atención (QKV), el vector resultante está altamente enriquecido. Llegamos a la última capa del modelo, la "Cabeza de Predicción" (*LM Head* o *Un-embedding*), que transforma este vector en un conjunto masivo de puntuaciones crudas llamadas **Logits**. A partir de este punto, el flujo se bifurca dependiendo de lo que estemos haciendo.

---

## 2. Fase de Entrenamiento: El camino hacia el Error

Durante el entrenamiento, el objetivo es castigar a la red por sus predicciones incorrectas y premiarla por las correctas. Poseemos la "verdad absoluta" (sabemos cuál es la siguiente palabra en el texto de entrenamiento).

```mermaid
graph TD
    A[Logits <br/><small>Puntuaciones crudas para cada token (ej. 32,000 valores)</small>] -->|1. Exponencial + Normalización| B[Softmax <br/><small>Conversión a probabilidades (0% a 100%)</small>]
    B -->|2. Evaluación contra la Verdad| C[Cross Entropy <br/><small>Comparación de la predicción vs el token real</small>]
    C -->|3. Cálculo del Castigo| D[Error / Loss <br/><small>Valor numérico (gradiente) para Backpropagation</small>]
```

### Explicación del Flujo:
1.  **Logits:** Salen 32,000 números crudos. Algunos positivos (ej. 15.4), otros negativos (ej. -3.2). No tienen sentido probabilístico directo.
2.  **Softmax:** Transforma esos 32,000 logits en una distribución de probabilidad que suma exactamente 1 (o 100%). Por ejemplo, el token "manzana" recibe 80%, "coche" recibe 0.1%, etc.
3.  **Cross Entropy (Entropía Cruzada):** Se revela cuál era el token real (ej. "manzana" que tiene probabilidad del 100% en la realidad). Si la red le había asignado un 80%, el castigo es bajo. Si la red había predicho "coche" con un 99% y el token real era "manzana", el castigo es masivo.
4.  **Error (Loss):** Este castigo numérico se convierte en una onda de choque matemática (*Gradiente*) que viaja en reversa (Backpropagation) modificando todas las matrices Q, K, V y, finalmente, la Matriz de Embeddings, para no cometer el mismo error en la siguiente iteración.

---

## 3. Fase de Inferencia: El camino hacia el Texto

En producción (inferencia), la red ya está entrenada (sus pesos y matrices QKV y Embeddings están congelados). Ya no hay "verdad absoluta" ni se calcula ningún Error (*Loss*). El objetivo es generar de manera continua.

```mermaid
graph TD
    A[Logits <br/><small>Puntuaciones crudas generadas</small>] -->|1. Modulación por Temperatura| B[Softmax Modificado <br/><small>Ajuste de agudeza en probabilidades</small>]
    B -->|2. Selección Estocástica| C[Sampling <br/><small>Top-K / Top-P (Nucleus) / Greedy</small>]
    C -->|3. Decodificación| D[Token Final <br/><small>Texto devuelto al usuario</small>]
```

### Explicación del Flujo:
1.  **Logits:** Igual que en entrenamiento, obtenemos 32,000 valores crudos.
2.  **Softmax (Con Temperatura):** Antes del Softmax clásico, se divide el logit por un valor llamado *Temperature*. 
    *   *Temperatura = 1.0:* Flujo normal.
    *   *Temperatura baja (ej. 0.2):* Hace que las probabilidades altas se disparen hacia el 99%, volviendo al modelo predecible, determinista y seguro (útil para código o matemáticas).
    *   *Temperatura alta (ej. 1.5):* Aplana la curva, dando oportunidad a palabras raras, volviendo al modelo más creativo pero propenso a alucinaciones.
3.  **Sampling (Muestreo):** En lugar de coger simplemente la palabra con la probabilidad más alta (*Greedy Search*), se suele utilizar un muestreo aleatorio ponderado. 
    *   **Top-K:** Solo mira las $K$ palabras más probables (ej. top 50) y elige una al azar basándose en sus pesos.
    *   **Top-P:** Suma las probabilidades de mayor a menor hasta alcanzar un porcentaje $P$ (ej. 0.9 o 90%) y descarta todo lo demás.
4.  **Token:** Se elige el ID ganador. El Tokenizador (como se explicó en el primer informe) busca ese ID y devuelve la cadena de texto literal al usuario. Acto seguido, ese token generado se pega al final del contexto y todo el ciclo vuelve a empezar de cero (Generación Auto-regresiva).
