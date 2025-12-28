# Síntesis: Guía O.R.G.A.N.I.Z.E para MMCO Editor

> **Fuente**: `ontological_reasoning_guide.md` (14.6 KB)  
> **Síntesis para**: Sesión editorial SCRIPT-1.23.0  
> **Fecha**: 2025-12-28

---

## El Acrónimo O.R.G.A.N.I.Z.E

| Letra | Fase | Aplicación en MMCO Editor |
|-------|------|---------------------------|
| **O** | Ontological Query Assessment | Clasificar complejidad de cada story/task |
| **R** | Reference Framework Components | Consultar metamodel.md, MMCO docs, FAIR |
| **G** | Generate Structured Pathways | Elegir CoT/ToT/Graph según complejidad |
| **A** | Analyze Using Selected Technique | Aplicar pattern a la story |
| **N** | Navigate Documentation Efficiently | Consulta secuencial o paralela |
| **I** | Integrate Multiple Components | Combinar Metamodel + MMCO + Flove |
| **Z** | Validate Application Quality | Verificar contra templates formales |
| **E** | Enhance Through Ontological Grounding | Producir XML/JSON validables |

---

## Técnicas de Razonamiento Disponibles

### 1. Chain-of-Thought (CoT)
**Cuándo usar**: Categorización lineal, clasificación simple
**Mejora**: +17.9% en tareas de razonamiento complejo
**Aplicación**: Mapeo LAYER_0→LAYER_4, clasificación de agentes

```
Step 1 → Step 2 → Step 3 → ... → Conclusión
```

### 2. Tree of Thoughts (ToT)
**Cuándo usar**: Análisis multi-dimensional, exploración de alternativas
**Mejora**: 74% éxito vs enfoques tradicionales
**Aplicación**: Niveles de emergencia 0a/0b/0c, Φ alternativas

```
       ┌─ Path A → Eval A
Query ─┼─ Path B → Eval B → Select Best → Proceed
       └─ Path C → Eval C
```

### 3. Graph of Thought
**Cuándo usar**: Redes de relaciones, sistemas interconectados
**Mejora**: +60% insight en sistemas complejos
**Aplicación**: Handoffs, meta-dinámicas Sprint→Commit→Release

```
     ┌──────┐
     │ Node │←──┐
     └──┬───┘   │
        │       │
   ┌────▼────┐  │
   │ Node    │──┘
   └─────────┘
```

### 4. Self-Consistency
**Cuándo usar**: Decisiones críticas, validación de propuestas
**Mejora**: +30% accuracy en clasificaciones importantes
**Aplicación**: Composición de Φ_editor, validación cruzada

```
Perspective A ─┐
Perspective B ─┼─→ Consensus
Perspective C ─┘
```

---

## Matriz de Selección para SCRIPT-1.23.0

| Story | Complejidad | Profundidad | Técnica | Justificación |
|-------|-------------|-------------|---------|---------------|
| S01: Jerarquía | Multi-dimensional | Deep | **ToT** | 7 niveles con relaciones no lineales |
| S02: Métrica Φ | Validación crítica | Comprehensive | **Self-Consistency** | Composición requiere multi-perspectiva |
| S03: Meta-Dinámica | Redes relacionales | Deep | **Graph** | Sprint→Commit→Release es grafo |

---

## Aplicación a las 5 Banderas

Cada bandera opera con una técnica diferente **y en un nivel MMCO distinto**:

| Bandera | Nivel MMCO | Operador Φ | Técnica O.R.G.A.N.I.Z.E | Espacio de Razonamiento |
|---------|------------|------------|------------------------|-------------------------|
| 🔵 Blueflag | 0b (Correlaciones) | Φ_verdad | **CoT Sequential** | Verificación paso a paso de evidencia |
| ⚫ Blackflag | 0a (Tensores) | Φ_poder | **Graph of Thought** | Mapeo de redes de poder e influencia |
| 🔴 Redflag | 1 (Proto-geometría) | Φ_material | **CoT + Validation** | Cálculo material secuencial verificable |
| 🟡 Yellowflag | 2 (Pseudo-tiempo) | Φ_límites | **ToT Multi-Path** | Exploración de límites y condiciones |
| 🟠 Orangeflag | 3 (Espacio-tiempo) | Φ_registro | **Self-Consistency** | Validación de registro desde múltiples audiencias |

