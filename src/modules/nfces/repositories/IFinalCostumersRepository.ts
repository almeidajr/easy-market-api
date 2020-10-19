import FinalCostumer from '../infra/typeorm/entities/FinalCostumer';
import ICreateFinalCostumerDTO from '../dtos/ICreateFinalCostumerDTO';

export default interface IFinalCostumersRepository {
  findByCode(code: number): Promise<FinalCostumer | undefined>;
  create(data: ICreateFinalCostumerDTO): Promise<FinalCostumer>;
}
