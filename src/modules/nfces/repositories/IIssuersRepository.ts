import Issuer from '../infra/typeorm/entities/Issuer';
import ICreateIssuerDTO from '../dtos/ICreateIssuerDTO';

export default interface IIssuersRepository {
  findByCnpj(cnpj: string): Promise<Issuer | undefined>;
  create(data: ICreateIssuerDTO): Promise<Issuer>;
}
