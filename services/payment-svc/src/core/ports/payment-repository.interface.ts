import { PaymentTransaction } from '../aggregates/payment-transaction.aggregate';

export const I_PAYMENT_REPOSITORY = 'I_PAYMENT_REPOSITORY';

export interface IPaymentRepository {
  create(payment: PaymentTransaction): Promise<void>;
  findById(id: string): Promise<PaymentTransaction | null>;
  findAll(): Promise<PaymentTransaction[]>;
}
