# Planificación Plugin FloveEditor: Conversación PO-SM

> **Fecha**: 2025-01-02  
> **Participantes**: Product Owner (PO), Scrum Master (SM)  
> **Contexto**: Exploración de ontología Flove.org y diseño de plugin

---

## Apertura

**SM**: Buenas. Tras una sesión de scraping e investigación, he recopilado información sustancial sobre el ecosistema **Flove**. Te presento los hallazgos:

### Fuentes exploradas

| Fuente | URL | Estado |
|--------|-----|--------|
| lowai.org | Redirige a demos.flove.org | ✅ Explorado |
| flove.org | Sitio principal | ✅ Explorado |
| demos.flove.org/whole | Tabla de ontología completa | ✅ Capturado |
| Codeberg FloveDocs/Main | Repositorio de documentación | ✅ Explorado |

### Hallazgos clave

**Filosofía central**: Flove = "Love" → Abordaje lovecéntrico/biocéntrico de todos los campos del conocimiento.

**Paradigma base**: **Confluentism** — "Simplexity InEvolution"
- Frase resumen: *"Un bipolo que se fractaliza involuto en todo"*
- Eje metafórico: "El Amor como fuente primordial"

**Jerarquía ontológica** (de más abstracto a más concreto):

```
Metaphysics → Teleology → Theology → MathyLogic → Physics → Chemistry → Biology → Psychology → Sociology → Economy
```

**PO**: Interesante. ¿Qué estructura tiene esa ontología que podamos usar para crear lógica?

---

## Análisis de la Ontología

**SM**: La tabla de taxonomía capturada en `demos.flove.org/whole` revela una estructura de **4 capas × 10 campos**:

### Capa 1: Substance (Sustancia)

| Columna | Significado | Ejemplo |
|---------|-------------|---------|
| **X** | Variable/elemento base | "Bipole" |
| **WHY** | Razón/propósito | Teleológico |
| **WHAT** | Naturaleza/qué es | Teológico |
| **HOW** | Método/cómo funciona | Lógico-matemático |

### Capa 2: Fields (Campos)

10 campos desde Metafísica hasta Economía:
1. Metaphysics
2. Teleology
3. Theology
4. MathyLogic
5. Physics
6. Chemistry
7. Biology
8. Psychology
9. Sociology
10. Economy

### Capa 3: Paradigms (Paradigmas)

| Paradigma | Campo | Concepto clave |
|-----------|-------|----------------|
| **Confluentism** | Metafísica | Simplexity InEvolution |
| **Compatibilism** | Teleología | Propósito compatible |
| **PanBitheism** | Teología | Dios distribuido |
| **Intuitionism** | MathyLogic | Lógica intuitiva |
| **PsicoSquare** | Psicología | Cuadrante psicológico |
| **SocioSquare** | Sociología | Cuadrante social |

### Capa 4: Apps (Aplicaciones)

| App | Función | Lógica |
|-----|---------|--------|
| **SOULS** | Gestión de "almas" | Identidad/esencia |
| **KEYS** | Claves/acceso | Relaciones |
| **Sensy** | Sensibilidad | Percepción |
| **DieSafe** | Seguridad vital | Preservación |
| **PUZZY** | Puzzles/resolución | Combinatoria |
| **Wills** | Voluntades | Intención |
| **Goddess** | Lo divino femenino | Integración |

### Demos disponibles (Codeberg)

- `Demos25.10.zip` (última versión, Oct 2025)
- `FloveSlides25.12.pdf` (Presentaciones actualizadas Dic 2025)
- `FloveTables25.12.pdf` (Tablas de taxonomía actualizadas)

**PO**: Perfecto. Veo un sistema rico para crear lógica simbólica. ¿Cómo lo conectamos con AGENT_CREATOR?

---

## Definición del Objetivo

**SM**: Propongo crear el plugin **FloveEditor** con estas características:

### Objetivo SMART

> **Crear un editor de lógica basado en la ontología Flove que permita:**
> - Definir reglas usando los paradigmas (Confluentism, PsicoSquare, etc.)
> - Generar código/JSON exportable para agentes
> - Integrarse con AGENT_CREATOR como fuente de "alma lógica"

### Modelo de trabajo

| Concepto Flove | Traducción en Scriptorium |
|----------------|---------------------------|
| Paradigm | Base de razonamiento del agente |
| App | Capacidad/habilidad específica |
| Field | Dominio de conocimiento |
| Substance (WHY/WHAT/HOW) | Estructura de regla lógica |

**PO**: Me gusta. Pero necesito entender el "WHY" del proyecto: ¿qué problema resuelve que no resuelvan los paradigmas de as-gym (Prolog, SBC, etc.)?

---

## Justificación: Flove vs. Paradigmas Existentes

**SM**: Excelente pregunta. Comparación:

### as-gym (paradigmas FIA existentes)

| Paradigma | Enfoque | Limitación |
|-----------|---------|------------|
| Lógica (Prolog) | Formal, binario | Frialdad, sin emociones |
| Conexionista | Patrones estadísticos | Caja negra |
| SBC/SBR | Casos/reglas explícitas | Rigidez |
| Híbrido | Combinación | Complejidad de integración |

