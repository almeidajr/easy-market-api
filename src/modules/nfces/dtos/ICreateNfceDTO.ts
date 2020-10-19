export default interface ICreateNfceDTO {
  userId: string;
  issuerId: string;
  operationDestinationId: string;
  finalCostumerId: string;
  buyerPresenceId: string;
  paymentMethodId: string;
  sourceUrl: string;
  accessKey: string;
  additionalInformation: string;
  model: number;
  series: number;
  number: number;
  emissionDate: Date;
  amount: number;
  icmsBasis: number;
  icmsValue: number;
  protocol: number;
}
