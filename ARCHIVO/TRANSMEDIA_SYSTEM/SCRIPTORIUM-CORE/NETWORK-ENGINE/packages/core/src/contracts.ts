import type { SemVer } from './types';

export type URIString = `${string}://${string}`;
export type ResourceKind = 'resource' | 'template';
export type PromptArgumentType = 'string' | 'number' | 'boolean' | 'json';
export type MutationEffect =
  | 'create'
  | 'update'
  | 'delete'
  | 'upsert'
  | 'import'
  | 'build'
  | 'publish'
  | 'custom'
  | 'async';

/**
 * Resource Contract
 * Defines how domain knowledge is exposed over MCP resources or templates.
 */
export interface ResourceContract<TUri extends URIString = URIString> {
  kind: ResourceKind;
  uriTemplate: TUri;
  mimeType: string;
  name: string;
  description?: string;
  enumerable?: boolean;
  searchable?: boolean;
}

export interface PromptArgumentContract {
  name: string;
  description: string;
  required: boolean;
  type?: PromptArgumentType;
}

/**
 * Prompt Contract
 * Defines an interactive semantic protocol rather than a mere text string.
 */
export interface PromptContract {
  name: string;
  description: string;
  goal?: string;
  arguments?: readonly PromptArgumentContract[];
  requiresResources?: readonly URIString[];
  outputs?: readonly string[];
  recommendedSampling?: readonly string[];
  permittedMutations?: readonly string[];
}

/**
 * Mutation Capability
 * Represents an explicitly permitted effectful operation.
 */
export interface MutationCapability {
  name: string;
  description: string;
  inputSchema?: unknown;
  effect: MutationEffect;
  idempotent?: boolean;
  requiresConfirmation?: boolean;
  externalEffects?: readonly string[];
}

/**
 * Sampling Capability
 * Defines tasks that require cognitive delegation or critique.
 */
export interface SamplingCapability {
  intent: string;
  promptTemplate: string;
  description?: string;
  requiresResources?: readonly URIString[];
  output?: string;
}

/**
 * Identity Policy
 * Keeps URI scheme and identifier semantics explicit at the contract level.
 */
export interface IdentityContract {
  resourceScheme?: string;
  idParameter?: string;
  idPattern?: string;
}

/**
 * UI Hints
 * Presentation metadata attached to the contract, not to a concrete UI runtime.
 */
export interface UIHints {
  hiddenFields?: readonly string[];
  readOnlyFields?: readonly string[];
  fieldLabels?: Readonly<Record<string, string>>;
  fieldDescriptions?: Readonly<Record<string, string>>;
  defaults?: Readonly<Record<string, unknown>>;
}

/**
 * Domain Contract
 * Single Source of Truth for an entity or domain concept.
 */
export interface DomainContract<
  TSchema = unknown,
  TKind extends string = string,
> {
  kind: TKind;
  version: SemVer;
  display: {
    singular: string;
    plural: string;
  };
  schema: TSchema;
  identity?: IdentityContract;
  resources: Record<string, ResourceContract>;
  prompts: Record<string, PromptContract>;
  mutations: Record<string, MutationCapability>;
  sampling?: Record<string, SamplingCapability>;
  ui?: UIHints;
}

/**
 * Helper preserving literal inference when declaring contracts.
 */
export function defineDomainContract<const TContract extends DomainContract>(
  contract: TContract,
): TContract {
  return contract;
}

export type ResourceUriOf<TContract extends DomainContract> =
  TContract['resources'][keyof TContract['resources']]['uriTemplate'];

export type PromptNameOf<TContract extends DomainContract> =
  TContract['prompts'][keyof TContract['prompts']]['name'];

export type MutationNameOf<TContract extends DomainContract> =
  TContract['mutations'][keyof TContract['mutations']]['name'];
