# Extracto Épica SCRIPT-1.23.0: MMCO Editor Transmedia

> **Fuente**: `ARCHIVO/DISCO/BACKLOG_BORRADORES/Diciembre_25_Ontologia/02_backlog-sprint1.md`  
> **Extraído**: 2025-12-28  
> **Estado**: Pre-refactorización (antes de O.R.G.A.N.I.Z.E)

---

## Concepto Central (Original)

El Scriptorium no solo *valida* coherencia (vía Banderas), sino que *produce* coherencia a través de un proceso emergente. MMCO captura esta dinámica:

```
ARCHIVO (BNP) → Agentes (correlaciones) → Workspace (tensores) →
→ Proyectos (geometría) → Sprints (tiempo) → Publicaciones (espacio-tiempo) →
→ Obras finales (materia)
```

---

## Jerarquía de Emergencia Editorial (Original)

| Nivel MMCO | Equivalente Editor Transmedia |
|------------|-------------------------------|
| 0c (BNP) | ARCHIVO como plenum de conocimiento (marco, diagnóstico, justificación) |
| 0b (Correlaciones) | Red de agentes (12 core + plugins) y sus handoffs |
| 0a (Tensores) | Estado del workspace (git status, backlog, DISCO) |
| 1 (Proto-geometría) | Estructura de proyectos (PROYECTOS/, plugins/) |
| 2 (Pseudo-tiempo) | Sprints Scrum, commits, releases |
| 3 (Espacio-tiempo) | Publicaciones (GH-Pages, docs/) |
| 4 (Materia) | Obras finales (Fundación 12 caps, Teatro, Periódico) |

---

## Las 5 Banderas como Operadores Φ (Original)

| Bandera | Función MMCO | Opera sobre | Φ_parcial |
|---------|--------------|-------------|-----------|
| 🔵 Blueflag | Detector de decoherencia epistémica | Verdad/evidencia | Φ_blue |
| ⚫ Blackflag | Detector de decoherencia política | Poder/captura | Φ_black |
| 🔴 Redflag | Detector de decoherencia material | Escala/recursos | Φ_red |
| 🟡 Yellowflag | Detector de decoherencia límite | Condiciones/gnosis | Φ_yellow |
| 🟠 Orangeflag | Detector de decoherencia retórica | Registro/auditorio | Φ_orange |

**Fórmula propuesta (original)**:
```
Φ_editor = w₁·Φ_blue + w₂·Φ_black + w₃·Φ_red + w₄·Φ_yellow + w₅·Φ_orange
```

---

## Stories (Original)

### SCRIPT-1.23.0-S01: Jerarquía de Emergencia Editorial
**Effort**: 3 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T023 | Documentar mapeo MMCO layers → conceptos editoriales | 1 | ⏳ |
| T024 | Crear `editor_emergence_model.xml` con 7 niveles | 1 | ⏳ |
| T025 | Integrar con MMCO/xml/ontology/ | 1 | ⏳ |

### SCRIPT-1.23.0-S02: Métrica Φ_editor (5 Banderas)
**Effort**: 3 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T026 | Definir Φ_blue, Φ_black, Φ_red como submétricas | 1 | ⏳ |
| T027 | Implementar phi_editor.py con composición | 1 | ⏳ |
| T028 | Crear tests con fixture de sprint ejemplo | 1 | ⏳ |

### SCRIPT-1.23.0-S03: Meta-Dinámica de Producción
**Effort**: 2 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T029 | Modelar ciclo Sprint→Commit→Release como meta-dinámica | 1 | ⏳ |
| T030 | Crear `production_dynamics.xml` | 1 | ⏳ |

---

## Entregables Propuestos (Original)

| Artefacto | Formato | Propósito |
|-----------|---------|-----------|
| `editor_emergence_model.xml` | XML | Jerarquía de emergencia editorial |
| `phi_editor.py` | Python | Métrica compuesta de las 5 banderas |
| `coherence_dashboard.md` | Markdown | Visualización de Φ por proyecto |
| `production_dynamics.xml` | XML | Meta-dinámica de sprints |

---

## ⚠️ Gaps Identificados (Pre-Análisis)

1. **Fórmula lineal**: `Φ_editor = Σ wᵢ·Φᵢ` asume composición simple
2. **Técnicas homogéneas**: No diferencia cómo opera cada bandera
3. **Sin O.R.G.A.N.I.Z.E**: No incorpora patterns de razonamiento ontológico
4. **Validación pendiente**: Las 9 preguntas técnicas afectan este diseño

---

## Preguntas para la Sesión Editorial

1. ¿Es `Φ_editor` una función escalar o debería ser un grafo de operadores?
2. ¿Cada bandera requiere su propia técnica de razonamiento (CoT, ToT, Graph)?
3. ¿La jerarquía 0c→4 es secuencia emergente o perspectivas coexistentes?
4. ¿Cómo integramos O.R.G.A.N.I.Z.E en la Definition of Done de cada story?
5. ¿El diseño actual confunde estructura MMCO con coherencia real (Yellowflag)?
