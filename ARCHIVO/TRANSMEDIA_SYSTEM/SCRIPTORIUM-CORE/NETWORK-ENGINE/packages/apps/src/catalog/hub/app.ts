import { App, AppStatus, createAppId } from '@network-engine/core';
import { createPubSubHub, PubSubHub } from '@network-engine/pubsub';

export type HubConfig = {
  port: number;
};

export class HubApp implements App<HubConfig, 'hub', '1.0.0'> {
  public readonly manifest = {
    id: createAppId('app_hub'),
    rawId: 'hub' as const,
    name: 'PubSub Hub',
    version: '1.0.0' as const,
    description: 'Central Socket.IO Hub for inter-process communication'
  } satisfies App<HubConfig, 'hub', '1.0.0'>['manifest'];

  public status: AppStatus = { state: 'STOPPED' };
  private hub?: PubSubHub;

  public async init(config: HubConfig): Promise<void> {
    this.hub = createPubSubHub(config);
    console.log(`[HubApp] Initialized with port ${config.port}`);
  }

  public async run(): Promise<void> {
    if (!this.hub) throw new Error('Hub not initialized');
    
    await this.hub.start();
    this.status = { state: 'RUNNING', startedAt: Date.now() };
    console.log(`[HubApp] Running...`);
  }

  public isRunning(): this is App<HubConfig, 'hub', '1.0.0'> & { status: { state: 'RUNNING' } } {
    return this.status.state === 'RUNNING';
  }
}
