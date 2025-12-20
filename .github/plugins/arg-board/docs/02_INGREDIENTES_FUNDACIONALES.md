# 02 - Ingredientes Fundacionales de AlephScript

**Contexto**: Identificación de los elementos base del meta-framework 7GL

---

## 🧩 Los Tres Pilares Fundacionales

Los ingredientes fundacionales de AlephScript son la **conjugación** de:

1. **Patrones Arquitectónicos** (la estructura)
2. **Protocolos de Coordinación** (las reglas de interacción)
3. **Primitivos Conceptuales** (los elementos básicos)

---

## 🏛️ 1. Patrones Arquitectónicos

### 1.1 Conversación como DAG (Directed Acyclic Graph)

**Definición**: Las conversaciones en BDC (Bases de Conocimiento) se modelan como grafos dirigidos acíclicos donde cada mensaje es un nodo y las respuestas son aristas.

**Implementación en la Codebase**:
```
ChatExport_2025_10_5_BOOK/
  ├── messages.html          # Mensajes raw
  ├── result.json            # Estructura de threads
  └── graph.json             # Grafo de conversación
```

**Características**:
- Cada mensaje tiene un ID único
- Los replies apuntan a su mensaje padre
- Permite rastrear hilos de conversación
- Se puede generar el "camino del héroe" desde el grafo

### 1.2 Sistema de Disposiciones (BOE)

**Definición**: Todo evento significativo del teatro genera una disposición inmutable en el Boletín Oficial Estatal.

**Implementación en la Codebase**:
```
BOE/
  ├── boe-2025-10-15.json
  ├── boe-2025-10-16.json
  └── boe-2025-10-19.json
```

**Tipos de Disposiciones**:
- `ARRAKIS-GENESIS-*`: Inicialización de teatro
- `ARRAKIS-OBRA-*`: Definición de obras
- `ARRAKIS-SPRINT-*`: Inicio/fin de sprint
- `HEROE-JOURNEY-*`: Progreso de agentes
- `BUG-REPORT-*`: Errores detectados

**Características**:
- Inmutable (append-only)
- Timestamped
- Firmado por la autoridad que lo emite
- Auditable

### 1.3 BDCs como Feeds Temporales

**Definición**: Las Bases de Conocimiento son feeds sincronizados desde plataformas externas (Telegram, Oasis/SSB, Discord, email).

**Implementación en la Codebase**:
```
MBOX_PLATFORM/
  └── mbox_tools/          # Extracción de emails
  
ChatExport_2025-10-15_TELEGRAM/
  ├── messages.html
  └── photos/
```

**Características**:
- Sincronización periódica
- Conversaciones como feeds RSS
- Multimedia (texto, imágenes, archivos)
- Metadatos (timestamp, autor, plataforma)

### 1.4 Máquinas de Estado con Transiciones Declarativas

**Definición**: Los teatros, obras y agentes tienen estados bien definidos con transiciones explícitas.

**Estados del Teatro**:
```
GENESIS → CASTING → EN_CARTEL → CLAUSURADO
```

**Estados del Agente**:
```
ALIVE → DECEASED (si no supera una etapa)
```

**Implementación en la Codebase**:
```
EJEMPLOS/ARRAKIS_GENESIS/.arrakis/
  ├── theater_state.json
  ├── obras.json
  └── actores.json
```

### 1.5 Tableros Multi-Plataforma

**Definición**: Los tableros son espacios de juego que se replican en múltiples plataformas (Git, Telegram, Oasis, web).

**Implementación en la Codebase**:
```
GAMES/ARRAKIS_SEED/boards/arrakis_seed/
  ├── slides.json          # Definición de slides
  └── metadata.json        # Configuración del tablero

UI_UX/boards/
  └── [varios tableros]
```

**Características**:
- Sincronización automática
- Representación adaptativa por plataforma
- Estado compartido

---

## 🤝 2. Protocolos de Coordinación

### 2.1 Sistema de Turnos Coordinados

**Definición**: Los agentes actúan en turnos secuenciales o paralelos según la configuración del teatro.

**Implementación en la Codebase**:
```
GIT/
  ├── turnos.json
  └── logs/
```

**Tipos de Turnos**:
- **Secuencial**: Un agente a la vez
- **Paralelo**: Múltiples agentes simultáneamente
- **Condicional**: Basado en criterios de la etapa

**Ciclo del Turno**:
```
SYNC → ASSESS → ACT → INTERACT → RECORD → CHECK
```

