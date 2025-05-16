export class Address {
  readonly street: string;
  readonly city: string;
  readonly country: string;
  readonly postalCode: string;

  constructor(street: string, city: string, country: string, postalCode: string) {
    if (!street || !city || !country || !postalCode) {
      throw new Error('Adresse incomplète');
    }
    this.street = street;
    this.city = city;
    this.country = country;
    this.postalCode = postalCode;
  }

  equals(other: Address): boolean {
    return (
      this.street === other.street &&
      this.city === other.city &&
      this.country === other.country &&
      this.postalCode === other.postalCode
    );
  }
} 