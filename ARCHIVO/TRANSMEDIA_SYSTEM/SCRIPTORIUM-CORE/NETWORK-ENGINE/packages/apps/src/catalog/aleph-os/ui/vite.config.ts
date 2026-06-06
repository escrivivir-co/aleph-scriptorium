import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

const uiRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: uiRoot,
  plugins: [viteSingleFile()],
  build: {
    rollupOptions: {
      input: path.join(uiRoot, 'mcp-app.html'),
    },
    outDir: path.join(uiRoot, '../dist'),
    emptyOutDir: true,
  },
});
