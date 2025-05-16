import { RepositoryBase, UniqueEntityID } from '@org/shared-kernel';
import { Product } from '../../core/aggregates/product.aggregate';

export class InMemoryProductRepository extends RepositoryBase<Product> {
  constructor(private readonly products: Product[] = []) {
    super();
  }

  async findById(id: UniqueEntityID): Promise<Product | null> {
    return this.products.find((product) => product.id.equals(id)) ?? null;
  }

  async findAll(): Promise<Product[]> {
    return this.products;
  }

  async save(product: Product): Promise<void> {
    this.products.push(product);
  }

  async update(product: Product): Promise<void> {
    const index = this.products.findIndex((p) => p.id.equals(product.id));
    if (index !== -1) {
      this.products[index] = product;
    }
  }

  async delete(id: UniqueEntityID): Promise<void> {
    this.products = this.products.filter((p) => !p.id.equals(id));
  }

  async findPaginated(page: number, limit: number): Promise<Product[]> {
    return this.products.slice((page - 1) * limit, page * limit);
  }

  async findByFilter(filter: Partial<Product>): Promise<Product[]> {
    return this.products.filter((product) => {
      return Object.keys(filter).every((key) => {
        return product[key as keyof Product] === filter[key as keyof Product];
      });
    });
  }
}
