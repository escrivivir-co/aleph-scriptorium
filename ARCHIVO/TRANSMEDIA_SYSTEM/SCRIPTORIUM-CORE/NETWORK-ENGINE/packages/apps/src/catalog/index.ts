import { helloDescriptor } from './hello';
import { alephDescriptor } from './aleph';

export const catalog = {
  hello: helloDescriptor,
  aleph: alephDescriptor
} as const;

export type AppCatalog = typeof catalog;
export type CatalogKeys = keyof AppCatalog;

// Export individual descriptors and types if needed by the host
export * from './types';
