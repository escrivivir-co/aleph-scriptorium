import {
  buildKnowledgeSnapshot,
  defineKnowledgeSystem,
  formatKnowledgeSystemText,
  type KnowledgeModeInfo,
  type KnowledgeSection,
  type KnowledgeStorageArea,
  type KnowledgeSystemSnapshot,
} from '@network-engine/core';

export type CognitiveMode = 'MONKEY' | 'AGI' | 'ASI';
export type AlephFocus = 'overview' | 'layers' | 'modes' | 'storage' | 'mission';

export type AlephDocLink = KnowledgeSection['docs'][number];
export type AlephLayer = KnowledgeSection;
export type AlephStorageArea = KnowledgeStorageArea;
export type AlephModeInfo = KnowledgeModeInfo<CognitiveMode>;
export type AlephOsSnapshot = KnowledgeSystemSnapshot<AlephFocus, CognitiveMode>;

export const ALEPH_MISSION =
  'Construir progresivamente un sistema de conocimiento, diseño e implementación capaz de evolucionar durante meses o años sin perder coherencia arquitectónica.';

export const MARKDOWN_FIRST_RULE =
  'La ventana de chat es efímera. Toda respuesta estructural debe consolidarse en disco siguiendo la jerarquía Markdown-First (INSTRUCTIONS → STORAGE).';

export const LAYERS: readonly AlephLayer[] = [
  {
    id: 'LAYER_0',
    title: 'LAYER 0 — Fundamentos',
    role: 'Documentación y protocolos de tecnologías base.',
    docs: [
      { label: 'AGILE', path: 'INSTRUCTIONS/LAYER_0/AGILE.instructions.md' },
      { label: 'DOD', path: 'INSTRUCTIONS/LAYER_0/DOD.instructions.md' },
      { label: 'TS', path: 'INSTRUCTIONS/LAYER_0/TS.instructions.md' },
      { label: 'MCP', path: 'INSTRUCTIONS/LAYER_0/MCP.instructions.md' },
      { label: 'NODE', path: 'INSTRUCTIONS/LAYER_0/NODE.instructions.md' },
      { label: 'RXJS', path: 'INSTRUCTIONS/LAYER_0/RXJS.instructions.md' },
      { label: 'XSTATE', path: 'INSTRUCTIONS/LAYER_0/XSTATE.instructions.md' },
    ],
  },
  {
    id: 'LAYER_1',
    title: 'LAYER 1 — Análisis técnico',
    role: 'Análisis técnico estricto de los componentes.',
    docs: [
      { label: 'NETWORK_ENGINE', path: 'INSTRUCTIONS/LAYER_1/NETWORK_ENGINE.instructions.md' },
      { label: 'CORE', path: 'INSTRUCTIONS/LAYER_1/CORE.instructions.md' },
      { label: 'MCP_RUNTIME', path: 'INSTRUCTIONS/LAYER_1/MCP_RUNTIME.instructions.md' },
      { label: 'APPS', path: 'INSTRUCTIONS/LAYER_1/APPS.instructions.md' },
      { label: 'ECOSYSTEM', path: 'INSTRUCTIONS/LAYER_1/ECOSYSTEM.md' },
    ],
  },
  {
    id: 'LAYER_2',
    title: 'LAYER 2 — Contexto operativo',
    role: 'Contexto operativo para el ecosistema.',
    docs: [
      { label: 'MONOREPO', path: 'INSTRUCTIONS/LAYER_2/MONOREPO.instructions.md' },
      { label: 'APPsDEV', path: 'INSTRUCTIONS/LAYER_2/APPsDEV.instructions.md' },
      { label: 'SEMANTINC', path: 'INSTRUCTIONS/LAYER_2/SEMANTINC.instructions.md' },
    ],
  },
  {
    id: 'LAYER_3',
    title: 'LAYER 3 — Análisis funcional',
    role: 'Análisis funcional y metalingüístico.',
    docs: [
      { label: 'NETWORK_ENGINE', path: 'INSTRUCTIONS/LAYER_3/NETWORK_ENGINE.functional.md' },
      { label: 'CORE', path: 'INSTRUCTIONS/LAYER_3/CORE.functional.md' },
      { label: 'MCP_RUNTIME', path: 'INSTRUCTIONS/LAYER_3/MCP_RUNTIME.functional.md' },
      { label: 'APPS', path: 'INSTRUCTIONS/LAYER_3/APPS.functional.md' },
    ],
  },
  {
    id: 'LAYER_4',
    title: 'LAYER 4 — DevOps',
    role: 'Protocolos operativos (DevOps Agent).',
    docs: [{ label: 'LANGUAGES', path: 'INSTRUCTIONS/LAYER_4/LANGUAGES.instructions.md' }],
  },
];

