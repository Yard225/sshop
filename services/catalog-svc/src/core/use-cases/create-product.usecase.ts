import { BaseUseCase, IRepository } from '@org/shared-kernel';
import { Product } from '../aggregates/product.aggregate';

type Request = {
  name: string;
  description: string;
};

type Response = void;

export class CreateProductUseCase extends BaseUseCase<Request, Response> {
  constructor(private readonly repository: IRepository<Product>) {
    super();
  }

  async execute(request: Request): Promise<Response> {}
}
