export abstract class DomainEvent<TPayload = any> {
  readonly occurredAt: Date;
  readonly payload: TPayload;
  readonly eventName: string;

  protected constructor(payload: TPayload, eventName?: string) {
    this.occurredAt = new Date();
    this.payload = payload;
    this.eventName = eventName ?? this.constructor.name;
  }
}
