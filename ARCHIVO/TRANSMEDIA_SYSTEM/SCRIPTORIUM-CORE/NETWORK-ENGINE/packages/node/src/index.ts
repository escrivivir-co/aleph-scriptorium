import { NetworkOrchestrator, NetworkPlugin, PluginId, PluginCapabilities, LanguageSemantics } from '@network-engine/core';


// Node-specific plugin example
export class FileSystemPlugin<TSemantics extends LanguageSemantics<any, any>> implements NetworkPlugin<TSemantics, Record<string, unknown>> {
  public readonly id = 'node-fs-persistence' as PluginId;
  public readonly capabilities: PluginCapabilities = {
    canInfer: false,
    canPersist: true,
    canVisualize: false
  };

  private installed = false;

  public install<const TOptions extends Record<string, unknown>>(options: TOptions): void {
    console.log('[Node] Initializing FileSystem persistence with options:', options);
    this.installed = true;
  }

  public isInstalled(): this is NetworkPlugin<TSemantics, Record<string, unknown>> & { installed: true } {
    return this.installed;
  }
}

// Node factory function
export function createNodeEngine<TSemantics extends LanguageSemantics<any, any>>(machine: any): NetworkOrchestrator<TSemantics> {
  const engine = new NetworkOrchestrator<TSemantics>(machine);
  const fsPlugin = new FileSystemPlugin<TSemantics>();

  fsPlugin.install({ path: './data' });
  engine.registerPlugin(fsPlugin);

  return engine;
}
