import { getRepository, Repository } from 'typeorm';

import IPaymentMethodsRepository from '@modules/nfces/repositories/IPaymentMethodsRepository';
import ICreatePaymentMethodDTO from '@modules/nfces/dtos/ICreatePaymentMethodDTO';

import PaymentMethod from '../entities/PaymentMethod';

class PaymentMethodsRepository implements IPaymentMethodsRepository {
  private ormRepository: Repository<PaymentMethod>;

  constructor() {
    this.ormRepository = getRepository(PaymentMethod);
  }

  public async findByCode(code: number): Promise<PaymentMethod | undefined> {
    const paymentMethod = await this.ormRepository.findOne({
      where: { code },
    });

    return paymentMethod;
  }

  public async create(
    paymentMethodData: ICreatePaymentMethodDTO,
  ): Promise<PaymentMethod> {
    const paymentMethod = this.ormRepository.create(paymentMethodData);

    await this.ormRepository.save(paymentMethod);

    return paymentMethod;
  }
}

export default PaymentMethodsRepository;
