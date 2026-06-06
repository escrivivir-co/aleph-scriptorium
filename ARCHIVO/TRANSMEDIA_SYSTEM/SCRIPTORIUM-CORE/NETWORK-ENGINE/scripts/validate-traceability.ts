#!/usr/bin/env bun
/**
 * Validates conceptual ↔ physical traceability:
 * - packages/ vs ECOSYSTEM.md Matriz de Trazabilidad
 * - LAYER_1 / LAYER_3 doc links referenced by the matrix
 * - package.json exports vs subpaths mentioned in INSTRUCTIONS
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PACKAGES_DIR = join(ROOT, 'packages');
const ECOSYSTEM_PATH = join(ROOT, 'INSTRUCTIONS/LAYER_1/ECOSYSTEM.md');
const LAYER_1_DIR = join(ROOT, 'INSTRUCTIONS/LAYER_1');
const INSTRUCTIONS_DIR = join(ROOT, 'INSTRUCTIONS');

/** Subpaths mentioned as future work in INSTRUCTIONS but not yet in package.json exports */
const ASPIRATIONAL_SUBPATHS: Record<string, string[]> = {
  core: ['/contracts'],
};

interface MatrixEntry {
  package: string;
  concept: string;
  layer1Link: string | null;
  layer3Link: string | null;
}

interface PackageManifest {
  name: string;
  exports: string[];
}

function extractMarkdownLink(cell: string): string | null {
  const trimmed = cell.trim();
  if (trimmed === '—' || trimmed === '-') return null;
  const match = trimmed.match(/\[.*?\]\((.*?)\)/);
  return match?.[1] ?? null;
}

