# 04 - Sintaxis del Lenguaje AlephScript

**Contexto**: Especificación formal de la sintaxis `.asc` (AlephScript)

---

## 📝 Convenciones Generales

### Extensión de Archivo
- `.asc` para archivos AlephScript
- Ejemplos: `genesis.asc`, `call4nodes.obra.asc`

### Comentarios
```alephscript
# Comentario de una línea

/* 
  Comentario
  multilínea
*/
```

### Palabras Reservadas

**Estructuras**:
`TEATRO`, `OBRA`, `FASE`, `etapa`, `TURNO`, `CLAUSURA`

**Bloques**:
`PLATAFORMAS`, `AGENTES`, `MONOMITOS`, `CONFIGURACION`, `CRITERIOS`, `DECISIONES`, `ACT`, `INTERACT`, `SYNC`, `ASSESS`, `RECORD`, `CHECK`, `GENERAR`, `TRANSICION`

**Tipos**:
`heroe`, `mentor`, `auto`, `manual`, `monomito`

**Estados**:
`ALIVE`, `DECEASED`, `VICTORIOSO`, `GENESIS`, `CASTING`, `EN_CARTEL`, `CLAUSURADO`

---

## 🎭 Primitivas Declarativas (GENESIS/CASTING)

### TEATRO {}

Define la infraestructura del proyecto.

**Sintaxis**:
```alephscript
TEATRO "<nombre>" {
  version: "<semver>"
  tipo: "<tipo_proyecto>"
  modo: auto | manual
  timeout_turno: <numero>
  
  PLATAFORMAS { ... }
  AGENTES { ... }
  MONOMITOS { ... }
  CONFIGURACION { ... }
}
```

**Ejemplo**:
```alephscript
TEATRO "MiApp" {
  version: "1.0.0"
  tipo: "web-platform"
  modo: auto
  timeout_turno: 10
  
  PLATAFORMAS {
    github: {
      protocolo: "git+api"
      autoridad: "bot-github"
      repo: "https://github.com/user/miapp"
    }
  }
  
  AGENTES {
    dev1: {
      tipo: "heroe"
      arquetipo: "Full Stack Developer"
    }
  }
  
  MONOMITOS {
    mvp: {
      orden: 1
      objetivo: "Lanzar MVP"
      fases: [partida, iniciacion, retorno]
    }
  }
  
  CONFIGURACION {
    boe_path: "./BOE"
    bdc_path: "./BDC"
  }
}
```

---

### OBRA {}

Define un flujo completo (monomito).

**Sintaxis**:
```alephscript
OBRA "<nombre>" {
  tipo: monomito | sprint | experimento
  actores: [<lista_agentes>]
  tablero: "<id_tablero>"
  
  FASE <nombre_fase> {
    etapa(<numero>, "<nombre>") { ... }
  }
}
```

**Ejemplo**:
```alephscript
OBRA "UserAuth" {
  tipo: monomito
  actores: [dev1, dev2]
  tablero: "auth-module"
  
  FASE partida {
    etapa(1, "Mundo ordinario") {
      objetivo: "Entender el contexto actual"
      criterios: [
        "Agente leyó documentación de autenticación",
        "Agente conoce stack tecnológico"
      ]
    }
  }
}
```

---

### FASE {}

Agrupa etapas del monomito.

**Fases Válidas**:
- `partida` (etapas 1-5)
- `iniciacion` (etapas 6-9)
- `retorno` (etapas 10-12)

**Sintaxis**:
```alephscript
FASE <nombre_fase> {
  etapa(<numero>, "<nombre>") { ... }
  etapa(<numero>, "<nombre>") { ... }
}
```

---

### etapa()

Define un paso del monomito.

