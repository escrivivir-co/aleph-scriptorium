---
name: socketio-orchestration
description: "Orchestrate FIA execution events through Socket.IO mesh with PersefonBot as MASTER of AAIA_ROOM."
trigger: "When the user needs to manage Socket.IO events, configure PersefonBot, or debug FIA execution orchestration."
---

# Socket.IO Orchestration - PersefonBot & AAIA_ROOM

Orchestrate FIA execution events through Socket.IO mesh with PersefonBot as MASTER of AAIA_ROOM.

## Quick Start

**PersefonBot Status**: ✅ **Implemented** (350+ lines, 13 capabilities)

**Locations**:
- Backend: `/AAIAGallery/backend/src/bots/PersefonBot.ts`
- MCP Server: `/MCPGallery/mcp-mesh-sdk/src/MCPAAIAServer.ts` (lines 48-121)

```bash
# Start Socket.IO mesh
cd AAIAGallery/backend
npm run dev
# → PersefonBot connects to ws://localhost:3010/runtime

# Watch events
node scripts/watch-aaia-room.js
```

## Architecture

```
┌────────────────────────────────────────────────────────┐
│              Socket.IO Mesh (:3010/runtime)            │
├────────────────────────────────────────────────────────┤
│                                                        │
│  AAIA_ROOM                                             │
│  ├─ MASTER: PersefonBot (Backend)                     │
│  │  └─ Capabilities: 13 actions                       │
│  ├─ OBSERVER: MCP PersefonBot (MCPAAIAServer)         │
│  └─ OBSERVERS: AlephScript clients                    │
│                                                        │
│  ENGINE_THREADS_ROOM                                   │
│  └─ MASTER: PersefonBot (Backend)                     │
│     └─ Capability: GET_LIST_OF_THREADS                │
│                                                        │
└────────────────────────────────────────────────────────┘
```

## PersefonBot Capabilities (13)

| Capability | Event | Handler Location |
|-----------|-------|------------------|
| `AAIA_GET_APPS` | GET_AAIA_GET_APPS | Backend PersefonBot |
| `AAIA_CREATE_SESSION` | GET_AAIA_CREATE_SESSION | Backend PersefonBot |
| `AAIA_LIST_SESSIONS` | GET_AAIA_LIST_SESSIONS | Backend PersefonBot |
| `AAIA_DESTROY_SESSION` | GET_AAIA_DESTROY_SESSION | Backend PersefonBot |
| `AAIA_LIST_FIAS` | GET_AAIA_LIST_FIAS | Backend PersefonBot |
| `AAIA_START_FIA` | GET_AAIA_START_FIA | Backend PersefonBot |
| `AAIA_STOP_FIA` | GET_AAIA_STOP_FIA | Backend PersefonBot |
| `AAIA_STEP_FIA` | GET_AAIA_STEP_FIA | Backend PersefonBot |
| `AAIA_PLAY_FIA` | GET_AAIA_PLAY_FIA | Backend PersefonBot |
| `AAIA_PAUSE_FIA` | GET_AAIA_PAUSE_FIA | Backend PersefonBot |
| `AAIA_SEND_PERCEPTO` | GET_AAIA_SEND_PERCEPTO | Backend PersefonBot |
| `AAIA_GET_EFERENCIA` | GET_AAIA_GET_EFERENCIA | Backend PersefonBot |
| `AAIA_QUERY_MUNDO` | GET_AAIA_QUERY_MUNDO | Backend PersefonBot |

## Event Flow

### Example: Step FIA

```
1. Client emits:    GET_AAIA_STEP_FIA
2. PersefonBot receives (MASTER)
3. Executes:        FIAService.stepFIA()
4. PersefonBot emits: SET_FIA_STEP (broadcast)
5. Observers receive step result
```

---

<details>
<summary><strong>Full Socket.IO Integration Guide</strong> (click to expand)</summary>

## PersefonBot Implementation (Backend)

**File**: `/AAIAGallery/backend/src/bots/PersefonBot.ts`

### Configuration

```typescript
export interface PersefonBotConfig {
  socketUrl: string;
  namespace: string;
  autoConnect: boolean;
  reconnection: boolean;
  reconnectionAttempts: number;
}

export const DEFAULT_PERSEFON_CONFIG: PersefonBotConfig = {
  socketUrl: process.env.SOCKET_URL || 'http://localhost:3010',
  namespace: '/runtime',
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 10
};
```

### Initialization

