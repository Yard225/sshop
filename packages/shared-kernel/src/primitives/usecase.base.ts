export abstract class BaseUseCase<T, R> {
  abstract execute(request: T): Promise<R>;

  protected validateInput(request: T): void {
    if (!request) {
      throw new Error("Les données d'entrée sont requises");
    }
  }

  protected handleError(error: Error): never {
    // Logique de gestion d'erreur commune
    throw error;
  }
}
