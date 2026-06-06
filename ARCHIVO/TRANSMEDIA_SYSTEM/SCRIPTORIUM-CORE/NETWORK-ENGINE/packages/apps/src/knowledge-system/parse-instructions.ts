import fs from 'node:fs/promises';
import path from 'node:path';
import {
  defineKnowledgeSystem,
  type KnowledgeContractOptions,
  type KnowledgeDocLink,
  type KnowledgeModeInfo,
  type KnowledgeSection,
  type KnowledgeStorageArea,
  type KnowledgeSystemDefinition,
} from '@network-engine/core';

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/;
const LAYER_HEADER_RE = /^\*\s+\*\*\[(LAYER_\d+)\]\([^)]+\)\*\*:\s*(.+)$/;
const INDENTED_LINK_RE = /^\s+\*\s+\[([^\]]+)\]\(([^)]+)\)/;
const STORAGE_LINE_RE = /^\*\s+\[([^\]]+)\]\(([^)]+)\)(?::\s*(.+))?$/;
const MODE_LINE_RE = /^\*\s+\[\*\*([^*]+)\*\*\]\(([^)]+)\):\s*(.+)$/;

export type ParseInstructionsOptions = {
  workspaceRoot: string;
  contract: KnowledgeContractOptions;
  kind?: string;
  version?: `${number}.${number}.${number}`;
  display?: { singular: string; plural: string };
};

