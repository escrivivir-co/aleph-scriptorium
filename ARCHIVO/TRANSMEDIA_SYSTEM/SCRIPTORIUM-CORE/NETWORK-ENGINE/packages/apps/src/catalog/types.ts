import { App, ExtractAppConfig } from '@network-engine/core';

export interface AppDescriptor<TApp extends App<any, any, any>> {
  app: TApp;
  provideConfig: () => ExtractAppConfig<TApp> | Promise<ExtractAppConfig<TApp>>;
}
