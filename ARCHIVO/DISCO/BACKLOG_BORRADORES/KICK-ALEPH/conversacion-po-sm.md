# Conversación PO-SM: Kick Aleph (Streaming Bridge)

**Fecha**: 2025-12-24  
**Submódulos**: `kick-aleph-bot`, `kick-aleph-crono-bot`  
**Plugin objetivo**: `kick-stream`

---

## Diálogo

### Product Owner (PO)

**PO**: "Hemos integrado dos submódulos relacionados con Kick.com (plataforma de streaming). Necesitamos que el Scriptorium pueda conectarse con el streaming en tiempo real."

### Scrum Master (SM)

**SM**: "Déjame revisar lo que tenemos..."

[Exploración de repositorios]

**SM**: "Veo dos piezas:

1. **kick-aleph-bot**: Bot Node.js/TypeScript con:
   - Integración Kick.js (@retconned/kick-js)
   - Sistema de orquestación RxJS (3 canales: App, Sys, UI)
   - WebServer (REST + WebSocket) en puerto 9070
   - UI web para control panel
   - Arquitectura: KickChannelAgent → KickOrchestrator → WebServer

2. **kick-aleph-crono-bot**: Timer visual con estilo Matrix
   - HTML/CSS/JS vanilla
   - Contador regresivo configurable
   - Canvas con animación Matrix
   - Controles: Start, Pause, Stop, Reset
   - Audio beep al finalizar

¿Cuál es el caso de uso que tienes en mente?"

---

### Caso de Uso 1: Streamer con ARG_BOARD

**PO**: "El caso de uso principal es este:

1. Un **streamer** inicia sesión en Kick.com desde su panel de streamer
2. Tiene conectados nuestros dos kick-aleph bots:
   - kick-aleph-bot (gestión chat)
   - kick-aleph-crono-bot (timer visual en pantalla)
3. Por otra parte, en su IDE VS Code, activa **Scriptorium**
4. El streamer puede **conectar su ARG_BOARD** para:
   - Interactividad con el chat de Kick
   - Control de la pantalla de emisión (timer, overlays)
   - Orquestar personajes del Teatro que responden al chat

¿Qué necesitamos para esto?"

**SM**: "Veo varios gaps aquí..."

---

## Gaps Identificados (Caso de Uso 1)

| Gap | Descripción | Prioridad | Sprint |
|-----|-------------|-----------|--------|
| **G1** | No existe plugin `kick-stream` | Must | 1 |
| **G2** | ARG_BOARD no tiene plataforma `kick` | Must | 1 |
| **G3** | No hay adaptador Kick en ARG_BOARD/plataformas | Must | 1 |
| **G4** | kick-aleph-bot corre en Node.js, no en VS Code | Must | 1 |
| **G5** | No hay bridge RxJS channels ↔ Scriptorium | Must | 1 |
| **G6** | kick-crono-bot no tiene API de control | Should | 1 |
| **G7** | No hay protocolo de sincronización bot ↔ Scriptorium | Must | 1 |
| **G8** | No hay mecánica de "personajes respondiendo al chat" | Could | 2 |

---

### Análisis Técnico (G1-G7)

**SM**: "Para el caso de uso del streamer, necesitamos:

**Arquitectura propuesta**:

```
┌─────────────────────────────────────────────────────────────────────┐
│                        STREAMER WORKFLOW                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────┐         ┌─────────────┐         ┌─────────────┐   │
│  │  KICK.COM   │         │ KICK-ALEPH  │         │ SCRIPTORIUM │   │
│  │  (Stream)   │◀───────▶│    BOTS     │◀───────▶│  (VS Code)  │   │
│  │             │  Kick.js│             │ WebSocket│             │   │
│  └─────────────┘         └──────┬──────┘         └──────┬──────┘   │
│        │                        │                       │           │
│        │                        ▼                       ▼           │
│        │                 ┌──────────────┐      ┌────────────────┐  │
│        │                 │ kick-aleph   │      │  ARG_BOARD     │  │
│        │                 │     -bot     │      │  (Teatro)      │  │
│        │                 │ (Chat mgmt)  │      │                │  │
│        │                 └──────────────┘      └────────────────┘  │
│        │                        │                       │           │
│        │                        ▼                       ▼           │
│        │                 ┌──────────────┐      ┌────────────────┐  │
│        └────────────────▶│ kick-crono   │      │  Personajes    │  │
│          (overlays)      │    -bot      │      │  del Teatro    │  │
│                          │ (Timer viz)  │      │                │  │
│                          └──────────────┘      └────────────────┘  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**Decisiones arquitectónicas**:

1. **Bot como servicio externo**: kick-aleph-bot NO se integra dentro de VS Code, corre en Node.js independiente (puerto 9070)
2. **WebSocket bridge**: El plugin kick-stream en Scriptorium se conecta al bot vía WebSocket cliente
3. **Plataforma Kick en ARG_BOARD**: Nueva plataforma (ya existen: vscode, github, email, oasis) para manejar mensajes de Kick
4. **Crono-bot como overlay**: HTML embebido en OBS/streaming software, sin integración profunda inicial

**Flujo de mensajes**:

```
Chat Kick → Kick.js → kick-aleph-bot → WebSocket → Scriptorium (plugin kick-stream) 
                                                     ↓
                                           ARG_BOARD (plataforma kick)
                                                     ↓
                                           Personaje del Teatro responde
                                                     ↓
