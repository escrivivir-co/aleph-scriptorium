import { graphApp } from './app';
import { AppDescriptor } from '../types';

export const graphDescriptor: AppDescriptor<typeof graphApp> = {
  app: graphApp,
  provideConfig: () => ({
    appName: 'Graph Store Demo',
  }),
};
