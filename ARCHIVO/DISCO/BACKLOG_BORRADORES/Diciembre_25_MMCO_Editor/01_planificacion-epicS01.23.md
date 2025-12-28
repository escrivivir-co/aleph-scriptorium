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

## Las 5 Banderas como Operadores Φ (Refactorizado MMCO)

> **Actualización 2025-12-28**: Refactorización con caracterización MMCO completa (feedback Talaia/Flove/LOW)

| Bandera | Nivel MMCO | Operador Φ | Técnica O.R.G.A.N.I.Z.E | Espacio de Razonamiento |
|---------|------------|------------|------------------------|-------------------------|
| 🔵 @blueflag | 0b (Correlaciones) | Φ_verdad | **CoT Sequential** | Verificación paso a paso de evidencia |
| ⚫ @blackflag | 0a (Tensores) | Φ_poder | **Graph of Thought** | Mapeo de redes de influencia y captura |
| 🔴 @redflag | 1 (Proto-geometría) | Φ_material | **CoT + Validation** | Cálculo de escala, enforcement, suministro |
| 🟡 @yellowflag | 2 (Pseudo-tiempo) | Φ_límites | **ToT Multi-Path** | Exploración de condiciones y fronteras |
| 🟠 @orangeflag | 3 (Espacio-tiempo) | Φ_registro | **Self-Consistency** | Validación multi-auditorio |

**Propiedad de Inconmensurabilidad**:
- Las banderas operan en espacios de razonamiento **ortogonales**
- Φ_verdad (epistemología) ≠ Φ_poder (política) ≠ Φ_material (economía)
- La suma lineal `Σ(w·Φ)` pierde información de estructura

**Fórmula obsoleta** ❌ DESCARTADA:
```
Φ_editor = w₁·Φ_blue + w₂·Φ_black + w₃·Φ_red + w₄·Φ_yellow + w₅·Φ_orange
```

**Fórmula adoptada** ✅ GRAFO DE OPERADORES:
```
Φ_editor = f(Φ_verdad, Φ_poder, Φ_material, Φ_límites, Φ_registro)

Donde f es una función de grafo:
- Nodos: Φ_bandera (con su técnica O.R.G.A.N.I.Z.E específica)
- Aristas: Relaciones de dependencia/tensión entre espacios
- Output: Vector multidimensional (5D), NO escalar
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

## ✅ Gaps Identificados y Resueltos (2025-12-28)

1. **Fórmula lineal** ✅ RESUELTO: Adoptado modelo de grafo de operadores
2. **Técnicas homogéneas** ✅ RESUELTO: Cada bandera tiene técnica O.R.G.A.N.I.Z.E específica
3. **Sin O.R.G.A.N.I.Z.E** ✅ RESUELTO: Integrado en caracterización MMCO
4. **Validación pendiente** ⏳: Las 9 preguntas técnicas siguen por responder (ver SCRIPT-1.23.0-S01)

---

## Preguntas para la Sesión Editorial

1. ¿Es `Φ_editor` una función escalar o debería ser un grafo de operadores?
2. ¿Cada bandera requiere su propia técnica de razonamiento (CoT, ToT, Graph)?
3. ¿La jerarquía 0c→4 es secuencia emergente o perspectivas coexistentes?
4. ¿Cómo integramos O.R.G.A.N.I.Z.E en la Definition of Done de cada story?
5. ¿El diseño actual confunde estructura MMCO con coherencia real (Yellowflag)?
