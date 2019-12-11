const express = require('express');
const router = express.Router();
const Price = require('../models/Price')

// Get all prices.
router.get('/', async (req, res) => {
    try {
        const prices = await Price.find();
        res.json(prices);
    } catch (error) {
        res.json({ message: err })
    }
})

// Create Price
router.post('/', async (req, res) => {
    try {
        const filter = { title: req.body.title, company: req.body.company };
        const update = {
            $set: {
                company: req.body.company,
                title: req.body.title,
                unitPrice: req.body.unitPrice,
                tenPrice: req.body.tenPrice,
                thirtyPrice: req.body.thirtyPrice,
                fiftyPrice: req.body.fiftyPrice,
                createdAt: Date.now()
            }
        };

        await Price.findOneAndUpdate(filter, update, {
            upsert: true,
            new: true
        }, (err, doc) => {
            if (err) {
                res.json({ message: err })
            }
            if (doc) {
                console.log({ doc: doc })
                res.json({ success: doc })
            }
        });
    } catch (error) {
        res.json({ message: error })
    }
});

// Delete Price
router.delete('/:id', async (req, res) => {
    try {
        const removedPrice = await Price.remove({ _id: req.params.id });
        res.json(removedPrice)
    } catch (error) {
        res.json({ message: error })
    }
});

// Delete all Prices
router.delete("/", async (req, res) => {
    try {
        const deletedAll = Price.deleteMany({}, function (err) {
            console.log({ err: err })
        })
        res.json(deletedAll)
    } catch (error) {
        res.json({ message: error })
    }
})

module.exports = router;