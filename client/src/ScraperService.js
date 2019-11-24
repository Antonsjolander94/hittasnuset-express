/* eslint-disable */
import cheerio from "cheerio";
import axios from "axios";
import currencyJs from "currency.js"

const SEK = value => currency(value, { symbol: 'kr', decimal: ',', separator: '.', formatWithSymbol: false, pattern: `# !` });

class ScraperService {

    static scrapeSnusbolagetSe(urls) {

    }
}

export default ScraperService;