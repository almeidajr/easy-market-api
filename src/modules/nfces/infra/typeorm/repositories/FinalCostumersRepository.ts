import { getRepository, Repository } from 'typeorm';

import IFinalCostumersRepository from '@modules/nfces/repositories/IFinalCostumersRepository';
import ICreateFinalCostumerDTO from '@modules/nfces/dtos/ICreateFinalCostumerDTO';

import FinalCostumer from '../entities/FinalCostumer';

class FinalCostumersRepository implements IFinalCostumersRepository {
  private ormRepository: Repository<FinalCostumer>;

  constructor() {
    this.ormRepository = getRepository(FinalCostumer);
  }

  public async findByCode(code: number): Promise<FinalCostumer | undefined> {
    const finalCostumer = await this.ormRepository.findOne({
      where: { code },
    });

    return finalCostumer;
  }

  public async create(
    finalCostumerData: ICreateFinalCostumerDTO,
  ): Promise<FinalCostumer> {
    const finalCostumer = this.ormRepository.create(finalCostumerData);

    await this.ormRepository.save(finalCostumer);

    return finalCostumer;
  }
}

export default FinalCostumersRepository;
