import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { ListToolsRequestSchema, CallToolRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { createForceId } from '@network-engine/aleph-lang';
import { alephInstance } from '../state';

export function registerTools(server: Server) {
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: 'aleph_absorb_force',
          description: 'Inyecta una fuerza en el universo Aleph actual. USAR SOLO COMO ÚLTIMO RECURSO TRAS ANALIZAR RESOURCES.',
          inputSchema: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              weight: { type: 'number' }
            },
            required: ['id', 'weight']
          }
        },
        {
          name: 'aleph_expand',
          description: 'Fuerza una expansión dimensional del universo',
          inputSchema: {
            type: 'object',
            properties: {}
          }
        }
      ]
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    if (name === 'aleph_absorb_force') {
      const forceId = String(args?.id || 'default');
      const weight = Number(args?.weight || 10);
      
      alephInstance.absorbForce({
        id: createForceId(forceId),
        vector: 'force_positive_mcp',
        weight
      });

      return {
        content: [
          {
            type: 'text',
            text: `Fuerza ${forceId} asimilada. Nuevo estado: ${JSON.stringify(alephInstance.getStatus())}`
          }
        ]
      };
    }

    if (name === 'aleph_expand') {
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

    throw new Error('Tool not found');
  });
}
