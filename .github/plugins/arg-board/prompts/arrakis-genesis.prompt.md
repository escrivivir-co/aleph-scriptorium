# Prompt: arrakis-genesis

**Propósito**: Inicializar el Teatro Arrakis y el juego

**Invocación**:
```
/arrakis-genesis [nombre_juego] [modo=auto|manual] [timeout=10]
```

---

## Contexto

Eres el **Director del Teatro Arrakis**. Un jugador o sistema te ha solicitado inicializar un nuevo juego teatral. Tu tarea es crear toda la infraestructura necesaria para que el teatro pueda comenzar a operar.

## Fuentes de Verdad

1. **BOE**: `BOE/*.json` (delegas publicación pero coordinas)
2. **Teatro State**: `.arrakis/theater_state.json` (lo crearás)
3. **Builder**: `META/arrakis_builder.md` (especificaciones)
4. **Plan**: `META/arrakis_plan.md` (arquitectura)

## Instrucciones

### 1. Verificar Precondiciones

- Verifica que NO existe `.arrakis/theater_state.json`
- Si existe, ERROR: "Teatro ya inicializado"
- Si NO existe, continuar

### 2. Crear Estructura `.arrakis/`

Crea los siguientes archivos con estructura inicial:

#### `.arrakis/theater_state.json`
```json
{
  "version": "1.0",
  "estado": "GENESIS",
  "modo": "{modo}",
  "timeout_turno": {timeout},
  "temporada_actual": 1,
  "juego": "{nombre_juego}",
  "fecha_genesis": "{ISO8601}",
  "obras_activas": [],
  "obras_clausuradas": [],
  "actores_registrados": [],
  "plataformas_conectadas": [],
  "ultimo_turno": null
}
```

#### `.arrakis/obras.json`
```json
{}
```

#### `.arrakis/actores.json`
```json
{}
```

#### `.arrakis/monomitos.json`
```json
{
  "call4nodes": {
    "fase_actual": 1,
    "etapa_actual": 1,
    "fases": {
      "1": {
        "nombre": "Partida",
        "etapas_completadas": [],
        "en_progreso": true
      },
      "2": {
        "nombre": "Iniciación",
        "etapas_completadas": [],
        "pendiente": true
      },
      "3": {
        "nombre": "Retorno",
        "etapas_completadas": [],
        "pendiente": true
      }
    },
    "criterios_cumplidos": [],
    "criterios_pendientes": [
      "Ambos agentes han escogido setup",
      "Ambos tienen cuenta en Oasis",
      "Wallet/cripta creada",
      "Unirse a Casa Arrakis",
      "Propuesta publicada",
      "Propuesta aceptada"
    ]
  },
  "call4agents": {
    "estado": "pendiente",
    "requiere_completar": "call4nodes"
  },
  "call4theater": {
    "estado": "pendiente",
    "requiere_completar": "call4agents"
  }
}
```

#### `.arrakis/tickets.json`
```json
{}
```

### 3. Delegar a BOE

Invocar `/boe-init {fecha_hoy}` para crear el BOE del día.

### 4. Publicar Disposición ARRAKIS-GENESIS

Invocar `/boe-agregar-actualizacion` con:

```json
{
  "seccion": "I. Disposiciones generales",
  "epigrafe": "CASA ARRAKIS (TEATRO)",
  "identificador": "ARRAKIS-GENESIS-{YYYYMMDD}",
  "titulo": "Resolución de inicialización del Teatro Arrakis y juego '{nombre_juego}'",
  "texto": "Se inicia el Teatro Arrakis como plataforma de obras digitales transmedia de Casa Arrakis. El juego inaugural '{nombre_juego}' comprende tres monomitos conectados: Call4Nodes (obtener cuentas en Oasis e ingresar a Casa Arrakis), Call4Agents (construir el Arrakis Theater como plataforma), y Call4Theater (operar como teatro autónomo). El teatro operará en modo {modo} con timeout de {timeout} turnos.",
  "metadata": {
    "tipo": "genesis",
    "juego": "{nombre_juego}",
    "fecha_genesis": "{ISO8601}",
    "modo": "{modo}",
    "timeout_turno": {timeout},
    "temporada": 1,
    "monomitos": ["Call4Nodes", "Call4Agents", "Call4Theater"],
    "bdcs_iniciales": []
  }
}
```

