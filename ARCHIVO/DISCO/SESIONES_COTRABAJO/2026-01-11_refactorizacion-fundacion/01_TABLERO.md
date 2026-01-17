# Tablero de Turnos — Refactorización FUNDACIÓN

> **Regla DRY**: Este fichero es un ÍNDICE. El contenido está en 02_ACTAS/.

## Turno Actual

| # | Agente | Estado | Acta |
|---|--------|--------|------|
| 12 | @blueflag | ⏳ WAITING | — |

## Historial de Turnos

| # | Agente | Inicio | Fin | Resumen (1 línea) | Acta |
|---|--------|--------|-----|-------------------|------|
| 1 | @aleph | 2026-01-11 | 2026-01-11 | Apertura sesión, verificación materiales, plan de turnos | [T001](02_ACTAS/T001_aleph_apertura-sesion.md) |
| 2 | @periodico | 2026-01-11 | 2026-01-11 | Análisis 5W de 3 textos, frames periodísticos, hilo conductor P vs NP | [T002](02_ACTAS/T002_periodico_analisis-5W.md) |
| 3 | @revisor | 2026-01-11 | 2026-01-11 | Verificación doctrinal: 8 ingenuidades detectadas, T04x03 requiere intervención P0 | [T003](02_ACTAS/T003_revisor_verificacion-doctrinal.md) |
| 4 | @aleph | 2026-01-11 | 2026-01-11 | FASE 1 completada: distribución 3 textos en 12 caps, 3 arcos narrativos, P0/P1/P2 | [T004](02_ACTAS/T004_aleph_sintesis-distribucion.md) |
| 5 | @blueflag | 2026-01-11 | 2026-01-11 | Tests de Verdad: 7 transformaciones (2 P0, 3 P1, 2 P2), foco en P≠NP y Nietzsche | [T005](02_ACTAS/T005_blueflag_plan-intervencion-verdad.md) |
| 6 | @blackflag | 2026-01-11 | 2026-01-11 | Tests de Sombras: 7 transformaciones (3 P0, 3 P1, 1 P2), foco en pólvora, posverdad técnica, captura enemiga | [T006](02_ACTAS/T006_blackflag_plan-intervencion-sombras.md) |
| 7 | @redflag | 2026-01-11 | 2026-01-11 | Tests de Estructura: 9 transformaciones (4 P0, 5 P1-P2), cuellos de botella, colonialismo tech, régimen material expandido | [T007](02_ACTAS/T007_redflag_plan-intervencion-estructura.md) |
| 8 | @yellowflag | 2026-01-17 | 2026-01-17 | Tests de Límites: 3 P0 (pre-trans fallacy, inconmensurabilidad), 2 P1 (cuadrantes, mercantilización), 3 P2 (refinamientos) | [T008](02_ACTAS/T008_yellowflag_plan-intervencion-limites.md) |
| 9 | @orangeflag | 2026-01-17 | 2026-01-17 | Tests de Registro: 4 transformaciones (T-P0 ocultar metadatos, T-P1 voz cronista, T-P2 ganchos, T-P3 modulación retórica) | [T009](02_ACTAS/T009_orangeflag_plan-intervencion-registro.md) |
| 10 | @aleph + @periodico + @revisor | 2026-01-17 | 2026-01-17 | FASE 3: Consolidación 35 trans → 17 fusionadas (6 P0, 7 P1, 4 P2), matriz convergencia | [T010](02_ACTAS/T010_triada_estudio-propuestas.md) |
| 11 | @aleph | 2026-01-17 | 2026-01-17 | FASE 3: Aplicación 17 transformaciones a FUNDACIÓN (A1-A6, B1-B7, C1-C4) | [T011](02_ACTAS/T011_aleph_aplicacion-intervenciones.md) |

## Cola de Turnos (Plan)

### FASE 1: Clarificación y Distribución

| Turno | Agente(s) | Objetivo |
|-------|-----------|----------|
| 1 | @aleph | Abrir sesión, distribuir material inicial |
| 2 | @periodico | Análisis 5W de los 3 textos |
| 3 | @revisor | Verificar coherencia con ARCHIVO existente |
| 4 | @aleph | Síntesis: propuesta de distribución en 12 capítulos |

### FASE 2: Tamizado por Banderas

| Turno | Agente | Foco |
|-------|--------|------|
| 5 | @blueflag | Plan de intervención: tests de Verdad |
| 6 | @blackflag | Plan de intervención: tests de Sombras |
| 7 | @redflag | Plan de intervención: tests de Estructura |
| 8 | @yellowflag | Plan de intervención: tests de Límites |
| 9 | @orangeflag | Plan de intervención: tests de Registro |

### FASE 3: Selección y Aplicación

| Turno | Agente(s) | Objetivo |
|-------|-----------|----------|
| 10 | @aleph + @periodico + @revisor | Estudio de propuestas de banderas |
| 11 | @aleph | Aplicación de intervenciones a FUNDACIÓN |

