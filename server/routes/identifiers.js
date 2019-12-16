const express = require('express');
const router = express.Router();
const Identifier = require('../models/Identifier');

// Get all IDentifiers.
router.get('/', async (req, res) => {
    try {
        const identifiers = await Identifier.find({});
        res.json(identifiers);
    } catch (error) {
        res.json({ message: err })
    }
})

// Create Identifier
router.post('/', async (req, res) => {
    try {
        console.log({ reqbody: req.body })
        const filter = { title: req.body.title };
        const update = {
            $set: {
                title: req.body.title,
                createdAt: Date.now()
            }
        };

        const response = await Identifier.findOneAndUpdate(filter, update, {
            upsert: true,
            new: true,
            useFindAndModify: false
        });
        res.status(201).json({ success: response })
    } catch (error) {
        res.json({ message: error })
    }
});

// Delete all Identifiers
router.delete("/", async (req, res) => {
    try {
        const deletedAll = await Identifier.deleteMany();
        res.status(200).json({ message: "Deleted all identifiers!" })
    } catch (error) {
        res.json({ message: error.message })
    }
})

// Delete Identifier
router.delete('/:id', async (req, res) => {
    try {
        const removedIdentifier = await Identifier.remove({ _id: req.params.id });
        res.json(removedIdentifier)
    } catch (error) {
        res.json({ message: error })
    }
});

module.exports = router;