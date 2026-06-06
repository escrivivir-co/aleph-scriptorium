# Compose-Lang Grammar

## TypeScript DSL (static plans)

```ts
import { ComposeStack } from '@network-engine/compose-lang';

const stack = ComposeStack.fromYaml(yamlText, 'network-engine');
stack.listServices();
stack.inspectService('mongo');
stack.setupConfig();
stack.run('mongo');
stack.sleep('mongo');
stack.logs('graphql', 50);
stack.debug('graphql');
stack.toProjection();
```

## Executable simulation phrases

```ts
stack.simulate().up();                        // SIMULATE_UP
stack.simulate().down();                      // SIMULATE_DOWN
stack.simulate().tick(1000);                  // SIMULATE_TICK ms
stack.predict().failure('mongo');             // SIMULATE_INJECT_FAILURE
stack.simulate().reset();                     // SIMULATE_RESET
```

Template-literal types encode phrases at compile time:

```ts
type Phrase<'run', 'mongo'>  // → "stack.run('mongo').waitUntilHealthy()"
type CommandFor<Phrase<'run', 'mongo'>>  // → { kind: 'run'; serviceId: 'mongo' }
```

## MCP resource URIs

Static model:

- `compose://stack/{stackId}`
- `compose://stack/{stackId}/services`
- `compose://stack/{stackId}/services/{serviceId}`
- `compose://stack/{stackId}/operations`
- `compose://stack/{stackId}/phrases`
- `compose://stack/{stackId}/debug-plan`

Digital twin runtime:

- `compose://stack/{stackId}/runtime`
- `compose://stack/{stackId}/runtime/services/{serviceId}`
- `compose://stack/{stackId}/runtime/timeline`

UI:

- `ui://compose-lang/mcp-app.html`
