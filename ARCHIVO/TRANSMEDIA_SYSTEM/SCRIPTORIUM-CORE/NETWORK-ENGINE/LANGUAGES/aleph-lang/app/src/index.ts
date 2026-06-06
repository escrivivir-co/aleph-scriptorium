import { App, ExtractAppConfig, getEnv } from '@network-engine/core';
import { alephApp } from './app';

export interface AppDescriptor<TApp extends App<any, any, any>> {
  app: TApp;
  provideConfig: () => ExtractAppConfig<TApp> | Promise<ExtractAppConfig<TApp>>;
}

export const alephDescriptor: AppDescriptor<typeof alephApp> = {
  app: alephApp,
  provideConfig: () => ({
    appName: getEnv('APPS_ENV', 'Aleph Language Runner'),
    pubsub: { hubUrl: 'http://localhost:3001', namespace: '/aleph' }
  })
};

export { alephApp } from './app';
