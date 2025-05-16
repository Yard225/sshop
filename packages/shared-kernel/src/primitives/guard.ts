export interface GuardResult {
  succeeded: boolean;
  message?: string;
}

export class Guard {
  public static againstNullOrUndefined(value: any, argumentName: string): GuardResult {
    if (value === null || value === undefined) {
      return { succeeded: false, message: `${argumentName} ne peut pas être null ou undefined` };
    }
    return { succeeded: true };
  }

  public static againstEmptyString(value: string, argumentName: string): GuardResult {
    if (value.trim().length === 0) {
      return { succeeded: false, message: `${argumentName} ne peut pas être une chaîne vide` };
    }
    return { succeeded: true };
  }
} 