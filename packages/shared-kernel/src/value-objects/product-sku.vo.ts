export class ProductSKU {
  readonly value: string;

  constructor(value: string) {
    if (!/^[A-Z0-9\-]{4,32}$/.test(value)) {
      throw new Error('SKU invalide');
    }
    this.value = value;
  }

  equals(other: ProductSKU): boolean {
    return this.value === other.value;
  }
} 