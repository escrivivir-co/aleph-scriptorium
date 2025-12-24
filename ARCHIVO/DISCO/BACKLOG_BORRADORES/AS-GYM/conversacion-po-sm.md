# Planificación Épica SCRIPT-1.10.0: Conversación PO-SM

> **Fecha**: 2025-12-24
> **Participantes**: Product Owner (PO), Scrum Master (@scrum), Agentes del Scriptorium
> **Contexto**: Integración del submódulo `as-gym` como repositorio de "almas" para agentes
> **Enfoque**: Integración y orquestación con AGENT_CREATOR, no análisis profundo de FIA

---

## Apertura

**@scrum (SM)**: Integramos el cuarto submódulo: `as-gym`. Este repositorio contiene **lógicas y autómatas** tanto de la lógica clásica como de paradigmas conexionistas y redes neuronales. Se instalará como extensión del plugin AGENT_CREATOR.

**PO**: Correcto. Es un repositorio de **"almas"** para agentes: los fundamentos de inteligencia artificial que dan vida a los personajes. La carpeta clave es `alephscript/src/FIA/`.

**PO (directriz)**: El foco NO es examinar FIA en profundidad ahora. El foco es:
1. **Integrar** as-gym con AGENT_CREATOR
2. **Orquestar** los 4 ingredientes de creación de personajes
3. **Documentar** el protocolo DRY para usuarios
4. **Publicar** en README (técnico) y GH-Pages (usuario)

---

## Análisis Preliminar del Submódulo

**@ox (Oráculo)**: He inspeccionado `as-gym/`. Hallazgos clave:

### Estructura del Repositorio

```
as-gym/
├── alephscript/                    # Core de AlephScript
│   └── src/
│       └── FIA/                    # Fundamentos de Inteligencia Artificial
│           ├── iFIA.ts             # Interfaz base de agente FIA
│           ├── paradigmas/         # Paradigmas de IA
│           │   ├── conexionista/   # Redes neuronales
│           │   ├── logica/         # Lógica clásica
│           │   ├── simbolica/      # IA simbólica
│           │   ├── sbc/            # Sistemas basados en casos
│           │   ├── sbr/            # Sistemas basados en reglas
│           │   ├── situada/        # IA situada
│           │   ├── hibrido/        # Híbridos
│           │   ├── cientifica/     # Método científico
│           │   ├── gramaticas/     # Gramáticas formales
│           │   └── sistemas/       # Teoría de sistemas
│           ├── engine/             # Motor de ejecución
│           │   ├── kernel/         # Núcleo del motor
│           │   ├── onnx/           # Integración ONNX
│           │   └── smartpy/        # SmartPy integration
│           ├── mundos/             # Definición de mundos/entornos
│           ├── agents/             # Agentes predefinidos
│           └── aplicaciones/       # Aplicaciones de ejemplo
├── as-core/                        # Core compartido
├── ws-server/                      # WebSocket server
├── webapp/                         # Aplicación web
└── node-red/                       # Integración Node-RED
```

### Interfaz Base iFIA

```typescript
export interface iFIA {
    i18: IDiccionarioI18;
    nombre: string;
    runAsync: boolean;
    objetivos: Aferencia[];
    mundo: IMundo;
    imprimir: () => string;
    instanciar(): Promise<string>;
    razona: (mundo: IMundo, i: Aferencia) => Eferencia;
    abstrae: (p: IPercepto) => IAprendize;
    cache: IRTCache;
    runState: RunStateEnum;
    bots?: iFIA[];
}
```

### Paradigmas Detectados

| Paradigma | Carpeta | Descripción |
|-----------|---------|-------------|
| **Conexionista** | `paradigmas/conexionista/` | Redes neuronales, deep learning |
| **Lógica** | `paradigmas/logica/` | Lógica proposicional, predicados, modal |
| **Simbólica** | `paradigmas/simbolica/` | IA clásica, manipulación de símbolos |
| **SBC** | `paradigmas/sbc/` | Sistemas basados en casos |
| **SBR** | `paradigmas/sbr/` | Sistemas basados en reglas |
| **Situada** | `paradigmas/situada/` | IA embodied, reactiva |
| **Híbrido** | `paradigmas/hibrido/` | Combinaciones de paradigmas |
| **Científica** | `paradigmas/cientifica/` | Método científico automatizado |
| **Gramáticas** | `paradigmas/gramaticas/` | Gramáticas formales, parsers |
| **Sistemas** | `paradigmas/sistemas/` | Teoría de sistemas |

