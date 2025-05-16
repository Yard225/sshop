import { DomainEvent } from '@org/shared-kernel';

export class OrderPlaced extends DomainEvent<{ orderId: string }> {
  name(): string {
    return 'OrderPlaced';
  }

  constructor(orderId: string) {
    super({ orderId });
  }
}
