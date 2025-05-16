import { BaseUseCase, ProductSKU } from '@org/shared-kernel';
import { IProductRepository } from '../ports/product.interface';

type Request = { productId: string; sku: ProductSKU; delta: number };

type Response = void;

export class AdjustStockUseCase extends BaseUseCase<Request, Response> {
  constructor(private readonly repository: IProductRepository) {
    super();
  }

  async execute(request: Request): Promise<Response> {
    this.validateInput(request);

    const product = await this.repository.findById(request.productId);
    if (!product) throw new Error('Product not found');

    product.adjustStock(request.sku, request.delta);
    await this.repository.create(product);
  }
}
