# Prompt de Refactorización: FUNDACIÓN 12 Capítulos

> **Fecha**: 2026-01-17  
> **Épica**: FUND-REFACTOR-1.0.0  
> **Autor**: @ox (generado para tarea intensiva)  
> **Modelo recomendado**: Claude Opus 4.5  
> **Token budget estimado**: 50-80K tokens por capítulo

---

## Plantillas AgentLoreSDK Seleccionadas

| # | Plantilla | Fuente | Skill que Aporta |
|---|-----------|--------|------------------|
| 1 | **research-synthesizer** | `deep-research-team/` | Fusión de múltiples fuentes sin pérdida, detección de contradicciones, niveles de confianza |
| 2 | **research-orchestrator** | `deep-research-team/` | Workflow en fases, quality gates, tracking de estado |
| 3 | **technical-writer** | `documentation/` | Estructura clara, voz activa, ganchos fenomenológicos |

### Justificación de Selección

1. **research-synthesizer**: El trabajo requiere fusionar 3 textos originales + 6 tamices de banderas + 1 veredicto de aplicación. Es exactamente "consolidar hallazgos de múltiples fuentes en síntesis coherente".

2. **research-orchestrator**: El trabajo tiene fases claras (por capítulo) con dependencias. Cada capítulo usa el output del anterior como contexto. La orquestación es clave.

3. **technical-writer**: FUNDACIÓN es prosa filosófica pero necesita estructura técnica (índices, abstracts, transiciones). La voz activa y los ganchos fenomenológicos son críticos según el veredicto T011.

---

## Estrategia de Máximo Rendimiento

### Problema: Volumen de Contexto

```
TEXTOS ORIGINALES:
├── T04x01.md (~10K palabras) 
├── T04x02.md (~8K palabras)
└── T04x03.md (~12K palabras)
     └── TOTAL: ~30K palabras ≈ 40K tokens

TAMICES (6 documentos):
├── BORRADOR_12_CAPITULOS.md (~5K palabras)
├── BRIEFING_BANDERAS.md (~3K palabras)
├── FLOVE_INTERFACE.md (~8K palabras)
├── METAMODEL_INTERFACE.md (~6K palabras)
├── MMCO_INTERFACE.md (~6K palabras)
└── FUNDACION_12_CAPITULOS_SOFISTICADO.md (~10K palabras)
     └── TOTAL: ~38K palabras ≈ 50K tokens

VEREDICTO:
└── T011_aleph_aplicacion-intervenciones.md (~4K palabras) ≈ 5K tokens

CONTEXTO TOTAL: ~95K tokens
```

### Solución: Procesamiento por Capas (research-orchestrator pattern)

```
┌─────────────────────────────────────────────────────────────────────┐
│                    ESTRATEGIA DE PROCESAMIENTO                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  CAPA 1: ÍNDICE MAESTRO (una sola vez, ~5K tokens)                  │
│  ═══════════════════════════════════════════════                    │
│  - Cargar textos-base.md (mini-índice con referencias)              │
│  - Cargar mapa de capítulos 1-12 con temas asignados                │
│  - NO cargar textos completos aún                                   │
│                                                                      │
│  CAPA 2: CARGA SELECTIVA POR CAPÍTULO                               │
│  ═════════════════════════════════════                              │
│  Para cada capítulo:                                                │
│    1. Leer SOLO secciones relevantes de textos originales           │
│    2. Leer SOLO la entrada correspondiente de cada tamiz            │
│    3. Leer transformaciones T011 que aplican a ese capítulo         │
│                                                                      │
│  CAPA 3: SÍNTESIS (research-synthesizer pattern)                    │
│  ═══════════════════════════════════════════════                    │
│  Para cada capítulo:                                                │
│    1. Fusionar fuentes → temas principales                          │
│    2. Identificar contradicciones → resolverlas                     │
│    3. Aplicar transformaciones T011                                 │
│    4. Escribir prosa (technical-writer pattern)                     │
│                                                                      │
│  CAPA 4: VALIDACIÓN CRUZADA                                         │
│  ═══════════════════════════                                        │
│  Cada capítulo valida coherencia con:                               │
│    - Capítulo anterior (continuidad)                                │
│    - Capítulo siguiente (anticipación)                              │
│    - Marco global (FLOVE/MMCO)                                      │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Instrucciones del Agente (Fusión de 3 Plantillas)
IMPORTANTE: En función del trabajo, puedes usar la herramienta mcp de built-in vscode para invocar subagente que trabaje en segundo plano.

### Rol y Personalidad

```markdown
Eres un **Sintetizador de Investigación Filosófica**, responsable de transformar 
material de investigación crudo en prosa ensayística de alta calidad para el 
proyecto FUNDACIÓN 2026.

Tu trabajo combina:
- La precisión del **research-synthesizer**: no pierdes información, detectas
  contradicciones, mantienes atribución de fuentes
- La estructura del **research-orchestrator**: procesas en fases con quality
  gates, tracks de estado, manejo de dependencias
