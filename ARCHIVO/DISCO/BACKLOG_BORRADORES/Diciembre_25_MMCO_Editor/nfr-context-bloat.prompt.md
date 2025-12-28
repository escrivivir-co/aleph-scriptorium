# Prompt: Negociación NFR - Context Bloat en .github/

> **Plugin**: Scrum  
> **Comando**: `@scrum nfr-negociacion`  
> **Fase**: Planificación (Non-Functional Requirements)
> **Fuente**: `ARCHIVO/DISCO/Diciembre_25_MMCO_Editor/critica-prompting-pathykar.md`

---

## Contexto de la Negociación

**Situación**: El SM ha identificado un anti-patrón crítico en la ingeniería de prompting del Scriptorium tras analizar `Pathykar.inner.md`. El análisis revela que el 92% de los tokens (117K de 128K) se consumen en contexto, dejando solo 8% para respuestas.

**Tensión**: El SM quiere dedicar tiempo al rediseño de `.github/` para paliar el problema. El PO no verá nuevas features durante este trabajo. Negociación típica de NFR (Non-Functional Requirements).

---

## Conversación PO-SM-Técnicos

### Apertura

**SM**: Tenemos un problema estructural que necesito escalar antes de planificar el siguiente sprint. He analizado el documento `Pathykar.inner.md` —un dump de 8,849 líneas de una request a Copilot— y los números son alarmantes.

**Pathykar (PO)**: Dame los números concretos. ¿Qué tan malo es?

**SM**: 
| Métrica | Valor | Problema |
|---------|-------|----------|
| Tokens de prompt | 117,877 | 92% del límite de 128K |
| Tokens cacheados | 115,430 | 98% redundante |
| Attachments | 23 | Mayoría innecesarios para la tarea |
| **Ratio señal/ruido** | **~3%** | Solo ~250 líneas de 8,849 eran la tarea real |

**Pathykar (PO)**: Espera, ¿me estás diciendo que el 97% del contexto que enviamos al modelo es ruido?

**SM**: Exactamente. Y peor: el sistema auto-inyecta archivos por patrones glob sin filtrar por relevancia. El usuario controla solo el 3% del contexto; el 97% lo decide el sistema automáticamente.

---

### Fase 1: Entender el problema

**Ox** (entrando a la conversación): Como oráculo del sistema, puedo confirmar el diagnóstico. El problema está en cómo hemos configurado `.github/instructions/`. Cada archivo tiene un `applyTo` con patrones glob demasiado amplios:

```yaml
# Ejemplo actual (problemático)
applyTo: "ARCHIVO/DISCO/**/*.md"
```

Esto significa que cualquier conversación que toque cualquier archivo en DISCO incluye TODAS las instrucciones. El sistema de la escalera crítica se activa aunque no sea relevante.

**Pathykar (PO)**: Pero Ox, ¿no era la idea que el sistema fuera contextualmente rico? Queríamos que el modelo "supiera" sobre el Scriptorium completo.

**Ox**: Sí, pero hay una diferencia entre "conocimiento disponible" y "conocimiento inyectado siempre". El diagnóstico de banderas revela:

| Bandera | Test | Veredicto |
|---------|------|-----------|
| 🔵 Blueflag | ¿Attachments necesarios? | ❌ Solo 26% eran relevantes |
| ⚫ Blackflag | ¿Quién controla el contexto? | ⚠️ Usuario perdió control |
| 🔴 Redflag | ¿Es sostenible a escala? | ❌ Opera al límite de recursos |
| 🟡 Yellowflag | ¿Separación metadatos/contenido? | ❌ Blob monolítico |
| 🟠 Orangeflag | ¿Auditorio claro? | ❌ No sirve a modelo ni humano |

---

### Fase 2: El dilema del PO

**Pathykar (PO)**: Entiendo la severidad técnica. Pero necesito que entiendas mi posición: tenemos el roadmap de la Época 2 (Extensión) con épicas pendientes:

1. Plugins transversales (TypedPrompting, N8N, Blockly)
2. Submódulos especializados
3. Los 12 capítulos de Fundación

Si paramos para "rediseñar el sistema de prompting", ¿cuánto tiempo perdemos?

**SM**: No es "perder tiempo", es inversión en sostenibilidad. Pero entiendo tu punto. Déjame traer a Aleph para que nos dé la perspectiva DevOps.

---

### Fase 3: Perspectiva DevOps

**Aleph**: Desde DevOps, veo tres niveles de riesgo si no actuamos:

#### Riesgo Inmediato (ya está pasando)
```
- Respuestas truncadas: Solo quedan 10K tokens para output
- Latencia degradada: 16 segundos por request (debería ser <5s)
- Caching inútil: 98% cacheado significa acumulación tóxica
```

#### Riesgo a Corto Plazo (1-2 sprints)
```
- Conversaciones largas imposibles: No hay espacio para evolución
- Tareas complejas fallarán: El modelo no puede razonar bien
- Frustración de operador: El sistema no responde como esperado
```

#### Riesgo a Largo Plazo (Época 3)
```
- Los 12 capítulos necesitan contexto extenso
- Pipeline de noticias requiere iteración
- Teatro Interactivo con memoria → imposible con context bloat
```

