'use strict';

let mongoose = require('mongoose')
var findOrCreate = require('mongoose-findorcreate')


let PriceSchema = new mongoose.Schema({
    title: String,
    company: String,
    unitPrice: String,
    tenPrice: String,
    thirtyPrice: String,
    fiftyPrice: String,
    globalIdentifier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GlobalIdentifier"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

PriceSchema.plugin(findOrCreate);

module.exports = mongoose.model('Price', PriceSchema);