import { BaseUseCase, DomainEvent } from '@org/shared-kernel';
import { IPaymentRepository } from '../ports/payment-repository.interface';

type Request = { paymentId: string; externalRef: string };

type Response = { events: DomainEvent[] };

export class ConfirmPaymentUseCase extends BaseUseCase<Request, Response> {
  constructor(private readonly repository: IPaymentRepository) {
    super();
  }

  async execute(request: Request): Promise<Response> {
    this.validateInput(request);

    const payment = await this.repository.findById(request.paymentId);

    if (!payment) {
      this.handleError(new Error('Payment not found'));
    }

    payment.confirm(request.externalRef);

    await this.repository.create(payment);

    return { events: payment.pullEvents() };
  }
}