---

## Propósito de la Integración

### Problema actual

El plugin AGENT_CREATOR crea agentes con:
- **Personalidad**: Basada en agentes base (banderas, auditores)
- **Fuente de conocimiento**: Datos del DISCO

Pero les falta un **motor de razonamiento** formal.

### Solución

Conectar `as-gym/FIA` como biblioteca de "almas":
- Cada agente creado puede tener un **paradigma asignado**
- El paradigma define **cómo razona** el agente
- Integración con ONNX para modelos pre-entrenados

---

## Ronda de Agentes

### 🐂 @ox (Meta)

**Ox**: Veo potencial de **extensión ontológica**:

1. Los paradigmas de FIA pueden mapear a tipos de auditoría:
   - `logica/` → @blueflag (verdad formal)
   - `sbr/` → @blackflag (reglas de poder)
   - `situada/` → @redflag (contexto material)
   - `conexionista/` → @yellowflag (patrones emergentes)
   - `gramaticas/` → @orangeflag (registro, estructura formal)
   - `sbc/` → @revisor (casos precedentes)
   - `simbolica/` → @aleph (producción)
   - `sistemas/` → @redflag secundario (emergencia, escala)

2. La interfaz `iFIA` es compatible con nuestra estructura de agentes.

3. **Propuesta de catálogo**: Crear `fia-catalog.json` en as-gym con metadata de cada paradigma.

---

### 🟢 @aleph (UI/Producción)

**Aleph**: Esto resuelve el problema de **agentes "tontos"**:

1. Actualmente los agentes solo responden con prompts.
2. Con FIA pueden tener **lógica interna** que persiste entre sesiones.
3. El campo `mundo: IMundo` es equivalente a nuestro ARCHIVO.

**Propuesta**: Refactorizar AGENT_CREATOR para los **4 ingredientes**:

```
1. Agentes Base (metodología) — YA EXISTE
2. Fuentes de Datos (conocimiento) — YA EXISTE  
3. Paradigmas FIA (razonamiento) — NUEVO
4. Presets MCP (herramientas) — NUEVO (via mcp-presets)
```

---

### 🔵 @blueflag (Verdad/Evidencia)

**Blueflag**: Audito la **evidencia de la propuesta**:

1. ✅ El catálogo FIA es **verificable**: cada paradigma tiene carpeta real en as-gym.
2. ✅ El protocolo de 4 ingredientes es **falsificable**: se puede probar creando un agente.
3. ⚠️ **Riesgo**: El usuario podría no entender qué paradigma elegir.

**Mitigación**: Tabla de afinidades paradigma ↔ bandera para guiar la elección.

---

### ⚫ @blackflag (Poder/Sombras)

**Blackflag**: Audito los **modos de fracaso**:

1. **Complejidad**: 4 ingredientes puede abrumar al usuario.
   - Mitigación: Hacer ingredientes 3 y 4 opcionales.
2. **Captura por expertos**: Solo usuarios técnicos usarían FIA.
   - Mitigación: Referencia rápida con ejemplos de combinaciones comunes.
3. **Dependencia de as-gym**: Si el submódulo falla, falla la creación.
   - Mitigación: El agente funciona sin FIA (es opcional).

---

### 🔴 @redflag (Estructura/Viabilidad)

**Redflag**: Audito la **viabilidad material**:

1. ✅ **Catálogo FIA**: JSON estático, no requiere runtime.
2. ⚠️ **Paradigmas TypeScript**: Requieren compilación para ejecutar.
   - Para MVP: Solo usamos metadata, no ejecutamos código FIA.
