# Walkthrough: Anatomía de Tokenizadores (Prompt B)

Se ha completado la investigación y extracción de datos desde los *papers* académicos y la redacción del informe técnico final.

## Acciones Realizadas

1. **Investigación de Fuentes Académicas**:
   - Se han escaneado e indexado tres artículos técnicos recientes utilizando la pasarela `ar5iv` para procesar el HTML original:
     - *Why do language models perform worse for morphologically complex languages?* (arXiv:2411.14198)
     - *VerChol -- Grammar-First Tokenization for Agglutinative Languages* (arXiv:2603.05883)
     - *MoVoC: Morphology-Aware Subword Construction for Geez Script Languages* (arXiv:2509.08812)
   - Se comprobó la configuración (vocab size) de modelos regionales en sus repositorios y *papers* (RoBERTa-ca, Carvalho_pt-gl, Latxa).

2. **Creación del Informe Estratégico**:
   - Se ha redactado el documento `informe_anatomia_tokenizadores.md` dentro de la carpeta `referencias/` para dar respuesta directa al **Prompt B**.
   - El informe desglosa cómo los modelos (como *Latxa* o *Aguila*) extienden un vocabulario BPE (en el rango de 32k - 50k tokens).
   - Se diagnosticó el grave problema de la *fertilidad alta* de subpalabras que sufren las lenguas aglutinantes.
   - Se establecieron 4 reglas de oro como directiva para programar nuestro tokenizador minoritario (usando BPE asistido por gramática / byte-fallback / extensión en lugar de entrenamiento desde cero).

## Resultados y Validación
Todo el conocimiento del estado del arte, los flujos (QKV, matrices de embedding) y las prácticas empíricas del ecosistema español (Prompt A y B) están ahora en la base documental del proyecto.

> [!TIP]
> Hemos cerrado la fase teórica. La estrategia final está definida: aplicaremos una inicialización gramatical y usaremos extensión de un BPE preexistente para evitar sobrecargar los gradientes. Ya estamos listos para empezar a escribir el código de nuestro propio tokenizador.
