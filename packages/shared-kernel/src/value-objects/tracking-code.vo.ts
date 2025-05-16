export class TrackingCode {
  readonly value: string;

  constructor(value: string) {
    if (!/^[A-Z0-9]{8,32}$/.test(value)) {
      throw new Error('Code de suivi invalide');
    }
    this.value = value;
  }

  equals(other: TrackingCode): boolean {
    return this.value === other.value;
  }
} 