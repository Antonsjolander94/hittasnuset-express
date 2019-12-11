/* eslint-disable */
import cheerio from "cheerio";
import axios from "axios";
import currencyJs from "currency.js"
import UrlService from "./UrlService"

const scrapeApiUrl = "http://localhost:5000/api/prices/";

const SEK = value => currency(value, { symbol: 'kr', decimal: ',', separator: '.', formatWithSymbol: false, pattern: `# !` });
class ScraperService {

    static async postUrlsToScraper() {

        let urls = await UrlService.getUrls();

        if (urls.length > 0) {
            const promises = urls.map(async url => {
                const response = await axios.post(scrapeApiUrl + "scrape", url).catch(error => console.log({ "NodeJS error": error }))
                return {
                    response
                }
            })

            const results = await Promise.all(promises)
            return results
        }

    }
    static async updateOrCreatePrice(prices) {
        //Mappa och lägg till priser
        if (prices) {
            prices.map(async price => {
                await axios.post(scrapeApiUrl + "addprice", {
                    company: price.company,
                    title: price.title,
                    unitPrice: price.unitPrice,
                    tenPrice: price.tenPrice,
                    thirtyPrice: price.thirtyPrice,
                    fiftyPrice: price.fiftyPrice,
                }).catch(error => console.log({ "NodeJS error": error }))

            })
        }
    }
}

export default ScraperService;