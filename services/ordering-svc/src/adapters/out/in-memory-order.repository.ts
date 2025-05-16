import { Order } from '../../core/aggregates/order.aggregate';
import { IOrderRepository } from '../../core/ports/order-repository.interface';

export class InMemoryOrderRepository implements IOrderRepository {
  constructor(public readonly database: Order[] = []) {}

  async findById(id: string): Promise<Order | null> {
    return this.findByIdSync(id);
  }

  findByIdSync(id: string): Order | null {
    return this.database.find((order) => order.id === id) ?? null;
  }

  async create(order: Order): Promise<void> {
    this.database.push(order);
  }
}
