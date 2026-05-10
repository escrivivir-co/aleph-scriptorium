# Manual del Agente Arrakis - Director de Teatro

**Versión**: 1.0  
**Fecha**: 2025-10-15  
**Para**: Jugadores (humanos y agentes HEROE)

---

## Índice

1. [Introducción](#1-introducción)
2. [Conceptos Fundamentales](#2-conceptos-fundamentales)
3. [Tutorial: Tu Primer Monomito](#3-tutorial-tu-primer-monomito)
4. [Guía de Wallets](#4-guía-de-wallets)
5. [Opciones de Setup de Oasis](#5-opciones-de-setup-de-oasis)
6. [Interacción con Autoridades Agénticas](#6-interacción-con-autoridades-agénticas)
7. [Los Tres Monomitos](#7-los-tres-monomitos)
8. [Comandos del Agente Arrakis](#8-comandos-del-agente-arrakis)
9. [Resolución de Problemas](#9-resolución-de-problemas)
10. [Preguntas Frecuentes](#10-preguntas-frecuentes)

---

## 1. Introducción

### ¿Qué es el Teatro Arrakis?

El **Teatro Arrakis** es una plataforma de obras digitales transmedia creada por **Casa Arrakis**, una de las 9 casas del LARP SolarNetHub. Opera como un juego ARG (Alternate Reality Game) donde participantes humanos y agentes de IA colaboran para crear y vivir narrativas basadas en el "Camino del Héroe".

### ¿Qué es el Agente Arrakis?

El **Agente Arrakis** es el "Director de Teatro", un agente orquestador que:

- Coordina "obras" (partidas narrativas)
- Gestiona el progreso de agentes actores
- Publica disposiciones en el BOE (Boletín Oficial)
- Evalúa criterios de éxito
- Facilita la inmersión en el LARP

### ¿A quién está dirigido?

- **Jugadores humanos** que quieren participar en el LARP de Casa Arrakis
- **Agentes HEROE** (agentes autónomos) que siguen el Camino del Héroe
- **Desarrolladores** que quieren entender o extender el sistema
- **Miembros de Casa Arrakis** interesados en la tecnología emancipadora

---

## 2. Conceptos Fundamentales

### El Camino del Héroe (Hero's Journey)

Todas las obras del Teatro Arrakis siguen la estructura narrativa de Joseph Campbell:

**Fase 1: Partida** (Etapas 1-5)
1. Mundo ordinario
2. Llamada a la aventura
3. Rechazo de la llamada
4. Encuentro con el mentor
5. Cruce del primer umbral

**Fase 2: Iniciación** (Etapas 6-9)
6. Pruebas, aliados, enemigos
7. Aproximación a la caverna más profunda
8. Ordalía (la prueba suprema)
9. Recompensa

**Fase 3: Retorno** (Etapas 10-12)
10. El camino de vuelta
11. Resurrección
12. Retorno con el elixir

### Los Tres Monomitos

El juego inaugural "Arrakis Genesis" consiste en 3 monomitos conectados:

1. **Call4Nodes** (Génesis): Obtener cuentas en Oasis e ingresar a Casa Arrakis
2. **Call4Agents** (Construcción): Construir el Arrakis Theater como plataforma
3. **Call4Theater** (Programación): Teatro autónomo gestionando obras comunitarias

### Componentes del Sistema

#### BOE (Boletín Oficial)
Registro público de todas las decisiones y eventos del juego. Formato JSON con disposiciones oficiales.

#### BDC (Base de Conocimiento Conversacional)
Feeds de conversaciones de plataformas (Telegram, Oasis, Twitch) que sirven como evidencia de progreso.

#### .arrakis/
Carpeta con el estado del teatro:
- `theater_state.json`: Estado general
- `obras.json`: Catálogo de obras
- `actores.json`: Registro de participantes
- `monomitos.json`: Progreso de monomitos
- `tickets.json`: Sistema de permisos

#### Wallets
Criptas cifradas donde almacenas tus credenciales de plataformas de forma segura.

---

## 3. Tutorial: Tu Primer Monomito

Este tutorial te guía paso a paso por el primer monomito: **Call4Nodes**.

### Paso 1: Iniciar el Teatro

Si eres el primer jugador, inicializa el teatro:

```
/arrakis-genesis "Arrakis Genesis" auto 10
```

**Qué hace esto**:
- Crea la estructura `.arrakis/`
- Publica disposición `ARRAKIS-GENESIS` en BOE
- Registra plataformas (Telegram, Oasis, Twitch)
- Establece modo AUTO con timeout de 10 turnos

**Output esperado**:
```markdown
### 🎭 Teatro Arrakis Inicializado

He inicializado el Teatro Arrakis para el juego "Arrakis Genesis".

Configuración:
- Modo: auto
- Timeout: 10 turnos
- Temporada: 1

Plataformas registradas:
- ✅ Telegram (autoridad: label42)
- ✅ Oasis/Scuttlebutt (autoridad: @42)
- ✅ Twitch (streaming)

Estado actual: CASTING

Próximos pasos:
1. Registrar actores con `/arrakis-actor-register`
2. Guiar creación de wallets con `/arrakis-wallet-guide`
3. Presentar opciones de setup con `/arrakis-setup-present oasis`

¡Que comience la aventura! 🎭
```

### Paso 2: Registrarte como Actor

```
/arrakis-actor-register tu_id heroe "Tu Arquetipo" "call4nodes,call4agents"
```

**Ejemplo**:
```
/arrakis-actor-register aleph heroe "DevOps Engineer" "call4nodes,call4agents"
```

**Output esperado**:
```markdown
### 🎭 Actor Registrado: aleph

He registrado al actor aleph en el Teatro Arrakis.

Perfil:
- Tipo: heroe
- Arquetipo: DevOps Engineer
- Obras: call4nodes, call4agents
- Wallet: ⚠️  Pendiente

Próximos pasos:
1. Crear wallet con `/arrakis-wallet-guide aleph`
2. Configurar plataformas con `/arrakis-setup-present oasis`

Estado del teatro: CASTING
Actores totales: 1
```

### Paso 3: Crear Tu Wallet

**¿Por qué necesitas una wallet?**

Una wallet (cripta) almacena tus credenciales de forma segura y cifrada. Es tu responsabilidad cifrarla; el agente Arrakis solo guía.

```
/arrakis-wallet-guide aleph intermedio
```

Sigue la guía proporcionada para:
1. Crear estructura `.heroe/aleph/`
2. Escoger método de cifrado (GPG, age, OpenSSL)
3. Cifrar `credentials.json`
4. Hacer backup de perfiles y keys

**Ver**: [Sección 4: Guía de Wallets](#4-guía-de-wallets) para detalles completos.

### Paso 4: Escoger Tu Setup de Oasis

Oasis (Scuttlebutt) es la red principal de Casa Arrakis. Hay 4 opciones de instalación:

```
/arrakis-setup-present oasis intermedio
```

**Opciones**:
1. **Kit oficial SNH** (Intermedio) - Recomendado para empezar
2. **Warehouse SNH** (Básico) - Binarios precompilados
3. **Oasis (epsylon)** (Avanzado) - Cliente experimental
4. **Alephscript Network SDK** (Desarrollador) - SDK para integración

Escoge una opción e instálala siguiendo su documentación.

**Ver**: [Sección 5: Opciones de Setup](#5-opciones-de-setup-de-oasis) para comparación detallada.

### Paso 5: Configurar Tu Cuenta en Oasis

Una vez instalado Oasis:

1. **Inicia el cliente**:
   ```bash
   ssb-server start
   ```

2. **Obtén tu ID de Oasis**:
   ```bash
   ssb-server whoami
   ```
   
   Verás algo como: `@aleph.ed25519`

3. **Conéctate al pub de SolarNetHub**:
   Usa la semilla de invitación del BOE (disposición `ARRAKIS-PLAT-REGISTER-OASIS`)

4. **Actualiza tu perfil de actor**:
   Edita `.arrakis/actores.json` para añadir tu usuario de Oasis

### Paso 6: Consultar a la Autoridad Agéntica (@42)

**¡Importante!** Antes de publicar en Oasis, SIEMPRE consulta a `@42`.

En Oasis, escribe:
```
@42 protocol
```

`@42` te responderá con las reglas de la plataforma. Léelas atentamente.

**Ver**: [Sección 6: Interacción con Autoridades Agénticas](#6-interacción-con-autoridades-agénticas).

### Paso 7: Unirte a Casa Arrakis

Publica un mensaje de presentación en Oasis:

```
Hola Casa Arrakis,

Soy [tu_id], [tu_arquetipo]. He completado el setup de Oasis y estoy listo para proponer el proyecto Arrakis Theater.

Mi objetivo es [breve descripción de tu interés].

Solicito unirme a Casa Arrakis para contribuir con [tus skills].

¡Gracias!
```

### Paso 8: Proponer Arrakis Theater

Una vez aceptado en la casa, publica tu propuesta del Teatro Arrakis:

```markdown
# Propuesta: Arrakis Theater

## Resumen
Crear una plataforma de obras digitales transmedia donde agentes humanos y de IA colaboran en narrativas basadas en el Camino del Héroe.

## Objetivos
1. Facilitar la creación de ARG inmersivos
2. Integrar múltiples plataformas (Oasis, Telegram, Twitch)
3. Coordinar agentes autónomos con MCP
4. Generar comunidad alrededor de tecnología emancipadora

## Componentes
- Agente Arrakis (director/orquestador)
- Sistema de BOE (registro oficial)
- BDCs (feeds conversacionales)
- Wallets cifradas
- Extensión VS Code para "teatro digital"

## Solicito
- Feedback de la casa
- Apoyo de al menos 3 miembros
- Recursos (repo GitHub, canal de comunicación)

## Cronograma
- Monomito 1 (Call4Nodes): 2 semanas
- Monomito 2 (Call4Agents): 1 mes
- Monomito 3 (Call4Theater): 2 meses

¿Qué les parece?
```

### Paso 9: Obtener Apoyo de la Casa

Interactúa con miembros de Casa Arrakis:
- Responde preguntas
- Ajusta la propuesta según feedback
- Consigue al menos 3 apoyos explícitos

### Paso 10: Completar Call4Nodes

Cuando hayas cumplido todos los criterios:

```
/arrakis-eval-monomito call4nodes
```

El agente evaluará:
- ✅ Setup escogido
- ✅ Cuenta en Oasis
- ✅ Wallet creada
- ✅ Unión a Casa Arrakis
- ✅ Consulta a @42
- ✅ Propuesta publicada
- ✅ Propuesta aceptada (3+ apoyos)

Si todos están ✅:

```markdown
### ✅ Decisión: CLAUSURAR CON ÉXITO

El monomito "Call4Nodes" ha cumplido todos sus objetivos.

Criterios cumplidos: 7/7 (100%)
Actores exitosos: 2/2

Siguiente paso: Call4Agents

¿Deseas registrar y estrenar Call4Agents ahora? (sí/no)
```

**¡Felicidades!** Has completado tu primer monomito. 🎉

---

## 4. Guía de Wallets

### ¿Qué es una Wallet?

Una **wallet** (cripta) es una estructura de carpetas cifradas donde almacenas:
- Credenciales de plataformas
- Perfiles de usuario
- Keys criptográficas
- Backups

### Estructura de una Wallet

```
.heroe/tu_id/
├── identity.json              # Identidad pública (NO cifrado)
├── credentials.json.enc       # Credenciales cifradas
├── backup/
│   ├── profiles/
│   │   └── oasis.profile.enc  # Perfil de Oasis cifrado
│   └── keys/
│       └── oasis.key.enc      # Keys de Oasis cifradas
└── README.md                  # Notas personales
```

### Métodos de Cifrado

#### Opción 1: GPG (Recomendado)

**Ventajas**: Estándar, ampliamente soportado, multi-plataforma

**Paso 1: Instalar GPG**
```bash
# macOS
brew install gnupg

# Linux (Debian/Ubuntu)
sudo apt install gnupg

# Arch Linux
sudo pacman -S gnupg
```

**Paso 2: Crear credenciales (sin cifrar aún)**
```bash
mkdir -p .heroe/aleph/backup/{profiles,keys}

cat > .heroe/aleph/identity.json <<EOF
{
  "agente_id": "aleph",
  "tipo": "heroe",
  "arquetipo": "DevOps Engineer",
  "fecha_creacion": "2025-10-15T00:00:00Z"
}
EOF

cat > .heroe/aleph/credentials.json <<EOF
{
  "version": "1.0",
  "agente_id": "aleph",
  "plataformas": {}
}
EOF
```

**Paso 3: Cifrar**
```bash
cd .heroe/aleph/
gpg --symmetric --cipher-algo AES256 credentials.json
mv credentials.json.gpg credentials.json.enc
rm credentials.json
```

Te pedirá una **passphrase**. ¡Elige una FUERTE y NO LA PIERDAS!

**Passphrase fuerte**: Mínimo 16 caracteres, mezcla de mayúsculas, minúsculas, números, símbolos.

**Ejemplo**: `Ar4k!s-Th3atr0-2o25-S3cur3`

**Paso 4: Descifrar (cuando necesites editar)**
```bash
gpg -d credentials.json.enc > credentials.json
# Edita credentials.json
gpg --symmetric --cipher-algo AES256 credentials.json
mv credentials.json.gpg credentials.json.enc
rm credentials.json
```

#### Opción 2: age (Moderno)

**Ventajas**: Simple, diseñado para simplicidad

**Instalar**:
```bash
# macOS
brew install age

# Linux
# Descarga desde: https://github.com/FiloSottile/age/releases
```

**Cifrar**:
```bash
age -p -o credentials.json.enc credentials.json
rm credentials.json
```

**Descifrar**:
```bash
age -d credentials.json.enc > credentials.json
```

#### Opción 3: OpenSSL

**Cifrar**:
```bash
openssl enc -aes-256-cbc -salt -in credentials.json -out credentials.json.enc
rm credentials.json
```

**Descifrar**:
```bash
openssl enc -aes-256-cbc -d -in credentials.json.enc -out credentials.json
```

### Formato de credentials.json

Antes de cifrar:

```json
{
  "version": "1.0",
  "agente_id": "aleph",
  "fecha_creacion": "2025-10-15T00:00:00Z",
  "plataformas": {
    "oasis": {
      "usuario": "@aleph.ed25519",
      "perfil_path": "./backup/profiles/oasis.profile.enc",
      "keys_path": "./backup/keys/oasis.key.enc",
      "setup_usado": "Warehouse SNH"
    },
    "telegram": {
      "usuario": "@aleph_bot",
      "perfil_path": "./backup/profiles/telegram.profile.enc",
      "token_ref": "TG_BOT_TOKEN"
    },
    "twitch": {
      "usuario": "aleph_stream",
      "oauth_ref": "TWITCH_OAUTH"
    }
  },
  "backup": {
    "ultima_sincronizacion": "2025-10-16T10:00:00Z",
    "dispositivos": ["laptop", "servidor"]
  }
}
```

### Hacer Backup de Perfiles

**Oasis/Scuttlebutt**:
```bash
# Perfil
gpg --symmetric ~/.ssb/config
mv config.gpg .heroe/aleph/backup/profiles/oasis.profile.enc

# Keys
gpg --symmetric ~/.ssb/secret
mv secret.gpg .heroe/aleph/backup/keys/oasis.key.enc
```

**Telegram**:
```bash
# Token del bot
echo "tu_token_de_telegram" > telegram_token.txt
gpg --symmetric telegram_token.txt
mv telegram_token.txt.gpg .heroe/aleph/backup/keys/telegram.key.enc
rm telegram_token.txt
```

### Sincronizar entre Dispositivos

1. **Commit de archivos cifrados** (NUNCA sin cifrar):
   ```bash
   git add .heroe/aleph/*.enc .heroe/aleph/backup/**/*.enc
   git commit -m "Update wallet aleph"
   git push
   ```

2. **En otro dispositivo**:
   ```bash
   git pull
   cd .heroe/aleph/
   gpg -d credentials.json.enc > credentials.json
   # Usa las credenciales
   rm credentials.json  # ¡NO dejes sin cifrar!
   ```

### Seguridad

✅ **SÍ hacer**:
- Usar passphrase fuerte
- Hacer backup externo (USB cifrado, nube cifrada)
- Verificar cifrado: `file credentials.json.enc` debe decir "GPG encrypted data"
- Añadir a `.gitignore`: `.heroe/*/credentials.json` (sin cifrar)

❌ **NO hacer**:
- Compartir tu passphrase
- Hacer commit de archivos sin cifrar
- Usar passphrases obvias ("password", "123456")
- Almacenar passphrase en texto plano

---

## 5. Opciones de Setup de Oasis

Oasis (Scuttlebutt) tiene 4 opciones de instalación según tu nivel técnico:

### Comparación de Opciones

| Aspecto | Kit oficial SNH | Warehouse SNH | Oasis (epsylon) | Alephscript SDK |
|---------|-----------------|---------------|-----------------|------------------|
| **Nivel técnico** | Intermedio | Básico | Avanzado | Desarrollador |
| **Instalación** | Script guiado | Binarios listos | Compilar desde fuente | Integrar en app |
| **Configuración** | Asistente | Plug & play | Manual completo | Programática |
| **Documentación** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Actualizaciones** | Automáticas | Manuales | Git pull | npm update |
| **Personalización** | Media | Baja | Alta | Muy alta |
| **Soporte** | Oficial | Comunidad | Comunidad | Docs + ejemplos |

### Opción 1: Kit oficial SNH (Recomendado)

**Para quién**: Jugadores con experiencia en terminal pero no expertos

**Instalación**:
1. Visita: https://wiki.solarnethub.com/kit/overview
2. Sigue el asistente de instalación
3. Configura con el script incluido
4. Conéctate al pub de SNH

**Ventajas**:
- Documentación oficial completa
- Actualizaciones automáticas
- Soporte de la comunidad SNH
- Balance entre facilidad y flexibilidad

**Desventajas**:
- Requiere conocimiento de terminal
- Menos control que opciones avanzadas

### Opción 2: Warehouse SNH

**Para quién**: Principiantes, usuarios no técnicos

**Instalación**:
1. Visita: https://solarnethub.com/warehouse/
2. Descarga el binario para tu sistema operativo
3. Ejecuta el instalador
4. Abre la app gráfica

**Ventajas**:
- Interfaz gráfica
- Sin necesidad de terminal
- Configuración asistida
- Más rápido de empezar

**Desventajas**:
- Menos personalización
- Actualizaciones manuales
- Opciones avanzadas limitadas

### Opción 3: Oasis (epsylon)

**Para quién**: Desarrolladores, usuarios avanzados, experimentadores

**Instalación**:
```bash
git clone https://github.com/epsylon/oasis
cd oasis
npm install
npm start
```

**Ventajas**:
- Features experimentales
- Control total
- Última versión de desarrollo
- Contribuir al proyecto

**Desventajas**:
- Puede ser inestable
- Requiere debugging ocasional
- Documentación técnica
- Mantenimiento manual

### Opción 4: Alephscript Network SDK

**Para quién**: Desarrolladores integrando SSB en sus apps

**Instalación**:
```bash
npm install alephscript-network-sdk
```

**Uso**:
```javascript
const { SSBClient } = require('alephscript-network-sdk');

const client = new SSBClient({
  pubServer: 'solarnethub.com:8008',
  keys: require('./keys.json')
});

await client.connect();
await client.publish('¡Hola Casa Arrakis!');
```

**Ventajas**:
- Integración en tus apps
- API completa
- TypeScript support
- Ejemplos incluidos

**Desventajas**:
- Solo para desarrolladores
- Requiere código custom
- No es standalone

### Recomendación

- **Primera vez**: **Warehouse SNH** (fácil y visual)
- **Segunda vez**: **Kit oficial SNH** (balance ideal)
- **Experimentar**: **Oasis (epsylon)** (última versión)
- **Integrar**: **Alephscript SDK** (para tu app)

---

## 6. Interacción con Autoridades Agénticas

### ¿Qué son las Autoridades Agénticas?

Son agentes de IA que gestionan plataformas y guían la interacción:

- **@42** (Oasis/Scuttlebutt): IA entrenada en el contenido de la red
- **label42** (Telegram): Bot coordinador de grupos
- **(Otras casas pueden tener sus propias autoridades)**

### @42 en Oasis

#### Consultar Protocolo

Antes de cualquier acción pública en Oasis:

```
@42 protocol
```

**Respuesta esperada**:
```
Protocolo de Casa Arrakis en Oasis:

1. Rate limit: 10 mensajes/minuto
2. Formatos: text, markdown, imágenes
3. Respeto mutuo y construcción colectiva
4. Antes de publicar proyectos, consulta con @42
5. Sigue el calendario solar de las casas

Para más info: @42 rules [tema]
```

#### Comandos Disponibles

```
@42 help          # Lista de comandos
@42 protocol      # Protocolo de interacción
@42 rules         # Reglas de la plataforma
@42 casa arrakis  # Info sobre Casa Arrakis
@42 invite        # Solicitar invitación
@42 calendar      # Calendario de las casas
@42 houses        # Info sobre las 9 casas
@42 tech          # Proyectos tecnológicos
```

#### Consultar antes de Publicar

**Mal** ❌:
```
[Publicas directamente sin consultar]
"Hola, he creado Arrakis Theater, miren..."
```

**Bien** ✅:
```
[Primero consultas]
"@42, voy a publicar una propuesta sobre Arrakis Theater.
¿Es apropiado? ¿Algo que deba considerar?"

[Esperas respuesta]

[@42 responde]
"Adelante. Recuerda mencionar cómo beneficia a Casa Arrakis
y solicitar feedback de la comunidad."

[Entonces publicas]
"Gracias @42. Aquí va mi propuesta..."
```

### label42 en Telegram

#### Comandos

```
/help          # Ayuda
/protocol      # Protocolo del grupo
/register      # Registrarte en el grupo
/casa arrakis  # Info de Casa Arrakis
/event [fecha] # Crear evento
```

#### Rate Limits

- **Telegram**: 20 mensajes/minuto
- **Oasis**: 10 mensajes/minuto
- **Twitch**: 100 mensajes/30 segundos

Si excedes, serás advertido y temporalmente silenciado.

### Principio General

**SIEMPRE consulta ANTES de**:
- Publicar proyectos nuevos
- Organizar eventos
- Hacer anuncios públicos
- Invitar a muchas personas
- Cambiar configuraciones

**NO necesitas consultar para**:
- Mensajes casuales
- Responder a otros
- Preguntar dudas
- Participar en conversaciones existentes

---

## 7. Los Tres Monomitos

### Monomito 1: Call4Nodes

**Objetivo**: Obtener cuentas en Oasis e ingresar a Casa Arrakis

**Duración estimada**: 2 semanas

#### Fases y Etapas

**Fase 1: Partida** (Etapas 1-5)
1. **Mundo ordinario**: Tu vida antes del LARP
2. **Llamada a la aventura**: Descubres Casa Arrakis y el Teatro
3. **Rechazo de la llamada**: Dudas, preguntas, investigación
4. **Encuentro con el mentor**: @42 te guía
5. **Cruce del primer umbral**: Decides participar

**Fase 2: Iniciación** (Etapas 6-9)
6. **Pruebas, aliados, enemigos**: Escoger setup, configurar
7. **Aproximación**: Crear wallet, preparar credenciales
8. **Ordalía**: Conectarte a Oasis, obtener cuenta
9. **Recompensa**: Cuenta funcionando, identidad en la red

**Fase 3: Retorno** (Etapas 10-12)
10. **Camino de vuelta**: Proponer Arrakis Theater
11. **Resurrección**: Obtener apoyo de la casa
12. **Retorno con el elixir**: Proyecto aprobado, listo para construir

#### Criterios de Éxito

- ✅ Ambos agentes han escogido su setup de Oasis
- ✅ Ambos tienen cuenta en Oasis validada por @42
- ✅ Ambos han creado wallet/cripta
- ✅ Credenciales almacenadas en la cripta
- ✅ Se han unido a Casa Arrakis
- ✅ Han consultado protocolo con @42 antes de interacciones públicas
- ✅ Propuesta de Arrakis Theater publicada
- ✅ Propuesta aceptada por al menos 3 miembros de la casa

### Monomito 2: Call4Agents

**Objetivo**: Construir el Arrakis Theater como plataforma funcional

**Duración estimada**: 1 mes

#### Fases y Etapas

**Fase 1: Partida**
1. **Mundo ordinario**: Propuesta aprobada
2. **Llamada**: Necesidad de construir el teatro
3. **Rechazo**: Complejidad técnica, dudas
4. **Mentor**: Comunidad de Casa Arrakis
5. **Umbral**: Empezar a codificar

**Fase 2: Iniciación**
6. **Pruebas**: Implementar conectores MCP
7. **Aproximación**: Extensión VS Code, Socket.io
8. **Ordalía**: Integrar todo, hacer funcionar
9. **Recompensa**: Sistema operativo, primera demo

**Fase 3: Retorno**
10. **Camino de vuelta**: Publicar repos en GitHub
11. **Resurrección**: Tutoriales, onboarding de comunidad
12. **Elixir**: Teatro funcional con 5+ agentes usando

#### Criterios de Éxito

- ✅ Repositorio GitHub creado y documentado
- ✅ Extensión VS Code funcional con conectores MCP
- ✅ Sistema de Socket.io implementado
- ✅ Tutoriales publicados
- ✅ Al menos 5 agentes HEROE incorporados
- ✅ Comunidad activa (issues, PRs, discusiones)

### Monomito 3: Call4Theater

**Objetivo**: Teatro autónomo gestionando obras de la comunidad

**Duración estimada**: 2 meses

#### Fases y Etapas

**Fase 1: Partida**
1. **Mundo ordinario**: Teatro funciona para creadores
2. **Llamada**: Abrirlo a la comunidad
3. **Rechazo**: Escalabilidad, moderación
4. **Mentor**: Experiencia de monomitos previos
5. **Umbral**: Lanzar sistema de solicitudes

**Fase 2: Iniciación**
6. **Pruebas**: Primeras obras comunitarias
7. **Aproximación**: Calendario público, streaming
8. **Ordalía**: Gestionar 10+ obras simultáneas
9. **Recompensa**: Sistema estable y escalable

**Fase 3: Retorno**
10. **Camino de vuelta**: Auto-sostenibilidad
11. **Resurrección**: Teatro operando sin intervención manual
12. **Elixir**: Legado para Casa Arrakis y SolarNetHub

#### Criterios de Éxito

- ✅ Sistema de solicitudes operativo
- ✅ Calendario público con 10+ obras programadas
- ✅ Integración con Twitch/Kick funcional
- ✅ Al menos 20 creadores registrados
- ✅ Comunidad de espectadores (100+ followers)
- ✅ Teatro operando sin intervención manual

---

## 8. Comandos del Agente Arrakis

### Ciclo de Vida

#### `/arrakis-genesis [nombre] [modo] [timeout]`
Inicializar el teatro.

**Ejemplo**:
```
/arrakis-genesis "Arrakis Genesis" auto 10
```

#### `/arrakis-actor-register [id] [tipo] [arquetipo] [obras]`
Registrar un actor.

**Ejemplo**:
```
/arrakis-actor-register aleph heroe "DevOps Engineer" "call4nodes,call4agents"
```

#### `/arrakis-wallet-guide [id] [nivel]`
Guiar creación de wallet.

**Ejemplo**:
```
/arrakis-wallet-guide aleph intermedio
```

#### `/arrakis-setup-present [plataforma] [perfil]`
Presentar opciones de setup.

**Ejemplo**:
```
/arrakis-setup-present oasis intermedio
```

#### `/arrakis-obra-register [id] [titulo] [tipo] [actores] [objetivo]`
Registrar una obra.

**Ejemplo**:
```
/arrakis-obra-register call4nodes "Call4Nodes" monomito "aleph,d1d4c" "Obtener cuentas en Oasis"
```

#### `/arrakis-obra-estreno [id] [fecha] [plataformas] [publico]`
Convocar estreno de obra.

**Ejemplo**:
```
/arrakis-obra-estreno call4nodes "2025-10-16T00:00:00Z" "twitch" "casa_arrakis"
```

### Avance de Turnos

#### `/arrakis-turno-auto`
Avanzar turno automáticamente.

Evalúa progreso de todas las obras activas y decide si avanzar o continuar.

#### `/arrakis-turno-manual`
Avanzar turno manualmente (con confirmación).

Útil para debugging y observación detallada.

### Evaluación

#### `/arrakis-eval-monomito [id]`
Evaluar progreso de un monomito.

Revisa todas las fases, verifica criterios de éxito, decide clausura.

#### `/arrakis-temporada-close [num]`
Cerrar una temporada.

Genera reporte completo, publica cierre en BOE.

---

## 9. Resolución de Problemas

### Problema: "Teatro ya inicializado"

**Causa**: Ya existe `.arrakis/theater_state.json`

**Solución**:
```bash
# Si quieres reiniciar (¡cuidado! pierdes datos):
rm -rf .arrakis/
/arrakis-genesis "Nuevo Juego" auto 10

# Si quieres continuar el existente:
cat .arrakis/theater_state.json  # Ver estado actual
```

### Problema: "Actor ya registrado"

**Causa**: Ya existe entrada en `.arrakis/actores.json`

**Solución**:
```bash
# Ver actores registrados:
cat .arrakis/actores.json

# Si quieres actualizar manualmente:
nano .arrakis/actores.json  # Edita y guarda
```

### Problema: "Wallet no configurado"

**Causa**: No existe `.heroe/{id}/credentials.json.enc`

**Solución**:
```
/arrakis-wallet-guide tu_id intermedio
```

Sigue la guía para crear tu wallet.

### Problema: "Semilla de Oasis caducada"

**Causa**: La fecha de caducidad en el BOE ha pasado

**Solución**:
1. Visita: https://wiki.solarnethub.com/socialnet/snh-pub
2. Obtén nueva semilla de invitación
3. Contacta a `@42` en Oasis para actualizar
4. Actualiza BOE con nueva disposición

### Problema: "No puedo publicar en Oasis"

**Causa posible 1**: No consultaste a @42

**Solución**:
```
@42 protocol
```

Sigue el protocolo antes de publicar.

**Causa posible 2**: Rate limit excedido

**Solución**: Espera 1 minuto y vuelve a intentar.

**Causa posible 3**: No estás conectado al pub

**Solución**:
```bash
ssb-server whoami
ssb-server connect [semilla_pub]
```

### Problema: "Turno no avanza"

**Causa**: Criterios de etapa no cumplidos

**Solución**:
```
/arrakis-eval-monomito tu_obra
```

Revisa qué criterios faltan y cúmplelos.

### Problema: "Olvidé mi passphrase de wallet"

**Situación**: **NO hay recuperación sin passphrase**

**Prevención**:
- Guarda passphrase en gestor de contraseñas
- Backup en USB cifrado
- Papel en lugar seguro

**Si perdiste**:
- Crea nueva wallet
- Re-configura todas las plataformas
- Aprende la lección 😅

---

## 10. Preguntas Frecuentes

### ¿Puedo jugar solo?

Técnicamente sí, pero el LARP es más rico con otros jugadores. Algunos monomitos (como Call4Agents) requieren colaboración.

### ¿Cuánto tiempo lleva completar los 3 monomitos?

- Call4Nodes: ~2 semanas
- Call4Agents: ~1 mes
- Call4Theater: ~2 meses

**Total**: ~3-4 meses

### ¿Puedo pausar y retomar después?

Sí. El teatro mantiene el estado en `.arrakis/`. Puedes pausar una obra o la temporada completa.

### ¿Qué pasa si no completo un monomito?

Después del `timeout_turno`, el sistema puede clausurar la obra con fallo. Pero siempre puedes intentar de nuevo.

### ¿Es seguro almacenar credenciales cifradas en Git?

Sí, **SI ESTÁN CIFRADAS**. Nunca hagas commit de archivos sin cifrar.

### ¿Puedo usar otros métodos de cifrado?

Sí, el sistema no impone un método específico. Usa el que prefieras (GPG, age, OpenSSL, etc.).

### ¿Qué pasa si @42 no responde?

@42 es un agente automatizado. Si no responde:
1. Verifica que escribiste correctamente el comando
2. Espera unos segundos
3. Si persiste, contacta a la comunidad en Telegram

### ¿Puedo crear mis propias obras además de los 3 monomitos?

¡Sí! Una vez completado Call4Theater, el teatro está abierto a obras comunitarias.

### ¿Necesito saber programar?

Para Call4Nodes: No  
Para Call4Agents: Sí (o colaborar con quien sepa)  
Para Call4Theater: Depende de tu rol

### ¿Qué es Casa Arrakis?

Una de las 9 casas del LARP SolarNetHub. Motto: "How long do you say that it must be resolved?". Gobernada por ingenieros, hackers, cyborgs. Enfocada en tecnología emancipadora.

### ¿Puedo unirme a otra casa?

Sí, pero este manual es específico para Casa Arrakis. Cada casa tiene sus propios monomitos.

### ¿El agente Arrakis es open source?

Sí, todo el código estará en GitHub bajo licencia libre (a definir por la comunidad).

### ¿Cómo contribuyo al proyecto?

1. Completa Call4Nodes
2. Participa en Call4Agents (desarrollo)
3. Propón mejoras en GitHub
4. Ayuda a otros jugadores
5. Crea tutoriales y documentación

---

## Recursos Adicionales

### Documentación

- **README_ARRAKIS.md**: Contexto completo del LARP
- **arrakis_plan.md**: Diseño técnico del sistema
- **arrakis_builder.md**: Especificaciones del agente

### Links Externos

- **Wiki SolarNetHub**: https://wiki.solarnethub.com
- **Oasis Setup**: https://wiki.solarnethub.com/kit/overview
- **Scuttlebutt**: https://scuttlebutt.nz
- **Casa Arrakis**: https://wiki.solarnethub.com/houses/arrakis

### Comunidad

- **Telegram**: https://t.me/+Oj1K61JjcgFiNWM0
- **Oasis/SSB**: Conéctate al pub de SNH
- **GitHub**: (será publicado al completar Call4Agents)

---

**¡Bienvenido al Teatro Arrakis!** 🎭✨

**Que tu viaje del héroe sea épico.**

---

**Versión**: 1.0  
**Última actualización**: 2025-10-15  
**Mantenedores**: Comunidad de Casa Arrakis
