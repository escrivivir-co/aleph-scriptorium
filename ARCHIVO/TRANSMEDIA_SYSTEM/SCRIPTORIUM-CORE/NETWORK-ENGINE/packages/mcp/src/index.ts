import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio';
import { registerResources } from './resources';
import { registerPrompts } from './prompts';
import { registerTools } from './tools';

const server = new McpServer({
	name: 'network-engine-mcp',
	version: '1.0.0',
});

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
