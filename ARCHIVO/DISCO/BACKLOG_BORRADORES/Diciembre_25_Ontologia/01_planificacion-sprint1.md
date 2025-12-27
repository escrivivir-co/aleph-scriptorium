# Planificación Sprint 1: Conversación PO-SM

> **Fecha**: 2025-12-27
> **Participantes**: Product Owner (PO), Scrum Master (SM)
> **Contexto**: Sprint 0 completado (bootstrap). Inicio de Sprint 1 (Ontología Formal).

---

## Apertura

**SM**: Sprint 0 (Bootstrap) cerrado. El Scriptorium tiene:
- 12 agentes core + 18 plugins instalados
- Sistema de handoffs funcional
- Documentación base en GH-Pages

Dos submódulos recientemente identificados son relevantes:
- `OnthologyEditor/metamodel/` — Framework de especificación ontológica AI-optimized
- `OnthologyEditor/MMCO/` — Framework de coherencia ontológica meta-dinámica

¿Cuál es la dirección para el Sprint 1?

**PO**: Queremos formalizar la ontología del Scriptorium usando estos dos frameworks:

1. **Metamodel** para el *sistema* (agentes, plugins, relaciones) — el "qué es"
2. **MMCO** para la *dinámica* de partidas ARG — el "cómo evoluciona"

El objetivo es tener una especificación formal que:
- Permita validar coherencia automáticamente
- Sirva de base para nuevos plugins
- Documente la arquitectura de forma computable

---

## Definición del Objetivo

**SM**: Propongo el siguiente objetivo SMART:

> **Sprint 1: Ontología Formal del Scriptorium**
> 
> Crear especificaciones formales del Scriptorium usando Metamodel (estructura estática) y MMCO (dinámica de partidas), produciendo documentos XML/JSON validables y toy models ejecutables.

¿Aprobado?

**PO**: Aprobado. Añadir: los artefactos deben ser útiles para @decoherence (validar coherencia) y @ox (generar documentación).

---

## Identificación de Épicas

**SM**: Identifico 4 épicas principales:

| ID | Épica | Descripción | Effort Est. | Prioridad |
|----|-------|-------------|-------------|-----------|
| SCRIPT-1.20.0 | Metamodel Scriptorium | Aplicar metamodel.md a agentes/plugins/handoffs | 13 pts | P0 |
| SCRIPT-1.21.0 | MMCO ARG-Board | Aplicar MMCO a dinámicas de partidas ARG | 8 pts | P1 |
| SCRIPT-1.23.0 | MMCO Editor Transmedia | Aplicar MMCO al Scriptorium como sistema de producción | 8 pts | P1 |
| SCRIPT-1.22.0 | Integración y Validación | Conectar modelos con @decoherence, @ox, banderas | 5 pts | P2 |

**PO**: ¿Cuál es la diferencia entre MMCO ARG-Board y MMCO Editor Transmedia?

**SM**: Son **dos aplicaciones complementarias** del mismo framework:

| Aspecto | MMCO ARG-Board | MMCO Editor Transmedia |
|---------|----------------|------------------------|
| **Dominio** | Partidas de juego ARG | Producción de textos |
| **Tiempo** | Tiempo de juego (turnos) | Tiempo de escritura (sprints) |
| **BNP** | Potencial narrativo del teatro | Potencial creativo del ARCHIVO |
| **Coherence** | Consistencia BOE↔BDC | Consistencia doctrinal (5 Banderas) |
| **Meta-Dynamics** | Commits como movimientos | Sprints como ciclos |
| **Matter** | Personajes, eventos | Textos publicados, obras |

**PO**: Interesante. El Editor Transmedia captura cómo el Scriptorium *produce* coherencia, no solo cómo la *valida*.

**SM**: Exacto. Es la diferencia entre:
- **ARG**: "¿Esta partida es coherente?" (validación puntual)
- **Editor**: "¿Cómo emerge coherencia en la producción?" (proceso generativo)

**PO**: De acuerdo. ¿Cómo dividimos el trabajo?

