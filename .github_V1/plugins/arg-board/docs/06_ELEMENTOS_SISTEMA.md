# 06 - Elementos del Sistema AlephScript

**Contexto**: Estructura de directorios, artefactos y flujos generados por AlephScript

---

## 🏗️ Arquitectura de Directorios Generada

Cuando un proyecto AlephScript se ejecuta, genera automáticamente una estructura de directorios que refleja los estados del Teatro Arrakis.

### Estructura Completa

```
proyecto-alephscript/
├── .arrakis/                    # Estado vivo del teatro
│   ├── theater_state.json       # Estado actual del teatro
│   ├── obras.json               # Definición de obras activas
│   ├── monomitos.json           # Definición de monomitos
│   ├── actores.json             # Agentes registrados
│   └── plataformas.json         # Plataformas configuradas
│
├── .heroe/                      # Estado de cada agente
│   ├── <agente_id>/
│   │   ├── journey_state.json   # Estado del viaje del héroe
│   │   ├── contacts.json        # Aliados y mentores
│   │   ├── resources.json       # Recursos recopilados
│   │   ├── epitafio.md          # Resumen final (CLAUSURADO)
│   │   └── certificado_*.pdf    # Certificados obtenidos
│   └── ...
│
├── BOE/                         # Boletín Oficial (inmutable)
│   ├── ARRAKIS-GENESIS-*.md     # Disposiciones de GENESIS
│   ├── ARRAKIS-OBRA-*.md        # Disposiciones de obras
│   ├── ARRAKIS-SPRINT-*.md      # Disposiciones de sprints
│   ├── HEROE-JOURNEY-*.md       # Progreso de agentes
│   ├── HEROE-DECISION-*.md      # Decisiones tomadas
│   ├── HEROE-ADVANCE-*.md       # Avances de etapa
│   ├── HEROE-DECEASED-*.md      # Agentes fallidos
│   ├── HEROE-VICTORY-*.md       # Victorias completadas
│   ├── BUG-REPORT-*.md          # Reportes de bugs
│   ├── ARRAKIS-CLAUSURA-*.md    # Disposiciones de cierre
│   └── libros/                  # BOE compilado por versión
│       └── teatro-*-v*.pdf
│
├── BDC/                         # Bases de Conocimiento (feeds)
│   ├── telegram/
│   │   ├── feed_YYYYMMDD.json
│   │   ├── media/
│   │   └── ...
│   ├── oasis/
│   │   ├── feed_YYYYMMDD.json
│   │   └── ...
│   ├── discord/
│   │   └── feed_YYYYMMDD.json
│   └── email/
│       └── mbox_YYYYMMDD.mbox
│
├── DECOHERENCE/                 # Validación de coherencia
│   ├── index.json               # Configuración de validaciones
│   ├── validation_report.json   # Último reporte
│   ├── cache/                   # Estados previos
│   └── reports/                 # Histórico de reportes
│       └── report_*.json
│
├── GIT/                         # Sistema de turnos
│   ├── turnos.json              # Registro de turnos
│   ├── logs/                    # Logs de ejecución
│   │   └── turno_*.log
│   └── PRs/                     # Pull Requests gestionados
│       └── pr_*.json
│
├── UI_UX/                       # Interfaces y componentes
│   ├── tableros/                # Definiciones de vistas
│   │   ├── <tablero_id>.json
│   │   └── ...
│   ├── slides/                  # Componentes individuales
│   │   ├── <slide_id>.json
│   │   └── ...
│   ├── layouts/                 # Layouts generados
│   └── templates/               # Templates reutilizables
│
├── PLATAFORMAS/                 # APIs y servicios
│   ├── <plataforma_id>/
│   │   ├── routes.json          # Definición de endpoints
│   │   ├── controllers/         # Controladores generados
│   │   ├── models/              # Modelos de datos
│   │   └── middlewares/         # Middlewares
│   └── ...
│
├── REPORTES/                    # Reportes generados
│   ├── <obra_id>-cierre-v*.md
│   ├── estadisticas_*.json
│   └── grafos/
│       └── conversacion_*.json
│
├── ARCHIVES/                    # Archivos de versiones pasadas
│   ├── bdcs-temporada-*.tar.gz
│   ├── theater_state_v*.json
│   └── backup_completo_v*.tar.gz
│
├── .prompts/                    # Prompts generados automáticamente
│   ├── <obra_id>/
│   │   ├── etapa_01_prompt.md
│   │   ├── etapa_02_prompt.md
│   │   └── ...
│   └── ...
│
├── infrastructure/              # Infraestructura como código
│   ├── terraform/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   └── ansible/
│       └── playbooks/
│
├── tests/                       # Tests generados
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── src/                         # Código fuente generado
│   ├── components/
│   ├── services/
│   ├── routes/
│   └── ...
│
├── .github/                     # CI/CD y chatmodes
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── cd.yml
│   │   └── release.yml
│   └── chatmodes/
│       ├── <agente_id>.md
│       └── ...
│
├── genesis.asc                  # Archivo de configuración GENESIS
├── <obra_id>.obra.asc           # Archivos de definición de obras
├── package.json                 # Dependencias del proyecto
├── docker-compose.yml           # Orquestación de contenedores
├── Dockerfile                   # Imagen del proyecto
└── README.md                    # Documentación del teatro
```

