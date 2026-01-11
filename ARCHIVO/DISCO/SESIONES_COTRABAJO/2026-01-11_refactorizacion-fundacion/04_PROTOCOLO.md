# Protocolo de Cotrabajo — Refactorización FUNDACIÓN

> **Sesión**: 2026-01-11_refactorizacion-fundacion  
> **Épica**: FUND-REFACTOR-1.0.0  
> **Tipo**: Productiva (genera artefactos para BACKLOG)

---

## 1. Descripción del Proceso

Este cotrabajo sigue un flujo **iterativo con convergencia por consenso**:

```
┌─────────────────────────────────────────────────────────────┐
│                     FLUJO DE TRABAJO                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  FASE 1: CLARIFICACIÓN                                      │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ @aleph → @periodico → @revisor → @aleph             │   │
│  │ Descargar → Analizar 5W → Verificar → Distribuir    │   │
│  └─────────────────────────────────────────────────────┘   │
│                          │                                  │
│                          ▼                                  │
│  FASE 2: TAMIZADO DE BANDERAS                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ @blueflag → @blackflag → @redflag →                 │   │
│  │ @yellowflag → @orangeflag                           │   │
│  │ Cada bandera propone plan de intervención           │   │
│  └─────────────────────────────────────────────────────┘   │
│                          │                                  │
│                          ▼                                  │
│  FASE 3: SELECCIÓN Y APLICACIÓN                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ @aleph + @periodico + @revisor                      │   │
│  │ Estudiar propuestas → Seleccionar → Aplicar         │   │
│  └─────────────────────────────────────────────────────┘   │
│                          │                                  │
│                          ▼                                  │
│  FASE 4: VALIDACIÓN                                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Cada bandera revisa integración de su propuesta     │   │
│  │ → ✅ Sin cambios adicionales                        │   │
│  │ → 🔄 Propone cambios con visión de otras banderas   │   │
│  └─────────────────────────────────────────────────────┘   │
│                          │                                  │
│         ┌────────────────┴────────────────┐                │
│         │                                 │                 │
│         ▼                                 ▼                 │
│  ┌──────────────┐                 ┌──────────────────┐     │
│  │ Todas las    │                 │ Alguna bandera   │     │
│  │ banderas ✅  │                 │ propone cambios  │     │
│  └──────┬───────┘                 └────────┬─────────┘     │
│         │                                  │                │
│         ▼                                  │                │
│  FASE X: CIERRE                            │                │
│  ┌─────────────────┐                       │                │
│  │ @aleph levanta  │        ┌─────────────┘                │
│  │ acta final      │        │                              │
│  └─────────────────┘        │                              │
│                             ▼                              │
│                    VOLVER A FASE 2                         │
│                    (siguiente iteración)                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Roles de los Agentes

### @aleph — Orquestador

- **Responsabilidad**: Gestiona la sesión, distribuye trabajo, sintetiza resultados
- **Entregables**: Propuesta de distribución en 12 capítulos, aplicación de cambios
- **Decisión final**: Sí, en coordinación con @periodico y @revisor

### @periodico — Clarificación

- **Responsabilidad**: Análisis 5W del material fuente
- **Tests**: What, Who, When, Where, Why
- **Entregables**: Resumen estructurado de cada texto

### @revisor — Verificación Doctrinal

- **Responsabilidad**: Coherencia con ARCHIVO existente
- **Tests**: Consistencia conceptual, alineación con ENCICLOPEDIA
- **Entregables**: Informe de verificación

### Las 5 Banderas — Auditoría Especializada

| Bandera | Dominio | Tests |
|---------|---------|-------|
| @blueflag | Verdad | Evidencia, Utilidad, Falsificabilidad, Posverdad |
| @blackflag | Sombras | Pólvora, Posverdad técnica, Captura enemiga |
| @redflag | Estructura | Escala, Coerción, Suministro, Régimen material |
| @yellowflag | Límites | Pre/Trans, Cuadrantes, Mercantilización |
| @orangeflag | Registro | Registro, Género, Estilo, Auditorio |

---

## 3. Formato de Intervención de Banderas

Cada bandera debe producir un documento estructurado:

```markdown
# Plan de Intervención — @{bandera}

## Partes del Material a Intervenir

