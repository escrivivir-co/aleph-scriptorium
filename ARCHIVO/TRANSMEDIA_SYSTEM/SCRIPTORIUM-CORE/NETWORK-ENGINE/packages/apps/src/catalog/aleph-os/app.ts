import path from 'node:path';
import { App, AppStatus, createAppId } from '@network-engine/core';
import { projectDomainToMCP } from '@network-engine/mcp/projection';
import { mountMcpRoute } from '@network-engine/edge-mcp';
import { createRestServer, type RestServer } from '@network-engine/edge-rest';
import { alephOsContract } from './aleph-os.contract';
import { createAlephOsHandlers } from './handlers';

export type AlephOsConfig = {
  port: number;
};

const DIST_DIR = path.join(import.meta.dirname, 'dist');

export class AlephOsMcpApp implements App<AlephOsConfig, 'aleph-os', '1.0.0'> {
  public readonly manifest = {
    id: createAppId('app_aleph_os'),
    rawId: 'aleph-os' as const,
    name: 'ALEPH Agent Operating System',
    version: '1.0.0' as const,
    description: 'MCP Navigator for INSTRUCTIONS hierarchy, STORAGE areas, and cognitive modes',
  } satisfies App<AlephOsConfig, 'aleph-os', '1.0.0'>['manifest'];

  public status: AppStatus = { state: 'STOPPED' };
  private config?: AlephOsConfig;
  private edge?: RestServer;

  public async init(config: AlephOsConfig): Promise<void> {
    this.config = config;
    const projection = projectDomainToMCP(alephOsContract);
    const handlers = createAlephOsHandlers(DIST_DIR);

    this.edge = createRestServer();
    mountMcpRoute(this.edge, {
      projection,
      server: {
        name: 'ALEPH Agent Operating System',
        version: '1.0.0',
        instructions: 'Read aleph://os/overview and template resources before invoking show-aleph-os.',
      },
      handlers,
    });

    console.log(`[AlephOsMcpApp] Initialized with port ${config.port}`);
  }

  public async run(): Promise<void> {
    if (!this.edge || !this.config) throw new Error('App not initialized');

    let shuttingDown = false;
    const shutdown = async (signal: string) => {
      if (shuttingDown) return;
      shuttingDown = true;
      console.log(`\n[AlephOsMcpApp] Shutting down (${signal})...`);

      try {
        await this.edge?.close();
        delete this.edge;
        this.status = { state: 'STOPPED' };
        console.log('[AlephOsMcpApp] Server stopped.');
      } catch (error) {
        console.error('[AlephOsMcpApp] Error during shutdown:', error);
        process.exitCode = 1;
      } finally {
        process.exit(process.exitCode ?? 0);
      }
    };

    process.once('SIGINT', () => void shutdown('SIGINT'));
    process.once('SIGTERM', () => void shutdown('SIGTERM'));

    const { port } = await this.edge.listen({ port: this.config.port });
    this.status = { state: 'RUNNING', startedAt: Date.now() };
    console.log(`[AlephOsMcpApp] MCP listening on http://localhost:${port}/mcp`);
  }

  public isRunning(): this is App<AlephOsConfig, 'aleph-os', '1.0.0'> & { status: { state: 'RUNNING' } } {
    return this.status.state === 'RUNNING';
  }
}

export const alephOsApp = new AlephOsMcpApp() satisfies App<AlephOsConfig, 'aleph-os', '1.0.0'>;
