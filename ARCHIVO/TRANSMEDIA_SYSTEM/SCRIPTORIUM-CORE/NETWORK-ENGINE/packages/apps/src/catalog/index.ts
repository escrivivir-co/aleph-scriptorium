import { helloDescriptor } from './hello';
import { alephDescriptor } from '@network-engine/aleph-lang-app';
import { composeDescriptor } from '@network-engine/compose-lang-app';
import { alephOsDescriptor } from './aleph-os';
import { alephOsDynamicDescriptor } from './aleph-os-dynamic';
import { hubDescriptor } from './hub';
import { graphDescriptor } from './graph';

export const catalog = {
  hello: helloDescriptor,
  aleph: alephDescriptor,
  compose: composeDescriptor,
  'compose-lang': composeDescriptor,
  'aleph-os': alephOsDescriptor,
  'aleph-os-dynamic': alephOsDynamicDescriptor,
  hub: hubDescriptor,
  graph: graphDescriptor,
} as const;

export type AppCatalog = typeof catalog;
export type CatalogKeys = keyof AppCatalog;

export * from './types';
