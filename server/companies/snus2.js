const cheerio = require("cheerio");
const axios = require("axios");

class Snus2 {
    static async scrape(url) {
        try {
            const response = await axios.get(url);
            const page = await response.data;
            const $ = cheerio.load(page);

            if (page) {
                let product = {
                    company: "Snus2",
                    title: "",
                    unitPrice: "",
                    tenPrice: "",
                    thirtyPrice: "",
                    fiftyPrice: ""
                }
                const hasTitle = $("h1");
                const value = $('.regular-price > .price').text();
                const tenPrice = parseInt(value, 10);

                if (tenPrice) {
                    product.unitPrice = tenPrice / 10;
                    product.tenPrice = tenPrice;
                    product.thirtyPrice = tenPrice * 3;
                    product.fiftyPrice = tenPrice * 5;
                }
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

module.exports = Snus2;