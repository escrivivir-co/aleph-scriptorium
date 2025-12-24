# Conversación PO-SM: Cobertura y Homogeneización de Índices

**Fecha**: 2025-12-24  
**Épica propuesta**: SCRIPT-1.18.0  
**Agente orquestador**: @scrum

---

## Análisis Técnico (SM)

### Inventario de Índices

| Índice | Ubicación | Visión | Líneas | Propósito |
|--------|-----------|--------|--------|-----------|
| **SPLASH** | `ARCHIVO/DISCO/SPLASH/index.md` | Funcional (Web) | ~180 | Mapa de docs/ para ediciones Jekyll |
| **README** | `ARCHIVO/DISCO/README/index.md` | Técnico (Público) | ~140 | Mapa de README.md para sincronización |
| **Funcional** | `ARCHIVO/DEVOPS/Funcional.md` | Usuario | ~341 | Navegación para usuarios del sistema |
| **Técnico** | `ARCHIVO/DEVOPS/Tecnico.md` | Scrum/Dev | ~555 | Arquitectura para mantenedores |

### Análisis de Cobertura Cruzada

#### A. SPLASH vs DEVOPS

| Sección SPLASH | ¿Existe en Funcional? | ¿Existe en Técnico? | Observación |
|----------------|----------------------|---------------------|-------------|
| §1 Arquitectura Jekyll | ❌ | ✅ §8.1 | Duplicado parcial |
| §2 Estructura index.md | ❌ | ❌ | Único de SPLASH |
| §3 Sistema CSS | ❌ | ❌ | Único de SPLASH |
| §4 Páginas del Sitio | ✅ §2.2 | ❌ | Diferentes formatos |
| §5 Operaciones | ❌ | ❌ | Único de SPLASH |
| §6 Checklist | ❌ | ✅ §12 (genérico) | Complementario |
| §7 Pendientes (TODO) | ❌ | ❌ | Único de SPLASH |
| §8 Referencias | ✅ §8 | ✅ §13 | Todos tienen referencias |

#### B. README vs DEVOPS

| Sección README | ¿Existe en Funcional? | ¿Existe en Técnico? | Observación |
|----------------|----------------------|---------------------|-------------|
| §1 Propósito | Meta | Meta | OK diferente enfoque |
| §2 Estructura README | ❌ | ❌ | Único de README |
| §3 Badges | ❌ | ✅ §11.2 (versionado) | Complementario |
| §4 Secciones sincronizables | ✅ §9.1 (contadores) | ✅ §3.2, 4.1 | **DUPLICADO** |
| §5 Cuándo actualizar | ❌ | ❌ | Único útil |
| §6 Operaciones refactorización | ❌ | ✅ §12 (checklists) | Complementario |
| §7 Checklist coherencia | ❌ | ✅ §10 (tests) | Complementario |
| §8 Referencias cruzadas | Propio | Propio | Circularidad |
| §9 Cuándo NO actualizar | ❌ | ❌ | Único útil |

#### C. Funcional vs Técnico (DEVOPS)

| Tema | Funcional | Técnico | Veredicto |
|------|-----------|---------|-----------|
| Qué es Scriptorium | §1 (breve) | §1.2 (tecnologías) | ✅ Complementarios |
| Sistema de Agentes | §4 (por capa) | §2 (ontología .github) | **DUPLICADO parcial** |
| Plugins | §4.5 (bridges lista) | §3 (registro + estructura) | ✅ Complementarios |
| Submódulos | — | §4 (completo) | ✅ Solo técnico |
| Flujos de trabajo | §5 (diagramas usuario) | §6 (DevOps) | ✅ Diferentes perspectivas |
| ARCHIVO | §6 (estructura) | §7 (datos runtime) | **DUPLICADO** |
| Invocaciones | §7 (ejemplos) | — | ✅ Solo funcional |
| Referencias | §8 | §13 | **DUPLICADO** |
| Métricas | §9 | §3.2, 4.1 | **DUPLICADO** |
| Checklists | — | §12 | ✅ Solo técnico |

