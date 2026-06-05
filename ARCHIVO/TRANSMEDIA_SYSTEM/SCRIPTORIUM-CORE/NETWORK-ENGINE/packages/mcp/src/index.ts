import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerResources } from './resources';
import { registerPrompts } from './prompts';
import { registerTools } from './tools';

const server = new Server(
  {
    name: 'network-engine-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      resources: {},
      prompts: {},
      tools: {},
    },
  }
);

// Mapeo Arquitectónico de Contexto (Resource First)
registerResources(server);
registerPrompts(server);
registerTools(server);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Network-Engine MCP Server initialized and listening on STDIO.');
}

main().catch((error) => {
  console.error('Fatal Server Error:', error);
  process.exit(1);
});
