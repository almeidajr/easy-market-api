import { injectable, inject } from 'tsyringe';
import { parse } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IScrapingProvider from '../providers/ScrapingProvider/models/IScrapingProvider';
import IScrapePurchaseDTO from '../dtos/IScrapePurchaseDTO';
import ICreateIssuerDTO from '../dtos/ICreateIssuerDTO';
import ICreatePurchaseDTO from '../dtos/ICreatePurchaseDTO';
import ICreateOperationDestinationDTO from '../dtos/ICreateOperationDestinationDTO';
import ICreateFinalCostumerDTO from '../dtos/ICreateFinalCostumerDTO';
import ICreateBuyerPresenceDTO from '../dtos/ICreateBuyerPresenceDTO';
import ICreatePaymentMethodDTO from '../dtos/ICreatePaymentMethodDTO';
import ICreateNfceDTO from '../dtos/ICreateNfceDTO';
import IBuyerPresencesRepository from '../repositories/IBuyerPresencesRepository';
import IFinalCostumersRepository from '../repositories/IFinalCostumersRepository';
import IOperationDestinationsRepository from '../repositories/IOperationDestinationsRepository';
import IPaymentMethodsRepository from '../repositories/IPaymentMethodsRepository';
import IIssuersRepository from '../repositories/IIssuersRepository';
import INfcesRepository from '../repositories/INfcesRepository';
import IPurchasesRepository from '../repositories/IPurchasesRepository';
import Nfce from '../infra/typeorm/entities/Nfce';