### Gaps Identificados

| Gap | Descripción | Impacto |
|-----|-------------|---------|
| G1 | SPLASH no referencia Funcional/Técnico | Navegación incompleta |
| G2 | README duplica contadores que están en Funcional | Mantenimiento doble |
| G3 | Funcional y Técnico duplican tabla ARCHIVO | Violación DRY |
| G4 | No hay índice maestro que unifique los 4 | Difícil saber cuál consultar |
| G5 | Estilos inconsistentes (tablas vs listas vs diagramas) | UX fragmentada |
| G6 | SPLASH tiene TODOs pendientes sin épica | Sin trazabilidad |

### Riesgos Técnicos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Refactorización rompe navegación | Media | Alto | Validar enlaces antes |
| Duplicación no detectada al editar | Alta | Medio | Crear matriz de dependencias |
| Usuarios confundidos sobre cuál leer | Alta | Medio | Crear índice de índices |

---

## Visión de Producto (PO)

### Caso de Uso 1: Usuario nuevo

**Problema**: Hay 4 índices diferentes. ¿Cuál lee?

**Solución**: Clarificar en cada índice su audiencia y cuándo usarlo.

### Caso de Uso 2: Mantenedor

**Problema**: Si actualizo Funcional.md, ¿debo actualizar también Técnico?

**Solución**: Matriz de dependencias que indique qué secciones están vinculadas.

### Caso de Uso 3: Refactorización web

**Problema**: SPLASH tiene info de CSS que no está en ningún otro índice.

**Solución**: SPLASH es el experto de docs/, no duplicar en DEVOPS.

### Criterios de Éxito

- [ ] Cada índice tiene propósito único y declarado
- [ ] No hay duplicación de contenido entre índices
- [ ] Hay matriz de cobertura mantenible
- [ ] Estilo visual homogéneo

---

## Decisiones

### D1. Taxonomía de Índices

```
┌─────────────────────────────────────────────────────────────────┐
│                   ÍNDICE MAESTRO (@indice)                       │
│            "¿Qué índice necesito consultar?"                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│   ┌──────────────┐        ┌──────────────┐                       │
│   │  FUNCIONAL   │        │   TÉCNICO    │                       │
│   │  (Usuarios)  │        │  (Scrum/Dev) │                       │
│   └──────┬───────┘        └──────┬───────┘                       │
│          │                       │                                │
│   ┌──────┴───────┐        ┌──────┴───────┐                       │
│   │    SPLASH    │        │    README    │                       │
│   │   (docs/)    │        │   (raíz)     │                       │
│   └──────────────┘        └──────────────┘                       │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

**Rationale**: 
- SPLASH es sub-índice de Funcional (orientado a ediciones web)
- README es sub-índice de Técnico (orientado a sincronización de documentación pública)

### D2. Responsabilidades Exclusivas

| Índice | Responsabilidad ÚNICA | NO debe contener |
|--------|----------------------|------------------|
| **Funcional** | Capacidades, flujos, invocaciones, memoria | Detalles de archivos, checklists técnicos |
| **Técnico** | Arquitectura, ontología, checklists, releases | Ejemplos de invocación usuario |
| **SPLASH** | Mapa de docs/, CSS, Jekyll | Nada que no sea docs/ |
| **README** | Sincronización README.md ↔ codebase | Nada que no sea sobre README |

### D3. Eliminar Duplicaciones

| Duplicación | Mantener en | Eliminar de |
|-------------|-------------|-------------|
| Tabla ARCHIVO | Funcional §6 | Técnico §7 (referenciar) |
| Contadores agentes/plugins | Funcional §9 | README §4 (referenciar) |
| Lista de plugins | Técnico §3.2 | Funcional §4.5 (resumir) |
| Referencias | Cada uno su scope | — |

---

## Siguiente Paso

- [x] Generar backlog borrador con clasificación a/b/e por sección
- [ ] Consultar al usuario para aprobación
- [ ] Implementar refactorización

