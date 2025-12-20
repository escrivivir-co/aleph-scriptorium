# 05 - Arquetipos DevOps en AlephScript

**Contexto**: Mapeo de roles técnicos tradicionales a arquetipos narrativos del monomito

---

## 🎭 La Transformación de Roles

En AlephScript 7GL, los roles técnicos de DevOps **se transforman en arquetipos del Camino del Héroe**, cada uno con:

- **Función narrativa** dentro del monomito
- **Responsabilidades técnicas** específicas
- **Fase principal** de actuación
- **Primitivas AlephScript** que utilizan
- **Artefactos** que generan

---

## 📊 Tabla Maestra de Mapeo

| Rol DevOps (MEAN Stack) | Arquetipo AlephScript | Función Narrativa | Fase Principal |
|-------------------------|----------------------|-------------------|----------------|
| Product Owner | **HERALD** | Heraldo de la Aventura | GENESIS |
| Scrum Master | **THRESHOLD_GUARDIAN** | Guardián del Umbral | GENESIS → CASTING |
| Frontend Developer | **SHAPESHIFTER** | Transformador Visual | CASTING → EN_CARTEL |
| Backend Developer | **ALLY** | Aliado Técnico | CASTING → EN_CARTEL |
| Database Admin | **MENTOR** | Guardián del Conocimiento | EN_CARTEL |
| DevOps Engineer | **TRICKSTER** | Ingeniero del Caos | EN_CARTEL → CLAUSURADO |
| QA/Tester | **SHADOW** | Sombra/Antagonista | EN_CARTEL |
| System Admin | **GODDESS** | Autoridad Suprema | GENESIS + CLAUSURADO |

---

## 1️⃣ HERALD (Product Owner)

### Función Narrativa
El **Heraldo** es quien trae la llamada a la aventura. Define la visión del teatro y anuncia los monomitos que deben ejecutarse.

### Rol DevOps Equivalente
- Product Owner
- Stakeholder
- Business Analyst

### Fase Principal
**GENESIS**: Define la infraestructura conceptual del teatro

### Responsabilidades

**Estratégicas**:
- Declarar la visión del teatro
- Definir objetivos de cada monomito
- Establecer criterios de éxito
- Priorizar obras

**Técnicas**:
- Escribir `genesis.asc`
- Definir `MONOMITOS{}`
- Establecer `CRITERIOS_EXITO{}`

### Primitivas AlephScript

```alephscript
HERALD "<id_herald>" {
  arquetipo: "Visionario" | "Product Owner"
  
  DECLARA TEATRO "<nombre>" {
    version: "<semver>"
    tipo: "<tipo_proyecto>"
    # ...
  }
  
  DECLARA MONOMITO "<nombre>" {
    objetivo: "<descripcion>"
    fases: [partida, iniciacion, retorno]
    criterios_minimos: <porcentaje>
  }
  
  PRIORIZA {
    orden_ejecucion: [<monomito1>, <monomito2>]
    recursos_criticos: [<recurso1>, <recurso2>]
  }
}
```

### Ejemplo

```alephscript
HERALD "product_owner" {
  arquetipo: "Visionario"
  
  DECLARA TEATRO "SocialNetwork" {
    version: "1.0.0"
    tipo: "web-saas"
  }
  
  DECLARA MONOMITO "user_auth" {
    objetivo: "Sistema de autenticación completo con JWT"
    fases: [partida, iniciacion, retorno]
    criterios_minimos: 90%
  }
  
  DECLARA MONOMITO "feed_timeline" {
    objetivo: "Timeline de posts con paginación infinita"
    fases: [partida, iniciacion, retorno]
    criterios_minimos: 85%
  }
  
  PRIORIZA {
    orden_ejecucion: [user_auth, feed_timeline]
    recursos_criticos: ["MongoDB", "Redis", "AWS S3"]
  }
}
```

### Artefactos Generados

```
.arrakis/
  ├── theater_state.json
  └── monomitos.json

BOE/
  └── ARRAKIS-GENESIS-SOCIALNETWORK-*.md
```

---

## 2️⃣ THRESHOLD_GUARDIAN (Scrum Master)

### Función Narrativa
El **Guardián del Umbral** protege las fronteras entre fases. Facilita el diseño de las obras y coordina los turnos de ejecución.