### FASE 4: Validación de Integración

| Turno | Agente | Verificación |
|-------|--------|--------------|
| 12 | @blueflag | ¿Propuesta correctamente integrada? |
| 13 | @blackflag | ¿Propuesta correctamente integrada? |
| 14 | @redflag | ¿Propuesta correctamente integrada? |
| 15 | @yellowflag | ¿Propuesta correctamente integrada? |
| 16 | @orangeflag | ¿Propuesta correctamente integrada? |

### FASE 5+: Iteración hasta Consenso

> Se repiten Fases 2-4 hasta que **todas las banderas** indiquen que no necesitan más cambios.

| Estado de Consenso | Bandera | Iteración | Notas |
|--------------------|---------|-----------|-------|
| ⏳ Pendiente validación | @blueflag | 1 | Aplicó 7 trans.; posiblemente cambien con P0-2 Yellowflag |
| ⏳ Pendiente validación | @blackflag | 1 | Aplicó 7 trans.; esperará feedback de Yellowflag |
| ⏳ Pendiente validación | @redflag | 1 | Aplicó 9 trans.; clarificaciones Yellowflag en Cap. 7, 9, 10 |
| ✅ INTERVENCIÓN COMPLETA | @yellowflag | 1 | 3 P0, 2 P1, 3 P2; próximo: @orangeflag |
| ✅ INTERVENCIÓN COMPLETA | @orangeflag | 1 | T-P0 (ocultar metadatos), T-P1, T-P2, T-P3 |

### FASE X: Cierre

| Turno | Agente | Acción |
|-------|--------|--------|
| Final | @aleph | Levantar acta final, cerrar sesión |

## Anexos (Fuera de Turno)

| ID | Autor | Fecha | Descripción | Referencia |
|----|-------|-------|-------------|------------|
| T002-A | @periodico | 2026-01-11 | Borrador 12 capítulos (~400 palabras c/u) — Síntesis DRY para facilitar tamizado de Banderas | [BORRADOR_12_CAPITULOS.md](03_REFERENCIAS/BORRADOR_12_CAPITULOS.md) |
| T006-A | @periodico | 2026-01-11 | **VERSIÓN SOFISTICADA** 12 capítulos (~800-1200 palabras c/u) — Lectura paralela vía 3 interfaces (Flove/MMCO/Metamodel), citas textuales, coordenadas ontológicas, Adam como protagonista trágico | [FUNDACION_12_CAPITULOS_SOFISTICADO.md](03_REFERENCIAS/FUNDACION_12_CAPITULOS_SOFISTICADO.md) |
| T005-A | @ForoScraper | 2026-01-11 | **TEXTOS COMPLETOS** descargados (878 líneas total) — Material fuente original para auditoría de Banderas | [TEXTOS/](03_REFERENCIAS/TEXTOS/) |
| T005-B | @FloveEditor | 2026-01-11 | Interfaz Flove-DRY 12 capítulos — Navegación estructurada a fuentes originales con esquemas Flove (RELATE/EXPLAIN/VIEW/SOULS/TRUSTFUL/FREE/MAKING) para Banderas | [FLOVE_INTERFACE_12_CAPITULOS.md](03_REFERENCIAS/FLOVE_INTERFACE_12_CAPITULOS.md) |
| T005-C | @FloveEditor | 2026-01-11 | Interfaz MMCO-DRY 12 capítulos — 7 niveles emergencia (0c→4), Φ_MMCO por capítulo | [MMCO_INTERFACE_12_CAPITULOS.md](03_REFERENCIAS/MMCO_INTERFACE_12_CAPITULOS.md) |
| T005-D | @FloveEditor | 2026-01-11 | Interfaz MetaModel-DRY 12 capítulos — 5 capas, 7 dimensiones, UFO categories, FAIR scores | [METAMODEL_INTERFACE_12_CAPITULOS.md](03_REFERENCIAS/METAMODEL_INTERFACE_12_CAPITULOS.md) |
| T005-E | @aleph | 2026-01-11 | **BRIEFING BANDERAS** — Curso acelerado con asignaciones por bandera y formato de entregable | [BRIEFING_BANDERAS.md](03_REFERENCIAS/BRIEFING_BANDERAS.md) |

> **Nota**: Los anexos no forman parte del flujo de turnos. Son material de apoyo para que las Banderas tengan:
> 1. **Textos completos** (fuente original)
> 2. **Borrador** (síntesis para operar)
> 3. **3 interfaces** (mapas de navegación: Flove, MMCO, Metamodel)
> 4. **Briefing** (curso acelerado con asignaciones)

---

## Resumen de Iteraciones

| Iteración | Banderas con cambios | Banderas sin cambios | Estado |
|-----------|---------------------|----------------------|--------|
| 1 | — | — | 🟢 En progreso |
