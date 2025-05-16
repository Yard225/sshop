import { IPaymentRepository } from '../ports/payment-repository.interface';
import { PaymentTransaction } from '../aggregates/payment-transaction.aggregate';
import { v4 as uuid } from 'uuid';
import { PhoneNumber } from '../value-objects/phone.vo';
import { BaseUseCase } from '@org/shared-kernel';

type Request = { orderId: string; amountCfa: number; phone: string };

type Response = { paymentId: string };

export class InitiatePaymentUseCase extends BaseUseCase<Request, Response> {
  constructor(private readonly repository: IPaymentRepository) {
    super();
  }

  async execute(request: Request): Promise<Response> {
    this.validateInput(request);
    
    const msisdn = PhoneNumber.create(request.phone);

    const transaction = new PaymentTransaction({
      id: uuid(),
      orderId: request.orderId,
      amountCfa: request.amountCfa,
      msisdn: msisdn.toString(),
    });

    await this.repository.create(transaction);

    return { paymentId: transaction.props.id };
  }
}