### Rol DevOps Equivalente
- Scrum Master
- Project Manager
- Agile Coach

### Fase Principal
**GENESIS → CASTING**: Facilita la transición de setup a diseño

### Responsabilidades

**Facilitación**:
- Coordinar el `CASTING` de las obras
- Gestionar el sistema de `TURNOS`
- Publicar disposiciones en `BOE`
- Resolver bloqueos entre agentes

**Técnicas**:
- Facilitar diseño de `OBRA{}`
- Configurar `TURNOS{}`
- Publicar `BOE[SPRINT-*]`
- Validar transiciones de estado

### Primitivas AlephScript

```alephscript
THRESHOLD_GUARDIAN "<id_guardian>" {
  arquetipo: "Facilitador" | "Coordinador"
  
  FACILITA CASTING {
    obras: [<lista_obras>]
    
    COORDINA TURNOS {
      duracion: <tiempo>
      modo: auto | manual
      ceremonias: [<lista>]
    }
  }
  
  PUBLICA BOE {
    tipo: "SPRINT-START" | "SPRINT-END"
    sprint_id: <numero>
    obras_activas: [<lista>]
  }
  
  RESUELVE BLOQUEOS {
    agente: <id_agente>
    tipo: <tipo_bloqueo>
    accion: <accion_resolucion>
  }
}
```

### Ejemplo

```alephscript
THRESHOLD_GUARDIAN "scrum_master" {
  arquetipo: "Facilitador"
  
  FACILITA CASTING {
    obras: [user_auth, feed_timeline]
    
    COORDINA TURNOS {
      duracion: 2_semanas
      modo: auto
      ceremonias: [daily, planning, review, retro]
    }
  }
  
  PUBLICA BOE {
    tipo: "SPRINT-START"
    sprint_id: 1
    obras_activas: [user_auth]
    fecha_inicio: "2025-11-06"
    fecha_fin: "2025-11-20"
  }
  
  RESUELVE BLOQUEOS {
    si agente.estado == BLOQUEADO:
      identificar_dependencias()
      asignar_mentor()
      extender_timeout_etapa()
  }
}
```

### Artefactos Generados

```
GIT/
  └── turnos.json

BOE/
  ├── ARRAKIS-SPRINT-1-START.md
  └── ARRAKIS-SPRINT-1-END.md

.arrakis/
  └── obras.json (actualizado)
```

---

## 3️⃣ SHAPESHIFTER (Frontend Developer)

### Función Narrativa
El **Cambiante** transforma constantemente la apariencia. En AlephScript, diseña las interfaces y componentes visuales del teatro.

### Rol DevOps Equivalente
- Frontend Developer
- UI/UX Designer
- Frontend Architect

### Fase Principal
**CASTING → EN_CARTEL**: Diseña y construye interfaces

### Responsabilidades

**Diseño**:
- Diseñar `TABLEROS` (vistas)
- Definir `SLIDES` (componentes)
- Crear layouts responsivos
- Implementar interacciones

**Técnicas**:
- Trabajar en `UI_UX/`
- Sincronizar con `.arrakis/obras.json`
- Generar componentes React/Angular/Vue
- Implementar validaciones frontend

### Primitivas AlephScript

```alephscript
SHAPESHIFTER "<id_shapeshifter>" {
  arquetipo: "Artesano Visual" | "Diseñador"
  
  DISEÑA TABLERO "<nombre>" {
    tipo: "<tipo_vista>"
    
    SLIDES {
      <slide_id>: {
        tipo: "<tipo_componente>"
        componentes: [<lista>]
        estado: sync_from(<fuente>)
      }
    }
  }
  
  INTERACTUA PLATAFORMA "<framework>" {
    framework_version: "<version>"
    sync_state_from: "<archivo_estado>"
    componentes: [<lista_componentes>]
  }
  
  VALIDA FRONTEND {
    formulario: "<id_formulario>"
    reglas: BOE[<referencia_validacion>]
  }
}
```

### Ejemplo

