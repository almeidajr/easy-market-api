import { getRepository, Repository } from 'typeorm';

import IIssuersRepository from '@modules/nfces/repositories/IIssuersRepository';
import ICreateIssuerDTO from '@modules/nfces/dtos/ICreateIssuerDTO';

import Issuer from '../entities/Issuer';

class IssuersRepository implements IIssuersRepository {
  private ormRepository: Repository<Issuer>;

  constructor() {
    this.ormRepository = getRepository(Issuer);
  }

  public async findByCnpj(cnpj: string): Promise<Issuer | undefined> {
    const issuer = await this.ormRepository.findOne({
      where: { cnpj },
    });

    return issuer;
  }

  public async create(issuerData: ICreateIssuerDTO): Promise<Issuer> {
    const issuer = this.ormRepository.create(issuerData);

    await this.ormRepository.save(issuer);

    return issuer;
  }
}

export default IssuersRepository;
