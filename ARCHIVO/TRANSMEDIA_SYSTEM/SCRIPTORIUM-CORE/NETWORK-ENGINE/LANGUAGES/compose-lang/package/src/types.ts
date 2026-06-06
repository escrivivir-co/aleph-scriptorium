import { CoreEventBase, LanguageSemantics } from '@network-engine/core';

export type StackId = string & { readonly __brand: unique symbol };
export type ServiceId = string & { readonly __brand: unique symbol };
export type VolumeId = string & { readonly __brand: unique symbol };

export function createStackId(id: string): StackId {
  return id as StackId;
}

export function createServiceId(id: string): ServiceId {
  return id as ServiceId;
}

export function createVolumeId(id: string): VolumeId {
  return id as VolumeId;
}

export interface ComposeBinding {
  host: string;
  container: string;
}

export interface ComposeService {
  id: ServiceId;
  image?: string;
  build?: { context?: string; dockerfile?: string };
  ports: ComposeBinding[];
  dependsOn: ServiceId[];
  environment: Record<string, string>;
  healthcheck?: {
    test: string;
    interval?: string;
    timeout?: string;
    retries?: number;
    startPeriod?: string;
  };
}

export interface ComposeVolume {
  id: VolumeId;
}

export interface ComposeStackModel {
  id: StackId;
  services: ComposeService[];
  volumes: ComposeVolume[];
}

export type ComposeOperationKind = 'setup-config' | 'run' | 'sleep' | 'logs' | 'debug';

export interface ComposeOperationPlan {
  kind: ComposeOperationKind;
  phrase: string;
  description: string;
  serviceId?: ServiceId;
  readonly: true;
}

export type ServiceRuntimeState =
  | 'defined'
  | 'starting'
  | 'waitingHealth'
  | 'healthy'
  | 'failed'
  | 'stopping'
  | 'stopped';

export interface RuntimeTransition {
  at: number;
  serviceId: ServiceId;
  from: ServiceRuntimeState;
  to: ServiceRuntimeState;
  cause: string;
}

export type ComposeContext = {
  stack?: ComposeStackModel;
  focusedServiceId?: ServiceId;
  plannedOperations: ComposeOperationPlan[];
  loadedAt?: number;
  serviceStates: Record<string, ServiceRuntimeState>;
  serviceStartedAt: Record<string, number>;
  healthcheckAttempts: Record<string, number>;
  virtualClockMs: number;
  predictedFailures: ServiceId[];
  timeline: RuntimeTransition[];
  simulationActive: boolean;
};

export type ComposeEvent =
  | CoreEventBase<'LOAD_STACK', { stack: ComposeStackModel }>
  | CoreEventBase<'INSPECT_SERVICE', { serviceId: ServiceId }>
  | CoreEventBase<'PLAN_OPERATION', { plan: ComposeOperationPlan }>
  | CoreEventBase<'SIMULATE_UP', Record<string, never>>
  | CoreEventBase<'SIMULATE_DOWN', Record<string, never>>
  | CoreEventBase<'SIMULATE_TICK', { ms: number }>
  | CoreEventBase<'SIMULATE_INJECT_FAILURE', { serviceId: ServiceId }>
  | CoreEventBase<'SIMULATE_RESET', Record<string, never>>
  | CoreEventBase<'SIMULATE_START_SERVICE', { serviceId: ServiceId }>
  | CoreEventBase<'SIMULATE_STOP_SERVICE', { serviceId: ServiceId }>;

export type ComposeSemantics = LanguageSemantics<ComposeContext, ComposeEvent>;

export type ExecutionMode = 'simulated' | 'live';

export type Execution<Mode extends ExecutionMode> = {
  readonly __mode: Mode;
};

export type ExecutionResult<Mode extends ExecutionMode> = {
  mode: Mode;
  virtualClockMs: number;
  serviceStates: Record<string, ServiceRuntimeState>;
};

export interface LogLine {
  serviceId: ServiceId;
  text: string;
  at: number;
}