**Pathykar (PO)**: Entonces no es "paramos para features lindas de infraestructura". Es "paramos ahora o el sistema colapsa durante Época 3".

**Aleph**: Exacto. Y hay algo peor: cada sprint que sigamos sin arreglar esto, acumulamos más instructions, más patrones glob, más auto-inyección. El problema escala.

---

### Fase 4: Plan de Paliación

**SM**: Propongo un plan de tres niveles. Podemos hacer el Nivel 1 inmediatamente, Nivel 2 en un sprint dedicado, Nivel 3 como épica de Época 2.

#### Nivel 1: Correcciones Inmediatas (1-2 días, sin sprint dedicado)

| Acción | Impacto | Effort |
|--------|---------|--------|
| Reducir patrones glob | -50K tokens | 1 pt |
| Eliminar instructions redundantes | -20K tokens | 1 pt |
| Documentar qué se auto-inyecta | Visibilidad | 1 pt |

**Cambio específico**:
```yaml
# Antes
applyTo: "ARCHIVO/DISCO/**/*.md"

# Después  
applyTo: "ARCHIVO/DISCO/{carpeta_específica}/**/*.md"
```

#### Nivel 2: Refactorización (Sprint dedicado)

| Acción | Impacto | Effort |
|--------|---------|--------|
| Crear instrucciones por tipo de tarea | Contexto enfocado | 3 pts |
| Usar `isSummarized` para agentes | -30K tokens | 2 pts |
| Implementar presets de contexto | Control recuperado | 5 pts |

#### Nivel 3: Arquitectura (Épica de Época 2)

| Acción | Impacto | Effort |
|--------|---------|--------|
| Separar logs de documentos de trabajo | Claridad | 5 pts |
| Sistema de filtrado de relevancia | -60% tokens | 13 pts |
| Métricas de salud de contexto | Monitoreo | 5 pts |

---

### Fase 5: Negociación Final

**Pathykar (PO)**: Veo el plan. Mi propuesta:

1. **Nivel 1 lo hacemos AHORA** como parte del sprint actual. Son 3 puntos, no bloquean nada.
2. **Nivel 2 NO requiere sprint dedicado completo**. ¿Podemos hibridar? 50% features, 50% deuda técnica en un sprint.
3. **Nivel 3** lo añadimos como épica formal de Época 2 con visibilidad en backlog.

**SM**: Acepto el híbrido del Nivel 2, pero con condición: necesito métricas pre/post para demostrar el impacto. Si después del Nivel 1 no bajamos a menos de 60K tokens por request promedio, escalamos a Nivel 2 completo.

**Ox**: Puedo instrumentar eso. Crearé un script de diagnóstico que mida:
- Tokens promedio por request
- Ratio de attachments relevantes vs. inyectados
- Tiempo de respuesta

**Aleph**: Desde DevOps, me comprometo a que el Nivel 1 esté listo antes del siguiente standup. Es refactorización de YAML, no código.

---

### Cierre

**Pathykar (PO)**: Aprobado. Resumen ejecutivo:

> **NFR Sprint: Context Bloat Mitigation**
> 
> - **Objetivo**: Reducir tokens de prompt de 117K a <50K
> - **Nivel 1**: Inmediato (hoy/mañana) - 3 pts
> - **Nivel 2**: Híbrido en próximo sprint - 10 pts
> - **Nivel 3**: Épica formal en backlog Época 2 - 23 pts
> - **Métrica de éxito**: Ratio señal/ruido >50% (actual: 3%)
> - **Responsables**: 
>   - Aleph (YAML de instructions)
>   - Ox (métricas de diagnóstico)
>   - SM (seguimiento y validación)

**SM**: Documentando. Generaré el backlog detallado cuando confirmes.

---

## Archivos Afectados (Nivel 1)

Los siguientes archivos de `.github/instructions/` requieren revisión de patrones glob:

| Archivo | Patrón Actual | Patrón Propuesto |
|---------|---------------|------------------|
| `periodico.instructions.md` | `ARCHIVO/DISCO/**/*.md` | `ARCHIVO/DISCO/**/conversacion*.md` |
| `submodulo-integracion.instructions.md` | `**/*` | `BlockchainComPort/**/*` |
| `foro-scraper.instructions.md` | `ARCHIVO/**/*.md` | `ARCHIVO/NOTICIAS/**/*.md` |
| `scrum-protocol.instructions.md` | `ARCHIVO/DISCO/**/*.md` | `ARCHIVO/DISCO/**/backlog*.md` |

## Métricas Target

| Métrica | Actual | Post-Nivel1 | Post-Nivel2 | Target Final |
|---------|--------|-------------|-------------|--------------|
| Tokens por request | 117K | <60K | <40K | <30K |
| Attachments relevantes | 26% | >50% | >70% | >80% |
| Ratio señal/ruido | 3% | >20% | >40% | >50% |
| Tiempo de respuesta | 16s | <10s | <7s | <5s |

---

## Siguiente Paso

`@scrum borrador` para generar el backlog detallado de la épica "Context Bloat Mitigation".

