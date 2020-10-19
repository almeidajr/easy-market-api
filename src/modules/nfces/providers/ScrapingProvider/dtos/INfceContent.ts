export default interface INfceContent {
  purchase: {
    code: number;
    description: string;
    quantity: number;
    unit: string;
    totalPrice: number;
  }[];
  consumer: {
    name: string;
    state: string;
  };
  issuer: {
    name: string;
    cnpj: string;
    stateRegistration: string;
    state: string;
  };
  accessKey: string;
  operationDestination: string;
  finalCostumer: boolean;
  buyerPresence: boolean;
  model: number;
  series: number;
  number: number;
  emissionDate: Date;
  amount: number;
  paymentMethod: string;
  icmsBasis: number;
  icmsValue: number;
  protocol: number;
  additionalInformation: string;
}
