import {
  App,
  applyDocumentTheme,
  applyHostFonts,
  applyHostStyleVariables,
  type McpUiHostContext,
} from '@modelcontextprotocol/ext-apps';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import type { KnowledgeSystemSnapshot } from '@network-engine/core';
import {
  buildAlephSnapshot,
  type AlephFocus,
  type CognitiveMode,
} from '../aleph-data';
import './global.css';
import './mcp-app.css';

type StructuredSnapshot = KnowledgeSystemSnapshot<AlephFocus, CognitiveMode> & {
  readonly launcherName?: string;
  readonly layerCount?: number;
  readonly modeCount?: number;
};

const mainEl = document.querySelector('.main') as HTMLElement;
const missionTextEl = document.getElementById('mission-text')!;
const markdownFirstEl = document.getElementById('markdown-first')!;
const modesGridEl = document.getElementById('modes-grid')!;
const layersListEl = document.getElementById('layers-list')!;
const storageListEl = document.getElementById('storage-list')!;
const focusBadgeEl = document.getElementById('focus-badge')!;
const refreshBtn = document.getElementById('refresh-btn')!;

let previewBanner: HTMLElement | null = null;
let activeFocus: AlephFocus = 'overview';
let activeMode: CognitiveMode | undefined;
let activeLauncherName = 'show-aleph-os';

function handleHostContextChanged(ctx: McpUiHostContext): void {
  if (ctx.theme) {
    applyDocumentTheme(ctx.theme);
  }
  if (ctx.styles?.variables) {
    applyHostStyleVariables(ctx.styles.variables);
  }
  if (ctx.styles?.css?.fonts) {
    applyHostFonts(ctx.styles.css.fonts);
  }
  if (ctx.safeAreaInsets) {
    const { top, right, bottom, left } = ctx.safeAreaInsets;
    mainEl.style.padding = `${top}px ${right}px ${bottom}px ${left}px`;
  }
}

function parseSnapshot(result: CallToolResult): StructuredSnapshot | null {
  const structured = result.structuredContent as StructuredSnapshot | undefined;
  if (structured?.layers && structured.storage && structured.modes) {
    return structured;
  }

  const text = result.content?.find((item) => item.type === 'text')?.text;
  if (!text) {
    return null;
  }

  return buildAlephSnapshot(activeFocus, activeMode);
}

function setFocusedSection(focus: AlephFocus): void {
  activeFocus = focus;
  focusBadgeEl.textContent = `focus: ${focus}`;
  document.querySelectorAll<HTMLElement>('[data-section]').forEach((section) => {
    section.classList.toggle('focused', section.dataset.section === focus);
  });
}

function showPreviewBanner(partial: Record<string, unknown>): void {
  if (!previewBanner) {
    previewBanner = document.createElement('p');
    previewBanner.className = 'preview-banner';
    mainEl.insertBefore(previewBanner, mainEl.firstChild?.nextSibling ?? null);
  }
  const focus = typeof partial.focus === 'string' ? partial.focus : '…';
  const mode = typeof partial.cognitiveMode === 'string' ? partial.cognitiveMode : '—';
  previewBanner.textContent = `Streaming input… focus=${focus}, mode=${mode}`;
  previewBanner.style.display = 'block';
}

function hidePreviewBanner(): void {
  if (previewBanner) {
    previewBanner.style.display = 'none';
  }
}

function renderModes(snapshot: StructuredSnapshot): void {
  modesGridEl.replaceChildren();
  for (const mode of snapshot.modes) {
    const card = document.createElement('article');
    card.className = 'mode-card';
    if (snapshot.cognitiveMode === mode.id) {
      card.classList.add('active');
    }

    const title = document.createElement('h3');
    title.textContent = mode.title;

    const summary = document.createElement('p');
    summary.textContent = mode.summary;

    const path = document.createElement('code');
    path.textContent = mode.docPath;

    card.append(title, summary, path);
    modesGridEl.append(card);
  }
}

function renderLayers(snapshot: StructuredSnapshot): void {
  layersListEl.replaceChildren();
  for (const layer of snapshot.layers) {
    const item = document.createElement('article');
    item.className = 'layer-item';

    const title = document.createElement('h3');
    title.textContent = layer.title;

    const role = document.createElement('p');
    role.textContent = layer.role;

    const docs = document.createElement('ul');
    docs.className = 'doc-list';
    for (const doc of layer.docs) {
      const li = document.createElement('li');
      li.textContent = `${doc.label} → ${doc.path}`;
      docs.append(li);
    }

    item.append(title, role, docs);
    layersListEl.append(item);
  }
}

function renderStorage(snapshot: StructuredSnapshot): void {
  storageListEl.replaceChildren();
  for (const area of snapshot.storage) {
    const item = document.createElement('article');
    item.className = 'storage-item';

    const title = document.createElement('h3');
    title.textContent = area.title;

    const description = document.createElement('p');
    description.textContent = area.description;

    const path = document.createElement('code');
    path.textContent = area.path;

    item.append(title, description, path);
    storageListEl.append(item);
  }
}

function renderSnapshot(snapshot: StructuredSnapshot): void {
  missionTextEl.textContent = snapshot.mission;
  markdownFirstEl.textContent = snapshot.markdownFirst;
  activeMode = snapshot.cognitiveMode;
  activeLauncherName = snapshot.launcherName ?? activeLauncherName;
  setFocusedSection(snapshot.focus);
  renderModes(snapshot);
  renderLayers(snapshot);
  renderStorage(snapshot);
  hidePreviewBanner();
}

function renderFromPartial(args: Record<string, unknown>): void {
  if (typeof args.focus === 'string') {
    setFocusedSection(args.focus as AlephFocus);
  }
  if (typeof args.cognitiveMode === 'string') {
    activeMode = args.cognitiveMode as CognitiveMode;
    renderModes(buildAlephSnapshot(activeFocus, activeMode));
  }
}

const app = new App({ name: 'ALEPH Agent Operating System', version: '1.0.0' });

app.onteardown = async () => ({});

app.ontoolinputpartial = (params) => {
  const args = (params.arguments ?? {}) as Record<string, unknown>;
  showPreviewBanner(args);
  renderFromPartial(args);
};

app.ontoolinput = (params) => {
  const args = (params.arguments ?? {}) as Record<string, unknown>;
  renderFromPartial(args);
};

app.ontoolresult = (result) => {
  const snapshot = parseSnapshot(result);
  if (snapshot) {
    renderSnapshot(snapshot);
  }
};

app.onhostcontextchanged = handleHostContextChanged;

refreshBtn.addEventListener('click', async () => {
  try {
    const result = await app.callServerTool({
      name: activeLauncherName,
      arguments: { focus: activeFocus, cognitiveMode: activeMode },
    });
    const snapshot = parseSnapshot(result);
    if (snapshot) {
      renderSnapshot(snapshot);
    }
  } catch (error) {
    console.error('Refresh failed:', error);
  }
});

app.connect().then(() => {
  const ctx = app.getHostContext();
  if (ctx) {
    handleHostContextChanged(ctx);
  }
  renderSnapshot(buildAlephSnapshot('overview'));
});