```alephscript
SHAPESHIFTER "frontend_dev" {
  arquetipo: "Artesano Visual"
  
  DISEÑA TABLERO "login_page" {
    tipo: "authentication"
    
    SLIDES {
      hero: {
        tipo: "landing"
        componentes: ["logo", "tagline", "cta_button"]
      }
      
      form: {
        tipo: "input"
        campos: ["email", "password"]
        validacion: BOE[VALIDATION-RULES-AUTH]
        estado: sync_from(".arrakis/obras.json[user_auth]")
      }
      
      footer: {
        tipo: "navigation"
        links: ["terms", "privacy", "contact"]
      }
    }
  }
  
  INTERACTUA PLATAFORMA "react" {
    framework_version: "18.2"
    sync_state_from: ".arrakis/theater_state.json"
    componentes: ["LoginForm", "Hero", "Footer"]
  }
  
  VALIDA FRONTEND {
    formulario: "login_form"
    reglas: BOE[VALIDATION-RULES-AUTH]
  }
}
```

### Artefactos Generados

```
UI_UX/
  ├── tableros/
  │   └── login_page.json
  └── slides/
      ├── hero.json
      └── form.json

src/
  └── components/
      ├── LoginForm.tsx
      ├── Hero.tsx
      └── Footer.tsx
```

---

## 4️⃣ ALLY (Backend Developer)

### Función Narrativa
El **Aliado** es el compañero técnico del héroe. Construye los sistemas que permiten que la aventura avance.

### Rol DevOps Equivalente
- Backend Developer
- API Developer
- Backend Architect

### Fase Principal
**CASTING → EN_CARTEL**: Diseña y construye backend

### Responsabilidades

**Construcción**:
- Definir `PLATAFORMAS` (APIs)
- Implementar `ENDPOINTS`
- Gestionar lógica de negocio
- Integrar con bases de datos

**Técnicas**:
- Crear APIs en Express/Nest.js
- Definir modelos de datos
- Implementar autenticación/autorización
- Sincronizar con MongoDB

### Primitivas AlephScript

```alephscript
ALLY "<id_ally>" {
  arquetipo: "Constructor de Sistemas" | "Backend Engineer"
  
  CONSTRUYE PLATAFORMA "<nombre>" {
    protocolo: "REST" | "GraphQL" | "gRPC"
    puerto: <numero>
    
    ENDPOINTS {
      "<ruta>": {
        metodo: GET | POST | PUT | DELETE
        validacion: BOE[<referencia>]
        accion: ACT { <logica> }
        respuesta: <tipo_respuesta>
      }
    }
  }
  
  SYNC {
    <base_datos>: {
      conexion: env.<VAR>
      colecciones: [<lista>]
    }
  }
  
  IMPLEMENTA LOGICA {
    funcion: "<nombre>"
    entrada: <tipo>
    salida: <tipo>
    codigo: { <implementacion> }
  }
}
```

### Ejemplo

```alephscript
ALLY "backend_dev" {
  arquetipo: "Constructor de Sistemas"
  
  CONSTRUYE PLATAFORMA "api_auth" {
    protocolo: "REST"
    puerto: 3000
    
    ENDPOINTS {
      "/api/auth/register": {
        metodo: POST
        validacion: BOE[VALIDATION-RULES-AUTH]
        accion: ACT { 
          validar_email(req.body.email)
          hashear_password(req.body.password)
          registrar_usuario_en_mongodb()
          generar_jwt_token()
        }
        respuesta: {
          usuario: Usuario,
          token: string
        }
      }
      
      "/api/auth/login": {
        metodo: POST
        accion: ACT { 
          buscar_usuario(req.body.email)
          validar_credenciales(req.body.password)
          generar_jwt_token()
          actualizar_ultimo_login()
        }
        respuesta: {
          token: string,
          expira_en: number
        }
      }
      
      "/api/auth/profile": {
        metodo: GET
        middleware: [verificar_jwt]
        accion: ACT {
          obtener_perfil(req.user.id)
        }
        respuesta: Usuario
      }
    }
  }
  
  SYNC {
    mongodb: {
      conexion: env.MONGO_URI
      colecciones: ["users", "sessions", "tokens"]
    }
    
    redis: {
      conexion: env.REDIS_URL
      uso: "cache_sesiones"
    }
  }
  
  IMPLEMENTA LOGICA {
    funcion: "generar_jwt_token"
    entrada: {user_id: string, role: string}
    salida: {token: string, expira_en: number}
    codigo: {
      payload = {user_id, role, iat: ahora()}
      token = jwt.sign(payload, env.JWT_SECRET, {expiresIn: "7d"})
      retornar {token, expira_en: 604800}
    }
  }
}
```

