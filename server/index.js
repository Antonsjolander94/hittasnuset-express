const express = require("express");
const cors = require("cors");
require('dotenv/config')
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());


// Import Routes
const pricesRoute = require('./routes/prices');
const scrapesRoute = require('./routes/scrape');
const urlsRoute = require('./routes/urls');

app.use('/prices', pricesRoute);
app.use('/scrape', scrapesRoute);
app.use('/urls', urlsRoute);

// Conntext to DB
mongoose.connect(process.env.DBCONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("Connected to DB!")
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));