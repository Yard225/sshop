import { Money, ProductSKU } from '@org/shared-kernel';
import { StockQuantity } from '../value-objects/stock-quantity.vo';

type VariantProps = {
  sku: ProductSKU;
  price: Money;
  _stock: StockQuantity;
};

export class Variant {
  constructor(public readonly props: VariantProps) {}

  static create(props: { sku: ProductSKU; price: Money; stock: number }) {
    return new Variant({
      sku: props.sku,
      price: props.price,
      _stock: StockQuantity.create(props.stock),
    });
  }

  get stock() {
    return this.props._stock.value;
  }

  adjustStock(delta: number) {
    this.props._stock.add(delta);
  }
}
