import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';

export function registerPrompts(server: McpServer) {
	server.registerPrompt(
		'analyze-expansion',
		{
			description: 'Analiza el estado del universo y sugiere una expansión dimensional (Sampling Protocol).'
		},
		async () => {
			return {
				messages: [
					{
						role: 'user',
						content: {
							type: 'text',
							text: 'Lee el recurso `aleph://universes/MCP-Simulation` y el `dossier://aleph/vision`. Analiza las fuerzas actuales y la integridad. ¿Recomiendas ejecutar una expansión dimensional usando la tool `aleph_expand`? Utiliza Sampling para criticar tu propio plan antes de ejecutar la mutación.'
						}
					}
				]
			};
		}
	);
}
