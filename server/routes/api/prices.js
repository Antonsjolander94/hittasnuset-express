const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();
const SnusBolaget = require("../../companies/snusbolaget");
const Snus2 = require("../../companies/snus2");

// Get Prices
router.get("/", async (req, res) => {
    const prices = await loadPriceCollection();
    res.send(await prices.find({}).toArray());
})


router.post("/scrape", async (req, res) => {
    if (req && req.body && req.body.url) {
        let url = req.body.url;

        if (url.includes("snus2.se")) {
            let response = await Snus2.scrape(url);
            response.createdAt = Date.now();
            res.status(200).send(response);
        } else if (url.includes("snusbolaget.se")) {
            let response = await SnusBolaget.scrape(url);
            response.createdAt = Date.now();
            res.status(200).send(response);
        }
    }
})

router.post("/addorcreateprice", async (req, res) => {
    const prices = await loadPriceCollection();

    let price = {
        company: req.body.company,
        title: req.body.title,
        unitPrice: req.body.unitPrice,
        tenPrice: req.body.tenPrice,
        thirtyPrice: req.body.thirtyPrice,
        fiftyPrice: req.body.fiftyPrice
    }

    prices.updateOne({ "title": price.title }, (err, result) => {
        assert.equal(null, err);
    })
})

// Add Url
router.post("/addprice", async (req, res) => {
    const Prices = await loadPriceCollection();
    const filter = { title: req.body.title };
    const update = {
        $set: {
            company: req.body.company,
            title: req.body.title,
            unitPrice: req.body.unitPrice,
            tenPrice: req.body.tenPrice,
            thirtyPrice: req.body.thirtyPrice,
            fiftyPrice: req.body.fiftyPrice,
            globalIdentifier: req.body.globalIdentifier,
            createdAt: new Date()
        }
    };

    let doc = await Prices.findOneAndUpdate(filter, update, {
        upsert: true,
        new: true
    });
    if (doc) {
        res.status(200).send("Pris uppdaterat!");
    }
    // const prices = await loadPriceCollection();
    // prices.findOne({ title: req.body.title, company: req.body.company }, async (err, priceAlreadyExists) => {
    //     if (priceAlreadyExists) {
    //         console.log({ priceAlreadyExists: priceAlreadyExists })
    //         let newPrice = {
    //             unitPrice: req.body.unitPrice,
    //             tenPrice: req.body.tenPrice,
    //             thirtyPrice: req.body.thirtyPrice,
    //             fiftyPrice: req.body.fiftyPrice,
    //             createdAt: new Date()
    //         }
    //         let id = priceAlreadyExists._id;

    //         let doc = await prices.findOne({ _id: id });

    //         // Document changed in MongoDB, but not in Mongoose
    //         await prices.updateOne(filter, { name: 'Will Riker' });
    //         res.status(200).send("Pris uppdaterat!");
    //     } else {
    //         await prices.insertOne({
    //             company: req.body.company,
    //             title: req.body.title,
    //             unitPrice: req.body.unitPrice,
    //             tenPrice: req.body.tenPrice,
    //             thirtyPrice: req.body.thirtyPrice,
    //             fiftyPrice: req.body.fiftyPrice,
    //             createdAt: new Date()
    //         }).then(() => {
    //             res.status(201).send("Pris tillagd!");
    //         }).catch(err => {
    //             console.log(err)
    //         });
    //     }
    // })
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