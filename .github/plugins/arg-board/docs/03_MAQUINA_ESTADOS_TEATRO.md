# 03 - Máquina de Estados del Teatro Arrakis

**Contexto**: Ciclo de vida de un proyecto en AlephScript como máquina de estados

---

## 🎭 La Máquina de Estados Fundamental

AlephScript se basa en la máquina de estados del **Teatro Arrakis**:

```
┌─────────┐    ┌─────────┐    ┌───────────┐    ┌────────────┐
│ GENESIS │ -> │ CASTING │ -> │ EN_CARTEL │ -> │ CLAUSURADO │
└─────────┘    └─────────┘    └───────────┘    └────────────┘
    ↓              ↓               ↓                   ↓
  Setup         Diseño        Ejecución             Archive
```

Cada estado tiene:
- **Objetivo**: Qué se logra en esta fase
- **Actores**: Quién participa
- **Primitivas**: Qué comandos/estructuras se usan
- **Artefactos**: Qué se genera
- **Transición**: Cómo se pasa al siguiente estado

---

## 🌱 Estado 1: GENESIS (Tiempo de Setup)

### Objetivo

Declarar la infraestructura del teatro **antes** de escribir código o diseñar flujos.

En GENESIS se define:
- Qué tipo de teatro es (proyecto web, juego ARG, plataforma)
- Qué plataformas se usarán (Oasis, Telegram, GitHub, etc.)
- Quiénes son los agentes iniciales
- Qué monomitos se ejecutarán

### Actores Principales

- **HERALD** (Product Owner): Define la visión
- **GODDESS** (SysAdmin): Configura infraestructura
- **THRESHOLD_GUARDIAN** (Scrum Master): Prepara el sistema de turnos

### Primitivas AlephScript

#### Sintaxis Declarativa

```alephscript
# genesis.asc

TEATRO "MiProyecto" {
  version: "1.0.0"
  tipo: "plataforma-web"
  modo: auto
  timeout_turno: 10
  
  PLATAFORMAS {
    oasis: {
      protocolo: "ssb"
      autoridad: "@42"
      setup_options: ["warehouse", "kit-oficial", "sdk"]
    }
    
    telegram: {
      protocolo: "bot-api"
      autoridad: "label42"
      webhook_url: "https://api.telegram.org/bot{TOKEN}"
    }
    
    github: {
      protocolo: "git+api"
      autoridad: "arrakis-theater-bot"
      repo: "https://github.com/user/proyecto"
    }
  }
  
  AGENTES {
    aleph: {
      tipo: "heroe"
      arquetipo: "DevOps Engineer"
      monomito: "call4nodes"
      plataformas: ["oasis", "telegram", "github"]
    }
    
    d1d4c: {
      tipo: "heroe"
      arquetipo: "Software Engineer"
      monomito: "call4nodes"
      plataformas: ["github", "telegram"]
    }
    
    arrakis_director: {
      tipo: "mentor"
      arquetipo: "Teatro Director"
      funciones: ["coordinar_turnos", "publicar_boe", "validar_coherencia"]
    }
  }
  
  MONOMITOS {
    call4nodes: {
      orden: 1
      objetivo: "Obtener cuentas en Oasis e ingresar a Casa Arrakis"
      fases: [partida, iniciacion, retorno]
      criterios_minimos: 80%
      timeout_etapa: 5
    }
    
    call4agents: {
      orden: 2
      objetivo: "Construir agentes especializados para el teatro"
      fases: [partida, iniciacion, retorno]
      criterios_minimos: 90%
    }
  }
  
  CONFIGURACION {
    boe_path: "./BOE"
    bdc_path: "./BDC"
    decoherence_enabled: true
    decoherence_interval: "1h"
  }
}
```

### Comandos de Compilación

```bash
# Crear el teatro desde archivo genesis
alephscript genesis genesis.asc --output .arrakis/

# O crear interactivamente
alephscript genesis init --interactive
```

### Artefactos Generados

```
.arrakis/
  ├── theater_state.json
  ├── obras.json
  ├── actores.json
  ├── monomitos.json
  └── plataformas.json

BOE/
  └── ARRAKIS-GENESIS-MIPROYECTO-20251106.md
```

