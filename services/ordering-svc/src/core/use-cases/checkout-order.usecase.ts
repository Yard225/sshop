import { BaseUseCase, DomainEvent } from '@org/shared-kernel';
import { IOrderRepository } from '../ports/order-repository.interface';
import { IStockService } from '../services/stock.service';

type Request = { orderId: string };

type Response = { events: DomainEvent[] };

export class CheckoutOrderUseCase extends BaseUseCase<Request, Response> {
  constructor(
    private readonly repository: IOrderRepository,
    private readonly stock: IStockService,
  ) {
    super();
  }

  async execute(request: Request): Promise<Response> {
    this.validateInput(request);

    const order = await this.repository.findById(request.orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    for (const item of order.props.items) {
      const isAvailable = await this.stock.isAvailable(item.props.productId, item.props.qty);

      if (!isAvailable) {
        throw new Error(`Insufficient stock for ${item.props.productId}`);
      }
    }

    order.checkout();

    await this.repository.create(order);

    return { events: order.pullEvents() };
  }
}
