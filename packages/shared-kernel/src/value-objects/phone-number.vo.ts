export class PhoneNumber {
  readonly value: string;

  constructor(value: string) {
    if (!/^[0-9]{8,15}$/.test(value)) {
      throw new Error('Numéro de téléphone invalide');
    }
    this.value = value;
  }

  equals(other: PhoneNumber): boolean {
    return this.value === other.value;
  }
} 