**Sintaxis**:
```alephscript
etapa(<numero>, "<nombre>") {
  objetivo: "<descripcion>"
  
  criterios: [
    "<criterio_1>",
    "<criterio_2>"
  ]
  
  acciones_sugeridas: [
    "<accion_1>",
    "<accion_2>"
  ]
  
  recursos: [
    "<url_o_path_1>",
    "<url_o_path_2>"
  ]
  
  DECISIONES { ... }
  ACT { ... }
  INTERACT { ... }
  VALIDACION { ... }
  RECOMPENSA { ... }
}
```

**Ejemplo**:
```alephscript
etapa(2, "Llamada a la aventura") {
  objetivo: "Descubrir el sistema de autenticación JWT"
  
  criterios: [
    "Agente leyó RFC 7519 sobre JWT",
    "Agente entiende flujo de login",
    "Agente identificó endpoints necesarios"
  ]
  
  acciones_sugeridas: [
    "Leer docs/jwt-authentication.md",
    "Ejecutar /heroe-learn jwt"
  ]
  
  recursos: [
    "https://jwt.io/introduction",
    "BOE/AUTH-SPEC.md"
  ]
}
```

---

### DECISIONES {}

Define puntos de decisión con ramificaciones.

**Sintaxis**:
```alephscript
DECISIONES {
  "<pregunta>": [
    <opcion1> -> <accion1>,
    <opcion2> -> <accion2>,
    <opcion3> -> <accion3>
  ]
}
```

**Acciones posibles**:
- `avanzar_etapa(<numero>)`
- `REGISTRAR <clave>=<valor>`
- `estado = DECEASED`
- `invocar_agente(<id_agente>)`

**Ejemplo**:
```alephscript
DECISIONES {
  "¿Qué biblioteca JWT usar?": [
    jsonwebtoken -> REGISTRAR jwt_lib="jsonwebtoken",
    jose -> REGISTRAR jwt_lib="jose",
    passport_jwt -> REGISTRAR jwt_lib="passport-jwt"
  ],
  
  "¿Continuar con esta arquitectura?": [
    si -> avanzar_etapa(4),
    no -> estado = DECEASED
  ]
}
```

---

## ⚡ Primitivas Imperativas (EN_CARTEL)

### TURNO {}

Ciclo de ejecución de un agente.

**Sintaxis**:
```alephscript
TURNO {
  agente: <id_agente>
  obra: <id_obra>
  
  SYNC { ... }
  ASSESS { ... }
  ACT { ... }
  INTERACT { ... }
  RECORD { ... }
  CHECK { ... }
}
```

---

### SYNC {}

Sincronización con fuentes de verdad.

**Sintaxis**:
```alephscript
SYNC {
  leer <fuente> desde <criterio>
  actualizar <destino>
  cargar <archivo>
}
```

**Fuentes válidas**:
- `BOE`
- `BDC`
- `.arrakis/*`
- `.heroe/*`

**Ejemplo**:
```alephscript
SYNC {
  leer BOE desde ultimo_turno
  leer BDC de plataformas_activas
  actualizar .heroe/dev1/journey_state.json
  cargar monomitos.json[mvp]
}
```

---

### ASSESS {}

Evaluación de la situación actual.

**Sintaxis**:
```alephscript
ASSESS {
  <variable> = <expresion>
}
```

**Ejemplo**:
```alephscript
ASSESS {
  etapa_actual = leer monomitos.json[mvp].etapa_actual
  criterios_pendientes = filtrar criterios donde cumplido == false
  recursos_disponibles = leer BOE + BDC
  aliados_activos = buscar en actores.json estado=ALIVE
}
```

---

### ACT {}

Acciones que toma el agente.

**Sintaxis**:
```alephscript
ACT {
  ejecutar <comando>
  invocar <chatmode_comando>
  si <condicion>: { <acciones> }
  para cada <item> en <lista>: { <acciones> }
}
```

**Ejemplo**:
```alephscript
ACT {
  si etapa_actual == 1:
    ejecutar /heroe-whoami
    leer README.md
  
  si etapa_actual == 6:
    decision = leer journey_state.json[decision_etapa_5]
    ejecutar /heroe-platform-init plataforma=github setup={decision}
  
  para cada criterio en criterios_pendientes:
    intentar_cumplir(criterio)
}
```