### 2.2 Autoridades Agénticas por Plataforma

**Definición**: Cada plataforma tiene una autoridad que gestiona el acceso y las operaciones.

**Ejemplo**:
- **Oasis/SSB**: `@42` (autoridad suprema)
- **Telegram**: `label42` (bot oficial)
- **GitHub**: `arrakis-theater-bot`

**Responsabilidades**:
- Validar identidades
- Publicar disposiciones oficiales
- Coordinar sincronización de BDCs
- Resolver conflictos

### 2.3 Delegación entre Agentes Especializados

**Definición**: Los agentes pueden delegar tareas a otros agentes según sus arquetipos.

**Implementación en la Codebase**:
```
.github/chatmodes/
  ├── aleph.md              # Héroe DevOps
  ├── d1d4c.md              # Héroe Software Engineer
  └── arrakis-director.md   # Mentor/Director
```

**Patrón de Delegación**:
```
HERALD (define objetivo)
  ↓
THRESHOLD_GUARDIAN (asigna tareas)
  ↓
SHAPESHIFTER + ALLY + TRICKSTER (ejecutan)
  ↓
SHADOW (valida)
  ↓
MENTOR (archiva conocimiento)
```

### 2.4 Sincronización BOE ↔ BDC ↔ Repositorio

**Definición**: Los tres registros de verdad se sincronizan automáticamente.

**Flujo**:
```
Agente ACT → 
  Genera commit en Git → 
    Publica disposición en BOE → 
      Notifica en BDC (Telegram/Oasis)
```

**Implementación**:
```
DECOHERENCE/
  └── validation_report.json  # Detecta desincronizaciones
```

### 2.5 Validación de Coherencia (DECOHERENCE)

**Definición**: Sistema automático que verifica la coherencia entre BOE, BDCs y estado del repositorio.

**Validaciones**:
- BOE contiene todas las disposiciones referenciadas
- BDCs tienen mensajes sincronizados
- Estado del teatro es consistente
- Agentes no tienen estados contradictorios

**Implementación en la Codebase**:
```
DECOHERENCE/
  ├── index.json            # Configuración de validaciones
  ├── cache/                # Cache de estados anteriores
  └── reports/              # Reportes de incoherencias
```

---

## 🔑 3. Primitivos Conceptuales

### 3.1 Agente

**Definición**: Entidad que actúa en el teatro. Puede ser humano, IA o cyborg (humano + IA).

**Atributos**:
```json
{
  "id": "aleph",
  "tipo": "heroe",
  "arquetipo": "DevOps Engineer",
  "estado": "ALIVE",
  "monomito_actual": "call4nodes",
  "etapa_actual": 6,
  "plataformas": ["oasis", "telegram", "github"]
}
```

**Capacidades**:
- Ejecutar turnos
- Interactuar con plataformas
- Publicar en BOE
- Avanzar en el monomito

### 3.2 Turno

**Definición**: Unidad temporal de acción de un agente.

**Estructura**:
```json
{
  "turno_id": 42,
  "agente": "aleph",
  "timestamp": "2025-11-06T10:30:00Z",
  "etapa": 6,
  "acciones": [
    {"tipo": "SYNC", "fuente": "BOE"},
    {"tipo": "ACT", "comando": "/heroe-platform-init"},
    {"tipo": "INTERACT", "destino": "@42", "plataforma": "oasis"},
    {"tipo": "RECORD", "boe_id": "HEROE-JOURNEY-aleph-42"}
  ],
  "resultado": "SUCCESS"
}
```

### 3.3 Tablero

**Definición**: Espacio de juego donde se ejecuta una obra. Típicamente es un repositorio Git, pero puede ser cualquier plataforma.

**Atributos**:
```json
{
  "tablero_id": "arrakis_seed",
  "tipo": "git-repo",
  "url": "https://github.com/user/arrakis-seed",
  "obra_actual": "call4nodes",
  "estado": "EN_CARTEL",
  "agentes_activos": ["aleph", "d1d4c"]
}
```

### 3.4 Obra

**Definición**: Instancia ejecutable de un monomito. Define el flujo completo de una historia.