export const STORAGE_AREAS: readonly AlephStorageArea[] = [
  {
    id: 'LANGUAGES',
    title: 'LANGUAGES',
    path: 'LANGUAGES/',
    description: 'Dossiers y documentación de lenguajes instanciados.',
  },
  {
    id: 'DOSSIERS',
    title: 'DOSSIERS',
    path: 'DOSSIERS/',
    description: 'Conocimiento acumulado y líneas de investigación generales.',
  },
  {
    id: 'SCRATCHPAD',
    title: 'SCRATCHPAD',
    path: 'SCRATCHPAD/',
    description: 'Zona temporal de trabajo.',
  },
  {
    id: 'ADR',
    title: 'ADR',
    path: 'ADR/',
    description: 'Decisiones arquitectónicas.',
  },
];

export const COGNITIVE_MODES: readonly AlephModeInfo[] = [
  {
    id: 'MONKEY',
    title: 'MONKEY MODE',
    summary: 'Ejecución rápida, sin investigación ni replanteamiento de arquitectura.',
    docPath: 'INSTRUCTIONS/MODES/MONKEY.instructions.md',
  },
  {
    id: 'AGI',
    title: 'AGI MODE',
    summary: 'Trabajo profesional estándar con análisis previo y equilibrio velocidad/calidad.',
    docPath: 'INSTRUCTIONS/MODES/AGI.instructions.md',
  },
  {
    id: 'ASI',
    title: 'ASI MODE',
    summary: 'Investigación estratégica, modelado conceptual y diseño de plataformas.',
    docPath: 'INSTRUCTIONS/MODES/ASI.instructions.md',
  },
];

export const alephOsDefinition = defineKnowledgeSystem({
  kind: 'aleph-os',
  version: '1.0.0',
  display: { singular: 'ALEPH OS', plural: 'ALEPH OS' },
  mission: ALEPH_MISSION,
  markdownFirst: MARKDOWN_FIRST_RULE,
  focusValues: ['overview', 'layers', 'modes', 'storage', 'mission'] as const,
  sections: LAYERS,
  storage: STORAGE_AREAS,
  modes: COGNITIVE_MODES,
  contract: {
    resourceScheme: 'aleph',
    resourcePath: 'os',
    uiUri: 'ui://aleph-os/mcp-app.html',
    launcherName: 'show-aleph-os',
    launcherDescription:
      'Opens the ALEPH cognitive operating system navigator: INSTRUCTIONS layers, STORAGE areas, and cognitive modes (MONKEY / AGI / ASI).',
    overviewName: 'ALEPH OS Overview',
    overviewDescription: 'Structured snapshot of the ALEPH cognitive operating system',
    uiName: 'ALEPH OS UI',
    uiDescription:
      'Interactive MCP App navigator for INSTRUCTIONS, STORAGE, and cognitive modes',
  },
});

export function buildAlephSnapshot(
  focus: AlephFocus = 'overview',
  cognitiveMode?: CognitiveMode,
): AlephOsSnapshot {
  return buildKnowledgeSnapshot(alephOsDefinition, focus, cognitiveMode);
}

export function formatAlephTextFallback(snapshot: AlephOsSnapshot): string {
  return formatKnowledgeSystemText(alephOsDefinition, snapshot, 'ALEPH Agent Operating System');
}
