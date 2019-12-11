'use strict';

let mongoose = require('mongodb')
let Schema = mongoose.Schema;

let GlobalIdentifierSchema = new Schema({
    Title: String
});

module.exports = mongoose.model('GlobalIdentifier', GlobalIdentifierSchema);