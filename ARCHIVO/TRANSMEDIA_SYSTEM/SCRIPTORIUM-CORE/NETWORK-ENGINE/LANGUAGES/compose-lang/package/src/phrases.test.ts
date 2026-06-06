import { describe, expect, it } from 'bun:test';
import { compilePhrase, compilePhraseFromString, type CommandFor, type Phrase } from './phrases';

describe('compose-lang phrase compiler', () => {
  it('compiles setup phrase', () => {
    const phrase = 'stack.setup().validateConfig()' as Phrase<'setup'>;
    expect(compilePhrase(phrase)).toEqual({ kind: 'setup-config' });
  });

  it('compiles run phrase with inferred serviceId', () => {
    const phrase = "stack.run('mongo').waitUntilHealthy()" as Phrase<'run', 'mongo'>;
    expect(compilePhrase(phrase)).toEqual({ kind: 'run', serviceId: 'mongo' });
  });

  it('compiles logs phrase with tail', () => {
    const result = compilePhraseFromString("stack.logs('graphql').tail(50)");
    expect(result).toEqual({ kind: 'logs', serviceId: 'graphql', tail: 50 });
  });

  it('rejects unknown phrases', () => {
    expect(() => compilePhraseFromString('stack.unknown()')).toThrow('Unrecognized phrase');
  });

  it('satisfies CommandFor conditional mapping at compile time', () => {
    type RunCommand = CommandFor<"stack.run('mongo').waitUntilHealthy()">;
    const command: RunCommand = { kind: 'run', serviceId: 'mongo' };
    expect(command.serviceId).toBe('mongo');
  });
});
