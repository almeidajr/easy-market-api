import { getRepository, Repository } from 'typeorm';

import IOperationDestinationsRepository from '@modules/nfces/repositories/IOperationDestinationsRepository';
import ICreateOperationDestinationDTO from '@modules/nfces/dtos/ICreateOperationDestinationDTO';

import OperationDestination from '../entities/OperationDestination';

class OperationDestinationsRepository
  implements IOperationDestinationsRepository {
  private ormRepository: Repository<OperationDestination>;

  constructor() {
    this.ormRepository = getRepository(OperationDestination);
  }

  public async findByCode(
    code: number,
  ): Promise<OperationDestination | undefined> {
    const operationDestination = await this.ormRepository.findOne({
      where: { code },
    });

    return operationDestination;
  }

  public async create(
    operationDestinationData: ICreateOperationDestinationDTO,
  ): Promise<OperationDestination> {
    const operationDestination = this.ormRepository.create(
      operationDestinationData,
    );

    await this.ormRepository.save(operationDestination);

    return operationDestination;
  }
}

export default OperationDestinationsRepository;