WebSocket ← kick-aleph-bot ← Kick.js ← Chat Kick
```

---

### Caso de Uso 2: Espectadores con Scriptorium

**PO**: "Ahora la segunda feature:

1. Los **participantes del chat** (espectadores) también pueden usar **su propio Scriptorium**
2. Se conectan a kick-aleph como **espectadores** (no streamer)
3. Pueden **interactuar con el chat** usando sus **agentes de Scriptorium**
4. Ejemplo: Un espectador tiene un agente especializado en Python, puede enviarlo al chat para responder preguntas técnicas

¿Qué implica esto?"

**SM**: "Esto abre un modelo multi-usuario muy interesante..."

---

## Gaps Identificados (Caso de Uso 2)

| Gap | Descripción | Prioridad | Sprint |
|-----|-------------|-----------|--------|
| **G9** | No hay modo "espectador" vs "streamer" | Must | 2 |
| **G10** | kick-aleph-bot asume 1 usuario = 1 bot | Should | 2 |
| **G11** | No hay autenticación/autorización multi-usuario | Should | 2 |
| **G12** | Colisión de nombres de agentes (varios espectadores) | Could | 2 |
| **G13** | No hay rate limiting para evitar spam | Must | 2 |
| **G14** | ARG_BOARD no soporta "agentes invitados" | Could | 2 |

---

### Análisis Técnico (G9-G14)

**SM**: "Para el modo espectador:

**Modelo de conexión**:

```
STREAMER (1)
    ↓
kick-aleph-bot (instancia principal, puerto 9070)
    ↓
Kick.com (canal del streamer)
    ↑
ESPECTADORES (N)
    ↓
kick-aleph-bot (instancias propias?, o compartida?)
    ↓
Scriptorium (cada espectador)
```

**Dos arquitecturas posibles**:

**A. Bot compartido** (1 bot para todos):
- ✅ Más simple
- ✅ Menor carga en Kick.com
- ❌ Requiere autenticación/autorización
- ❌ Punto único de fallo

**B. Bot por espectador** (N bots):
- ✅ Aislamiento natural
- ✅ Sin colisiones
- ❌ Kick.com puede banear por flood
- ❌ Mayor complejidad

**Recomendación**: Empezar con **Bot compartido** (A) + auth simple.

**Decisiones arquitectónicas CU2**:

1. **Modo de conexión**: El plugin detecta si el usuario es streamer (owner del canal) o espectador
2. **Autenticación**: API key o token simple generado por el streamer
3. **Rate limiting**: Max 1 mensaje/agente cada 5 segundos
4. **Namespace de agentes**: Prefijo con nombre de usuario del espectador

---

## Arquitectura Unificada (CU1 + CU2)

```
┌────────────────────────────────────────────────────────────────────────┐
│                        KICK-ALEPH ECOSYSTEM                             │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌───────────────┐                                                      │
│  │  KICK.COM     │                                                      │
│  │  (Canal)      │                                                      │
│  └───────┬───────┘                                                      │
│          │ Kick.js                                                      │
│          ▼                                                              │
│  ┌───────────────────┐                                                  │
│  │ kick-aleph-bot    │ (Servidor Node.js, puerto 9070)                 │
│  │ - Chat gateway    │                                                  │
│  │ - WebSocket srv   │                                                  │
│  │ - RxJS channels   │                                                  │
│  └─────────┬─────────┘                                                  │
│            │                                                            │
│            ├──────────────────┬───────────────────┐                     │
│            │ WebSocket        │ WebSocket         │ WebSocket          │
│            ▼                  ▼                   ▼                     │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐          │
│  │ SCRIPTORIUM     │ │ SCRIPTORIUM     │ │ SCRIPTORIUM     │          │
│  │ (Streamer)      │ │ (Espectador 1)  │ │ (Espectador N)  │          │
│  │                 │ │                 │ │                 │          │
│  │ Plugin:         │ │ Plugin:         │ │ Plugin:         │          │
│  │ kick-stream     │ │ kick-stream     │ │ kick-stream     │          │
│  │ (mode: owner)   │ │ (mode: viewer)  │ │ (mode: viewer)  │          │
│  │                 │ │                 │ │                 │          │
│  │ ARG_BOARD       │ │ Agentes         │ │ Agentes         │          │
│  │ + Teatro        │ │ especializados  │ │ especializados  │          │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘          │
│                                                                         │
│  ┌───────────────────┐                                                  │
│  │ kick-crono-bot    │ (Overlay HTML, independiente)                   │
│  │ - Timer visual    │                                                  │
│  │ - Matrix effect   │                                                  │
│  └───────────────────┘                                                  │
│                                                                         │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Decisiones Arquitectónicas (Finales)

