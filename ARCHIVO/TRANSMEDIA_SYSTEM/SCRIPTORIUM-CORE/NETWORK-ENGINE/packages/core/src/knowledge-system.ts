import {
  defineDomainContract,
  type DomainContract,
  type URIString,
} from './contracts';
import type { SemVer } from './types';

export type KnowledgeDocLink = {
  readonly label: string;
  readonly path: string;
};

export type KnowledgeSection = {
  readonly id: string;
  readonly title: string;
  readonly role: string;
  readonly docs: readonly KnowledgeDocLink[];
};

export type KnowledgeStorageArea = {
  readonly id: string;
  readonly title: string;
  readonly path: string;
  readonly description: string;
};

export type KnowledgeModeInfo<TMode extends string = string> = {
  readonly id: TMode;
  readonly title: string;
  readonly summary: string;
  readonly docPath: string;
};

export const KNOWLEDGE_MCP_APP_MIME = 'text/html;profile=mcp-app' as const;

export type KnowledgeContractOptions = {
  readonly resourceScheme: string;
  readonly resourcePath: string;
  readonly uiUri: URIString;
  readonly launcherName: string;
  readonly launcherDescription: string;
  readonly overviewName?: string;
  readonly overviewDescription?: string;
  readonly uiName?: string;
  readonly uiDescription?: string;
};

export type KnowledgeSystemDefinition<
  TKind extends string = string,
  TFocus extends string = string,
  TMode extends string = string,
> = {
  readonly kind: TKind;
  readonly version: SemVer;
  readonly display: { readonly singular: string; readonly plural: string };
  readonly mission: string;
  readonly markdownFirst: string;
  readonly sections: readonly KnowledgeSection[];
  readonly storage: readonly KnowledgeStorageArea[];
  readonly modes: readonly KnowledgeModeInfo<TMode>[];
  readonly focusValues: readonly TFocus[];
  readonly contract: KnowledgeContractOptions;
};

export type KnowledgeSystemSnapshot<
  TFocus extends string = string,
  TMode extends string = string,
> = {
  readonly mission: string;
  readonly markdownFirst: string;
  readonly focus: TFocus;
  readonly cognitiveMode?: TMode;
  readonly layers: readonly KnowledgeSection[];
  readonly storage: readonly KnowledgeStorageArea[];
  readonly modes: readonly KnowledgeModeInfo<TMode>[];
};

export function defineKnowledgeSystem<const TDefinition extends KnowledgeSystemDefinition>(
  definition: TDefinition,
): TDefinition {
  return definition;
}

function overviewUri(options: KnowledgeContractOptions): URIString {
  return `${options.resourceScheme}://${options.resourcePath}/overview` as URIString;
}

function sectionTemplateUri(options: KnowledgeContractOptions): URIString {
  return `${options.resourceScheme}://${options.resourcePath}/layers/{id}` as URIString;
}

function modeTemplateUri(options: KnowledgeContractOptions): URIString {
  return `${options.resourceScheme}://${options.resourcePath}/modes/{id}` as URIString;
}

function storageTemplateUri(options: KnowledgeContractOptions): URIString {
  return `${options.resourceScheme}://${options.resourcePath}/storage/{id}` as URIString;
}

