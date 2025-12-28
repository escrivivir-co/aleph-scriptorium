# Backlog Borrador: Blueprint MMCO — Refactorización Φ 5D

> **Épica propuesta**: SCRIPT-1.30.0  
> **Sprint**: FC2 (actual)  
> **Fecha**: 2025-12-28  
> **Dependencia**: SCRIPT-1.23.0 (caracterización MMCO de banderas)  
> **Estado**: 📝 Borrador (pendiente aprobación PO)

---

## Contexto

El Blueprint MMCO actual ([docs/blueprint-mmco.md](../../../../docs/blueprint-mmco.md)) muestra en el **Slide 4 (Materia)** la fórmula:

```
Φ_editor = f(Φ_blue, Φ_black, Φ_red, Φ_yellow, Φ_orange)
```

Esta fórmula es **correcta pero incompleta**: no refleja la caracterización MMCO aprobada en SCRIPT-1.23.0, que establece:

1. Cada bandera opera en un **nivel de emergencia diferente** (0a, 0b, 1, 2, 3)
2. Cada bandera usa una **técnica O.R.G.A.N.I.Z.E diferente**
3. El resultado es un **vector 5D**, no un escalar
4. Las banderas son **inconmensurables** (no sumables linealmente)

---

## Problema Detectado

| Aspecto | Blueprint Actual | Modelo Aprobado |
|---------|------------------|-----------------|
| **Fórmula** | `f(Φ_blue, ..., Φ_orange)` | Grafo de operadores → Vector 5D |
| **Banderas en Slide 0b** | Lista plana de 5 agentes | Cada bandera en su nivel MMCO |
| **Visualización** | Banderas juntas en "Auditoría" | Distribuidas por nivel de emergencia |
| **Mensaje** | "Las banderas auditan" | "Las banderas operan en espacios ortogonales" |

---

## Objetivo

Refactorizar `docs/blueprint-mmco.md` para:

1. **Redistribuir las 5 banderas** en sus niveles MMCO correspondientes
2. **Actualizar el Slide 4** con la fórmula de vector 5D
3. **Añadir visualización** de inconmensurabilidad
4. **Documentar** la relación técnica O.R.G.A.N.I.Z.E por bandera

---

## Diseño Propuesto

### Redistribución de Banderas por Nivel MMCO

```
┌─────────────────────────────────────────────────────────────────┐
│                    JERARQUÍA DE EMERGENCIA                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Nivel 3 (Espacio-tiempo)  →  🟠 @orangeflag (Φ_registro)       │
│                                Self-Consistency                  │
│                                                                  │
│  Nivel 2 (Pseudo-tiempo)   →  🟡 @yellowflag (Φ_límites)        │
│                                ToT Multi-Path                    │
│                                                                  │
│  Nivel 1 (Proto-geometría) →  🔴 @redflag (Φ_material)          │
│                                CoT + Validation                  │
│                                                                  │
│  Nivel 0b (Correlaciones)  →  🔵 @blueflag (Φ_verdad)           │
│                                CoT Sequential                    │
│                                                                  │
│  Nivel 0a (Tensores)       →  ⚫ @blackflag (Φ_poder)            │
│                                Graph of Thought                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Cambios por Slide

| Slide | ID | Cambio Propuesto |
|-------|-----|------------------|
| 0a | `#tensors` | Añadir @blackflag como auditor de "tensión de poder" |
| 0b | `#correlations` | Añadir @blueflag como auditor de "correlaciones de verdad" |
| 1 | `#geometry` | Añadir @redflag como auditor de "estructura material" |
| 2 | `#time` | Añadir @yellowflag como auditor de "límites temporales" |
| 3 | `#spacetime` | Añadir @orangeflag como auditor de "registro observable" |
| 4 | `#matter` | Actualizar fórmula a vector 5D + nota de inconmensurabilidad |

### Nueva Visualización en Slide 4

```html
<div class="mmco-summary">
  <div class="phi-vector">
    <strong>Φ_editor</strong> = [
    <span class="phi-dim phi-verdad">Φ_verdad</span>,
    <span class="phi-dim phi-poder">Φ_poder</span>,
    <span class="phi-dim phi-material">Φ_material</span>,
    <span class="phi-dim phi-limites">Φ_límites</span>,
    <span class="phi-dim phi-registro">Φ_registro</span>
    ]
  </div>
  <p class="phi-note">Vector 5D — Espacios ortogonales, no sumables</p>
</div>
```

---

## Stories

