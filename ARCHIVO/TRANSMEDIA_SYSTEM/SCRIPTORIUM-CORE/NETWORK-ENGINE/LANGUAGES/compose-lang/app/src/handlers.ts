import fs from 'node:fs';
import path from 'node:path';
import type { MCPRuntimeHandlers } from '@network-engine/mcp-runtime';
import {
  ComposeStack,
  createComposeContract,
  createSimulatedExecutor,
  createServiceId,
} from '@network-engine/compose-lang';
import { projectDomainToMCP } from '@network-engine/mcp/projection';

const DEFAULT_WORKSPACE_ROOT = path.resolve(import.meta.dirname, '../../../..');
const LAUNCHER_NAME = 'show-compose-stack';

export function resolveComposeFilePath(cwd = DEFAULT_WORKSPACE_ROOT): string {
  return path.resolve(cwd, 'docker-compose.yml');
}

export function loadComposeStack(cwd = DEFAULT_WORKSPACE_ROOT): ComposeStack {
  const filePath = resolveComposeFilePath(cwd);
  const yamlText = fs.readFileSync(filePath, 'utf-8');
  const stack = ComposeStack.fromYaml(yamlText, 'network-engine');
  stack.setupConfig();
  for (const service of stack.listServices()) {
    const serviceId = service.id as string;
    stack.run(serviceId).sleep(serviceId).logs(serviceId).debug(serviceId);
  }
  return stack;
}

function jsonContent(uri: string, value: unknown) {
  return {
    contents: [
      {
        uri,
        mimeType: 'application/json',
        text: JSON.stringify(value, null, 2),
      },
    ],
  };
}

function buildLauncherSnapshot(stack: ComposeStack) {
  const model = stack.getModel();
  if (!model) throw new Error('[compose-lang-app] Stack model missing');

  const runtime = stack.getRuntimeSnapshot();
  const plannedOperations = stack.getPlannedOperations();

  return {
    stackId: model.id as string,
    virtualClockMs: runtime.virtualClockMs,
    simulationActive: runtime.simulationActive,
    services: model.services.map((service) => ({
      id: service.id as string,
      state: runtime.serviceStates[service.id as string] ?? 'defined',
      dependsOn: service.dependsOn.map((dep) => dep as string),
      healthcheck: service.healthcheck ?? null,
    })),
    phrases: plannedOperations.map((operation) => operation.phrase),
    launcherName: LAUNCHER_NAME,
  };
}

function buildToolResponse(stack: ComposeStack, stackId: string, result: unknown) {
  const snapshot = buildLauncherSnapshot(stack);
  return {
    content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }],
    structuredContent: { ...snapshot, result },
  };
}

