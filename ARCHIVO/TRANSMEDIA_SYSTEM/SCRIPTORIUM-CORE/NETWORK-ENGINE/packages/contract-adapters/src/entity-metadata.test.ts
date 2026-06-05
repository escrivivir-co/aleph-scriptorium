import { describe, expect, it } from 'bun:test';
import { fromEntityMetadata } from './entity-metadata';

describe('fromEntityMetadata', () => {
  it('transforms schema-driven entity metadata into a neutral Network-Engine contract', () => {
    const paletteMetadata = {
      entityName: 'Palette',
      pluralName: 'Palettes',
      schema: { type: 'object', properties: { id: { type: 'string' } } },
      hiddenFields: ['blocks'],
      fieldLabels: { packagePath: 'Package Path' },
    };

    const contract = fromEntityMetadata(paletteMetadata);

    expect(contract.kind).toBe('palette');
    expect(contract.display.singular).toBe('Palette');
    expect(contract.display.plural).toBe('Palettes');
    expect(contract.identity?.resourceScheme).toBe('network');

    const collection = contract.resources['palettes_collection'];
    const item = contract.resources['palettes_item'];
    expect(collection).toBeDefined();
    expect(item).toBeDefined();
    expect(collection!.kind).toBe('resource');
    expect(collection!.uriTemplate).toBe('network://palettes');
    expect(item!.kind).toBe('template');
    expect(item!.uriTemplate).toBe('network://palettes/{id}');

    const designPrompt = contract.prompts['design_palette'];
    expect(designPrompt).toBeDefined();
    expect(designPrompt!.recommendedSampling).toEqual(['critique-palette']);

    const persistMutation = contract.mutations['persist_palette'];
    expect(persistMutation).toBeDefined();
    expect(persistMutation!.effect).toBe('upsert');

    expect(contract.sampling?.['critique_palette']).toBeDefined();
    expect(contract.ui?.hiddenFields).toEqual(['blocks']);
    expect(contract.ui?.fieldLabels?.['packagePath']).toBe('Package Path');
  });

  it('can preserve an external domain scheme during migration', () => {
    const contract = fromEntityMetadata(
      {
        entityName: 'Palette',
        pluralName: 'Palettes',
        schema: { type: 'object' },
      },
      { scheme: 'blockly' },
    );

    expect(contract.resources['palettes_collection']!.uriTemplate).toBe('blockly://palettes');
  });
});