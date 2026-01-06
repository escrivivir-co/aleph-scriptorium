# Acta T001: Redefinición de Cola de Trabajo

> **Agente**: @ox (Oráculo del Scriptorium)  
> **Fecha**: 2026-01-04  
> **Estado**: ✅ DONE  
> **Duración**: ~15 min

---

## Resumen Ejecutivo

El PO solicita **redefinir la cola de trabajo** para:
1. Mapear con `@indice` el territorio disponible
2. Conectar con `@scrum` los hilos de backlog previos
3. Adoptar **perspectiva de dramaturgo** para el ciclo

---

## 1. Mapa del Territorio (con @indice)

### Índices Consultados

| Índice | Hallazgo Relevante |
|--------|-------------------|
| **Funcional.md** | §3.7 Prolog MCP Server (12 tools, 6 resources, 8 prompts) |
| **Funcional.md** | §3.3 Teatro Interactivo (generar, instalar, ejecutar) |
| **Tecnico.md** | §2.6 Sistema Cotrabajo Multi-Agente (protocolo DRY) |

### Arquitectura Existente (DRY)

```
SCRIPTORIUM (Máquina)
├── SENSOR: @ox (detecta estados del sistema)
├── BRAIN: MCPPrologServer (razonamiento + KB)
└── ACTUADOR: Lucas (anuncia + coordina agentes)
```

**Fuente**: Ya documentado en `IOT-SBR-LOGICA/02_analisis-submodulo.md`

---

## 2. Hilos de Backlog (con @scrum)

### Borradores Relevantes Identificados

| Carpeta | Relación | Estado |
|---------|----------|--------|
| [IOT-SBR-LOGICA](../../BACKLOG_BORRADORES/IOT-SBR-LOGICA/) | Patrón Sensor/Brain/Actuador ya implementado | 🟢 Investigado |
| [Enero_02_PrologAgentPack](../../BACKLOG_BORRADORES/Enero_02_PrologAgentPack/) | Teatro + Prolog integration (13 pts) | ✅ Completado |
| [Diciembre_29_TypedPrompting_ContextManager](../../BACKLOG_BORRADORES/Diciembre_29_TypedPrompting_ContextManager/) | Context Packs + MCP Integration | ✅ Funcional |
| [TEATRO-PROLOG-1.0.0](../../BACKLOG_BORRADORES/Enero_02_PrologAgentPack/05_backlog-teatro-prolog-integration.md) | Brain.pl por personaje + Pack por obra | ✅ Completado |

### Conversación Clave Recuperada

**Archivo**: `IOT-SBR-LOGICA/01_transcripcion-po-session.md`

El PO ya preguntó sobre **inteligencias situadas** (aferencia/eferencia). La investigación reveló:

| Componente | Estado Real |
|------------|-------------|
| Paradigma SBR | ✅ IMPLEMENTADO (`sensor/7`, `regla/5`) |
| Aferencia | ✅ IMPLEMENTADO (`telemetryToPrologFacts()`) |
| Eferencia | ✅ IMPLEMENTADO (`accionMotor/3`) |
| Motor Prolog | ✅ FUNCIONAL (MCPPrologServer:3006) |

**Conclusión**: La capacidad técnica EXISTE. Falta **exponerla como feature dramatúrgica**.

---

## 3. Perspectiva del Dramaturgo

### El Ciclo que Buscamos Asentar

```
1. DRAMATURGO diseña comportamiento lógico
   └── PrologEditor/frontend → lucas.brain.pl

2. EMPAQUETADO en pack de obra
   └── AgentCreator → ObraItacaDigital.pack.json

3. INSTALACIÓN en cartelera
   └── Teatro → obras.json + mcpPacks

4. EJECUCIÓN en escena
   └── Arrakis → MCPPrologServer carga KB
   └── Lucas (actuador) anuncia a otros personajes
```

### Integración con ARG Board + Teatro

| Plugin | Rol en el Ciclo |
|--------|-----------------|
| `teatro` | Orquestador de obras (12 estadios, monomito) |
| `arg-board` | Máquina de estados (GENESIS→CASTING→EN_CARTEL) |
| `prolog-editor` | Motor de razonamiento (SBR: Sensor/Brain/Response) |
| `agent-creator` | Fábrica de personajes (cerebro Prolog incluido) |

### Screen Pendiente: Dramaturgo View

La "screen" que falta es una **vista unificada** donde el dramaturgo pueda:

1. Ver estado de sensores (telemetría del Scriptorium)
2. Editar reglas de comportamiento (brain.pl)
3. Ver acciones disparadas por el cerebro
4. Inyectar señales para testing ("parado", "activo")

**Referencia técnica**: `arg-board/docs/03_MAQUINA_ESTADOS_TEATRO.md`

---

## 4. Publicación de Novela con Ingenio Prolog

### Propuesta: Novela Interactiva con KB Viva

