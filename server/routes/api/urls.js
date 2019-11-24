const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();


// Get urls
router.get("/", async (req, res) => {
    const urls = await loadUrlCollection();
    res.send(await urls.find({}).toArray());
})

// Delete Urls
router.delete('/:id', async (req, res, next) => {
    const urls = await loadUrlCollection();
    await urls.deleteOne({ _id: new mongodb.ObjectID(req.params.id) })
    res.status(200).send();
})

// Add Url
router.post("/", async (req, res) => {
    const urls = await loadUrlCollection();
    urls.findOne({ url: req.body.url }, async (err, urlAlreadyExists) => {
        if (urlAlreadyExists) {
            res.status(409).send("Url finns redan!");
        } else {
            await urls.insertOne({
                url: req.body.url,
                createdAt: new Date()
            }).then(() => {
                res.status(201).send("Url tillagd!");
            }).catch(err => {
                console.log(err)
            });
        }
    })
})

// Delete All Urls
router.delete('/', async (req, res, next) => {
    const urls = await loadUrlCollection();
    await urls.remove({})
    res.status(200).send("Urler raderade!");
})

async function loadUrlCollection() {
    const client = await mongodb.MongoClient.connect(
        `mongodb://anton94:Extra112!@ds031329.mlab.com:31329/hittasnuset-prices`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )

    return client.db('hittasnuset-prices').collection('urls')
}

module.exports = router;