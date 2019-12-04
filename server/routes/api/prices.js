const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();
const SnusBolaget = require("../../companies/snusbolaget");

// Get Prices
router.get("/", async (req, res) => {
    const prices = await loadPriceCollection();
    res.send(await prices.find({}).toArray());
})


router.post("/scrape", async (req, res) => {
    if (req && req.body && req.body.url) {
        let url = req.body.url;

        if (url.includes("snus2.se")) {
            res.status(404).send("Snus2.se är inte tillgängligt ännu");
        } else if (url.includes("snusbolaget.se")) {
            let response = await SnusBolaget.scrape(url);
            res.status(200).send(response);
        }
    }
})



// Add Url
router.post("/addprice", async (req, res) => {
    const prices = await loadPriceCollection();
    prices.findOne({ title: req.body.title }, async (err, priceAlreadyExists) => {
        if (priceAlreadyExists) {
            res.status(409).send("Pris finns redan!");
        } else {
            await prices.insertOne({
                company: req.body.company,
                title: req.body.title,
                unitPrice: req.body.unitPrice,
                tenPrice: req.body.tenPrice,
                thirtyPrice: req.body.thirtyPrice,
                fiftyPrice: req.body.fiftyPrice,
                createdAt: new Date()
            }).then(() => {
                res.status(201).send("Pris tillagd!");
            }).catch(err => {
                console.log(err)
            });
        }
    })
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