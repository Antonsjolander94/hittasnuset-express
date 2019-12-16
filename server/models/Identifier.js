'use strict';

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const IdentifierSchema = new Schema({
    title: String,
    prices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'price'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
});


const Identifier = mongoose.model("identifier", IdentifierSchema);
module.exports = Identifier;
