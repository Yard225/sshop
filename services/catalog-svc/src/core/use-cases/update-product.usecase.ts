import { BaseUseCase, IIDGenerator } from '@org/shared-kernel';
import { IProductRepository } from '../ports/product.interface';

type Request = {
  id: string;
  name?: string;
  description?: string;
};

type Response = void;

export class UpdateProductUseCase extends BaseUseCase<Request, Response> {
  constructor(
    private readonly repository: IProductRepository,
    private readonly idGenerator: IIDGenerator,
  ) {
    super();
  }

  async execute(request: Request): Promise<Response> {
    this.validateInput(request);

    const product = await this.repository.findById(request.id);

    product?.updateDetails(request.name, request.description);

    this.repository.update(product);
  }
}