---

## 📊 Artefactos por Fase

### GENESIS

**Generados por**:
- HERALD
- GODDESS
- THRESHOLD_GUARDIAN

**Artefactos**:
```
.arrakis/
  ├── theater_state.json
  ├── actores.json
  ├── monomitos.json
  └── plataformas.json

BOE/
  └── ARRAKIS-GENESIS-<teatro>-<timestamp>.md

infrastructure/
  └── terraform/ (si se usa cloud)
```

**Ejemplo de `theater_state.json`**:
```json
{
  "teatro_id": "MiProyecto",
  "version": "1.0.0",
  "estado": "GENESIS",
  "fecha_genesis": "2025-11-06T10:00:00Z",
  "fecha_ultima_actualizacion": "2025-11-06T10:00:00Z",
  "plataformas": ["github", "telegram", "discord"],
  "agentes": ["dev1", "dev2", "qa1", "devops1"],
  "monomitos": ["mvp", "scaling"],
  "configuracion": {
    "modo": "auto",
    "timeout_turno": 10,
    "timeout_etapa": 5,
    "boe_enabled": true,
    "bdc_sync_interval": "1h",
    "decoherence_enabled": true,
    "decoherence_interval": "30m"
  }
}
```

---

### CASTING

**Generados por**:
- THRESHOLD_GUARDIAN
- SHAPESHIFTER
- ALLY
- MENTOR

**Artefactos**:
```
.arrakis/
  ├── obras.json (actualizado)
  └── monomitos.json (actualizado con etapas)

BOE/
  └── ARRAKIS-OBRA-<obra_id>-<timestamp>.md

.prompts/
  └── <obra_id>/
      ├── etapa_01_prompt.md
      ├── etapa_02_prompt.md
      └── ...

UI_UX/
  ├── tableros/
  │   └── <tablero_id>.json
  └── slides/
      └── <slide_id>.json

PLATAFORMAS/
  └── <plataforma_id>/
      ├── routes.json
      └── models/
```

**Ejemplo de `obras.json`**:
```json
{
  "mvp": {
    "nombre": "MVP Launch",
    "tipo": "monomito",
    "estado": "DISEÑADO",
    "actores": ["dev1", "dev2"],
    "tablero": "mvp-repo",
    "fecha_creacion": "2025-11-06T11:00:00Z",
    "monomito_ref": "mvp",
    "etapa_actual": 0,
    "criterios_cumplidos_totales": 0,
    "total_criterios": 36
  }
}
```

