const express = require('express');
const router = express.Router();
const SnusBolaget = require("./../companies/snusbolaget");
const Snus2 = require("./../companies/snus2");
const Price = require('../models/Price')

// Scrape Url
router.post('/', async (req, res) => {
    try {
        let url = req.body.url;

        if (url.includes("snus2.se")) {
            let response = await Snus2.scrape(url);
            response.createdAt = Date.now();
            res.status(200).send({ scraped: response })

        } else if (url.includes("snusbolaget.se")) {
            let response = await SnusBolaget.scrape(url);
            response.createdAt = Date.now();
            res.status(200).send({ scraped: response })
        }
    } catch (error) {
        res.json({ message: error })
    }
});


module.exports = router;