**Estructura**:
```json
{
  "obra_id": "call4nodes",
  "nombre": "Call for Nodes",
  "tipo": "monomito",
  "fases": ["partida", "iniciacion", "retorno"],
  "etapas": [
    {"num": 1, "nombre": "Mundo ordinario", "fase": "partida"},
    {"num": 2, "nombre": "Llamada a la aventura", "fase": "partida"},
    // ... 10 etapas más
  ],
  "criterios": {
    "etapa_1": ["Agente tiene identidad"],
    "etapa_2": ["Agente leyó disposición ARRAKIS-PLAT-REGISTER-OASIS"]
  }
}
```

### 3.5 Disposición

**Definición**: Registro oficial en el BOE. Es inmutable y timestamped.

**Estructura**:
```markdown
# ARRAKIS-GENESIS-CALL4NODES-20251106

**Tipo**: GENESIS  
**Fecha**: 2025-11-06  
**Autoridad**: HERALD@teatro-arrakis  

## Contenido

Se declara la obra "Call for Nodes" en el Teatro Arrakis con los siguientes parámetros:

- **Objetivo**: Obtener cuentas en Oasis e ingresar a Casa Arrakis
- **Tipo**: Monomito (12 etapas)
- **Agentes**: aleph, d1d4c
- **Fases**: Partida, Iniciación, Retorno

## Firma

`sha256:a1b2c3d4e5f6...`
```

### 3.6 Etapa

**Definición**: Paso dentro de un monomito. Corresponde a una de las 12 etapas del Camino del Héroe.

**Las 12 Etapas del Camino del Héroe**:

**FASE I: PARTIDA**
1. Mundo ordinario
2. Llamada a la aventura
3. Rechazo de la llamada
4. Encuentro con el mentor
5. Cruce del primer umbral

**FASE II: INICIACIÓN**
6. Pruebas, aliados, enemigos
7. Aproximación a la caverna más profunda
8. Odisea (calvario)
9. Recompensa

**FASE III: RETORNO**
10. Camino de vuelta
11. Resurrección
12. Retorno con el elixir

### 3.7 Plataforma

**Definición**: Canal de comunicación externo donde operan los agentes.

**Plataformas Soportadas**:
```json
{
  "plataformas": [
    {
      "id": "oasis",
      "protocolo": "ssb",
      "autoridad": "@42",
      "tipo": "p2p"
    },
    {
      "id": "telegram",
      "protocolo": "bot-api",
      "autoridad": "label42",
      "tipo": "centralizado"
    },
    {
      "id": "github",
      "protocolo": "git+api",
      "autoridad": "arrakis-theater-bot",
      "tipo": "centralizado"
    }
  ]
}
```

---

## 🔗 Interrelaciones entre Primitivos

```
TEATRO
  ├── contiene OBRAS
  │     ├── definidas en ETAPAS
  │     └── ejecutadas por AGENTES
  │           ├── operan en PLATAFORMAS
  │           ├── actúan en TURNOS
  │           └── publican DISPOSICIONES
  │
  ├── gestiona TABLEROS
  │     └── sincronizan con PLATAFORMAS
  │
  └── registra en BOE
        └── auditable vía DECOHERENCE
```

---

## 📊 Mapeo a la Codebase Actual

| Primitivo | Ubicación en la Codebase |
|-----------|--------------------------|
| **Agente** | `.github/chatmodes/*.md`, `EJEMPLOS/ARRAKIS_GENESIS/.arrakis/actores.json` |
| **Turno** | `GIT/turnos.json` |
| **Tablero** | `GAMES/*/boards/`, `UI_UX/boards/` |
| **Obra** | `EJEMPLOS/ARRAKIS_GENESIS/.arrakis/obras.json` |
| **Disposición** | `BOE/*.json` |
| **Etapa** | `EJEMPLOS/ARRAKIS_GENESIS/.arrakis/monomitos.json` |
| **Plataforma** | `MBOX_PLATFORM/`, `ChatExport_*/` |
| **BDC** | `ChatExport_*/result.json` |
| **Validación** | `DECOHERENCE/validation_report.json` |

---

## 💡 Conclusión

Los ingredientes fundacionales de AlephScript **no son solo archivos o directorios**, son **conceptos operativos** que se conjugan para crear un sistema vivo:

1. **Patrones** definen la estructura
2. **Protocolos** definen las reglas
3. **Primitivos** definen los elementos

La suma de estos tres pilares permite que AlephScript funcione como un **7GL**: un lenguaje donde programas narrativas que se ejecutan en realidades distribuidas.

---

**Siguiente documento**: [03_MAQUINA_ESTADOS_TEATRO.md](03_MAQUINA_ESTADOS_TEATRO.md)