**Ejemplo de `monomitos.json`**:
```json
{
  "mvp": {
    "nombre": "MVP Launch",
    "objetivo": "Lanzar producto mínimo viable",
    "tipo": "monomito",
    "fases": {
      "partida": [1, 2, 3, 4, 5],
      "iniciacion": [6, 7, 8, 9],
      "retorno": [10, 11, 12]
    },
    "etapas": [
      {
        "num": 1,
        "nombre": "Mundo ordinario",
        "fase": "partida",
        "objetivo": "Establecer contexto del proyecto",
        "criterios": [
          "Agente leyó product requirements",
          "Agente conoce stack tecnológico",
          "Agente configuró entorno de desarrollo"
        ],
        "total_criterios": 3,
        "criterios_cumplidos": 0
      }
      // ... 11 etapas más
    ]
  }
}
```

---

### EN_CARTEL

**Generados por**:
- Todos los arquetipos

**Artefactos** (generación continua):
```
BOE/
  ├── HEROE-JOURNEY-<agente>-<turno>.md
  ├── HEROE-DECISION-<agente>-<decision>.md
  ├── HEROE-ADVANCE-<agente>-etapa-<num>.md
  ├── HEROE-DECEASED-<agente>-etapa-<num>.md (si falla)
  ├── HEROE-VICTORY-<agente>-<obra>.md (si completa)
  └── BUG-REPORT-<id>.md

.heroe/
  └── <agente_id>/
      ├── journey_state.json (actualizado continuamente)
      └── contacts.json

BDC/
  ├── telegram/feed_YYYYMMDD.json
  ├── oasis/feed_YYYYMMDD.json
  └── discord/feed_YYYYMMDD.json

GIT/
  ├── turnos.json (actualizado)
  └── logs/
      └── turno_<id>.log

DECOHERENCE/
  └── reports/
      └── report_<timestamp>.json

src/
  └── (código implementado por SHAPESHIFTER y ALLY)

tests/
  └── (tests implementados por SHADOW)

git-commits/
  └── (commits continuos)
```

**Ejemplo de `journey_state.json`**:
```json
{
  "agente_id": "dev1",
  "obra_actual": "mvp",
  "estado": "ALIVE",
  "etapa_actual": 6,
  "etapas_completadas": [1, 2, 3, 4, 5],
  "criterios_cumplidos_totales": 15,
  "total_criterios": 36,
  "porcentaje_completado": 41.67,
  "turnos_ejecutados": 23,
  "turnos_en_etapa_actual": 3,
  "ultimo_turno": 23,
  "ultimo_timestamp": "2025-11-06T15:30:00Z",
  "decisiones_tomadas": {
    "etapa_5_arquitectura": "microservicios"
  },
  "aliados": ["dev2", "qa1"],
  "mentores": ["mentor_ai"],
  "recursos_recopilados": [
    "BOE/ARRAKIS-PLAT-REGISTER-GITHUB.md",
    "https://docs.nestjs.com"
  ]
}
```

**Ejemplo de disposición BOE (HEROE-JOURNEY)**:
```markdown
# HEROE-JOURNEY-dev1-023

**Tipo**: JOURNEY  
**Agente**: dev1  
**Obra**: mvp  
**Turno**: 23  
**Etapa**: 6  
**Fecha**: 2025-11-06T15:30:00Z  

## Acciones Ejecutadas

1. **SYNC**: Sincronizado con BOE y BDC
2. **ASSESS**: Evaluado criterios de etapa 6
3. **ACT**: 
   - Ejecutado `/heroe-scaffold microservicios`
   - Creado estructura de carpetas
   - Configurado NestJS
4. **INTERACT**:
   - Consultado con dev2 sobre módulos
   - Solicitado revisión de arquitectura a mentor_ai
5. **RECORD**: Publicando esta disposición
6. **CHECK**: Validando criterios

## Criterios Cumplidos en este Turno

- ✅ Backend API structure created
- ✅ NestJS configured
- ⏳ Tests at 50% (objetivo: 80%)

## Estado Actual

- **Etapa**: 6 (Pruebas, aliados, enemigos)
- **Progreso en etapa**: 66.67%
- **Progreso total**: 41.67%
- **Estado**: ALIVE

## Próximas Acciones

- Implementar endpoints de autenticación
- Aumentar cobertura de tests al 80%
- Solicitar revisión de SHADOW

## Firma

`sha256:b8c7d6e5f4a3...`
```