```typescript
export class PersefonBot {
  private socket: Socket;
  private config: PersefonBotConfig;

  constructor(config: Partial<PersefonBotConfig> = {}) {
    this.config = { ...DEFAULT_PERSEFON_CONFIG, ...config };
    this.socket = io(
      `${this.config.socketUrl}${this.config.namespace}`,
      {
        autoConnect: this.config.autoConnect,
        reconnection: this.config.reconnection,
        reconnectionAttempts: this.config.reconnectionAttempts
      }
    );

    this.setupListeners();
  }

  private setupListeners(): void {
    this.socket.on('connect', () => {
      logger.info('PersefonBot connected to Socket.IO mesh');
      this.registerAsMASTER();
    });

    this.socket.on('disconnect', (reason) => {
      logger.warn('PersefonBot disconnected:', reason);
    });

    this.socket.on('error', (error) => {
      logger.error('PersefonBot error:', error);
    });
  }

  private registerAsMASTER(): void {
    // Register in AAIA_ROOM
    this.socket.emit('CLIENT_REGISTER', {
      usuario: 'PersefonBot',
      sesion: this.generateSessionHash()
    });

    this.socket.emit('CLIENT_SUSCRIBE', { room: 'AAIA_ROOM' });

    this.socket.emit('MAKE_MASTER', {
      room: 'AAIA_ROOM',
      features: [
        'AAIA_GET_APPS',
        'AAIA_CREATE_SESSION',
        'AAIA_LIST_SESSIONS',
        'AAIA_DESTROY_SESSION',
        'AAIA_LIST_FIAS',
        'AAIA_START_FIA',
        'AAIA_STOP_FIA',
        'AAIA_STEP_FIA',
        'AAIA_PLAY_FIA',
        'AAIA_PAUSE_FIA',
        'AAIA_SEND_PERCEPTO',
        'AAIA_GET_EFERENCIA',
        'AAIA_QUERY_MUNDO'
      ]
    });

    // Register in ENGINE_THREADS_ROOM
    this.socket.emit('CLIENT_SUSCRIBE', { room: 'ENGINE_THREADS_ROOM' });

    this.socket.emit('MAKE_MASTER', {
      room: 'ENGINE_THREADS_ROOM',
      features: ['GET_LIST_OF_THREADS']
    });

    logger.info('PersefonBot registered as MASTER of AAIA_ROOM and ENGINE_THREADS_ROOM');
  }

  private generateSessionHash(): string {
    return crypto.createHash('md5').update('PersefonBot').digest('hex');
  }
}
```

### Event Handlers

```typescript
// In PersefonBot class

setupEventHandlers(
  sessionService: SessionService,
  fiaService: FIAService,
  mundoService: MundoService,
  appsService: AppsService
): void {
  // AAIA_GET_APPS
  this.socket.on('GET_AAIA_GET_APPS', async (data, callback) => {
    try {
      const apps = await appsService.listApps();
      this.emitToRoom('AAIA_ROOM', 'SET_AAIA_GET_APPS', { apps });
      if (callback) callback({ success: true, apps });
    } catch (error) {
      logger.error('GET_AAIA_GET_APPS failed:', error);
      if (callback) callback({ success: false, error: error.message });
    }
  });

  // AAIA_CREATE_SESSION
  this.socket.on('GET_AAIA_CREATE_SESSION', async (data, callback) => {
    try {
      const { appId } = data;
      const session = await sessionService.createSession(appId);

      this.emitToRoom('AAIA_ROOM', 'SESSION_CREATED', {
        sessionId: session.sessionId,
        appId: session.appId,
        timestamp: new Date().toISOString()
      });

      if (callback) callback({ success: true, session });
    } catch (error) {
      logger.error('GET_AAIA_CREATE_SESSION failed:', error);
      if (callback) callback({ success: false, error: error.message });
    }
  });

  // AAIA_STEP_FIA
  this.socket.on('GET_AAIA_STEP_FIA', async (data, callback) => {
    try {
      const { sessionId, fiaIndex } = data;
      const result = await fiaService.stepFIA(sessionId, fiaIndex);

      this.emitToRoom('AAIA_ROOM', 'FIA_STEP', {
        sessionId,
        fiaIndex,
        eferencia: result.eferencia,
        timestamp: new Date().toISOString()
      });

      if (callback) callback({ success: true, ...result });
    } catch (error) {
      logger.error('GET_AAIA_STEP_FIA failed:', error);
      if (callback) callback({ success: false, error: error.message });
    }
  });

  // AAIA_SEND_PERCEPTO
  this.socket.on('GET_AAIA_SEND_PERCEPTO', async (data, callback) => {
    try {
      const { sessionId, percepto } = data;
      const result = await mundoService.sendPercepto(sessionId, percepto);

      this.emitToRoom('AAIA_ROOM', 'PERCEPTO', {
        sessionId,
        percepto,
        processedBy: result.processedBy,
        timestamp: new Date().toISOString()
      });

      if (callback) callback({ success: true, ...result });
    } catch (error) {
      logger.error('GET_AAIA_SEND_PERCEPTO failed:', error);
      if (callback) callback({ success: false, error: error.message });
    }
  });

  // GET_LIST_OF_THREADS (ENGINE_THREADS_ROOM)
  this.socket.on('GET_LIST_OF_THREADS', async (data, callback) => {
    try {
      const threads = RuntimeBridge.getInstance().getThreads();

      const threadList = threads.map((fia, index) => ({
        index,
        nombre: fia.nombre,
        paradigma: this.inferParadigma(fia),
        runState: fia.runState,
        mundo: fia.mundo?.nombre || null
      }));

      this.emitToRoom('ENGINE_THREADS_ROOM', 'SET_LIST_OF_THREADS', { threads: threadList });

      if (callback) callback({ success: true, threads: threadList });
    } catch (error) {
      logger.error('GET_LIST_OF_THREADS failed:', error);
      if (callback) callback({ success: false, error: error.message });
    }
  });

  // ... more handlers for other capabilities
}

emitToRoom(room: string, event: string, data: any): void {
  this.socket.to(room).emit(event, data);
}
```

