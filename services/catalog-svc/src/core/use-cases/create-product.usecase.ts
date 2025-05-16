import { BaseUseCase } from '@org/shared-kernel';

type Request = {
  name: string;
  description: string;
  price: number;
  image: string;
};

type Response = void;

export class CreateProduct extends BaseUseCase<Request, Response> {
  async execute(request: Request): Promise<Response> {}
}
