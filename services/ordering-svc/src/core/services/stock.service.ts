export interface IStockService {
  isAvailable(sku: string, qty: number): Promise<boolean>;
}
