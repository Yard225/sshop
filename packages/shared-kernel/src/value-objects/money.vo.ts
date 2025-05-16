export class Money {
  readonly amount: number;
  readonly currency: string;

  constructor(amount: number, currency: string) {
    if (amount < 0) throw new Error('Le montant ne peut pas être négatif');
    if (!currency.match(/^[A-Z]{3}$/)) throw new Error('Devise invalide');
    this.amount = amount;
    this.currency = currency;
  }

  add(other: Money): Money {
    if (this.currency !== other.currency) throw new Error('Devise différente');
    return new Money(this.amount + other.amount, this.currency);
  }

  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }
} 