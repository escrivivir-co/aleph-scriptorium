import { App, ExtractAppConfig } from '@network-engine/core';
import { composeApp } from './app';

export interface AppDescriptor<TApp extends App<any, any, any>> {
  app: TApp;
  provideConfig: () => ExtractAppConfig<TApp> | Promise<ExtractAppConfig<TApp>>;
}

export const composeDescriptor: AppDescriptor<typeof composeApp> = {
  app: composeApp,
  provideConfig: () => ({ port: 3102 }),
};

export { composeApp } from './app';
export { createComposeHandlers, createComposeProjection, loadComposeStack } from './handlers';
