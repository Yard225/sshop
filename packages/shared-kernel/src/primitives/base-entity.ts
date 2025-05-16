import { UniqueEntityID } from './unique-entity-id';
import { DomainEvent } from '../domain-events/domain-event.base';

export abstract class BaseEntity {
  public readonly id: UniqueEntityID;
  private domainEvents: DomainEvent[] = [];

  protected constructor(id?: UniqueEntityID) {
    this.id = id ?? new UniqueEntityID();
  }

  public addDomainEvent(event: DomainEvent) {
    this.domainEvents.push(event);
  }

  public clearDomainEvents() {
    this.domainEvents = [];
  }

  public getDomainEvents(): DomainEvent[] {
    return this.domainEvents;
  }
} 