export function createKnowledgeSystemContract(
  definition: KnowledgeSystemDefinition,
): DomainContract {
  const { contract: options, display } = definition;
  const modeIds = definition.modes.map((mode) => mode.id);

  return defineDomainContract({
    kind: definition.kind,
    version: definition.version,
    display,
    schema: { type: 'object' },
    resources: {
      overview: {
        kind: 'resource',
        uriTemplate: overviewUri(options),
        name: options.overviewName ?? `${display.singular} Overview`,
        description:
          options.overviewDescription ??
          `Structured snapshot of the ${display.singular} knowledge system`,
        mimeType: 'application/json',
      },
      layer: {
        kind: 'template',
        uriTemplate: sectionTemplateUri(options),
        name: 'Knowledge Section',
        description: 'Single navigable section by id',
        mimeType: 'application/json',
      },
      mode: {
        kind: 'template',
        uriTemplate: modeTemplateUri(options),
        name: 'Cognitive Mode',
        description: 'Single cognitive mode by id',
        mimeType: 'application/json',
      },
      storage: {
        kind: 'template',
        uriTemplate: storageTemplateUri(options),
        name: 'Storage Area',
        description: 'Single storage area by id',
        mimeType: 'application/json',
      },
      ui: {
        kind: 'resource',
        uriTemplate: options.uiUri,
        name: options.uiName ?? `${display.singular} UI`,
        description:
          options.uiDescription ??
          `Interactive MCP App navigator for ${display.singular}`,
        mimeType: KNOWLEDGE_MCP_APP_MIME,
      },
    },
    prompts: {},
    mutations: {},
    launchers: {
      show: {
        name: options.launcherName,
        description: options.launcherDescription,
        uiResource: options.uiUri,
        inputSchema: {
          type: 'object',
          properties: {
            focus: {
              type: 'string',
              enum: [...definition.focusValues],
              description: 'Section to highlight in the navigator.',
            },
            ...(modeIds.length > 0
              ? {
                  cognitiveMode: {
                    type: 'string',
                    enum: modeIds,
                    description: 'Active cognitive mode for the agent session.',
                  },
                }
              : {}),
          },
        },
      },
    },
  });
}

export function buildKnowledgeSnapshot<
  TDefinition extends KnowledgeSystemDefinition,
>(
  definition: TDefinition,
  focus?: TDefinition['focusValues'][number],
  cognitiveMode?: TDefinition['modes'][number]['id'],
): KnowledgeSystemSnapshot<TDefinition['focusValues'][number], TDefinition['modes'][number]['id']> {
  const resolvedFocus = focus ?? definition.focusValues[0];
  if (resolvedFocus === undefined) {
    throw new Error(`Knowledge system ${definition.kind} must declare at least one focus value`);
  }

  return {
    mission: definition.mission,
    markdownFirst: definition.markdownFirst,
    focus: resolvedFocus,
    ...(cognitiveMode !== undefined ? { cognitiveMode } : {}),
    layers: definition.sections,
    storage: definition.storage,
    modes: definition.modes,
  };
}

export function formatKnowledgeSystemText(
  definition: KnowledgeSystemDefinition,
  snapshot: KnowledgeSystemSnapshot,
  title?: string,
): string {
  const heading = title ?? definition.display.singular;
  const lines = [
    `# ${heading}`,
    '',
    `**Focus:** ${snapshot.focus}`,
    snapshot.cognitiveMode ? `**Cognitive mode:** ${snapshot.cognitiveMode}` : '',
    '',
    '## Misión',
    snapshot.mission,
    '',
    '## Markdown-First',
    snapshot.markdownFirst,
    '',
    '## Capas INSTRUCTIONS',
    ...snapshot.layers.map(
      (layer) => `- ${layer.title}: ${layer.role} (${layer.docs.length} docs)`,
    ),
    '',
    '## STORAGE',
    ...snapshot.storage.map((area) => `- ${area.title}: ${area.description}`),
    '',
    '## Modos cognitivos',
    ...snapshot.modes.map((mode) => `- ${mode.title}: ${mode.summary}`),
  ];
  return lines.filter((line) => line !== '').join('\n');
}

export function getKnowledgeResourceUris(
  definition: KnowledgeSystemDefinition,
): {
  overview: URIString;
  sectionTemplate: URIString;
  modeTemplate: URIString;
  storageTemplate: URIString;
  ui: URIString;
} {
  const { contract } = definition;
  return {
    overview: overviewUri(contract),
    sectionTemplate: sectionTemplateUri(contract),
    modeTemplate: modeTemplateUri(contract),
    storageTemplate: storageTemplateUri(contract),
    ui: contract.uiUri,
  };
}