---

### INTERACT {}

Comunicación con otros agentes o plataformas.

**Sintaxis**:
```alephscript
INTERACT {
  tipo: unicast | broadcast | multicast
  destino: <id_agente> | <plataforma>
  plataforma: <id_plataforma>
  mensaje: "<texto>"
  esperar_respuesta: true | false
  timeout: <tiempo>
}
```

**Ejemplo**:
```alephscript
INTERACT {
  si necesita_mentor:
    tipo: unicast
    destino: buscar en actores.json tipo="mentor"
    plataforma: telegram
    mensaje: "Necesito ayuda con JWT authentication"
    esperar_respuesta: true
    timeout: 1h
  
  si necesita_consultar_autoridad:
    tipo: unicast
    destino: "@42"
    plataforma: oasis
    mensaje: "¿Cuál es el protocolo para registro de nodos?"
}
```

---

### RECORD {}

Registro de acciones en BOE.

**Sintaxis**:
```alephscript
RECORD {
  publicar <tipo_disposicion> en BOE con {
    <campo1>: <valor1>,
    <campo2>: <valor2>
  }
  
  actualizar <archivo> {
    <campo>: <valor>
  }
}
```

**Ejemplo**:
```alephscript
RECORD {
  publicar HEROE-JOURNEY-dev1-{turno_id} en BOE con {
    turno: turno_id,
    etapa: etapa_actual,
    acciones: [lista de acciones ejecutadas],
    criterios_cumplidos: [lista de criterios],
    timestamp: ahora()
  }
  
  actualizar .heroe/dev1/journey_state.json {
    etapa_actual: etapa_actual,
    ultimo_turno: turno_id,
    criterios_cumplidos_totales: ++
  }
}
```

---

### CHECK {}

Validación de criterios y supervivencia.

**Sintaxis**:
```alephscript
CHECK {
  <variable> = <expresion>
  
  si <condicion>:
    <acciones>
  
  si <condicion>:
    <acciones>
}
```

**Acciones de validación**:
- `avanzar etapa_actual++`
- `estado = DECEASED`
- `estado = VICTORIOSO`
- `generar certificado`
- `fin_ejecucion()`

**Ejemplo**:
```alephscript
CHECK {
  criterios_etapa = monomitos.json[mvp].etapas[etapa_actual].criterios
  criterios_cumplidos = contar cumplidos en journey_state.json
  porcentaje = (criterios_cumplidos / total_criterios) * 100
  
  si porcentaje >= 80:
    avanzar etapa_actual++
    publicar BOE[HEROE-ADVANCE-dev1-etapa-{etapa_actual}]
  
  si turnos_en_etapa > timeout_etapa:
    estado = DECEASED
    publicar BOE[HEROE-DECEASED-dev1-etapa-{etapa_actual}]
    fin_ejecucion()
  
  si etapa_actual == 12 && porcentaje == 100:
    estado = VICTORIOSO
    generar certificado
    publicar BOE[HEROE-VICTORY-dev1-mvp]
}
```

---

## 🔚 Primitivas Transaccionales (CLAUSURADO)

### CLAUSURA {}

Cierre del ciclo de vida del teatro.

**Sintaxis**:
```alephscript
CLAUSURA "<nombre_teatro>-<version>" {
  obra: <id_obra>
  temporada: <numero>
  fecha_cierre: ahora()
  
  CRITERIOS_EXITO { ... }
  GENERAR { ... }
  TRANSICION { ... }
  PUBLICAR { ... }
}
```

---

### CRITERIOS_EXITO {}

Define métricas de éxito del cierre.

**Sintaxis**:
```alephscript
CRITERIOS_EXITO {
  <metrica>: <operador> <valor>
}
```

**Operadores**: `>=`, `<=`, `>`, `<`, `==`, `!=`