**Ejemplo de `theater_state.json`**:
```json
{
  "teatro_id": "MiProyecto",
  "version": "1.0.0",
  "estado": "GENESIS",
  "fecha_genesis": "2025-11-06T10:00:00Z",
  "plataformas": ["oasis", "telegram", "github"],
  "agentes": ["aleph", "d1d4c", "arrakis_director"],
  "monomitos": ["call4nodes", "call4agents"],
  "configuracion": {
    "modo": "auto",
    "timeout_turno": 10,
    "boe_enabled": true,
    "decoherence_enabled": true
  }
}
```

**Ejemplo de disposición BOE**:
```markdown
# ARRAKIS-GENESIS-MIPROYECTO-20251106

**Tipo**: GENESIS  
**Teatro**: MiProyecto  
**Fecha**: 2025-11-06T10:00:00Z  
**Autoridad**: HERALD@teatro-arrakis  

## Declaración

Se constituye el Teatro Arrakis "MiProyecto" con los siguientes parámetros:

### Configuración
- **Versión**: 1.0.0
- **Tipo**: plataforma-web
- **Modo**: automático
- **Timeout por turno**: 10 minutos

### Plataformas Registradas
- Oasis/SSB (autoridad: @42)
- Telegram (autoridad: label42)
- GitHub (autoridad: arrakis-theater-bot)

### Agentes Iniciales
- aleph (DevOps Engineer)
- d1d4c (Software Engineer)
- arrakis_director (Teatro Director)

### Monomitos Declarados
1. call4nodes: Obtener cuentas en Oasis
2. call4agents: Construir agentes especializados

## Firma Digital
`sha256:f7c9a1b2e3d4...`

---

_Este documento es inmutable y forma parte del registro oficial del Teatro Arrakis._
```

### Transición a CASTING

**Condiciones para avanzar**:
- ✅ Todos los agentes tienen identidades válidas
- ✅ Todas las plataformas están configuradas
- ✅ Al menos un monomito está declarado
- ✅ BOE está inicializado

**Comando**:
```bash
alephscript transition --to CASTING
```

---

## 🎬 Estado 2: CASTING (Tiempo de Diseño)

### Objetivo

Definir los **comportamientos y flujos** sin implementar lógica. Aquí se diseñan las obras (los monomitos) con sus etapas, criterios y decisiones.

### Actores Principales

- **THRESHOLD_GUARDIAN**: Facilita el diseño
- **HERALD**: Refina objetivos
- **SHAPESHIFTER**: Diseña interfaces
- **ALLY**: Diseña arquitectura backend
- **MENTOR**: Documenta conocimiento

### Primitivas AlephScript

#### Sintaxis Declarativa de Obras

