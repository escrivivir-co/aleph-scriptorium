import { describe, expect, it } from 'bun:test';
import { parseComposeYaml } from './parser';
import { ComposeStack } from './stack';

const SAMPLE = `
services:
  mongo:
    image: mongo:7
    ports:
      - '27017:27017'
  graphql:
    build:
      context: .
      dockerfile: packages/graphql/Dockerfile
    ports:
      - '4000:4000'
    depends_on:
      mongo:
        condition: service_healthy
volumes:
  mongo_data:
`;

describe('compose-lang parser', () => {
  it('parses services, ports, build, depends_on and volumes without Docker', () => {
    const model = parseComposeYaml(SAMPLE, 'network-engine');
    expect(model.services).toHaveLength(2);
    expect(model.volumes).toHaveLength(1);

    const mongo = model.services.find((service) => (service.id as string) === 'mongo');
    expect(mongo?.image).toBe('mongo:7');
    expect(mongo?.ports[0]).toEqual({ host: '27017', container: '27017' });

    const graphql = model.services.find((service) => (service.id as string) === 'graphql');
    expect(graphql?.build?.dockerfile).toBe('packages/graphql/Dockerfile');
    expect(graphql?.dependsOn.map(String)).toEqual(['mongo']);
  });

  it('exposes compose://stack/* projection URIs', () => {
    const stack = ComposeStack.fromYaml(SAMPLE, 'network-engine')
      .setupConfig()
      .run('mongo')
      .logs('graphql')
      .debug('graphql');
    const projection = stack.toProjection();
    expect(projection.resources).toContain('compose://stack/network-engine');
    expect(projection.resources).toContain('compose://stack/network-engine/services/mongo');
    expect(projection.resources).toContain('compose://stack/network-engine/operations');
    expect(projection.resources).toContain('compose://stack/network-engine/phrases');
    expect(projection.resources).toContain('compose://stack/network-engine/debug-plan');
    expect(projection.resources).toContain('compose://stack/network-engine/runtime');
    expect(stack.getPlannedOperations().map((operation) => operation.kind)).toEqual([
      'setup-config',
      'run',
      'logs',
      'debug',
    ]);
  });

  it('rejects operation planning before a stack is loaded', () => {
    expect(() => new ComposeStack().run('mongo')).toThrow('Cannot plan operations before loading a stack');
  });
});
