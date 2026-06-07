import path from 'node:path';
import { App, AppStatus, createAppId } from '@network-engine/core';
import { projectDomainToMCP } from '@network-engine/mcp/projection';
import { mountMcpRoute } from '@network-engine/edge-mcp';
import { createRestServer, type RestServer } from '@network-engine/edge-rest';
import { createAlephOsDynamicContract } from './contract';
import { createAlephOsDynamicHandlers } from './handlers';
import { resolveAlephOsDynamicDefinition } from './resolve-definition';

export type AlephOsDynamicConfig = {
  port: number;
};

const UI_DIST_DIR = path.join(import.meta.dirname, '../aleph-os/dist');

export class AlephOsDynamicMcpApp implements App<AlephOsDynamicConfig, 'aleph-os-dynamic', '1.0.0'> {
  public readonly manifest = {
    id: createAppId('app_aleph_os_dynamic'),
    rawId: 'aleph-os-dynamic' as const,
    name: 'ALEPH Agent Operating System (Dynamic)',
    version: '1.0.0' as const,
    description: 'MCP Navigator derived from INSTRUCTIONS/ALEPH.instructions.md indexes',
  } satisfies App<AlephOsDynamicConfig, 'aleph-os-dynamic', '1.0.0'>['manifest'];

  public status: AppStatus = { state: 'STOPPED' };
  private config?: AlephOsDynamicConfig;
  private edge?: RestServer;

  public async init(config: AlephOsDynamicConfig): Promise<void> {
    this.config = config;
    const definition = await resolveAlephOsDynamicDefinition();
    const projection = projectDomainToMCP(createAlephOsDynamicContract(definition));
    const handlers = createAlephOsDynamicHandlers(UI_DIST_DIR);

    this.edge = createRestServer();
    mountMcpRoute(this.edge, {
      projection,
      server: {
        name: 'ALEPH Agent Operating System (Dynamic)',
        version: '1.0.0',
        instructions:
          'Read aleph://os-dynamic/overview and template resources before invoking show-aleph-os-dynamic.',
      },
      handlers,
    });
    console.log(`[AlephOsDynamicMcpApp] Initialized with port ${config.port}`);
  }

  public async run(): Promise<void> {
    if (!this.edge || !this.config) throw new Error('App not initialized');

    let shuttingDown = false;
    const shutdown = async (signal: string) => {
      if (shuttingDown) return;
      shuttingDown = true;
      console.log(`\n[AlephOSDynamicApp] Shutting down (${signal})...`);
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

    const { port } = await this.edge.listen({ port: this.config.port });
    this.status = { state: 'RUNNING', startedAt: Date.now() };
    console.log(`[AlephOSDynamicApp] MCP listening on http://localhost:${port}/mcp`);
  }

  public isRunning(): this is App<AlephOsDynamicConfig, 'aleph-os-dynamic', '1.0.0'> & {
    status: { state: 'RUNNING' };
  } {
    return this.status.state === 'RUNNING';
  }
}

export const alephOsDynamicApp = new AlephOsDynamicMcpApp() satisfies App<
  AlephOsDynamicConfig,
  'aleph-os-dynamic',
  '1.0.0'
>;
