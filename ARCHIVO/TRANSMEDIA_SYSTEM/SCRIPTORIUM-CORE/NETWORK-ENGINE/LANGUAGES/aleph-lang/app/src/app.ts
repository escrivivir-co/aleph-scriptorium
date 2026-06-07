import { App, AppStatus, createAppId } from '@network-engine/core';
import { AlephUniverse, createForceId, AlephSemantics } from '@network-engine/aleph-lang';
import { PubSubConfig } from '@network-engine/pubsub';
import { createPubSubBridge, PubSubBridge } from '@network-engine/edge-pubsub';

type AlephConfig = {
  appName: string;
  pubsub?: PubSubConfig;
};

export class AlephLangApp implements App<AlephConfig, 'aleph', '1.0.0'> {
  public readonly manifest = {
    id: createAppId('app_aleph'),
    rawId: 'aleph' as const,
    name: 'Aleph Language Runner',
    version: '1.0.0' as const,
    description: 'Instantiates the Aleph Language and tests its semantic expansion rules.'
  } satisfies App<AlephConfig, 'aleph', '1.0.0'>['manifest'];

  public status: AppStatus = { state: 'STOPPED' };
  private config?: AlephConfig;
  private bridge?: PubSubBridge<AlephSemantics>;

  public init(config: AlephConfig) {
    this.config = config;
    this.status = { state: 'STOPPED' };
    if (config.pubsub) {
      this.bridge = createPubSubBridge<AlephSemantics>(config.pubsub, this.manifest.rawId);
    }
  }

  public run() {
    if (!this.config) throw new Error('App not initialized');
    this.status = { state: 'RUNNING', startedAt: Date.now() };

    console.log(`\n=== Bootstrapping [${this.manifest.name}] ===\n`);

    const universe = new AlephUniverse('Aleph-Alpha');

    if (this.bridge) {
      this.bridge.connect(universe.orchestrator);
    }

    universe.onBoundaryReached((limit) => {
      console.log(`\n[!] Boundary Reached at Dimension ${limit}. Triggering Expansion...`);
      universe.expand();
    });

    universe.onExpansionCompleted((newDimension) => {
      console.log(`\n[+] Expansion Completed. New Dimension Level: ${newDimension}`);
      console.log('Status Post-Expansion:', universe.getStatus());
    });

    for (let i = 1; i <= 16; i++) {
      console.log(`Absorbing Force ${i}...`);
      universe.absorbForce({
        id: createForceId(`f-${i}`),
        vector: 'force_positive_test',
        weight: 10
      });
      console.log('  Status:', universe.getStatus());
    }

    setTimeout(() => {
      this.status = { state: 'STOPPED' };
      if (this.bridge) this.bridge.disconnect();
      console.log('\n=== Run Finished ===\n');
      process.exit(0);
    }, 1000);
  }

  public isRunning(): this is App<AlephConfig, 'aleph', '1.0.0'> & { status: { state: 'RUNNING' } } {
    return this.status.state === 'RUNNING';
  }
}

export const alephApp = new AlephLangApp() satisfies App<AlephConfig, 'aleph', '1.0.0'>;
