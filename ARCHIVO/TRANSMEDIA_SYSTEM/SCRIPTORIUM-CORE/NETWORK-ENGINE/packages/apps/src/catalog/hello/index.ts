import { getEnv } from '@network-engine/core';
import { helloApp } from './app';
import { AppDescriptor } from '../types';

export const helloDescriptor: AppDescriptor<typeof helloApp> = {
  app: helloApp,
  provideConfig: () => ({
    port: parseInt(getEnv('PORT', '3000'), 10),
    appName: getEnv('APPS_ENV', 'Hello App'),
    pubsub: { hubUrl: 'http://localhost:3001', namespace: '/hello' }
  })
};