export function createComposeHandlers(
  cwd = DEFAULT_WORKSPACE_ROOT,
  distDir?: string,
): MCPRuntimeHandlers {
  const stack = loadComposeStack(cwd);
  const model = stack.getModel();
  if (!model) throw new Error('[compose-lang-app] Failed to load compose stack model');

  const stackId = model.id as string;
  const executor = createSimulatedExecutor(stack);
  const uiDistDir = distDir ?? path.join(import.meta.dirname, '..', 'dist');

  const debugPlan = {
    stackId,
    readonly: true,
    services: model.services.map((service) => ({
      id: service.id as string,
      image: service.image ?? service.build?.context ?? 'unknown',
      ports: service.ports,
      dependsOn: service.dependsOn.map((dep) => dep as string),
      hasHealthcheck: service.healthcheck !== undefined,
      debugPhrase: `stack.debug('${service.id as string}')`,
    })),
  };

  return {
    readResource(request) {
      const uri = request.uri;

      if (uri === 'ui://compose-lang/mcp-app.html') {
        const html = fs.readFileSync(path.join(uiDistDir, 'mcp-app.html'), 'utf-8');
        return {
          contents: [{ uri, mimeType: 'text/html;profile=mcp-app', text: html }],
        };
      }

      if (uri === `compose://stack/${stackId}`) {
        return jsonContent(uri, model);
      }

      if (uri === `compose://stack/${stackId}/services`) {
        return jsonContent(uri, model.services);
      }

      if (uri === `compose://stack/${stackId}/operations`) {
        return jsonContent(uri, stack.getPlannedOperations());
      }

      if (uri === `compose://stack/${stackId}/phrases`) {
        const phrases = stack.getPlannedOperations().map((operation) => operation.phrase);
        return jsonContent(uri, phrases);
      }

      if (uri === `compose://stack/${stackId}/debug-plan`) {
        return jsonContent(uri, debugPlan);
      }

      if (uri === `compose://stack/${stackId}/runtime`) {
        return jsonContent(uri, stack.getRuntimeSnapshot());
      }

      if (uri === `compose://stack/${stackId}/runtime/timeline`) {
        return jsonContent(uri, stack.getRuntimeSnapshot().timeline);
      }

      const servicePrefix = `compose://stack/${stackId}/services/`;
      if (uri.startsWith(servicePrefix)) {
        const serviceId = uri.slice(servicePrefix.length);
        const service = model.services.find((entry) => (entry.id as string) === serviceId);
        if (!service) throw new Error(`Service not found: ${serviceId}`);
        return jsonContent(uri, service);
      }

      const runtimeServicePrefix = `compose://stack/${stackId}/runtime/services/`;
      if (uri.startsWith(runtimeServicePrefix)) {
        const serviceId = uri.slice(runtimeServicePrefix.length);
        const service = model.services.find((entry) => (entry.id as string) === serviceId);
        if (!service) throw new Error(`Service not found: ${serviceId}`);
        const runtime = stack.getRuntimeSnapshot();
        return jsonContent(uri, {
          serviceId,
          state: runtime.serviceStates[serviceId] ?? 'defined',
          virtualClockMs: runtime.virtualClockMs,
          healthcheck: service.healthcheck ?? null,
          dependsOn: service.dependsOn.map((dep) => dep as string),
        });
      }

      throw new Error(`Resource not found: ${uri}`);
    },

    async executeTool({ tool, args }) {
      if (tool.name === LAUNCHER_NAME) {
        const snapshot = buildLauncherSnapshot(stack);
        return {
          content: [
            {
              type: 'text',
              text: `Compose stack "${stackId}" digital twin — ${snapshot.services.length} services, clock ${snapshot.virtualClockMs}ms`,
            },
          ],
          structuredContent: snapshot,
        };
      }

      switch (tool.name) {
        case 'compose-simulate-up': {
          const result = await executor.up();
          return buildToolResponse(stack, stackId, result);
        }
        case 'compose-simulate-down': {
          const result = await executor.down();
          return buildToolResponse(stack, stackId, result);
        }
        case 'compose-simulate-tick': {
          const ms = typeof args.ms === 'number' ? args.ms : Number(args.ms ?? 0);
          const result = await executor.tick(ms);
          return buildToolResponse(stack, stackId, result);
        }
        case 'compose-simulate-inject-failure': {
          const serviceId = createServiceId(String(args.serviceId ?? ''));
          const result = await executor.injectFailure(serviceId);
          return buildToolResponse(stack, stackId, { ...result, serviceId: serviceId as string });
        }
        case 'compose-simulate-reset': {
          const result = await executor.reset();
          return buildToolResponse(stack, stackId, result);
        }
        default:
          throw new Error(`Unknown tool: ${tool.name}`);
      }
    },

    renderPrompt(request) {
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: [
                `Diagnose compose stack "${stackId}" (simulated digital twin, no Docker execution).`,
                `Runtime: ${JSON.stringify(stack.getRuntimeSnapshot(), null, 2)}`,
                `Debug plan: ${JSON.stringify(debugPlan, null, 2)}`,
                `Prompt: ${request.prompt.name}`,
              ].join('\n\n'),
            },
          },
        ],
      };
    },
  };
}

export function createComposeProjection(cwd = DEFAULT_WORKSPACE_ROOT) {
  const stack = loadComposeStack(cwd);
  const model = stack.getModel();
  if (!model) throw new Error('[compose-lang-app] Failed to load compose stack model');
  return projectDomainToMCP(createComposeContract(model));
}
