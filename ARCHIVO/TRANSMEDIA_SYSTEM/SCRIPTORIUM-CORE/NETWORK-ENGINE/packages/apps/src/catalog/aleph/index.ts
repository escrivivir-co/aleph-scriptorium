import { getEnv } from '@network-engine/core';
import { alephApp } from './app';
import { AppDescriptor } from '../types';

export const alephDescriptor: AppDescriptor<typeof alephApp> = {
  app: alephApp,
  provideConfig: () => ({
    appName: getEnv('APPS_ENV', 'Aleph Language Runner'),
    pubsub: { hubUrl: 'http://localhost:3001', namespace: '/aleph' }
  })
};
