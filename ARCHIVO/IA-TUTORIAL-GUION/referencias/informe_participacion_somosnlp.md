# Guía de Participación: Hackathon SomosNLP (Track Post-entrenamiento)

Este informe detalla la hoja de ruta procedimental para que nuestro equipo (de 1 a 5 personas) participe con éxito en el hackathon de la comunidad SomosNLP. El objetivo del track técnico ("techie") es **crear un dataset, post-entrenar un modelo y publicar una demo funcional**, aprovechando los recursos computacionales y las mentorías que ofrece la organización.

Dado nuestro enfoque en lenguas minoritarias y tokenización, esta es una oportunidad perfecta para poner a prueba nuestro modelo.

---

## FASE 1: Formación del Equipo y Creación del Dataset

El primer requisito es la curación y estructuración de los datos. Puesto que vamos a realizar post-entrenamiento (fine-tuning), no necesitamos un corpus masivo de billones de palabras, sino **datos de alta calidad** estructurados en formatos específicos.

### 1.1. Definición del Caso de Uso
- Elegir un dominio específico para el modelo en la lengua minoritaria (ej. asistente conversacional, traductor especializado, corrector gramatical o un modelo experto en un dominio cultural).

### 1.2. Construcción del Dataset de Instrucciones (SFT)
- **Formato Requerido**: El dataset debe seguir un esquema de *Instrucción - Entrada (opcional) - Salida*.
- **Generación**:
  - *Traducción/Curación manual*: Traducir datasets clásicos de alta calidad (como Alpaca o Dolly) a nuestra lengua minoritaria.
  - *Generación sintética (Distillation)*: Utilizar modelos más grandes (ej. GPT-4 o Claude) para generar pares de preguntas y respuestas en el idioma objetivo, y luego someterlos a una revisión humana.
- **Publicación**: Subir el dataset a Hugging Face (`datasets`) con una *Dataset Card* bien documentada (origen, sesgos, licencia abierta).

### 1.3. Dataset de Preferencias (Para DPO/RLVR)
- Si apuntamos a técnicas de alineamiento más avanzadas, necesitamos generar un dataset de preferencias.
- **Formato**: *Prompt - Respuesta Elegida (Chosen) - Respuesta Rechazada (Rejected)*. Esto permite al modelo aprender qué estilo de respuesta es mejor.

---

## FASE 2: Post-entrenamiento del Modelo

Esta es la fase central del hackathon. Aprovecharemos las mentorías de SomosNLP para definir los hiperparámetros y el hardware proporcionado para entrenar.

### 2.1. Supervised Fine-Tuning (SFT)
- **Objetivo**: Enseñar al modelo base (ej. un Llama-3 o un modelo previamente adaptado con nuestro tokenizador) a comportarse como un asistente, respondiendo a instrucciones.
- **Herramientas**: Usar librerías como `TRL` (Transformer Reinforcement Learning), `PEFT` (Parameter-Efficient Fine-Tuning) y `LoRA/QLoRA`. Esto nos permitirá entrenar modelos grandes sin requerir clusters masivos, ajustando solo una matriz de pesos de bajo rango.

### 2.2. Alineamiento (DPO / RLVR)
Una vez que el modelo sabe seguir instrucciones (SFT), se debe alinear para que sus respuestas sean seguras, precisas y preferibles para un humano.
- **DPO (Direct Preference Optimization)**: Es la alternativa moderna y ligera a RLHF (Reinforcement Learning from Human Feedback). Utilizando el dataset de preferencias (paso 1.3), se entrena al modelo matemáticamente para aumentar la probabilidad de la respuesta "Chosen" y penalizar la "Rejected".
- **RLVR (Reinforcement Learning with Verifiable Rewards)**: Si nuestro caso de uso tiene una solución objetiva comprobable (ej. código de programación, resolución matemática, o reglas gramaticales estrictas), podemos usar recompensas verificables sin necesidad de humanos evaluando cada salida.

---

## FASE 3: Publicación y Creación de la Demo

El proyecto no está completo hasta que la comunidad pueda interactuar con él.

### 3.1. Subida al Hugging Face Model Hub
- Exportar los pesos del modelo (merge de los pesos LoRA con el modelo base si aplica).
- Subir el modelo al Hub.
- **Model Card**: Es un criterio de evaluación crítico. Debe documentar:
  - Intended use (casos de uso previstos).
  - Limitaciones y sesgos conocidos del modelo.
  - Métricas de evaluación y benchmarks (ej. usando LightEval o un benchmark local).
  - Parámetros de entrenamiento.

### 3.2. Desarrollo de la Demo (Hugging Face Spaces)
- Crear una interfaz web interactiva para que cualquier persona sin conocimientos técnicos pueda probar el modelo.
- **Frameworks recomendados**: `Gradio` o `Streamlit`.
- Desplegar la aplicación en **Hugging Face Spaces** (normalmente SomosNLP provee *Space Hardware Grants* o cupones para GPUs durante el hackathon).

---

## Plan de Acción para el Equipo

1. **Semana 1 (Ideación y Datos)**:
   - Registro del equipo (1-5 personas) en la plataforma de SomosNLP.
   - Definición del alcance y recopilación del dataset de SFT.
   - Solicitar acceso a recursos computacionales de la organización.
2. **Semana 2 (Entrenamiento SFT)**:
   - Configuración del entorno de entrenamiento (PEFT/LoRA).
   - Entrenamiento de la fase SFT y evaluación preliminar.
   - Inicio de redacción de la *Model Card* y *Dataset Card*.
3. **Semana 3 (Alineamiento y Demo)**:
   - (Opcional pero recomendado) Aplicar DPO para refinar el estilo del modelo.
   - Desarrollo de la interfaz en Gradio.
   - Publicación final en Hugging Face Spaces y presentación a las mentorías para feedback final.

> **Nota Estratégica**: Asistir a las mentorías no solo sirve para desatascar problemas técnicos, sino que da visibilidad al proyecto dentro de la comunidad, un factor importante en el ecosistema open source de habla hispana.
