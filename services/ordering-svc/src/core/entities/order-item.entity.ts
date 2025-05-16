type ItemProps = {
  readonly productId: string;
  qty: number;
};

export class OrderItem {
  constructor(public props: ItemProps) {}
}
