# Prompt: Taller MMCO Editor Transmedia

> **Agente**: @periodico  
> **Tipo**: Inicialización de sesión editorial meta-recursiva  
> **Contexto**: Aplicar el método 5W+Banderas a la Épica SCRIPT-1.23.0

---

## Propósito

Este prompt inicia una **sesión editorial meta-recursiva**: el agente Periódico analiza el diseño del propio sistema de producción de coherencia editorial (MMCO Editor Transmedia) como si fuera una "noticia".

**Innovación**: El sistema se analiza a sí mismo usando su propio método.

---

## Contexto de Apertura

### El "Hecho Noticioso"

```
TITULAR INTERNO: "Scriptorium propone formalizar cómo produce coherencia editorial"

FUENTE: Épica SCRIPT-1.23.0 (MMCO Editor Transmedia)
FECHA: Sprint 1 - FC1 Ontología Formal
ESTADO: Diseño inicial pre-O.R.G.A.N.I.Z.E
```

### Materiales de la Sesión

| Archivo | Contenido | Rol |
|---------|-----------|-----|
| `01_planificacion-sprint1.md` | Conversación PO-SM extendida | Marco del sprint |
| `02_backlog-sprint1.md` | Stories y tasks de SCRIPT-1.23.0 | Material a refactorizar |
| `ontological_reasoning_guide.md` | Guía O.R.G.A.N.I.Z.E | Nueva metodología a integrar |
| `nota-colaboracion.md` | Propuesta enviada a Talaia/Flove | Contexto de colaboración |

### Carpeta de Trabajo

```
ARCHIVO/DISCO/Diciembre_25_MMCO_Editor/
├── 01_planificacion-epicS01.23.md   ← Extracto de la épica
├── 02_guia-organize.md               ← Síntesis de O.R.G.A.N.I.Z.E
├── conversacion.md                   ← Diálogo Alice-Bob-Aleph
└── noticia-publicada.md              ← Output final
```

---

## Instrucciones para @periodico

### Fase 0: Preparación

1. **Verificar/crear** carpeta `DISCO/Diciembre_25_MMCO_Editor/`
2. **Extraer** la épica SCRIPT-1.23.0 del backlog
3. **Sintetizar** los patterns O.R.G.A.N.I.Z.E relevantes

### Fase 1: Edición (5W sobre el diseño)

Iniciar diálogo Alice-Bob sobre "la noticia" de SCRIPT-1.23.0:

```markdown
**Alice (Editora)**:
Tenemos un diseño de épica que modela cómo el Scriptorium produce coherencia.
Pero se hizo ANTES de conocer la guía O.R.G.A.N.I.Z.E.
Bob, dame los hechos: ¿qué dice exactamente esta épica?

**Bob (Escritor)**:
He procesado SCRIPT-1.23.0. Aquí está el esqueleto:

#### 1. WHO (¿Quién produce coherencia?)
- Agentes: @aleph (producción), 5 Banderas (auditoría), @ox (documentación)
- Plugins: Scrum (tiempo), GH-Pages (publicación), Teatro (materia)

#### 2. WHAT (¿Qué se propone?)
- Φ_editor = f(Φ_blue, Φ_black, Φ_red, Φ_yellow, Φ_orange)
- Jerarquía de emergencia: 0c (ARCHIVO) → 4 (Obras finales)
- Meta-dinámica: Sprint→Commit→Release

#### 3. WHERE (¿Dónde ocurre?)
- Código: OnthologyEditor/scriptorium/
- Datos: ARCHIVO/PLUGINS/ONTOLOGY_EDITOR/
- Runtime: toy_models/editor/phi_editor.py

#### 4. WHEN (¿Cuándo?)
- Iteración 3 del FC1 (8 pts)
- Dependiente de Iteración 1 (Metamodel) e Iteración 2 (MMCO ARG)

#### 5. WHY (¿Por qué?)
- Motivo oficial: "Formalizar cómo produce coherencia"
- Motivo real: Validar que las 5 Banderas son operadores Φ composables
```

