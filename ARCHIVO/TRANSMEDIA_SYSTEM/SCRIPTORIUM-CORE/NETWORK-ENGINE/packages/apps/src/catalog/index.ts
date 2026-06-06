import { helloDescriptor } from './hello';
import { alephDescriptor } from './aleph';
import { alephOsDescriptor } from './aleph-os';
import { alephOsDynamicDescriptor } from './aleph-os-dynamic';
import { hubDescriptor } from './hub';
import { graphDescriptor } from './graph';

export const catalog = {
  hello: helloDescriptor,
  aleph: alephDescriptor,
  'aleph-os': alephOsDescriptor,
  'aleph-os-dynamic': alephOsDynamicDescriptor,
  hub: hubDescriptor,
  graph: graphDescriptor,
} as const;

export type AppCatalog = typeof catalog;
export type CatalogKeys = keyof AppCatalog;

// Export individual descriptors and types if needed by the host
export * from './types';
