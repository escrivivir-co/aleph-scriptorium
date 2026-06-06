import { describe, expect, it } from 'bun:test';
import path from 'node:path';
import { parseAlephInstructionsIndex } from './parse-instructions';
import {
  alephOsDynamicContractTemplate,
  createAlephOsDynamicContract,
} from '../catalog/aleph-os-dynamic/contract';

const WORKSPACE_ROOT = path.resolve(import.meta.dirname, '../../../..');

describe('parseAlephInstructionsIndex', () => {
  it('derives sections, storage and modes from ALEPH.instructions.md', async () => {
    const definition = await parseAlephInstructionsIndex({
      workspaceRoot: WORKSPACE_ROOT,
      contract: alephOsDynamicContractTemplate,
    });

    expect(definition.kind).toBe('aleph-os-dynamic');
    expect(definition.sections.length).toBeGreaterThanOrEqual(5);
    expect(definition.sections.find((section) => section.id === 'LAYER_0')?.docs.length).toBeGreaterThan(5);
    expect(definition.sections.find((section) => section.id === 'ADR')?.docs.some(
      (doc) => doc.path === 'ADR/0009-knowledge-system-mcp-app-builder.md',
    )).toBe(true);
    expect(definition.storage.some((area) => area.id === 'ADR')).toBe(true);
    expect(definition.modes.map((mode) => mode.id)).toEqual(['MONKEY', 'AGI', 'ASI']);
    expect(definition.mission.length).toBeGreaterThan(20);

    const contract = createAlephOsDynamicContract(definition);
    expect(contract.resources.overview!.uriTemplate).toBe('aleph://os-dynamic/overview');
    expect(contract.launchers!.show!.name).toBe('show-aleph-os-dynamic');
  });
});
