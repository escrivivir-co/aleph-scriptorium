---
name: backend-frontend-bridge
description: "Create the RuntimeBridge service that connects Express backend with AAIAGallery Runtime, closing the critical session-execution gap."
trigger: "When the user needs to bridge backend sessions with AAIA Runtime execution, create RuntimeBridge, or debug FIA execution gaps."
---

# Backend-Frontend Bridge - AAIA Runtime

Consolidates the backend Express gateway with AAIAGallery Runtime, closing the critical gap where sessions exist but don't execute FIAs.

## Quick Start

**Problem**: Backend has sessions but no runtime execution. Need to bridge:
- `/AAIAGallery/backend/` (Express on port 8007)
- `/AAIAGallery/alephscript/src/FIA/engine/kernel/runtime.ts` (Static Runtime.threads)

**Solution**: Create Runtime bridge service in backend.

```bash
# Check current state
ls AAIAGallery/backend/src/runtime/
# Should NOT exist yet (gap to close)

# Verify Runtime class
grep -n "static threads" AAIAGallery/alephscript/src/FIA/engine/kernel/runtime.ts
```

## Implementation Path

### Step 1: Create Runtime Bridge Service

**File**: `/AAIAGallery/backend/src/runtime/RuntimeBridge.ts`

```typescript
import { Runtime } from '../../../alephscript/src/FIA/engine/kernel/runtime';
import { iFIA } from '../../../alephscript/src/FIA/iFIA';

export class RuntimeBridge {
  private static instance: RuntimeBridge;
  private runtime: Runtime;

  private constructor() {
    this.runtime = new Runtime();
    this.runtime.start(); // Load base FIAs + apps
  }

  static getInstance(): RuntimeBridge {
    if (!this.instance) {
      this.instance = new RuntimeBridge();
    }
    return this.instance;
  }

  getThreads(): iFIA[] {
    return Runtime.threads;
  }

  getFIA(index: number): iFIA | null {
    return Runtime.threads[index] || null;
  }
}
```

### Step 2: Integrate with SessionService

**File**: `/AAIAGallery/backend/src/services/session.service.ts`

Add Runtime access:

```typescript
import { RuntimeBridge } from '../runtime/RuntimeBridge';

export class SessionService {
  private runtimeBridge = RuntimeBridge.getInstance();

  async createSession(appId: string): Promise<AAIASession> {
    // Existing logic...

    // NEW: Access actual Runtime threads
    const threads = this.runtimeBridge.getThreads();
    const fias = threads.map((fia, index) => ({
      index,
      nombre: fia.nombre,
      paradigma: this.inferParadigma(fia),
      runState: fia.runState
    }));

    return { sessionId, appId, fias, ... };
  }
}
```

### Step 3: Wire FIA Execution

**File**: `/AAIAGallery/backend/src/services/fia.service.ts`

```typescript
async stepFIA(sessionId: string, fiaIndex: number) {
  const fia = this.runtimeBridge.getFIA(fiaIndex);
  if (!fia) throw new Error(`FIA ${fiaIndex} not found`);

  // Execute actual razonamiento
  const resultado = fia.razona(fia.mundo, fia.objetivos[0]);

  // Emit to Socket.IO
  this.socketService.emitFIAStep(sessionId, fiaIndex, resultado);

  return { success: true, eferencia: resultado };
}
```

---

<details>
<summary><strong>Full Consolidation Guide</strong> (click to expand)</summary>

## Background: Why This Gap Exists

**History**:
1. AAIAGallery Runtime was developed standalone (AlephScript)
2. Backend Express was created as HTTP gateway for MCP
3. Backend uses thin client pattern → delegates to... nothing (gap!)

**Current State** (from analysis):
- ✅ MCPAAIAServer (532 lines) - Complete
- ✅ AAIASessionManager (257 lines) - Thin client
- ✅ AAIABackendClient (307 lines) - HTTP client
- ✅ Backend Express (1000+ lines) - Complete
- 🔴 **Runtime Bridge** - DOES NOT EXIST

**Impact**:
- Sessions are created but FIAs don't execute
- Frontend shows empty sessions
- MCP tools return mock data

## Architecture Diagram - Current vs Target

### Current (Broken)

```
MCPAAIAServer (:3007)
    ↓ HTTP
AAIABackendClient
    ↓ HTTP
Express Backend (:8007)
    ↓ ??? (GAP)
[Runtime.threads NOT ACCESSIBLE]
```