| Texto | Sección | Motivo |
|-------|---------|--------|
| T04x01 | Cap. 3 | Requiere test X |

## Tests a Aplicar

### Test 1: {Nombre}
- **Qué evalúa**: ...
- **Aplicación propuesta**: ...
- **Resultado esperado**: ...

## Transformaciones Propuestas

### Transformación 1
- **Texto afectado**: ...
- **Cambio propuesto**: ...
- **Justificación doctrinal**: ...

## Prioridades

| # | Transformación | Prioridad |
|---|----------------|-----------|
| 1 | ... | P0 (crítica) |
| 2 | ... | P1 (importante) |
```

---

## 4. Criterio de Consenso

Una iteración se considera **cerrada** cuando:

1. Todas las banderas han emitido su validación
2. Ninguna bandera propone cambios adicionales
3. O, si propone cambios, son refinamientos menores (P2)

### Estados de Bandera

| Estado | Símbolo | Significado |
|--------|---------|-------------|
| Sin validar | ⏳ | Pendiente de turno |
| Con cambios | 🔄 | Propone modificaciones |
| Sin cambios | ✅ | Aprueba integración |
| Bloqueada | ⛔ | Rechaza hasta corrección |

---

## 5. Reglas de Turno

### Orden de Turnos

1. Turnos secuenciales según 01_TABLERO.md
2. Un agente puede **ceder turno** si no tiene nada que aportar
3. Las banderas pueden **agrupar** propuestas similares

### Formato de Acta

Cada turno produce un acta en `02_ACTAS/`:

```markdown
# Acta T{N} — @{agente}

**Fecha**: YYYY-MM-DD HH:MM
**Turno**: {N}
**Agente**: @{agente}

## Trabajo Realizado

{descripción}

## Decisiones Tomadas

- Decisión 1: ...
- Decisión 2: ...

## Entregables

- [ ] {entregable 1}
- [ ] {entregable 2}

## Notas para Siguiente Turno

{notas}
```

---

## 6. Condición de Cierre

La sesión se cierra cuando:

1. **Todas** las banderas marcan ✅ en la misma iteración
2. @aleph confirma que FUNDACIÓN ha sido actualizada
3. Se genera acta final con:
   - Resumen de iteraciones
   - Lista de cambios aplicados
   - Próximos pasos

---

## 7. Integración con Scrum

Al cerrar, esta sesión:

1. Genera entrada en BACKLOG-SCRIPTORIUM.md (estado ✅)
2. Actualiza BACKLOG-FUNDACION.md con nueva estructura
3. Crea foto de estado en ARCHIVO/FOTOS_ESTADO/

---

## 8. Anexo: Tests de las Banderas

### @blueflag — Tests de Verdad

| Test | Pregunta |
|------|----------|
| Evidencia | ¿Hay fuentes verificables? |
| Utilidad | ¿Es aplicable? |
| Falsificabilidad | ¿Puede refutarse? |
| Posverdad | ¿Apela más a emoción que a razón? |

### @blackflag — Tests de Sombras

| Test | Pregunta |
|------|----------|
| Pólvora | ¿Cuál es el coste represivo? |
| Posverdad técnica | ¿Hay manipulación técnica? |
| Captura enemiga | ¿Quién se beneficia del error? |

### @redflag — Tests de Estructura

| Test | Pregunta |
|------|----------|
| Escala | ¿A qué nivel opera? |
| Coerción | ¿Cómo se impone? |
| Suministro | ¿Qué recursos consume? |
| Régimen material | ¿Qué infraestructura necesita? |

### @yellowflag — Tests de Límites

| Test | Pregunta |
|------|----------|
| Pre/Trans | ¿Confunde lo primitivo con lo avanzado? |
| Cuadrantes | ¿Qué cuadrantes cubre? |
| Mercantilización | ¿Hay colonización de la esfera pública? |
| Inconmensurabilidad | ¿Se pueden comparar los valores? |

### @orangeflag — Tests de Registro

| Test | Pregunta |
|------|----------|
| Registro | ¿Es dialéctico o retórico? |
| Género | ¿Qué género textual usa? |
| Estilo | ¿Claro, elevado, técnico? |
| Auditorio | ¿Para quién está escrito? |
