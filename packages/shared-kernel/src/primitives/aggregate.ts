import { BaseEntity } from './base-entity';
import { UniqueEntityID } from './unique-entity-id';

export abstract class AggregateRoot<T = any> extends BaseEntity {
  protected constructor(id?: UniqueEntityID) {
    super(id);
  }

  // abstract pullEvents(): DomainEvent[];
}