### Fase 2: Auditoría (Banderas sobre el diseño)

Invocar las Banderas para auditar el diseño:

| Bandera | Pregunta sobre SCRIPT-1.23.0 |
|---------|------------------------------|
| 🔵 Blueflag | ¿Es verdad que Φ_editor es composable? ¿Hay evidencia matemática? |
| ⚫ Blackflag | ¿Quién gana con esta formalización? ¿Hay captura del framework? |
| 🔴 Redflag | ¿Es materialmente viable ejecutar phi_editor.py en cada sprint? |
| 🟡 Yellowflag | ¿Confundimos condiciones (estructura MMCO) con contenido (coherencia real)? |
| 🟠 Orangeflag | ¿El registro es dialéctico (para nosotros) o retórico (para Talaia)? |

### Fase 3: Integración O.R.G.A.N.I.Z.E

Aplicar la guía de razonamiento ontológico a cada story:

| Story | Técnica Recomendada | Justificación |
|-------|---------------------|---------------|
| S01: Jerarquía Editorial | ToT Multi-Path | Niveles 0a/0b/0c requieren exploración multi-dimensional |
| S02: Métrica Φ_editor | Self-Consistency | Composición crítica requiere validación cruzada |
| S03: Meta-Dinámica | Graph of Thought | Sprint→Commit→Release es red de relaciones |

### Fase 4: Síntesis → Noticia Publicada

Generar `noticia-publicada.md` con:

1. **Titular**: "SCRIPT-1.23.0 refactorizado con metodología O.R.G.A.N.I.Z.E"
2. **Los Hechos**: 5W sintetizadas
3. **El Análisis**: Hallazgos de las 5 Banderas
4. **Tesis**: Propuesta de refactorización
5. **Handoff a @aleph**: Instrucciones para actualizar backlog

---

## Handoff de Retorno a @aleph

Una vez publicada la noticia, @periodico devuelve a @aleph con:

```markdown
**@periodico → @aleph**:

He completado el análisis editorial de SCRIPT-1.23.0.

**Hallazgos principales**:
1. [Lista de insights de las 5W]
2. [Lista de warnings de las Banderas]
3. [Recomendaciones de O.R.G.A.N.I.Z.E]

**Noticia publicada**: DISCO/Diciembre_25_MMCO_Editor/noticia-publicada.md

**Petición**: Refactorizar las 3 stories de SCRIPT-1.23.0 en 02_backlog-sprint1.md
incorporando los hallazgos. Actualizar effort si es necesario.
```

## Verificación de que Aleph...

Actualizar el BACKLOG-SCRIPTORIUM.md con las stories refactorizadas

Preparar commit según protocolo DevOps
---

## Métricas de Éxito

| Métrica | Target |
|---------|--------|
| 5W completadas | 5/5 |
| Banderas invocadas | 5/5 |
| Patterns O.R.G.A.N.I.Z.E asignados | 3/3 stories |
| Noticia publicada | ✅ |
| Handoff a @aleph ejecutado | ✅ |

---

## Ejemplo de Tesis Final

> **El diseño original de SCRIPT-1.23.0 asume composición lineal de Φ_banderas, 
> pero la guía O.R.G.A.N.I.Z.E revela que cada bandera opera con técnica de razonamiento diferente.
> Propuesta: redefinir Φ_editor como grafo de operadores, no como función escalar.**

---

## Invocación

```
@periodico Editar noticia

Tema: MMCO Editor Transmedia (SCRIPT-1.23.0)
Fuentes: DISCO/BACKLOG_BORRADORES/Diciembre_25_Ontologia/
Objetivo: Refactorizar épica integrando O.R.G.A.N.I.Z.E

Usar prompt: periodico-taller-mmco.prompt.md
```
