import http from 'node:http';
import type { IncomingMessage, ServerResponse } from 'node:http';
import {
  registerFastifyMCPRuntime,
  type FastifyLike,
  type FastifyLikeReply,
  type FastifyLikeRequest,
  type FastifyMCPRuntimeOptions,
} from './fastify';
import { reclaimPort } from './port-utils';

type RouteHandler = (request: FastifyLikeRequest, reply: FastifyLikeReply) => Promise<unknown>;

interface RoutedFastify extends FastifyLike {
  routes: {
    post: Map<string, RouteHandler>;
    get: Map<string, RouteHandler>;
  };
}

function readJsonBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    req.on('end', () => {
      if (chunks.length === 0) {
        resolve(undefined);
        return;
      }
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf-8')));
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
}

function createMinimalFastifyAdapter(): RoutedFastify {
  const post = new Map<string, RouteHandler>();
  const get = new Map<string, RouteHandler>();

  return {
    post(path, handler) {
      post.set(path, handler);
    },
    get(path, handler) {
      get.set(path, handler);
    },
    routes: { post, get },
  };
}

function createReply(res: ServerResponse): FastifyLikeReply {
  return {
    raw: res,
    sent: false,
    status(code: number) {
      res.statusCode = code;
      return this;
    },
    send(payload?: unknown) {
      this.sent = true;
      if (payload !== undefined && !res.headersSent) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(payload));
      } else if (!res.headersSent) {
        res.end();
      }
      return payload;
    },
  };
}

export interface McpHttpEdgeOptions {
  port?: number;
  host?: string;
  /** When true (default), kill orphan listeners on the port before bind. */
  reclaimPortOnListen?: boolean;
  register: FastifyMCPRuntimeOptions;
}

export interface McpHttpEdge {
  listen(): Promise<{ port: number }>;
  close(): Promise<void>;
}

function bindServer(
  server: http.Server,
  port: number,
  host: string,
): Promise<{ port: number }> {
  return new Promise((resolve, reject) => {
    const onError = (error: NodeJS.ErrnoException) => {
      server.off('listening', onListening);
      reject(error);
    };

    const onListening = () => {
      server.off('error', onError);
      const address = server.address();
      const actualPort = typeof address === 'object' && address ? address.port : port;
      resolve({ port: actualPort });
    };

    server.once('error', onError);
    server.once('listening', onListening);
    server.listen(port, host);
  });
}

export function createMcpHttpEdge(options: McpHttpEdgeOptions): McpHttpEdge {
  const port = options.port ?? 3100;
  const host = options.host ?? '0.0.0.0';
  const reclaimOnListen = options.reclaimPortOnListen ?? port > 0;
  const fastify = createMinimalFastifyAdapter();
  registerFastifyMCPRuntime(fastify, options.register);

  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);
    const pathname = url.pathname;
    const method = req.method?.toUpperCase();

    try {
      if (method === 'POST') {
        const handler = fastify.routes.post.get(pathname);
        if (handler) {
          const body = await readJsonBody(req);
          await handler({ raw: req, body }, createReply(res));
          return;
        }
      }

      if (method === 'GET') {
        const handler = fastify.routes.get.get(pathname);
        if (handler) {
          await handler({ raw: req }, createReply(res));
          return;
        }
      }

      res.writeHead(404);
      res.end('Not Found');
    } catch (error) {
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }));
      }
    }
  });

  return {
    async listen() {
      if (reclaimOnListen && port > 0) {
        const { reclaimed, killedPids } = await reclaimPort(port);
        if (reclaimed) {
          console.warn(
            `[mcp-http-edge] Reclaimed port ${port} (stopped PIDs: ${killedPids.join(', ')})`,
          );
        }
      }

      try {
        return await bindServer(server, port, host);
      } catch (error) {
        const errno = error as NodeJS.ErrnoException;
        if (errno.code !== 'EADDRINUSE' || !reclaimOnListen || port <= 0) {
          if (errno.code === 'EADDRINUSE') {
            throw new Error(
              `Port ${port} is already in use. Stop the existing process or set PORT to another value.`,
            );
          }
          throw error;
        }

        const { reclaimed, killedPids, skippedPids } = await reclaimPort(port);
        if (!reclaimed) {
          const hint =
            skippedPids.length > 0
              ? ` Port is held by this process (PID ${process.pid}). Call close() before listen() again.`
              : '';
          throw new Error(`Port ${port} is already in use.${hint}`);
        }

        console.warn(
          `[mcp-http-edge] Reclaimed port ${port} after EADDRINUSE (stopped PIDs: ${killedPids.join(', ')})`,
        );
        return bindServer(server, port, host);
      }
    },
    close() {
      return new Promise((resolve, reject) => {
        if (!server.listening) {
          resolve();
          return;
        }

        const forceTimer = setTimeout(() => {
          server.closeAllConnections?.();
          resolve();
        }, 2_000);

        server.close((error) => {
          clearTimeout(forceTimer);
          if (error) {
            const code = (error as NodeJS.ErrnoException).code;
            if (code === 'ERR_SERVER_NOT_RUNNING') {
              resolve();
              return;
            }
            reject(error);
            return;
          }
          resolve();
        });
      });
    },
  };
}
