import { createKnowledgeSystemHandlers } from '../../knowledge-system/handlers';
import { alephOsDynamicContractTemplate } from './contract';
import { resolveAlephOsDynamicDefinition } from './resolve-definition';

export function createAlephOsDynamicHandlers(distDir: string) {
  return createKnowledgeSystemHandlers({
    resolveDefinition: resolveAlephOsDynamicDefinition,
    distDir,
    launcherName: alephOsDynamicContractTemplate.launcherName,
  });
}
