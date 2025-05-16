import { randomUUID } from 'crypto';

export class UniqueEntityID {
  private readonly _value: string;

  constructor(id?: string) {
    this._value = id ?? randomUUID();
  }

  toString() {
    return this._value;
  }

  equals(id?: UniqueEntityID): boolean {
    if (!id) return false;
    return id.toString() === this._value;
  }
} 