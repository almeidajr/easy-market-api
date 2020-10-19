import puppeteer, { Browser } from 'puppeteer';
import { parse } from 'date-fns';

import IScrapingProvider from '../models/IScrapingProvider';

class PuppeteerProvider implements IScrapingProvider {
  private browser: Browser;

  private async openBrowser() {
    this.browser = await puppeteer.launch({
      ignoreHTTPSErrors: true,
    });
  }

  private async closeBrowser() {
    await this.browser.close();
  }

  async scrapeByUrl<T>(url: string, action: () => T): Promise<T> {
    await this.openBrowser();

    const page = await this.browser.newPage();

    await page.goto(url);

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    console.log('scraping start');
    console.time('scraping time spent');

    const result = await page.evaluate(action);

    console.timeEnd('scraping time spent');

    await this.closeBrowser();

    return result as T;
  }
}

export default PuppeteerProvider;
