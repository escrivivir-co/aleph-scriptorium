import path from 'node:path';
import { App, AppStatus, createAppId } from '@network-engine/core';
import { createMcpHttpEdge, type McpHttpEdge } from '@network-engine/mcp-runtime/http-edge';
import { createComposeHandlers, createComposeProjection } from './handlers';

export type ComposeLangConfig = {
  port: number;
  composeFileCwd?: string;
};

const UI_DIST_DIR = path.join(import.meta.dirname, '..', 'ui', 'dist');

export class ComposeLangMcpApp implements App<ComposeLangConfig, 'compose', '1.0.0'> {
  public readonly manifest = {
    id: createAppId('app_compose'),
    rawId: 'compose' as const,
    name: 'Compose Stack Digital Twin',
    version: '1.0.0' as const,
    description:
      'MCP digital twin of docker-compose.yml with simulated lifecycle, compose://stack/*/runtime resources, and MCP App UI.',
  } satisfies App<ComposeLangConfig, 'compose', '1.0.0'>['manifest'];

  public status: AppStatus = { state: 'STOPPED' };
  private config?: ComposeLangConfig;
  private edge?: McpHttpEdge;

  public async init(config: ComposeLangConfig): Promise<void> {
    this.config = config;
    const cwd = config.composeFileCwd;
    const projection = createComposeProjection(cwd);
    const handlers = createComposeHandlers(cwd, UI_DIST_DIR);

    this.edge = createMcpHttpEdge({
      port: config.port,
      register: {
        projection,
        server: {
          name: 'Compose Stack Digital Twin',
          version: '1.0.0',
          instructions:
            'Read compose://stack/network-engine resources and runtime/*. Use compose-simulate-* tools or show-compose-stack for the interactive UI. No real Docker execution.',
        },
        handlers,
      },
    });
  }

  public async run(): Promise<void> {
    if (!this.edge || !this.config) throw new Error('App not initialized');

    let shuttingDown = false;
    const shutdown = async (signal: string) => {
      if (shuttingDown) return;
      shuttingDown = true;
      console.log(`\n[ComposeLangMcpApp] Shutting down (${signal})...`);
      try {
        await this.edge?.close();
        delete this.edge;
        this.status = { state: 'STOPPED' };
      } finally {
        process.exit(process.exitCode ?? 0);
      }
    };

    process.once('SIGINT', () => void shutdown('SIGINT'));
    process.once('SIGTERM', () => void shutdown('SIGTERM'));

    const { port } = await this.edge.listen();
    this.status = { state: 'RUNNING', startedAt: Date.now() };
    console.log(`[ComposeLangMcpApp] MCP listening on http://localhost:${port}/mcp`);
  }

  public isRunning(): this is App<ComposeLangConfig, 'compose', '1.0.0'> & {
    status: { state: 'RUNNING' };
  } {
    return this.status.state === 'RUNNING';
  }
}

export const composeApp = new ComposeLangMcpApp() satisfies App<ComposeLangConfig, 'compose', '1.0.0'>;
