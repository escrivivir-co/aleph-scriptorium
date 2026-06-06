import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLScalarType,
  graphql,
} from 'graphql';
import type {
  DocumentStoreProtocol,
  DomainContract,
  InferEvent,
  LanguageSemantics,
} from '@network-engine/core';
import { createActorToolHandler } from '@network-engine/mcp-runtime';
import type { RuntimeToolRequest } from '@network-engine/mcp-runtime';
import type { GraphQLProjectionResult } from './projection';
import { projectDomainToGraphQL } from './projection';

export interface GraphQLRuntimeContext<TSemantics extends LanguageSemantics<any, any>> {
  store?: DocumentStoreProtocol;
  dispatch: (event: InferEvent<TSemantics>) => void;
  mapToolRequest: (request: RuntimeToolRequest) => InferEvent<TSemantics>;
  contract: DomainContract;
}

export interface GraphQLRuntimeOptions<TSemantics extends LanguageSemantics<any, any>> {
  contract: DomainContract;
  context: GraphQLRuntimeContext<TSemantics>;
}

export interface GraphQLRuntime {
  schema: GraphQLSchema;
  projection: GraphQLProjectionResult;
  execute: (query: string, variables?: Record<string, unknown>) => Promise<unknown>;
}

function buildSchema<TSemantics extends LanguageSemantics<any, any>>(
  projection: GraphQLProjectionResult,
  runtime: GraphQLRuntimeContext<TSemantics>,
): GraphQLSchema {
  const JSONScalar = new GraphQLScalarType({
    name: 'JSON',
    serialize: (value) => value,
    parseValue: (value) => value,
    parseLiteral: (ast) => (ast.kind === 'StringValue' ? JSON.parse(ast.value) : null),
  });

  const queryFields: Record<string, unknown> = {};
  for (const q of projection.queries) {
    if (q.resourceKind === 'template' && q.idParam !== undefined) {
      queryFields[q.fieldName] = {
        type: JSONScalar,
        description: q.description,
        args: {
          [q.idParam]: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: async (_: unknown, args: Record<string, string>) => {
          if (runtime.store === undefined || q.collection === undefined || q.idParam === undefined) {
            return null;
          }
          const id = args[q.idParam];
          if (id === undefined) return null;
          return runtime.store.get(q.collection, id);
        },
      };
    } else {
      queryFields[q.fieldName] = {
        type: new GraphQLList(JSONScalar),
        description: q.description,
        args: {
          filter: { type: JSONScalar },
        },
        resolve: async (_: unknown, args: { filter?: Record<string, unknown> }) => {
          if (runtime.store === undefined || q.collection === undefined) return [];
          return runtime.store.find(q.collection, args.filter ?? {});
        },
      };
    }
  }

  const mutationHandler = createActorToolHandler(
    { send: (event) => runtime.dispatch(event) },
    runtime.mapToolRequest,
  );

  const mutationFields: Record<string, unknown> = {};
  for (const m of projection.mutations) {
    mutationFields[m.fieldName] = {
      type: JSONScalar,
      description: m.description,
      args: {
        input: { type: JSONScalar },
      },
      resolve: async (_: unknown, args: { input?: Record<string, unknown> }) => {
        const result = mutationHandler({
          tool: {
            name: m.fieldName,
            description: m.description,
            inputSchema: m.inputSchema,
            effect: m.effect,
            requiresConfirmation: false,
            idempotent: false,
            externalEffects: [],
          },
          args: args.input ?? {},
        });
        return result.structuredContent;
      },
    };
  }

  return new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: queryFields as Record<string, never>,
    }),
    mutation: new GraphQLObjectType({
      name: 'Mutation',
      fields: mutationFields as Record<string, never>,
    }),
  });
}

export function createGraphQLRuntime<TSemantics extends LanguageSemantics<any, any>>(
  options: GraphQLRuntimeOptions<TSemantics>,
): GraphQLRuntime {
  const projection = projectDomainToGraphQL(options.contract);
  const schema = buildSchema(projection, options.context);

  return {
    schema,
    projection,
    execute: async (query, variables = {}) =>
      graphql({ schema, source: query, variableValues: variables }),
  };
}

export { projectDomainToGraphQL, projectDomainsToGraphQL } from './projection';
export type {
  GraphQLProjectionResult,
  GraphQLQueryProjection,
  GraphQLMutationProjection,
} from './projection';
