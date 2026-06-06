import {
  ComposeBinding,
  ComposeService,
  ComposeStackModel,
  ComposeVolume,
  createServiceId,
  createStackId,
  createVolumeId,
} from './types';

type RawComposeFile = {
  services?: Record<string, RawService>;
  volumes?: Record<string, Record<string, unknown> | null>;
};

type RawService = {
  image?: string;
  build?: string | { context?: string; dockerfile?: string };
  ports?: Array<string | { target?: number; published?: number; protocol?: string }>;
  depends_on?: Record<string, { condition?: string }> | string[];
  environment?: string[] | Record<string, string>;
  healthcheck?: {
    test?: string | string[];
    interval?: string;
    timeout?: string;
    retries?: number;
    start_period?: string;
  };
};

function parsePortBinding(raw: string): ComposeBinding | undefined {
  const [host, container] = raw.split(':');
  if (!host || !container) return undefined;
  return { host, container };
}

function parseDependsOn(raw: RawService['depends_on']): ReturnType<typeof createServiceId>[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.map((name) => createServiceId(name));
  return Object.keys(raw).map((name) => createServiceId(name));
}

function parseEnvironment(raw: RawService['environment']): Record<string, string> {
  if (!raw) return {};
  if (Array.isArray(raw)) {
    return Object.fromEntries(
      raw.map((entry) => {
        const [key, ...rest] = entry.split('=');
        return [key ?? entry, rest.join('=')];
      }),
    );
  }
  return { ...raw };
}

function parseHealthcheckTest(test: string | string[] | undefined): string | undefined {
  if (!test) return undefined;
  return Array.isArray(test) ? test.join(' ') : test;
}

function parseService(id: string, raw: RawService): ComposeService {
  const ports: ComposeBinding[] = [];
  for (const entry of raw.ports ?? []) {
    if (typeof entry === 'string') {
      const binding = parsePortBinding(entry);
      if (binding) ports.push(binding);
    } else if (entry.published !== undefined && entry.target !== undefined) {
      ports.push({ host: String(entry.published), container: String(entry.target) });
    }
  }

  let build: ComposeService['build'];
  if (typeof raw.build === 'string') {
    build = { context: raw.build };
  } else if (raw.build) {
    build = {};
    if (raw.build.context !== undefined) build.context = raw.build.context;
    if (raw.build.dockerfile !== undefined) build.dockerfile = raw.build.dockerfile;
  }

  let healthcheck: ComposeService['healthcheck'];
  if (raw.healthcheck) {
    healthcheck = { test: parseHealthcheckTest(raw.healthcheck.test) ?? '' };
    if (raw.healthcheck.interval !== undefined) healthcheck.interval = raw.healthcheck.interval;
    if (raw.healthcheck.timeout !== undefined) healthcheck.timeout = raw.healthcheck.timeout;
    if (raw.healthcheck.retries !== undefined) healthcheck.retries = raw.healthcheck.retries;
    if (raw.healthcheck.start_period !== undefined) {
      healthcheck.startPeriod = raw.healthcheck.start_period;
    }
  }

  const service: ComposeService = {
    id: createServiceId(id),
    ports,
    dependsOn: parseDependsOn(raw.depends_on),
    environment: parseEnvironment(raw.environment),
  };
  if (raw.image !== undefined) service.image = raw.image;
  if (build !== undefined) service.build = build;
  if (healthcheck !== undefined) service.healthcheck = healthcheck;
  return service;
}

/**
 * Parse docker-compose YAML text into a typed stack model. Does not execute Docker.
 */
export function parseComposeYaml(yamlText: string, stackName: string): ComposeStackModel {
  const parsed = Bun.YAML.parse(yamlText) as RawComposeFile;
  const services = Object.entries(parsed.services ?? {}).map(([id, raw]) => parseService(id, raw));
  const volumes = Object.keys(parsed.volumes ?? {}).map((id) => ({ id: createVolumeId(id) }));

  return {
    id: createStackId(stackName),
    services,
    volumes,
  };
}
