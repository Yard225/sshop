
import { InMemoryOrderRepository } from '../../adapters/out/in-memory-order.repository';
import { FixedIdGenerator, ProductSKU } from '@org/shared-kernel';
import { AddItemToCartUseCase } from '../../core/usecase/add-item-to-cart.usecase';

describe('Feature: Add Item to cart', () => {
  let repository: InMemoryOrderRepository;
  let idGenerator: FixedIdGenerator;
  let usecase: AddItemToCartUseCase;

  beforeEach(() => {
    repository = new InMemoryOrderRepository();
    idGenerator = new FixedIdGenerator();
    usecase = new AddItemToCartUseCase(repository, idGenerator);
  });

  describe('Scenario: Happy Path', () => {
    const payload = {
      orderId: 'id-1',
      productId: ProductSKU.create('SKU-CAM123').toString(),
      qty: 1,
    };

    it('Should add a SKU with quantity 1 to a new order', async () => {
      await usecase.execute(payload);
      const order = await repository.findById('id-1'); //?

      expect(order!.props.items[0].props.productId.toString()).toBe('SKU-CAM123');
      expect(order!.props.items[0].props.qty).toBe(1);
    });
  });

  afterEach(async () => {});
});
