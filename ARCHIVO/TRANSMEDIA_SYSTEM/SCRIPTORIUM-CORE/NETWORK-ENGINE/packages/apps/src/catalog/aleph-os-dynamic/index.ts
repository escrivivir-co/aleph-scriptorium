import { alephOsDynamicApp } from './app';
import { AppDescriptor } from '../types';

export const alephOsDynamicDescriptor: AppDescriptor<typeof alephOsDynamicApp> = {
  app: alephOsDynamicApp,
  provideConfig: () => ({ port: 3101 }),
};
