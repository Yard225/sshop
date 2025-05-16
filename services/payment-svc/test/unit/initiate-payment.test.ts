import { InMemoryPaymentRepository } from '../../adapters/out/in-memory-payment.repository';
import { InitiatePaymentUseCase } from '../../core/usecases/initiate-payment.usecase';

describe('Feature: InitiatePayment', () => {
  let repository: InMemoryPaymentRepository;
  let usecase: InitiatePaymentUseCase;

  beforeEach(() => {
    repository = new InMemoryPaymentRepository();
    usecase = new InitiatePaymentUseCase(repository);
  });

  describe('Scenario: Happy Path', () => {
    const payload = {
      orderId: 'order-007',
      amountCfa: 120_000,
      phone: '+2250700000000',
    };

    it('should create a PaymentTransaction in PENDING state', async () => {
      const result = await usecase.execute(payload);

      const saved = await repository.findById(result.paymentId);
      expect(saved!.props.status).toBe('PENDING');
      expect(saved!.props.orderId).toBe('order-007');
    });
  });

  afterEach(async () => {});
});
