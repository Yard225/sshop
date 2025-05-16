import { DomainEvent } from '@org/shared-kernel';

export class PaymentConfirmed extends DomainEvent<{ paymentId: string; orderId: string }> {
  name(): string {
    return 'PaymentConfirmed';
  }

  constructor(paymentId: string, orderId: string) {
    super({ paymentId, orderId });
  }
}
