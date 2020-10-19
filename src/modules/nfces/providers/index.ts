import { container } from 'tsyringe';

import IScrapingProvider from './ScrapingProvider/models/IScrapingProvider';
import PuppeteerProvider from './ScrapingProvider/implementations/PuppeteerProvider';

container.registerSingleton<IScrapingProvider>(
  'ScrapingProvider',
  PuppeteerProvider,
);
