import type { AnyStateMachine } from 'xstate';
import type { DomainContract, InferEvent, LanguageSemantics } from '@network-engine/core';
import { NetworkOrchestrator } from '@network-engine/core';
import { createNodeEngine } from '@network-engine/node';
import type { PubSubConfig } from '@network-engine/pubsub';
import { createPubSubBridge, type PubSubBridge } from '@network-engine/edge-pubsub';
import type { MCPProjectionResult } from '@network-engine/mcp/projection';
import {
  createMCPRuntime,
  createActorToolHandler,
  type MCPRuntime,
  type MCPRuntimeHandlers,
} from '@network-engine/mcp-runtime';
import type { RuntimeToolRequest } from '@network-engine/mcp-runtime';
import type { DocumentStoreProtocol } from '@network-engine/core';
import {
  wireDocumentSyncLoop,
  createDocumentReadResourceHandler,
  type DocumentSyncMappers,
  type DocumentSyncHandle,
} from './sync-loop';

export interface NetworkEnginePubSubSlot {
  config: PubSubConfig;
  appId?: string;
}

export interface NetworkEngineStorageSlot<TSemantics extends LanguageSemantics<any, any>> {
  store: DocumentStoreProtocol;
  contract?: DomainContract;
  mappers: DocumentSyncMappers<TSemantics>;
  collection?: string;
}

export interface NetworkEngineMcpSlot<TSemantics extends LanguageSemantics<any, any>> {
  projection: MCPProjectionResult;
  handlers?: MCPRuntimeHandlers;
  mapToolRequest?: (request: RuntimeToolRequest) => InferEvent<TSemantics>;
  contract?: DomainContract;
}

export interface NetworkEngineConfig<TSemantics extends LanguageSemantics<any, any>> {
  pubsub?: NetworkEnginePubSubSlot;
  mcp?: NetworkEngineMcpSlot<TSemantics>;
  storage?: NetworkEngineStorageSlot<TSemantics>;
}

export interface NetworkEngineComposition<TSemantics extends LanguageSemantics<any, any>> {
  orchestrator: NetworkOrchestrator<TSemantics>;
  pubsubBridge?: PubSubBridge<TSemantics>;
  mcpRuntime?: MCPRuntime;
  documentSync?: DocumentSyncHandle;
}

/**
 * Composition root for Network-Engine.
 * Wires node (runtime adapter), pubsub, mcp-runtime and document sync without owning domain logic.
 * See ADR 0003, ADR 0007.
 */
export function createNetworkEngine<TSemantics extends LanguageSemantics<any, any>>(
  machine: AnyStateMachine,
  config: NetworkEngineConfig<TSemantics> = {},
): NetworkEngineComposition<TSemantics> {
  const orchestrator = createNodeEngine<TSemantics>(machine);

  let pubsubBridge: PubSubBridge<TSemantics> | undefined;
  if (config.pubsub) {
    const appId = config.pubsub.appId ?? 'network-engine';
    pubsubBridge = createPubSubBridge<TSemantics>(config.pubsub.config, appId);
    pubsubBridge.connect(orchestrator);
  }

  const composition: NetworkEngineComposition<TSemantics> = { orchestrator };

  if (pubsubBridge) {
    composition.pubsubBridge = pubsubBridge;
  }

  let mcpRuntime: MCPRuntime | undefined;
  if (config.mcp) {
    const handlers: MCPRuntimeHandlers = { ...config.mcp.handlers };

    const mapTool =
      config.mcp.mapToolRequest ?? config.storage?.mappers.mapToolRequest;
    if (handlers.executeTool === undefined && mapTool !== undefined) {
      handlers.executeTool = createActorToolHandler(
        { send: (event) => orchestrator.dispatch(event as InferEvent<TSemantics>) },
        mapTool,
      );
    }

    const contract = config.mcp.contract ?? config.storage?.contract;
    const store = config.storage?.store;
    if (handlers.readResource === undefined && store !== undefined && contract !== undefined) {
      const readFromStore = createDocumentReadResourceHandler(store, contract);
      handlers.readResource = async (request) => {
        const text = await readFromStore(request.uri);
        return text;
      };
    }

    const mcpOptions = Object.keys(handlers).length > 0
      ? { projection: config.mcp.projection, handlers }
      : { projection: config.mcp.projection };
    mcpRuntime = createMCPRuntime(mcpOptions);
    composition.mcpRuntime = mcpRuntime;
  }

  if (config.storage !== undefined && mcpRuntime !== undefined) {
    composition.documentSync = wireDocumentSyncLoop(
      orchestrator,
      mcpRuntime,
      config.storage,
    );
  } else if (config.storage !== undefined) {
    composition.documentSync = wireDocumentSyncLoop(orchestrator, undefined, config.storage);
  }

  return composition;
}

export {
  wireDocumentSyncLoop,
  createDocumentReadResourceHandler,
  type DocumentSyncMappers,
  type DocumentSyncHandle,
} from './sync-loop';