**SM**: Propongo modelo **secuencial con solapamiento**:
- Semana 1: Épica 1 (Metamodel) 
- Semana 2: Épicas 2 y 3 (MMCO ARG + Editor) en paralelo
- Semana 3: Épica 4 (Integración) + consolidación

---

## Análisis de Épicas

### Épica 1: Metamodel Scriptorium (SCRIPT-1.20.0)

**SM**: El metamodel.md define 5 capas de abstracción y 3 templates principales:
- `ENTITY_TEMPLATE` → para agentes
- `RELATIONSHIP_TEMPLATE` → para handoffs
- `PROCESS_TEMPLATE` → para prompts/flujos

Propuesta de entregables:

| Artefacto | Formato | Propósito |
|-----------|---------|-----------|
| `scriptorium_ontology.xml` | XML | Especificación formal completa |
| `agents_schema.json` | JSON Schema | Validación de .agent.md |
| `handoffs_graph.json` | JSON | Grafo de relaciones entre agentes |
| `README-ONTOLOGY.md` | Markdown | Documentación legible |

**PO**: ¿Dónde vivirán estos artefactos?

**SM**: En `OnthologyEditor/scriptorium/` (código) y `ARCHIVO/PLUGINS/ONTOLOGY_EDITOR/` (datos runtime).

---

### Épica 2: MMCO ARG-Board (SCRIPT-1.21.0)

**SM**: El MMCO define una jerarquía de emergencia (0c→4) que mapea a ARG:

| Nivel MMCO | Equivalente ARG |
|------------|-----------------|
| 0c (BNP) | Teatro vacío (potencial narrativo) |
| 0b (Correlaciones) | Red de handoffs entre actores |
| 0a (Tensores) | Estado actual de partida |
| 1 (Proto-geometría) | Tablero impress.js |
| 2 (Pseudo-tiempo) | Secuencia de turnos (commits) |
| 3 (Espacio-tiempo) | Narrativa consolidada |
| 4 (Materia) | BOE inmutable, personajes |

Propuesta de entregables:

| Artefacto | Formato | Propósito |
|-----------|---------|-----------|
| `arg_coherence_model.xml` | XML | Ontología MMCO aplicada a ARG |
| `phi_arg.py` | Python | Métrica de coherencia Φ_ARG |
| `emergence_layers_arg.md` | Markdown | Documentación de capas ARG |

---

### Épica 3: MMCO Editor Transmedia (SCRIPT-1.23.0)

**SM**: Esta es la aplicación más ambiciosa: modelar el Scriptorium como **sistema de producción de coherencia**.

| Nivel MMCO | Equivalente Editor Transmedia |
|------------|-------------------------------|
| 0c (BNP) | ARCHIVO como plenum de conocimiento (marco, diagnóstico, justificación) |
| 0b (Correlaciones) | Red de agentes (12 core + plugins) y sus handoffs |
| 0a (Tensores) | Estado del workspace (git status, backlog, DISCO) |
| 1 (Proto-geometría) | Estructura de proyectos (PROYECTOS/, plugins/) |
| 2 (Pseudo-tiempo) | Sprints Scrum, commits, releases |
| 3 (Espacio-tiempo) | Publicaciones (GH-Pages, docs/) |
| 4 (Materia) | Obras finales (Fundación 12 caps, Teatro, Periódico) |

**PO**: ¿Cómo se relaciona con las 5 Banderas?

**SM**: Las Banderas son **operadores de coherencia** en este modelo:

| Bandera | Función MMCO | Opera sobre |
|---------|--------------|-------------|
| 🔵 Blueflag | Detector de decoherencia epistémica | Verdad/evidencia |
| ⚫ Blackflag | Detector de decoherencia política | Poder/captura |
| 🔴 Redflag | Detector de decoherencia material | Escala/recursos |
| 🟡 Yellowflag | Detector de decoherencia límite | Condiciones/gnosis |
| 🟠 Orangeflag | Detector de decoherencia retórica | Registro/auditorio |

