import IScrapePurchaseDTO from './IScrapePurchaseDTO';

export default interface ICreatePurchaseDTO extends IScrapePurchaseDTO {
  nfceId: string;
}
