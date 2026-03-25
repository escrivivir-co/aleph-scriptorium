# Informe: Arquitectura de Sesiones Prolog MCP

> **Fecha**: 2 de enero de 2026  
> **Solicitante**: Product Owner  
> **Investigador**: @ox + @indice  
> **Épica**: IOT-SBR-LOGICA + SCRIPT-2.2.0

---

## Resumen Ejecutivo

| Pregunta | Respuesta | Estado |
|----------|-----------|--------|
| ¿Cómo están diseñadas las sesiones Prolog? | **Stateful por proceso** | ⚠️ Gap |
| ¿Cómo se comunica con el server Prolog? | **HTTP REST + swipl binding** | ✅ Claro |
| ¿Agentes de una obra comparten sesión/datos? | **NO actualmente** | ⚠️ Gap |
| ¿Cada llamada MCP reinicia el estado? | **Depende del wrapper** | 🔧 Diseño pendiente |

**Veredicto**: La arquitectura base EXISTE pero **falta diseñar la capa de gestión de sesiones compartidas** para que múltiples agentes de una obra puedan operar sobre la misma base de conocimiento Prolog.

---

## 1. Arquitectura Actual del Servidor Prolog

### 1.1 Componentes Identificados

```
PrologEditor/backend/
├── src/
│   ├── services/
│   │   ├── prolog-service.js      ← Motor SWI-Prolog (swipl binding)
│   │   ├── prolog-parser.js       ← Conversión telemetría → hechos
│   │   └── template-service.js    ← Gestión de templates
│   └── controllers/
│       └── telemetry-controller.js ← API REST
```

**Fuente**: [02_analisis-submodulo.md](../IOT-SBR-LOGICA/02_analisis-submodulo.md)

### 1.2 API REST Actual

| Endpoint | Método | Función |
|----------|--------|---------|
| `/api/telemetry` | POST | Procesa telemetría IoT → hechos Prolog |
| `/api/rules` | POST | Guarda regla en SQLite |
| `/api/rules/:app` | GET | Lista reglas por app |
| `/api/run-rule` | POST | Ejecuta consulta Prolog |
| `/api/template/:name` | GET | Predicados de un template |

### 1.3 Flujo de Procesamiento Actual

```
HTTP Request → telemetryToPrologFacts() → assertFacts() → applyRules() → Response
                    (aferencia)            (añade KB)     (inferencia)
```

---

## 2. Estado de la Sesión Prolog (Código Real Analizado)

### 2.1 PrologEditor: Singleton con swipl binding

**Archivo**: `PrologEditor/backend/src/services/prolog-service.js`

```javascript
const swipl = require('swipl');  // Binding nativo SWI-Prolog

class PrologService {
  last = [];           // Archivos cargados actualmente
  initialized = false;

  async init(templateName) {
    // 1. Descarga archivos previos (unload_file)
    for(let l of this.last) {
      const unloadQuery = `unload_file('${l}')`;
      await swipl.call(unloadQuery);
    }
    this.last = [];
    
    // 2. Carga template nuevo (consult)
    for(const file of template.files) {
      await swipl.call(`consult('${file}')`);
      this.last.push(file);
    }
    this.initialized = true;
  }

  async executeQuery(goal) {
    const result = await swipl.call(goal);  // Ejecuta en la KB activa
    return this.parseResult(result);
  }
}

module.exports = new PrologService();  // ⚠️ SINGLETON EXPORTADO
```

**Hallazgos clave**:
- ✅ **Stateful**: Los hechos persisten mientras el proceso viva
- ⚠️ **Singleton global**: `module.exports = new PrologService()` — UNA instancia para todo el servidor
- ⚠️ **Sin sesiones**: Todos los requests comparten la misma KB
- ⚠️ **Cambiar template = descargar anterior**: `init()` hace `unload_file` de todo

### 2.2 AAIAGallery: swipl-stdio con Engine

**Archivo**: `AAIAGallery/alephscript/src/FIA/paradigmas/sbr/app/prolog/server.ts`