### Target (Fixed)

```
MCPAAIAServer (:3007)
    ↓ HTTP
AAIABackendClient
    ↓ HTTP
Express Backend (:8007)
    ↓ RuntimeBridge (NEW!)
Runtime.threads[] ← AAIAGallery
    ├─ FIAs ejecutándose
    └─ Mundos activos
```

## Detailed Implementation

### Story 1: Runtime Bridge Service (8 pts)

**Tasks**:
1. Create `/backend/src/runtime/RuntimeBridge.ts`
2. Implement singleton pattern
3. Import Runtime from alephscript
4. Expose getThreads(), getFIA(), stepFIA()
5. Add error handling for Runtime.threads access

**Code**:

```typescript
// /AAIAGallery/backend/src/runtime/RuntimeBridge.ts

import { Runtime } from '../../../alephscript/src/FIA/engine/kernel/runtime';
import { iFIA } from '../../../alephscript/src/FIA/iFIA';
import { IPercepto, IEferencia } from '@alephscript/mcp-core-sdk';
import { logger } from '../utils/logger';

export class RuntimeBridge {
  private static instance: RuntimeBridge | null = null;
  private runtime: Runtime;
  private initialized = false;

  private constructor() {
    this.runtime = new Runtime();
  }

  static getInstance(): RuntimeBridge {
    if (!this.instance) {
      this.instance = new RuntimeBridge();
    }
    return this.instance;
  }

  async initialize(): Promise<void> {
    if (this.initialized) {
      logger.warn('RuntimeBridge already initialized');
      return;
    }

    try {
      logger.info('Initializing Runtime...');
      this.runtime.start(); // Loads base FIAs + apps
      this.initialized = true;
      logger.info(`Runtime initialized with ${Runtime.threads.length} FIAs`);
    } catch (error) {
      logger.error('Failed to initialize Runtime:', error);
      throw error;
    }
  }

  getThreads(): iFIA[] {
    if (!this.initialized) {
      throw new Error('Runtime not initialized. Call initialize() first.');
    }
    return Runtime.threads;
  }

  getFIA(index: number): iFIA | null {
    const threads = this.getThreads();
    if (index < 0 || index >= threads.length) {
      return null;
    }
    return threads[index];
  }

  async stepFIA(index: number): Promise<IEferencia> {
    const fia = this.getFIA(index);
    if (!fia) {
      throw new Error(`FIA at index ${index} not found`);
    }

    if (!fia.mundo) {
      throw new Error(`FIA ${fia.nombre} has no mundo attached`);
    }

    // Execute razonamiento
    const aferencia = fia.objetivos?.[0] || null;
    const resultado = fia.razona(fia.mundo, aferencia);

    logger.debug(`FIA ${fia.nombre} executed step:`, resultado);

    // Convert to IEferencia format
    return {
      tipo: 'accion',
      payload: resultado || {},
      timestamp: new Date().toISOString()
    };
  }

  async sendPercepto(index: number, percepto: IPercepto): Promise<void> {
    const fia = this.getFIA(index);
    if (!fia) {
      throw new Error(`FIA at index ${index} not found`);
    }

    // Send percepto to mundo
    if (fia.mundo && fia.mundo.eferencia) {
      fia.mundo.eferencia.next(percepto.payload);
      logger.debug(`Percepto sent to FIA ${fia.nombre}:`, percepto);
    } else {
      logger.warn(`FIA ${fia.nombre} has no eferencia Subject`);
    }
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  getStats() {
    const threads = this.getThreads();
    return {
      totalFIAs: threads.length,
      paradigmas: threads.reduce((acc, fia) => {
        const paradigma = this.inferParadigma(fia);
        acc[paradigma] = (acc[paradigma] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      runStates: threads.reduce((acc, fia) => {
        acc[fia.runState] = (acc[fia.runState] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };
  }

  private inferParadigma(fia: iFIA): string {
    // Heuristic based on FIA class name
    const className = fia.constructor.name;
    if (className.includes('Logica')) return 'logica';
    if (className.includes('Simbolica')) return 'simbolica';
    if (className.includes('Conexionista')) return 'conexionista';
    if (className.includes('SBC')) return 'sbc';
    if (className.includes('SBR')) return 'sbr';
    if (className.includes('Situada')) return 'situada';
    if (className.includes('Cientifica')) return 'cientifica';
    if (className.includes('Gramaticas')) return 'gramaticas';
    if (className.includes('Hibrida')) return 'hibrido';
    return 'sistemas';
  }
}
```

