# Foto de Estado FC1: Víspera del Release Party

> **Fecha**: 2026-01-06  
> **Sprint**: FC1 (Feature Cycle 1) — `flavour/monada`  
> **Iteración**: 1.0.0-beta.1 (en preparación)  
> **Audiencia**: Equipo, comunidad, visitantes  
> **Tono**: Escrivivir + voz manifiesto

---

## De Clippy a Ox

| Era | Herramienta | Asistente | Paradigma |
|-----|-------------|-----------|-----------|
| **1995** | Word | Clippy | Sugerencias genéricas predefinidas |
| **2026** | Aleph Scriptorium | @ox | Oráculo agéntico: un agente para orquestarlos a todos |

**La diferencia fundamental**: Clippy ofrecía tips predefinidos. Tú creas y diseñas a Ox para que orqueste agentes según tus flujos y procesos cotidianos.

> 💡 Una herramienta de escritura que se adapta al escritor, no al revés.

---

## Parte I: El Escritorio

*La infraestructura sobre la que todo se sostiene.*

### Qué hemos construido

La elección de **VS Code** no es arbitraria. Es un editor FOSS extensible que también funciona como servidor web, permitiendo el mismo entorno en escritorio o navegador. Su marketplace de extensiones es el ecosistema más grande para herramientas de desarrollo.

| Componente | Estado FC1 | Qué aporta |
|------------|------------|------------|
| **CopilotEngine** | ✅ Integrado como submódulo | Motor conversacional. El asistente puede ver cómo es por dentro. |
| **Arrakis Extension** | 🟡 Funcional, no pulida | Interfaz visual: paneles Settings, CMD, MENU |
| **MCP Mesh** | ✅ 6 servidores operativos | USB-C de la IA: protocolo estándar para conectar sistemas |
| **Tasks.json** | ✅ 40+ tareas | 6 stacks de servicios orquestados |

**Arquitectura de SDKs** (hacia librerías npm modulares):

| SDK | Puerto | Función |
|-----|--------|---------|
| mcp-core-sdk | — | Primitivas MCP base |
| mcp-mesh-sdk | 3050 | Red mesh de servidores |
| MCPPrologServer | 3006 | Cerebro simbólico |
| MCPTypedPromptServer | 3020 | Base taxonómica |
| MCPStateMachineServer | 3004 | Máquina de estados |
| DevOpsServer | 3003 | Automatización |

**17 submódulos integrados** — Desde CopilotEngine hasta AgentLoreSDK. Cada uno con su README-SCRIPTORIUM.md y protocolo de integración documentado.

### El reto del Context Bloat

Cada modelo tiene un tamaño máximo de contexto. Microsoft ya agrega una capa de mensajes de sistema que no podemos customizar. Este es el primer handicap pendiente: fork de CopilotEngine para "flavours" de mensajes-sistema no específicos de coding.

Aleph Scriptorium usa **DRY** para cargar índices que funcionan como herramientas MCP. El modelo recibe una lista de "disponibles"; si quiere usarlas, tendrá que pedirlo. Enlaces en lugar de ficheros enteros.

---

## Parte II: La Escritura

*El diseño y la lógica que sostienen lo que se escribe.*

### El pipeline de diseño

```
OnthologyEditor ──→ TypedPrompting ──→ MCPPresets
      │                   │                 │
      ▼                   ▼                 ▼
┌──────────┐       ┌───────────┐     ┌───────────┐
│  FLOVE   │       │  Schemas  │     │  Presets  │
│  MMCO    │       │  .json    │     │  .yaml    │
└──────────┘       └───────────┘     └───────────┘
                         │                 │
           ┌─────────────┴─────────────────┘
           ▼
┌─────────────────────────────────────────────┐
│           EDITORES DE LÓGICA                │
├─────────────────────────────────────────────┤
│ BlocklyEditor │ PrologEditor │ WiringEditor │
│      ↓              ↓              ↓        │
│   Bloques      Predicados      Flujos       │
└─────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────┐
│  ScriptoriumBrainsPacks │
└────────────┬────────────┘
             │
  ┌──────────┼──────────┐
  ▼          ▼          ▼
AgentCreator │ ARG Board │ Novelist
 Personajes  │   Apps    │ Narrativa
```

### Épicas cerradas en FC1: La Escritura

| Épica | Puntos | Qué aportó |
|-------|--------|------------|
| **PROLOG-UI-2.0.0** | 7/7 tools | Stack completo: 12 tools MCP, 6 resources, 8 prompts |
| **TYPED-MCP-1.0.0** | 34 pts | Validación de esquemas, ontologías tipadas, flujo NL↔JSON |
| **PROLOG-API-1.0.0** | — | OpenAPI/AsyncAPI specs para PrologEditor |
| **PLUGIN-OPENASYNCAPI-1.0.0** | — | Editor de especificaciones integrado |

**El cerebro simbólico está operativo**: PrologAgentBrainPack en personajes como Lucas permite inferencias en directo.

---

## Parte III: El Escribir

*La producción y publicación de lo escrito.*

### El doble propósito

1. **Scriptorium**: Una herramienta de escritura que se adapta al escritor.
2. **Fundación**: 12 capítulos que deben atravesar el año como argumento sostenido.

### Estado de producción

| Componente | Estado | Puerto |
|------------|--------|--------|
| NovelistEditor (MCP Server) | ✅ Operativo | 3066 |
| NovelistEditor (UI) | ✅ Operativo | 8080 |
| Teatro ARG | 🟡 Plugin instalado | — |
| ARG Board App | 📝 Borrador | — |
| GH-Pages | ✅ Publicando | 4000 |