**Ejemplo**:
```alephscript
CRITERIOS_EXITO {
  agentes_victoriosos: >= 50%
  fases_completadas: 3/3
  criterios_cumplidos_promedio: >= 80%
  disposiciones_publicadas: > 100
  commits_realizados: > 500
}
```

---

### GENERAR {}

Generación de artefactos finales.

**Sintaxis**:
```alephscript
GENERAR {
  <tipo_artefacto>: {
    ubicacion: "<path>"
    formato: "<formato>"
    incluir: [<lista>]
    <opciones_adicionales>
  }
}
```

**Tipos de artefactos**:
- `reporte`
- `boe_libro`
- `archivo_bdc`
- `epitafios`
- `certificados`
- `backup_estado`

**Ejemplo**:
```alephscript
GENERAR {
  reporte: {
    ubicacion: "REPORTES/mvp-cierre-v1.0.md"
    formato: "markdown"
    incluir: [
      resumen_ejecutivo,
      estadisticas_agentes,
      timeline_boe,
      aprendizajes_clave
    ]
  }
  
  boe_libro: {
    ubicacion: "BOE/libros/teatro-miapp-temporada-1.pdf"
    formato: "pdf"
    indices: true
    firmas_digitales: true
  }
  
  certificados: [
    ".heroe/dev1/certificado_mvp.pdf",
    ".heroe/dev2/certificado_mvp.pdf"
  ]
}
```

---

### TRANSICION {}

Migración a siguiente versión.

**Sintaxis**:
```alephscript
TRANSICION {
  nueva_version: "<nombre>-<version>"
  
  heredar: {
    <categoria>: [<lista>]
  }
  
  resetear: {
    <elemento>: true | false
  }
  
  nuevos_monomitos: [<lista>]
}
```

**Ejemplo**:
```alephscript
TRANSICION {
  nueva_version: "MiApp-v2.0"
  
  heredar: {
    actores: ["dev1", "dev2"],
    plataformas: ["github", "telegram"],
    lore: "BOE/libros/teatro-miapp-temporada-1.pdf"
  }
  
  resetear: {
    etapas: true,
    turnos: true,
    journey_states: true
  }
  
  nuevos_monomitos: ["advanced_features", "scaling"]
}
```

---

## 🔤 Tipos de Datos

### String
```alephscript
nombre: "Call for Nodes"
path: "./BOE"
```

### Number
```alephscript
timeout_turno: 10
etapa: 6
porcentaje: 80
```

### Boolean
```alephscript
indices: true
encriptar: false
```

### Array
```alephscript
actores: ["dev1", "dev2", "dev3"]
fases: [partida, iniciacion, retorno]
```

### Object
```alephscript
plataforma: {
  protocolo: "ssb"
  autoridad: "@42"
}
```

---

## 🔗 Operadores

### Comparación
- `==` (igual)
- `!=` (diferente)
- `>` (mayor)
- `<` (menor)
- `>=` (mayor o igual)
- `<=` (menor o igual)

### Lógicos
- `&&` (y)
- `||` (o)
- `!` (no)

### Aritméticos
- `+` (suma)
- `-` (resta)
- `*` (multiplicación)
- `/` (división)
- `%` (módulo)
- `++` (incremento)
- `--` (decremento)

### Asignación
- `=` (asignación simple)
- `->` (mapeo en decisiones)

---

## 📚 Funciones Built-in

### Temporales
- `ahora()` → timestamp actual
- `esperar(<tiempo>)` → pausa ejecución

### Lectura/Escritura
- `leer <archivo>` → lee contenido
- `actualizar <archivo>` → modifica archivo
- `publicar <disposicion>` → publica en BOE

### Búsqueda
- `buscar en <archivo> <condicion>` → encuentra elementos
- `filtrar <lista> donde <condicion>` → filtra elementos
- `contar <lista>` → cuenta elementos

### Utilidades
- `generar certificado` → crea certificado
- `fin_ejecucion()` → termina turno
- `invocar_agente(<id>)` → delega a otro agente