function parseMatrix(content: string): MatrixEntry[] {
  const lines = content.split('\n');
  const entries: MatrixEntry[] = [];
  let inTable = false;

  for (const line of lines) {
    if (line.startsWith('### Paquetes del monorepo')) {
      inTable = true;
      continue;
    }
    if (inTable && line.startsWith('### ')) break;
    if (!inTable || !line.startsWith('| `')) continue;

    const cols = line
      .split('|')
      .map((c) => c.trim())
      .filter(Boolean);
    if (cols.length < 5) continue;

    const pkg = cols[0]!.replace(/`/g, '');
    entries.push({
      package: pkg,
      concept: cols[1]!,
      layer1Link: extractMarkdownLink(cols[2]!),
      layer3Link: extractMarkdownLink(cols[3]!),
    });
  }

  return entries;
}

function resolveLayer1Doc(link: string): string {
  if (link.startsWith('../')) {
    return resolve(LAYER_1_DIR, link);
  }
  return join(LAYER_1_DIR, link);
}

function getPhysicalPackages(): string[] {
  return readdirSync(PACKAGES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(join(PACKAGES_DIR, d.name, 'package.json')))
    .map((d) => d.name)
    .sort();
}

function normalizeExportKeys(exportsField: unknown, main?: string): string[] {
  if (exportsField == null) {
    return main ? ['.'] : [];
  }
  if (typeof exportsField === 'string') return ['.'];
  if (typeof exportsField === 'object' && exportsField !== null) {
    return Object.keys(exportsField).sort();
  }
  return [];
}

function readManifest(dirName: string): PackageManifest {
  const raw = JSON.parse(readFileSync(join(PACKAGES_DIR, dirName, 'package.json'), 'utf-8')) as {
    name?: string;
    exports?: unknown;
    main?: string;
  };
  return {
    name: raw.name ?? dirName,
    exports: normalizeExportKeys(raw.exports, raw.main),
  };
}

function walkMarkdownFiles(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walkMarkdownFiles(full, acc);
    else if (entry.name.endsWith('.md')) acc.push(full);
  }
  return acc;
}

function findDocumentedSubpaths(packageDir: string): Set<string> {
  const scoped = `@network-engine/${packageDir}`;
  const escaped = scoped.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`${escaped}(/[\\w./-]+)?`, 'g');
  const subpaths = new Set<string>(['.']);

  for (const file of walkMarkdownFiles(INSTRUCTIONS_DIR)) {
    const content = readFileSync(file, 'utf-8');
    for (const match of content.matchAll(pattern)) {
      const suffix = match[1] ?? '';
      subpaths.add(suffix === '' ? '.' : suffix.startsWith('/') ? suffix : `/${suffix}`);
    }
  }

  return subpaths;
}

function exportKeyToSubpath(key: string): string {
  return key === '.' ? '.' : key.startsWith('./') ? key.slice(1) : key;
}

function formatSubpath(subpath: string): string {
  return subpath === '.' ? '(main)' : subpath;
}

type Issue = { kind: string; message: string };

function main(): number {
  const issues: Issue[] = [];
  const ecosystem = readFileSync(ECOSYSTEM_PATH, 'utf-8');
  const matrix = parseMatrix(ecosystem);
  const matrixPackages = new Set(matrix.map((e) => e.package));
  const physical = getPhysicalPackages();

  console.log('=== Traceability validation ===\n');
  console.log(`ECOSYSTEM matrix entries: ${matrix.length}`);
  console.log(`Physical packages:        ${physical.length}\n`);

  // Orphans: in packages/ but not in matrix
  const orphans = physical.filter((p) => !matrixPackages.has(p));
  if (orphans.length > 0) {
    for (const pkg of orphans) {
      issues.push({ kind: 'orphan', message: `Package "${pkg}" exists in packages/ but is missing from ECOSYSTEM.md matrix` });
    }
  } else {
    console.log('✓ No orphan packages (all packages/ entries are in the matrix)\n');
  }

  // Phantoms: in matrix but no physical package
  const phantoms = [...matrixPackages].filter((p) => !physical.includes(p)).sort();
  if (phantoms.length > 0) {
    for (const pkg of phantoms) {
      issues.push({ kind: 'phantom', message: `Matrix entry "${pkg}" has no packages/${pkg}/ directory` });
    }
  } else {
    console.log('✓ No phantom matrix entries (all matrix rows have a physical package)\n');
  }

  // Doc gaps: broken LAYER_1 / LAYER_3 links
  console.log('--- Documentation links (matrix) ---');
  for (const entry of matrix) {
    if (entry.layer1Link) {
      const resolved = resolveLayer1Doc(entry.layer1Link);
      if (!existsSync(resolved)) {
        issues.push({
          kind: 'doc-gap',
          message: `${entry.package}: LAYER_1 link missing — ${entry.layer1Link} → ${resolved}`,
        });
        console.log(`✗ ${entry.package} LAYER_1: ${entry.layer1Link} (missing)`);
      } else {
        console.log(`✓ ${entry.package} LAYER_1: ${entry.layer1Link}`);
      }
    } else {
      console.log(`· ${entry.package} LAYER_1: —`);
    }

    if (entry.layer3Link) {
      const resolved = resolve(LAYER_1_DIR, entry.layer3Link);
      if (!existsSync(resolved)) {
        issues.push({
          kind: 'doc-gap',
          message: `${entry.package}: LAYER_3 link missing — ${entry.layer3Link} → ${resolved}`,
        });
        console.log(`✗ ${entry.package} LAYER_3: ${entry.layer3Link} (missing)`);
      } else {
        console.log(`✓ ${entry.package} LAYER_3: ${entry.layer3Link}`);
      }
    } else {
      console.log(`· ${entry.package} LAYER_3: — (intentional or pending)`);
    }
  }

  // Export audit
  console.log('\n--- Export surface audit (package.json vs INSTRUCTIONS) ---');
  for (const pkg of physical) {
    const manifest = readManifest(pkg);
    const documented = findDocumentedSubpaths(pkg);
    const actual = new Set(manifest.exports.map(exportKeyToSubpath));

    const undocumented = [...actual].filter((e) => !documented.has(e));
    const aspirational = new Set(ASPIRATIONAL_SUBPATHS[pkg] ?? []);
    const documentedNotExported = [...documented].filter(
      (e) => e !== '.' && !actual.has(e) && !aspirational.has(e),
    );

    console.log(`\n${manifest.name} (${pkg}/)`);
    console.log(`  exports: ${manifest.exports.length ? manifest.exports.join(', ') : '(main only / none)'}`);

    if (undocumented.length > 0) {
      for (const sub of undocumented) {
        const msg = `${pkg}: export ${formatSubpath(sub)} not referenced in INSTRUCTIONS`;
        issues.push({ kind: 'export-undocumented', message: msg });
        console.log(`  ✗ undocumented export: ${formatSubpath(sub)}`);
      }
    }
    if (documentedNotExported.length > 0) {
      for (const sub of documentedNotExported) {
        const msg = `${pkg}: INSTRUCTIONS reference ${formatSubpath(sub)} but package.json has no export`;
        issues.push({ kind: 'export-missing', message: msg });
        console.log(`  ✗ documented but not exported: ${formatSubpath(sub)}`);
      }
    }
    const aspirationalListed = [...aspirational].filter((e) => documented.has(e));
    if (aspirationalListed.length > 0) {
      for (const sub of aspirationalListed) {
        console.log(`  · aspirational (documented, not exported yet): ${formatSubpath(sub)}`);
      }
    }
    if (undocumented.length === 0 && documentedNotExported.length === 0) {
      console.log('  ✓ exports align with INSTRUCTIONS references');
    }
  }

  // Summary
  console.log('\n=== Summary ===');
  if (issues.length === 0) {
    console.log('All checks passed.');
    return 0;
  }

  const byKind = issues.reduce<Record<string, number>>((acc, i) => {
    acc[i.kind] = (acc[i.kind] ?? 0) + 1;
    return acc;
  }, {});
  for (const [kind, count] of Object.entries(byKind)) {
    console.log(`  ${kind}: ${count}`);
  }
  console.log('\nIssues:');
  for (const issue of issues) {
    console.log(`  [${issue.kind}] ${issue.message}`);
  }
  return 1;
}

process.exit(main());
