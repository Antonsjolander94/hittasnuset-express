const express = require('express');
const router = express.Router();
const Price = require('../models/Price')
const Identifier = require('../models/Identifier')

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

// New Price Global Identifier
router.post("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        console.log({ priceId: id })
        // Create Identifier
        const newIdentifier = await Identifier.findById(req.body.identifierId);

        // Get Price by ID
        const price = await Price.findById(id);

        // Assign price to identifiers prices. 
        if (!newIdentifier.prices.includes(price._id)) {
            newIdentifier.prices.push(price);
        } else {
            console.log("This identifier already has this product.")
        }

        // Save the identifier
        await newIdentifier.save();
        // Assign Identifier to price.
        if (!price.product_id.includes(newIdentifier._id)) {
            price.product_id.push(newIdentifier);
        } else {
            console.log("This price already has this identifier.")
        }

        // Save the Price.
        await price.save();
        res.status(201).json({ message: `Added new identifier(${newIdentifier.title}) to ${price.title}` });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

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