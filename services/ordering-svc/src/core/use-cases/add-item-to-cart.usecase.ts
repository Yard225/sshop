import { BaseUseCase, IIDGenerator } from '@org/shared-kernel';
import { Order } from '../aggregates/order.aggregate';
import { IOrderRepository } from '../ports/order-repository.interface';
import { OrderItem } from '../entities/order-item.entity';

type Request = {
  orderId: string;
  productId: string;
  qty: number;
};

type Response = void;

export class AddItemToCartUseCase extends BaseUseCase<Request, Response> {
  constructor(
    private readonly repository: IOrderRepository,
    private readonly idGenerator: IIDGenerator,
  ) {
    super();
  }

  async execute(request: Request): Promise<Response> {
    this.validateInput(request);

    let order = await this.repository.findById(request.orderId);

    if (!order) {
      const orderId = this.idGenerator.generate();

      order = new Order({
        id: orderId,
        items: [
          new OrderItem({
            productId: request.productId,
            qty: request.qty,
          }),
        ],
        status: 'CART'
      });
    } else {
      order.addItem(request.productId, request.qty);
    }

    await this.repository.create(order);
  }
}
