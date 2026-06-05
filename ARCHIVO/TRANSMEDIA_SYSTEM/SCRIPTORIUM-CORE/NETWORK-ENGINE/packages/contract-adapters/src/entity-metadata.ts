import {
  defineDomainContract,
  type DomainContract,
  type MutationCapability,
  type PromptContract,
  type ResourceContract,
  type SemVer,
  type UIHints,
} from '@network-engine/core';

/**
 * Minimal shape for schema-driven entity metadata coming from external SDKs.
 *
 * This adapter intentionally avoids naming any concrete legacy system. It is a
 * migration boundary: external metadata enters here and becomes a Network-Engine
 * DomainContract before any MCP/OpenAPI/UI projection happens.
 */
export interface EntityMetadataLike<TSchema = unknown> {
  entityName: string;
  pluralName: string;
  schema: TSchema;
  defaults?: Readonly<Record<string, unknown>>;
  hiddenFields?: readonly string[];
  readOnlyFields?: readonly string[];
  fieldLabels?: Record<string, string>;
  fieldDescriptions?: Record<string, string>;
}

export interface EntityMetadataAdapterOptions {
  scheme?: string;
  version?: SemVer;
  idParameter?: string;
}

function toKebabCase(value: string): string {
  return value
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

export function fromEntityMetadata<TSchema>(
  metadata: EntityMetadataLike<TSchema>,
  options: EntityMetadataAdapterOptions = {},
): DomainContract<TSchema> {
  const scheme = options.scheme ?? 'network';
  const version = options.version ?? '1.0.0';
  const idParameter = options.idParameter ?? 'id';
  const resourceBaseName = toKebabCase(metadata.pluralName);
  const kind = toKebabCase(metadata.entityName);
  const collectionUri = `${scheme}://${resourceBaseName}` as const;
  const itemUri = `${scheme}://${resourceBaseName}/{${idParameter}}` as const;

  const resources: Record<string, ResourceContract> = {
    [`${resourceBaseName}_collection`]: {
      kind: 'resource',
      uriTemplate: collectionUri,
      mimeType: 'application/json',
      name: `${metadata.pluralName} Collection`,
      description: `Colección contextual de ${metadata.pluralName}`,
      enumerable: true,
      searchable: true,
    },
    [`${resourceBaseName}_item`]: {
      kind: 'template',
      uriTemplate: itemUri,
      mimeType: 'application/json',
      name: `${metadata.entityName} Item`,
      description: `Template de recurso individual para ${metadata.entityName}`,
    },
  };

  const prompts: Record<string, PromptContract> = {
    [`design_${kind}`]: {
      name: `design-${kind}`,
      description: `Diseñar o revisar un ${metadata.entityName} antes de persistirlo.`,
      goal: `Transformar intención semántica en un contrato válido para ${metadata.entityName}.`,
      arguments: [
        {
          name: 'intent',
          description: `Objetivo o idea principal para el ${metadata.entityName}`,
          required: true,
          type: 'string',
        },
      ],
      requiresResources: [collectionUri],
      outputs: [`${metadata.entityName}DesignProposal`],
      recommendedSampling: [`critique-${kind}`],
      permittedMutations: [`persist_${kind}`],
    },
  };

  const mutations: Record<string, MutationCapability> = {
    [`persist_${kind}`]: {
      name: `persist_${kind}`,
      description: `Crear o actualizar ${metadata.entityName}`,
      inputSchema: metadata.schema,
      effect: 'upsert',
      idempotent: false,
      requiresConfirmation: false,
      externalEffects: ['storage'],
    },
  };

  const ui: UIHints = {};
  if (metadata.hiddenFields) ui.hiddenFields = metadata.hiddenFields;
  if (metadata.readOnlyFields) ui.readOnlyFields = metadata.readOnlyFields;
  if (metadata.fieldLabels) ui.fieldLabels = metadata.fieldLabels;
  if (metadata.fieldDescriptions) ui.fieldDescriptions = metadata.fieldDescriptions;
  if (metadata.defaults) ui.defaults = metadata.defaults;

  return defineDomainContract({
    kind,
    version,
    display: {
      singular: metadata.entityName,
      plural: metadata.pluralName,
    },
    identity: {
      resourceScheme: scheme,
      idParameter,
    },
    schema: metadata.schema,
    resources,
    prompts,
    mutations,
    sampling: {
      [`critique_${kind}`]: {
        intent: `Criticar el diseño actual de ${metadata.entityName}`,
        description: `Revisión cognitiva previa a una mutación persistente sobre ${metadata.entityName}.`,
        promptTemplate: `Revisa el diseño propuesto para ${metadata.entityName} usando el recurso ${collectionUri} como contexto base.`,
        requiresResources: [collectionUri],
        output: `${metadata.entityName}Critique`,
      },
    },
    ui,
  } satisfies DomainContract<TSchema>);
}

