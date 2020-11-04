import { injectable, inject } from 'tsyringe';

import INfcesRepository from '../repositories/INfcesRepository';
import Nfce from '../infra/typeorm/entities/Nfce';

interface IRequest {
  userId: string;
}

@injectable()
class ListUserNfcesService {
  constructor(
    @inject('NfcesRepository')
    private nfcesRepository: INfcesRepository,
  ) {}

  public async execute({ userId }: IRequest): Promise<Nfce[]> {
    return this.nfcesRepository.findByUser(userId);
  }
}

export default ListUserNfcesService;
