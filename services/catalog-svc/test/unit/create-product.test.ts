import { InMemoryProductRepository } from '../../src/adapters/out/in-memory-product.repository';
import { CreateProductUseCase } from '../../src/core/use-cases/create-product.usecase';

describe('Feature: Create product', () => {
  let useCase: CreateProductUseCase;
  let repository: InMemoryProductRepository;

  beforeEach(() => {
    repository = new InMemoryProductRepository();
    useCase = new CreateProductUseCase(repository);
  });

  afterEach(async () => {});

  describe('Scenario: Happy Path', () => {
    const payload = {
      name: 'Camera X',
      description: '4K action cam',
    };
    it('Should create a new product with two variants and returns its id', async () => {
      const { productId } = await useCase.execute(payload);

      const result = await repository.findById(productId);
      expect(result).toBeDefined();
      expect(result!.props.name).toBe(payload.name);
      expect(result!.props.description).toBe(payload.description);
    });
  });
});
