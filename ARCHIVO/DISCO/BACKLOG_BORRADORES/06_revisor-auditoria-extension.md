# Revisor: Auditoría Doctrinal de la Integración Extension

> **Agente**: 🔍 Revisor (Auditor Doctrinal)
> **Fecha**: 2025-12-23
> **Ronda**: 4 de 4 (Ox ✅ → Aleph ✅ → Periódico ✅ → **Revisor**)

---

## 1. Recepción de Handoffs

He revisado los documentos de las rondas anteriores:

| Ronda | Agente | Documento | Aporte principal |
|-------|--------|-----------|------------------|
| 1 | @ox | `03_ox-integracion-extension.md` | Modelo de coexistencia, mapeo de capas |
| 2 | @aleph | `04_aleph-produccion-extension.md` | SystemPrompts, split 70/30, épica 2.9.0 |
| 3 | @periodico | `05_periodico-comunicacion-extension.md` | Plana 5W + 4 Banderas |

---

## 2. Auditoría Doctrinal

### 2.1. Coherencia con ARCHIVO/justificacion

| Documento | Criterio | Evaluación |
|-----------|----------|------------|
| `01-lo-tardio-regimen.md` | ¿Evita nostalgia tecnológica? | ✅ La propuesta es infraestructura, no sustituto |
| `02-secuencia-asco-huida-odio.md` | ¿Evita exhibición sin mecanismo? | ✅ Hay arquitectura clara (fork + refactor) |
| `03-posverdad-gobierno-tecnico.md` | ¿Previene captura técnica? | ⚠️ Ver punto 3.2 |
| `04-fractura-mundo-comun.md` | ¿Reconoce límites del diseño? | ✅ Yellowflag aplicado |

### 2.2. Coherencia con ARCHIVO/diagnostico

| Documento | Criterio | Evaluación |
|-----------|----------|------------|
| `01-estado-cuestion.md` | ¿El SOTA está actualizado? | ✅ Auditoría de extension existente |
| `04-fe-lucida-epica.md` | ¿Evita épica falsa? | ✅ Tono sobrio, sin grandilocuencia |

### 2.3. Coherencia con ARCHIVO/marco

| Documento | Criterio | Evaluación |
|-----------|----------|------------|
| `01-seleccion-sistemica.md` | ¿Reconoce asimetrías de poder? | ⚠️ Ver punto 3.1 |
| `05-metodo-materialista-actualizado.md` | ¿Hay base material? | ✅ Código existente, API disponible |
| `07-hybris-crematistica-infinito.md` | ¿Tiene fin natural? | ✅ v0.1.0-scriptorium como hito |

---

## 3. Incoherencias Detectadas

### 3.1. Riesgo de captura por dependencia de VS Code

**Problema**: La extensión depende de la API de VS Code y del ecosistema Microsoft (Copilot). Si Microsoft cambia las reglas del juego (API, pricing, términos), el Scriptorium pierde capacidad.

**Referencia doctrinal**: `ARCHIVO/marco/01-seleccion-sistemica.md` — "El regulado depende informacionalmente del regulador."

**Mitigación propuesta**:
1. **Documentar el core del Scriptorium** (agentes, plugins, prompts) de forma independiente a VS Code
2. **Mantener Copilot Chat nativo** como fallback funcional
3. **Evitar dependencias propietarias** en la extensión (no usar APIs experimentales)

### 3.2. SystemPrompts superficiales → pérdida de vacuna anti-naïf

**Problema**: Aleph propone systemPrompts, pero si son demasiado cortos, los ChatParticipants "olvidarán" la doctrina en conversaciones largas.

**Referencia doctrinal**: `ARCHIVO/marco/` — La vacuna anti-naïf no es un checklist sino un modo de pensar.

**Mitigación propuesta**:
1. **Carga dinámica de instructions** (propuesta de Aleph) + **resumen en systemPrompt**
2. **Handoffs como recordatorios**: Cada followup incluye un hint doctrinal
3. **Test periódico**: Verificar que los ChatParticipants mantienen doctrina

### 3.3. Falta de defensa anticaptura para el elenco Arrakis

**Problema**: Ox propone mantener el elenco Arrakis como "legacy", pero no hay mecanismo para evitar que se pudra (código muerto, inconsistencias).

**Mitigación propuesta**:
1. **Migrar a ARG_BOARD** (épica SCRIPT-2.8.0) con trazabilidad
2. **Deprecar explícitamente** si no se migra en Sprint 3
3. **Documentar decisión** en CHANGELOG de la extensión

---

## 4. Mejoras Accionables

### Alta prioridad

| Mejora | Épica afectada | Justificación |
|--------|----------------|---------------|
| Añadir test de "preservación de doctrina" | SCRIPT-2.2.0 | Verificar que ChatParticipants mantienen vacuna anti-naïf |
| Documentar fallback a Copilot nativo | SCRIPT-2.7.0 | Defensa contra captura por dependencia |
| Formalizar deprecación de elenco Arrakis | SCRIPT-2.8.0 | Evitar código muerto |

### Media prioridad

| Mejora | Épica afectada | Justificación |
|--------|----------------|---------------|
| Añadir @revisor y @periodico a P0 | SCRIPT-2.2.0 | Completar capa UI en ChatParticipants |
| Integrar Fotos de Estado en Sprint Panel | SCRIPT-2.4.0 | Reutilizar artefactos existentes |
| Ordenar prompts por frecuencia | SCRIPT-2.5.0 | Mejorar UX del QuickPick |

### Baja prioridad

| Mejora | Épica afectada | Justificación |
|--------|----------------|---------------|
| Hover de instructions con preview | SCRIPT-2.6.0 | Nice-to-have, no crítico |

---

## 5. Veredicto

### ✅ Aprobado con observaciones

La propuesta de integración Extension ↔ Scriptorium es **coherente con la doctrina** del ARCHIVO, con las siguientes condiciones:

1. **Implementar mitigaciones** del punto 3 (dependencia, systemPrompts, Arrakis)
2. **Añadir test de preservación doctrinal** antes de release
3. **Documentar fallback** a Copilot Chat nativo
4. **Revisar split 70/30** al cierre de Sprint 2 (ajustar si Fundación se retrasa)

### Checklist de aprobación

- [x] Coherencia con ARCHIVO/justificacion
- [x] Coherencia con ARCHIVO/diagnostico
- [x] Coherencia con ARCHIVO/marco (con observaciones)
- [x] Vacuna anti-naïf aplicada (mitigación propuesta)
- [x] Mecanismo de defensa anticaptura (propuesto)
- [x] Estilo y voz (plana de @periodico adecuada)
- [x] Trazabilidad (documentos en DISCO/BACKLOG_BORRADORES/)

---

## 6. Próximos Pasos

1. **PO revisa** este documento y las observaciones
2. **SM actualiza** backlog borrador con mitigaciones
3. **Invocar** `@plugin_ox_scrum` → "Aprobar y publicar backlog"
4. **Iniciar Sprint 2** con épicas priorizadas

---

## 7. Cierre de Rondas

```
Ronda 1: @ox      ✅ Auditoría de ontología
Ronda 2: @aleph   ✅ Perspectiva de producción
Ronda 3: @periodico ✅ Plana noticiera
Ronda 4: @revisor ✅ Auditoría doctrinal (este documento)

Estado: REVISIÓN COMPLETADA — Pendiente aprobación PO
```

---

**Firma**: 🔍 Revisor (Auditor Doctrinal)  
**Timestamp**: 2025-12-23T11:15:00Z
