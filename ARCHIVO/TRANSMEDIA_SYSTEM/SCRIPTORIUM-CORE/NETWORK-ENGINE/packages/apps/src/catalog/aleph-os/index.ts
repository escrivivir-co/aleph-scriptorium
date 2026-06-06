import { alephOsApp } from './app';
import { AppDescriptor } from '../types';

export const alephOsDescriptor: AppDescriptor<typeof alephOsApp> = {
  app: alephOsApp,
  provideConfig: () => ({ port: 3100 }),
};
