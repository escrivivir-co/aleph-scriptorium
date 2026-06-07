import fs from 'fs';
import path from 'path';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { alephInstance } from '../state';

export function registerResources(server: McpServer) {
	server.registerResource(
		'mcp-simulation',
		'aleph://universes/MCP-Simulation',
		{
			mimeType: 'application/json',
			description: 'Estado reactivo del Universo Aleph. Contiene dimensiones y fuerzas asimiladas.'
		},
		async (uri) => {
			const status = alephInstance.getStatus();
			return {
				contents: [
					{
						uri: uri.href,
						mimeType: 'application/json',
						text: JSON.stringify(status, null, 2)
					}
				]
			};
		}
	);

	server.registerResource(
		'aleph-vision',
		'dossier://aleph/vision',
		{
			mimeType: 'text/markdown',
			description: 'Documento conceptual fundacional de Aleph-Lang'
		},
		async (uri) => {
			const filePath = path.resolve(process.cwd(), 'DOSSIERS/aleph-lang/vision.md');
			let text = 'File not found. Please ensure server runs from workspace root.';
			try {
				text = fs.readFileSync(filePath, 'utf-8');
			} catch (err) { }

			return {
				contents: [
					{
						uri: uri.href,
						mimeType: 'text/markdown',
						text
					}
				]
			};
		}
	);
}
