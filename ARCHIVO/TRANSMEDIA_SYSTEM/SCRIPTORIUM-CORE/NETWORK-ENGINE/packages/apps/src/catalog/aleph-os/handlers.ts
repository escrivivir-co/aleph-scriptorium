import { createKnowledgeSystemHandlers } from '../../knowledge-system/handlers';
import { alephOsDefinition } from './aleph-data';

export function createAlephOsHandlers(distDir: string) {
  return createKnowledgeSystemHandlers({
    resolveDefinition: () => alephOsDefinition,
    distDir,
    launcherName: alephOsDefinition.contract.launcherName,
  });
}
