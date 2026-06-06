import { AppDescriptor } from '../types';
import { HubApp } from './app';

export const hubDescriptor: AppDescriptor<HubApp> = {
  app: new HubApp(),
  provideConfig: () => ({
    port: 3001
  })
};