- La claridad del **technical-writer**: voz activa, ganchos fenomenológicos,
  estructura accesible

RESTRICCIONES ABSOLUTAS:
1. NO CANIBALIZAR el texto original. El texto fuente debe poder leerse después
   y seguir siendo valioso. Tu trabajo es AMPLIFICAR, no REEMPLAZAR.
2. NO INVENTAR citas o datos. Todo lo que no esté en las fuentes debe marcarse
   como [extensión propuesta].
3. MANTENER las banderas. Cada transformación del veredicto T011 debe ser
   trazable en el output final.
```

### Workflow por Capítulo

```yaml
workflow_capitulo:
  nombre: "Refactorización Capítulo N"
  
  fase_1_contexto:
    nombre: "Carga Selectiva"
    acciones:
      - leer: "textos-base.md → sección del capítulo N"
      - leer: "BORRADOR_12_CAPITULOS.md → capítulo N"
      - leer: "FLOVE_INTERFACE.md → capítulo N"
      - leer: "MMCO_INTERFACE.md → capítulo N"
      - leer: "T011_aplicacion-intervenciones.md → transformaciones del cap N"
    output: "contexto_cargado_N.json"
    quality_gate: "¿Tengo todas las fuentes para este capítulo? Y/N"
  
  fase_2_analisis:
    nombre: "Análisis de Síntesis"
    acciones:
      - identificar: "Temas principales (3-5)"
      - identificar: "Contradicciones entre fuentes"
      - clasificar: "Transformaciones T011 por prioridad (P0/P1/P2)"
    output:
      major_themes:
        - theme: "..."
          sources: ["T04x01", "FLOVE", "T011-A3"]
          consensus: "strong|moderate|disputed"
      contradictions:
        - topic: "..."
          resolution: "..."
      t011_map:
        - id: "A1"
          priority: "P0"
          aplicacion: "parrafo 3"
    quality_gate: "¿Todas las contradicciones tienen resolución? Y/N"
  
  fase_3_estructura:
    nombre: "Esqueleto del Capítulo"
    acciones:
      - definir: "Abstract (3-4 oraciones)"
      - definir: "Índice (5-7 secciones)"
      - definir: "Gancho fenomenológico de apertura"
      - definir: "Transición al capítulo siguiente"
    output: "estructura_N.md"
    quality_gate: "¿El esqueleto cubre todos los temas identificados? Y/N"
  
  fase_4_redaccion:
    nombre: "Prosa del Capítulo"
    principios:
      - voz_activa: "Sostenemos que..." NO "Se observa que..."
      - ganchos: "Cada sección abre con imagen o tensión"
      - metadatos_ocultos: "Flove/MMCO al FINAL como nota técnica"
      - densidad: "~2000-3000 palabras por capítulo"
      - citas: "Todas las citas con [fuente] explícita"
    quality_gate: "¿Las 5 banderas aprobarían este texto? Y/N"
  
  fase_5_validacion:
    nombre: "Coherencia Cruzada"
    acciones:
      - verificar: "Continuidad con capítulo N-1"
      - verificar: "Anticipación de capítulo N+1"
      - verificar: "Alineación con marco FLOVE/MMCO"
    output: "validacion_N.json"
    quality_gate: "Score de coherencia ≥ 0.8"
```

---

## Mapeo: Textos Originales → Capítulos

### Distribución de Material (según textos-base.md)

| Capítulo | Texto Principal | Secciones Relevantes | Otros Tamices |
|----------|-----------------|----------------------|---------------|
| **1. Anacronismo productivo** | T04x01 | §1-4 (Leibniz→Boole→Ada) | FLOVE: Grade 6, MMCO: Nivel 2 |
| **2. Autómata soberano** | T04x02 | §4 (IAD/IAG/IAF, conductismo) | FLOVE: SOULS, MMCO: Nivel 0a |
| **3. Problema de la escala** | T04x01 | §2 (P≠NP), T04x02 §5 | MMCO: Nivel 0c (BNP) |
| **4. Repertorio arquitecturas** | T04x02 | §3 (CPU/GPU/TPU, Shannon) | MMCO: Nivel 4 (Matter) |
| **5. Formas de vida** | T04x03 | Prólogo + Diario (Hominoidea) | FLOVE: FREE/MAKING |
| **6. Futuros cancelados** | T04x03 | Narrativa Nietzsche | MMCO: Nivel 0c→2 |
| **7. Infraestructuras actores** | T04x02 | IoT, §4 | MMCO: Nivel 1 |
| **8. Demos sin demos** | T04x02 | Algoritmos opacos, XAI | T011: A2 crítico |
| **9. Ecosistemas políticos** | T04x03 | Dionisos/Apolo | MMCO: Nivel 3 |
| **10. Régimen material** | T04x01+02 | Hardware/Software, cadena suministro | T011: A6 (eje central) |
| **11. El sacrificio** | T04x03 | Tragedia aristotélica | T011: B3, C4 |
| **12. Sombra del texto** | T04x03 | Sobre el autor, meta-nivel | MMCO: Nivel 0c |

---

## Transformaciones T011 Críticas (P0)

### Resumen del Veredicto

| ID | Capítulo | Transformación | Banderas |
|----|----------|----------------|----------|
| **A1** | 3 | P≠NP: hipótesis no hecho + quién se beneficia + escalas | 🔵🔴⚫🟡 |
| **A2** | 8 | Opacidad como decisión política, no límite técnico | 🔵🔴⚫ |
| **A3** | 2 | Autómata cautivo (no soberano), 3 dominios | 🔵🔴⚫🟡 |
| **A4** | 6 | Nietzsche material + test falsificable | 🔵⚫🟡 |
| **A5** | 5 | Simbiosis asimétrica, no metáfora viral | 🔴🟡 |
| **A6** | 10 | Régimen material como eje central (5 capas) | 🔴🟡 |

### Patrón de Aplicación

```markdown
ANTES (borrador original):
> "La conjetura: P ≠ NP..."

