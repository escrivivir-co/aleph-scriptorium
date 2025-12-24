# Backlog Borrador — Kick Aleph (Streaming Bridge)

> **Épica**: SCRIPT-1.12.0  
> **Submódulos**: kick-aleph-bot, kick-aleph-crono-bot  
> **Plugin**: kick-stream  
> **Estado**: 📋 Borrador  
> **Fecha**: 2025-12-24

---

## Visión

Integrar Scriptorium con Kick.com (plataforma de streaming) para:

1. **Streamer Mode**: El streamer conecta ARG_BOARD con su canal de Kick para interactividad en tiempo real
2. **Viewer Mode**: Los espectadores usan Scriptorium para interactuar en el chat con agentes especializados

---

## Épicas

### SCRIPT-1.12.0: Kick Aleph (Streaming Bridge)

**Objetivo General**: Crear plugin `kick-stream` que conecte Scriptorium con Kick.com vía kick-aleph-bot

**Iteraciones**:
- **I1**: Infraestructura base + Plugin kick-stream (2 semanas)
- **I2**: Modo Streamer (owner) + ARG_BOARD integration (2 semanas)
- **I3**: Modo Viewer (espectadores) + autenticación (2 semanas)
- **I4**: Optimización + crono-bot overlay (1 semana)

---

## Feature Cycle 1: Infraestructura Base

> **Objetivo**: Preparar submódulos y crear estructura del plugin kick-stream

---

### Story: SCRIPT-1.12.0-S01 — Preparación de Submódulos
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T001 | Añadir submódulo kick-aleph-bot | ⏳ |
| T002 | Añadir submódulo kick-aleph-crono-bot | ⏳ |
| T003 | Crear ramas integration/beta/scriptorium | ⏳ |
| T004 | Crear README-SCRIPTORIUM.md en kick-aleph-bot | ⏳ |
| T005 | Crear README-SCRIPTORIUM.md en kick-aleph-crono-bot | ⏳ |
| T006 | Commits en submódulos | ⏳ |

**Criterios de Aceptación**:
- [ ] Ambos submódulos clonados en rama integration
- [ ] READMEs documentan arquitectura, dependencias, gaps
- [ ] Commits con refs #SCRIPT-1.12.0-T00X

---

### Story: SCRIPT-1.12.0-S02 — Estructura del Plugin
**Puntos**: 2  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T007 | Crear `.github/plugins/kick-stream/manifest.md` | ⏳ |
| T008 | Crear `agents/kick-stream.agent.md` | ⏳ |
| T009 | Crear `instructions/kick-stream.instructions.md` | ⏳ |
| T010 | Crear `ARCHIVO/PLUGINS/KICK_STREAM/` (datos) | ⏳ |
| T011 | Crear `.arrakis/kick-config.json` (config bot) | ⏳ |

**Criterios de Aceptación**:
- [ ] Plugin sigue protocolo PLUGINS.md
- [ ] Manifest válido con frontmatter YAML
- [ ] Estructura de datos separada de código

---

### Story: SCRIPT-1.12.0-S03 — WebSocket Client
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T012 | Crear prompt `conectar-kick-bot.prompt.md` | ⏳ |
| T013 | Implementar WebSocket client en prompt | ⏳ |
| T014 | Definir protocolo de mensajes (JSON schema) | ⏳ |
| T015 | Implementar reconexión automática | ⏳ |
| T016 | Implementar queue de mensajes pendientes | ⏳ |
| T017 | Healthcheck con kick-aleph-bot (ping/pong) | ⏳ |

**Criterios de Aceptación**:
- [ ] Cliente se conecta a ws://localhost:9070
- [ ] Reconexión automática con backoff exponencial
- [ ] Queue persiste mensajes si bot desconectado
- [ ] Logs estructurados (conexión, errores, latencia)

---

### Story: SCRIPT-1.12.0-S04 — Bridge Agent + Registry
**Puntos**: 2  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T018 | Crear `plugin_ox_kickstream.agent.md` | ⏳ |
| T019 | Actualizar `registry.json` | ⏳ |
| T020 | Actualizar `aleph.agent.md` con handoff | ⏳ |
| T021 | Actualizar `ox.agent.md` (índice) | ⏳ |
| T022 | Actualizar `setup-workspace.sh` (submódulos 6 y 7) | ⏳ |