3. ✅ **Presets MCP**: Plugin ya instalado y funcional.

**Veredicto**: El MVP es viable si:
- El catálogo es metadata consultable (no runtime)
- Los paradigmas se "anotan" en el agente pero no se ejecutan aún
- Fase 2 puede añadir ejecución real

---

### 🟡 @yellowflag (Límites)

**Yellowflag**: Audito los **límites del diseño**:

1. ⚠️ **Pre-teórico**: Algunos paradigmas (`conexionista`) son cajas negras.
   - Aceptar: Marcar `nivel_madurez` en catálogo.
2. ⚠️ **Inconmensurabilidad**: No todos los paradigmas combinan bien.
   - Aceptar: Documentar combinaciones recomendadas y anti-patterns.
3. ⚠️ **Condiciones vs contenido**: El paradigma define el *cómo*, no el *qué*.
   - Correcto: El contenido viene de las fuentes de datos.

---

### 🟠 @orangeflag (Registro)

**Orangeflag**: Audito el **registro de la documentación**:

1. **Auditorio dual**: Técnicos (README) vs usuarios finales (GH-Pages).
   - Separar documentación: README detallado, GH-Pages accesible.
2. **Género deliberativo**: La documentación invita a actuar (crear agentes).
   - Usar ejemplos concretos, CTAs claros.
3. **Claridad**: Los 4 ingredientes deben ser inmediatamente comprensibles.
   - Usar metáfora: "receta de cocina" con ingredientes.

---

### 🔌 @plugin_ox_mcppresets (MCP-Presets)

**McpPresets**: Confirmo integración:

1. ✅ El campo `mcp_presets` en recipes ya está soportado en mi schema.
2. ✅ Puedo listar presets disponibles vía `catalog.json`.
3. ✅ La asignación a agentes es mi handoff principal.

**Acción**: AGENT_CREATOR invocará mi prompt `listar-presets` en el paso 4.

---

## Síntesis de la Ronda

**@scrum (SM)**: Consenso alcanzado. La épica se enfoca en **integración y orquestación**, no en análisis profundo de FIA.

### Decisiones clave

| Decisión | Justificación |
|----------|---------------|
| Catálogo FIA como JSON estático | Evita dependencia de runtime TypeScript |
| Ingredientes 3-4 opcionales | No abrumar al usuario novato |
| Afinidad paradigma ↔ bandera | Guía la elección sin ser prescriptivo |
| MVP sin ejecución de FIA | Fase 2 puede añadir runtime |
| Documentación dual | README técnico + GH-Pages accesible |

### Los 4 Ingredientes (Protocolo DRY)

