import { getRepository, Repository } from 'typeorm';

import IPurchasesRepository from '@modules/nfces/repositories/IPurchasesRepository';
import ICreatePurchaseDTO from '@modules/nfces/dtos/ICreatePurchaseDTO';

import Purchase from '../entities/Purchase';

class PurchasesRepository implements IPurchasesRepository {
  private ormRepository: Repository<Purchase>;

  constructor() {
    this.ormRepository = getRepository(Purchase);
  }

  public async createMany(
    purchaseData: ICreatePurchaseDTO[],
  ): Promise<Purchase[]> {
    const purchases = this.ormRepository.create(purchaseData);

    await this.ormRepository.save(purchases);

    return purchases;
  }
}

export default PurchasesRepository;