**Propiedad de Inconmensurabilidad** (Feedback Talaia/Flove/LOW):
- Los niveles MMCO representan **etapas de emergencia** distintas
- Φ_verdad (epistemología) ≠ Φ_poder (política) ≠ Φ_material (economía)
- La suma lineal `Σ(w·Φ)` pierde información de estructura ontológica

---

## Implicación para Φ_editor

### Fórmula Original (Lineal) — ❌ DESCARTADA
```
Φ_editor = w₁·Φ_blue + w₂·Φ_black + w₃·Φ_red + w₄·Φ_yellow + w₅·Φ_orange
```

**Por qué se descarta**: Asume que las banderas operan en el mismo espacio y son sumables. El mapeo MMCO muestra que operan en niveles de emergencia ortogonales.

### Propuesta Refactorizada (Grafo de Operadores) — ✅ ADOPTADA
```
                    ┌─────────────┐
                    │   Φ_editor  │ ← Vector multidimensional
                    └──────┬──────┘
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
    ┌────▼────┐      ┌─────▼─────┐     ┌─────▼─────┐
    │ Φ_verdad│      │ Φ_poder   │     │Φ_material │
    │  (CoT)  │      │  (Graph)  │     │(CoT+Val)  │
    │ L:0b    │      │  L:0a     │     │ L:1       │
    └────┬────┘      └─────┬─────┘     └─────┬─────┘
         │                 │                 │
         └─────────────────┼─────────────────┘
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
    ┌────▼────┐      ┌─────▼─────┐
    │Φ_límites│      │ Φ_registro│
    │  (ToT)  │      │(SelfCons) │
    │ L:2     │      │ L:3       │
    └─────────┘      └───────────┘
```

**Diferencia clave**: 
- Cada Φ_bandera se calcula con su técnica óptima en su nivel MMCO
- Las aristas representan **relaciones de emergencia**, no sumas
- El output es un **vector** (5 dimensiones), no un escalar

---

## Validación Z (Checklist)

Para cada story/task, verificar:

- [ ] ¿Se identificó la técnica de razonamiento correcta?
- [ ] ¿Se consultó el framework correspondiente (Metamodel/MMCO)?
- [ ] ¿El análisis sigue el pattern estructurado?
- [ ] ¿Se validó contra templates formales?
- [ ] ¿El output es XML/JSON parseable?

---

## Anti-Patterns a Evitar

| ❌ Anti-Pattern | ✅ Corrección |
|-----------------|---------------|
| Usar misma técnica para todas las banderas | Seleccionar técnica por tipo de bandera |
| Φ como suma lineal simple | Φ como composición de grafos |
| Ignorar complejidad de query | Clasificar antes de analizar |
| Framework genérico | Consulta específica según story |

---

## Integración en Definition of Done

Para cada story de SCRIPT-1.23.0, añadir:

```markdown
### O.R.G.A.N.I.Z.E Checklist
- [ ] **O**: Complejidad clasificada como [Simple/Multi/System/Critical]
- [ ] **R**: Frameworks consultados: [lista]
- [ ] **G**: Técnica seleccionada: [CoT/ToT/Graph/SelfCons]
- [ ] **A**: Análisis ejecutado siguiendo pattern
- [ ] **N**: Documentación navegada: [rutas]
- [ ] **I**: Componentes integrados: [lista]
- [ ] **Z**: Validación pasando
- [ ] **E**: Output ontológicamente fundamentado
```

---

## Paso Adicional: P.R.O.M.P.T (PromptCraft)

> **Fuente**: `PromptCraft.md` (Talaia Digital)  
> **Propósito**: Generar system prompts para agentes modelados con MMCO