interface IRequest {
  userId: string;
  url: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('ScrapingProvider')
    private scrapingProvider: IScrapingProvider,
    @inject('BuyerPresencesRepository')
    private buyerPresencesRepository: IBuyerPresencesRepository,
    @inject('FinalCostumersRepository')
    private finalCostumersRepository: IFinalCostumersRepository,
    @inject('OperationDestinationsRepository')
    private operationDestinationsRepository: IOperationDestinationsRepository,
    @inject('PaymentMethodsRepository')
    private paymentMethodsRepository: IPaymentMethodsRepository,
    @inject('IssuersRepository')
    private issuersRepository: IIssuersRepository,
    @inject('NfcesRepository')
    private nfcesRepository: INfcesRepository,
    @inject('PurchasesRepository')
    private purchasesRepository: IPurchasesRepository,
  ) {}

  public async execute({ url, userId }: IRequest): Promise<Nfce> {
    let nfce = await this.nfcesRepository.findByUrl(url);

    if (!nfce) {
      const {
        buyerPresenceData,
        finalCostumerData,
        operationDestinationData,
        paymentMethodData,
        issuerData,
        nfcePartialData,
        purchasesData,
      } = await this.scrapingProvider.scrapeByUrl(url, this.browserScope);

      let buyerPresence = await this.buyerPresencesRepository.findByCode(
        buyerPresenceData.code,
      );
      if (!buyerPresence) {
        buyerPresence = await this.buyerPresencesRepository.create(
          buyerPresenceData,
        );
      }

      let finalCostumer = await this.finalCostumersRepository.findByCode(
        finalCostumerData.code,
      );
      if (!finalCostumer) {
        finalCostumer = await this.finalCostumersRepository.create(
          finalCostumerData,
        );
      }

      let operationDestination = await this.operationDestinationsRepository.findByCode(
        operationDestinationData.code,
      );
      if (!operationDestination) {
        operationDestination = await this.operationDestinationsRepository.create(
          operationDestinationData,
        );
      }

      let paymentMethod = await this.paymentMethodsRepository.findByCode(
        paymentMethodData.code,
      );
      if (!paymentMethod) {
        paymentMethod = await this.paymentMethodsRepository.create(
          paymentMethodData,
        );
      }

      let issuer = await this.issuersRepository.findByCnpj(issuerData.cnpj);
      if (!issuer) {
        issuer = await this.issuersRepository.create(issuerData);
      }

      const emissionDate = parse(
        nfcePartialData.nfcePart1.emissionDate,
        'dd/MM/yyyy HH:mm:ss',
        new Date(),
      );
      const nfceData: ICreateNfceDTO = {
        userId,
        issuerId: issuer.id,
        sourceUrl: url,
        buyerPresenceId: buyerPresence.id,
        finalCostumerId: finalCostumer.id,
        operationDestinationId: operationDestination.id,
        paymentMethodId: paymentMethod.id,
        accessKey: nfcePartialData.accessKey,
        additionalInformation: nfcePartialData.additionalInformation,
        protocol: nfcePartialData.protocol,
        ...nfcePartialData.nfcePart1,
        ...nfcePartialData.nfcePart2,
        emissionDate,
      };

      nfce = await this.nfcesRepository.create(nfceData);

      if (nfce) {
        const nfceId = nfce.id;
        await this.purchasesRepository.createMany(
          purchasesData.map<ICreatePurchaseDTO>(purchaseData => ({
            nfceId,
            ...purchaseData,
          })),
        );
      }
    }

    return nfce;
  }

  private browserScope() {
    const purchasesData: IScrapePurchaseDTO[] = [];

    function extractPurchaseCode(content: string | null): number {
      if (content) {
        const cutPoint = content.indexOf('(');
        const text = content.substring(cutPoint).trim();

        return Number(text.replace(/[^0-9]/g, ''));
      }

      return 0;
    }
    function extractPurchaseDescription(content: string | null): string {
      if (content) {
        const cutPoint = content.indexOf('(');

        return content.substring(0, cutPoint).trim();
      }

      return '';
    }
    function extractPurchaseQuantity(content: string | null): number {
      if (content) {
        const cutPoint = content.indexOf(':');
        const text = content.substring(cutPoint + 1).trim();

        return Number(text);
      }

      return 0;
    }
    function extractPurchaseUnit(content: string | null): string {
      if (content) {
        const cutPoint = content.indexOf(':');

        return content.substring(cutPoint + 1).trim();
      }

      return '';
    }
    function extractPurchaseTotalPrice(content: string | null): number {
      if (content) {
        const [text] = content.split(' ').slice(-1);

        return Number(text.replace(',', '.'));
      }

      return 0;
    }
    function extractIssuerName(content: string | null): string {
      if (content) {
        return content.trim();
      }

      return '';
    }
    function extractIssuerCnpj(content: string | null): string {
      if (content) {
        return content.trim();
      }

      return '';
    }
    function extractIssuerStateRegistration(content: string | null): string {
      if (content) {
        return content.trim();
      }

      return '';
    }
    function extractIssuerState(content: string | null): string {
      if (content) {
        return content.trim();
      }

      return '';
    }
    function extractOperationDestinationCode(content: string | null): number {
      if (content) {
        const cutPoint = content.indexOf('-');
        const text = content.substring(0, cutPoint).trim();

        return Number(text.replace(/[^0-9]/g, ''));
      }

      return 0;
    }
    function extractOperationDestinationDescription(
      content: string | null,
    ): string {
      if (content) {
        const cutPoint = content.indexOf('-');
        return content.substring(cutPoint + 1).trim();
      }

      return '';
    }
    function extractFinalCostumerCode(content: string | null): number {
      if (content) {
        const cutPoint = content.indexOf('-');
        const text = content.substring(0, cutPoint).trim();

        return Number(text.replace(/[^0-9]/g, ''));
      }

      return 0;
    }
    function extractFinalCostumerDescription(content: string | null): string {
      if (content) {
        const cutPoint = content.indexOf('-');
        return content.substring(cutPoint + 1).trim();
      }

      return '';
    }
    function extractBuyerPresenceCode(content: string | null): number {
      if (content) {
        const cutPoint = content.indexOf('-');
        const text = content.substring(0, cutPoint).trim();

        return Number(text.replace(/[^0-9]/g, ''));
      }

      return 0;
    }
    function extractBuyerPresenceDescription(content: string | null): string {
      if (content) {
        const cutPoint = content.indexOf('-');
        return content.substring(cutPoint + 1).trim();
      }

      return '';
    }
    function extractNfceModel(content: string | null): number {
      if (content) {
        return Number(content.trim());
      }

      return 0;
    }
    function extractNfceSeries(content: string | null): number {
      if (content) {
        return Number(content.trim());
      }

      return 0;
    }
    function extractNfceNumber(content: string | null): number {
      if (content) {
        return Number(content.trim());
      }

      return 0;
    }
    function extractNfceEmissionDate(content: string | null): string {
      if (content) {
        return content.trim();
      }

      return '';
    }
    function extractPriceValue(content: string | null): number {
      if (content) {
        const cutPoint = content.indexOf(' ');
        const text = content.substring(cutPoint).trim();

        return Number(text.replace(',', '.'));
      }

      return 0;
    }
    function extractNfceProtocol(content: string | null): number {
      if (content) {
        return Number(content.trim());
      }

      return 0;
    }
    function extractPaymentMethodCode(content: string | null): number {
      if (content) {
        const cutPoint = content.indexOf('-');
        const text = content.substring(0, cutPoint).trim();

        return Number(text.replace(/[^0-9]/g, ''));
      }

      return 0;
    }
    function extractPaymentMethodDescription(content: string | null): string {
      if (content) {
        const cutPoint = content.indexOf('-');
        return content.substring(cutPoint + 1).trim();
      }

      return '';
    }

    const rows = document.querySelectorAll('#myTable > tr');

    rows.forEach(row => {
      const cells = row.children;

      if (cells.length !== 4) {
        throw new AppError(
          'Data table has been modified since the last update',
          500,
        );
      }

      purchasesData.push({
        code: extractPurchaseCode(cells[0].textContent),
        description: extractPurchaseDescription(cells[0].textContent),
        quantity: extractPurchaseQuantity(cells[1].textContent),
        unit: extractPurchaseUnit(cells[2].textContent),
        totalPrice: extractPurchaseTotalPrice(cells[3].textContent),
      });
    });

    const generalInformation = document.querySelectorAll('#collapse4 > table');

    const issuerTable = generalInformation[0];
    let cells = issuerTable.querySelectorAll('tbody > tr > td');

    const issuerData: ICreateIssuerDTO = {
      name: extractIssuerName(cells[0].textContent),
      cnpj: extractIssuerCnpj(cells[1].textContent),
      stateRegistration: extractIssuerStateRegistration(cells[2].textContent),
      state: extractIssuerState(cells[3].textContent),
    };

    cells = generalInformation[1].querySelectorAll('tbody > tr > td');

    const operationDestinationData: ICreateOperationDestinationDTO = {
      code: extractOperationDestinationCode(cells[0].textContent),
      description: extractOperationDestinationDescription(cells[0].textContent),
    };

    const finalCostumerData: ICreateFinalCostumerDTO = {
      code: extractFinalCostumerCode(cells[1].textContent),
      description: extractFinalCostumerDescription(cells[1].textContent),
    };

    const buyerPresenceData: ICreateBuyerPresenceDTO = {
      code: extractBuyerPresenceCode(cells[2].textContent),
      description: extractBuyerPresenceDescription(cells[2].textContent),
    };

    const paymentMethodCell = document
      .querySelectorAll('.container > div')[4]
      .getElementsByTagName('strong')[1];

    const paymentMethodData: ICreatePaymentMethodDTO = {
      code: extractPaymentMethodCode(paymentMethodCell.textContent),
      description: extractPaymentMethodDescription(
        paymentMethodCell.textContent,
      ),
    };

    cells = generalInformation[2].querySelectorAll('tbody > tr > td');

    const nfcePart1 = {
      model: extractNfceModel(cells[0].textContent),
      series: extractNfceSeries(cells[1].textContent),
      number: extractNfceNumber(cells[2].textContent),
      emissionDate: extractNfceEmissionDate(cells[3].textContent),
    };

    cells = generalInformation[3].querySelectorAll('tbody > tr > td');

    const nfcePart2 = {
      amount: extractPriceValue(cells[0].textContent),
      icmsBasis: extractPriceValue(cells[1].textContent),
      icmsValue: extractPriceValue(cells[2].textContent),
    };

    cells = generalInformation[4].querySelectorAll('tbody > tr > td');

    const protocol = extractNfceProtocol(cells[0].textContent);

    const additionalInformation =
      document
        .querySelector('#collapse3 > table > tbody > tr > td')
        ?.textContent?.trim() ?? '';

    const accessKey =
      document
        .querySelector('#collapseTwo > table > tbody > tr > td')
        ?.textContent?.trim() ?? '';

    return {
      issuerData,
      operationDestinationData,
      finalCostumerData,
      buyerPresenceData,
      paymentMethodData,
      nfcePartialData: {
        nfcePart1,
        nfcePart2,
        protocol,
        additionalInformation,
        accessKey,
      },
      purchasesData,
    };
  }
}

export default CreateUserService;
