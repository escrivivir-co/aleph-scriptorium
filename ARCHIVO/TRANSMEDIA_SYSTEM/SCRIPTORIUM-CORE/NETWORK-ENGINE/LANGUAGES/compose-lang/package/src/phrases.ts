import type { ComposeOperationKind, ServiceId } from './types';

export type ComposeVerb = 'setup' | 'run' | 'sleep' | 'logs' | 'debug';

export type Phrase<V extends ComposeVerb, S extends string = string> = V extends 'setup'
  ? 'stack.setup().validateConfig()'
  : V extends 'run'
    ? `stack.run('${S}').waitUntilHealthy()`
    : V extends 'sleep'
      ? `stack.sleep('${S}')`
      : V extends 'logs'
        ? `stack.logs('${S}').tail(${number})`
        : V extends 'debug'
          ? `stack.debug('${S}')`
          : never;

export type ComposeCommand =
  | { kind: 'setup-config' }
  | { kind: 'run'; serviceId: string }
  | { kind: 'sleep'; serviceId: string }
  | { kind: 'logs'; serviceId: string; tail: number }
  | { kind: 'debug'; serviceId: string };

export type CommandFor<P extends string> = P extends 'stack.setup().validateConfig()'
  ? { kind: 'setup-config' }
  : P extends `stack.run('${infer S}').waitUntilHealthy()`
    ? { kind: 'run'; serviceId: S }
    : P extends `stack.sleep('${infer S}')`
      ? { kind: 'sleep'; serviceId: S }
      : P extends `stack.logs('${infer S}').tail(${infer N extends number})`
        ? { kind: 'logs'; serviceId: S; tail: N }
        : P extends `stack.debug('${infer S}')`
          ? { kind: 'debug'; serviceId: S }
          : never;

export type SimulatePhrase =
  | 'stack.simulate().up()'
  | 'stack.simulate().down()'
  | `stack.simulate().tick(${number})`
  | `stack.predict().failure('${string}')`
  | 'stack.simulate().reset()';

const PHRASE_PATTERN =
  /^stack\.(setup\(\)\.validateConfig\(\)|run\('([^']+)'\)\.waitUntilHealthy\(\)|sleep\('([^']+)'\)|logs\('([^']+)'\)\.tail\((\d+)\)|debug\('([^']+)'\))$/;

export function compilePhrase<P extends Phrase<ComposeVerb, string>>(phrase: P): CommandFor<P> {
  return compilePhraseFromString(phrase) as CommandFor<P>;
}

export function compilePhraseFromString(phrase: string): ComposeCommand {
  const match = phrase.match(PHRASE_PATTERN);
  if (!match) {
    throw new Error(`[compose-lang] Unrecognized phrase: ${phrase}`);
  }

  if (phrase === 'stack.setup().validateConfig()') {
    return { kind: 'setup-config' };
  }
  if (match[2]) {
    return { kind: 'run', serviceId: match[2] };
  }
  if (match[3]) {
    return { kind: 'sleep', serviceId: match[3] };
  }
  if (match[4] && match[5]) {
    return { kind: 'logs', serviceId: match[4], tail: Number(match[5]) };
  }
  if (match[6]) {
    return { kind: 'debug', serviceId: match[6] };
  }

  throw new Error(`[compose-lang] Unrecognized phrase: ${phrase}`);
}

export function phraseForOperation(
  kind: ComposeOperationKind,
  serviceId?: ServiceId,
  tail = 50,
): string {
  switch (kind) {
    case 'setup-config':
      return 'stack.setup().validateConfig()';
    case 'run':
      return `stack.run('${serviceId as string}').waitUntilHealthy()`;
    case 'sleep':
      return `stack.sleep('${serviceId as string}')`;
    case 'logs':
      return `stack.logs('${serviceId as string}').tail(${tail})`;
    case 'debug':
      return `stack.debug('${serviceId as string}')`;
    default: {
      const _exhaustive: never = kind;
      return _exhaustive;
    }
  }
}
