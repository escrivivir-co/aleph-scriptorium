import type {
  DomainContract,
  MutationCapability,
  PromptContract,
  ResourceContract,
  SamplingCapability,
} from '@network-engine/core';

export interface MCPResourceProjection {
  kind: ResourceContract['kind'];
  uriTemplate: ResourceContract['uriTemplate'];
  name: string;
  description: string;
  mimeType: string;
}

export interface MCPPromptProjection {
  name: string;
  description: string;
  goal: string;
  arguments: NonNullable<PromptContract['arguments']>;
  requiresResources: NonNullable<PromptContract['requiresResources']>;
  outputs: NonNullable<PromptContract['outputs']>;
  recommendedSampling: NonNullable<PromptContract['recommendedSampling']>;
  permittedMutations: NonNullable<PromptContract['permittedMutations']>;
}

export interface MCPToolProjection {
  name: string;
  description: string;
  inputSchema: unknown;
  effect: MutationCapability['effect'];
  requiresConfirmation: boolean;
  idempotent: boolean;
  externalEffects: readonly string[];
}

export interface MCPSamplingProjection {
  intent: string;
  description: string;
  promptTemplate: string;
  requiresResources: readonly string[];
  output: string;
}

export interface MCPProjectionResult {
  resources: MCPResourceProjection[];
  prompts: MCPPromptProjection[];
  tools: MCPToolProjection[];
  sampling: MCPSamplingProjection[];
}

/**
 * Declares the MCP structures purely from a DomainContract,
 * without coupling to the Model Context Protocol SDK runtime or server instance.
 */
export function projectDomainToMCP(contract: DomainContract): MCPProjectionResult {
  const result: MCPProjectionResult = {
    resources: [],
    prompts: [],
    tools: [],
    sampling: [],
  };

  for (const resource of Object.values(contract.resources)) {
    result.resources.push({
      kind: resource.kind,
      uriTemplate: resource.uriTemplate,
      name: resource.name,
      description: resource.description ?? '',
      mimeType: resource.mimeType,
    });
  }

  for (const prompt of Object.values(contract.prompts)) {
    result.prompts.push({
      name: prompt.name,
      description: prompt.description,
      goal: prompt.goal ?? '',
      arguments: prompt.arguments ?? [],
      requiresResources: prompt.requiresResources ?? [],
      outputs: prompt.outputs ?? [],
      recommendedSampling: prompt.recommendedSampling ?? [],
      permittedMutations: prompt.permittedMutations ?? [],
    });
  }

  for (const mutation of Object.values(contract.mutations)) {
    result.tools.push({
      name: mutation.name,
      description: mutation.description,
      inputSchema: mutation.inputSchema ?? {
        type: 'object',
        properties: {},
      },
      effect: mutation.effect,
      requiresConfirmation: mutation.requiresConfirmation ?? false,
      idempotent: mutation.idempotent ?? false,
      externalEffects: mutation.externalEffects ?? [],
    });
  }

  for (const samplingCapability of Object.values(contract.sampling ?? {})) {
    result.sampling.push({
      intent: samplingCapability.intent,
      description: samplingCapability.description ?? '',
      promptTemplate: samplingCapability.promptTemplate,
      requiresResources: samplingCapability.requiresResources ?? [],
      output: samplingCapability.output ?? '',
    });
  }

  return result;
}

export function projectDomainsToMCP(
  contracts: readonly DomainContract[],
): MCPProjectionResult {
  return contracts.reduce<MCPProjectionResult>(
    (acc, contract) => {
      const projection = projectDomainToMCP(contract);
      acc.resources.push(...projection.resources);
      acc.prompts.push(...projection.prompts);
      acc.tools.push(...projection.tools);
      acc.sampling.push(...projection.sampling);
      return acc;
    },
    {
      resources: [],
      prompts: [],
      tools: [],
      sampling: [],
    },
  );
}
