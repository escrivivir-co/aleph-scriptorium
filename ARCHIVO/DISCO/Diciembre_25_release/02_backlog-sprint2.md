# Backlog Sprint 2: Capítulo Uno

> **Sprint**: 2 — Capítulo Uno  
> **Feature Cycle**: 1  
> **Modelo**: Híbrido 70/30 (Fundación/Scriptorium)  
> **Effort total**: 100 puntos (distribución relativa)

---

## Épicas

| ID | Nombre | Opportunity | Effort | Prioridad |
|----|--------|-------------|--------|-----------|
| **FUND-1.1.0** | Capítulo 1: Anacronismo Productivo | Fundación | 70 pts | P0 |
| **SCRIPT-1.1.0** | Mejoras Emergentes | Scriptorium | 30 pts | P1 |

---

## Feature Cycle 1: Estructura

```
┌─────────────────────────────────────────────────────────────────┐
│                    SPRINT 2: CAPÍTULO UNO                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │   I1     │  │   I2     │  │   I3     │  │   I4     │        │
│  │Preparar  │─▶│ Borrador │─▶│ Auditar  │─▶│ Cerrar   │        │
│  │ 20 pts   │  │  35 pts  │  │  30 pts  │  │  15 pts  │        │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘        │
│                                                                 │
│  ──────────────────────────────────────────────────────────    │
│  │░░░░░░░░░░░░░ BUFFER MEJORAS (máx 30 pts) ░░░░░░░░░░░░░│    │
│  ──────────────────────────────────────────────────────────    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Iteración 1: Preparación

**Objetivo**: Definir estructura del capítulo, reunir fuentes, establecer criterios de éxito.

**Effort**: 20 puntos

### Stories

#### FUND-1.1.0-S01: Estructura del Capítulo
**Effort**: 8 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T001 | Definir pregunta directriz del capítulo | 1 | ⏳ |
| T002 | Redactar tesis principal (1 párrafo) | 2 | ⏳ |
| T003 | Identificar los 3 conflictos/posiciones | 2 | ⏳ |
| T004 | Diseñar 2-3 mecanismos concretos | 2 | ⏳ |
| T005 | Declarar "Sacrificio" (qué pierde el texto al decidir) | 1 | ⏳ |

**Definition of Done**: Documento `PROYECTOS/FUNDACION/CAPITULOS/01-anacronismo/estructura.md` aprobado.

---

#### FUND-1.1.0-S02: Consulta de Fuentes
**Effort**: 7 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T006 | Consultar HDF-ErnestoCastro sobre temporalidad/anacronismo | 2 | ⏳ |
| T007 | Identificar gaps en Enciclopedia (¿qué falta?) | 1 | ⏳ |
| T008 | Scraping de 1-2 fuentes adicionales si necesario | 3 | ⏳ |
| T009 | Consolidar referencias en `fuentes.md` | 1 | ⏳ |

**Definition of Done**: Lista de referencias consultables para el capítulo.

---

#### FUND-1.1.0-S03: Indicadores de Fracaso
**Effort**: 5 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T010 | Definir indicadores de fracaso específicos del capítulo | 2 | ⏳ |
| T011 | Mapear indicadores a Banderas (cuál audita qué) | 1 | ⏳ |
| T012 | Crear checklist de calidad pre-auditoría | 2 | ⏳ |

**Definition of Done**: Documento `indicadores-fracaso-cap1.md` listo.

---

## Iteración 2: Borrador

**Objetivo**: Producir borrador completo del capítulo con @aleph.

**Effort**: 35 puntos

### Stories

#### FUND-1.1.0-S04: Redacción del Borrador
**Effort**: 25 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T013 | Redactar Apertura (qué desplazamiento introduce) | 3 | ⏳ |
| T014 | Desarrollar Tesis (argumento central) | 5 | ⏳ |
| T015 | Escribir Repertorio (futuros cancelados que recupera) | 5 | ⏳ |
| T016 | Diseñar Núcleo de diseño (instituciones/reglas) | 5 | ⏳ |
| T017 | Redactar Sacrificio (qué pierde al decidir) | 3 | ⏳ |
| T018 | Escribir Sombra (cómo fallaría) | 2 | ⏳ |
| T019 | Componer Cierre (conexión con capítulo 2) | 2 | ⏳ |

**Definition of Done**: Borrador completo en `CAPITULOS/01-anacronismo/borrador-v1.md`.

---

#### FUND-1.1.0-S05: Auto-revisión
**Effort**: 10 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T020 | Pasar checklist de calidad (S03) | 2 | ⏳ |
| T021 | Verificar coherencia con ARCHIVO/marco | 3 | ⏳ |
| T022 | Verificar voz (instrucciones voz-manifiesto) | 2 | ⏳ |
| T023 | Identificar secciones débiles para foco de auditoría | 2 | ⏳ |
| T024 | Generar lista de preguntas para auditores | 1 | ⏳ |

**Definition of Done**: Borrador marcado "listo para auditoría".

---

## Iteración 3: Auditoría

**Objetivo**: Someter borrador a las 5 Banderas, iterar hasta aprobación.

**Effort**: 30 puntos

### Stories

#### FUND-1.1.0-S06: Auditoría Blueflag (Verdad)
**Effort**: 6 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T025 | Invocar @blueflag con borrador + indicadores | 2 | ⏳ |
| T026 | Procesar feedback (evidencia, utilidad, falsificabilidad) | 2 | ⏳ |
| T027 | Implementar fixes de Blueflag | 2 | ⏳ |

---

#### FUND-1.1.0-S07: Auditoría Blackflag (Sombras)
**Effort**: 6 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T028 | Invocar @blackflag (coste represivo, enemigo, captura) | 2 | ⏳ |
| T029 | Procesar feedback de sombras | 2 | ⏳ |
| T030 | Implementar defensas/blindajes | 2 | ⏳ |

---

#### FUND-1.1.0-S08: Auditoría Redflag (Estructura)
**Effort**: 6 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T031 | Invocar @redflag (escala, enforcement, suministro) | 2 | ⏳ |
| T032 | Procesar feedback de viabilidad | 2 | ⏳ |
| T033 | Ajustar mecanismos para gobernabilidad | 2 | ⏳ |

---

#### FUND-1.1.0-S09: Auditoría Yellowflag (Límites)
**Effort**: 5 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T034 | Invocar @yellowflag (condiciones vs contenido, gnosis) | 2 | ⏳ |
| T035 | Procesar feedback de límites | 1 | ⏳ |
| T036 | Ajustar pretensiones epistémicas | 2 | ⏳ |

---

#### FUND-1.1.0-S10: Auditoría Orangeflag (Registro)
**Effort**: 4 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T037 | Invocar @orangeflag (dialéctica/retórica, género, estilo) | 1 | ⏳ |
| T038 | Procesar feedback de registro | 1 | ⏳ |
| T039 | Ajustar tono y estilo | 2 | ⏳ |

---

#### FUND-1.1.0-S11: Revisión Final
**Effort**: 3 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T040 | Invocar @revisor para coherencia con ARCHIVO | 1 | ⏳ |
| T041 | Integrar todas las correcciones | 1 | ⏳ |
| T042 | Marcar borrador como "Aprobado" | 1 | ⏳ |

**Definition of Done**: `borrador-v2.md` con 5/5 banderas aprobadas.

---

## Iteración 4: Cierre

**Objetivo**: Publicar capítulo, capturar mejoras, preparar Sprint 3.

**Effort**: 15 puntos

### Stories

#### FUND-1.1.0-S12: Publicación
**Effort**: 6 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T043 | Renombrar borrador-v2 a `capitulo-01.md` | 1 | ⏳ |
| T044 | Actualizar índice de Fundación | 1 | ⏳ |
| T045 | Publicar en GH-Pages (sección Fundación) | 2 | ⏳ |
| T046 | Anunciar en cartelera del Teatro (opcional) | 2 | ⏳ |

---

#### SCRIPT-1.1.0-S01: Mejoras Emergentes
**Effort**: 6 pts (del buffer de 30)

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T047 | Revisar buffer de mejoras acumuladas | 1 | ⏳ |
| T048 | Implementar quick wins (≤2 pts cada uno) | 3 | ⏳ |
| T049 | Documentar mejoras que van a Sprint 3 | 2 | ⏳ |

---

#### FUND-1.1.0-S13: Retrospectiva y Planificación
**Effort**: 3 pts

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T050 | Retrospectiva del Sprint (qué funcionó, qué no) | 1 | ⏳ |
| T051 | Foto de estado del proyecto | 1 | ⏳ |
| T052 | Planificar Sprint 3 (Capítulo 2 o consolidación) | 1 | ⏳ |

---

## Buffer de Mejoras Scriptorium

**Capacidad máxima**: 30 pts (solo 6 asignados en I4, resto es contingencia)

### Issues potenciales (a capturar durante el Sprint)

| ID | Origen probable | Tipo | Effort est. |
|----|-----------------|------|-------------|
| M001 | I1-T007 | Enciclopedia: añadir tomo | 8 pts |
| M002 | I2-T015 | Teatro: mejor visualización de fuentes | 5 pts |
| M003 | I3-T025 | Blueflag: mejorar formato de reporte | 3 pts |
| M004 | I3-* | Banderas: crear plantilla unificada de auditoría | 5 pts |
| M005 | I4-T045 | GH-Pages: sección Fundación | 4 pts |
| ... | ... | ... | ... |

**Regla**: Si el buffer supera 30 pts acumulados, pausar mejoras y priorizar Fundación.

---

## Métricas

| Métrica | Target | Mínimo | Estado |
|---------|--------|--------|--------|
| Tasks Fundación completadas | 46/46 | 40/46 | ⏳ |
| Tasks Mejoras completadas | ≥5 | ≥3 | ⏳ |
| Banderas aprobadas | 5/5 | 4/5 | ⏳ |
| Buffer consumido | ≤30 pts | ≤40 pts | ⏳ |
| Capítulo publicado | ✅ | Borrador aprobado | ⏳ |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| Sprint 1 Teatro | ✅ Completado | Base operativa |
| HDF-ErnestoCastro | ✅ Cargado | 61 capítulos disponibles |
| ARCHIVO/marco | ✅ Consolidado | 15 documentos |
| 5 Banderas | ✅ Operativas | Auditores listos |
| GH-Pages | ✅ Funcional | Plugin instalado |

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-22 | Crear backlog Sprint 2 | Aleph |

---

*Fin del backlog Sprint 2: Capítulo Uno*