```typescript
import * as swipl from 'swipl-stdio';  // Diferente binding: usa stdio

export class PrologServer {
  engine: swipl.Engine;
  private loadedFiles: string[] = [];  // Caché de archivos cargados

  openProlog(rutaArchivoPl: RutaDisco) {
    this.engine = new swipl.Engine();  // Nueva instancia de engine
  }

  loadPrologFiles(files: string[], callback: () => void) {
    // Carga solo archivos no cacheados
    const filesToLoad = files.filter(f => !this.loadedFiles.includes(f));
    filesToLoad.forEach(m => this.runPrologFunction(m, ''));
    this.loadedFiles.push(...filesToLoad);
    this.saveLoadedFiles();  // Persiste caché a disco
  }

  runPrologFunction(functionName: string, args: string) {
    const query = await this.engine.createQuery('...');
    while (result = await query2.next()) {
      console.log("Respuesta:", result);
    }
    await query2.close();
  }
}
```

**Hallazgos clave**:
- ✅ **Clase instanciable**: `new PrologServer()` permite múltiples engines
- ✅ **Caché de archivos**: Evita recargar archivos ya consultados
- ✅ **Persistencia de caché**: `loadedFiles.json` sobrevive reinicio
- 🔧 **Base para sesiones**: Esta arquitectura SÍ permite crear múltiples engines

### 2.3 Comparativa de Implementaciones

| Aspecto | PrologEditor | AAIAGallery |
|---------|--------------|-------------|
| **Binding** | `swipl` (nativo) | `swipl-stdio` (proceso) |
| **Patrón** | Singleton global | Clase instanciable |
| **Múltiples KB** | ❌ No | ✅ Posible |
| **Caché disco** | ❌ No | ✅ `loadedFiles.json` |
| **HTTP Ready** | ✅ Express | ❌ CLI/readline |

### 2.4 Persistencia SQLite (solo PrologEditor)

Las **reglas** (no los hechos dinámicos) se guardan en SQLite:

```javascript
// De template-service.js
db.run('INSERT INTO rules (app, condition, action, ...) VALUES (?, ?, ?, ...)');
```

**Implicación**:
- ✅ Reglas base sobreviven reinicio
- ❌ Hechos dinámicos (`assert`/`retract` en runtime) NO persisten

---

## 3. Diseño MCP Propuesto vs. Realidad

### 3.1 Diseño Documentado

Según [blueprint-logic-flow.md](../../../docs/blueprint-logic-flow.md) y [feature1_prolog_inteligencias_situadas.md](../Enero_2026_LogicaAgentes/feature1_prolog_inteligencias_situadas.md):

```typescript
// Diseño propuesto (NO implementado aún)
export const DEFAULT_PROLOG_MCP_SERVER_CONFIG = {
  id: "prolog-mcp-server",
  port: 3006,
  tools: [
    "query_prolog",    // Ejecutar query
    "assert_fact",     // Añadir hecho
    "retract_fact",    // Eliminar hecho
    "consult_kb"       // Cargar archivo .pl
  ],
  resources: ["knowledge_base"]
};
```

### 3.2 Gap Identificado: Sesiones Compartidas

El diseño actual **NO especifica**:

1. **Identificador de sesión**: ¿Cómo sabe el servidor que dos agentes pertenecen a la misma obra?
2. **Namespace de KB**: ¿Cada obra tiene su propia base de conocimiento?
3. **Ciclo de vida**: ¿Cuándo se crea/destruye una sesión?

---

## 4. Preguntas Clave Respondidas

### 4.1 ¿Cómo están diseñadas las sesiones en Prolog?

**Estado Actual**: No hay concepto de "sesión" explícito.

El servidor Prolog actual opera en modo **singleton**:
- Un proceso Node.js = Una instancia SWI-Prolog = Una KB global
- Todos los requests comparten el mismo estado

**Problema para Teatro**: Si dos obras corren en paralelo, sus hechos se mezclarían.

### 4.2 ¿Cómo está planteada la comunicación con el server Prolog?

