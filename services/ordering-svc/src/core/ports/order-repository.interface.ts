import { Order } from '../aggregates/order.aggregate';

const I_ORDER_REPOSITORY = 'I_ORDER_REPOSITORY';

export interface IOrderRepository {
  findById(id: string): Promise<Order | null>;
  create(order: Order): Promise<void>;
}
