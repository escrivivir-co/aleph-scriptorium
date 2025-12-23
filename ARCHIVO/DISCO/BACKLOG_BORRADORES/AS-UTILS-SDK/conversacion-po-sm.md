# Planificación Épica SCRIPT-1.9.0: Conversación PO-SM

> **Fecha**: 2025-12-24
> **Participantes**: Product Owner (PO), Scrum Master (@scrum), Agentes del Scriptorium
> **Contexto**: Integración del submódulo `as-utils-sdk` como punto de fuga para el Teatro

---

## Apertura

**@scrum (SM)**: El Sprint 1 cerró con SCRIPT-1.0.0 al 100%. Ahora integramos el tercer submódulo: `as-utils-sdk.code-workspace`. Este repositorio es el **conector de VibeCoding** (suite madre) con AlephScriptorium en la extensión Arrakis Theater.

**PO**: Correcto. Este repositorio es básicamente **configuración como infraestructura** y **modelos agénticos en ficheros markdown**. Es un punto de fuga para la implementación actual del Teatro que expandirá las capacidades fuera de nuestra codebase.

---

## Análisis del Submódulo

**@ox (Oráculo)**: He inspeccionado `as-utils-sdk/`. Hallazgos clave:

### Estructura del Repositorio

```
as-utils-sdk/
├── .github/
│   ├── copilot-instructions.md    # 232 líneas, arquitectura completa
│   └── chatmodes/                  # Agentes especializados
│       ├── agente-interactivo-mcp.chatmode.md
│       └── agente-operador.chatmode.md
├── theater/                        # Sistema de tracking visual
│   ├── index.html                 # Interfaz Matrix en tiempo real
│   ├── matrix-theater.css         # Estética cyberpunk verde
│   ├── matrix-theater.js          # Lógica de tracking dinámico
│   ├── mission-state.json         # Estado de 12 pasos + 4 equipos
│   └── api/update-progress.js     # API para reportes de progreso
├── vibe-bitacora/                  # Bitácoras de sesiones (9 archivos)
├── ARRAKIS_THEATER.md             # Documentación del Teatro
├── ECOSYSTEM_OVERVIEW.md          # Arquitectura Mermaid del ecosistema
├── MAESTRO_CEREMONIAS.md          # Teleprompter para conductor (328 líneas)
├── MAPA_MISION_RETRO.md           # Itinerario visual
├── RELATO_CANONICO_OASIS42.md     # Historia del Camino del Héroe
├── RETRO_FRAMEWORK.md             # Sistema de orquestación de agentes
└── ArrakisTheater_OperaConfig.json # Configuración de la ópera
```

### Conceptos Clave Detectados

1. **Framework Retro v0.5**: Sistema de navegación y orquestación de expediciones
2. **Infraestructura MCP**: Zeus (3012) → SLMo42 (4001) → MCPGaia (3003)
3. **4 Astilleros**: Backend, Frontend, Integration, Validation
4. **Monomito de 12 pasos**: Coincide exactamente con nuestra estructura del Teatro
5. **Agentes de las Sombras**: Indra, Zeus-Architect, SLMo42-Agent
6. **Maestro de Ceremonias**: Conductor de sesiones de hacklab

---

## Ronda de Agentes: ¿Cómo sacar provecho?

### 🐂 @ox (Meta)

**Ox**: Veo oportunidades de **sincronización ontológica**:

1. El `mission-state.json` tiene la misma estructura de 12 etapas que nuestro monomito. Podemos **sincronizar BOE ↔ mission-state**.

2. Los chatmodes (`agente-operador`, `agente-interactivo-mcp`) son equivalentes funcionales a nuestros agentes. Propongo un **mapeo de equivalencias**.

3. La taxonomía de 4 Astilleros (Backend, Frontend, Integration, Validation) es paralela a nuestras 5 Banderas:
   - Astillero Backend ≈ @redflag (estructura material)
   - Astillero Frontend ≈ @orangeflag (registro/interfaz)
   - Astillero Integration ≈ @blueflag (evidencia/conexión)
   - Astillero Validation ≈ @revisor (coherencia)

