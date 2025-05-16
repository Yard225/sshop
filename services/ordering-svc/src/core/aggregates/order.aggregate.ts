import { Aggregate } from '@org/shared-kernel';
import { OrderItem } from '../entities/order-item.entity';
import { OrderPlaced } from '../events/order-placed.event';

export type OrderStatus = 'CART' | 'PLACED';

type OrderProps = {
  readonly id: string;
  readonly items: OrderItem[];
  readonly status: OrderStatus;
};

export class Order extends Aggregate<OrderProps> {
  private domainEvents: OrderPlaced[] = [];

  constructor(props: OrderProps) {
    super({
      ...props,
      items: props.items || [],
      status: props.status || 'CART',
    });
  }

  addItem(sku: string, qty: number): void {
    const existing = this.props.items.find((item) => item.props.productId === sku);

    if (existing) {
      existing.props.qty += qty;
    } else {
      this.props.items.push(new OrderItem({ productId: sku, qty }));
    }
  }

  checkout(): void {
    if (this.props.items.length === 0) {
      throw new Error('Empty cart');
    }

    if (this.props.status !== 'CART') {
      throw new Error('Order already processed');
    }

    this.update({ ...this.props, status: 'PLACED' });
    this.domainEvents.push(new OrderPlaced(this.id));
  }

  pullEvents() {
    const event = [...this.domainEvents];
    this.domainEvents = [];
    return event;
  }
}
