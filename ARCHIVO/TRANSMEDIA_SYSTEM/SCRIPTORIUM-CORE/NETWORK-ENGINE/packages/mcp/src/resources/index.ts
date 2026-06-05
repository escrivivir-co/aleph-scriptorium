import fs from 'fs';
import path from 'path';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { ListResourcesRequestSchema, ReadResourceRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { alephInstance } from '../state';

export function registerResources(server: Server) {
  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return {
      resources: [
        {
          uri: 'aleph://universes/MCP-Simulation',
          name: 'Aleph Universe: MCP-Simulation',
          mimeType: 'application/json',
          description: 'Estado reactivo del Universo Aleph. Contiene dimensiones y fuerzas asimiladas.'
        },
        {
          uri: 'dossier://aleph/vision',
          name: 'Aleph Vision Dossier',
          mimeType: 'text/markdown',
          description: 'Documento conceptual fundacional de Aleph-Lang'
        }
      ]
    };
  });

  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const uri = request.params.uri;

    if (uri === 'aleph://universes/MCP-Simulation') {
      const status = alephInstance.getStatus();
      return {
        contents: [
          {
            uri,
            mimeType: 'application/json',
            text: JSON.stringify(status, null, 2)
          }
        ]
      };
    }

    if (uri === 'dossier://aleph/vision') {
      // Assuming execution from workspace root
      const filePath = path.resolve(process.cwd(), 'DOSSIERS/aleph-lang/vision.md');
      let text = 'File not found. Please ensure server runs from workspace root.';
      try {
        text = fs.readFileSync(filePath, 'utf-8');
      } catch (err) {}
      
      return {
        contents: [
          {
            uri,
            mimeType: 'text/markdown',
            text
          }
        ]
      };
    }

    throw new Error(`Resource not found: ${uri}`);
  });
}