| ID | Story | Descripción | Effort | Prioridad |
|----|-------|-------------|--------|-----------|
| S01 | Redistribuir banderas en slides | Mover cada bandera a su nivel MMCO | 3 pts | P0 |
| S02 | Actualizar Slide 4 (Materia) | Nueva fórmula vector 5D + CSS | 2 pts | P0 |
| S03 | Añadir técnicas O.R.G.A.N.I.Z.E | Mostrar técnica de cada bandera | 2 pts | P1 |
| S04 | Documentar inconmensurabilidad | Nota explicativa en overview | 1 pt | P1 |
| S05 | Tests de navegación | Verificar con Playwright | 1 pt | P2 |

**Effort total**: 9 pts

---

## Detalle de Stories

### S01: Redistribuir banderas en slides (3 pts)

**Cambios en cada slide**:

#### Slide 0a (Tensores) — Añadir @blackflag

```markdown
Antes:
- DISCO/
- git status
- Backlog

Después:
- DISCO/ → ⚫ @blackflag audita tensiones de poder
- git status → Diferencial de cambios
- Backlog → Intención direccional
```

**HTML propuesto**:
```html
<div class="tensor-card tensor-audit">
  <span class="tensor-icon">⚫</span>
  <span class="tensor-name">@blackflag</span>
  <span class="tensor-desc">Auditoría de poder. Detecta captura y coerción oculta.</span>
  <span class="tensor-technique">Técnica: Graph of Thought</span>
</div>
```

#### Slide 0b (Correlaciones) — Añadir @blueflag

```html
<div class="corr-audit-layer">
  <span class="corr-icon">🔵</span>
  <span class="corr-title">@blueflag</span>
  <span class="corr-desc">Audita correlaciones de verdad. Evidencia, utilidad, falsificabilidad.</span>
  <span class="corr-technique">Técnica: CoT Sequential</span>
</div>
```

#### Slide 1 (Geometría) — Añadir @redflag

```html
<div class="geometry-audit">
  <span class="geo-icon">🔴</span>
  <span class="geo-name">@redflag</span>
  <span class="geo-desc">Audita estructura material. Escala, enforcement, suministro.</span>
  <span class="geo-technique">Técnica: CoT + Validation</span>
</div>
```

#### Slide 2 (Tiempo) — Añadir @yellowflag

```html
<div class="time-audit">
  <span class="time-icon">🟡</span>
  <span class="time-name">@yellowflag</span>
  <span class="time-desc">Audita límites temporales. Pre/Trans, condiciones, fronteras.</span>
  <span class="time-technique">Técnica: ToT Multi-Path</span>
</div>
```

#### Slide 3 (Espacio-tiempo) — Añadir @orangeflag

```html
<div class="spacetime-audit">
  <span class="st-icon">🟠</span>
  <span class="st-name">@orangeflag</span>
  <span class="st-desc">Audita registro observable. Dialéctica, género, auditorio.</span>
  <span class="st-technique">Técnica: Self-Consistency</span>
</div>
```

**DoD**: Cada slide muestra su bandera correspondiente con técnica O.R.G.A.N.I.Z.E

---

### S02: Actualizar Slide 4 — Vector 5D (2 pts)

**Antes**:
```html
<div class="mmco-summary">
  <strong>Φ_editor</strong> = f(Φ_blue, Φ_black, Φ_red, Φ_yellow, Φ_orange)
</div>
```

**Después**:
```html
<div class="mmco-summary phi-5d">
  <div class="phi-vector-display">
    <strong>Φ_editor</strong> = 
    <span class="phi-bracket">[</span>
    <span class="phi-component phi-0b" title="Nivel 0b · CoT">Φ_verdad</span>,
    <span class="phi-component phi-0a" title="Nivel 0a · Graph">Φ_poder</span>,
    <span class="phi-component phi-1" title="Nivel 1 · CoT+Val">Φ_material</span>,
    <span class="phi-component phi-2" title="Nivel 2 · ToT">Φ_límites</span>,
    <span class="phi-component phi-3" title="Nivel 3 · Self-Cons">Φ_registro</span>
    <span class="phi-bracket">]</span>
  </div>
  
  <p class="phi-incommensurability">
    <strong>Propiedad:</strong> Vector 5D con dimensiones ortogonales.
    <br>Las banderas operan en espacios de razonamiento inconmensurables.
    <br><em>No es escalar. No es suma lineal.</em>
  </p>
</div>
```

