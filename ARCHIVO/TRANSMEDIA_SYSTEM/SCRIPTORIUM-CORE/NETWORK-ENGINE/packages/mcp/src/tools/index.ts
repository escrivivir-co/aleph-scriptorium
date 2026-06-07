import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { createForceId } from '@network-engine/aleph-lang';
import { alephInstance } from '../state';
import { z } from 'zod';

export function registerTools(server: McpServer) {
	server.registerTool(
		'aleph_absorb_force',
		{
			description: 'Inyecta una fuerza en el universo Aleph actual. USAR SOLO COMO ÚLTIMO RECURSO TRAS ANALIZAR RESOURCES.',
			inputSchema: {
				id: z.string(),
				weight: z.number().default(10)
			}
		},
		async ({ id, weight }) => {
			alephInstance.absorbForce({
				id: createForceId(id),
				vector: 'force_positive_mcp',
				weight: weight
			});

			return {
				content: [
					{
						type: 'text',
						text: `Fuerza ${id} asimilada. Nuevo estado: ${JSON.stringify(alephInstance.getStatus())}`
					}
				]
			};
		}
	);

	server.registerTool(
		'aleph_expand',
		{
			description: 'Fuerza una expansión dimensional del universo'
		},
		async () => {
			alephInstance.expand();
			return {
				content: [
					{
						type: 'text',
						text: `Universo expandido con éxito. Nuevo estado: ${JSON.stringify(alephInstance.getStatus())}`
					}
				]
			};
		}
	);
}
