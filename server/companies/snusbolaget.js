const cheerio = require("cheerio");
const axios = require("axios");
const currencyJs = require("currency.js")

const SEK = value => currencyJs(value, { symbol: 'kr', decimal: ',', separator: '.', formatWithSymbol: false, pattern: `# !` });

class SnusBolaget {
    static async scrape(url) {
        try {
            const response = await axios.get(url);
            const page = await response.data;
            const $ = cheerio.load(page);

            if (page) {
                let product = {
                    company: "Snusbolaget",
                    title: "",
                    unitPrice: "",
                    tenPrice: "",
                    thirtyPrice: "",
                    fiftyPrice: ""
                }
                const hasTitle = $("h1");

                let allListItems = [];

                $('.variants li').each(function (i, e) {
                    allListItems[i] = $(this).text();
                    let li = $(this).text();

                    if (li.includes("1 dosa")) {
                        let price = $(this).find('.pull-right').text();
                        let salesPrice = $(this).find('.pull-right > .sales-price').text();
                        if (salesPrice) {
                            product.unitPrice = SEK(salesPrice.replace(/[^\d.,-]/g, '')).format().trim();
                        } else {
                            product.unitPrice = SEK(price.replace(/[^\d.,-]/g, '')).format().trim();
                        }
                    } else if (li.includes("10-pack")) {
                        let price = $(this).find('.pull-right').text();
                        let salesPrice = $(this).find('.pull-right > .sales-price').text();
                        if (salesPrice) {
                            product.tenPrice = SEK(salesPrice.replace(/[^\d.,-]/g, '')).format().trim();
                        } else {
                            product.tenPrice = SEK(price.replace(/[^\d.,-]/g, '')).format().trim();
                        }
                    } else if (li.includes("30-pack")) {
                        let price = $(this).find('.pull-right').text();
                        let salesPrice = $(this).find('.pull-right > .sales-price').text();
                        if (salesPrice) {
                            product.thirtyPrice = SEK(salesPrice.replace(/[^\d.,-]/g, '')).format().trim();
                        } else {
                            product.thirtyPrice = SEK(price.replace(/[^\d.,-]/g, '')).format().trim();
                        }
                    } else if (li.includes("50-pack")) {
                        let price = $(this).find('.pull-right').text();
                        let salesPrice = $(this).find('.pull-right > .sales-price').text();
                        if (salesPrice) {
                            product.fiftyPrice = SEK(salesPrice.replace(/[^\d.,-]/g, '')).format().trim();
                        } else {
                            product.fiftyPrice = SEK(price.replace(/[^\d.,-]/g, '')).format().trim();
                        }
                    }
                });

                if (hasTitle) {
                    product.title = hasTitle.text();
                }


                if (product.company || product.title || product.unitPrice || product.tenPrice || product.thirtyPrice || product.fiftyPrice) {
                    return product
                }
            }
        } catch (error) {
            return error
        }
    }
}

module.exports = SnusBolaget;