**PO**: Entonces las Banderas son como "métricas Φ parciales" para cada dimensión.

**SM**: Exacto. Podemos definir:
- **Φ_editor** = f(Φ_blue, Φ_black, Φ_red, Φ_yellow, Φ_orange)

Propuesta de entregables:

| Artefacto | Formato | Propósito |
|-----------|---------|-----------|
| `editor_emergence_model.xml` | XML | Jerarquía de emergencia editorial |
| `phi_editor.py` | Python | Métrica compuesta de las 5 banderas |
| `coherence_dashboard.md` | Markdown | Visualización de Φ por proyecto |
| `production_dynamics.xml` | XML | Meta-dinámica de sprints |

**PO**: ¿Esto se integra con el plugin Scrum?

**SM**: Sí. El plugin Scrum opera en el nivel 2 (pseudo-tiempo). Φ_editor puede medir coherencia de un sprint completo.

---

### Épica 4: Integración (SCRIPT-1.22.0)

**SM**: Esta épica conecta los tres modelos con el sistema existente:

1. **@decoherence**: Usar `phi_arg.py` y `phi_editor.py` para validar coherencia
2. **@ox**: Generar documentación desde ontologías XML
3. **@indice**: Actualizar índices DRY con nuevas rutas
4. **5 Banderas**: Mapear a componentes de Φ_editor

**PO**: Importante: no romper nada existente.

**SM**: Correcto. Usaremos feature flags y pruebas antes de integrar.

---

## Riesgos y Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Metamodel demasiado abstracto | Media | Alto | Empezar con 3 agentes piloto |
| MMCO no mapea bien a ARG | Baja | Medio | Consultar documentación MMCO antes de implementar |
| MMCO Editor muy ambicioso | Media | Alto | Definir Φ_editor con solo 3 banderas primero |
| Complejidad de integración | Media | Medio | Épica 4 tiene buffer de tiempo |
| Dependencias Python faltantes | Baja | Bajo | requirements.txt ya existe en MMCO |

---

## Métricas de Éxito

| Métrica | Target | Mínimo Aceptable |
|---------|--------|------------------|
| Agentes modelados en Metamodel | 12 core | 6 core |
| Plugins modelados | 5 principales | 3 principales |
| Dominio ARG modelado | Completo (Teatro, BOE, Personajes...) | Básico (Teatro, BOE) |
| Toy models MMCO ejecutables | 2 (ARG + Editor) | 1 (ARG) |
| Banderas mapeadas a Φ | 5 | 3 (blue, red, black) |
| Tests de coherencia pasando | 100% | 80% |
| Documentación actualizada | Completa | Índices + README |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| OnthologyEditor/metamodel | ✅ Disponible | Contiene metamodel.md |
| OnthologyEditor/MMCO | ✅ Disponible | Contiene toy_models/ |
| Plugin arg-board | ✅ Instalado | 8 agentes, @decoherence |
| Python 3.x | ⚠️ Verificar | Requerido para toy_models |

---

## Cierre

**PO**: Aprobado. Procede con el backlog borrador.

**SM**: Resumen ejecutivo:

> **Sprint 1: Ontología Formal del Scriptorium**
> 
> - **Objetivo**: Formalizar la ontología del Scriptorium usando Metamodel (estructura) y MMCO (dinámica dual: ARG + Editor)
> - **Modelo**: Secuencial con solapamiento (3 semanas, 4 iteraciones)
> - **Épicas**: 
>   - SCRIPT-1.20.0: Metamodel Scriptorium (16 pts) — incluye dominio ARG
>   - SCRIPT-1.21.0: MMCO ARG-Board (8 pts)
>   - SCRIPT-1.23.0: MMCO Editor Transmedia (8 pts)
>   - SCRIPT-1.22.0: Integración (5 pts)
> - **Effort total**: 37 puntos
> - **Innovación clave**: Φ_editor como métrica compuesta de las 5 Banderas + Ontología del dominio ARG
> - **Riesgos principales**: Abstracción excesiva, ambición de Editor Transmedia

Generando backlog borrador...