```alephscript
# call4nodes.obra.asc

OBRA "Call4Nodes" {
  tipo: monomito
  actores: [aleph, d1d4c]
  tablero: "arrakis_seed"
  
  # ===== FASE I: PARTIDA =====
  
  FASE partida {
    etapa(1, "Mundo ordinario") {
      objetivo: "Conocer el contexto inicial"
      
      criterios: [
        "Agente tiene identidad",
        "Agente conoce su arquetipo",
        "Agente ha leído el README del teatro"
      ]
      
      acciones_sugeridas: [
        "Leer .arrakis/actores.json",
        "Ejecutar /heroe-whoami"
      ]
    }
    
    etapa(2, "Llamada a la aventura") {
      objetivo: "Descubrir Oasis y Casa Arrakis"
      
      criterios: [
        "Agente leyó disposición ARRAKIS-PLAT-REGISTER-OASIS",
        "Agente conoce autoridad @42",
        "Agente entiende qué es Oasis/SSB"
      ]
      
      recursos: [
        "BOE/ARRAKIS-PLAT-REGISTER-OASIS.md",
        "https://scuttlebutt.nz"
      ]
    }
    
    etapa(3, "Rechazo de la llamada") {
      objetivo: "Enfrentar dudas sobre el setup técnico"
      
      criterios: [
        "Agente identificó obstáculos técnicos",
        "Agente consultó documentación de opciones",
        "Agente expresó preocupaciones en BDC"
      ]
      
      DECISIONES {
        "¿Continuar o abandonar?": [
          continuar -> avanzar_etapa(4),
          abandonar -> estado = DECEASED
        ]
      }
    }
    
    etapa(4, "Encuentro con el mentor") {
      objetivo: "Contactar con @42 o leer guías oficiales"
      
      criterios: [
        "Agente contactó autoridad de Oasis",
        "Agente recibió orientación sobre setup",
        "Agente tiene plan de acción"
      ]
      
      INTERACT {
        tipo: "unicast"
        destino: "@42"
        plataforma: "oasis"
        mensaje: "Solicito guía para setup de nodo"
      }
    }
    
    etapa(5, "Cruce del primer umbral") {
      objetivo: "Tomar la decisión de qué setup usar"
      
      DECISIONES {
        "Escoger setup de Oasis": [
          warehouse -> REGISTRAR setup="Warehouse SNH",
          kit_oficial -> REGISTRAR setup="Kit oficial SNH",
          sdk -> REGISTRAR setup="Alephscript Network SDK"
        ]
      }
      
      criterios: [
        "Agente escogió un setup",
        "Agente publicó disposición con su elección",
        "Agente comenzó instalación"
      ]
    }
  }
  
  # ===== FASE II: INICIACIÓN =====
  
  FASE iniciacion {
    etapa(6, "Pruebas, aliados, enemigos") {
      objetivo: "Configurar setup y conectar con otros nodos"
      
      criterios: [
        "Setup está instalado correctamente",
        "Agente puede publicar mensajes en Oasis",
        "Agente identificó al menos 3 aliados en la red"
      ]
      
      ACT {
        si setup == "warehouse": {
          ejecutar: "/heroe-platform-init plataforma=oasis setup=warehouse"
        }
        si setup == "kit_oficial": {
          ejecutar: "/heroe-platform-init plataforma=oasis setup=kit_oficial"
        }
        si setup == "sdk": {
          ejecutar: "/heroe-platform-init plataforma=oasis setup=sdk"
        }
      }
    }
    
    etapa(7, "Aproximación a la caverna") {
      objetivo: "Solicitar entrada a Casa Arrakis"
      
      criterios: [
        "Agente envió solicitud formal a Casa Arrakis",
        "Agente cumplió requisitos de entrada",
        "Agente esperó respuesta de autoridad"
      ]
    }
    
    etapa(8, "Odisea (calvario)") {
      objetivo: "Ser aceptado en Casa Arrakis"
      
      criterios: [
        "Agente recibió invitación",
        "Agente puede acceder a canales privados de Casa Arrakis",
        "Agente fue bienvenido por otros miembros"
      ]
      
      VALIDACION {
        tipo: "externa"
        validador: "@42"
        mensaje: "¿Fue aceptado el agente {agente_id} en Casa Arrakis?"
      }
    }
    
    etapa(9, "Recompensa") {
      objetivo: "Obtener beneficios de ser miembro de Casa Arrakis"
      
      criterios: [
        "Agente tiene acceso a repositorios privados",
        "Agente puede participar en monomitos avanzados",
        "Agente recibió documentación exclusiva"
      ]
    }
  }
  
  # ===== FASE III: RETORNO =====
  
  FASE retorno {
    etapa(10, "Camino de vuelta") {
      objetivo: "Documentar el viaje para futuros agentes"
      
      criterios: [
        "Agente escribió guía en BDC",
        "Agente publicó disposición con aprendizajes",
        "Agente creó recursos para nuevos miembros"
      ]
    }
    
    etapa(11, "Resurrección") {
      objetivo: "Superar un desafío final de validación"
      
      criterios: [
        "Agente ayudó a otro agente a completar call4nodes",
        "Agente demostró dominio de Oasis/SSB",
        "Agente contribuyó código al teatro"
      ]
    }
    
    etapa(12, "Retorno con el elixir") {
      objetivo: "Completar el monomito y recibir reconocimiento"
      
      criterios: [
        "Agente completó todas las etapas anteriores",
        "Agente tiene estado ALIVE",
        "Agente recibió certificado del teatro"
      ]
      
      RECOMPENSA {
        tipo: "certificado"
        archivo: ".heroe/{agente_id}/certificado_call4nodes.md"
        publicar_en: ["BOE", "oasis", "telegram"]
      }
    }
  }
}
```

### Comandos de Compilación

```bash
# Compilar la obra desde archivo
alephscript cast call4nodes.obra.asc --teatro .arrakis/

# Validar sintaxis sin compilar
alephscript cast call4nodes.obra.asc --validate-only
```

### Artefactos Generados

```
.arrakis/
  ├── obras.json                    # Actualizado
  └── monomitos.json                # Actualizado con etapas

.prompts/
  ├── call4nodes/
  │   ├── etapa_01_prompt.md
  │   ├── etapa_02_prompt.md
  │   └── ... (12 archivos)

BOE/
  └── ARRAKIS-OBRA-CALL4NODES-20251106.md
```

