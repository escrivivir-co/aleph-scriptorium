import { io, Socket } from 'socket.io-client';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NetworkTransportEvent, PubSubConfig, isPublishable } from './types';
import { NetworkOrchestrator, LanguageSemantics, InferEvent } from '@network-engine/core';

export class PubSubBridge<TSemantics extends LanguageSemantics<any, any>> {
  private socket: Socket;
  private incomingSubject = new Subject<NetworkTransportEvent>();
  private internalSub?: Subscription;
  private externalSub?: Subscription;

  constructor(private config: PubSubConfig, private appId: string) {
    const url = config.namespace ? `${config.hubUrl}${config.namespace}` : config.hubUrl;
    this.socket = io(url, { autoConnect: false });

    this.socket.on('connect', () => {
      console.log(`[Bridge ${this.appId}] Connected to PubSub Hub at ${url}`);
    });

    this.socket.on('disconnect', () => {
      console.log(`[Bridge ${this.appId}] Disconnected from PubSub Hub`);
    });

    // Listen for incoming broadcasted events
    this.socket.on('network_event', (event: NetworkTransportEvent) => {
      // Avoid looping back our own events if broadcasted
      if (event.source !== this.appId) {
        this.incomingSubject.next(event);
      }
    });
  }

  public get incoming$(): Observable<NetworkTransportEvent> {
    return this.incomingSubject.asObservable();
  }

  public connect(orchestrator: NetworkOrchestrator<TSemantics>): void {
    this.socket.connect();

    // 1. Intercept all internal events and publish the marked ones
    this.internalSub = orchestrator.events$
      .pipe(filter(isPublishable))
      .subscribe((event) => {
        const transportEvent: NetworkTransportEvent = {
          type: event.type,
          payload: event.payload,
          timestamp: event.timestamp || Date.now(),
          source: this.appId,
        };
        // Emit to the hub
        this.socket.emit('network_event', transportEvent);
      });

    // 2. Listen to incoming external events and inject them into internal bus
    this.externalSub = this.incoming$.subscribe((transportEvent) => {
      // Cast the external event to the internal semantics.
      // In a real scenario, you might want schema validation here.
      const internalEvent = {
        type: transportEvent.type,
        payload: transportEvent.payload,
        timestamp: transportEvent.timestamp
      } as InferEvent<TSemantics>;

      orchestrator.dispatch(internalEvent);
    });
  }

  public disconnect(): void {
    this.internalSub?.unsubscribe();
    this.externalSub?.unsubscribe();
    this.socket.disconnect();
  }
}

export function createPubSubBridge<TSemantics extends LanguageSemantics<any, any>>(
  config: PubSubConfig,
  appId: string
): PubSubBridge<TSemantics> {
  return new PubSubBridge<TSemantics>(config, appId);
}