### Artefactos Generados

```
PLATAFORMAS/
  └── api_auth/
      ├── routes.json
      ├── controllers/
      │   └── authController.js
      └── models/
          └── User.js

src/
  ├── routes/
  │   └── auth.routes.ts
  └── services/
      └── auth.service.ts
```

---

## 5️⃣ MENTOR (Database Admin)

### Función Narrativa
El **Mentor** es el guardián del conocimiento ancestral. Gestiona las fuentes de verdad: BOE, BDCs y bases de datos.

### Rol DevOps Equivalente
- Database Administrator
- Data Engineer
- Knowledge Manager

### Fase Principal
**EN_CARTEL**: Gestiona conocimiento durante ejecución

### Responsabilidades

**Custodia**:
- Gestionar `BOE` (inmutable)
- Mantener `BDCs` sincronizados
- Administrar MongoDB
- Ejecutar `DECOHERENCE`

**Técnicas**:
- Sincronizar feeds
- Validar coherencia
- Hacer backups
- Optimizar queries

### Primitivas AlephScript

```alephscript
MENTOR "<id_mentor>" {
  arquetipo: "Guardián de la Memoria" | "Archivista"
  
  CUSTODIA BOE {
    ubicacion: "<path>"
    formato: "markdown" | "json"
    inmutable: true
    backup_cada: <tiempo>
  }
  
  CUSTODIA BDC {
    fuentes: [<lista_plataformas>]
    
    SYNC {
      cada: <tiempo>
      desde: plataformas_activas
      hacia: "<path>"
      formato: "json"
    }
  }
  
  EJECUTA DECOHERENCE {
    cada: "<frecuencia>"
    valida: [<lista_validaciones>]
    reporta_en: "<path>"
  }
  
  ADMINISTRA DB {
    motor: "mongodb" | "postgresql"
    operaciones: [backup, optimize, migrate]
  }
}
```

### Ejemplo

```alephscript
MENTOR "dba" {
  arquetipo: "Guardián de la Memoria"
  
  CUSTODIA BOE {
    ubicacion: "./BOE"
    formato: "markdown"
    inmutable: true
    backup_cada: 1_dia
    backup_destino: "s3://backups/boe/"
  }
  
  CUSTODIA BDC {
    fuentes: ["telegram", "oasis", "discord"]
    
    SYNC {
      cada: 1_hora
      desde: plataformas_activas
      hacia: "./BDC"
      formato: "json"
      incluir_multimedia: true
    }
  }
  
  EJECUTA DECOHERENCE {
    cada: "commit"
    valida: [
      BOE_coherente,
      BDC_sincronizadas,
      referencias_validas,
      schema_mongodb_actualizado,
      indices_optimizados
    ]
    reporta_en: "DECOHERENCE/validation_report.json"
  }
  
  ADMINISTRA DB {
    motor: "mongodb"
    operaciones: [
      backup: {frecuencia: "diaria", destino: "s3://backups/db/"},
      optimize: {indices: auto, slow_queries: log},
      migrate: {estrategia: "rolling", rollback: auto}
    ]
  }
}
```

### Artefactos Generados

```
BOE/
  └── *.md (continuo)

BDC/
  ├── telegram/feed_*.json
  ├── oasis/feed_*.json
  └── discord/feed_*.json

DECOHERENCE/
  ├── validation_report.json
  └── reports/
      └── *.json

backups/
  ├── boe/
  └── mongodb/
```

---

## 6️⃣ TRICKSTER (DevOps Engineer)

### Función Narrativa
El **Trickster** es el ingeniero del caos, el que orquesta sistemas complejos y automáticamente convierte problemas en soluciones.

### Rol DevOps Equivalente
- DevOps Engineer
- SRE (Site Reliability Engineer)
- Platform Engineer

### Fase Principal
**EN_CARTEL → CLAUSURADO**: Orquesta ejecución y transiciones

### Responsabilidades

**Orquestación**:
- Gestionar `GIT` (turnos, CI/CD)
- Automatizar `TURNOS`
- Ejecutar `TRANSICION{}`
- Deployment y scaling

**Técnicas**:
- Configurar GitHub Actions
- Gestionar Docker/Kubernetes
- Monitoring y alertas
- Automatización de flujos

