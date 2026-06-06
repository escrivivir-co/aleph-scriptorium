import { createKnowledgeSystemContract } from '@network-engine/core';
import type { KnowledgeSystemDefinition } from '@network-engine/core';

export const ALEPH_OS_DYNAMIC_UI_URI = 'ui://aleph-os/mcp-app.html' as const;

export const alephOsDynamicContractTemplate = {
  resourceScheme: 'aleph',
  resourcePath: 'os-dynamic',
  uiUri: ALEPH_OS_DYNAMIC_UI_URI,
  launcherName: 'show-aleph-os-dynamic',
  launcherDescription:
    'Opens the ALEPH cognitive operating system navigator derived from INSTRUCTIONS indexes.',
  overviewName: 'ALEPH OS Dynamic Overview',
  overviewDescription:
    'Structured snapshot of the ALEPH cognitive operating system derived from Markdown indexes',
  uiName: 'ALEPH OS Dynamic UI',
  uiDescription:
    'Interactive MCP App navigator for INSTRUCTIONS, STORAGE, and cognitive modes',
} as const;

export function createAlephOsDynamicContract(definition: KnowledgeSystemDefinition) {
  return createKnowledgeSystemContract(definition);
}