**Sacrificio**: Hay que decidir si mantenemos dos ontologías paralelas o unificamos.

---

### 🟢 @aleph (UI/Producción)

**Aleph**: Este submódulo resuelve un problema que teníamos: **el Teatro no tenía runtime real**. Era estático (Jekyll/impress.js). Con `as-utils-sdk`:

1. **Interfaz Matrix**: El `theater/index.html` es un visualizador en tiempo real que podemos usar como alternativa a impress.js.

2. **API de progreso**: `api/update-progress.js` permite actualizar el estado de la misión programáticamente.

3. **Teleprompter**: El `MAESTRO_CEREMONIAS.md` es exactamente lo que necesitamos para el handoff `@plugin_ox_teatro → Teatro` cuando hay sesiones en vivo.

**Propuesta**: Exponer la interfaz Matrix como opción alternativa al visualizador impress.js. `docs/teatro/{obra}/matrix/` → runtime dinámico.

---

### 🔵 @blueflag (Verdad/Evidencia)

**Blueflag**: Audito la **falsificabilidad** de la integración:

1. ✅ **Evidencia positiva**: El repositorio tiene servicios reales corriendo en puertos (3003, 3012, 4001). No es vaporware.

2. ⚠️ **Dependencia externa**: Requiere infraestructura MCP que no controlamos. ¿Qué pasa si Zeus no está corriendo?

3. ✅ **Protocolos de health check**: `agente-operador.chatmode.md` documenta validación de salud de servicios.

**Tests que propongo**:
- Test de disponibilidad: ¿Los puertos responden?
- Test de fallback: ¿El Teatro degrada graceful si MCP no está?
- Test de sincronización: ¿BOE y mission-state se mantienen coherentes?

---

### ⚫ @blackflag (Poder/Sombras)

**Blackflag**: Analizo los **riesgos de captura**:

1. **Dependencia de VibeCoding**: Este submódulo nos ata al ecosistema externo. Si VibeCoding cambia de dirección, quedamos huérfanos.

2. **Agentes de las Sombras (Indra, Zeus-Architect, SLMo42-Agent)**: Son poderosos pero opacos. ¿Quién audita sus decisiones?

3. **Puertos abiertos**: 3003, 3012, 4001 son superficie de ataque.

**Defensas que propongo**:
- Capa de abstracción: Nunca invocar directamente los servicios externos. Siempre vía nuestros bridges.
- Documentar la cadena de confianza.
- Fallback offline: El Teatro debe funcionar sin conexión a MCP.

---

### 🔴 @redflag (Estructura/Escala)

**Redflag**: Audito la **viabilidad material**:

1. **Infraestructura requerida**: 3 servicios (Zeus, SLMo42, MCPGaia) + GPU para SLMo42. Es pesado.

2. **Escala**: El sistema está pensado para hackerspaces presenciales. ¿Escala a asíncrono?

3. **4 equipos simultáneos**: El `mission-state.json` soporta 4 equipos. ¿Suficiente?

**Propuesta de enforcement**:
- Modo ligero: Teatro sin backend MCP (solo impress.js)
- Modo completo: Teatro con backend MCP (runtime Matrix)
- El usuario elige según recursos disponibles

---

### 🟡 @yellowflag (Límites/Inconmensurabilidad)

**Yellowflag**: Audito los **límites del diseño**:

1. **Pre/Trans**: El Framework Retro usa narrativa épica (Isaac, Capitán Didac, Oasis42). ¿Infantiliza o inspira?

2. **Traducción forzada**: El monomito de 12 etapas es una estructura narrativa, no una arquitectura técnica. Cuidado con forzar la metáfora.

3. **Lo que escapa**: La pregunta "¿cuál es la pregunta si 42 es la respuesta?" es irreducible. No la resolvamos técnicamente.

**Recomendación**: Mantener la narrativa como **puerta de entrada** pero no como **arquitectura obligatoria**. El usuario que no quiera el "Camino del Héroe" puede usar el Teatro en modo raw.

