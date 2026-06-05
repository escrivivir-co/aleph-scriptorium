import { NetworkOrchestrator, NetworkPlugin, PluginId, PluginCapabilities, getEnv } from '@network-engine/core';

// Browser-specific plugin example
export class LocalStoragePlugin implements NetworkPlugin {
  public readonly id = 'browser-localstorage' as PluginId;
  public readonly capabilities: PluginCapabilities = {
    canInfer: false,
    canPersist: true,
    canVisualize: false
  };

  private installed = false;

  public install<const TOptions extends Record<string, unknown>>(options: TOptions): void {
    const appName = getEnv('BROWSER_APP_NAME', 'Browser');
    console.log(`[${appName}] Initializing LocalStorage persistence with options:`, options);
    this.installed = true;
  }

  public isInstalled(): this is NetworkPlugin<Record<string, unknown>> & { installed: true } {
    return this.installed;
  }
}

// Browser factory function
export function createBrowserEngine(): NetworkOrchestrator {
  const engine = new NetworkOrchestrator();
  const storagePlugin = new LocalStoragePlugin();

  storagePlugin.install({ prefix: 'aleph_' });
  engine.registerPlugin(storagePlugin);

  return engine;
}