**Ejemplo de `monomitos.json` actualizado**:
```json
{
  "call4nodes": {
    "nombre": "Call for Nodes",
    "tipo": "monomito",
    "estado": "DISEÑADO",
    "etapas": [
      {
        "num": 1,
        "nombre": "Mundo ordinario",
        "fase": "partida",
        "objetivo": "Conocer el contexto inicial",
        "criterios": [
          "Agente tiene identidad",
          "Agente conoce su arquetipo",
          "Agente ha leído el README del teatro"
        ],
        "criterios_cumplidos": 0,
        "total_criterios": 3
      }
      // ... 11 etapas más
    ],
    "fases": {
      "partida": [1, 2, 3, 4, 5],
      "iniciacion": [6, 7, 8, 9],
      "retorno": [10, 11, 12]
    }
  }
}
```

### Transición a EN_CARTEL

**Condiciones para avanzar**:
- ✅ Al menos una obra está completamente diseñada
- ✅ Todas las etapas tienen criterios definidos
- ✅ Los agentes están asignados a obras
- ✅ Los tableros están configurados

**Comando**:
```bash
alephscript transition --to EN_CARTEL
```

---

## 🎪 Estado 3: EN_CARTEL (Tiempo de Ejecución)

### Objetivo

**Ejecutar la obra** con agentes reales operando en plataformas reales. Los agentes actúan en turnos, avanzan etapas, publican en BOE y sincronizan con BDCs.

### Actores Principales

**Todos**, dependiendo de su arquetipo:
- SHAPESHIFTER (Frontend)
- ALLY (Backend)
- TRICKSTER (DevOps)
- SHADOW (QA)
- MENTOR (Documentación)

### Primitivas AlephScript

#### El Ciclo del Turno

```alephscript
TURNO {
  agente: aleph
  obra: call4nodes
  
  # 1. SYNC: Sincronizar estado
  SYNC {
    leer BOE desde ultimo_turno
    leer BDC de plataformas_activas
    actualizar .heroe/aleph/journey_state.json
    cargar monomitos.json[call4nodes]
  }
  
  # 2. ASSESS: Evaluar situación
  ASSESS {
    etapa_actual = leer monomitos.json[call4nodes].etapa_actual
    criterios_pendientes = filtrar criterios donde cumplido == false
    recursos_disponibles = leer BOE + BDC
  }
  
  # 3. ACT: Tomar acciones
  ACT {
    si etapa_actual == 1:
      ejecutar /heroe-whoami
      leer README.md
    
    si etapa_actual == 2:
      leer BOE/ARRAKIS-PLAT-REGISTER-OASIS.md
      invocar /heroe-platform-learn plataforma=oasis
    
    si etapa_actual == 5:
      decision = prompt("¿Qué setup de Oasis eliges?")
      publicar BOE[HEROE-DECISION-aleph-setup-{decision}]
    
    si etapa_actual == 6:
      ejecutar /heroe-platform-init plataforma=oasis setup={decision_etapa_5}
  }
  
  # 4. INTERACT: Comunicarse
  INTERACT {
    si necesita_mentor:
      destinatario = buscar en actores.json tipo="mentor"
      enviar mensaje unicast en plataforma telegram
    
    si necesita_consultar_autoridad:
      enviar "@42 protocol" en plataforma oasis
      esperar respuesta con timeout=1h
    
    si necesita_colaborar:
      destinatario = buscar en actores.json obra=call4nodes, estado=ALIVE
      proponer alianza en BDC
  }
  
  # 5. RECORD: Registrar
  RECORD {
    publicar HEROE-JOURNEY-aleph-{turno_id} en BOE con {
      turno: turno_id,
      etapa: etapa_actual,
      acciones: [lista de acciones ejecutadas],
      criterios_cumplidos: [lista de criterios que cumplió],
      timestamp: ahora()
    }
    
    actualizar .heroe/aleph/journey_state.json {
      etapa_actual: etapa_actual,
      criterios_cumplidos_totales: ++,
      ultimo_turno: turno_id,
      ultimo_timestamp: ahora()
    }
  }
  
  # 6. CHECK: Validar supervivencia
  CHECK {
    criterios_etapa = monomitos.json[call4nodes].etapas[etapa_actual].criterios
    criterios_cumplidos = contar cumplidos en journey_state.json
    
    si criterios_cumplidos >= 80% de criterios_etapa:
      avanzar etapa_actual++
      publicar BOE[HEROE-ADVANCE-aleph-etapa-{etapa_actual}]
    
    si turnos_en_etapa > timeout_etapa:
      estado = DECEASED
      publicar BOE[HEROE-DECEASED-aleph-etapa-{etapa_actual}]
      fin_ejecucion()
    
    si etapa_actual == 12 && criterios_cumplidos == 100%:
      estado = VICTORIOSO
      generar certificado
      publicar BOE[HEROE-VICTORY-aleph-call4nodes]
  }
}
```