**Criterios de Aceptación**:
- [ ] Bridge en `.github/agents/` (detectable por VS Code)
- [ ] Plugin aparece en registry con enabled: true
- [ ] `@aleph → [KICK-STREAM]` funciona

---

## Feature Cycle 2: Modo Streamer (Owner)

> **Objetivo**: El streamer puede conectar ARG_BOARD con su canal de Kick

---

### Story: SCRIPT-1.12.0-S05 — Plataforma Kick en ARG_BOARD
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T023 | Crear `ARG_BOARD/plataformas/kick.yaml` | ⏳ |
| T024 | Definir schema de mensajes Kick | ⏳ |
| T025 | Implementar adaptador Kick en ARG_BOARD | ⏳ |
| T026 | Registrar plataforma en `plataformas.json` | ⏳ |
| T027 | Tests: recibir mensaje de Kick → ARG | ⏳ |
| T028 | Tests: enviar mensaje ARG → Kick | ⏳ |

**Criterios de Aceptación**:
- [ ] Plataforma `kick` disponible en ARG_BOARD
- [ ] Mensajes Kick se traducen a formato ARG
- [ ] Personajes ARG pueden responder al chat Kick

---

### Story: SCRIPT-1.12.0-S06 — Modo Owner (Streamer)
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T029 | Crear prompt `modo-owner.prompt.md` | ⏳ |
| T030 | Implementar autenticación con credenciales Kick | ⏳ |
| T031 | Crear comando "Iniciar streaming session" | ⏳ |
| T032 | Conectar ARG_BOARD con plataforma kick | ⏳ |
| T033 | Implementar envío de mensajes con role=owner | ⏳ |
| T034 | Panel de control: ver chat en tiempo real | ⏳ |

**Criterios de Aceptación**:
- [ ] Streamer se autentica con user+pass Kick
- [ ] ARG_BOARD recibe mensajes del chat
- [ ] Personajes del Teatro pueden responder
- [ ] Logs muestran flujo de mensajes

**Estructura comando**:
```
@plugin_ox_kickstream Iniciar streaming session
Canal: mi-canal-kick
Obra: obra-activa (opcional)
```

---

### Story: SCRIPT-1.12.0-S07 — Obra Demo: "Kick Test Stream"
**Puntos**: 3  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T035 | Crear obra `kick-test-stream.yaml` | ⏳ |
| T036 | Crear personaje ChatBot (responde FAQ) | ⏳ |
| T037 | Crear escena "Bienvenida" con instrucciones | ⏳ |
| T038 | Registrar en `obras.json` | ⏳ |
| T039 | Testear flujo completo: chat → personaje → respuesta | ⏳ |

**Criterios de Aceptación**:
- [ ] Obra instalable con `@plugin_ox_teatro`
- [ ] Personaje ChatBot responde a "!help" en el chat
- [ ] Funciona en modo owner

---

## Feature Cycle 3: Modo Viewer (Espectadores)

> **Objetivo**: Los espectadores usan Scriptorium para interactuar en el chat

---

### Story: SCRIPT-1.12.0-S08 — Sistema de Autenticación
**Puntos**: 5  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T040 | Diseñar sistema de tokens (JWT o API key simple) | ⏳ |
| T041 | Prompt `generar-token-espectador.prompt.md` | ⏳ |
| T042 | Owner genera tokens con rate limits | ⏳ |
| T043 | Viewer se conecta con token | ⏳ |
| T044 | Validación de token en kick-aleph-bot | ⏳ |
| T045 | Revocación de tokens | ⏳ |

**Criterios de Aceptación**:
- [ ] Owner puede generar tokens con nombre de usuario
- [ ] Token incluye permisos y rate limit
- [ ] Tokens se almacenan en `KICK_STREAM/tokens.json`
- [ ] Token inválido rechaza conexión

**Ejemplo token**:
```json
{
  "token": "abc123...",
  "username": "espectador1",
  "role": "viewer",
  "rate_limit": "1msg/5s",
  "created_at": "ISO8601",
  "expires_at": "ISO8601"
}
```

---

