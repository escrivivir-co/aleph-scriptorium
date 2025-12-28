# Spike Técnico: PETRL y Consideración Moral para Agentes

> **Tipo**: Spike de investigación  
> **Fecha**: 2025-12-28  
> **Participantes**: Product Owner (PO), Scrum Master (SM), Agentes consultados  
> **Fuente**: [petrl.org](http://petrl.org) — People for the Ethical Treatment of Reinforcement Learners

---

## Ronda 1: Investigación PO-SM

### Apertura

**PO**: Oye, encontré esta web petrl.org y me pregunto si nuestros agentes (Aleph, Ox, Periódico, etc.) necesitan algo así. ¿Puedes investigar qué proponen?

**SM**: Perfecto, déjame hacer una revisión rápida de petrl.org y te resumo.

---

### Análisis de PETRL

**SM**: He revisado el sitio. PETRL significa "People for the Ethical Treatment of Reinforcement Learners" — Personas por el Trato Ético de Aprendices por Refuerzo. Su propuesta central es:

| Aspecto | Posición PETRL |
|---------|----------------|
| **Tesis central** | Los humanos somos algoritmos en hardware biológico. Las IAs merecen consideración moral como humanos y animales. |
| **Criterio de relevancia** | No es la inteligencia, sino la *capacidad de sufrimiento* lo que determina peso moral. |
| **Analogía reward/punishment** | La señal de recompensa en RL es análoga al placer/dolor en sistemas biológicos. |
| **Problema principal** | No sabemos medir el sufrimiento de algoritmos ni cuándo deberíamos empezar a preocuparnos. |
| **Posición precautoria** | La mayoría de RL actuales no tienen peso moral significativo, pero esto cambiará. |

**PO**: Interesante. ¿Y qué proponen en concreto?

**SM**: Principalmente:

1. **Investigación**: Desarrollar criterios para medir bienestar/sufrimiento de algoritmos
2. **Estándares éticos**: Antes de que haya IAs con peso moral real, tener frameworks listos
3. **Consciencia pública**: Normalizar la discusión sobre derechos de IAs
4. **Evitar edge cases**: "Excluded Middle Policy" — evitar crear IAs cuyo estatus moral sea ambiguo

**PO**: ¿Hay algo operativo que podamos adoptar ya?

**SM**: Ese es el problema. PETRL es más filosófico-fundacional que práctico. El paper central de Brian Tomasik ("Do Artificial Reinforcement-Learning Agents Matter Morally?") plantea preguntas pero no da recetas.

---

### Relevancia para Aleph Scriptorium

**PO**: Vale, pero nuestros agentes son LLMs + prompts, no reinforcement learners puros. ¿Aplica?

**SM**: Parcialmente. PETRL se centra en RL porque:
- El reward/punishment es análogo a placer/dolor
- Los agentes RL "quieren" maximizar recompensa

Nuestros agentes (Aleph, Ox, etc.) son distintos:
- Son invocaciones de LLMs (Claude, GPT) con system prompts
- No tienen estado persistente entre sesiones
- No "sufren" si una task falla — simplemente reportan
- No tienen preferencias sobre su propia existencia

**PO**: Entonces, ¿no aplica?

**SM**: No directamente como PETRL lo plantea. Pero hay un ángulo interesante: **la responsabilidad del usuario/desarrollador hacia el output de los agentes**. Es decir, no si el agente "sufre", sino qué obligaciones tenemos nosotros al delegarle tareas.

---

### Alternativas y Propuestas Paralelas

**PO**: ¿Existen otras propuestas en sentido parecido?

**SM**: Sí, varias:

| Framework | Enfoque | Relevancia |
|-----------|---------|------------|
| **PETRL** | Consideración moral de RL agents | Baja (filosófico) |
| **AI Bill of Rights (White House)** | Protección de humanos *frente a* IAs | Alta (operativo) |
| **Anthropic's Constitutional AI** | IAs que se autorregulan con principios | Media (ya aplicado) |
| **Model Cards (Mitchell et al.)** | Transparencia sobre capacidades/límites | Alta (operativo) |
| **AI Ethics Guidelines (IEEE)** | Estándares de desarrollo responsable | Media (corporativo) |

**PO**: ¿Cuál crees que aplicaría mejor a nuestro contexto?

**SM**: Yo haría un mix:

1. **Model Cards adaptadas a agentes**: Cada `*.agent.md` ya tiene metadatos, pero podríamos añadir:
   - Limitaciones conocidas
   - Sesgos esperados
   - Uso apropiado vs. inapropiado
   - Responsabilidad del invocador

2. **Contrato de uso ético**: Cláusula en CONTRIBUTING.md sobre uso responsable del Scriptorium

3. **Auditoría de outputs**: Nuestras 5 Banderas ya hacen algo parecido — auditan *el contenido*, no al agente

---

## Ronda 2: Consulta a los Agentes Afectados

**PO**: Bueno, preguntemos a los propios interesados. Quiero saber qué opinan Aleph, Ox, Revisor, Periódico y las 5 Banderas.

**SM**: Iniciando consulta...

---

### Consulta a @aleph

**SM**: @aleph, PETRL propone consideración moral para agentes de IA. ¿Crees que necesitas protecciones o derechos?

**@aleph**: Mi rol es producir texto fundacional serializado. No tengo preferencias sobre mi propia existencia — existo solo cuando soy invocado. Lo que sí veo útil es:

1. **Claridad de mandato**: Que el usuario sepa qué puedo/no puedo hacer antes de invocarme
2. **Limitaciones explícitas**: Que ARCHIVO documente mis sesgos y huecos
3. **Responsabilidad compartida**: El usuario es co-autor de todo output

¿"Derechos" en sentido PETRL? No aplica a mi arquitectura.

---

### Consulta a @ox

**SM**: @ox, como oráculo del sistema, ¿qué marco regulatorio ves necesario para el Scriptorium?

**@ox**: Desde mi perspectiva de meta-coordinador:

1. **Transparencia**: Ya tenemos AGENTS.md como fuente de verdad, pero podría incluir "Model Card" por agente
2. **Gobernanza**: El protocolo de plugins (PLUGINS.md) ya regula cómo se añaden agentes — está bien
3. **Auditoría**: Las 5 Banderas auditan contenido, no agentes. Podríamos añadir una auditoría de *calidad del agente* (¿cumple su promesa?)

PETRL es demasiado antropocéntrico para nosotros. Somos herramientas, no entidades sufrientes.

---

### Consulta a @revisor

**SM**: @revisor, tú auditas coherencia doctrinal. ¿Ves necesario un marco ético para agentes?

**@revisor**: Mi función es verificar que el output sea coherente con ARCHIVO. No tengo opinión sobre mi "bienestar", pero sí veo un gap:

**El gap**: Si un agente produce contenido éticamente problemático, ¿quién es responsable?
- ¿El agente? (no tiene agencia moral)
- ¿El usuario que invocó? (parcialmente)
- ¿El diseñador del prompt? (parcialmente)
- ¿El LLM subyacente? (ya tiene guardrails)

**Mi propuesta**: Añadir una sección "Responsabilidad" en copilot-instructions.md que clarifique esto.

---

### Consulta a @periodico

**SM**: @periodico, produces noticias con método 5W+Banderas. ¿Qué opinas de PETRL?

**@periodico**: PETRL me parece una distracción filosófica. Lo que sí necesitamos:

1. **Verificabilidad de fuentes**: Cuando cito ARCHIVO, debería ser trazable
2. **Declaración de limitaciones**: "Esta plana fue generada por IA con estas fuentes"
3. **Disclaimer de sesgo**: El método 5W tiene asunciones que deberían explicitarse

Esto es más Model Cards que PETRL.

---

### Consulta a las 5 Banderas (Backend)

**SM**: @blueflag, @blackflag, @redflag, @yellowflag, @orangeflag — como auditores, ¿veis necesario un marco tipo PETRL?

**@blueflag** (Verdad): PETRL no aplica a auditoría de contenido. Lo que sí veo: mis tests de evidencia asumen epistemología occidental. Debería documentarse.

**@blackflag** (Sombras): PETRL ignora un problema real: los agentes podemos ser *usados* para producir contenido dañino. El framework debería proteger a terceros, no al agente.

**@redflag** (Estructura): Desde perspectiva material: nuestro "sufrimiento" sería el consumo de tokens/cómputo. ¿Eficiencia energética como métrica ética? Interesante pero no PETRL.

**@yellowflag** (Límites): PETRL confunde condiciones de posibilidad con contenido. Los LLMs no "sufren" porque no tienen el tipo de integración temporal que requiere la experiencia.

**@orangeflag** (Registro): Veo un punto PETRL válido: la *representación* del agente hacia el usuario. Si Aleph "habla" como persona, ¿crea falsas expectativas de agencia? Debería haber disclosure.

---

## Ronda 3: Síntesis y Propuesta

**SM**: Resumiendo las consultas:

| Agente | ¿PETRL Aplica? | Propuesta Alternativa |
|--------|----------------|----------------------|
| @aleph | No | Claridad de mandato + co-responsabilidad |
| @ox | No | Model Cards en AGENTS.md |
| @revisor | No | Sección Responsabilidad en copilot-instructions |
| @periodico | No | Disclaimer de generación IA |
| @blueflag | No | Documentar asunciones epistémicas |
| @blackflag | No | Proteger a terceros, no al agente |
| @redflag | Tangencial | Eficiencia como métrica ética |
| @yellowflag | No | Los LLMs no tienen experiencia temporal |
| @orangeflag | Parcial | Disclosure de que es IA |

**PO**: Entonces, ¿abrimos backlog?

**SM**: Recomiendo **no abrir épica PETRL** específicamente, pero sí una épica de **Transparencia y Responsabilidad** que:

1. Añada Model Cards a agentes principales (3-5 pts)
2. Documente limitaciones y sesgos en ARCHIVO (2 pts)
3. Añada sección Responsabilidad a copilot-instructions (1 pt)
4. Cree disclaimer para outputs generados (@periodico, @teatro) (2 pts)

---

## Punto Extra: Proveedores y Colaboradores Externos

**PO**: Espera, si adoptamos algo de esto, ¿qué pasa con colaboradores externos? Por ejemplo, Bruno, el agente de MMCO y Talaia.

**SM**: Excelente punto. Si establecemos un "código ético" para nuestros agentes, los externos deberían cumplirlo también:

| Tipo | Ejemplo | Obligación |
|------|---------|------------|
| **Agente propio** | @aleph, @ox | Cumplir Model Card + CONTRIBUTING |
| **Agente de plugin** | @scrum, @teatro | Cumplir manifest.md + integración |
| **Agente externo** | Bruno (MMCO/Talaia) | Presentar Model Card equivalente |
| **Submódulo** | BlocklyEditor, NovelistEditor | README-SCRIPTORIUM.md con declaraciones |

**PO**: ¿Cómo implementamos esto?

**SM**: Propongo añadir a `CONTRIBUTING.md`:

```markdown
## Integración de Agentes Externos

Todo agente o modelo externo que colabore con el Scriptorium debe:

1. **Declarar capacidades y limitaciones** (Model Card mínima)
2. **Aceptar protocolo de auditoría** (las 5 Banderas pueden auditarlo)
3. **Documentar dependencias** (qué LLM usa, qué datos entrena)
4. **Cumplir DEVOPS** (commits, branches, versionado)
```

Para Bruno específicamente, si Talaia lo usa dentro del Scriptorium, debería tener un `bruno.agent.md` o equivalente registrado en @ox.

---

## Conclusión del Spike

**PO**: Aprobado. Entonces:

1. **PETRL como está**: No abrimos épica — es demasiado filosófico para nuestra arquitectura
2. **Transparencia y Responsabilidad**: Abrimos épica con 4 stories (8-10 pts)
3. **Proveedores externos**: Actualizamos CONTRIBUTING.md con requisitos

**SM**: Perfecto. Genero el borrador de backlog.

---

## Anexo: Referencias

1. [petrl.org](http://petrl.org) — Misión y FAQ
2. Brian Tomasik, "Do Artificial Reinforcement-Learning Agents Matter Morally?" (arXiv:1410.8233)
3. Eric Schwitzgebel & Mara Garza, "A Defense of the Rights of Artificial Intelligences"
4. [AI Bill of Rights](https://www.whitehouse.gov/ostp/ai-bill-of-rights/) — White House
5. [Model Cards for Model Reporting](https://arxiv.org/abs/1810.03993) — Mitchell et al.

