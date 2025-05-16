import { InMemoryEventBus } from '../../../../ordering-svc/src/adapters/out/in-memory-event-bus.repository';
import { OrderPlaced } from '../../../../ordering-svc/src/core/events/order-placed.event';
import { InMemoryPaymentRepository } from '../../adapters/out/in-memory-payment.repository';
import { InitiatePaymentUseCase } from '../../core/usecases/initiate-payment.usecase';
import { OrderPlacedListener } from '../../adapters/in/order-placed.listener';

describe('Feature: EventBus → OrderPlacedListener', () => {
  const event = new OrderPlaced('order-123'); // publier l'événement

  let eventBus: InMemoryEventBus;
  let repository: InMemoryPaymentRepository;
  let usecase: InitiatePaymentUseCase;

  beforeEach(() => {
    eventBus = new InMemoryEventBus();
    repository = new InMemoryPaymentRepository();
    usecase = new InitiatePaymentUseCase(repository);
    new OrderPlacedListener(eventBus, usecase); // brancher le listener
  });

  describe('Scenario: Happy Path', () => {
    it('persists a PENDING payment transaction when OrderPlaced is received', async () => {
      await eventBus.publish(event);
      const payments = await repository.findAll();

      expect(payments.length).toBe(1);
      expect(payments[0].props.orderId).toBe('order-123');
      expect(payments[0].props.status).toBe('PENDING');
    });
  });

  afterEach(async () => {});
});
