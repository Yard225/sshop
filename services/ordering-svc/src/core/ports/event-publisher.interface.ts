import { DomainEvent } from '@org/shared-kernel';

const I_EVENT_PUBLISHER = 'I_EVENT_PUBLISHER';

export interface IEventPublisher {
  publish(event: DomainEvent<any>): Promise<void>;
  publishAll(events: DomainEvent<any>[]): Promise<void>;
}
