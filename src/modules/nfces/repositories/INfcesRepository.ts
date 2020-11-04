import Nfce from '../infra/typeorm/entities/Nfce';
import ICreateNfceDTO from '../dtos/ICreateNfceDTO';

export default interface INfcesRepository {
  findByUrl(url: string): Promise<Nfce | undefined>;
  findByUser(userId: string): Promise<Nfce[]>;
  create(data: ICreateNfceDTO): Promise<Nfce>;
}
