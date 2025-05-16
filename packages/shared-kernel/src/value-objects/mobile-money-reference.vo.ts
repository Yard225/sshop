export class MobileMoneyReference {
  readonly value: string;

  constructor(value: string) {
    if (!/^[A-Z0-9\-]{6,32}$/.test(value)) {
      throw new Error('Référence Mobile Money invalide');
    }
    this.value = value;
  }

  equals(other: MobileMoneyReference): boolean {
    return this.value === other.value;
  }
} 