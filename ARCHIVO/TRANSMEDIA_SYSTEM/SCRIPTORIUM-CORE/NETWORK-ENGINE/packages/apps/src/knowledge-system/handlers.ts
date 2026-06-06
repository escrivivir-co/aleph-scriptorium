import fs from 'node:fs/promises';
import path from 'node:path';
import {
  buildKnowledgeSnapshot,
  formatKnowledgeSystemText,
  getKnowledgeResourceUris,
  type KnowledgeSystemDefinition,
  type KnowledgeSystemSnapshot,
} from '@network-engine/core';
import type { MCPRuntimeHandlers } from '@network-engine/mcp-runtime';

function jsonContent(uri: string, value: unknown) {
  return {
    contents: [{
      uri,
      mimeType: 'application/json',
      text: JSON.stringify(value, null, 2),
    }],
  };
}

export type KnowledgeSystemHandlersOptions = {
  resolveDefinition: () => KnowledgeSystemDefinition | Promise<KnowledgeSystemDefinition>;
  distDir: string;
  launcherName: string;
};

export function createKnowledgeSystemHandlers(
  options: KnowledgeSystemHandlersOptions,
): MCPRuntimeHandlers {
  const { resolveDefinition, distDir, launcherName } = options;

  return {
    async readResource({ uri }) {
      const definition = await resolveDefinition();
      const uris = getKnowledgeResourceUris(definition);

      if (uri === uris.ui) {
        const html = await fs.readFile(path.join(distDir, 'mcp-app.html'), 'utf-8');
        return {
          contents: [{ uri: uris.ui, mimeType: 'text/html;profile=mcp-app', text: html }],
        };
      }

      if (uri === uris.overview) {
        return jsonContent(uri, buildKnowledgeSnapshot(definition));
      }

      const layerMatch = uri.match(/^[^:]+:\/\/[^/]+\/layers\/([^/]+)$/);
      if (layerMatch) {
        const section = definition.sections.find((entry) => entry.id === layerMatch[1]);
        if (!section) throw new Error(`Section not found: ${layerMatch[1]}`);
        return jsonContent(uri, section);
      }

      const modeMatch = uri.match(/^[^:]+:\/\/[^/]+\/modes\/([^/]+)$/);
      if (modeMatch) {
        const mode = definition.modes.find((entry) => entry.id === modeMatch[1]);
        if (!mode) throw new Error(`Cognitive mode not found: ${modeMatch[1]}`);
        return jsonContent(uri, mode);
      }

      const storageMatch = uri.match(/^[^:]+:\/\/[^/]+\/storage\/([^/]+)$/);
      if (storageMatch) {
        const area = definition.storage.find((entry) => entry.id === storageMatch[1]);
        if (!area) throw new Error(`Storage area not found: ${storageMatch[1]}`);
        return jsonContent(uri, area);
      }

      throw new Error(`Resource not found: ${uri}`);
    },

    async executeTool({ tool, args }) {
      if (tool.name !== launcherName) {
        throw new Error(`Unknown tool: ${tool.name}`);
      }

      const definition = await resolveDefinition();
      const focusValues = definition.focusValues as readonly string[];
      const focus = (typeof args.focus === 'string' ? args.focus : undefined) ?? focusValues[0];
      const cognitiveMode =
        typeof args.cognitiveMode === 'string' ? args.cognitiveMode : undefined;

      const snapshot = buildKnowledgeSnapshot(
        definition,
        focus as KnowledgeSystemSnapshot['focus'],
        cognitiveMode as KnowledgeSystemSnapshot['cognitiveMode'],
      );

      return {
        content: [{ type: 'text', text: formatKnowledgeSystemText(definition, snapshot) }],
        structuredContent: {
          ...snapshot,
          launcherName,
          layerCount: snapshot.layers.length,
          modeCount: snapshot.modes.length,
        },
      };
    },
  };
}
