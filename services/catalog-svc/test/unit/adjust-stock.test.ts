import { ProductSKU, Money, UniqueEntityID } from '@org/shared-kernel';
import { InMemoryProductRepository } from '../../src/adapters/out/in-memory-product.repository';
import { Product } from '../../src/core/aggregates/product.aggregate';
import { Variant } from '../../src/core/entities/variant.entity';
import { AdjustStockUseCase } from '../../src/core/use-cases/adjust-stock.usecase';

describe('Feature: Adjust stock', () => {
  const variant = Variant.create({
    sku: new ProductSKU('SKU-CAM123'),
    price: new Money(100, 'EUR'),
    stock: 10,
  });

  const uniqueId = new UniqueEntityID();

  const product = Product.create(uniqueId, {
    name: 'Camera X',
    description: 'Camera Haute définition',
    variants: [variant],
  });

  let repository: InMemoryProductRepository;
  let usecase: AdjustStockUseCase;

  beforeEach(() => {
    repository = new InMemoryProductRepository([product]);
    usecase = new AdjustStockUseCase(repository);
  });

  describe('Scenario: Happy Path', () => {
    const payload = {
      productId: uniqueId.toString(),
      sku: product.props.variants[0].props.sku,
      delta: -3,
    };

    it('should change stock level of an existing variant', async () => {
      await usecase.execute(payload);

      const updated = await repository.findById(product.id);
      expect(updated!.props.variants[0].stock).toBe(2);
    });
  });

  afterEach(() => {});
});
