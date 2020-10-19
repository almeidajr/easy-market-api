import BuyerPresence from '../infra/typeorm/entities/BuyerPresence';
import ICreateBuyerPresenceDTO from '../dtos/ICreateBuyerPresenceDTO';

export default interface IBuyerPresencesRepository {
  findByCode(code: number): Promise<BuyerPresence | undefined>;
  create(data: ICreateBuyerPresenceDTO): Promise<BuyerPresence>;
}
