import type {
  DomainContract,
  MutationCapability,
  ResourceContract,
} from '@network-engine/core';

export interface GraphQLQueryProjection {
  fieldName: string;
  description: string;
  uriTemplate: ResourceContract['uriTemplate'];
  resourceKind: ResourceContract['kind'];
  collection?: string;
  idParam?: string;
}

export interface GraphQLMutationProjection {
  fieldName: string;
  description: string;
  inputSchema: unknown;
  effect: MutationCapability['effect'];
}

export interface GraphQLProjectionResult {
  typeName: string;
  queries: GraphQLQueryProjection[];
  mutations: GraphQLMutationProjection[];
}

function toFieldName(key: string, fallback: string): string {
  if (key.length > 0) return key;
  return fallback.replace(/[^a-zA-Z0-9_]/g, '_');
}

function extractIdParam(uriTemplate: string): string | undefined {
  const match = uriTemplate.match(/\{([^}]+)\}/);
  return match?.[1];
}

function collectionFieldName(resourceKey: string, kind: ResourceContract['kind']): string {
  if (kind === 'template') return `${resourceKey}ById`;
  return resourceKey;
}

/**
 * Declares GraphQL Query/Mutation fields purely from a DomainContract,
 * without coupling to the GraphQL runtime or server instance.
 */
export function projectDomainToGraphQL(contract: DomainContract): GraphQLProjectionResult {
  const queries: GraphQLQueryProjection[] = [];
  const mutations: GraphQLMutationProjection[] = [];

  for (const [key, resource] of Object.entries(contract.resources)) {
    const query: GraphQLQueryProjection = {
      fieldName: collectionFieldName(key, resource.kind),
      description: resource.description ?? resource.name,
      uriTemplate: resource.uriTemplate,
      resourceKind: resource.kind,
    };
    if (contract.storage?.collection !== undefined) {
      query.collection = contract.storage.collection;
    }
    if (resource.kind === 'template') {
      const idParam = extractIdParam(resource.uriTemplate);
      if (idParam !== undefined) query.idParam = idParam;
    }
    queries.push(query);
  }

  for (const [key, mutation] of Object.entries(contract.mutations)) {
    mutations.push({
      fieldName: toFieldName(key, mutation.name),
      description: mutation.description,
      inputSchema: mutation.inputSchema ?? { type: 'object', properties: {} },
      effect: mutation.effect,
    });
  }

  return {
    typeName: contract.kind,
    queries,
    mutations,
  };
}

export function projectDomainsToGraphQL(
  contracts: readonly DomainContract[],
): GraphQLProjectionResult[] {
  return contracts.map(projectDomainToGraphQL);
}