### Story 2: Integrate with SessionService (5 pts)

**File**: `/AAIAGallery/backend/src/services/session.service.ts`

**Changes**:

```typescript
import { RuntimeBridge } from '../runtime/RuntimeBridge';
import { IFIAInfo } from '@alephscript/mcp-core-sdk';

export class SessionService {
  private runtimeBridge: RuntimeBridge;

  constructor() {
    this.runtimeBridge = RuntimeBridge.getInstance();
  }

  async initialize(): Promise<void> {
    await this.runtimeBridge.initialize();
  }

  async createSession(appId: string): Promise<AAIASession> {
    // Existing mock logic...

    // NEW: Get actual FIAs from Runtime
    const threads = this.runtimeBridge.getThreads();
    const fias: IFIAInfo[] = threads.map((fia, index) => ({
      index,
      nombre: fia.nombre,
      paradigma: this.inferParadigma(fia),
      runState: fia.runState,
      runAsync: fia.runAsync || false,
      capacidades: fia.objetivos?.map(o => String(o)) || []
    }));

    const session: AAIASession = {
      sessionId: crypto.randomUUID(),
      appId,
      createdAt: new Date(),
      lastUsedAt: new Date(),
      fias,
      mundo: this.getMundoFromFIA(threads[0]) // First FIA's mundo
    };

    this.sessions.set(session.sessionId, session);
    return session;
  }

  private getMundoFromFIA(fia: iFIA): IMundoState {
    if (!fia.mundo) {
      return {
        nombre: 'Unknown',
        vivo: false,
        runState: 'STOP',
        modelo: {},
        fiasCount: 0
      };
    }

    return {
      nombre: fia.mundo.nombre || 'Mundo',
      vivo: fia.mundo.vivo || false,
      runState: fia.mundo.runState || 'STOP',
      modelo: fia.mundo.modelo || {},
      fiasCount: 1
    };
  }
}
```

### Story 3: Wire FIA Execution in FIAService (8 pts)

**File**: `/AAIAGallery/backend/src/services/fia.service.ts`

**Replace mock logic with real execution**:

```typescript
import { RuntimeBridge } from '../runtime/RuntimeBridge';
import { IEferencia, IPercepto } from '@alephscript/mcp-core-sdk';

export class FIAService {
  private runtimeBridge: RuntimeBridge;

  constructor(private socketService: SocketIOService) {
    this.runtimeBridge = RuntimeBridge.getInstance();
  }

  async stepFIA(sessionId: string, fiaIndex: number): Promise<{
    success: boolean;
    eferencia: IEferencia;
  }> {
    // Verify session exists
    const session = this.sessionService.getSession(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    // Execute step on Runtime
    const eferencia = await this.runtimeBridge.stepFIA(fiaIndex);

    // Emit to Socket.IO for observers
    this.socketService.emitToRoom('AAIA_ROOM', 'FIA_STEP', {
      sessionId,
      fiaIndex,
      eferencia,
      timestamp: new Date().toISOString()
    });

    return { success: true, eferencia };
  }

  async sendPercepto(sessionId: string, percepto: IPercepto): Promise<{
    success: boolean;
    processedBy: number[];
  }> {
    const session = this.sessionService.getSession(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    const processedBy: number[] = [];

    // Send to all FIAs in session (or specific one if targeted)
    for (const fia of session.fias) {
      try {
        await this.runtimeBridge.sendPercepto(fia.index, percepto);
        processedBy.push(fia.index);
      } catch (error) {
        logger.warn(`Failed to send percepto to FIA ${fia.index}:`, error);
      }
    }

    // Emit to Socket.IO
    this.socketService.emitToRoom('AAIA_ROOM', 'PERCEPTO', {
      sessionId,
      percepto,
      processedBy,
      timestamp: new Date().toISOString()
    });

    return { success: true, processedBy };
  }
}
```

### Story 4: Initialize Runtime on Server Start (3 pts)

**File**: `/AAIAGallery/backend/src/app.ts`

**Add initialization**:

```typescript
import { RuntimeBridge } from './runtime/RuntimeBridge';

async function startServer() {
  const app = express();

  // ... existing middleware setup ...

  // NEW: Initialize Runtime before starting server
  logger.info('Initializing AAIA Runtime...');
  const runtimeBridge = RuntimeBridge.getInstance();
  await runtimeBridge.initialize();

  const stats = runtimeBridge.getStats();
  logger.info('Runtime initialized:', stats);

  // Start Express server
  app.listen(PORT, () => {
    logger.info(`Backend running on port ${PORT}`);
  });
}

startServer().catch(error => {
  logger.error('Failed to start server:', error);
  process.exit(1);
});
```

## Testing the Integration

### Test 1: Verify Runtime Loads

```bash
cd AAIAGallery/backend
npm run dev

# Check logs for:
# ✅ "Initializing Runtime..."
# ✅ "Runtime initialized with X FIAs"
# ✅ Stats showing paradigmas breakdown
```

### Test 2: Create Session and List FIAs

```bash
# Create session
curl -X POST http://localhost:8007/api/sessions \
  -H "Content-Type: application/json" \
  -d '{"appId": "demo-logica"}'

# Should return actual FIAs from Runtime.threads, not mocks
```

### Test 3: Execute FIA Step

```bash
# Step FIA
curl -X POST http://localhost:8007/api/sessions/{sessionId}/fias/0/step

# Should return real eferencia from FIA.razona(), not mock
```

### Test 4: Socket.IO Events

```javascript
// In Node.js or browser console
const io = require('socket.io-client');
const socket = io('http://localhost:3010/runtime');

socket.emit('join', { room: 'AAIA_ROOM', mode: 'observer' });

socket.on('FIA_STEP', (data) => {
  console.log('Real FIA execution:', data);
});
```

## Migration Checklist

- [ ] Create `/backend/src/runtime/` directory
- [ ] Implement `RuntimeBridge.ts` (singleton pattern)
- [ ] Update `SessionService` to use RuntimeBridge
- [ ] Update `FIAService` to execute real FIA steps
- [ ] Initialize Runtime in `app.ts` on server start
- [ ] Test with curl commands
- [ ] Verify Socket.IO events emit real data
- [ ] Update frontend to consume real sessions
- [ ] Remove mock data generators
- [ ] Document new architecture in README

## Common Issues

### Issue 1: Runtime.threads is empty

**Symptom**: `getThreads()` returns `[]`

**Cause**: `runtime.start()` not called or failed

**Fix**: Check logs for Runtime initialization errors

### Issue 2: FIA.razona() throws

**Symptom**: `stepFIA()` crashes

**Cause**: FIA's mundo is null or objetivos empty

**Fix**: Validate FIA state before calling razona():

```typescript
if (!fia.mundo) {
  throw new Error(`FIA ${fia.nombre} has no mundo`);
}
if (!fia.objetivos || fia.objetivos.length === 0) {
  logger.warn(`FIA ${fia.nombre} has no objetivos, skipping`);
  return { tipo: 'noop', payload: {}, timestamp: new Date().toISOString() };
}
```

### Issue 3: Import errors from alephscript

**Symptom**: `Cannot find module '../../../alephscript'`

**Cause**: Path resolution issue

**Fix**: Use `tsconfig.json` paths or relative imports:

```json
{
  "compilerOptions": {
    "paths": {
      "@alephscript/*": ["../alephscript/src/*"]
    }
  }
}
```

## Performance Considerations

**Runtime.threads is static**: All sessions share the same FIAs

**Workaround**:
- Use session-specific filters when listing FIAs
- Clone FIA state per session (future enhancement)
- Use factory pattern to create fresh FIAs (spike needed)

**Current limitation**: Sessions are not truly isolated in Runtime

**Future**: Implement RuntimePool pattern (see backlog spike AAIA-SPIKE-001)

## Related Documentation

- [MCPAAIAServer.ts](../../MCPGallery/mcp-mesh-sdk/src/MCPAAIAServer.ts) - MCP server implementation
- [Runtime.ts](../../AAIAGallery/alephscript/src/FIA/engine/kernel/runtime.ts) - Runtime class
- [Backlog](../../ARCHIVO/DISCO/BACKLOG_BORRADORES/Enero_18_MCP_AAIA_Server/01_backlog-borrador.md) - Original epic
- [Session Cotrabajo](../../ARCHIVO/DISCO/SESIONES_COTRABAJO/2026-01-18_mcp-aaia-server/) - Design session

</details>