function normalizeInstructionsPath(linkPath: string): string {
  const cleaned = linkPath.replace(/^\.\.\//, '');
  if (cleaned.startsWith('INSTRUCTIONS/')) return cleaned;
  return `INSTRUCTIONS/${cleaned}`;
}

function normalizeStoragePath(linkPath: string, label: string): string {
  const cleaned = linkPath.replace(/^\.\.\//, '').replace(/\/README\.md$/, '/');
  if (cleaned.endsWith('/')) return cleaned;
  if (cleaned.includes('/')) return cleaned;
  return `${label}/`;
}

function normalizeAdrPath(linkPath: string): string {
  const cleaned = linkPath.replace(/^\.\.\//, '');
  if (cleaned.startsWith('ADR/')) return cleaned;
  return `ADR/${cleaned}`;
}

function extractParagraph(lines: string[], header: string): string {
  const index = lines.findIndex((line) => line.trim() === header);
  if (index === -1) return '';

  const collected: string[] = [];
  for (let i = index + 1; i < lines.length; i += 1) {
    const line = lines[i]?.trim() ?? '';
    if (line.startsWith('#')) break;
    if (line.length > 0) collected.push(line);
  }

  return collected.join(' ').trim();
}

function extractMission(lines: string[]): string {
  const index = lines.findIndex((line) => line.trim() === '## Misión');
  if (index === -1) {
    return 'Construir progresivamente un sistema de conocimiento, diseño e implementación capaz de evolucionar durante meses o años sin perder coherencia arquitectónica.';
  }

  const collected: string[] = [];
  for (let i = index + 1; i < lines.length; i += 1) {
    const line = lines[i]?.trim() ?? '';
    if (line.startsWith('#')) break;
    if (line.length > 0) collected.push(line);
  }

  return collected.join(' ').trim();
}

function parseSections(lines: string[]): KnowledgeSection[] {
  const sections: KnowledgeSection[] = [];
  let current: KnowledgeSection | null = null;

  for (const line of lines) {
    const layerHeader = line.match(LAYER_HEADER_RE);
    if (layerHeader) {
      if (current) sections.push(current);
      current = {
        id: layerHeader[1]!,
        title: layerHeader[1]!.replace('_', ' '),
        role: layerHeader[2]!.trim(),
        docs: [],
      };
      continue;
    }

    const docLink = line.match(INDENTED_LINK_RE);
    if (docLink && current) {
      const doc: KnowledgeDocLink = {
        label: docLink[1]!,
        path: normalizeInstructionsPath(docLink[2]!),
      };
      current = { ...current, docs: [...current.docs, doc] };
    }
  }

  if (current) sections.push(current);
  return sections;
}

function parseStorage(lines: string[]): KnowledgeStorageArea[] {
  const start = lines.findIndex((line) => line.trim() === '## STORAGE');
  if (start === -1) return [];

  const areas: KnowledgeStorageArea[] = [];
  for (let i = start + 1; i < lines.length; i += 1) {
    const line = lines[i] ?? '';
    if (line.startsWith('#')) break;

    const match = line.match(STORAGE_LINE_RE);
    if (!match) continue;

    const title = match[1]!.trim();
    areas.push({
      id: title,
      title,
      path: normalizeStoragePath(match[2]!, title),
      description: match[3]?.trim() ?? title,
    });
  }

  return areas;
}

function parseModes(lines: string[]): KnowledgeModeInfo[] {
  const start = lines.findIndex((line) => line.trim() === '# Modos Cognitivos');
  if (start === -1) return [];

  const modes: KnowledgeModeInfo[] = [];
  for (let i = start + 1; i < lines.length; i += 1) {
    const line = lines[i] ?? '';
    if (line.startsWith('# ') && !line.startsWith('# Modos')) break;

    const match = line.match(MODE_LINE_RE);
    if (!match) continue;

    const title = match[1]!.trim();
    const id = title.replace(/\s+MODE$/i, '').trim() as KnowledgeModeInfo['id'];
    modes.push({
      id,
      title,
      summary: match[3]!.trim(),
      docPath: normalizeInstructionsPath(match[2]!),
    });
  }

  return modes;
}

async function enrichSectionRoles(
  workspaceRoot: string,
  sections: KnowledgeSection[],
): Promise<KnowledgeSection[]> {
  return Promise.all(
    sections.map(async (section) => {
      const readmePath = path.join(
        workspaceRoot,
        'INSTRUCTIONS',
        section.id,
        'README.md',
      );

      try {
        const readme = await fs.readFile(readmePath, 'utf-8');
        const firstLine = readme.split('\n').find((line) => line.trim().length > 0)?.trim();
        if (!firstLine) return section;
        return { ...section, role: firstLine };
      } catch {
        return section;
      }
    }),
  );
}

async function parseAdrSection(workspaceRoot: string): Promise<KnowledgeSection | null> {
  const adrPath = path.join(workspaceRoot, 'ADR', 'README.md');

  try {
    const content = await fs.readFile(adrPath, 'utf-8');
    const docs = content
      .split(/\r?\n/)
      .map((line): KnowledgeDocLink | null => {
        const match = line.match(/^\|\s*\[([^\]]+)\]\(([^)]+)\)\s*\|\s*([^|]+)\|/);
        if (!match) return null;
        return {
          label: `ADR ${match[1]!}`,
          path: normalizeAdrPath(match[2]!),
        };
      })
      .filter((doc): doc is KnowledgeDocLink => doc !== null);

    if (docs.length === 0) return null;

    return {
      id: 'ADR',
      title: 'ADR — Decisiones arquitectónicas',
      role: 'Índice de decisiones arquitectónicas aceptadas.',
      docs,
    };
  } catch {
    return null;
  }
}

export async function parseAlephInstructionsIndex(
  options: ParseInstructionsOptions,
): Promise<KnowledgeSystemDefinition> {
  const alephPath = path.join(options.workspaceRoot, 'INSTRUCTIONS', 'ALEPH.instructions.md');
  const content = await fs.readFile(alephPath, 'utf-8');
  const lines = content.split(/\r?\n/);

  const mission = extractMission(lines);
  const markdownFirst = extractParagraph(lines, '# Arquitectura de Salida')
    || 'La ventana de chat es efímera. Toda respuesta estructural debe consolidarse en disco siguiendo la jerarquía Markdown-First (INSTRUCTIONS → STORAGE).';

  const sections = await enrichSectionRoles(
    options.workspaceRoot,
    parseSections(lines),
  );
  const adrSection = await parseAdrSection(options.workspaceRoot);

  return defineKnowledgeSystem({
    kind: options.kind ?? 'aleph-os-dynamic',
    version: options.version ?? '1.0.0',
    display: options.display ?? { singular: 'ALEPH OS', plural: 'ALEPH OS' },
    mission,
    markdownFirst,
    focusValues: ['overview', 'layers', 'modes', 'storage', 'mission'] as const,
    sections: adrSection ? [...sections, adrSection] : sections,
    storage: parseStorage(lines),
    modes: parseModes(lines),
    contract: options.contract,
  });
}

export function extractMarkdownLink(line: string): KnowledgeDocLink | null {
  const match = line.match(LINK_RE);
  if (!match) return null;
  return { label: match[1]!, path: match[2]! };
}
