import { InMemoryPaymentRepository } from '../../adapters/out/in-memory-payment.repository';
import { ConfirmPaymentUseCase } from '../../core/usecases/confirm-payment.usecase';
import { InitiatePaymentUseCase } from '../../core/usecases/initiate-payment.usecase';

describe('Feature: ConfirmPaymentUseCase', () => {
  let repository: InMemoryPaymentRepository;
  let initiateUseCase: InitiatePaymentUseCase;
  let confirmUseCase: ConfirmPaymentUseCase;

  beforeEach(() => {
    repository = new InMemoryPaymentRepository();
    initiateUseCase = new InitiatePaymentUseCase(repository);
    confirmUseCase = new ConfirmPaymentUseCase(repository);
  });

  describe('Scenario: Happy Path', () => {
    const payload = {
      orderId: 'order-123',
      amountCfa: 120_000,
      phone: '+2250700000000',
    };
    it('sets status to CONFIRMED and returns PaymentConfirmed event', async () => {
      // ‣ GIVEN a pending transaction created by InitiatePayment
      const { paymentId } = await initiateUseCase.execute(payload);

      // ‣ WHEN the mobile-money provider calls our callback
      const { events } = await confirmUseCase.execute({
        paymentId,
        externalRef: 'MM-TXN-42',
      });

      // ‣ THEN the transaction is CONFIRMED and event emitted
      const saved = await repository.findById(paymentId);
      expect(saved!.props.status).toBe('CONFIRMED');
      expect(events.length).toBe(1);
      expect(events[0].name()).toBe('PaymentConfirmed');
      expect(events[0].payload.paymentId).toBe(paymentId);
    });
  });

  afterEach(async () => {});
});
