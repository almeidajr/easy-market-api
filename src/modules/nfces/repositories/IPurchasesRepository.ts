import Purchase from '../infra/typeorm/entities/Purchase';
import ICreatePurchaseDTO from '../dtos/ICreatePurchaseDTO';

export default interface IPurchasesRepository {
  createMany(data: ICreatePurchaseDTO[]): Promise<Purchase[]>;
}
