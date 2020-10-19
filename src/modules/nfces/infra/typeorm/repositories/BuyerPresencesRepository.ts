import { getRepository, Repository } from 'typeorm';

import IBuyerPresencesRepository from '@modules/nfces/repositories/IBuyerPresencesRepository';
import ICreateBuyerPresenceDTO from '@modules/nfces/dtos/ICreateBuyerPresenceDTO';

import BuyerPresence from '../entities/BuyerPresence';

class BuyerPresencesRepository implements IBuyerPresencesRepository {
  private ormRepository: Repository<BuyerPresence>;

  constructor() {
    this.ormRepository = getRepository(BuyerPresence);
  }

  public async findByCode(code: number): Promise<BuyerPresence | undefined> {
    const buyerPresence = await this.ormRepository.findOne({
      where: { code },
    });

    return buyerPresence;
  }

  public async create(
    buyerPresenceData: ICreateBuyerPresenceDTO,
  ): Promise<BuyerPresence> {
    const buyerPresence = this.ormRepository.create(buyerPresenceData);

    await this.ormRepository.save(buyerPresence);

    return buyerPresence;
  }
}

export default BuyerPresencesRepository;
