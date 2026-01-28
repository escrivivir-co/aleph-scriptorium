# Manage Prolog Sessions

Create, query, and destroy SWI-Prolog sessions via MCPPrologServer. Sessions are the core unit of interaction -- each session has its own knowledge base and is tied to a Teatro obra.

## Quick Start

**Prerequisites**: MCP Prolog Server running on port 3006, Backend on port 8000.

```bash
# Start the stack (3 terminals)
cd MCPGallery/mcp-mesh-sdk && npm run start:launcher   # Terminal 1
cd PrologEditor/backend && npm run start:dev            # Terminal 2
cd PrologEditor/frontend && npm start                   # Terminal 3

# Health check
bash ./scripts/apb-health-check.sh
```

### Session Lifecycle

```
1. Create session:   prolog_create_session(sessionId, obraId)
2. Load knowledge:   prolog_consult_file(sessionId, filePath)
                     prolog_load_rules_from_db(sessionId, app?)
3. Assert facts:     prolog_assert_fact(sessionId, fact)
4. Execute queries:  prolog_query(sessionId, query)
5. Persist rules:    prolog_save_rule_to_db(name, content, app?)
6. Destroy session:  prolog_destroy_session(sessionId)
```

### Quick Query Example

```prolog
% Create session
prolog_create_session({ sessionId: "demo-1", obraId: "test-obra" })

% Assert facts
prolog_assert_fact({ sessionId: "demo-1", fact: "likes(mary, wine)" })
prolog_assert_fact({ sessionId: "demo-1", fact: "likes(john, beer)" })

% Query
prolog_query({ sessionId: "demo-1", query: "likes(X, Y)." })
% -> X=mary, Y=wine; X=john, Y=beer

% Cleanup
prolog_destroy_session({ sessionId: "demo-1" })
```

## MCP Tools Reference

| Tool | Parameters | Returns |
|------|-----------|---------|
| `prolog_create_session` | `sessionId`, `obraId` | Session metadata |
| `prolog_list_sessions` | (none) | Array of active sessions |
| `prolog_destroy_session` | `sessionId` | Success/failure |
| `prolog_query` | `sessionId`, `query` | Query results array |
| `prolog_assert_fact` | `sessionId`, `fact` | Confirmation |
| `prolog_consult_file` | `sessionId`, `filePath` | Confirmation |
| `prolog_get_templates` | (none) | Template catalog |
| `prolog_load_rules_from_db` | `sessionId`, `app?` | Rules loaded count |
| `prolog_save_rule_to_db` | `name`, `content`, `app?` | Saved rule ID |
| `prolog_list_sdk_templates` | (none) | SDK templates list |
| `prolog_get_sdk_template_content` | `templateName` | Template content |
| `prolog_get_telemetry_status` | (none) | Sensor status array |

## MCP Resources

| Resource | URI | Description |
|----------|-----|-------------|
| `prolog-session-state` | `prolog://sessions/current` | Current session state |
| `prolog-active-sessions` | `prolog://sessions` | All active sessions |
| `prolog-templates-catalog` | `prolog://templates/catalog` | Available templates |
| `prolog-rules-catalog` | `prolog://rules/catalog` | Persisted rules (SQLite) |
| `prolog-sdk-templates` | `prolog://sdk/templates` | SDK templates |
| `prolog-telemetry` | `prolog://telemetry/current` | IoT sensor data |

---

<details>
<summary><strong>Advanced Session Patterns</strong> (click to expand)</summary>

## Query Types

### Simple Query

```prolog
?- member(X, [1,2,3]).
% X = 1; X = 2; X = 3
```

### Findall (Collect Results)

```prolog
?- findall(X, member(X, [a,b,c]), Results).
% Results = [a, b, c]
```

### Aggregate

```prolog
?- aggregate_all(count, member(_, [a,b,c]), Count).
% Count = 3
```

## Backend-Integrated Workflows

### Load Rules from SQLite

```
1. prolog_load_rules_from_db({ sessionId: "s1", app: "teatro" })
   -> Fetches rules from PrologEditor backend SQLite
   -> Asserts each rule into session KB
   -> Returns { rulesFound: N, rulesLoaded: M }
```

### Save Rule to SQLite

```
1. prolog_save_rule_to_db({
     name: "decision-rule",
     content: "decidir(X, hablar) :- energia(X, E), E > 50.",
     app: "teatro"
   })
   -> Persists to SQLite via PrologBackendClient
   -> Available for future sessions
```

### Telemetry Integration (SBR)

```
1. prolog_get_telemetry_status()
   -> Returns sensor data from IoT backend
2. Assert sensor data as Prolog facts
3. Execute SBR reasoning queries
```

## EuridiceBot Socket.IO Integration

MCPPrologServer initializes EuridiceBot as MASTER of `PROLOG_ROOM` with 7 capabilities:

- `PROLOG_QUERY` - Execute queries via mesh
- `PROLOG_ASSERT` - Assert facts via mesh
- `PROLOG_RETRACT` - Retract facts via mesh
- `PROLOG_LOAD_FILE` - Load .pl files via mesh
- `PROLOG_GET_SESSIONS` - List sessions via mesh
- `PROLOG_CREATE_SESSION` - Create sessions via mesh
- `PROLOG_DESTROY_SESSION` - Destroy sessions via mesh

**Socket.IO URL**: `process.env.SOCKET_MESH_URL || "http://localhost:3010"`

## Alignment Checklist (When Adding New Tool)

- [ ] Tool defined in MCPPrologServer with Zod schema
- [ ] Wrapper method in PrologBackendClient (backend)
- [ ] REST endpoint in api.routes.ts
- [ ] HTTP method in PrologService (frontend)
- [ ] UI component consuming the tool
- [ ] Documented in OpenAPI spec
- [ ] Types in mcp-core-sdk (if shared)

## Port Reference

| Service | Port |
|---------|------|
| Frontend Angular | 5001 |
| Backend REST | 8000 |
| MCP Prolog Server | 3006 |
| MCP Launcher | 3050 |
| Socket.IO Mesh | 3010 |

## Related Files

- **MCP Server**: `/MCPGallery/mcp-mesh-sdk/src/MCPPrologServer.ts`
- **Session Manager**: `/MCPGallery/mcp-mesh-sdk/src/services/PrologSessionManager.ts`
- **Prolog Engine**: `/MCPGallery/mcp-mesh-sdk/src/services/PrologEngine.ts`
- **Backend Client**: `/MCPGallery/mcp-mesh-sdk/src/clients/PrologBackendClient.ts`
- **Backend Controller**: `/PrologEditor/backend/src/controllers/prolog.controller.ts`
- **Frontend Service**: `/PrologEditor/frontend/src/app/services/prolog.service.ts`
- **Frontend Models**: `/PrologEditor/frontend/src/app/models/prolog.model.ts`

</details>