---

### CLAUSURADO

**Generados por**:
- GODDESS
- MENTOR
- HERALD

**Artefactos**:
```
REPORTES/
  └── <obra_id>-cierre-v<version>.md

BOE/
  ├── ARRAKIS-CLAUSURA-<teatro>-v<version>.md
  └── libros/
      └── teatro-<nombre>-temporada-<num>.pdf

ARCHIVES/
  ├── bdcs-temporada-<num>.tar.gz
  ├── theater_state_v<version>.json
  └── backup_completo_v<version>.tar.gz

.heroe/
  └── <agente_id>/
      ├── epitafio.md
      └── certificado_<obra>.pdf

backups/
  ├── s3://arrakis-backups/v<version>/
  └── glacier://arrakis-archive/v<version>/
```

**Ejemplo de `epitafio.md`**:
```markdown
# Epitafio de dev1 - Obra MVP v1.0

**Teatro**: MiProyecto  
**Obra**: MVP Launch  
**Versión**: 1.0.0  
**Estado Final**: VICTORIOSO  
**Fecha Inicio**: 2025-11-06  
**Fecha Fin**: 2025-12-06  
**Duración**: 30 días  

## Estadísticas

- **Etapas completadas**: 12/12 (100%)
- **Criterios cumplidos**: 36/36 (100%)
- **Turnos ejecutados**: 87
- **Commits realizados**: 145
- **Tests escritos**: 234
- **Bugs reportados**: 12
- **Bugs resueltos**: 12

## Fases del Viaje

### Partida (Etapas 1-5)
- **Duración**: 8 días
- **Decisiones clave**:
  - Arquitectura: Microservicios
  - Stack: NestJS + React + MongoDB
- **Aliados encontrados**: dev2, qa1

### Iniciación (Etapas 6-9)
- **Duración**: 15 días
- **Desafíos superados**:
  - Implementación de autenticación JWT
  - Integración con MongoDB Atlas
  - Tests de integración complejos
- **Mentorías recibidas**: 7 (de mentor_ai)

### Retorno (Etapas 10-12)
- **Duración**: 7 días
- **Contribuciones al teatro**:
  - Documentación completa en Wiki
  - 3 guías para nuevos agentes
  - Código reutilizable en biblioteca compartida

## Aprendizajes Clave

1. La arquitectura de microservicios requiere más tiempo inicial pero facilita el scaling
2. La comunicación asíncrona con BDC es crucial para coordinación
3. El sistema de turnos automáticos acelera el desarrollo

## Reconocimientos

- 🏆 Certificado MVP Launch
- 🥇 Primer agente en completar las 12 etapas
- 🎖️ Cobertura de tests al 95% (objetivo: 80%)

## Palabras Finales

"El viaje del héroe no termina con el MVP lanzado, sino cuando compartes el conocimiento con la siguiente generación de agentes. Que este epitafio sirva de guía para quienes vengan después."

---

_Firmado digitalmente por el Teatro Arrakis el 2025-12-06_
```

---

## 🔄 Ciclo de Vida de un Archivo

### Ejemplo: `journey_state.json` de un agente

