import { container } from 'tsyringe';

import '@modules/users/providers';
import '@modules/nfces/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IBuyerPresencesRepository from '@modules/nfces/repositories/IBuyerPresencesRepository';
import BuyerPresencesRepository from '@modules/nfces/infra/typeorm/repositories/BuyerPresencesRepository';

import IFinalCostumersRepository from '@modules/nfces/repositories/IFinalCostumersRepository';
import FinalCostumersRepository from '@modules/nfces/infra/typeorm/repositories/FinalCostumersRepository';

import IOperationDestinationsRepository from '@modules/nfces/repositories/IOperationDestinationsRepository';
import OperationDestinationsRepository from '@modules/nfces/infra/typeorm/repositories/OperationDestinationsRepository';

import IPaymentMethodsRepository from '@modules/nfces/repositories/IPaymentMethodsRepository';
import PaymentMethodsRepository from '@modules/nfces/infra/typeorm/repositories/PaymentMethodsRepository';

import IIssuersRepository from '@modules/nfces/repositories/IIssuersRepository';
import IssuersRepository from '@modules/nfces/infra/typeorm/repositories/IssuersRepository';

import INfcesRepository from '@modules/nfces/repositories/INfcesRepository';
import NfcesRepository from '@modules/nfces/infra/typeorm/repositories/NfcesRepository';

import IPurchasesRepository from '@modules/nfces/repositories/IPurchasesRepository';
import PurchasesRepository from '@modules/nfces/infra/typeorm/repositories/PurchasesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IBuyerPresencesRepository>(
  'BuyerPresencesRepository',
  BuyerPresencesRepository,
);

container.registerSingleton<IFinalCostumersRepository>(
  'FinalCostumersRepository',
  FinalCostumersRepository,
);

container.registerSingleton<IOperationDestinationsRepository>(
  'OperationDestinationsRepository',
  OperationDestinationsRepository,
);

container.registerSingleton<IPaymentMethodsRepository>(
  'PaymentMethodsRepository',
  PaymentMethodsRepository,
);

container.registerSingleton<IIssuersRepository>(
  'IssuersRepository',
  IssuersRepository,
);

container.registerSingleton<INfcesRepository>(
  'NfcesRepository',
  NfcesRepository,
);

container.registerSingleton<IPurchasesRepository>(
  'PurchasesRepository',
  PurchasesRepository,
);
