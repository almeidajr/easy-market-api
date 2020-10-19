import { getRepository, Repository } from 'typeorm';

import INfcesRepository from '@modules/nfces/repositories/INfcesRepository';
import ICreateNfceDTO from '@modules/nfces/dtos/ICreateNfceDTO';

import Nfce from '../entities/Nfce';

class NfcesRepository implements INfcesRepository {
  private ormRepository: Repository<Nfce>;

  constructor() {
    this.ormRepository = getRepository(Nfce);
  }

  public async findByUrl(url: string): Promise<Nfce | undefined> {
    const nfce = await this.ormRepository.findOne({
      where: { sourceUrl: url },
    });

    return nfce;
  }

  public async create(nfceData: ICreateNfceDTO): Promise<Nfce> {
    const nfce = this.ormRepository.create(nfceData);

    await this.ormRepository.save(nfce);

    return nfce;
  }
}

export default NfcesRepository;
