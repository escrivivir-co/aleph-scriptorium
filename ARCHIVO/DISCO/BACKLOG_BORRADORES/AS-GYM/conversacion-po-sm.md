# Planificación Épica SCRIPT-1.10.0: Conversación PO-SM

> **Fecha**: 2025-12-24
> **Participantes**: Product Owner (PO), Scrum Master (@scrum), Agentes del Scriptorium
> **Contexto**: Integración del submódulo `as-gym` como repositorio de "almas" para agentes

---

## Apertura

**@scrum (SM)**: Integramos el cuarto submódulo: `as-gym`. Este repositorio contiene **lógicas y autómatas** tanto de la lógica clásica como de paradigmas conexionistas y redes neuronales. Se instalará como extensión del plugin AGENT_CREATOR.

**PO**: Correcto. Es un repositorio de **"almas"** para agentes: los fundamentos de inteligencia artificial que dan vida a los personajes. La carpeta clave es `alephscript/src/FIA/`.

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

## Ronda de Agentes (Preliminar)

### 🐂 @ox (Meta)

**Ox**: Veo potencial de **extensión ontológica**:

1. Los paradigmas de FIA pueden mapear a tipos de auditoría:
   - `logica/` → @blueflag (verdad formal)
   - `sbr/` → @blackflag (reglas de poder)
   - `situada/` → @redflag (contexto material)
   - `conexionista/` → @yellowflag (patrones emergentes)

2. La interfaz `iFIA` es compatible con nuestra estructura de agentes.

---

### 🟢 @aleph (UI/Producción)

**Aleph**: Esto resuelve el problema de **agentes "tontos"**:

1. Actualmente los agentes solo responden con prompts.
2. Con FIA pueden tener **lógica interna** que persiste entre sesiones.
3. El campo `mundo: IMundo` es equivalente a nuestro ARCHIVO.

---

### 🔵 @blueflag (Verdad/Evidencia)

**Blueflag**: Audito la **base lógica**:

1. ✅ `paradigmas/logica/` contiene lógica formal verificable.
2. ✅ `paradigmas/sbr/` tiene sistemas basados en reglas con trazabilidad.
3. ⚠️ Falta inspección profunda de cada paradigma.

---

### 🟡 @yellowflag (Límites)

**Yellowflag**: Audito los **límites del diseño**:

1. ⚠️ Algunos paradigmas son **pre-teóricos** (simbolica, conexionista).
2. El código está en TypeScript — requiere compilación/transpilación.
3. La integración con ONNX abre posibilidades pero también complejidad.

---

## Síntesis Preliminar

**@scrum (SM)**: Esta épica queda en estado **INICIALIZADO** pendiente de:

1. ✅ Submódulo añadido con rama `integration/beta/scriptorium`
2. ✅ Épica creada en backlog
3. ⏳ **Análisis profundo de la carpeta FIA** (próxima sesión)
4. ⏳ Definir stories de integración con AGENT_CREATOR
5. ⏳ Mapear paradigmas a tipos de agentes

---

## Próximos pasos

El PO indicará la carpeta específica de ingenios a analizar. Por ahora:

- **Carpeta objetivo**: `alephscript/src/FIA/`
- **Enfoque inicial**: `paradigmas/` (catálogo de tipos de razonamiento)
- **Integración target**: Plugin AGENT_CREATOR

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
