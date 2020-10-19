import PaymentMethod from '../infra/typeorm/entities/PaymentMethod';
import ICreatePaymentMethodDTO from '../dtos/ICreatePaymentMethodDTO';

export default interface IPaymentMethodsRepository {
  findByCode(code: number): Promise<PaymentMethod | undefined>;
  create(data: ICreatePaymentMethodDTO): Promise<PaymentMethod>;
}