**Actual (PrologEditor)**: HTTP REST → `prolog-service.js` → `swipl` binding

**Propuesto (MCP)**: 
```
Agente → MCP Tool Call → HTTP/stdio → prolog-mcp-server → swipl
```

La pasarela MCP actuaría como wrapper del servidor REST existente.

### 4.3 ¿Podrán los agentes de una obra compartir la misma sesión y datos?

**Actualmente**: ⚠️ **Sí, pero de forma insegura**

Todos los agentes que llamen al mismo servidor comparten KB, pero:
- No hay aislamiento entre obras
- No hay control de quién puede modificar qué
- No hay rollback si algo falla

**Propuesta de Solución**: Ver Sección 5.

### 4.4 ¿Cada llamada al servidor MCP reinicia?

**Depende de cómo se implemente el wrapper MCP**:

| Opción | Descripción | Pros | Contras |
|--------|-------------|------|---------|
| **A) Stateless** | Cada tool call carga KB fresca | Aislamiento total | Lento, pierde contexto |
| **B) Stateful Singleton** | Un proceso, KB compartida | Rápido, contexto | Contaminación entre obras |
| **C) Stateful por Sesión** | Pool de procesos, uno por obra | Balance | Más complejidad |

---

## 5. Propuesta Arquitectónica: Sesiones Compartidas

### 5.1 Concepto: Session Manager

```
┌─────────────────────────────────────────────────────────────────┐
│                    prolog-mcp-server (:3006)                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                  SESSION MANAGER                        │   │
│   │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │   │
│   │  │ session_duna │  │ session_arg  │  │ session_test │   │   │
│   │  │ (swipl proc) │  │ (swipl proc) │  │ (swipl proc) │   │   │
│   │  │ KB: arrakis  │  │ KB: gitarg   │  │ KB: test     │   │   │
│   │  └──────────────┘  └──────────────┘  └──────────────┘   │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│   MCP Tools:                                                    │
│   - create_session(obra_id) → session_token                     │
│   - query_prolog(session_token, query)                          │
│   - assert_fact(session_token, fact)                            │
│   - destroy_session(session_token)                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Flujo para Teatro con Sesión Compartida

```
1. Obra "Duna" inicia
   Teatro → create_session("obra_duna") → session_token: "duna-abc123"

2. Agente @arrakis entra en escena
   @arrakis → query_prolog("duna-abc123", "recurso_critico(X)")
   ← X = agua

3. Agente @boe toma turno
   @boe → assert_fact("duna-abc123", "ley_agua(prohibido_desperdiciar)")
   ← ok

4. @arrakis consulta cambio de @boe (¡sesión compartida!)
   @arrakis → query_prolog("duna-abc123", "ley_agua(L)")
   ← L = prohibido_desperdiciar

5. Obra termina
   Teatro → destroy_session("duna-abc123")
   → Proceso swipl terminado, KB liberada
