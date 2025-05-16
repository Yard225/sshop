export class StockQuantity {
  private constructor(private _value: number) {}

  static create(initialQty: number): StockQuantity {
    if (!Number.isInteger(initialQty) || initialQty < 0) {
      throw new Error('Stock must be a non-negative integer');
    }
    return new StockQuantity(initialQty);
  }

  get value() {
    return this._value;
  }

  add(delta: number) {
    const next = this._value + delta;
    if (next < 0) throw new Error('Stock cannot become negative');
    this._value = next;
  }
}
