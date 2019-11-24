const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());


const prices = require("./routes/api/prices")
const urls = require("./routes/api/urls")
app.use("/api/prices", prices);
app.use("/api/urls", urls);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));