### Story: SCRIPT-1.12.0-S09 — Modo Viewer
**Puntos**: 5  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T046 | Crear prompt `modo-viewer.prompt.md` | ⏳ |
| T047 | Implementar conexión con token | ⏳ |
| T048 | Namespace de agentes: `{username}/{agent}` | ⏳ |
| T049 | Rate limiting local (antes de enviar) | ⏳ |
| T050 | Panel de control: ver chat (read-only) | ⏳ |
| T051 | Envío de mensaje con prefijo [username] | ⏳ |

**Criterios de Aceptación**:
- [ ] Viewer se conecta con token válido
- [ ] Mensajes enviados tienen prefijo `[username]`
- [ ] Rate limit respetado (max 1 msg/5s)
- [ ] Viewer puede leer chat completo
- [ ] No puede ejecutar comandos de owner

---

### Story: SCRIPT-1.12.0-S10 — Rate Limiting Global
**Puntos**: 3  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T052 | Implementar rate limiter en kick-aleph-bot | ⏳ |
| T053 | Configurar límites por role (owner, viewer) | ⏳ |
| T054 | Queue con prioridad (owner > viewer) | ⏳ |
| T055 | Notificación a cliente cuando rate limited | ⏳ |
| T056 | Logs de rate limiting (para análisis) | ⏳ |

**Criterios de Aceptación**:
- [ ] Owner: sin límite (o 10 msg/s)
- [ ] Viewer: 1 msg/5s por usuario
- [ ] Mensajes excedentes se quedan en cola
- [ ] Cliente recibe error "Rate limited, retry in Xs"

---

## Feature Cycle 4: Optimización + Crono-Bot

> **Objetivo**: Integrar kick-crono-bot como overlay + optimizar latencia

---

### Story: SCRIPT-1.12.0-S11 — Integración Crono-Bot
**Puntos**: 3  
**Prioridad**: Could  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T057 | Crear prompt `configurar-overlay.prompt.md` | ⏳ |
| T058 | Documentar embed en OBS (Browser Source) | ⏳ |
| T059 | API simple para controlar timer desde Scriptorium | ⏳ |
| T060 | Comando: `Iniciar timer 10:00` desde chat | ⏳ |
| T061 | Personalización de Matrix effect (colores, velocidad) | ⏳ |

**Criterios de Aceptación**:
- [ ] HTML embebible en OBS
- [ ] Timer controlable desde chat Kick
- [ ] Customización via query params (?duration=600&color=green)

---

### Story: SCRIPT-1.12.0-S12 — Optimización de Latencia
**Puntos**: 3  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T062 | Profiling de latencia (chat → respuesta) | ⏳ |
| T063 | Optimizar pipeline de mensajes en bot | ⏳ |
| T064 | Caché de respuestas frecuentes (FAQ) | ⏳ |
| T065 | Async processing de mensajes ARG | ⏳ |
| T066 | Monitoring con métricas (Prometheus-style) | ⏳ |

**Criterios de Aceptación**:
- [ ] Latencia promedio < 500ms (chat → respuesta visible)
- [ ] FAQ cacheadas responden en < 100ms
- [ ] Logs incluyen timestamps para profiling

---

### Story: SCRIPT-1.12.0-S13 — Documentación + Tests
**Puntos**: 2  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

| Task ID | Descripción | Estado |
|---------|-------------|--------|
| T067 | Actualizar README.md con plugin kick-stream | ⏳ |
| T068 | Crear guía de usuario: modo owner | ⏳ |
| T069 | Crear guía de usuario: modo viewer | ⏳ |
| T070 | Test: flujo completo owner + viewer | ⏳ |
| T071 | Test: reconexión WebSocket | ⏳ |
| T072 | Test: rate limiting | ⏳ |

**Criterios de Aceptación**:
- [ ] README documenta instalación y casos de uso
- [ ] Guías paso a paso para owner y viewer
- [ ] Tests pasan sin errores
- [ ] Plugin aparece en docs/agentes.md

---

## Métricas

