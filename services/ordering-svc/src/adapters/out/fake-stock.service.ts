import { IStockService } from '../../core/services/stock.service';

export class FakeStockService implements IStockService {
  constructor(private readonly alwaysAvailable = true) {}
  
  async isAvailable(_: string, __: number) {
    return this.alwaysAvailable;
  }
}