### Comandos de Ejecución

```bash
# Modo automático: El agente ejecuta turnos sin intervención humana
alephscript play --agente aleph --obra call4nodes --modo auto

# Modo manual: Cada turno requiere confirmación humana
alephscript play --agente aleph --obra call4nodes --modo manual

# Ejecutar un solo turno
alephscript turn --agente aleph

# Ver estado actual del agente
alephscript status --agente aleph

# Ver estado de la obra
alephscript status --obra call4nodes
```

### Artefactos Generados (Continuo)

Durante EN_CARTEL se generan constantemente:

```
BOE/
  ├── HEROE-JOURNEY-aleph-001.md
  ├── HEROE-JOURNEY-aleph-002.md
  ├── HEROE-DECISION-aleph-setup-warehouse.md
  ├── HEROE-ADVANCE-aleph-etapa-2.md
  └── ...

.heroe/
  ├── aleph/
  │   ├── journey_state.json       # Estado actualizado
  │   ├── contacts.json             # Aliados y mentores
  │   └── resources.json            # Recursos recopilados
  └── d1d4c/
      └── journey_state.json

BDC/
  ├── telegram/
  │   ├── feed_20251106.json       # Conversaciones del día
  │   └── ...
  └── oasis/
      ├── feed_20251106.json
      └── ...

git-commits/
  ├── [commits continuos de los agentes]
```

### Transición a CLAUSURADO

**Condiciones para avanzar**:
- ✅ Todos los agentes completaron sus obras O llegaron a estado DECEASED
- ✅ Todas las etapas fueron intentadas
- ✅ Criterios de cierre del teatro se cumplieron

**Comando**:
```bash
alephscript transition --to CLAUSURADO
```

---

## 📦 Estado 4: CLAUSURADO (End of Life → Archive)

### Objetivo

Cerrar el ciclo de vida del teatro, generar artefactos inmutables y preparar la transición a la siguiente versión (LTS).

### Actores Principales

- **GODDESS**: Ejecuta el cierre
- **MENTOR**: Archiva conocimiento
- **HERALD**: Define próxima versión

### Primitivas AlephScript

```alephscript
CLAUSURA "MiProyecto-v1.0" {
  obra: call4nodes
  temporada: 1
  fecha_cierre: ahora()
  
  # Criterios de éxito
  CRITERIOS_EXITO {
    agentes_victoriosos: >= 50%
    fases_completadas: 3/3
    criterios_cumplidos_promedio: >= 80%
    disposiciones_publicadas: > 100
  }
  
  # Generar artefactos finales
  GENERAR {
    reporte: {
      ubicacion: "REPORTES/call4nodes-cierre-v1.0.md"
      formato: "markdown"
      incluir: [
        resumen_ejecutivo,
        estadisticas_agentes,
        timeline_boe,
        grafos_conversacionales,
        aprendizajes_clave
      ]
    }
    
    boe_libro: {
      ubicacion: "BOE/libros/teatro-miproyecto-temporada-1.pdf"
      formato: "pdf"
      indices: true
      firmas_digitales: true
    }
    
    archivo_bdc: {
      ubicacion: "ARCHIVES/bdcs-temporada-1.tar.gz"
      formato: "compressed"
      incluir: ["telegram", "oasis", "discord"]
      encriptar: true
    }
    
    epitafios: [
      ".heroe/aleph/epitafio.md",
      ".heroe/d1d4c/epitafio.md"
    ]
    
    certificados: [
      ".heroe/aleph/certificado_call4nodes.pdf",
      ".heroe/d1d4c/certificado_call4nodes.pdf"
    ]
    
    backup_estado: {
      ubicacion: "ARCHIVES/theater_state_v1.0.json"
      incluir: [
        ".arrakis/",
        ".heroe/",
        "BOE/",
        "BDC/"
      ]
    }
  }
  
  # Transición a próxima versión
  TRANSICION {
    nueva_version: "MiProyecto-v2.0"
    
    heredar: {
      actores: ["aleph", "d1d4c"],
      plataformas: ["oasis", "telegram", "github"],
      lore: "BOE/libros/teatro-miproyecto-temporada-1.pdf"
    }
    
    resetear: {
      etapas: true,
      turnos: true,
      journey_states: true
    }
    
    nuevos_monomitos: ["call4agents", "call4theater"]
  }
  
  # Publicación final
  PUBLICAR {
    disposicion: "ARRAKIS-CLAUSURA-MIPROYECTO-V1"
    destinos: ["BOE", "oasis", "telegram"]
    notificar_agentes: true
  }
}
```