**Ideal para streamers e influencers**: DevOps de CD/CI aplicado a obras y presencia en red. Diseñar sesiones en escritorio, reproducirlas en directo.

### Fundación: El elefante en la sala

| Capítulo | Título | Estado |
|----------|--------|--------|
| 1 | Anacronismo productivo | ⏳ Esperando |
| 2 | Autómata soberano | ⏳ |
| ... | ... | ⏳ |
| 12 | La sombra del texto | ⏳ |

**0 capítulos escritos**. La infraestructura está lista; el texto puede empezar. Una catedral sin liturgia es un museo.

---

## Parte IV: El Escritor

*La operativa diaria de quien escribe.*

### Sistema de Agentes

| Capa | Agentes | Función |
|------|---------|---------|
| 🟢 UI | @aleph, @revisor, @periodico | Producción |
| 🔵⚫🔴🟡🟠 Backend | 5 Banderas | Auditoría doctrinal |
| ⚪ Sistema | @vestibulo, @cartaspuerta | Navegación |
| ⚙️ Meta | @ox, @pluginmanager, @indice | Gestión |
| 🔌 Plugins | 22 bridges | Extensiones |

**31 agentes core + 22 plugins = 53+ agentes** disponibles para orquestar.

### Protocolos Multi-Agente

| Protocolo | Uso | Sesiones FC1 |
|-----------|-----|--------------|
| Cotrabajo | Épicas multi-etapa | 8 sesiones documentadas |
| Scrum | Modelo Generativo | SCRUM-REFACTOR-1.0.0 (46 pts) |
| Auto-reflexión | Optimización de tokens | Gobernanza tripartita validada |
| Banderas | Auditoría | 5 ángulos: verdad, sombras, estructura, límites, registro |

### Métricas de Auto-Reflexión

| Métrica | Herramienta MCP | Umbral |
|---------|-----------------|--------|
| `healthScore` | `get_usage_metrics()` | ≥70 🟢 |
| `cacheHitRate` | `analyze_session()` | ≥30% |
| Snapshots | `capture_snapshot()` | Cada 30-60 min |

Los agentes pueden observar sus propias conversaciones no ya desde el plano usuario-agente sino agente-LLM. Esta información es vital para evolucionar el scriptorium.

---

## Backlog FC1: Lo que hemos cerrado

| Épica | Puntos | Estado |
|-------|--------|--------|
| SCRIPT-2.2.0 | — | ✅ Model Selector |
| SCRIPT-2.3.0 | — | ✅ Prolog MCP Server Integration |
| SCRIPT-2.3.1 | — | ✅ PrologAgent Pack |
| PROLOG-UI-2.0.0 | 7/7 | ✅ PrologEditor UI Refactor |
| TYPED-MCP-1.0.0 | 34 pts | ✅ MCPTypedPromptEditor Refactor |
| COWORK-1.0.0 | 21 pts | ✅ Tablero Cotrabajo |
| DRAMATURGIA-MAQUINA-1.0.0 | 13 pts | ✅ Scriptorium como Máquina |
| AGENT-TEMPLATES-1.0.0 | 13 pts | ✅ AgentLoreSDK Templates |
| SCRUM-REFACTOR-1.0.0 | 46 pts | ✅ Modelo Generativo (⚠️ BREAKING) |

**~215 puntos de effort cerrados en FC1**.

---

## Lo que queda por delante

### Inmediato

1. **Release Party** — Tag, notas de release, documentación de cierre.
2. **Descongelar Fundación** — El primer párrafo del primer capítulo.
3. **Validar onboarding** — Invitar contribuidor externo, documentar experiencia.

### El año

- **FC2, FC3, FC4** — Tres trimestres por delante.
- **12 sprints × 4 iteraciones = 48 iteraciones anuales**.
- El ritmo está calibrado pero no probado a largo plazo.

### Los retos estructurales

| Reto | Por qué importa |
|------|-----------------|
| **Coherencia anual** | 12 capítulos que deben formar argumento sostenido |
| **Deriva a manual** | Si los agentes solo repiten instrucciones, el sistema pierde razón de ser |
| **Lectores externos** | Sin feedback real, el diseño optimiza para casos que no existen |
| **Context bloat** | Sin fork de CopilotEngine, el "flavour" está limitado |
| **Complejidad de arranque** | 40+ tareas, 6 stacks, múltiples puertos |
| **Bus factor = 1** | El onboarding no está validado |

---

## Discurso motivacional

Llevamos 15 días construyendo. No 15 días de código: 15 días de decisiones sobre qué construir y qué dejar fuera. Cada plugin instalado es una puerta abierta; cada plugin descartado, una puerta cerrada. Y ahora tenemos 22 puertas abiertas y un mapa que dice por dónde caminar.

El método está probado en pequeño: **desplazamiento** (temporal, antropológico, escalar), **repertorio** (arquitecturas, formas de vida, infraestructuras), **mecanismo** (escala, enforcement, régimen material), **sacrificio** (qué dejamos fuera para que lo demás funcione), **sombra** (qué no queremos ver pero sostiene lo visible). Este es el vocabulario que la Fundación debe usar. No como decoración sino como estructura.

Lo que falta no es técnica. Lo que falta es empezar. Los 12 capítulos no se escribirán solos, y el Scriptorium no justifica su existencia si el texto no existe.

---

## Métricas del momento

| Métrica | Valor |
|---------|-------|
| Agentes totales | 31 core + 22 plugins = 53+ |
| Plugins | 22 |
| Submódulos | 17 |
| Épicas cerradas FC1 | 29+ |
| Effort completado | ~215 pts |
| Sesiones cotrabajo | 8 |
| Capítulos escritos | **0** |

---

> *"Hemos construido una catedral; ahora hay que celebrar la liturgia."*