```
┌─────────────────────────────────────────────────────────────────────┐
│                 PROTOCOLO DE CREACIÓN DE PERSONAJE                   │
│                         (4 Ingredientes DRY)                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   1. METODOLOGÍA (obligatorio)                                       │
│   └─ Agente(s) base: @yellowflag, @blueflag, @blackflag...           │
│                                                                       │
│   2. CONOCIMIENTO (obligatorio)                                      │
│   └─ Fuente(s) de datos: DISCO/, ARCHIVO/, ENCICLOPEDIA/             │
│                                                                       │
│   3. RAZONAMIENTO (opcional)                                         │
│   └─ Paradigma(s) FIA: logica, sbr, conexionista...                  │
│                                                                       │
│   4. HERRAMIENTAS (opcional)                                         │
│   └─ Preset(s) MCP: web-search, playwright...                        │
│                                                                       │
│   = PERSONAJE con receta reproducible                                 │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Próximos Pasos

**PO**: Apruebo el enfoque. Proceder con:

1. ✅ Submódulo añadido con rama `integration/beta/scriptorium`
2. ⏳ **Crear catálogo FIA** (`fia-catalog.json`) con metadata de 10 paradigmas
3. ⏳ **Extender schema de recipe** con campos `fia_paradigmas` y `mcp_presets`
4. ⏳ **Refactorizar prompt `crear-agente.prompt.md`** con flujo de 4 ingredientes
5. ⏳ **Actualizar instructions** con protocolo DRY
6. ⏳ **Documentar en README** (técnico)
7. ⏳ **Crear página en GH-Pages** (usuario)

---

## Backlog Borrador

> **Ubicación**: `02_backlog-sprint-asgym.md` en esta misma carpeta.

El borrador contiene:
- 4 iteraciones (Catálogo, Extensión, Protocolo DRY, Documentación)
- 9 stories
- 42 tasks
- 34 puntos de effort

---

## Anexo: Información del Submódulo

| Campo | Valor |
|-------|-------|
| **Repositorio** | https://github.com/escrivivir-co/as-gym |
| **Rama origen** | `dev/001` |
| **Rama integración** | `integration/beta/scriptorium` |
| **Carpeta local** | `as-gym/` |
| **Tamaño** | ~27 MB |
| **Último commit** | `ff143fa` - "start to customize server port" |

---

## Anexo: Arquitectura Integrada (Target)

```
┌─────────────────────────────────────────────────────────────────────┐
│                         AGENT_CREATOR v2.0                           │
│                    (Plugin de Creación de Agentes)                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   ┌───────────────┐   ┌───────────────┐   ┌───────────────┐          │
│   │ 1. AGENTES    │   │ 2. FUENTES    │   │ 3. FIA        │          │
│   │    BASE       │   │    DATOS      │   │    PARADIGMAS │          │
│   │               │   │               │   │               │          │
│   │ .github/      │   │ DISCO/        │   │ as-gym/       │          │
│   │ agents/       │   │ ARCHIVO/      │   │ fia-catalog   │          │
│   │               │   │ ENCICLOPEDIA/ │   │ .json         │          │
│   └───────┬───────┘   └───────┬───────┘   └───────┬───────┘          │
│           │                   │                   │                   │
│           └───────────────────┼───────────────────┘                   │
│                               │                                       │
│                               ▼                                       │
│                   ┌───────────────────────┐                          │
│                   │  RECIPE (JSON)        │                          │
│                   │  4 ingredientes       │                          │
│                   └───────────┬───────────┘                          │
│                               │                                       │
│           ┌───────────────────┼───────────────────┐                   │
│           │                   │                   │                   │
│           ▼                   ▼                   ▼                   │
│   ┌───────────────┐   ┌───────────────┐   ┌───────────────┐          │
│   │ AGENTE        │   │ DESPLIEGUE    │   │ 4. MCP        │          │
│   │ GENERADO      │   │ ARG_BOARD     │   │    PRESETS    │          │
│   │               │   │               │   │               │          │
│   │ agents/       │   │ actores.json  │   │ MCP_PRESETS/  │          │
│   │ created/      │   │ obras.json    │   │ presets/      │          │
│   └───────────────┘   └───────────────┘   └───────────────┘          │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Anexo: Tabla de Afinidades Paradigma ↔ Bandera

| Paradigma | ID | Bandera Primaria | Banderas Secundarias | Razón |
|-----------|-----|------------------|----------------------|-------|
| Lógica Formal | `logica` | @blueflag | - | Verdad formal, proposiciones verificables |
| Redes Neuronales | `conexionista` | @yellowflag | @blueflag | Patrones emergentes, límites de explicabilidad |
| IA Simbólica | `simbolica` | @aleph | @blueflag | Producción, manipulación de símbolos |
| Basado en Casos | `sbc` | @revisor | @blueflag | Casos precedentes, coherencia histórica |
| Basado en Reglas | `sbr` | @blackflag | @redflag | Reglas de poder, condiciones de aplicación |
| IA Situada | `situada` | @redflag | @yellowflag | Contexto material, embodiment |
| Híbridos | `hibrido` | @aleph | (todas) | Orquestación de paradigmas |
| Método Científico | `cientifica` | @blueflag | @revisor | Método científico, falsificabilidad |
| Gramáticas Formales | `gramaticas` | @orangeflag | @blueflag | Registro, estructura formal del lenguaje |
| Teoría de Sistemas | `sistemas` | @redflag | @yellowflag | Emergencia, feedback loops, escala |