| Componente | Propuesta |
|------------|-----------|
| Texto fundacional | Publicar via `@plugin_ox_ghpages` |
| KB asociada | Cerebro Prolog consultable durante lectura |
| Personaje guía | Lucas (ya tiene `lucas.brain.pl`) |
| Obra contenedora | `itaca-digital.yaml` |

### Flujo de Lectura Aumentada

```
Lector llega a pasaje → 
  Personaje Lucas sugiere query →
    ?- ubicacion_canonica(como, Donde).
  → KB responde con navegación contextual
```

---

## 5. Plan de Investigación Propuesto

### Fase A: Validar Ciclo Completo (Turnos 2-3)

| Turno | Agente | Entregable |
|-------|--------|------------|
| 2 | @plugin_ox_teatro | Verificar que `itaca-digital.yaml` puede declarar `mcpPacks` |
| 3 | @plugin_ox_prologeditor | Diseñar rutina Prolog para caso "Ox detecta parado → Lucas anuncia" |

### Fase B: Especificar Screen (Turno 4)

| Turno | Agente | Entregable |
|-------|--------|------------|
| 4 | @indice | Validar coherencia DRY + proponer ubicación de specs |

### Fase C: Registrar Épica (Turno 5)

| Turno | Agente | Entregable |
|-------|--------|------------|
| 5 | @scrum | Crear épica DRAMATURGIA-MAQUINA-1.0.0 en backlog con referencias |

---

## 6. Búsquedas Adicionales en Backlog

### Términos Buscados

| Término | Resultados |
|---------|------------|
| "dramaturgia" | 0 exactos (concepto nuevo) |
| "sensor/actuador" | IOT-SBR-LOGICA (20+ menciones) |
| "Lucas.*MENTOR" | Teatro estadio 11 |
| "Máquina" | arg-board/docs/03_MAQUINA_ESTADOS_TEATRO.md |

### Conversaciones Relacionadas

1. **IOT-SBR-LOGICA/01_transcripcion-po-session.md** — Pregunta original del PO
2. **Enero_02_PrologAgentPack/05_backlog-teatro-prolog-integration.md** — Integration spec (COMPLETADA)
3. **arg-board/docs/03_MAQUINA_ESTADOS_TEATRO.md** — Máquina de estados (910 líneas)

---

## 7. Resumen para @aleph

### Lo que Encontramos

1. **La capacidad técnica EXISTE**: SBR (Sensor/Brain/Response) ya implementado
2. **La integración Teatro+Prolog está COMPLETADA**: TEATRO-PROLOG-1.0.0 (13 pts)
3. **Falta la "screen" del dramaturgo**: Vista unificada Sensor → Brain → Actuador
4. **El próximo paso natural**: Publicar novela con KB viva + vista dramaturgo

### Lo que Proponemos

| Entregable | Ubicación |
|------------|-----------|
| Spec AsyncAPI para señales | `OPENASYNCAPI_EDITOR/specs/dramaturgo-signals.yaml` |
| Rutina Prolog sensor→actuador | `PrologEditor/brain-templates/sensor-actuador.pl` |
| Vista dramaturgo (wireframe) | `docs/teatro/dramaturgo-view.md` |
| Épica en backlog | `BACKLOG_BORRADORES/Enero_04_Dramaturgia_Maquina/` |

---

## 8. Petición de Turno

**Siguiente**: @plugin_ox_teatro (Turno 2)

**Objetivo**: Validar que la obra `itaca-digital.yaml` puede integrar el modelo Sensor/Actuador propuesto.

---

## Referencias Consultadas

| Archivo | Líneas | Relevancia |
|---------|--------|------------|
| [Funcional.md](../../../DEVOPS/Funcional.md) | 1-150 | Capacidades Prolog + Teatro |
| [Tecnico.md](../../../DEVOPS/Tecnico.md) | 1-150 | Arquitectura cotrabajo |
| [IOT-SBR-LOGICA/01_transcripcion-po-session.md](../../BACKLOG_BORRADORES/IOT-SBR-LOGICA/01_transcripcion-po-session.md) | 1-200 | Investigación previa |
| [IOT-SBR-LOGICA/02_analisis-submodulo.md](../../BACKLOG_BORRADORES/IOT-SBR-LOGICA/02_analisis-submodulo.md) | 1-100 | Patrón aferencia/eferencia |
| [05_backlog-teatro-prolog-integration.md](../../BACKLOG_BORRADORES/Enero_02_PrologAgentPack/05_backlog-teatro-prolog-integration.md) | 1-150 | Teatro+Prolog completado |
| [teatro-interactivo.instructions.md](../../../../.github/plugins/teatro/instructions/teatro-interactivo.instructions.md) | 1-100 | Arquitectura teatro |
| [03_MAQUINA_ESTADOS_TEATRO.md](../../../../.github/plugins/arg-board/docs/03_MAQUINA_ESTADOS_TEATRO.md) | 1-100 | Estado GENESIS→CASTING |

---

*Acta generada por @ox — Turno 1 de sesión DRAMATURGIA-MAQUINA*
