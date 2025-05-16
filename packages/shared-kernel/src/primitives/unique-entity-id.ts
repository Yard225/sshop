import { v4 as uuidv4 } from 'uuid';

export class UniqueEntityID {
  private readonly _value: string;

  constructor(id?: string) {
    this._value = id ?? uuidv4();
  }

  toString() {
    return this._value;
  }

  equals(id?: UniqueEntityID): boolean {
    if (!id) return false;
    return id.toString() === this._value;
  }
} 