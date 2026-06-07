FROM oven/bun:1.2 AS base
WORKDIR /app

COPY package.json bun.lock tsconfig.json tsconfig.base.json ./
COPY packages/core/package.json packages/core/
COPY packages/mongo/package.json packages/mongo/
COPY packages/graphql/package.json packages/graphql/
COPY packages/edge-graphql/package.json packages/edge-graphql/
COPY packages/network-engine/package.json packages/network-engine/
COPY packages/node/package.json packages/node/
COPY packages/mcp/package.json packages/mcp/
COPY packages/mcp-runtime/package.json packages/mcp-runtime/
COPY packages/pubsub/package.json packages/pubsub/
COPY packages/edge-pubsub/package.json packages/edge-pubsub/
COPY packages/graphdb/package.json packages/graphdb/
COPY packages/edge-graphdb/package.json packages/edge-graphdb/
COPY packages/apps/gateway/package.json packages/apps/gateway/

RUN bun install --frozen-lockfile || bun install

COPY packages/core packages/core
COPY packages/mongo packages/mongo
COPY packages/graphql packages/graphql
COPY packages/edge-graphql packages/edge-graphql
COPY packages/network-engine packages/network-engine
COPY packages/node packages/node
COPY packages/mcp packages/mcp
COPY packages/mcp-runtime packages/mcp-runtime
COPY packages/pubsub packages/pubsub
COPY packages/edge-pubsub packages/edge-pubsub
COPY packages/graphdb packages/graphdb
COPY packages/edge-graphdb packages/edge-graphdb
COPY packages/apps/gateway packages/apps/gateway

WORKDIR /app/packages/apps/gateway
EXPOSE 4000
CMD ["bun", "run", "src/index.ts"]