### Primitivas AlephScript

```alephscript
TRICKSTER "<id_trickster>" {
  arquetipo: "Ingeniero del Caos" | "Automatizador"
  
  ORQUESTA GIT {
    estrategia: "gitflow" | "trunk-based"
    
    TURNOS {
      en_commit: { <acciones> }
      en_pr_merge: { <acciones> }
      en_release: { <acciones> }
    }
  }
  
  AUTOMATIZA CI_CD {
    pipeline: [<stages>]
    deploy_si: <condiciones>
    rollback_si: <condiciones>
  }
  
  TRANSICION "<version_actual> -> <version_nueva>" {
    backup: <lista>
    migracion: ejecutar_scripts
    rollback_si: <condicion>
  }
}
```

### Ejemplo

```alephscript
TRICKSTER "devops" {
  arquetipo: "Ingeniero del Caos"
  
  ORQUESTA GIT {
    estrategia: "gitflow"
    
    TURNOS {
      rama_desarrollo: "develop"
      rama_produccion: "main"
      
      en_commit: {
        ejecutar: ["lint", "unit_tests", "type_check"]
        si_exito: permitir_push
        si_fallo: bloquear_push
      }
      
      en_pr: {
        ejecutar: ["integration_tests", "e2e_tests"]
        requerir_aprobaciones: 2
        validar_con: SHADOW
      }
      
      en_pr_merge: {
        ejecutar: ["build", "deploy_staging"]
        si_exito: actualizar_BOE
        notificar_en: "discord"
      }
      
      en_release: {
        ejecutar: ["tag_version", "build_production", "deploy_production"]
        backup: ["mongodb", "redis", "uploads"]
        notificar_en: ["discord", "telegram", "oasis"]
      }
    }
  }
  
  AUTOMATIZA CI_CD {
    pipeline: [
      lint,
      test,
      build,
      security_scan,
      deploy_staging,
      smoke_tests,
      deploy_production
    ]
    
    deploy_si: {
      branch: "main",
      tests_passed: true,
      security_issues: 0,
      aprobaciones: >= 2
    }
    
    rollback_si: {
      errores: > 5,
      response_time: > 2000ms,
      error_rate: > 5%
    }
  }
  
  TRANSICION "v1.0 -> v2.0" {
    backup: [BOE, BDC, mongodb, redis, ".arrakis/"]
    migracion: ejecutar_scripts en "./migrations/"
    validacion: ejecutar DECOHERENCE
    rollback_si: errores > 5 || validacion_falla
    notificar: "discord#releases"
  }
}
```

### Artefactos Generados

```
.github/
  └── workflows/
      ├── ci.yml
      ├── cd.yml
      └── release.yml

GIT/
  ├── turnos.json
  └── logs/
      └── *.log

docker-compose.yml
Dockerfile
kubernetes/
  ├── deployment.yml
  └── service.yml
```

---

## 7️⃣ SHADOW (QA/Tester)

### Función Narrativa
La **Sombra** es el antagonista constructivo, el que prueba los límites y descubre debilidades. En AlephScript, ejecuta validaciones continuas.

### Rol DevOps Equivalente
- QA Engineer
- Test Engineer
- Automation Tester

### Fase Principal
**EN_CARTEL**: Valida continuamente durante ejecución

### Responsabilidades

**Validación**:
- Ejecutar `CHECK{}`
- Realizar `ASSESS{}`
- Identificar `DECOHERENCE`
- Reportar bugs en `BOE`

**Técnicas**:
- Tests unitarios
- Tests de integración
- Tests E2E
- Validación de criterios

### Primitivas AlephScript

```alephscript
SHADOW "<id_shadow>" {
  arquetipo: "Cazador de Bugs" | "Validador"
  
  PRUEBA OBRA "<id_obra>" {
    etapa: <numero>
    
    CHECK {
      criterios: [<lista>]
      
      si_falla_criterio: {
        publicar BOE[BUG-REPORT]
        bloquear_avance_etapa
        notificar_agente
      }
    }
  }
  
  ASSESS {
    cobertura_tests: >= <porcentaje>
    vulnerabilidades: <numero>
    performance: < <tiempo>
    accesibilidad: >= <score>
  }
  
  EJECUTA TESTS {
    tipo: "unit" | "integration" | "e2e"
    cobertura_minima: <porcentaje>
    falla_si: <condiciones>
  }
}
```

