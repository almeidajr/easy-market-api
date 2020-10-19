export default interface IScrapingProvider {
  scrapeByUrl<T>(url: string, action: () => T): Promise<T>;
}