### Comandos de Cierre

```bash
# Cerrar el teatro y generar todos los artefactos
alephscript close --teatro MiProyecto --generar-ltc

# Generar solo el reporte
alephscript close --teatro MiProyecto --reporte-only

# Transicionar a nueva versión
alephscript close --teatro MiProyecto --transicion v2.0
```

### Artefactos Finales

```
REPORTES/
  └── call4nodes-cierre-v1.0.md

BOE/
  ├── libros/
  │   └── teatro-miproyecto-temporada-1.pdf
  └── ARRAKIS-CLAUSURA-MIPROYECTO-V1.md

ARCHIVES/
  ├── bdcs-temporada-1.tar.gz
  ├── theater_state_v1.0.json
  └── backup_completo_v1.0.tar.gz

.heroe/
  ├── aleph/
  │   ├── epitafio.md
  │   └── certificado_call4nodes.pdf
  └── d1d4c/
      ├── epitafio.md
      └── certificado_call4nodes.pdf
```

---

## 🔄 El Ciclo Completo Visualizado

```
┌─────────────────────────────────────────────────────────────┐
│                  TEATRO ARRAKIS - CICLO COMPLETO              │
└─────────────────────────────────────────────────────────────┘

GENESIS (Setup)
  │
  ├─ HERALD declara visión
  ├─ GODDESS configura plataformas
  ├─ THRESHOLD_GUARDIAN prepara turnos
  │
  └─> Genera: .arrakis/, BOE/GENESIS
      │
      ▼
CASTING (Diseño)
  │
  ├─ THRESHOLD_GUARDIAN facilita diseño
  ├─ SHAPESHIFTER diseña UI
  ├─ ALLY diseña backend
  ├─ MENTOR documenta
  │
  └─> Genera: obras.json, monomitos.json, prompts/
      │
      ▼
EN_CARTEL (Ejecución)
  │
  ├─ Agentes ejecutan TURNOS
  │   ├─ SYNC → ASSESS → ACT → INTERACT → RECORD → CHECK
  │   └─ Bucle continuo hasta victoria o deceased
  │
  ├─ SHADOW valida continuamente
  ├─ TRICKSTER orquesta Git/CI/CD
  ├─ MENTOR sincroniza BDCs
  │
  └─> Genera: BOE/HEROE-*, .heroe/*/journey_state.json
      │
      ▼
CLAUSURADO (Archive)
  │
  ├─ GODDESS genera artefactos finales
  ├─ MENTOR crea libro del BOE
  ├─ HERALD define v2.0
  │
  └─> Genera: REPORTES/, ARCHIVES/, certificados
      │
      └─> TRANSICION a MiProyecto-v2.0
          │
          └─> Volver a GENESIS (con herencia)
```

---

## 💡 Conclusión

La máquina de estados del Teatro Arrakis es el **corazón de AlephScript**. Define claramente:

1. **Cuándo** se hacen las cosas (qué estado)
2. **Quién** las hace (qué arquetipos)
3. **Cómo** se hacen (qué primitivas)
4. **Qué** se genera (qué artefactos)

Cada proyecto AlephScript pasa obligatoriamente por estas 4 fases, garantizando:
- Diseño antes de implementación
- Ejecución coordinada
- Cierre formal con archivos inmutables
- Transición planificada a nuevas versiones

---

**Siguiente documento**: [04_SINTAXIS_ALEPHSCRIPT.md](04_SINTAXIS_ALEPHSCRIPT.md)
