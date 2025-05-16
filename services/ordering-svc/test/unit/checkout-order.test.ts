import { ProductSKU } from '@org/shared-kernel';
import { InMemoryOrderRepository } from '../../adapters/out/in-memory-order.repository';
import { Order } from '../../core/aggregates/order.aggregate';
import { FakeStockService } from '../../adapters/out/fake-stock.service';
import { CheckoutOrderUseCase } from '../../core/usecase/checkout-order.usecase';
import { OrderItem } from '../../core/entities/order-item.entity';

describe('Feature: CheckoutOrder', () => {
  const checkoutOrder = new Order({
    id: 'id-1',
    items: [
      new OrderItem({
        productId: ProductSKU.create('SKU-CAM123').toString(),
        qty: 1,
      }),
    ],
    status: 'CART',
  });

  let fakeStockService: FakeStockService;
  let repository: InMemoryOrderRepository;
  let useCase: CheckoutOrderUseCase;

  beforeEach(() => {
    fakeStockService = new FakeStockService(true);
    repository = new InMemoryOrderRepository([checkoutOrder]);
    useCase = new CheckoutOrderUseCase(repository, fakeStockService);
  });

  describe('Scenario: Happy Path', () => {
    const payload = { orderId: checkoutOrder.id };

    it('should checkout an order and emit OrderPlaced event', async () => {
      const result = await useCase.execute(payload);
      const order = await repository.findById(checkoutOrder.id);
      console.log(order);

      expect(order!.props.status).toBe('PLACED');
      expect(result.events.some((event) => event.name() === 'OrderPlaced')).toBe(true);
    });
  });

  afterEach(async () => {});
});
