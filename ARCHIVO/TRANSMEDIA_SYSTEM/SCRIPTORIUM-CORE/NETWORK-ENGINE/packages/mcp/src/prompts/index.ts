import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { ListPromptsRequestSchema, GetPromptRequestSchema } from '@modelcontextprotocol/sdk/types.js';

export function registerPrompts(server: Server) {
  server.setRequestHandler(ListPromptsRequestSchema, async () => {
    return {
      prompts: [
        {
          name: 'analyze-expansion',
          description: 'Analiza el estado del universo y sugiere una expansión dimensional (Sampling Protocol).',
          arguments: []
        }
      ]
    };
  });

  server.setRequestHandler(GetPromptRequestSchema, async (request) => {
    if (request.params.name === 'analyze-expansion') {
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

    throw new Error('Prompt not found');
  });
}