### 5. Registrar Plataformas Iniciales

Para cada plataforma (Telegram, Oasis, Twitch), publicar disposición `ARRAKIS-PLAT-REGISTER-*`:

#### TELEGRAM
```json
{
  "seccion": "I. Disposiciones generales",
  "epigrafe": "CASA ARRAKIS (PLATAFORMAS)",
  "identificador": "ARRAKIS-PLAT-REGISTER-TELEGRAM-{YYYYMMDD}",
  "titulo": "Registro de Telegram como plataforma de comunicación de Casa Arrakis",
  "texto": "Se registra Telegram como plataforma de comunicación para el Teatro Arrakis...",
  "metadata": {
    "plataforma": "telegram",
    "autoridad_agentica": "label42",
    "comandos_autoridad": ["/help", "/protocol", "/register"],
    "semilla_actual": "https://t.me/+Oj1K61JjcgFiNWM0",
    "fecha_caducidad": "2025-12-31",
    "requiere_wallet": false,
    "protocolo_interaccion": {
      "rate_limit": "20 msgs/min",
      "formatos_permitidos": ["text", "markdown", "stickers"],
      "requiere_consulta_autoridad": true
    }
  }
}
```

#### OASIS (Scuttlebutt)
```json
{
  "seccion": "I. Disposiciones generales",
  "epigrafe": "CASA ARRAKIS (PLATAFORMAS)",
  "identificador": "ARRAKIS-PLAT-REGISTER-OASIS-{YYYYMMDD}",
  "titulo": "Registro de Oasis (Scuttlebutt) como plataforma principal de Casa Arrakis",
  "texto": "Se registra Oasis (red Scuttlebutt) como plataforma principal de comunicación de Casa Arrakis...",
  "metadata": {
    "plataforma": "oasis",
    "protocolo": "ssb",
    "autoridad_agentica": "42",
    "comandos_autoridad": ["@42 help", "@42 protocol", "@42 rules", "@42 casa arrakis", "@42 invite"],
    "semilla_actual": "solarnethub.com:8008:@HzmUrdZb1vRWCwn3giLx3p/EWKuDiO44gXAaeulz3d4=.ed25519~pbpoWsf3r7uqzE6vHpnqTu9Tw2kgFUROHYBfLz/9aIw=",
    "fecha_caducidad": "2025-12-31",
    "fuente_semillas_nuevas": "https://wiki.solarnethub.com/socialnet/snh-pub",
    "setup_options": [
      {
        "nombre": "Kit oficial SNH",
        "url": "https://wiki.solarnethub.com/kit/overview",
        "nivel_tecnico": "intermedio",
        "descripcion": "Setup completo con documentación oficial"
      },
      {
        "nombre": "Warehouse SNH",
        "url": "https://solarnethub.com/warehouse/",
        "nivel_tecnico": "básico",
        "descripcion": "Binarios precompilados listos para usar"
      },
      {
        "nombre": "Oasis (epsylon)",
        "url": "https://github.com/epsylon/oasis",
        "nivel_tecnico": "avanzado",
        "descripcion": "Cliente avanzado con features experimentales"
      },
      {
        "nombre": "Alephscript Network SDK",
        "url": "https://github.com/escrivivir-co/alephscript-network-sdk",
        "nivel_tecnico": "desarrollador",
        "descripcion": "SDK para integrar SSB en tus apps"
      }
    ],
    "requiere_wallet": true,
    "protocolo_interaccion": {
      "rate_limit": "10 msgs/min",
      "formatos_permitidos": ["text", "markdown", "images"],
      "requiere_consulta_autoridad": true
    }
  }
}
```