### 1. Separación de Responsabilidades

| Componente | Responsabilidad |
|------------|-----------------|
| **kick-aleph-bot** | Gateway Kick.com ↔ Scriptorium, gestión de conexiones |
| **kick-crono-bot** | Overlay visual (timer), sin integración profunda Sprint 1 |
| **Plugin kick-stream** | Cliente WebSocket en Scriptorium, adaptador ARG_BOARD |
| **ARG_BOARD** | Orquestación de personajes, plataforma `kick` |

### 2. Protocolo de Mensajes

**Kick → Scriptorium**:
```json
{
  "type": "chat-message",
  "from": "username",
  "message": "Hola",
  "channel": "canal-streamer",
  "timestamp": "ISO8601",
  "role": "viewer|moderator|broadcaster"
}
```

**Scriptorium → Kick**:
```json
{
  "type": "send-message",
  "from_agent": "agente-nombre",
  "message": "Respuesta",
  "mode": "owner|viewer",
  "auth_token": "..."
}
```

### 3. Modos de Operación

| Modo | Usuario | Permisos | Autenticación |
|------|---------|----------|---------------|
| **owner** | Streamer | Full control, crear obras, ejecutar teatro | Credenciales Kick |
| **viewer** | Espectador | Enviar mensajes (rate limited) | Token generado por owner |

### 4. Integración ARG_BOARD

**Nueva plataforma**: `kick`

```yaml
# En ARG_BOARD/plataformas/kick.yaml
plataforma:
  id: kick
  nombre: "Kick.com Streaming"
  descripcion: "Canal de streaming con chat en tiempo real"
  
adaptador:
  entrada: WebSocket (desde kick-aleph-bot)
  salida: WebSocket (a kick-aleph-bot)
  
formato_mensaje:
  tipo: "chat-message"
  campos: [from, message, channel, timestamp, role]
```

---

## Riesgos Técnicos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| **Kick.js inestable** | Media | Alto | Wrapper robusto con retry logic |
| **WebSocket desconexión** | Alta | Medio | Reconexión automática, queue de mensajes |
| **Rate limit Kick.com** | Media | Alto | Rate limiting local + backoff |
| **Múltiples espectadores spam** | Media | Medio | Token auth + rate limit por usuario |
| **kick-aleph-bot no arranca** | Baja | Alto | Healthcheck + logs estructurados |
| **Colisión nombres agentes** | Media | Bajo | Namespace con prefijo usuario |
| **Latencia chat → respuesta** | Media | Medio | Optimizar pipeline, async processing |

---

## Supuestos

1. **kick-aleph-bot** corre en **Node.js >= 18**
2. **Scriptorium** tiene acceso de red a `localhost:9070` (o IP del servidor bot)
3. **Kick.com** permite bots (verificar ToS)
4. **Streamer** genera tokens para espectadores manualmente (sin OAuth Sprint 1)
5. **kick-crono-bot** se embebe en OBS como Browser Source (sin API)

---

## Próximos Pasos

1. ✅ Crear backlog borrador Sprint 1 (Plugin kick-stream + Modo owner)
2. ⏳ Implementar plugin kick-stream con WebSocket cliente
3. ⏳ Añadir plataforma `kick` a ARG_BOARD
4. ⏳ Crear adaptador Kick en ARG_BOARD/plataformas
5. 📋 Sprint 2: Modo viewer + autenticación multi-usuario

---

## Épicas Propuestas

### Sprint 1: Streamer Mode (CU1)
**Objetivo**: El streamer puede usar Scriptorium con ARG_BOARD conectado a Kick

### Sprint 2: Viewer Mode (CU2)
**Objetivo**: Los espectadores pueden usar Scriptorium para interactuar en el chat
