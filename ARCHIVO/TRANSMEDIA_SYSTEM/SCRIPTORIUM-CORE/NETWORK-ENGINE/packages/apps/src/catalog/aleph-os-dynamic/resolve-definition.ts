import path from 'node:path';
import { parseAlephInstructionsIndex } from '../../knowledge-system/parse-instructions';
import { alephOsDynamicContractTemplate } from './contract';

const WORKSPACE_ROOT = path.resolve(import.meta.dirname, '../../../../..');

export async function resolveAlephOsDynamicDefinition() {
  return parseAlephInstructionsIndex({
    workspaceRoot: WORKSPACE_ROOT,
    contract: alephOsDynamicContractTemplate,
    kind: 'aleph-os-dynamic',
    display: { singular: 'ALEPH OS', plural: 'ALEPH OS' },
  });
}
