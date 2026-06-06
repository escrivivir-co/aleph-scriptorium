import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

export interface ReclaimPortResult {
  reclaimed: boolean;
  killedPids: number[];
  skippedPids: number[];
}

async function findListeningPidsWindows(port: number): Promise<number[]> {
  const { stdout } = await execFileAsync('netstat', ['-ano'], { windowsHide: true });
  const suffix = `:${port}`;
  const pids = new Set<number>();

  for (const line of stdout.split(/\r?\n/)) {
    if (!line.includes('LISTENING') || !line.includes(suffix)) continue;
    const parts = line.trim().split(/\s+/);
    const pid = Number.parseInt(parts[parts.length - 1] ?? '', 10);
    if (Number.isFinite(pid) && pid > 0) pids.add(pid);
  }

  return [...pids];
}

async function findListeningPidsUnix(port: number): Promise<number[]> {
  try {
    const { stdout } = await execFileAsync('lsof', ['-iTCP:' + String(port), '-sTCP:LISTEN', '-t'], {
      windowsHide: true,
    });
    return stdout
      .split(/\r?\n/)
      .map((line) => Number.parseInt(line.trim(), 10))
      .filter((pid) => Number.isFinite(pid) && pid > 0);
  } catch {
    return [];
  }
}

export async function findListeningPids(port: number): Promise<number[]> {
  if (process.platform === 'win32') {
    return findListeningPidsWindows(port);
  }
  return findListeningPidsUnix(port);
}

async function killPid(pid: number): Promise<boolean> {
  try {
    if (process.platform === 'win32') {
      await execFileAsync('taskkill', ['/PID', String(pid), '/F'], { windowsHide: true });
    } else {
      await execFileAsync('kill', ['-9', String(pid)], { windowsHide: true });
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Stops foreign processes listening on `port` (never kills `process.pid`).
 * Use before bind when a prior dev server was left orphaned after Ctrl+C.
 */
export async function reclaimPort(port: number): Promise<ReclaimPortResult> {
  const listeners = await findListeningPids(port);
  const killedPids: number[] = [];
  const skippedPids: number[] = [];

  for (const pid of listeners) {
    if (pid === process.pid) {
      skippedPids.push(pid);
      continue;
    }
    if (await killPid(pid)) {
      killedPids.push(pid);
    }
  }

  if (killedPids.length > 0) {
    await new Promise((resolve) => setTimeout(resolve, 150));
  }

  return {
    reclaimed: killedPids.length > 0,
    killedPids,
    skippedPids,
  };
}