### Flove (propuesta)

| Aspecto | Aporte diferencial |
|---------|-------------------|
| **Bipolaridad** | Todo tiene polo opuesto integrado |
| **Fractalidad** | Las reglas se repiten a escalas |
| **Involución** | El todo está en la parte |
| **Campos** | Ontología exhaustiva (10 dominios) |
| **Amor como eje** | Decisiones orientadas a vida/bienestar |

### Casos de uso únicos

1. **Agentes con "brújula moral"**: Decisiones que consideren "bienestar" no solo "eficiencia"
2. **Razonamiento holístico**: Conectar física con psicología, economía con biología
3. **Lógica difusa nativa**: Los paradigmas Flove son inherentemente graduales
4. **Personajes con "alma"**: Para Teatro ARG, personajes con cosmovisión coherente

**PO**: Entendido. Es complementario a as-gym, no sustitutivo. Apruebo el enfoque. ¿Qué épicas propones?

---

## Identificación de Épicas

**SM**: Propongo 3 épicas para un primer Feature Cycle:

### Épica 1: Fuente de Datos FloveOnto (SCRIPT-1.20.0)

| Aspecto | Detalle |
|---------|---------|
| **Objetivo** | Capturar y estructurar la ontología Flove como JSON Schema |
| **Entregables** | `flove-ontology.schema.json`, documentación de campos |
| **Effort estimado** | 8 pts |
| **Prioridad** | P0 (bloquea todo lo demás) |

### Épica 2: Plugin FloveEditor (SCRIPT-1.21.0)

| Aspecto | Detalle |
|---------|---------|
| **Objetivo** | Crear plugin con agente, prompts e instrucciones |
| **Entregables** | Estructura de plugin completa |
| **Effort estimado** | 13 pts |
| **Prioridad** | P1 |

### Épica 3: Integración con AGENT_CREATOR (SCRIPT-1.22.0)

| Aspecto | Detalle |
|---------|---------|
| **Objetivo** | Campo `floveParadigm` en recipes, validación, generación |
| **Entregables** | Flujo completo de creación de agente con lógica Flove |
| **Effort estimado** | 8 pts |
| **Prioridad** | P1 |

**Effort total Feature Cycle 1**: 29 pts

**PO**: Me parece bien. ¿Qué riesgos ves?

---

## Riesgos y Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Ontología Flove incompleta en fuentes | Media | Alto | Usar FloveTables25.12.pdf como fuente de verdad |
| Conflicto semántico con as-gym | Baja | Medio | Prefijo `flove_` en todos los IDs |
| Complejidad de 10 campos excesiva | Media | Medio | Empezar con 3 campos (Psico, Socio, MathyLogic) |
| Demos.flove.org inestable | Alta | Bajo | Copiar contenido a ARCHIVO/PLUGINS/FLOVE_EDITOR/ |

**PO**: Acepto. ¿Y las métricas de éxito?

---

## Métricas de Éxito

| Métrica | Target | Mínimo aceptable |
|---------|--------|------------------|
| Schema JSON válido | 10 campos definidos | 3 campos mínimo |
| Plugin instalado y funcional | Bridge + Agent | Solo estructura |
| Integración AGENT_CREATOR | Recipe con paradigma | Documentación |
| Ejemplo de agente creado | 1 agente "flove-demo" | 0 (documentación) |

---

## Modelo de Trabajo Propuesto

```
┌───────────────────────────────────────────────────────────────┐
│                    FLOVE EDITOR PLUGIN                         │
├───────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐                   │
│  │ FloveOntology   │───▶│   FloveEditor   │                   │
│  │ (JSON Schema)   │    │   (Agent)       │                   │
│  └─────────────────┘    └────────┬────────┘                   │
│                                  │                             │
│                    ┌─────────────┴─────────────┐               │
│                    ▼                           ▼               │
│           ┌─────────────────┐         ┌─────────────────┐     │
│           │ AGENT_CREATOR   │         │   PrologEditor  │     │
│           │ (nuevo campo)   │         │   (opcional)    │     │
│           └─────────────────┘         └─────────────────┘     │
│                    │                           │               │
│                    └─────────────┬─────────────┘               │
│                                  ▼                             │
│                         ┌─────────────────┐                   │
│                         │  Agente con     │                   │
│                         │  "alma Flove"   │                   │
│                         └─────────────────┘                   │
│                                                                 │
└───────────────────────────────────────────────────────────────┘
```

---

## Cierre

**SM**: Resumen ejecutivo:

1. **Ontología Flove** capturada de 4 fuentes (flove.org, demos.flove.org, Codeberg)
2. **10 campos × 4 capas** de taxonomía disponibles
3. **3 épicas** definidas para Feature Cycle 1 (29 pts total)
4. **Complementario** a as-gym, enfoque biocéntrico/holístico
5. **Riesgos** identificados con mitigaciones

¿Aprobamos para generar backlog borrador?

**PO**: Aprobado. Genera el backlog siguiendo el protocolo. Prioriza la épica de fuente de datos (SCRIPT-1.20.0) porque bloquea las demás.

---

## Siguiente Paso

`@scrum borrador` para generar `02_backlog-flove-editor.md`
