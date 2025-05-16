import { ProductSKU } from '@org/shared-kernel';
import { InMemoryOrderRepository } from '../../adapters/out/in-memory-order.repository';
import { FakeStockService } from '../../adapters/out/fake-stock.service';
import { Order } from '../../core/aggregates/order.aggregate';
import { CheckoutOrderUseCase } from '../../core/usecase/checkout-order.usecase';
import { InMemoryEventBus } from '../../adapters/out/in-memory-event-bus.repository';

describe('Feature: Checkout Order', () => {
  const order = new Order('order-007');
  order.addItem(ProductSKU.create('SKU-CAM123').toString(), 1);

  let eventBus: InMemoryEventBus;
  let fakeStockService: FakeStockService;
  let repository: InMemoryOrderRepository;
  let usecase: CheckoutOrderUseCase;

  beforeEach(() => {
    eventBus = new InMemoryEventBus();
    fakeStockService = new FakeStockService();
    repository = new InMemoryOrderRepository([order]);
    usecase = new CheckoutOrderUseCase(repository, fakeStockService);
  });

  describe('Scenario: Happy Path', () => {
    const payload = { orderId: order.id };

    it('should push OrderPlaced on EventBus', async () => {
      const { events } = await usecase.execute(payload);
      await eventBus.publishAll(events);
      expect(eventBus.lastEvent()?.name()).toBe('OrderPlaced');
    });
  });

  afterEach(async () => {});
});