```

### 5.3 Propuesta de Tools MCP Extendidos

```typescript
// prolog.config.ts (propuesta v2)
export const DEFAULT_PROLOG_MCP_SERVER_CONFIG = {
  id: "prolog-mcp-server",
  port: 3006,
  tools: [
    // Gestión de sesiones
    "create_session",      // Crea sesión aislada para una obra
    "destroy_session",     // Libera recursos
    "list_sessions",       // Debug: ver sesiones activas
    
    // Operaciones con sesión
    "query_prolog",        // Consulta (requiere session_token)
    "assert_fact",         // Añadir hecho (requiere session_token)
    "retract_fact",        // Eliminar hecho (requiere session_token)
    "consult_file",        // Cargar .pl en sesión
    
    // Operaciones globales (sin sesión)
    "list_templates",      // Ver templates disponibles
    "validate_syntax"      // Validar Prolog sin ejecutar
  ],
  resources: [
    "session_state",       // Estado de una sesión específica
    "templates_catalog"    // Catálogo de templates
  ]
};
```

---

## 6. Impacto en Pack AgentPrologBrain

El pack debe actualizarse para incluir gestión de sesiones:

```json
{
  "id": "AgentPrologBrain",
  "version": "2.0.0",
  "mcpServer": "prolog-mcp-server",
  "tools": [
    {
      "name": "query_prolog",
      "description": "Ejecutar query Prolog en sesión de la obra",
      "parameters": {
        "session_token": "Se obtiene del contexto de la obra",
        "query": "Query Prolog válida"
      }
    },
    {
      "name": "assert_fact",
      "description": "Añadir hecho a la KB de la obra",
      "parameters": {
        "session_token": "Se obtiene del contexto de la obra",
        "fact": "Hecho Prolog (ej: 'recurso(agua, critico)')"
      }
    }
  ],
  "sessionManagement": {
    "obtainFrom": "obra.context.prologSession",
    "lifecycle": "obra_start → obra_end"
  }
}
```

---

## 7. Tasks para Implementar

| ID | Task | Effort | Dependencia |
|----|------|--------|-------------|
| T001 | Diseñar Session Manager en prolog-mcp-server | 5 pts | — |
| T002 | Implementar create_session / destroy_session | 3 pts | T001 |
| T003 | Modificar query_prolog para usar session_token | 3 pts | T002 |
| T004 | Integrar con obra.yaml del Teatro | 3 pts | T003 |
| T005 | Actualizar pack AgentPrologBrain v2 | 2 pts | T003 |
| T006 | Tests E2E: dos agentes, una sesión | 3 pts | T004, T005 |

**Effort total**: 19 pts (aprox. 2 sprints)

---

## 8. Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Procesos swipl huérfanos | Media | Alto | Pool manager con timeouts |
| Memory leak en sesiones largas | Media | Medio | Límite de hechos + GC |
| Concurrencia en writes | Baja | Alto | Mutex por sesión o serializar |
| Rollback fallido | Media | Medio | Savepoints o snapshots |

---

## 9. Recomendación

**Fase 1 (FC1)**: Usar arquitectura de **AAIAGallery** como base
- `PrologServer` es **instanciable** (a diferencia del singleton de PrologEditor)
- Ya tiene caché de archivos con persistencia
- Solo necesita wrapper HTTP/MCP

**Fase 2 (FC1-FC2)**: Implementar **Session Manager** sobre `PrologServer`
- Cada `new PrologServer()` = una sesión aislada
- Pool de engines con lifecycle management
- Mapeo `obra_id → engine_instance`

**Código base recomendado**:
```typescript
// prolog-session-manager.ts (propuesta)
import { PrologServer } from 'AAIAGallery/.../prolog/server';

class PrologSessionManager {
  private sessions: Map<string, PrologServer> = new Map();

  createSession(obraId: string): string {
    const engine = new PrologServer();
    engine.openProlog(defaultPath);
    const token = `${obraId}-${Date.now()}`;
    this.sessions.set(token, engine);
    return token;
  }

  query(token: string, goal: string): Promise<any> {
    const engine = this.sessions.get(token);
    return engine.runPrologFunction(goal, '');
  }

  destroySession(token: string): void {
    this.sessions.delete(token);  // GC liberará el engine
  }
}
```

---

## 10. Referencias

| Documento | Relevancia |
|-----------|------------|
| [02_analisis-submodulo.md](../IOT-SBR-LOGICA/02_analisis-submodulo.md) | Arquitectura actual PrologEditor |
| [feature1_prolog_inteligencias_situadas.md](../Enero_2026_LogicaAgentes/feature1_prolog_inteligencias_situadas.md) | Diseño MCP propuesto |
| [feature2_agentic_typed_logic_flow.md](../Enero_2026_LogicaAgentes/feature2_agentic_typed_logic_flow.md) | Packs tipados |
| [blueprint-logic-flow.md](../../../docs/blueprint-logic-flow.md) | Visión arquitectónica |
| [03_together_all.md](03_together_all.md) | Blueprint agéntico |

---

*Generado por @ox — 2 de enero de 2026*
