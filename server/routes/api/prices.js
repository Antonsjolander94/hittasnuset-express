const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();
const cheerio = require("cheerio");
const currency = require("currency.js");
const axios = require('axios');

const SEK = value => currency(value, { symbol: 'kr', decimal: ',', separator: '.', formatWithSymbol: false, pattern: `# !` });

// Get Prices
router.get("/", async (req, res) => {
    const prices = await loadPriceCollection();
    res.send(await prices.find({}).toArray());
})

router.get("/scrapeWebsites", async (req, res) => {
    const urls1 = [
        "https://www.snus2.se/snus/lossnus/general-classic-los.html",
        "https://www.snus2.se/snus/lossnus/kronan-original-lossnus.html",
    ]

    const promises = urls1.map(async url => {
        const response = await axios({
            method: 'GET',
            url: url
        })
        const page = await response.data;
        const $ = cheerio.load(page)


        const hasTitle = $("h1");
        const hasCompany = "";
        const hasUnitPrice = "";
        const hasTenPrice = $('section.product-info > span.regular-price > span')
        const hasThirtyPrice = "";
        const hasFiftyPrice = "";

        let product = {
            company: "Snus2.se",
            title: "",
            unitPrice: "",
            tenPrice: "",
            thirtyPrice: "",
            fiftyPrice: ""
        }
        if (hasCompany) {
            product.company = hasCompany;
        }
        if (hasTitle) {
            product.title = hasTitle.text();
        }
        if (hasUnitPrice.length > 0) {
            product.unitPrice = SEK(hasUnitPrice.text().replace(/[^\d.,-]/g, '')).format();

        }
        if (hasTenPrice.length > 0) {
            product.tenPrice = SEK(hasTenPrice.text().replace(/[^\d.,-]/g, '')).format();
        }
        if (hasThirtyPrice.length > 0) {
            product.thirtyPrice = SEK(hasThirtyPrice.text().replace(/[^\d.,-]/g, '')).format();
        }
        if (hasFiftyPrice.length > 0) {
            product.fiftyPrice = SEK(hasFiftyPrice.text().replace(/[^\d.,-]/g, '')).format();
        }
        console.log({ "saved product": product.title })
        if (product.title) {
            return product
        } else {
            return null
        }
    })

    const results = await Promise.all(promises);
    const content = JSON.stringify(results, ',', 2);

    res.status(200).send(content)
})

// Add Prices
router.post("/", async (req, res) => {
    const prices = await loadPriceCollection();
    await prices.insertOne({
        company: req.body.company,
        title: req.body.title,
        unitPrice: req.body.unitPrice,
        tenPrice: req.body.tenPrice,
        thirtyPrice: req.body.thirtyPrice,
        fiftyPrice: req.body.fiftyPrice,
        createdAt: new Date()
    }).then(() => {
        res.status(201).send("Pris tillagt!");
    }).catch(err => {
        console.log(err)
    });

})

// Delete Price
router.delete('/:id', async (req, res, next) => {
    const prices = await loadPriceCollection();
    await prices.deleteOne({ _id: new mongodb.ObjectID(req.params.id) })
    res.status(200).send();
})

// Delete All Price
router.delete('/', async (req, res, next) => {
    const prices = await loadPriceCollection();
    await prices.remove({})
    res.status(200).send("Pris raderat!");
})

async function loadPriceCollection() {
    const client = await mongodb.MongoClient.connect(
        `mongodb://anton94:Extra112!@ds031329.mlab.com:31329/hittasnuset-prices`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )

    return client.db('hittasnuset-prices').collection('prices')
}

module.exports = router;