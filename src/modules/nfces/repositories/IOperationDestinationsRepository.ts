import OperationDestination from '../infra/typeorm/entities/OperationDestination';
import ICreateOperationDestinationDTO from '../dtos/ICreateOperationDestinationDTO';

export default interface IOperationDestinationsRepository {
  findByCode(code: number): Promise<OperationDestination | undefined>;
  create(data: ICreateOperationDestinationDTO): Promise<OperationDestination>;
}