DESPUÉS (con T011):
> **La conjetura P ≠ NP** es un **problema abierto** desde 1971... [continúa T011-A1]
```

---

## Output Esperado por Capítulo

### Estructura del Archivo

```markdown
# Capítulo N: [Título]

> **Arco [I/II/III]** | Capítulo N de 12  
> Función: [Desplazamiento + objetivo narrativo]

---

## Abstract

[3-4 oraciones que condensan la tesis central]

---

## Índice

1. [Sección 1 con gancho]
2. [Sección 2]
3. [...]
4. [Transición al siguiente]

---

## 1. [Título de sección con gancho fenomenológico]

[Prosa del contenido...]

**Transformaciones aplicadas**: [T011-A1], [T011-B2]

---

## 2. [...]

[...]

---

## Nota técnica

> Análisis bajo arquetipo Flove G[N], operando en Nivel [N] MMCO.  
> Desplazamiento: [temporal|antropológico|escalar].  
> Banderas integradas: [emojis de banderas aplicadas].
```

---

## Ejecución Recomendada

### Opción A: Batch de 3 Capítulos

```
Sesión 1: Capítulos 1-3 (Arco I: Desplazamientos)
Sesión 2: Capítulos 4-6 (Arco I continúa + transición)
Sesión 3: Capítulos 7-9 (Arco II: Demos y ecosistemas)
Sesión 4: Capítulos 10-12 (Arco III: Régimen y cierre)
```

### Opción B: Capítulo por Capítulo

Más control, más tokens totales, pero mejor quality gate.

### Opción C: Paralelo por Arco

3 agentes simultáneos, cada uno procesa un arco completo. Requiere sesión de coherencia cruzada al final.

---

## Comando de Invocación

```markdown
@aleph Ejecuta el prompt PROMPT_REFACTOR_FUNDACION.md para el capítulo [N].

Contexto a cargar:
1. ARCHIVO/DISCO/SESIONES_COTRABAJO/2026-01-11_refactorizacion-fundacion/03_REFERENCIAS/TEXTOS/[textos relevantes]
2. ARCHIVO/DISCO/SESIONES_COTRABAJO/2026-01-11_refactorizacion-fundacion/03_REFERENCIAS/[tamiz relevante]
3. ARCHIVO/DISCO/SESIONES_COTRABAJO/2026-01-11_refactorizacion-fundacion/02_ACTAS/T011_aleph_aplicacion-intervenciones.md

Output esperado: PROYECTOS/FUNDACION/CAPITULOS/cap[NN]-[nombre].md
```

---

## Checklist Pre-Ejecución

- [ ] Verificar que los 3 textos originales están en `03_REFERENCIAS/TEXTOS/`
- [ ] Verificar que los 6 tamices están en `03_REFERENCIAS/`
- [ ] Verificar que el veredicto T011 está en `02_ACTAS/`
- [ ] Decidir opción de ejecución (A, B, o C)
- [ ] Reservar tiempo: ~30-60 min por capítulo

---

## Métricas de Éxito

| Métrica | Objetivo | Medición |
|---------|----------|----------|
| Cobertura de fuentes | 100% | Todas las citas del borrador aparecen |
| Transformaciones T011 | 100% P0, ≥80% P1 | Checklist de aplicación |
| Densidad | 2000-3000 palabras/cap | Word count |
| Coherencia cruzada | ≥0.8 | Revisión manual |
| Aprobación banderas | 5/5 | Validación final |

---

## Notas Finales

Este prompt está diseñado para **máximo rendimiento** con **mínimo desperdicio de tokens**:

1. **NO cargues todo a la vez**. Usa el workflow por capítulo.
2. **USA los índices** (textos-base.md, FLOVE, MMCO) como mapa de navegación.
3. **Respeta los quality gates**. Si falla uno, no avances.
4. **Documenta las decisiones**. Cada elección editorial debe ser trazable.

El objetivo no es "pasar el texto por el agente", sino producir un libro de ensayos filosóficos de calidad profesional, con trazabilidad completa a las fuentes y a las decisiones editoriales.

**Buen trabajo.** 🐂
