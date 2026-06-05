import { App, AppStatus, createAppId, createUniverseId, getEnv, TestEvent, testMachine, TestSemantics } from '@network-engine/core';
import { createNodeEngine } from '@network-engine/node';
import * as http from 'node:http';

type HelloConfig = {
  port: number;
  appName: string;
};

export class HelloApp implements App<HelloConfig, 'hello', '1.0.0'> {
  public readonly manifest = {
    id: createAppId('app_hello'),
    rawId: 'hello' as const,
    name: 'Hello Engine',
    version: '1.0.0' as const,
    description: 'A basic test application that bootstraps the Network Engine and an HTTP server'
  } satisfies App<HelloConfig, 'hello', '1.0.0'>['manifest'];

  public status: AppStatus = { state: 'STOPPED' };

  private engine = createNodeEngine<TestSemantics>(testMachine);
  private server?: http.Server;
  private config?: HelloConfig;

  public init(config: HelloConfig) {
    this.config = config;
    this.status = { state: 'STOPPED' };
    console.log(`[${this.manifest.name}] Initialized with config:`, config);
  }

  public run() {
    if (!this.config) throw new Error('App not initialized');

    this.status = { state: 'RUNNING', startedAt: Date.now() };

    console.log(`=== Initializing ${this.manifest.name} ===\n`);

    this.engine.selectEvent('CREATE_UNIVERSE').subscribe((event) => {
      console.log('>> [Stream Observer] Detected Universe Creation event!', event.payload.id);
    });

    console.log('\n=== Dispatching CREATE_UNIVERSE ===\n');

    const universeId = createUniverseId('aleph-001');

    const event: TestEvent = {
      type: 'CREATE_UNIVERSE',
      payload: { id: universeId },
      timestamp: Date.now()
    };

    this.engine.dispatch(event);

    setTimeout(() => {
      console.log('\n=== Current Machine State ===\n');
      console.log(this.engine.currentState.value);
      console.log(this.engine.currentState.context);
    }, 1500);

    this.server = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        name: this.config!.appName,
        status: this.engine.currentState.value,
        activeUniverse: this.engine.currentState.context.activeUniverseId,
        factsCount: this.engine.currentState.context.facts.length
      }, null, 2));
    });

    this.server.listen(this.config.port, () => {
      console.log(`\n[${this.config!.appName}] Network Engine alive and listening on http://localhost:${this.config!.port}`);
    });

    const shutdown = () => {
      console.log(`\n[${this.config!.appName}] Shutting down server...`);
      if (this.server) {
        this.server.close(() => {
          this.status = { state: 'STOPPED' };
          process.exit(0);
        });
      }
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  }

  public isRunning(): this is App<HelloConfig, 'hello', '1.0.0'> & { status: { state: 'RUNNING' } } {
    return this.status.state === 'RUNNING';
  }
}

// Ensure it strictly satisfies the interface
export const helloApp = new HelloApp() satisfies App<HelloConfig, 'hello', '1.0.0'>;