### Cuándo usar PromptCraft

Después de completar O.R.G.A.N.I.Z.E (el **qué** del agente), usar P.R.O.M.P.T para generar el **cómo** (system messages ejecutables).

```
┌─────────────────────────────────────────────────────────────────────┐
│                    Pipeline MMCO → Agente                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  MMCO Modeling      O.R.G.A.N.I.Z.E        P.R.O.M.P.T              │
│  (Ontología)   →   (Razonamiento)    →   (System Prompt)           │
│                                                                     │
│  ┌──────────┐      ┌──────────────┐      ┌─────────────────┐       │
│  │ Φ_editor │  →   │ Técnica CoT/ │  →   │ Behavioral Gap  │       │
│  │ Niveles  │      │ ToT/Graph    │      │ Analysis        │       │
│  │ 0c→4     │      │ validada     │      │ + QA Checklist  │       │
│  └──────────┘      └──────────────┘      └─────────────────┘       │
│                                                                     │
│  Output: XML       Output: Análisis      Output: .agent.md         │
└─────────────────────────────────────────────────────────────────────┘
```

### El Acrónimo P.R.O.M.P.T

| Letra | Fase | Conexión con O.R.G.A.N.I.Z.E |
|-------|------|------------------------------|
| **P** | Perceive (Behavioral Gap) | Usa output de **O** (Query Assessment) |
| **R** | Relate (Context) | Complementa **R** (Reference Framework) |
| **O** | Organize (Framework Selection) | Aplica decisión de **G** (Pathways) |
| **M** | Model (Implementation) | Usa técnica de **A** (Analyze) |
| **P** | Personalize (Audience) | Considera dominio de **I** (Integrate) |
| **T** | Transfer (QA Delivery) | Valida junto con **Z** (Validate) |

### Validación Anti-Enshittification

PromptCraft incluye validación obligatoria:

```markdown
## ANTI-ENSHITTIFICATION CHECKLIST

**Antes de generar system prompt verificar:**
- [✓] Resolviendo problema real vs síntoma visible
- [✓] Solución aplicable en entorno operacional descrito
- [✓] Limitaciones de conocimiento declaradas
- [✓] Fronteras de expertise de dominio respetadas
- [✓] Escalación a experto activada cuando apropiado
- [✓] Éxito medible por mejora real
```

### Mapeo Banderas → Técnica → System Prompt

| Bandera | Técnica O.R.G.A.N.I.Z.E | Componente P.R.O.M.P.T |
|---------|------------------------|------------------------|
| 🔵 Blueflag | CoT Sequential | `Perceive` (evidence chain) |
| ⚫ Blackflag | Graph of Thought | `Relate` (power network) |
| 🔴 Redflag | CoT + Validation | `Model` (material calculation) |
| 🟡 Yellowflag | ToT Multi-Path | `Organize` (boundary exploration) |
| 🟠 Orangeflag | Self-Consistency | `Personalize` (multi-audience) |

### Integración en Definition of Done (Extendida)

```markdown
### O.R.G.A.N.I.Z.E + P.R.O.M.P.T Checklist

**O.R.G.A.N.I.Z.E (Modelado)**
- [ ] Complejidad clasificada
- [ ] Frameworks consultados
- [ ] Técnica seleccionada y aplicada
- [ ] Output ontológicamente fundamentado

**P.R.O.M.P.T (Generación)**
- [ ] Behavioral gap cuantificado
- [ ] Framework de agente seleccionado (Conversational/Multi-Format/Hybrid)
- [ ] Anti-enshittification validado
- [ ] System prompt generado en `.agent.md`
- [ ] Success metrics definidas (≥85% gap resolution)
```

### Referencias

- **PromptCraft.md**: `ARCHIVO/DISCO/Diciembre_25_MMCO_Editor/PromptCraft.md`
- **OnthologyEditor**: Documentación MMCO y Metamodel
- **Talaia Digital**: Framework original de prompt engineering