### Ejemplo

```alephscript
SHADOW "qa_tester" {
  arquetipo: "Cazador de Bugs"
  
  PRUEBA OBRA "user_auth" {
    etapa: 6
    
    CHECK {
      criterios: [
        "Usuario puede registrarse con email válido",
        "Contraseña cumple requisitos de seguridad",
        "JWT token se genera correctamente",
        "Token expira después de 7 días",
        "No se permiten emails duplicados"
      ]
      
      si_falla_criterio: {
        publicar BOE[BUG-REPORT] con {
          severidad: "alta",
          criterio_fallado: criterio,
          agente_responsable: ALLY,
          timestamp: ahora()
        }
        bloquear_avance_etapa
        notificar_en: "discord#bugs"
      }
    }
  }
  
  ASSESS {
    cobertura_tests: >= 80%
    vulnerabilidades: 0
    performance: < 200ms_response
    accesibilidad: >= 95
    security_score: >= 90
  }
  
  EJECUTA TESTS {
    unit: {
      framework: "jest",
      cobertura_minima: 80%,
      archivos: "**/*.spec.ts"
    },
    
    integration: {
      framework: "supertest",
      endpoints: "PLATAFORMAS/api_auth/routes.json",
      cobertura_minima: 70%
    },
    
    e2e: {
      framework: "playwright",
      escenarios: "UI_UX/tableros/*.json",
      browsers: ["chromium", "firefox", "webkit"]
    },
    
    falla_si: {
      tests_fallidos: > 0,
      cobertura: < 80%,
      vulnerabilidades: > 0
    }
  }
}
```

### Artefactos Generados

```
tests/
  ├── unit/
  │   └── *.spec.ts
  ├── integration/
  │   └── *.test.ts
  └── e2e/
      └── *.e2e.ts

coverage/
  └── index.html

BOE/
  └── ARRAKIS-BUG-REPORT-*.md
```

---

## 8️⃣ GODDESS (System Admin)

### Función Narrativa
La **Diosa** es la autoridad suprema, la que controla la infraestructura y tiene poder sobre la vida y muerte del teatro.

### Rol DevOps Equivalente
- System Administrator
- Infrastructure Engineer
- Cloud Architect

### Fase Principal
**GENESIS + CLAUSURADO**: Configura infraestructura y cierra ciclos

### Responsabilidades

**Infraestructura**:
- Definir `AUTORIDAD` en plataformas
- Configurar `PLATAFORMAS{}`
- Ejecutar `GENERAR{}` (artefactos finales)
- Gestionar recursos cloud

**Técnicas**:
- Terraform/CloudFormation
- Gestión de accesos (IAM)
- Configuración de servidores
- Backups y disaster recovery

### Primitivas AlephScript

```alephscript
GODDESS "<id_goddess>" {
  arquetipo: "Autoridad Suprema" | "Arquitecta de Infraestructura"
  
  AUTORIDAD PLATAFORMA "<nombre>" {
    proveedor: "<cloud_provider>"
    region: "<region>"
    
    recursos: {
      <tipo_recurso>: {<configuracion>}
    }
  }
  
  CONFIGURA ACCESOS {
    usuarios: [<lista>]
    roles: [<lista>]
    politicas: [<lista>]
  }
  
  CLAUSURA {
    GENERAR { <artefactos> }
    backup: <destinos>
    archivo: <ubicaciones>
  }
}
```

### Ejemplo