## MCP PersefonBot (Observer)

**File**: `/MCPGallery/mcp-mesh-sdk/src/MCPAAIAServer.ts` (lines 48-121)

### Initialization

```typescript
private initPersefonBot(): void {
  const socketUrl = process.env.SOCKET_MESH_URL || "http://localhost:3010";
  const serverName = DEFAULT_AAIA_MCP_SERVER_CONFIG.id;

  this.persefonBot = new AlephScriptClient(serverName, socketUrl);

  this.persefonBot.initTriggersDefinition.push(() => {
    const ROOM_NAME = "AAIA_ROOM";
    const REGISTER_PAYLOAD = {
      usuario: this.persefonBot.name,
      sesion: getHash("PersefonBot-MCP")
    };

    this.persefonBot.io.emit("CLIENT_REGISTER", REGISTER_PAYLOAD);
    this.persefonBot.io.emit("CLIENT_SUSCRIBE", { room: ROOM_NAME });

    // Listen to events (as observer, not master)
    this.setupMCPListeners();
  });
}

private setupMCPListeners(): void {
  // Listen to FIA_STEP events
  this.persefonBot.io.on('FIA_STEP', (data) => {
    l.info('FIA_STEP event received:', data);
    // Optional: update local cache or notify MCP clients
  });

  // Listen to SESSION_CREATED events
  this.persefonBot.io.on('SESSION_CREATED', (data) => {
    l.info('SESSION_CREATED event received:', data);
  });

  // ... more listeners
}
```

## AlephScript Client Integration

**Creating a Client**:

```typescript
import { io, Socket } from 'socket.io-client';

class AAIAClient {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3010/runtime', {
      autoConnect: true
    });

    this.setupHandlers();
  }

  private setupHandlers(): void {
    this.socket.on('connect', () => {
      console.log('Connected to AAIA mesh');

      // Register and join room
      this.socket.emit('CLIENT_REGISTER', {
        usuario: 'MyClient',
        sesion: crypto.randomUUID()
      });

      this.socket.emit('CLIENT_SUSCRIBE', { room: 'AAIA_ROOM' });
    });

    // Listen to FIA events
    this.socket.on('FIA_STEP', (data) => {
      console.log('FIA executed:', data);
    });

    this.socket.on('PERCEPTO', (data) => {
      console.log('Percepto sent:', data);
    });

    this.socket.on('SESSION_CREATED', (data) => {
      console.log('Session created:', data);
    });
  }

  // Request FIA step
  async stepFIA(sessionId: string, fiaIndex: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.socket.emit('GET_AAIA_STEP_FIA', { sessionId, fiaIndex }, (response) => {
        if (response.success) {
          resolve(response);
        } else {
          reject(new Error(response.error));
        }
      });
    });
  }

  // Send percepto
  async sendPercepto(sessionId: string, percepto: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.socket.emit('GET_AAIA_SEND_PERCEPTO', { sessionId, percepto }, (response) => {
        if (response.success) {
          resolve(response);
        } else {
          reject(new Error(response.error));
        }
      });
    });
  }
}

// Usage
const client = new AAIAClient();

// Create session
client.stepFIA('session-123', 0)
  .then(result => console.log('Step result:', result))
  .catch(error => console.error('Step failed:', error));
```