**CSS necesario** (añadir a `assets/css/presentation.scss`):
```css
.phi-5d {
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid var(--mmco-level-4);
}

.phi-vector-display {
  font-family: monospace;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.phi-component {
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  cursor: help;
}

.phi-0b { background: rgba(59, 130, 246, 0.3); } /* blue */
.phi-0a { background: rgba(0, 0, 0, 0.5); color: white; } /* black */
.phi-1 { background: rgba(239, 68, 68, 0.3); } /* red */
.phi-2 { background: rgba(234, 179, 8, 0.3); } /* yellow */
.phi-3 { background: rgba(249, 115, 22, 0.3); } /* orange */

.phi-incommensurability {
  font-size: 0.9rem;
  opacity: 0.9;
  border-top: 1px solid rgba(255,255,255,0.2);
  padding-top: 1rem;
  margin-top: 1rem;
}
```

**DoD**: Fórmula muestra vector 5D con colores por bandera + nota de inconmensurabilidad

---

### S03: Añadir técnicas O.R.G.A.N.I.Z.E (2 pts)

Añadir en cada slide un badge con la técnica de razonamiento:

```html
<span class="organize-badge">
  <span class="organize-icon">🧠</span>
  <span class="organize-name">CoT Sequential</span>
</span>
```

**Tabla de técnicas por slide**:

| Slide | Bandera | Técnica | Badge |
|-------|---------|---------|-------|
| 0a | @blackflag | Graph of Thought | `🧠 Graph` |
| 0b | @blueflag | CoT Sequential | `🧠 CoT` |
| 1 | @redflag | CoT + Validation | `🧠 CoT+Val` |
| 2 | @yellowflag | ToT Multi-Path | `🧠 ToT` |
| 3 | @orangeflag | Self-Consistency | `🧠 SelfCons` |

**DoD**: Cada slide muestra badge de técnica O.R.G.A.N.I.Z.E

---

### S04: Documentar inconmensurabilidad (1 pt)

Añadir en Slide Overview (`#overview-mmco`) una nota explicativa:

```html
<div class="incommensurability-note">
  <h3>⚠️ Propiedad de Inconmensurabilidad</h3>
  <p>
    Las 5 banderas operan en <strong>espacios de razonamiento ortogonales</strong>:
  </p>
  <ul>
    <li>Φ_verdad (epistemología) ≠ Φ_poder (política)</li>
    <li>Φ_material (economía) ≠ Φ_límites (condiciones)</li>
    <li>Φ_registro (retórica) opera en espacio-tiempo observable</li>
  </ul>
  <p>
    <strong>Implicación:</strong> No existe un escalar "coherencia total".
    El output es un perfil multidimensional.
  </p>
</div>
```

**DoD**: Overview contiene explicación de inconmensurabilidad

---

### S05: Tests de navegación (1 pt)

Verificar con Playwright:

| Test | Descripción | Criterio |
|------|-------------|----------|
| T01 | Cada slide tiene su bandera visible | Badge presente |
| T02 | Slide 4 muestra vector 5D | Texto `[Φ_verdad, ...]` visible |
| T03 | Tooltips de técnica funcionan | Hover muestra técnica |
| T04 | Navegación fluida entre slides | No errores JS |

**DoD**: 4/4 tests pasan

---

## Criterios de Aceptación

- [ ] Las 5 banderas están distribuidas en sus niveles MMCO (0a, 0b, 1, 2, 3)
- [ ] Slide 4 muestra Φ_editor como vector 5D, no como función
- [ ] Cada bandera tiene su técnica O.R.G.A.N.I.Z.E visible
- [ ] Overview documenta inconmensurabilidad
- [ ] Navegación funciona sin errores

---

## Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Sobrecarga visual | Media | Medio | Usar badges compactos, no bloques |
| Confusión conceptual | Baja | Alto | Añadir tooltips explicativos |
| CSS conflictos | Baja | Bajo | Namespacing `.phi-5d` |

---

## Dependencias

| Tipo | Dependencia | Estado |
|------|-------------|--------|
| **Dura** | SCRIPT-1.23.0 (caracterización MMCO) | ✅ Aprobada |
| **Blanda** | SCRIPT-1.28.0 (fix navegación) | ✅ Completada |
| **Blanda** | Feedback Talaia/Flove | ⏳ Deseable |

---

## Siguiente Paso

`@scrum aprobar` para mover a backlog oficial como SCRIPT-1.30.0

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-28 | Crear borrador de épica | @aleph |

