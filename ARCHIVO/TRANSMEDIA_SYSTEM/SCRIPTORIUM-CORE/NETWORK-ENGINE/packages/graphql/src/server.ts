/**
 * Minimal Bun HTTP server for GraphQL projection gateway (Docker / dev).
 */

import type { GraphQLRuntime } from './runtime';

export interface GraphQLServerOptions {
  runtime: GraphQLRuntime;
  port?: number;
  host?: string;
}

export function startGraphQLServer(options: GraphQLServerOptions): ReturnType<typeof Bun.serve> {
  const port = options.port ?? Number(process.env.GRAPHQL_PORT ?? 4000);
  const host = options.host ?? '0.0.0.0';

  return Bun.serve({
    hostname: host,
    port,
    async fetch(req) {
      const url = new URL(req.url);

      if (url.pathname === '/health') {
        return new Response(JSON.stringify({ status: 'ok' }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (url.pathname !== '/graphql') {
        return new Response('Not Found', { status: 404 });
      }

      if (req.method === 'GET') {
        return new Response('GraphQL POST /graphql', { status: 200 });
      }

      const body = (await req.json()) as { query?: string; variables?: Record<string, unknown> };
      const result = await options.runtime.execute(body.query ?? '', body.variables);
      return Response.json(result);
    },
  });
}