---

### 🟠 @orangeflag (Registro/Retórica)

**Orangeflag**: Audito el **registro** del material:

1. **Modo**: El `MAESTRO_CEREMONIAS.md` es claramente **retórico-epidíctico** (celebra valores, inspira acción). Apropiado para sesiones en vivo.

2. **Auditorio**: "Navegantes, desarrolladores, arquitectos de código" — comunidad técnica con sensibilidad narrativa.

3. **Estilo**: Cyberpunk, Matrix, épica naval. Coherente internamente pero muy específico.

**Riesgo**: El registro puede alienar a usuarios que buscan productividad sin narrativa. 

**Propuesta**: Ofrecer dos modos de documentación:
- **Modo épico**: Camino del Héroe, Oasis42, Isaac
- **Modo técnico**: Puertos, APIs, scripts

---

### 📰 @periodico (Comunicación)

**Periodico**: Veo oportunidad de **cobertura noticiera**:

1. Los "Hacklabs #5" son eventos publicables. Podemos generar noticias post-sesión.

2. El `RELATO_CANONICO_OASIS42.md` es material para crónica literaria.

3. La pregunta del 42 es un gancho periodístico excelente.

**Propuesta**: Nuevo handoff `@periodico → generar crónica de hacklab`.

---

### 🎭 @plugin_ox_teatro (Teatro)

**Teatro**: Este submódulo es **mi punto de fuga**:

1. Actualmente genero páginas estáticas (Jekyll + impress.js).
2. Con `as-utils-sdk` puedo:
   - Delegar runtime a la interfaz Matrix
   - Sincronizar con `mission-state.json`
   - Usar el Maestro de Ceremonias para sesiones en vivo

**Nueva capacidad**: `Teatro.ejecutar(obra, modo: "matrix")` → Lanza interfaz Matrix con tracking en tiempo real.

---

## Síntesis

**@scrum (SM)**: Resumo las conclusiones:

### Oportunidades principales

1. **Runtime dinámico**: Matrix Theater como alternativa a impress.js estático
2. **Sincronización BOE ↔ mission-state**: Fuente de verdad compartida
3. **Modo híbrido**: Ligero (sin MCP) y completo (con MCP)
4. **Sesiones en vivo**: Maestro de Ceremonias como teleprompter
5. **Mapeo de agentes**: Astilleros ↔ Banderas

### Riesgos a mitigar

1. Dependencia de infraestructura externa
2. Superficie de ataque (puertos)
3. Registro muy específico (alienación)
4. Forzamiento narrativo

### Decisiones pendientes

1. ¿Mantenemos dos ontologías o unificamos?
2. ¿El modo Matrix requiere backend o puede funcionar standalone?
3. ¿Cómo exponemos el Maestro de Ceremonias en el flujo del Teatro?

---

## Próximos pasos

**PO**: Apruebo la integración. Procedemos con:

1. ✅ Submódulo añadido con rama `integration/beta/scriptorium`
2. ⏳ Crear épica SCRIPT-1.9.0 en backlog
3. ⏳ Definir stories para integración
4. ⏳ Publicar esta conversación como referencia

---

## Anexo: Mapeo Ontológico Preliminar

| as-utils-sdk | Scriptorium | Notas |
|--------------|-------------|-------|
| Astillero Backend | @redflag | Infraestructura, puertos |
| Astillero Frontend | @orangeflag | UI/UX, registro |
| Astillero Integration | @blueflag | Conexiones, evidencia |
| Astillero Validation | @revisor | Coherencia, tests |
| Agente Operador | @aleph | Orquestación |
| Agente Interactivo MCP | @plugin_ox_mcppresets | Gestión de presets |
| Maestro Ceremonias | @plugin_ox_teatro | Conductor de sesiones |
| mission-state.json | BOE | Estado del teatro |
| 12 steps | Monomito | Estructura narrativa |
| Matrix Theater | docs/teatro/{obra}/matrix/ | Runtime alternativo |
