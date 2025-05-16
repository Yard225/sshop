import { IEventPublisher } from '../../core/ports/event-publisher.interface';
import { DomainEvent } from '@org/shared-kernel';

type Handler = (event: DomainEvent<any>) => Promise<void>;

export class InMemoryEventBus implements IEventPublisher {
  private readonly events: DomainEvent<any>[] = [];
  private readonly handlers: Handler[] = [];

  async publish(event: DomainEvent<any>) {
    this.events.push(event);
    await Promise.all(this.handlers.map((handle) => handle(event)));
  }

  async publishAll(events: DomainEvent<any>[]) {
    for (const event of events) {
      await this.publish(event);
    }
  }

  subscribe(handler: Handler): void {
    this.handlers.push(handler);
  }

  lastEvent() {
    return this.events[this.events.length - 1];
  }
}
