FROM oven/bun:1.2 AS base
WORKDIR /app

COPY package.json bun.lock tsconfig.json tsconfig.base.json ./
COPY packages/core/package.json packages/core/
COPY packages/mcp/package.json packages/mcp/
COPY packages/mcp-runtime/package.json packages/mcp-runtime/
COPY packages/node/package.json packages/node/
COPY packages/mongo/package.json packages/mongo/
COPY packages/graphql/package.json packages/graphql/

RUN bun install --frozen-lockfile || bun install

COPY packages/core packages/core
COPY packages/mcp packages/mcp
COPY packages/mcp-runtime packages/mcp-runtime
COPY packages/node packages/node
COPY packages/mongo packages/mongo
COPY packages/graphql packages/graphql

WORKDIR /app/packages/graphql
EXPOSE 4000
CMD ["bun", "run", "src/docker-entry.ts"]