## AsyncAPI Specification

**File**: `/ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/AAIAServer/asyncapi.yaml`

```yaml
asyncapi: 3.0.0
info:
  title: AAIA Runtime Socket.IO API
  version: 1.0.0
  description: Real-time events for FIA execution orchestration

servers:
  production:
    host: localhost:3010
    protocol: socketio
    pathname: /runtime

channels:
  AAIA_ROOM:
    description: Main AAIA orchestration room
    bindings:
      socketio:
        room: AAIA_ROOM

    messages:
      FIA_STEP:
        summary: FIA executed a reasoning step
        payload:
          type: object
          properties:
            sessionId:
              type: string
              format: uuid
            fiaIndex:
              type: integer
              minimum: 0
            eferencia:
              type: object
              properties:
                tipo:
                  type: string
                  enum: [accion, dato, evento, estado, noop]
                payload:
                  type: object
            timestamp:
              type: string
              format: date-time

      PERCEPTO:
        summary: Percepto sent to mundo
        payload:
          type: object
          properties:
            sessionId:
              type: string
            percepto:
              type: object
              properties:
                tipo:
                  type: string
                  enum: [sensor, evento, comando]
                payload:
                  type: object
            processedBy:
              type: array
              items:
                type: integer
            timestamp:
              type: string
              format: date-time

      SESSION_CREATED:
        summary: New AAIA session created
        payload:
          type: object
          properties:
            sessionId:
              type: string
              format: uuid
            appId:
              type: string
            timestamp:
              type: string
              format: date-time

      SESSION_DESTROYED:
        summary: AAIA session destroyed
        payload:
          type: object
          properties:
            sessionId:
              type: string
            timestamp:
              type: string
              format: date-time

  ENGINE_THREADS_ROOM:
    description: Runtime.threads monitoring room
    messages:
      SET_LIST_OF_THREADS:
        summary: Current Runtime.threads state
        payload:
          type: object
          properties:
            threads:
              type: array
              items:
                type: object
                properties:
                  index:
                    type: integer
                  nombre:
                    type: string
                  paradigma:
                    type: string
                  runState:
                    type: string
                    enum: [PLAY, PAUSE, STOP, PLAY_STEP]
                  mundo:
                    type: string
                    nullable: true

operations:
  stepFIA:
    action: send
    channel:
      $ref: '#/channels/AAIA_ROOM'
    messages:
      - $ref: '#/channels/AAIA_ROOM/messages/FIA_STEP'

  sendPercepto:
    action: send
    channel:
      $ref: '#/channels/AAIA_ROOM'
    messages:
      - $ref: '#/channels/AAIA_ROOM/messages/PERCEPTO'
```

## Testing Socket.IO Events

### Test Script (Node.js)

```javascript
// scripts/test-socketio.js

const { io } = require('socket.io-client');

const socket = io('http://localhost:3010/runtime', {
  autoConnect: true
});

socket.on('connect', () => {
  console.log('✅ Connected to Socket.IO mesh');

  // Register client
  socket.emit('CLIENT_REGISTER', {
    usuario: 'TestClient',
    sesion: 'test-session-123'
  });

  // Join AAIA_ROOM
  socket.emit('CLIENT_SUSCRIBE', { room: 'AAIA_ROOM' });
  console.log('✅ Joined AAIA_ROOM');

  // Listen to events
  socket.on('FIA_STEP', (data) => {
    console.log('📨 FIA_STEP:', data);
  });

  socket.on('PERCEPTO', (data) => {
    console.log('📨 PERCEPTO:', data);
  });

  socket.on('SESSION_CREATED', (data) => {
    console.log('📨 SESSION_CREATED:', data);
  });

  // Request session creation
  setTimeout(() => {
    console.log('🔄 Requesting session creation...');
    socket.emit('GET_AAIA_CREATE_SESSION', { appId: 'demo-logica' }, (response) => {
      console.log('Response:', response);

      if (response.success) {
        const sessionId = response.session.sessionId;

        // Step FIA
        setTimeout(() => {
          console.log('🔄 Requesting FIA step...');
          socket.emit('GET_AAIA_STEP_FIA', { sessionId, fiaIndex: 0 }, (stepResponse) => {
            console.log('Step response:', stepResponse);
          });
        }, 1000);
      }
    });
  }, 2000);
});

socket.on('disconnect', (reason) => {
  console.log('❌ Disconnected:', reason);
});

socket.on('error', (error) => {
  console.error('❌ Error:', error);
});
```