```alephscript
GODDESS "sysadmin" {
  arquetipo: "Autoridad Suprema"
  
  AUTORIDAD PLATAFORMA "aws" {
    proveedor: "Amazon Web Services"
    region: "us-east-1"
    cuenta: env.AWS_ACCOUNT_ID
    
    recursos: {
      ec2: {
        instancias: 3,
        tipo: "t3.medium",
        ami: "ami-ubuntu-22.04",
        security_groups: ["web", "ssh"]
      },
      
      rds: {
        motor: "mongodb",
        version: "6.0",
        instancia: "db.t3.medium",
        storage: "100GB",
        backup_retention: 7_dias
      },
      
      s3: {
        buckets: [
          {nombre: "arrakis-storage", region: "us-east-1"},
          {nombre: "arrakis-backups", region: "us-west-2"}
        ]
      },
      
      cloudwatch: {
        alarmas: [
          {metrica: "CPU", threshold: 80, accion: "scale_up"},
          {metrica: "Memory", threshold: 90, accion: "alert"}
        ]
      }
    }
  }
  
  CONFIGURA ACCESOS {
    usuarios: [
      {id: "devops", rol: "admin", mfa: true},
      {id: "developer", rol: "developer", mfa: false}
    ],
    
    roles: [
      {
        nombre: "admin",
        permisos: ["*"],
        recursos: ["*"]
      },
      {
        nombre: "developer",
        permisos: ["read", "write"],
        recursos: ["ec2", "s3", "logs"]
      }
    ],
    
    politicas: [
      {nombre: "RequireMFA", efecto: "Deny", condicion: "!mfa"},
      {nombre: "RestrictRegion", efecto: "Deny", recursos: "!us-east-1"}
    ]
  }
  
  CLAUSURA {
    GENERAR {
      snapshot_mongodb: "s3://arrakis-backups/v1.0/mongodb.snapshot",
      archivo_logs: "s3://arrakis-backups/v1.0/logs.tar.gz",
      boe_libro: "BOE/libros/teatro-v1.0.pdf",
      terraform_state: "s3://arrakis-backups/v1.0/terraform.tfstate"
    }
    
    backup: {
      destino_primario: "s3://arrakis-backups/",
      destino_secundario: "glacier://arrakis-archive/",
      retencion: 90_dias,
      encriptar: true
    }
    
    archivo: {
      boe: "s3://arrakis-archive/boe/",
      bdc: "s3://arrakis-archive/bdc/",
      codigo: "s3://arrakis-archive/repo/"
    }
  }
}
```

### Artefactos Generados

```
infrastructure/
  ├── terraform/
  │   ├── main.tf
  │   ├── variables.tf
  │   └── outputs.tf
  └── ansible/
      └── playbooks/

.arrakis/
  └── plataformas.json

backups/
  ├── s3://arrakis-backups/
  └── glacier://arrakis-archive/
```

---

## 🔄 Coordinación entre Arquetipos

### Ejemplo de Flujo Completo

```
1. HERALD declara monomito "user_auth"
   └─> Genera: monomitos.json, BOE/GENESIS

2. THRESHOLD_GUARDIAN facilita CASTING
   └─> Coordina: SHAPESHIFTER + ALLY + MENTOR

3. SHAPESHIFTER diseña UI
   └─> Genera: UI_UX/tableros/login_page.json

4. ALLY diseña API
   └─> Genera: PLATAFORMAS/api_auth/routes.json

5. GODDESS configura infraestructura
   └─> Genera: infrastructure/terraform/

6. TRICKSTER configura CI/CD
   └─> Genera: .github/workflows/

7. EN_CARTEL comienza:
   - SHAPESHIFTER implementa componentes React
   - ALLY implementa endpoints Express
   - TRICKSTER ejecuta turnos automáticos
   - SHADOW valida con tests
   - MENTOR sincroniza BDCs cada hora

8. SHADOW detecta bug
   └─> Publica: BOE/BUG-REPORT-001.md
   └─> Notifica: ALLY en Discord

9. ALLY corrige bug
   └─> Commit en Git
   └─> TRICKSTER ejecuta CI/CD
   └─> SHADOW valida fix

10. Todos los criterios cumplidos
    └─> THRESHOLD_GUARDIAN declara FIN de obra
    └─> GODDESS ejecuta CLAUSURA
    └─> Genera: certificados, backups, BOE libro
```

---

## 💡 Conclusión

Los arquetipos AlephScript transforman los roles técnicos DevOps en **funciones narrativas** que:

1. **Tienen propósito claro** en cada fase del teatro
2. **Se coordinan automáticamente** vía BOE y turnos
3. **Generan artefactos específicos** que se heredan entre fases
4. **Operan tanto a nivel técnico como narrativo**

Esto permite que equipos distribuidos (humanos + IAs) colaboren en una "obra" compartida, donde cada arquetipo sabe exactamente **cuándo actuar**, **qué hacer** y **con quién coordinarse**.

---

**Siguiente documento**: [06_ELEMENTOS_SISTEMA.md](06_ELEMENTOS_SISTEMA.md)
