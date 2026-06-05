import { App, AppStatus, createAppId } from '@network-engine/core';
import { AlephUniverse, createForceId } from '@network-engine/aleph-lang';

type AlephConfig = {
  appName: string;
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

  public init(config: AlephConfig) {
    this.config = config;
    this.status = { state: 'STOPPED' };
  }

  public run() {
    if (!this.config) throw new Error('App not initialized');
    this.status = { state: 'RUNNING', startedAt: Date.now() };

    console.log(`\n=== Bootstrapping [${this.manifest.name}] ===\n`);

    // Using the Aleph-Lang DSL (Layer 2)
    const universe = new AlephUniverse('Aleph-Alpha');

    universe.onBoundaryReached((limit) => {
      console.log(`\n[!] Boundary Reached at Dimension ${limit}. Triggering Expansion...`);
      universe.expand();
    });

    universe.onExpansionCompleted((newDimension) => {
      console.log(`\n[+] Expansion Completed. New Dimension Level: ${newDimension}`);
      console.log('Status Post-Expansion:', universe.getStatus());
    });

    // Simulating force impacts that will eventually trigger boundary
    // Dim 1 max is 5 forces, after which integrity drops by 10 per force.
    // So 10 more forces (15 total) will drop integrity to 0, triggering critical state.
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
      console.log('\n=== Run Finished ===\n');
      process.exit(0);
    }, 1000);
  }

  public isRunning(): this is App<AlephConfig, 'aleph', '1.0.0'> & { status: { state: 'RUNNING' } } {
    return this.status.state === 'RUNNING';
  }
}

export const alephApp = new AlephLangApp() satisfies App<AlephConfig, 'aleph', '1.0.0'>;
