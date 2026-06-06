import { createKnowledgeSystemContract } from '@network-engine/core';
import { alephOsDefinition } from './aleph-data';

export const ALEPH_OS_UI_URI = alephOsDefinition.contract.uiUri;
export const ALEPH_OS_MCP_APP_MIME = 'text/html;profile=mcp-app' as const;

export const alephOsContract = createKnowledgeSystemContract(alephOsDefinition);
