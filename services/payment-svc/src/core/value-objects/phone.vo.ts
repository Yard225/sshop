export class PhoneNumber {
  private constructor(private readonly value: string) {}
  static create(raw: string): PhoneNumber {
    if (!/^\+?\d{8,15}$/.test(raw)) {
      throw new Error('Invalid phone');
    }

    return new PhoneNumber(raw);
  }
  
  toString() {
    return this.value;
  }
}
