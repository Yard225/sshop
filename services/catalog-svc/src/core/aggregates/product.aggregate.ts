import { BaseEntity, ProductSKU, UniqueEntityID } from '@org/shared-kernel';
import { Variant } from '../entities/variant.entity';
import { ProductDetailsUpdated } from '../events/product-details-updated.event';

type ProductProps = {
  name: string;
  description: string;
  variants: Variant[];
};

export class Product extends BaseEntity {
  constructor(
    public readonly id: UniqueEntityID,
    public readonly props: ProductProps,
    private _active: boolean = true,
  ) {
    super(id);
  }

  get productStatus(): boolean {
    return this._active;
  }

  set deactivate(active: boolean) {
    this._active = active;
  }

  static create(id: UniqueEntityID, props: ProductProps) {
    return new Product(id, props);
  }

  adjustStock(sku: ProductSKU, delta: number) {
    const variant = this.props.variants.find((v) => v.props.sku === sku);
    if (!variant) {
      throw new Error('Variant not found');
    }
    variant.adjustStock(delta);
  }

  updateDetails(name?: string, description?: string) {
    if (name) {
      this.props.name = name;
    }
    if (description) {
      this.props.description = description;
    }

    this.addDomainEvent(
      new ProductDetailsUpdated(
        this.props.id,
        this.props.name,
        this.props.description,
      ),
    );
  }
}