### Run Test

```bash
node scripts/test-socketio.js

# Expected output:
# ✅ Connected to Socket.IO mesh
# ✅ Joined AAIA_ROOM
# 🔄 Requesting session creation...
# Response: { success: true, session: {...} }
# 📨 SESSION_CREATED: { sessionId: '...', appId: 'demo-logica', ... }
# 🔄 Requesting FIA step...
# Step response: { success: true, eferencia: {...} }
# 📨 FIA_STEP: { sessionId: '...', fiaIndex: 0, eferencia: {...} }
```

## Debugging Socket.IO

### Enable Debug Logs

```bash
# Server-side
DEBUG=socket.io:* npm run dev

# Client-side
localStorage.setItem('debug', 'socket.io-client:*');
```

### Monitor with Socket.IO Admin UI

```bash
npm install @socket.io/admin-ui

# In backend/src/app.ts
import { instrument } from '@socket.io/admin-ui';

const io = new Server(server);
instrument(io, {
  auth: false // Enable auth in production
});

# Open http://localhost:3010/admin-ui
```

### VS Code Tasks for Socket.IO

```json
// .vscode/tasks.json
{
  "label": "AAIA: Watch Socket.IO Events",
  "type": "shell",
  "command": "node",
  "args": ["scripts/test-socketio.js"],
  "presentation": {
    "reveal": "always",
    "panel": "dedicated"
  },
  "isBackground": true
}
```

## Common Issues

### Issue 1: PersefonBot not connecting

**Symptom**: No logs from PersefonBot

**Cause**: Socket.IO mesh not running

**Fix**:
```bash
# Check if port 3010 is listening
lsof -i :3010

# Start mesh server
cd AAIAGallery/backend
npm run dev
```

### Issue 2: Events not received

**Symptom**: Client emits but handler not called

**Cause**: Not subscribed to room

**Fix**:
```javascript
// Ensure CLIENT_SUSCRIBE is called
socket.emit('CLIENT_SUSCRIBE', { room: 'AAIA_ROOM' });

// Wait for confirmation
socket.on('SUSCRIBE_OK', () => {
  console.log('Room subscription confirmed');
});
```

### Issue 3: Callback not firing

**Symptom**: `emit(..., callback)` hangs

**Cause**: Handler doesn't invoke callback

**Fix**:
```typescript
// Server-side handler MUST call callback
this.socket.on('GET_AAIA_STEP_FIA', async (data, callback) => {
  try {
    const result = await fiaService.stepFIA(data.sessionId, data.fiaIndex);
    callback({ success: true, ...result }); // ← MUST call this
  } catch (error) {
    callback({ success: false, error: error.message }); // ← And this
  }
});
```

## Best Practices

### 1. Always Use Callbacks

```typescript
// ✅ Good
socket.emit('GET_AAIA_STEP_FIA', { sessionId, fiaIndex }, (response) => {
  if (response.success) {
    // Handle result
  }
});

// ❌ Bad (no confirmation)
socket.emit('GET_AAIA_STEP_FIA', { sessionId, fiaIndex });
```

### 2. Broadcast State Changes

```typescript
// After executing FIA step
const result = await fiaService.stepFIA(sessionId, fiaIndex);

// Broadcast to all observers
this.emitToRoom('AAIA_ROOM', 'FIA_STEP', {
  sessionId,
  fiaIndex,
  eferencia: result.eferencia,
  timestamp: new Date().toISOString()
});
```

### 3. Handle Reconnection

```typescript
socket.on('reconnect', (attemptNumber) => {
  logger.info(`Reconnected after ${attemptNumber} attempts`);

  // Re-register and re-subscribe
  this.registerAsMASTER();
});
```

### 4. Validate Payloads

```typescript
this.socket.on('GET_AAIA_STEP_FIA', async (data, callback) => {
  // Validate input
  if (!data.sessionId || typeof data.fiaIndex !== 'number') {
    callback({ success: false, error: 'Invalid payload' });
    return;
  }

  // Proceed...
});
```

## Related Files

- [PersefonBot.ts](../../AAIAGallery/backend/src/bots/PersefonBot.ts) - Backend bot (350+ lines)
- [MCPAAIAServer.ts](../../MCPGallery/mcp-mesh-sdk/src/MCPAAIAServer.ts) - MCP observer (lines 48-121)
- [asyncapi.yaml](../../ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/AAIAServer/asyncapi.yaml) - Event spec
- [AlephScriptClient.ts](../../MCPGallery/mcp-core-sdk/src/client/AlephScriptClient.ts) - Client base class

</details>