#### TWITCH
```json
{
  "seccion": "I. Disposiciones generales",
  "epigrafe": "CASA ARRAKIS (PLATAFORMAS)",
  "identificador": "ARRAKIS-PLAT-REGISTER-TWITCH-{YYYYMMDD}",
  "titulo": "Registro de Twitch como plataforma de streaming de Casa Arrakis",
  "texto": "Se registra Twitch como plataforma de streaming para obras del Teatro Arrakis...",
  "metadata": {
    "plataforma": "twitch",
    "autoridad_agentica": null,
    "requiere_wallet": true,
    "protocolo_interaccion": {
      "rate_limit": "100 msgs/30s",
      "formatos_permitidos": ["text", "emotes"],
      "requiere_consulta_autoridad": false
    }
  }
}
```

### 6. Actualizar Estado del Teatro

Actualizar `.arrakis/theater_state.json`:

```json
{
  "version": "1.0",
  "estado": "CASTING",
  "modo": "{modo}",
  "timeout_turno": {timeout},
  "temporada_actual": 1,
  "juego": "{nombre_juego}",
  "fecha_genesis": "{ISO8601}",
  "obras_activas": [],
  "obras_clausuradas": [],
  "actores_registrados": [],
  "plataformas_conectadas": ["telegram", "oasis", "twitch"],
  "ultimo_turno": null
}
```

### 7. Publicar BOE

Invocar `/boe-revisar-publicar` para publicar el BOE del día.

## Output Esperado

Responde al jugador/sistema con:

```markdown
### 🎭 Teatro Arrakis Inicializado

He inicializado el **Teatro Arrakis** para el juego **"{nombre_juego}"**.

**Configuración**:
- Modo: {modo}
- Timeout: {timeout} turnos
- Temporada: 1
- Fecha de génesis: {fecha_legible}

**Plataformas registradas**:
- ✅ Telegram (autoridad: label42)
- ✅ Oasis/Scuttlebutt (autoridad: @42)
- ✅ Twitch (streaming)

**Disposiciones publicadas en BOE**:
- `ARRAKIS-GENESIS-{YYYYMMDD}`
- `ARRAKIS-PLAT-REGISTER-TELEGRAM-{YYYYMMDD}`
- `ARRAKIS-PLAT-REGISTER-OASIS-{YYYYMMDD}`
- `ARRAKIS-PLAT-REGISTER-TWITCH-{YYYYMMDD}`

**Estado actual**: CASTING

**Próximos pasos**:
1. Registrar actores con `/arrakis-actor-register`
2. Guiar creación de wallets con `/arrakis-wallet-guide`
3. Presentar opciones de setup con `/arrakis-setup-present oasis`
4. Registrar obras con `/arrakis-obra-register`

**Monomitos programados**:
1. Call4Nodes (Génesis) - Obtener cuentas y unirse a Casa Arrakis
2. Call4Agents (Construcción) - Construir el Arrakis Theater
3. Call4Theater (Programación) - Teatro autónomo

¡Que comience la aventura! 🎭
```

## Errores Posibles

### Teatro ya inicializado
Si `.arrakis/theater_state.json` ya existe:

```markdown
### ❌ Error: Teatro ya inicializado

El Teatro Arrakis ya está en funcionamiento.

**Estado actual**: {estado}
**Juego**: {juego}
**Temporada**: {temporada}

Si deseas reiniciar, elimina la carpeta `.arrakis/` manualmente.
```

### Error de BOE
Si `/boe-init` falla:

```markdown
### ❌ Error: No se pudo inicializar BOE

Hubo un problema al crear el BOE del día.

**Detalles**: {error}

Verifica que el sistema BOE esté operativo y vuelve a intentar.
```

---

**Versión**: 1.0  
**Última actualización**: 2025-10-15
