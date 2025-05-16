import { DomainEvent } from '@org/shared-kernel';

export class ProductDetailsUpdated extends DomainEvent<{
  productId: string;
  name: string;
  description: string;
}> {
  name(): string {
    return 'ProductDetailsUpdated';
  }

  constructor(productId: string, name: string, description: string) {
    super({ productId, name, description });
  }
}
