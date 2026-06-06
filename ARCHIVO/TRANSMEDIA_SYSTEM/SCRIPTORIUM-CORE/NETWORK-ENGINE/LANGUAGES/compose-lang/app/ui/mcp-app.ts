import {
  App,
  applyDocumentTheme,
  applyHostFonts,
  applyHostStyleVariables,
  type McpUiHostContext,
} from '@modelcontextprotocol/ext-apps';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import './mcp-app.css';

type ServiceSnapshot = {
  id: string;
  state: string;
  dependsOn: string[];
  healthcheck: { test: string; interval?: string; retries?: number } | null;
};

type StackSnapshot = {
  stackId: string;
  virtualClockMs: number;
  simulationActive: boolean;
  services: ServiceSnapshot[];
  phrases: string[];
  launcherName?: string;
};

const topologyEl = document.getElementById('topology-graph')!;
const clockLabelEl = document.getElementById('clock-label')!;
const phrasesListEl = document.getElementById('phrases-list')!;
const healthcheckEl = document.getElementById('healthcheck-inspector')!;
const failureSelectEl = document.getElementById('failure-service') as HTMLSelectElement;
const tickSliderEl = document.getElementById('tick-slider') as HTMLInputElement;

let snapshot: StackSnapshot | null = null;
let focusedServiceId: string | undefined;
const LAUNCHER = 'show-compose-stack';

function handleHostContextChanged(ctx: McpUiHostContext): void {
  if (ctx.theme) applyDocumentTheme(ctx.theme);
  if (ctx.styles?.variables) applyHostStyleVariables(ctx.styles.variables);
  if (ctx.styles?.css?.fonts) applyHostFonts(ctx.styles.css.fonts);
}

function parseSnapshot(result: CallToolResult): StackSnapshot | null {
  const structured = result.structuredContent as StackSnapshot | undefined;
  if (structured?.services && structured.stackId) return structured;
  return snapshot;
}

function renderTopology(s: StackSnapshot): void {
  topologyEl.replaceChildren();
  for (const service of s.services) {
    const node = document.createElement('article');
    node.className = 'service-node';
    node.dataset.serviceId = service.id;

    const title = document.createElement('strong');
    title.textContent = service.id;

    const badge = document.createElement('span');
    badge.className = `badge badge-${service.state}`;
    badge.textContent = service.state;

    const deps = document.createElement('p');
    deps.className = 'deps';
    deps.textContent =
      service.dependsOn.length > 0 ? `depends on: ${service.dependsOn.join(', ')}` : 'no dependencies';

    node.append(title, document.createElement('br'), badge, deps);
    node.addEventListener('click', () => {
      focusedServiceId = service.id;
      renderHealthcheck(s);
    });
    topologyEl.append(node);
  }
}

function renderPhrases(s: StackSnapshot): void {
  phrasesListEl.replaceChildren();
  const simulatePhrases = [
    'stack.simulate().up()',
    'stack.simulate().down()',
    `stack.simulate().tick(${tickSliderEl.value})`,
    'stack.simulate().reset()',
    ...s.phrases,
  ];

  for (const phrase of simulatePhrases) {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = phrase;
    btn.addEventListener('click', () => void dispatchPhrase(phrase));
    li.append(btn);
    phrasesListEl.append(li);
  }
}

function renderFailureSelect(s: StackSnapshot): void {
  failureSelectEl.replaceChildren();
  for (const service of s.services) {
    const option = document.createElement('option');
    option.value = service.id;
    option.textContent = service.id;
    failureSelectEl.append(option);
  }
}

function renderHealthcheck(s: StackSnapshot): void {
  const service = s.services.find((entry) => entry.id === focusedServiceId) ?? s.services[0];
  if (!service) {
    healthcheckEl.textContent = 'No services loaded.';
    return;
  }
  healthcheckEl.textContent = JSON.stringify(
    {
      serviceId: service.id,
      simulatedState: service.state,
      declared: service.healthcheck,
      virtualClockMs: s.virtualClockMs,
    },
    null,
    2,
  );
}

function renderSnapshot(s: StackSnapshot): void {
  snapshot = s;
  clockLabelEl.textContent = `virtual clock: ${s.virtualClockMs}ms`;
  renderTopology(s);
  renderPhrases(s);
  renderFailureSelect(s);
  renderHealthcheck(s);
}

async function callTool(name: string, args: Record<string, unknown> = {}) {
  const result = await app.callServerTool({ name, arguments: args });
  const next = parseSnapshot(result);
  if (next) renderSnapshot(next);
}

async function dispatchPhrase(phrase: string) {
  if (phrase.includes('simulate().up()')) return callTool('compose-simulate-up');
  if (phrase.includes('simulate().down()')) return callTool('compose-simulate-down');
  if (phrase.includes('simulate().reset()')) return callTool('compose-simulate-reset');
  const tickMatch = phrase.match(/tick\((\d+)\)/);
  if (tickMatch) return callTool('compose-simulate-tick', { ms: Number(tickMatch[1]) });
  const failureMatch = phrase.match(/failure\('([^']+)'\)/);
  if (failureMatch) return callTool('compose-simulate-inject-failure', { serviceId: failureMatch[1] });
}

const app = new App({ name: 'Compose Stack Digital Twin', version: '1.0.0' });

app.onteardown = async () => ({});

app.ontoolresult = (result) => {
  const next = parseSnapshot(result);
  if (next) renderSnapshot(next);
};

app.onhostcontextchanged = handleHostContextChanged;

document.getElementById('up-btn')!.addEventListener('click', () => void callTool('compose-simulate-up'));
document.getElementById('down-btn')!.addEventListener('click', () => void callTool('compose-simulate-down'));
document.getElementById('reset-btn')!.addEventListener('click', () => void callTool('compose-simulate-reset'));
document.getElementById('tick-btn')!.addEventListener('click', () =>
  void callTool('compose-simulate-tick', { ms: Number(tickSliderEl.value) }),
);
document.getElementById('inject-failure-btn')!.addEventListener('click', () =>
  void callTool('compose-simulate-inject-failure', { serviceId: failureSelectEl.value }),
);
document.getElementById('refresh-btn')!.addEventListener('click', () => void callTool(LAUNCHER));

app.connect().then(async () => {
  const ctx = app.getHostContext();
  if (ctx) handleHostContextChanged(ctx);
  try {
    const result = await app.callServerTool({ name: LAUNCHER, arguments: {} });
    const initial = parseSnapshot(result);
    if (initial) renderSnapshot(initial);
  } catch {
    healthcheckEl.textContent = 'Connect via show-compose-stack launcher for live twin state.';
  }
});