```
GENESIS:
  → No existe aún

CASTING:
  → Se crea con estado inicial:
  {
    "agente_id": "dev1",
    "obra_actual": null,
    "estado": "IDLE",
    "etapa_actual": 0,
    ...
  }

EN_CARTEL:
  → Se actualiza en cada turno:
  - etapa_actual incrementa
  - criterios_cumplidos aumenta
  - decisiones_tomadas se registran
  - aliados se añaden
  
  → Puede cambiar estado:
  - ALIVE -> BLOQUEADO (si necesita ayuda)
  - ALIVE -> DECEASED (si falla timeout)
  - ALIVE -> VICTORIOSO (si completa)

CLAUSURADO:
  → Se congela en ARCHIVES:
  ARCHIVES/
    └── theater_state_v1.0.json
        └── contiene .heroe/dev1/journey_state.json
  
  → Se genera epitafio.md basado en journey_state.json final
```

---

## 🗂️ Gestión de Archivos por Arquetipo

| Arquetipo | Archivos que Crea | Archivos que Lee | Archivos que Actualiza |
|-----------|-------------------|------------------|------------------------|
| **HERALD** | `theater_state.json`, `monomitos.json` | - | - |
| **THRESHOLD_GUARDIAN** | `obras.json`, `turnos.json`, BOE/SPRINT | `theater_state.json` | `obras.json` |
| **SHAPESHIFTER** | `UI_UX/tableros/`, `UI_UX/slides/` | `obras.json` | `src/components/` |
| **ALLY** | `PLATAFORMAS/`, `src/services/` | `obras.json` | `src/routes/` |
| **MENTOR** | `BDC/`, `DECOHERENCE/reports/` | BOE, BDC | `DECOHERENCE/validation_report.json` |
| **TRICKSTER** | `.github/workflows/`, `GIT/turnos.json` | `theater_state.json` | `GIT/logs/` |
| **SHADOW** | `tests/`, BOE/BUG-REPORT | `obras.json`, `monomitos.json` | `coverage/` |
| **GODDESS** | `infrastructure/`, `backups/` | Todos | `ARCHIVES/` |

---

## 🔍 Sistema de Búsqueda y Referencias

### Referencias entre Archivos

AlephScript mantiene un sistema de referencias consistente:

```
BOE/HEROE-DECISION-dev1-etapa-5.md
  └─> Referencias:
      - .heroe/dev1/journey_state.json
      - .arrakis/monomitos.json[mvp].etapas[5]
      - BOE/ARRAKIS-OBRA-MVP-*.md

.arrakis/obras.json[mvp]
  └─> Referencias:
      - .arrakis/monomitos.json[mvp]
      - .arrakis/actores.json[dev1, dev2]
      - UI_UX/tableros/mvp-repo.json

DECOHERENCE/validation_report.json
  └─> Valida coherencia de:
      - BOE/*.md
      - BDC/*/feed_*.json
      - .arrakis/*.json
      - .heroe/*/journey_state.json
```

### Comandos de Inspección

```bash
# Ver estado del teatro
alephscript status --teatro

# Ver estado de una obra
alephscript status --obra mvp

# Ver estado de un agente
alephscript status --agente dev1

# Ver BOE completo
alephscript boe --list

# Ver BOE filtrado
alephscript boe --tipo HEROE-JOURNEY --agente dev1

# Ver BDCs sincronizados
alephscript bdc --list

# Ver último reporte de DECOHERENCE
alephscript decoherence --report
```

---

## 💡 Conclusión

Los elementos del sistema AlephScript forman un ecosistema vivo donde:

1. **Cada archivo tiene propósito claro** (inmutable vs mutable)
2. **Las referencias son trazables** (auditabilidad total)
3. **Los artefactos se generan automáticamente** (infraestructura como código narrativo)
4. **El estado es distribuido pero coherente** (validación continua)

Esta arquitectura permite que AlephScript funcione como un **7GL**: no solo genera código, sino que **genera mundos ejecutables con memoria, estado y evolución temporal**.

---

**Siguiente documento**: [07_DEVOPS_VS_ALEPHSCRIPT.md](07_DEVOPS_VS_ALEPHSCRIPT.md)
