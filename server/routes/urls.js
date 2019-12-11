const express = require('express');
const router = express.Router();
const Url = require('../models/Url')

// Get all urls.
router.get('/', async (req, res) => {
    try {
        const urls = await Url.find();
        res.status(200).json(urls);
    } catch (error) {
        res.json({ message: err })
    }
})

// Create urls
router.post('/', async (req, res) => {
    try {
        Url.findOrCreate({ url: req.body.url }).then(function (result) {
            url = result.doc;
            res.status(200).send("Skapat!")
        })
    } catch (error) {
        res.json({ message: error })
    }
});

// Delete Url
router.delete('/:id', async (req, res) => {
    Url.remove({ _id: req.params.id });
    try {
        const removedUrl = await Url.remove({ _id: req.params.id });
        res.json(removedUrl)
    } catch (error) {
        res.json({ message: error })
    }
});



module.exports = router;