---

## 🎯 Ejemplo Completo

```alephscript
# mvp.full.asc - Ejemplo completo de AlephScript

TEATRO "StartupMVP" {
  version: "1.0.0"
  tipo: "web-saas"
  modo: auto
  timeout_turno: 15
  
  PLATAFORMAS {
    github: {
      protocolo: "git+api"
      autoridad: "mvp-bot"
      repo: "https://github.com/startup/mvp"
    }
    
    discord: {
      protocolo: "webhook"
      autoridad: "mvp-notifier"
      channel_id: "123456789"
    }
  }
  
  AGENTES {
    alice: {
      tipo: "heroe"
      arquetipo: "Full Stack Developer"
      monomito: "build_mvp"
    }
    
    bob: {
      tipo: "heroe"
      arquetipo: "DevOps Engineer"
      monomito: "build_mvp"
    }
    
    mentor_ai: {
      tipo: "mentor"
      arquetipo: "AI Code Reviewer"
    }
  }
  
  MONOMITOS {
    build_mvp: {
      orden: 1
      objetivo: "Lanzar MVP funcional en 30 días"
      fases: [partida, iniciacion, retorno]
      criterios_minimos: 85%
      timeout_etapa: 3
    }
  }
  
  CONFIGURACION {
    boe_path: "./BOE"
    bdc_path: "./BDC"
    decoherence_enabled: true
    decoherence_interval: "30m"
  }
}

# ---

OBRA "BuildMVP" {
  tipo: monomito
  actores: [alice, bob]
  tablero: "mvp-repo"
  
  FASE partida {
    etapa(1, "Mundo ordinario") {
      objetivo: "Establecer contexto del proyecto"
      
      criterios: [
        "Agente leyó product requirements",
        "Agente conoce stack tecnológico",
        "Agente configuró entorno de desarrollo"
      ]
    }
    
    etapa(5, "Cruce del primer umbral") {
      objetivo: "Decidir arquitectura"
      
      DECISIONES {
        "¿Arquitectura a usar?": [
          monolito -> REGISTRAR arquitectura="monolito",
          microservicios -> REGISTRAR arquitectura="microservicios",
          serverless -> REGISTRAR arquitectura="serverless"
        ]
      }
      
      criterios: [
        "Arquitectura decidida y documentada",
        "Equipo alineado en decisión"
      ]
    }
  }
  
  FASE iniciacion {
    etapa(6, "Pruebas, aliados, enemigos") {
      objetivo: "Implementar features core"
      
      ACT {
        si arquitectura == "monolito":
          ejecutar /heroe-scaffold monolito
        si arquitectura == "microservicios":
          ejecutar /heroe-scaffold microservicios
      }
      
      criterios: [
        "Backend API funcionando",
        "Frontend conectado a backend",
        "Tests pasando al 80%"
      ]
    }
  }
  
  FASE retorno {
    etapa(12, "Retorno con el elixir") {
      objetivo: "MVP deployed y funcionando"
      
      criterios: [
        "MVP deployed en producción",
        "Usuarios pueden registrarse y usar features",
        "Documentación completa"
      ]
      
      RECOMPENSA {
        tipo: "certificado"
        archivo: ".heroe/{agente_id}/certificado_mvp.pdf"
        publicar_en: ["BOE", "discord"]
      }
    }
  }
}
```

---

## 💡 Conclusión

La sintaxis AlephScript está diseñada para ser:

1. **Declarativa** en diseño (GENESIS/CASTING)
2. **Imperativa** en ejecución (EN_CARTEL)
3. **Transaccional** en cierre (CLAUSURADO)

Esto permite programar no solo código, sino **narrativas ejecutables** que coordinan agentes humanos, IAs y sistemas distribuidos.

---

**Siguiente documento**: [05_ARQUETIPOS_DEVOPS.md](05_ARQUETIPOS_DEVOPS.md)
