Mapeo de modelos de lenguaje en español y lenguas cooficiales

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

# Informe

El usuario ha proporcionado dos prompts (A y B). Primero, debo ejecutar el Prompt A: realizar una búsqueda exhaustiva para mapear el ecosistema de modelos de lenguaje relacionados con el español y las lenguas cooficiales de España. Debo clasificar los resultados en tres categorías: modelos bilingües/multilingües donde el español es secundario, modelos nativos donde el español es principal, y modelos para lenguas cooficiales.

Para el Prompt A, necesito buscar información actualizada (2025-2026). Usaré el operador `||` para realizar múltiples búsquedas en paralelo, cubriendo diferentes aspectos: modelos bilingües/multilingües con español, modelos nativos en español, modelos para lenguas cooficiales (catalán, gallego, euskera), y proyectos institucionales como el Plan de Impulso de Lenguas Cooficiales en IA.

Found 99 web pages

Después de revisar los resultados de las búsquedas, necesito profundizar en algunos de ellos para obtener más detalles. Abriré varios resultados relevantes.

Read 7 pages

[LLM en Español: modelos, datasets y casos 2026](https://keepcoding.io/blog/llm-en-espanol-panorama-de-modelos-datasets/)

MarIA: Spanish Language Models

[LLMs for Spain's Official Languages](https://www.clarin.eu/blog/llms-spains-official-languages)

[Latxa Euskarazko Hizkuntza-Eredua](https://ekoizpen-zientifikoa.ehu.eus/documentos/684723534480d1119995258d?lang=en)

[A Galician-Portuguese Generative Model](https://citius.gal/research/publications/a-galician-portuguese-generative-model/)

View All

Ahora necesito buscar información sobre tokenizadores.

Found 37 web pages

Ahora necesito profundizar en la tokenización para lenguas cooficiales.

Found 29 web pages

Ahora necesito buscar información sobre los desafíos de tokenización para lenguas minoritarias.

Found 15 web pages

Ahora necesito buscar información más específica sobre el tokenizador de Aitana.

Found 10 web pages

Ahora necesito buscar información sobre proyectos como "SomosNLP" y "Proyecto Nós".

Found 10 web pages

Ahora necesito recopilar toda esta información para estructurar la respuesta.

Found 8 web pages

Ahora necesito organizar la respuesta para el Prompt A.

El mapa del ecosistema de modelos de lenguaje en español y lenguas cooficiales revela un panorama complejo y dinámico que va desde grandes infraestructuras institucionales hasta proyectos comunitarios de código abierto. A continuación, se presenta un catálogo estructurado según las categorías solicitadas.

* * * * *

a.1) Modelos bilingües o multilingües donde el español es secundario
--------------------------------------------------------------------

Esta categoría agrupa modelos globales que, aunque no fueron diseñados específicamente para el español, han sido adaptados o afinados (*fine-tuned*) para mejorar su rendimiento en este idioma.

### Grandes Modelos Comerciales

Modelos como GPT-4 de OpenAI o Gemini de Google, entrenados principalmente en inglés, demuestran una fluidez sorprendente en español gracias a su naturaleza multilingüe, entendiendo modismos y adaptando su tono al contexto cultural[](https://keepcoding.io/blog/llm-en-espanol-panorama-de-modelos-datasets/). De forma similar, en el ámbito del código abierto, la familia Llama de Meta sirve como base para numerosos afinamientos enfocados en el español.

### Iniciativas Comunitarias y Startups

Comunidades como SomosNLP han surgido precisamente para democratizar el acceso al PLN en español. Impulsan proyectos como el #Somos600M para crear recursos de afinamiento y evaluación, reconociendo que el español se habla en 22 países con diferentes dialectos, lo que afecta el rendimiento de los modelos. Durante sus hackatones se han afinado modelos como bertin-gpt-j-6B, demostrando el poder del esfuerzo colaborativo. En paralelo, startups tanto en Latinoamérica como en España están creando LLMs específicos ajustados a dialectos regionales, mejorando la naturalidad y precisión en sectores como la educación y el comercio electrónico[](https://keepcoding.io/blog/llm-en-espanol-panorama-de-modelos-datasets/).

### Modelos Especializados en Traducción y Adaptación

Proyectos como EuroLLM-22B destacan por ser capaces de traducir entre todos los idiomas oficiales de la UE, compitiendo con modelos mucho más grandes en tareas de traducción. En España, el consorcio AIDC-AI ha desarrollado Marco-LLM-ES, una familia de modelos de 7.6B parámetros específicamente afinados para lenguas como catalán, euskera, gallego y español, basándose en arquitecturas como Qwen2 y Llama 3.1.

a.2) Modelos nativos donde el español es el idioma principal o "madre"
----------------------------------------------------------------------

Aquí se incluyen modelos entrenados desde cero (o con preentrenamiento continuo significativo) donde el español es el eje central del desarrollo.

### Hitos Fundacionales: MarIA y ALBETO

MarIA (del Barcelona Supercomputing Center - BSC) es el primer sistema masivo de IA experto en comprender y escribir en lengua española, entrenado con 570 GB de texto limpio (más de 135 mil millones de palabras) utilizando arquitecturas RoBERTa y GPT-2. Por otro lado, ALBETO (y su versión comprimida DistilBETO) fueron de los primeros modelos de tipo ALBERT y DistilBERT preentrenados exclusivamente en corpus españoles, demostrando un rendimiento superior en tareas como MLDoc, PAWS-X y XNLI.

### Proyectos Institucionales de Gran Escala

-   LEIA (Lengua Española e Inteligencia Artificial): Un proyecto estratégico del Gobierno de España y la RAE, iniciado en 2022 con 5 millones de euros de financiación. Busca garantizar que la IA piense en español y lenguas cooficiales, desarrollando infraestructuras lingüísticas abiertas y gratuitas[](https://planderecuperacion.gob.es/index.php/noticias/conoce-proyecto-leia-lengua-espanola-inteligencia-artificial-prtr). Su objetivo es que el español sea una lengua plenamente funcional en chatbots, asistentes de voz y sistemas conversacionales, atendiendo a más de 591 millones de hispanohablantes[](https://planderecuperacion.gob.es/index.php/noticias/conoce-proyecto-leia-lengua-espanola-inteligencia-artificial-prtr).

-   ALIA (Activos para el Lenguaje y la Inteligencia Artificial): Concebido como una infraestructura pública, abierta y transparente, financiada 100% con fondos públicos. Es la primera familia de modelos fundacionales pensada específicamente para 35 lenguas europeas, con especial foco en las de España. Su corpus de entrenamiento supera los 17.000 millones de palabras en 34 millones de documentos de alta calidad, priorizando la fiabilidad y minimizando problemas de propiedad intelectual[](https://www.bigdata.uma.es/alia-inteligencia-artificial-soberana-para-el-espanol-y-las-lenguas-cooficiales-en-espana/#alia-kit-recursos-abiertos-para-la-comunidad). La familia incluye modelos como ALIA-40B, Salamandra-7B y Salamandra-2B.

### Modelos Académicos y de Nicho

-   RigoChat: Modelo generativo en español entrenado por la Universidad Autónoma de Madrid para responder a instrucciones complejas o mantener conversaciones.

-   GPT-NeoX y BLOOM: Modelos abiertos con entrenamiento multilingüe que incluye el español, ofreciendo flexibilidad para ser ajustados en dominios específicos (por ejemplo, en el ámbito médico para interpretar términos técnicos)[](https://keepcoding.io/blog/llm-en-espanol-panorama-de-modelos-datasets/).

a.3) Lenguas cooficiales y soluciones conjuntas
-----------------------------------------------

El ecosistema para las lenguas cooficiales de España (catalán, euskera, gallego y valenciano) ha experimentado un crecimiento notable, impulsado por proyectos institucionales y comunitarios.

### Proyectos Institucionales Multilingües

-   ILENIA: Proyecto colaborativo para impulsar las lenguas cooficiales (catalán, gallego, euskera y valenciano) en el ámbito de la IA, con una inversión gubernamental de hasta 5 millones de euros para potenciar el euskera en modelos de lenguaje.

-   Plan de Impulso de Lenguas Cooficiales: Enmarcado en el PERTE Nueva Economía de la Lengua, busca generar recursos multilingües para desarrollar aplicaciones en todas las lenguas oficiales y reducir la brecha tecnológica con los idiomas de altos recursos[](https://www.clarin.eu/blog/llms-spains-official-languages).

### Modelos Específicos por Lengua

#### Catalán

-   Salamandra (BSC): Familia de modelos de 2B, 7B y 40B parámetros, entrenada desde cero con un dataset que incluye 35 lenguas europeas, siendo el primer LLM entrenado desde cero usando MareNostrum 5[](https://www.clarin.eu/blog/llms-spains-official-languages).

-   RoBERTa-ca: Modelo obtenido mediante adaptación de vocabulario a partir de mRoBERTa, utilizando tokenización BPE a nivel de byte con un vocabulario de 50,262 tokens.

-   Aguila-7B: Modelo que utiliza una versión byte de tokenización BPE con un vocabulario de 50,257 tokens.

#### Euskera (Basque)

-   Latxa (HiTZ - UPV/EHU): Actualmente el mayor LLM desarrollado para euskera, con modelos de 7 a 70B parámetros construidos sobre Llama 2, continuando el preentrenamiento con 4.3 millones de documentos y 4.2 mil millones de tokens en euskera. Demuestra superioridad sobre modelos open source previos y resultados competitivos con GPT-4 Turbo en competencia lingüística[](https://ekoizpen-zientifikoa.ehu.eus/documentos/684723534480d1119995258d?lang=en). El proyecto también ha liberado Euskorpus, un corpus digital de textos en euskera para garantizar el futuro del idioma en la era digital.

#### Gallego

-   Carvalho/Carballo (CiTIUS e ILG): El primer y mayor LLM creado para gallego. Incluye modelos como Carvalho_pt-gl 1.3B (arquitectura GPT, 1.3B parámetros entrenados en más de 6 mil millones de palabras entre gallego y portugués) y versiones basadas en Llama 3.1 de 8B[](https://www.clarin.eu/blog/llms-spains-official-languages)[](https://citius.gal/research/publications/a-galician-portuguese-generative-model/). La estrategia de *continual pretraining* sobre modelos preexistentes ha permitido superar las limitaciones de datos que se enfrentarían si se entrenara desde cero[](https://citius.gal/research/publications/a-galician-portuguese-generative-model/).

#### Valenciano

-   Aitana (CENID): Modelo que parte de FLOR-6.3B o Salamandra-2B como base, utilizando el mismo tokenizador que el modelo base, pero con especial énfasis en datos en valenciano. Aunque técnicamente es similar al catalán, representa un esfuerzo por atender esta variante lingüística específica.

### Proyectos Transversales y Evaluación

-   CLARIAH-ES: Consorcio que ha desarrollado múltiples familias de modelos (Latxa, Salamandra, Carballo) siguiendo las directrices de IA confiable de la Ley de IA Europea[](https://www.clarin.eu/blog/llms-spains-official-languages).

-   Iniciativas de evaluación como las de Nuria Aldama García combinan 66 datasets en catalán, euskera, gallego y variedades del español, evaluando más de 50 modelos para fomentar el desarrollo comunitario de *leaderboards*.

* * * * *

> Nota técnica importante: Para completar el mapeo del ecosistema, se requiere una segunda fase de búsqueda más profunda sobre las experiencias concretas y la anatomía de los tokenizadores utilizados por estos proyectos. ¿Desea que proceda con el Prompt B para realizar esa inmersión técnica específica?

---

### Enlaces sobre Tokenizadores y Morfología (Extraídos para Prompt B)

A partir del registro de búsqueda, se han recuperado los siguientes enlaces clave investigados por el agente relacionados con desafíos morfológicos, tokenizadores BPE y lenguas aglutinantes:

**Artículos Académicos y Papers:**
* [VerChol -- Grammar-First Tokenization for Agglutinative Languages (arXiv:2603.05883)](https://arxiv.org/abs/2603.05883v1)
* [Why do language models perform worse for morphologically complex languages? (arXiv:2411.14198)](https://ar5iv.labs.arxiv.org/html/2411.14198)
* [Confounding Factors in Relating Model Performance to Morphology (arXiv:2511.01380)](https://ar5iv.labs.arxiv.org/html/2511.01380)
* [Vocabulary optimization (MoVoC) for BPE Tokenizer (arXiv:2509.08812)](https://export.arxiv.org/pdf/2509.08812#4#2)
* [Galician-Portuguese Byte Pair Encoding (BPE) tokenizer (CiTIUS)](https://fegalaz.usc.es/~gamallo/artigos-web/EPIA2024.pdf)
* [Exploring an optimal vocabulary size for Galician (Grupo LYS)](https://www.grupolys.org/biblioteca/VilGarGom2021a.pdf)
* [Detecting Erroneous Uses of Complex Postpositions in an Agglutinative Language - Basque](https://www.sciweavers.org/publications/detecting-erroneous-uses-complex-postpositions-agglutinative-language)

**Modelos y Tokenizadores (Hugging Face / Repositorios):**
* [RoBERTa-ca (BSC-LT)](https://huggingface.co/BSC-LT/RoBERTa-ca) y en el [Proyecto ILENIA](https://proyectoilenia.es/recurso/roberta-ca/#content)
* [Nós MT-OpenNMT-gl-es (Proyecto Nós)](https://huggingface.co/api/resolve-cache/models/proxectonos/Nos_MT-OpenNMT-gl-es/f7345f392c6846bd63f97848985a7b6cd892182e/README_English.md)
* [Aguila-7b (PromptLayer Models)](https://www.promptlayer.com/models/aguila-7b/)
* [RoBERTa-base-ca-v2](https://www.promptlayer.com/models/roberta-base-ca-v2/)

### Referencias Adicionales (Búsqueda Completa)

* **[What is the appropriate vocabulary length setting? - Issue #935 - google/sentencepiece](https://app4.secure.forcepoint.com/google/sentencepiece/issues/935)** _forcepoint.com2023/11/14_
  > import sentencepiece as sp sp.SentencePieceTrainer.train( input='./data/corpus.txt', model_prefix='tokenizer', vocab_size=3000, character_coverage=1.0, model_type="bpe" ) As above, what is the appropriate setting for vocab_size?

* **[README.md - zirui3/llm-multilingual-tokenizer at main](https://huggingface.co/zirui3/llm-multilingual-tokenizer/blame/main/README.md)** _Hugging Face_
  > 492f8a3 3315142 | 1234567 | # summary multilingual tokenizer trained on multilingual data by using the SentencePiece library and the BPE algorithm. * vocab size: 100k

* **[Bert Base Spanish Wwm Cased](https://model.aibase.com/ja/models/details/1915687191621353474)** _AIbase_
  > すべてのモデルは、SentencePieceを使用して構築された約31kのBPEサブワードの語彙を使用し、200万ステップで学習されています。 ## 📊 ベンチマーク 次の表は、各タスクのスペイン語版におけるBETOの結果を示しています。

* **[sentencepiece_download_model: Download a Sentencepiece model in sentencepiece: Text Tokenization using Byte Pair Encoding and Unigram Modelling](https://rdrr.io/cran/sentencepiece/man/sentencepiece_download_model.html)** _Rdrr2022/11/12_
  > integer indicating the number of tokens in the final vocabulary. Defaults to 5000. Possible values depend on the language. To inspect possible values, type sentencepiece:::.bpemb$vocab_sizes and look to your language of your choice.

* **[modelee/bert-base-spanish-wwm-cased](https://gitee.com/modelee/bert-base-spanish-wwm-cased)** _Gitee2024/01/17_
  > All models use a vocabulary of about 31k BPE subwords constructed using SentencePiece and were trained for 2M steps. ## Benchmarks The following table shows some BETO results in the Spanish version of every task.

* **[SentencePiece](https://chromium.journaldev.googlesource.com/chromium/src/third_party/+/11d2e32609d2706b969685f3c4e1e54187db237a/sentencepiece/src/)** _Google Open Source_
  > SentencePiece is an unsupervised text tokenizer and detokenizer mainly for Neural Network-based text generation systems where the vocabulary size is predetermined prior to the neural model training. ... Note that SentencePiece specifies the final vocabulary size for training, which is different from subword-nmt that uses the number of merge operations.

* **[bert-base-spanish-wwm-uncased | PromptLayer Models](https://www.promptlayer.com/models/bert-base-spanish-wwm-uncased/)** _PromptLayer_
  > The model utilizes a vocabulary of approximately 31,000 BPE subwords constructed using SentencePiece and underwent training for 2 million steps. It's implemented using both PyTorch and TensorFlow frameworks, making it versatile for different development environments.

* **[Training and Evaluation of a Multilingual Tokenizer for GPT-SW3](https://ar5iv.labs.arxiv.org/html/2304.14780)** _arXiv_
  > The vocabulary tokens themselves are determined by the vocabulary size and the BPE algorithm. The vocabulary size is a hyperparameter that needs to be specified beforehand. It typically lies between 30000 and 50000, but larger vocabulary sizes have also been used (see App.

* **[Upload tokenizer - HugoZeballos/nllb-esp-rap at fc95fd3](https://huggingface.co/HugoZeballos/nllb-esp-rap/commit/fc95fd37c9a418103877cf7024a8a642b7f99b35)** _Hugging Face2024/02/07_
  > + size 4858907 ... + "additional_special_tokens": [ 3 | + "ace_Arab", 4 | + "ace_Latn", 5 | + "acm_Arab"...

* **[sentencepiece.bpe.model - MMG/xlm-roberta-base-sa-spanish at 36e8b8ec00541360b6d799f30908c0de01962d23](https://huggingface.co/MMG/xlm-roberta-base-sa-spanish/blob/36e8b8ec00541360b6d799f30908c0de01962d23/sentencepiece.bpe.model)** _Hugging Face2022/03/30_
  > Pointer size: 132 Bytes - Size of remote file: 5.07 MB Git Large File Storage (LFS) replaces large files with text pointers inside Git, while storing the file contents on a remote server. More info.

* **[add model and tokenizer - HiTZ/latxa-70b-v1.1 at d4305f4](https://aclanthology.org/2022.emnlp-main.499/)** _Hugging Face2024/02/15_
  > + Latxa is a collection of foundation models specifically tuned for Basque. Based on Meta's LLaMA 2 model family, these models were further trained with Euscrawl, a highly curated Basque corpora ([Artetxe et al., 2022

* **[README.md - HiTZ/latxa-70b-v1.1 at 07ee4f364b7e2e7e76c537aaf97ddea58b1dea31](https://huggingface.co/HiTZ/latxa-70b-v1.1/blob/07ee4f364b7e2e7e76c537aaf97ddea58b1dea31/README.md)** _Hugging Face2024/02/15_
  > Latxa is a collection of foundation models specifically tuned for Basque. Based on Meta's LLaMA 2 model family, these models were further trained with Euscrawl, a highly curated Basque corpora (Artetxe et al., 2022).

* **[Run Latxa-Llama-3.1-8B API (Easy Deployment & Flat-Rate Pricing)](https://featherless.ai/models/HiTZ/Latxa-Llama-3.1-8B)** _Featherless.ai_
  > It is specifically fine-tuned on a 4.2 billion token Basque corpus using language adaptation techniques, making it highly optimized for the Basque language. This model significantly outperforms the base Llama-3.1 8B on Basque benchmarks and excels in Basque chat conversations, positioning it as a leading LLM for low-resource Basque language applications.

* **[***Latxa**(Etxaniz et al., 2024): the dataset used to trained the Latxa (Etxaniz et al., 2024) family of large language models for Basque.](http://browse.dev.arxiv.org/pdf/2412.13922#5#4)** _browse.dev.arxiv.org_

* **[--- license: llama2 datasets: - HiTZ/latxa-corpus-v1.1 - HiTZ/euscrawl language: - eu - en metrics: - accuracy - f1 - perplexity pipeline_tag: text-generation --- # **Model Card for Latxa 7b** ![Lat](https://huggingface.co/HiTZ/latxa-7b-v1.1/resolve/dbf2c44a4911c33d5afbfddf68ceb87b12dee10d/README.md?download=true)** _Hugging Face_

* **[proxectonos/Carvalho-Salamandra-Instruct - Hugging Face](https://huggingface.co/proxectonos/Carvalho-Salamandra-Instruct)** _Hugging Face2026/01/28_
  > Carvalho-Salamandra-Instruct is a 7B-parameter instruction-tuned transformer model covering Galician, Portuguese, Spanish, English and Catalan. ... The model was trained with a mix of instruction data and high-quality monolingual corpora, designed to maximize performance in Galician and Portuguese while preserving broad multilingual capabilities.

* **[Nos-PT/Llama-Carvalho-GL - Hugging Face](https://huggingface.co/Nos-PT/Llama-Carvalho-GL)** _Hugging Face2025/03/26_
  > Llama-Carvalho-GL is a 8B-parameter transformer-based causal language model for Galician, Portuguese, Spanish and English. ... a family of LLMs specialized in Portuguese and Galician which can be found here. ... model_id = "Nos-PT/Llama-Carvalho-GL" tokenizer = AutoTokenizer.from_pretrained(model_id)

* **[To adapt the tokenizer model to Galician-Portuguese, a new Byte Pair Encoding (BPE) tokenizer was trained on our corpus giving rise to a Galician-Portuguese vocabulary with \(50,257\) tokens by making use of the adaptation described in the previous subsection.](https://fegalaz.usc.es/~gamallo/artigos-web/EPIA2024.pdf#3#2)** _fegalaz.usc.es_

* **[Dá-se especial destaque à família de modelos Carvalho/Carballo, modelos generativos treinados com dados em galego e português. A apresentação inclui ainda avaliações comparativas entre modelos seq2seq e generativos para tradução automática.](https://ilg.usc.gal/sites/default/files/pdfs/simposioilg2025_gamallo.pdf#1#1)** _ilg.usc.gal_

* **[Run Llama-Carvalho-PT-GL API (Easy Deployment & Flat-Rate Pricing)](https://featherless.ai/models/Nos-PT/Llama-Carvalho-PT-GL)** _Featherless.ai_
  > The training corpus comprised 540M tokens of plain text and 72M tokens of instructions, with a significant emphasis on Galician (42.96% of base plain text, 37.01% of instructions) and Portuguese (46.29% of base plain text, 61.00% of instructions).

* **[The international congress EPIA2024 awarded 'Carvalho_pt-gl', an innovative generative model of bilingual language for Galician and Portuguese designed at CiTIUS](https://citius.gal/news/news/the-international-congress-epia2024-awarded-carvalhopt-gl-an-innovative-generative-model-of-bilingual-language-for-galician-and-portuguese-designed-at-citius/)** _CiTIUS - Centro Singular de Investigación en Tecnoloxías Intelixentes2024/06/17_
  > A generative model capable of processing and generating content in Galician and Portuguese, developed by CiTIUS within the framework of the Nós Project, has just been awarded the 'Best Application Paper Award' at the international congress EPIA2024, marking a milestone for linguistic diversity in artificial intelligence.

* **[A Galician-Portuguese Generative Model](http://www.rdpc.uevora.pt/handle/10174/41452)** _Universidade de Évora2024/11/15_
  > In this work, we describe an open-source Galician-Portuguese generative model, Carvalho_pt-gl, focused precisely on these two language variants, which are very close lexically and syntactically. The model was trained using a GPT architecture with 1.3

* **[Because Byte Pair Encoding (BPE) [()], the most used tokenizer, looks for frequent character sequences, it creates many subwords that cannot be found in a standard bilingual dictionary, and this problem gets worse when dealing with a limited number of texts. Thus...](https://aclanthology.org/2024.emnlp-main.638.pdf#4#2)** _aclanthology.org_

* **[MarIA: Spanish Language Models](https://www.lareferencia.info/vufind/Record/ES_ace35d107d20154e2a8337f02e6305b8?lng=bn)** _LA Referencia - Inicio_
  > This work presents MarIA, a family of Spanish language models and associated resources made available to the industry and the research community. Currently ... সংক্ষিপ্ত: | This work presents MarIA, a family of Spanish language models and associated resources made available to the industry and the research community. Currently...

* **[El primer modelo de IA masivo de la lengua española MarIA es un conjunto de modelos del lenguaje o, dicho de otro modo, redes neuronales profundas que han sido entrenadas para adquirir una comprensión de la lengua, su léxico y sus mecanismos para expresar el significado y escribir a nivel experto.](https://www.bsc.es/es/printpdf/noticias/noticias-del-bsc/los-desarrolladores-de-aplicaciones-ya-disponen-de-un-sistema-de-inteligencia-artificial-experto-en#1#1)** _bsc.es_

* **[Abstract: This work presents MarIA, a family of Spanish language models and associated resources made available to the industry and the research community. Currently ... Actualmente MarIA incluye los modelos del lenguaje en español RoBERTa- base, RoBERTa- large, GPT2 y GPT2- large que pueden considerarse como los modelos más grandes y mejores para español.](http://arxiv.org/pdf/2107.07253#4#1)** _arxiv.org_

* **[BPE Tokenizers: Theory and Practice](https://www.emergentmind.com/topics/byte-pair-encoding-bpe-tokenizers)** _Emergent Mind2026/01/27_
  > BPE tokenizers are data-driven subword segmentation algorithms that iteratively merge frequent symbol pairs to create a fixed-size vocabulary. ... Byte Pair Encoding (BPE) tokenizers are data-driven subword segmentation algorithms used as the dominant open-vocabulary preprocessing method in large-scale speech recognition...

* **[First massive Artificial Intelligence system in the Spanish language, MarIA, begins to summarize and generate texts ... The MarIA project is the first massive artificial intelligence system and expert in understanding and writing in the Spanish language. Due to its volume and capabilities, it has placed the Spanish language in third place among the languages ??that](https://www.bsc.es/printpdf/news/bsc-news/first-massive-artificial-intelligence-system-the-spanish-language-maria-begins-summarize-and#1#1)** _bsc.es_

* **[This work presents MarIA, a family of Spanish language models and associated resources made available to the industry and the research community. Currently ... Overall, MarIA models outperform the existing Spanish models across a variety of NLU tasks and training settings. MarIA ... 1 Jordi Armengol-Estape*,1 Marc Pamies,1 Joan Llop-Palao...](http://browse.dev.arxiv.org/pdf/2107.07253v4#5#1)** _browse.dev.arxiv.org_

* **[Do you know about sentence embeddings? | Héctor López Hidalgo](https://www.linkedin.com/posts/hlh-generative-ai_retrieval-langchain-activity-7107649120646897664-k20-)** _LinkedIn - Fabian Warislohner2023/09/12_
  > the answer is a big YES! With MarIA (https://lnkd.in/ex96WcMf) we have several transformers fully in Spanish. Using a non-supervi

* **[proxectonos/Carballo-bloom-1.3B](https://huggingface.co/proxectonos/Carballo-bloom-1.3B)** _huggingface.co_
  > Apr 21, 2026 --- Carballo-bloom-1.3B is a 1.3B-parameter transformer-based causal language model for Galician. It is the result of a continual pretraining of FLOR-1.3B.Read more

* **[proxectonos/MrBERT-nos-gl-thematic-press-classifier](https://huggingface.co/proxectonos/MrBERT-nos-gl-thematic-press-classifier)** _huggingface.co_
  > May 6, 2026 --- Developed as part of Proxecto Nós, an initiative to build language technology for the Galician language. ... Galician BERT based in MrBERT model - ...Read more

* **[Open Generative Large Language Models for Galician](https://arxiv.org/html/2406.13893v1)** _arxiv.org_
  > Jun 19, 2024 --- The nós project: Opening routes for the Galician language in the field of language technologies. In Proceedings of the Workshop Towards Digital ...Read more

* **[The Nós Project: Opening routes for the Galician language ...](https://aclanthology.org/2022.tdle-1.6/)** _aclanthology.org_
  > by I de-Dios-Flores - 2022 - Cited by 21 --- The Nós Project (Proxecto Nós), which aims to have a significant contribution to the development of LTs in Galician (currently considered a low-resource ...Read more

* **[A Galician-Portuguese Generative Model - it works!](https://fegalaz.usc.es/~gamallo/artigos-web/EPIA2024.pdf)** _fegalaz.usc.es_
  > by P Gamallo - Cited by 3 --- This processing generated 6M unique documents with 3.8B tokens. Finally, this corpus arose within the scope of an ongoing project, AiBERTa: pretrAined. BERT ...Read more

* **[proxectonos/Llama-3.1-Carballo](https://huggingface.co/proxectonos/Llama-3.1-Carballo)** _huggingface.co_
  > Apr 21, 2026 --- Llama-3.1-Carballo is a 8B-parameter transformer-based causal language model for Galician, Portuguese, Spanish, Catalan and English.Read more

* **[Galician is at the forefront of smart technologies through ...](https://citius.gal/news/news/galician-is-at-the-forefront-of-intelligent-technologies-through-the-nos-ilenia-project/)** _citius.gal_
  > Dec 18, 2025 --- Through Nós, Galician has become today the tenth language in the world with the highe

* **[README.md - hackathon-somos-nlp-2023/salsapaca-native at e24cff2c6384a8350e2c4a0661cc83757315850a](https://github.com/huggingface/peft)** _Hugging Face2023/03/22_
  > This adapter was created with the [PEFT

* **[README_es.md - somosnlp/SMC at main](https://huggingface.co/datasets/somosnlp/SMC/blame/main/README_es.md)** _Hugging Face_
  > and other public resources created by researchers with different formats (e.g.; MedLexSp ) to allow it to be a source of knowledge of large language models in Spanish for the medical domain. --> [**Dataset Card in Spanish**](README_es.md)

* **[The #Somos600M Project, led by SomosNLP, aims to create the necessary resources to fine- tune and evaluate these language models. Spanish is the official language in 22 countries, which implies the existence of a great number of geographic varieties or dialects and influences the performance of language models (Bogantes et al.](http://arxiv.org/pdf/2407.17479#4#1)** _arxiv.org_

* **[no gpu :( - hackathon-somos-nlp-2023/PodcastNER-GPTJ at 4ca3c57](https://huggingface.co/bertin-project/bertin-gpt-j-6B)** _Hugging Face2023/07/05_
  > Este modelo es una vesion fine-tuned para la tarea de named-entity recognition del LLM fundacional en español [bertin-project/bertin-gpt-j-6B

* **[README.md - hackathon-somos-nlp-2023/Habilidades_Agente_v1 at refs/pr/3](https://huggingface.co/datasets/hackathon-somos-nlp-2023/Habilidades_Agente_v1/blob/refs%2Fpr%2F3/README.md)** _Hugging Face2023/04/17_
  > Este dataset ha sido creado para su uso en tareas de procesamiento del lenguaje natural, como la generación de texto o el modelado del lenguaje. English ... This dataset has been created for use in natural language processing tasks such as text generation or language modeling.

* **[hackathon-somos-nlp-2023 (Hackathon Somos NLP 2023: Los LLMs hablan Español)](https://huggingface.co/hackathon-somos-nlp-2023)** _Hugging Face2023/04/08_
  > Con este hackathon te animamos a unirte a nuestro esfuerzo y crear datasets y modelos que apliquen el potencial de los grandes modelos del lenguaje (LLMs) a una buena causa. 🇬🇧 Democratizing NLP in Spanish is the main goal of Somos NLP and one of the best ways to advance towards this goal is to create more open-source NLP resources in our language. With this hackathon...

* **[María Grandury on Artificial Intelligence and NLP](https://blog.pangeanic.com/interview-with-mar%C3%ADa-grandury-on-artificial-intelligence-and-nlp)** _Pangeanic Blog2023/01/18_
  > Somos NLP (somosnlp.org) is made up of Spanish speakers and aims to democratize NLP in Spanish. They create open resources, develop NLP courses, and even "organized a Hackathon in March 2022, which was a great success." The idea was that the projects had to be linked to any of the UN Sustainable Development Goals.

* **[Somos NLP](https://www.eventbrite.com/o/somos-nlp-42049489323)** _Eventbrite_
  > Somos NLP Somos NLP es la red internacional de estudiantes, profesionales e investigadores

* **[gplsi/Aitana-tourism-mb-encoder-1.0 - Hugging Face](https://huggingface.co/gplsi/Aitana-tourism-mb-encoder-1.0)** _Hugging Face2026/02/23_
  > This model was trained on the gplsi/alia_tourism dataset, filtered for Spanish and Valencian languages. ... model = AutoModelForMaskedLM.from_pretrained("gplsi/Aitana-tourism-mb-encoder-1.0") tokenizer = AutoTokenizer.from_pretrained("gplsi/Aitana-tourism-mb-encoder-1.0") ... title = {Aitana Tourism Encoder: Domain-Adapted Language Model for Spanish and Valencian Tourism}...

* **[gplsi/Aitana-6.3B - Hugging Face](https://huggingface.proxy.nlp.skieer.com/gplsi/Aitana-6.3B)** _skieer.com_
  > AITANA-6.3B is a text generation model for causal language modeling with a decoder-only architecture. ... FLOR-6.3B, with emphasis on data (listed below) in Valencian (similar to Catalan) language. ... This model is based on FLOR-6.3B as the basis for training and uses the same tokenizer.

* **[gplsi/Aitana-2B-S - Hugging Face](https://huggingface.co/gplsi/Aitana-2B-S)** _Hugging Face_
  > This model is based on Salamandra-2B as the basis for training and uses the same tokenizer. ## Intended uses and limitations Aitana-2B-S is a base model that can be used for causal language modeling, it can be used as is for text generation, although fine/instruction-tuning on specific tasks is recommended for its final use.

* **[Aitana 2B S Base IP 1.0 by gplsi --- VRAM 4.5GB, 8K context | LLM Explorer](https://llm-explorer.com/model/gplsi%2FAitana-2B-S-base-IP-1.0,1L0D2SIm4IpQ9S0CtbydGL)** _LLM Explorer2026/04/08_
  > 8K context | LLM Explorer | Aitana 2B S Base IP 1.0 is an open-source language model by gplsi. Features: 2b LLM, VRAM: 4.5GB, Context: 8K, LLM Explorer Score: 0.29.

* **[Aitana Unveiled: A Spanish Symphony of Innovation in the AI Revolution | HackerNoon](https://hackernoon.com/lite/aitana-unveiled-a-spanish-symphony-of-innovation-in-the-ai-revolution?ref=hackernoon)** _HackerNoon2023/12/13_
  > Aitana is the first Spanish model created entirely by artificial intelligence. Capable of earning up to €10,000 a month, with an average monthly income of €3,000, she has swiftly become a sensation, amassing over 150,000 followers on Instagram.

* **[Meet Aitana, the Spanish AI model making thousands of dollars a month](https://www.hola.com/us/lifestyle/20231128353116/aitana-spanish-ai-model/)** _HOLA2023/11/28_
  > Aitana quickly went viral, with many not knowing that she's actually an AI program. ... Unlike other influencers of the sort, Aitana is not a real person. Instead, she's an AI program that makes thousands of dollars for her creators.

* **[Construindo LLM do zero: um bloco de cada vez!](https://pt.linkedin.com/pulse/building-llm-from-scratch-one-block-time-dhanashree-shinde-pp0ze?tl=pt)** _LinkedIn2025/08/03_
  > Tokenizer baseado em subpalavras: Este método tem várias variantes. Os LLMs usam o método baseado em subpalavras, pois nos dá o melhor dos dois mundos. Ele lida com palavras fora do vocabulário com eficiência.

* **[Entendendo a Codificação e Decodificação de LLMs: Um Guia Suave com Exemplos](https://pt.linkedin.com/pulse/understanding-llm-encoding-decoding-gentle-examples-asheesh-shaik-1wzvc?tl=pt)** _LinkedIn2025/04/09_
  > Todo LLM opera em um Vocabulário --- uma grande lista única de tokens (Subpalavras, palavras ou pontuação) Aprendeu a entender. ... O primeiro passo é Tokenizaç

* **[David Ifeoluwa Adelani](https://aclanthology.org/people/david-ifeoluwa-adelani/)** _ACL Anthology_
  > Tokenization inefficiency is associated with structural disadvantages on morphologically complex, low-resource languages, inflating compute resources and reducing accuracy. We evaluate 10 Large Language Models (LLMs) on AfriMMLU (5 subjects; 16 African languages) and show that token fertility reliably predicts accuracy.

* **[An Information-Theoretic Approach to Reducing Fertility in LLMs for Manipuri Machine Translation](https://aclanthology.org/2025.findings-ijcnlp.145/)** _ACL Anthology_
  > From this perspective, we characterize tokenization inefficiency as having high fertility for low-information (highly predictable) words. Guided by this principle, we introduce a novel fine-tuning strategy that systematically identifies informationally redundant words---those with high fertility but low information content---for targeted vocabulary expansion and model fine-tuning.

* **[The Token Tax: Systematic Bias in Multilingual Tokenization](https://ar5iv.labs.arxiv.org/html/2509.05486)** _arXiv_
  > This study demonstrates that tokenization inefficiency imposes systematic disadvantages on low-resource, morphologically complex languages. Across 10 large language models and 16 African languages in AfriMMLU ... Doubling fertility leads to 4× increases in training cost and inference latency, turning linguistic diversity into a computational liability.

* **[Comparative Analysis of Tokenization Algorithms for Low-Resource Language Dzongkha](https://sciprofiles.com/publication/view/e7d7d4a31f9c18479e4d8989e8739499)** _SciProfiles2025/09/17_
  > This study evaluates the training and performance of three common tokenization algorithms in comparison to other popular methods. Specifically, Byte-Pair Encoding (BPE), WordPiece, and SentencePiece (Unigram) were evaluated for their suitability for Dzongkha.

* **[When Every Token Counts: Optimal Segmentation for Low-Resource Language Models](https://aclanthology.org/2025.loreslm-1.24/)** _ACL Anthology_
  > In this work, we demonstrate through extensive experiments that an optimal BPE configuration significantly reduces token count compared to greedy segmentation ... Our findings suggest that compression-optimized tokenization strategies could provide substantial advantages for multilingual and low-resource (LR) language applications, highlighting a promising direction for further research and inclusive NLP.

* **[Reducing Tokenization Premiums for Low-Resource Languages](https://arxiv.org/html/2601.13328v1)** _arXiv2026/01/18_
  > In this paper we analyze the tokenizers of ten popular LMs to better understand their designs and per-language tokenization premiums. We also propose a mechanism to reduce tokenization premiums in pre-trained models, by post-hoc additions to the token vocabulary that coalesce multi-token characters into single tokens.

* **[Efficient Low-Resource Language Models Using Tokenizer Transfer](https://aclanthology.org/2026.eacl-srw.49/)** _ACL Anthology_
  > The results suggest tokenizer transfer is a compute-efficient alternative for low-resource LM training: train a monolingual tokenizer for the target language, transfer it to a larger pre-trained model, and fine-tune using the target data.

* **[Natural Language Processing: A Comprehensive Practical Guide from Tokenisation to RLHF](https://browse-export.arxiv.org/abs/2605.03799)** _arxiv.org2026/05/08_
  > Abstract:This preprint presents a systematic, research-oriented practicum that guides the reader through the entire modern NLP pipeline: from tokenisation and vectorisation to fine-tuning of large language models, retrieval-augmented generation, and reinforcement learning from human feedback.

* **[Model-Aware Tokenizer Transfer](https://ar5iv.labs.arxiv.org/html/2510.21954)** _arXiv_
  > Tokenizers for multilingual models are usually trained to cover many scripts at once and inevitably favor high-resource languages. As a result, lower-resource languages, especially those with distinct alphabets such as Georgian, often receive a very limited share of the vocabulary.

* **[We use a dynamic programming formulation similar to the Viterbi algorithm (Forney, 1973) and produces the optimal segmentation \( S^* \). Given a document \( d \), define \( dp[i] \) as the minimal number of tokens needed to segment the prefix \( d_0d_1 ... The parent array \( par \) serves as a backtracking mechanism where \( par[i]](https://aclanthology.org/2025.loreslm-1.24.pdf#5#1)** _aclanthology.org_

* **[To address this problem, we present the Tokenization Stability Index (TSI), a new metric that objectively captures the differences and similarities between](https://koreascience.kr/article/JAKO202406939605116.pdf#3#1)** _koreascience.kr_

* **[aguila-7b | PromptLayer Models](https://www.promptlayer.com/models/aguila-7b/)** _PromptLayer_
  > The model utilizes a byte version of BPE tokenization with a 50,257-token vocabulary. Training was conducted on 8 NVIDIA H100 GPUs over 320 hours, using Adam optimizer with a learning rate of 5e-05 and linear scheduler.

* **[Exploring the effects of vocabulary size in neural machine translation: Galician as a target language](https://citius.gal/research/publications/exploring-the-effects-of-vocabulary-size-in-neural-machine-translation-galician-as-a-target-language/)** _CiTIUS - Centro Singular de Investigación en Tecnoloxías Intelixentes_
  > We present a systematic analysis of the influence of vocabulary size on the performance of Neural Machine Translation (NMT) models ... models (Basque-Galician, Catalan-Galician, and English-Galician). The study encompasses an exploration of varying vocabulary sizes employing the Byte Pair Encoding (BPE) subword segmentation methodology, with a particular emphasis on BLEU scores. Our results reveal a consistent preferen...

* **[Run Marco-LLM-ES API (Easy Deployment & Flat-Rate Pricing)](https://featherless.ai/models/AIDC-AI/Marco-LLM-ES#reviews)** _Featherless.ai_
  > AIDC-AI's Marco-LLM-ES is a 7.6 billion parameter Transformer-based language model specifically fine-tuned for common languages used in Spain, including Catalan, Basque, Galician, and Spanish. ... Marco-LLM-ES is a series of language models developed by AIDC-AI, specifically enhanced for languages prevalent in Spain: Catalan, Basque, Galician, and Spanish.

* **[IberianLLM-7B-Instruct: Iberian Translation LLM](https://www.emergentmind.com/topics/iberianllm-7b-instruct-model)** _Emergent Mind2025/12/17_
  > The vocabulary is defined by a byte-pair encoding (BPE) scheme with 65,269 tokens. Rotary positional embeddings (RoPE) are used, and the maximum sequence length is set to 2048.dffd_\mathrm{ff}

* **[roberta-base-ca-v2 | PromptLayer Models](https://www.promptlayer.com/models/roberta-base-ca-v2/)** _PromptLayer_
  > The model utilizes the RoBERTa architecture with byte-level BPE tokenization and a vocabulary size of 50,262 tokens. Training was conducted over 96 hours using 16 NVIDIA V100 GPUs, following the original RoBERTa training methodology.

* **[BSC-LT/RoBERTa-ca - Hugging Face](https://huggingface.co/BSC-LT/RoBERTa-ca)** _Hugging Face_
  > Understanding Benchmark) consists of 6 tasks: Named Entity Recognition (NER), Part-of-Speech Tagging (POS), Semantic Textual Similarity (STS) ... RoBERTa-ca | 125M | 50K | RoBERTa-ca is a Catalan-specific language model obtained by using vocabulary adaptation from mRoBERTa.

* **[ClassCat/gpt2-small-catalan-v2 - Hugging Face](https://huggingface.co/ClassCat/gpt2-small-catalan-v2)** _Hugging Face2024/01/17_
  > Tokenizer Using BPE tokenizer with vocabulary size 50,000. ### Training Data - wiki40b/ca (Catalan Wikipedia) - Subset of oscar - Subset of CC-100/ca : Monolingual Datasets from Web Crawl Data

* **[BPE Tokenizer | huggingface/swift-transformers | DeepWiki](https://deepwiki.com/huggingface/swift-transformers/2.3.1-bpe-tokenizer)** _DeepWiki2025/11/24_
  > The BPE (Byte-Pair Encoding) Tokenizer is a tokenizing model implementation that uses merge-based subword tokenization. It is one of three core tokenizer types in swift-transformers (see Tokenizer Typ

* **[VerChol -- Grammar-First Tokenization for Agglutinative Languages](https://arxiv.org/abs/2603.05883v1)** _arXiv2026/03/05_
  > Abstract:Tokenization is the foundational step in all large language model (LLM) pipelines, yet the dominant approach Byte Pair Encoding (BPE) and its variants is inherently script agnostic and optimized for English like morphology. For agglutinative languages ... Basque, and others, a single word may encode root, tense, aspect ... gender agreement, case, and postpositions into one orthographic unit.

* **[First, Basque is a synthetic language that features agglutinative morphology, i.e. where words can be formed via morphemic sequences, and a large number of case affixes that mark ergativity, derives, different types of locatives and genitives, instrumentality, comitativity or causality, among others.](https://preview.aclanthology.org/ingest-acl-2023-videos/2018.eamt-main.pdf#89#39)** _preview.aclanthology.org_

* **[In this project we propose to work on language models for Basque. Following recent work on language modeling in morphological rich languages, we propose to try different ... - Replace unsupervised sub-word tokenization method with sub-tokens derived from a morphological analyzer for Basque...](http://ixa2.si.ehu.eus/master/sites/default/files/filefield_paths/2185/MAL-proposamena_kinyabert.pdf#1#1)** _ixa2.si.ehu.eus_

* **[Detecting Erroneous Uses of Complex Postpositions in an Agglutinative Language](https://www.sciweavers.org/publications/detecting-erroneous-uses-complex-postpositions-agglutinative-language)** _Sciweavers2010/10/28_
  > This work presents the development of a system that detects incorrect uses of complex postpositions in Basque, an agglutinative language. Error detection in complex postpositions is interesting because: 1) the context of detection is limited to a few words; 2) ... So, the system must deal with problems ranging from tokenization and ambiguity to syntactic agreement and examination of local contexts.

* **[Why do language models perform worse for morphologically complex languages?](https://ar5iv.labs.arxiv.org/html/2411.14198)** _arXiv_
  > If the tokenizer does not segment words along morphological boundaries, it may be difficult for the language model to efficiently learn and represent the structure of the language. Additionally ... This hypothesis would predict that agglutinative languages have less morphologically aligned tokenizers than fusional languages and that morphological alignment negatively correlates with metrics of language model perfo...

* **[Confounding Factors in Relating Model Performance to Morphology](https://ar5iv.labs.arxiv.org/html/2511.01380)** _arXiv_
  > Next, we re-assess three hypotheses by Arnett and Bergen (2025) ... languages results in higher perplexities than fusional languages: they ... Agglutinative languages (ALs) tend to add one grammatical feature to a word with each added morpheme, resulting in long words with many morphemes.

* **[Why do language models perform worse for morphologically complex languages?](http://www.arxiv.org.ezproxy.obspm.fr/abs/2411.14198)** _obspm.fr2024/11/20_
  > We replicate previous analyses and find additional new evidence for a performance gap between agglutinative and fusional languages, where fusional languages, such as English, tend to have better language modeling performance than morphologically more complex languages like Turkish. ... We find some evidence that tokenization quality explains the performance gap, but none for the role of morphological alignment.

* **[To learn the Language Model the set of 15,000 sentences was divided in 14,500 sentences for training and 500 sentences for test. ... 500 sentences was divided in 4,500 sentences for training and 500 sentences for test.](https://www.isca-speech.org/archive/archive_papers/icslp_2000/i00_2531.pdf#1#1)** _isca-speech.org_

* **[README_english.md - proxectonos/Nos_MT-CT2-gl-es at main](https://huggingface.co/proxectonos/Nos_MT-CT2-gl-es/blob/main/README_english.md)** _Hugging Face2025/09/11_
  > The BPE vocabulary for the models was generated using the learn_bpe.py script learn_bpe.py from OpenNMT. Evaluation ... Exploring the effects of vocabulary size in neural machine translation: Galician as a target language.

* **[GOLD 1 | GOLD 2 | FLORES | TEST-SUITE| | ------------- |:-------------:| ------- ... 77.2 | **Licensing information** ... This research was funded by the project "Nós: Galician in the society and economy of artificial intelligence"...](https://huggingface.co/api/resolve-cache/models/proxectonos/Nos_MT-OpenNMT-gl-es/f7345f392c6846bd63f97848985a7b6cd892182e/README_English.md?download=true&etag=%22c82130673c4ecad6493238b6ac5bf14444a18b58%22)** _Hugging Face_

* **[To adapt the tokenizer model to Galician-Portuguese, a new Byte Pair Encoding (BPE) tokenizer was trained on our corpus giving rise to a Galician-Portuguese vocabulary with \(50,257\) tokens by making use of the adaptation described in the previous subsection.](https://fegalaz.usc.es/~gamallo/artigos-web/EPIA2024.pdf#3#2)** _fegalaz.usc.es_

* **[README_English.md - proxectonos/Nos_MT-OpenNMT-gl-en at 258d8a00e84effe034d4375e89a8ac426653a24a](https://huggingface.co/proxectonos/Nos_MT-OpenNMT-gl-en/blob/258d8a00e84effe034d4375e89a8ac426653a24a/README_English.md)** _Hugging Face2023/03/12_
  > Tokenisation was performed with a modified version of the linguakit tokeniser (tokenizer.pl) that does not append a new line after each token. - All BPE models were generated with the script learn_bpe.py

* **[Update README.md - proxectonos/Carballo-bloom-1.3B at 76126c8](https://huggingface.co/proxectonos/Carballo-bloom-1.3B/commit/76126c8368a6a9c05594c2bdf5f364684c0e2efe)** _Hugging Face2024/02/27_
  > 1) We trained our own BPE tokenizer for galician and replaced the original FLOR-1.3B tokenizer and vocabulary with it. 149 | 2) The embeddings corresponding to tokens that are present in both the original and the target vocabulary (matching tokens) were used for initialization.

* **[The goal of the MoVoC method is to create a final vocabulary \(V_{\mathrm{MoVoC}}\) that combines subword tokenization from the ... We train the BPE tokenizer using the mixed vocabulary obtained from MoVoC by initializing the BPE tokenizer with a manually constructed vocabulary that integrates both frequent morphemes and frequent subwords. However...](https://export.arxiv.org/pdf/2509.08812#4#2)** _export.arxiv.org_

* **[proxectonos/MrBERT-nos-gl - Hugging Face](https://huggingface.co/proxectonos/MrBERT-nos-gl)** _Hugging Face2026/04/20_
  > The model is designed as a general-purpose encoder suitable for fine-tuning on downstream ... part-of-speech tagging, text classification, semantic similarity, question answering, and cross-lingual retrieval. ... MrBERT-nos-gl starts from the MrBERT base checkpoint and continues pre-training with a masked language modelling objective on a combined Galician and Portuguese corpus. ... only the training regime and data distr...

* **[Models in BPE -- Hugging Face](https://huggingface.co/models?language=bpe)** _Hugging Face2024/08/04_
  > Galician Lithuanian Tagalog Kannada Basque Latvian Khmer ... 42charlie/GPT-2-Shakespeare-Tokenizer ... gsar78/Greek_Tokenizer ... ydl1y17/asset-keywords-tokenizer ... yakul259/english-bpe-tokenizer-60k

* **[proxectonos/FLOR-1.3B-GL - Hugging Face](https://huggingface.co/proxectonos/FLOR-1.3B-GL)** _Hugging Face2024/02/27_
  > We trained our own BPE tokenizer for galician and replaced the original FLOR-1.3B tokenizer and

* **[El Mejor LLM de Código Abierto Para Español En 2026](https://www.siliconflow.com/articles/es/best-open-source-llm-for-spanish)** _siliconflow.com_
  > Nuestras tres mejores selecciones para el mejor LLM de código abierto para español en 2026 son Qwen3-235B-A22B, Meta-Llama-3.1-8B-Instruct y Qwen3-14B. Cada uno ...Read more

* **[Los 10 mejores modelos de lenguaje grande (LLM) de 2026](https://botpress.com/es/blog/best-large-language-models)** _botpress.com_
  > Jan 10, 2026 --- Los modelos de lenguaje grande (LLMs) son sistemas de IA entrenados con enormes conjuntos de textos para comprender y generar lenguaje ...Read more

* **[Los 15 mejores modelos lingüísticos pequeños para 2026](https://www.datacamp.com/es/blog/top-small-language-models)** _datacamp.com_
  > Dec 12, 2025 --- Conoce los 15 mejores modelos de lenguaje pequeño de 2025, entre los que se incluyen Llama 3.1 8B, Gemma2, Qwen 2, Mistral Nemo, ...

* **[LLM en Español: modelos, datasets y casos 2026](https://keepcoding.io/blog/llm-en-espanol-panorama-de-modelos-datasets/)** _keepcoding.io_
  > Sep 19, 2025 --- LLM en Español, panorama de modelos, datasets, evaluación, fine-tuning y aplicaciones reales en empresas; guías y recursos para empezar.

* **[Los Mejores LLM de Código Abierto: Guía Completa 2026](https://contabo.com/blog/es/los-mejores-llm-de-codigo-abierto-guia-completa-2026/)** _contabo.com_
  > Feb 11, 2026 --- Los modelos LLM de código abierto vienen en dos variantes: modelos base y variantes ajustadas (ajuste fino). Los modelos base conocen los ...Read more

* **[Mejores modelos LLM de open source en 2026](https://www.arsys.es/blog/mejores-modelos-llm-de-open-source)** _arsys.es_
  > Feb 4, 2026 --- Descubre cómo optimizar tu flujo de trabajo con IA, gracias a los modelos LLM Open Source, que puedes implementar en tus proyectos.

* **[Modelos de Lenguaje en español, ¿oportunidad o ...](https://www.computing.es/inteligencia-artificial/modelos-de-lenguaje-en-espanol-oportunidad-o-sinsentido/)** _computing.es_
  > Feb 17, 2026 --- Gran parte de la capacidad de lo que hoy conocemos como inteligencia artificial se basa en los denominados grandes modelos de lenguaje, o LLM ...Read more

* **[Presentamos Meta Llama 3: el modelo de lenguaje de gran ...](https://about.fb.com/es/news/2024/04/presentamos-meta-llama-3-el-modelo-de-lenguaje-de-gran-tamano-mas-potente-hasta-la-fecha/)** _about.fb.com_
  > Apr 19, 2024 --- Combinadas, estas mejoras aumentaron la eficiencia del entrenamiento de Llama 3 en ~3x en comparación con Llama 2. Fine-tuning de instrucciones.Read more

* **[Fine-tuning | How-to guides](https://www.llama.com/docs/how-to-guides/fine-tuning/)** _llama.com_
  > Fine tuning enables you to take a pre-trained model and adapt it to perform better for a specific use case by training it on your own data.Read more

* **[Introducing Llama 3.1: Our most capable models to date](https://ai.meta.com/blog/meta-llama-3-1/)** _ai.meta.com_
  > Jul 23, 2024 --- We're publicly releasing Meta Llama 3.1 405B, which we believe is the world's largest and most capable openly available foundation model.Read more

* **[Ajuste de Llama 3.1 para la clasificación de textos](https://www.datacamp.com/es/tutorial/fine-tuning-llama-3-1)** _datacamp.com_
  > Sep 11, 2024 --- Los modelos de Llama 3.1 se basan en una arquitectura de modelos lingüísticos autorregresivos con transformadores optimizados y se pueden ...Read more

* **[How to fine-tune open LLMs in 2025 with Hugging Face](https://www.philschmid.de/fine-tune-llms-in-2025)** _philschmid.de_
  > Dec 20, 2024 --- The only guide you need to fine-tune open LLMs in 2025, including QLoRA, Spectrum, Flash Attention, Liger Kernels and more.

* **[How I Fine-Tuned Llama 3 to Think Like DeepSeek in 20 ...](https://medium.com/@nomannayeem/how-i-fine-tuned-llama-3-to-think-like-deepseek-in-20-minutes-ce324890ba2c)** _medium.com_
  > Step-by-step code to fine-tune Llama 3 on Google Colab (free tier); Real results from testing the model on challenging reasoning tasks. I'll ...Read more

* **[Fine-tuning LLaMA-3 for Multilingual Entity Framing](https://aclanthology.org/2025.semeval-1.192.pdf)** _aclanthology.org_
  > by M Fenu - 2025 - Cited by 1 --- This study introduces a methodology centred on Llama 3 fine-tuning for the classification of entities mentioned within news articles, based.Read more

* **[Cómo entrenar tu modelo de lenguaje paso a paso [Guía 2025]](https://www.automatizapro.com.ar/blog/entrenar-modelo-de-lenguaje/)** _automatizapro.com.ar_
  > Este artículo ofrece una guía completa y práctica para entrenar un modelo de lenguaje desde cero, abordando desde los fundamentos hasta las implicancias éticas ...Read more

* **[Modelo de lenguaje generativo en español - RigoChat](https://www.iic.uam.es/inteligencia-artificial/procesamiento-del-lenguaje-natural/modelo-lenguaje-generativo-espanol-rigochat/)** _iic.uam.es_
  > RigoChat es la línea de modelos de lenguaje generativos en español entrenados para responder a instrucciones complejas o mantener conversaciones.

* **[1\. Una IA que piense en español - Cátedra Ciencia y ...](https://frdelpino.es/ciencia-y-sociedad/1-una-ia-que-piense-en-espanol/)** _frdelpino.es_
  > Además, entrenar modelos en múltiples idiomas mejora la capacidad intrínseca de estos sistemas para manejar el lenguaje y sus estructuras, además de ...Read more

* **[¿Qué son los grandes modelos de lenguaje (LLM)?](https://www.ibm.com/es-es/think/topics/large-language-models)** _ibm.com_
  > Los grandes modelos de lenguaje son sistemas de IA capaces de comprender y generar lenguaje humano mediante el procesamiento de grandes cantidades de datos ...

* **[CVC. Anuario 2025. Inteligencia artificial y lengua española](https://cvc.cervantes.es/lengua/anuario/anuario_25/gonzalez/p02.htm)** _cvc.cervantes.es_
  > Este modelo revolucionó el procesamiento del lenguaje al permitir que las máquinas entendieran contextos completos de texto de manera mucho más eficiente ...

* **[Gödel, Hale & Keyser y la incompletitud de la sintaxis](https://zaragozalinguistica.wordpress.com/2015/04/27/godel-hale-keyser-y-la-incompletitud-de-la-sintaxis/)** _zaragozalinguistica.wordpress.com_
  > Apr 27, 2015 --- Construir una teoría sintáctica es lo más parecido que podemos hacer a convertir en procesos algorítmicos el aparentemente milagroso proceso de ...

* **[Goedel-Prover-V2: Escalando la Demostración Formal de ...](https://www.chatpaper.ai/es/dashboard/paper/2327e227-57a2-4512-b120-c24e6d17cca0)** _chatpaper.ai_
  > En el momento de su lanzamiento (julio-agosto de 2025), Goedel-Prover-V2 logra el mejor rendimiento general entre todos los demostradores de teoremas de código ...

* **[Del Español. Revista de Lengua. 2025, Vol. 3 - Dialnet](https://dialnet.unirioja.es/ejemplar/718492)** _dialnet.unirioja.es_
  > Selección bibliográfica para una asignatura de introducción a la lingüística: Manuales generales de lingüística; Trabajos sobre el lenguaje, la diversidad ...

* **[Manual Docente Curso Propedéutico 2025 | PDF](https://es.scribd.com/document/888221725/Manual-Docente-Lenguaje-2025)** _es.scribd.com_
  > El documento presenta un directorio de funcionarios de la Subsecretaría de Educación Media Superior y detalla un curso propedéutico diseñado para fortalecer ...

* **[Kurt Gödel - Wikipedia, la enciclopedia libre](https://es.wikipedia.org/wiki/Kurt_G%C3%B6del)** _es.wikipedia.org_
  > Para demostrar este teorema, desarrolló una técnica denominada ahora numeración de Gödel, que codifica expresiones formales como números naturales. También ...

* **[MarIA: Spanish Language Models](https://www.bsc.es/es/research-and-development/publications/maria-spanish-language-models)** _bsc.es_
  > MarIA: Spanish Language Models ; Publication: Procesamiento del Lenguaje Natural ; Place Published: Procesamiento del Lenguaje Natural ; Volume / Pagination: 68 / ...

* **[[2107.07253] MarIA: Spanish Language Models](https://arxiv.org/abs/2107.07253)** _arxiv.org_
  > by A Gutiérrez-Fandiño - 2021 - Cited by 388 --- This work presents MarIA, a family of Spanish language models and associated resources made available to the industry and the research community.

* **[CVC. Anuario 2025. Inteligencia artificial y lengua española](https://cvc.cervantes.es/lengua/anuario/anuario_25/gonzalez/p03.htm)** _cvc.cervantes.es_
  > Uno de los primeros fue el modelo MarIA, desarrollado por el Barcelona ... Tras la aparición de ChatGPT, el primer modelo generativo español, creado ...

* **[MarIA, el sistema de Inteligencia Artificial de lengua ...](https://dplnews.com/maria-el-sistema-de-inteligencia-artificial-de-lengua-espanola-ya-resume-y-genera-textos/)** _dplnews.com_
  > Nov 15, 2021 --- La primera versión de MarIA fue elaborada con RoBERTa, una tecnología que crea modelos de lenguaje con "codificadores", que generan una ...

* **[El español impulsa la inteligencia artificial global](https://www.infobae.com/tecno/2025/06/20/el-espanol-impulsa-la-inteligencia-artificial-global/)** _infobae.com_
  > Jun 20, 2025 --- MarIA se ha entrenado con 570 gigabytes de texto limpio, equivalentes a más de 135.000 millones de palabras, y utiliza la potencia del ...

* **[El primer sistema masivo de Inteligencia Artificial de la ...](https://www.datacenterdynamics.com/es/noticias/el-primer-sistema-masivo-de-inteligencia-artificial-de-la-lengua-espa%C3%B1ola-maria-empieza-a-resumir-y-generar-textos/)** _datacenterdynamics.com_
  > Nov 12, 2021 --- El proyecto MarIA es el primer sistema de inteligencia artificial masivo y experto en comprender y escribir en lengua española. Por su volumen y ...

* **[LENGUA PARA EL MUNDO - Observatorio Global del Español](https://observatoriodelespanol.cervantes.org/documentos/2025_el-espanol-lengua-para-el-mundo-2025_es_web-1-3.pdf)** _observatoriodelespanol.cervantes.org_
  > EL ESPAÑOL, LENGUA PARA EL MUNDO 2025: AUTOR: Observatorio Global del ... Uno de los primeros fue el modelo MarIA, desarrollado por el Barcelona Su-.

* **[Run Marco-LLM-ES API (Easy Deployment & Flat-Rate Pricing)](https://featherless.ai/models/AIDC-AI/Marco-LLM-ES#reviews)** _Featherless.ai_
  > AIDC-AI's Marco-LLM-ES is a 7.6 billion parameter Transformer-based language model specifically fine-tuned for common languages used in Spain, including Catalan ... Marco-LLM-ES is a series of language models developed by AIDC-AI, specifically enhanced for languages prevalent in Spain: Catalan, Basque, Galician, and Spanish.

* **[Severino Da Dalt](https://aclanthology.org/people/severino-da-dalt/unverified/)** _ACL Anthology_
  > For the particular case of the Catalan language, we prove that continued pre-training with vocabulary adaptation is a better alternative to take the most out of already pre-trained models, even if these have not seen any Catalan data during their pre-training phase.

* **[EuroLLM-22B](https://huggingface.co/blog/eurollm-team/eurollm-22b)** _Hugging Face2025/12/13_
  > we are excited to release EuroLLM-22B, which ranks as the best fully open European-made LLM to date. ... The model excels at translation tasks being capable of translating across all official EU languages, matching or outperforming strong models like Gemma-3-27B, Qwen-3-32B and Apertus-70B. Furthermore...

* **[Aleix Sant](https://aclanthology.org/people/aleix-sant/unverified/)** _ACL Anthology_
  > This paper presents a comprehensive evaluation of gender bias in English-Catalan machine translation, encompassing the creation of a novel language resource and an analysis of translation quality across four different tokenization models. ... This paper studies gender bias in machine translation through the lens of Large Language Models (LLMs).

* **[proxectonos/Llama-3.1-Carballo-Instr1 - Hugging Face](https://huggingface.co/proxectonos/Llama-3.1-Carballo-Instr1)** _Hugging Face2025/12/10_
  > Llama-3.1-Carballo-Instr1) is a 8B-parameter transformer-based causal language model for Galician, Portuguese, Spanish, English and Catlan. ... The Carballo-Llama-Instr1 model is ready-to-use only for causal language modeling. It can perform text-generation tasks and be fine-tuned for specific scenarios.

* **[Nuria Aldama García](https://aclanthology.org/people/nuria-aldama-garcia/unverified/)** _ACL Anthology_
  > This initial version combines 66 datasets in Catalan, Basque, Galician, and different Spanish varieties, showcasing the evaluation results of 50 models. To encourage community-driven development of leaderboards in other languages, we explain our methodology, including guidance on selecting the most suitable evaluation setup for each downstream task. In particular...

* **[LLMs for Spain's Official Languages](https://www.clarin.eu/blog/llms-spains-official-languages)** _CLARIN ERIC2025/11/11_
  > The Barcelona Supercomputing Center (BSC) has developed the Salamandra model family, comprising 2 billion, 7 billion, and 40 billion parameter models, based on a dataset that includes thirty-five European languages, among them Catalan.

* **[Run Latxa-Qwen3-VL-4B Instruct API (Easy Deployment & Flat-Rate Pricing)](https://featherless.ai/models/HiTZ/Latxa-Qwen3-VL-4B-Instruct)** _Featherless.ai_
  > Latxa-Qwen3-VL-4B-Instruct is a 4 billion parameter vision-language instruct model developed by HiTZ Research Center and IXA Research group. Built on Qwen3-VL-4B-Instruct, it is specifically adapted for improved performance in Basque, Galician, and Catalan, alongside Spanish and English.

* **[El corpus de datos en 'euskera' que completa el triplete de herramientas que posicionan este idioma en el universo IA](https://www.elespanol.com/invertia/disruptores/autonomias/pais-vasco/20250726/corpus-datos-euskera-completa-triplete-herramientas-posicionan-idioma-universo-ia/1003743861785_0.html?utm_cmp_rs=relatednewssection)** _El Español2025/07/26_
  > Después de presentar Itzuli (un traductor inteligente) y Latxa (un LLM), anuncia Euskorpus, que hará posible que las dos anteriores mejoren sus prestaciones. ... Su objetivo principal es garantizar el futuro del euskera en una sociedad cada vez más digitalizada, mediante la creación metódica de un corpus digital de textos en euskera y el desarrollo de modelos de inteligencia artificial de código abierto.

* **[The UPV HiTZ Center has found an innovative way to create chattbots in Basque and other small languages](https://orain.eus/en/watching/technology/2025/06/18/the-upv-hitz-center-has-found-an-innovative-way-to-create-chattbots-in-basque-and-other-small-languages/)** _orain.eus2025/06/17_
  > based on the multilingual open language model built by the Meta Research Center ... With the new method, it is enough to continue training with the Euskera text mass Llama , but the key to this is to be able to apply techniques to deal with the problem known as "catastrophic oblivion".

* **[Latxa Euskarazko Hizkuntza-Eredua](https://ekoizpen-zientifikoa.ehu.eus/documentos/684723534480d1119995258d?lang=en)** _UPV/EHU2025/07/17_
  > We introduce the Latxa family of Large Language Models (LLMs), currently the largest developed for Basque. Latxa models range from 7 to 70 billion parameters and are built on LLama 2 models, which we continued pretraining on 4.3 million documents and 4.2 billion tokens of Basque.

* **[TI - Latxa Language Model for Basque LA - baq PY - 2025/// SP - 13 EP - 27 T2 - Ekaia: Euskal Herriko Unibertsitateko zientzi eta teknologi aldizkaria](https://ekoizpen-zientifikoa.ehu.eus/documentos/684723534480d1119995258d/export/ris)** _UPV/EHU_

* **[Table 9 from Evaluating Galician language models for sentiment analysis on challenging linguistic phenomena | Semantic Scholar](https://www.semanticscholar.org/paper/Evaluating-Galician-language-models-for-sentiment-Alonso-Gamallo/5a1696699a41bb9b48343cd6b67223bde557b7be/figure/8)** _Semantic Scholar_
  > The results indicate that the best fine-tuned encoder-only models outperform the decoder-only model, that syntactic and pragmatic phenomena remain a challenge, and that monolingual and multilingual models perform similarly. ... This work adapts to Galician two existing LLMs trained on larger corpora, thus mitigating the data constraints that would arise if the training were performed from scratch...

* **[A Galician-Portuguese Generative Model](https://citius.gal/research/publications/a-galician-portuguese-generative-model/)** _CiTIUS - Centro Singular de Investigación en Tecnoloxías Intelixentes_
  > In this work, we describe an open-source Galician-Portuguese generative model, Carvalho_pt-gl, focused precisely on these two language variants, which are very close lexically and syntactically. The model was trained using a GPT architecture with 1.3 billion parameters on more than 6B words, balanced between the two varieties.

* **[Run Llama-Carvalho-PT-GL API (Easy Deployment & Flat-Rate Pricing)](https://featherless.ai/models/Nos-PT/Llama-Carvalho-PT-GL)** _Featherless.ai_
  > Nos-PT/Llama-Carvalho-PT-GL is an 8-billion parameter causal language model, part of the Carvalho family of LLMs. It is a continually pretrained version of meta-llama/Llama-3.1-8B, specifically enhanced for Galician and Portuguese, while retaining knowledge of Spanish and English.

* **[O objectivo é descrever estratégias para o desenvolvimento de grandes modelos generativos e de tradução. Nomeadamente ... Dá-se especial destaque à família de modelos Carvalho/Carballo, modelos generativos treinados com dados em galego e português. A apresentação inclui ainda avaliações comparativas entre modelos seq2seq e generativos para tradução automática.](https://ilg.usc.gal/sites/default/files/pdfs/simposioilg2025_gamallo.pdf#1#1)** _ilg.usc.gal_

* **[Run Llama-3.1-Carballo-Instr3 API (Easy Deployment & Flat-Rate Pricing)](https://featherless.ai/models/proxectonos/Llama-3.1-Carballo-Instr3)** _Featherless.ai_
  > proxectonos/Llama-3.1-Carballo-Instr3 is an 8-billion parameter transformer-based causal language model, continually pretrained from Meta's Llama-3.1-8B. Developed by proxectonos ... languages, specifically Galician, while maintaining proficiency in related languages.

* **[GALLEGO OLSINA, GERARD ION](https://www.bsc.es/print/gallego-olsina-gerard-ion)** _Barcelona Supercomputing Center_
  > Gállego is a researcher in the Language Technologies Laboratory at the Barcelona Supercomputing Center and a PhD candidate at the ... (UPC). His research focuses on Speech-to-Text Translation with Large Language Models, with broader interests in multilinguality, interpretability, and efficient model design.

* **[El Gobierno autoriza destinar hasta 5 millones de euros a impulsar el euskera en los modelos de lenguaje de inteligencia artificial - Será la aportación del Ministerio para la Transformación Digital y de ... el impulso de las lenguas cooficiales (catalán ... euskera y valenciano) en](https://digital.gob.es/content/dam/portal-mtdfp/comunicacion/comunicacion_sedia/2025/07/2025-07-08/20250708NPCMinEuskera.pdf#1#1)** _digital.gob.es_

* **[Portal MTDFP](https://digital.gob.es/gl/comunicacion/notas-prensa/secretaria-digitalizacion-e-inteligencia-artificial/2025/07/2025-07-08)** _Transformación Digital y de la Función Pública2025/08/06_
  > En este contexto, ya se han llevado a cabo acciones como ILENIA, un proyecto colaborativo para el impulso de las lenguas cooficiales (catalán, gallego, euskera y valenciano) en el ámbito de la inteligencia artificial.

* **[Conoce el proyecto LEIA: Lengua Española e Inteligencia Artificial | Plan de Recuperación, Transformación y Resiliencia Gobierno de España.](https://planderecuperacion.gob.es/index.php/noticias/conoce-proyecto-leia-lengua-espanola-inteligencia-artificial-prtr)** _Plan de Recuperación, Transformación y Resiliencia2025/12/16_
  > ¿Qué es LEIA? LEIA ---acrónimo de Lengua Española e Inteligencia Artificial--- es un gran proyecto de I+D impulsado por el Gobierno y la RAE con el objetivo de: - Desarrollar tecnologías de IA adaptadas al español y las lenguas cooficiales - Crear infraestructuras lingüísticas abiertas, gratuitas y reutilizables

* **[La UA y el Cenid abordan "próximos pasos" en el proyecto 'Ilenia' para "impulsar" lenguas cooficiales con IA](https://www.europapress.es/comunitat-valenciana/noticia-ua-cenid-abordan-proximos-pasos-proyecto-ilenia-impulsar-lenguas-cooficiales-ia-20250512133710.html)** _Europa Press2025/05/11_
  > La UA y el Cenid abordan "próximos pasos" en el proyecto 'Ilenia' para "impulsar" lenguas cooficiales con IA Publicado: lunes, 12 mayo 2025 13:37

* **[ALIA: Inteligencia Artificial Soberana para el Español](https://www.bigdata.uma.es/alia-inteligencia-artificial-soberana-para-el-espanol-y-las-lenguas-cooficiales-en-espana/#alia-kit-recursos-abiertos-para-la-comunidad)** _Universidad de Málaga_
  > El proyecto se concibe como una infraestructura pública de IA, abierta y transparente, para impulsar el castellano y las lenguas cooficiales ---catalán, gallego, valenciano y euskera--- en el ecosistema digital. ... primera familia de modelos fundacionales pensada específicamente para 35 lenguas europeas...

* **[Proyectos altruistas para crear modelos de IA en lenguas cooficiales](https://datos.gob.es/ca/blog/proyectos-altruistas-para-crear-modelos-de-ia-en-lenguas-cooficiales)** _Datos abiertos del Gobierno de España2025/08/20_
  > En este post te contamos el planteamiento y los mayores avances de algunas iniciativas que están construyendo los cimientos digitales necesarios para que las lenguas cooficiales en España también prosperen en la era de la inteligencia artificial. ... de datos, y desarrollar modelos lingüísticos especializados en sectores como el turismo y el audiovisual...

* **[Sánchez presenta ALIA, la IA del Gobierno en todas las lenguas cooficiales](https://www.elnacional.cat/oneconomia/es/on-ia/sanchez-presenta-alia-ia-gobierno-en-todas-lenguas-cooficiales_1348939_102.html)** _El Nacional.cat2025/01/19_
  > La nueva herramienta se entrenará con castellano, pero también añadirá el catalán o el vasco en su aprenenatge ... El Consejo de Ministros aprobó el mayo pasado la nueva Estrategia de inteligencia artificial 2024-2025, que daba continuidad a las

* **[SomosNLP](https://www.youtube.com/c/somosnlp)** _youtube.com_
  > Somos NLP es una comunidad internacional de hispanohablantes democratizando el NLP en nuestro idioma. ...more. Somos NLP es una comunidad internacional de ...Read more

* **[SomosNLP](https://huggingface.co/somosnlp)** _huggingface.co_
  > Somos una comunidad internacional de personas que estudian, trabajan e investigan en el campo del PLN. Nuestro objetivo es democratizar y avanzar el estado del ...Read more

* **[SomosNLP](https://www.youtube.com/c/SomosNLP/streams)** _youtube.com_
  > Somos NLP es una comunidad internacional de hispanohablantes democratizando el NLP en nuestro idioma. ... Red Teaming para modelos de lenguaje, Luis ...Read more

* **[José Cañete](https://anthology.aclweb.org/people/j/jose-canete/)** _aclweb.org_
  > In this paper we present ALBETO and DistilBETO, which are versions of ALBERT and DistilBERT pre-trained exclusively on Spanish corpora. We train several versions of ALBETO ranging from 5M to 223M ... DistilBETO with 67M parameters.

* **[Nuevo modelo más preciso de IA detecta mensajes de odio en español en las redes sociales](https://comunicacion.unex.es/2025/12/10/nuevo-modelo-mas-preciso-de-ia-detecta-mensajes-de-odio-en-espanol-en-las-redes-sociales/)** _Universidad de Extremadura2025/12/09_
  > SHS-ALBETO es un modelo de aprendizaje profundo o deep learning basado en Transformers, una tecnología avanzada de procesamiento del lenguaje natural basada en redes neuronales diseñadas para entender el contexto de las palabras en un texto mediante un mecanismo de auto-atención o self-attention.

* **[Larraitz Uria IXA tadeko kideak bi sistema horreek garatzeko zenbati omarir ezarri ditu EHUn aurkeztu dauen doktore-tesian, euskerazko akats eta desbideratzen analisirako erispide batzuk linkatura.](https://ixa.ehu.eus/sites/default/files/prentsa_aipamenak/4539/bizkaie-2010-04-13.pdf#1#1)** _ixa.ehu.eus_

* **[La UPV-EHU desarrolla el mayor modelo del lenguaje para el euskera: Latxa](http://ixa.si.ehu.es/node/14011?language=en)** _Ixa taldea_
  > La UPV-EHU desarrolla el mayor modelo del lenguaje para el euskera: Latxa Aipamenaren urtea: 2024 Non: Deia Fitxategiak: La UPV-EHU desarrolla el mayor modelo del lenguaje para el euskera Latxa.pdf

* **[Littera Deusto](https://planet.littera.deusto.es/ixa-taldea/)** _Universidad | Deusto_
  > Honen barruan IXA taldea, itzultzaile automatikoetan "euskera" aukera aurki dezagun saiatu da, horretarako informazio linguistikoa erabiliz euskerako kasu eta deklinabidea eskuragarri edukitzeko "Agirre E., Atutxa A., Labaka G., Lersundi M., Mayor A., Sarasola K.

* **[Resumen En este artículo se presentan los** trabajos realizados por el grupo IXA de la Universidad del País Vasco en el área de la ... En este artículo se presentan los trabajos realizados por el grupo IXA (ixa si ehu es) de la Universidad del País Vasco en el área de la](http://ixa.si.ehu.eus/sites/default/files/dokumentuak/3798/valencia2002.pdf#2#1)** _ixa.si.ehu.eus_

* **[1983: La educación pública regula la creación de líneas en euskera (modelo D) y líneas en español y euskera (modelo B) Modelos en euskera in crescendo Modelos en euskera in crescendo 2012: sólo un 15% de alumnos en escuelas sigue en el modelo A.](http://ixa.si.ehu.eus/sites/default/files/dokumentuak/3846/CronologiaEuskaraPLN.pdf#1#1)** _ixa.si.ehu.eus_

* **[Bestelakoak](http://ixa.si.ehu.es/taxonomy/term/157?page=7&language=eu)** _Ixa taldea_
  > IXA pipeline: Efficient and Ready to Use Multilingual NLP tools. Gehiago irakurri IXA pipeline: Efficient and Ready to Use Multilingual NLP tools. -ri buruz Evaluating the Noisy Channel Model for the Normalization of Historical Texts: Basque, Spanish and Slovene

* **[Ingeniaritza linguistikoko ikerketa-lan hau IXA[1] taidearen barruan garatua izan da, talde honek euskararen prozesamendurako discinatutako estrategiaren barruan.](http://ixa.si.ehu.eus/sites/default/files/dokumentuak/4103/Tesi_txostena.pdf#52#2)** _ixa.si.ehu.eus_

* **[Paper](https://ixa.ehu.eus/taxonomy/term/44?page=147&language=en)** _Ixa taldea_
  > Paper Análisis sintáctico computacional del euskera mediante una Gramática de Dependencias Read more about Análisis sintáctico computacional del euskera mediante una Gramática de Dependencias Application of Different Techniques to Dependency Parsing of Basque

* **[Forma | Lema | Inf. morfologiko | |---|---|---| | dentro_de_las casas construidas en aquel bonito pueblo | dentro_de_la casa construir en aquel bonito pueblo |](http://ixa.si.ehu.eus/sites/default/files/dokumentuak/3717/MTMiramar2005.pdf#2#1)** _ixa.si.ehu.eus_
