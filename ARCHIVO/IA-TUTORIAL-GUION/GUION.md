# Fase de diseño

referencias/informe_ejecutivo_tokenizador.md

0.- Vocabulario (lista de significantes. Si usamos las letras del alfabeto tenemos 28 pero si subimos morfológicamente agrupando en sílabas obtenemos estadísticas más relevantes de uso, esto hace que un token aporte menos o más entropía, es importante elegir bien el vocabulario. Si usamos las palabras tenemos un vocabulario de unas 100.000 unidades atómicas en español, etc... sigue en punto tokenizar)

1.- Tokenizar (diccionario de identificadores para el vocabulario, el par símbolo/identificador es un token. ¿cómo han resuelto los tokenizores más populares para los alfabetos inglés y español y qué pinta tienen esos tokenizadores)



# Fase de entrenamiento

0.1.- Seleccion de la dimensión oculta (un nº natural de dimensiones para proyecta la atención; un número demasiado pequeño no permite abstraer semántica, uno muy grande degrada las relaciones semióticas reales)


Texto
 ↓
Tokenización
 ↓
Lookup embeddings
 ↓
Transformer
 ↓
Predicción
 ↓
Error
 ↓
Backpropagation
 ↓
Actualizar pesos
	- Matriz de embedings
	- Matrices wQ, wV, wK

Entrada
 ↓
Attention -> mirar a otros tokens
 ↓
Residual -> Conservo la información previa y facilito el aprendizaje --> Un valor obtenido se parsea junto con el valor que sustituye
 ↓
LayerNorm -> Layer Normalization (media / varianza)
 ↓
MLP -> Multi-Layer Perceptron -> pensar localmente sobre este token
 ↓
Residual
 ↓
LayerNorm
 ↓
Salida


# Fase de predicción

Hola
↓
tokenizador
↓
IDs
↓
lookup embedding
↓
capas Transformer
↓
logits 
↓
sampling
↓
nuevo token

2.- Embeddings (matriz fija: tamaño diccionario x tamaño de la dimensión oculta)

3.- Secuencia entrada (se limita a la "ventana de contexto" y es un número de identificadores-token por inferencia)

3.- Transformers (cabezales de atención se reparten el espacio geométrico)

4.- Feed-Forward (producto escalar)

5.- logits (matriz fija: tamaño diccionario x dimensiones)

6.- sampling -> un criterio para escoger los más (el más) relevante de logits