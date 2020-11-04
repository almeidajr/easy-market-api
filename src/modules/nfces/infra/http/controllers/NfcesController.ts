import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateNfceDataService from '@modules/nfces/services/CreateNfceDataService';
import ListUserNfcesService from '@modules/nfces/services/ListUserNfcesService';

export default class NfcesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { url } = request.body;

    const createNfceData = container.resolve(CreateNfceDataService);

    const nfce = await createNfceData.execute({
      userId,
      url,
    });

    return response.json(classToClass(nfce));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const listUserNfces = container.resolve(ListUserNfcesService);

    const nfces = await listUserNfces.execute({
      userId,
    });

    return response.json(classToClass(nfces));
  }
}