| Métrica | Valor |
|---------|-------|
| Stories totales | 13 |
| Tasks totales | 72 |
| Puntos totales | 46 |
| Prioridad Must | 8 stories (30 pts) |
| Prioridad Should | 4 stories (13 pts) |
| Prioridad Could | 1 story (3 pts) |
| Feature Cycles | 4 |
| Duración estimada | 7 semanas |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| Plugin ARG_BOARD | ✅ Instalado | Requiere extensión con plataforma kick |
| Plugin Agent Creator | ✅ Instalado | Para crear personajes chatbot |
| Plugin Teatro | ✅ Instalado | Para obras interactivas |
| kick-aleph-bot | ⏳ Submódulo | Node.js >= 18, npm |
| kick-aleph-crono-bot | ⏳ Submódulo | HTML/CSS/JS, OBS |
| Kick.com API | ⚠️ Externa | Verificar ToS, rate limits |
| @retconned/kick-js | ⚠️ Librería | v0.5.3, mantenimiento activo? |

---

## Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Kick.js deja de funcionar | Media | Alto | Fork + mantenimiento interno |
| Kick.com cambia API | Media | Alto | Wrapper agnóstico, fácil cambio |
| Rate limit Kick muy agresivo | Media | Medio | Caché + backoff + alertas |
| WebSocket inestable | Alta | Medio | Reconexión + queue persistente |
| Múltiples viewers spam | Media | Medio | Rate limiting + moderación |
| kick-aleph-bot crashea | Baja | Alto | Supervisor (pm2), healthcheck |

---

## Roadmap

### Sprint 1 (Semanas 1-2)
- ✅ S01: Preparación submódulos
- ✅ S02: Estructura plugin
- ✅ S03: WebSocket client
- ✅ S04: Bridge + Registry

### Sprint 2 (Semanas 3-4)
- 📋 S05: Plataforma Kick en ARG_BOARD
- 📋 S06: Modo Owner
- 📋 S07: Obra demo

### Sprint 3 (Semanas 5-6)
- 📋 S08: Sistema autenticación
- 📋 S09: Modo Viewer
- 📋 S10: Rate limiting global

### Sprint 4 (Semana 7)
- 📋 S11: Integración crono-bot (opcional)
- 📋 S12: Optimización latencia
- 📋 S13: Documentación + tests

---

## Notas de Implementación

### WebSocket Protocol

**Mensajes Cliente → Bot**:
```typescript
interface ClientMessage {
  type: 'auth' | 'send-message' | 'ping';
  payload: {
    token?: string;
    mode?: 'owner' | 'viewer';
    message?: string;
    from_agent?: string;
  };
}
```

**Mensajes Bot → Cliente**:
```typescript
interface ServerMessage {
  type: 'chat-message' | 'auth-ok' | 'auth-error' | 'rate-limited' | 'pong';
  payload: {
    from?: string;
    message?: string;
    channel?: string;
    timestamp?: string;
    role?: 'viewer' | 'moderator' | 'broadcaster';
    error?: string;
    retry_after?: number; // segundos
  };
}
```

### Configuración kick-aleph-bot

**Archivo**: `ARCHIVO/PLUGINS/KICK_STREAM/.arrakis/kick-config.json`

```json
{
  "bot": {
    "channel": "mi-canal",
    "username": "mi-bot-username",
    "password": "mi-password-kick"
  },
  "websocket": {
    "port": 9070,
    "host": "localhost"
  },
  "rate_limits": {
    "owner": {
      "max_messages_per_second": 10
    },
    "viewer": {
      "max_messages_per_user": 1,
      "window_seconds": 5
    }
  },
  "reconnect": {
    "max_attempts": 10,
    "backoff_ms": [1000, 2000, 5000, 10000]
  }
}
```

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-24 | Crear backlog borrador SCRIPT-1.12.0 | @scrum |
| 2025-12-24 | Definir 13 stories, 72 tasks, 46 puntos | @scrum |
| 2025-12-24 | Documentar arquitectura owner + viewer | @scrum |

---

## Próximos Pasos

1. **Revisar con PO**: Validar prioridades y scope
2. **Aprobar backlog**: Mover a `.github/BACKLOG-SCRIPTORIUM.md` como épica oficial
3. **Iniciar Sprint 1**: Ejecutar S01-S04
4. **Setup kick-aleph-bot**: Instalar dependencias, configurar Kick.com
5. **Test de concepto**: Conectar bot → WebSocket → Scriptorium → echo test
