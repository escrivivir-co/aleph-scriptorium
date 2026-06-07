import Fastify, { type FastifyInstance } from 'fastify';
import type { IncomingMessage, ServerResponse } from 'node:http';

export interface RestRequest {
  raw: IncomingMessage;
  body?: unknown;
}

export interface RestReply {
  raw: ServerResponse;
  sent?: boolean;
  status: (code: number) => RestReply;
  send: (payload?: unknown) => unknown;
}

export type RestRouteHandler = (request: RestRequest, reply: RestReply) => Promise<unknown>;

export interface RestRouter {
  post: (path: string, handler: RestRouteHandler) => unknown;
  get: (path: string, handler: RestRouteHandler) => unknown;
}

export interface RestServer extends RestRouter {
  listen: (options: { port: number; host?: string }) => Promise<{ port: number }>;
  close: () => Promise<void>;
  /** The underlying fastify instance, for advanced usage */
  fastify: FastifyInstance;
}

export function createRestServer(): RestServer {
  const fastify = Fastify({
    logger: false,
    // Provide a way to get the raw req/res since some plugins (like MCP streamable transport) need it
  });

  return {
    fastify,
    post(path: string, handler: RestRouteHandler) {
      fastify.post(path, async (req, res) => {
        const restReq: RestRequest = {
          raw: req.raw,
          body: req.body,
        };
        const restReply: RestReply = {
          raw: res.raw,
          get sent() {
            return res.sent;
          },
          status(code: number) {
            res.status(code);
            return this;
          },
          send(payload?: unknown) {
            res.send(payload);
            return payload;
          },
        };
        return handler(restReq, restReply);
      });
    },
    get(path: string, handler: RestRouteHandler) {
      fastify.get(path, async (req, res) => {
        const restReq: RestRequest = {
          raw: req.raw,
          body: req.body,
        };
        const restReply: RestReply = {
          raw: res.raw,
          get sent() {
            return res.sent;
          },
          status(code: number) {
            res.status(code);
            return this;
          },
          send(payload?: unknown) {
            res.send(payload);
            return payload;
          },
        };
        return handler(restReq, restReply);
      });
    },
    async listen({ port, host = '0.0.0.0' }) {
      const address = await fastify.listen({ port, host });
      console.log(`[edge-rest] Server listening on ${address}`);
      return { port: (fastify.server.address() as any)?.port ?? port };
    },
    async close() {
      await fastify.close();
    },
  };
}
